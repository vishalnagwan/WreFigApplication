using Wre.Fig.Api.DTOs;

namespace Wre.Fig.Api.Repository.Interfaces;

public interface IUserRepository
{
    Task<List<UserDto>> GetAllAsync();
    Task<UserDto?>      GetByIdAsync(string userId);
    Task UpdateAsync(UserDto dto);
    Task DeleteAsync(string userId);
}
