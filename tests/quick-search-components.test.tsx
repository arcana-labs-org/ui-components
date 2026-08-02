import "@angular/compiler";
import { Component, provideZonelessChangeDetection, signal } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { BrowserTestingModule, platformBrowserTesting } from "@angular/platform-browser/testing";
import { mount, type VueWrapper } from "@vue/test-utils";
import { fireEvent, render } from "@testing-library/react";
import { createRef } from "react";
import { flushSync, mount as mountSvelte, unmount as unmountSvelte } from "svelte";
import { beforeAll, describe, expect, it, vi } from "vitest";
import ArcanaQuickSearch from "../src/vue/components/ArcanaQuickSearch.vue";
import {
  ArcanaQuickSearch as RQuickSearch,
  type ArcanaQuickSearchHandle,
} from "../src/react/ArcanaQuickSearch";
import { ArcanaQuickSearchComponent } from "../src/angular/arcana-quick-search.component";
import ArcanaQuickSearchSvelte from "../src/svelte/ArcanaQuickSearch.svelte";

beforeAll(() => {
  TestBed.initTestEnvironment(BrowserTestingModule, platformBrowserTesting());
});

/** Último payload de um evento. `.at(-1)` não existe no lib target do projeto. */
const lastEmit = (wrapper: VueWrapper, event: string): unknown[] | undefined => {
  const all = wrapper.emitted(event);
  return all ? (all[all.length - 1] as unknown[]) : undefined;
};

describe("ArcanaQuickSearch (Vue)", () => {
  it("renders info hint only when searchFields provided", () => {
    const w = mount(ArcanaQuickSearch, { props: { searchFields: ["Code", "Name"] } });
    expect(w.find(".arcana-quick-search__info").exists()).toBe(true);
    expect(w.findAll(".arcana-quick-search__hint-item").map((n) => n.text())).toEqual(["Code", "Name"]);
    const bare = mount(ArcanaQuickSearch);
    expect(bare.find(".arcana-quick-search__info").exists()).toBe(false);
  });

  it("shows counter pill with unit only when counter set", () => {
    const w = mount(ArcanaQuickSearch, { props: { counter: 42, unit: "items" } });
    expect(w.find(".arcana-quick-search__counter-value").text()).toBe("42");
    expect(w.find(".arcana-quick-search__counter-unit").text()).toBe("items");
    expect(w.classes()).toContain("has-counter");
  });

  it("emits search on Enter and clears on clear button", async () => {
    const w = mount(ArcanaQuickSearch, { props: { modelValue: "abc" } });
    const input = w.find(".arcana-quick-search__input");
    await input.setValue("hello");
    await input.trigger("keyup.enter");
    expect(lastEmit(w, "search")).toEqual(["hello"]);
    await w.find(".arcana-quick-search__clear").trigger("click");
    expect(lastEmit(w, "search")).toEqual([""]);
    expect(w.emitted("clear")).toBeTruthy();
  });

  it("reset() clears without emitting search", async () => {
    const w = mount(ArcanaQuickSearch, { props: { modelValue: "abc" } });
    (w.vm as unknown as { reset: () => void }).reset();
    await w.vm.$nextTick();
    expect(w.emitted("search")).toBeFalsy();
  });
});

describe("ArcanaQuickSearch (React)", () => {
  it("matches DOM contract and emits search on Enter", () => {
    const onSearch = vi.fn();
    const { container } = render(
      <RQuickSearch searchFields={["Code", "Name"]} counter={42} unit="items" onSearch={onSearch} />
    );
    expect(container.querySelector(".arcana-quick-search.has-counter")).toBeTruthy();
    expect([...container.querySelectorAll(".arcana-quick-search__hint-item")].map((n) => n.textContent))
      .toEqual(["Code", "Name"]);
    const input = container.querySelector(".arcana-quick-search__input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "hello" } });
    fireEvent.keyUp(input, { key: "Enter" });
    expect(onSearch).toHaveBeenLastCalledWith("hello");
  });

  it("reset() via handle clears without onSearch", () => {
    const ref = createRef<ArcanaQuickSearchHandle>();
    const onSearch = vi.fn();
    render(<RQuickSearch ref={ref} value="abc" onSearch={onSearch} />);
    ref.current!.reset();
    expect(onSearch).not.toHaveBeenCalled();
  });
});

describe("ArcanaQuickSearch (Angular)", () => {
  it("renders contract and emits search on Enter", async () => {
    @Component({
      standalone: true,
      imports: [ArcanaQuickSearchComponent],
      template: `<div arcanaQuickSearch [searchFields]="['Code','Name']" [counter]="42" unit="items" (search)="last = $event"></div>`,
    })
    class Host { last = ""; }

    TestBed.configureTestingModule({
      imports: [Host],
      providers: [provideZonelessChangeDetection()],
    });
    const fx = TestBed.createComponent(Host);
    fx.detectChanges();
    const root = fx.nativeElement.querySelector(".arcana-quick-search");
    expect(root.classList.contains("has-counter")).toBe(true);
    expect([...root.querySelectorAll(".arcana-quick-search__hint-item")].map((n: Element) => n.textContent))
      .toEqual(["Code", "Name"]);
    const input = root.querySelector(".arcana-quick-search__input") as HTMLInputElement;
    input.value = "hello"; input.dispatchEvent(new Event("input"));
    input.dispatchEvent(new KeyboardEvent("keyup", { key: "Enter" }));
    fx.detectChanges();
    expect(fx.componentInstance.last).toBe("hello");
  });

  it("keeps in-progress text (uncontrolled) when an unrelated input changes", () => {
    // `counter` is a `signal` (not a plain field) so that mutating it actually notifies
    // zoneless change detection and forces a real re-check of the child's bindings on the
    // next `detectChanges()` — a plain field mutation wouldn't reliably re-trigger CD here.
    @Component({
      standalone: true,
      imports: [ArcanaQuickSearchComponent],
      template: `<div arcanaQuickSearch [counter]="counter()"></div>`,
    })
    class Host { counter = signal(1); }

    TestBed.configureTestingModule({
      imports: [Host],
      providers: [provideZonelessChangeDetection()],
    });
    const fx = TestBed.createComponent(Host);
    fx.detectChanges();
    const root = fx.nativeElement.querySelector(".arcana-quick-search");
    const input = root.querySelector(".arcana-quick-search__input") as HTMLInputElement;

    input.value = "partial"; input.dispatchEvent(new Event("input"));
    fx.detectChanges();
    expect(input.value).toBe("partial");

    // Unrelated `@Input` (`counter`) changes — e.g. a result count streaming in — while the
    // user is still typing in uncontrolled mode (no `[value]` bound). ngOnChanges fires
    // (`changes` only contains `counter`), but must not touch `text` since `value` itself
    // never changed.
    fx.componentInstance.counter.set(2);
    fx.detectChanges();
    expect(input.value).toBe("partial");
    expect(root.querySelector(".arcana-quick-search__counter-value").textContent).toBe("2");
  });
});

describe("ArcanaQuickSearch (Svelte)", () => {
  it("renders contract and emits search on Enter", () => {
    const target = document.createElement("div");
    document.body.appendChild(target);
    let last = "";
    const app = mountSvelte(ArcanaQuickSearchSvelte, {
      target,
      props: { searchFields: ["Code", "Name"], counter: 42, unit: "items", onSearch: (v: string) => (last = v) },
    });
    flushSync();
    expect(target.querySelector(".arcana-quick-search.has-counter")).toBeTruthy();
    expect([...target.querySelectorAll(".arcana-quick-search__hint-item")].map((n) => n.textContent))
      .toEqual(["Code", "Name"]);
    const input = target.querySelector(".arcana-quick-search__input") as HTMLInputElement;
    // Svelte 5 delega `input`/`keyup` (perf) pra listeners em `target`/`document`
    // no bubble phase — precisa de `bubbles: true` pra chegar lá (mesma convenção
    // do `change` sintético em `tests/ArcanaRadio.test.tsx`).
    input.value = "hello"; input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new KeyboardEvent("keyup", { key: "Enter", bubbles: true }));
    flushSync();
    expect(last).toBe("hello");
    unmountSvelte(app);
    target.remove();
  });
});
