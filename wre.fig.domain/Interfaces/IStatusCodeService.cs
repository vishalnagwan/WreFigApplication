using Wre.Fig.Domain.Models;

namespace Wre.Fig.Domain.Interfaces;

public interface IStatusCodeService
{
    Task<List<StatusCodeDto>> GetAllAsync();
}
