import { Component, Input } from '@angular/core';
import { CommonModule }     from '@angular/common';
import { StatusCodeDto }    from '../../../models/schedule.model';

@Component({
  selector:   'app-shift-chip',
  standalone: true,
  imports:    [CommonModule],
  template: `
<span class="shift-chip {{chipClass}}" [class.just-painted]="justPainted">
  {{code || '—'}}
  <span *ngIf="hasNote" title="Has note">🔔</span>
</span>
  `
})
export class ShiftChipComponent {
  @Input() code: string = '—';
  @Input() hasNote = false;
  @Input() justPainted = false;
  @Input() statusCodes: StatusCodeDto[] = [];

  get chipClass(): string {
    if (!this.code || this.code === '—') return 'status-blank';
    const sc = this.statusCodes.find(s => s.code === this.code);
    return sc ? sc.cssClass : 'status-blank';
  }
}
