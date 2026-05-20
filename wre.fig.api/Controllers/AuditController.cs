using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Wre.Fig.Api.Models.Entities;
using Wre.Fig.Api.Services.Interfaces;

namespace Wre.Fig.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class AuditController(IAuditService auditSvc) : ControllerBase
{
    private string CurrentUserId =>
        User.FindFirstValue(ClaimTypes.NameIdentifier) ?? string.Empty;

    /// <summary>
    /// Returns alerts scoped to the caller's role and branch assignments.
    /// Admin / Planner / Dispatcher → all alerts.
    /// FieldSupervisor / DispatchSupervisor → their assigned branches only.
    /// </summary>
    [HttpGet("alerts")]
    [Authorize(Roles = AppRoles.AlertPolicy)]
    public async Task<IActionResult> GetAlerts()
    {
        var result = await auditSvc.GetForUserAsync(CurrentUserId);
        return Ok(result);
    }

    [HttpGet("history")]
    public async Task<IActionResult> GetHistory([FromQuery] int employeeId)
    {
        if (employeeId <= 0) return BadRequest("employeeId is required.");
        var items = await auditSvc.GetForEmployeeAsync(employeeId);
        return Ok(items);
    }
}
