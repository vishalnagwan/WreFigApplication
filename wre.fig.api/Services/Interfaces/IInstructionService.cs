using Wre.Fig.Api.DTOs;

namespace Wre.Fig.Api.Services.Interfaces;

public interface IInstructionService
{
    Task<BranchInstructionsDto> GetForBranchAsync(int branchId);
    Task SaveAllAsync(BranchInstructionsDto dto, string userId, string userName);
}
