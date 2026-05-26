using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Wre.Fig.Api.Models.Entities;

namespace Wre.Fig.Api.Data;

public static class DataSeeder
{
    public static async Task SeedAsync(IServiceProvider sp)
    {
        var db          = sp.GetRequiredService<AppDbContext>();
        var roleManager = sp.GetRequiredService<RoleManager<IdentityRole>>();
        var userManager = sp.GetRequiredService<UserManager<AppUser>>();

        await MigrateRoleNamesAsync(roleManager, userManager);
        await SeedRolesAsync(roleManager);
        await SeedStatusCodesAsync(db);
        await SeedRegionsAndBranchesAsync(db);
        await SeedEmployeesAsync(db);
        await SeedUsersAsync(db, userManager);
        await SeedScheduleEntriesAsync(db);
        await SeedMonthLocksAsync(db);
    }

    // ── Role name migrations (run before seeding) ─────────────────────────────
    private static async Task MigrateRoleNamesAsync(RoleManager<IdentityRole> rm,
                                                     UserManager<AppUser>      um)
    {
        // Rename legacy "PlannerDashboard" → "Admin", preserving user assignments.
        var legacy = await rm.FindByNameAsync("PlannerDashboard");
        if (legacy is null) return;   // already migrated or never existed

        var adminExists = await rm.RoleExistsAsync(AppRoles.Admin);

        if (!adminExists)
        {
            // "Admin" role doesn't exist yet — rename in-place (user assignments preserved).
            legacy.Name           = AppRoles.Admin;
            legacy.NormalizedName = AppRoles.Admin.ToUpperInvariant();
            await rm.UpdateAsync(legacy);
        }
        else
        {
            // "Admin" role already exists — migrate any users still assigned to
            // "PlannerDashboard" over to "Admin", then delete the legacy role.
            var users = await um.GetUsersInRoleAsync("PlannerDashboard");
            foreach (var user in users)
            {
                if (!await um.IsInRoleAsync(user, AppRoles.Admin))
                    await um.AddToRoleAsync(user, AppRoles.Admin);
                await um.RemoveFromRoleAsync(user, "PlannerDashboard");
            }
            await rm.DeleteAsync(legacy);
        }
    }

    // ── Roles ────────────────────────────────────────────────────────────────
    private static async Task SeedRolesAsync(RoleManager<IdentityRole> rm)
    {
        foreach (var role in AppRoles.All)
        {
            if (!await rm.RoleExistsAsync(role))
                await rm.CreateAsync(new IdentityRole(role));
        }
    }

    // ── Status Codes ─────────────────────────────────────────────────────────
    private static async Task SeedStatusCodesAsync(AppDbContext db)
    {
        var desired = new[]
        {
            new ScheduleStatusCode { Code = "WA",  Label = "Working AM",     CssClass = "status-wa",    SortOrder = 1, ShowInPaintBar = true,  ShowInPicker = true,  Description = "Working AM shift" },
            new ScheduleStatusCode { Code = "WP",  Label = "Working PM",     CssClass = "status-wp",    SortOrder = 2, ShowInPaintBar = true,  ShowInPicker = true,  Description = "Working PM shift" },
            new ScheduleStatusCode { Code = "O",   Label = "Off / PTO",      CssClass = "status-o",     SortOrder = 3, ShowInPaintBar = true,  ShowInPicker = true,  Description = "Off or PTO" },
            new ScheduleStatusCode { Code = "CO",  Label = "Call-Out",       CssClass = "status-co",    SortOrder = 4, ShowInPaintBar = true,  ShowInPicker = true,  Description = "Called out" },
            new ScheduleStatusCode { Code = "OC",  Label = "On-Call",        CssClass = "status-oc",    SortOrder = 5, ShowInPaintBar = true,  ShowInPicker = true,  Description = "On call" },
            new ScheduleStatusCode { Code = "TR",  Label = "Training",       CssClass = "status-tr",    SortOrder = 6, ShowInPaintBar = true,  ShowInPicker = true,  Description = "Training" },
            new ScheduleStatusCode { Code = "HD",  Label = "Holiday",        CssClass = "status-hd",    SortOrder = 7, ShowInPaintBar = true,  ShowInPicker = true,  Description = "Holiday" },
            new ScheduleStatusCode { Code = "WX",  Label = "Weather",        CssClass = "status-wx",    SortOrder = 8, ShowInPaintBar = true,  ShowInPicker = true,  Description = "Weather related" },
            new ScheduleStatusCode { Code = "—",   Label = "Not Scheduled",  CssClass = "status-blank", SortOrder = 9, ShowInPaintBar = false, ShowInPicker = false, Description = "Not scheduled" },
        };

        // Load all existing codes in one query instead of N individual FindAsync calls
        var existing = await db.StatusCodes.ToListAsync();
        var existingByCode = existing.ToDictionary(s => s.Code);

        foreach (var c in desired)
        {
            if (existingByCode.TryGetValue(c.Code, out var row))
            {
                row.Label          = c.Label;
                row.CssClass       = c.CssClass;
                row.Description    = c.Description;
                row.SortOrder      = c.SortOrder;
                row.ShowInPaintBar = c.ShowInPaintBar;
                row.ShowInPicker   = c.ShowInPicker;
            }
            else
            {
                db.StatusCodes.Add(c);
            }
        }
        await db.SaveChangesAsync();
    }

    // ── Regions + Branches ───────────────────────────────────────────────────
    private static async Task SeedRegionsAndBranchesAsync(AppDbContext db)
    {
        if (await db.Regions.AnyAsync()) return;

        var midAtlantic = new Region { Name = "Mid-Atlantic" };
        var north       = new Region { Name = "North" };
        var midSouth    = new Region { Name = "Mid-South" };
        var south       = new Region { Name = "South" };

        db.Regions.AddRange(midAtlantic, north, midSouth, south);
        await db.SaveChangesAsync();

        var branches = new List<Branch>
        {
            // Mid-Atlantic
            new() { Name = "Swedesboro - NJ",  City = "Swedesboro",  State = "NJ", RegionId = midAtlantic.Id },
            new() { Name = "Vineland - NJ",    City = "Vineland",    State = "NJ", RegionId = midAtlantic.Id },
            new() { Name = "Philadelphia - PA", City = "Philadelphia",State = "PA", RegionId = midAtlantic.Id },
            new() { Name = "Reading - PA",      City = "Reading",     State = "PA", RegionId = midAtlantic.Id },
            new() { Name = "Washington - PA",   City = "Washington",  State = "PA", RegionId = midAtlantic.Id, IsAcquisition = true },
            new() { Name = "Loretto - PA",      City = "Loretto",     State = "PA", RegionId = midAtlantic.Id, IsAcquisition = true },
            new() { Name = "Newark - DE",       City = "Newark",      State = "DE", RegionId = midAtlantic.Id },
            new() { Name = "Elkton - MD",       City = "Elkton",      State = "MD", RegionId = midAtlantic.Id },
            new() { Name = "Baltimore - MD",    City = "Baltimore",   State = "MD", RegionId = midAtlantic.Id },

            // North
            new() { Name = "Stanley - NC",      City = "Stanley",     State = "NC", RegionId = north.Id },
            new() { Name = "Boone - NC",        City = "Boone",       State = "NC", RegionId = north.Id },
            new() { Name = "Durham - NC",       City = "Durham",      State = "NC", RegionId = north.Id },
            new() { Name = "Greensboro - NC",   City = "Greensboro",  State = "NC", RegionId = north.Id },
            new() { Name = "Raleigh - NC",      City = "Raleigh",     State = "NC", RegionId = north.Id },
            new() { Name = "Chester - VA",      City = "Chester",     State = "VA", RegionId = north.Id },
            new() { Name = "Richmond - VA",     City = "Richmond",    State = "VA", RegionId = north.Id },
            new() { Name = "Roanoke - VA",      City = "Roanoke",     State = "VA", RegionId = north.Id },

            // Mid-South
            new() { Name = "Nashville - TN",    City = "Nashville",   State = "TN", RegionId = midSouth.Id },
            new() { Name = "Knoxville - TN",    City = "Knoxville",   State = "TN", RegionId = midSouth.Id },
            new() { Name = "Chattanooga - TN",  City = "Chattanooga", State = "TN", RegionId = midSouth.Id },
            new() { Name = "Louisville - KY",   City = "Louisville",  State = "KY", RegionId = midSouth.Id },
            new() { Name = "Lexington - KY",    City = "Lexington",   State = "KY", RegionId = midSouth.Id },
            new() { Name = "Cincinnati - OH",   City = "Cincinnati",  State = "OH", RegionId = midSouth.Id },

            // South
            new() { Name = "Atlanta - GA",      City = "Atlanta",     State = "GA", RegionId = south.Id },
            new() { Name = "Birmingham - AL",   City = "Birmingham",  State = "AL", RegionId = south.Id },
            new() { Name = "Huntsville - AL",   City = "Huntsville",  State = "AL", RegionId = south.Id },
            new() { Name = "Jackson - MS",      City = "Jackson",     State = "MS", RegionId = south.Id },
            new() { Name = "New Orleans - LA",  City = "New Orleans", State = "LA", RegionId = south.Id },
            new() { Name = "Baton Rouge - LA",  City = "Baton Rouge", State = "LA", RegionId = south.Id },
            new() { Name = "Little Rock - AR",  City = "Little Rock", State = "AR", RegionId = south.Id },
            new() { Name = "Memphis - TN",      City = "Memphis",     State = "TN", RegionId = south.Id },
        };

        db.Branches.AddRange(branches);
        await db.SaveChangesAsync();
    }

    // ── Employees ────────────────────────────────────────────────────────────
    private static async Task SeedEmployeesAsync(AppDbContext db)
    {
        // Only fill in ResourceCategory for employees that have none set yet
        var existing = await db.Employees.ToListAsync();
        if (existing.Count > 0)
        {
            bool changed = false;
            foreach (var emp in existing.Where(e => string.IsNullOrWhiteSpace(e.ResourceCategory)))
            {
                emp.ResourceCategory = "Technician";
                changed = true;
            }
            if (changed) await db.SaveChangesAsync();
            return;
        }

        var branches = await db.Branches.ToListAsync();
        int SwedesboroId() => branches.First(b => b.Name == "Swedesboro - NJ").Id;

        var employees = new List<Employee>
        {
            // Swedesboro – 8 employees
            new() { Name = "John Driver",  BranchId = SwedesboroId(), DefaultShift = "AM", TruckAssignment = "3,800g", TruckId = "#PJ1709", JobTitle = "Driver",         ResourceCategory = "Technician", ManagerName = "Mike Sup" },
            new() { Name = "Jane Smith",   BranchId = SwedesboroId(), DefaultShift = "PM", TruckAssignment = "2,600g", TruckId = "#PJ1720", JobTitle = "Driver",         ResourceCategory = "Technician", ManagerName = "Mike Sup" },
            new() { Name = "Bob Jones",    BranchId = SwedesboroId(), DefaultShift = "AM", TruckAssignment = "4,200g", TruckId = "#PJ1731", JobTitle = "Driver Trainee", ResourceCategory = "Technician", ManagerName = "Mike Sup" },
            new() { Name = "Alice Brown",  BranchId = SwedesboroId(), DefaultShift = "PM", TruckAssignment = "3,800g", TruckId = "#PJ1742", JobTitle = "Driver",         ResourceCategory = "Technician", ManagerName = "Mike Sup" },
            new() { Name = "Tom White",    BranchId = SwedesboroId(), DefaultShift = "AM", TruckAssignment = "2,600g", TruckId = "#PJ1753", JobTitle = "Driver",         ResourceCategory = "Technician", ManagerName = "Mike Sup" },
            new() { Name = "Sara Davis",   BranchId = SwedesboroId(), DefaultShift = "PM", TruckAssignment = "3,800g", TruckId = "#PJ1764", JobTitle = "Driver",         ResourceCategory = "Technician", ManagerName = "Mike Sup" },
            new() { Name = "Mike Wilson",  BranchId = SwedesboroId(), DefaultShift = "AM", TruckAssignment = "4,200g", TruckId = "#PJ1775", JobTitle = "Driver",         ResourceCategory = "Technician", ManagerName = "Mike Sup" },
            new() { Name = "Lisa Taylor",  BranchId = SwedesboroId(), DefaultShift = "PM", TruckAssignment = "3,800g", TruckId = "#PJ1786", JobTitle = "Driver",         ResourceCategory = "Technician", ManagerName = "Mike Sup" },
        };

        // Generic employees for all other branches (4 each)
        var otherBranches = branches.Where(b => b.Name != "Swedesboro - NJ").ToList();
        var categories = new[] { "Technician", "Technician", "Technician", "Technician" };
        var shifts     = new[] { "AM", "PM", "AM", "PM" };
        var trucks     = new[] { "3,800g", "2,600g", "4,200g", "3,800g" };

        int truckSeq = 2000;
        foreach (var branch in otherBranches)
        {
            for (int i = 0; i < 4; i++)
            {
                employees.Add(new Employee
                {
                    Name             = $"{branch.City} Driver {i + 1}",
                    BranchId         = branch.Id,
                    DefaultShift     = shifts[i],
                    TruckAssignment  = trucks[i],
                    TruckId          = $"#PJ{truckSeq++:D4}",
                    JobTitle         = "Driver",
                    ResourceCategory = categories[i],
                    ManagerName      = $"{branch.City} Sup",
                });
            }
        }

        db.Employees.AddRange(employees);
        await db.SaveChangesAsync();
    }

    private record UserSeedDef(string Email, string Pass, string FullName, string Role, string[]? BranchNames, bool AllBranches = false);

    // ── Seed Users ───────────────────────────────────────────────────────────
    private static async Task SeedUsersAsync(AppDbContext db, UserManager<AppUser> um)
    {
        var branches = await db.Branches.ToListAsync();

        var midAtlantic = new[]
        {
            "Swedesboro - NJ", "Vineland - NJ", "Philadelphia - PA",
            "Reading - PA", "Washington - PA", "Loretto - PA",
            "Newark - DE", "Elkton - MD", "Baltimore - MD"
        };

        var userDefs = new UserSeedDef[]
        {
            new("admin@wre.com",      "Admin@123!",      "Admin User",       AppRoles.Admin,              null,          AllBranches: true),
            new("planner@wre.com",    "Admin@123!",      "Plan Ner",         AppRoles.Planner,            null,          AllBranches: true),
            new("fsup@wre.com",       "Admin@123!",      "Field Supervisor", AppRoles.FieldSupervisor,    ["Swedesboro - NJ"]),
            new("dsup@wre.com",       "Admin@123!",      "Dispatch Sup",     AppRoles.DispatchSupervisor, ["Swedesboro - NJ", "Vineland - NJ"]),
            new("mickey@wre.com",     "Admin@123!",      "Mickey Planner",   AppRoles.Planner,            ["Stanley - NC", "Boone - NC", "Durham - NC"]),
            new("dispatch@wre.com",   "Admin@123!",      "Dispatcher One",   AppRoles.Dispatcher,         ["Swedesboro - NJ"]),
            new("employee@wre.com",   "Admin@123!",      "Employee One",     AppRoles.OtherEmployee,      ["Swedesboro - NJ"]),
            // Named users
            new("pegt@wre.com",       "Pegt@123!",       "Peg Trentini",     AppRoles.Admin,              null,          AllBranches: true),
            new("jessicad@wre.com",   "Jessicad@123!",   "Jessica Dudek",    AppRoles.Dispatcher,         null,          AllBranches: true),
            new("feliciad@wre.com",   "Feliciad@123!",   "Felicia Durham",   AppRoles.FieldSupervisor,    null,          AllBranches: true),
            new("sherryA@wre.com",    "Sherrya@123!",    "Sherry Anaya",     AppRoles.Planner,            midAtlantic),
        };

        foreach (var def in userDefs)
        {
            // Skip if this specific user already exists
            if (await um.FindByEmailAsync(def.Email) is not null) continue;

            var user = new AppUser
            {
                UserName       = def.Email,
                Email          = def.Email,
                FullName       = def.FullName,
                IsActive       = true,
                CreatedAt      = DateTime.UtcNow,
                EmailConfirmed = true,
            };
            var result = await um.CreateAsync(user, def.Pass);
            if (!result.Succeeded) continue;

            await um.AddToRoleAsync(user, def.Role);

            if (def.AllBranches)
            {
                foreach (var b in branches)
                    db.UserBranches.Add(new AppUserBranch { UserId = user.Id, BranchId = b.Id });
            }
            else if (def.BranchNames is { Length: > 0 })
            {
                foreach (var name in def.BranchNames)
                {
                    var branch = branches.FirstOrDefault(b => b.Name == name);
                    if (branch is not null)
                        db.UserBranches.Add(new AppUserBranch { UserId = user.Id, BranchId = branch.Id });
                }
            }
        }

        await db.SaveChangesAsync();
    }

    // ── Schedule Entries ─────────────────────────────────────────────────────
    private static async Task SeedScheduleEntriesAsync(AppDbContext db)
    {
        if (await db.ScheduleEntries.AnyAsync()) return;

        var now      = DateTime.UtcNow;
        var year     = now.Year;
        var month    = now.Month;
        var daysInMonth = DateTime.DaysInMonth(year, month);

        var swedesboroId = (await db.Branches.FirstOrDefaultAsync(b => b.Name == "Swedesboro - NJ"))?.Id;
        if (swedesboroId is null) return;

        var employees = await db.Employees
            .Where(e => e.BranchId == swedesboroId && e.IsActive)
            .ToListAsync();

        var entries = new List<ScheduleEntry>();
        var rng = new Random(42);

        for (int day = 1; day <= daysInMonth; day++)
        {
            var date    = new DateOnly(year, month, day);
            var dayOfWk = date.DayOfWeek;
            if (dayOfWk == DayOfWeek.Saturday || dayOfWk == DayOfWeek.Sunday) continue;

            foreach (var emp in employees)
            {
                // Random sprinkle of O/TR/CO for realism
                string code;
                int r = rng.Next(100);
                if (r < 8)
                    code = "O";
                else if (r < 13)
                    code = "TR";
                else if (r < 16)
                    code = "CO";
                else
                    code = emp.DefaultShift == "AM" ? "WA" : "WP";

                entries.Add(new ScheduleEntry
                {
                    EmployeeId = emp.Id,
                    Date       = date,
                    StatusCode = code,
                    CreatedAt  = DateTime.UtcNow,
                    CreatedBy  = "seed",
                });
            }
        }

        db.ScheduleEntries.AddRange(entries);
        await db.SaveChangesAsync();
    }

    // ── Month Locks ──────────────────────────────────────────────────────────
    private static async Task SeedMonthLocksAsync(AppDbContext db)
    {
        if (await db.MonthLocks.AnyAsync()) return;

        var now   = DateTime.UtcNow;
        var locks = new List<MonthLock>();

        for (int offset = -1; offset <= 2; offset++)
        {
            var dt    = now.AddMonths(offset);
            locks.Add(new MonthLock
            {
                Year       = dt.Year,
                Month      = dt.Month,
                IsOpen     = true,
                ModifiedAt = DateTime.UtcNow,
                ModifiedBy = "seed",
            });
        }

        db.MonthLocks.AddRange(locks);
        await db.SaveChangesAsync();
    }
}
