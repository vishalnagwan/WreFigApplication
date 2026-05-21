import {
  Component, Input, Output, EventEmitter,
  OnInit, HostListener, inject
} from '@angular/core';
import { CommonModule }          from '@angular/common';
import { FormsModule }           from '@angular/forms';
import { ScheduleService }       from '../../services/schedule.service';
import { AuditService }          from '../../services/audit.service';
import { EmployeeScheduleRowDto, DayCellDto, StatusCodeDto } from '../../models/schedule.model';
import { AlertDto }              from '../../models/audit.model';
import { ShiftChipComponent }    from '../shift-chip/shift-chip.component';

@Component({
  selector:   'app-day-detail-panel',
  standalone: true,
  imports:    [CommonModule, FormsModule, ShiftChipComponent],
  template: `
<div class="detail-panel">
  <!-- Header -->
  <div class="detail-panel-header">
    <div class="emp-avatar">{{initials}}</div>
    <div style="flex:1;">
      <div style="font-weight:700;font-size:.95rem;">{{row.name}}</div>
      <div style="font-size:.78rem;color:var(--ink-light);">{{dateLabel}}</div>
    </div>
    <app-shift-chip
      [code]="cell?.statusCode ?? '—'"
      [statusCodes]="statusCodes">
    </app-shift-chip>
    <button class="btn-icon" (click)="close.emit()">✕</button>
  </div>

  <!-- Body -->
  <div class="detail-panel-body">
    <div class="detail-panel-body-content">

      <!-- Driver info -->
      <div class="detail-section">
        <div class="detail-section-title">Driver Info</div>
        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">Job Title</div>
            <div>{{row.jobTitle || '—'}}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Default Shift</div>
            <div>{{row.defaultShift || '—'}}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Truck</div>
            <div>{{formatTruck(row.truckAssignment)}}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Truck ID</div>
            <div>{{row.truckId || '—'}}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Shift Window</div>
            <div>{{shiftWindow}}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Resource Type</div>
            <div>{{resourceTypeDisplay}}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Manager</div>
            <div>{{row.managerName || '—'}}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Work Phone</div>
            <div style="display:flex;align-items:center;gap:.4rem;flex-wrap:wrap;">
              <span>{{row.workPhone || '—'}}</span>
              <a *ngIf="row.workPhone" class="dialpad-btn"
                 href="https://dial.pad.com" target="_blank" rel="noopener"
                 title="Open in Dialpad">
                📞 DialPad
              </a>
            </div>
          </div>
          <div class="info-item">
            <div class="info-label">Mobile</div>
            <div style="display:flex;align-items:center;gap:.4rem;flex-wrap:wrap;">
              <span>{{row.workMobilePhone || '—'}}</span>
              <a *ngIf="row.workMobilePhone && !row.workPhone" class="dialpad-btn"
                 href="https://dial.pad.com" target="_blank" rel="noopener"
                 title="Open in Dialpad">
                📞 DialPad
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Note -->
      <div class="detail-section">
        <div class="detail-section-title-row">
          <span class="detail-section-title" style="margin:0;">Supervisor Note</span>
          <div *ngIf="canNote" style="display:flex;align-items:center;gap:.5rem;">
            <span *ngIf="saveSuccess" style="color:#16a34a;font-size:.78rem;">✓ Saved</span>
            <span *ngIf="saveError"   style="color:#dc2626;font-size:.78rem;">Failed</span>
            <button class="btn-primary btn-sm" (click)="saveNote()" [disabled]="saving">
              {{saving ? 'Saving...' : 'Save Note'}}
            </button>
          </div>
        </div>
        <textarea
          class="note-textarea"
          [(ngModel)]="noteText"
          [readonly]="!canNote"
          placeholder="{{canNote ? 'Add a note...' : 'No notes.'}}">
        </textarea>
      </div>

      <!-- History -->
      <div class="detail-section">
        <div class="detail-section-title">Change History</div>
        <div *ngIf="loadingHistory" style="color:var(--ink-faint);font-size:.8rem;">Loading...</div>
        <div *ngIf="!loadingHistory && visibleHistory.length === 0"
             style="color:var(--ink-faint);font-size:.8rem;">No changes recorded for this driver.</div>
        <div class="history-timeline scrollable-history">
          <div class="history-item" *ngFor="let h of visibleHistory">
            <div class="history-dot blue"></div>
            <div>
              <div>{{historyText(h)}}</div>
              <div style="font-size:.7rem;color:var(--ink-faint);font-family:'DM Mono',monospace;">
                {{historyTime(h)}}
                <span *ngIf="h.performedBy"> · {{h.performedBy}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- Fleetio footer -->
    <div class="detail-panel-footer">
      <div class="fleetio-status">
        <span class="fleetio-dot"></span>
        <span>Fleetio sync disabled</span>
      </div>
      <a class="fleetio-link" href="https://app.fleetio.com" target="_blank" rel="noopener">
        View in Fleetio ↗
      </a>
    </div>

  </div>
</div>
  `
})
export class DayDetailPanelComponent implements OnInit {
  @Input() row!: EmployeeScheduleRowDto;
  @Input() day!: number;
  @Input() cell!: DayCellDto | null;
  @Input() year!: number;
  @Input() month!: number;
  @Input() branchId!: number;
  @Input() canNote = false;
  @Input() statusCodes: StatusCodeDto[] = [];
  @Output() close     = new EventEmitter<void>();
  @Output() noteSaved = new EventEmitter<void>();

  private scheduleSvc = inject(ScheduleService);
  private auditSvc    = inject(AuditService);

  noteText     = '';
  history: AlertDto[] = [];
  loadingHistory = false;
  saving       = false;
  saveSuccess  = false;
  saveError    = false;

  get visibleHistory(): AlertDto[] {
    return this.history.filter(h => h.action?.trim() || h.description?.trim());
  }

  formatTruck(value: string | undefined | null): string {
    if (!value) return '—';
    // Uppercase trailing 'g' used as gallon unit (e.g. "4,800g" → "4,800G")
    return value.replace(/g$/i, 'G');
  }

  get resourceTypeDisplay(): string {
    if (!this.row?.resourceCategory) return '—';
    const filtered = this.row.resourceCategory
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0 && s.toLowerCase() !== 'technician')
      .join(', ');
    return filtered || '—';
  }

  private static readonly ACTION_LABELS: Record<string, string> = {
    UpdateSchedule: 'Schedule updated',
    UpdateNote:     'Note updated',
    CreateSchedule: 'Schedule created',
    DeleteSchedule: 'Schedule deleted',
  };

  historyText(h: AlertDto): string {
    // Prefer the stored description (set by API to a human-readable string)
    if (h.description && h.description !== h.action && !h.description.includes('Entry')) {
      return h.description;
    }
    return DayDetailPanelComponent.ACTION_LABELS[h.action] ?? h.action;
  }

  historyTime(h: AlertDto): string {
    if (!h.performedAt) return '';
    const d = new Date(h.performedAt);
    const now = new Date();
    const diffMs  = now.getTime() - d.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1)  return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHrs = Math.floor(diffMins / 60);
    if (diffHrs < 24)  return `${diffHrs}h ago`;
    return `${Math.floor(diffHrs / 24)}d ago`;
  }

  get initials(): string {
    if (!this.row?.name) return '?';
    return this.row.name.split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase();
  }

  get dateLabel(): string {
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return `${months[this.month - 1]} ${this.day}, ${this.year}`;
  }

  get shiftWindow(): string {
    const shift = (this.row?.defaultShift ?? '').toUpperCase();
    if (shift.includes('AM') || shift === 'WA') return '5:00 AM – 2:30 PM';
    if (shift.includes('PM') || shift === 'WP') return '12:00 PM – 9:00 PM';
    return '—';
  }

  get dateStr(): string {
    const mm = this.month.toString().padStart(2, '0');
    const dd = this.day.toString().padStart(2, '0');
    return `${this.year}-${mm}-${dd}`;
  }

  ngOnInit(): void {
    this.loadNote();
    this.loadHistory();
  }

  private loadNote(): void {
    this.scheduleSvc.getNote(this.row.employeeId, this.dateStr).subscribe({
      next: res => this.noteText = res.note ?? '',
      error: () => this.noteText = ''
    });
  }

  private loadHistory(): void {
    this.loadingHistory = true;
    this.auditSvc.getHistory(this.row.employeeId, this.dateStr).subscribe({
      next: (h: AlertDto[]) => { this.history = h; this.loadingHistory = false; },
      error: ()             => { this.history = []; this.loadingHistory = false; }
    });
  }

  saveNote(): void {
    this.saving = true;
    this.saveSuccess = false;
    this.saveError   = false;
    this.scheduleSvc.upsertNote({
      employeeId: this.row.employeeId,
      date:       this.dateStr,
      note:       this.noteText,
      statusCode: this.cell?.statusCode ?? null
    }).subscribe({
      next: () => {
        this.saving = false;
        this.saveSuccess = true;
        this.noteSaved.emit();
        setTimeout(() => this.saveSuccess = false, 2000);
      },
      error: () => { this.saving = false; this.saveError = true; }
    });
  }

  @HostListener('document:keydown.escape')
  onEsc(): void {
    this.close.emit();
  }
}
