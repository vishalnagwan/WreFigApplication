using Wre.Fig.Api.DTOs;
using Wre.Fig.Api.Repository.Interfaces;
using Wre.Fig.Api.Services.Interfaces;

namespace Wre.Fig.Api.Services;

public class ScheduleService(IScheduleRepository repo) : IScheduleService
{
    public Task<ScheduleGridDto?> GetGridAsync(int branchId, int year, int month)
        => repo.GetGridAsync(branchId, year, month);

    public Task UpsertCellAsync(int employeeId, DateOnly date, string statusCode, string userId, string userName)
        => repo.UpsertCellAsync(employeeId, date, statusCode, userId, userName);

    public Task<string?> GetNoteAsync(int employeeId, DateOnly date)
        => repo.GetNoteAsync(employeeId, date);

    public Task UpsertNoteAsync(int employeeId, DateOnly date, string? note, string? statusCode, string userId, string userName)
        => repo.UpsertNoteAsync(employeeId, date, note, statusCode, userId, userName);
}
