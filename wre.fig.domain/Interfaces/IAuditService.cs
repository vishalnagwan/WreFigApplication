using Wre.Fig.Domain.Models;

namespace Wre.Fig.Domain.Interfaces;

public interface IAuditService
{
    Task<List<AuditLogDto>> GetRecentAsync(int take = 100);
    Task<List<AuditLogDto>> GetForBranchAsync(int branchId, int take = 50);
    Task<List<AuditLogDto>> GetForUserAsync(string userId, int take = 100);
    Task<List<AuditLogDto>> GetForEmployeeAsync(int employeeId, int take = 50);
    Task LogAsync(AuditLogDto dto);
}
