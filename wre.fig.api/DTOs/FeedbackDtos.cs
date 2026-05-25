namespace Wre.Fig.Api.DTOs;

public class CreateFeedbackDto
{
    public string Page     { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string Comment  { get; set; } = string.Empty;
}

public class FeedbackItemDto
{
    public int      Id            { get; set; }
    public string   Page          { get; set; } = string.Empty;
    public string   Category      { get; set; } = string.Empty;
    public string   Comment       { get; set; } = string.Empty;
    public string   UserName      { get; set; } = string.Empty;
    public DateTime CreatedAt     { get; set; }
    public bool     IsImplemented { get; set; }
}
