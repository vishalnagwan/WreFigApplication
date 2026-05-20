using Wre.Fig.Api.DTOs;

namespace Wre.Fig.Api.Repository.Interfaces;

public interface IEmployeeRepository
{
    Task<List<EmployeeListDto>> GetAllAsync();
    Task<EmployeeListDto?>      GetByIdAsync(int id);
    Task<EmployeeListDto>       CreateAsync(CreateEmployeeDto dto);
    Task                        UpdateAsync(int id, EditEmployeeDto dto);
    Task                        DeactivateAsync(int id);
}
