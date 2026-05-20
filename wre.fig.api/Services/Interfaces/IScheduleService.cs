using Wre.Fig.Api.DTOs;

namespace Wre.Fig.Api.Services.Interfaces;

public interface IScheduleService
{
    Task<ScheduleGridDto?> GetGridAsync(int branchId, int year, int month);
    Task UpsertCellAsync(int employeeId, DateOnly date, string statusCode, string userId, string userName);
    Task<string?> GetNoteAsync(int employeeId, DateOnly date);
    Task UpsertNoteAsync(int employeeId, DateOnly date, string? note, string? statusCode, string userId, string userName);
}
