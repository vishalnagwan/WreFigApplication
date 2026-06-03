using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Wre.Fig.Data;
using Wre.Fig.Domain.Models;
using Wre.Fig.Domain.Interfaces;
using Wre.Fig.Data.Repositories;
using Wre.Fig.Services;

namespace Wre.Fig.Api.Infrastructure;

public static class DependencyInjectionExtension
{
    public static IServiceCollection AddFigData(this IServiceCollection services, IConfiguration configuration)
    {
        // ── EF Core ──────────────────────────────────────────────────────────
        services.AddDbContext<AppDbContext>(options =>
            options.UseSqlServer(
                configuration.GetConnectionString("DefaultConnection"),
                sql => sql.CommandTimeout(120)));

        // ── Identity ─────────────────────────────────────────────────────────
        services.AddIdentity<AppUser, IdentityRole>(options =>
        {
            options.Password.RequireDigit           = true;
            options.Password.RequireUppercase       = true;
            options.Password.RequiredLength         = 8;
            options.Password.RequireNonAlphanumeric = true;
            options.SignIn.RequireConfirmedAccount  = false;
        })
        .AddEntityFrameworkStores<AppDbContext>()
        .AddDefaultTokenProviders();

        return services;
    }

    public static IServiceCollection AddFigAuthentication(this IServiceCollection services, IConfiguration configuration)
    {
        var jwtSection = configuration.GetSection("Jwt");
        var jwtKey     = jwtSection["Key"] ?? throw new InvalidOperationException("Jwt:Key is missing from configuration.");
        var key        = Encoding.UTF8.GetBytes(jwtKey);

        services.AddAuthentication(options =>
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
                    if (!string.IsNullOrEmpty(token) &&
                        ctx.HttpContext.Request.Path.StartsWithSegments("/hubs/fig"))
                        ctx.Token = token;
                    return Task.CompletedTask;
                }
            };
        });

        services.AddAuthorization();

        return services;
    }

    public static IServiceCollection AddFigCors(this IServiceCollection services, IConfiguration configuration, IWebHostEnvironment environment)
    {
        var allowedOrigins = configuration.GetSection("Cors:AllowedOrigins").Get<string[]>() ?? [];

        services.AddCors(options => options.AddPolicy("FigPolicy", policy =>
        {
            if (environment.IsDevelopment())
            {
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

        return services;
    }

    public static IServiceCollection AddFigRepositories(this IServiceCollection services)
    {
        services.AddScoped<IBranchRepository,       BranchRepository>();
        services.AddScoped<IScheduleRepository,     ScheduleRepository>();
        services.AddScoped<IInstructionRepository,  InstructionRepository>();
        services.AddScoped<IAuditRepository,        AuditRepository>();
        services.AddScoped<IUserRepository,         UserRepository>();
        services.AddScoped<IComplianceRepository,   ComplianceRepository>();
        services.AddScoped<IEmployeeRepository,     EmployeeRepository>();
        services.AddScoped<IBranchLeaderRepository, BranchLeaderRepository>();
        services.AddScoped<IFeedbackRepository,     FeedbackRepository>();

        return services;
    }

    public static IServiceCollection AddFigServices(this IServiceCollection services)
    {
        services.AddScoped<IBranchService,     BranchService>();
        services.AddScoped<IScheduleService,   ScheduleService>();
        services.AddScoped<IInstructionService,InstructionService>();
        services.AddScoped<IAuditService,      AuditService>();
        services.AddScoped<IUserService,       UserService>();
        services.AddScoped<IAuthService,       AuthService>();
        services.AddScoped<IStatusCodeService, StatusCodeService>();
        services.AddScoped<IMonthStateService, MonthStateService>();
        services.AddScoped<IEmployeeService,   EmployeeService>();
        services.AddScoped<IFeedbackService,   FeedbackService>();

        return services;
    }
}
