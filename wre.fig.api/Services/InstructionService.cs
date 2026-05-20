using Wre.Fig.Api.DTOs;
using Wre.Fig.Api.Repository.Interfaces;
using Wre.Fig.Api.Services.Interfaces;

namespace Wre.Fig.Api.Services;

public class InstructionService(IInstructionRepository repo) : IInstructionService
{
    public Task<BranchInstructionsDto> GetForBranchAsync(int branchId)
        => repo.GetForBranchAsync(branchId);

    public Task SaveAllAsync(BranchInstructionsDto dto, string userId, string userName)
        => repo.SaveAllAsync(dto, userId, userName);
}
