using Microsoft.EntityFrameworkCore;
using Wre.Fig.Api.Data;
using Wre.Fig.Api.DTOs;
using Wre.Fig.Api.Models.Entities;
using Wre.Fig.Api.Repository.Interfaces;

namespace Wre.Fig.Api.Repository.Repositories;

public class ScheduleRepository(AppDbContext db) : IScheduleRepository
{
    private static readonly string[] DayAbbrs =
        ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

    public async Task<ScheduleGridDto?> GetGridAsync(int branchId, int year, int month)
    {
        var branch = await db.Branches.FindAsync(branchId);
        if (branch is null) return null;

        var daysInMonth = DateTime.DaysInMonth(year, month);

        // Build day headers with abbreviations
        var days = Enumerable.Range(1, daysInMonth).Select(d =>
        {
            var date = new DateOnly(year, month, d);
            return new DayHeaderDto
            {
                Day       = d,
                DayAbbr   = DayAbbrs[(int)date.DayOfWeek],
                IsWeekend = date.DayOfWeek is DayOfWeek.Saturday or DayOfWeek.Sunday
            };
        }).ToList();

        // Load active employees with all fields
        var employees = await db.Employees
            .Where(e => e.BranchId == branchId && e.IsActive)
            .OrderBy(e => e.DefaultShift)
            .ThenBy(e => e.Name)
            .ToListAsync();

        var empIds     = employees.Select(e => e.Id).ToList();
        var monthStart = new DateOnly(year, month, 1);
        var monthEnd   = new DateOnly(year, month, daysInMonth);

        var entries = await db.ScheduleEntries
            .Where(e => empIds.Contains(e.EmployeeId) && e.Date >= monthStart && e.Date <= monthEnd)
            .ToListAsync();

        var entriesByEmpDate = entries
            .GroupBy(e => e.EmployeeId)
            .ToDictionary(g => g.Key, g => g.ToDictionary(e => e.Date));

        var rows = employees.Select(emp =>
        {
            var empEntries = entriesByEmpDate.GetValueOrDefault(emp.Id, []);
            var cells      = new Dictionary<int, DayCellDto>();

            foreach (var dayHdr in days)
            {
                var date = new DateOnly(year, month, dayHdr.Day);
                if (empEntries.TryGetValue(date, out var entry))
                {
                    cells[dayHdr.Day] = new DayCellDto
                    {
                        StatusCode = entry.StatusCode ?? "—",
                        HasNote    = !string.IsNullOrWhiteSpace(entry.Note),
                        IsNew      = false
                    };
                }
                else
                {
                    // Default: workday gets shift default, weekend "—"
                    var defaultCode = dayHdr.IsWeekend
                        ? "—"
                        : emp.DefaultShift == "AM" ? "WA" : "WP";

                    cells[dayHdr.Day] = new DayCellDto
                    {
                        StatusCode = defaultCode,
                        HasNote    = false,
                        IsNew      = true   // no DB record yet
                    };
                }
            }

            return new EmployeeScheduleRowDto
            {
                EmployeeId       = emp.Id,
                Name             = emp.Name,
                DefaultShift     = emp.DefaultShift,
                JobTitle         = emp.JobTitle,
                ResourceCategory = emp.ResourceCategory,
                TruckAssignment  = emp.TruckAssignment,
                TruckId          = emp.TruckId,
                ManagerName      = emp.ManagerName,
                WorkPhone        = emp.WorkPhone,
                WorkMobilePhone  = emp.WorkMobilePhone,
                Cells            = cells
            };
        }).ToList();

        return new ScheduleGridDto
        {
            BranchId = branchId,
            Year     = year,
            Month    = month,
            Days     = days,
            Rows     = rows
        };
    }

    public async Task UpsertCellAsync(int employeeId, DateOnly date, string statusCode, string userId, string userName)
    {
        // Fetch employee for name + branchId (needed for meaningful audit log)
        var employee = await db.Employees.FindAsync(employeeId);
        var empName  = employee?.Name ?? $"Employee {employeeId}";
        var branchId = employee?.BranchId ?? 0;

        var entry = await db.ScheduleEntries
            .FirstOrDefaultAsync(e => e.EmployeeId == employeeId && e.Date == date);

        var oldStatus = entry?.StatusCode ?? employee?.DefaultShift switch
        {
            "AM" => "WA",
            "PM" => "WP",
            _    => "—"
        };

        if (entry is null)
        {
            db.ScheduleEntries.Add(new ScheduleEntry
            {
                EmployeeId = employeeId,
                Date       = date,
                StatusCode = statusCode,
                CreatedAt  = DateTime.UtcNow,
                CreatedBy  = userName
            });
        }
        else
        {
            entry.StatusCode = statusCode;
            entry.UpdatedAt  = DateTime.UtcNow;
            entry.UpdatedBy  = userName;
        }

        // EntityId format: "{branchId}:{employeeId}:{date}" — enables branch-scoped alert queries
        db.AuditLogs.Add(new AuditLog
        {
            UserId     = userId,
            UserName   = userName,
            Action     = "UpdateSchedule",
            EntityType = "ScheduleEntry",
            EntityId   = $"{branchId}:{employeeId}:{date:yyyy-MM-dd}",
            NewValue   = $"{empName}: {oldStatus} → {statusCode} on {date:MMM d}",
            Timestamp  = DateTime.UtcNow
        });

        await db.SaveChangesAsync();
    }

    public async Task<string?> GetNoteAsync(int employeeId, DateOnly date)
    {
        var entry = await db.ScheduleEntries
            .FirstOrDefaultAsync(e => e.EmployeeId == employeeId && e.Date == date);
        return entry?.Note;
    }

    public async Task UpsertNoteAsync(int employeeId, DateOnly date, string? note, string? statusCode, string userId, string userName)
    {
        var employee = await db.Employees.FindAsync(employeeId);
        var empName  = employee?.Name ?? $"Employee {employeeId}";
        var branchId = employee?.BranchId ?? 0;

        var entry = await db.ScheduleEntries
            .FirstOrDefaultAsync(e => e.EmployeeId == employeeId && e.Date == date);

        if (entry is null)
        {
            db.ScheduleEntries.Add(new ScheduleEntry
            {
                EmployeeId = employeeId,
                Date       = date,
                StatusCode = statusCode ?? "—",
                Note       = note,
                CreatedAt  = DateTime.UtcNow,
                CreatedBy  = userName
            });
        }
        else
        {
            entry.Note      = note;
            entry.UpdatedAt = DateTime.UtcNow;
            entry.UpdatedBy = userName;
            if (!string.IsNullOrEmpty(statusCode))
                entry.StatusCode = statusCode;
        }

        db.AuditLogs.Add(new AuditLog
        {
            UserId     = userId,
            UserName   = userName,
            Action     = "UpdateNote",
            EntityType = "ScheduleEntry",
            EntityId   = $"{branchId}:{employeeId}:{date:yyyy-MM-dd}",
            NewValue   = $"{empName}: Supervisor note updated on {date:MMM d}",
            Timestamp  = DateTime.UtcNow
        });

        await db.SaveChangesAsync();
    }
}
