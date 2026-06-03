import { Component, OnInit, inject } from '@angular/core';
import { CommonModule }    from '@angular/common';
import { FormsModule }     from '@angular/forms';
import { FeedbackService } from '../../../services/feedback.service';
import { FeedbackItemDto } from '../../../models/feedback.model';

const PAGE_ORDER = ['Home', 'Schedule', 'Compliance', 'Alerts', 'Users', 'Technician'];

@Component({
  selector:   'app-feedback-report',
  standalone: true,
  imports:    [CommonModule, FormsModule],
  styles: [`
    :host { display: block; font-family: 'Inter', sans-serif; }

    .report-wrap {
      max-width: 1200px; margin: 0 auto; padding: 2rem 1.5rem;
    }
    .report-header {
      display: flex; align-items: baseline; gap: 1rem;
      margin-bottom: 1.5rem; flex-wrap: wrap;
    }
    .report-header h1 {
      margin: 0; font-size: 1.4rem; font-weight: 800;
    }
    .dev-badge {
      font-size: .7rem; font-weight: 700; letter-spacing: .06em;
      padding: .2rem .55rem; border-radius: 4px;
      background: #fef3c7; color: #92400e;
      border: 1px solid #fcd34d;
    }
    .report-filters {
      display: flex; gap: .5rem; flex-wrap: wrap; margin-bottom: 1.25rem;
      align-items: center;
    }
    .report-filters label { font-size: .82rem; color: #6b7280; margin-right: .25rem; }
    .filter-btn {
      padding: .3rem .75rem; border-radius: 999px; border: 1px solid #d1d5db;
      font-size: .8rem; cursor: pointer; background: #fff; color: #374151;
      transition: all .15s;
    }
    .filter-btn.active { background: #4f46e5; color: #fff; border-color: #4f46e5; }

    .stats-row {
      display: flex; gap: 1.25rem; margin-bottom: 1.5rem; flex-wrap: wrap;
    }
    .stat-card {
      background: #f9fafb; border: 1px solid #e5e7eb;
      border-radius: 8px; padding: .65rem 1rem; min-width: 110px;
      text-align: center;
    }
    .stat-num { font-size: 1.5rem; font-weight: 800; color: #1f2937; }
    .stat-label { font-size: .72rem; color: #6b7280; margin-top: .1rem; }

    .page-group { margin-bottom: 2rem; }
    .page-group-header {
      display: flex; align-items: center; gap: .75rem;
      margin-bottom: .6rem; padding-bottom: .4rem;
      border-bottom: 2px solid #e5e7eb;
    }
    .page-group-header h2 { margin: 0; font-size: 1rem; font-weight: 700; }
    .count-badge {
      font-size: .72rem; font-weight: 700;
      background: #e0e7ff; color: #3730a3;
      padding: .1rem .45rem; border-radius: 999px;
    }

    table { width: 100%; border-collapse: collapse; font-size: .84rem; }
    th {
      text-align: left; padding: .5rem .75rem;
      background: #f3f4f6; color: #374151;
      font-size: .72rem; font-weight: 700; letter-spacing: .05em;
      border-bottom: 1px solid #d1d5db;
    }
    td { padding: .55rem .75rem; border-bottom: 1px solid #f3f4f6; vertical-align: top; }
    tr:hover td { background: #fafafa; }

    .category-tag {
      display: inline-block;
      font-size: .72rem; font-weight: 600;
      padding: .1rem .45rem; border-radius: 4px;
      background: #ede9fe; color: #5b21b6;
      white-space: nowrap;
    }
    .comment-text { color: #1f2937; line-height: 1.45; max-width: 420px; }
    .meta-text    { font-size: .75rem; color: #9ca3af; }

    .done-badge {
      display: inline-flex; align-items: center; gap: .3rem;
      font-size: .72rem; font-weight: 700;
      padding: .15rem .5rem; border-radius: 999px;
    }
    .done-badge.yes { background: #d1fae5; color: #065f46; }
    .done-badge.no  { background: #f3f4f6; color: #6b7280; }

    .toggle-btn {
      font-size: .72rem; padding: .2rem .55rem;
      border-radius: 4px; cursor: pointer; border: 1px solid #d1d5db;
      background: #fff; color: #374151;
    }
    .toggle-btn:hover { background: #f3f4f6; }
    .toggle-btn.toggling { opacity: .5; pointer-events: none; }

    .empty { text-align: center; padding: 2rem; color: #9ca3af; font-size: .88rem; }
    .loading { text-align: center; padding: 3rem; color: #9ca3af; }
  `],
  template: `
<div class="report-wrap">

  <div class="report-header">
    <h1>FIG Feedback Report</h1>
    <span class="dev-badge">DEV ONLY</span>
    <span style="font-size:.82rem;color:#9ca3af;margin-left:auto;">
      {{lastRefreshed}}
      <button class="filter-btn" style="margin-left:.5rem;" (click)="load()">↻ Refresh</button>
    </span>
  </div>

  <div *ngIf="loading" class="loading">Loading feedback…</div>

  <ng-container *ngIf="!loading">

    <!-- Stats -->
    <div class="stats-row">
      <div class="stat-card">
        <div class="stat-num">{{all.length}}</div>
        <div class="stat-label">Total</div>
      </div>
      <div class="stat-card">
        <div class="stat-num">{{pendingCount}}</div>
        <div class="stat-label">Pending</div>
      </div>
      <div class="stat-card">
        <div class="stat-num">{{implementedCount}}</div>
        <div class="stat-label">Implemented</div>
      </div>
    </div>

    <!-- Filters -->
    <div class="report-filters">
      <label>Filter:</label>
      <button class="filter-btn" [class.active]="statusFilter === 'all'"
              (click)="statusFilter = 'all'">All</button>
      <button class="filter-btn" [class.active]="statusFilter === 'pending'"
              (click)="statusFilter = 'pending'">Pending</button>
      <button class="filter-btn" [class.active]="statusFilter === 'implemented'"
              (click)="statusFilter = 'implemented'">Implemented</button>

      <span style="margin-left:.75rem;"></span>
      <label>Page:</label>
      <button class="filter-btn" [class.active]="pageFilter === ''"
              (click)="pageFilter = ''">All Pages</button>
      <button class="filter-btn"
              *ngFor="let p of pageOrder"
              [class.active]="pageFilter === p"
              (click)="pageFilter = p">{{p}}</button>
    </div>

    <!-- Groups by page -->
    <div class="page-group" *ngFor="let group of visibleGroups">
      <div class="page-group-header">
        <h2>{{group.page}}</h2>
        <span class="count-badge">{{group.items.length}}</span>
      </div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Category</th>
            <th>Comment</th>
            <th>Submitted by</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let item of group.items">
            <td class="meta-text">{{item.id}}</td>
            <td><span class="category-tag">{{item.category}}</span></td>
            <td><div class="comment-text">{{item.comment}}</div></td>
            <td class="meta-text">{{item.userName}}</td>
            <td class="meta-text">{{formatDate(item.createdAt)}}</td>
            <td>
              <span class="done-badge" [class.yes]="item.isImplemented" [class.no]="!item.isImplemented">
                {{item.isImplemented ? '✓ Implemented' : '○ Pending'}}
              </span>
            </td>
            <td>
              <button class="toggle-btn"
                      [class.toggling]="toggling.has(item.id)"
                      (click)="toggle(item)">
                {{item.isImplemented ? 'Mark Pending' : 'Mark Implemented'}}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="empty" *ngIf="visibleGroups.length === 0">No feedback matches the current filters.</div>

  </ng-container>
</div>
  `
})
export class FeedbackReportComponent implements OnInit {
  private feedbackSvc = inject(FeedbackService);

  all:          FeedbackItemDto[] = [];
  loading       = true;
  statusFilter  = 'all';
  pageFilter    = '';
  toggling      = new Set<number>();
  lastRefreshed = '';
  pageOrder     = PAGE_ORDER;

  get pendingCount():     number { return this.all.filter(f => !f.isImplemented).length; }
  get implementedCount(): number { return this.all.filter(f =>  f.isImplemented).length; }

  get visibleGroups(): { page: string; items: FeedbackItemDto[] }[] {
    const filtered = this.all.filter(f => {
      if (this.statusFilter === 'pending'     && f.isImplemented)  return false;
      if (this.statusFilter === 'implemented' && !f.isImplemented) return false;
      if (this.pageFilter && f.page !== this.pageFilter) return false;
      return true;
    });

    // Group and order by defined page order
    const map = new Map<string, FeedbackItemDto[]>();
    const allPages = [...PAGE_ORDER, ...new Set(filtered.map(f => f.page).filter(p => !PAGE_ORDER.includes(p)))];
    allPages.forEach(p => map.set(p, []));
    filtered.forEach(f => map.get(f.page)?.push(f) ?? map.set(f.page, [f]));

    return allPages
      .filter(p => (map.get(p)?.length ?? 0) > 0)
      .map(p => ({ page: p, items: map.get(p)! }));
  }

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading = true;
    this.feedbackSvc.getReport().subscribe({
      next: data => {
        this.all          = data;
        this.loading      = false;
        this.lastRefreshed = 'Refreshed ' + new Date().toLocaleTimeString();
      },
      error: () => { this.loading = false; }
    });
  }

  toggle(item: FeedbackItemDto): void {
    this.toggling.add(item.id);
    this.feedbackSvc.toggleImplemented(item.id).subscribe({
      next: () => {
        item.isImplemented = !item.isImplemented;
        this.toggling.delete(item.id);
      },
      error: () => { this.toggling.delete(item.id); }
    });
  }

  formatDate(iso: string): string {
    if (!iso) return '';
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      + ' ' + d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  }
}
