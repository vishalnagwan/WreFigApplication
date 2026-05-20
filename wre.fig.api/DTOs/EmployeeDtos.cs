namespace Wre.Fig.Api.DTOs;

public class EmployeeListDto
{
    public int      Id              { get; set; }
    public string   Name            { get; set; } = string.Empty;
    public string?  Email           { get; set; }
    public string?  JobTitle        { get; set; }
    public string[] ResourceTypes   { get; set; } = [];
    public string   DefaultShift    { get; set; } = "AM";
    public string?  TruckAssignment { get; set; }
    public string?  TruckId         { get; set; }
    public string?  ManagerName     { get; set; }
    public string?  WorkPhone       { get; set; }
    public string?  WorkMobilePhone { get; set; }
    public bool     IsActive        { get; set; }
    public int      BranchId        { get; set; }
    public string   BranchName      { get; set; } = string.Empty;
}

public class CreateEmployeeDto
{
    public string   Name            { get; set; } = string.Empty;
    public string?  Email           { get; set; }
    public string?  JobTitle        { get; set; }
    public string[] ResourceTypes   { get; set; } = [];
    public string   DefaultShift    { get; set; } = "AM";
    public string?  TruckAssignment { get; set; }
    public string?  TruckId         { get; set; }
    public string?  ManagerName     { get; set; }
    public string?  WorkPhone       { get; set; }
    public string?  WorkMobilePhone { get; set; }
    public int      BranchId        { get; set; }
}

public class EditEmployeeDto
{
    public string   Name            { get; set; } = string.Empty;
    public string?  Email           { get; set; }
    public string?  JobTitle        { get; set; }
    public string[] ResourceTypes   { get; set; } = [];
    public string   DefaultShift    { get; set; } = "AM";
    public string?  TruckAssignment { get; set; }
    public string?  TruckId         { get; set; }
    public string?  ManagerName     { get; set; }
    public string?  WorkPhone       { get; set; }
    public string?  WorkMobilePhone { get; set; }
    public int      BranchId        { get; set; }
    public bool     IsActive        { get; set; }
}
