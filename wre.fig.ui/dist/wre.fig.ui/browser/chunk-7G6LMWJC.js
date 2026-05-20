import {
  CommonModule,
  Component,
  DatePipe,
  HttpClient,
  Injectable,
  NgForOf,
  NgIf,
  environment,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-WCU7WMUY.js";

// src/app/services/monthlock.service.ts
var MonthLockService = class _MonthLockService {
  constructor() {
    this.api = inject(HttpClient);
    this.base = environment.apiUrl;
  }
  getAll() {
    return this.api.get(`${this.base}/monthlocks`);
  }
  ensureDefaults() {
    return this.api.post(`${this.base}/monthlocks/ensure-defaults`, {});
  }
  openMonth(year, month) {
    return this.api.put(`${this.base}/monthlocks/${year}/${month}/open`, {});
  }
  closeMonth(year, month) {
    return this.api.put(`${this.base}/monthlocks/${year}/${month}/close`, {});
  }
  static {
    this.\u0275fac = function MonthLockService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MonthLockService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _MonthLockService, factory: _MonthLockService.\u0275fac, providedIn: "root" });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MonthLockService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/pages/rollover/rollover.component.ts
function RolloverComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3);
    \u0275\u0275text(1, "Loading...");
    \u0275\u0275elementEnd();
  }
}
function RolloverComponent_ng_container_4_div_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.statusMessage);
  }
}
function RolloverComponent_ng_container_4_tr_32_button_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 18);
    \u0275\u0275listener("click", function RolloverComponent_ng_container_4_tr_32_button_12_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const lock_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openLock(lock_r4));
    });
    \u0275\u0275text(1, "Open");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("disabled", ctx_r1.saving);
  }
}
function RolloverComponent_ng_container_4_tr_32_button_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 18);
    \u0275\u0275listener("click", function RolloverComponent_ng_container_4_tr_32_button_13_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const lock_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.closeLock(lock_r4));
    });
    \u0275\u0275text(1, "Close");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("disabled", ctx_r1.saving);
  }
}
function RolloverComponent_ng_container_4_tr_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td")(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td", 16);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td");
    \u0275\u0275template(12, RolloverComponent_ng_container_4_tr_32_button_12_Template, 2, 1, "button", 17)(13, RolloverComponent_ng_container_4_tr_32_button_13_Template, 2, 1, "button", 17);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const lock_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.monthLabel(lock_r4.year, lock_r4.month));
    \u0275\u0275advance(2);
    \u0275\u0275classMap(lock_r4.isOpen ? "pill-green" : "pill-gray");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", lock_r4.isOpen ? "Open" : "Closed", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(8, 8, lock_r4.modifiedAt, "MM/dd/yyyy HH:mm"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(lock_r4.modifiedBy);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", !lock_r4.isOpen);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", lock_r4.isOpen);
  }
}
function RolloverComponent_ng_container_4_tr_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 19);
    \u0275\u0275text(2, " No month locks found. ");
    \u0275\u0275elementEnd()();
  }
}
function RolloverComponent_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 4)(2, "div", 5)(3, "div", 6);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 7);
    \u0275\u0275text(6, "Open Months");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 8)(8, "div", 6);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 7);
    \u0275\u0275text(11, "Closed Months");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 8)(13, "div", 9);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 7);
    \u0275\u0275text(16, "Current Month");
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(17, RolloverComponent_ng_container_4_div_17_Template, 2, 1, "div", 10);
    \u0275\u0275elementStart(18, "table", 11)(19, "thead")(20, "tr")(21, "th");
    \u0275\u0275text(22, "Month");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "th");
    \u0275\u0275text(24, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "th");
    \u0275\u0275text(26, "Modified");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "th");
    \u0275\u0275text(28, "By");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "th");
    \u0275\u0275text(30, "Actions");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(31, "tbody");
    \u0275\u0275template(32, RolloverComponent_ng_container_4_tr_32_Template, 14, 11, "tr", 12)(33, RolloverComponent_ng_container_4_tr_33_Template, 3, 0, "tr", 2);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "div", 13)(35, "button", 14);
    \u0275\u0275listener("click", function RolloverComponent_ng_container_4_Template_button_click_35_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openNextMonth());
    });
    \u0275\u0275text(36, " Open Next Month ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "button", 14);
    \u0275\u0275listener("click", function RolloverComponent_ng_container_4_Template_button_click_37_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closePriorMonth());
    });
    \u0275\u0275text(38, " Close Prior Month ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.openCount);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.closedCount);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.currentMonthLabel);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r1.statusMessage);
    \u0275\u0275advance(15);
    \u0275\u0275property("ngForOf", ctx_r1.locks);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.locks.length === 0);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.nextMonthAlreadyOpen || ctx_r1.saving);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !ctx_r1.priorMonthIsOpen || ctx_r1.saving);
  }
}
var MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
var RolloverComponent = class _RolloverComponent {
  constructor() {
    this.lockSvc = inject(MonthLockService);
    this.locks = [];
    this.loading = true;
    this.saving = false;
    this.statusMessage = "";
  }
  get openCount() {
    return this.locks.filter((l) => l.isOpen).length;
  }
  get closedCount() {
    return this.locks.filter((l) => !l.isOpen).length;
  }
  get currentMonthLabel() {
    const now = /* @__PURE__ */ new Date();
    return `${MONTH_NAMES[now.getMonth()]} ${now.getFullYear()}`;
  }
  get nextMonthAlreadyOpen() {
    const now = /* @__PURE__ */ new Date();
    let ny = now.getFullYear();
    let nm = now.getMonth() + 2;
    if (nm > 12) {
      nm = 1;
      ny++;
    }
    return this.locks.some((l) => l.year === ny && l.month === nm && l.isOpen);
  }
  get priorMonthIsOpen() {
    const now = /* @__PURE__ */ new Date();
    let py = now.getFullYear();
    let pm = now.getMonth();
    if (pm === 0) {
      pm = 12;
      py--;
    }
    return this.locks.some((l) => l.year === py && l.month === pm && l.isOpen);
  }
  ngOnInit() {
    this.lockSvc.ensureDefaults().subscribe({
      next: () => this.load(),
      error: () => this.load()
    });
  }
  monthLabel(year, month) {
    return `${MONTH_NAMES[month - 1]} ${year}`;
  }
  openLock(lock) {
    this.saving = true;
    this.lockSvc.openMonth(lock.year, lock.month).subscribe({
      next: () => {
        this.statusMessage = `${this.monthLabel(lock.year, lock.month)} opened successfully.`;
        this.saving = false;
        this.load();
        setTimeout(() => this.statusMessage = "", 5e3);
      },
      error: () => {
        this.saving = false;
      }
    });
  }
  closeLock(lock) {
    this.saving = true;
    this.lockSvc.closeMonth(lock.year, lock.month).subscribe({
      next: () => {
        this.statusMessage = `${this.monthLabel(lock.year, lock.month)} closed successfully.`;
        this.saving = false;
        this.load();
        setTimeout(() => this.statusMessage = "", 5e3);
      },
      error: () => {
        this.saving = false;
      }
    });
  }
  openNextMonth() {
    const now = /* @__PURE__ */ new Date();
    let ny = now.getFullYear();
    let nm = now.getMonth() + 2;
    if (nm > 12) {
      nm = 1;
      ny++;
    }
    const lock = { id: 0, year: ny, month: nm, isOpen: false, modifiedAt: "", modifiedBy: "" };
    this.openLock(lock);
  }
  closePriorMonth() {
    const now = /* @__PURE__ */ new Date();
    let py = now.getFullYear();
    let pm = now.getMonth();
    if (pm === 0) {
      pm = 12;
      py--;
    }
    const existing = this.locks.find((l) => l.year === py && l.month === pm);
    if (existing)
      this.closeLock(existing);
  }
  load() {
    this.loading = true;
    this.lockSvc.getAll().subscribe({
      next: (data) => {
        this.locks = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
  static {
    this.\u0275fac = function RolloverComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _RolloverComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RolloverComponent, selectors: [["app-rollover"]], decls: 5, vars: 2, consts: [[1, "page-header"], ["style", "text-align:center;padding:3rem;color:var(--ink-faint);", 4, "ngIf"], [4, "ngIf"], [2, "text-align", "center", "padding", "3rem", "color", "var(--ink-faint)"], [1, "kpi-row"], [1, "kpi-card", "green"], [1, "kpi-value"], [1, "kpi-label"], [1, "kpi-card"], [1, "kpi-value", 2, "font-size", "1.2rem"], ["class", "status-callout", 4, "ngIf"], [1, "rollover-table"], [4, "ngFor", "ngForOf"], [1, "quick-actions"], [1, "btn-primary", 3, "click", "disabled"], [1, "status-callout"], [2, "font-size", ".75rem", "font-family", "'DM Mono',monospace"], ["class", "btn-ghost btn-sm", 3, "disabled", "click", 4, "ngIf"], [1, "btn-ghost", "btn-sm", 3, "click", "disabled"], ["colspan", "5", 2, "text-align", "center", "color", "var(--ink-faint)", "padding", "2rem"]], template: function RolloverComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "h1");
        \u0275\u0275text(2, "Month Rollover Console");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(3, RolloverComponent_div_3_Template, 2, 0, "div", 1)(4, RolloverComponent_ng_container_4_Template, 39, 8, "ng-container", 2);
      }
      if (rf & 2) {
        \u0275\u0275advance(3);
        \u0275\u0275property("ngIf", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, DatePipe], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RolloverComponent, [{
    type: Component,
    args: [{
      selector: "app-rollover",
      standalone: true,
      imports: [CommonModule],
      template: `
<div class="page-header">
  <h1>Month Rollover Console</h1>
</div>

<div *ngIf="loading" style="text-align:center;padding:3rem;color:var(--ink-faint);">Loading...</div>

<ng-container *ngIf="!loading">
  <!-- KPI row -->
  <div class="kpi-row">
    <div class="kpi-card green">
      <div class="kpi-value">{{openCount}}</div>
      <div class="kpi-label">Open Months</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-value">{{closedCount}}</div>
      <div class="kpi-label">Closed Months</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-value" style="font-size:1.2rem;">{{currentMonthLabel}}</div>
      <div class="kpi-label">Current Month</div>
    </div>
  </div>

  <div class="status-callout" *ngIf="statusMessage">{{statusMessage}}</div>

  <!-- Table -->
  <table class="rollover-table">
    <thead>
      <tr>
        <th>Month</th>
        <th>Status</th>
        <th>Modified</th>
        <th>By</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let lock of locks">
        <td>{{monthLabel(lock.year, lock.month)}}</td>
        <td>
          <span [class]="lock.isOpen ? 'pill-green' : 'pill-gray'">
            {{lock.isOpen ? 'Open' : 'Closed'}}
          </span>
        </td>
        <td style="font-size:.75rem;font-family:'DM Mono',monospace;">
          {{lock.modifiedAt | date:'MM/dd/yyyy HH:mm'}}
        </td>
        <td>{{lock.modifiedBy}}</td>
        <td>
          <button *ngIf="!lock.isOpen" class="btn-ghost btn-sm"
                  (click)="openLock(lock)" [disabled]="saving">Open</button>
          <button *ngIf="lock.isOpen" class="btn-ghost btn-sm"
                  (click)="closeLock(lock)" [disabled]="saving">Close</button>
        </td>
      </tr>
      <tr *ngIf="locks.length === 0">
        <td colspan="5" style="text-align:center;color:var(--ink-faint);padding:2rem;">
          No month locks found.
        </td>
      </tr>
    </tbody>
  </table>

  <!-- Quick actions -->
  <div class="quick-actions">
    <button class="btn-primary" (click)="openNextMonth()"
            [disabled]="nextMonthAlreadyOpen || saving">
      Open Next Month
    </button>
    <button class="btn-primary" (click)="closePriorMonth()"
            [disabled]="!priorMonthIsOpen || saving">
      Close Prior Month
    </button>
  </div>
</ng-container>
  `
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RolloverComponent, { className: "RolloverComponent", filePath: "src/app/pages/rollover/rollover.component.ts", lineNumber: 93 });
})();
export {
  RolloverComponent
};
//# sourceMappingURL=chunk-7G6LMWJC.js.map
