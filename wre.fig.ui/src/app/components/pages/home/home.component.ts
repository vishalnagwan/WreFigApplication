import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { FormsModule }               from '@angular/forms';
import { Router }                    from '@angular/router';
import { BranchService }             from '../../../services/branch.service';
import { AuthService }               from '../../../services/auth.service';
import { BranchSummaryDto }          from '../../../models/branch.model';
import { BranchCardComponent }       from '../../shared/branch-card/branch-card.component';
import { REGION_ORDER }              from '../../../constant';

interface RegionGroup {
  region:   string;
  branches: BranchSummaryDto[];
}

@Component({
  selector:   'app-home',
  standalone: true,
  imports:    [CommonModule, FormsModule, BranchCardComponent, UpperCasePipe],
  template: `
<div class="home-header">
  <div class="home-header-top">
    <h1 class="home-title">{{dashboardTitle}}</h1>
    <div style="display:flex;flex-direction:column;align-items:flex-end;gap:.4rem;">
      <div class="home-search-wrap">
        <input type="text" class="home-search-input" placeholder="Search branches..."
               [(ngModel)]="searchText" (ngModelChange)="applyFilter()" />
        <button class="btn-icon home-refresh-btn" (click)="load()" title="Refresh">↺</button>
      </div>
      <div class="month-nav-btns">
        <button class="btn-icon month-nav-arrow" (click)="prevMonth()">‹</button>
        <button class="month-nav-pill active">{{thisMonthLabel}}</button>
        <button class="month-nav-pill" (click)="nextMonth()" [disabled]="isMaxMonth">{{nextMonthLabel}}</button>
        <button class="btn-icon month-nav-arrow" (click)="nextMonth()" [disabled]="isMaxMonth">›</button>
      </div>
    </div>
  </div>
</div>

<div *ngIf="loading" style="text-align:center;padding:3rem;color:var(--ink-faint);">
  <div style="font-size:1.5rem;margin-bottom:.5rem;">Loading...</div>
  Loading branches...
</div>

<div *ngIf="!loading && error" style="text-align:center;padding:3rem;">
  <div style="color:#e53e3e;font-weight:600;margin-bottom:.75rem;">Could not load branches</div>
  <div style="color:var(--ink-faint);font-size:.85rem;margin-bottom:1rem;">{{error}}</div>
  <button class="btn-primary" (click)="load()">Retry</button>
</div>

<div *ngIf="!loading && !error && summaries.length === 0"
     style="text-align:center;padding:3rem;color:var(--ink-faint);">
  No branches available for your account.
</div>

<div *ngIf="!loading && !error && filtered.length === 0 && searchText && summaries.length > 0"
     style="text-align:center;padding:2rem;color:var(--ink-faint);">
  No branches match "{{searchText}}".
</div>

<div *ngFor="let group of grouped" class="region-group">
  <div class="region-header">
    <span class="region-name">{{group.region | uppercase}} · {{group.branches.length}} FIELD OFFICE{{group.branches.length === 1 ? '' : 'S'}}</span>
    <span class="attention-badge" *ngIf="attentionCount(group.branches) > 0">
      {{attentionCount(group.branches)}} need attention
    </span>
    <span class="all-ok-badge" *ngIf="attentionCount(group.branches) === 0">
      All up to date
    </span>
  </div>
  <div class="branch-card-grid">
    <app-branch-card
      *ngFor="let b of group.branches"
      [summary]="b"
      [isPinned]="pinnedIds.has(b.branchId)"
      [hasUnviewedNotes]="b.hasNotes"
      (cardClick)="goToSchedule(b.branchId)"
      (togglePin)="togglePin(b.branchId)">
    </app-branch-card>
  </div>
</div>

<div class="dashboard-footer" *ngIf="!loading && !error && summaries.length > 0">
  <span>Showing {{filtered.length}} of {{summaries.length}} · click a field office to open schedule</span>
  <span>{{monthLabel}} fill rates</span>
</div>
  `
})
export class HomeComponent implements OnInit {
  private branchSvc = inject(BranchService);
  private auth      = inject(AuthService);
  private router    = inject(Router);

  summaries:   BranchSummaryDto[] = [];
  filtered:    BranchSummaryDto[] = [];
  grouped:     RegionGroup[]      = [];
  searchText = '';
  year  = new Date().getFullYear();
  month = new Date().getMonth() + 1;
  loading = true;
  error   = '';
  pinnedIds  = new Set<number>();

  private readonly now = new Date();

  get isMaxMonth(): boolean {
    const maxY = this.now.getFullYear();
    const maxM = this.now.getMonth() + 2;
    return (this.year === maxY && this.month >= maxM) || (this.year > maxY);
  }

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

  get dashboardTitle(): string {
    const user  = this.auth.currentUser();
    // Admin user gets its own title regardless of role
    if (user?.email?.toLowerCase() === 'admin@wre.com' ||
        user?.fullName?.toLowerCase() === 'admin user') {
      return 'Admin Dashboard';
    }
    // Roles are stored in full form ("wre.fig.Admin") — strip the prefix
    // so the map works for both full and legacy short names.
    const role = (user?.role ?? '').replace(/^wre\.fig\./, '');
    const map: Record<string, string> = {
      Admin:              'Admin Dashboard',
      FieldSupervisor:    'Field Supervisor Dashboard',
      DispatchSupervisor: 'Dispatch Supervisor Dashboard',
      Planner:            'Planner Dashboard',
      Dispatcher:         'Dispatcher Dashboard',
      ReadOnly:           'Branch Dashboard'
    };
    return role ? (map[role] ?? 'Branch Dashboard') : 'Branch Dashboard';
  }

  ngOnInit(): void {
    this.loadPins();
    this.load();
  }

  goThisMonth(): void {
    this.year  = this.now.getFullYear();
    this.month = this.now.getMonth() + 1;
    this.load();
  }

  goNextMonth(): void {
    if (this.isMaxMonth) return;
    this.month = this.now.getMonth() + 2 > 12 ? 1 : this.now.getMonth() + 2;
    this.year  = this.now.getMonth() + 2 > 12 ? this.now.getFullYear() + 1 : this.now.getFullYear();
    this.load();
  }

  prevMonth(): void {
    if (this.month === 1) { this.year--; this.month = 12; }
    else this.month--;
    this.load();
  }

  nextMonth(): void {
    if (this.isMaxMonth) return;
    if (this.month === 12) { this.year++; this.month = 1; }
    else this.month++;
    this.load();
  }

  goToSchedule(branchId: number): void {
    this.router.navigate(['/schedule', branchId], {
      queryParams: { year: this.year, month: this.month }
    });
  }

  togglePin(branchId: number): void {
    if (this.pinnedIds.has(branchId)) this.pinnedIds.delete(branchId);
    else this.pinnedIds.add(branchId);
    this.savePins();
    this.buildGrouped();
  }

  attentionCount(branches: BranchSummaryDto[]): number {
    return branches.filter(b => b.status === 'red').length;
  }

  applyFilter(): void {
    const q = this.searchText.toLowerCase();
    this.filtered = q
      ? this.summaries.filter(b =>
          b.branchName.toLowerCase().includes(q) ||
          b.city.toLowerCase().includes(q) ||
          b.state.toLowerCase().includes(q) ||
          b.regionName.toLowerCase().includes(q))
      : [...this.summaries];
    this.buildGrouped();
  }

  load(): void {
    this.loading = true;
    this.error   = '';
    this.branchSvc.getSummaries(this.year, this.month).subscribe({
      next: data => {
        try {
          this.summaries = data;
          this.applyFilter();
          this.loading = false;
        } catch (e: any) {
          this.loading = false;
          this.error = `Runtime error in next: ${e?.message ?? e}`;
          console.error('[Home] next() threw:', e);
        }
      },
      error: (err) => {
        this.loading = false;
        if (err.status === 0 || err.statusText === 'Timeout') {
          this.error = (err.message ?? '') || 'Cannot reach API on http://localhost:5100. Make sure the API is running (dotnet run --launch-profile http).';
        } else if (err.status === 401) {
          this.error = 'Session expired - please log out and log in again.';
        } else {
          this.error = `API error ${err.status}: ${err.error?.error ?? err.error?.message ?? err.message ?? 'Unknown'}` +
            (err.error?.inner ? ` | Inner: ${err.error.inner}` : '');
        }
        console.error('[Home] Branch load failed:', err);
        console.error('[Home] Error body:', err.error);
      }
    });
  }

  private buildGrouped(): void {
    const regionMap = new Map<string, BranchSummaryDto[]>();
    for (const b of this.filtered) {
      const r = b.regionName || 'Other';
      if (!regionMap.has(r)) regionMap.set(r, []);
      regionMap.get(r)!.push(b);
    }
    const ordered: RegionGroup[] = [];
    for (const region of REGION_ORDER) {
      if (regionMap.has(region)) {
        ordered.push({ region, branches: regionMap.get(region)! });
        regionMap.delete(region);
      }
    }
    for (const [region, branches] of regionMap) {
      ordered.push({ region, branches });
    }
    this.grouped = ordered;
  }

  private loadPins(): void {
    const userId = this.auth.currentUser()?.userId ?? 'guest';
    const key = `wre-pins:${userId}`;
    try {
      const ids: number[] = JSON.parse(localStorage.getItem(key) ?? '[]');
      this.pinnedIds = new Set(ids);
    } catch { this.pinnedIds = new Set(); }
  }

  private savePins(): void {
    const userId = this.auth.currentUser()?.userId ?? 'guest';
    const key = `wre-pins:${userId}`;
    localStorage.setItem(key, JSON.stringify([...this.pinnedIds]));
  }
}
