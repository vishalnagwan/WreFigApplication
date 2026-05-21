using Microsoft.EntityFrameworkCore;
using Wre.Fig.Api.Data;
using Wre.Fig.Api.DTOs;
using Wre.Fig.Api.Models.Entities;
using Wre.Fig.Api.Repository.Interfaces;

namespace Wre.Fig.Api.Repository.Repositories;

public class BranchLeaderRepository(AppDbContext db) : IBranchLeaderRepository
{
    public async Task<List<BranchLeaderDto>> GetByBranchAsync(int branchId) =>
        await db.BranchLeaders
            .Where(l => l.BranchId == branchId)
            .OrderBy(l => l.SortOrder)
            .Select(l => ToDto(l))
            .ToListAsync();

    public async Task<BranchLeaderDto> CreateAsync(UpsertBranchLeaderDto dto)
    {
        var entity = new BranchLeader
        {
            BranchId        = dto.BranchId,
            Name            = dto.Name,
            JobTitle        = dto.JobTitle,
            WorkMobilePhone = dto.WorkMobilePhone,
            AltPhone        = dto.AltPhone,
            ManagerName     = dto.ManagerName,
            Notes           = dto.Notes,
            SortOrder       = dto.SortOrder
        };
        db.BranchLeaders.Add(entity);
        await db.SaveChangesAsync();
        return ToDto(entity);
    }

    public async Task<BranchLeaderDto?> UpdateAsync(int id, UpsertBranchLeaderDto dto)
    {
        var entity = await db.BranchLeaders.FindAsync(id);
        if (entity is null) return null;

        entity.Name            = dto.Name;
        entity.JobTitle        = dto.JobTitle;
        entity.WorkMobilePhone = dto.WorkMobilePhone;
        entity.AltPhone        = dto.AltPhone;
        entity.ManagerName     = dto.ManagerName;
        entity.Notes           = dto.Notes;
        entity.SortOrder       = dto.SortOrder;

        await db.SaveChangesAsync();
        return ToDto(entity);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var entity = await db.BranchLeaders.FindAsync(id);
        if (entity is null) return false;
        db.BranchLeaders.Remove(entity);
        await db.SaveChangesAsync();
        return true;
    }

    private static BranchLeaderDto ToDto(BranchLeader l) => new()
    {
        Id              = l.Id,
        BranchId        = l.BranchId,
        Name            = l.Name,
        JobTitle        = l.JobTitle,
        WorkMobilePhone = l.WorkMobilePhone,
        AltPhone        = l.AltPhone,
        ManagerName     = l.ManagerName,
        Notes           = l.Notes,
        SortOrder       = l.SortOrder
    };
}
