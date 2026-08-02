import { flushPromises, mount } from "@vue/test-utils";
import { act, fireEvent, render } from "@testing-library/react";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { defineComponent } from "vue";
import ArcanaWizard from "../src/vue/components/ArcanaWizard.vue";
import ArcanaWizardStep from "../src/vue/components/ArcanaWizardStep.vue";
import {
  ArcanaWizard as RWizard,
  ArcanaWizardStep as RWizardStep,
  type ArcanaWizardProps,
} from "../src/react";

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
