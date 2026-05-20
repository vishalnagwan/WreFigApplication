using Microsoft.EntityFrameworkCore;
using Wre.Fig.Api.Data;
using Wre.Fig.Api.DTOs;
using Wre.Fig.Api.Models.Entities;
using Wre.Fig.Api.Services.Interfaces;

namespace Wre.Fig.Api.Services;

public class MonthStateService(AppDbContext db) : IMonthStateService
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
            }
        }

        await db.SaveChangesAsync();
    }

    public async Task OpenMonthAsync(int year, int month, string modifiedBy)
        => await SetStateAsync(year, month, true, modifiedBy);

    public async Task CloseMonthAsync(int year, int month, string modifiedBy)
        => await SetStateAsync(year, month, false, modifiedBy);

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
    }
}
