using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Wre.Fig.Api.Data;
using Wre.Fig.Api.DTOs;
using Wre.Fig.Api.Models.Entities;
using Wre.Fig.Api.Repository.Interfaces;

namespace Wre.Fig.Api.Repository.Repositories;

public class UserRepository(AppDbContext db, UserManager<AppUser> userManager) : IUserRepository
{
    public async Task<List<UserDto>> GetAllAsync()
    {
        var users = await db.Users
            .Include(u => u.UserBranches).ThenInclude(ub => ub.Branch)
            .Include(u => u.UserResourceTypes)
            .OrderBy(u => u.FullName)
            .ToListAsync();

        var result = new List<UserDto>();
        foreach (var u in users)
        {
            var roles = await userManager.GetRolesAsync(u);
            result.Add(ToDto(u, roles));
        }
        return result;
    }

    public async Task<UserDto?> GetByIdAsync(string userId)
    {
        var u = await db.Users
            .Include(u => u.UserBranches).ThenInclude(ub => ub.Branch)
            .Include(u => u.UserResourceTypes)
            .FirstOrDefaultAsync(u => u.Id == userId);

        if (u is null) return null;

        var roles = await userManager.GetRolesAsync(u);
        return ToDto(u, roles);
    }

    private static UserDto ToDto(AppUser u, IList<string> roles) => new()
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

    public async Task UpdateAsync(UserDto dto)
    {
        var u = await db.Users
            .Include(u => u.UserBranches)
            .Include(u => u.UserResourceTypes)
            .FirstOrDefaultAsync(u => u.Id == dto.Id);

        if (u is null) return;

        u.FullName = dto.FullName;
        u.Email    = dto.Email;
        u.UserName = dto.Email;

        // Update branches
        db.UserBranches.RemoveRange(u.UserBranches);
        foreach (var bid in dto.BranchIds)
            db.UserBranches.Add(new AppUserBranch { UserId = u.Id, BranchId = bid });

        // Update resource types
        db.UserResourceTypes.RemoveRange(u.UserResourceTypes);
        foreach (var rt in dto.ResourceTypeNames)
            db.UserResourceTypes.Add(new AppUserResourceType { UserId = u.Id, ResourceTypeName = rt });

        await db.SaveChangesAsync();
    }

    public async Task DeleteAsync(string userId)
    {
        var u = await db.Users.FindAsync(userId);
        if (u is null) return;

        // Soft-delete
        u.IsActive = false;
        await db.SaveChangesAsync();
    }
}
