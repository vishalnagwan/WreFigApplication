using Microsoft.EntityFrameworkCore;
using WRE.Cloud.Fig.Data;
using WRE.Cloud.Fig.Domain.Models;
using WRE.Cloud.Fig.Domain.Interfaces;

namespace WRE.Cloud.Fig.Data.Repositories;

public class FeedbackRepository(AppDbContext db) : IFeedbackRepository
{
    public async Task AddAsync(CreateFeedbackDto dto, string userId, string userName)
    {
        db.FeedbackEntries.Add(new FeedbackEntry
        {
            Page      = dto.Page.Trim(),
            Category  = dto.Category.Trim(),
            Comment   = dto.Comment.Trim(),
            UserId    = userId,
            UserName  = userName,
            CreatedAt = DateTime.UtcNow
        });
        await db.SaveChangesAsync();
    }

    public async Task<List<FeedbackItemDto>> GetByPageAsync(string page)
    {
        var rows = await db.FeedbackEntries
            .Where(f => f.Page == page)
            .OrderBy(f => f.Category)
            .ThenBy(f => f.CreatedAt)
            .ToListAsync();

        return rows.Select(f => new FeedbackItemDto
        {
            Id            = f.Id,
            Page          = f.Page,
            Category      = f.Category,
            Comment       = f.Comment,
            UserName      = f.UserName,
            CreatedAt     = f.CreatedAt,
            IsImplemented = f.IsImplemented
        }).ToList();
    }

    public async Task<List<FeedbackItemDto>> GetAllAsync()
    {
        var rows = await db.FeedbackEntries
            .OrderByDescending(f => f.CreatedAt)
            .ToListAsync();

        return rows.Select(f => new FeedbackItemDto
        {
            Id            = f.Id,
            Page          = f.Page,
            Category      = f.Category,
            Comment       = f.Comment,
            UserName      = f.UserName,
            CreatedAt     = f.CreatedAt,
            IsImplemented = f.IsImplemented
        }).ToList();
    }

    public async Task<bool> ToggleImplementedAsync(int id)
    {
        var entry = await db.FeedbackEntries.FindAsync(id);
        if (entry is null) return false;
        entry.IsImplemented = !entry.IsImplemented;
        await db.SaveChangesAsync();
        return true;
    }
}
