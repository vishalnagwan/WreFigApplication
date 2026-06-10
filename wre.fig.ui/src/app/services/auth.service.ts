import { Injectable, signal, Optional }            from '@angular/core';
import { HttpClient }                               from '@angular/common/http';
import { Router }                                   from '@angular/router';
import { Observable, tap }                          from 'rxjs';
import { environment }                              from '../../environments/environment';
import { AuthUser, LoginRequest, LoginResponse }    from '../models/auth.model';
import { MsalService }                              from '@azure/msal-angular';

const TOKEN_KEY = 'fig_token';
const USER_KEY  = 'fig_user';

@Injectable({ providedIn: 'root' })
export class AuthService {

  readonly currentUser = signal<AuthUser | null>(this.loadUser());
  readonly isMsalMode  = environment.useMsalAuth;

  constructor(
    private http:              HttpClient,
    private router:            Router,
    @Optional() private msal?: MsalService,
  ) {}

  // ── Form-based login (existing, unchanged) ────────────────────────
  login(dto: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${environment.apiUrl}/auth/login`, dto
    ).pipe(
      tap(res => this.persistSession(res))
    );
  }

  // ── MSAL: exchange Azure token for FIG JWT ────────────────────────
  loginWithMicrosoft(azureToken: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${environment.apiUrl}/auth/microsoft`,
      { accessToken: azureToken }
    ).pipe(
      tap(res => this.persistSession(res))
    );
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this.currentUser.set(null);
    if (this.isMsalMode && this.msal) {
      this.msal.logoutRedirect();
    } else {
      this.router.navigate(['/login']);
    }
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  hasRole(...roles: string[]): boolean {
    const user = this.currentUser();
    return !!user && roles.includes(user.role);
  }

  getUserRole(): string | null {
    return this.currentUser()?.role ?? null;
  }

  getUserFullName(): string {
    return this.currentUser()?.fullName ?? '';
  }

  private persistSession(res: LoginResponse): void {
    localStorage.setItem(TOKEN_KEY, res.token);
    const user: AuthUser = {
      userId:   res.userId,
      fullName: res.fullName,
      email:    res.email,
      role:     res.role
    };
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    this.currentUser.set(user);
  }

  private loadUser(): AuthUser | null {
    try { return JSON.parse(localStorage.getItem(USER_KEY) ?? 'null'); }
    catch { return null; }
  }
}