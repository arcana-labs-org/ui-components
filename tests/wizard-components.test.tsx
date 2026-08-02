import "@angular/compiler";
import { Component, provideZonelessChangeDetection } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { BrowserTestingModule, platformBrowserTesting } from "@angular/platform-browser/testing";
import { flushPromises, mount } from "@vue/test-utils";
import { act, fireEvent, render } from "@testing-library/react";
import { useState } from "react";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { defineComponent } from "vue";
import ArcanaWizard from "../src/vue/components/ArcanaWizard.vue";
import ArcanaWizardStep from "../src/vue/components/ArcanaWizardStep.vue";
import {
  ArcanaWizard as RWizard,
  ArcanaWizardStep as RWizardStep,
  type ArcanaWizardProps,
} from "../src/react";
import { ArcanaWizardComponent, ArcanaWizardStepComponent } from "../src/angular";

beforeAll(() => {
  TestBed.initTestEnvironment(BrowserTestingModule, platformBrowserTesting());
});

const Harness = defineComponent({
  components: { ArcanaWizard, ArcanaWizardStep },
  props: {
    linear: { type: Boolean, default: true },
    validate: { type: Function, default: undefined },
  },
  emits: ["finished"],
  data: () => ({ step: 0 }),
  template: `
    <ArcanaWizard v-model="step" :linear="linear" :validate="validate"
      @finish="$emit('finished')">
      <ArcanaWizardStep title="Type" description="A"><div class="c0">zero</div></ArcanaWizardStep>
      <ArcanaWizardStep title="Doc"><div class="c1">one</div></ArcanaWizardStep>
      <ArcanaWizardStep title="Confirm"><div class="c2">two</div></ArcanaWizardStep>
    </ArcanaWizard>`,
});

describe("ArcanaWizard (Vue)", () => {
  it("renders stepper titles and only the active step body", async () => {
    const w = mount(Harness);
    await flushPromises();
    expect(w.findAll(".arcana-wizard__title").map((n) => n.text())).toEqual(["Type", "Doc", "Confirm"]);
    expect(w.find(".c0").exists()).toBe(true);
    expect(w.find(".c1").exists()).toBe(false);
    // step 0 completed marker absent; active class present
    expect(w.findAll(".arcana-wizard__step")[0].classes()).toContain("is-active");
    expect(w.findAll(".arcana-wizard__step")[2].classes()).toContain("is-pending");
  });

  it("advances on Continue and marks completed", async () => {
    const w = mount(Harness);
    await flushPromises();
    await w.find(".arcana-wizard__footer-actions button:last-child").trigger("click");
    expect((w.vm as any).step).toBe(1);
    expect(w.find(".c1").exists()).toBe(true);
    expect(w.findAll(".arcana-wizard__step")[0].classes()).toContain("is-completed");
  });

  it("validate returning false blocks advance", async () => {
    const w = mount(Harness, { props: { validate: () => false } });
    await flushPromises();
    await w.find(".arcana-wizard__footer-actions button:last-child").trigger("click");
    expect((w.vm as any).step).toBe(0);
  });

  it("last step shows Finish and emits finish", async () => {
    const w = mount(Harness);
    await flushPromises();
    (w.vm as any).step = 2;
    await w.vm.$nextTick();
    expect(w.find(".arcana-wizard__footer-actions button:last-child").text()).toBe("Finish");
    await w.find(".arcana-wizard__footer-actions button:last-child").trigger("click");
    expect(w.emitted("finished")).toBeTruthy();
  });
});

type RHarnessProps = Pick<ArcanaWizardProps, "validate" | "linear" | "onFinish"> & {
  initialStep?: number;
};

const RHarness = ({ validate, linear, onFinish, initialStep = 0 }: RHarnessProps) => {
  const [step, setStep] = useState(initialStep);
  return (
    <RWizard value={step} onValueChange={setStep} linear={linear} validate={validate} onFinish={onFinish}>
      <RWizardStep title="Type" description="A">
        <div className="c0">zero</div>
      </RWizardStep>
      <RWizardStep title="Doc">
        <div className="c1">one</div>
      </RWizardStep>
      <RWizardStep title="Confirm">
        <div className="c2">two</div>
      </RWizardStep>
    </RWizard>
  );
};

describe("ArcanaWizard (React)", () => {
  it("renders stepper titles and only the active step body", () => {
    const { container } = render(<RHarness />);
    expect([...container.querySelectorAll(".arcana-wizard__title")].map((n) => n.textContent)).toEqual([
      "Type",
      "Doc",
      "Confirm",
    ]);
    expect(container.querySelector(".c0")).toBeTruthy();
    expect(container.querySelector(".c1")).toBeFalsy();
    const steps = container.querySelectorAll(".arcana-wizard__step");
    expect(steps[0].classList.contains("is-active")).toBe(true);
    expect(steps[2].classList.contains("is-pending")).toBe(true);
  });

  it("advances on Continue and marks completed", async () => {
    const { container } = render(<RHarness />);
    const nextBtn = container.querySelector(
      ".arcana-wizard__footer-actions button:last-child",
    ) as HTMLButtonElement;
    await act(async () => {
      fireEvent.click(nextBtn);
    });
    expect(container.querySelector(".c1")).toBeTruthy();
    expect(container.querySelector(".c0")).toBeFalsy();
    const steps = container.querySelectorAll(".arcana-wizard__step");
    expect(steps[0].classList.contains("is-completed")).toBe(true);
  });

  it("validate returning false blocks advance", async () => {
    const { container } = render(<RHarness validate={() => false} />);
    const nextBtn = container.querySelector(
      ".arcana-wizard__footer-actions button:last-child",
    ) as HTMLButtonElement;
    await act(async () => {
      fireEvent.click(nextBtn);
    });
    expect(container.querySelector(".c0")).toBeTruthy();
    expect(container.querySelector(".c1")).toBeFalsy();
  });

  it("last step shows Finish and emits onFinish", async () => {
    const onFinish = vi.fn();
    const { container } = render(<RHarness initialStep={2} onFinish={onFinish} />);
    const finishBtn = container.querySelector(
      ".arcana-wizard__footer-actions button:last-child",
    ) as HTMLButtonElement;
    expect(finishBtn.textContent).toBe("Finish");
    await act(async () => {
      fireEvent.click(finishBtn);
    });
    expect(onFinish).toHaveBeenCalledTimes(1);
  });
});

type AHarnessValidate = (step: number) => boolean | string | Promise<boolean | string>;

@Component({
  standalone: true,
  imports: [ArcanaWizardComponent, ArcanaWizardStepComponent],
  template: `
    <div
      arcanaWizard
      [value]="step"
      (valueChange)="step = $event"
      [validate]="validate"
      (finish)="finished = true"
    >
      <div arcanaWizardStep title="Type" description="A"><div class="c0">zero</div></div>
      <div arcanaWizardStep title="Doc"><div class="c1">one</div></div>
      <div arcanaWizardStep title="Confirm"><div class="c2">two</div></div>
    </div>
  `,
})
class AHarness {
  step = 0;
  validate?: AHarnessValidate;
  finished = false;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createAngularWizard(overrides: Partial<AHarness> = {}): any {
  TestBed.configureTestingModule({
    imports: [AHarness],
    providers: [provideZonelessChangeDetection()],
  });
  const fx = TestBed.createComponent(AHarness);
  Object.assign(fx.componentInstance, overrides);
  // First pass renders the wizard shell before its steps (projected content) run their
  // own `ngOnInit` and register with the parent (mirrors the Vue `mounted` timing note on
  // `ArcanaWizardComponent`); a 2nd pass is needed to see the registered steps reflected —
  // `register()`/`unregister()` call `markForCheck()`, but zoneless CD doesn't auto re-check
  // an already-visited ancestor within the same `detectChanges()` pass.
  fx.detectChanges();
  fx.detectChanges();
  return fx;
}

describe("ArcanaWizard (Angular)", () => {
  it("renders stepper titles and only the active step body", () => {
    const fx = createAngularWizard();
    const root: HTMLElement = fx.nativeElement;
    expect([...root.querySelectorAll(".arcana-wizard__title")].map((n) => n.textContent)).toEqual([
      "Type",
      "Doc",
      "Confirm",
    ]);
    expect(root.querySelector(".c0")).toBeTruthy();
    expect(root.querySelector(".c1")).toBeFalsy();
    const steps = root.querySelectorAll(".arcana-wizard__step");
    expect(steps[0].classList.contains("is-active")).toBe(true);
    expect(steps[2].classList.contains("is-pending")).toBe(true);
  });

  it("advances on Continue and marks completed", async () => {
    const fx = createAngularWizard();
    const root: HTMLElement = fx.nativeElement;
    const nextBtn = root.querySelector(".arcana-wizard__footer-actions button:last-child") as HTMLButtonElement;
    nextBtn.click();
    fx.detectChanges();
    expect(fx.componentInstance.step).toBe(1);
    expect(root.querySelector(".c1")).toBeTruthy();
    expect(root.querySelector(".c0")).toBeFalsy();
    const steps = root.querySelectorAll(".arcana-wizard__step");
    expect(steps[0].classList.contains("is-completed")).toBe(true);
  });

  it("validate returning false blocks advance", async () => {
    const fx = createAngularWizard({ validate: () => false });
    const root: HTMLElement = fx.nativeElement;
    const nextBtn = root.querySelector(".arcana-wizard__footer-actions button:last-child") as HTMLButtonElement;
    nextBtn.click();
    // `goNext()` awaits `validate(...)` — flush the microtask queue via a macrotask boundary
    // before asserting (zoneless CD needs an explicit `detectChanges()` afterwards too).
    await new Promise((resolve) => setTimeout(resolve, 0));
    fx.detectChanges();
    expect(fx.componentInstance.step).toBe(0);
  });

  it("last step shows Finish and emits finish", () => {
    const fx = createAngularWizard({ step: 2 });
    const root: HTMLElement = fx.nativeElement;
    const finishBtn = root.querySelector(".arcana-wizard__footer-actions button:last-child") as HTMLButtonElement;
    expect(finishBtn.textContent).toBe("Finish");
    finishBtn.click();
    fx.detectChanges();
    expect(fx.componentInstance.finished).toBe(true);
  });
});
