import { flushSync, mount, unmount } from "svelte";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  ShadcnBadge,
  ShadcnButton,
  ShadcnCheckbox,
  ShadcnInput,
  ShadcnSegmentedOptions,
  ShadcnSwitch,
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
