using Wre.Fig.Api.DTOs;
using Wre.Fig.Api.Repository.Interfaces;
using Wre.Fig.Api.Services.Interfaces;

namespace Wre.Fig.Api.Services;

public class UserService(IUserRepository repo) : IUserService
{
    public Task<List<UserListDto>> GetAllAsync()          => repo.GetAllAsync();
    public Task<UserListDto?>      GetByIdAsync(string id) => repo.GetByIdAsync(id);
    public Task                    CreateAsync(CreateUserDto dto) => repo.CreateAsync(dto);
    public Task                    UpdateAsync(string id, EditUserDto dto) => repo.UpdateAsync(id, dto);
    public Task                    DeleteAsync(string userId) => repo.DeleteAsync(userId);
}
