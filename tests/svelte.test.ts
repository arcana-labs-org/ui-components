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
  ShadcnRadioCardGroup,
  ShadcnSegmentedOptions,
  ShadcnSelect,
  ShadcnSummaryTile,
  ShadcnSummaryTiles,
  ShadcnSwitch,
  ShadcnSwitchSegmented,
  ShadcnTable,
  ShadcnTabs,
} from "../src/svelte";

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
