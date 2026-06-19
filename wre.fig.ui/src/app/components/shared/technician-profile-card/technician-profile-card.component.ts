import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';

/**
 * Normalised view-model the profile card renders. Callers map their own DTO
 * (schedule row, employee list item, …) into this shape so the card stays
 * decoupled from any single source.
 */
export interface TechnicianProfile {
  name:            string;
  jobTitle:        string | null;
  branchName:      string;
  defaultShift:    string;
  truckAssignment: string | null;
  truckId:         string | null;
  resourceTypes:   string[];
  managerName:     string | null;
  workPhone:       string | null;
  workMobilePhone: string | null;
  email?:          string | null;
}

/**
 * Permanent technician profile ("baseball card"), opened by clicking a
 * technician's name. This is distinct from the day-detail notes panel
 * (opened by clicking a schedule cell) — it shows only the standing profile,
 * never day-specific status or notes.
 *
 * Truck and branch/starting-location come from the technician's FIG record.
 * Certifications / limitations / driver key are intentionally not shown yet —
 * pending the Martha integration.
 */
@Component({
  selector:   'app-technician-profile-card',
  standalone: true,
  template: `
<div class="profile-card-overlay" (click)="close.emit()"></div>
<div class="detail-panel profile-card" role="dialog" aria-label="Technician profile">
  <!-- Header -->
  <div class="detail-panel-header">
    <div class="emp-avatar">{{initials}}</div>
    <div style="flex:1;">
      <div style="font-weight:700;font-size:.95rem;">{{profile.name}}</div>
      <div style="font-size:.78rem;color:var(--ink-light);">{{profile.jobTitle || 'Technician'}}</div>
    </div>
    <button class="btn-icon" (click)="close.emit()" title="Close">✕</button>
  </div>

  <!-- Body -->
  <div class="detail-panel-body">
    <div class="detail-panel-body-content">

      <!-- Assignment -->
      <div class="detail-section">
        <div class="detail-section-title">Assignment</div>
        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">Branch / Starting Location</div>
            <div>{{profile.branchName || '—'}}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Default Shift</div>
            <div>{{profile.defaultShift || '—'}}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Truck</div>
            <div>{{profile.truckAssignment || '—'}}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Truck ID</div>
            <div>{{profile.truckId || '—'}}</div>
          </div>
        </div>
      </div>

      <!-- Resource types -->
      <div class="detail-section">
        <div class="detail-section-title">Resource Types</div>
        @if (profile.resourceTypes.length > 0) {
          <div class="branch-tags">
            @for (rt of profile.resourceTypes; track rt) {
              <span class="branch-tag resource-tag">{{rt}}</span>
            }
          </div>
        } @else {
          <div style="color:var(--ink-faint);font-size:.8rem;">—</div>
        }
      </div>

      <!-- Contact -->
      <div class="detail-section">
        <div class="detail-section-title">Contact</div>
        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">Manager</div>
            <div>{{profile.managerName || '—'}}</div>
          </div>
          @if (profile.email !== undefined) {
            <div class="info-item">
              <div class="info-label">Email</div>
              <div>{{profile.email || '—'}}</div>
            </div>
          }
          <div class="info-item">
            <div class="info-label">Work Phone</div>
            <div>{{formatPhone(profile.workPhone)}}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Mobile Phone</div>
            <div>{{formatPhone(profile.workMobilePhone)}}</div>
          </div>
        </div>
      </div>

    </div>
  </div>
</div>
`,
  styles: [`
    .profile-card-overlay {
      position: fixed; inset: 0; background: rgba(0,0,0,.25); z-index: 60;
    }
    .profile-card {
      position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
      width: min(440px, 92vw); max-height: 86vh; z-index: 61;
      background: var(--surface, #fff); border-radius: 12px;
      box-shadow: 0 12px 40px rgba(0,0,0,.22); overflow: hidden;
      display: flex; flex-direction: column;
    }
  `]
})
export class TechnicianProfileCardComponent {
  @Input({ required: true }) profile!: TechnicianProfile;
  @Output() close = new EventEmitter<void>();

  @HostListener('document:keydown.escape')
  onEscape(): void { this.close.emit(); }

  get initials(): string {
    return (this.profile?.name ?? '')
      .split(/\s+/).filter(Boolean).slice(0, 2)
      .map(p => p[0]?.toUpperCase() ?? '').join('');
  }

  formatPhone(p: string | null): string {
    if (!p) return '—';
    const d = p.replace(/\D/g, '');
    if (d.length === 10)                      return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
    if (d.length === 11 && d.startsWith('1')) return `(${d.slice(1, 4)}) ${d.slice(4, 7)}-${d.slice(7)}`;
    return p; // non-standard input left untouched
  }
}
