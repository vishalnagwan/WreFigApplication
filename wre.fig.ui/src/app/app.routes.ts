import { Routes }          from '@angular/router';
import { authGuard }        from './guards/auth.guard';
import { LayoutComponent }  from './shared/layout/layout.component';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
      },
      {
        path: 'schedule/:branchId',
        loadComponent: () => import('./pages/schedule/schedule.component').then(m => m.ScheduleComponent)
      },
      {
        path: 'alerts',
        loadComponent: () => import('./pages/alerts/alerts.component').then(m => m.AlertsComponent)
      },
      {
        path: 'compliance',
        loadComponent: () => import('./pages/compliance/compliance.component').then(m => m.ComplianceComponent)
      },
      {
        path: 'users',
        loadComponent: () => import('./pages/users/users.component').then(m => m.UsersComponent)
      },
      {
        path: 'technician',
        loadComponent: () => import('./pages/technician/technician.component').then(m => m.TechnicianComponent)
      },
      {
        path: 'rollover',
        loadComponent: () => import('./pages/rollover/rollover.component').then(m => m.RolloverComponent)
      }
    ]
  },
  { path: '**', redirectTo: '' }
];
