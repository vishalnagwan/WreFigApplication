using Wre.Fig.Api.DTOs;

namespace Wre.Fig.Api.Services.Interfaces;

public interface IStatusCodeService
{
    Task<List<StatusCodeDto>> GetAllAsync();
}
