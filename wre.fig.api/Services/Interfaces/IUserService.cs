using Wre.Fig.Api.DTOs;

namespace Wre.Fig.Api.Services.Interfaces;

public interface IUserService
{
    Task<List<UserDto>> GetAllAsync();
    Task<UserDto?>      GetByIdAsync(string userId);
    Task UpdateAsync(UserDto dto);
    Task DeleteAsync(string userId);
}
