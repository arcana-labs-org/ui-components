import { mount, type VueWrapper } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import ArcanaQuickSearch from "../src/vue/components/ArcanaQuickSearch.vue";

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
