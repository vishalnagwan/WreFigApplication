namespace Wre.Fig.Domain.Models;

public class MonthLock
{
    public int      Id         { get; set; }
    public int      Year       { get; set; }
    public int      Month      { get; set; }
    public bool     IsOpen     { get; set; } = true;
    public DateTime ModifiedAt { get; set; } = DateTime.UtcNow;
    public string   ModifiedBy { get; set; } = string.Empty;
}
