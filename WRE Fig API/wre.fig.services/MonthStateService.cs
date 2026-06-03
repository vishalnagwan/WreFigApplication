using Microsoft.EntityFrameworkCore;
using Wre.Fig.Data;
using Wre.Fig.Domain.Models;
using Wre.Fig.Domain.Interfaces;

namespace Wre.Fig.Services;

public class MonthStateService(AppDbContext db, IScheduleRepository scheduleRepo) : IMonthStateService
{
    public async Task<List<MonthLockDto>> GetAllAsync()
    {
        return await db.MonthLocks
            .OrderByDescending(m => m.Year)
            .ThenByDescending(m => m.Month)
            .Select(m => new MonthLockDto
            {
                Id         = m.Id,
                Year       = m.Year,
                Month      = m.Month,
                IsOpen     = m.IsOpen,
                ModifiedAt = m.ModifiedAt,
                ModifiedBy = m.ModifiedBy,
            })
            .ToListAsync();
    }

    public async Task EnsureDefaultsAsync(string modifiedBy)
    {
        var now    = DateTime.UtcNow;
        var months = Enumerable.Range(-1, 4).Select(offset =>
        {
            var dt = now.AddMonths(offset);
            return (dt.Year, dt.Month);
        }).ToList();

        var newlyOpened = new List<(int Year, int Month)>();

        foreach (var (year, month) in months)
        {
            var existing = await db.MonthLocks.FirstOrDefaultAsync(m => m.Year == year && m.Month == month);
            if (existing is null)
            {
                db.MonthLocks.Add(new MonthLock
                {
                    Year       = year,
                    Month      = month,
                    IsOpen     = true,
                    ModifiedAt = DateTime.UtcNow,
                    ModifiedBy = modifiedBy,
                });
                newlyOpened.Add((year, month));
            }
        }

        await db.SaveChangesAsync();

        // Pre-fill workday defaults for any months created this run
        if (newlyOpened.Count > 0)
        {
            var branchIds = await db.Branches.Select(b => b.Id).ToListAsync();
            foreach (var (year, month) in newlyOpened)
                foreach (var bId in branchIds)
                    await scheduleRepo.PreFillMonthAsync(bId, year, month, modifiedBy);
        }
    }

    public async Task OpenMonthAsync(int year, int month, string modifiedBy)
        => await SetStateAsync(year, month, true, modifiedBy);

    public async Task CloseMonthAsync(int year, int month, string modifiedBy)
        => await SetStateAsync(year, month, false, modifiedBy);

    public async Task BackfillOpenMonthsAsync(string filledBy)
    {
        var openMonths = await db.MonthLocks.Where(m => m.IsOpen).ToListAsync();
        var branchIds  = await db.Branches.Select(b => b.Id).ToListAsync();

        foreach (var ml in openMonths)
            foreach (var bId in branchIds)
                await scheduleRepo.PreFillMonthAsync(bId, ml.Year, ml.Month, filledBy);
    }

    private async Task SetStateAsync(int year, int month, bool isOpen, string modifiedBy)
    {
        var ml = await db.MonthLocks.FirstOrDefaultAsync(m => m.Year == year && m.Month == month);
        if (ml is null)
        {
            db.MonthLocks.Add(new MonthLock { Year = year, Month = month, IsOpen = isOpen, ModifiedAt = DateTime.UtcNow, ModifiedBy = modifiedBy });
        }
        else
        {
            ml.IsOpen     = isOpen;
            ml.ModifiedAt = DateTime.UtcNow;
            ml.ModifiedBy = modifiedBy;
        }
        await db.SaveChangesAsync();

        // Whenever a month is (re-)opened, ensure all branches have default entries
        if (isOpen)
        {
            var branchIds = await db.Branches.Select(b => b.Id).ToListAsync();
            foreach (var bId in branchIds)
                await scheduleRepo.PreFillMonthAsync(bId, year, month, modifiedBy);
        }
    }
}
