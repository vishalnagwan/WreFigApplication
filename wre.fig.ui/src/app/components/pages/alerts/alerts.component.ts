import { Component, OnInit, inject } from '@angular/core';
import { CommonModule }              from '@angular/common';
import { AuditService }              from '../../../services/audit.service';
import { AlertDto }                  from '../../../models/audit.model';

interface AlertGroup {
  label:     string;
  cssClass:  'urgent' | 'mid' | 'low' | 'older';
  timeBadge: string;
  alerts:    AlertDto[];
}

type FilterType = 'all' | 'unread' | 'urgent';

const ACTION_LABELS: Record<string, string> = {
  UpdateSchedule:     'Schedule change',
  UpdateNote:         'Note updated',
  CreateSchedule:     'Schedule created',
  DeleteSchedule:     'Schedule deleted',
  Rollover:           'Month rolled over',
  CreateUser:         'User created',
  UpdateUser:         'User updated',
  DeleteUser:         'User deleted',
  CreateEmployee:     'Technician created',
  UpdateEmployee:     'Technician updated',
  DeactivateEmployee: 'Technician deactivated',
};

@Component({
  selector:   'app-alerts',
  standalone: true,
  imports:    [CommonModule],
  styles: [`
    .alert-group-header {
      display: flex;
      align-items: center;
      gap: .75rem;
      margin: 1.4rem 0 .4rem;
    }
    .alert-group-header:first-of-type { margin-top: .25rem; }

    .group-label {
      font-size: .68rem;
      font-weight: 700;
      letter-spacing: .07em;
      white-space: nowrap;
      color: var(--ink-light);
    }
    .group-line {
      flex: 1;
      height: 2px;
      border-radius: 1px;
    }
    .group-line.urgent { background: #dc2626; }
    .group-line.mid    { background: #d97706; }
    .group-line.low    { background: #9ca3af; }
    .group-line.older  { background: #e5e7eb; }

    .alert-card {
      display: flex;
      gap: .65rem;
      padding: .7rem 0;
      border-bottom: 1px solid var(--border);
    }
    .alert-card.unread {
      background: var(--paper-warm);
      border-radius: 4px;
      padding-left: .5rem;
      margin-left: -.5rem;
    }

    .urgency-bar {
      width: 3px;
      border-radius: 2px;
      flex-shrink: 0;
      align-self: stretch;
      min-height: 1.25rem;
    }
    .urgency-bar.urgent { background: #dc2626; }
    .urgency-bar.mid    { background: #d97706; }
    .urgency-bar.low    { background: #9ca3af; }
    .urgency-bar.older  { background: #d1d5db; }

    .alert-body { flex: 1; min-width: 0; }

    .alert-title {
      font-weight: 600;
      font-size: .88rem;
      color: var(--ink);
      margin-bottom: .12rem;
    }
    .alert-detail {
      font-size: .81rem;
      color: var(--ink-light);
      margin-bottom: .3rem;
    }
    .alert-tags {
      display: flex;
      align-items: center;
      gap: .45rem;
      flex-wrap: wrap;
    }

    .time-badge {
      font-size: .68rem;
      font-weight: 700;
      padding: .08rem .45rem;
      border-radius: 999px;
      border: 1.5px solid currentColor;
      line-height: 1.4;
    }
    .time-badge.urgent { color: #dc2626; background: #fef2f2; }
    .time-badge.mid    { color: #d97706; background: #fffbeb; }
    .time-badge.low    { color: #6b7280; background: #f3f4f6; }
    .time-badge.older  { color: #9ca3af; background: #f9fafb; }

    .alert-meta {
      font-size: .72rem;
      color: var(--ink-faint);
    }
  `],
  template: `
<div class="page-header">
  <h1>Alerts <span class="badge" *ngIf="unreadCount > 0">{{unreadCount}}</span></h1>
  <div class="filter-row" style="margin-left:auto;">
    <button [class.active]="filter === 'all'"    (click)="setFilter('all')">All</button>
    <button [class.active]="filter === 'unread'" (click)="setFilter('unread')">Unread</button>
    <button [class.active]="filter === 'urgent'" (click)="setFilter('urgent')">Urgent only</button>
  </div>
</div>

<div *ngIf="loading"
     style="text-align:center;padding:3rem;color:var(--ink-faint);">Loading alerts...</div>

<div *ngIf="!loading && groupedAlerts.length === 0"
     style="text-align:center;padding:3rem;color:var(--ink-faint);">No alerts to display.</div>

<ng-container *ngFor="let group of groupedAlerts">
  <!-- Group header -->
  <div class="alert-group-header">
    <span class="group-label">{{group.label}}</span>
    <div class="group-line" [ngClass]="group.cssClass"></div>
  </div>

  <!-- Alert cards -->
  <div class="alert-card"
       *ngFor="let a of group.alerts"
       [class.unread]="isUnread(a)">
    <div class="urgency-bar" [ngClass]="group.cssClass"></div>
    <div class="alert-body">
      <div class="alert-title">{{alertTitle(a)}}</div>
      <div class="alert-detail" *ngIf="hasDetail(a)">{{a.description}}</div>
      <div class="alert-tags">
        <span class="time-badge" [ngClass]="group.cssClass">{{group.timeBadge}}</span>
        <span class="alert-meta">{{a.entityType}} · {{a.performedBy}}</span>
      </div>
    </div>
  </div>
</ng-container>
  `
})
export class AlertsComponent implements OnInit {
  private auditSvc = inject(AuditService);

  alerts:  AlertDto[] = [];
  filter:  FilterType = 'all';
  loading  = true;
  readIds  = new Set<number>();

  private readonly readKey = 'fig-read-alerts';

  get unreadCount(): number {
    return this.alerts.filter(a => this.isUnread(a)).length;
  }

  get groupedAlerts(): AlertGroup[] {
    const filtered = this.applyFilter();

    const h24   = filtered.filter(a => this.hoursSince(a) <= 24);
    const h48   = filtered.filter(a => { const h = this.hoursSince(a); return h > 24 && h <= 48; });
    const h72   = filtered.filter(a => { const h = this.hoursSince(a); return h > 48 && h <= 72; });
    const older = filtered.filter(a => this.hoursSince(a) > 72);

    const groups: AlertGroup[] = [];
    if (h24.length)   groups.push({ label: 'WITHIN 24 HOURS · URGENT', cssClass: 'urgent', timeBadge: '≤ 24h', alerts: h24 });
    if (h48.length)   groups.push({ label: 'WITHIN 48 HOURS',          cssClass: 'mid',    timeBadge: '≤ 48h', alerts: h48 });
    if (h72.length)   groups.push({ label: 'WITHIN 72 HOURS',          cssClass: 'low',    timeBadge: '≤ 72h', alerts: h72 });
    if (older.length) groups.push({ label: 'OLDER',                    cssClass: 'older',  timeBadge: '> 72h', alerts: older });
    return groups;
  }

  ngOnInit(): void {
    const stored: number[] = JSON.parse(sessionStorage.getItem(this.readKey) ?? '[]');
    this.readIds = new Set(stored);

    this.auditSvc.getAlerts().subscribe({
      next: data => {
        this.alerts = data;
        // Mark all as read now that the user has opened the page
        data.forEach(a => this.readIds.add(a.id));
        sessionStorage.setItem(this.readKey, JSON.stringify([...this.readIds]));
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  isUnread(a: AlertDto): boolean {
    return !this.readIds.has(a.id);
  }

  setFilter(f: FilterType): void {
    this.filter = f;
  }

  /** "Schedule change — May 20, 2026" */
  alertTitle(a: AlertDto): string {
    const label = ACTION_LABELS[a.action] ?? a.action;
    if (a.performedAt) {
      const d       = new Date(a.performedAt);
      const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      return `${label} — ${dateStr}`;
    }
    return label;
  }

  /** Show description only when it contains more than the action label. */
  hasDetail(a: AlertDto): boolean {
    if (!a.description) return false;
    const label = ACTION_LABELS[a.action] ?? a.action;
    if (a.description === a.action || a.description === label) return false;
    return a.description.includes(' ');
  }

  /** Hours elapsed since this alert was recorded. */
  private hoursSince(a: AlertDto): number {
    if (!a.performedAt) return 9999;
    return (Date.now() - new Date(a.performedAt).getTime()) / 3_600_000;
  }

  private applyFilter(): AlertDto[] {
    // "Urgent only" → most recent 24 hours only
    if (this.filter === 'urgent') return this.alerts.filter(a => this.hoursSince(a) <= 24);
    if (this.filter === 'unread') return this.alerts.filter(a => this.isUnread(a));
    return this.alerts;
  }
}
