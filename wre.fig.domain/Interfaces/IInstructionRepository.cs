using Wre.Fig.Domain.Models;

namespace Wre.Fig.Domain.Interfaces;

public interface IInstructionRepository
{
    Task<BranchInstructionsDto> GetForBranchAsync(int branchId);
    Task SaveAllAsync(BranchInstructionsDto dto, string userId, string userName);
}
