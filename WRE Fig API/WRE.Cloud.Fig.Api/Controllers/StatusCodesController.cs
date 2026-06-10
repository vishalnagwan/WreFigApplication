using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WRE.Cloud.Fig.Domain.Interfaces;

namespace WRE.Cloud.Fig.Api.Controllers;

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
