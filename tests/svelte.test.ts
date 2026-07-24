import { flushSync, mount, unmount } from "svelte";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  InputCurrency,
  MultiSelectPopover,
  ShadcnBadge,
  ShadcnButton,
  ShadcnCheckbox,
  ShadcnDatePicker,
  ShadcnInput,
  ShadcnInputBoolean,
  ShadcnInputMask,
  ShadcnLoadingOverlay,
  ShadcnNumberStepper,
  ShadcnOnboardingPanel,
  ShadcnRadioCardGroup,
  ShadcnRequiredFieldsDialog,
  ShadcnSegmentedOptions,
  ShadcnSelect,
  ShadcnSettingsEditableField,
  ShadcnSummaryTile,
  ShadcnSummaryTiles,
  ShadcnSwitch,
  ShadcnSwitchSegmented,
  ShadcnTable,
  ShadcnTabs,
} from "../src/svelte";
import DropdownFixture from "./fixtures/DropdownFixture.svelte";
import DialogFixture from "./fixtures/DialogFixture.svelte";
import SettingsFixture from "./fixtures/SettingsFixture.svelte";
import SpecSheetFixture from "./fixtures/SpecSheetFixture.svelte";
import SparkFixture from "./fixtures/SparkFixture.svelte";

let cleanups: Array<() => void> = [];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function render(Component: any, props: Record<string, unknown>) {
  const target = document.createElement("div");
  document.body.appendChild(target);
  const component = mount(Component, { target, props });
  flushSync();
  cleanups.push(() => {
    unmount(component);
    target.remove();
  });
  return { target, component };
}

const click = (element: Element | null) => {
  element?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  flushSync();
};

afterEach(() => {
  cleanups.forEach((cleanup) => cleanup());
  cleanups = [];
});

describe("Svelte adapter — lote 1", () => {
  it("ShadcnButton emits shadcn classes and forwards click", () => {
    const onClick = vi.fn();
    const { target } = render(ShadcnButton, { variant: "destructive", disabled: false, onClick });
    const button = target.querySelector("button.shadcn-button")!;
    expect(button.classList.contains("shadcn-button--destructive")).toBe(true);
    expect(button.getAttribute("type")).toBe("button");
    click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("ShadcnBadge emits the badge classes and optional dot", () => {
    const { target } = render(ShadcnBadge, { variant: "blue", size: "sm", dot: true });
    const badge = target.querySelector("span.shadcn-badge")!;
    expect(badge.classList.contains("shadcn-badge--blue")).toBe(true);
    expect(badge.classList.contains("shadcn-badge--sm")).toBe(true);
    expect(badge.querySelector(".shadcn-badge__dot")).toBeTruthy();
  });

  it("ShadcnSwitch toggles and calls onValueChange", () => {
    const onValueChange = vi.fn();
    const onChange = vi.fn();
    const { target } = render(ShadcnSwitch, { value: false, onValueChange, onChange });
    const button = target.querySelector('button[role="switch"].shadcn-switch')!;
    expect(button.getAttribute("aria-checked")).toBe("false");
    expect(button.querySelector(".shadcn-switch__thumb")).toBeTruthy();
    click(button);
    expect(onValueChange).toHaveBeenCalledWith(true);
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("ShadcnCheckbox uses a native input and reports the checked change", () => {
    const onValueChange = vi.fn();
    const { target } = render(ShadcnCheckbox, { value: false, label: "Aceito", onValueChange });
    const label = target.querySelector("label.shadcn-checkbox")!;
    expect(label.querySelector(".shadcn-checkbox__label")?.textContent).toContain("Aceito");
    const input = target.querySelector<HTMLInputElement>("input.shadcn-checkbox__input")!;
    input.checked = true;
    input.dispatchEvent(new Event("change", { bubbles: true }));
    flushSync();
    expect(onValueChange).toHaveBeenCalledWith(true);
  });

  it("ShadcnInput emits parsed value on input (number → number)", () => {
    const onValueChange = vi.fn();
    const { target } = render(ShadcnInput, { value: "", type: "number", size: "lg", onValueChange });
    const input = target.querySelector<HTMLInputElement>("input.shadcn-input")!;
    expect(input.classList.contains("shadcn-input--lg")).toBe(true);
    input.value = "42";
    input.dispatchEvent(new Event("input", { bubbles: true }));
    flushSync();
    expect(onValueChange).toHaveBeenCalledWith(42);
  });

  it("ShadcnSegmentedOptions renders options and selects on click", () => {
    const onValueChange = vi.fn();
    const { target } = render(ShadcnSegmentedOptions, {
      value: "a",
      options: [
        { label: "Ativo", value: "a" },
        { label: "Baixado", value: "b" },
      ],
      onValueChange,
    });
    const options = target.querySelectorAll("button.shadcn-segmented-options__option");
    expect(options).toHaveLength(2);
    expect(options[0].classList.contains("is-active")).toBe(true);
    click(options[1]);
    expect(onValueChange).toHaveBeenCalledWith("b");
  });

  it("ShadcnTabs renders triggers, marks the active one and selects another", () => {
    const onValueChange = vi.fn();
    const { target } = render(ShadcnTabs, {
      value: "data",
      variant: "pills",
      tabs: [
        { name: "data", label: "Dados" },
        { name: "brand", label: "Branding" },
      ],
      onValueChange,
    });
    expect(target.querySelector(".shadcn-tabs.shadcn-tabs--pills")).toBeTruthy();
    const triggers = target.querySelectorAll('button.shadcn-tabs__trigger[role="tab"]');
    expect(triggers).toHaveLength(2);
    expect(triggers[0].classList.contains("is-active")).toBe(true);
    expect(triggers[0].getAttribute("aria-selected")).toBe("true");
    click(triggers[1]);
    expect(onValueChange).toHaveBeenCalledWith("brand");
  });
});

const setInput = (input: HTMLInputElement | null, value: string) => {
  if (!input) return;
  input.value = value;
  input.dispatchEvent(new Event("input", { bubbles: true }));
  flushSync();
};

describe("Svelte adapter — lote 2", () => {
  it("ShadcnSelect opens a portaled panel and selects an option", () => {
    const onValueChange = vi.fn();
    const { target } = render(ShadcnSelect, {
      value: null,
      options: [
        { label: "Ativo", value: "a" },
        { label: "Baixado", value: "b" },
      ],
      onValueChange,
    });
    const root = target.querySelector(".shadcn-select")!;
    expect(root.classList.contains("shadcn-select--md")).toBe(true);
    const trigger = target.querySelector("button.shadcn-select__trigger")!;
    expect(target.querySelector(".shadcn-select__panel")).toBeNull();
    click(trigger);
    // Panel is teleported to document.body (not inside target).
    const panel = document.body.querySelector(".shadcn-select__panel")!;
    expect(panel).toBeTruthy();
    const items = panel.querySelectorAll("li.shadcn-select__item");
    expect(items).toHaveLength(2);
    click(items[1]);
    expect(onValueChange).toHaveBeenCalledWith("b");
    // Panel closes after single-select.
    expect(document.body.querySelector(".shadcn-select__panel")).toBeNull();
  });

  it("ShadcnInputBoolean renders a select showing the mapped label", () => {
    const { target } = render(ShadcnInputBoolean, { value: 1, variation: "status" });
    const label = target.querySelector(".shadcn-select__label")!;
    expect(label.textContent?.trim()).toBe("Ativo");
  });

  it("ShadcnNumberStepper increments and clamps to max", () => {
    const onValueChange = vi.fn();
    const { target } = render(ShadcnNumberStepper, {
      value: 9,
      min: 0,
      max: 10,
      onValueChange,
    });
    const inc = target.querySelector(".shadcn-number-stepper__btn--increment")!;
    click(inc);
    expect(onValueChange).toHaveBeenCalledWith(10);
    // Controlled: when value already sits at max, the increment button is disabled.
    const { target: maxTarget } = render(ShadcnNumberStepper, { value: 10, min: 0, max: 10 });
    const incAtMax = maxTarget.querySelector<HTMLButtonElement>(
      ".shadcn-number-stepper__btn--increment"
    )!;
    expect(incAtMax.disabled).toBe(true);
  });

  it("ShadcnInputMask formats the display and emits the raw value", () => {
    const onValueChange = vi.fn();
    const { target } = render(ShadcnInputMask, { value: "", mask: "##/##", onValueChange });
    const input = target.querySelector<HTMLInputElement>("input.shadcn-input")!;
    setInput(input, "1234");
    expect(input.value).toBe("12/34");
    expect(onValueChange).toHaveBeenLastCalledWith("1234");
  });

  it("InputCurrency formats digits right-to-left in shadcn mode", () => {
    const onValueChange = vi.fn();
    const { target } = render(InputCurrency, { value: "", shadcn: true, onValueChange });
    expect(target.querySelector(".icur-shadcn-field")).toBeTruthy();
    const input = target.querySelector<HTMLInputElement>("input.icur-shadcn-input")!;
    setInput(input, "123456");
    expect(input.value).toBe("1.234,56");
    expect(onValueChange).toHaveBeenLastCalledWith("1.234,56");
  });

  it("ShadcnDatePicker masks typing and emits YYYY-MM-DD", () => {
    const onValueChange = vi.fn();
    const { target } = render(ShadcnDatePicker, { value: null, onValueChange });
    const text = target.querySelector<HTMLInputElement>(".shadcn-date-picker__text")!;
    setInput(text, "25/12/2026");
    expect(text.value).toBe("25/12/2026");
    expect(onValueChange).toHaveBeenLastCalledWith("2026-12-25");
  });

  it("ShadcnRadioCardGroup marks the selected card and reports changes", () => {
    const onValueChange = vi.fn();
    const { target } = render(ShadcnRadioCardGroup, {
      value: "a",
      options: [
        { label: "A", value: "a" },
        { label: "B", value: "b" },
      ],
      onValueChange,
    });
    const cards = target.querySelectorAll("label.shadcn-radio-card");
    expect(cards).toHaveLength(2);
    expect(cards[0].classList.contains("is-selected")).toBe(true);
    const secondInput = cards[1].querySelector<HTMLInputElement>("input")!;
    secondInput.dispatchEvent(new Event("change", { bubbles: true }));
    flushSync();
    expect(onValueChange).toHaveBeenCalledWith("b");
  });

  it("ShadcnSwitchSegmented toggles on click", () => {
    const onValueChange = vi.fn();
    const { target } = render(ShadcnSwitchSegmented, { value: false, onValueChange });
    const root = target.querySelector(".shadcn-switch-segmented")!;
    expect(root.getAttribute("aria-checked")).toBe("false");
    click(root);
    expect(onValueChange).toHaveBeenCalledWith(true);
  });

  it("ShadcnTable renders headers, rows and the empty state", () => {
    const columns = [
      { key: "name", label: "Nome" },
      { key: "qty", label: "Qtd", align: "right" as const },
    ];
    const { target, component } = render(ShadcnTable, {
      columns,
      rows: [{ name: "Botijão", qty: 3 }],
    });
    expect(target.querySelectorAll("thead th")).toHaveLength(2);
    expect(target.querySelector(".shadcn-table__th--right")).toBeTruthy();
    const cells = target.querySelectorAll("tbody td");
    expect(cells[0].textContent).toContain("Botijão");
    expect(cells[1].classList.contains("shadcn-table__td--right")).toBe(true);
    unmount(component);
    // Empty state
    const { target: emptyTarget } = render(ShadcnTable, { columns, rows: [] });
    expect(emptyTarget.querySelector(".shadcn-table__empty")).toBeTruthy();
  });

  it("ShadcnSummaryTile + Tiles emit the KPI classes and column var", () => {
    const { target: tileTarget } = render(ShadcnSummaryTile, {
      label: "Total",
      value: "R$ 10",
      tone: "positive",
      icon: "fa-solid fa-coins",
    });
    const tile = tileTarget.querySelector(".shadcn-summary-tile")!;
    expect(tile.classList.contains("shadcn-summary-tile--positive")).toBe(true);
    expect(tile.querySelector(".shadcn-summary-tile__value")?.textContent).toContain("R$ 10");
    expect(tile.querySelector(".shadcn-summary-tile__icon")).toBeTruthy();

    const { target: tilesTarget } = render(ShadcnSummaryTiles, { columns: 4 });
    const tiles = tilesTarget.querySelector<HTMLElement>(".shadcn-summary-tiles")!;
    expect(tiles.style.getPropertyValue("--shadcn-summary-tiles-cols")).toBe("4");
  });

  it("ShadcnLoadingOverlay renders only when visible", () => {
    const { target, component } = render(ShadcnLoadingOverlay, { visible: false, text: "Carregando…" });
    expect(target.querySelector(".shadcn-loading-overlay")).toBeNull();
    unmount(component);
    const { target: visibleTarget } = render(ShadcnLoadingOverlay, { visible: true, text: "Aguarde" });
    expect(visibleTarget.querySelector(".shadcn-loading-overlay__text")?.textContent).toBe("Aguarde");
  });

  it("MultiSelectPopover opens a portaled panel and toggles items", async () => {
    const onValueChange = vi.fn();
    const { target } = render(MultiSelectPopover, {
      value: {},
      tabs: [
        {
          key: "cities",
          label: "Cidades",
          fetch: () => Promise.resolve([{ id: 1, name: "Recife" }, { id: 2, name: "Olinda" }]),
        },
      ],
      onValueChange,
    });
    const trigger = target.querySelector("button.msp-trigger")!;
    click(trigger);
    await Promise.resolve();
    await Promise.resolve();
    flushSync();
    const panel = document.body.querySelector(".msp-panel")!;
    expect(panel).toBeTruthy();
    const items = panel.querySelectorAll(".msp-item");
    expect(items).toHaveLength(2);
    click(items[0]);
    expect(onValueChange).toHaveBeenCalledWith({ cities: [1] });
  });
});

describe("Svelte adapter — lote 3 (overlay/composição)", () => {
  it("ShadcnDialog exposes show()/hide() via bind:this and portals to body", () => {
    const { component } = render(DialogFixture, {});
    expect(document.body.querySelector(".shadcn-dialog-overlay")).toBeNull();

    (component as unknown as { show: () => void }).show();
    flushSync();
    const overlay = document.body.querySelector(".shadcn-dialog-overlay")!;
    expect(overlay).toBeTruthy();
    const content = overlay.querySelector(".shadcn-dialog-content")!;
    expect(content.getAttribute("role")).toBe("dialog");
    expect(content.querySelector(".shadcn-dialog-title")?.textContent).toBe("Título Teste");
    expect(content.querySelector(".dialog-body-content")).toBeTruthy();

    // Footer snippet recebe `hide` — o botão fecha o dialog.
    const cancel = content.querySelector(".dialog-cancel")!;
    click(cancel);
    expect(document.body.querySelector(".shadcn-dialog-overlay")).toBeNull();
  });

  it("ShadcnDialog closeable X button and Escape close it", () => {
    const { component } = render(DialogFixture, {});
    (component as unknown as { show: () => void }).show();
    flushSync();
    const closeBtn = document.body.querySelector(".shadcn-dialog-close")!;
    expect(closeBtn).toBeTruthy();
    click(closeBtn);
    expect(document.body.querySelector(".shadcn-dialog-overlay")).toBeNull();

    (component as unknown as { show: () => void }).show();
    flushSync();
    expect(document.body.querySelector(".shadcn-dialog-overlay")).toBeTruthy();
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    flushSync();
    expect(document.body.querySelector(".shadcn-dialog-overlay")).toBeNull();
  });

  it("ShadcnDropdown opens a portaled menu and item click selects + closes", () => {
    const onSelect = vi.fn();
    const { target } = render(DropdownFixture, { onSelect });
    expect(document.body.querySelector(".shadcn-dropdown__menu")).toBeNull();

    const trigger = target.querySelector("button.trig")!;
    click(trigger);
    const menu = document.body.querySelector(".shadcn-dropdown__menu")!;
    expect(menu).toBeTruthy();
    expect(menu.classList.contains("shadcn-dropdown__menu--comfortable")).toBe(true);

    const items = menu.querySelectorAll(".shadcn-dropdown-item");
    expect(items).toHaveLength(2);
    expect(items[1].classList.contains("shadcn-dropdown-item--danger")).toBe(true);

    click(items[0]);
    expect(onSelect).toHaveBeenCalledWith("rename");
    // closeOnClick (default) → menu fecha após seleção.
    expect(document.body.querySelector(".shadcn-dropdown__menu")).toBeNull();
  });

  it("ShadcnRequiredFieldsDialog lists fields and shows via bind:this", () => {
    const { component } = render(ShadcnRequiredFieldsDialog, {
      description: "Preencha antes de continuar",
      fields: [
        { key: "name", label: "Nome", hint: "Passo 1" },
        { key: "cnpj", label: "CNPJ", hint: "Passo 2" },
      ],
    });
    (component as unknown as { show: () => void }).show();
    flushSync();
    const overlay = document.body.querySelector(".shadcn-dialog-overlay")!;
    expect(overlay.querySelector(".rf-header__title")?.textContent).toBe("Faltam campos obrigatórios");
    const items = overlay.querySelectorAll(".rf-item");
    expect(items).toHaveLength(2);
    expect(items[0].querySelector(".rf-item__label")?.textContent).toBe("Nome");
    (component as unknown as { hide: () => void }).hide();
    flushSync();
    expect(document.body.querySelector(".shadcn-dialog-overlay")).toBeNull();
  });

  it("ShadcnOnboardingPanel renders visual + CTA and forwards action", () => {
    const onAction = vi.fn();
    const { target } = render(ShadcnOnboardingPanel, {
      icon: "fa-solid fa-clock",
      title: "Configure horários",
      description: "Cadastre intervalos.",
      actionLabel: "Adicionar",
      onAction,
    });
    const panel = target.querySelector(".shadcn-onboarding")!;
    expect(panel.querySelector(".shadcn-onboarding__title")?.textContent).toBe("Configure horários");
    expect(panel.querySelector(".shadcn-onboarding__desc")?.textContent).toContain("Cadastre");
    expect(panel.querySelectorAll(".shadcn-onboarding__ring")).toHaveLength(2);
    const cta = panel.querySelector(".shadcn-onboarding__cta")!;
    click(cta);
    expect(onAction).toHaveBeenCalledOnce();
  });

  it("SparkGridEmptyState shows children until loaded, then the panel", () => {
    const onPanelVisible = vi.fn();
    const { target, component } = render(SparkFixture, { onPanelVisible });
    // Ainda carregando → children visíveis, sem painel.
    expect(target.querySelector(".spark-children")).toBeTruthy();
    expect(target.querySelector(".shadcn-onboarding")).toBeNull();
    expect(onPanelVisible).toHaveBeenLastCalledWith(false);

    (component as unknown as { finish: () => void }).finish();
    flushSync();
    // loading true→false com total 0 e sem filtro → painel de onboarding aparece.
    expect(target.querySelector(".shadcn-onboarding")).toBeTruthy();
    expect(onPanelVisible).toHaveBeenLastCalledWith(true);
  });

  it("ShadcnSettingsList família emite as classes e o edit button dispara callback", () => {
    const onEdit = vi.fn();
    const { target } = render(SettingsFixture, { onEdit });
    expect(target.querySelector(".shadcn-settings-list")).toBeTruthy();
    const group = target.querySelector(".shadcn-settings-list__group")!;
    expect(group.querySelector(".shadcn-settings-list__group-icon--indigo")).toBeTruthy();
    expect(group.querySelector(".shadcn-settings-list__group-title")?.textContent).toContain("Pedidos");
    const items = target.querySelectorAll(".shadcn-settings-list__item");
    expect(items).toHaveLength(2);
    expect(items[0].querySelector(".shadcn-settings-list__label")?.textContent).toContain("Plano");
    expect(items[1].querySelector('button[role="switch"]')).toBeTruthy();
    click(target.querySelector(".shadcn-settings-list__edit-btn"));
    expect(onEdit).toHaveBeenCalledOnce();
  });

  it("ShadcnSettingsEditableField shows the value and opens the edit modal", () => {
    const { target } = render(ShadcnSettingsEditableField, {
      label: "Desconto",
      value: "R$ 5",
      type: "text",
    });
    const item = target.querySelector(".shadcn-settings-list__item")!;
    expect(item.querySelector(".shadcn-settings-list__current-value")?.textContent).toBe("R$ 5");
    click(item.querySelector(".shadcn-settings-list__edit-btn"));
    const overlay = document.body.querySelector(".shadcn-dialog-overlay")!;
    expect(overlay).toBeTruthy();
    expect(overlay.querySelector(".shadcn-dialog-title")?.textContent).toBe("Alterar Desconto");
    expect(overlay.querySelector(".demo-form-group")).toBeTruthy();
  });

  it("ShadcnSettingsEditableField renders emptyText for empty value", () => {
    const { target } = render(ShadcnSettingsEditableField, {
      label: "Meta",
      value: null,
      emptyText: "Não definido",
    });
    const val = target.querySelector(".shadcn-settings-list__current-value")!;
    expect(val.textContent).toBe("Não definido");
    expect(val.classList.contains("shadcn-settings-list__current-value--empty")).toBe(true);
  });

  it("ShadcnSpecSheet família emite header/section/field com empty state", () => {
    const { target } = render(SpecSheetFixture, {});
    const sheet = target.querySelector(".shadcn-spec-sheet")!;
    expect(sheet.querySelector(".shadcn-spec-sheet__doc-num")?.textContent).toBe("Cadastro Nº 042");
    expect(sheet.querySelector(".shadcn-spec-sheet__doc-title")?.textContent).toContain("Popgás");
    expect(sheet.querySelector(".shadcn-spec-sheet-badge--active")).toBeTruthy();

    const section = sheet.querySelector(".shadcn-spec-sheet__section")!;
    expect(section.querySelector(".shadcn-spec-sheet__section-num")?.textContent).toBe("§ 01");
    expect(section.querySelector(".shadcn-spec-sheet__grid--cols-2")).toBeTruthy();

    const fields = section.querySelectorAll(".shadcn-spec-sheet__field");
    expect(fields).toHaveLength(2);
    expect(fields[0].querySelector(".shadcn-spec-sheet__value")?.textContent).toBe("Popgás LTDA");
    const emptyValue = fields[1].querySelector(".shadcn-spec-sheet__value")!;
    expect(emptyValue.classList.contains("shadcn-spec-sheet__value--empty")).toBe(true);
    expect(emptyValue.textContent).toBe("Não informado");

    expect(sheet.querySelector(".shadcn-spec-sheet__footer .spec-edit")).toBeTruthy();
  });
});
