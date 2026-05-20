namespace Wre.Fig.Api.DTOs;

public class AuditLogDto
{
    public int      Id          { get; set; }
    public string   Action      { get; set; } = string.Empty;
    public string   EntityType  { get; set; } = string.Empty;
    public string   EntityId    { get; set; } = string.Empty;
    public string   Description { get; set; } = string.Empty;
    public string   PerformedBy { get; set; } = string.Empty;
    public DateTime PerformedAt { get; set; }
    public int?     BranchId    { get; set; }
}

public class UserDto
{
    public string        Id                { get; set; } = string.Empty;
    public string        FullName          { get; set; } = string.Empty;
    public string        Email             { get; set; } = string.Empty;
    public string        Role              { get; set; } = string.Empty;
    public bool          IsActive          { get; set; } = true;
    public List<string>  ResourceTypeNames { get; set; } = [];
    public List<int>     BranchIds         { get; set; } = [];
    public List<string>  BranchNames       { get; set; } = [];
}
