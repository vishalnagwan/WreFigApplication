using Wre.Fig.Api.DTOs;

namespace Wre.Fig.Api.Services.Interfaces;

public interface IAuthService
{
    Task<LoginResponseDto?> LoginAsync(LoginRequestDto dto);
}
