using Microsoft.EntityFrameworkCore;
using Wre.Fig.Api.Infrastructure;
using Wre.Fig.Api.Hubs;
using Wre.Fig.Data;

var builder = WebApplication.CreateBuilder(args);

// Surface all startup exceptions clearly
builder.Logging.ClearProviders();
builder.Logging.AddConsole();

// ── Registered via DependencyInjectionExtension ──────────────────────────────
builder.Services.AddFigData(builder.Configuration);
builder.Services.AddFigAuthentication(builder.Configuration);
builder.Services.AddFigCors(builder.Configuration, builder.Environment);
builder.Services.AddFigRepositories();
builder.Services.AddFigServices();

// ── SignalR ───────────────────────────────────────────────────────────────────
builder.Services.AddSignalR();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// ── Migrate + Seed ────────────────────────────────────────────────────────────
using (var scope = app.Services.CreateScope())
{
    var dbCtx  = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
    try
    {
        var pending = await dbCtx.Database.GetPendingMigrationsAsync();
        if (pending.Any())
        {
            logger.LogInformation("Applying {Count} pending migration(s)…", pending.Count());
            await dbCtx.Database.MigrateAsync();
        }
    }
    catch (Exception ex)
    {
        logger.LogWarning(ex,
            "Migration step failed – tables likely already exist from the shared DB. Continuing with seeding…");
    }

    // ── Ensure FeedbackEntries table exists (manual migration fallback) ──────
    try
    {
        await dbCtx.Database.ExecuteSqlRawAsync(@"
            IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES
                           WHERE TABLE_NAME = 'FeedbackEntries')
            BEGIN
                CREATE TABLE [dbo].[FeedbackEntries] (
                    [Id]            INT IDENTITY(1,1)   NOT NULL,
                    [Page]          NVARCHAR(100)        NOT NULL,
                    [Category]      NVARCHAR(200)        NOT NULL,
                    [Comment]       NVARCHAR(MAX)        NOT NULL,
                    [UserId]        NVARCHAR(450)        NOT NULL,
                    [UserName]      NVARCHAR(256)        NOT NULL,
                    [CreatedAt]     DATETIME2            NOT NULL,
                    [IsImplemented] BIT                  NOT NULL DEFAULT 0,
                    CONSTRAINT [PK_FeedbackEntries] PRIMARY KEY ([Id])
                );
                CREATE INDEX [IX_FeedbackEntries_Page]      ON [dbo].[FeedbackEntries] ([Page]);
                CREATE INDEX [IX_FeedbackEntries_CreatedAt] ON [dbo].[FeedbackEntries] ([CreatedAt]);
            END");
        logger.LogInformation("FeedbackEntries table verified/created.");
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "Failed to ensure FeedbackEntries table.");
    }

    await DataSeeder.SeedAsync(scope.ServiceProvider);
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseHsts();
}

app.UseCors("FigPolicy");

// ── Exception handling ────────────────────────────────────────────────────────
app.UseExceptionHandler(errApp => errApp.Run(async ctx =>
{
    var origin = ctx.Request.Headers.Origin.ToString();
    if (!string.IsNullOrEmpty(origin))
    {
        ctx.Response.Headers.Append("Access-Control-Allow-Origin",      origin);
        ctx.Response.Headers.Append("Access-Control-Allow-Credentials", "true");
    }
    var feature = ctx.Features.Get<Microsoft.AspNetCore.Diagnostics.IExceptionHandlerFeature>();
    var ex      = feature?.Error;
    ctx.Response.StatusCode  = 500;
    ctx.Response.ContentType = "application/json";
    var payload = app.Environment.IsDevelopment()
        ? new { error = ex?.Message, inner = ex?.InnerException?.Message, stack = ex?.StackTrace }
        : new { error = "An unexpected error occurred.", inner = (string?)null, stack = (string?)null };
    await ctx.Response.WriteAsJsonAsync(payload);
}));

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapHub<FigHub>("/hubs/fig");

app.Run();
