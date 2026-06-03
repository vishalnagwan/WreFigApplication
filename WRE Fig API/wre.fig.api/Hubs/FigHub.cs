using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace Wre.Fig.Api.Hubs;

/// <summary>
/// Real-time hub for:
///   - Branch instruction updates (broadcast to all viewers of a branch)
///   - Bell / alert notifications (broadcast to relevant roles)
/// </summary>
[Authorize]
public class FigHub : Hub
{
    /// <summary>Join the SignalR group for a specific branch (called from Angular on page load).</summary>
    public async Task JoinBranch(int branchId) =>
        await Groups.AddToGroupAsync(Context.ConnectionId, BranchGroup(branchId));

    /// <summary>Leave the branch group (called from Angular on page destroy).</summary>
    public async Task LeaveBranch(int branchId) =>
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, BranchGroup(branchId));

    // ── Server-side broadcast methods (called from controllers/services) ──────

    /// <summary>Notify all viewers of a branch that instructions were updated.</summary>
    public static string InstructionsUpdatedEvent => "instructionsUpdated";

    /// <summary>Notify relevant users of a new alert.</summary>
    public static string AlertCreatedEvent => "alertCreated";

    private static string BranchGroup(int branchId) => $"branch-{branchId}";
}
