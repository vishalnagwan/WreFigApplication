namespace Wre.Fig.Api.DTOs;

public class MonthLockDto
{
    public int      Id         { get; set; }
    public int      Year       { get; set; }
    public int      Month      { get; set; }
    public bool     IsOpen     { get; set; }
    public DateTime ModifiedAt { get; set; }
    public string   ModifiedBy { get; set; } = string.Empty;
}
