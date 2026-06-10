using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Wre.Fig.Domain.Models;
using Wre.Fig.Domain.Interfaces;

namespace Wre.Fig.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController(IAuthService authSvc) : ControllerBase
{
    // Form-based login (existing, unchanged) -- **To Be depricated
    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<IActionResult> Login([FromBody] LoginRequestDto dto)
    {
        var result = await authSvc.LoginAsync(dto);
        if (result is null)
            return Unauthorized(new { message = "Invalid email or password." });
        return Ok(result);
    }

    // MSAL: exchange Azure access token for FIG JWT
    [HttpPost("microsoft")]
    [AllowAnonymous]
    public async Task<IActionResult> LoginWithMicrosoft(
        [FromBody] MicrosoftLoginRequestDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.AccessToken))
            return BadRequest(new { message = "Access token is required." });

        var result = await authSvc.LoginWithMicrosoftAsync(dto.AccessToken);

        if (result is null)
            return Unauthorized(new
            {
                message =
                "No FIG role assigned to this account. " +
                "Contact your administrator to assign a role in Azure AD."
            });

        return Ok(result);
    }
}