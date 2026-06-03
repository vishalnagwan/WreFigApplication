import {
  Component, Input, Output, EventEmitter,
  OnInit, OnDestroy, inject
} from '@angular/core';
import { CommonModule }        from '@angular/common';
import { Subscription }        from 'rxjs';
import { InstructionService }  from '../../../services/instruction.service';
import { SignalrService }      from '../../../services/signalr.service';
import { BranchInstructionsDto, SectionDto } from '../../../models/instruction.model';

@Component({
  selector:   'app-branch-instructions',
  standalone: true,
  imports:    [CommonModule],
  template: `
<div>
  <div class="instr-live-banner" *ngIf="showLiveBanner">
    🔄 Instructions updated live — page refreshed automatically.
  </div>
  <div class="instr-bar" *ngIf="vm">
    <span *ngIf="sortedSections.length === 0" class="instr-empty">
      No instructions added yet.
    </span>
    <span *ngFor="let sec of sortedSections" class="instr-chip"
          [class.active]="activeKey === sec.key"
          [class.has-urgent]="hasHighlight(sec)"
          (click)="togglePopover(sec.key)">
      {{sec.shortTitle}}
      <span class="instr-badge" [class.urgent]="hasHighlight(sec)">{{sec.lines.length}}</span>
    </span>
    <button class="btn-ghost btn-sm" *ngIf="canEdit" (click)="editRequested.emit()" style="margin-left:auto;">
      ✏ Edit
    </button>
  </div>

  <!-- Popover for active section -->
  <div class="instr-popover" *ngIf="activeSection">
    <div class="instr-popover-hdr">
      {{activeSection.title}}
      <button class="btn-icon" style="color:#fff;font-size:.8rem;" (click)="activeKey = null">✕</button>
    </div>
    <div class="instr-popover-body">
      <div *ngFor="let line of activeSection.lines"
           class="instr-line"
           [class.highlighted]="line.isHighlighted">
        {{line.content}}
      </div>
      <div *ngIf="activeSection.lines.length === 0" style="color:var(--ink-faint);font-size:.8rem;">
        No entries yet.
      </div>
    </div>
  </div>
</div>
  `
})
export class BranchInstructionsComponent implements OnInit, OnDestroy {
  @Input() branchId!: number;
  @Input() canEdit = false;
  @Output() editRequested = new EventEmitter<void>();

  private instrSvc  = inject(InstructionService);
  private signalr   = inject(SignalrService);
  private sub?: Subscription;

  vm: BranchInstructionsDto | null = null;
  activeKey: string | null = null;
  showLiveBanner = false;
  private bannerTimer?: ReturnType<typeof setTimeout>;

  get sortedSections(): SectionDto[] {
    if (!this.vm) return [];
    return [...this.vm.sections]
      .filter(s => s.lines.length > 0)
      .sort((a, b) => a.shortTitle.localeCompare(b.shortTitle));
  }

  get activeSection(): SectionDto | null {
    return this.vm?.sections.find(s => s.key === this.activeKey) ?? null;
  }

  hasHighlight(sec: SectionDto): boolean {
    return sec.lines.some(l => l.isHighlighted);
  }

  togglePopover(key: string): void {
    this.activeKey = this.activeKey === key ? null : key;
  }

  ngOnInit(): void {
    this.load();
    this.sub = this.signalr.instructionUpdated$.subscribe(event => {
      if (event.branchId === this.branchId) {
        this.reload();
        this.showLiveBanner = true;
        clearTimeout(this.bannerTimer);
        this.bannerTimer = setTimeout(() => this.showLiveBanner = false, 6000);
      }
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    clearTimeout(this.bannerTimer);
  }

  reload(): void {
    this.load();
  }

  private load(): void {
    this.instrSvc.getForBranch(this.branchId).subscribe({
      next: vm => this.vm = vm,
      error: () => { /* silent */ }
    });
  }
}
