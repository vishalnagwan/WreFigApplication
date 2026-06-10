namespace WRE.Cloud.Fig.Domain.Models;

public class BranchInstructionsDto
{
    public int                      BranchId { get; set; }
    public List<SectionDto>         Sections { get; set; } = [];
}

public class SectionDto
{
    public string             Key        { get; set; } = string.Empty;   // Angular expects "key"
    public string             Title      { get; set; } = string.Empty;   // Angular expects "title"
    public string             ShortTitle { get; set; } = string.Empty;
    public int                Position  { get; set; }                    // 0=Top, 1=Bottom (int not string)
    public List<LineDto>      Lines     { get; set; } = [];
}

public class LineDto
{
    public int      Id            { get; set; }
    public string   Content       { get; set; } = string.Empty;
    public bool     IsHighlighted { get; set; }
    public int      SortOrder     { get; set; }
    public string?  UpdatedByName { get; set; }
    public DateTime UpdatedAt     { get; set; }
}
