using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Wre.Fig.Api.Data;
using Wre.Fig.Api.Hubs;
using Wre.Fig.Api.Models.Entities;
using Wre.Fig.Api.Repository.Interfaces;
using Wre.Fig.Api.Repository.Repositories;
using Wre.Fig.Api.Services.Interfaces;
using Wre.Fig.Api.Services;

var builder = WebApplication.CreateBuilder(args);

// Surface all startup exceptions clearly
builder.Logging.ClearProviders();
builder.Logging.AddConsole();

// ── EF Core ─────────────────────────────────────────────────────────────────
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"),
        sql => sql.CommandTimeout(120)));

// ── Identity ─────────────────────────────────────────────────────────────────
builder.Services.AddIdentity<AppUser, IdentityRole>(options =>
{
    options.Password.RequireDigit          = true;
    options.Password.RequireUppercase      = true;
    options.Password.RequiredLength        = 8;
    options.Password.RequireNonAlphanumeric = true;
    options.SignIn.RequireConfirmedAccount  = false;
})
.AddEntityFrameworkStores<AppDbContext>()
.AddDefaultTokenProviders();

// ── JWT Authentication ────────────────────────────────────────────────────────
var jwtSection = builder.Configuration.GetSection("Jwt");
var jwtKey     = jwtSection["Key"] ?? throw new InvalidOperationException("Jwt:Key is missing from appsettings.json");
var key        = Encoding.UTF8.GetBytes(jwtKey);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme    = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer           = true,
        ValidateAudience         = true,
        ValidateLifetime         = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer              = jwtSection["Issuer"],
        ValidAudience            = jwtSection["Audience"],
        IssuerSigningKey         = new SymmetricSecurityKey(key)
    };
    // Allow JWT via SignalR query string
    options.Events = new JwtBearerEvents
    {
        OnMessageReceived = ctx =>
        {
            var token = ctx.Request.Query["access_token"];
            if (!string.IsNullOrEmpty(token) && ctx.HttpContext.Request.Path.StartsWithSegments("/hubs/fig"))
                ctx.Token = token;
            return Task.CompletedTask;
        }
    };
});

builder.Services.AddAuthorization();

// ── CORS ──────────────────────────────────────────────────────────────────────
// In development allow any localhost origin (any port).
// In production restrict to configured AllowedOrigins.
var allowedOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>() ?? [];
builder.Services.AddCors(options => options.AddPolicy("FigPolicy", policy =>
{
    if (builder.Environment.IsDevelopment())
    {
        // Allow any localhost origin (covers :4200, :4300, etc.)
        policy.SetIsOriginAllowed(origin =>
                   Uri.TryCreate(origin, UriKind.Absolute, out var u) &&
                   (u.Host == "localhost" || u.Host == "127.0.0.1"))
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    }
    else
    {
        policy.WithOrigins(allowedOrigins)
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    }
}));

// ── SignalR ───────────────────────────────────────────────────────────────────
builder.Services.AddSignalR();

// ── App Services (Repository pattern) ────────────────────────────────────────
builder.Services.AddScoped<IBranchRepository,      BranchRepository>();
builder.Services.AddScoped<IScheduleRepository,    ScheduleRepository>();
builder.Services.AddScoped<IInstructionRepository, InstructionRepository>();
builder.Services.AddScoped<IAuditRepository,       AuditRepository>();
builder.Services.AddScoped<IUserRepository,        UserRepository>();
builder.Services.AddScoped<IComplianceRepository,  ComplianceRepository>();
builder.Services.AddScoped<IEmployeeRepository,    EmployeeRepository>();
builder.Services.AddScoped<IBranchLeaderRepository, BranchLeaderRepository>();

builder.Services.AddScoped<IBranchService,      BranchService>();
builder.Services.AddScoped<IScheduleService,    ScheduleService>();
builder.Services.AddScoped<IInstructionService, InstructionService>();
builder.Services.AddScoped<IAuditService,       AuditService>();
builder.Services.AddScoped<IUserService,        UserService>();
builder.Services.AddScoped<IAuthService,        AuthService>();
builder.Services.AddScoped<IStatusCodeService,  StatusCodeService>();
builder.Services.AddScoped<IMonthStateService,  MonthStateService>();
builder.Services.AddScoped<IEmployeeService,    EmployeeService>();

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
        // Safely apply any pending migrations.
        // If this DB is shared with another app (e.g. the Blazor demo), tables may
        // already exist. MigrateAsync inserts the migration record without re-creating
        // tables when using EnsureCreated semantics; on conflict we just log and continue.
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
            "Migration step failed – tables likely already exist from the shared Blazor DB. " +
            "Continuing with seeding…");
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

// Note: Azure App Service terminates HTTPS at the proxy level and forwards HTTP
// internally. UseHttpsRedirection would redirect CORS preflight (OPTIONS) requests,
// which browsers do not follow — killing all cross-origin API calls.
// Azure already enforces HTTPS at the infrastructure level, so no redirect needed here.

// CORS must come before exception handler so error responses also carry CORS headers
app.UseCors("FigPolicy");

// ── Exception handling ────────────────────────────────────────────────────────
// Returns the full exception as JSON so the Angular client can display it.
app.UseExceptionHandler(errApp => errApp.Run(async ctx =>
{
    // Re-apply CORS origin header (exception handler clears headers)
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
