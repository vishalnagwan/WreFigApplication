import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-324XMCRJ.js";
import {
  BranchService
} from "./chunk-PSV4OC7Q.js";
import {
  CommonModule,
  Component,
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
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-WCU7WMUY.js";

// src/app/services/user.service.ts
var UserService = class _UserService {
  constructor() {
    this.api = inject(HttpClient);
    this.base = environment.apiUrl;
  }
  getUsers() {
    return this.api.get(`${this.base}/users`);
  }
  createUser(dto) {
    return this.api.post(`${this.base}/users`, dto);
  }
  updateUser(id, dto) {
    return this.api.put(`${this.base}/users/${id}`, dto);
  }
  deactivateUser(id) {
    return this.api.post(`${this.base}/users/${id}/deactivate`, {});
  }
  static {
    this.\u0275fac = function UserService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _UserService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _UserService, factory: _UserService.\u0275fac, providedIn: "root" });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UserService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/pages/users/users.component.ts
function UsersComponent_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275text(1, "Loading...");
    \u0275\u0275elementEnd();
  }
}
function UsersComponent_table_6_tr_18_span_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const n_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(n_r2);
  }
}
function UsersComponent_table_6_tr_18_button_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 16);
    \u0275\u0275listener("click", function UsersComponent_table_6_tr_18_button_18_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const u_r3 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.deactivate(u_r3));
    });
    \u0275\u0275text(1, "Deactivate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275property("disabled", ctx_r3.saving);
  }
}
function UsersComponent_table_6_tr_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td")(8, "div", 9);
    \u0275\u0275template(9, UsersComponent_table_6_tr_18_span_9_Template, 2, 1, "span", 10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "td", 11);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td")(13, "span", 12);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "td")(16, "button", 13);
    \u0275\u0275listener("click", function UsersComponent_table_6_tr_18_Template_button_click_16_listener() {
      const u_r3 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.openEdit(u_r3));
    });
    \u0275\u0275text(17, "Edit");
    \u0275\u0275elementEnd();
    \u0275\u0275template(18, UsersComponent_table_6_tr_18_button_18_Template, 2, 1, "button", 14);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const u_r3 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(u_r3.fullName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(u_r3.email);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(u_r3.role);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", u_r3.branchNames);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", u_r3.resourceTypeNames.join(", ") || "\u2014", " ");
    \u0275\u0275advance(2);
    \u0275\u0275classMap(u_r3.isActive ? "green" : "red");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", u_r3.isActive ? "Active" : "Inactive", " ");
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", u_r3.isActive);
  }
}
function UsersComponent_table_6_tr_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 17);
    \u0275\u0275text(2, "No users found.");
    \u0275\u0275elementEnd()();
  }
}
function UsersComponent_table_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 6)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "Name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "Email");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "Role");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "Branches");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th");
    \u0275\u0275text(12, "Resource Types");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th");
    \u0275\u0275text(14, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "th");
    \u0275\u0275text(16, "Actions");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "tbody");
    \u0275\u0275template(18, UsersComponent_table_6_tr_18_Template, 19, 9, "tr", 7)(19, UsersComponent_table_6_tr_19_Template, 3, 0, "tr", 8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(18);
    \u0275\u0275property("ngForOf", ctx_r3.users);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r3.users.length === 0);
  }
}
function UsersComponent_div_7_option_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 37);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const r_r7 = ctx.$implicit;
    \u0275\u0275property("value", r_r7);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(r_r7);
  }
}
function UsersComponent_div_7_div_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 23)(1, "label")(2, "input", 38);
    \u0275\u0275twoWayListener("ngModelChange", function UsersComponent_div_7_div_26_Template_input_ngModelChange_2_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r3 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r3.form.isActive, $event) || (ctx_r3.form.isActive = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Active ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.form.isActive);
  }
}
function UsersComponent_div_7_label_31_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 39)(1, "input", 40);
    \u0275\u0275listener("change", function UsersComponent_div_7_label_31_Template_input_change_1_listener($event) {
      const b_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.toggleBranch(b_r10.id, $event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const b_r10 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("checked", ctx_r3.form.branchIds.includes(b_r10.id));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", b_r10.name, " ");
  }
}
function UsersComponent_div_7_label_36_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 39)(1, "input", 40);
    \u0275\u0275listener("change", function UsersComponent_div_7_label_36_Template_input_change_1_listener($event) {
      const rt_r12 = \u0275\u0275restoreView(_r11).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.toggleResourceType(rt_r12, $event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const rt_r12 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("checked", ctx_r3.form.resourceTypeNames.includes(rt_r12));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", rt_r12, " ");
  }
}
function UsersComponent_div_7_p_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 41);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r3.modalError);
  }
}
function UsersComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275listener("click", function UsersComponent_div_7_Template_div_click_0_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.onOverlayClick($event));
    });
    \u0275\u0275elementStart(1, "div", 19);
    \u0275\u0275listener("click", function UsersComponent_div_7_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 20);
    \u0275\u0275text(3);
    \u0275\u0275elementStart(4, "button", 21);
    \u0275\u0275listener("click", function UsersComponent_div_7_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.closeModal());
    });
    \u0275\u0275text(5, "\u2715");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 22)(7, "div", 23)(8, "label");
    \u0275\u0275text(9, "Full Name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "input", 24);
    \u0275\u0275twoWayListener("ngModelChange", function UsersComponent_div_7_Template_input_ngModelChange_10_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.form.fullName, $event) || (ctx_r3.form.fullName = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 23)(12, "label");
    \u0275\u0275text(13, "Email");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "input", 25);
    \u0275\u0275twoWayListener("ngModelChange", function UsersComponent_div_7_Template_input_ngModelChange_14_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.form.email, $event) || (ctx_r3.form.email = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 23)(16, "label");
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "input", 26);
    \u0275\u0275twoWayListener("ngModelChange", function UsersComponent_div_7_Template_input_ngModelChange_18_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.form.password, $event) || (ctx_r3.form.password = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 23)(20, "label");
    \u0275\u0275text(21, "Role");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "select", 27);
    \u0275\u0275twoWayListener("ngModelChange", function UsersComponent_div_7_Template_select_ngModelChange_22_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.form.role, $event) || (ctx_r3.form.role = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(23, "option", 28);
    \u0275\u0275text(24, "Select role...");
    \u0275\u0275elementEnd();
    \u0275\u0275template(25, UsersComponent_div_7_option_25_Template, 2, 2, "option", 29);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(26, UsersComponent_div_7_div_26_Template, 4, 1, "div", 30);
    \u0275\u0275elementStart(27, "div", 23)(28, "label");
    \u0275\u0275text(29, "Branches");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "div", 31);
    \u0275\u0275template(31, UsersComponent_div_7_label_31_Template, 3, 2, "label", 32);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "div", 23)(33, "label");
    \u0275\u0275text(34, "Resource Types");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "div", 31);
    \u0275\u0275template(36, UsersComponent_div_7_label_36_Template, 3, 2, "label", 32);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(37, UsersComponent_div_7_p_37_Template, 2, 1, "p", 33);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "div", 34)(39, "button", 35);
    \u0275\u0275listener("click", function UsersComponent_div_7_Template_button_click_39_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.closeModal());
    });
    \u0275\u0275text(40, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "button", 36);
    \u0275\u0275listener("click", function UsersComponent_div_7_Template_button_click_41_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.saveModal());
    });
    \u0275\u0275text(42);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r3.modalMode === "create" ? "Create User" : "Edit User", " ");
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.form.fullName);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.form.email);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Password ", ctx_r3.modalMode === "edit" ? "(leave blank to keep current)" : "");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.form.password);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.form.role);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r3.allRoles);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r3.modalMode === "edit");
    \u0275\u0275advance(5);
    \u0275\u0275property("ngForOf", ctx_r3.branches);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngForOf", ctx_r3.allResourceTypes);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r3.modalError);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r3.saving);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r3.saving);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r3.saving ? "Saving..." : "Save", " ");
  }
}
var ALL_ROLES = [
  "PlannerDashboard",
  "FieldSupervisor",
  "DispatchSupervisor",
  "Planner",
  "Dispatcher",
  "ReadOnly"
];
var RESOURCE_TYPES = [
  "Bulk Hauling",
  "CCTV",
  "Drain Cleaning",
  "Inside Grease (IG)",
  "Install",
  "Lift Station",
  "Mechanic",
  "Plumbing",
  "Projects",
  "Pumping",
  "Repair",
  "Roll Off",
  "Trailer",
  "Vactor"
];
var UsersComponent = class _UsersComponent {
  constructor() {
    this.userSvc = inject(UserService);
    this.branchSvc = inject(BranchService);
    this.users = [];
    this.branches = [];
    this.loading = true;
    this.saving = false;
    this.showModal = false;
    this.modalMode = "create";
    this.selectedUser = null;
    this.modalError = "";
    this.allRoles = ALL_ROLES;
    this.allResourceTypes = RESOURCE_TYPES;
    this.form = {
      fullName: "",
      email: "",
      password: "",
      role: "",
      branchIds: [],
      resourceTypeNames: [],
      isActive: true
    };
  }
  ngOnInit() {
    this.loadUsers();
    this.branchSvc.getBranchList().subscribe({
      next: (b) => this.branches = b,
      error: () => {
      }
    });
  }
  openCreate() {
    this.modalMode = "create";
    this.selectedUser = null;
    this.form = { fullName: "", email: "", password: "", role: "", branchIds: [], resourceTypeNames: [], isActive: true };
    this.modalError = "";
    this.showModal = true;
  }
  openEdit(u) {
    this.modalMode = "edit";
    this.selectedUser = u;
    this.form = {
      fullName: u.fullName,
      email: u.email,
      password: "",
      role: u.role,
      branchIds: [...u.branchIds],
      resourceTypeNames: [...u.resourceTypeNames],
      isActive: u.isActive
    };
    this.modalError = "";
    this.showModal = true;
  }
  closeModal() {
    this.showModal = false;
  }
  toggleBranch(id, event) {
    const checked = event.target.checked;
    if (checked) {
      if (!this.form.branchIds.includes(id))
        this.form.branchIds.push(id);
    } else {
      this.form.branchIds = this.form.branchIds.filter((b) => b !== id);
    }
  }
  toggleResourceType(rt, event) {
    const checked = event.target.checked;
    if (checked) {
      if (!this.form.resourceTypeNames.includes(rt))
        this.form.resourceTypeNames.push(rt);
    } else {
      this.form.resourceTypeNames = this.form.resourceTypeNames.filter((r) => r !== rt);
    }
  }
  saveModal() {
    if (!this.form.fullName || !this.form.email || !this.form.role) {
      this.modalError = "Full name, email, and role are required.";
      return;
    }
    this.saving = true;
    this.modalError = "";
    if (this.modalMode === "create") {
      if (!this.form.password) {
        this.modalError = "Password is required for new users.";
        this.saving = false;
        return;
      }
      const dto = {
        fullName: this.form.fullName,
        email: this.form.email,
        password: this.form.password,
        role: this.form.role,
        branchIds: this.form.branchIds,
        resourceTypeNames: this.form.resourceTypeNames
      };
      this.userSvc.createUser(dto).subscribe({
        next: () => {
          this.saving = false;
          this.showModal = false;
          this.loadUsers();
        },
        error: () => {
          this.saving = false;
          this.modalError = "Save failed. Please try again.";
        }
      });
    } else {
      const dto = {
        fullName: this.form.fullName,
        email: this.form.email,
        password: this.form.password || null,
        role: this.form.role,
        branchIds: this.form.branchIds,
        resourceTypeNames: this.form.resourceTypeNames,
        isActive: this.form.isActive
      };
      this.userSvc.updateUser(this.selectedUser.id, dto).subscribe({
        next: () => {
          this.saving = false;
          this.showModal = false;
          this.loadUsers();
        },
        error: () => {
          this.saving = false;
          this.modalError = "Save failed. Please try again.";
        }
      });
    }
  }
  deactivate(u) {
    if (!confirm(`Deactivate ${u.fullName}?`))
      return;
    this.saving = true;
    this.userSvc.deactivateUser(u.id).subscribe({
      next: () => {
        this.saving = false;
        this.loadUsers();
      },
      error: () => {
        this.saving = false;
      }
    });
  }
  onOverlayClick(event) {
    if (event.target.classList.contains("modal-overlay")) {
      this.closeModal();
    }
  }
  loadUsers() {
    this.loading = true;
    this.userSvc.getUsers().subscribe({
      next: (u) => {
        this.users = u;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
  static {
    this.\u0275fac = function UsersComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _UsersComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UsersComponent, selectors: [["app-users"]], decls: 8, vars: 3, consts: [[1, "page-header"], [1, "btn-primary", 2, "margin-left", "auto", 3, "click"], ["style", "text-align:center;padding:3rem;color:var(--ink-faint);", 4, "ngIf"], ["class", "users-table", 4, "ngIf"], ["class", "modal-overlay", 3, "click", 4, "ngIf"], [2, "text-align", "center", "padding", "3rem", "color", "var(--ink-faint)"], [1, "users-table"], [4, "ngFor", "ngForOf"], [4, "ngIf"], [1, "branch-tags"], ["class", "branch-tag", 4, "ngFor", "ngForOf"], [2, "font-size", ".75rem", "color", "var(--ink-light)"], [1, "status-pill"], [1, "btn-ghost", "btn-sm", 2, "margin-right", ".4rem", 3, "click"], ["class", "btn-danger btn-sm", 3, "disabled", "click", 4, "ngIf"], [1, "branch-tag"], [1, "btn-danger", "btn-sm", 3, "click", "disabled"], ["colspan", "7", 2, "text-align", "center", "color", "var(--ink-faint)", "padding", "2rem"], [1, "modal-overlay", 3, "click"], [1, "modal-card", 3, "click"], [1, "modal-header"], [1, "btn-icon", 3, "click"], [1, "modal-body"], [1, "field"], ["type", "text", "placeholder", "Full name", 3, "ngModelChange", "ngModel"], ["type", "email", "placeholder", "Email address", 3, "ngModelChange", "ngModel"], ["type", "password", "placeholder", "Password", 3, "ngModelChange", "ngModel"], [3, "ngModelChange", "ngModel"], ["value", ""], [3, "value", 4, "ngFor", "ngForOf"], ["class", "field", 4, "ngIf"], [1, "checkbox-grid"], ["class", "checkbox-item", 4, "ngFor", "ngForOf"], ["style", "color:#dc2626;font-size:.82rem;", 4, "ngIf"], [1, "modal-footer"], [1, "btn-ghost", 3, "click", "disabled"], [1, "btn-primary", 3, "click", "disabled"], [3, "value"], ["type", "checkbox", 3, "ngModelChange", "ngModel"], [1, "checkbox-item"], ["type", "checkbox", 3, "change", "checked"], [2, "color", "#dc2626", "font-size", ".82rem"]], template: function UsersComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "h1");
        \u0275\u0275text(2, "User Management");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(3, "button", 1);
        \u0275\u0275listener("click", function UsersComponent_Template_button_click_3_listener() {
          return ctx.openCreate();
        });
        \u0275\u0275text(4, "+ New User");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(5, UsersComponent_div_5_Template, 2, 0, "div", 2)(6, UsersComponent_table_6_Template, 20, 2, "table", 3)(7, UsersComponent_div_7_Template, 43, 14, "div", 4);
      }
      if (rf & 2) {
        \u0275\u0275advance(5);
        \u0275\u0275property("ngIf", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showModal);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UsersComponent, [{
    type: Component,
    args: [{
      selector: "app-users",
      standalone: true,
      imports: [CommonModule, FormsModule],
      template: `
<div class="page-header">
  <h1>User Management</h1>
  <button class="btn-primary" (click)="openCreate()" style="margin-left:auto;">+ New User</button>
</div>

<div *ngIf="loading" style="text-align:center;padding:3rem;color:var(--ink-faint);">Loading...</div>

<table class="users-table" *ngIf="!loading">
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Role</th>
      <th>Branches</th>
      <th>Resource Types</th>
      <th>Status</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let u of users">
      <td>{{u.fullName}}</td>
      <td>{{u.email}}</td>
      <td>{{u.role}}</td>
      <td>
        <div class="branch-tags">
          <span class="branch-tag" *ngFor="let n of u.branchNames">{{n}}</span>
        </div>
      </td>
      <td style="font-size:.75rem;color:var(--ink-light);">
        {{u.resourceTypeNames.join(', ') || '\u2014'}}
      </td>
      <td>
        <span class="status-pill" [class]="u.isActive ? 'green' : 'red'">
          {{u.isActive ? 'Active' : 'Inactive'}}
        </span>
      </td>
      <td>
        <button class="btn-ghost btn-sm" (click)="openEdit(u)" style="margin-right:.4rem;">Edit</button>
        <button class="btn-danger btn-sm" (click)="deactivate(u)"
                *ngIf="u.isActive" [disabled]="saving">Deactivate</button>
      </td>
    </tr>
    <tr *ngIf="users.length === 0">
      <td colspan="7" style="text-align:center;color:var(--ink-faint);padding:2rem;">No users found.</td>
    </tr>
  </tbody>
</table>

<!-- Modal -->
<div class="modal-overlay" *ngIf="showModal" (click)="onOverlayClick($event)">
  <div class="modal-card" (click)="$event.stopPropagation()">
    <div class="modal-header">
      {{modalMode === 'create' ? 'Create User' : 'Edit User'}}
      <button class="btn-icon" (click)="closeModal()">\u2715</button>
    </div>
    <div class="modal-body">
      <div class="field">
        <label>Full Name</label>
        <input type="text" [(ngModel)]="form.fullName" placeholder="Full name" />
      </div>
      <div class="field">
        <label>Email</label>
        <input type="email" [(ngModel)]="form.email" placeholder="Email address" />
      </div>
      <div class="field">
        <label>Password {{modalMode === 'edit' ? '(leave blank to keep current)' : ''}}</label>
        <input type="password" [(ngModel)]="form.password" placeholder="Password" />
      </div>
      <div class="field">
        <label>Role</label>
        <select [(ngModel)]="form.role">
          <option value="">Select role...</option>
          <option *ngFor="let r of allRoles" [value]="r">{{r}}</option>
        </select>
      </div>
      <div class="field" *ngIf="modalMode === 'edit'">
        <label>
          <input type="checkbox" [(ngModel)]="form.isActive" />
          Active
        </label>
      </div>
      <div class="field">
        <label>Branches</label>
        <div class="checkbox-grid">
          <label class="checkbox-item" *ngFor="let b of branches">
            <input type="checkbox"
                   [checked]="form.branchIds.includes(b.id)"
                   (change)="toggleBranch(b.id, $event)" />
            {{b.name}}
          </label>
        </div>
      </div>
      <div class="field">
        <label>Resource Types</label>
        <div class="checkbox-grid">
          <label class="checkbox-item" *ngFor="let rt of allResourceTypes">
            <input type="checkbox"
                   [checked]="form.resourceTypeNames.includes(rt)"
                   (change)="toggleResourceType(rt, $event)" />
            {{rt}}
          </label>
        </div>
      </div>
      <p *ngIf="modalError" style="color:#dc2626;font-size:.82rem;">{{modalError}}</p>
    </div>
    <div class="modal-footer">
      <button class="btn-ghost" (click)="closeModal()" [disabled]="saving">Cancel</button>
      <button class="btn-primary" (click)="saveModal()" [disabled]="saving">
        {{saving ? 'Saving...' : 'Save'}}
      </button>
    </div>
  </div>
</div>
  `
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UsersComponent, { className: "UsersComponent", filePath: "src/app/pages/users/users.component.ts", lineNumber: 143 });
})();
export {
  UsersComponent
};
//# sourceMappingURL=chunk-UPXS7GL6.js.map
