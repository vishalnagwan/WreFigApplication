using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Wre.Fig.Domain.Models;
using Wre.Fig.Domain.Interfaces;

namespace Wre.Fig.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FeedbackController(IFeedbackService feedbackSvc) : ControllerBase
{
    private string CurrentUserId   => User.FindFirstValue(ClaimTypes.NameIdentifier) ?? string.Empty;
    private string CurrentUserName => User.FindFirstValue("fullname") ?? User.Identity?.Name ?? "Unknown";

    /// <summary>Submit feedback — any authenticated user.</summary>
    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Submit([FromBody] CreateFeedbackDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Page) ||
            string.IsNullOrWhiteSpace(dto.Category) ||
            string.IsNullOrWhiteSpace(dto.Comment))
            return BadRequest("Page, category, and comment are required.");

        await feedbackSvc.AddAsync(dto, CurrentUserId, CurrentUserName);
        return Created(string.Empty, null);
    }

    /// <summary>Get all feedback for a specific page — authenticated users.</summary>
    [HttpGet("page/{page}")]
    [Authorize]
    public async Task<IActionResult> GetByPage(string page)
    {
        if (string.IsNullOrWhiteSpace(page)) return BadRequest("Page is required.");
        var items = await feedbackSvc.GetByPageAsync(page);
        return Ok(items);
    }

    /// <summary>
    /// Dev-only report — not in the nav, accessible by URL.
    /// No authentication required so the dev team can access it without an app account.
    /// </summary>
    [HttpGet("report")]
    [AllowAnonymous]
    public async Task<IActionResult> GetReport()
    {
        var items = await feedbackSvc.GetAllAsync();
        return Ok(items);
    }

    /// <summary>Toggle IsImplemented flag — dev tool, no auth required.</summary>
    [HttpPatch("{id:int}/toggle")]
    [AllowAnonymous]
    public async Task<IActionResult> Toggle(int id)
    {
        var found = await feedbackSvc.ToggleImplementedAsync(id);
        return found ? NoContent() : NotFound();
    }
}
