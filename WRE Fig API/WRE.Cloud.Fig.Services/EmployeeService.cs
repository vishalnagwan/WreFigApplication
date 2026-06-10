using WRE.Cloud.Fig.Domain.Models;
using WRE.Cloud.Fig.Domain.Interfaces;

namespace WRE.Cloud.Fig.Services;

public class EmployeeService(IEmployeeRepository repo) : IEmployeeService
{
    public Task<List<EmployeeListDto>> GetAllAsync()                          => repo.GetAllAsync();
    public Task<EmployeeListDto?>      GetByIdAsync(int id)                   => repo.GetByIdAsync(id);
    public Task<EmployeeListDto>       CreateAsync(CreateEmployeeDto dto)     => repo.CreateAsync(dto);
    public Task                        UpdateAsync(int id, EditEmployeeDto dto) => repo.UpdateAsync(id, dto);
    public Task                        DeactivateAsync(int id)                => repo.DeactivateAsync(id);
}
