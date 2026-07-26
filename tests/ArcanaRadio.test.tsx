import "@angular/compiler";
import { describe, it, expect, vi, beforeAll } from "vitest";
import { mount as mountVue } from "@vue/test-utils";
import { render as renderReact, fireEvent } from "@testing-library/react";
import { render as renderSvelte } from "@testing-library/svelte";
import { createElement } from "react";
import { provideZonelessChangeDetection } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { BrowserTestingModule, platformBrowserTesting } from "@angular/platform-browser/testing";

import VueRadio from "../src/vue/components/ArcanaRadio.vue";
import VueRadioIndicator from "../src/vue/components/ArcanaRadioIndicator.vue";
import VueRadioCardGroup from "../src/vue/components/ArcanaRadioCardGroup.vue";
import { ArcanaRadio as ReactRadio, ArcanaRadioIndicator as ReactRadioIndicator } from "../src/react";
import SvelteRadio from "../src/svelte/ArcanaRadio.svelte";
import SvelteRadioIndicator from "../src/svelte/ArcanaRadioIndicator.svelte";
import { ArcanaRadioComponent, ArcanaRadioIndicatorComponent } from "../src/angular";

/**
 * Paridade do par ArcanaRadio + ArcanaRadioIndicator entre os 4 ports, mais uma
 * regressão de que o RadioCardGroup passou a renderizar o indicador compartilhado.
 */

describe("ArcanaRadioIndicator — classes de size/tone/checked", () => {
  it("Vue", () => {
    const w = mountVue(VueRadioIndicator, { props: { checked: true, size: "sm", tone: "on-solid" } });
    const el = w.find(".arcana-radio-indicator");
    expect(el.classes()).toEqual(expect.arrayContaining([
      "arcana-radio-indicator--sm", "arcana-radio-indicator--on-solid", "is-checked",
    ]));
    expect(el.find(".arcana-radio-indicator__dot").exists()).toBe(true);
  });

  it("React", () => {
    const { container } = renderReact(
      createElement(ReactRadioIndicator, { checked: true, size: "sm", tone: "on-solid" })
    );
    const el = container.querySelector(".arcana-radio-indicator")!;
    expect(el.classList.contains("arcana-radio-indicator--sm")).toBe(true);
    expect(el.classList.contains("arcana-radio-indicator--on-solid")).toBe(true);
    expect(el.classList.contains("is-checked")).toBe(true);
  });

  it("Svelte", () => {
    const { container } = renderSvelte(SvelteRadioIndicator, {
      props: { checked: true, size: "sm", tone: "on-solid" },
    });
    const el = container.querySelector(".arcana-radio-indicator")!;
    expect(el.classList.contains("arcana-radio-indicator--sm")).toBe(true);
    expect(el.classList.contains("arcana-radio-indicator--on-solid")).toBe(true);
    expect(el.classList.contains("is-checked")).toBe(true);
  });

  it("Angular", () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ArcanaRadioIndicatorComponent],
      providers: [provideZonelessChangeDetection()],
    });
    const fixture = TestBed.createComponent(ArcanaRadioIndicatorComponent);
    fixture.componentRef.setInput("checked", true);
    fixture.componentRef.setInput("size", "sm");
    fixture.componentRef.setInput("tone", "on-solid");
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.classList.contains("arcana-radio-indicator")).toBe(true);
    expect(el.classList.contains("arcana-radio-indicator--sm")).toBe(true);
    expect(el.classList.contains("arcana-radio-indicator--on-solid")).toBe(true);
    expect(el.classList.contains("is-checked")).toBe(true);
  });
});

describe("ArcanaRadio — checked derivado + emissão + disabled", () => {
  it("Vue: marcado quando modelValue===value; emite value ao trocar", () => {
    const w = mountVue(VueRadio, { props: { modelValue: "a", value: "a", name: "g", label: "A" } });
    expect(w.find(".arcana-radio-indicator").classes()).toContain("is-checked");
    expect(w.find(".arcana-radio__label").text()).toBe("A");

    const w2 = mountVue(VueRadio, { props: { modelValue: "a", value: "b", name: "g", label: "B" } });
    expect(w2.find(".arcana-radio-indicator").classes()).not.toContain("is-checked");
    w2.find("input").trigger("change");
    expect(w2.emitted("update:modelValue")?.[0]).toEqual(["b"]);
    expect(w2.emitted("change")?.[0]).toEqual(["b"]);
  });

  it("Vue: disabled não emite", () => {
    const w = mountVue(VueRadio, { props: { value: "b", disabled: true } });
    w.find("input").trigger("change");
    expect(w.emitted("change")).toBeUndefined();
  });

  it("React: marcado quando groupValue===value; onChange recebe value", () => {
    const onChange = vi.fn();
    const { container } = renderReact(
      createElement(ReactRadio, { value: "b", groupValue: "a", name: "g", label: "B", onChange })
    );
    expect(container.querySelector(".arcana-radio-indicator")!.classList.contains("is-checked")).toBe(false);
    fireEvent.click(container.querySelector("input")!);
    expect(onChange).toHaveBeenCalledWith("b");
  });

  it("React: marcado quando iguais", () => {
    const { container } = renderReact(
      createElement(ReactRadio, { value: "a", groupValue: "a", name: "g" })
    );
    expect(container.querySelector(".arcana-radio-indicator")!.classList.contains("is-checked")).toBe(true);
  });

  it("Svelte: marcado quando groupValue===value; onChange recebe value", () => {
    const onChange = vi.fn();
    const { container } = renderSvelte(SvelteRadio, {
      props: { value: "b", groupValue: "b", name: "g", label: "B", onChange },
    });
    expect(container.querySelector(".arcana-radio-indicator")!.classList.contains("is-checked")).toBe(true);
    container.querySelector("input")!.dispatchEvent(new Event("change", { bubbles: true }));
    expect(onChange).toHaveBeenCalledWith("b");
  });

  it("Angular: marcado quando groupValue===value; emite valueChange", () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ArcanaRadioComponent],
      providers: [provideZonelessChangeDetection()],
    });
    const fixture = TestBed.createComponent(ArcanaRadioComponent);
    fixture.componentRef.setInput("value", "b");
    fixture.componentRef.setInput("groupValue", "b");
    fixture.componentRef.setInput("name", "g");
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    expect(root.querySelector(".arcana-radio-indicator")!.classList.contains("is-checked")).toBe(true);
    const onValue = vi.fn();
    fixture.componentInstance.valueChange.subscribe(onValue);
    root.querySelector("input")!.dispatchEvent(new Event("change", { bubbles: true }));
    expect(onValue).toHaveBeenCalledWith("b");
  });
});

describe("RadioCardGroup — regressão: usa o indicador compartilhado", () => {
  it("Vue: opção selecionada renderiza .arcana-radio-indicator.is-checked", () => {
    const w = mountVue(VueRadioCardGroup, {
      props: {
        modelValue: "b",
        options: [
          { label: "A", value: "a" },
          { label: "B", value: "b" },
        ],
      },
    });
    const indicators = w.findAll(".arcana-radio-indicator");
    expect(indicators).toHaveLength(2);
    const checked = w.findAll(".arcana-radio-indicator.is-checked");
    expect(checked).toHaveLength(1);
  });
});

beforeAll(() => {
  try {
    TestBed.initTestEnvironment(BrowserTestingModule, platformBrowserTesting());
  } catch {
    // já inicializado por outro arquivo de teste
  }
});
