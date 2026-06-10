namespace WRE.Cloud.Fig.Domain.Models;

public class BranchLeader
{
    public int    Id              { get; set; }
    public int    BranchId        { get; set; }
    public string Name            { get; set; } = string.Empty;
    public string JobTitle        { get; set; } = string.Empty;
    public string? WorkMobilePhone { get; set; }
    public string? AltPhone        { get; set; }
    public string? ManagerName     { get; set; }
    public string? Notes           { get; set; }
    public int    SortOrder        { get; set; }

    public Branch? Branch { get; set; }
}
