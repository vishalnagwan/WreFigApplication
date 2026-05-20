import {
  HttpClient,
  Injectable,
  environment,
  inject,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-WCU7WMUY.js";

// src/app/services/branch.service.ts
var BranchService = class _BranchService {
  constructor() {
    this.api = inject(HttpClient);
    this.base = environment.apiUrl;
  }
  getSummaries(year, month) {
    return this.api.get(`${this.base}/branches/summaries`, {
      params: { year: year.toString(), month: month.toString() }
    });
  }
  getSummary(id, year, month) {
    return this.api.get(`${this.base}/branches/${id}/summary`, {
      params: { year: year.toString(), month: month.toString() }
    });
  }
  getBranchList() {
    return this.api.get(`${this.base}/branches/list`);
  }
  getCompliance(year, month) {
    return this.api.get(`${this.base}/branches/compliance`, {
      params: { year: year.toString(), month: month.toString() }
    });
  }
  static {
    this.\u0275fac = function BranchService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BranchService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _BranchService, factory: _BranchService.\u0275fac, providedIn: "root" });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BranchService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

export {
  BranchService
};
//# sourceMappingURL=chunk-PSV4OC7Q.js.map
