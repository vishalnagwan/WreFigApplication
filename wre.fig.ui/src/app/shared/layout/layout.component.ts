import { Component, OnInit, inject } from '@angular/core';
import { CommonModule }              from '@angular/common';
import { RouterModule }              from '@angular/router';
import { AuthService }               from '../../services/auth.service';
import { AuditService }              from '../../services/audit.service';
import { SignalrService }            from '../../services/signalr.service';
import { ROLES }                     from '../../../constants';

@Component({
  selector:   'app-layout',
  standalone: true,
  imports:    [CommonModule, RouterModule],
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
        <a routerLink="/compliance" routerLinkActive="active"
           *ngIf="canViewCompliance">Compliance</a>
        <a routerLink="/alerts" routerLinkActive="active"
           *ngIf="canViewAlerts">
          Alerts
          <span *ngIf="alertCount > 0" class="badge">{{alertCount}}</span>
        </a>
        <a routerLink="/users" routerLinkActive="active"
           *ngIf="isPlannerDashboard">Users</a>
        <a routerLink="/technician" routerLinkActive="active"
           *ngIf="isPlannerDashboard">Technician</a>
        <!-- Rollover link hidden — functionality intact, re-enable by un-commenting
        <a routerLink="/rollover" routerLinkActive="active"
           *ngIf="isPlannerDashboard">Rollover</a>
        -->
      </nav>
    </div>
    <div class="topbar-center">
      <span class="app-title">FIG (Field Information Guide)</span>
    </div>
    <div class="topbar-right">
      <div class="topbar-user">
        <span>{{userName}}</span>
        <button class="btn-ghost btn-sm" (click)="logout()">Sign out</button>
      </div>
    </div>
  </header>
  <main class="main-content">
    <router-outlet></router-outlet>
  </main>
</div>
  `
})
export class LayoutComponent implements OnInit {
  private auth    = inject(AuthService);
  private auditSvc = inject(AuditService);
  private signalr = inject(SignalrService);

  alertCount = 0;

  get userName(): string {
    return this.auth.getUserFullName();
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
