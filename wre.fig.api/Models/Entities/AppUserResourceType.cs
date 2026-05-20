namespace Wre.Fig.Api.Models.Entities;

public class AppUserResourceType
{
    public string  UserId           { get; set; } = string.Empty;
    public string  ResourceTypeName { get; set; } = string.Empty;

    public AppUser User { get; set; } = null!;
}
