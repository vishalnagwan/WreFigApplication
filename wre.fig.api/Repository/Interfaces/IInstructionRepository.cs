using Wre.Fig.Api.DTOs;

namespace Wre.Fig.Api.Repository.Interfaces;

public interface IInstructionRepository
{
    Task<BranchInstructionsDto> GetForBranchAsync(int branchId);
    Task SaveAllAsync(BranchInstructionsDto dto, string userId, string userName);
}
