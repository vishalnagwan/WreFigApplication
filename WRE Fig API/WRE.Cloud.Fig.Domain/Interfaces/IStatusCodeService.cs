using WRE.Cloud.Fig.Domain.Models;

namespace WRE.Cloud.Fig.Domain.Interfaces;

public interface IStatusCodeService
{
    Task<List<StatusCodeDto>> GetAllAsync();
}
