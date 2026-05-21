using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Wre.Fig.Api.DTOs;
using Wre.Fig.Api.Models.Entities;
using Wre.Fig.Api.Repository.Interfaces;

namespace Wre.Fig.Api.Controllers;

[ApiController]
[Route("api/branches/{branchId:int}/leaders")]
[Authorize]
public class BranchLeadersController(IBranchLeaderRepository repo) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetByBranch(int branchId) =>
        Ok(await repo.GetByBranchAsync(branchId));

    [HttpPost]
    [Authorize(Roles = AppRoles.WritePolicy)]
    public async Task<IActionResult> Create(int branchId, [FromBody] UpsertBranchLeaderDto dto)
    {
        dto.BranchId = branchId;
        var result = await repo.CreateAsync(dto);
        return CreatedAtAction(nameof(GetByBranch), new { branchId }, result);
    }

    [HttpPut("{id:int}")]
    [Authorize(Roles = AppRoles.WritePolicy)]
    public async Task<IActionResult> Update(int branchId, int id, [FromBody] UpsertBranchLeaderDto dto)
    {
        dto.BranchId = branchId;
        var result = await repo.UpdateAsync(id, dto);
        return result is null ? NotFound() : Ok(result);
    }

    [HttpDelete("{id:int}")]
    [Authorize(Roles = AppRoles.WritePolicy)]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await repo.DeleteAsync(id);
        return deleted ? NoContent() : NotFound();
    }
}
