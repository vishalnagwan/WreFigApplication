using Wre.Fig.Api.DTOs;
using Wre.Fig.Api.Repository.Interfaces;
using Wre.Fig.Api.Services.Interfaces;

namespace Wre.Fig.Api.Services;

public class BranchService(IBranchRepository repo) : IBranchService
{
    public Task<List<BranchSummaryDto>> GetSummariesAsync(int year, int month, string? userId)
        => repo.GetSummariesAsync(year, month, userId);

    public Task<BranchDetailDto?> GetByIdAsync(int branchId)
        => repo.GetByIdAsync(branchId);

    public Task<List<BranchListItemDto>> GetBranchListAsync()
        => repo.GetBranchListAsync();

    public Task<ComplianceDto> GetComplianceAsync(int year, int month, string? userId)
        => repo.GetComplianceAsync(year, month, userId);
}
