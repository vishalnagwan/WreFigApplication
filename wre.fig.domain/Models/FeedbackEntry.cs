namespace Wre.Fig.Domain.Models;

public class FeedbackEntry
{
    public int      Id            { get; set; }
    public string   Page          { get; set; } = string.Empty;   // "Home", "Schedule", etc.
    public string   Category      { get; set; } = string.Empty;
    public string   Comment       { get; set; } = string.Empty;
    public string   UserId        { get; set; } = string.Empty;
    public string   UserName      { get; set; } = string.Empty;
    public DateTime CreatedAt     { get; set; } = DateTime.UtcNow;
    public bool     IsImplemented { get; set; } = false;
}
