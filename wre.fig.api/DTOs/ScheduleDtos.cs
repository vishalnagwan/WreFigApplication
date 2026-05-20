namespace Wre.Fig.Api.DTOs;

// ── Grid response ──────────────────────────────────────────────────────────────
public class ScheduleGridDto
{
    public int                      BranchId { get; set; }
    public int                      Year     { get; set; }
    public int                      Month    { get; set; }
    public List<DayHeaderDto>       Days     { get; set; } = [];
    public List<EmployeeScheduleRowDto> Rows { get; set; } = [];   // Angular expects "rows"
}

public class DayHeaderDto
{
    public int    Day       { get; set; }
    public string DayAbbr   { get; set; } = string.Empty;   // "Mon", "Tue" …
    public bool   IsWeekend { get; set; }
}

public class EmployeeScheduleRowDto
{
    public int                      EmployeeId       { get; set; }
    public string                   Name             { get; set; } = string.Empty;
    public string                   DefaultShift     { get; set; } = string.Empty;
    public string?                  JobTitle         { get; set; }
    public string?                  ResourceCategory { get; set; }
    public string?                  TruckAssignment  { get; set; }
    public string?                  TruckId          { get; set; }
    public string?                  ManagerName      { get; set; }
    public string?                  WorkPhone        { get; set; }
    public string?                  WorkMobilePhone  { get; set; }
    public Dictionary<int, DayCellDto> Cells        { get; set; } = [];
}

public class DayCellDto
{
    public string StatusCode { get; set; } = "—";
    public bool   HasNote    { get; set; }
    public bool   IsNew      { get; set; }
}

// ── Cell update (Angular sends { employeeId, date:"2026-05-01", statusCode }) ──
public class UpsertCellRequest
{
    public int    EmployeeId { get; set; }
    public string Date       { get; set; } = string.Empty;   // "yyyy-MM-dd"
    public string StatusCode { get; set; } = "—";
}

// ── Note (Angular sends { employeeId, date:"2026-05-01", note, statusCode }) ──
public class UpsertNoteRequest
{
    public int     EmployeeId { get; set; }
    public string  Date       { get; set; } = string.Empty;   // "yyyy-MM-dd"
    public string? Note       { get; set; }
    public string? StatusCode { get; set; }
}

// ── Note response (GET note) ──
public class NoteResponse
{
    public string? Note { get; set; }
}

// ── Kept for internal bulk use ─────────────────────────────────────────────────
public class BulkUpdateDto
{
    public int       BranchId    { get; set; }
    public List<int> EmployeeIds { get; set; } = [];
    public int       Year        { get; set; }
    public int       Month       { get; set; }
    public int       Day         { get; set; }
    public string?   StatusCode  { get; set; }
}
