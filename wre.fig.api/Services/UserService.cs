using Wre.Fig.Api.DTOs;
using Wre.Fig.Api.Repository.Interfaces;
using Wre.Fig.Api.Services.Interfaces;

namespace Wre.Fig.Api.Services;

public class UserService(IUserRepository repo) : IUserService
{
    public Task<List<UserDto>> GetAllAsync()
        => repo.GetAllAsync();

    public Task<UserDto?> GetByIdAsync(string userId)
        => repo.GetByIdAsync(userId);

    public Task UpdateAsync(UserDto dto)
        => repo.UpdateAsync(dto);

    public Task DeleteAsync(string userId)
        => repo.DeleteAsync(userId);
}
