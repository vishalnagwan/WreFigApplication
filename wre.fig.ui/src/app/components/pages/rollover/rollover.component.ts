import { Component, OnInit, inject } from '@angular/core';
import { CommonModule }              from '@angular/common';
import { MonthLockService }          from '../../../services/monthlock.service';
import { MonthLockDto }              from '../../../models/monthlock.model';

const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
];

@Component({
  selector:   'app-rollover',
  standalone: true,
  imports:    [CommonModule],
  template: `
<div class="page-header">
  <h1>Month Rollover Console</h1>
</div>

<div *ngIf="loading" style="text-align:center;padding:3rem;color:var(--ink-faint);">Loading...</div>

<ng-container *ngIf="!loading">
  <!-- KPI row -->
  <div class="kpi-row">
    <div class="kpi-card green">
      <div class="kpi-value">{{openCount}}</div>
      <div class="kpi-label">Open Months</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-value">{{closedCount}}</div>
      <div class="kpi-label">Closed Months</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-value" style="font-size:1.2rem;">{{currentMonthLabel}}</div>
      <div class="kpi-label">Current Month</div>
    </div>
  </div>

  <div class="status-callout" *ngIf="statusMessage">{{statusMessage}}</div>

  <!-- Table -->
  <table class="rollover-table">
    <thead>
      <tr>
        <th>Month</th>
        <th>Status</th>
        <th>Modified</th>
        <th>By</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let lock of locks">
        <td>{{monthLabel(lock.year, lock.month)}}</td>
        <td>
          <span [class]="lock.isOpen ? 'pill-green' : 'pill-gray'">
            {{lock.isOpen ? 'Open' : 'Closed'}}
          </span>
        </td>
        <td style="font-size:.75rem;font-family:'DM Mono',monospace;">
          {{lock.modifiedAt | date:'MM/dd/yyyy HH:mm'}}
        </td>
        <td>{{lock.modifiedBy}}</td>
        <td>
          <button *ngIf="!lock.isOpen" class="btn-ghost btn-sm"
                  (click)="openLock(lock)" [disabled]="saving">Open</button>
          <button *ngIf="lock.isOpen" class="btn-ghost btn-sm"
                  (click)="closeLock(lock)" [disabled]="saving">Close</button>
        </td>
      </tr>
      <tr *ngIf="locks.length === 0">
        <td colspan="5" style="text-align:center;color:var(--ink-faint);padding:2rem;">
          No month locks found.
        </td>
      </tr>
    </tbody>
  </table>

  <!-- Quick actions -->
  <div class="quick-actions">
    <button class="btn-primary" (click)="openNextMonth()"
            [disabled]="nextMonthAlreadyOpen || saving">
      Open Next Month
    </button>
    <button class="btn-primary" (click)="closePriorMonth()"
            [disabled]="!priorMonthIsOpen || saving">
      Close Prior Month
    </button>
  </div>
</ng-container>
  `
})
export class RolloverComponent implements OnInit {
  private lockSvc = inject(MonthLockService);

  locks:  MonthLockDto[] = [];
  loading = true;
  saving  = false;
  statusMessage = '';

  get openCount(): number   { return this.locks.filter(l => l.isOpen).length; }
  get closedCount(): number { return this.locks.filter(l => !l.isOpen).length; }

  get currentMonthLabel(): string {
    const now = new Date();
    return `${MONTH_NAMES[now.getMonth()]} ${now.getFullYear()}`;
  }

  get nextMonthAlreadyOpen(): boolean {
    const now   = new Date();
    let   ny    = now.getFullYear();
    let   nm    = now.getMonth() + 2; // 1-based, next month
    if (nm > 12) { nm = 1; ny++; }
    return this.locks.some(l => l.year === ny && l.month === nm && l.isOpen);
  }

  get priorMonthIsOpen(): boolean {
    const now = new Date();
    let py = now.getFullYear();
    let pm = now.getMonth(); // 1-based previous month
    if (pm === 0) { pm = 12; py--; }
    return this.locks.some(l => l.year === py && l.month === pm && l.isOpen);
  }

  ngOnInit(): void {
    this.lockSvc.ensureDefaults().subscribe({
      next: () => this.load(),
      error: () => this.load()
    });
  }

  monthLabel(year: number, month: number): string {
    return `${MONTH_NAMES[month - 1]} ${year}`;
  }

  openLock(lock: MonthLockDto): void {
    this.saving = true;
    this.lockSvc.openMonth(lock.year, lock.month).subscribe({
      next: () => {
        this.statusMessage = `${this.monthLabel(lock.year, lock.month)} opened successfully.`;
        this.saving = false;
        this.load();
        setTimeout(() => this.statusMessage = '', 5000);
      },
      error: () => { this.saving = false; }
    });
  }

  closeLock(lock: MonthLockDto): void {
    this.saving = true;
    this.lockSvc.closeMonth(lock.year, lock.month).subscribe({
      next: () => {
        this.statusMessage = `${this.monthLabel(lock.year, lock.month)} closed successfully.`;
        this.saving = false;
        this.load();
        setTimeout(() => this.statusMessage = '', 5000);
      },
      error: () => { this.saving = false; }
    });
  }

  openNextMonth(): void {
    const now = new Date();
    let ny = now.getFullYear();
    let nm = now.getMonth() + 2;
    if (nm > 12) { nm = 1; ny++; }
    const lock: MonthLockDto = { id: 0, year: ny, month: nm, isOpen: false, modifiedAt: '', modifiedBy: '' };
    this.openLock(lock);
  }

  closePriorMonth(): void {
    const now = new Date();
    let py = now.getFullYear();
    let pm = now.getMonth();
    if (pm === 0) { pm = 12; py--; }
    const existing = this.locks.find(l => l.year === py && l.month === pm);
    if (existing) this.closeLock(existing);
  }

  private load(): void {
    this.loading = true;
    this.lockSvc.getAll().subscribe({
      next: data => { this.locks = data; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }
}
