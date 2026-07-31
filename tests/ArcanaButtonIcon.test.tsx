import "@angular/compiler";
import { describe, it, expect, beforeAll } from "vitest";
import { readFileSync } from "node:fs";
import { mount as mountVue } from "@vue/test-utils";
import { render as renderReact } from "@testing-library/react";
import { render as renderSvelte } from "@testing-library/svelte";
import { createElement } from "react";
import { createRawSnippet } from "svelte";
import { Component, provideZonelessChangeDetection } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { BrowserTestingModule, platformBrowserTesting } from "@angular/platform-browser/testing";

import VueButton from "../src/vue/components/ArcanaButton.vue";
import { ArcanaButton as ReactButton } from "../src/react";
import SvelteButton from "../src/svelte/ArcanaButton.svelte";
import { ArcanaButtonComponent } from "../src/angular";

/**
 * Ícones IcoMoon dentro do `ArcanaButton`.
 *
 * O CSS global do IcoMoon dá `font-size: 16px` + `min-width: 1em` + `top: -1px` a todo
 * `[class^="icon-"]`. Sem uma regra mais específica no botão, um `<i class="icon-…">` colado no
 * slot fica maior e desalinhado que o texto de 13px. A normalização existia em
 * `.arcana-btn .arcana-btn__icon`, mas essa classe ficou órfã após o rename para `.arcana-button` —
 * nenhum port emite `arcana-btn`. O fix passa a viver em `.arcana-button > [class*=icon-]`.
 *
 * Dois contratos aqui: (1) a folha tem a regra na classe REAL; (2) os quatro ports colocam o ícone
 * como filho DIRETO do `.arcana-button`, para o seletor `>` alcançá-lo.
 */

describe("ArcanaButton ícone — contrato de CSS", () => {
  const scss = readFileSync("src/styles/components.scss", "utf8");

  it("normaliza o ícone na classe real .arcana-button, não só na órfã .arcana-btn", () => {
    // A regra tem que mirar a classe que os componentes de fato emitem.
    expect(scss).toMatch(/\.arcana-button\s*>\s*\[class\*?=["']?[ ]?icon-/);

    // E fixar 13px, como o texto do botão.
    const bloco = scss.slice(scss.indexOf(".arcana-button >"));
    expect(bloco.slice(0, 200)).toMatch(/font-size:\s*13px/);
  });
});

describe("ArcanaButton ícone — filho direto do botão (4 ports)", () => {
  it("Vue: o ícone é filho direto de .arcana-button", () => {
    const wrapper = mountVue(VueButton, { slots: { default: '<i class="icon-plus2"></i>' } });
    const icon = wrapper.find("button.arcana-button > i.icon-plus2");
    expect(icon.exists()).toBe(true);
  });

  it("React: o ícone é filho direto de .arcana-button", () => {
    const { container } = renderReact(
      createElement(ReactButton, {}, createElement("i", { className: "icon-plus2" })),
    );
    expect(container.querySelector("button.arcana-button > i.icon-plus2")).toBeTruthy();
  });

  it("Svelte: o ícone é filho direto de .arcana-button", () => {
    const children = createRawSnippet(() => ({ render: () => '<i class="icon-plus2"></i>' }));
    const { container } = renderSvelte(SvelteButton, { props: { children } });
    expect(container.querySelector("button.arcana-button > i.icon-plus2")).toBeTruthy();
  });
});

@Component({
  standalone: true,
  imports: [ArcanaButtonComponent],
  template: `<button arcanaButton><i class="icon-plus2"></i></button>`,
})
class AngularIconHost {}

describe("ArcanaButton ícone — Angular", () => {
  beforeAll(() => {
    try {
      TestBed.initTestEnvironment(BrowserTestingModule, platformBrowserTesting());
    } catch {
      // Já inicializado por outra suíte.
    }
  });

  it("Angular: o ícone projetado é filho direto de .arcana-button", () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [AngularIconHost],
      providers: [provideZonelessChangeDetection()],
    });
    const fixture = TestBed.createComponent(AngularIconHost);
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;
    expect(host.querySelector("button.arcana-button > i.icon-plus2")).toBeTruthy();
  });
});
