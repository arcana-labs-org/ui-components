import "@angular/compiler";
import { describe, it, expect, beforeAll } from "vitest";
import { mount as mountVue } from "@vue/test-utils";
import { render as renderReact } from "@testing-library/react";
import { render as renderSvelte } from "@testing-library/svelte";
import { createElement } from "react";
import { createRawSnippet } from "svelte";
import { Component, provideZonelessChangeDetection } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { BrowserTestingModule, platformBrowserTesting } from "@angular/platform-browser/testing";

import VueInput from "../src/vue/components/ArcanaInput.vue";
import { ArcanaInput as ReactInput } from "../src/react";
import SvelteInput from "../src/svelte/ArcanaInput.svelte";
import { ArcanaInputComponent } from "../src/angular";

/**
 * Paridade dos ícones (slots `#icon-start`/`#icon-end`) entre os 4 ports. Contrato:
 *
 * - Sem ícone: renderiza `<input class="arcana-input">` puro (sem wrapper) — garante
 *   que consumidores existentes não têm o DOM alterado.
 * - Com ícone: envolve o input num `.arcana-input-wrap`, com `<span class="arcana-input__icon
 *   arcana-input__icon--start|end">` e o modificador de padding `arcana-input--icon-start|end`.
 */

describe("ArcanaInput ícones — sem ícone renderiza input puro (regressão)", () => {
  it("Vue: input direto, sem wrapper", () => {
    const wrapper = mountVue(VueInput, { props: { modelValue: "x" } });
    expect(wrapper.find(".arcana-input-wrap").exists()).toBe(false);
    expect(wrapper.find("input.arcana-input").exists()).toBe(true);
  });

  it("React: input direto, sem wrapper", () => {
    const { container } = renderReact(createElement(ReactInput, { value: "x" }));
    expect(container.querySelector(".arcana-input-wrap")).toBeNull();
    expect(container.querySelector("input.arcana-input")).toBeTruthy();
  });

  it("Svelte: input direto, sem wrapper", () => {
    const { container } = renderSvelte(SvelteInput, { props: { value: "x" } });
    expect(container.querySelector(".arcana-input-wrap")).toBeNull();
    expect(container.querySelector("input.arcana-input")).toBeTruthy();
  });
});

const icon = (html: string) =>
  createRawSnippet(() => ({ render: () => html }));

describe("ArcanaInput ícones — com ícone envolve no wrapper", () => {
  it("Vue: slots #icon-start/#icon-end viram spans no wrapper", () => {
    const wrapper = mountVue(VueInput, {
      props: { modelValue: "", size: "sm" },
      slots: {
        "icon-start": '<i class="icon-search"></i>',
        "icon-end": '<span class="unit">kg</span>',
      },
    });
    const wrap = wrapper.find(".arcana-input-wrap");
    expect(wrap.exists()).toBe(true);
    expect(wrap.classes()).toContain("arcana-input-wrap--sm");
    expect(wrap.find(".arcana-input__icon--start .icon-search").exists()).toBe(true);
    expect(wrap.find(".arcana-input__icon--end .unit").exists()).toBe(true);
    const input = wrap.find("input.arcana-input");
    expect(input.classes()).toContain("arcana-input--icon-start");
    expect(input.classes()).toContain("arcana-input--icon-end");
  });

  it("Vue: só #icon-start marca apenas o padding do início", () => {
    const wrapper = mountVue(VueInput, {
      props: { modelValue: "" },
      slots: { "icon-start": '<i class="icon-search"></i>' },
    });
    const input = wrapper.find("input.arcana-input");
    expect(input.classes()).toContain("arcana-input--icon-start");
    expect(input.classes()).not.toContain("arcana-input--icon-end");
    expect(wrapper.find(".arcana-input__icon--end").exists()).toBe(false);
  });

  it("React: props iconStart/iconEnd viram spans no wrapper", () => {
    const { container } = renderReact(
      createElement(ReactInput, {
        value: "",
        size: "lg",
        iconStart: createElement("i", { className: "icon-search" }),
        iconEnd: createElement("span", { className: "unit" }, "kg"),
      })
    );
    const wrap = container.querySelector(".arcana-input-wrap");
    expect(wrap).toBeTruthy();
    expect(wrap!.classList.contains("arcana-input-wrap--lg")).toBe(true);
    expect(wrap!.querySelector(".arcana-input__icon--start .icon-search")).toBeTruthy();
    expect(wrap!.querySelector(".arcana-input__icon--end .unit")).toBeTruthy();
    const input = wrap!.querySelector("input.arcana-input")!;
    expect(input.classList.contains("arcana-input--icon-start")).toBe(true);
    expect(input.classList.contains("arcana-input--icon-end")).toBe(true);
  });

  it("Svelte: snippets iconStart/iconEnd viram spans no wrapper", () => {
    const { container } = renderSvelte(SvelteInput, {
      props: {
        value: "",
        iconStart: icon('<i class="icon-search"></i>'),
        iconEnd: icon('<span class="unit">kg</span>'),
      },
    });
    const wrap = container.querySelector(".arcana-input-wrap");
    expect(wrap).toBeTruthy();
    expect(wrap!.querySelector(".arcana-input__icon--start .icon-search")).toBeTruthy();
    expect(wrap!.querySelector(".arcana-input__icon--end .unit")).toBeTruthy();
    const input = wrap!.querySelector("input.arcana-input")!;
    expect(input.classList.contains("arcana-input--icon-start")).toBe(true);
    expect(input.classList.contains("arcana-input--icon-end")).toBe(true);
  });
});

@Component({
  standalone: true,
  imports: [ArcanaInputComponent],
  template: `
    <input arcanaInput [iconStart]="startTpl" [iconEnd]="endTpl" />
    <ng-template #startTpl><i class="icon-search"></i></ng-template>
    <ng-template #endTpl><span class="unit">kg</span></ng-template>
  `,
})
class AngularIconHost {}

@Component({
  standalone: true,
  imports: [ArcanaInputComponent],
  template: `<input arcanaInput />`,
})
class AngularPlainHost {}

describe("ArcanaInput ícones — Angular", () => {
  beforeAll(() => {
    try {
      TestBed.initTestEnvironment(BrowserTestingModule, platformBrowserTesting());
    } catch {
      // já inicializado por outro arquivo de teste na mesma run
    }
  });

  it("sem ícone: input puro, sem wrapper", () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [AngularPlainHost],
      providers: [provideZonelessChangeDetection()],
    });
    const fixture = TestBed.createComponent(AngularPlainHost);
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    expect(root.querySelector(".arcana-input-wrap")).toBeNull();
    expect(root.querySelector("input.arcana-input")).toBeTruthy();
  });

  it("com ícone: directive se auto-envolve e projeta os templates", () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [AngularIconHost],
      providers: [provideZonelessChangeDetection()],
    });
    const fixture = TestBed.createComponent(AngularIconHost);
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    const wrap = root.querySelector(".arcana-input-wrap");
    expect(wrap).toBeTruthy();
    expect(wrap!.querySelector(".arcana-input__icon--start .icon-search")).toBeTruthy();
    expect(wrap!.querySelector(".arcana-input__icon--end .unit")).toBeTruthy();
    const input = wrap!.querySelector("input.arcana-input")!;
    expect(input.classList.contains("arcana-input--icon-start")).toBe(true);
    expect(input.classList.contains("arcana-input--icon-end")).toBe(true);
    // ordem: ícone início → input → ícone fim
    const kids = Array.from(wrap!.children);
    expect(kids[0].classList.contains("arcana-input__icon--start")).toBe(true);
    expect(kids[1].tagName).toBe("INPUT");
    expect(kids[2].classList.contains("arcana-input__icon--end")).toBe(true);
  });
});
