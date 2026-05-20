using Wre.Fig.Api.DTOs;

namespace Wre.Fig.Api.Repository.Interfaces;

public interface IBranchRepository
{
    Task<List<BranchSummaryDto>>  GetSummariesAsync(int year, int month, string? userId);
    Task<BranchDetailDto?>        GetByIdAsync(int branchId);
    Task<List<BranchListItemDto>> GetBranchListAsync();
    Task<ComplianceDto>           GetComplianceAsync(int year, int month, string? userId);
}
