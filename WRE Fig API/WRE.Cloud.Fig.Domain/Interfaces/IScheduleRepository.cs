using WRE.Cloud.Fig.Domain.Models;

namespace WRE.Cloud.Fig.Domain.Interfaces;

public interface IScheduleRepository
{
    Task<ScheduleGridDto?> GetGridAsync(int branchId, int year, int month);
    Task UpsertCellAsync(int employeeId, DateOnly date, string statusCode, string userId, string userName);
    Task<string?> GetNoteAsync(int employeeId, DateOnly date);
    Task UpsertNoteAsync(int employeeId, DateOnly date, string? note, string? statusCode, string userId, string userName);

    /// <summary>Idempotently inserts default schedule entries for every active employee
    /// in <paramref name="branchId"/> for each workday of the given month that has no
    /// existing record.</summary>
    Task PreFillMonthAsync(int branchId, int year, int month, string filledBy);

    /// <summary>Idempotently inserts default schedule entries for <paramref name="employeeId"/>
    /// across all currently-open months.</summary>
    Task PreFillEmployeeAsync(int employeeId, string filledBy);
}
