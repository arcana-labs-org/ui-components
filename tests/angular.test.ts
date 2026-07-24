/**
 * Angular adapter tests: o pacote publicado é AOT (partial) compilado pelo `ngc`,
 * mas aqui os componentes rodam pelo compilador JIT do Angular (`@angular/compiler`
 * abaixo) pra que o TestBed compile os templates inline dentro do vitest. Zoneless
 * change detection mantém o zone.js fora.
 *
 * Smokes de ~9 componentes do lote 1: montam e emitem as classes `arcana-*` idênticas
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
  ArcanaInputCurrencyComponent,
  ArcanaMultiSelectPopoverComponent,
  ArcanaAccordionComponent,
  ArcanaAccordionItemComponent,
  ArcanaBadgeComponent,
  ArcanaButtonComponent,
  ArcanaCheckboxComponent,
  ArcanaDatePickerComponent,
  ArcanaDialogComponent,
  ArcanaDropdownComponent,
  ArcanaDropdownItemComponent,
  ArcanaInputBooleanComponent,
  ArcanaInputComponent,
  ArcanaInputMaskComponent,
  ArcanaLoadingOverlayComponent,
  ArcanaNoticeComponent,
  ArcanaNumberStepperComponent,
  ArcanaOnboardingPanelComponent,
  ArcanaRadioCardGroupComponent,
  ArcanaRequiredFieldsDialogComponent,
  ArcanaSegmentedOptionsComponent,
  ArcanaSelectComponent,
  ArcanaSettingsEditableFieldComponent,
  ArcanaSettingsListComponent,
  ArcanaSettingsListGroupComponent,
  ArcanaSettingsListItemComponent,
  ArcanaSpecSheetComponent,
  ArcanaSpecSheetFieldComponent,
  ArcanaSpecSheetSectionComponent,
  ArcanaSummaryTileComponent,
  ArcanaSummaryTilesComponent,
  ArcanaSwitchComponent,
  ArcanaSwitchSegmentedComponent,
  ArcanaTableComponent,
  ArcanaTabsComponent,
  ArcanaGridEmptyStateComponent
} from "../src/angular";

beforeAll(() => {
  TestBed.initTestEnvironment(BrowserTestingModule, platformBrowserTesting());
});

const click = (element: Element | null) =>
  element?.dispatchEvent(new MouseEvent("click", { bubbles: true }));

describe("Angular adapter", () => {
  it("ArcanaButton: emite as classes e o clique nativo do host chega ao consumidor", () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ArcanaButtonComponent],
      providers: [provideZonelessChangeDetection()]
    });
    const fixture = TestBed.createComponent(ArcanaButtonComponent);
    fixture.componentRef.setInput("variant", "ghost");
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLButtonElement;
    expect(el.classList.contains("arcana-button")).toBe(true);
    expect(el.classList.contains("arcana-button--ghost")).toBe(true);
    // O host É o próprio <button>: o clique DOM nativo é a API de clique.
    const clicked = vi.fn();
    el.addEventListener("click", clicked);
    el.click();
    expect(clicked).toHaveBeenCalledOnce();
  });

  it("ArcanaSwitch: toggla e emite valueChange/change", () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ArcanaSwitchComponent],
      providers: [provideZonelessChangeDetection()]
    });
    const fixture = TestBed.createComponent(ArcanaSwitchComponent);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLButtonElement;
    expect(el.classList.contains("arcana-switch")).toBe(true);
    expect(el.getAttribute("role")).toBe("switch");
    expect(el.querySelector(".arcana-switch__thumb")).toBeTruthy();
    const onValue = vi.fn();
    const onChange = vi.fn();
    fixture.componentInstance.valueChange.subscribe(onValue);
    fixture.componentInstance.change.subscribe(onChange);
    el.click();
    expect(onValue).toHaveBeenCalledWith(true);
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("ArcanaInput: reflete value e emite valueChange ao digitar", () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ArcanaInputComponent],
      providers: [provideZonelessChangeDetection()]
    });
    const fixture = TestBed.createComponent(ArcanaInputComponent);
    fixture.componentRef.setInput("value", "abc");
    fixture.componentRef.setInput("size", "lg");
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLInputElement;
    expect(el.classList.contains("arcana-input")).toBe(true);
    expect(el.classList.contains("arcana-input--lg")).toBe(true);
    expect(el.value).toBe("abc");
    const onValue = vi.fn();
    fixture.componentInstance.valueChange.subscribe(onValue);
    el.value = "hello";
    el.dispatchEvent(new Event("input", { bubbles: true }));
    expect(onValue).toHaveBeenCalledWith("hello");
  });

  it("ArcanaInput: parseia number (vazio → null, válido → number)", () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ArcanaInputComponent],
      providers: [provideZonelessChangeDetection()]
    });
    const fixture = TestBed.createComponent(ArcanaInputComponent);
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

  it("ArcanaBadge: emite classes + dot", () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ArcanaBadgeComponent],
      providers: [provideZonelessChangeDetection()]
    });
    const fixture = TestBed.createComponent(ArcanaBadgeComponent);
    fixture.componentRef.setInput("variant", "green");
    fixture.componentRef.setInput("dot", true);
    fixture.componentRef.setInput("size", "sm");
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.classList.contains("arcana-badge")).toBe(true);
    expect(el.classList.contains("arcana-badge--green")).toBe(true);
    expect(el.classList.contains("arcana-badge--sm")).toBe(true);
    expect(el.querySelector(".arcana-badge__dot")).toBeTruthy();
  });

  it("ArcanaCheckbox: input nativo + toggle emite valueChange", () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ArcanaCheckboxComponent],
      providers: [provideZonelessChangeDetection()]
    });
    const fixture = TestBed.createComponent(ArcanaCheckboxComponent);
    fixture.componentRef.setInput("label", "Aceito");
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.classList.contains("arcana-checkbox")).toBe(true);
    expect(el.querySelector(".arcana-checkbox__label")?.textContent).toContain("Aceito");
    const input = el.querySelector<HTMLInputElement>("input.arcana-checkbox__input")!;
    expect(input.type).toBe("checkbox");
    const onValue = vi.fn();
    fixture.componentInstance.valueChange.subscribe(onValue);
    input.checked = true;
    input.dispatchEvent(new Event("change", { bubbles: true }));
    expect(onValue).toHaveBeenCalledWith(true);
  });

  it("ArcanaNotice: variant + dismiss", () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ArcanaNoticeComponent],
      providers: [provideZonelessChangeDetection()]
    });
    const fixture = TestBed.createComponent(ArcanaNoticeComponent);
    fixture.componentRef.setInput("variant", "warning");
    fixture.componentRef.setInput("title", "Atenção");
    fixture.componentRef.setInput("dismissible", true);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.classList.contains("arcana-notice")).toBe(true);
    expect(el.classList.contains("arcana-notice--warning")).toBe(true);
    expect(el.querySelector(".arcana-notice__title")?.textContent).toContain("Atenção");
    expect(el.querySelector(".arcana-notice__icon .fa-triangle-exclamation")).toBeTruthy();
    const dismissed = vi.fn();
    fixture.componentInstance.dismiss.subscribe(dismissed);
    click(el.querySelector(".arcana-notice__close"));
    expect(dismissed).toHaveBeenCalledOnce();
  });

  it("ArcanaSegmentedOptions: renderiza opções e seleciona", () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ArcanaSegmentedOptionsComponent],
      providers: [provideZonelessChangeDetection()]
    });
    const fixture = TestBed.createComponent(ArcanaSegmentedOptionsComponent);
    fixture.componentRef.setInput("value", "a");
    fixture.componentRef.setInput("options", [
      { label: "A", value: "a" },
      { label: "B", value: "b" }
    ]);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.classList.contains("arcana-segmented-options")).toBe(true);
    const options = el.querySelectorAll(".arcana-segmented-options__option");
    expect(options).toHaveLength(2);
    expect(options[0].classList.contains("is-active")).toBe(true);
    const onValue = vi.fn();
    fixture.componentInstance.valueChange.subscribe(onValue);
    click(options[1]);
    expect(onValue).toHaveBeenCalledWith("b");
  });

  it("ArcanaTabs: triggers + painel ativo via *arcanaTabPanel", () => {
    @Component({
      standalone: true,
      imports: [ArcanaTabsComponent, ArcanaTabPanelDirective],
      template: `
        <div arcanaTabs variant="underline" [tabs]="tabs" [value]="active" (valueChange)="active = $event">
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
    const root = el.querySelector(".arcana-tabs")!;
    expect(root.classList.contains("arcana-tabs--underline")).toBe(true);
    const triggers = el.querySelectorAll(".arcana-tabs__trigger");
    expect(triggers).toHaveLength(2);
    expect(triggers[0].classList.contains("is-active")).toBe(true);
    expect(el.querySelector(".arcana-tabs__panel")?.textContent).toContain("Painel Home");
    click(triggers[1]);
    fixture.detectChanges();
    expect(triggers[1].classList.contains("is-active")).toBe(true);
    expect(el.querySelector(".arcana-tabs__panel")?.textContent).toContain("Painel Pedidos");
  });

  it("ArcanaAccordion: abre/fecha itens (single-open)", () => {
    @Component({
      standalone: true,
      imports: [ArcanaAccordionComponent, ArcanaAccordionItemComponent],
      template: `
        <div arcanaAccordion [value]="open" (valueChange)="open = $event">
          <div arcanaAccordionItem name="a" title="A">Corpo A</div>
          <div arcanaAccordionItem name="b" title="B">Corpo B</div>
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
    const items = el.querySelectorAll(".arcana-accordion-item");
    expect(items).toHaveLength(2);
    expect(items[0].classList.contains("open")).toBe(false);
    click(items[0].querySelector(".arcana-accordion-trigger"));
    fixture.detectChanges();
    expect(items[0].classList.contains("open")).toBe(true);
    // single-open: abrir B fecha A
    click(items[1].querySelector(".arcana-accordion-trigger"));
    fixture.detectChanges();
    expect(items[1].classList.contains("open")).toBe(true);
    expect(items[0].classList.contains("open")).toBe(false);
  });

  // ── Lote 2 ─────────────────────────────────────────────────────────────────

  it("ArcanaSelect: abre painel no body, seleciona item e emite valueChange", () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ArcanaSelectComponent],
      providers: [provideZonelessChangeDetection()]
    });
    const fixture = TestBed.createComponent(ArcanaSelectComponent);
    fixture.componentRef.setInput("value", "a");
    fixture.componentRef.setInput("options", [
      { label: "Opção A", value: "a" },
      { label: "Opção B", value: "b" }
    ]);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.classList.contains("arcana-select")).toBe(true);
    expect(el.querySelector(".arcana-select__label")?.textContent).toContain("Opção A");
    // Abre: painel é teleportado pro document.body.
    click(el.querySelector(".arcana-select__trigger"));
    fixture.detectChanges();
    const panel = document.body.querySelector(".arcana-select__panel");
    expect(panel).toBeTruthy();
    const items = panel!.querySelectorAll(".arcana-select__item");
    expect(items).toHaveLength(2);
    expect(items[0].classList.contains("is-selected")).toBe(true);
    const onValue = vi.fn();
    fixture.componentInstance.valueChange.subscribe(onValue);
    click(items[1]);
    fixture.detectChanges();
    expect(onValue).toHaveBeenCalledWith("b");
    // Fechou: painel removido do body.
    expect(document.body.querySelector(".arcana-select__panel")).toBeFalsy();
  });

  it("ArcanaInputBoolean: monta Sim/Não/Todos no Select interno", () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ArcanaInputBooleanComponent],
      providers: [provideZonelessChangeDetection()]
    });
    const fixture = TestBed.createComponent(ArcanaInputBooleanComponent);
    fixture.componentRef.setInput("value", true);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const select = el.querySelector(".arcana-select");
    expect(select).toBeTruthy();
    expect(select!.querySelector(".arcana-select__label")?.textContent).toContain("Sim");
    click(el.querySelector(".arcana-select__trigger"));
    fixture.detectChanges();
    const labels = Array.from(
      document.body.querySelectorAll(".arcana-select__item-label")
    ).map((n) => n.textContent?.trim());
    expect(labels).toEqual(["Todos", "Sim", "Não"]);
    document.body.querySelectorAll(".arcana-select__panel").forEach((p) => p.remove());
  });

  it("ArcanaNumberStepper: incrementa/decrementa e respeita min/max", () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ArcanaNumberStepperComponent],
      providers: [provideZonelessChangeDetection()]
    });
    const fixture = TestBed.createComponent(ArcanaNumberStepperComponent);
    fixture.componentRef.setInput("value", 1);
    fixture.componentRef.setInput("min", 1);
    fixture.componentRef.setInput("max", 2);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.classList.contains("arcana-number-stepper")).toBe(true);
    const dec = el.querySelector<HTMLButtonElement>(".arcana-number-stepper__btn--decrement")!;
    const inc = el.querySelector<HTMLButtonElement>(".arcana-number-stepper__btn--increment")!;
    expect(dec.disabled).toBe(true); // value === min
    const onValue = vi.fn();
    fixture.componentInstance.valueChange.subscribe(onValue);
    click(inc);
    expect(onValue).toHaveBeenCalledWith(2);
  });

  it("ArcanaRadioCardGroup: renderiza cards e seleciona via input nativo", () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ArcanaRadioCardGroupComponent],
      providers: [provideZonelessChangeDetection()]
    });
    const fixture = TestBed.createComponent(ArcanaRadioCardGroupComponent);
    fixture.componentRef.setInput("value", "x");
    fixture.componentRef.setInput("options", [
      { label: "X", value: "x" },
      { label: "Y", value: "y" }
    ]);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.classList.contains("arcana-radio-card-group")).toBe(true);
    const cards = el.querySelectorAll(".arcana-radio-card");
    expect(cards).toHaveLength(2);
    expect(cards[0].classList.contains("is-selected")).toBe(true);
    const onValue = vi.fn();
    fixture.componentInstance.valueChange.subscribe(onValue);
    const input = cards[1].querySelector<HTMLInputElement>("input.arcana-radio-card__input")!;
    input.checked = true;
    input.dispatchEvent(new Event("change", { bubbles: true }));
    expect(onValue).toHaveBeenCalledWith("y");
  });

  it("ArcanaSwitchSegmented: toggla e emite valueChange", () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ArcanaSwitchSegmentedComponent],
      providers: [provideZonelessChangeDetection()]
    });
    const fixture = TestBed.createComponent(ArcanaSwitchSegmentedComponent);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.classList.contains("arcana-switch-segmented")).toBe(true);
    expect(el.getAttribute("role")).toBe("switch");
    expect(el.querySelector(".arcana-switch-segmented__option--on")?.textContent).toContain("Ativo");
    const onValue = vi.fn();
    fixture.componentInstance.valueChange.subscribe(onValue);
    el.click();
    expect(onValue).toHaveBeenCalledWith(true);
  });

  it("ArcanaInputMask: formata display e emite raw sem separadores", () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ArcanaInputMaskComponent],
      providers: [provideZonelessChangeDetection()]
    });
    const fixture = TestBed.createComponent(ArcanaInputMaskComponent);
    fixture.componentRef.setInput("mask", "##.##");
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLInputElement;
    expect(el.classList.contains("arcana-input")).toBe(true);
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
      imports: [ArcanaInputCurrencyComponent],
      providers: [provideZonelessChangeDetection()]
    });
    const fixture = TestBed.createComponent(ArcanaInputCurrencyComponent);
    fixture.componentRef.setInput("shadcn", true);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.classList.contains("icur-arcana-field")).toBe(true);
    const input = el.querySelector<HTMLInputElement>(".icur-arcana-input")!;
    const onValue = vi.fn();
    fixture.componentInstance.valueChange.subscribe(onValue);
    input.value = "123456";
    input.dispatchEvent(new Event("input", { bubbles: true }));
    fixture.detectChanges();
    expect(onValue).toHaveBeenCalledWith("1.234,56");
    expect(input.value).toBe("1.234,56");
  });

  it("ArcanaDatePicker: máscara DD/MM/AAAA emite YYYY-MM-DD", () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ArcanaDatePickerComponent],
      providers: [provideZonelessChangeDetection()]
    });
    const fixture = TestBed.createComponent(ArcanaDatePickerComponent);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.classList.contains("arcana-date-picker")).toBe(true);
    const text = el.querySelector<HTMLInputElement>(".arcana-date-picker__text")!;
    const onValue = vi.fn();
    fixture.componentInstance.valueChange.subscribe(onValue);
    text.value = "25/12/2026";
    text.dispatchEvent(new Event("input", { bubbles: true }));
    fixture.detectChanges();
    expect(onValue).toHaveBeenCalledWith("2026-12-25");
    expect(text.value).toBe("25/12/2026");
  });

  it("ArcanaTable: renderiza colunas, linhas e empty", () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ArcanaTableComponent],
      providers: [provideZonelessChangeDetection()]
    });
    const fixture = TestBed.createComponent(ArcanaTableComponent);
    fixture.componentRef.setInput("columns", [
      { key: "name", label: "Nome" },
      { key: "total", label: "Total", align: "right" }
    ]);
    fixture.componentRef.setInput("rows", [{ name: "Ana", total: 10 }]);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.classList.contains("arcana-table-wrap")).toBe(true);
    const ths = el.querySelectorAll("thead th");
    expect(ths).toHaveLength(2);
    expect(ths[1].classList.contains("arcana-table__th--right")).toBe(true);
    const cells = el.querySelectorAll("tbody td");
    expect(cells[0].textContent).toContain("Ana");
    expect(cells[1].textContent).toContain("10");
    // rows vazio → __empty
    fixture.componentRef.setInput("rows", []);
    fixture.detectChanges();
    expect(el.querySelector(".arcana-table__empty")?.textContent).toContain("Nenhum registro.");
  });

  it("ArcanaSummaryTiles + Tile: grid var + tone/label/value", () => {
    @Component({
      standalone: true,
      imports: [ArcanaSummaryTilesComponent, ArcanaSummaryTileComponent],
      template: `
        <div arcanaSummaryTiles [columns]="4">
          <div arcanaSummaryTile label="Vendas" [value]="42" tone="positive"></div>
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
    const grid = el.querySelector<HTMLElement>(".arcana-summary-tiles")!;
    expect(grid.style.getPropertyValue("--arcana-summary-tiles-cols")).toBe("4");
    const tile = el.querySelector(".arcana-summary-tile")!;
    expect(tile.classList.contains("arcana-summary-tile--positive")).toBe(true);
    expect(tile.querySelector(".arcana-summary-tile__label")?.textContent).toContain("Vendas");
    expect(tile.querySelector(".arcana-summary-tile__value")?.textContent).toContain("42");
  });

  it("ArcanaLoadingOverlay: mostra/esconde box conforme visible", () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ArcanaLoadingOverlayComponent],
      providers: [provideZonelessChangeDetection()]
    });
    const fixture = TestBed.createComponent(ArcanaLoadingOverlayComponent);
    fixture.componentRef.setInput("visible", true);
    fixture.componentRef.setInput("text", "Aguarde…");
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.classList.contains("arcana-loading-overlay")).toBe(true);
    expect(el.querySelector(".arcana-loading-overlay__text")?.textContent).toContain("Aguarde…");
    fixture.componentRef.setInput("visible", false);
    fixture.detectChanges();
    expect(el.style.display).toBe("none");
    expect(el.querySelector(".arcana-loading-overlay__box")).toBeFalsy();
  });

  it("MultiSelectPopover: abre painel, carrega tab e alterna seleção", async () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ArcanaMultiSelectPopoverComponent],
      providers: [provideZonelessChangeDetection()]
    });
    const fixture = TestBed.createComponent(ArcanaMultiSelectPopoverComponent);
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
      .querySelectorAll(".arcana-dialog-overlay, .arcana-dropdown__menu, .msp-panel, .arcana-select__panel")
      .forEach((n) => n.remove());
  });

  it("ArcanaDialog: teleporta pro body, projeta o conteúdo e fecha via footer {hide}", () => {
    @Component({
      standalone: true,
      imports: [ArcanaDialogComponent],
      template: `
        <div arcanaDialog #d title="Olá" description="Desc" [footerTemplate]="ft">
          <p class="dlg-body-marker">Corpo projetado</p>
        </div>
        <ng-template #ft let-hide>
          <button class="dlg-footer-btn" (click)="hide()">Fechar</button>
        </ng-template>
      `
    })
    class Host {
      @ViewChild("d") dialog!: ArcanaDialogComponent;
    }

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({ imports: [Host], providers: [provideZonelessChangeDetection()] });
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    expect(document.body.querySelector(".arcana-dialog-overlay")).toBeFalsy();

    fixture.componentInstance.dialog.show();
    fixture.detectChanges();
    expect(document.body.querySelector(".arcana-dialog-overlay")).toBeTruthy();
    const content = document.body.querySelector(".arcana-dialog-content")!;
    expect(content.getAttribute("role")).toBe("dialog");
    expect(document.body.querySelector(".arcana-dialog-title")?.textContent).toContain("Olá");
    // Projeção (<ng-content>) DENTRO da embedded view movida pro <body> funciona:
    expect(document.body.querySelector(".arcana-dialog-body .dlg-body-marker")?.textContent)
      .toContain("Corpo projetado");

    const footerBtn = document.body.querySelector<HTMLElement>(".dlg-footer-btn");
    expect(footerBtn).toBeTruthy();
    click(footerBtn);
    fixture.detectChanges();
    expect(document.body.querySelector(".arcana-dialog-overlay")).toBeFalsy();
  });

  it("ArcanaDropdown/Item: abre menu no body, herda size do pai e fecha ao clicar o item", () => {
    @Component({
      standalone: true,
      imports: [ArcanaDropdownComponent, ArcanaDropdownItemComponent],
      template: `
        <div arcanaDropdown #dd size="comfortable">
          <button arcanaDropdownTrigger class="dd-trigger">Abrir</button>
          <div arcanaDropdownItem (click)="hits = hits + 1">Renomear</div>
          <div arcanaDropdownItem [divided]="true" variant="danger">Deletar</div>
        </div>
      `
    })
    class Host {
      hits = 0;
      @ViewChild("dd") dd!: ArcanaDropdownComponent;
    }

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({ imports: [Host], providers: [provideZonelessChangeDetection()] });
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector(".arcana-dropdown")).toBeTruthy();

    click(el.querySelector(".arcana-dropdown__trigger"));
    fixture.detectChanges();
    const menu = document.body.querySelector(".arcana-dropdown__menu");
    expect(menu).toBeTruthy();
    expect(menu!.classList.contains("arcana-dropdown__menu--comfortable")).toBe(true);

    const items = menu!.querySelectorAll(".arcana-dropdown-item");
    expect(items).toHaveLength(2);
    // size herdado do dropdown pai via inject(ArcanaDropdownComponent):
    expect(items[0].classList.contains("arcana-dropdown-item--comfortable")).toBe(true);
    expect(items[1].classList.contains("arcana-dropdown-item--danger")).toBe(true);
    expect(menu!.querySelector(".arcana-dropdown-item__separator")).toBeTruthy();

    click(items[0]);
    fixture.detectChanges();
    expect(fixture.componentInstance.hits).toBe(1);
    expect(document.body.querySelector(".arcana-dropdown__menu")).toBeFalsy();
  });

  it("ArcanaOnboardingPanel: emite classes e dispara action no clique da CTA", () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ArcanaOnboardingPanelComponent],
      providers: [provideZonelessChangeDetection()]
    });
    const fixture = TestBed.createComponent(ArcanaOnboardingPanelComponent);
    fixture.componentRef.setInput("icon", "fa-solid fa-clock");
    fixture.componentRef.setInput("title", "Configure horários");
    fixture.componentRef.setInput("actionLabel", "Adicionar");
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.classList.contains("arcana-onboarding")).toBe(true);
    expect(el.querySelector(".arcana-onboarding__title")?.textContent).toContain("Configure horários");
    const onAction = vi.fn();
    fixture.componentInstance.action.subscribe(onAction);
    click(el.querySelector(".arcana-onboarding__cta"));
    expect(onAction).toHaveBeenCalledOnce();
  });

  it("ArcanaGridEmptyState: mostra o painel só após carregar e vazio sem filtro", () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ArcanaGridEmptyStateComponent],
      providers: [provideZonelessChangeDetection()]
    });
    const fixture = TestBed.createComponent(ArcanaGridEmptyStateComponent);
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
    expect(el.querySelector(".arcana-onboarding")).toBeFalsy();

    // Primeiro flip loading true → false arma o `loaded`.
    fixture.componentRef.setInput("loading", false);
    fixture.detectChanges();
    // Terminou de carregar, total 0, sem filtro → painel de onboarding aparece.
    expect(el.querySelector(".arcana-onboarding")).toBeTruthy();
    expect(el.querySelector(".arcana-onboarding__title")?.textContent).toContain("Nada aqui");
  });

  it("ArcanaSettingsList família: list > group (collapsible) > item com ação", () => {
    @Component({
      standalone: true,
      imports: [
        ArcanaSettingsListComponent,
        ArcanaSettingsListGroupComponent,
        ArcanaSettingsListItemComponent
      ],
      template: `
        <div arcanaSettingsList>
          <section
            arcanaSettingsListGroup
            #grp
            title="Pedidos"
            icon="fa-solid fa-cart-shopping"
            iconColor="indigo"
            [collapsible]="true"
            [defaultCollapsed]="true"
          >
            <div arcanaSettingsListItem label="Plano" caption="Config do plano">
              <span class="my-ctrl">Profissional</span>
            </div>
          </section>
        </div>
      `
    })
    class Host {
      @ViewChild("grp") grp!: ArcanaSettingsListGroupComponent;
    }

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({ imports: [Host], providers: [provideZonelessChangeDetection()] });
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector(".arcana-settings-list")).toBeTruthy();
    const group = el.querySelector(".arcana-settings-list__group")!;
    expect(group.classList.contains("arcana-settings-list__group--collapsible")).toBe(true);
    expect(group.classList.contains("arcana-settings-list__group--collapsed")).toBe(true);
    expect(el.querySelector(".arcana-settings-list__group-title")?.textContent).toContain("Pedidos");
    expect(el.querySelector(".arcana-settings-list__group-icon--indigo")).toBeTruthy();
    expect(el.querySelector(".arcana-settings-list__label")?.textContent).toContain("Plano");
    expect(el.querySelector(".arcana-settings-list__caption")?.textContent).toContain("Config do plano");
    expect(el.querySelector(".arcana-settings-list__action .my-ctrl")).toBeTruthy();

    // Toggle expande.
    click(el.querySelector(".arcana-settings-list__group-head"));
    fixture.detectChanges();
    expect(fixture.componentInstance.grp.isCollapsed).toBe(false);
    expect(group.classList.contains("arcana-settings-list__group--collapsed")).toBe(false);
  });

  it("ArcanaSettingsEditableField: abre modal, edita o buffer e salva", () => {
    @Component({
      standalone: true,
      imports: [ArcanaSettingsEditableFieldComponent],
      template: `
        <div
          arcanaSettingsEditableField
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
    expect(el.querySelector(".arcana-settings-list__current-value")?.textContent).toContain("Antigo");

    // Abre o modal.
    click(el.querySelector(".arcana-settings-list__edit-btn"));
    fixture.detectChanges();
    expect(document.body.querySelector(".arcana-dialog-overlay")).toBeTruthy();

    // Edita o input (buffer) e salva.
    const input = document.body.querySelector<HTMLInputElement>(".arcana-dialog-body input.arcana-input");
    expect(input).toBeTruthy();
    input!.value = "Novo";
    input!.dispatchEvent(new Event("input", { bubbles: true }));
    fixture.detectChanges();

    const saveBtn = Array.from(document.body.querySelectorAll<HTMLElement>(".arcana-dialog-footer button"))
      .find((b) => (b.textContent ?? "").includes("Salvar"))!;
    click(saveBtn);
    fixture.detectChanges();
    expect(fixture.componentInstance.val).toBe("Novo");
    expect(fixture.componentInstance.saved).toBe("Novo");
    expect(document.body.querySelector(".arcana-dialog-overlay")).toBeFalsy();
  });

  it("ArcanaRequiredFieldsDialog: lista os campos e teleporta pro body", () => {
    @Component({
      standalone: true,
      imports: [ArcanaRequiredFieldsDialogComponent],
      template: `
        <div arcanaRequiredFieldsDialog #rf [fields]="fields" description="Faltam"></div>
      `
    })
    class Host {
      fields = [
        { key: "a", label: "Nome", hint: "Passo 1" },
        { key: "b", label: "CPF", hint: "Passo 2" }
      ];
      @ViewChild("rf") rf!: ArcanaRequiredFieldsDialogComponent;
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
    expect(document.body.querySelector(".arcana-dialog-overlay")).toBeFalsy();
  });

  it("ArcanaSpecSheet família: sheet > section > field (valor + vazio)", () => {
    @Component({
      standalone: true,
      imports: [
        ArcanaSpecSheetComponent,
        ArcanaSpecSheetSectionComponent,
        ArcanaSpecSheetFieldComponent
      ],
      template: `
        <article arcanaSpecSheet docNum="Cadastro Nº 042" title="Popgás" metaLabel="Status">
          <section arcanaSpecSheetSection title="Dados" sectionNum="§ 01" icon="fa-solid fa-file" iconColor="blue">
            <div arcanaSpecSheetField label="Razão Social" value="Popgás LTDA"></div>
            <div arcanaSpecSheetField label="CNPJ"></div>
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
    expect(el.querySelector(".arcana-spec-sheet")).toBeTruthy();
    expect(el.querySelector(".arcana-spec-sheet__doc-num")?.textContent).toContain("Cadastro Nº 042");
    expect(el.querySelector(".arcana-spec-sheet__doc-title")?.textContent).toContain("Popgás");
    expect(el.querySelector(".arcana-spec-sheet__meta-label")?.textContent).toContain("Status");

    const section = el.querySelector(".arcana-spec-sheet__section")!;
    expect(section.querySelector(".arcana-spec-sheet__section-icon--blue")).toBeTruthy();
    expect(section.querySelector(".arcana-spec-sheet__section-num")?.textContent).toContain("§ 01");
    const grid = section.querySelector(".arcana-spec-sheet__grid")!;
    expect(grid.classList.contains("arcana-spec-sheet__grid--cols-2")).toBe(true);

    const fields = el.querySelectorAll(".arcana-spec-sheet__field");
    expect(fields).toHaveLength(2);
    expect(fields[0].querySelector(".arcana-spec-sheet__value")?.textContent).toContain("Popgás LTDA");
    const emptyValue = fields[1].querySelector(".arcana-spec-sheet__value")!;
    expect(emptyValue.classList.contains("arcana-spec-sheet__value--empty")).toBe(true);
    expect(emptyValue.textContent).toContain("Não informado");
  });
});
