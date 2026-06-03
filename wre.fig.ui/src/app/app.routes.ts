import { Routes }          from '@angular/router';
import { authGuard }        from './guards/auth.guard';
import { LayoutComponent }  from './components/shared/layout/layout.component';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./components/pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./components/pages/home/home.component').then(m => m.HomeComponent)
      },
      {
        path: 'schedule/:branchId',
        loadComponent: () => import('./components/pages/schedule/schedule.component').then(m => m.ScheduleComponent)
      },
      {
        path: 'alerts',
        loadComponent: () => import('./components/pages/alerts/alerts.component').then(m => m.AlertsComponent)
      },
      {
        path: 'compliance',
        loadComponent: () => import('./components/pages/compliance/compliance.component').then(m => m.ComplianceComponent)
      },
      {
        path: 'users',
        loadComponent: () => import('./components/pages/users/users.component').then(m => m.UsersComponent)
      },
      {
        path: 'technician',
        loadComponent: () => import('./components/pages/technician/technician.component').then(m => m.TechnicianComponent)
      },
      {
        path: 'rollover',
        loadComponent: () => import('./components/pages/rollover/rollover.component').then(m => m.RolloverComponent)
      }
    ]
  },
  {
    path: 'dev/feedback-report',
    loadComponent: () => import('./components/pages/feedback-report/feedback-report.component').then(m => m.FeedbackReportComponent)
  },
  { path: '**', redirectTo: '' }
];
