import { Component, Optional }        from '@angular/core';
import { CommonModule }               from '@angular/common';
import { FormsModule }                from '@angular/forms';
import { Router, ActivatedRoute }     from '@angular/router';
import { AuthService }                from '../../../services/auth.service';
import { MsalService }                from '@azure/msal-angular';
import { environment }                from '../../../../environments/environment';

@Component({
  selector:   'app-login',
  standalone: true,
  imports:    [CommonModule, FormsModule],
  template: `
<div class="login-wrapper">
  <div class="login-card">

    <!-- Logo -->
    <div class="login-logo">
      <img src="assets/images/wre-logo.png"
           alt="Wind River Environmental"
           class="login-logo-img" />
    </div>

    <h2 class="login-heading">Sign In</h2>

    <!-- Microsoft login button — shown only in MSAL mode -->
    <ng-container *ngIf="msalMode">
      <button class="btn-microsoft" (click)="loginMicrosoft()" [disabled]="msalLoading">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 21 21">
          <rect x="1"  y="1"  width="9" height="9" fill="#f25022"/>
          <rect x="11" y="1"  width="9" height="9" fill="#7fba00"/>
          <rect x="1"  y="11" width="9" height="9" fill="#00a4ef"/>
          <rect x="11" y="11" width="9" height="9" fill="#ffb900"/>
        </svg>
        {{ msalLoading ? 'Redirecting...' : 'Sign in with Microsoft' }}
      </button>

      <!-- Divider — only show when form login is also available -->
      <div class="login-divider" *ngIf="showFormAuth">
        <span>or</span>
      </div>
    </ng-container>

    <!-- Form-based login — hidden in MSAL-only mode (e.g. production) -->
    <ng-container *ngIf="showFormAuth">
      <div class="field">
        <label for="email">Email</label>
        <input id="email" type="email" [(ngModel)]="email"
               placeholder=""
               (keydown.enter)="login()"
               autocomplete="email" />
      </div>

      <div class="field">
        <label for="password">Password</label>
        <input id="password" type="password" [(ngModel)]="password"
               placeholder=""
               (keydown.enter)="login()"
               autocomplete="current-password" />
      </div>

      <div class="login-remember">
        <input id="remember" type="checkbox" [(ngModel)]="rememberMe" />
        <label for="remember">Remember me</label>
      </div>
    </ng-container>

    <p class="login-error" *ngIf="error">{{ error }}</p>

    <ng-container *ngIf="showFormAuth">
      <button class="btn-primary login-btn"
              (click)="login()" [disabled]="loading">
        {{ loading ? 'Signing in...' : 'Sign In' }}
      </button>
    </ng-container>

  </div>
</div>
  `
})
export class LoginComponent {

  // ── State 
  email       = '';
  password    = '';
  rememberMe  = false;
  loading     = false;
  msalLoading = false;
  error       = '';

  // ── Mode flags 
  readonly msalMode     = environment.useMsalAuth;
  readonly showFormAuth = !environment.useMsalAuth || !environment.production;

  constructor(
    private auth:              AuthService,
    private router:            Router,
    private route:             ActivatedRoute,
    @Optional() private msal?: MsalService,
  ) {
    // Pre-fill email if previously remembered
    const saved = localStorage.getItem('wre-remember-email');
    if (saved) { this.email = saved; this.rememberMe = true; }

    // Show meaningful error messages from MSAL redirect failures
    this.route.queryParams.subscribe(params => {
      const detail = params['detail'] ?? '';
      switch (params['error']) {
        case 'msal_login_failed':
          this.error = detail
            ? `Microsoft sign-in failed (${detail}). Please try again.`
            : 'Microsoft sign-in failed. Please try again.';
          break;
        case 'msal_redirect_failed':
          this.error = 'Sign-in was cancelled or timed out. Please try again.';
          break;
        case 'token_acquisition_failed':
          this.error = detail.includes('consent_required') ||
                       detail.includes('interaction_required')
            ? 'Additional permissions required. Contact your administrator.'
            : `Could not get access token (${detail}). Ensure "Expose an API" is configured in Azure.`;
          break;
        case 'fig_auth_failed':
          this.error = 'No FIG role assigned to your account. Ask your administrator to assign a role in Azure AD.';
          break;
      }
    });
  }

  // ── Microsoft login 
  loginMicrosoft(): void {
    if (!this.msal) return;
    this.msalLoading = true;
    // Standard OIDC scopes only for login.
    // The api://xxx/user.access token is acquired silently in APP_INITIALIZER
    // after the redirect — the FIG app is pre-authorized on "Expose an API"    
    this.msal.loginRedirect({
      scopes: ['openid', 'profile', 'email']
    });
  }

  // ── Form-based login 
  login(): void {
    if (!this.email || !this.password) {
      this.error = 'Please enter your email and password.';
      return;
    }
    this.loading = true;
    this.error   = '';

    this.auth.login({ email: this.email, password: this.password }).subscribe({
      next: () => {
        if (this.rememberMe) {
          localStorage.setItem('wre-remember-email', this.email);
        } else {
          localStorage.removeItem('wre-remember-email');
        }
        this.router.navigate(['/']);
      },
      error: () => {
        this.error   = 'Invalid email or password.';
        this.loading = false;
      }
    });
  }
}
