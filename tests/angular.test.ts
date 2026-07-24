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
import { Component, ViewChild, provideZonelessChangeDetection } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { BrowserTestingModule, platformBrowserTesting } from "@angular/platform-browser/testing";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import {
  ArcanaTabPanelDirective,
  InputCurrencyComponent,
  MultiSelectPopoverComponent,
  ShadcnAccordionComponent,
  ShadcnAccordionItemComponent,
  ShadcnBadgeComponent,
  ShadcnButtonComponent,
  ShadcnCheckboxComponent,
  ShadcnDatePickerComponent,
  ShadcnDialogComponent,
  ShadcnDropdownComponent,
  ShadcnDropdownItemComponent,
  ShadcnInputBooleanComponent,
  ShadcnInputComponent,
  ShadcnInputMaskComponent,
  ShadcnLoadingOverlayComponent,
  ShadcnNoticeComponent,
  ShadcnNumberStepperComponent,
  ShadcnOnboardingPanelComponent,
  ShadcnRadioCardGroupComponent,
  ShadcnRequiredFieldsDialogComponent,
  ShadcnSegmentedOptionsComponent,
  ShadcnSelectComponent,
  ShadcnSettingsEditableFieldComponent,
  ShadcnSettingsListComponent,
  ShadcnSettingsListGroupComponent,
  ShadcnSettingsListItemComponent,
  ShadcnSpecSheetComponent,
  ShadcnSpecSheetFieldComponent,
  ShadcnSpecSheetSectionComponent,
  ShadcnSummaryTileComponent,
  ShadcnSummaryTilesComponent,
  ShadcnSwitchComponent,
  ShadcnSwitchSegmentedComponent,
  ShadcnTableComponent,
  ShadcnTabsComponent,
  SparkGridEmptyStateComponent
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

  // ── Lote 2 ─────────────────────────────────────────────────────────────────

  it("ShadcnSelect: abre painel no body, seleciona item e emite valueChange", () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ShadcnSelectComponent],
      providers: [provideZonelessChangeDetection()]
    });
    const fixture = TestBed.createComponent(ShadcnSelectComponent);
    fixture.componentRef.setInput("value", "a");
    fixture.componentRef.setInput("options", [
      { label: "Opção A", value: "a" },
      { label: "Opção B", value: "b" }
    ]);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.classList.contains("shadcn-select")).toBe(true);
    expect(el.querySelector(".shadcn-select__label")?.textContent).toContain("Opção A");
    // Abre: painel é teleportado pro document.body.
    click(el.querySelector(".shadcn-select__trigger"));
    fixture.detectChanges();
    const panel = document.body.querySelector(".shadcn-select__panel");
    expect(panel).toBeTruthy();
    const items = panel!.querySelectorAll(".shadcn-select__item");
    expect(items).toHaveLength(2);
    expect(items[0].classList.contains("is-selected")).toBe(true);
    const onValue = vi.fn();
    fixture.componentInstance.valueChange.subscribe(onValue);
    click(items[1]);
    fixture.detectChanges();
    expect(onValue).toHaveBeenCalledWith("b");
    // Fechou: painel removido do body.
    expect(document.body.querySelector(".shadcn-select__panel")).toBeFalsy();
  });

  it("ShadcnInputBoolean: monta Sim/Não/Todos no Select interno", () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ShadcnInputBooleanComponent],
      providers: [provideZonelessChangeDetection()]
    });
    const fixture = TestBed.createComponent(ShadcnInputBooleanComponent);
    fixture.componentRef.setInput("value", true);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const select = el.querySelector(".shadcn-select");
    expect(select).toBeTruthy();
    expect(select!.querySelector(".shadcn-select__label")?.textContent).toContain("Sim");
    click(el.querySelector(".shadcn-select__trigger"));
    fixture.detectChanges();
    const labels = Array.from(
      document.body.querySelectorAll(".shadcn-select__item-label")
    ).map((n) => n.textContent?.trim());
    expect(labels).toEqual(["Todos", "Sim", "Não"]);
    document.body.querySelectorAll(".shadcn-select__panel").forEach((p) => p.remove());
  });

  it("ShadcnNumberStepper: incrementa/decrementa e respeita min/max", () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ShadcnNumberStepperComponent],
      providers: [provideZonelessChangeDetection()]
    });
    const fixture = TestBed.createComponent(ShadcnNumberStepperComponent);
    fixture.componentRef.setInput("value", 1);
    fixture.componentRef.setInput("min", 1);
    fixture.componentRef.setInput("max", 2);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.classList.contains("shadcn-number-stepper")).toBe(true);
    const dec = el.querySelector<HTMLButtonElement>(".shadcn-number-stepper__btn--decrement")!;
    const inc = el.querySelector<HTMLButtonElement>(".shadcn-number-stepper__btn--increment")!;
    expect(dec.disabled).toBe(true); // value === min
    const onValue = vi.fn();
    fixture.componentInstance.valueChange.subscribe(onValue);
    click(inc);
    expect(onValue).toHaveBeenCalledWith(2);
  });

  it("ShadcnRadioCardGroup: renderiza cards e seleciona via input nativo", () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ShadcnRadioCardGroupComponent],
      providers: [provideZonelessChangeDetection()]
    });
    const fixture = TestBed.createComponent(ShadcnRadioCardGroupComponent);
    fixture.componentRef.setInput("value", "x");
    fixture.componentRef.setInput("options", [
      { label: "X", value: "x" },
      { label: "Y", value: "y" }
    ]);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.classList.contains("shadcn-radio-card-group")).toBe(true);
    const cards = el.querySelectorAll(".shadcn-radio-card");
    expect(cards).toHaveLength(2);
    expect(cards[0].classList.contains("is-selected")).toBe(true);
    const onValue = vi.fn();
    fixture.componentInstance.valueChange.subscribe(onValue);
    const input = cards[1].querySelector<HTMLInputElement>("input.shadcn-radio-card__input")!;
    input.checked = true;
    input.dispatchEvent(new Event("change", { bubbles: true }));
    expect(onValue).toHaveBeenCalledWith("y");
  });

  it("ShadcnSwitchSegmented: toggla e emite valueChange", () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ShadcnSwitchSegmentedComponent],
      providers: [provideZonelessChangeDetection()]
    });
    const fixture = TestBed.createComponent(ShadcnSwitchSegmentedComponent);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.classList.contains("shadcn-switch-segmented")).toBe(true);
    expect(el.getAttribute("role")).toBe("switch");
    expect(el.querySelector(".shadcn-switch-segmented__option--on")?.textContent).toContain("Ativo");
    const onValue = vi.fn();
    fixture.componentInstance.valueChange.subscribe(onValue);
    el.click();
    expect(onValue).toHaveBeenCalledWith(true);
  });

  it("ShadcnInputMask: formata display e emite raw sem separadores", () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ShadcnInputMaskComponent],
      providers: [provideZonelessChangeDetection()]
    });
    const fixture = TestBed.createComponent(ShadcnInputMaskComponent);
    fixture.componentRef.setInput("mask", "##.##");
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLInputElement;
    expect(el.classList.contains("shadcn-input")).toBe(true);
    const onValue = vi.fn();
    fixture.componentInstance.valueChange.subscribe(onValue);
    el.value = "1234";
    el.dispatchEvent(new Event("input", { bubbles: true }));
    fixture.detectChanges();
    // raw emitido sem o ponto; display mascarado com o ponto.
    expect(onValue).toHaveBeenCalledWith("1234");
    expect(el.value).toBe("12.34");
  });

  it("InputCurrency: máscara BRL right-to-left, emite string formatada", () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [InputCurrencyComponent],
      providers: [provideZonelessChangeDetection()]
    });
    const fixture = TestBed.createComponent(InputCurrencyComponent);
    fixture.componentRef.setInput("shadcn", true);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.classList.contains("icur-shadcn-field")).toBe(true);
    const input = el.querySelector<HTMLInputElement>(".icur-shadcn-input")!;
    const onValue = vi.fn();
    fixture.componentInstance.valueChange.subscribe(onValue);
    input.value = "123456";
    input.dispatchEvent(new Event("input", { bubbles: true }));
    fixture.detectChanges();
    expect(onValue).toHaveBeenCalledWith("1.234,56");
    expect(input.value).toBe("1.234,56");
  });

  it("ShadcnDatePicker: máscara DD/MM/AAAA emite YYYY-MM-DD", () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ShadcnDatePickerComponent],
      providers: [provideZonelessChangeDetection()]
    });
    const fixture = TestBed.createComponent(ShadcnDatePickerComponent);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.classList.contains("shadcn-date-picker")).toBe(true);
    const text = el.querySelector<HTMLInputElement>(".shadcn-date-picker__text")!;
    const onValue = vi.fn();
    fixture.componentInstance.valueChange.subscribe(onValue);
    text.value = "25/12/2026";
    text.dispatchEvent(new Event("input", { bubbles: true }));
    fixture.detectChanges();
    expect(onValue).toHaveBeenCalledWith("2026-12-25");
    expect(text.value).toBe("25/12/2026");
  });

  it("ShadcnTable: renderiza colunas, linhas e empty", () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ShadcnTableComponent],
      providers: [provideZonelessChangeDetection()]
    });
    const fixture = TestBed.createComponent(ShadcnTableComponent);
    fixture.componentRef.setInput("columns", [
      { key: "name", label: "Nome" },
      { key: "total", label: "Total", align: "right" }
    ]);
    fixture.componentRef.setInput("rows", [{ name: "Ana", total: 10 }]);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.classList.contains("shadcn-table-wrap")).toBe(true);
    const ths = el.querySelectorAll("thead th");
    expect(ths).toHaveLength(2);
    expect(ths[1].classList.contains("shadcn-table__th--right")).toBe(true);
    const cells = el.querySelectorAll("tbody td");
    expect(cells[0].textContent).toContain("Ana");
    expect(cells[1].textContent).toContain("10");
    // rows vazio → __empty
    fixture.componentRef.setInput("rows", []);
    fixture.detectChanges();
    expect(el.querySelector(".shadcn-table__empty")?.textContent).toContain("Nenhum registro.");
  });

  it("ShadcnSummaryTiles + Tile: grid var + tone/label/value", () => {
    @Component({
      standalone: true,
      imports: [ShadcnSummaryTilesComponent, ShadcnSummaryTileComponent],
      template: `
        <div arcanaShadcnSummaryTiles [columns]="4">
          <div arcanaShadcnSummaryTile label="Vendas" [value]="42" tone="positive"></div>
        </div>
      `
    })
    class TilesHost {}
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [TilesHost],
      providers: [provideZonelessChangeDetection()]
    });
    const fixture = TestBed.createComponent(TilesHost);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const grid = el.querySelector<HTMLElement>(".shadcn-summary-tiles")!;
    expect(grid.style.getPropertyValue("--shadcn-summary-tiles-cols")).toBe("4");
    const tile = el.querySelector(".shadcn-summary-tile")!;
    expect(tile.classList.contains("shadcn-summary-tile--positive")).toBe(true);
    expect(tile.querySelector(".shadcn-summary-tile__label")?.textContent).toContain("Vendas");
    expect(tile.querySelector(".shadcn-summary-tile__value")?.textContent).toContain("42");
  });

  it("ShadcnLoadingOverlay: mostra/esconde box conforme visible", () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ShadcnLoadingOverlayComponent],
      providers: [provideZonelessChangeDetection()]
    });
    const fixture = TestBed.createComponent(ShadcnLoadingOverlayComponent);
    fixture.componentRef.setInput("visible", true);
    fixture.componentRef.setInput("text", "Aguarde…");
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.classList.contains("shadcn-loading-overlay")).toBe(true);
    expect(el.querySelector(".shadcn-loading-overlay__text")?.textContent).toContain("Aguarde…");
    fixture.componentRef.setInput("visible", false);
    fixture.detectChanges();
    expect(el.style.display).toBe("none");
    expect(el.querySelector(".shadcn-loading-overlay__box")).toBeFalsy();
  });

  it("MultiSelectPopover: abre painel, carrega tab e alterna seleção", async () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [MultiSelectPopoverComponent],
      providers: [provideZonelessChangeDetection()]
    });
    const fixture = TestBed.createComponent(MultiSelectPopoverComponent);
    fixture.componentRef.setInput("tabs", [
      {
        key: "cities",
        label: "Cidades",
        fetch: () => Promise.resolve([{ id: 1, name: "Recife" }, { id: 2, name: "Olinda" }])
      }
    ]);
    fixture.componentRef.setInput("value", {});
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.classList.contains("msp")).toBe(true);
    const onValue = vi.fn();
    fixture.componentInstance.valueChange.subscribe(onValue);
    await fixture.componentInstance.open();
    fixture.detectChanges();
    const panel = document.body.querySelector(".msp-panel");
    expect(panel).toBeTruthy();
    const rows = panel!.querySelectorAll(".msp-item");
    expect(rows).toHaveLength(2);
    click(rows[0]);
    expect(onValue).toHaveBeenCalledWith({ cities: [1] });
    fixture.componentInstance.close();
    fixture.detectChanges();
    expect(document.body.querySelector(".msp-panel")).toBeFalsy();
  });

  // ── Lote 3 (final): overlay / composição ──────────────────────────────────

  // Remove qualquer portal remanescente no <body> entre testes (dialogs/dropdowns
  // teleportam pro body; se um teste falhar no meio, evita poluir o próximo).
  afterEach(() => {
    document.body
      .querySelectorAll(".shadcn-dialog-overlay, .shadcn-dropdown__menu, .msp-panel, .shadcn-select__panel")
      .forEach((n) => n.remove());
  });

  it("ShadcnDialog: teleporta pro body, projeta o conteúdo e fecha via footer {hide}", () => {
    @Component({
      standalone: true,
      imports: [ShadcnDialogComponent],
      template: `
        <div arcanaShadcnDialog #d title="Olá" description="Desc" [footerTemplate]="ft">
          <p class="dlg-body-marker">Corpo projetado</p>
        </div>
        <ng-template #ft let-hide>
          <button class="dlg-footer-btn" (click)="hide()">Fechar</button>
        </ng-template>
      `
    })
    class Host {
      @ViewChild("d") dialog!: ShadcnDialogComponent;
    }

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({ imports: [Host], providers: [provideZonelessChangeDetection()] });
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    expect(document.body.querySelector(".shadcn-dialog-overlay")).toBeFalsy();

    fixture.componentInstance.dialog.show();
    fixture.detectChanges();
    expect(document.body.querySelector(".shadcn-dialog-overlay")).toBeTruthy();
    const content = document.body.querySelector(".shadcn-dialog-content")!;
    expect(content.getAttribute("role")).toBe("dialog");
    expect(document.body.querySelector(".shadcn-dialog-title")?.textContent).toContain("Olá");
    // Projeção (<ng-content>) DENTRO da embedded view movida pro <body> funciona:
    expect(document.body.querySelector(".shadcn-dialog-body .dlg-body-marker")?.textContent)
      .toContain("Corpo projetado");

    const footerBtn = document.body.querySelector<HTMLElement>(".dlg-footer-btn");
    expect(footerBtn).toBeTruthy();
    click(footerBtn);
    fixture.detectChanges();
    expect(document.body.querySelector(".shadcn-dialog-overlay")).toBeFalsy();
  });

  it("ShadcnDropdown/Item: abre menu no body, herda size do pai e fecha ao clicar o item", () => {
    @Component({
      standalone: true,
      imports: [ShadcnDropdownComponent, ShadcnDropdownItemComponent],
      template: `
        <div arcanaShadcnDropdown #dd size="comfortable">
          <button arcanaDropdownTrigger class="dd-trigger">Abrir</button>
          <div arcanaShadcnDropdownItem (click)="hits = hits + 1">Renomear</div>
          <div arcanaShadcnDropdownItem [divided]="true" variant="danger">Deletar</div>
        </div>
      `
    })
    class Host {
      hits = 0;
      @ViewChild("dd") dd!: ShadcnDropdownComponent;
    }

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({ imports: [Host], providers: [provideZonelessChangeDetection()] });
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector(".shadcn-dropdown")).toBeTruthy();

    click(el.querySelector(".shadcn-dropdown__trigger"));
    fixture.detectChanges();
    const menu = document.body.querySelector(".shadcn-dropdown__menu");
    expect(menu).toBeTruthy();
    expect(menu!.classList.contains("shadcn-dropdown__menu--comfortable")).toBe(true);

    const items = menu!.querySelectorAll(".shadcn-dropdown-item");
    expect(items).toHaveLength(2);
    // size herdado do dropdown pai via inject(ShadcnDropdownComponent):
    expect(items[0].classList.contains("shadcn-dropdown-item--comfortable")).toBe(true);
    expect(items[1].classList.contains("shadcn-dropdown-item--danger")).toBe(true);
    expect(menu!.querySelector(".shadcn-dropdown-item__separator")).toBeTruthy();

    click(items[0]);
    fixture.detectChanges();
    expect(fixture.componentInstance.hits).toBe(1);
    expect(document.body.querySelector(".shadcn-dropdown__menu")).toBeFalsy();
  });

  it("ShadcnOnboardingPanel: emite classes e dispara action no clique da CTA", () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ShadcnOnboardingPanelComponent],
      providers: [provideZonelessChangeDetection()]
    });
    const fixture = TestBed.createComponent(ShadcnOnboardingPanelComponent);
    fixture.componentRef.setInput("icon", "fa-solid fa-clock");
    fixture.componentRef.setInput("title", "Configure horários");
    fixture.componentRef.setInput("actionLabel", "Adicionar");
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.classList.contains("shadcn-onboarding")).toBe(true);
    expect(el.querySelector(".shadcn-onboarding__title")?.textContent).toContain("Configure horários");
    const onAction = vi.fn();
    fixture.componentInstance.action.subscribe(onAction);
    click(el.querySelector(".shadcn-onboarding__cta"));
    expect(onAction).toHaveBeenCalledOnce();
  });

  it("SparkGridEmptyState: mostra o painel só após carregar e vazio sem filtro", () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [SparkGridEmptyStateComponent],
      providers: [provideZonelessChangeDetection()]
    });
    const fixture = TestBed.createComponent(SparkGridEmptyStateComponent);
    fixture.componentRef.setInput("total", 0);
    fixture.componentRef.setInput("loading", true);
    fixture.componentRef.setInput("filtered", false);
    fixture.componentRef.setInput("icon", "fa-solid fa-box");
    fixture.componentRef.setInput("title", "Nada aqui");
    fixture.componentRef.setInput("actionLabel", "Criar");
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.classList.contains("spark-grid-empty-state")).toBe(true);
    // Ainda carregando → sem painel.
    expect(el.querySelector(".shadcn-onboarding")).toBeFalsy();

    // Primeiro flip loading true → false arma o `loaded`.
    fixture.componentRef.setInput("loading", false);
    fixture.detectChanges();
    // Terminou de carregar, total 0, sem filtro → painel de onboarding aparece.
    expect(el.querySelector(".shadcn-onboarding")).toBeTruthy();
    expect(el.querySelector(".shadcn-onboarding__title")?.textContent).toContain("Nada aqui");
  });

  it("ShadcnSettingsList família: list > group (collapsible) > item com ação", () => {
    @Component({
      standalone: true,
      imports: [
        ShadcnSettingsListComponent,
        ShadcnSettingsListGroupComponent,
        ShadcnSettingsListItemComponent
      ],
      template: `
        <div arcanaShadcnSettingsList>
          <section
            arcanaShadcnSettingsListGroup
            #grp
            title="Pedidos"
            icon="fa-solid fa-cart-shopping"
            iconColor="indigo"
            [collapsible]="true"
            [defaultCollapsed]="true"
          >
            <div arcanaShadcnSettingsListItem label="Plano" caption="Config do plano">
              <span class="my-ctrl">Profissional</span>
            </div>
          </section>
        </div>
      `
    })
    class Host {
      @ViewChild("grp") grp!: ShadcnSettingsListGroupComponent;
    }

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({ imports: [Host], providers: [provideZonelessChangeDetection()] });
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector(".shadcn-settings-list")).toBeTruthy();
    const group = el.querySelector(".shadcn-settings-list__group")!;
    expect(group.classList.contains("shadcn-settings-list__group--collapsible")).toBe(true);
    expect(group.classList.contains("shadcn-settings-list__group--collapsed")).toBe(true);
    expect(el.querySelector(".shadcn-settings-list__group-title")?.textContent).toContain("Pedidos");
    expect(el.querySelector(".shadcn-settings-list__group-icon--indigo")).toBeTruthy();
    expect(el.querySelector(".shadcn-settings-list__label")?.textContent).toContain("Plano");
    expect(el.querySelector(".shadcn-settings-list__caption")?.textContent).toContain("Config do plano");
    expect(el.querySelector(".shadcn-settings-list__action .my-ctrl")).toBeTruthy();

    // Toggle expande.
    click(el.querySelector(".shadcn-settings-list__group-head"));
    fixture.detectChanges();
    expect(fixture.componentInstance.grp.isCollapsed).toBe(false);
    expect(group.classList.contains("shadcn-settings-list__group--collapsed")).toBe(false);
  });

  it("ShadcnSettingsEditableField: abre modal, edita o buffer e salva", () => {
    @Component({
      standalone: true,
      imports: [ShadcnSettingsEditableFieldComponent],
      template: `
        <div
          arcanaShadcnSettingsEditableField
          label="Nome"
          type="text"
          [value]="val"
          (valueChange)="val = $event"
          (save)="saved = $event"
        ></div>
      `
    })
    class Host {
      val = "Antigo";
      saved: unknown = null;
    }

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({ imports: [Host], providers: [provideZonelessChangeDetection()] });
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector(".shadcn-settings-list__current-value")?.textContent).toContain("Antigo");

    // Abre o modal.
    click(el.querySelector(".shadcn-settings-list__edit-btn"));
    fixture.detectChanges();
    expect(document.body.querySelector(".shadcn-dialog-overlay")).toBeTruthy();

    // Edita o input (buffer) e salva.
    const input = document.body.querySelector<HTMLInputElement>(".shadcn-dialog-body input.shadcn-input");
    expect(input).toBeTruthy();
    input!.value = "Novo";
    input!.dispatchEvent(new Event("input", { bubbles: true }));
    fixture.detectChanges();

    const saveBtn = Array.from(document.body.querySelectorAll<HTMLElement>(".shadcn-dialog-footer button"))
      .find((b) => (b.textContent ?? "").includes("Salvar"))!;
    click(saveBtn);
    fixture.detectChanges();
    expect(fixture.componentInstance.val).toBe("Novo");
    expect(fixture.componentInstance.saved).toBe("Novo");
    expect(document.body.querySelector(".shadcn-dialog-overlay")).toBeFalsy();
  });

  it("ShadcnRequiredFieldsDialog: lista os campos e teleporta pro body", () => {
    @Component({
      standalone: true,
      imports: [ShadcnRequiredFieldsDialogComponent],
      template: `
        <div arcanaShadcnRequiredFieldsDialog #rf [fields]="fields" description="Faltam"></div>
      `
    })
    class Host {
      fields = [
        { key: "a", label: "Nome", hint: "Passo 1" },
        { key: "b", label: "CPF", hint: "Passo 2" }
      ];
      @ViewChild("rf") rf!: ShadcnRequiredFieldsDialogComponent;
    }

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({ imports: [Host], providers: [provideZonelessChangeDetection()] });
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    fixture.componentInstance.rf.show();
    fixture.detectChanges();
    expect(document.body.querySelector(".rf-header")).toBeTruthy();
    expect(document.body.querySelectorAll(".rf-item")).toHaveLength(2);
    expect(document.body.querySelector(".rf-item__label")?.textContent).toContain("Nome");
    fixture.componentInstance.rf.hide();
    fixture.detectChanges();
    expect(document.body.querySelector(".shadcn-dialog-overlay")).toBeFalsy();
  });

  it("ShadcnSpecSheet família: sheet > section > field (valor + vazio)", () => {
    @Component({
      standalone: true,
      imports: [
        ShadcnSpecSheetComponent,
        ShadcnSpecSheetSectionComponent,
        ShadcnSpecSheetFieldComponent
      ],
      template: `
        <article arcanaShadcnSpecSheet docNum="Cadastro Nº 042" title="Popgás" metaLabel="Status">
          <section arcanaShadcnSpecSheetSection title="Dados" sectionNum="§ 01" icon="fa-solid fa-file" iconColor="blue">
            <div arcanaShadcnSpecSheetField label="Razão Social" value="Popgás LTDA"></div>
            <div arcanaShadcnSpecSheetField label="CNPJ"></div>
          </section>
        </article>
      `
    })
    class Host {}

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({ imports: [Host], providers: [provideZonelessChangeDetection()] });
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector(".shadcn-spec-sheet")).toBeTruthy();
    expect(el.querySelector(".shadcn-spec-sheet__doc-num")?.textContent).toContain("Cadastro Nº 042");
    expect(el.querySelector(".shadcn-spec-sheet__doc-title")?.textContent).toContain("Popgás");
    expect(el.querySelector(".shadcn-spec-sheet__meta-label")?.textContent).toContain("Status");

    const section = el.querySelector(".shadcn-spec-sheet__section")!;
    expect(section.querySelector(".shadcn-spec-sheet__section-icon--blue")).toBeTruthy();
    expect(section.querySelector(".shadcn-spec-sheet__section-num")?.textContent).toContain("§ 01");
    const grid = section.querySelector(".shadcn-spec-sheet__grid")!;
    expect(grid.classList.contains("shadcn-spec-sheet__grid--cols-2")).toBe(true);

    const fields = el.querySelectorAll(".shadcn-spec-sheet__field");
    expect(fields).toHaveLength(2);
    expect(fields[0].querySelector(".shadcn-spec-sheet__value")?.textContent).toContain("Popgás LTDA");
    const emptyValue = fields[1].querySelector(".shadcn-spec-sheet__value")!;
    expect(emptyValue.classList.contains("shadcn-spec-sheet__value--empty")).toBe(true);
    expect(emptyValue.textContent).toContain("Não informado");
  });
});
