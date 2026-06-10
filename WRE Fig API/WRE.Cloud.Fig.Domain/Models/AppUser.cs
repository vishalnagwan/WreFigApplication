using Microsoft.AspNetCore.Identity;

namespace WRE.Cloud.Fig.Domain.Models;

public class AppUser : IdentityUser
{
    public string   FullName  { get; set; } = string.Empty;
    public bool     IsActive  { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<AppUserBranch>       UserBranches       { get; set; } = [];
    public ICollection<AppUserResourceType> UserResourceTypes  { get; set; } = [];
}
