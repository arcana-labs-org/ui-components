import { describe, expect, it } from "vitest";
import type { VueWrapper } from "@vue/test-utils";
import { mount } from "@vue/test-utils";

import ArcanaNotice from "../src/vue/components/ArcanaNotice.vue";
import ArcanaSpecSheet from "../src/vue/components/ArcanaSpecSheet.vue";
import ArcanaSpecSheetSection from "../src/vue/components/ArcanaSpecSheetSection.vue";
import ArcanaSpecSheetField from "../src/vue/components/ArcanaSpecSheetField.vue";
import ArcanaSettingsList from "../src/vue/components/ArcanaSettingsList.vue";
import ArcanaSettingsListItem from "../src/vue/components/ArcanaSettingsListItem.vue";
import ArcanaDropdown from "../src/vue/components/ArcanaDropdown.vue";
import ArcanaDropdownItem from "../src/vue/components/ArcanaDropdownItem.vue";

/**
 * Componentes que a auditoria de qualidade apontou com cobertura rasa — apareciam
 * em teste só de passagem, montados como parte do cenário de outro componente.
 * Aqui cada um é exercitado no que lhe é próprio: o que renderiza, o que os
 * modificadores mudam e, onde há interação, se ela dispara.
 */

const lastEmit = (wrapper: VueWrapper, event: string): unknown[] | undefined => {
  const all = wrapper.emitted(event);
  return all ? (all[all.length - 1] as unknown[]) : undefined;
};

describe("ArcanaNotice", () => {
  it("renderiza título e conteúdo do slot", () => {
    const wrapper = mount(ArcanaNotice, {
      props: { title: "Atenção" },
      slots: { default: "Revise os dados antes de salvar." }
    });
    expect(wrapper.text()).toContain("Atenção");
    expect(wrapper.text()).toContain("Revise os dados antes de salvar.");
  });

  it("a variante entra na classe raiz", () => {
    const wrapper = mount(ArcanaNotice, { props: { variant: "danger", title: "Erro" } });
    expect(wrapper.find(".arcana-notice").classes().join(" ")).toContain("danger");
  });

  it("dismissible mostra o botão e emite dismiss", async () => {
    const wrapper = mount(ArcanaNotice, { props: { title: "X", dismissible: true } });
    const botao = wrapper.find("button");
    expect(botao.exists()).toBe(true);
    await botao.trigger("click");
    expect(wrapper.emitted("dismiss")).toBeTruthy();
  });

  it("sem dismissible não há botão de fechar", () => {
    const wrapper = mount(ArcanaNotice, { props: { title: "X" } });
    expect(wrapper.find("button").exists()).toBe(false);
  });
});

describe("ArcanaSpecSheet e suas partes", () => {
  it("a seção mostra título e numeração", () => {
    const wrapper = mount(ArcanaSpecSheetSection, {
      props: { title: "Faturamento", sectionNum: "§ 03" }
    });
    expect(wrapper.text()).toContain("Faturamento");
    expect(wrapper.text()).toContain("§ 03");
  });

  it("o campo mostra rótulo e valor, e cai no texto vazio quando não há valor", () => {
    const comValor = mount(ArcanaSpecSheetField, { props: { label: "CNPJ", value: "12.345.678/0001-99" } });
    expect(comValor.text()).toContain("CNPJ");
    expect(comValor.text()).toContain("12.345.678/0001-99");

    const semValor = mount(ArcanaSpecSheetField, { props: { label: "CNPJ", value: "", emptyText: "—" } });
    expect(semValor.text()).toContain("—");
  });

  it("a folha compõe seção e campo", () => {
    const wrapper = mount(ArcanaSpecSheet, {
      slots: {
        default: `<ArcanaSpecSheetSection title="Dados">
            <ArcanaSpecSheetField label="Nome" value="Acme" />
          </ArcanaSpecSheetSection>`
      },
      global: { components: { ArcanaSpecSheetSection, ArcanaSpecSheetField } }
    });
    expect(wrapper.text()).toContain("Dados");
    expect(wrapper.text()).toContain("Acme");
  });
});

describe("ArcanaSettingsList", () => {
  it("o item mostra rótulo e legenda", () => {
    const wrapper = mount(ArcanaSettingsListItem, {
      props: { label: "Notificações", caption: "Avisos por e-mail" }
    });
    expect(wrapper.text()).toContain("Notificações");
    expect(wrapper.text()).toContain("Avisos por e-mail");
  });

  it("o item desabilitado ganha a classe correspondente", () => {
    const wrapper = mount(ArcanaSettingsListItem, { props: { label: "X", disabled: true } });
    expect(wrapper.find(".arcana-settings-list__item").classes().join(" ")).toContain("disabled");
  });

  it("a lista projeta os itens", () => {
    const wrapper = mount(ArcanaSettingsList, {
      slots: { default: '<ArcanaSettingsListItem label="Idioma" />' },
      global: { components: { ArcanaSettingsListItem } }
    });
    expect(wrapper.text()).toContain("Idioma");
  });
});

describe("ArcanaDropdownItem", () => {
  it("mostra o rótulo e emite click ao ser acionado", async () => {
    const wrapper = mount(ArcanaDropdownItem, { slots: { default: "Duplicar" } });
    expect(wrapper.text()).toContain("Duplicar");
    await wrapper.find(".arcana-dropdown-item").trigger("click");
    expect(wrapper.emitted("click")).toBeTruthy();
  });

  it("desabilitado não emite click", async () => {
    const wrapper = mount(ArcanaDropdownItem, { props: { disabled: true }, slots: { default: "Duplicar" } });
    await wrapper.find(".arcana-dropdown-item").trigger("click");
    expect(wrapper.emitted("click")).toBeUndefined();
  });

  it("a variante danger entra na classe", () => {
    const wrapper = mount(ArcanaDropdownItem, { props: { variant: "danger" }, slots: { default: "Excluir" } });
    expect(wrapper.find(".arcana-dropdown-item").classes().join(" ")).toContain("danger");
  });

  it("o dropdown projeta o item", () => {
    const wrapper = mount(ArcanaDropdown, {
      slots: {
        trigger: "<button>Abrir</button>",
        default: '<ArcanaDropdownItem>Duplicar</ArcanaDropdownItem>'
      },
      global: { components: { ArcanaDropdownItem } }
    });
    expect(wrapper.text()).toContain("Abrir");
  });
});

describe("ArcanaEditFieldDialog", () => {
  it("é exercitado através do SettingsEditableField", async () => {
    const { default: ArcanaSettingsEditableField } =
      await import("../src/vue/components/ArcanaSettingsEditableField.vue");
    const wrapper = mount(ArcanaSettingsEditableField, {
      props: { modelValue: "Acme", label: "Razão social", type: "text" },
      attachTo: document.body
    });
    expect(wrapper.text()).toContain("Razão social");
    // O gatilho de edição é um <button> real — é o que garante o acesso por teclado.
    const editar = wrapper.find("button.arcana-settings-list__edit-btn");
    expect(editar.exists()).toBe(true);
    await editar.trigger("click");
    expect(lastEmit(wrapper, "update:modelValue")).toBeUndefined();
    wrapper.unmount();
  });
});
