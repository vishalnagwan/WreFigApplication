using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Wre.Fig.Api.DTOs;
using Wre.Fig.Api.Models.Entities;
using Wre.Fig.Api.Services.Interfaces;

namespace Wre.Fig.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = AppRoles.Admin)]
public class UsersController(IUserService userSvc) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var users = await userSvc.GetAllAsync();
        return Ok(users);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateUserDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.FullName) ||
            string.IsNullOrWhiteSpace(dto.Email)    ||
            string.IsNullOrWhiteSpace(dto.Password) ||
            string.IsNullOrWhiteSpace(dto.Role))
            return BadRequest(new { error = "Full name, email, password, and role are required." });

        try
        {
            await userSvc.CreateAsync(dto);
            return Created(string.Empty, null);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(string id, [FromBody] EditUserDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.FullName) ||
            string.IsNullOrWhiteSpace(dto.Email)    ||
            string.IsNullOrWhiteSpace(dto.Role))
            return BadRequest(new { error = "Full name, email, and role are required." });

        try
        {
            await userSvc.UpdateAsync(id, dto);
            return NoContent();
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpPost("{id}/deactivate")]
    public async Task<IActionResult> Deactivate(string id)
    {
        await userSvc.DeleteAsync(id);
        return NoContent();
    }
}
