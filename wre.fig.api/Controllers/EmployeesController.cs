using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Wre.Fig.Api.DTOs;
using Wre.Fig.Api.Models.Entities;
using Wre.Fig.Api.Repository.Interfaces;
using Wre.Fig.Api.Services.Interfaces;

namespace Wre.Fig.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = AppRoles.Admin)]
public class EmployeesController(IEmployeeService empSvc, IScheduleRepository scheduleRepo) : ControllerBase
{
    private string ActorName => User.FindFirstValue("fullname") ?? User.Identity?.Name ?? "System";

    [HttpGet]
    public async Task<IActionResult> GetAll()
        => Ok(await empSvc.GetAllAsync());

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var emp = await empSvc.GetByIdAsync(id);
        return emp is null ? NotFound() : Ok(emp);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateEmployeeDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Name) || dto.BranchId == 0)
            return BadRequest(new { error = "Name and Branch are required." });
        var created = await empSvc.CreateAsync(dto);
        // Pre-fill workday entries for all currently-open months so the new employee
        // appears in the schedule grid immediately with default status codes.
        await scheduleRepo.PreFillEmployeeAsync(created.Id, ActorName);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] EditEmployeeDto dto)
    {
        await empSvc.UpdateAsync(id, dto);
        return NoContent();
    }

    [HttpPost("{id:int}/deactivate")]
    public async Task<IActionResult> Deactivate(int id)
    {
        await empSvc.DeactivateAsync(id);
        return NoContent();
    }
}
