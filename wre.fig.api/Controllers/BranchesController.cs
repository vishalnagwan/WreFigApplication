using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Wre.Fig.Domain.Models;
using Wre.Fig.Domain.Interfaces;

namespace Wre.Fig.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class BranchesController(IBranchService branchSvc) : ControllerBase
{
    // Reads the authenticated user's ID from the JWT — returns null for anonymous callers.
    private string? CurrentUserId =>
        User.FindFirstValue(ClaimTypes.NameIdentifier);

    [HttpGet("summaries")]
    public async Task<IActionResult> GetSummaries([FromQuery] int year, [FromQuery] int month)
    {
        if (year == 0) year = DateTime.Now.Year;
        if (month == 0) month = DateTime.Now.Month;
        var result = await branchSvc.GetSummariesAsync(year, month, CurrentUserId);
        return Ok(result);
    }

    // Legacy alias kept for backward compat
    [HttpGet]
    public async Task<IActionResult> GetSummariesLegacy([FromQuery] int year, [FromQuery] int month)
    {
        if (year == 0) year = DateTime.Now.Year;
        if (month == 0) month = DateTime.Now.Month;
        var result = await branchSvc.GetSummariesAsync(year, month, CurrentUserId);
        return Ok(result);
    }

    [HttpGet("{branchId:int}/summary")]
    public async Task<IActionResult> GetSummaryById(int branchId, [FromQuery] int year, [FromQuery] int month)
    {
        if (year == 0) year = DateTime.Now.Year;
        if (month == 0) month = DateTime.Now.Month;
        var all    = await branchSvc.GetSummariesAsync(year, month, CurrentUserId);
        var result = all.FirstOrDefault(b => b.BranchId == branchId);
        return result is null ? NotFound() : Ok(result);
    }

    [HttpGet("{branchId:int}")]
    public async Task<IActionResult> GetById(int branchId)
    {
        var result = await branchSvc.GetByIdAsync(branchId);
        return result is null ? NotFound() : Ok(result);
    }

    [HttpGet("list")]
    public async Task<IActionResult> GetList()
    {
        var result = await branchSvc.GetBranchListAsync();
        return Ok(result);
    }

    [HttpGet("compliance")]
    [Authorize(Roles = AppRoles.CompliancePolicy)]
    public async Task<IActionResult> GetCompliance([FromQuery] int year, [FromQuery] int month)
    {
        if (year == 0) year = DateTime.Now.Year;
        if (month == 0) month = DateTime.Now.Month;
        var result = await branchSvc.GetComplianceAsync(year, month, CurrentUserId);
        return Ok(result);
    }
}
