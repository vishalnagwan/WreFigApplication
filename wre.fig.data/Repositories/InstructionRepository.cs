using Microsoft.EntityFrameworkCore;
using Wre.Fig.Data;
using Wre.Fig.Domain.Models;
using Wre.Fig.Domain.Interfaces;

namespace Wre.Fig.Data.Repositories;

public class InstructionRepository(AppDbContext db) : IInstructionRepository
{
    private static readonly (string Key, string Title, string ShortTitle, int Position)[] SectionDefs =
    [
        ("ServiceLimitations",      "Service Limitations",                   "LIMITS",   0),
        ("LobSpecificInfo",         "LOB Specific Info",                     "LOB INFO", 0),
        ("OnCallHours",             "On Call Hours",                         "ON CALL",  0),
        ("TruckEquipmentAlerts",    "Truck / Equipment Status Alerts",       "TRUCKS",   0),
        ("AssignmentRouting",       "Assignment / Routing Notes",            "ROUTING",  0),
        ("SupervisorContact",       "Supervisor Contact / Escalation Notes", "CONTACTS", 0),
        ("DisposalConsiderations",  "Disposal Considerations",               "DISPOSAL", 0),
        ("TruckBreakdowns",         "Truck Breakdowns / Accidents / Safety", "SAFETY",   0),
        ("OtherNotes",              "Other Notes",                           "NOTES",    0),
        ("DispatchConsiderations",  "Dispatch Considerations",               "DISPATCH", 1),
        ("LogisticsConsiderations", "Logistics Considerations",              "LOGISTICS",1),
    ];

    public async Task<BranchInstructionsDto> GetForBranchAsync(int branchId)
    {
        var rows = await db.BranchInstructions
            .Where(i => i.BranchId == branchId)
            .OrderBy(i => i.Position)
            .ThenBy(i => i.Section)
            .ThenBy(i => i.SortOrder)
            .ToListAsync();

        var rowsBySection = rows
            .GroupBy(i => i.Section)
            .ToDictionary(g => g.Key, g => g.ToList());

        var sections = SectionDefs.Select(def => new SectionDto
        {
            Key        = def.Key,
            Title      = def.Title,
            ShortTitle = def.ShortTitle,
            Position   = def.Position,           // int: 0=Top, 1=Bottom
            Lines      = rowsBySection.TryGetValue(def.Key, out var lines)
                ? lines.Select(i => new LineDto
                {
                    Id            = i.Id,
                    Content       = i.Content,
                    IsHighlighted = i.IsHighlighted,
                    SortOrder     = i.SortOrder,
                    UpdatedByName = i.UpdatedByName,
                    UpdatedAt     = i.UpdatedAt,
                }).ToList()
                : [],
        }).ToList();

        return new BranchInstructionsDto
        {
            BranchId = branchId,
            Sections = sections,
        };
    }

    public async Task SaveAllAsync(BranchInstructionsDto dto, string userId, string userName)
    {
        var existing = await db.BranchInstructions
            .Where(i => i.BranchId == dto.BranchId)
            .ToListAsync();

        db.BranchInstructions.RemoveRange(existing);

        var now = DateTime.UtcNow;
        foreach (var section in dto.Sections)
        {
            foreach (var line in section.Lines)
            {
                db.BranchInstructions.Add(new BranchInstruction
                {
                    BranchId      = dto.BranchId,
                    Position      = section.Position,   // already int
                    Section       = section.Key,
                    Content       = line.Content,
                    IsHighlighted = line.IsHighlighted,
                    SortOrder     = line.SortOrder,
                    UpdatedAt     = now,
                    UpdatedById   = userId,
                    UpdatedByName = userName,
                });
            }
        }

        await db.SaveChangesAsync();
    }
}
