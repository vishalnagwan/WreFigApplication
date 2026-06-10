using Wre.Fig.Domain.Models;
using Wre.Fig.Domain.Interfaces;

namespace Wre.Fig.Services;

public class InstructionService(IInstructionRepository repo) : IInstructionService
{
    public Task<BranchInstructionsDto> GetForBranchAsync(int branchId)
        => repo.GetForBranchAsync(branchId);

    public Task SaveAllAsync(BranchInstructionsDto dto, string userId, string userName)
        => repo.SaveAllAsync(dto, userId, userName);
}
