using Wre.Fig.Api.DTOs;

namespace Wre.Fig.Api.Services.Interfaces;

public interface IUserService
{
    Task<List<UserListDto>> GetAllAsync();
    Task<UserListDto?>      GetByIdAsync(string userId);
    Task                    CreateAsync(CreateUserDto dto);
    Task                    UpdateAsync(string id, EditUserDto dto);
    Task                    DeleteAsync(string userId);
}
