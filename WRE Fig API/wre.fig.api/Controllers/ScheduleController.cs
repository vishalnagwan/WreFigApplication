using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Wre.Fig.Domain.Models;
using Wre.Fig.Domain.Interfaces;

namespace Wre.Fig.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ScheduleController(IScheduleService scheduleSvc) : ControllerBase
{
    private string UserId   => User.FindFirstValue(ClaimTypes.NameIdentifier) ?? "unknown";
    private string UserName => User.FindFirstValue("fullname") ?? User.Identity?.Name ?? "Unknown";

    // GET /api/schedule/{branchId}?year=2026&month=5
    [HttpGet("{branchId:int}")]
    public async Task<IActionResult> GetGrid(int branchId, [FromQuery] int year, [FromQuery] int month)
    {
        var grid = await scheduleSvc.GetGridAsync(branchId, year, month);
        return grid is null ? NotFound() : Ok(grid);
    }

    // PUT /api/schedule/cell  — Angular sends { employeeId, date:"2026-05-01", statusCode }
    [HttpPut("cell")]
    [Authorize(Roles = AppRoles.WritePolicy)]
    public async Task<IActionResult> UpsertCell([FromBody] UpsertCellRequest req)
    {
        if (!DateOnly.TryParse(req.Date, out var date))
            return BadRequest("Invalid date format. Use yyyy-MM-dd.");
        await scheduleSvc.UpsertCellAsync(req.EmployeeId, date, req.StatusCode, UserId, UserName);
        return NoContent();
    }

    // GET /api/schedule/note?employeeId=1&date=2026-05-01
    [HttpGet("note")]
    public async Task<IActionResult> GetNote([FromQuery] int employeeId, [FromQuery] string date)
    {
        if (!DateOnly.TryParse(date, out var d)) return BadRequest("Invalid date.");
        var note = await scheduleSvc.GetNoteAsync(employeeId, d);
        return Ok(new NoteResponse { Note = note });
    }

    // PUT /api/schedule/note  — Angular sends { employeeId, date, note, statusCode }
    [HttpPut("note")]
    [Authorize(Roles = AppRoles.NotePolicy)]
    public async Task<IActionResult> UpsertNote([FromBody] UpsertNoteRequest req)
    {
        if (!DateOnly.TryParse(req.Date, out var date))
            return BadRequest("Invalid date format. Use yyyy-MM-dd.");
        await scheduleSvc.UpsertNoteAsync(req.EmployeeId, date, req.Note, req.StatusCode, UserId, UserName);
        return NoContent();
    }
}
