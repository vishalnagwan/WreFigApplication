using Wre.Fig.Api.DTOs;

namespace Wre.Fig.Api.Repository.Interfaces;

public interface IBranchLeaderRepository
{
    Task<List<BranchLeaderDto>> GetByBranchAsync(int branchId);
    Task<BranchLeaderDto>       CreateAsync(UpsertBranchLeaderDto dto);
    Task<BranchLeaderDto?>      UpdateAsync(int id, UpsertBranchLeaderDto dto);
    Task<bool>                  DeleteAsync(int id);
}
