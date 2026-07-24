import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import {
  ArcanaButton,
  ArcanaBadge,
  ArcanaInput,
  ArcanaTabs,
  ArcanaSwitch
} from "../src/vue";

// Smoke test: monta uma amostra variada de componentes da lib Vue e garante que
// renderizam sem lançar erro. Não valida comportamento — só que o barrel export
// e o build de SFC estão saudáveis.
describe("@arcanalabs/ui-components — Vue smoke", () => {
  it("ArcanaButton renderiza com um slot de label", () => {
    const wrapper = mount(ArcanaButton, {
      props: { variant: "primary" },
      slots: { default: "Salvar" }
    });
    expect(wrapper.text()).toContain("Salvar");
    expect(wrapper.find("button").exists()).toBe(true);
  });

  it("ArcanaBadge renderiza com variant e slot", () => {
    const wrapper = mount(ArcanaBadge, {
      props: { variant: "green" },
      slots: { default: "Ativo" }
    });
    expect(wrapper.text()).toContain("Ativo");
    expect(wrapper.classes().join(" ")).toContain("arcana-badge");
  });

  it("ArcanaInput renderiza um input com v-model", () => {
    const wrapper = mount(ArcanaInput, {
      props: { modelValue: "olá" }
    });
    const input = wrapper.find("input");
    expect(input.exists()).toBe(true);
    expect((input.element as HTMLInputElement).value).toBe("olá");
  });

  it("ArcanaTabs renderiza os triggers das abas", () => {
    const wrapper = mount(ArcanaTabs, {
      props: {
        modelValue: "a",
        tabs: [
          { name: "a", label: "Aba A" },
          { name: "b", label: "Aba B" }
        ]
      },
      slots: { a: "<div>Painel A</div>", b: "<div>Painel B</div>" }
    });
    expect(wrapper.text()).toContain("Aba A");
    expect(wrapper.text()).toContain("Aba B");
  });

  it("ArcanaSwitch renderiza e emite update ao alternar", async () => {
    const wrapper = mount(ArcanaSwitch, {
      props: { modelValue: false }
    });
    await wrapper.find("button, [role='switch']").trigger("click");
    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
  });
});
