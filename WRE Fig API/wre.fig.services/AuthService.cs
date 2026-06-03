using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Wre.Fig.Domain.Models;
using Wre.Fig.Domain.Interfaces;

namespace Wre.Fig.Services;

public class AuthService(UserManager<AppUser> userManager, IConfiguration config) : IAuthService
{
    public async Task<LoginResponseDto?> LoginAsync(LoginRequestDto dto)
    {
        var user = await userManager.FindByEmailAsync(dto.Email);
        if (user is null || !user.IsActive)
            return null;

        var passwordValid = await userManager.CheckPasswordAsync(user, dto.Password);
        if (!passwordValid)
            return null;

        var roles = await userManager.GetRolesAsync(user);
        var role   = roles.FirstOrDefault() ?? string.Empty;

        var jwtKey      = config["Jwt:Key"]!;
        var issuer      = config["Jwt:Issuer"]!;
        var audience    = config["Jwt:Audience"]!;
        var expiryHours = config.GetValue<int>("Jwt:ExpiryHours");

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id),
            new Claim(ClaimTypes.Email,          user.Email ?? string.Empty),
            new Claim("fullname",                user.FullName),
            new Claim(ClaimTypes.Role,           role)
        };

        var signingKey  = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
        var credentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);
        var expiresAt   = DateTime.UtcNow.AddHours(expiryHours);

        var token = new JwtSecurityToken(
            issuer:             issuer,
            audience:           audience,
            claims:             claims,
            expires:            expiresAt,
            signingCredentials: credentials);

        return new LoginResponseDto
        {
            Token     = new JwtSecurityTokenHandler().WriteToken(token),
            UserId    = user.Id,
            FullName  = user.FullName,
            Email     = user.Email ?? string.Empty,
            Role      = role,
            ExpiresAt = expiresAt
        };
    }
}
