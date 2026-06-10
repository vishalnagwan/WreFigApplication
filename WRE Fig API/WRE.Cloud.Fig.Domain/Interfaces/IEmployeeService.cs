using WRE.Cloud.Fig.Domain.Models;

namespace WRE.Cloud.Fig.Domain.Interfaces;

public interface IEmployeeService
{
    Task<List<EmployeeListDto>> GetAllAsync();
    Task<EmployeeListDto?>      GetByIdAsync(int id);
    Task<EmployeeListDto>       CreateAsync(CreateEmployeeDto dto);
    Task                        UpdateAsync(int id, EditEmployeeDto dto);
    Task                        DeactivateAsync(int id);
}
