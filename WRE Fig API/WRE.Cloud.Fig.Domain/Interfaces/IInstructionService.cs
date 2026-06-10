using WRE.Cloud.Fig.Domain.Models;

namespace WRE.Cloud.Fig.Domain.Interfaces;

public interface IInstructionService
{
    Task<BranchInstructionsDto> GetForBranchAsync(int branchId);
    Task SaveAllAsync(BranchInstructionsDto dto, string userId, string userName);
}
