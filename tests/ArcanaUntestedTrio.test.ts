import { describe, expect, it } from "vitest";
import type { VueWrapper } from "@vue/test-utils";
import { mount } from "@vue/test-utils";

import ArcanaSkeleton from "../src/vue/components/ArcanaSkeleton.vue";
import ArcanaSwitchCard from "../src/vue/components/ArcanaSwitchCard.vue";
import ArcanaSwitchRow from "../src/vue/components/ArcanaSwitchRow.vue";

/** Último payload de um evento. `.at(-1)` não existe no lib target do projeto. */
const lastEmit = (wrapper: VueWrapper, event: string): unknown[] | undefined => {
  const all = wrapper.emitted(event);
  return all ? (all[all.length - 1] as unknown[]) : undefined;
};

/**
 * Estes três componentes eram os únicos do catálogo sem nenhuma referência em
 * teste — apareceram numa auditoria de qualidade. O objetivo aqui não é cobrir
 * cada prop, e sim garantir que renderizam, que o v-model faz o ciclo completo e
 * que `disabled` realmente bloqueia, que é onde um componente de toggle costuma
 * falhar silenciosamente.
 */

describe("ArcanaSkeleton", () => {
  it("aplica largura, altura e arredondamento", () => {
    const wrapper = mount(ArcanaSkeleton, { props: { width: "120px", height: "16px", rounded: true } });
    const el = wrapper.find(".arcana-skeleton").element as HTMLElement;
    expect(el.style.width).toBe("120px");
    expect(el.style.height).toBe("16px");
  });

  it("renderiza sem prop alguma", () => {
    const wrapper = mount(ArcanaSkeleton);
    expect(wrapper.find(".arcana-skeleton").exists()).toBe(true);
  });
});

describe("ArcanaSwitchCard", () => {
  it("mostra o título e o status correspondente ao estado", () => {
    const wrapper = mount(ArcanaSwitchCard, {
      props: { modelValue: true, title: "Notificações", statusOn: "Ativado", statusOff: "Desativado" }
    });
    expect(wrapper.text()).toContain("Notificações");
    expect(wrapper.text()).toContain("Ativado");
    expect(wrapper.text()).not.toContain("Desativado");
  });

  it("alterna o valor e emite update:modelValue e change", async () => {
    const wrapper = mount(ArcanaSwitchCard, { props: { modelValue: false, title: "Notificações" } });
    await wrapper.find(".arcana-switch-card").trigger("click");
    expect(lastEmit(wrapper, "update:modelValue")).toEqual([true]);
    expect(lastEmit(wrapper, "change")).toEqual([true]);
  });

  it("disabled bloqueia a alternância", async () => {
    const wrapper = mount(ArcanaSwitchCard, { props: { modelValue: false, title: "X", disabled: true } });
    await wrapper.find(".arcana-switch-card").trigger("click");
    expect(wrapper.emitted("update:modelValue")).toBeUndefined();
  });
});

describe("ArcanaSwitchRow", () => {
  it("mostra rótulo e descrição", () => {
    const wrapper = mount(ArcanaSwitchRow, {
      props: { modelValue: false, label: "Modo escuro", description: "Segue o sistema" }
    });
    expect(wrapper.text()).toContain("Modo escuro");
    expect(wrapper.text()).toContain("Segue o sistema");
  });

  it("alterna o valor e emite os dois eventos", async () => {
    const wrapper = mount(ArcanaSwitchRow, { props: { modelValue: false, label: "Modo escuro" } });
    await wrapper.find(".arcana-switch-row").trigger("click");
    expect(lastEmit(wrapper, "update:modelValue")).toEqual([true]);
    expect(lastEmit(wrapper, "change")).toEqual([true]);
  });

  it("disabled bloqueia a alternância", async () => {
    const wrapper = mount(ArcanaSwitchRow, { props: { modelValue: false, label: "X", disabled: true } });
    await wrapper.find(".arcana-switch-row").trigger("click");
    expect(wrapper.emitted("update:modelValue")).toBeUndefined();
  });
});
