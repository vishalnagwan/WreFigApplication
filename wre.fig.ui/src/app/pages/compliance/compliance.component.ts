import { Component, OnInit, inject } from '@angular/core';
import { CommonModule }              from '@angular/common';
import { RouterModule }              from '@angular/router';
import { BranchService }             from '../../services/branch.service';
import { ComplianceDto, BranchComplianceRowDto } from '../../models/branch.model';
import { FillBarComponent }          from '../../shared/fill-bar/fill-bar.component';

@Component({
  selector:   'app-compliance',
  standalone: true,
  imports:    [CommonModule, RouterModule, FillBarComponent],
  template: `
<div class="page-header">
  <h1>Compliance</h1>
  <div class="month-nav" style="margin-left:auto;">
    <button class="btn-icon" (click)="prevMonth()">‹</button>
    <span>{{monthLabel}}</span>
    <button class="btn-icon" (click)="nextMonth()" [disabled]="isMaxMonth">›</button>
  </div>
</div>

<div *ngIf="loading" style="text-align:center;padding:3rem;color:var(--ink-faint);">Loading...</div>

<ng-container *ngIf="!loading && compliance">
  <!-- KPI row -->
  <div class="kpi-row">
    <div class="kpi-card">
      <div class="kpi-value">{{compliance!.averageFillRate | number:'1.0-1'}}%</div>
      <div class="kpi-label">Average Fill Rate</div>
    </div>
    <div class="kpi-card green">
      <div class="kpi-value">{{compliance!.upToDateCount}}</div>
      <div class="kpi-label">Fully Up-To-Date (≥85%)</div>
    </div>
    <div class="kpi-card red">
      <div class="kpi-value">{{compliance!.belowThresholdCount}}</div>
      <div class="kpi-label">Needs Attention (&lt;75%)</div>
    </div>
  </div>

  <!-- Table -->
  <table class="compliance-table">
    <thead>
      <tr>
        <th>Branch</th>
        <th>Fill Rate</th>
        <th>Days Complete</th>
        <th>Last Updated</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let row of sortedRows"
          [routerLink]="['/schedule', row.branchId]"
          [queryParams]="{year: year, month: month}"
          class="clickable">
        <td>{{row.branchName}}</td>
        <td style="min-width:120px;">
          <app-fill-bar [pct]="row.fillRate"></app-fill-bar>
        </td>
        <td>{{row.daysComplete}}/{{row.totalWorkdays}}</td>
        <td>{{row.lastUpdated ? (row.lastUpdated | date:'MM/dd') : '—'}}</td>
        <td><span class="status-pill" [class]="row.status">{{statusLabel(row.status)}}</span></td>
      </tr>
    </tbody>
  </table>
</ng-container>
  `
})
export class ComplianceComponent implements OnInit {
  private branchSvc = inject(BranchService);

  compliance: ComplianceDto | null = null;
  year  = new Date().getFullYear();
  month = new Date().getMonth() + 1;
  loading = true;

  private readonly now = new Date();

  get isMaxMonth(): boolean {
    return (this.year === this.now.getFullYear() && this.month >= this.now.getMonth() + 2) ||
           (this.year > this.now.getFullYear());
  }

  get monthLabel(): string {
    const months = [
      'January','February','March','April','May','June',
      'July','August','September','October','November','December'
    ];
    return `${months[this.month - 1]} ${this.year}`;
  }

  get sortedRows(): BranchComplianceRowDto[] {
    return [...(this.compliance?.rows ?? [])].sort((a, b) => a.fillRate - b.fillRate);
  }

  statusLabel(status: string): string {
    const map: Record<string, string> = {
      green: 'Up to Date', amber: 'In Progress', red: 'Needs Attention'
    };
    return map[status] ?? status;
  }

  ngOnInit(): void {
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

  private load(): void {
    this.loading = true;
    this.branchSvc.getCompliance(this.year, this.month).subscribe({
      next: data => { this.compliance = data; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }
}
