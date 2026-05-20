using Wre.Fig.Api.DTOs;

namespace Wre.Fig.Api.Services.Interfaces;

public interface IMonthStateService
{
    Task<List<MonthLockDto>> GetAllAsync();
    Task EnsureDefaultsAsync(string modifiedBy);
    Task OpenMonthAsync(int year, int month, string modifiedBy);
    Task CloseMonthAsync(int year, int month, string modifiedBy);
}
