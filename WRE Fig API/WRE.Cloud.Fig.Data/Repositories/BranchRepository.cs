using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using WRE.Cloud.Fig.Data;
using WRE.Cloud.Fig.Domain.Models;
using WRE.Cloud.Fig.Domain.Interfaces;

namespace WRE.Cloud.Fig.Data.Repositories;

public class BranchRepository(AppDbContext db, UserManager<AppUser> userManager) : IBranchRepository
{
    private const string EmptyStatusCode = "\u2014";
    private const string MojibakeEmptyStatusCode = "\u00e2\u20ac\u201d";

    public async Task<List<BranchSummaryDto>> GetSummariesAsync(int year, int month, string? userId, string userRole, string? userEmail)
    {
        var allowedBranchIds = await GetAllowedBranchIdsAsync(userId, userRole, userEmail);

        var branches = await db.Branches
            .Include(b => b.Region)
            .Where(b => b.IsActive && (allowedBranchIds == null || allowedBranchIds.Contains(b.Id)))
            .OrderBy(b => b.Region.Name)
            .ThenBy(b => b.Name)
            .ToListAsync();

        var daysInMonth  = DateTime.DaysInMonth(year, month);
        var workdayCount = Enumerable.Range(1, daysInMonth)
            .Select(d => new DateOnly(year, month, d))
            .Count(d => d.DayOfWeek != DayOfWeek.Saturday && d.DayOfWeek != DayOfWeek.Sunday);

        var branchIds = branches.Select(b => b.Id).ToList();
        if (branchIds.Count == 0)
            return [];

        var monthStart = new DateOnly(year, month, 1);
        var monthEnd   = new DateOnly(year, month, daysInMonth);

        var employeeCounts = await db.Employees
            .Where(e => branchIds.Contains(e.BranchId) && e.IsActive)
            .GroupBy(e => e.BranchId)
            .Select(g => new { BranchId = g.Key, Count = g.Count() })
            .ToDictionaryAsync(x => x.BranchId, x => x.Count);

        // Build the set of workday dates for this month (Mon-Fri only)
        var workdayDates = Enumerable.Range(1, daysInMonth)
            .Select(d => new DateOnly(year, month, d))
            .Where(d => d.DayOfWeek != DayOfWeek.Saturday && d.DayOfWeek != DayOfWeek.Sunday)
            .ToHashSet();

        // Fetch raw entries into memory — DateOnly.DayOfWeek cannot be translated to SQL
        var rawEntries = await db.ScheduleEntries
            .Where(e => e.Employee.IsActive
                && branchIds.Contains(e.Employee.BranchId)
                && e.Date >= monthStart
                && e.Date <= monthEnd)
            .Select(e => new
            {
                BranchId   = e.Employee.BranchId,
                e.Date,
                e.StatusCode,
                e.UpdatedAt,
                HasNote    = e.Note != null && e.Note != ""
            })
            .ToListAsync();

        // Compute per-branch stats client-side
        var entryStats = rawEntries
            .GroupBy(e => e.BranchId)
            .ToDictionary(g => g.Key, g => new
            {
                ExplicitlyEmptyWorkdaySlots = g.Count(e =>
                    workdayDates.Contains(e.Date) &&
                    (e.StatusCode == EmptyStatusCode || e.StatusCode == MojibakeEmptyStatusCode)),
                LastUpdated = g.Where(e => e.UpdatedAt.HasValue).Max(e => e.UpdatedAt),
                HasNotes    = g.Any(e => e.HasNote)
            });

        var result = new List<BranchSummaryDto>();

        foreach (var branch in branches)
        {
            if (branch.IsAcquisition)
            {
                result.Add(new BranchSummaryDto
                {
                    BranchId      = branch.Id,
                    BranchName    = branch.Name,
                    City          = branch.City,
                    State         = branch.State,
                    RegionName    = branch.Region.Name,
                    IsAcquisition = true,
                    FillRate      = 0,
                    Status        = "acquisition",
                });
                continue;
            }

            var empCount   = employeeCounts.GetValueOrDefault(branch.Id);
            var totalSlots = workdayCount * empCount;
            entryStats.TryGetValue(branch.Id, out var stats);

            // Unscheduled workday slots default to the employee's shift (counted as filled).
            // Only slots explicitly set to "—" (not-scheduled) are counted as empty.
            var explicitlyEmpty = stats?.ExplicitlyEmptyWorkdaySlots ?? 0;
            var filledSlots     = totalSlots - explicitlyEmpty;
            double fillRate     = totalSlots > 0 ? (double)filledSlots / totalSlots * 100 : 0;
            fillRate            = Math.Max(0, Math.Min(100, fillRate)); // clamp 0-100
            string status       = fillRate >= 85 ? "green" : fillRate >= 75 ? "amber" : "red";

            result.Add(new BranchSummaryDto
            {
                BranchId      = branch.Id,
                BranchName    = branch.Name,
                City          = branch.City,
                State         = branch.State,
                RegionName    = branch.Region.Name,
                IsAcquisition = branch.IsAcquisition,
                DriverCount   = empCount,
                FillRate      = Math.Round(fillRate, 1),
                Status        = status,
                LastUpdated   = stats?.LastUpdated,
                HasNotes      = stats?.HasNotes ?? false,
            });
        }

        return result;
    }

    public async Task<BranchDetailDto?> GetByIdAsync(int branchId)
    {
        var branch = await db.Branches
            .Include(b => b.Region)
            .FirstOrDefaultAsync(b => b.Id == branchId);

        if (branch is null) return null;

        return new BranchDetailDto
        {
            BranchId   = branch.Id,
            BranchName = branch.Name,
            City       = branch.City,
            State      = branch.State,
            RegionName = branch.Region.Name,
        };
    }

    public async Task<List<BranchListItemDto>> GetBranchListAsync()
    {
        return await db.Branches
            .Where(b => b.IsActive)
            .OrderBy(b => b.Name)
            .Select(b => new BranchListItemDto { Id = b.Id, Name = b.Name })
            .ToListAsync();
    }

    public async Task<ComplianceDto> GetComplianceAsync(int year, int month, string? userId, string userRole, string? userEmail)
    {
        var allowedBranchIds = await GetAllowedBranchIdsAsync(userId, userRole, userEmail);
        var daysInMonth      = DateTime.DaysInMonth(year, month);

        var workdayDates = Enumerable.Range(1, daysInMonth)
            .Select(d => new DateOnly(year, month, d))
            .Where(d => d.DayOfWeek != DayOfWeek.Saturday && d.DayOfWeek != DayOfWeek.Sunday)
            .ToList();
        int totalWorkdays = workdayDates.Count;

        var branches = await db.Branches
            .Include(b => b.Region)
            .Where(b => b.IsActive && !b.IsAcquisition
                && (allowedBranchIds == null || allowedBranchIds.Contains(b.Id)))
            .ToListAsync();

        var branchIds  = branches.Select(b => b.Id).ToList();
        var monthStart = new DateOnly(year, month, 1);
        var monthEnd   = new DateOnly(year, month, daysInMonth);

        var branchEmpMap = await db.Employees
            .Where(e => branchIds.Contains(e.BranchId) && e.IsActive)
            .Select(e => new { e.Id, e.BranchId })
            .ToListAsync();

        var allEmpIds = branchEmpMap.Select(e => e.Id).ToList();

        var entries = await db.ScheduleEntries
            .Where(e => allEmpIds.Contains(e.EmployeeId) && e.Date >= monthStart && e.Date <= monthEnd)
            .ToListAsync();

        var entriesByEmp = entries
            .GroupBy(e => e.EmployeeId)
            .ToDictionary(g => g.Key, g => g.ToDictionary(e => e.Date));

        var rows = new List<ComplianceRowDto>();

        foreach (var branch in branches.OrderBy(b => b.Region.Name).ThenBy(b => b.Name))
        {
            var empIds    = branchEmpMap.Where(e => e.BranchId == branch.Id).Select(e => e.Id).ToList();
            int empCount  = empIds.Count;
            int total     = totalWorkdays * empCount;
            int filled    = 0;
            int daysComplete = 0;

            foreach (var wd in workdayDates)
            {
                bool dayComplete = true;
                foreach (var empId in empIds)
                {
                    var byDate = entriesByEmp.GetValueOrDefault(empId, []);
                    // No entry = default shift = filled. Only explicit "—" counts as empty.
                    bool isEmpty = byDate.TryGetValue(wd, out var e)
                        && (e.StatusCode == EmptyStatusCode || e.StatusCode == MojibakeEmptyStatusCode);
                    if (!isEmpty)
                        filled++;
                    else
                        dayComplete = false;
                }
                if (dayComplete && empCount > 0) daysComplete++;
            }

            double fillRate = total > 0 ? (double)filled / total * 100 : 0;
            string status   = fillRate >= 85 ? "green" : fillRate >= 75 ? "amber" : "red";

            DateTime? lastUpdated = entries
                .Where(e => empIds.Contains(e.EmployeeId) && e.UpdatedAt.HasValue)
                .OrderByDescending(e => e.UpdatedAt)
                .FirstOrDefault()?.UpdatedAt;

            rows.Add(new ComplianceRowDto
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

        double avgFillRate = rows.Count > 0 ? rows.Average(r => r.FillRate) : 0;

        return new ComplianceDto
        {
            Year                = year,
            Month               = month,
            AverageFillRate     = Math.Round(avgFillRate, 1),
            UpToDateCount       = rows.Count(r => r.Status == "green"),
            BelowThresholdCount = rows.Count(r => r.Status == "red"),
            Rows                = rows,
        };
    }

    private async Task<HashSet<int>?> GetAllowedBranchIdsAsync(
        string? userId, string userRole, string? userEmail)
    {
        // Check the JWT role directly — Admin sees all branches without any DB lookup.
        // This works for both form-based and MSAL users because BuildTokenResponseAsync
        // and BuildMsalTokenResponse both embed the full "wre.fig.*" role in the FIG JWT.
        if (AppRoles.GlobalViewRoles.Contains(userRole)) return null;

        if (userId is null) return [];

        // Try Identity GUID lookup first (works for form-based login).
        var user = await userManager.FindByIdAsync(userId);

        // MSAL users have Azure OIDs in their FIG JWT, not Identity GUIDs.
        // Fall back to email lookup so they inherit branch assignments from a
        // matching Identity record (the form-based account for the same person).
        if (user is null && !string.IsNullOrEmpty(userEmail))
            user = await userManager.FindByEmailAsync(userEmail);

        // No matching DB record — no branch assignments available.
        if (user is null) return [];

        var ids = await db.UserBranches
            .Where(ub => ub.UserId == user.Id)
            .Select(ub => ub.BranchId)
            .ToListAsync();

        return [.. ids];
    }
}
