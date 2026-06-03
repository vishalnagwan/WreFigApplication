import {
  Component, Input, Output, EventEmitter,
  OnInit, inject
} from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';
import { InstructionService }  from '../../../services/instruction.service';
import {
  BranchInstructionsDto,
  SectionDto,
  InstructionLineDto
} from '../../../models/instruction.model';

interface EditLine extends InstructionLineDto {
  _deleted?: boolean;
}

interface EditSection extends SectionDto {
  lines: EditLine[];
}

interface EditVm extends BranchInstructionsDto {
  sections: EditSection[];
}

@Component({
  selector:   'app-branch-instruction-editor',
  standalone: true,
  imports:    [CommonModule, FormsModule],
  template: `
<div class="instr-editor-overlay" (click)="onOverlayClick($event)"></div>
<div class="instr-editor-panel">
  <!-- Header -->
  <div class="instr-editor-header">
    <div>
      <div style="font-weight:700;font-size:.95rem;">Edit Instructions</div>
      <div style="font-size:.78rem;opacity:.7;">{{branchName}}</div>
    </div>
    <button class="btn-icon" style="color:#e2e8f0;" (click)="closed.emit()">✕</button>
  </div>

  <!-- Body -->
  <div class="instr-editor-body" *ngIf="editVm">
    <div *ngFor="let sec of sortedSections">
      <div class="instr-section-hdr" [class.bottom]="sec.position === 1">{{sec.title}}</div>
      <div *ngFor="let line of sec.lines; let i = index">
        <div class="instr-line-row" *ngIf="!line._deleted">
          <textarea class="instr-line-textarea" [(ngModel)]="line.content"
                    rows="2"></textarea>
          <button class="instr-hl-btn" (click)="line.isHighlighted = !line.isHighlighted"
                  [title]="line.isHighlighted ? 'Highlighted (urgent)' : 'Not highlighted'">
            {{line.isHighlighted ? '🔴' : '⚪'}}
          </button>
          <button class="instr-del-btn" (click)="deleteLine(sec, i)" title="Delete line">🗑</button>
        </div>
      </div>
      <button class="btn-ghost btn-sm" (click)="addLine(sec)" style="margin-top:.4rem;">+ Add line</button>
    </div>
  </div>

  <!-- Footer -->
  <div class="instr-editor-footer">
    <button class="btn-primary" (click)="save()" [disabled]="saving">
      {{saving ? 'Saving...' : 'Save'}}
    </button>
    <button class="btn-ghost" (click)="closed.emit()" [disabled]="saving">Cancel</button>
    <span class="instr-save-status">
      <span *ngIf="saveStatus === 'saved'" style="color:#16a34a;">✓ Saved</span>
      <span *ngIf="saveStatus === 'error'" style="color:#dc2626;">Save failed</span>
    </span>
  </div>
</div>
  `
})
export class BranchInstructionEditorComponent implements OnInit {
  @Input() vm!: BranchInstructionsDto;
  @Input() branchName = '';
  @Output() saved  = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  private instrSvc = inject(InstructionService);

  editVm: EditVm | null = null;
  saving = false;
  saveStatus: '' | 'saved' | 'error' = '';
  private nextTempId = -1;

  get sortedSections(): EditSection[] {
    if (!this.editVm) return [];
    return [...this.editVm.sections]
      .sort((a, b) => a.title.localeCompare(b.title));
  }

  ngOnInit(): void {
    // Deep copy so Cancel discards changes
    this.editVm = JSON.parse(JSON.stringify(this.vm)) as EditVm;
  }

  addLine(sec: EditSection): void {
    sec.lines.push({
      id: this.nextTempId--,
      content: '',
      isHighlighted: false,
      sortOrder: sec.lines.length,
      updatedByName: null,
      updatedAt: new Date().toISOString(),
      _deleted: false
    });
  }

  deleteLine(sec: EditSection, index: number): void {
    const line = sec.lines[index];
    if (line.id < 0) {
      sec.lines.splice(index, 1);
    } else {
      line._deleted = true;
    }
  }

  save(): void {
    if (!this.editVm) return;
    this.saving = true;
    this.saveStatus = '';

    // Build clean DTO — exclude deleted lines, filter empty content
    const dto: BranchInstructionsDto = {
      branchId: this.editVm.branchId,
      sections: this.editVm.sections.map(sec => ({
        ...sec,
        lines: sec.lines
          .filter(l => !l._deleted && l.content.trim() !== '')
          .map(({ _deleted: _d, ...rest }) => ({ ...rest }))
      }))
    };

    this.instrSvc.save(dto.branchId, dto).subscribe({
      next: () => {
        this.saving = false;
        this.saveStatus = 'saved';
        this.saved.emit();
        setTimeout(() => this.saveStatus = '', 2000);
      },
      error: () => { this.saving = false; this.saveStatus = 'error'; }
    });
  }

  onOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('instr-editor-overlay')) {
      this.closed.emit();
    }
  }
}
