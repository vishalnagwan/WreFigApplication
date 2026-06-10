namespace WRE.Cloud.Fig.Domain;

/// <summary>
/// Application-wide constants shared across all layers.
/// </summary>
public static class Constants
{
    public static class Roles
    {
        public const string Admin              = "Admin";
        public const string FieldSupervisor    = "FieldSupervisor";
        public const string DispatchSupervisor = "DispatchSupervisor";
        public const string Planner            = "Planner";
        public const string Dispatcher         = "Dispatcher";
        public const string OtherEmployee      = "OtherEmployee";

        public static readonly string[] All =
        [
            Admin, FieldSupervisor, DispatchSupervisor,
            Planner, Dispatcher, OtherEmployee
        ];

        public static readonly string[] EditRoles =
        [
            Admin, FieldSupervisor, DispatchSupervisor, Planner, Dispatcher
        ];
    }

    public static class Schedule
    {
        public const string EmptyStatusCode = "—";
        public const string DefaultAmCode   = "WA";
        public const string DefaultPmCode   = "WP";
    }

    public static class Paging
    {
        public const int DefaultPageSize = 10;
        public const int MaxPageSize     = 100;
    }
}
