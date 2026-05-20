import {
  REGION_ORDER
} from "./chunk-DPTRMAED.js";
import {
  AuthService
} from "./chunk-IDTDNUNK.js";
import {
  FillBarComponent
} from "./chunk-MQ2CHSK6.js";
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
  BranchService
} from "./chunk-PSV4OC7Q.js";
import {
  CommonModule,
  Component,
  EventEmitter,
  Input,
  NgForOf,
  NgIf,
  Output,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-WCU7WMUY.js";

// src/app/shared/branch-card/branch-card.component.ts
function BranchCardComponent_span_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 9);
    \u0275\u0275text(1, "\u{1F514}");
    \u0275\u0275elementEnd();
  }
}
function BranchCardComponent_ng_container_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275element(1, "app-fill-bar", 10);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("pct", ctx_r0.summary.fillRate);
  }
}
function BranchCardComponent_ng_container_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "span", 11);
    \u0275\u0275text(2, "Acquisition");
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
}
var BranchCardComponent = class _BranchCardComponent {
  constructor() {
    this.isPinned = false;
    this.hasUnviewedNotes = false;
    this.cardClick = new EventEmitter();
    this.togglePin = new EventEmitter();
  }
  get statusLabel() {
    const map = {
      green: "Up to Date",
      amber: "In Progress",
      red: "Needs Attention"
    };
    return map[this.summary?.status] ?? this.summary?.status ?? "";
  }
  static {
    this.\u0275fac = function BranchCardComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BranchCardComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BranchCardComponent, selectors: [["app-branch-card"]], inputs: { summary: "summary", isPinned: "isPinned", hasUnviewedNotes: "hasUnviewedNotes" }, outputs: { cardClick: "cardClick", togglePin: "togglePin" }, decls: 14, vars: 15, consts: [[1, "branch-card", 3, "click"], [1, "branch-card-actions"], ["title", "Pin branch", 1, "pin-btn", 3, "click"], ["class", "bell-icon active", "title", "Has unviewed notes", 4, "ngIf"], [1, "branch-card-name"], [1, "branch-card-loc"], [4, "ngIf"], [2, "margin-top", ".4rem"], [1, "status-pill"], ["title", "Has unviewed notes", 1, "bell-icon", "active"], [3, "pct"], [1, "status-pill", "acquisition"]], template: function BranchCardComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275listener("click", function BranchCardComponent_Template_div_click_0_listener() {
          return ctx.cardClick.emit();
        });
        \u0275\u0275elementStart(1, "div", 1)(2, "button", 2);
        \u0275\u0275listener("click", function BranchCardComponent_Template_button_click_2_listener($event) {
          $event.stopPropagation();
          return ctx.togglePin.emit(ctx.summary.branchId);
        });
        \u0275\u0275text(3, "\u2605");
        \u0275\u0275elementEnd();
        \u0275\u0275template(4, BranchCardComponent_span_4_Template, 2, 0, "span", 3);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "div", 4);
        \u0275\u0275text(6);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "div", 5);
        \u0275\u0275text(8);
        \u0275\u0275elementEnd();
        \u0275\u0275template(9, BranchCardComponent_ng_container_9_Template, 2, 1, "ng-container", 6)(10, BranchCardComponent_ng_container_10_Template, 3, 0, "ng-container", 6);
        \u0275\u0275elementStart(11, "div", 7)(12, "span", 8);
        \u0275\u0275text(13);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275classProp("pinned", ctx.isPinned)("has-notes", ctx.hasUnviewedNotes);
        \u0275\u0275advance(2);
        \u0275\u0275classProp("pinned", ctx.isPinned);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.hasUnviewedNotes);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.summary.branchName);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate2("", ctx.summary.city, ", ", ctx.summary.state);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.summary.isAcquisition);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.summary.isAcquisition);
        \u0275\u0275advance(2);
        \u0275\u0275classMap(ctx.summary.status);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate(ctx.statusLabel);
      }
    }, dependencies: [CommonModule, NgIf, FillBarComponent], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BranchCardComponent, [{
    type: Component,
    args: [{
      selector: "app-branch-card",
      standalone: true,
      imports: [CommonModule, FillBarComponent],
      template: `
<div class="branch-card"
     [class.pinned]="isPinned"
     [class.has-notes]="hasUnviewedNotes"
     (click)="cardClick.emit()">
  <div class="branch-card-actions">
    <button class="pin-btn" [class.pinned]="isPinned"
            (click)="$event.stopPropagation(); togglePin.emit(summary.branchId)"
            title="Pin branch">\u2605</button>
    <span *ngIf="hasUnviewedNotes" class="bell-icon active" title="Has unviewed notes">\u{1F514}</span>
  </div>
  <div class="branch-card-name">{{summary.branchName}}</div>
  <div class="branch-card-loc">{{summary.city}}, {{summary.state}}</div>
  <ng-container *ngIf="!summary.isAcquisition">
    <app-fill-bar [pct]="summary.fillRate"></app-fill-bar>
  </ng-container>
  <ng-container *ngIf="summary.isAcquisition">
    <span class="status-pill acquisition">Acquisition</span>
  </ng-container>
  <div style="margin-top:.4rem;">
    <span class="status-pill" [class]="summary.status">{{statusLabel}}</span>
  </div>
</div>
  `
    }]
  }], null, { summary: [{
    type: Input
  }], isPinned: [{
    type: Input
  }], hasUnviewedNotes: [{
    type: Input
  }], cardClick: [{
    type: Output
  }], togglePin: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BranchCardComponent, { className: "BranchCardComponent", filePath: "src/app/shared/branch-card/branch-card.component.ts", lineNumber: 35 });
})();

// src/app/pages/home/home.component.ts
function HomeComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10)(1, "div", 11);
    \u0275\u0275text(2, "Loading...");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Loading branches...\n");
    \u0275\u0275elementEnd();
  }
}
function HomeComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 12)(1, "div", 13);
    \u0275\u0275text(2, "Could not load branches");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 14);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 15);
    \u0275\u0275listener("click", function HomeComponent_div_13_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.load());
    });
    \u0275\u0275text(6, "Retry");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.error);
  }
}
function HomeComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275text(1, " No branches available for your account.\n");
    \u0275\u0275elementEnd();
  }
}
function HomeComponent_div_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(' No branches match "', ctx_r1.searchText, '".\n');
  }
}
function HomeComponent_div_16_span_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 23);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const group_r3 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.attentionCount(group_r3.branches), " need attention ");
  }
}
function HomeComponent_div_16_app_branch_card_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-branch-card", 24);
    \u0275\u0275listener("cardClick", function HomeComponent_div_16_app_branch_card_6_Template_app_branch_card_cardClick_0_listener() {
      const b_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.goToSchedule(b_r5.branchId));
    })("togglePin", function HomeComponent_div_16_app_branch_card_6_Template_app_branch_card_togglePin_0_listener() {
      const b_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.togglePin(b_r5.branchId));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const b_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("summary", b_r5)("isPinned", ctx_r1.pinnedIds.has(b_r5.branchId))("hasUnviewedNotes", b_r5.hasNotes);
  }
}
function HomeComponent_div_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17)(1, "div", 18)(2, "span", 19);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, HomeComponent_div_16_span_4_Template, 2, 1, "span", 20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 21);
    \u0275\u0275template(6, HomeComponent_div_16_app_branch_card_6_Template, 1, 3, "app-branch-card", 22);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const group_r3 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(group_r3.region);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.attentionCount(group_r3.branches) > 0);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", group_r3.branches);
  }
}
var HomeComponent = class _HomeComponent {
  constructor() {
    this.branchSvc = inject(BranchService);
    this.auth = inject(AuthService);
    this.router = inject(Router);
    this.summaries = [];
    this.filtered = [];
    this.grouped = [];
    this.searchText = "";
    this.year = (/* @__PURE__ */ new Date()).getFullYear();
    this.month = (/* @__PURE__ */ new Date()).getMonth() + 1;
    this.loading = true;
    this.error = "";
    this.pinnedIds = /* @__PURE__ */ new Set();
    this.now = /* @__PURE__ */ new Date();
  }
  get isMaxMonth() {
    const maxY = this.now.getFullYear();
    const maxM = this.now.getMonth() + 2;
    return this.year === maxY && this.month >= maxM || this.year > maxY;
  }
  get monthLabel() {
    const months = [
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
    return `${months[this.month - 1]} ${this.year}`;
  }
  get dashboardTitle() {
    const role = this.auth.getUserRole();
    const map = {
      PlannerDashboard: "Planner Dashboard",
      FieldSupervisor: "Field Supervisor Dashboard",
      DispatchSupervisor: "Dispatch Supervisor Dashboard",
      Planner: "Planner Dashboard",
      Dispatcher: "Dispatcher Dashboard",
      ReadOnly: "Branch Dashboard"
    };
    return role ? map[role] ?? "Branch Dashboard" : "Branch Dashboard";
  }
  ngOnInit() {
    this.loadPins();
    this.load();
  }
  prevMonth() {
    if (this.month === 1) {
      this.year--;
      this.month = 12;
    } else
      this.month--;
    this.load();
  }
  nextMonth() {
    if (this.isMaxMonth)
      return;
    if (this.month === 12) {
      this.year++;
      this.month = 1;
    } else
      this.month++;
    this.load();
  }
  goToSchedule(branchId) {
    this.router.navigate(["/schedule", branchId], {
      queryParams: { year: this.year, month: this.month }
    });
  }
  togglePin(branchId) {
    if (this.pinnedIds.has(branchId))
      this.pinnedIds.delete(branchId);
    else
      this.pinnedIds.add(branchId);
    this.savePins();
    this.buildGrouped();
  }
  attentionCount(branches) {
    return branches.filter((b) => b.status === "red").length;
  }
  applyFilter() {
    const q = this.searchText.toLowerCase();
    this.filtered = q ? this.summaries.filter((b) => b.branchName.toLowerCase().includes(q) || b.city.toLowerCase().includes(q) || b.state.toLowerCase().includes(q) || b.regionName.toLowerCase().includes(q)) : [...this.summaries];
    this.buildGrouped();
  }
  load() {
    this.loading = true;
    this.error = "";
    this.branchSvc.getSummaries(this.year, this.month).subscribe({
      next: (data) => {
        try {
          this.summaries = data;
          this.applyFilter();
          this.loading = false;
        } catch (e) {
          this.loading = false;
          this.error = `Runtime error in next: ${e?.message ?? e}`;
          console.error("[Home] next() threw:", e);
        }
      },
      error: (err) => {
        this.loading = false;
        if (err.status === 0 || err.statusText === "Timeout") {
          this.error = (err.message ?? "") || "Cannot reach API on http://localhost:5100. Make sure the API is running (dotnet run --launch-profile http).";
        } else if (err.status === 401) {
          this.error = "Session expired - please log out and log in again.";
        } else {
          this.error = `API error ${err.status}: ${err.error?.error ?? err.error?.message ?? err.message ?? "Unknown"}` + (err.error?.inner ? ` | Inner: ${err.error.inner}` : "");
        }
        console.error("[Home] Branch load failed:", err);
        console.error("[Home] Error body:", err.error);
      }
    });
  }
  buildGrouped() {
    const regionMap = /* @__PURE__ */ new Map();
    for (const b of this.filtered) {
      const r = b.regionName || "Other";
      if (!regionMap.has(r))
        regionMap.set(r, []);
      regionMap.get(r).push(b);
    }
    const ordered = [];
    for (const region of REGION_ORDER) {
      if (regionMap.has(region)) {
        ordered.push({ region, branches: regionMap.get(region) });
        regionMap.delete(region);
      }
    }
    for (const [region, branches] of regionMap) {
      ordered.push({ region, branches });
    }
    this.grouped = ordered;
  }
  loadPins() {
    const userId = this.auth.currentUser()?.userId ?? "guest";
    const key = `wre-pins:${userId}`;
    try {
      const ids = JSON.parse(localStorage.getItem(key) ?? "[]");
      this.pinnedIds = new Set(ids);
    } catch (e) {
      this.pinnedIds = /* @__PURE__ */ new Set();
    }
  }
  savePins() {
    const userId = this.auth.currentUser()?.userId ?? "guest";
    const key = `wre-pins:${userId}`;
    localStorage.setItem(key, JSON.stringify([...this.pinnedIds]));
  }
  static {
    this.\u0275fac = function HomeComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _HomeComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _HomeComponent, selectors: [["app-home"]], decls: 17, vars: 9, consts: [[1, "page-header"], [1, "header-controls"], ["type", "text", "placeholder", "Search branches...", 3, "ngModelChange", "ngModel"], [1, "month-nav"], [1, "btn-icon", 3, "click"], [1, "btn-icon", 3, "click", "disabled"], ["style", "text-align:center;padding:3rem;color:var(--ink-faint);", 4, "ngIf"], ["style", "text-align:center;padding:3rem;", 4, "ngIf"], ["style", "text-align:center;padding:2rem;color:var(--ink-faint);", 4, "ngIf"], ["class", "region-group", 4, "ngFor", "ngForOf"], [2, "text-align", "center", "padding", "3rem", "color", "var(--ink-faint)"], [2, "font-size", "1.5rem", "margin-bottom", ".5rem"], [2, "text-align", "center", "padding", "3rem"], [2, "color", "#e53e3e", "font-weight", "600", "margin-bottom", ".75rem"], [2, "color", "var(--ink-faint)", "font-size", ".85rem", "margin-bottom", "1rem"], [1, "btn-primary", 3, "click"], [2, "text-align", "center", "padding", "2rem", "color", "var(--ink-faint)"], [1, "region-group"], [1, "region-header"], [1, "region-name"], ["class", "attention-badge", 4, "ngIf"], [1, "branch-card-grid"], [3, "summary", "isPinned", "hasUnviewedNotes", "cardClick", "togglePin", 4, "ngFor", "ngForOf"], [1, "attention-badge"], [3, "cardClick", "togglePin", "summary", "isPinned", "hasUnviewedNotes"]], template: function HomeComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "h1");
        \u0275\u0275text(2);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(3, "div", 1)(4, "input", 2);
        \u0275\u0275twoWayListener("ngModelChange", function HomeComponent_Template_input_ngModelChange_4_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.searchText, $event) || (ctx.searchText = $event);
          return $event;
        });
        \u0275\u0275listener("ngModelChange", function HomeComponent_Template_input_ngModelChange_4_listener() {
          return ctx.applyFilter();
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "div", 3)(6, "button", 4);
        \u0275\u0275listener("click", function HomeComponent_Template_button_click_6_listener() {
          return ctx.prevMonth();
        });
        \u0275\u0275text(7, "<");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "span");
        \u0275\u0275text(9);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "button", 5);
        \u0275\u0275listener("click", function HomeComponent_Template_button_click_10_listener() {
          return ctx.nextMonth();
        });
        \u0275\u0275text(11, ">");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275template(12, HomeComponent_div_12_Template, 4, 0, "div", 6)(13, HomeComponent_div_13_Template, 7, 1, "div", 7)(14, HomeComponent_div_14_Template, 2, 0, "div", 6)(15, HomeComponent_div_15_Template, 2, 1, "div", 8)(16, HomeComponent_div_16_Template, 7, 3, "div", 9);
      }
      if (rf & 2) {
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.dashboardTitle);
        \u0275\u0275advance(2);
        \u0275\u0275twoWayProperty("ngModel", ctx.searchText);
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate(ctx.monthLabel);
        \u0275\u0275advance();
        \u0275\u0275property("disabled", ctx.isMaxMonth);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading && ctx.error);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading && !ctx.error && ctx.summaries.length === 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading && !ctx.error && ctx.filtered.length === 0 && ctx.searchText && ctx.summaries.length > 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngForOf", ctx.grouped);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, BranchCardComponent], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HomeComponent, [{
    type: Component,
    args: [{
      selector: "app-home",
      standalone: true,
      imports: [CommonModule, FormsModule, BranchCardComponent],
      template: `
<div class="page-header">
  <h1>{{dashboardTitle}}</h1>
  <div class="header-controls">
    <input type="text" placeholder="Search branches..."
           [(ngModel)]="searchText" (ngModelChange)="applyFilter()" />
    <div class="month-nav">
      <button class="btn-icon" (click)="prevMonth()">&lt;</button>
      <span>{{monthLabel}}</span>
      <button class="btn-icon" (click)="nextMonth()" [disabled]="isMaxMonth">&gt;</button>
    </div>
  </div>
</div>

<div *ngIf="loading" style="text-align:center;padding:3rem;color:var(--ink-faint);">
  <div style="font-size:1.5rem;margin-bottom:.5rem;">Loading...</div>
  Loading branches...
</div>

<div *ngIf="!loading && error" style="text-align:center;padding:3rem;">
  <div style="color:#e53e3e;font-weight:600;margin-bottom:.75rem;">Could not load branches</div>
  <div style="color:var(--ink-faint);font-size:.85rem;margin-bottom:1rem;">{{error}}</div>
  <button class="btn-primary" (click)="load()">Retry</button>
</div>

<div *ngIf="!loading && !error && summaries.length === 0"
     style="text-align:center;padding:3rem;color:var(--ink-faint);">
  No branches available for your account.
</div>

<div *ngIf="!loading && !error && filtered.length === 0 && searchText && summaries.length > 0"
     style="text-align:center;padding:2rem;color:var(--ink-faint);">
  No branches match "{{searchText}}".
</div>

<div *ngFor="let group of grouped" class="region-group">
  <div class="region-header">
    <span class="region-name">{{group.region}}</span>
    <span class="attention-badge" *ngIf="attentionCount(group.branches) > 0">
      {{attentionCount(group.branches)}} need attention
    </span>
  </div>
  <div class="branch-card-grid">
    <app-branch-card
      *ngFor="let b of group.branches"
      [summary]="b"
      [isPinned]="pinnedIds.has(b.branchId)"
      [hasUnviewedNotes]="b.hasNotes"
      (cardClick)="goToSchedule(b.branchId)"
      (togglePin)="togglePin(b.branchId)">
    </app-branch-card>
  </div>
</div>
  `
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(HomeComponent, { className: "HomeComponent", filePath: "src/app/pages/home/home.component.ts", lineNumber: 75 });
})();
export {
  HomeComponent
};
//# sourceMappingURL=chunk-UQDC7SJY.js.map
