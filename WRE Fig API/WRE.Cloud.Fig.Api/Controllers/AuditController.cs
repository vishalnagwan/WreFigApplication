using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using WRE.Cloud.Fig.Domain.Models;
using WRE.Cloud.Fig.Domain.Interfaces;

namespace WRE.Cloud.Fig.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class AuditController(IAuditService auditSvc) : ControllerBase
{
    private string CurrentUserId =>
        User.FindFirstValue(ClaimTypes.NameIdentifier) ?? string.Empty;

    private string CurrentUserRole =>
        User.FindFirstValue(ClaimTypes.Role) ?? string.Empty;

    private string? CurrentUserEmail =>
        User.FindFirstValue(ClaimTypes.Email);

    /// <summary>
    /// Returns alerts scoped to the caller's role and branch assignments.
    /// Admin / Planner / Dispatcher → all alerts.
    /// FieldSupervisor / DispatchSupervisor → their assigned branches only.
    /// </summary>
    [HttpGet("alerts")]
    [Authorize(Roles = AppRoles.AlertPolicy)]
    public async Task<IActionResult> GetAlerts()
    {
        var result = await auditSvc.GetForUserAsync(CurrentUserId, CurrentUserRole, CurrentUserEmail);
        return Ok(result);
    }

    /// <summary>
    /// Returns recent changes scoped to the caller's role and branch assignments.
    /// Parameter: employeId (Mandatory)
    /// </summary>
    [HttpGet("history")]
    public async Task<IActionResult> GetHistory([FromQuery] int employeeId)
    {
        if (employeeId <= 0) return BadRequest("employeeId is required.");
        var items = await auditSvc.GetForEmployeeAsync(employeeId);
        return Ok(items);
    }
}
