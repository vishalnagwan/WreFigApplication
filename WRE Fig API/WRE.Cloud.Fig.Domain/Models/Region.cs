namespace WRE.Cloud.Fig.Domain.Models;

public class Region
{
    public int    Id       { get; set; }
    public string Name     { get; set; } = string.Empty;

    public ICollection<Branch> Branches { get; set; } = [];
}
