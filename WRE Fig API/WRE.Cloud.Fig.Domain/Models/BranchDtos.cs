namespace WRE.Cloud.Fig.Domain.Models;

public class BranchSummaryDto
{
    public int       BranchId      { get; set; }
    public string    BranchName    { get; set; } = string.Empty;
    public string    City          { get; set; } = string.Empty;
    public string    State         { get; set; } = string.Empty;
    public string    RegionName    { get; set; } = string.Empty;
    public bool      IsAcquisition { get; set; }
    public int       DriverCount   { get; set; }
    public double    FillRate      { get; set; }
    public DateTime? LastUpdated   { get; set; }
    public bool      HasNotes      { get; set; }
    public string    Status        { get; set; } = "green";   // green | amber | red | acquisition
}

public class BranchDetailDto
{
    public int    BranchId   { get; set; }
    public string BranchName { get; set; } = string.Empty;
    public string City       { get; set; } = string.Empty;
    public string State      { get; set; } = string.Empty;
    public string RegionName { get; set; } = string.Empty;
    public string Phone      { get; set; } = string.Empty;
}

public class BranchListItemDto
{
    public int    Id   { get; set; }
    public string Name { get; set; } = string.Empty;
}

public class ComplianceDto
{
    public int    Year               { get; set; }
    public int    Month              { get; set; }
    public double AverageFillRate    { get; set; }
    public int    UpToDateCount      { get; set; }
    public int    BelowThresholdCount { get; set; }
    public List<ComplianceRowDto> Rows { get; set; } = [];
}

public class ComplianceRowDto
{
    public int      BranchId      { get; set; }
    public string   BranchName    { get; set; } = string.Empty;
    public string   RegionName    { get; set; } = string.Empty;
    public double   FillRate      { get; set; }
    public int      DaysComplete  { get; set; }
    public int      TotalWorkdays { get; set; }
    public DateTime? LastUpdated  { get; set; }
    public string   Status        { get; set; } = "green";
}
