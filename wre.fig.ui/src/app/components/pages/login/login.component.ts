import { Component }       from '@angular/core';
import { CommonModule }    from '@angular/common';
import { FormsModule }     from '@angular/forms';
import { Router }          from '@angular/router';
import { AuthService }     from '../../../services/auth.service';

@Component({
  selector:   'app-login',
  standalone: true,
  imports:    [CommonModule, FormsModule],
  template: `
<div class="login-wrapper">
  <div class="login-card">
    <div class="login-logo">
      <img src="assets/images/wre-logo.png" alt="Wind River Environmental" class="login-logo-img" />
    </div>

    <h2 class="login-heading">Sign In</h2>

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

    <p class="login-error" *ngIf="error">{{error}}</p>

    <button class="btn-primary login-btn"
            (click)="login()" [disabled]="loading">
      {{loading ? 'Signing in...' : 'Sign In'}}
    </button>
  </div>
</div>
  `
})
export class LoginComponent {
  email      = '';
  password   = '';
  rememberMe = false;
  loading    = false;
  error      = '';

  constructor(private auth: AuthService, private router: Router) {
    // Pre-fill email if previously remembered
    const saved = localStorage.getItem('wre-remember-email');
    if (saved) { this.email = saved; this.rememberMe = true; }
  }

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
