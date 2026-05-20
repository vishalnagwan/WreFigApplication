namespace Wre.Fig.Api.Models.Entities;

public class AppUserBranch
{
    public string  UserId   { get; set; } = string.Empty;
    public int     BranchId { get; set; }

    public AppUser Branch_User { get; set; } = null!;
    public Branch  Branch      { get; set; } = null!;
}
