using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Wre.Fig.Api.Services.Interfaces;

namespace Wre.Fig.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class StatusCodesController(IStatusCodeService statusSvc) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var codes = await statusSvc.GetAllAsync();
        return Ok(codes);
    }
}
