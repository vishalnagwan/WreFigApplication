import { Component, Input } from '@angular/core';
import { CommonModule }     from '@angular/common';

@Component({
  selector:   'app-fill-bar',
  standalone: true,
  imports:    [CommonModule],
  template: `
<div class="fill-bar-track">
  <div class="fill-bar-fill" [class]="barClass" [style.width.%]="clampedPct"></div>
</div>
<span class="fill-bar-label">{{clampedPct | number:'1.0-0'}}%</span>
  `
})
export class FillBarComponent {
  @Input() pct: number = 0;

  get clampedPct(): number {
    return Math.min(100, Math.max(0, this.pct));
  }

  get barClass(): string {
    if (this.clampedPct >= 85) return 'green';
    if (this.clampedPct >= 60) return 'amber';
    return 'red';
  }
}
