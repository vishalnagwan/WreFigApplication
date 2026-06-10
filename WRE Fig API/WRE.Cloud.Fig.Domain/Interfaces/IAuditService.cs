using WRE.Cloud.Fig.Domain.Models;

namespace WRE.Cloud.Fig.Domain.Interfaces;

public interface IAuditService
{
    Task<List<AuditLogDto>> GetRecentAsync(int take = 100);
    Task<List<AuditLogDto>> GetForBranchAsync(int branchId, int take = 50);
    Task<List<AuditLogDto>> GetForUserAsync(string userId, string userRole, string? userEmail, int take = 100);
    Task<List<AuditLogDto>> GetForEmployeeAsync(int employeeId, int take = 50);
    Task LogAsync(AuditLogDto dto);
}
