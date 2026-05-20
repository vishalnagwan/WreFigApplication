using Wre.Fig.Api.DTOs;

namespace Wre.Fig.Api.Services.Interfaces;

public interface IEmployeeService
{
    Task<List<EmployeeListDto>> GetAllAsync();
    Task<EmployeeListDto?>      GetByIdAsync(int id);
    Task<EmployeeListDto>       CreateAsync(CreateEmployeeDto dto);
    Task                        UpdateAsync(int id, EditEmployeeDto dto);
    Task                        DeactivateAsync(int id);
}
