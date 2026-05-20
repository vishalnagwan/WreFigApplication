import {
  Router
} from "./chunk-I6JDPDHY.js";
import {
  HttpClient,
  Injectable,
  environment,
  setClassMetadata,
  signal,
  tap,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-WCU7WMUY.js";

// src/app/services/auth.service.ts
var TOKEN_KEY = "fig_token";
var USER_KEY = "fig_user";
var AuthService = class _AuthService {
  constructor(http, router) {
    this.http = http;
    this.router = router;
    this.currentUser = signal(this.loadUser(), ...ngDevMode ? [{ debugName: "currentUser" }] : (
      /* istanbul ignore next */
      []
    ));
  }
  login(dto) {
    return this.http.post(`${environment.apiUrl}/auth/login`, dto).pipe(tap((res) => {
      localStorage.setItem(TOKEN_KEY, res.token);
      const user = { userId: res.userId, fullName: res.fullName, email: res.email, role: res.role };
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      this.currentUser.set(user);
    }));
  }
  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this.currentUser.set(null);
    this.router.navigate(["/login"]);
  }
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }
  isLoggedIn() {
    return !!this.getToken();
  }
  hasRole(...roles) {
    const user = this.currentUser();
    return !!user && roles.includes(user.role);
  }
  getUserRole() {
    return this.currentUser()?.role ?? null;
  }
  getUserFullName() {
    return this.currentUser()?.fullName ?? "";
  }
  loadUser() {
    try {
      return JSON.parse(localStorage.getItem(USER_KEY) ?? "null");
    } catch (e) {
      return null;
    }
  }
  static {
    this.\u0275fac = function AuthService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AuthService)(\u0275\u0275inject(HttpClient), \u0275\u0275inject(Router));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthService, factory: _AuthService.\u0275fac, providedIn: "root" });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuthService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: HttpClient }, { type: Router }], null);
})();

export {
  AuthService
};
//# sourceMappingURL=chunk-IDTDNUNK.js.map
