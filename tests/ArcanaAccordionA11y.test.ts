import "@angular/compiler";
import { Component, provideZonelessChangeDetection } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { BrowserTestingModule, platformBrowserTesting } from "@angular/platform-browser/testing";
import { beforeAll, describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { render as renderReact } from "@testing-library/react";
import { render as renderSvelte } from "@testing-library/svelte";
import { createElement } from "react";

import VueAccordion from "../src/vue/components/ArcanaAccordion.vue";
import VueAccordionItem from "../src/vue/components/ArcanaAccordionItem.vue";
import { ArcanaAccordion as ReactAccordion, ArcanaAccordionItem as ReactAccordionItem } from "../src/react";
import { ArcanaAccordionComponent, ArcanaAccordionItemComponent } from "../src/angular";
import SvelteAccordionFixture from "./fixtures/AccordionA11yFixture.svelte";

/**
 * O padrão de disclosure exige que o gatilho anuncie o estado (`aria-expanded`) e
 * aponte para o painel que ele controla (`aria-controls` → `id`). Sem isso o
 * teclado até funciona — o gatilho é um `<button>` nativo —, mas o leitor de tela
 * não informa se a seção está aberta (WCAG 4.1.2).
 *
 * O teste cobre os quatro ports no mesmo arquivo porque a exigência é de paridade:
 * um framework corrigido e três esquecidos é exatamente a regressão a evitar.
 */

const expectDisclosure = (trigger: HTMLElement, panel: HTMLElement | null, expanded: boolean) => {
  expect(trigger.getAttribute("aria-expanded")).toBe(String(expanded));
  const controls = trigger.getAttribute("aria-controls");
  expect(controls).toBeTruthy();
  expect(panel).not.toBeNull();
  expect(panel!.id).toBe(controls);
  expect(panel!.getAttribute("role")).toBe("region");
};

describe("ArcanaAccordion — padrão de disclosure acessível", () => {
  it("Vue: gatilho anuncia o estado e aponta para o painel", async () => {
    const wrapper = mount(VueAccordion, {
      props: { modelValue: "a" },
      slots: { default: '<ArcanaAccordionItem name="a" title="Um" />' },
      global: { components: { ArcanaAccordionItem: VueAccordionItem } }
    });
    const trigger = wrapper.find("button.arcana-accordion-trigger").element as HTMLElement;
    const panel = wrapper.find(".arcana-accordion-content").element as HTMLElement;
    expectDisclosure(trigger, panel, true);
  });

  it("React: gatilho anuncia o estado e aponta para o painel", () => {
    const { container } = renderReact(
      createElement(ReactAccordion, { value: "a" },
        createElement(ReactAccordionItem, { name: "a", title: "Um" }))
    );
    const trigger = container.querySelector("button.arcana-accordion-trigger") as HTMLElement;
    const panel = container.querySelector(".arcana-accordion-content") as HTMLElement;
    expectDisclosure(trigger, panel, true);
  });

  it("Svelte: gatilho anuncia o estado e aponta para o painel", () => {
    const { container } = renderSvelte(SvelteAccordionFixture);
    const trigger = container.querySelector("button.arcana-accordion-trigger") as HTMLElement;
    const panel = container.querySelector(".arcana-accordion-content") as HTMLElement;
    expectDisclosure(trigger, panel, true);
  });

  it("ids de painel são únicos entre itens irmãos", () => {
    const { container } = renderReact(
      createElement(ReactAccordion, { value: "a" },
        createElement(ReactAccordionItem, { name: "a", title: "Um" }),
        createElement(ReactAccordionItem, { name: "b", title: "Dois" }))
    );
    const ids = [...container.querySelectorAll(".arcana-accordion-content")].map((el) => el.id);
    expect(ids).toHaveLength(2);
    expect(new Set(ids).size).toBe(2);
  });
});

describe("ArcanaAccordion — Angular", () => {
  beforeAll(() => {
    TestBed.initTestEnvironment(BrowserTestingModule, platformBrowserTesting());
  });

  it("gatilho anuncia o estado e aponta para o painel", () => {
    @Component({
      standalone: true,
      imports: [ArcanaAccordionComponent, ArcanaAccordionItemComponent],
      template: `<div arcanaAccordion [value]="'a'"><div arcanaAccordionItem name="a" title="Um"></div></div>`
    })
    class HostComponent {}

    TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [provideZonelessChangeDetection()]
    });
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();

    const trigger = fixture.nativeElement.querySelector("button.arcana-accordion-trigger") as HTMLElement;
    const panel = fixture.nativeElement.querySelector(".arcana-accordion-content") as HTMLElement;
    expectDisclosure(trigger, panel, true);
  });
});
