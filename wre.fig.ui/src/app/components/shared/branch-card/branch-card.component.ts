import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule }    from '@angular/common';
import { BranchSummaryDto } from '../../../models/branch.model';
import { FillBarComponent } from '../fill-bar/fill-bar.component';

@Component({
  selector:   'app-branch-card',
  standalone: true,
  imports:    [CommonModule, FillBarComponent],
  template: `
<div class="branch-card"
     [class.pinned]="isPinned"
     [class.has-notes]="hasUnviewedNotes"
     [class.status-red]="summary.status === 'red'"
     (click)="cardClick.emit()">
  <div class="branch-card-actions">
    <button class="pin-btn" [class.pinned]="isPinned"
            (click)="$event.stopPropagation(); togglePin.emit(summary.branchId)"
            title="Pin branch">★</button>
    <span *ngIf="hasUnviewedNotes" class="bell-icon active" title="Has unviewed notes">🔔</span>
  </div>
  <div class="branch-card-name">{{summary.branchName}}</div>
  <div class="branch-card-drivers" *ngIf="!summary.isAcquisition && summary.driverCount">
    {{summary.driverCount}} driver{{summary.driverCount === 1 ? '' : 's'}}
  </div>
  <ng-container *ngIf="!summary.isAcquisition">
    <app-fill-bar [pct]="summary.fillRate"></app-fill-bar>
  </ng-container>
  <ng-container *ngIf="summary.isAcquisition">
    <div class="branch-card-acq-label">acquisition</div>
    <div class="branch-card-acq-sub">Under construction</div>
  </ng-container>
  <div style="margin-top:.4rem;">
    <span class="status-pill" [ngClass]="summary.status">{{statusLabel}}</span>
  </div>
</div>
  `
})
export class BranchCardComponent {
  @Input() summary!: BranchSummaryDto;
  @Input() isPinned = false;
  @Input() hasUnviewedNotes = false;
  @Output() cardClick  = new EventEmitter<void>();
  @Output() togglePin  = new EventEmitter<number>();

  get statusLabel(): string {
    const map: Record<string, string> = {
      green: 'Up to date',
      amber: 'Stale',
      red:   'Needs attention'
    };
    return map[this.summary?.status] ?? this.summary?.status ?? '';
  }
}
