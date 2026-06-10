using Microsoft.EntityFrameworkCore;
using WRE.Cloud.Fig.Data;
using WRE.Cloud.Fig.Domain.Models;
using WRE.Cloud.Fig.Domain.Interfaces;

namespace WRE.Cloud.Fig.Data.Repositories;

public class ComplianceRepository(AppDbContext db) : IComplianceRepository
{
    public async Task<List<ComplianceRowDto>> GetAsync(int year, int month)
    {
        var daysInMonth  = DateTime.DaysInMonth(year, month);
        var workdayDates = Enumerable.Range(1, daysInMonth)
            .Select(d => new DateOnly(year, month, d))
            .Where(d => d.DayOfWeek != DayOfWeek.Saturday && d.DayOfWeek != DayOfWeek.Sunday)
            .ToList();
        int totalWorkdays = workdayDates.Count;

        var branches = await db.Branches
            .Include(b => b.Region)
            .Where(b => b.IsActive && !b.IsAcquisition)
            .ToListAsync();

        var branchIds   = branches.Select(b => b.Id).ToList();
        var monthStart  = new DateOnly(year, month, 1);
        var monthEnd    = new DateOnly(year, month, daysInMonth);

        var branchEmployees = await db.Employees
            .Where(e => branchIds.Contains(e.BranchId) && e.IsActive)
            .Select(e => new { e.Id, e.BranchId })
            .ToListAsync();

        var allEmpIds = branchEmployees.Select(e => e.Id).ToList();

        var entries = await db.ScheduleEntries
            .Where(e => allEmpIds.Contains(e.EmployeeId) && e.Date >= monthStart && e.Date <= monthEnd)
            .ToListAsync();

        var entriesByEmp = entries
            .GroupBy(e => e.EmployeeId)
            .ToDictionary(g => g.Key, g => g.ToDictionary(e => e.Date));

        var result = new List<ComplianceRowDto>();

        foreach (var branch in branches)
        {
            var empIds    = branchEmployees.Where(e => e.BranchId == branch.Id).Select(e => e.Id).ToList();
            int empCount  = empIds.Count;
            int totalSlots = totalWorkdays * empCount;
            int filled = 0;
            int daysComplete = 0;

            foreach (var wd in workdayDates)
            {
                bool dayComplete = true;
                foreach (var empId in empIds)
                {
                    var byDate = entriesByEmp.GetValueOrDefault(empId, []);
                    if (byDate.TryGetValue(wd, out var e) && e.StatusCode != "—")
                        filled++;
                    else
                        dayComplete = false;
                }
                if (dayComplete && empCount > 0) daysComplete++;
            }

            double fillRate  = totalSlots > 0 ? (double)filled / totalSlots * 100 : 0;
            string status    = fillRate >= 85 ? "green" : fillRate >= 75 ? "amber" : "red";

            DateTime? lastUpdated = entries
                .Where(e => empIds.Contains(e.EmployeeId) && e.UpdatedAt.HasValue)
                .OrderByDescending(e => e.UpdatedAt)
                .FirstOrDefault()?.UpdatedAt;

            result.Add(new ComplianceRowDto
            {
                BranchId      = branch.Id,
                BranchName    = branch.Name,
                RegionName    = branch.Region.Name,
                FillRate      = Math.Round(fillRate, 1),
                DaysComplete  = daysComplete,
                TotalWorkdays = totalWorkdays,
                LastUpdated   = lastUpdated,
                Status        = status,
            });
        }

        return result.OrderBy(r => r.RegionName).ThenBy(r => r.BranchName).ToList();
    }
}
