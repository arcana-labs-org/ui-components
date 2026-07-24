/**
 * Angular adapter tests: o pacote publicado é AOT (partial) compilado pelo `ngc`,
 * mas aqui os componentes rodam pelo compilador JIT do Angular (`@angular/compiler`
 * abaixo) pra que o TestBed compile os templates inline dentro do vitest. Zoneless
 * change detection mantém o zone.js fora.
 *
 * Smokes de ~9 componentes do lote 1: montam e emitem as classes `shadcn-*` idênticas
 * ao Vue/React, com interações (click no button → Output, toggle no switch/checkbox →
 * valueChange, digitação no input → valueChange, seleção em tabs/segmented/accordion).
 */
import "@angular/compiler";
import { Component, provideZonelessChangeDetection } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { BrowserTestingModule, platformBrowserTesting } from "@angular/platform-browser/testing";
import { beforeAll, describe, expect, it, vi } from "vitest";
import {
  ArcanaTabPanelDirective,
  ShadcnAccordionComponent,
  ShadcnAccordionItemComponent,
  ShadcnBadgeComponent,
  ShadcnButtonComponent,
  ShadcnCheckboxComponent,
  ShadcnInputComponent,
  ShadcnNoticeComponent,
  ShadcnSegmentedOptionsComponent,
  ShadcnSwitchComponent,
  ShadcnTabsComponent
} from "../src/angular";

beforeAll(() => {
  TestBed.initTestEnvironment(BrowserTestingModule, platformBrowserTesting());
});

const click = (element: Element | null) =>
  element?.dispatchEvent(new MouseEvent("click", { bubbles: true }));

describe("Angular adapter", () => {
  it("ShadcnButton: emite as classes e o clique nativo do host chega ao consumidor", () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ShadcnButtonComponent],
      providers: [provideZonelessChangeDetection()]
    });
    const fixture = TestBed.createComponent(ShadcnButtonComponent);
    fixture.componentRef.setInput("variant", "ghost");
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLButtonElement;
    expect(el.classList.contains("shadcn-button")).toBe(true);
    expect(el.classList.contains("shadcn-button--ghost")).toBe(true);
    // O host É o próprio <button>: o clique DOM nativo é a API de clique.
    const clicked = vi.fn();
    el.addEventListener("click", clicked);
    el.click();
    expect(clicked).toHaveBeenCalledOnce();
  });

  it("ShadcnSwitch: toggla e emite valueChange/change", () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ShadcnSwitchComponent],
      providers: [provideZonelessChangeDetection()]
    });
    const fixture = TestBed.createComponent(ShadcnSwitchComponent);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLButtonElement;
    expect(el.classList.contains("shadcn-switch")).toBe(true);
    expect(el.getAttribute("role")).toBe("switch");
    expect(el.querySelector(".shadcn-switch__thumb")).toBeTruthy();
    const onValue = vi.fn();
    const onChange = vi.fn();
    fixture.componentInstance.valueChange.subscribe(onValue);
    fixture.componentInstance.change.subscribe(onChange);
    el.click();
    expect(onValue).toHaveBeenCalledWith(true);
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("ShadcnInput: reflete value e emite valueChange ao digitar", () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ShadcnInputComponent],
      providers: [provideZonelessChangeDetection()]
    });
    const fixture = TestBed.createComponent(ShadcnInputComponent);
    fixture.componentRef.setInput("value", "abc");
    fixture.componentRef.setInput("size", "lg");
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLInputElement;
    expect(el.classList.contains("shadcn-input")).toBe(true);
    expect(el.classList.contains("shadcn-input--lg")).toBe(true);
    expect(el.value).toBe("abc");
    const onValue = vi.fn();
    fixture.componentInstance.valueChange.subscribe(onValue);
    el.value = "hello";
    el.dispatchEvent(new Event("input", { bubbles: true }));
    expect(onValue).toHaveBeenCalledWith("hello");
  });

  it("ShadcnInput: parseia number (vazio → null, válido → number)", () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ShadcnInputComponent],
      providers: [provideZonelessChangeDetection()]
    });
    const fixture = TestBed.createComponent(ShadcnInputComponent);
    fixture.componentRef.setInput("type", "number");
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLInputElement;
    const values: (string | number | null)[] = [];
    fixture.componentInstance.valueChange.subscribe((v) => values.push(v));
    el.value = "42";
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.value = "";
    el.dispatchEvent(new Event("input", { bubbles: true }));
    expect(values).toEqual([42, null]);
    // Output `change` nativo (blur/enter) emite valor parseado, sem recursão.
    const onChange = vi.fn();
    fixture.componentInstance.change.subscribe(onChange);
    el.value = "7";
    el.dispatchEvent(new Event("change", { bubbles: true }));
    expect(onChange).toHaveBeenCalledWith(7);
  });

  it("ShadcnBadge: emite classes + dot", () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ShadcnBadgeComponent],
      providers: [provideZonelessChangeDetection()]
    });
    const fixture = TestBed.createComponent(ShadcnBadgeComponent);
    fixture.componentRef.setInput("variant", "green");
    fixture.componentRef.setInput("dot", true);
    fixture.componentRef.setInput("size", "sm");
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.classList.contains("shadcn-badge")).toBe(true);
    expect(el.classList.contains("shadcn-badge--green")).toBe(true);
    expect(el.classList.contains("shadcn-badge--sm")).toBe(true);
    expect(el.querySelector(".shadcn-badge__dot")).toBeTruthy();
  });

  it("ShadcnCheckbox: input nativo + toggle emite valueChange", () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ShadcnCheckboxComponent],
      providers: [provideZonelessChangeDetection()]
    });
    const fixture = TestBed.createComponent(ShadcnCheckboxComponent);
    fixture.componentRef.setInput("label", "Aceito");
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.classList.contains("shadcn-checkbox")).toBe(true);
    expect(el.querySelector(".shadcn-checkbox__label")?.textContent).toContain("Aceito");
    const input = el.querySelector<HTMLInputElement>("input.shadcn-checkbox__input")!;
    expect(input.type).toBe("checkbox");
    const onValue = vi.fn();
    fixture.componentInstance.valueChange.subscribe(onValue);
    input.checked = true;
    input.dispatchEvent(new Event("change", { bubbles: true }));
    expect(onValue).toHaveBeenCalledWith(true);
  });

  it("ShadcnNotice: variant + dismiss", () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ShadcnNoticeComponent],
      providers: [provideZonelessChangeDetection()]
    });
    const fixture = TestBed.createComponent(ShadcnNoticeComponent);
    fixture.componentRef.setInput("variant", "warning");
    fixture.componentRef.setInput("title", "Atenção");
    fixture.componentRef.setInput("dismissible", true);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.classList.contains("shadcn-notice")).toBe(true);
    expect(el.classList.contains("shadcn-notice--warning")).toBe(true);
    expect(el.querySelector(".shadcn-notice__title")?.textContent).toContain("Atenção");
    expect(el.querySelector(".shadcn-notice__icon .fa-triangle-exclamation")).toBeTruthy();
    const dismissed = vi.fn();
    fixture.componentInstance.dismiss.subscribe(dismissed);
    click(el.querySelector(".shadcn-notice__close"));
    expect(dismissed).toHaveBeenCalledOnce();
  });

  it("ShadcnSegmentedOptions: renderiza opções e seleciona", () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ShadcnSegmentedOptionsComponent],
      providers: [provideZonelessChangeDetection()]
    });
    const fixture = TestBed.createComponent(ShadcnSegmentedOptionsComponent);
    fixture.componentRef.setInput("value", "a");
    fixture.componentRef.setInput("options", [
      { label: "A", value: "a" },
      { label: "B", value: "b" }
    ]);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.classList.contains("shadcn-segmented-options")).toBe(true);
    const options = el.querySelectorAll(".shadcn-segmented-options__option");
    expect(options).toHaveLength(2);
    expect(options[0].classList.contains("is-active")).toBe(true);
    const onValue = vi.fn();
    fixture.componentInstance.valueChange.subscribe(onValue);
    click(options[1]);
    expect(onValue).toHaveBeenCalledWith("b");
  });

  it("ShadcnTabs: triggers + painel ativo via *arcanaTabPanel", () => {
    @Component({
      standalone: true,
      imports: [ShadcnTabsComponent, ArcanaTabPanelDirective],
      template: `
        <div arcanaShadcnTabs variant="underline" [tabs]="tabs" [value]="active" (valueChange)="active = $event">
          <ng-container *arcanaTabPanel="'home'">Painel Home</ng-container>
          <ng-container *arcanaTabPanel="'orders'">Painel Pedidos</ng-container>
        </div>
      `
    })
    class TabsHost {
      active = "home";
      tabs = [
        { name: "home", label: "Início" },
        { name: "orders", label: "Pedidos" }
      ];
    }
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [TabsHost],
      providers: [provideZonelessChangeDetection()]
    });
    const fixture = TestBed.createComponent(TabsHost);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const root = el.querySelector(".shadcn-tabs")!;
    expect(root.classList.contains("shadcn-tabs--underline")).toBe(true);
    const triggers = el.querySelectorAll(".shadcn-tabs__trigger");
    expect(triggers).toHaveLength(2);
    expect(triggers[0].classList.contains("is-active")).toBe(true);
    expect(el.querySelector(".shadcn-tabs__panel")?.textContent).toContain("Painel Home");
    click(triggers[1]);
    fixture.detectChanges();
    expect(triggers[1].classList.contains("is-active")).toBe(true);
    expect(el.querySelector(".shadcn-tabs__panel")?.textContent).toContain("Painel Pedidos");
  });

  it("ShadcnAccordion: abre/fecha itens (single-open)", () => {
    @Component({
      standalone: true,
      imports: [ShadcnAccordionComponent, ShadcnAccordionItemComponent],
      template: `
        <div arcanaShadcnAccordion [value]="open" (valueChange)="open = $event">
          <div arcanaShadcnAccordionItem name="a" title="A">Corpo A</div>
          <div arcanaShadcnAccordionItem name="b" title="B">Corpo B</div>
        </div>
      `
    })
    class AccordionHost {
      open: string | string[] | null = null;
    }
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [AccordionHost],
      providers: [provideZonelessChangeDetection()]
    });
    const fixture = TestBed.createComponent(AccordionHost);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const items = el.querySelectorAll(".shadcn-accordion-item");
    expect(items).toHaveLength(2);
    expect(items[0].classList.contains("open")).toBe(false);
    click(items[0].querySelector(".shadcn-accordion-trigger"));
    fixture.detectChanges();
    expect(items[0].classList.contains("open")).toBe(true);
    // single-open: abrir B fecha A
    click(items[1].querySelector(".shadcn-accordion-trigger"));
    fixture.detectChanges();
    expect(items[1].classList.contains("open")).toBe(true);
    expect(items[0].classList.contains("open")).toBe(false);
  });
});
