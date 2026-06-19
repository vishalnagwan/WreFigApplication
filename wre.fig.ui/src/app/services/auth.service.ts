import { Injectable, signal, Optional }            from '@angular/core';
import { HttpClient }                               from '@angular/common/http';
import { Router }                                   from '@angular/router';
import { Observable, tap, throwError }              from 'rxjs';
import { switchMap }                                from 'rxjs/operators';
import { environment }                              from '../../environments/environment';
import { ApiResponse }                              from '../models/api-response.model';
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

  // ── Form-based login (existing) ───────────────────────────────────
  login(dto: LoginRequest): Observable<LoginResponse> {
    return this.http.post<ApiResponse<LoginResponse>>(
      `${environment.apiUrl}/auth/login`, dto
    ).pipe(
      switchMap(res =>
        res.success && res.data
          ? [res.data]
          : throwError(() => new Error(res.message ?? 'Invalid email or password.'))
      ),
      tap(data => this.persistSession(data))
    );
  }

  // ── MSAL: exchange Azure token for FIG JWT ────────────────────────
  loginWithMicrosoft(azureToken: string): Observable<LoginResponse> {
    return this.http.post<ApiResponse<LoginResponse>>(
      `${environment.apiUrl}/auth/microsoft`,
      { accessToken: azureToken }
    ).pipe(
      switchMap(res =>
        res.success && res.data
          ? [res.data]
          : throwError(() => new Error(res.message ?? 'Microsoft login failed.'))
      ),
      tap(data => this.persistSession(data))
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