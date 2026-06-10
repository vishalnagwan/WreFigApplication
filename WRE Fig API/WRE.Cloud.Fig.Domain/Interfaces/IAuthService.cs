using Wre.Fig.Domain.Models;

namespace Wre.Fig.Domain.Interfaces;

public interface IAuthService
{
    Task<LoginResponseDto?> LoginAsync(LoginRequestDto dto);
    Task<LoginResponseDto?> LoginWithMicrosoftAsync(string accessToken);
}
