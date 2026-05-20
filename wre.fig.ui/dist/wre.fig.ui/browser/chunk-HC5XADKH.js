import {
  HttpClient,
  Injectable,
  environment,
  inject,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-WCU7WMUY.js";

// src/app/services/audit.service.ts
var AuditService = class _AuditService {
  constructor() {
    this.api = inject(HttpClient);
    this.base = environment.apiUrl;
  }
  getAlerts(branchId) {
    const params = {};
    if (branchId !== void 0)
      params["branchId"] = branchId.toString();
    return this.api.get(`${this.base}/audit/alerts`, { params });
  }
  getHistory(employeeId, date) {
    return this.api.get(`${this.base}/audit/history`, {
      params: { employeeId: employeeId.toString(), date }
    });
  }
  static {
    this.\u0275fac = function AuditService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AuditService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuditService, factory: _AuditService.\u0275fac, providedIn: "root" });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuditService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

export {
  AuditService
};
//# sourceMappingURL=chunk-HC5XADKH.js.map
