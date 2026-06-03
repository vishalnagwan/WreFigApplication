using Wre.Fig.Domain.Models;

namespace Wre.Fig.Domain.Interfaces;

public interface IBranchService
{
    Task<List<BranchSummaryDto>> GetSummariesAsync(int year, int month, string? userId);
    Task<BranchDetailDto?>       GetByIdAsync(int branchId);
    Task<List<BranchListItemDto>> GetBranchListAsync();
    Task<ComplianceDto>          GetComplianceAsync(int year, int month, string? userId);
}
