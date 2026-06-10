using WRE.Cloud.Fig.Domain.Models;

namespace WRE.Cloud.Fig.Domain.Interfaces;

public interface IBranchRepository
{
    Task<List<BranchSummaryDto>>  GetSummariesAsync(int year, int month, string? userId, string userRole, string? userEmail);
    Task<BranchDetailDto?>        GetByIdAsync(int branchId);
    Task<List<BranchListItemDto>> GetBranchListAsync();
    Task<ComplianceDto>           GetComplianceAsync(int year, int month, string? userId, string userRole, string? userEmail);
}
