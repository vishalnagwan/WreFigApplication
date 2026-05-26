using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Wre.Fig.Api.Data;
using Wre.Fig.Api.DTOs;
using Wre.Fig.Api.Models.Entities;
using Wre.Fig.Api.Repository.Interfaces;

namespace Wre.Fig.Api.Repository.Repositories;

public class UserRepository(AppDbContext db, UserManager<AppUser> userManager) : IUserRepository
{
    // ── Read ─────────────────────────────────────────────────────────────────

    public async Task<List<UserListDto>> GetAllAsync()
    {
        var users = await db.Users
            .Include(u => u.UserBranches).ThenInclude(ub => ub.Branch)
            .Include(u => u.UserResourceTypes)
            .OrderBy(u => u.FullName)
            .ToListAsync();

        var result = new List<UserListDto>();
        foreach (var u in users)
        {
            var roles = await userManager.GetRolesAsync(u);
            result.Add(ToDto(u, roles));
        }
        return result;
    }

    public async Task<UserListDto?> GetByIdAsync(string userId)
    {
        var u = await db.Users
            .Include(u => u.UserBranches).ThenInclude(ub => ub.Branch)
            .Include(u => u.UserResourceTypes)
            .FirstOrDefaultAsync(u => u.Id == userId);

        if (u is null) return null;
        var roles = await userManager.GetRolesAsync(u);
        return ToDto(u, roles);
    }

    // ── Create ───────────────────────────────────────────────────────────────

    public async Task CreateAsync(CreateUserDto dto)
    {
        var user = new AppUser
        {
            UserName       = dto.Email,
            Email          = dto.Email,
            FullName       = dto.FullName,
            IsActive       = true,
            CreatedAt      = DateTime.UtcNow,
            EmailConfirmed = true,
        };

        var result = await userManager.CreateAsync(user, dto.Password);
        if (!result.Succeeded)
            throw new InvalidOperationException(
                string.Join("; ", result.Errors.Select(e => e.Description)));

        await userManager.AddToRoleAsync(user, dto.Role);

        foreach (var branchId in dto.BranchIds)
            db.UserBranches.Add(new AppUserBranch { UserId = user.Id, BranchId = branchId });

        await db.SaveChangesAsync();
    }

    // ── Update ───────────────────────────────────────────────────────────────

    public async Task UpdateAsync(string id, EditUserDto dto)
    {
        var u = await db.Users
            .Include(u => u.UserBranches)
            .Include(u => u.UserResourceTypes)
            .FirstOrDefaultAsync(u => u.Id == id);

        if (u is null) return;

        // Basic fields
        u.FullName = dto.FullName;
        u.Email    = dto.Email;
        u.UserName = dto.Email;
        u.IsActive = dto.IsActive;

        // Password — only update if provided
        if (!string.IsNullOrWhiteSpace(dto.Password))
        {
            var token = await userManager.GeneratePasswordResetTokenAsync(u);
            var pwResult = await userManager.ResetPasswordAsync(u, token, dto.Password);
            if (!pwResult.Succeeded)
                throw new InvalidOperationException(
                    string.Join("; ", pwResult.Errors.Select(e => e.Description)));
        }

        // Role — replace existing role(s) with new one
        var currentRoles = await userManager.GetRolesAsync(u);
        if (currentRoles.Count > 0)
            await userManager.RemoveFromRolesAsync(u, currentRoles);
        if (!string.IsNullOrWhiteSpace(dto.Role))
            await userManager.AddToRoleAsync(u, dto.Role);

        // Branches
        db.UserBranches.RemoveRange(u.UserBranches);
        foreach (var bid in dto.BranchIds)
            db.UserBranches.Add(new AppUserBranch { UserId = u.Id, BranchId = bid });

        // Resource types
        db.UserResourceTypes.RemoveRange(u.UserResourceTypes);
        foreach (var rt in dto.ResourceTypeNames)
            db.UserResourceTypes.Add(new AppUserResourceType { UserId = u.Id, ResourceTypeName = rt });

        await db.SaveChangesAsync();
    }

    // ── Delete (soft) ────────────────────────────────────────────────────────

    public async Task DeleteAsync(string userId)
    {
        var u = await db.Users.FindAsync(userId);
        if (u is null) return;
        u.IsActive = false;
        await db.SaveChangesAsync();
    }

    // ── Mapping ──────────────────────────────────────────────────────────────

    private static UserListDto ToDto(AppUser u, IList<string> roles) => new()
    {
        Id                = u.Id,
        FullName          = u.FullName,
        Email             = u.Email ?? string.Empty,
        Role              = roles.FirstOrDefault() ?? string.Empty,
        IsActive          = u.IsActive,
        BranchIds         = u.UserBranches.Select(ub => ub.BranchId).ToList(),
        BranchNames       = u.UserBranches
                              .Where(ub => ub.Branch != null)
                              .Select(ub => ub.Branch!.Name)
                              .OrderBy(n => n)
                              .ToList(),
        ResourceTypeNames = u.UserResourceTypes.Select(rt => rt.ResourceTypeName).ToList(),
    };
}
