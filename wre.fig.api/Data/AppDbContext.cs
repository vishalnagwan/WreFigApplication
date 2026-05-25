using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Wre.Fig.Api.Models.Entities;

namespace Wre.Fig.Api.Data;

public class AppDbContext : IdentityDbContext<AppUser>
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Region>              Regions            => Set<Region>();
    public DbSet<Branch>              Branches           => Set<Branch>();
    public DbSet<Employee>            Employees          => Set<Employee>();
    public DbSet<ScheduleEntry>       ScheduleEntries    => Set<ScheduleEntry>();
    public DbSet<ScheduleStatusCode>  StatusCodes        => Set<ScheduleStatusCode>();
    public DbSet<AuditLog>            AuditLogs          => Set<AuditLog>();
    public DbSet<AppUserBranch>       UserBranches       => Set<AppUserBranch>();
    public DbSet<AppUserResourceType> UserResourceTypes  => Set<AppUserResourceType>();
    public DbSet<MonthLock>           MonthLocks         => Set<MonthLock>();
    public DbSet<BranchInstruction>   BranchInstructions => Set<BranchInstruction>();
    public DbSet<BranchLeader>        BranchLeaders      => Set<BranchLeader>();
    public DbSet<FeedbackEntry>       FeedbackEntries    => Set<FeedbackEntry>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        // ── AppUserBranch composite PK ──────────────────────────────────────────
        builder.Entity<AppUserBranch>(e =>
        {
            e.HasKey(x => new { x.UserId, x.BranchId });

            e.HasOne(x => x.Branch_User)
             .WithMany(u => u.UserBranches)
             .HasForeignKey(x => x.UserId)
             .OnDelete(DeleteBehavior.Cascade);

            e.HasOne(x => x.Branch)
             .WithMany(b => b.UserBranches)
             .HasForeignKey(x => x.BranchId)
             .OnDelete(DeleteBehavior.Cascade);
        });

        // ── AppUserResourceType composite PK ────────────────────────────────────
        builder.Entity<AppUserResourceType>(e =>
        {
            e.HasKey(x => new { x.UserId, x.ResourceTypeName });

            e.HasOne(x => x.User)
             .WithMany(u => u.UserResourceTypes)
             .HasForeignKey(x => x.UserId)
             .OnDelete(DeleteBehavior.Cascade);
        });

        // ── ScheduleEntry ───────────────────────────────────────────────────────
        builder.Entity<ScheduleEntry>(e =>
        {
            e.HasIndex(x => new { x.EmployeeId, x.Date }).IsUnique();

            e.Property(x => x.StatusCode)
             .HasDefaultValue("—")
             .HasColumnType("nvarchar(10)");
        });

        // ── Branch ─────────────────────────────────────────────────────────────
        builder.Entity<Branch>(e =>
        {
            e.HasIndex(b => new { b.State, b.City });
        });

        // ── ScheduleStatusCode — string PK ─────────────────────────────────────
        builder.Entity<ScheduleStatusCode>(e =>
        {
            e.HasKey(x => x.Code);
        });

        // ── AuditLog ───────────────────────────────────────────────────────────
        builder.Entity<AuditLog>(e =>
        {
            e.HasIndex(a => a.Timestamp);
        });

        // ── MonthLock ──────────────────────────────────────────────────────────
        builder.Entity<MonthLock>(e =>
        {
            e.HasIndex(m => new { m.Year, m.Month }).IsUnique();
        });

        // ── BranchInstruction ──────────────────────────────────────────────────
        builder.Entity<BranchInstruction>(e =>
        {
            e.HasIndex(b => new { b.BranchId, b.Position });

            e.HasOne(b => b.Branch)
             .WithMany()
             .HasForeignKey(b => b.BranchId)
             .OnDelete(DeleteBehavior.Cascade);
        });

        // ── BranchLeader ───────────────────────────────────────────────────────
        builder.Entity<BranchLeader>(e =>
        {
            e.HasIndex(b => new { b.BranchId, b.SortOrder });

            e.HasOne(b => b.Branch)
             .WithMany()
             .HasForeignKey(b => b.BranchId)
             .OnDelete(DeleteBehavior.Cascade);
        });
    }
}
