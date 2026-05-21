using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Wre.Fig.Api.Models.Entities;
using Wre.Fig.Api.Services.Interfaces;

namespace Wre.Fig.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = $"{AppRoles.Admin},{AppRoles.DispatchSupervisor}")]
public class MonthLocksController(IMonthStateService monthSvc) : ControllerBase
{
    private string ActorName => User.FindFirstValue("fullname") ?? User.Identity?.Name ?? "Unknown";

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var locks = await monthSvc.GetAllAsync();
        return Ok(locks);
    }

    [HttpPost("ensure-defaults")]
    public async Task<IActionResult> EnsureDefaults()
    {
        await monthSvc.EnsureDefaultsAsync(ActorName);
        return NoContent();
    }

    [HttpPut("{year:int}/{month:int}/open")]
    public async Task<IActionResult> Open(int year, int month)
    {
        await monthSvc.OpenMonthAsync(year, month, ActorName);
        return NoContent();
    }

    [HttpPut("{year:int}/{month:int}/close")]
    public async Task<IActionResult> Close(int year, int month)
    {
        await monthSvc.CloseMonthAsync(year, month, ActorName);
        return NoContent();
    }

    /// <summary>
    /// One-time admin action: idempotently pre-fills schedule entries for all active
    /// employees across every currently-open month. Safe to call multiple times.
    /// </summary>
    [HttpPost("backfill")]
    public async Task<IActionResult> Backfill()
    {
        await monthSvc.BackfillOpenMonthsAsync(ActorName);
        return NoContent();
    }
}
