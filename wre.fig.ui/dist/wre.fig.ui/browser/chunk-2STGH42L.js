import {
  AuditService
} from "./chunk-HC5XADKH.js";
import {
  CommonModule,
  Component,
  NgForOf,
  NgIf,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-WCU7WMUY.js";

// src/app/pages/alerts/alerts.component.ts
function AlertsComponent_span_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 6);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.unreadCount);
  }
}
function AlertsComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275text(1, "Loading alerts...");
    \u0275\u0275elementEnd();
  }
}
function AlertsComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275text(1, " No alerts to display.\n");
    \u0275\u0275elementEnd();
  }
}
function AlertsComponent_div_13_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275element(1, "div", 11);
    \u0275\u0275elementStart(2, "div", 12)(3, "div", 13);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 14);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 15);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const a_r2 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("unread", ctx_r0.isUnread(a_r2));
    \u0275\u0275advance();
    \u0275\u0275classMap(a_r2.urgency);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(a_r2.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(a_r2.timeDisplay);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(a_r2.desc);
  }
}
function AlertsComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "div", 8);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, AlertsComponent_div_13_div_3_Template, 9, 7, "div", 9);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const group_r3 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(group_r3.label);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", group_r3.alerts);
  }
}
var AlertsComponent = class _AlertsComponent {
  constructor() {
    this.auditSvc = inject(AuditService);
    this.alerts = [];
    this.filter = "all";
    this.loading = true;
    this.readIds = /* @__PURE__ */ new Set();
    this.readKey = "fig-read-alerts";
  }
  get unreadCount() {
    return this.alerts.filter((a) => this.isUnread(a)).length;
  }
  get groupedAlerts() {
    const filtered = this.applyFilter();
    const urgentAlerts = filtered.filter((a) => a.urgency === "urgent");
    const midAlerts = filtered.filter((a) => a.urgency === "mid");
    const lowAlerts = filtered.filter((a) => a.urgency === "low");
    const groups = [];
    if (urgentAlerts.length)
      groups.push({ label: "Urgent", alerts: urgentAlerts });
    if (midAlerts.length)
      groups.push({ label: "Moderate", alerts: midAlerts });
    if (lowAlerts.length)
      groups.push({ label: "Low Priority", alerts: lowAlerts });
    const known = /* @__PURE__ */ new Set(["urgent", "mid", "low"]);
    const other = filtered.filter((a) => !known.has(a.urgency));
    if (other.length)
      groups.push({ label: "Other", alerts: other });
    return groups;
  }
  ngOnInit() {
    const stored = JSON.parse(sessionStorage.getItem(this.readKey) ?? "[]");
    this.readIds = new Set(stored);
    this.auditSvc.getAlerts().subscribe({
      next: (data) => {
        this.alerts = data;
        data.forEach((a) => this.readIds.add(a.id));
        sessionStorage.setItem(this.readKey, JSON.stringify([...this.readIds]));
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
  isUnread(a) {
    return !this.readIds.has(a.id);
  }
  setFilter(f) {
    this.filter = f;
  }
  applyFilter() {
    if (this.filter === "urgent")
      return this.alerts.filter((a) => a.urgency === "urgent");
    if (this.filter === "unread")
      return this.alerts.filter((a) => this.isUnread(a));
    return this.alerts;
  }
  static {
    this.\u0275fac = function AlertsComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AlertsComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AlertsComponent, selectors: [["app-alerts"]], decls: 14, vars: 10, consts: [[1, "page-header"], ["class", "badge", 4, "ngIf"], [1, "filter-row", 2, "margin-left", "auto"], [3, "click"], ["style", "text-align:center;padding:3rem;color:var(--ink-faint);", 4, "ngIf"], [4, "ngFor", "ngForOf"], [1, "badge"], [2, "text-align", "center", "padding", "3rem", "color", "var(--ink-faint)"], [1, "alert-group-label"], ["class", "alert-item", 3, "unread", 4, "ngFor", "ngForOf"], [1, "alert-item"], [1, "urgency-bar"], [1, "alert-body"], [1, "alert-title"], [1, "alert-time"], [1, "alert-desc"]], template: function AlertsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "h1");
        \u0275\u0275text(2, "Alerts ");
        \u0275\u0275template(3, AlertsComponent_span_3_Template, 2, 1, "span", 1);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "div", 2)(5, "button", 3);
        \u0275\u0275listener("click", function AlertsComponent_Template_button_click_5_listener() {
          return ctx.setFilter("all");
        });
        \u0275\u0275text(6, "All");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "button", 3);
        \u0275\u0275listener("click", function AlertsComponent_Template_button_click_7_listener() {
          return ctx.setFilter("unread");
        });
        \u0275\u0275text(8, "Unread");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "button", 3);
        \u0275\u0275listener("click", function AlertsComponent_Template_button_click_9_listener() {
          return ctx.setFilter("urgent");
        });
        \u0275\u0275text(10, "Urgent only");
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(11, AlertsComponent_div_11_Template, 2, 0, "div", 4)(12, AlertsComponent_div_12_Template, 2, 0, "div", 4)(13, AlertsComponent_div_13_Template, 4, 2, "div", 5);
      }
      if (rf & 2) {
        \u0275\u0275advance(3);
        \u0275\u0275property("ngIf", ctx.unreadCount > 0);
        \u0275\u0275advance(2);
        \u0275\u0275classProp("active", ctx.filter === "all");
        \u0275\u0275advance(2);
        \u0275\u0275classProp("active", ctx.filter === "unread");
        \u0275\u0275advance(2);
        \u0275\u0275classProp("active", ctx.filter === "urgent");
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading && ctx.groupedAlerts.length === 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngForOf", ctx.groupedAlerts);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AlertsComponent, [{
    type: Component,
    args: [{
      selector: "app-alerts",
      standalone: true,
      imports: [CommonModule],
      template: `
<div class="page-header">
  <h1>Alerts <span class="badge" *ngIf="unreadCount > 0">{{unreadCount}}</span></h1>
  <div class="filter-row" style="margin-left:auto;">
    <button [class.active]="filter === 'all'"    (click)="setFilter('all')">All</button>
    <button [class.active]="filter === 'unread'" (click)="setFilter('unread')">Unread</button>
    <button [class.active]="filter === 'urgent'" (click)="setFilter('urgent')">Urgent only</button>
  </div>
</div>

<div *ngIf="loading" style="text-align:center;padding:3rem;color:var(--ink-faint);">Loading alerts...</div>

<div *ngIf="!loading && groupedAlerts.length === 0"
     style="text-align:center;padding:3rem;color:var(--ink-faint);">
  No alerts to display.
</div>

<div *ngFor="let group of groupedAlerts">
  <div class="alert-group-label">{{group.label}}</div>
  <div class="alert-item"
       *ngFor="let a of group.alerts"
       [class.unread]="isUnread(a)">
    <div class="urgency-bar" [class]="a.urgency"></div>
    <div class="alert-body">
      <div class="alert-title">{{a.title}}</div>
      <div class="alert-time">{{a.timeDisplay}}</div>
      <div class="alert-desc">{{a.desc}}</div>
    </div>
  </div>
</div>
  `
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AlertsComponent, { className: "AlertsComponent", filePath: "src/app/pages/alerts/alerts.component.ts", lineNumber: 49 });
})();
export {
  AlertsComponent
};
//# sourceMappingURL=chunk-2STGH42L.js.map
