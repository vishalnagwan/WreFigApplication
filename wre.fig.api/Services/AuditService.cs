using Wre.Fig.Api.DTOs;
using Wre.Fig.Api.Repository.Interfaces;
using Wre.Fig.Api.Services.Interfaces;

namespace Wre.Fig.Api.Services;

public class AuditService(IAuditRepository repo) : IAuditService
{
    public Task<List<AuditLogDto>> GetRecentAsync(int take = 100)
        => repo.GetRecentAsync(take);

    public Task<List<AuditLogDto>> GetForBranchAsync(int branchId, int take = 50)
        => repo.GetForBranchAsync(branchId, take);

    public Task<List<AuditLogDto>> GetForUserAsync(string userId, int take = 100)
        => repo.GetForUserAsync(userId, take);

    public Task<List<AuditLogDto>> GetForEmployeeAsync(int employeeId, int take = 50)
        => repo.GetForEmployeeAsync(employeeId, take);

    public Task LogAsync(AuditLogDto dto)
        => repo.LogAsync(dto);
}
