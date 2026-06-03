using Microsoft.EntityFrameworkCore;
using Wre.Fig.Data;
using Wre.Fig.Domain.Models;
using Wre.Fig.Domain.Interfaces;

namespace Wre.Fig.Data.Repositories;

public class EmployeeRepository(AppDbContext db) : IEmployeeRepository
{
    // ResourceCategory stored as comma-separated string: "Technician,Pumping"
    private static string[] ParseTypes(string? raw)
        => string.IsNullOrWhiteSpace(raw)
            ? []
            : raw.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);

    private static string JoinTypes(string[] types)
        => string.Join(",", types);

    private static EmployeeListDto ToDto(Employee e) => new()
    {
        Id              = e.Id,
        Name            = e.Name,
        Email           = e.Email,
        JobTitle        = e.JobTitle,
        ResourceTypes   = ParseTypes(e.ResourceCategory),
        DefaultShift    = e.DefaultShift,
        TruckAssignment = e.TruckAssignment,
        TruckId         = e.TruckId,
        ManagerName     = e.ManagerName,
        WorkPhone       = e.WorkPhone,
        WorkMobilePhone = e.WorkMobilePhone,
        IsActive        = e.IsActive,
        BranchId        = e.BranchId,
        BranchName      = e.Branch?.Name ?? string.Empty,
    };

    public async Task<List<EmployeeListDto>> GetAllAsync()
    {
        var list = await db.Employees
            .Include(e => e.Branch)
            .OrderBy(e => e.Branch.Name)
            .ThenBy(e => e.Name)
            .ToListAsync();
        return list.Select(ToDto).ToList();
    }

    public async Task<EmployeeListDto?> GetByIdAsync(int id)
    {
        var e = await db.Employees
            .Include(e => e.Branch)
            .FirstOrDefaultAsync(e => e.Id == id);
        return e is null ? null : ToDto(e);
    }

    public async Task<EmployeeListDto> CreateAsync(CreateEmployeeDto dto)
    {
        var emp = new Employee
        {
            Name             = dto.Name,
            Email            = dto.Email,
            JobTitle         = dto.JobTitle,
            ResourceCategory = JoinTypes(dto.ResourceTypes),
            DefaultShift     = dto.DefaultShift,
            TruckAssignment  = dto.TruckAssignment,
            TruckId          = dto.TruckId,
            ManagerName      = dto.ManagerName,
            WorkPhone        = dto.WorkPhone,
            WorkMobilePhone  = dto.WorkMobilePhone,
            BranchId         = dto.BranchId,
            IsActive         = true,
        };
        db.Employees.Add(emp);
        await db.SaveChangesAsync();
        await db.Entry(emp).Reference(e => e.Branch).LoadAsync();
        return ToDto(emp);
    }

    public async Task UpdateAsync(int id, EditEmployeeDto dto)
    {
        var emp = await db.Employees.FindAsync(id);
        if (emp is null) return;

        emp.Name             = dto.Name;
        emp.Email            = dto.Email;
        emp.JobTitle         = dto.JobTitle;
        emp.ResourceCategory = JoinTypes(dto.ResourceTypes);
        emp.DefaultShift     = dto.DefaultShift;
        emp.TruckAssignment  = dto.TruckAssignment;
        emp.TruckId          = dto.TruckId;
        emp.ManagerName      = dto.ManagerName;
        emp.WorkPhone        = dto.WorkPhone;
        emp.WorkMobilePhone  = dto.WorkMobilePhone;
        emp.BranchId         = dto.BranchId;
        emp.IsActive         = dto.IsActive;

        await db.SaveChangesAsync();
    }

    public async Task DeactivateAsync(int id)
    {
        var emp = await db.Employees.FindAsync(id);
        if (emp is null) return;
        emp.IsActive = false;
        await db.SaveChangesAsync();
    }
}
