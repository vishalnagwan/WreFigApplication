import {
  FillBarComponent
} from "./chunk-MQ2CHSK6.js";
import {
  RouterLink,
  RouterModule
} from "./chunk-I6JDPDHY.js";
import {
  BranchService
} from "./chunk-PSV4OC7Q.js";
import {
  CommonModule,
  Component,
  DatePipe,
  DecimalPipe,
  NgForOf,
  NgIf,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵpureFunction2,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-WCU7WMUY.js";

// src/app/pages/compliance/compliance.component.ts
var _c0 = (a0) => ["/schedule", a0];
var _c1 = (a0, a1) => ({ year: a0, month: a1 });
function ComplianceComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275text(1, "Loading...");
    \u0275\u0275elementEnd();
  }
}
function ComplianceComponent_ng_container_11_tr_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 15)(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 16);
    \u0275\u0275element(4, "app-fill-bar", 17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td");
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td")(11, "span", 18);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const row_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(13, _c0, row_r1.branchId))("queryParams", \u0275\u0275pureFunction2(15, _c1, ctx_r1.year, ctx_r1.month));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r1.branchName);
    \u0275\u0275advance(2);
    \u0275\u0275property("pct", row_r1.fillRate);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", row_r1.daysComplete, "/", row_r1.totalWorkdays);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r1.lastUpdated ? \u0275\u0275pipeBind2(9, 10, row_r1.lastUpdated, "MM/dd") : "\u2014");
    \u0275\u0275advance(3);
    \u0275\u0275classMap(row_r1.status);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.statusLabel(row_r1.status));
  }
}
function ComplianceComponent_ng_container_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 7)(2, "div", 8)(3, "div", 9);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 10);
    \u0275\u0275text(7, "Average Fill Rate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 11)(9, "div", 9);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 10);
    \u0275\u0275text(12, "Fully Up-To-Date (\u226585%)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 12)(14, "div", 9);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 10);
    \u0275\u0275text(17, "Needs Attention (<75%)");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "table", 13)(19, "thead")(20, "tr")(21, "th");
    \u0275\u0275text(22, "Branch");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "th");
    \u0275\u0275text(24, "Fill Rate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "th");
    \u0275\u0275text(26, "Days Complete");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "th");
    \u0275\u0275text(28, "Last Updated");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "th");
    \u0275\u0275text(30, "Status");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(31, "tbody");
    \u0275\u0275template(32, ComplianceComponent_ng_container_11_tr_32_Template, 13, 18, "tr", 14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(5, 4, ctx_r1.compliance.averageFillRate, "1.0-1"), "%");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.compliance.upToDateCount);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.compliance.belowThresholdCount);
    \u0275\u0275advance(17);
    \u0275\u0275property("ngForOf", ctx_r1.sortedRows);
  }
}
var ComplianceComponent = class _ComplianceComponent {
  constructor() {
    this.branchSvc = inject(BranchService);
    this.compliance = null;
    this.year = (/* @__PURE__ */ new Date()).getFullYear();
    this.month = (/* @__PURE__ */ new Date()).getMonth() + 1;
    this.loading = true;
    this.now = /* @__PURE__ */ new Date();
  }
  get isMaxMonth() {
    return this.year === this.now.getFullYear() && this.month >= this.now.getMonth() + 2 || this.year > this.now.getFullYear();
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
  get sortedRows() {
    return [...this.compliance?.rows ?? []].sort((a, b) => a.fillRate - b.fillRate);
  }
  statusLabel(status) {
    const map = {
      green: "Up to Date",
      amber: "In Progress",
      red: "Needs Attention"
    };
    return map[status] ?? status;
  }
  ngOnInit() {
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
  load() {
    this.loading = true;
    this.branchSvc.getCompliance(this.year, this.month).subscribe({
      next: (data) => {
        this.compliance = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
  static {
    this.\u0275fac = function ComplianceComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ComplianceComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ComplianceComponent, selectors: [["app-compliance"]], decls: 12, vars: 4, consts: [[1, "page-header"], [1, "month-nav", 2, "margin-left", "auto"], [1, "btn-icon", 3, "click"], [1, "btn-icon", 3, "click", "disabled"], ["style", "text-align:center;padding:3rem;color:var(--ink-faint);", 4, "ngIf"], [4, "ngIf"], [2, "text-align", "center", "padding", "3rem", "color", "var(--ink-faint)"], [1, "kpi-row"], [1, "kpi-card"], [1, "kpi-value"], [1, "kpi-label"], [1, "kpi-card", "green"], [1, "kpi-card", "red"], [1, "compliance-table"], ["class", "clickable", 3, "routerLink", "queryParams", 4, "ngFor", "ngForOf"], [1, "clickable", 3, "routerLink", "queryParams"], [2, "min-width", "120px"], [3, "pct"], [1, "status-pill"]], template: function ComplianceComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "h1");
        \u0275\u0275text(2, "Compliance");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(3, "div", 1)(4, "button", 2);
        \u0275\u0275listener("click", function ComplianceComponent_Template_button_click_4_listener() {
          return ctx.prevMonth();
        });
        \u0275\u0275text(5, "\u2039");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "span");
        \u0275\u0275text(7);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "button", 3);
        \u0275\u0275listener("click", function ComplianceComponent_Template_button_click_8_listener() {
          return ctx.nextMonth();
        });
        \u0275\u0275text(9, "\u203A");
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(10, ComplianceComponent_div_10_Template, 2, 0, "div", 4)(11, ComplianceComponent_ng_container_11_Template, 33, 7, "ng-container", 5);
      }
      if (rf & 2) {
        \u0275\u0275advance(7);
        \u0275\u0275textInterpolate(ctx.monthLabel);
        \u0275\u0275advance();
        \u0275\u0275property("disabled", ctx.isMaxMonth);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading && ctx.compliance);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, RouterModule, RouterLink, FillBarComponent, DecimalPipe, DatePipe], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ComplianceComponent, [{
    type: Component,
    args: [{
      selector: "app-compliance",
      standalone: true,
      imports: [CommonModule, RouterModule, FillBarComponent],
      template: `
<div class="page-header">
  <h1>Compliance</h1>
  <div class="month-nav" style="margin-left:auto;">
    <button class="btn-icon" (click)="prevMonth()">\u2039</button>
    <span>{{monthLabel}}</span>
    <button class="btn-icon" (click)="nextMonth()" [disabled]="isMaxMonth">\u203A</button>
  </div>
</div>

<div *ngIf="loading" style="text-align:center;padding:3rem;color:var(--ink-faint);">Loading...</div>

<ng-container *ngIf="!loading && compliance">
  <!-- KPI row -->
  <div class="kpi-row">
    <div class="kpi-card">
      <div class="kpi-value">{{compliance!.averageFillRate | number:'1.0-1'}}%</div>
      <div class="kpi-label">Average Fill Rate</div>
    </div>
    <div class="kpi-card green">
      <div class="kpi-value">{{compliance!.upToDateCount}}</div>
      <div class="kpi-label">Fully Up-To-Date (\u226585%)</div>
    </div>
    <div class="kpi-card red">
      <div class="kpi-value">{{compliance!.belowThresholdCount}}</div>
      <div class="kpi-label">Needs Attention (&lt;75%)</div>
    </div>
  </div>

  <!-- Table -->
  <table class="compliance-table">
    <thead>
      <tr>
        <th>Branch</th>
        <th>Fill Rate</th>
        <th>Days Complete</th>
        <th>Last Updated</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let row of sortedRows"
          [routerLink]="['/schedule', row.branchId]"
          [queryParams]="{year: year, month: month}"
          class="clickable">
        <td>{{row.branchName}}</td>
        <td style="min-width:120px;">
          <app-fill-bar [pct]="row.fillRate"></app-fill-bar>
        </td>
        <td>{{row.daysComplete}}/{{row.totalWorkdays}}</td>
        <td>{{row.lastUpdated ? (row.lastUpdated | date:'MM/dd') : '\u2014'}}</td>
        <td><span class="status-pill" [class]="row.status">{{statusLabel(row.status)}}</span></td>
      </tr>
    </tbody>
  </table>
</ng-container>
  `
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ComplianceComponent, { className: "ComplianceComponent", filePath: "src/app/pages/compliance/compliance.component.ts", lineNumber: 70 });
})();
export {
  ComplianceComponent
};
//# sourceMappingURL=chunk-M4M5PW44.js.map
