namespace WRE.Cloud.Fig.Domain.Models;

public class Branch
{
    public int    Id            { get; set; }
    public string Name          { get; set; } = string.Empty;
    public string City          { get; set; } = string.Empty;
    public string State         { get; set; } = string.Empty;
    public int    RegionId      { get; set; }
    public Region Region        { get; set; } = null!;
    public bool   IsAcquisition { get; set; }
    public bool   IsActive      { get; set; } = true;

    public ICollection<Employee>       Employees    { get; set; } = [];
    public ICollection<AppUserBranch>  UserBranches { get; set; } = [];
}
