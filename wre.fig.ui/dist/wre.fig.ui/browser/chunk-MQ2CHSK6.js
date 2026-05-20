import {
  CommonModule,
  Component,
  DecimalPipe,
  Input,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵdefineComponent,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-WCU7WMUY.js";

// src/app/shared/fill-bar/fill-bar.component.ts
var FillBarComponent = class _FillBarComponent {
  constructor() {
    this.pct = 0;
  }
  get clampedPct() {
    return Math.min(100, Math.max(0, this.pct));
  }
  get barClass() {
    if (this.clampedPct >= 85)
      return "green";
    if (this.clampedPct >= 60)
      return "amber";
    return "red";
  }
  static {
    this.\u0275fac = function FillBarComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _FillBarComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FillBarComponent, selectors: [["app-fill-bar"]], inputs: { pct: "pct" }, decls: 5, vars: 8, consts: [[1, "fill-bar-track"], [1, "fill-bar-fill"], [1, "fill-bar-label"]], template: function FillBarComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275domElementStart(0, "div", 0);
        \u0275\u0275domElement(1, "div", 1);
        \u0275\u0275domElementEnd();
        \u0275\u0275domElementStart(2, "span", 2);
        \u0275\u0275text(3);
        \u0275\u0275pipe(4, "number");
        \u0275\u0275domElementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275classMap(ctx.barClass);
        \u0275\u0275styleProp("width", ctx.clampedPct, "%");
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(4, 5, ctx.clampedPct, "1.0-0"), "%");
      }
    }, dependencies: [CommonModule, DecimalPipe], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FillBarComponent, [{
    type: Component,
    args: [{
      selector: "app-fill-bar",
      standalone: true,
      imports: [CommonModule],
      template: `
<div class="fill-bar-track">
  <div class="fill-bar-fill" [class]="barClass" [style.width.%]="clampedPct"></div>
</div>
<span class="fill-bar-label">{{clampedPct | number:'1.0-0'}}%</span>
  `
    }]
  }], null, { pct: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FillBarComponent, { className: "FillBarComponent", filePath: "src/app/shared/fill-bar/fill-bar.component.ts", lineNumber: 15 });
})();

export {
  FillBarComponent
};
//# sourceMappingURL=chunk-MQ2CHSK6.js.map
