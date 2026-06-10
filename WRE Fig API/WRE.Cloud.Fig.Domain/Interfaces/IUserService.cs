using WRE.Cloud.Fig.Domain.Models;

namespace WRE.Cloud.Fig.Domain.Interfaces;

public interface IUserService
{
    Task<List<UserListDto>> GetAllAsync();
    Task<UserListDto?>      GetByIdAsync(string userId);
    Task                    CreateAsync(CreateUserDto dto);
    Task                    UpdateAsync(string id, EditUserDto dto);
    Task                    DeleteAsync(string userId);
}
