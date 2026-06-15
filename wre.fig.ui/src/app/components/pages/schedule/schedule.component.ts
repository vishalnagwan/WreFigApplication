import {
  Component, OnInit, OnDestroy, HostListener, ViewChild, inject
} from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { FormsModule }                    from '@angular/forms';
import { ActivatedRoute, RouterModule }   from '@angular/router';
import { ScheduleService }                from '../../../services/schedule.service';
import { BranchService }                  from '../../../services/branch.service';
import { AuthService }                    from '../../../services/auth.service';
import { ScheduleGridDto, EmployeeScheduleRowDto, DayCellDto, StatusCodeDto } from '../../../models/schedule.model';
import { BranchSummaryDto }               from '../../../models/branch.model';
import { BranchInstructionsDto }          from '../../../models/instruction.model';
import { InstructionService }             from '../../../services/instruction.service';
import { FillBarComponent }               from '../../shared/fill-bar/fill-bar.component';
import { ShiftChipComponent }             from '../../shared/shift-chip/shift-chip.component';
import { DayDetailPanelComponent }        from '../../shared/day-detail-panel/day-detail-panel.component';
import { BranchInstructionsComponent }    from '../../shared/branch-instructions/branch-instructions.component';
import { BranchInstructionEditorComponent } from '../../shared/branch-instruction-editor/branch-instruction-editor.component';
import { ROLES }                          from '../../../constant';
import { BranchLeaderService, BranchLeader, UpsertBranchLeader } from '../../../services/branch-leader.service';

const WRITE_ROLES = [ROLES.Admin, ROLES.FieldSupervisor, ROLES.DispatchSupervisor, ROLES.Planner, ROLES.Dispatcher];
const NOTE_ROLES  = [ROLES.Admin, ROLES.FieldSupervisor, ROLES.DispatchSupervisor, ROLES.Planner, ROLES.Dispatcher];

@Component({
  selector:   'app-schedule',
  standalone: true,
  imports: [
    CommonModule, TitleCasePipe, FormsModule, RouterModule,
    FillBarComponent, ShiftChipComponent,
    DayDetailPanelComponent, BranchInstructionsComponent,
    BranchInstructionEditorComponent
  ],
  template: `
<!-- Branch header -->
<div class="branch-header">
  <div class="branch-header-left">
    <a routerLink="/" class="btn-ghost btn-sm">← All Field Offices</a>
    <h2>{{summary ? summary.state + ' — ' + summary.branchName : 'Loading...'}}</h2>
    @if (summary) {
      <span class="status-pill" [class]="summary!.status || ''">
        {{statusLabel}}
      </span>
    }
  </div>
  <div class="branch-header-right">
    <div class="month-nav-btns">
      <button class="btn-icon month-nav-arrow" (click)="prevMonth()">‹</button>
      <button class="month-nav-pill active">{{thisMonthLabel}}</button>
      <button class="month-nav-pill" (click)="nextMonth()" [disabled]="isMaxMonth">{{nextMonthLabel}}</button>
      <button class="btn-icon month-nav-arrow" (click)="nextMonth()" [disabled]="isMaxMonth">›</button>
    </div>
  </div>
</div>

<!-- Leadership pill (same visual pattern as instruction chips) -->
@if (leaders.length > 0) {
  <div class="instr-bar">
    <span class="instr-chip"
      [class.active]="leadershipExpanded"
      (click)="leadershipExpanded = !leadershipExpanded">
      LEADERSHIP
      <span class="instr-badge">{{leaders.length}}</span>
    </span>
  </div>
}

<!-- Leadership popover -->
@if (leadershipExpanded && leaders.length > 0) {
  <div class="instr-popover">
    <div class="instr-popover-hdr">
      Leadership Information
      <button class="btn-icon" style="color:#fff;font-size:.8rem;" (click)="leadershipExpanded = false">✕</button>
    </div>
    <div class="instr-popover-body" style="overflow-x:auto;padding:0;">
      <table class="leadership-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Job Title</th>
            <th>Mobile</th>
            <th>Alt Phone</th>
            <th>Manager</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          @for (ldr of leaders; track ldr) {
            <tr>
              <td class="ldr-name">{{ldr.name}}</td>
              <td class="ldr-info">{{ldr.jobTitle || '—'}}</td>
              <td class="ldr-info">{{formatPhone(ldr.workMobilePhone)}}</td>
              <td class="ldr-info">{{formatPhone(ldr.altPhone)}}</td>
              <td class="ldr-info">{{ldr.managerName || '—'}}</td>
              <td class="ldr-info ldr-notes">{{ldr.notes || '—'}}</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  </div>
}

<!-- Leader editor modal -->
@if (leaderEditorOpen) {
  <div class="modal-backdrop" (click)="closeLeaderEditor()"></div>
}
@if (leaderEditorOpen) {
  <div class="modal" style="max-width:480px;">
    <div class="modal-header">
      <span>{{editingLeader ? 'Edit Leader' : 'Add Leader'}}</span>
      <button class="btn-icon" (click)="closeLeaderEditor()">✕</button>
    </div>
    <div class="modal-body">
      <div class="form-group">
        <label>Name *</label>
        <input class="form-control" [(ngModel)]="leaderForm.name" placeholder="Full name" />
      </div>
      <div class="form-group">
        <label>Job Title *</label>
        <input class="form-control" [(ngModel)]="leaderForm.jobTitle" placeholder="e.g. Pumping Supervisor" />
      </div>
      <div class="form-group">
        <label>Mobile Phone</label>
        <input class="form-control" [(ngModel)]="leaderForm.workMobilePhone" placeholder="(555) 555-5555" />
      </div>
      <div class="form-group">
        <label>Alt Phone</label>
        <input class="form-control" [(ngModel)]="leaderForm.altPhone" placeholder="Optional" />
      </div>
      <div class="form-group">
        <label>Manager Name</label>
        <input class="form-control" [(ngModel)]="leaderForm.managerName" placeholder="Reports to" />
      </div>
      <div class="form-group">
        <label>Notes</label>
        <input class="form-control" [(ngModel)]="leaderForm.notes" placeholder="Optional notes" />
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn-ghost" (click)="closeLeaderEditor()">Cancel</button>
      <button class="btn-primary" (click)="saveLeader()" [disabled]="!leaderForm.name || !leaderForm.jobTitle">Save</button>
    </div>
  </div>
}

<!-- Instructions chip strip -->
@if (branchId) {
  <app-branch-instructions
    #instrStrip
    [branchId]="branchId"
    [canEdit]="canInstructionEdit"
    (editRequested)="openInstructionEditor()">
  </app-branch-instructions>
}

<!-- Fill bar -->
@if (grid && summary && !summary.isAcquisition) {
  <div style="margin-bottom:.75rem;">
    <app-fill-bar [pct]="computedFillRate"></app-fill-bar>
  </div>
}

<!-- Paint toolbar -->
@if (canEdit) {
  <div class="paint-toolbar">
    @for (sc of paintCodes; track sc) {
      <app-shift-chip
        [code]="sc.code"
        [statusCodes]="statusCodes"
        [class.active]="paintMode === sc.code"
        (click)="setPaintMode(sc.code)">
      </app-shift-chip>
    }
    <button class="btn-ghost btn-sm" [class.active]="paintMode === 'clear'" (click)="setPaintMode('clear')">Clear</button>
    @if (selectedRows.size > 0) {
      <span style="font-size:.78rem;color:var(--ink-light);">
        {{selectedRows.size}} row(s) selected
      </span>
    }
    @if (paintMode) {
      <span class="paint-hint">
        Click a cell to paint. Esc to cancel.
      </span>
    }
  </div>
}

<!-- Schedule table -->
@if (grid) {
  <div class="schedule-table-wrap">
    <table class="schedule-table">
      <thead>
        <tr>
          @if (canEdit) {
            <th class="cb-col"></th>
          }
          <th class="emp-col">Technician</th>
          <th class="shift-col">Shift</th>
          <th class="jobtitle-col">Job Title</th>
          <th class="resource-col">Resource Type</th>
          <th class="manager-col">Manager</th>
          <th class="mobile-col">Mobile</th>
          @for (d of grid.days; track d) {
            <th class="date-col" [class.weekend]="d.isWeekend">
              <div class="day-hdr">
                <span class="day-abbr">{{d.dayAbbr | titlecase}}</span>
                <span class="day-num">{{d.day}}</span>
              </div>
            </th>
          }
        </tr>
      </thead>
      <tbody>
        @for (row of grid.rows; track row) {
          <tr
            [class.selected-row]="selectedRows.has(row.employeeId)">
            @if (canEdit) {
              <td class="cb-col">
                <input type="checkbox"
                  [checked]="selectedRows.has(row.employeeId)"
                  (change)="toggleRowSelect(row.employeeId)" />
              </td>
            }
            <td class="emp-col" style="padding-left:.5rem;font-size:.8rem;font-weight:600;">{{row.name}}</td>
            <td class="shift-col">
              <span class="shift-badge"
                [class.am]="row.defaultShift.toUpperCase() === 'AM'"
                [class.pm]="row.defaultShift.toUpperCase() === 'PM'">
                {{row.defaultShift || '—'}}
              </span>
            </td>
            <td class="jobtitle-col" style="font-size:.75rem;color:var(--ink-light);padding-left:.5rem;">{{row.jobTitle || '—'}}</td>
            <td class="resource-col" style="font-size:.75rem;color:var(--ink-light);padding-left:.5rem;">{{resourceDisplay(row.resourceCategory)}}</td>
            <td class="manager-col" style="font-size:.75rem;color:var(--ink-light);padding-left:.5rem;">{{row.managerName || '—'}}</td>
            <td class="mobile-col" style="font-size:.75rem;color:var(--ink-light);padding-left:.5rem;">{{row.workMobilePhone || '—'}}</td>
            @for (d of grid.days; track d) {
              <td
                [class.weekend]="d.isWeekend"
                [class.paint-cursor]="paintMode !== null"
                [class.note-pulse]="row.cells[d.day]?.hasNote && !isViewed(row.employeeId, d.day)"
                (click)="handleCellClick(row, d.day, row.cells[d.day])">
                <app-shift-chip
                  [code]="row.cells[d.day]?.statusCode ?? '—'"
                  [hasNote]="row.cells[d.day]?.hasNote ?? false"
                  [justPainted]="justPainted.has(row.employeeId + '-' + d.day)"
                  [statusCodes]="statusCodes">
                </app-shift-chip>
              </td>
            }
          </tr>
        }
      </tbody>
    </table>
  </div>
}

<!-- Legend -->
@if (legendCodes.length > 0) {
  <div class="legend-strip">
    @for (sc of legendCodes; track sc) {
      <span class="legend-item">
        <span class="legend-chip {{sc.cssClass}}"></span>
        <span>{{sc.label}}</span>
      </span>
    }
  </div>
}

<!-- Loading -->
@if (loading) {
  <div style="text-align:center;padding:3rem;color:var(--ink-faint);">
    Loading schedule...
  </div>
}

<!-- Load error -->
@if (!loading && loadError) {
  <div style="text-align:center;padding:3rem;">
    <div style="color:#e53e3e;font-weight:600;margin-bottom:.5rem;">Could not load schedule</div>
    <div style="color:var(--ink-faint);font-size:.85rem;margin-bottom:1rem;">{{loadError}}</div>
    <button class="btn-primary" (click)="loadGrid()">Retry</button>
  </div>
}

<!-- Day detail panel -->
@if (detailRow) {
  <app-day-detail-panel
    [row]="detailRow"
    [day]="detailDay!"
    [cell]="detailCell"
    [year]="year"
    [month]="month"
    [branchId]="branchId"
    [canNote]="canNote"
    [statusCodes]="statusCodes"
    (close)="closeDetailPanel()"
    (noteSaved)="onNoteSaved($event)">
  </app-day-detail-panel>
}

<!-- Instruction editor -->
@if (instructionEditorOpen && instructions) {
  <app-branch-instruction-editor
    [vm]="instructions"
    [branchName]="summary?.branchName ?? ''"
    (saved)="onInstructionSaved()"
    (closed)="instructionEditorOpen = false">
  </app-branch-instruction-editor>
}
`
})
export class ScheduleComponent implements OnInit, OnDestroy {
  @ViewChild('instrStrip') instrStrip?: BranchInstructionsComponent;

  private route          = inject(ActivatedRoute);
  private scheduleSvc    = inject(ScheduleService);
  private branchSvc      = inject(BranchService);
  private instrSvc       = inject(InstructionService);
  private auth           = inject(AuthService);
  private leaderSvc      = inject(BranchLeaderService);

  branchId = 0;
  year     = new Date().getFullYear();
  month    = new Date().getMonth() + 1;

  grid:         ScheduleGridDto | null = null;
  summary:      BranchSummaryDto | null = null;
  statusCodes:  StatusCodeDto[] = [];
  instructions: BranchInstructionsDto | null = null;
  leaders:      BranchLeader[] = [];

  paintMode    : string | null = null;
  selectedRows  = new Set<number>();
  justPainted   = new Set<string>();
  detailRow:    EmployeeScheduleRowDto | null = null;
  detailDay:    number | null = null;
  detailCell:   DayCellDto | null = null;

  leadershipExpanded    = false;
  instructionEditorOpen = false;
  leaderEditorOpen      = false;
  editingLeader:        BranchLeader | null = null;
  leaderForm: UpsertBranchLeader = { branchId: 0, name: '', jobTitle: '', sortOrder: 0 };

  loading   = false;
  loadError = '';

  canEdit           = false;
  canNote           = false;
  canInstructionEdit = false;

  private viewedKey = '';

  private readonly now = new Date();

  get isMaxMonth(): boolean {
    const maxY = this.now.getFullYear();
    const maxM = this.now.getMonth() + 2;
    return (this.year === maxY && this.month >= maxM) || (this.year > maxY);
  }

  get isAdmin(): boolean { return this.auth.hasRole(ROLES.Admin); }

  get isCurrentMonth(): boolean {
    return this.year === this.now.getFullYear() && this.month === this.now.getMonth() + 1;
  }

  get isNextMonth(): boolean {
    const nm = this.now.getMonth() + 2 > 12 ? 1 : this.now.getMonth() + 2;
    const ny = this.now.getMonth() + 2 > 12 ? this.now.getFullYear() + 1 : this.now.getFullYear();
    return this.year === ny && this.month === nm;
  }

  get monthLabel(): string {
    const months = [
      'January','February','March','April','May','June',
      'July','August','September','October','November','December'
    ];
    return `${months[this.month - 1]} ${this.year}`;
  }

  get thisMonthLabel(): string {
    const months = [
      'January','February','March','April','May','June',
      'July','August','September','October','November','December'
    ];
    return `${months[this.month - 1]} ${String(this.year).slice(2)}`;
  }

  get nextMonthLabel(): string {
    const months = [
      'January','February','March','April','May','June',
      'July','August','September','October','November','December'
    ];
    const nm = this.month === 12 ? 1 : this.month + 1;
    const ny = this.month === 12 ? this.year + 1 : this.year;
    return `${months[nm - 1]} ${String(ny).slice(2)}`;
  }

  /** Fill rate computed from live grid data (includes default pre-filled cells, not just DB entries). */
  get computedFillRate(): number {
    if (!this.grid || this.grid.rows.length === 0) return 0;
    const workdays = this.grid.days.filter(d => !d.isWeekend);
    const totalSlots = workdays.length * this.grid.rows.length;
    if (totalSlots === 0) return 0;
    let filled = 0;
    for (const row of this.grid.rows) {
      for (const d of workdays) {
        const code = row.cells[d.day]?.statusCode;
        if (code && code !== '—' && code !== '—') filled++;
      }
    }
    return Math.round(filled / totalSlots * 1000) / 10;  // 1 decimal
  }

  goThisMonth(): void {
    this.year  = this.now.getFullYear();
    this.month = this.now.getMonth() + 1;
    this.loadGrid();
    this.loadSummary();
  }

  goNextMonth(): void {
    if (this.isMaxMonth) return;
    const nm = this.now.getMonth() + 2 > 12 ? 1 : this.now.getMonth() + 2;
    const ny = this.now.getMonth() + 2 > 12 ? this.now.getFullYear() + 1 : this.now.getFullYear();
    this.year  = ny;
    this.month = nm;
    this.loadGrid();
    this.loadSummary();
  }

  get statusLabel(): string {
    const map: Record<string, string> = {
      green: 'Up to Date', amber: 'In Progress', red: 'Needs Attention'
    };
    return map[this.summary?.status ?? ''] ?? (this.summary?.status ?? '');
  }

  get paintCodes(): StatusCodeDto[] {
    return this.statusCodes.filter(s => s.showInPaintBar);
  }

  get legendCodes(): StatusCodeDto[] {
    return this.statusCodes.filter(s => s.showInPicker);
  }

  resourceDisplay(raw: string | null | undefined): string {
    if (!raw) return '—';
    const filtered = raw.split(',').map(s => s.trim())
      .filter(s => s.length > 0 && s.toLowerCase() !== 'technician')
      .join(', ');
    return filtered || '—';
  }

  ngOnInit(): void {
    // Roles
    this.canEdit            = this.auth.hasRole(...WRITE_ROLES);
    this.canNote            = this.auth.hasRole(...NOTE_ROLES);
    this.canInstructionEdit = this.auth.hasRole(...WRITE_ROLES);

    // Viewed key
    const userId = this.auth.currentUser()?.userId ?? 'guest';
    this.viewedKey = `wre-viewed-cells:${userId}`;

    this.route.paramMap.subscribe(params => {
      const id = params.get('branchId');
      this.branchId = id ? +id : 0;
      this.route.queryParamMap.subscribe(qp => {
        this.year  = qp.get('year')  ? +qp.get('year')!  : this.year;
        this.month = qp.get('month') ? +qp.get('month')! : this.month;
        this.loadAll();
        this.loadLeaders();
      });
    });

    this.scheduleSvc.getStatusCodes().subscribe({
      next: codes => this.statusCodes = codes,
      error: () => { /* silent */ }
    });
  }

  ngOnDestroy(): void { /* nothing */ }

  // ── Leadership ──────────────────────────────────────────────────────────────
  loadLeaders(): void {
    if (!this.branchId) return;
    this.leadershipExpanded = false;
    this.leaderSvc.getByBranch(this.branchId).subscribe({
      next: l => this.leaders = l,
      error: () => this.leaders = []
    });
  }

  formatPhone(phone: string | undefined | null): string {
    if (!phone) return '—';
    // Split off any extension (e.g. "Ext 116", "ext. 5", "x123")
    const extMatch = phone.match(/\s*(ext\.?|x)\s*(\d+)$/i);
    const extSuffix = extMatch ? ` Ext ${extMatch[2]}` : '';
    const base      = extMatch ? phone.slice(0, phone.indexOf(extMatch[0])) : phone;
    const digits    = base.replace(/\D/g, '');
    if (digits.length === 11 && digits[0] === '1')
      return `(${digits.slice(1,4)})-${digits.slice(4,7)}-${digits.slice(7)}${extSuffix}`;
    if (digits.length === 10)
      return `(${digits.slice(0,3)})-${digits.slice(3,6)}-${digits.slice(6)}${extSuffix}`;
    return phone; // non-standard — return as-is
  }

  openLeaderEditor(leader?: BranchLeader): void {
    this.editingLeader = leader ?? null;
    this.leaderForm = leader
      ? { branchId: this.branchId, name: leader.name, jobTitle: leader.jobTitle,
          workMobilePhone: leader.workMobilePhone, altPhone: leader.altPhone,
          managerName: leader.managerName, notes: leader.notes,
          sortOrder: leader.sortOrder }
      : { branchId: this.branchId, name: '', jobTitle: '',
          workMobilePhone: '', altPhone: '', managerName: '', notes: '',
          sortOrder: this.leaders.length + 1 };
    this.leaderEditorOpen = true;
  }

  editLeader(leader: BranchLeader): void { this.openLeaderEditor(leader); }

  closeLeaderEditor(): void { this.leaderEditorOpen = false; this.editingLeader = null; }

  saveLeader(): void {
    if (!this.leaderForm.name || !this.leaderForm.jobTitle) return;
    const obs = this.editingLeader
      ? this.leaderSvc.update(this.branchId, this.editingLeader.id, this.leaderForm)
      : this.leaderSvc.create(this.branchId, this.leaderForm);
    obs.subscribe({ next: () => { this.loadLeaders(); this.closeLeaderEditor(); } });
  }

  deleteLeader(id: number): void {
    if (!confirm('Remove this leader from the branch?')) return;
    this.leaderSvc.delete(this.branchId, id).subscribe({ next: () => this.loadLeaders() });
  }

  prevMonth(): void {
    if (this.month === 1) { this.year--; this.month = 12; }
    else this.month--;
    this.loadGrid();
    this.loadSummary();
  }

  nextMonth(): void {
    if (this.isMaxMonth) return;
    if (this.month === 12) { this.year++; this.month = 1; }
    else this.month++;
    this.loadGrid();
    this.loadSummary();
  }

  setPaintMode(code: string): void {
    this.paintMode = this.paintMode === code ? null : code;
  }

  clearPaintMode(): void {
    this.paintMode = null;
    this.selectedRows.clear();
  }

  toggleRowSelect(empId: number): void {
    if (this.selectedRows.has(empId)) this.selectedRows.delete(empId);
    else this.selectedRows.add(empId);
  }

  handleCellClick(row: EmployeeScheduleRowDto, day: number, cell: DayCellDto | undefined): void {
    if (this.paintMode !== null) {
      const targets = this.selectedRows.size > 0
        ? [...this.selectedRows]
        : [row.employeeId];

      for (const empId of targets) {
        const dateStr = this.toDateStr(this.year, this.month, day);
        const targetRow = this.grid!.rows.find(r => r.employeeId === empId);
        if (!targetRow) continue;
        if (!targetRow.cells[day]) {
          targetRow.cells[day] = { statusCode: '—', hasNote: false, isNew: true };
        }
        const codeToApply = this.paintMode === 'clear' ? '—' : this.paintMode!;
        targetRow.cells[day].statusCode = codeToApply;
        this.scheduleSvc.upsertCell({
          employeeId: empId,
          date:       dateStr,
          statusCode: codeToApply
        }).subscribe();
        const key = `${empId}-${day}`;
        this.justPainted.add(key);
        setTimeout(() => this.justPainted.delete(key), 700);
      }
    } else {
      this.detailRow  = row;
      this.detailDay  = day;
      this.detailCell = cell ?? null;
      this.markViewed(row.employeeId, day);
    }
  }

  closeDetailPanel(): void {
    this.detailRow  = null;
    this.detailDay  = null;
    this.detailCell = null;
  }

  onNoteSaved(hasNote: boolean): void {
    if (this.detailRow && this.detailDay !== null && this.grid) {
      const cell = this.detailRow.cells[this.detailDay];
      if (cell) {
        cell.hasNote = hasNote;
        // When note is cleared, remove this cell from the "viewed" set so it
        // won't accidentally suppress a future note bell on the same slot
        if (!hasNote) {
          const dateStr = this.toDateStr(this.year, this.month, this.detailDay);
          const key = `${this.detailRow.employeeId}:${dateStr}`;
          const viewed = this.getViewedSet();
          viewed.delete(key);
          this.saveViewedSet(viewed);
        }
      }
    }
  }

  openInstructionEditor(): void {
    if (this.instructions) {
      this.instructionEditorOpen = true;
    } else {
      this.instrSvc.getForBranch(this.branchId).subscribe({
        next: vm => {
          this.instructions = vm;
          this.instructionEditorOpen = true;
        }
      });
    }
  }

  onInstructionSaved(): void {
    this.instructionEditorOpen = false;
    this.instrSvc.getForBranch(this.branchId).subscribe({
      next: vm => { this.instructions = vm; this.instrStrip?.reload(); }
    });
  }

  isViewed(empId: number, day: number): boolean {
    const dateStr = this.toDateStr(this.year, this.month, day);
    const key = `${empId}:${dateStr}`;
    const viewed = this.getViewedSet();
    return viewed.has(key);
  }

  private markViewed(empId: number, day: number): void {
    const dateStr = this.toDateStr(this.year, this.month, day);
    const key = `${empId}:${dateStr}`;
    const viewed = this.getViewedSet();
    viewed.add(key);
    this.saveViewedSet(viewed);
  }

  private getViewedSet(): Set<string> {
    try {
      const arr: string[] = JSON.parse(localStorage.getItem(this.viewedKey) ?? '[]');
      return new Set(arr);
    } catch { return new Set(); }
  }

  private saveViewedSet(s: Set<string>): void {
    // Keep last 2000 entries to avoid unbounded growth
    const arr = [...s].slice(-2000);
    localStorage.setItem(this.viewedKey, JSON.stringify(arr));
  }

  private toDateStr(year: number, month: number, day: number): string {
    const mm = month.toString().padStart(2, '0');
    const dd = day.toString().padStart(2, '0');
    return `${year}-${mm}-${dd}`;
  }

  private loadAll(): void {
    this.loadGrid();
    this.loadSummary();
    this.instrSvc.getForBranch(this.branchId).subscribe({
      next: vm => this.instructions = vm,
      error: () => { /* silent */ }
    });
  }

  loadGrid(): void {
    if (!this.branchId) return;
    this.loading   = true;
    this.loadError = '';
    this.grid      = null;
    this.scheduleSvc.getGrid(this.branchId, this.year, this.month).subscribe({
      next: g => { this.grid = g; this.loading = false; },
      error: (err) => {
        this.loading = false;
        if (err.status === 0) {
          this.loadError = 'Cannot reach the API server. Make sure it is running on port 5100.';
        } else if (err.status === 401) {
          this.loadError = 'Session expired — please log in again.';
        } else {
          this.loadError = `Server error (${err.status}). Check the API console for details.`;
        }
      }
    });
  }

  private loadSummary(): void {
    if (!this.branchId) return;
    this.branchSvc.getSummary(this.branchId, this.year, this.month).subscribe({
      next: s => this.summary = s,
      error: () => { /* silent */ }
    });
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.paintMode !== null) {
      this.clearPaintMode();
    } else if (this.detailRow) {
      this.closeDetailPanel();
    } else if (this.instructionEditorOpen) {
      this.instructionEditorOpen = false;
    }
  }
}
