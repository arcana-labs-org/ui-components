import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import {
  ArcanaButton,
  ArcanaBadge,
  ArcanaInput,
  ArcanaTabs,
  ArcanaSwitch,
  ArcanaSwitchSegmented,
  ArcanaSegmentedControl
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

  it("ArcanaSegmentedControl: opção sem label é só-ícone e o ariaLabel nomeia o botão", () => {
    const wrapper = mount(ArcanaSegmentedControl, {
      props: {
        modelValue: "list",
        options: [
          { label: "", value: "list", icon: "fa-solid fa-list", ariaLabel: "Lista" },
          { label: "Grade", value: "grid", icon: "fa-solid fa-table-cells-large" }
        ]
      }
    });
    const options = wrapper.findAll("button.arcana-segmented-control__option");
    expect(options).toHaveLength(2);

    // Sem label → nenhum <span> de texto (nem vazio) e classe modificadora de só-ícone.
    const iconOnly = options[0];
    expect(iconOnly.classes()).toContain("arcana-segmented-control__option--icon-only");
    expect(iconOnly.findAll("span")).toHaveLength(0);
    expect(iconOnly.text()).toBe("");
    // O ícone é aria-hidden → quem dá nome ao botão é o `ariaLabel` da opção.
    expect(iconOnly.find(".arcana-segmented-control__icon").attributes("aria-hidden")).toBe("true");
    expect(iconOnly.attributes("aria-label")).toBe("Lista");
    expect(iconOnly.attributes("title")).toBe("Lista");

    // Com label: span preservado, nome vem do label e sem tooltip nativa.
    const labelled = options[1];
    expect(labelled.classes()).not.toContain("arcana-segmented-control__option--icon-only");
    expect(labelled.find("span").text()).toBe("Grade");
    expect(labelled.attributes("aria-label")).toBe("Grade");
    expect(labelled.attributes("title")).toBeUndefined();
  });

  it("ArcanaSwitchSegmented renderiza offIcon/onIcon antes do texto", () => {
    const wrapper = mount(ArcanaSwitchSegmented, {
      props: {
        modelValue: false,
        offIcon: "fa-solid fa-moon",
        onIcon: "fa-solid fa-sun",
        onIconColor: "#f59e0b",
        onLabel: ""
      }
    });
    const off = wrapper.find(".arcana-switch-segmented__option--off");
    const offIcon = off.find(".arcana-switch-segmented__icon");
    expect(offIcon.classes()).toContain("fa-moon");
    expect(offIcon.attributes("aria-hidden")).toBe("true");
    // Ícone vem ANTES do texto.
    expect(off.element.firstElementChild).toBe(offIcon.element);
    expect(off.text()).toContain("Inativo");
    const onIcon = wrapper.find(
      ".arcana-switch-segmented__option--on .arcana-switch-segmented__icon"
    );
    expect(onIcon.attributes("style")).toContain("#f59e0b");
    // Label vazio → lado icon-only, sem texto forçado.
    expect(wrapper.find(".arcana-switch-segmented__option--on").text()).toBe("");
    // aria-label descarta o label vazio.
    expect(wrapper.attributes("aria-label")).toBe("Inativo");
  });
});
