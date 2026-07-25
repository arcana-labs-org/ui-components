import { flushSync, mount, unmount } from "svelte";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  ArcanaInputCurrency,
  ArcanaMultiSelectPopover,
  ArcanaBadge,
  ArcanaButton,
  ArcanaCheckbox,
  ArcanaDatePicker,
  ArcanaInput,
  ArcanaInputBoolean,
  ArcanaInputMask,
  ArcanaLoadingOverlay,
  ArcanaNumberStepper,
  ArcanaOnboardingPanel,
  ArcanaRadioCardGroup,
  ArcanaRequiredFieldsDialog,
  ArcanaSegmentedOptions,
  ArcanaSelect,
  ArcanaSettingsEditableField,
  ArcanaSummaryTile,
  ArcanaSummaryTilesGroup,
  ArcanaSwitch,
  ArcanaSwitchSegmented,
  ArcanaTable,
  ArcanaTabs,
  ArcanaTreeSelect,
} from "../src/svelte";
import DropdownFixture from "./fixtures/DropdownFixture.svelte";
import DialogFixture from "./fixtures/DialogFixture.svelte";
import SettingsFixture from "./fixtures/SettingsFixture.svelte";
import SpecSheetFixture from "./fixtures/SpecSheetFixture.svelte";

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
  it("ArcanaButton emits shadcn classes and forwards click", () => {
    const onClick = vi.fn();
    const { target } = render(ArcanaButton, { variant: "destructive", disabled: false, onClick });
    const button = target.querySelector("button.arcana-button")!;
    expect(button.classList.contains("arcana-button--destructive")).toBe(true);
    expect(button.getAttribute("type")).toBe("button");
    click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("ArcanaBadge emits the badge classes and optional dot", () => {
    const { target } = render(ArcanaBadge, { variant: "blue", size: "sm", dot: true });
    const badge = target.querySelector("span.arcana-badge")!;
    expect(badge.classList.contains("arcana-badge--blue")).toBe(true);
    expect(badge.classList.contains("arcana-badge--sm")).toBe(true);
    expect(badge.querySelector(".arcana-badge__dot")).toBeTruthy();
  });

  it("ArcanaSwitch toggles and calls onValueChange", () => {
    const onValueChange = vi.fn();
    const onChange = vi.fn();
    const { target } = render(ArcanaSwitch, { value: false, onValueChange, onChange });
    const button = target.querySelector('button[role="switch"].arcana-switch')!;
    expect(button.getAttribute("aria-checked")).toBe("false");
    expect(button.querySelector(".arcana-switch__thumb")).toBeTruthy();
    click(button);
    expect(onValueChange).toHaveBeenCalledWith(true);
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("ArcanaCheckbox uses a native input and reports the checked change", () => {
    const onValueChange = vi.fn();
    const { target } = render(ArcanaCheckbox, { value: false, label: "Aceito", onValueChange });
    const label = target.querySelector("label.arcana-checkbox")!;
    expect(label.querySelector(".arcana-checkbox__label")?.textContent).toContain("Aceito");
    const input = target.querySelector<HTMLInputElement>("input.arcana-checkbox__input")!;
    input.checked = true;
    input.dispatchEvent(new Event("change", { bubbles: true }));
    flushSync();
    expect(onValueChange).toHaveBeenCalledWith(true);
  });

  it("ArcanaInput emits parsed value on input (number → number)", () => {
    const onValueChange = vi.fn();
    const { target } = render(ArcanaInput, { value: "", type: "number", size: "lg", onValueChange });
    const input = target.querySelector<HTMLInputElement>("input.arcana-input")!;
    expect(input.classList.contains("arcana-input--lg")).toBe(true);
    input.value = "42";
    input.dispatchEvent(new Event("input", { bubbles: true }));
    flushSync();
    expect(onValueChange).toHaveBeenCalledWith(42);
  });

  it("ArcanaSegmentedOptions renders options and selects on click", () => {
    const onValueChange = vi.fn();
    const { target } = render(ArcanaSegmentedOptions, {
      value: "a",
      options: [
        { label: "Ativo", value: "a" },
        { label: "Baixado", value: "b" },
      ],
      onValueChange,
    });
    const options = target.querySelectorAll("button.arcana-segmented-options__option");
    expect(options).toHaveLength(2);
    expect(options[0].classList.contains("is-active")).toBe(true);
    click(options[1]);
    expect(onValueChange).toHaveBeenCalledWith("b");
  });

  it("ArcanaTabs renders triggers, marks the active one and selects another", () => {
    const onValueChange = vi.fn();
    const { target } = render(ArcanaTabs, {
      value: "data",
      variant: "pills",
      tabs: [
        { name: "data", label: "Dados" },
        { name: "brand", label: "Branding" },
      ],
      onValueChange,
    });
    expect(target.querySelector(".arcana-tabs.arcana-tabs--pills")).toBeTruthy();
    const triggers = target.querySelectorAll('button.arcana-tabs__trigger[role="tab"]');
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
  it("ArcanaSelect opens a portaled panel and selects an option", () => {
    const onValueChange = vi.fn();
    const { target } = render(ArcanaSelect, {
      value: null,
      options: [
        { label: "Ativo", value: "a" },
        { label: "Baixado", value: "b" },
      ],
      onValueChange,
    });
    const root = target.querySelector(".arcana-select")!;
    expect(root.classList.contains("arcana-select--md")).toBe(true);
    const trigger = target.querySelector("button.arcana-select__trigger")!;
    expect(target.querySelector(".arcana-select__panel")).toBeNull();
    click(trigger);
    // Panel is teleported to document.body (not inside target).
    const panel = document.body.querySelector(".arcana-select__panel")!;
    expect(panel).toBeTruthy();
    const items = panel.querySelectorAll("li.arcana-select__item");
    expect(items).toHaveLength(2);
    click(items[1]);
    expect(onValueChange).toHaveBeenCalledWith("b");
    // Panel closes after single-select.
    expect(document.body.querySelector(".arcana-select__panel")).toBeNull();
  });

  it("ArcanaTreeSelect opens a portaled tree, filters by search and selects a leaf", () => {
    const onValueChange = vi.fn();
    const onChange = vi.fn();
    const { target } = render(ArcanaTreeSelect, {
      value: null,
      options: [
        {
          id: 1,
          name: "Operacional",
          children: [
            { id: 11, name: "Combustível" },
            { id: 12, name: "Manutenção" },
          ],
        },
        { id: 2, name: "Administrativo" },
      ],
      onValueChange,
      onChange,
    });
    const root = target.querySelector(".arcana-tree-select")!;
    expect(root.classList.contains("arcana-tree-select--md")).toBe(true);
    const trigger = target.querySelector("button.arcana-tree-select__trigger")!;
    click(trigger);

    // Panel is portaled to document.body (not inside target).
    const panel = document.body.querySelector(".arcana-tree-select__panel")!;
    expect(panel).toBeTruthy();
    // Collapsed by default: only the two roots are visible.
    let nodes = panel.querySelectorAll(".arcana-tree-select__node");
    expect(nodes).toHaveLength(2);

    // Parent is not selectable (default) → clicking it just expands.
    click(nodes[0]);
    expect(onValueChange).not.toHaveBeenCalled();
    nodes = panel.querySelectorAll(".arcana-tree-select__node");
    expect(nodes).toHaveLength(4);

    // Search filters the tree, keeps the ancestor and highlights the match.
    setInput(panel.querySelector<HTMLInputElement>(".arcana-tree-select__search-input"), "manu");
    nodes = panel.querySelectorAll(".arcana-tree-select__node");
    expect(nodes).toHaveLength(2);
    expect(panel.querySelector("mark.arcana-tree-select__mark")?.textContent).toBe("Manu");

    // Clicking the leaf emits the id and closes the panel.
    click(nodes[1]);
    expect(onValueChange).toHaveBeenCalledWith(12);
    expect(onChange).toHaveBeenCalledWith(12);
    expect(document.body.querySelector(".arcana-tree-select__panel")).toBeNull();
  });

  it("ArcanaInputBoolean renders a select showing the mapped label", () => {
    const { target } = render(ArcanaInputBoolean, { value: 1, variation: "status" });
    const label = target.querySelector(".arcana-select__label")!;
    expect(label.textContent?.trim()).toBe("Ativo");
  });

  it("ArcanaNumberStepper increments and clamps to max", () => {
    const onValueChange = vi.fn();
    const { target } = render(ArcanaNumberStepper, {
      value: 9,
      min: 0,
      max: 10,
      onValueChange,
    });
    const inc = target.querySelector(".arcana-number-stepper__btn--increment")!;
    click(inc);
    expect(onValueChange).toHaveBeenCalledWith(10);
    // Controlled: when value already sits at max, the increment button is disabled.
    const { target: maxTarget } = render(ArcanaNumberStepper, { value: 10, min: 0, max: 10 });
    const incAtMax = maxTarget.querySelector<HTMLButtonElement>(
      ".arcana-number-stepper__btn--increment"
    )!;
    expect(incAtMax.disabled).toBe(true);
  });

  it("ArcanaInputMask formats the display and emits the raw value", () => {
    const onValueChange = vi.fn();
    const { target } = render(ArcanaInputMask, { value: "", mask: "##/##", onValueChange });
    const input = target.querySelector<HTMLInputElement>("input.arcana-input")!;
    setInput(input, "1234");
    expect(input.value).toBe("12/34");
    expect(onValueChange).toHaveBeenLastCalledWith("1234");
  });

  it("ArcanaInputCurrency formats digits right-to-left in shadcn mode", () => {
    const onValueChange = vi.fn();
    const { target } = render(ArcanaInputCurrency, { value: "", shadcn: true, onValueChange });
    expect(target.querySelector(".icur-arcana-field")).toBeTruthy();
    const input = target.querySelector<HTMLInputElement>("input.icur-arcana-input")!;
    setInput(input, "123456");
    expect(input.value).toBe("1.234,56");
    expect(onValueChange).toHaveBeenLastCalledWith("1.234,56");
  });

  it("ArcanaDatePicker opens a portaled calendar and picks a day", () => {
    const onValueChange = vi.fn();
    const { target } = render(ArcanaDatePicker, { value: "2026-12-10", onValueChange });
    const trigger = target.querySelector("button.arcana-cal__input")!;
    expect(target.querySelector(".arcana-cal__input-label")?.textContent).toBe("10/12/2026");
    // Panel is teleported to document.body (not inside target).
    expect(document.body.querySelector(".arcana-cal__panel")).toBeNull();
    click(trigger);
    const panel = document.body.querySelector(".arcana-cal__panel")!;
    expect(panel).toBeTruthy();
    // The current value is anchored + highlighted.
    expect(panel.querySelector(".arcana-cal__day--selected")?.textContent).toBe("10");
    const day15 = Array.from(panel.querySelectorAll<HTMLButtonElement>("button.arcana-cal__day"))
      .find((b) => b.textContent === "15" && !b.classList.contains("arcana-cal__day--adjacent"))!;
    click(day15);
    expect(onValueChange).toHaveBeenLastCalledWith("2026-12-15");
    // Panel closes after a date pick.
    expect(document.body.querySelector(".arcana-cal__panel")).toBeNull();
  });

  it("ArcanaDatePicker month mode picks YYYY-MM and range mode emits a tuple", () => {
    const onMonth = vi.fn();
    const { target: monthTarget } = render(ArcanaDatePicker, { value: "2026-03", type: "month", onValueChange: onMonth });
    click(monthTarget.querySelector("button.arcana-cal__input"));
    const monthPanel = document.body.querySelector(".arcana-cal__panel")!;
    const may = Array.from(monthPanel.querySelectorAll<HTMLButtonElement>("button.arcana-cal__month"))[4];
    click(may);
    expect(onMonth).toHaveBeenLastCalledWith("2026-05");

    const onRange = vi.fn();
    const { target: rangeTarget } = render(ArcanaDatePicker, { value: ["2026-12-05", ""], type: "daterange", onValueChange: onRange });
    click(rangeTarget.querySelector("button.arcana-cal__input"));
    const rangePanel = document.body.querySelector(".arcana-cal__panel--range")!;
    const inMonthDay = (text: string) =>
      Array.from(rangePanel.querySelectorAll<HTMLButtonElement>("button.arcana-cal__day"))
        .find((b) => b.textContent === text && !b.classList.contains("arcana-cal__day--adjacent"))!;
    click(inMonthDay("10"));
    expect(onRange).not.toHaveBeenCalled(); // first click only anchors the start
    click(inMonthDay("20"));
    expect(onRange).toHaveBeenLastCalledWith(["2026-12-10", "2026-12-20"]);
  });

  it("ArcanaRadioCardGroup marks the selected card and reports changes", () => {
    const onValueChange = vi.fn();
    const { target } = render(ArcanaRadioCardGroup, {
      value: "a",
      options: [
        { label: "A", value: "a" },
        { label: "B", value: "b" },
      ],
      onValueChange,
    });
    const cards = target.querySelectorAll("label.arcana-radio-card");
    expect(cards).toHaveLength(2);
    expect(cards[0].classList.contains("is-selected")).toBe(true);
    const secondInput = cards[1].querySelector<HTMLInputElement>("input")!;
    secondInput.dispatchEvent(new Event("change", { bubbles: true }));
    flushSync();
    expect(onValueChange).toHaveBeenCalledWith("b");
  });

  it("ArcanaSwitchSegmented toggles on click", () => {
    const onValueChange = vi.fn();
    const { target } = render(ArcanaSwitchSegmented, { value: false, onValueChange });
    const root = target.querySelector(".arcana-switch-segmented")!;
    expect(root.getAttribute("aria-checked")).toBe("false");
    click(root);
    expect(onValueChange).toHaveBeenCalledWith(true);
  });

  it("ArcanaTable renders headers, rows and the empty state", () => {
    const columns = [
      { key: "name", label: "Nome" },
      { key: "qty", label: "Qtd", align: "right" as const },
    ];
    const { target, component } = render(ArcanaTable, {
      columns,
      rows: [{ name: "Botijão", qty: 3 }],
    });
    expect(target.querySelectorAll("thead th")).toHaveLength(2);
    expect(target.querySelector(".arcana-table__th--right")).toBeTruthy();
    const cells = target.querySelectorAll("tbody td");
    expect(cells[0].textContent).toContain("Botijão");
    expect(cells[1].classList.contains("arcana-table__td--right")).toBe(true);
    unmount(component);
    // Empty state
    const { target: emptyTarget } = render(ArcanaTable, { columns, rows: [] });
    expect(emptyTarget.querySelector(".arcana-table__empty")).toBeTruthy();
  });

  it("ArcanaSummaryTile + Tiles emit the KPI classes and column var", () => {
    const { target: tileTarget } = render(ArcanaSummaryTile, {
      label: "Total",
      value: "R$ 10",
      tone: "positive",
      icon: "fa-solid fa-coins",
    });
    const tile = tileTarget.querySelector(".arcana-summary-tile")!;
    expect(tile.classList.contains("arcana-summary-tile--positive")).toBe(true);
    expect(tile.querySelector(".arcana-summary-tile__value")?.textContent).toContain("R$ 10");
    expect(tile.querySelector(".arcana-summary-tile__icon")).toBeTruthy();

    const { target: tilesTarget } = render(ArcanaSummaryTilesGroup, { columns: 4 });
    const tiles = tilesTarget.querySelector<HTMLElement>(".arcana-summary-tiles")!;
    expect(tiles.style.getPropertyValue("--arcana-summary-tiles-cols")).toBe("4");
  });

  it("ArcanaLoadingOverlay renders only when visible", () => {
    const { target, component } = render(ArcanaLoadingOverlay, { visible: false, text: "Carregando…" });
    expect(target.querySelector(".arcana-loading-overlay")).toBeNull();
    unmount(component);
    const { target: visibleTarget } = render(ArcanaLoadingOverlay, { visible: true, text: "Aguarde" });
    expect(visibleTarget.querySelector(".arcana-loading-overlay__text")?.textContent).toBe("Aguarde");
  });

  it("ArcanaMultiSelectPopover opens a portaled panel and toggles items", async () => {
    const onValueChange = vi.fn();
    const { target } = render(ArcanaMultiSelectPopover, {
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
  it("ArcanaDialog exposes show()/hide() via bind:this and portals to body", () => {
    const { component } = render(DialogFixture, {});
    expect(document.body.querySelector(".arcana-dialog-overlay")).toBeNull();

    (component as unknown as { show: () => void }).show();
    flushSync();
    const overlay = document.body.querySelector(".arcana-dialog-overlay")!;
    expect(overlay).toBeTruthy();
    const content = overlay.querySelector(".arcana-dialog-content")!;
    expect(content.getAttribute("role")).toBe("dialog");
    expect(content.querySelector(".arcana-dialog-title")?.textContent).toBe("Título Teste");
    expect(content.querySelector(".dialog-body-content")).toBeTruthy();

    // Footer snippet recebe `hide` — o botão fecha o dialog.
    const cancel = content.querySelector(".dialog-cancel")!;
    click(cancel);
    expect(document.body.querySelector(".arcana-dialog-overlay")).toBeNull();
  });

  it("ArcanaDialog closeable X button and Escape close it", () => {
    const { component } = render(DialogFixture, {});
    (component as unknown as { show: () => void }).show();
    flushSync();
    const closeBtn = document.body.querySelector(".arcana-dialog-close")!;
    expect(closeBtn).toBeTruthy();
    click(closeBtn);
    expect(document.body.querySelector(".arcana-dialog-overlay")).toBeNull();

    (component as unknown as { show: () => void }).show();
    flushSync();
    expect(document.body.querySelector(".arcana-dialog-overlay")).toBeTruthy();
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    flushSync();
    expect(document.body.querySelector(".arcana-dialog-overlay")).toBeNull();
  });

  it("ArcanaDropdown opens a portaled menu and item click selects + closes", () => {
    const onSelect = vi.fn();
    const { target } = render(DropdownFixture, { onSelect });
    expect(document.body.querySelector(".arcana-dropdown__menu")).toBeNull();

    const trigger = target.querySelector("button.trig")!;
    click(trigger);
    const menu = document.body.querySelector(".arcana-dropdown__menu")!;
    expect(menu).toBeTruthy();
    expect(menu.classList.contains("arcana-dropdown__menu--comfortable")).toBe(true);

    const items = menu.querySelectorAll(".arcana-dropdown-item");
    expect(items).toHaveLength(2);
    expect(items[1].classList.contains("arcana-dropdown-item--danger")).toBe(true);

    click(items[0]);
    expect(onSelect).toHaveBeenCalledWith("rename");
    // closeOnClick (default) → menu fecha após seleção.
    expect(document.body.querySelector(".arcana-dropdown__menu")).toBeNull();
  });

  it("ArcanaRequiredFieldsDialog lists fields and shows via bind:this", () => {
    const { component } = render(ArcanaRequiredFieldsDialog, {
      description: "Preencha antes de continuar",
      fields: [
        { key: "name", label: "Nome", hint: "Passo 1" },
        { key: "cnpj", label: "CNPJ", hint: "Passo 2" },
      ],
    });
    (component as unknown as { show: () => void }).show();
    flushSync();
    const overlay = document.body.querySelector(".arcana-dialog-overlay")!;
    expect(overlay.querySelector(".rf-header__title")?.textContent).toBe("Faltam campos obrigatórios");
    const items = overlay.querySelectorAll(".rf-item");
    expect(items).toHaveLength(2);
    expect(items[0].querySelector(".rf-item__label")?.textContent).toBe("Nome");
    (component as unknown as { hide: () => void }).hide();
    flushSync();
    expect(document.body.querySelector(".arcana-dialog-overlay")).toBeNull();
  });

  it("ArcanaOnboardingPanel renders visual + CTA and forwards action", () => {
    const onAction = vi.fn();
    const { target } = render(ArcanaOnboardingPanel, {
      icon: "fa-solid fa-clock",
      title: "Configure horários",
      description: "Cadastre intervalos.",
      actionLabel: "Adicionar",
      onAction,
    });
    const panel = target.querySelector(".arcana-onboarding")!;
    expect(panel.querySelector(".arcana-onboarding__title")?.textContent).toBe("Configure horários");
    expect(panel.querySelector(".arcana-onboarding__desc")?.textContent).toContain("Cadastre");
    expect(panel.querySelectorAll(".arcana-onboarding__ring")).toHaveLength(2);
    const cta = panel.querySelector(".arcana-onboarding__action .arcana-button")!;
    click(cta);
    expect(onAction).toHaveBeenCalledOnce();
  });

  it("ArcanaSettingsList família emite as classes e o edit button dispara callback", () => {
    const onEdit = vi.fn();
    const { target } = render(SettingsFixture, { onEdit });
    expect(target.querySelector(".arcana-settings-list")).toBeTruthy();
    const group = target.querySelector(".arcana-settings-list__group")!;
    expect(group.querySelector(".arcana-settings-list__group-icon--indigo")).toBeTruthy();
    expect(group.querySelector(".arcana-settings-list__group-title")?.textContent).toContain("Pedidos");
    const items = target.querySelectorAll(".arcana-settings-list__item");
    expect(items).toHaveLength(2);
    expect(items[0].querySelector(".arcana-settings-list__label")?.textContent).toContain("Plano");
    expect(items[1].querySelector('button[role="switch"]')).toBeTruthy();
    click(target.querySelector(".arcana-settings-list__edit-btn"));
    expect(onEdit).toHaveBeenCalledOnce();
  });

  it("ArcanaSettingsEditableField shows the value and opens the edit modal", () => {
    const { target } = render(ArcanaSettingsEditableField, {
      label: "Desconto",
      value: "R$ 5",
      type: "text",
    });
    const item = target.querySelector(".arcana-settings-list__item")!;
    expect(item.querySelector(".arcana-settings-list__current-value")?.textContent).toBe("R$ 5");
    click(item.querySelector(".arcana-settings-list__edit-btn"));
    const overlay = document.body.querySelector(".arcana-dialog-overlay")!;
    expect(overlay).toBeTruthy();
    expect(overlay.querySelector(".arcana-dialog-title")?.textContent).toBe("Alterar Desconto");
    expect(overlay.querySelector(".demo-form-group")).toBeTruthy();
  });

  it("ArcanaSettingsEditableField renders emptyText for empty value", () => {
    const { target } = render(ArcanaSettingsEditableField, {
      label: "Meta",
      value: null,
      emptyText: "Não definido",
    });
    const val = target.querySelector(".arcana-settings-list__current-value")!;
    expect(val.textContent).toBe("Não definido");
    expect(val.classList.contains("arcana-settings-list__current-value--empty")).toBe(true);
  });

  it("ArcanaSpecSheet família emite header/section/field com empty state", () => {
    const { target } = render(SpecSheetFixture, {});
    const sheet = target.querySelector(".arcana-spec-sheet")!;
    expect(sheet.querySelector(".arcana-spec-sheet__doc-num")?.textContent).toBe("Cadastro Nº 042");
    expect(sheet.querySelector(".arcana-spec-sheet__doc-title")?.textContent).toContain("Popgás");
    expect(sheet.querySelector(".arcana-spec-sheet-badge--active")).toBeTruthy();

    const section = sheet.querySelector(".arcana-spec-sheet__section")!;
    expect(section.querySelector(".arcana-spec-sheet__section-num")?.textContent).toBe("§ 01");
    expect(section.querySelector(".arcana-spec-sheet__grid--cols-2")).toBeTruthy();

    const fields = section.querySelectorAll(".arcana-spec-sheet__field");
    expect(fields).toHaveLength(2);
    expect(fields[0].querySelector(".arcana-spec-sheet__value")?.textContent).toBe("Popgás LTDA");
    const emptyValue = fields[1].querySelector(".arcana-spec-sheet__value")!;
    expect(emptyValue.classList.contains("arcana-spec-sheet__value--empty")).toBe(true);
    expect(emptyValue.textContent).toBe("Não informado");

    expect(sheet.querySelector(".arcana-spec-sheet__footer .spec-edit")).toBeTruthy();
  });
});
