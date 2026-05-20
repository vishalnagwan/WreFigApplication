using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;
using Wre.Fig.Api.DTOs;
using Wre.Fig.Api.Hubs;
using Wre.Fig.Api.Models.Entities;
using Wre.Fig.Api.Services.Interfaces;

namespace Wre.Fig.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class InstructionsController(
    IInstructionService instructionSvc,
    IHubContext<FigHub> hub) : ControllerBase
{
    [HttpGet("{branchId:int}")]
    public async Task<IActionResult> Get(int branchId)
    {
        var result = await instructionSvc.GetForBranchAsync(branchId);
        return Ok(result);
    }

    [HttpPut("{branchId:int}")]
    [Authorize(Roles = AppRoles.InstructionWritePolicy)]
    public async Task<IActionResult> Save(int branchId, [FromBody] BranchInstructionsDto dto)
    {
        var userId   = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
        var userName = User.FindFirstValue("fullname") ?? "Unknown";

        await instructionSvc.SaveAllAsync(dto, userId, userName);

        // Broadcast real-time update to all viewers of this branch
        await hub.Clients.Group($"branch-{branchId}")
            .SendAsync(FigHub.InstructionsUpdatedEvent, branchId, userName);

        return NoContent();
    }
}
