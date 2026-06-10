using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Protocols;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WRE.Cloud.Fig.Domain.Models;
using WRE.Cloud.Fig.Domain.Interfaces;

namespace WRE.Cloud.Fig.Services;

public class AuthService(
    UserManager<AppUser> userManager,
    IConfiguration config) : IAuthService
{
    // ── Form-based login ──────────────────────────────────────────────────
    public async Task<LoginResponseDto?> LoginAsync(LoginRequestDto dto)
    {
        var user = await userManager.FindByEmailAsync(dto.Email);
        if (user is null || !user.IsActive) return null;

        var passwordValid = await userManager.CheckPasswordAsync(user, dto.Password);
        if (!passwordValid) return null;

        return await BuildTokenResponseAsync(user);
    }

    // ── MSAL: validate Azure token, read claims directly, issue FIG JWT ──
    //
    // No FIG database lookup.  Azure AD is the authority for both identity
    // and role assignment.  Roles are assigned in Azure Portal →
    // Enterprise Applications → your app → Users and groups.
    // ──────────────────────────────────────────────────────────────────────
    public async Task<LoginResponseDto?> LoginWithMicrosoftAsync(string accessToken)
    {
        // 1. Validate the Azure AD access token against Azure JWKS
        var principal = await ValidateAzureTokenAsync(accessToken);
        if (principal is null) return null;

        // 2. Extract identity claims from the validated token
        //    Azure tokens put the UPN / email in preferred_username
        var email = principal.FindFirst("preferred_username")?.Value
                 ?? principal.FindFirst("email")?.Value
                 ?? principal.FindFirst(ClaimTypes.Email)?.Value
                 ?? principal.FindFirst("upn")?.Value;

        var displayName = principal.FindFirst("name")?.Value
                       ?? principal.FindFirst(ClaimTypes.Name)?.Value
                       ?? email;   // fallback to email if no display name

        // Azure object ID — stable unique identifier for the user
        var userId = principal.FindFirst("oid")?.Value
                  ?? principal.FindFirst("sub")?.Value
                  ?? Guid.NewGuid().ToString();

        if (string.IsNullOrWhiteSpace(email)) return null;

        // 3. Extract App Roles from the token
        //    .NET's JwtSecurityTokenHandler maps the JWT "roles" claim to
        //    ClaimTypes.Role during validation.  Check both the mapped type
        //    and the original literal name as a fallback.
        var roles = principal.FindAll(ClaimTypes.Role).Select(c => c.Value).ToList();

        if (roles.Count == 0)
            roles = principal.FindAll("roles").Select(c => c.Value).ToList();

        // Log all claims to help diagnose if roles are still not found
        Console.WriteLine($"[FIG Auth] Claims in token: {string.Join(", ", principal.Claims.Select(c => $"{c.Type}={c.Value}"))}");
        Console.WriteLine($"[FIG Auth] Roles found: [{string.Join(", ", roles)}]");

        var role = roles.FirstOrDefault() ?? string.Empty;

        if (string.IsNullOrWhiteSpace(role))
        {
            // User authenticated with Microsoft but has no App Role assigned.
            // They need to be assigned a role in Azure AD first.
            return null;
        }

        // 4. Issue FIG JWT directly from Azure token claims — no DB lookup.
        // Azure role is already in full form e.g. "wre.fig.Admin" which
        // matches FIG's ROLES constant throughout the application.
        return BuildMsalTokenResponse(userId, email, displayName, role);
    }

    // ── Shared: build FIG JWT for any valid user ──────────────────────────
    private async Task<LoginResponseDto> BuildTokenResponseAsync(AppUser user)
    {
        var roles = await userManager.GetRolesAsync(user);
        // DB stores short names (e.g. "Admin"). Prefix to match the full
        // role names used in ROLES constant and Azure AD App Roles.
        var shortRole = roles.FirstOrDefault() ?? string.Empty;
        var role = !string.IsNullOrEmpty(shortRole) && !shortRole.StartsWith("wre.fig.")
            ? $"wre.fig.{shortRole}"
            : shortRole;

        var jwtKey = config["Jwt:Key"]!;
        var issuer = config["Jwt:Issuer"]!;
        var audience = config["Jwt:Audience"]!;
        var expiryHours = config.GetValue<int>("Jwt:ExpiryHours");

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id),
            new Claim(ClaimTypes.Email,          user.Email ?? string.Empty),
            new Claim("fullname",                user.FullName),
            new Claim(ClaimTypes.Role,           role)
        };

        var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
        var credentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);
        var expiresAt = DateTime.UtcNow.AddHours(expiryHours);

        var token = new JwtSecurityToken(
            issuer: issuer,
            audience: audience,
            claims: claims,
            expires: expiresAt,
            signingCredentials: credentials);

        return new LoginResponseDto
        {
            Token = new JwtSecurityTokenHandler().WriteToken(token),
            UserId = user.Id,
            FullName = user.FullName,
            Email = user.Email ?? string.Empty,
            Role = role,
            ExpiresAt = expiresAt
        };
    }

    // ── Build FIG JWT from Azure AD claims (no DB lookup) ────────────────
    private LoginResponseDto BuildMsalTokenResponse(
        string userId, string email, string displayName, string role)
    {
        var jwtKey     = config["Jwt:Key"]!;
        var issuer     = config["Jwt:Issuer"]!;
        var audience   = config["Jwt:Audience"]!;
        var expiryHours = config.GetValue<int>("Jwt:ExpiryHours");

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, userId),
            new Claim(ClaimTypes.Email,          email),
            new Claim("fullname",                displayName),
            new Claim(ClaimTypes.Role,           role)
        };

        var signingKey  = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
        var credentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);
        var expiresAt   = DateTime.UtcNow.AddHours(expiryHours);

        var token = new JwtSecurityToken(
            issuer:            issuer,
            audience:          audience,
            claims:            claims,
            expires:           expiresAt,
            signingCredentials: credentials);

        return new LoginResponseDto
        {
            Token     = new JwtSecurityTokenHandler().WriteToken(token),
            UserId    = userId,
            FullName  = displayName,
            Email     = email,
            Role      = role,
            ExpiresAt = expiresAt
        };
    }

    // ── Azure AD token validation using JWKS endpoint ─────────────────────
    private async Task<ClaimsPrincipal?> ValidateAzureTokenAsync(string token)
    {
        var tenantId = config["AzureAd:TenantId"]
                          ?? throw new InvalidOperationException("AzureAd:TenantId missing.");
        var audience = config["AzureAd:Audience"]
                          ?? throw new InvalidOperationException("AzureAd:Audience missing.");
        var metadataUrl = $"https://login.microsoftonline.com/{tenantId}/.well-known/openid-configuration";

        try
        {
            // Fetch Azure AD public signing keys dynamically
            var configManager = new ConfigurationManager<OpenIdConnectConfiguration>(
                metadataUrl,
                new OpenIdConnectConfigurationRetriever(),
                new HttpDocumentRetriever());

            var openIdConfig = await configManager.GetConfigurationAsync();

            var validationParams = new TokenValidationParameters
            {
                ValidateIssuer = true,
                // ID tokens are always issued by the v2.0 endpoint
                ValidIssuers =
                [
                    $"https://login.microsoftonline.com/{tenantId}/v2.0",
                ],
                ValidateAudience = true,
                ValidAudience = audience,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                IssuerSigningKeys = openIdConfig.SigningKeys
            };

            var handler = new JwtSecurityTokenHandler();
            return handler.ValidateToken(token, validationParams, out _);
        }
        catch (Exception ex)
        {
            // Token is invalid, expired, tampered, or Azure unreachable
            Console.Error.WriteLine($"Azure token validation failed: {ex.Message}");
            return null;
        }
    }
}