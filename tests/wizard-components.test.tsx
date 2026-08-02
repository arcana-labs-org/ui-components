import { flushPromises, mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { defineComponent } from "vue";
import ArcanaWizard from "../src/vue/components/ArcanaWizard.vue";
import ArcanaWizardStep from "../src/vue/components/ArcanaWizardStep.vue";

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
