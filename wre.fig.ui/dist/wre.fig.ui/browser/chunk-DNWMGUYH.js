import {
  AuthService
} from "./chunk-IDTDNUNK.js";
import {
  Router
} from "./chunk-I6JDPDHY.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-324XMCRJ.js";
import {
  CommonModule,
  Component,
  NgIf,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-WCU7WMUY.js";

// src/app/pages/login/login.component.ts
function LoginComponent_p_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.error);
  }
}
var LoginComponent = class _LoginComponent {
  constructor(auth, router) {
    this.auth = auth;
    this.router = router;
    this.email = "";
    this.password = "";
    this.loading = false;
    this.error = "";
  }
  login() {
    if (!this.email || !this.password) {
      this.error = "Please enter your email and password.";
      return;
    }
    this.loading = true;
    this.error = "";
    this.auth.login({ email: this.email, password: this.password }).subscribe({
      next: () => this.router.navigate(["/"]),
      error: () => {
        this.error = "Invalid email or password.";
        this.loading = false;
      }
    });
  }
  static {
    this.\u0275fac = function LoginComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _LoginComponent)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginComponent, selectors: [["app-login"]], decls: 18, vars: 5, consts: [[1, "login-wrapper"], [1, "login-card"], [1, "login-logo"], [2, "font-size", "1.4rem", "font-weight", "800", "color", "var(--ink)", "margin-bottom", ".25rem"], [2, "font-size", ".85rem", "color", "var(--ink-light)"], [1, "field"], ["for", "email"], ["id", "email", "type", "email", "placeholder", "Enter your email", "autocomplete", "email", 3, "ngModelChange", "keydown.enter", "ngModel"], ["for", "password"], ["id", "password", "type", "password", "placeholder", "Enter your password", "autocomplete", "current-password", 3, "ngModelChange", "keydown.enter", "ngModel"], ["class", "login-error", 4, "ngIf"], [1, "btn-primary", 2, "width", "100%", "margin-top", ".5rem", 3, "click", "disabled"], [1, "login-error"]], template: function LoginComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
        \u0275\u0275text(4, "FIG");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "div", 4);
        \u0275\u0275text(6, "Field Information Guide");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "div", 5)(8, "label", 6);
        \u0275\u0275text(9, "Email");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "input", 7);
        \u0275\u0275twoWayListener("ngModelChange", function LoginComponent_Template_input_ngModelChange_10_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.email, $event) || (ctx.email = $event);
          return $event;
        });
        \u0275\u0275listener("keydown.enter", function LoginComponent_Template_input_keydown_enter_10_listener() {
          return ctx.login();
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(11, "div", 5)(12, "label", 8);
        \u0275\u0275text(13, "Password");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "input", 9);
        \u0275\u0275twoWayListener("ngModelChange", function LoginComponent_Template_input_ngModelChange_14_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.password, $event) || (ctx.password = $event);
          return $event;
        });
        \u0275\u0275listener("keydown.enter", function LoginComponent_Template_input_keydown_enter_14_listener() {
          return ctx.login();
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275template(15, LoginComponent_p_15_Template, 2, 1, "p", 10);
        \u0275\u0275elementStart(16, "button", 11);
        \u0275\u0275listener("click", function LoginComponent_Template_button_click_16_listener() {
          return ctx.login();
        });
        \u0275\u0275text(17);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(10);
        \u0275\u0275twoWayProperty("ngModel", ctx.email);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.password);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.error);
        \u0275\u0275advance();
        \u0275\u0275property("disabled", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.loading ? "Signing in..." : "Sign In", " ");
      }
    }, dependencies: [CommonModule, NgIf, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LoginComponent, [{
    type: Component,
    args: [{
      selector: "app-login",
      standalone: true,
      imports: [CommonModule, FormsModule],
      template: `
<div class="login-wrapper">
  <div class="login-card">
    <div class="login-logo">
      <div style="font-size:1.4rem;font-weight:800;color:var(--ink);margin-bottom:.25rem;">FIG</div>
      <div style="font-size:.85rem;color:var(--ink-light);">Field Information Guide</div>
    </div>

    <div class="field">
      <label for="email">Email</label>
      <input id="email" type="email" [(ngModel)]="email"
             placeholder="Enter your email"
             (keydown.enter)="login()"
             autocomplete="email" />
    </div>

    <div class="field">
      <label for="password">Password</label>
      <input id="password" type="password" [(ngModel)]="password"
             placeholder="Enter your password"
             (keydown.enter)="login()"
             autocomplete="current-password" />
    </div>

    <p class="login-error" *ngIf="error">{{error}}</p>

    <button class="btn-primary" style="width:100%;margin-top:.5rem;"
            (click)="login()" [disabled]="loading">
      {{loading ? 'Signing in...' : 'Sign In'}}
    </button>
  </div>
</div>
  `
    }]
  }], () => [{ type: AuthService }, { type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginComponent, { className: "LoginComponent", filePath: "src/app/pages/login/login.component.ts", lineNumber: 45 });
})();
export {
  LoginComponent
};
//# sourceMappingURL=chunk-DNWMGUYH.js.map
