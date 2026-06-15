import { Component, OnInit, inject } from '@angular/core';

import { Router, RouterModule }      from '@angular/router';
import { AuthService }               from '../../../services/auth.service';
import { AuditService }              from '../../../services/audit.service';
import { SignalrService }            from '../../../services/signalr.service';
import { ROLES }                     from '../../../constant';
import { FeedbackPanelComponent }    from '../feedback-panel/feedback-panel.component';

const PAGE_MAP: Record<string, string> = {
  '':          'Home',
  'compliance':'Compliance',
  'alerts':    'Alerts',
  'users':     'Users',
  'technician':'Technician',
};

@Component({
  selector:   'app-layout',
  standalone: true,
  imports: [RouterModule, FeedbackPanelComponent],
  template: `
<div class="app-shell">
  <header class="topbar">
    <div class="topbar-left">
      <a routerLink="/" class="topbar-logo">
        <img src="assets/images/wre-logo.png" alt="Wind River Environmental" class="topbar-logo-img" />
      </a>
      <nav class="topbar-nav">
        <a routerLink="/" routerLinkActive="active"
        [routerLinkActiveOptions]="{exact:true}">Home</a>
        @if (canViewCompliance) {
          <a routerLink="/compliance" routerLinkActive="active"
          >Compliance</a>
        }
        @if (canViewAlerts) {
          <a routerLink="/alerts" routerLinkActive="active"
            >
            Alerts
            @if (alertCount > 0) {
              <span class="badge">{{alertCount}}</span>
            }
          </a>
        }
        @if (isPlannerDashboard) {
          <a routerLink="/users" routerLinkActive="active"
          >Users</a>
        }
        @if (isPlannerDashboard) {
          <a routerLink="/technician" routerLinkActive="active"
          >Technician</a>
        }
        <!-- Rollover link hidden — functionality intact, re-enable by un-commenting
        @if (isPlannerDashboard) {
          <a routerLink="/rollover" routerLinkActive="active">Rollover</a>
        }
        -->
      </nav>
    </div>
    <div class="topbar-center">
      <span class="app-title">FIG - Field Information Guide</span>
    </div>
    <div class="topbar-right">
      <button class="btn-ghost btn-sm" (click)="showFeedbackPanel = true">Feedback</button>
      <div class="topbar-user">
        <span>{{userName}} ({{userRoleLabel}})</span>
        <button class="btn-ghost btn-sm" (click)="logout()">Sign out</button>
      </div>
    </div>
  </header>
  <main class="main-content">
    <router-outlet></router-outlet>
  </main>
</div>

@if (showFeedbackPanel) {
  <app-feedback-panel
    [page]="currentPage"
    (close)="showFeedbackPanel = false">
  </app-feedback-panel>
}
`
})
export class LayoutComponent implements OnInit {
  private auth    = inject(AuthService);
  private auditSvc = inject(AuditService);
  private signalr = inject(SignalrService);
  private router  = inject(Router);

  alertCount        = 0;
  showFeedbackPanel = false;

  get currentPage(): string {
    const seg = this.router.url.split('/')[1]?.split('?')[0] ?? '';
    if (seg.startsWith('schedule')) return 'Schedule';
    return PAGE_MAP[seg] ?? 'Home';
  }

  get userName(): string {
    return this.auth.getUserFullName();
  }

  /** Friendly role label: "wre.fig.FieldSupervisor" → "Field Supervisor" */
  get userRoleLabel(): string {
    const role = this.auth.getUserRole() ?? '';
    return role
      .replace(/^wre\.fig\./, '')
      .replace(/([a-z])([A-Z])/g, '$1 $2');
  }

  get isPlannerDashboard(): boolean {
    return this.auth.hasRole(ROLES.Admin);
  }

  get canViewCompliance(): boolean {
    return this.auth.hasRole(
      ROLES.Admin, ROLES.FieldSupervisor,
      ROLES.DispatchSupervisor, ROLES.Planner, ROLES.Dispatcher
    );
  }

  get canViewAlerts(): boolean {
    return this.auth.hasRole(
      ROLES.Admin, ROLES.FieldSupervisor,
      ROLES.DispatchSupervisor, ROLES.Planner, ROLES.Dispatcher
    );
  }

  ngOnInit(): void {
    this.signalr.startAsync();
    this.loadAlertCount();
    this.signalr.alertCreated$.subscribe(() => this.loadAlertCount());
  }

  private loadAlertCount(): void {
    if (!this.canViewAlerts) return;
    this.auditSvc.getAlerts().subscribe({
      next: alerts => {
        const readKey = 'fig-read-alerts';
        const readIds = new Set<number>(
          JSON.parse(sessionStorage.getItem(readKey) ?? '[]')
        );
        this.alertCount = alerts.filter(a => !readIds.has(a.id)).length;
      },
      error: () => { /* silent */ }
    });
  }

  logout(): void {
    this.signalr.stopAsync();
    this.auth.logout();
  }
}
