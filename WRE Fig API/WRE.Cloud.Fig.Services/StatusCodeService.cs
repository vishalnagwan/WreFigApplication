using Microsoft.EntityFrameworkCore;
using WRE.Cloud.Fig.Data;
using WRE.Cloud.Fig.Domain.Models;
using WRE.Cloud.Fig.Domain.Interfaces;

namespace WRE.Cloud.Fig.Services;

public class StatusCodeService(AppDbContext db) : IStatusCodeService
{
    private List<StatusCodeDto>? _cache;

    public async Task<List<StatusCodeDto>> GetAllAsync()
    {
        if (_cache is not null) return _cache;

        _cache = await db.StatusCodes
            .OrderBy(s => s.SortOrder)
            .Select(s => new StatusCodeDto
            {
                Code          = s.Code,
                Label         = s.Label,
                CssClass      = s.CssClass,
                Description   = s.Description,
                SortOrder     = s.SortOrder,
                ShowInPaintBar = s.ShowInPaintBar,
                ShowInPicker  = s.ShowInPicker,
            })
            .ToListAsync();

        return _cache;
    }
}
