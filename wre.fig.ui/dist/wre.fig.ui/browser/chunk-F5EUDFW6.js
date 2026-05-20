import {
  SignalrService
} from "./chunk-EYJLXEJM.js";
import {
  ROLES
} from "./chunk-DPTRMAED.js";
import {
  AuthService
} from "./chunk-IDTDNUNK.js";
import {
  AuditService
} from "./chunk-HC5XADKH.js";
import {
  FillBarComponent
} from "./chunk-MQ2CHSK6.js";
import {
  ActivatedRoute,
  RouterLink,
  RouterModule
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
  HostListener,
  HttpClient,
  Injectable,
  Input,
  NgForOf,
  NgIf,
  Output,
  ViewChild,
  __objRest,
  __spreadProps,
  __spreadValues,
  environment,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinterpolate,
  ɵɵinterpolate1,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵresetView,
  ɵɵresolveDocument,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-WCU7WMUY.js";

// src/app/services/schedule.service.ts
var ScheduleService = class _ScheduleService {
  constructor() {
    this.api = inject(HttpClient);
    this.base = environment.apiUrl;
  }
  getGrid(branchId, year, month) {
    return this.api.get(`${this.base}/schedule/${branchId}`, {
      params: { year: year.toString(), month: month.toString() }
    });
  }
  upsertCell(req) {
    return this.api.put(`${this.base}/schedule/cell`, req);
  }
  getNote(employeeId, date) {
    return this.api.get(`${this.base}/schedule/note`, {
      params: { employeeId: employeeId.toString(), date }
    });
  }
  upsertNote(req) {
    return this.api.put(`${this.base}/schedule/note`, req);
  }
  getStatusCodes() {
    return this.api.get(`${this.base}/statuscodes`);
  }
  static {
    this.\u0275fac = function ScheduleService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ScheduleService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ScheduleService, factory: _ScheduleService.\u0275fac, providedIn: "root" });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ScheduleService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/services/instruction.service.ts
var InstructionService = class _InstructionService {
  constructor() {
    this.api = inject(HttpClient);
    this.base = environment.apiUrl;
  }
  getForBranch(branchId) {
    return this.api.get(`${this.base}/instructions/${branchId}`);
  }
  save(branchId, dto) {
    return this.api.put(`${this.base}/instructions/${branchId}`, dto);
  }
  static {
    this.\u0275fac = function InstructionService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _InstructionService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _InstructionService, factory: _InstructionService.\u0275fac, providedIn: "root" });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InstructionService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/shared/shift-chip/shift-chip.component.ts
function ShiftChipComponent_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 1);
    \u0275\u0275text(1, "\u{1F514}");
    \u0275\u0275elementEnd();
  }
}
var ShiftChipComponent = class _ShiftChipComponent {
  constructor() {
    this.code = "\u2014";
    this.hasNote = false;
    this.justPainted = false;
    this.statusCodes = [];
  }
  get chipClass() {
    if (!this.code || this.code === "\u2014")
      return "status-blank";
    const sc = this.statusCodes.find((s) => s.code === this.code);
    return sc ? sc.cssClass : "status-blank";
  }
  static {
    this.\u0275fac = function ShiftChipComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ShiftChipComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ShiftChipComponent, selectors: [["app-shift-chip"]], inputs: { code: "code", hasNote: "hasNote", justPainted: "justPainted", statusCodes: "statusCodes" }, decls: 3, vars: 7, consts: [["title", "Has note", 4, "ngIf"], ["title", "Has note"]], template: function ShiftChipComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "span");
        \u0275\u0275text(1);
        \u0275\u0275template(2, ShiftChipComponent_span_2_Template, 2, 0, "span", 0);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275classMap(\u0275\u0275interpolate1("shift-chip ", ctx.chipClass));
        \u0275\u0275classProp("just-painted", ctx.justPainted);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.code || "\u2014", " ");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.hasNote);
      }
    }, dependencies: [CommonModule, NgIf], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ShiftChipComponent, [{
    type: Component,
    args: [{
      selector: "app-shift-chip",
      standalone: true,
      imports: [CommonModule],
      template: `
<span class="shift-chip {{chipClass}}" [class.just-painted]="justPainted">
  {{code || '\u2014'}}
  <span *ngIf="hasNote" title="Has note">\u{1F514}</span>
</span>
  `
    }]
  }], null, { code: [{
    type: Input
  }], hasNote: [{
    type: Input
  }], justPainted: [{
    type: Input
  }], statusCodes: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ShiftChipComponent, { className: "ShiftChipComponent", filePath: "src/app/shared/shift-chip/shift-chip.component.ts", lineNumber: 16 });
})();

// src/app/shared/day-detail-panel/day-detail-panel.component.ts
function DayDetailPanelComponent_div_57_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "div", 10);
    \u0275\u0275text(2, "Resource Category");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 20)(4, "span", 21);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.row.resourceCategory);
  }
}
function DayDetailPanelComponent_div_63_span_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 26);
    \u0275\u0275text(1, "\u2713 Saved");
    \u0275\u0275elementEnd();
  }
}
function DayDetailPanelComponent_div_63_span_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 27);
    \u0275\u0275text(1, "Save failed");
    \u0275\u0275elementEnd();
  }
}
function DayDetailPanelComponent_div_63_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 22)(1, "button", 23);
    \u0275\u0275listener("click", function DayDetailPanelComponent_div_63_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.saveNote());
    });
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, DayDetailPanelComponent_div_63_span_3_Template, 2, 0, "span", 24)(4, DayDetailPanelComponent_div_63_span_4_Template, 2, 0, "span", 25);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.saving);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.saving ? "Saving..." : "Save Note", " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.saveSuccess);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.saveError);
  }
}
function DayDetailPanelComponent_div_67_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28);
    \u0275\u0275text(1, "Loading...");
    \u0275\u0275elementEnd();
  }
}
function DayDetailPanelComponent_div_68_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28);
    \u0275\u0275text(1, "No history.");
    \u0275\u0275elementEnd();
  }
}
function DayDetailPanelComponent_div_70_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29);
    \u0275\u0275element(1, "div", 30);
    \u0275\u0275elementStart(2, "div")(3, "div");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 31);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const h_r3 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275classMap(h_r3.dotType === "blue" ? "blue" : "gray");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(h_r3.text);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(h_r3.timeAgo);
  }
}
var DayDetailPanelComponent = class _DayDetailPanelComponent {
  constructor() {
    this.canNote = false;
    this.statusCodes = [];
    this.close = new EventEmitter();
    this.noteSaved = new EventEmitter();
    this.scheduleSvc = inject(ScheduleService);
    this.auditSvc = inject(AuditService);
    this.noteText = "";
    this.history = [];
    this.loadingHistory = false;
    this.saving = false;
    this.saveSuccess = false;
    this.saveError = false;
  }
  get initials() {
    if (!this.row?.name)
      return "?";
    return this.row.name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
  }
  get dateLabel() {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${months[this.month - 1]} ${this.day}, ${this.year}`;
  }
  get shiftWindow() {
    const shift = (this.row?.defaultShift ?? "").toUpperCase();
    if (shift.includes("AM") || shift === "WA")
      return "5:00 AM \u2013 2:30 PM";
    if (shift.includes("PM") || shift === "WP")
      return "12:00 PM \u2013 9:00 PM";
    return "\u2014";
  }
  get dateStr() {
    const mm = this.month.toString().padStart(2, "0");
    const dd = this.day.toString().padStart(2, "0");
    return `${this.year}-${mm}-${dd}`;
  }
  ngOnInit() {
    this.loadNote();
    this.loadHistory();
  }
  loadNote() {
    this.scheduleSvc.getNote(this.row.employeeId, this.dateStr).subscribe({
      next: (res) => this.noteText = res.note ?? "",
      error: () => this.noteText = ""
    });
  }
  loadHistory() {
    this.loadingHistory = true;
    this.auditSvc.getHistory(this.row.employeeId, this.dateStr).subscribe({
      next: (h) => {
        this.history = h;
        this.loadingHistory = false;
      },
      error: () => {
        this.history = [];
        this.loadingHistory = false;
      }
    });
  }
  saveNote() {
    this.saving = true;
    this.saveSuccess = false;
    this.saveError = false;
    this.scheduleSvc.upsertNote({
      employeeId: this.row.employeeId,
      date: this.dateStr,
      note: this.noteText,
      statusCode: this.cell?.statusCode ?? null
    }).subscribe({
      next: () => {
        this.saving = false;
        this.saveSuccess = true;
        this.noteSaved.emit();
        setTimeout(() => this.saveSuccess = false, 2e3);
      },
      error: () => {
        this.saving = false;
        this.saveError = true;
      }
    });
  }
  onEsc() {
    this.close.emit();
  }
  static {
    this.\u0275fac = function DayDetailPanelComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DayDetailPanelComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DayDetailPanelComponent, selectors: [["app-day-detail-panel"]], hostBindings: function DayDetailPanelComponent_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("keydown.escape", function DayDetailPanelComponent_keydown_escape_HostBindingHandler() {
          return ctx.onEsc();
        }, \u0275\u0275resolveDocument);
      }
    }, inputs: { row: "row", day: "day", cell: "cell", year: "year", month: "month", branchId: "branchId", canNote: "canNote", statusCodes: "statusCodes" }, outputs: { close: "close", noteSaved: "noteSaved" }, decls: 71, vars: 22, consts: [[1, "detail-panel"], [1, "detail-panel-header"], [1, "emp-avatar"], [2, "flex", "1"], [2, "font-weight", "700", "font-size", ".95rem"], [2, "font-size", ".78rem", "color", "var(--ink-light)"], [3, "code", "statusCodes"], [1, "btn-icon", 3, "click"], [1, "detail-panel-body"], [1, "detail-section"], [1, "detail-section-title"], [1, "info-grid"], [1, "info-item"], [1, "info-label"], ["class", "detail-section", 4, "ngIf"], [1, "note-textarea", 3, "ngModelChange", "ngModel", "readonly", "placeholder"], ["style", "margin-top:.5rem;display:flex;gap:.5rem;align-items:center;", 4, "ngIf"], ["style", "color:var(--ink-faint);font-size:.8rem;", 4, "ngIf"], [1, "history-timeline"], ["class", "history-item", 4, "ngFor", "ngForOf"], [1, "resource-chips"], [1, "resource-chip"], [2, "margin-top", ".5rem", "display", "flex", "gap", ".5rem", "align-items", "center"], [1, "btn-primary", "btn-sm", 3, "click", "disabled"], ["style", "color:#16a34a;font-size:.78rem;", 4, "ngIf"], ["style", "color:#dc2626;font-size:.78rem;", 4, "ngIf"], [2, "color", "#16a34a", "font-size", ".78rem"], [2, "color", "#dc2626", "font-size", ".78rem"], [2, "color", "var(--ink-faint)", "font-size", ".8rem"], [1, "history-item"], [1, "history-dot"], [2, "font-size", ".7rem", "color", "var(--ink-faint)", "font-family", "'DM Mono',monospace"]], template: function DayDetailPanelComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
        \u0275\u0275text(3);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "div", 3)(5, "div", 4);
        \u0275\u0275text(6);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "div", 5);
        \u0275\u0275text(8);
        \u0275\u0275element(9, "app-shift-chip", 6);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(10, "button", 7);
        \u0275\u0275listener("click", function DayDetailPanelComponent_Template_button_click_10_listener() {
          return ctx.close.emit();
        });
        \u0275\u0275text(11, "\u2715");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(12, "div", 8)(13, "div", 9)(14, "div", 10);
        \u0275\u0275text(15, "Driver Info");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "div", 11)(17, "div", 12)(18, "div", 13);
        \u0275\u0275text(19, "Job Title");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "div");
        \u0275\u0275text(21);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(22, "div", 12)(23, "div", 13);
        \u0275\u0275text(24, "Default Shift");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(25, "div");
        \u0275\u0275text(26);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(27, "div", 12)(28, "div", 13);
        \u0275\u0275text(29, "Truck");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(30, "div");
        \u0275\u0275text(31);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(32, "div", 12)(33, "div", 13);
        \u0275\u0275text(34, "Truck ID");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(35, "div");
        \u0275\u0275text(36);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(37, "div", 12)(38, "div", 13);
        \u0275\u0275text(39, "Shift Window");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(40, "div");
        \u0275\u0275text(41);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(42, "div", 12)(43, "div", 13);
        \u0275\u0275text(44, "Manager");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(45, "div");
        \u0275\u0275text(46);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(47, "div", 12)(48, "div", 13);
        \u0275\u0275text(49, "Work Phone");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(50, "div");
        \u0275\u0275text(51);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(52, "div", 12)(53, "div", 13);
        \u0275\u0275text(54, "Mobile");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(55, "div");
        \u0275\u0275text(56);
        \u0275\u0275elementEnd()()()();
        \u0275\u0275template(57, DayDetailPanelComponent_div_57_Template, 6, 1, "div", 14);
        \u0275\u0275elementStart(58, "div", 9)(59, "div", 10);
        \u0275\u0275text(60, "Supervisor Note");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(61, "textarea", 15);
        \u0275\u0275twoWayListener("ngModelChange", function DayDetailPanelComponent_Template_textarea_ngModelChange_61_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.noteText, $event) || (ctx.noteText = $event);
          return $event;
        });
        \u0275\u0275text(62, "      ");
        \u0275\u0275elementEnd();
        \u0275\u0275template(63, DayDetailPanelComponent_div_63_Template, 5, 4, "div", 16);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(64, "div", 9)(65, "div", 10);
        \u0275\u0275text(66, "Change History");
        \u0275\u0275elementEnd();
        \u0275\u0275template(67, DayDetailPanelComponent_div_67_Template, 2, 0, "div", 17)(68, DayDetailPanelComponent_div_68_Template, 2, 0, "div", 17);
        \u0275\u0275elementStart(69, "div", 18);
        \u0275\u0275template(70, DayDetailPanelComponent_div_70_Template, 7, 4, "div", 19);
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate(ctx.initials);
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate(ctx.row.name);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate1(" ", ctx.dateLabel, " \xA0 ");
        \u0275\u0275advance();
        \u0275\u0275property("code", (ctx.cell == null ? null : ctx.cell.statusCode) ?? "\u2014")("statusCodes", ctx.statusCodes);
        \u0275\u0275advance(12);
        \u0275\u0275textInterpolate(ctx.row.jobTitle || "\u2014");
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate(ctx.row.defaultShift || "\u2014");
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate(ctx.row.truckAssignment || "\u2014");
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate(ctx.row.truckId || "\u2014");
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate(ctx.shiftWindow);
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate(ctx.row.managerName || "\u2014");
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate(ctx.row.workPhone || "\u2014");
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate(ctx.row.workMobilePhone || "\u2014");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.row.resourceCategory);
        \u0275\u0275advance(4);
        \u0275\u0275property("placeholder", \u0275\u0275interpolate(ctx.canNote ? "Add a note..." : "No notes."));
        \u0275\u0275twoWayProperty("ngModel", ctx.noteText);
        \u0275\u0275property("readonly", !ctx.canNote);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.canNote);
        \u0275\u0275advance(4);
        \u0275\u0275property("ngIf", ctx.loadingHistory);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loadingHistory && ctx.history.length === 0);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngForOf", ctx.history);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, ShiftChipComponent], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DayDetailPanelComponent, [{
    type: Component,
    args: [{
      selector: "app-day-detail-panel",
      standalone: true,
      imports: [CommonModule, FormsModule, ShiftChipComponent],
      template: `
<div class="detail-panel">
  <!-- Header -->
  <div class="detail-panel-header">
    <div class="emp-avatar">{{initials}}</div>
    <div style="flex:1;">
      <div style="font-weight:700;font-size:.95rem;">{{row.name}}</div>
      <div style="font-size:.78rem;color:var(--ink-light);">
        {{dateLabel}} &nbsp;
        <app-shift-chip
          [code]="cell?.statusCode ?? '\u2014'"
          [statusCodes]="statusCodes">
        </app-shift-chip>
      </div>
    </div>
    <button class="btn-icon" (click)="close.emit()">\u2715</button>
  </div>

  <!-- Body -->
  <div class="detail-panel-body">

    <!-- Driver info -->
    <div class="detail-section">
      <div class="detail-section-title">Driver Info</div>
      <div class="info-grid">
        <div class="info-item">
          <div class="info-label">Job Title</div>
          <div>{{row.jobTitle || '\u2014'}}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Default Shift</div>
          <div>{{row.defaultShift || '\u2014'}}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Truck</div>
          <div>{{row.truckAssignment || '\u2014'}}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Truck ID</div>
          <div>{{row.truckId || '\u2014'}}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Shift Window</div>
          <div>{{shiftWindow}}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Manager</div>
          <div>{{row.managerName || '\u2014'}}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Work Phone</div>
          <div>{{row.workPhone || '\u2014'}}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Mobile</div>
          <div>{{row.workMobilePhone || '\u2014'}}</div>
        </div>
      </div>
    </div>

    <!-- Resource type -->
    <div class="detail-section" *ngIf="row.resourceCategory">
      <div class="detail-section-title">Resource Category</div>
      <div class="resource-chips">
        <span class="resource-chip">{{row.resourceCategory}}</span>
      </div>
    </div>

    <!-- Note -->
    <div class="detail-section">
      <div class="detail-section-title">Supervisor Note</div>
      <textarea
        class="note-textarea"
        [(ngModel)]="noteText"
        [readonly]="!canNote"
        placeholder="{{canNote ? 'Add a note...' : 'No notes.'}}">
      </textarea>
      <div style="margin-top:.5rem;display:flex;gap:.5rem;align-items:center;" *ngIf="canNote">
        <button class="btn-primary btn-sm" (click)="saveNote()" [disabled]="saving">
          {{saving ? 'Saving...' : 'Save Note'}}
        </button>
        <span *ngIf="saveSuccess" style="color:#16a34a;font-size:.78rem;">\u2713 Saved</span>
        <span *ngIf="saveError" style="color:#dc2626;font-size:.78rem;">Save failed</span>
      </div>
    </div>

    <!-- History -->
    <div class="detail-section">
      <div class="detail-section-title">Change History</div>
      <div *ngIf="loadingHistory" style="color:var(--ink-faint);font-size:.8rem;">Loading...</div>
      <div *ngIf="!loadingHistory && history.length === 0" style="color:var(--ink-faint);font-size:.8rem;">No history.</div>
      <div class="history-timeline">
        <div class="history-item" *ngFor="let h of history">
          <div class="history-dot" [class]="h.dotType === 'blue' ? 'blue' : 'gray'"></div>
          <div>
            <div>{{h.text}}</div>
            <div style="font-size:.7rem;color:var(--ink-faint);font-family:'DM Mono',monospace;">{{h.timeAgo}}</div>
          </div>
        </div>
      </div>
    </div>

  </div>
</div>
  `
    }]
  }], null, { row: [{
    type: Input
  }], day: [{
    type: Input
  }], cell: [{
    type: Input
  }], year: [{
    type: Input
  }], month: [{
    type: Input
  }], branchId: [{
    type: Input
  }], canNote: [{
    type: Input
  }], statusCodes: [{
    type: Input
  }], close: [{
    type: Output
  }], noteSaved: [{
    type: Output
  }], onEsc: [{
    type: HostListener,
    args: ["document:keydown.escape"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DayDetailPanelComponent, { className: "DayDetailPanelComponent", filePath: "src/app/shared/day-detail-panel/day-detail-panel.component.ts", lineNumber: 123 });
})();

// src/app/shared/branch-instructions/branch-instructions.component.ts
function BranchInstructionsComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3);
    \u0275\u0275text(1, " \u{1F504} Instructions updated live \u2014 page refreshed automatically. ");
    \u0275\u0275elementEnd();
  }
}
function BranchInstructionsComponent_div_2_span_1_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 10);
  }
}
function BranchInstructionsComponent_div_2_span_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 7);
    \u0275\u0275listener("click", function BranchInstructionsComponent_div_2_span_1_Template_span_click_0_listener() {
      const sec_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.togglePopover(sec_r2.key));
    });
    \u0275\u0275template(1, BranchInstructionsComponent_div_2_span_1_span_1_Template, 1, 0, "span", 8);
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "span", 9);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const sec_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("active", ctx_r2.activeKey === sec_r2.key);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.hasHighlight(sec_r2));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", sec_r2.shortTitle, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(sec_r2.lines.length);
  }
}
function BranchInstructionsComponent_div_2_button_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 11);
    \u0275\u0275listener("click", function BranchInstructionsComponent_div_2_button_2_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.editRequested.emit());
    });
    \u0275\u0275text(1, " \u270F Edit ");
    \u0275\u0275elementEnd();
  }
}
function BranchInstructionsComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4);
    \u0275\u0275template(1, BranchInstructionsComponent_div_2_span_1_Template, 5, 5, "span", 5)(2, BranchInstructionsComponent_div_2_button_2_Template, 2, 0, "button", 6);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r2.vm.sections);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.canEdit);
  }
}
function BranchInstructionsComponent_div_3_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const line_r6 = ctx.$implicit;
    \u0275\u0275classProp("highlighted", line_r6.isHighlighted);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", line_r6.content, " ");
  }
}
function BranchInstructionsComponent_div_3_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19);
    \u0275\u0275text(1, " No entries yet. ");
    \u0275\u0275elementEnd();
  }
}
function BranchInstructionsComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 12)(1, "div", 13);
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "button", 14);
    \u0275\u0275listener("click", function BranchInstructionsComponent_div_3_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.activeKey = null);
    });
    \u0275\u0275text(4, "\u2715");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 15);
    \u0275\u0275template(6, BranchInstructionsComponent_div_3_div_6_Template, 2, 3, "div", 16)(7, BranchInstructionsComponent_div_3_div_7_Template, 2, 0, "div", 17);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.activeSection.title, " ");
    \u0275\u0275advance(4);
    \u0275\u0275property("ngForOf", ctx_r2.activeSection.lines);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.activeSection.lines.length === 0);
  }
}
var BranchInstructionsComponent = class _BranchInstructionsComponent {
  constructor() {
    this.canEdit = false;
    this.editRequested = new EventEmitter();
    this.instrSvc = inject(InstructionService);
    this.signalr = inject(SignalrService);
    this.vm = null;
    this.activeKey = null;
    this.showLiveBanner = false;
  }
  get activeSection() {
    return this.vm?.sections.find((s) => s.key === this.activeKey) ?? null;
  }
  hasHighlight(sec) {
    return sec.lines.some((l) => l.isHighlighted);
  }
  togglePopover(key) {
    this.activeKey = this.activeKey === key ? null : key;
  }
  ngOnInit() {
    this.load();
    this.sub = this.signalr.instructionUpdated$.subscribe((event) => {
      if (event.branchId === this.branchId) {
        this.reload();
        this.showLiveBanner = true;
        clearTimeout(this.bannerTimer);
        this.bannerTimer = setTimeout(() => this.showLiveBanner = false, 6e3);
      }
    });
  }
  ngOnDestroy() {
    this.sub?.unsubscribe();
    clearTimeout(this.bannerTimer);
  }
  reload() {
    this.load();
  }
  load() {
    this.instrSvc.getForBranch(this.branchId).subscribe({
      next: (vm) => this.vm = vm,
      error: () => {
      }
    });
  }
  static {
    this.\u0275fac = function BranchInstructionsComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BranchInstructionsComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BranchInstructionsComponent, selectors: [["app-branch-instructions"]], inputs: { branchId: "branchId", canEdit: "canEdit" }, outputs: { editRequested: "editRequested" }, decls: 4, vars: 3, consts: [["class", "instr-live-banner", 4, "ngIf"], ["class", "instr-bar", 4, "ngIf"], ["class", "instr-popover", 4, "ngIf"], [1, "instr-live-banner"], [1, "instr-bar"], ["class", "instr-chip", 3, "active", "click", 4, "ngFor", "ngForOf"], ["class", "btn-ghost btn-sm", "style", "margin-left:auto;", 3, "click", 4, "ngIf"], [1, "instr-chip", 3, "click"], ["class", "instr-urgent-dot", 4, "ngIf"], [1, "instr-badge"], [1, "instr-urgent-dot"], [1, "btn-ghost", "btn-sm", 2, "margin-left", "auto", 3, "click"], [1, "instr-popover"], [1, "instr-popover-hdr"], [1, "btn-icon", 2, "color", "#fff", "font-size", ".8rem", 3, "click"], [1, "instr-popover-body"], ["class", "instr-line", 3, "highlighted", 4, "ngFor", "ngForOf"], ["style", "color:var(--ink-faint);font-size:.8rem;", 4, "ngIf"], [1, "instr-line"], [2, "color", "var(--ink-faint)", "font-size", ".8rem"]], template: function BranchInstructionsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div");
        \u0275\u0275template(1, BranchInstructionsComponent_div_1_Template, 2, 0, "div", 0)(2, BranchInstructionsComponent_div_2_Template, 3, 2, "div", 1)(3, BranchInstructionsComponent_div_3_Template, 8, 3, "div", 2);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showLiveBanner);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.vm);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.activeSection);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BranchInstructionsComponent, [{
    type: Component,
    args: [{
      selector: "app-branch-instructions",
      standalone: true,
      imports: [CommonModule],
      template: `
<div>
  <div class="instr-live-banner" *ngIf="showLiveBanner">
    \u{1F504} Instructions updated live \u2014 page refreshed automatically.
  </div>
  <div class="instr-bar" *ngIf="vm">
    <span *ngFor="let sec of vm.sections" class="instr-chip"
          [class.active]="activeKey === sec.key"
          (click)="togglePopover(sec.key)">
      <span class="instr-urgent-dot" *ngIf="hasHighlight(sec)"></span>
      {{sec.shortTitle}}
      <span class="instr-badge">{{sec.lines.length}}</span>
    </span>
    <button class="btn-ghost btn-sm" *ngIf="canEdit" (click)="editRequested.emit()" style="margin-left:auto;">
      \u270F Edit
    </button>
  </div>

  <!-- Popover for active section -->
  <div class="instr-popover" *ngIf="activeSection">
    <div class="instr-popover-hdr">
      {{activeSection.title}}
      <button class="btn-icon" style="color:#fff;font-size:.8rem;" (click)="activeKey = null">\u2715</button>
    </div>
    <div class="instr-popover-body">
      <div *ngFor="let line of activeSection.lines"
           class="instr-line"
           [class.highlighted]="line.isHighlighted">
        {{line.content}}
      </div>
      <div *ngIf="activeSection.lines.length === 0" style="color:var(--ink-faint);font-size:.8rem;">
        No entries yet.
      </div>
    </div>
  </div>
</div>
  `
    }]
  }], null, { branchId: [{
    type: Input
  }], canEdit: [{
    type: Input
  }], editRequested: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BranchInstructionsComponent, { className: "BranchInstructionsComponent", filePath: "src/app/shared/branch-instructions/branch-instructions.component.ts", lineNumber: 53 });
})();

// src/app/shared/branch-instruction-editor/branch-instruction-editor.component.ts
function BranchInstructionEditorComponent_div_10_div_1_div_3_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 18)(1, "textarea", 19);
    \u0275\u0275twoWayListener("ngModelChange", function BranchInstructionEditorComponent_div_10_div_1_div_3_div_1_Template_textarea_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r2);
      const line_r3 = \u0275\u0275nextContext().$implicit;
      \u0275\u0275twoWayBindingSet(line_r3.content, $event) || (line_r3.content = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 20);
    \u0275\u0275listener("click", function BranchInstructionEditorComponent_div_10_div_1_div_3_div_1_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r2);
      const line_r3 = \u0275\u0275nextContext().$implicit;
      return \u0275\u0275resetView(line_r3.isHighlighted = !line_r3.isHighlighted);
    });
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 21);
    \u0275\u0275listener("click", function BranchInstructionEditorComponent_div_10_div_1_div_3_div_1_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r2);
      const i_r4 = \u0275\u0275nextContext().index;
      const sec_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r5 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r5.deleteLine(sec_r5, i_r4));
    });
    \u0275\u0275text(5, "\u{1F5D1}");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const line_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", line_r3.content);
    \u0275\u0275advance();
    \u0275\u0275property("title", line_r3.isHighlighted ? "Highlighted (urgent)" : "Not highlighted");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", line_r3.isHighlighted ? "\u{1F534}" : "\u26AA", " ");
  }
}
function BranchInstructionEditorComponent_div_10_div_1_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275template(1, BranchInstructionEditorComponent_div_10_div_1_div_3_div_1_Template, 6, 3, "div", 17);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const line_r3 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !line_r3._deleted);
  }
}
function BranchInstructionEditorComponent_div_10_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "div", 15);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, BranchInstructionEditorComponent_div_10_div_1_div_3_Template, 2, 1, "div", 14);
    \u0275\u0275elementStart(4, "button", 16);
    \u0275\u0275listener("click", function BranchInstructionEditorComponent_div_10_div_1_Template_button_click_4_listener() {
      const sec_r5 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r5 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r5.addLine(sec_r5));
    });
    \u0275\u0275text(5, "+ Add line");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const sec_r5 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(sec_r5.title);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", sec_r5.lines);
  }
}
function BranchInstructionEditorComponent_div_10_div_2_div_3_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 18)(1, "textarea", 19);
    \u0275\u0275twoWayListener("ngModelChange", function BranchInstructionEditorComponent_div_10_div_2_div_3_div_1_Template_textarea_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r8);
      const line_r9 = \u0275\u0275nextContext().$implicit;
      \u0275\u0275twoWayBindingSet(line_r9.content, $event) || (line_r9.content = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 20);
    \u0275\u0275listener("click", function BranchInstructionEditorComponent_div_10_div_2_div_3_div_1_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r8);
      const line_r9 = \u0275\u0275nextContext().$implicit;
      return \u0275\u0275resetView(line_r9.isHighlighted = !line_r9.isHighlighted);
    });
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 21);
    \u0275\u0275listener("click", function BranchInstructionEditorComponent_div_10_div_2_div_3_div_1_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r8);
      const i_r10 = \u0275\u0275nextContext().index;
      const sec_r11 = \u0275\u0275nextContext().$implicit;
      const ctx_r5 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r5.deleteLine(sec_r11, i_r10));
    });
    \u0275\u0275text(5, "\u{1F5D1}");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const line_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", line_r9.content);
    \u0275\u0275advance();
    \u0275\u0275property("title", line_r9.isHighlighted ? "Highlighted (urgent)" : "Not highlighted");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", line_r9.isHighlighted ? "\u{1F534}" : "\u26AA", " ");
  }
}
function BranchInstructionEditorComponent_div_10_div_2_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275template(1, BranchInstructionEditorComponent_div_10_div_2_div_3_div_1_Template, 6, 3, "div", 17);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const line_r9 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !line_r9._deleted);
  }
}
function BranchInstructionEditorComponent_div_10_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "div", 22);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, BranchInstructionEditorComponent_div_10_div_2_div_3_Template, 2, 1, "div", 14);
    \u0275\u0275elementStart(4, "button", 16);
    \u0275\u0275listener("click", function BranchInstructionEditorComponent_div_10_div_2_Template_button_click_4_listener() {
      const sec_r11 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r5 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r5.addLine(sec_r11));
    });
    \u0275\u0275text(5, "+ Add line");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const sec_r11 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(sec_r11.title);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", sec_r11.lines);
  }
}
function BranchInstructionEditorComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13);
    \u0275\u0275template(1, BranchInstructionEditorComponent_div_10_div_1_Template, 6, 2, "div", 14)(2, BranchInstructionEditorComponent_div_10_div_2_Template, 6, 2, "div", 14);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r5 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r5.topSections);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r5.bottomSections);
  }
}
function BranchInstructionEditorComponent_span_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 23);
    \u0275\u0275text(1, "\u2713 Saved");
    \u0275\u0275elementEnd();
  }
}
function BranchInstructionEditorComponent_span_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 24);
    \u0275\u0275text(1, "Save failed");
    \u0275\u0275elementEnd();
  }
}
var BranchInstructionEditorComponent = class _BranchInstructionEditorComponent {
  constructor() {
    this.branchName = "";
    this.saved = new EventEmitter();
    this.closed = new EventEmitter();
    this.instrSvc = inject(InstructionService);
    this.editVm = null;
    this.saving = false;
    this.saveStatus = "";
    this.nextTempId = -1;
  }
  get topSections() {
    return this.editVm?.sections.filter((s) => s.position === 0) ?? [];
  }
  get bottomSections() {
    return this.editVm?.sections.filter((s) => s.position === 1) ?? [];
  }
  ngOnInit() {
    this.editVm = JSON.parse(JSON.stringify(this.vm));
  }
  addLine(sec) {
    sec.lines.push({
      id: this.nextTempId--,
      content: "",
      isHighlighted: false,
      sortOrder: sec.lines.length,
      updatedByName: null,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
      _deleted: false
    });
  }
  deleteLine(sec, index) {
    const line = sec.lines[index];
    if (line.id < 0) {
      sec.lines.splice(index, 1);
    } else {
      line._deleted = true;
    }
  }
  save() {
    if (!this.editVm)
      return;
    this.saving = true;
    this.saveStatus = "";
    const dto = {
      branchId: this.editVm.branchId,
      sections: this.editVm.sections.map((sec) => __spreadProps(__spreadValues({}, sec), {
        lines: sec.lines.filter((l) => !l._deleted && l.content.trim() !== "").map((_a) => {
          var _b = _a, { _deleted: _d } = _b, rest = __objRest(_b, ["_deleted"]);
          return __spreadValues({}, rest);
        })
      }))
    };
    this.instrSvc.save(dto.branchId, dto).subscribe({
      next: () => {
        this.saving = false;
        this.saveStatus = "saved";
        this.saved.emit();
        setTimeout(() => this.saveStatus = "", 2e3);
      },
      error: () => {
        this.saving = false;
        this.saveStatus = "error";
      }
    });
  }
  onOverlayClick(event) {
    if (event.target.classList.contains("instr-editor-overlay")) {
      this.closed.emit();
    }
  }
  static {
    this.\u0275fac = function BranchInstructionEditorComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BranchInstructionEditorComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BranchInstructionEditorComponent, selectors: [["app-branch-instruction-editor"]], inputs: { vm: "vm", branchName: "branchName" }, outputs: { saved: "saved", closed: "closed" }, decls: 19, vars: 7, consts: [[1, "instr-editor-overlay", 3, "click"], [1, "instr-editor-panel"], [1, "instr-editor-header"], [2, "font-weight", "700", "font-size", ".95rem"], [2, "font-size", ".78rem", "opacity", ".7"], [1, "btn-icon", 2, "color", "#e2e8f0", 3, "click"], ["class", "instr-editor-body", 4, "ngIf"], [1, "instr-editor-footer"], [1, "btn-primary", 3, "click", "disabled"], [1, "btn-ghost", 3, "click", "disabled"], [1, "instr-save-status"], ["style", "color:#16a34a;", 4, "ngIf"], ["style", "color:#dc2626;", 4, "ngIf"], [1, "instr-editor-body"], [4, "ngFor", "ngForOf"], [1, "instr-section-hdr"], [1, "btn-ghost", "btn-sm", 2, "margin-top", ".4rem", 3, "click"], ["class", "instr-line-row", 4, "ngIf"], [1, "instr-line-row"], ["rows", "2", 1, "instr-line-textarea", 3, "ngModelChange", "ngModel"], [1, "instr-hl-btn", 3, "click", "title"], ["title", "Delete line", 1, "instr-del-btn", 3, "click"], [1, "instr-section-hdr", "bottom"], [2, "color", "#16a34a"], [2, "color", "#dc2626"]], template: function BranchInstructionEditorComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275listener("click", function BranchInstructionEditorComponent_Template_div_click_0_listener($event) {
          return ctx.onOverlayClick($event);
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(1, "div", 1)(2, "div", 2)(3, "div")(4, "div", 3);
        \u0275\u0275text(5, "Edit Instructions");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "div", 4);
        \u0275\u0275text(7);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(8, "button", 5);
        \u0275\u0275listener("click", function BranchInstructionEditorComponent_Template_button_click_8_listener() {
          return ctx.closed.emit();
        });
        \u0275\u0275text(9, "\u2715");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(10, BranchInstructionEditorComponent_div_10_Template, 3, 2, "div", 6);
        \u0275\u0275elementStart(11, "div", 7)(12, "button", 8);
        \u0275\u0275listener("click", function BranchInstructionEditorComponent_Template_button_click_12_listener() {
          return ctx.save();
        });
        \u0275\u0275text(13);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "button", 9);
        \u0275\u0275listener("click", function BranchInstructionEditorComponent_Template_button_click_14_listener() {
          return ctx.closed.emit();
        });
        \u0275\u0275text(15, "Cancel");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "span", 10);
        \u0275\u0275template(17, BranchInstructionEditorComponent_span_17_Template, 2, 0, "span", 11)(18, BranchInstructionEditorComponent_span_18_Template, 2, 0, "span", 12);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(7);
        \u0275\u0275textInterpolate(ctx.branchName);
        \u0275\u0275advance(3);
        \u0275\u0275property("ngIf", ctx.editVm);
        \u0275\u0275advance(2);
        \u0275\u0275property("disabled", ctx.saving);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.saving ? "Saving..." : "Save", " ");
        \u0275\u0275advance();
        \u0275\u0275property("disabled", ctx.saving);
        \u0275\u0275advance(3);
        \u0275\u0275property("ngIf", ctx.saveStatus === "saved");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.saveStatus === "error");
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BranchInstructionEditorComponent, [{
    type: Component,
    args: [{
      selector: "app-branch-instruction-editor",
      standalone: true,
      imports: [CommonModule, FormsModule],
      template: `
<div class="instr-editor-overlay" (click)="onOverlayClick($event)"></div>
<div class="instr-editor-panel">
  <!-- Header -->
  <div class="instr-editor-header">
    <div>
      <div style="font-weight:700;font-size:.95rem;">Edit Instructions</div>
      <div style="font-size:.78rem;opacity:.7;">{{branchName}}</div>
    </div>
    <button class="btn-icon" style="color:#e2e8f0;" (click)="closed.emit()">\u2715</button>
  </div>

  <!-- Body -->
  <div class="instr-editor-body" *ngIf="editVm">
    <!-- Top sections -->
    <div *ngFor="let sec of topSections">
      <div class="instr-section-hdr">{{sec.title}}</div>
      <div *ngFor="let line of sec.lines; let i = index">
        <div class="instr-line-row" *ngIf="!line._deleted">
          <textarea class="instr-line-textarea" [(ngModel)]="line.content"
                    rows="2"></textarea>
          <button class="instr-hl-btn" (click)="line.isHighlighted = !line.isHighlighted"
                  [title]="line.isHighlighted ? 'Highlighted (urgent)' : 'Not highlighted'">
            {{line.isHighlighted ? '\u{1F534}' : '\u26AA'}}
          </button>
          <button class="instr-del-btn" (click)="deleteLine(sec, i)" title="Delete line">\u{1F5D1}</button>
        </div>
      </div>
      <button class="btn-ghost btn-sm" (click)="addLine(sec)" style="margin-top:.4rem;">+ Add line</button>
    </div>

    <!-- Bottom sections -->
    <div *ngFor="let sec of bottomSections">
      <div class="instr-section-hdr bottom">{{sec.title}}</div>
      <div *ngFor="let line of sec.lines; let i = index">
        <div class="instr-line-row" *ngIf="!line._deleted">
          <textarea class="instr-line-textarea" [(ngModel)]="line.content"
                    rows="2"></textarea>
          <button class="instr-hl-btn" (click)="line.isHighlighted = !line.isHighlighted"
                  [title]="line.isHighlighted ? 'Highlighted (urgent)' : 'Not highlighted'">
            {{line.isHighlighted ? '\u{1F534}' : '\u26AA'}}
          </button>
          <button class="instr-del-btn" (click)="deleteLine(sec, i)" title="Delete line">\u{1F5D1}</button>
        </div>
      </div>
      <button class="btn-ghost btn-sm" (click)="addLine(sec)" style="margin-top:.4rem;">+ Add line</button>
    </div>
  </div>

  <!-- Footer -->
  <div class="instr-editor-footer">
    <button class="btn-primary" (click)="save()" [disabled]="saving">
      {{saving ? 'Saving...' : 'Save'}}
    </button>
    <button class="btn-ghost" (click)="closed.emit()" [disabled]="saving">Cancel</button>
    <span class="instr-save-status">
      <span *ngIf="saveStatus === 'saved'" style="color:#16a34a;">\u2713 Saved</span>
      <span *ngIf="saveStatus === 'error'" style="color:#dc2626;">Save failed</span>
    </span>
  </div>
</div>
  `
    }]
  }], null, { vm: [{
    type: Input
  }], branchName: [{
    type: Input
  }], saved: [{
    type: Output
  }], closed: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BranchInstructionEditorComponent, { className: "BranchInstructionEditorComponent", filePath: "src/app/shared/branch-instruction-editor/branch-instruction-editor.component.ts", lineNumber: 93 });
})();

// src/app/pages/schedule/schedule.component.ts
var _c0 = ["instrStrip"];
function ScheduleComponent_span_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 19);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classMap(ctx_r0.summary.status || "");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.statusLabel, " ");
  }
}
function ScheduleComponent_app_branch_instructions_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-branch-instructions", 20, 0);
    \u0275\u0275listener("editRequested", function ScheduleComponent_app_branch_instructions_17_Template_app_branch_instructions_editRequested_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.openInstructionEditor());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("branchId", ctx_r0.branchId)("canEdit", ctx_r0.canInstructionEdit);
  }
}
function ScheduleComponent_div_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21);
    \u0275\u0275element(1, "app-fill-bar", 22);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("pct", ctx_r0.summary.fillRate);
  }
}
function ScheduleComponent_div_19_app_shift_chip_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-shift-chip", 28);
    \u0275\u0275listener("click", function ScheduleComponent_div_19_app_shift_chip_1_Template_app_shift_chip_click_0_listener() {
      const sc_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.setPaintMode(sc_r5.code));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const sc_r5 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("active", ctx_r0.paintMode === sc_r5.code);
    \u0275\u0275property("code", sc_r5.code)("statusCodes", ctx_r0.statusCodes);
  }
}
function ScheduleComponent_div_19_span_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 29);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.selectedRows.size, " row(s) selected ");
  }
}
function ScheduleComponent_div_19_span_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 30);
    \u0275\u0275text(1, " Click a cell to paint. Esc to cancel. ");
    \u0275\u0275elementEnd();
  }
}
function ScheduleComponent_div_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 23);
    \u0275\u0275template(1, ScheduleComponent_div_19_app_shift_chip_1_Template, 1, 4, "app-shift-chip", 24);
    \u0275\u0275elementStart(2, "button", 25);
    \u0275\u0275listener("click", function ScheduleComponent_div_19_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.clearPaintMode());
    });
    \u0275\u0275text(3, "Clear");
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, ScheduleComponent_div_19_span_4_Template, 2, 1, "span", 26)(5, ScheduleComponent_div_19_span_5_Template, 2, 0, "span", 27);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.paintCodes);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r0.selectedRows.size > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.paintMode);
  }
}
function ScheduleComponent_div_20_th_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "th", 38);
  }
}
function ScheduleComponent_div_20_th_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th")(1, "div", 39)(2, "span", 40);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 41);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const d_r6 = ctx.$implicit;
    \u0275\u0275classProp("weekend", d_r6.isWeekend);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(d_r6.dayAbbr);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(d_r6.day);
  }
}
function ScheduleComponent_div_20_tr_11_td_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 38)(1, "input", 45);
    \u0275\u0275listener("change", function ScheduleComponent_div_20_tr_11_td_1_Template_input_change_1_listener() {
      \u0275\u0275restoreView(_r7);
      const row_r8 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.toggleRowSelect(row_r8.employeeId));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r8 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("checked", ctx_r0.selectedRows.has(row_r8.employeeId));
  }
}
function ScheduleComponent_div_20_tr_11_td_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 46);
    \u0275\u0275listener("click", function ScheduleComponent_div_20_tr_11_td_6_Template_td_click_0_listener() {
      const d_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const row_r8 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.handleCellClick(row_r8, d_r10.day, row_r8.cells[d_r10.day]));
    });
    \u0275\u0275element(1, "app-shift-chip", 47);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const d_r10 = ctx.$implicit;
    const row_r8 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("weekend", d_r10.isWeekend)("paint-cursor", ctx_r0.paintMode !== null)("note-pulse", (row_r8.cells[d_r10.day] == null ? null : row_r8.cells[d_r10.day].hasNote) && !ctx_r0.isViewed(row_r8.employeeId, d_r10.day));
    \u0275\u0275advance();
    \u0275\u0275property("code", (row_r8.cells[d_r10.day] == null ? null : row_r8.cells[d_r10.day].statusCode) ?? "\u2014")("hasNote", (row_r8.cells[d_r10.day] == null ? null : row_r8.cells[d_r10.day].hasNote) ?? false)("justPainted", ctx_r0.justPainted.has(row_r8.employeeId + "-" + d_r10.day))("statusCodes", ctx_r0.statusCodes);
  }
}
function ScheduleComponent_div_20_tr_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr");
    \u0275\u0275template(1, ScheduleComponent_div_20_tr_11_td_1_Template, 2, 1, "td", 33);
    \u0275\u0275elementStart(2, "td", 42);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "td", 43);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, ScheduleComponent_div_20_tr_11_td_6_Template, 2, 10, "td", 44);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r8 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("selected-row", ctx_r0.selectedRows.has(row_r8.employeeId));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.canEdit);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r8.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r8.defaultShift);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.grid.days);
  }
}
function ScheduleComponent_div_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31)(1, "table", 32)(2, "thead")(3, "tr");
    \u0275\u0275template(4, ScheduleComponent_div_20_th_4_Template, 1, 0, "th", 33);
    \u0275\u0275elementStart(5, "th", 34);
    \u0275\u0275text(6, "Employee");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th", 35);
    \u0275\u0275text(8, "Shift");
    \u0275\u0275elementEnd();
    \u0275\u0275template(9, ScheduleComponent_div_20_th_9_Template, 6, 4, "th", 36);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "tbody");
    \u0275\u0275template(11, ScheduleComponent_div_20_tr_11_Template, 7, 6, "tr", 37);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r0.canEdit);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngForOf", ctx_r0.grid.days);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r0.grid.rows);
  }
}
function ScheduleComponent_div_21_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 50);
    \u0275\u0275element(1, "span");
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const sc_r11 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275classMap(\u0275\u0275interpolate1("legend-chip ", sc_r11.cssClass));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(sc_r11.label);
  }
}
function ScheduleComponent_div_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 48);
    \u0275\u0275template(1, ScheduleComponent_div_21_span_1_Template, 4, 4, "span", 49);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.legendCodes);
  }
}
function ScheduleComponent_div_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 51);
    \u0275\u0275text(1, " Loading schedule...\n");
    \u0275\u0275elementEnd();
  }
}
function ScheduleComponent_div_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 52)(1, "div", 53);
    \u0275\u0275text(2, "Could not load schedule");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 54);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 55);
    \u0275\u0275listener("click", function ScheduleComponent_div_23_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.loadGrid());
    });
    \u0275\u0275text(6, "Retry");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.loadError);
  }
}
function ScheduleComponent_app_day_detail_panel_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-day-detail-panel", 56);
    \u0275\u0275listener("close", function ScheduleComponent_app_day_detail_panel_24_Template_app_day_detail_panel_close_0_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeDetailPanel());
    })("noteSaved", function ScheduleComponent_app_day_detail_panel_24_Template_app_day_detail_panel_noteSaved_0_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onNoteSaved());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("row", ctx_r0.detailRow)("day", ctx_r0.detailDay)("cell", ctx_r0.detailCell)("year", ctx_r0.year)("month", ctx_r0.month)("branchId", ctx_r0.branchId)("canNote", ctx_r0.canNote)("statusCodes", ctx_r0.statusCodes);
  }
}
function ScheduleComponent_app_branch_instruction_editor_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-branch-instruction-editor", 57);
    \u0275\u0275listener("saved", function ScheduleComponent_app_branch_instruction_editor_25_Template_app_branch_instruction_editor_saved_0_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onInstructionSaved());
    })("closed", function ScheduleComponent_app_branch_instruction_editor_25_Template_app_branch_instruction_editor_closed_0_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.instructionEditorOpen = false);
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("vm", ctx_r0.instructions)("branchName", (ctx_r0.summary == null ? null : ctx_r0.summary.branchName) ?? "");
  }
}
var WRITE_ROLES = [ROLES.PlannerDashboard, ROLES.FieldSupervisor, ROLES.DispatchSupervisor, ROLES.Planner];
var NOTE_ROLES = [ROLES.PlannerDashboard, ROLES.FieldSupervisor, ROLES.DispatchSupervisor, ROLES.Planner, ROLES.Dispatcher];
var ScheduleComponent = class _ScheduleComponent {
  constructor() {
    this.route = inject(ActivatedRoute);
    this.scheduleSvc = inject(ScheduleService);
    this.branchSvc = inject(BranchService);
    this.instrSvc = inject(InstructionService);
    this.auth = inject(AuthService);
    this.branchId = 0;
    this.year = (/* @__PURE__ */ new Date()).getFullYear();
    this.month = (/* @__PURE__ */ new Date()).getMonth() + 1;
    this.grid = null;
    this.summary = null;
    this.statusCodes = [];
    this.instructions = null;
    this.paintMode = null;
    this.selectedRows = /* @__PURE__ */ new Set();
    this.justPainted = /* @__PURE__ */ new Set();
    this.detailRow = null;
    this.detailDay = null;
    this.detailCell = null;
    this.instructionEditorOpen = false;
    this.loading = false;
    this.loadError = "";
    this.canEdit = false;
    this.canNote = false;
    this.canInstructionEdit = false;
    this.viewedKey = "";
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
  get statusLabel() {
    const map = {
      green: "Up to Date",
      amber: "In Progress",
      red: "Needs Attention"
    };
    return map[this.summary?.status ?? ""] ?? (this.summary?.status ?? "");
  }
  get paintCodes() {
    return this.statusCodes.filter((s) => s.showInPaintBar);
  }
  get legendCodes() {
    return this.statusCodes.filter((s) => s.showInPicker);
  }
  ngOnInit() {
    this.canEdit = this.auth.hasRole(...WRITE_ROLES);
    this.canNote = this.auth.hasRole(...NOTE_ROLES);
    this.canInstructionEdit = this.auth.hasRole(...WRITE_ROLES);
    const userId = this.auth.currentUser()?.userId ?? "guest";
    this.viewedKey = `wre-viewed-cells:${userId}`;
    this.route.paramMap.subscribe((params) => {
      const id = params.get("branchId");
      this.branchId = id ? +id : 0;
      this.route.queryParamMap.subscribe((qp) => {
        this.year = qp.get("year") ? +qp.get("year") : this.year;
        this.month = qp.get("month") ? +qp.get("month") : this.month;
        this.loadAll();
      });
    });
    this.scheduleSvc.getStatusCodes().subscribe({
      next: (codes) => this.statusCodes = codes,
      error: () => {
      }
    });
  }
  ngOnDestroy() {
  }
  prevMonth() {
    if (this.month === 1) {
      this.year--;
      this.month = 12;
    } else
      this.month--;
    this.loadGrid();
    this.loadSummary();
  }
  nextMonth() {
    if (this.isMaxMonth)
      return;
    if (this.month === 12) {
      this.year++;
      this.month = 1;
    } else
      this.month++;
    this.loadGrid();
    this.loadSummary();
  }
  setPaintMode(code) {
    this.paintMode = this.paintMode === code ? null : code;
  }
  clearPaintMode() {
    this.paintMode = null;
    this.selectedRows.clear();
  }
  toggleRowSelect(empId) {
    if (this.selectedRows.has(empId))
      this.selectedRows.delete(empId);
    else
      this.selectedRows.add(empId);
  }
  handleCellClick(row, day, cell) {
    if (this.paintMode !== null) {
      const targets = this.selectedRows.size > 0 ? [...this.selectedRows] : [row.employeeId];
      for (const empId of targets) {
        const dateStr = this.toDateStr(this.year, this.month, day);
        const targetRow = this.grid.rows.find((r) => r.employeeId === empId);
        if (!targetRow)
          continue;
        if (!targetRow.cells[day]) {
          targetRow.cells[day] = { statusCode: "\u2014", hasNote: false, isNew: true };
        }
        targetRow.cells[day].statusCode = this.paintMode;
        this.scheduleSvc.upsertCell({
          employeeId: empId,
          date: dateStr,
          statusCode: this.paintMode
        }).subscribe();
        const key = `${empId}-${day}`;
        this.justPainted.add(key);
        setTimeout(() => this.justPainted.delete(key), 700);
      }
    } else {
      this.detailRow = row;
      this.detailDay = day;
      this.detailCell = cell ?? null;
      this.markViewed(row.employeeId, day);
    }
  }
  closeDetailPanel() {
    this.detailRow = null;
    this.detailDay = null;
    this.detailCell = null;
  }
  onNoteSaved() {
    if (this.detailRow && this.detailDay !== null && this.grid) {
      const cell = this.detailRow.cells[this.detailDay];
      if (cell)
        cell.hasNote = true;
    }
  }
  openInstructionEditor() {
    if (this.instructions) {
      this.instructionEditorOpen = true;
    } else {
      this.instrSvc.getForBranch(this.branchId).subscribe({
        next: (vm) => {
          this.instructions = vm;
          this.instructionEditorOpen = true;
        }
      });
    }
  }
  onInstructionSaved() {
    this.instructionEditorOpen = false;
    this.instrSvc.getForBranch(this.branchId).subscribe({
      next: (vm) => {
        this.instructions = vm;
        this.instrStrip?.reload();
      }
    });
  }
  isViewed(empId, day) {
    const dateStr = this.toDateStr(this.year, this.month, day);
    const key = `${empId}:${dateStr}`;
    const viewed = this.getViewedSet();
    return viewed.has(key);
  }
  markViewed(empId, day) {
    const dateStr = this.toDateStr(this.year, this.month, day);
    const key = `${empId}:${dateStr}`;
    const viewed = this.getViewedSet();
    viewed.add(key);
    this.saveViewedSet(viewed);
  }
  getViewedSet() {
    try {
      const arr = JSON.parse(localStorage.getItem(this.viewedKey) ?? "[]");
      return new Set(arr);
    } catch (e) {
      return /* @__PURE__ */ new Set();
    }
  }
  saveViewedSet(s) {
    const arr = [...s].slice(-2e3);
    localStorage.setItem(this.viewedKey, JSON.stringify(arr));
  }
  toDateStr(year, month, day) {
    const mm = month.toString().padStart(2, "0");
    const dd = day.toString().padStart(2, "0");
    return `${year}-${mm}-${dd}`;
  }
  loadAll() {
    this.loadGrid();
    this.loadSummary();
    this.instrSvc.getForBranch(this.branchId).subscribe({
      next: (vm) => this.instructions = vm,
      error: () => {
      }
    });
  }
  loadGrid() {
    if (!this.branchId)
      return;
    this.loading = true;
    this.loadError = "";
    this.grid = null;
    this.scheduleSvc.getGrid(this.branchId, this.year, this.month).subscribe({
      next: (g) => {
        this.grid = g;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        if (err.status === 0) {
          this.loadError = "Cannot reach the API server. Make sure it is running on port 5100.";
        } else if (err.status === 401) {
          this.loadError = "Session expired \u2014 please log in again.";
        } else {
          this.loadError = `Server error (${err.status}). Check the API console for details.`;
        }
      }
    });
  }
  loadSummary() {
    if (!this.branchId)
      return;
    this.branchSvc.getSummary(this.branchId, this.year, this.month).subscribe({
      next: (s) => this.summary = s,
      error: () => {
      }
    });
  }
  onEscape() {
    if (this.paintMode !== null) {
      this.clearPaintMode();
    } else if (this.detailRow) {
      this.closeDetailPanel();
    } else if (this.instructionEditorOpen) {
      this.instructionEditorOpen = false;
    }
  }
  static {
    this.\u0275fac = function ScheduleComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ScheduleComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ScheduleComponent, selectors: [["app-schedule"]], viewQuery: function ScheduleComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c0, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.instrStrip = _t.first);
      }
    }, hostBindings: function ScheduleComponent_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("keydown.escape", function ScheduleComponent_keydown_escape_HostBindingHandler() {
          return ctx.onEscape();
        }, \u0275\u0275resolveDocument);
      }
    }, decls: 26, vars: 13, consts: [["instrStrip", ""], [1, "branch-header"], [1, "branch-header-left"], ["routerLink", "/", 1, "btn-ghost", "btn-sm"], ["class", "status-pill", 3, "class", 4, "ngIf"], [1, "branch-header-right"], ["routerLink", "/alerts", "title", "Alerts", 1, "btn-icon"], [1, "month-nav"], [1, "btn-icon", 3, "click"], [1, "btn-icon", 3, "click", "disabled"], [3, "branchId", "canEdit", "editRequested", 4, "ngIf"], ["style", "margin-bottom:.75rem;", 4, "ngIf"], ["class", "paint-toolbar", 4, "ngIf"], ["class", "schedule-table-wrap", 4, "ngIf"], ["class", "legend-strip", 4, "ngIf"], ["style", "text-align:center;padding:3rem;color:var(--ink-faint);", 4, "ngIf"], ["style", "text-align:center;padding:3rem;", 4, "ngIf"], [3, "row", "day", "cell", "year", "month", "branchId", "canNote", "statusCodes", "close", "noteSaved", 4, "ngIf"], [3, "vm", "branchName", "saved", "closed", 4, "ngIf"], [1, "status-pill"], [3, "editRequested", "branchId", "canEdit"], [2, "margin-bottom", ".75rem"], [3, "pct"], [1, "paint-toolbar"], [3, "code", "statusCodes", "active", "click", 4, "ngFor", "ngForOf"], [1, "btn-ghost", "btn-sm", 3, "click"], ["style", "font-size:.78rem;color:var(--ink-light);", 4, "ngIf"], ["class", "paint-hint", 4, "ngIf"], [3, "click", "code", "statusCodes"], [2, "font-size", ".78rem", "color", "var(--ink-light)"], [1, "paint-hint"], [1, "schedule-table-wrap"], [1, "schedule-table"], ["class", "cb-col", 4, "ngIf"], [1, "emp-col"], [1, "shift-col"], [3, "weekend", 4, "ngFor", "ngForOf"], [3, "selected-row", 4, "ngFor", "ngForOf"], [1, "cb-col"], [1, "day-hdr"], [1, "day-abbr"], [1, "day-num"], [1, "emp-col", 2, "padding-left", ".5rem", "font-size", ".8rem"], [1, "shift-col", 2, "font-size", ".75rem", "color", "var(--ink-light)"], [3, "weekend", "paint-cursor", "note-pulse", "click", 4, "ngFor", "ngForOf"], ["type", "checkbox", 3, "change", "checked"], [3, "click"], [3, "code", "hasNote", "justPainted", "statusCodes"], [1, "legend-strip"], ["class", "legend-item", 4, "ngFor", "ngForOf"], [1, "legend-item"], [2, "text-align", "center", "padding", "3rem", "color", "var(--ink-faint)"], [2, "text-align", "center", "padding", "3rem"], [2, "color", "#e53e3e", "font-weight", "600", "margin-bottom", ".5rem"], [2, "color", "var(--ink-faint)", "font-size", ".85rem", "margin-bottom", "1rem"], [1, "btn-primary", 3, "click"], [3, "close", "noteSaved", "row", "day", "cell", "year", "month", "branchId", "canNote", "statusCodes"], [3, "saved", "closed", "vm", "branchName"]], template: function ScheduleComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "a", 3);
        \u0275\u0275text(3, "\u2039 Home");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "h2");
        \u0275\u0275text(5);
        \u0275\u0275elementEnd();
        \u0275\u0275template(6, ScheduleComponent_span_6_Template, 2, 3, "span", 4);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "div", 5)(8, "a", 6);
        \u0275\u0275text(9, "\u{1F514}");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "div", 7)(11, "button", 8);
        \u0275\u0275listener("click", function ScheduleComponent_Template_button_click_11_listener() {
          return ctx.prevMonth();
        });
        \u0275\u0275text(12, "\u2039");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "span");
        \u0275\u0275text(14);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(15, "button", 9);
        \u0275\u0275listener("click", function ScheduleComponent_Template_button_click_15_listener() {
          return ctx.nextMonth();
        });
        \u0275\u0275text(16, "\u203A");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275template(17, ScheduleComponent_app_branch_instructions_17_Template, 2, 2, "app-branch-instructions", 10)(18, ScheduleComponent_div_18_Template, 2, 1, "div", 11)(19, ScheduleComponent_div_19_Template, 6, 3, "div", 12)(20, ScheduleComponent_div_20_Template, 12, 3, "div", 13)(21, ScheduleComponent_div_21_Template, 2, 1, "div", 14)(22, ScheduleComponent_div_22_Template, 2, 0, "div", 15)(23, ScheduleComponent_div_23_Template, 7, 1, "div", 16)(24, ScheduleComponent_app_day_detail_panel_24_Template, 1, 8, "app-day-detail-panel", 17)(25, ScheduleComponent_app_branch_instruction_editor_25_Template, 1, 2, "app-branch-instruction-editor", 18);
      }
      if (rf & 2) {
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate((ctx.summary == null ? null : ctx.summary.branchName) || "Loading...");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.summary);
        \u0275\u0275advance(8);
        \u0275\u0275textInterpolate(ctx.monthLabel);
        \u0275\u0275advance();
        \u0275\u0275property("disabled", ctx.isMaxMonth);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.branchId);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.summary && !ctx.summary.isAcquisition);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.canEdit);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.grid);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.legendCodes.length > 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading && ctx.loadError);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.detailRow);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.instructionEditorOpen && ctx.instructions);
      }
    }, dependencies: [
      CommonModule,
      NgForOf,
      NgIf,
      FormsModule,
      RouterModule,
      RouterLink,
      FillBarComponent,
      ShiftChipComponent,
      DayDetailPanelComponent,
      BranchInstructionsComponent,
      BranchInstructionEditorComponent
    ], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ScheduleComponent, [{
    type: Component,
    args: [{
      selector: "app-schedule",
      standalone: true,
      imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        FillBarComponent,
        ShiftChipComponent,
        DayDetailPanelComponent,
        BranchInstructionsComponent,
        BranchInstructionEditorComponent
      ],
      template: `
<!-- Branch header -->
<div class="branch-header">
  <div class="branch-header-left">
    <a routerLink="/" class="btn-ghost btn-sm">\u2039 Home</a>
    <h2>{{summary?.branchName || 'Loading...'}}</h2>
    <span class="status-pill" [class]="summary!.status || ''" *ngIf="summary">
      {{statusLabel}}
    </span>
  </div>
  <div class="branch-header-right">
    <a routerLink="/alerts" class="btn-icon" title="Alerts">\u{1F514}</a>
    <div class="month-nav">
      <button class="btn-icon" (click)="prevMonth()">\u2039</button>
      <span>{{monthLabel}}</span>
      <button class="btn-icon" (click)="nextMonth()" [disabled]="isMaxMonth">\u203A</button>
    </div>
  </div>
</div>

<!-- Instructions chip strip -->
<app-branch-instructions
  #instrStrip
  *ngIf="branchId"
  [branchId]="branchId"
  [canEdit]="canInstructionEdit"
  (editRequested)="openInstructionEditor()">
</app-branch-instructions>

<!-- Fill bar -->
<div style="margin-bottom:.75rem;" *ngIf="summary && !summary.isAcquisition">
  <app-fill-bar [pct]="summary.fillRate"></app-fill-bar>
</div>

<!-- Paint toolbar -->
<div class="paint-toolbar" *ngIf="canEdit">
  <app-shift-chip
    *ngFor="let sc of paintCodes"
    [code]="sc.code"
    [statusCodes]="statusCodes"
    [class.active]="paintMode === sc.code"
    (click)="setPaintMode(sc.code)">
  </app-shift-chip>
  <button class="btn-ghost btn-sm" (click)="clearPaintMode()">Clear</button>
  <span *ngIf="selectedRows.size > 0" style="font-size:.78rem;color:var(--ink-light);">
    {{selectedRows.size}} row(s) selected
  </span>
  <span class="paint-hint" *ngIf="paintMode">
    Click a cell to paint. Esc to cancel.
  </span>
</div>

<!-- Schedule table -->
<div class="schedule-table-wrap" *ngIf="grid">
  <table class="schedule-table">
    <thead>
      <tr>
        <th class="cb-col" *ngIf="canEdit"></th>
        <th class="emp-col">Employee</th>
        <th class="shift-col">Shift</th>
        <th *ngFor="let d of grid.days" [class.weekend]="d.isWeekend">
          <div class="day-hdr">
            <span class="day-abbr">{{d.dayAbbr}}</span>
            <span class="day-num">{{d.day}}</span>
          </div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let row of grid.rows"
          [class.selected-row]="selectedRows.has(row.employeeId)">
        <td class="cb-col" *ngIf="canEdit">
          <input type="checkbox"
                 [checked]="selectedRows.has(row.employeeId)"
                 (change)="toggleRowSelect(row.employeeId)" />
        </td>
        <td class="emp-col" style="padding-left:.5rem;font-size:.8rem;">{{row.name}}</td>
        <td class="shift-col" style="font-size:.75rem;color:var(--ink-light);">{{row.defaultShift}}</td>
        <td *ngFor="let d of grid.days"
            [class.weekend]="d.isWeekend"
            [class.paint-cursor]="paintMode !== null"
            [class.note-pulse]="row.cells[d.day]?.hasNote && !isViewed(row.employeeId, d.day)"
            (click)="handleCellClick(row, d.day, row.cells[d.day])">
          <app-shift-chip
            [code]="row.cells[d.day]?.statusCode ?? '\u2014'"
            [hasNote]="row.cells[d.day]?.hasNote ?? false"
            [justPainted]="justPainted.has(row.employeeId + '-' + d.day)"
            [statusCodes]="statusCodes">
          </app-shift-chip>
        </td>
      </tr>
    </tbody>
  </table>
</div>

<!-- Legend -->
<div class="legend-strip" *ngIf="legendCodes.length > 0">
  <span class="legend-item" *ngFor="let sc of legendCodes">
    <span class="legend-chip {{sc.cssClass}}"></span>
    <span>{{sc.label}}</span>
  </span>
</div>

<!-- Loading -->
<div *ngIf="loading" style="text-align:center;padding:3rem;color:var(--ink-faint);">
  Loading schedule...
</div>

<!-- Load error -->
<div *ngIf="!loading && loadError" style="text-align:center;padding:3rem;">
  <div style="color:#e53e3e;font-weight:600;margin-bottom:.5rem;">Could not load schedule</div>
  <div style="color:var(--ink-faint);font-size:.85rem;margin-bottom:1rem;">{{loadError}}</div>
  <button class="btn-primary" (click)="loadGrid()">Retry</button>
</div>

<!-- Day detail panel -->
<app-day-detail-panel
  *ngIf="detailRow"
  [row]="detailRow"
  [day]="detailDay!"
  [cell]="detailCell"
  [year]="year"
  [month]="month"
  [branchId]="branchId"
  [canNote]="canNote"
  [statusCodes]="statusCodes"
  (close)="closeDetailPanel()"
  (noteSaved)="onNoteSaved()">
</app-day-detail-panel>

<!-- Instruction editor -->
<app-branch-instruction-editor
  *ngIf="instructionEditorOpen && instructions"
  [vm]="instructions"
  [branchName]="summary?.branchName ?? ''"
  (saved)="onInstructionSaved()"
  (closed)="instructionEditorOpen = false">
</app-branch-instruction-editor>
  `
    }]
  }], null, { instrStrip: [{
    type: ViewChild,
    args: ["instrStrip"]
  }], onEscape: [{
    type: HostListener,
    args: ["document:keydown.escape"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ScheduleComponent, { className: "ScheduleComponent", filePath: "src/app/pages/schedule/schedule.component.ts", lineNumber: 173 });
})();
export {
  ScheduleComponent
};
//# sourceMappingURL=chunk-F5EUDFW6.js.map
