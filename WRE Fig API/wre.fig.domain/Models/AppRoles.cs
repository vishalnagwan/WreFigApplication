namespace Wre.Fig.Domain.Models;

public static class AppRoles
{
    // ── Role constants — must match Azure AD App Role values and ROLES constant in Angular ──
    public const string Admin              = "wre.fig.Admin";
    public const string FieldSupervisor    = "wre.fig.FieldSupervisor";
    public const string DispatchSupervisor = "wre.fig.DispatchSupervisor";
    public const string Planner            = "wre.fig.Planner";
    public const string Dispatcher         = "wre.fig.Dispatcher";
    public const string OtherEmployee      = "wre.fig.OtherEmployee";
    public const string Technician         = "wre.fig.Technician";

    public static readonly string[] All =
        [Admin, FieldSupervisor, DispatchSupervisor, Planner, Dispatcher, OtherEmployee, Technician];

    // ── Feature access arrays (used in service/repo logic) ─────────────────

    /// <summary>Can write schedule cells and branch instructions.</summary>
    public static readonly string[] WriteRoles =
        [Admin, FieldSupervisor, DispatchSupervisor, Planner, Dispatcher];

    /// <summary>Can write supervisor notes.</summary>
    public static readonly string[] NoteRoles =
        [Admin, FieldSupervisor, DispatchSupervisor, Planner, Dispatcher];

    /// <summary>Can view the Compliance report.</summary>
    public static readonly string[] ComplianceRoles =
        [Admin, FieldSupervisor, DispatchSupervisor, Planner, Dispatcher];

    /// <summary>Can view Alerts.</summary>
    public static readonly string[] AlertRoles =
        [Admin, FieldSupervisor, DispatchSupervisor, Planner, Dispatcher];

    /// <summary>Month rollover restricted to Admin and DispatchSupervisor.</summary>
    public static readonly string[] RolloverRoles =
        [Admin, DispatchSupervisor];

    /// <summary>Can edit branch instructions.</summary>
    public static readonly string[] InstructionEditRoles =
        [Admin, FieldSupervisor, DispatchSupervisor, Planner, Dispatcher];

    /// <summary>
    /// Sees ALL branches regardless of UserBranches assignments.
    /// Only Admin has unrestricted global view.
    /// All other roles see exactly the branches assigned to them in UserBranches.
    /// </summary>
    public static readonly string[] GlobalViewRoles =
        [Admin];

    /// <summary>Sees ALL alerts regardless of branch assignments. Admin only.</summary>
    public static readonly string[] GlobalAlertRoles =
        [Admin];

    // ── Compile-time policy strings for [Authorize(Roles = ...)] ───────────
    // These must be const so they can be used as attribute arguments.
    // OtherEmployee is excluded from all write and feature-specific policies.

    /// <summary>Write schedule cells and branch instructions.</summary>
    public const string WritePolicy =
        Admin + "," + FieldSupervisor + "," + DispatchSupervisor + "," + Planner + "," + Dispatcher;

    /// <summary>Write supervisor notes.</summary>
    public const string NotePolicy =
        Admin + "," + FieldSupervisor + "," + DispatchSupervisor + "," + Planner + "," + Dispatcher;

    /// <summary>Access compliance report endpoint.</summary>
    public const string CompliancePolicy =
        Admin + "," + FieldSupervisor + "," + DispatchSupervisor + "," + Planner + "," + Dispatcher;

    /// <summary>Access alerts endpoint.</summary>
    public const string AlertPolicy =
        Admin + "," + FieldSupervisor + "," + DispatchSupervisor + "," + Planner + "," + Dispatcher;

    /// <summary>Edit branch instructions.</summary>
    public const string InstructionWritePolicy =
        Admin + "," + FieldSupervisor + "," + DispatchSupervisor + "," + Planner + "," + Dispatcher;
}
