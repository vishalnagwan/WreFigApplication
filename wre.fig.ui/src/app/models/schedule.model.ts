export interface ScheduleGridDto {
  branchId: number;
  year: number;
  month: number;
  days: DayHeaderDto[];
  rows: EmployeeScheduleRowDto[];
}

export interface DayHeaderDto {
  day: number;
  dayAbbr: string;
  isWeekend: boolean;
}

export interface EmployeeScheduleRowDto {
  employeeId: number;
  name: string;
  defaultShift: string;
  jobTitle: string | null;
  resourceCategory: string | null;
  truckAssignment: string | null;
  truckId: string | null;
  managerName: string | null;
  workPhone: string | null;
  workMobilePhone: string | null;
  cells: { [day: number]: DayCellDto };
}

export interface DayCellDto {
  statusCode: string;
  hasNote: boolean;
  isNew: boolean;
}

export interface StatusCodeDto {
  code: string;
  label: string;
  cssClass: string;
  description: string;
  sortOrder: number;
  showInPaintBar: boolean;
  showInPicker: boolean;
  // Status-group fields (null when the code is ungrouped) — drive the
  // working / not-working / on-call grouping in the schedule paint bar + legend.
  groupKey:        string | null;
  groupLabel:      string | null;
  groupColorClass: string | null;
  groupSortOrder:  number | null;
}

export interface NoteResponse {
  note: string | null;
}

export interface UpsertCellRequest {
  employeeId: number;
  date: string;
  statusCode: string;
}

export interface UpsertNoteRequest {
  employeeId: number;
  date: string;
  note: string | null;
  statusCode: string | null;
}
