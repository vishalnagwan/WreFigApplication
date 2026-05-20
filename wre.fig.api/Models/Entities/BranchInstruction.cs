namespace Wre.Fig.Api.Models.Entities;

public class BranchInstruction
{
    public int      Id            { get; set; }
    public int      BranchId      { get; set; }
    public Branch   Branch        { get; set; } = null!;
    public int      Position      { get; set; }   // 0 = Top, 1 = Bottom
    public string   Section       { get; set; } = string.Empty;
    public string   Content       { get; set; } = string.Empty;
    public bool     IsHighlighted { get; set; }
    public int      SortOrder     { get; set; }
    public DateTime UpdatedAt     { get; set; } = DateTime.UtcNow;
    public string   UpdatedById   { get; set; } = string.Empty;
    public string   UpdatedByName { get; set; } = string.Empty;
}
