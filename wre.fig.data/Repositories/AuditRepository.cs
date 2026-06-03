using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Wre.Fig.Data;
using Wre.Fig.Domain.Models;
using Wre.Fig.Domain.Interfaces;

namespace Wre.Fig.Data.Repositories;

public class AuditRepository(AppDbContext db, UserManager<AppUser> userMgr) : IAuditRepository
{
    public async Task<List<AuditLogDto>> GetRecentAsync(int take = 100)
    {
        // Materialize first — EF Core cannot translate a static method call in Select.
        var logs = await db.AuditLogs
            .OrderByDescending(a => a.Timestamp)
            .Take(take)
            .ToListAsync();
        return logs.Select(ToDto).ToList();
    }

    public async Task<List<AuditLogDto>> GetForBranchAsync(int branchId, int take = 50)
    {
        var prefix = $"{branchId}:";
        var logs = await db.AuditLogs
            .OrderByDescending(a => a.Timestamp)
            .Where(a => a.EntityId.StartsWith(prefix))
            .Take(take)
            .ToListAsync();
        return logs.Select(ToDto).ToList();
    }

    /// <summary>
    /// Returns alerts scoped to the caller's role:
    ///   - Admin / Planner / Dispatcher → all recent alerts
    ///   - FieldSupervisor / DispatchSupervisor → only alerts for their assigned branches
    /// </summary>
    public async Task<List<AuditLogDto>> GetForUserAsync(string userId, int take = 100)
    {
        if (string.IsNullOrEmpty(userId))
            return await GetRecentAsync(take);

        var user = await userMgr.FindByIdAsync(userId);
        if (user is null) return [];

        var roles = await userMgr.GetRolesAsync(user);

        // Global-view roles see every alert
        if (roles.Any(AppRoles.GlobalAlertRoles.Contains))
            return await GetRecentAsync(take);

        // Branch-scoped users: get their assigned branch IDs
        var branchIds = await db.UserBranches
            .Where(ub => ub.UserId == userId)
            .Select(ub => ub.BranchId)
            .ToListAsync();

        if (branchIds.Count == 0) return [];

        // EntityId format is "{branchId}:{employeeId}:{date}" — filter by leading branch segment.
        // Materialize a generous window then filter in memory (avoids un-translatable LINQ predicates).
        var prefixes = branchIds.Select(id => $"{id}:").ToList();
        var raw = await db.AuditLogs
            .OrderByDescending(a => a.Timestamp)
            .Take(take * 20)   // oversample; most records will match one of the user's branches
            .ToListAsync();

        return raw
            .Where(a => prefixes.Any(p => a.EntityId.StartsWith(p)))
            .Take(take)
            .Select(ToDto)
            .ToList();
    }

    /// <summary>
    /// Returns audit history for a single employee.
    /// EntityId format is "{branchId}:{employeeId}:{date}", so we match on
    /// the middle segment ":employeeId:" which is unambiguous for integer IDs.
    /// </summary>
    public async Task<List<AuditLogDto>> GetForEmployeeAsync(int employeeId, int take = 50)
    {
        var segment = $":{employeeId}:";
        var logs = await db.AuditLogs
            .OrderByDescending(a => a.Timestamp)
            .Where(a => a.EntityId.Contains(segment))
            .Take(take)
            .ToListAsync();
        return logs.Select(ToDto).ToList();
    }

    public async Task LogAsync(AuditLogDto dto)
    {
        db.AuditLogs.Add(new AuditLog
        {
            UserId     = dto.PerformedBy,
            UserName   = dto.PerformedBy,
            Action     = dto.Action,
            EntityType = dto.EntityType,
            EntityId   = dto.EntityId,
            Timestamp  = dto.PerformedAt == default ? DateTime.UtcNow : dto.PerformedAt,
        });
        await db.SaveChangesAsync();
    }

    private static AuditLogDto ToDto(AuditLog a) => new()
    {
        Id          = a.Id,
        Action      = a.Action,
        EntityType  = a.EntityType,
        EntityId    = a.EntityId,
        Description = a.NewValue ?? a.Action,
        PerformedBy = a.UserName,
        PerformedAt = a.Timestamp,
    };
}
