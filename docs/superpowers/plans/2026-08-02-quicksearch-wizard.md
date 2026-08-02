# QuickSearch + Wizard (shell + steps) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add two framework-native components to `@arcanalabs/ui-components` — `ArcanaQuickSearch` (search input with field hint + counter pill) and `ArcanaWizard`/`ArcanaWizardStep` (multi-step shell + steps) — ported to Vue/React/Angular/Svelte with shared CSS, docs in all 8 languages, tests, and a 2.6.0 release.

**Architecture:** The Vue SFC is the source of truth; React/Angular/Svelte are hand-written ports emitting **identical DOM and CSS classes**. Shared non-visual logic lives in `src/core/wizard.ts` (pure, unit-tested). All CSS is shared in `src/styles/parts/*.scss`. The Wizard is a compound component whose shell collects step metadata from `ArcanaWizardStep` children through a shared context (Vue provide/inject, React createContext, Svelte Symbol context module, Angular parent-component DI) — mirroring the existing Accordion/AccordionItem pair exactly.

**Tech Stack:** TypeScript, Vue 3 (Options API SFC), React (forwardRef + context), Angular (standalone, OnPush, attribute selectors), Svelte 5 (runes), SCSS, Vitest + happy-dom, Vite library build.

## Global Constraints

- **No new runtime dependencies.** No Element Plus, no FontAwesome. Icons are **inline SVG**.
- **Identical markup across all 4 ports**: same DOM tree, same `arcana-*` class names, same a11y attributes. Parity tests enforce this.
- **SFCs carry no `<style>` block.** All CSS lives in `src/styles/parts/<name>.scss`, `@import`ed near the top of `src/styles/components.scss`.
- **Comments in Portuguese**, matching every existing file's doc-comment style (a top block per file describing anatomy + Vue→X equivalences).
- **Colors: usage tokens only** (`var(--arcana-text)`, `var(--arcana-success-text)`, `var(--arcana-border)`, …) so the active palette and `.arcana-dark` are respected. Sizing via CSS custom properties with fallbacks.
- **Vue→X mapping rules** (per repo convention): slots → `ReactNode` props / `<ng-content select>` / `Snippet` props; events → `onFoo` / `@Output()` / callback props; `v-model` → `value` + `onValueChange` (React/Svelte) or `[value]` + `(valueChange)` (Angular); imperative methods → `useImperativeHandle` / public class methods / `export function`.
- **Naming:** Vue/React/Svelte class `ArcanaFoo`; Angular class `ArcanaFooComponent` with attribute selector `div[arcanaFoo]`.
- **Barrels to touch per component:** `src/vue.ts`; `src/react/index.ts`; `src/angular/index.ts`; and 3 spots in `src/svelte.ts` (top import, typed props block, `export const … as Component<…>`). Core types/helpers re-exported in `src/vue.ts` / `src/react.ts` / `src/angular.ts`.
- **Docs i18n parity is compiler-enforced** via the shared `Messages` interface; a missing/extra key in any of the 8 language files is a TypeScript error. Demo "chrome" strings must live under `demos` (read via `$dt` in Vue demos), never hardcoded in a single language (enforced by `tests/docs-i18n.test.ts`).
- **8 languages**, in `LANG_ORDER`: `en`, `pt`, `es`, `it`, `zh`, `ja`, `de`, `ru` — files `docs/src/i18n/{en,pt,es,it,zh,ja,de,ru}.ts`.
- **Gate before release:** `npm run check` (= `typecheck && typecheck:docs && test && build && docs:build`) must pass.
- **Publish = push to `main`** (CI `release.yml` publishes to npm when `package.json` version changes; `docs.yml` deploys docs). **Do not push without explicit user confirmation.**

## Reference analogs (read these before mirroring)

- QuickSearch original (Vue-only, being ported): `erp-web/src/components/form/inputs/QuickSearch.vue`
- WizardShell original: `erp-web/src/components/miscellaneous/wizard-shell/WizardShell.vue`
- Compound pattern to mirror (all ports): `ArcanaAccordion` + `ArcanaAccordionItem` in `src/vue/components/`, `src/react/`, `src/angular/`, `src/svelte/`.
- Core module + pure test pattern: `src/core/countdown.ts`, `tests/core-metrics.test.ts`.
- Styles part header/anatomy convention: `src/styles/parts/countdown.scss`.
- Svelte separate context module: `src/svelte/context-menu-context.ts`.
- Cross-framework parity test pattern: `tests/metrics-components.test.tsx`.

## File Structure

Created:
- `src/core/wizard.ts` — pure step-state helpers + types.
- `src/styles/parts/quick-search.scss`, `src/styles/parts/wizard.scss`.
- `src/vue/components/ArcanaQuickSearch.vue`, `ArcanaWizard.vue`, `ArcanaWizardStep.vue`.
- `src/react/ArcanaQuickSearch.tsx`, `ArcanaWizard.tsx`, `ArcanaWizardStep.tsx`.
- `src/angular/arcana-quick-search.component.ts`, `arcana-wizard.component.ts`, `arcana-wizard-step.component.ts`.
- `src/svelte/ArcanaQuickSearch.svelte`, `ArcanaWizard.svelte`, `ArcanaWizardStep.svelte`, `src/svelte/wizard-context.ts`.
- `tests/core-wizard.test.ts`, `tests/quick-search-components.test.tsx`, `tests/wizard-components.test.tsx`.

Modified:
- `src/styles/components.scss` (2 `@import` lines).
- `src/vue.ts`, `src/react.ts`, `src/react/index.ts`, `src/angular.ts`, `src/angular/index.ts`, `src/svelte.ts`.
- `docs/src/components/registry.ts`, `docs/src/i18n/types.ts`, `docs/src/i18n/{8 langs}.ts`, `docs/src/components/componentDocs.ts`, `docs/src/components/frameworkSnippets.ts`.
- `package.json` (version), `CHANGELOG.md`.

---

# PART A — ArcanaQuickSearch

### Task A1: QuickSearch styles part

**Files:**
- Create: `src/styles/parts/quick-search.scss`
- Modify: `src/styles/components.scss` (add `@import "./parts/quick-search";` in the `parts/*` import block near the top, alphabetically after `progress`)

DOM contract the CSS targets (produced identically by every port):

```html
<div class="arcana-quick-search" [class.is-disabled] [class.has-counter]>
  <span class="arcana-quick-search__info" role="button" tabindex="0" aria-describedby="<id>">
    <svg class="arcana-quick-search__info-icon">…circle-info…</svg>
    <div class="arcana-quick-search__hint" id="<id>" role="tooltip">
      <strong class="arcana-quick-search__hint-label">{fieldsLabel}</strong>
      <ul class="arcana-quick-search__hint-list">
        <li class="arcana-quick-search__hint-item">{field}</li>
      </ul>
    </div>
  </span>
  <svg class="arcana-quick-search__icon">…magnifying-glass…</svg>
  <input class="arcana-quick-search__input" />
  <button class="arcana-quick-search__clear" aria-label="{clearLabel}"><svg>…x-circle…</svg></button>
  <span class="arcana-quick-search__counter">
    <span class="arcana-quick-search__counter-value">{counter}</span>
    <span class="arcana-quick-search__counter-unit">{unit}</span>
  </span>
</div>
```

- [ ] **Step 1: Write the styles part**

Mirror the original's shadcn look (`erp-web/.../QuickSearch.vue` lines 91-234) using usage tokens. Start with the doc-comment header (Portuguese, like `countdown.scss`), then:

```scss
.arcana-quick-search {
    display: flex;
    align-items: center;
    gap: var(--arcana-quick-search-gap, 12px);
    width: var(--arcana-quick-search-width, 450px);
    max-width: 100%;
    height: var(--arcana-quick-search-height, 38px);
    padding: 0 6px 0 14px;
    background: var(--arcana-surface, #fff);
    border: 1px solid var(--arcana-border);
    border-radius: var(--arcana-quick-search-radius, 8px);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
    transition: border-color 0.15s ease, box-shadow 0.15s ease;

    &:hover { border-color: var(--arcana-border-strong, #cbd5e1); }
    &:focus-within {
        border-color: var(--arcana-accent-border, #c7d2fe);
        box-shadow: 0 0 0 3px var(--arcana-accent-ring, rgba(99, 102, 241, 0.12));
    }
    &:focus-within .arcana-quick-search__icon { color: var(--arcana-accent-text, #4f46e5); }
    &.is-disabled { opacity: 0.6; pointer-events: none; }
}

.arcana-quick-search__icon,
.arcana-quick-search__clear {
    width: 12px; height: 12px; flex: none;
    color: var(--arcana-text-muted, #64748b);
}
.arcana-quick-search__clear { background: none; border: 0; padding: 0; cursor: pointer; }
.arcana-quick-search__clear:hover { color: var(--arcana-text, #1e293b); }

.arcana-quick-search__info { position: relative; display: inline-flex; cursor: help; }
.arcana-quick-search__info-icon { width: 13px; height: 13px; color: var(--arcana-info-text, #3b82f6); }

.arcana-quick-search__hint {
    position: absolute; bottom: calc(100% + 8px); left: 50%; transform: translateX(-50%);
    min-width: 180px; padding: 8px 10px;
    background: var(--arcana-tooltip-surface, #1e293b);
    color: var(--arcana-tooltip-text, #fff);
    border-radius: 6px; font-size: 11px; line-height: 1.4;
    opacity: 0; visibility: hidden; transition: opacity 0.12s ease; z-index: 20;
}
.arcana-quick-search__info:hover .arcana-quick-search__hint,
.arcana-quick-search__info:focus-within .arcana-quick-search__hint { opacity: 1; visibility: visible; }
.arcana-quick-search__hint-label { display: block; font-weight: 600; margin-bottom: 4px; }
.arcana-quick-search__hint-list { margin: 0; padding-left: 16px; list-style: disc; }

.arcana-quick-search__input {
    flex: 1; min-width: 0; height: 100%;
    background: transparent; border: 0; outline: none;
    color: var(--arcana-text, #1e293b); font-size: 13px;
    caret-color: var(--arcana-accent-text, #4f46e5);
}
.arcana-quick-search__input::placeholder { color: var(--arcana-text-muted, #64748b); font-size: 11px; }

.arcana-quick-search__counter {
    flex: none; display: inline-flex; align-items: baseline; gap: 2px;
    padding: 3px 7px; border-radius: 5px;
    background: var(--arcana-muted-surface, #f1f5f9);
    border: 1px solid var(--arcana-border);
    color: var(--arcana-text-subtle, #475569);
    font-family: "Geist Mono", ui-monospace, monospace;
    font-size: 10.5px; font-variant-numeric: tabular-nums;
}

@media (max-width: 768px) {
    .arcana-quick-search { width: 100%; }
}
```

> Use whatever usage-token names already exist in `src/styles/tokens.scss` where the fallbacks above guess (`--arcana-surface`, `--arcana-border-strong`, `--arcana-muted-surface`, `--arcana-info-text`, `--arcana-tooltip-surface`, etc.). Grep `tokens.scss` first; only keep a hardcoded fallback where no token exists.

- [ ] **Step 2: Add the import** to `src/styles/components.scss`.

- [ ] **Step 3: Verify it compiles**

Run: `npx sass src/styles/components.scss > /dev/null` (or `npm run build` styles step)
Expected: no Sass errors.

- [ ] **Step 4: Commit**

```bash
git add src/styles/parts/quick-search.scss src/styles/components.scss
git commit -m "feat(styles): parte quick-search (ArcanaQuickSearch)"
```

---

### Task A2: ArcanaQuickSearch — Vue SFC + Vue test + barrel

**Files:**
- Create: `src/vue/components/ArcanaQuickSearch.vue`
- Modify: `src/vue.ts`
- Test: `tests/quick-search-components.test.tsx` (Vue block; other ports appended in later tasks)

**Interfaces:**
- Produces: component with props `modelValue?: string`, `placeholder?: string`, `searchFields?: string[]`, `fieldsLabel?: string`, `counter?: number|string|null`, `unit?: string`, `hideUnit?: boolean`, `disabled?: boolean`, `clearLabel?: string`; emits `update:modelValue`, `search`, `clear`; public methods `reset()`, `focus()`. All ports (A3/A4/A5) must match this contract and the DOM in Task A1.

- [ ] **Step 1: Write the failing Vue test** in `tests/quick-search-components.test.tsx`

```tsx
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import ArcanaQuickSearch from "../src/vue/components/ArcanaQuickSearch.vue";

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
    expect(w.emitted("search")?.at(-1)).toEqual(["hello"]);
    await w.find(".arcana-quick-search__clear").trigger("click");
    expect(w.emitted("search")?.at(-1)).toEqual([""]);
    expect(w.emitted("clear")).toBeTruthy();
  });

  it("reset() clears without emitting search", async () => {
    const w = mount(ArcanaQuickSearch, { props: { modelValue: "abc" } });
    (w.vm as unknown as { reset: () => void }).reset();
    await w.vm.$nextTick();
    expect(w.emitted("search")).toBeFalsy();
  });
});
```

- [ ] **Step 2: Run it, verify it fails**

Run: `npx vitest run tests/quick-search-components.test.tsx -t "Vue"`
Expected: FAIL — cannot resolve `ArcanaQuickSearch.vue`.

- [ ] **Step 3: Write `src/vue/components/ArcanaQuickSearch.vue`**

Options-API SFC, no `<style>`. Port the original `QuickSearch.vue` (`erp-web/...`) to inline-SVG icons and the DOM in Task A1. Key points:
- `props` exactly as in Interfaces above; `modelValue` default `""`, `unit` default `"registro(s)"`, `fieldsLabel` default `"Campos pesquisáveis:"`, `clearLabel` default `"Limpar busca"`, `placeholder` default `""`.
- `data()` holds nothing for text (bind input to a local `text` mirroring `modelValue` via a computed get/set that emits `update:modelValue`), plus a unique `hintId` for `aria-describedby` (use `` `arcana-qs-${(this as any)._uid ?? Math.random().toString(36).slice(2)}` `` — but avoid `Math.random` in tests; instead derive from `this.$.uid` if available, else a module counter). Use a module-level incrementing counter for the id to stay deterministic.
- Root classes: `arcana-quick-search` + `{ 'is-disabled': disabled, 'has-counter': counter != null }`.
- `search()` → `this.$emit('search', this.text)` on `@keyup.enter`.
- `clear()` → set text to `''`, `$emit('clear')`, then `search()` (emits `['']`).
- `reset()` (public) → set text to `''` **without** emitting search.
- `focus()` (public) → `(this.$refs.input as HTMLInputElement).focus()`.
- Counter shown `v-if="counter != null"`; unit hidden when `hideUnit`.
- Info block + hint shown `v-if="searchFields.length"`.
- Inline SVGs: magnifying-glass, x-circle, circle-info (16px viewBox, `currentColor`, `class="arcana-quick-search__icon"` etc.). Copy standard Lucide-style paths.

Add the doc-comment header (Portuguese) describing anatomy + props/emits/methods, like other SFCs.

- [ ] **Step 4: Register in `src/vue.ts`**

```ts
export { default as ArcanaQuickSearch } from "./vue/components/ArcanaQuickSearch.vue";
```

- [ ] **Step 5: Run the Vue tests, verify pass**

Run: `npx vitest run tests/quick-search-components.test.tsx -t "Vue"`
Expected: PASS (4 tests).

- [ ] **Step 6: Commit**

```bash
git add src/vue/components/ArcanaQuickSearch.vue src/vue.ts tests/quick-search-components.test.tsx
git commit -m "feat(vue): ArcanaQuickSearch"
```

---

### Task A3: ArcanaQuickSearch — React port + barrel + parity test

**Files:**
- Create: `src/react/ArcanaQuickSearch.tsx`
- Modify: `src/react/index.ts`
- Test: append a React block to `tests/quick-search-components.test.tsx`

**Interfaces:**
- Consumes: DOM/class/behavior contract from A1/A2.
- Produces: `ArcanaQuickSearch` (forwardRef), `ArcanaQuickSearchProps`, `ArcanaQuickSearchHandle { reset(): void; focus(): void }`. Props mirror A2 with `value`/`onValueChange` instead of `modelValue`, plus `onSearch(value)`, `onClear()`, `className`.

- [ ] **Step 1: Write the failing React test** (append)

```tsx
import { fireEvent, render } from "@testing-library/react";
import { createRef } from "react";
import { ArcanaQuickSearch as RQuickSearch, type ArcanaQuickSearchHandle } from "../src/react/ArcanaQuickSearch";

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
```

- [ ] **Step 2: Run, verify fail** — Run: `npx vitest run tests/quick-search-components.test.tsx -t "React"` → FAIL (module missing).

- [ ] **Step 3: Write `src/react/ArcanaQuickSearch.tsx`** mirroring the Vue markup + Task A1 DOM. Controlled via `value`/`onValueChange`; keep an internal `useState` fallback when `value` is undefined (uncontrolled). `useImperativeHandle` exposes `reset` (clears internal state / calls `onValueChange("")` without `onSearch`) and `focus`. Follow `src/react/ArcanaCountdown.tsx` header/handle idioms.

- [ ] **Step 4: Register in `src/react/index.ts`**

```ts
export { ArcanaQuickSearch } from "./ArcanaQuickSearch";
export type { ArcanaQuickSearchProps, ArcanaQuickSearchHandle } from "./ArcanaQuickSearch";
```

- [ ] **Step 5: Run, verify pass** — Run: `npx vitest run tests/quick-search-components.test.tsx -t "React"` → PASS.

- [ ] **Step 6: Commit**

```bash
git add src/react/ArcanaQuickSearch.tsx src/react/index.ts tests/quick-search-components.test.tsx
git commit -m "feat(react): ArcanaQuickSearch"
```

---

### Task A4: ArcanaQuickSearch — Angular port + barrel + parity test

**Files:**
- Create: `src/angular/arcana-quick-search.component.ts`
- Modify: `src/angular/index.ts`
- Test: append an Angular block to `tests/quick-search-components.test.tsx`

**Interfaces:**
- Produces: `ArcanaQuickSearchComponent`, selector `div[arcanaQuickSearch]`, `@Input()`s mirroring A2 (`value`, `placeholder`, `searchFields`, `fieldsLabel`, `counter`, `unit`, `hideUnit`, `disabled`, `clearLabel`), `@Output()`s `valueChange`, `search`, `clear`; public methods `reset()`, `focus()`.

- [ ] **Step 1: Write the failing Angular test** (append; follow the Angular block in `tests/metrics-components.test.tsx` for `TestBed` + `provideZonelessChangeDetection` setup)

```tsx
import "@angular/compiler";
import { Component } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { ArcanaQuickSearchComponent } from "../src/angular/arcana-quick-search.component";

describe("ArcanaQuickSearch (Angular)", () => {
  it("renders contract and emits search on Enter", async () => {
    @Component({
      standalone: true,
      imports: [ArcanaQuickSearchComponent],
      template: `<div arcanaQuickSearch [searchFields]="['Code','Name']" [counter]="42" unit="items" (search)="last = $event"></div>`,
    })
    class Host { last = ""; }
    const fx = TestBed.configureTestingModule({ imports: [Host] }).createComponent(Host);
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
});
```

- [ ] **Step 2: Run, verify fail** → FAIL.

- [ ] **Step 3: Write `src/angular/arcana-quick-search.component.ts`** — standalone, OnPush, `selector: "div[arcanaQuickSearch]"`, `host: { class: "arcana-quick-search", "[class.is-disabled]": "disabled", "[class.has-counter]": "counter !== null && counter !== undefined" }`, inline template using `@if`/`@for` mirroring Task A1 DOM. Bind input with `(input)`/`(keyup.enter)`. `focus()`/`reset()` public methods use `ElementRef`/`ViewChild`. Follow `src/angular/arcana-accordion.component.ts` header + host-binding idioms.

- [ ] **Step 4: Register in `src/angular/index.ts`**

```ts
export { ArcanaQuickSearchComponent } from "./arcana-quick-search.component";
```

- [ ] **Step 5: Run, verify pass** → PASS.

- [ ] **Step 6: Commit** — `git commit -m "feat(angular): ArcanaQuickSearch"`

---

### Task A5: ArcanaQuickSearch — Svelte port + barrel + parity test

**Files:**
- Create: `src/svelte/ArcanaQuickSearch.svelte`
- Modify: `src/svelte.ts` (3 spots)
- Test: append a Svelte block to `tests/quick-search-components.test.tsx`

**Interfaces:**
- Produces: `ArcanaQuickSearch` Svelte component, props mirroring A2 with `value`/`onValueChange`, `onSearch`, `onClear`, `class`; exported functions `reset()`, `focus()`.

- [ ] **Step 1: Write the failing Svelte test** (append; follow Svelte block in `tests/metrics-components.test.tsx` — `mount`/`unmount` + `flushSync`)

```tsx
import { flushSync, mount, unmount } from "svelte";
import ArcanaQuickSearchSvelte from "../src/svelte/ArcanaQuickSearch.svelte";

describe("ArcanaQuickSearch (Svelte)", () => {
  it("renders contract and emits search on Enter", () => {
    const target = document.createElement("div");
    document.body.appendChild(target);
    let last = "";
    const app = mount(ArcanaQuickSearchSvelte, {
      target,
      props: { searchFields: ["Code", "Name"], counter: 42, unit: "items", onSearch: (v: string) => (last = v) },
    });
    flushSync();
    expect(target.querySelector(".arcana-quick-search.has-counter")).toBeTruthy();
    expect([...target.querySelectorAll(".arcana-quick-search__hint-item")].map((n) => n.textContent))
      .toEqual(["Code", "Name"]);
    const input = target.querySelector(".arcana-quick-search__input") as HTMLInputElement;
    input.value = "hello"; input.dispatchEvent(new Event("input"));
    input.dispatchEvent(new KeyboardEvent("keyup", { key: "Enter" }));
    flushSync();
    expect(last).toBe("hello");
    unmount(app);
    target.remove();
  });
});
```

- [ ] **Step 2: Run, verify fail** → FAIL.

- [ ] **Step 3: Write `src/svelte/ArcanaQuickSearch.svelte`** — Svelte 5 runes (`$props`, `$state`), callback props, `export function reset()/focus()`. Mirror Task A1 DOM. Follow `src/svelte/ArcanaCountdown.svelte` idioms.

- [ ] **Step 4: Register in `src/svelte.ts`** — three spots:
  1. top: `import ArcanaQuickSearchComponent from "./svelte/ArcanaQuickSearch.svelte";`
  2. typed props block: `export interface ArcanaQuickSearchProps { value?: string; placeholder?: string; searchFields?: string[]; fieldsLabel?: string; counter?: number | string | null; unit?: string; hideUnit?: boolean; disabled?: boolean; clearLabel?: string; onValueChange?: (v: string) => void; onSearch?: (v: string) => void; onClear?: () => void; class?: string; }`
  3. `export const ArcanaQuickSearch = ArcanaQuickSearchComponent as unknown as Component<ArcanaQuickSearchProps>;`

- [ ] **Step 5: Run, verify pass** → PASS.

- [ ] **Step 6: Commit** — `git commit -m "feat(svelte): ArcanaQuickSearch"`

---

# PART B — ArcanaWizard + ArcanaWizardStep

### Task B1: Core wizard helpers (pure, TDD)

**Files:**
- Create: `src/core/wizard.ts`
- Test: `tests/core-wizard.test.ts`
- Modify: `src/vue.ts`, `src/react.ts`, `src/angular.ts` (re-export core types/helpers — the repo re-exports core from each framework barrel)

**Interfaces:**
- Produces:
  ```ts
  export type WizardStepStatus = "completed" | "active" | "pending";
  export function stepStatus(index: number, current: number): WizardStepStatus;
  export function clampStep(step: number, total: number): number;
  export function canNavigateTo(target: number, current: number, linear: boolean): boolean;
  export function formatStepLabel(tpl: string, current: number, total: number): string;
  ```

- [ ] **Step 1: Write `tests/core-wizard.test.ts`**

```ts
import { describe, expect, it } from "vitest";
import { canNavigateTo, clampStep, formatStepLabel, stepStatus } from "../src/core/wizard";

describe("core/wizard", () => {
  it("stepStatus", () => {
    expect(stepStatus(0, 1)).toBe("completed");
    expect(stepStatus(1, 1)).toBe("active");
    expect(stepStatus(2, 1)).toBe("pending");
  });
  it("clampStep bounds to [0, total-1]", () => {
    expect(clampStep(-3, 3)).toBe(0);
    expect(clampStep(9, 3)).toBe(2);
    expect(clampStep(1, 3)).toBe(1);
    expect(clampStep(0, 0)).toBe(0);
  });
  it("canNavigateTo respects linear", () => {
    expect(canNavigateTo(3, 1, true)).toBe(false);   // ahead blocked in linear
    expect(canNavigateTo(0, 1, true)).toBe(true);     // back allowed
    expect(canNavigateTo(1, 1, true)).toBe(true);     // same
    expect(canNavigateTo(3, 1, false)).toBe(true);    // free navigation
  });
  it("formatStepLabel fills placeholders", () => {
    expect(formatStepLabel("Step {current} of {total}", 1, 4)).toBe("Step 2 of 4");
    expect(formatStepLabel("Passo {current} de {total}", 0, 3)).toBe("Passo 1 de 3");
  });
});
```

Note: `formatStepLabel` renders `current` as **1-based** (`current + 1`).

- [ ] **Step 2: Run, verify fail** — Run: `npx vitest run tests/core-wizard.test.ts` → FAIL.

- [ ] **Step 3: Write `src/core/wizard.ts`**

```ts
/**
 * Helpers puros por trás de `<ArcanaWizard>`/`<ArcanaWizardStep>` em todos os ports.
 * Sem DOM, determinístico — a lógica de navegação vive aqui e é testada isolada;
 * os componentes só renderizam e disparam eventos.
 */
export type WizardStepStatus = "completed" | "active" | "pending";

/** Status de um passo `index` em relação ao passo atual `current` (0-based). */
export function stepStatus(index: number, current: number): WizardStepStatus {
  if (index < current) return "completed";
  if (index === current) return "active";
  return "pending";
}

/** Restringe `step` a `[0, total-1]` (e nunca negativo quando `total` é 0). */
export function clampStep(step: number, total: number): number {
  const max = Math.max(0, total - 1);
  if (step < 0) return 0;
  if (step > max) return max;
  return step;
}

/** Pode navegar direto pro passo `target`? Em modo linear só passos já alcançados. */
export function canNavigateTo(target: number, current: number, linear: boolean): boolean {
  if (!linear) return true;
  return target <= current;
}

/** Preenche `{current}` (1-based) e `{total}` no template do rodapé. */
export function formatStepLabel(tpl: string, current: number, total: number): string {
  return tpl.replace("{current}", String(current + 1)).replace("{total}", String(total));
}
```

- [ ] **Step 4: Run, verify pass** → PASS.

- [ ] **Step 5: Re-export from framework barrels** — add to `src/vue.ts`, `src/react.ts`, `src/angular.ts` (match how existing core is re-exported there, e.g. `export * from "./core/wizard";` or the typed pattern used for `countdown`). Grep each barrel for `core/countdown` to copy the exact style.

- [ ] **Step 6: Commit**

```bash
git add src/core/wizard.ts tests/core-wizard.test.ts src/vue.ts src/react.ts src/angular.ts
git commit -m "feat(core): helpers de wizard (stepStatus/clampStep/canNavigateTo/formatStepLabel)"
```

---

### Task B2: Wizard styles part

**Files:**
- Create: `src/styles/parts/wizard.scss`
- Modify: `src/styles/components.scss` (add `@import "./parts/wizard";`)

DOM contract:

```html
<div class="arcana-wizard">
  <div class="arcana-wizard__stepper">
    <!-- per step -->
    <div class="arcana-wizard__step is-active|is-completed|is-pending" [class.is-clickable]>
      <div class="arcana-wizard__indicator"><svg class="arcana-wizard__check">…</svg> | {n}</div>
      <div class="arcana-wizard__label">
        <div class="arcana-wizard__title">{title}</div>
        <div class="arcana-wizard__description">{description}</div>
      </div>
    </div>
    <div class="arcana-wizard__connector is-completed?"></div>
    <div class="arcana-wizard__header-actions"><!-- slot --></div>
  </div>
  <div class="arcana-wizard__body">
    <div class="arcana-wizard-step"><!-- active step content --></div>
  </div>
  <div class="arcana-wizard__footer">
    <span class="arcana-wizard__footer-text">{stepLabel}</span>
    <div class="arcana-wizard__footer-actions"><!-- buttons --></div>
  </div>
</div>
```

- [ ] **Step 1: Write the styles part**, mirroring `WizardShell.vue` lines 313-513 (shadcn variant) with usage tokens. Key values: indicator 28px circle, `border: 1px solid var(--arcana-border)`, active → bg/border `var(--arcana-text)` (near-black) + white indicator text + `var(--arcana-text)` title, completed → `var(--arcana-success)` bg/border + white check + `var(--arcana-success-text)` title; connector 1px line `margin-top: 14px`, `is-completed` → success color; footer `border-top: 1px solid var(--arcana-border)`, footer-text `var(--arcana-text-muted)` 13px. Include Portuguese doc-comment header. Mobile: hide `.arcana-wizard__description`.

- [ ] **Step 2: Add the import** to `components.scss`.

- [ ] **Step 3: Verify Sass compiles** — Run: `npx sass src/styles/components.scss > /dev/null` → no errors.

- [ ] **Step 4: Commit** — `git commit -m "feat(styles): parte wizard (ArcanaWizard)"`

---

### Task B3: ArcanaWizard + ArcanaWizardStep — Vue SFCs + Vue test + barrel

**Files:**
- Create: `src/vue/components/ArcanaWizard.vue`, `src/vue/components/ArcanaWizardStep.vue`
- Modify: `src/vue.ts`
- Test: `tests/wizard-components.test.tsx` (Vue block)

**Interfaces:**
- Produces the shared context contract (mirrored by all ports):
  ```ts
  interface WizardApi {
    register(step: { title: string; description?: string }): number; // returns index; unregister on unmount
    unregister(index: number): void;
    isActive(index: number): boolean;
    current(): number;
  }
  ```
- `ArcanaWizard` props: `modelValue: number` (default 0), `validate?: (step: number) => boolean | string | Promise<boolean | string>`, `linear?: boolean` (default true), `cancellable?: boolean` (default false), `continueLabel?: string` (default "Continue"), `backLabel?: string` (default "Back"), `cancelLabel?: string` (default "Cancel"), `finalLabel?: string` (default "Finish"), `finalDisabled?: boolean`, `stepLabel?: string` (default "Step {current} of {total}"). Emits: `update:modelValue`, `next`, `back`, `cancel`, `finish`. Slots: default, `header-actions`, `footer` (scope `{ step, total, isFirst, isLast, back, next, finish, cancel }`).
- `ArcanaWizardStep` props: `title: string` (required), `description?: string`. Default slot = body.

Design note on step registration in Vue: children register title/description via `inject`ed `wizardApi.register()` on `mounted` and `unregister` on `beforeUnmount`. To keep the stepper header rendering **in declaration order** and reactive, the shell keeps a reactive `steps: {title, description}[]` array; each `ArcanaWizardStep` renders its body only when `wizardApi.isActive(myIndex)`. Since registration order equals DOM order for statically-declared steps, index assignment = push order.

- [ ] **Step 1: Write the failing Vue test** in `tests/wizard-components.test.tsx`

```tsx
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { defineComponent, h } from "vue";
import ArcanaWizard from "../src/vue/components/ArcanaWizard.vue";
import ArcanaWizardStep from "../src/vue/components/ArcanaWizardStep.vue";

const Harness = defineComponent({
  components: { ArcanaWizard, ArcanaWizardStep },
  props: { linear: { type: Boolean, default: true }, validate: { type: Function, default: undefined } },
  data: () => ({ step: 0 }),
  template: `
    <ArcanaWizard v-model="step" :linear="linear" :validate="validate"
      @finish="$emit('finished')">
      <ArcanaWizardStep title="Type" description="A"><div class="c0">zero</div></ArcanaWizardStep>
      <ArcanaWizardStep title="Doc"><div class="c1">one</div></ArcanaWizardStep>
      <ArcanaWizardStep title="Confirm"><div class="c2">two</div></ArcanaWizardStep>
    </ArcanaWizard>`,
});

describe("ArcanaWizard (Vue)", () => {
  it("renders stepper titles and only the active step body", () => {
    const w = mount(Harness);
    expect(w.findAll(".arcana-wizard__title").map((n) => n.text())).toEqual(["Type", "Doc", "Confirm"]);
    expect(w.find(".c0").exists()).toBe(true);
    expect(w.find(".c1").exists()).toBe(false);
    // step 0 completed marker absent; active class present
    expect(w.findAll(".arcana-wizard__step")[0].classes()).toContain("is-active");
    expect(w.findAll(".arcana-wizard__step")[2].classes()).toContain("is-pending");
  });

  it("advances on Continue and marks completed", async () => {
    const w = mount(Harness);
    await w.find(".arcana-wizard__footer-actions button:last-child").trigger("click");
    expect((w.vm as any).step).toBe(1);
    expect(w.find(".c1").exists()).toBe(true);
    expect(w.findAll(".arcana-wizard__step")[0].classes()).toContain("is-completed");
  });

  it("validate returning false blocks advance", async () => {
    const w = mount(Harness, { props: { validate: () => false } });
    await w.find(".arcana-wizard__footer-actions button:last-child").trigger("click");
    expect((w.vm as any).step).toBe(0);
  });

  it("last step shows Finish and emits finish", async () => {
    const w = mount(Harness);
    (w.findComponent(ArcanaWizard).vm as any).$emit; // no-op ref
    (w.vm as any).step = 2;
    await w.vm.$nextTick();
    expect(w.find(".arcana-wizard__footer-actions button:last-child").text()).toBe("Finish");
    await w.find(".arcana-wizard__footer-actions button:last-child").trigger("click");
    expect(w.emitted("finished")).toBeTruthy();
  });
});
```

- [ ] **Step 2: Run, verify fail** → FAIL (modules missing).

- [ ] **Step 3: Write the two SFCs.**

`ArcanaWizardStep.vue` — `inject: ["wizardApi"]`; `data() { return { index: -1 } }`; `mounted() { this.index = this.wizardApi.register({ title: this.title, description: this.description }) }`; `beforeUnmount() { this.wizardApi.unregister(this.index) }`; template:
```html
<div v-if="wizardApi.isActive(index)" class="arcana-wizard-step"><slot /></div>
```

`ArcanaWizard.vue` — Options API, `provide()` a stable `wizardApi` (functions read `this`, like `ArcanaAccordion` closures). `data`: `steps: [] as {title,description?}[]`. `provide`:
```ts
provide() {
  return {
    wizardApi: {
      register: (s) => { this.steps.push(s); return this.steps.length - 1 },
      unregister: (i) => { /* mark removed; simplest: this.steps.splice(i,1) is unsafe with indexes — instead keep a fixed slot: */ },
      isActive: (i) => i === this.modelValue,
      current: () => this.modelValue,
    },
  }
}
```
> Registration caveat: use a monotonic registration so indexes stay stable. Simplest robust approach: `register` pushes and returns index; on `unregister` set that slot to a tombstone (`null`) and filter tombstones only for the **rendered stepper** (`stepsForRender = steps.filter(Boolean)`). For statically-declared steps (the supported case) no unm（ount happens mid-flow, so `steps` equals declaration order. Document this in the header comment (dynamic add/remove of steps at runtime is out of scope).

Template regions per Task B2 DOM:
- Stepper: `v-for="(s, i) in steps"` → step div with `:class="stepClasses(i)"` where `stepClasses` uses `stepStatus(i, modelValue)` from `core/wizard` → `is-completed|is-active|is-pending`, plus `is-clickable` when `canNavigateTo(i, modelValue, linear)`. Click → `goToStep(i)` (guarded by `canNavigateTo`). Indicator shows inline-SVG check when completed, else `i + 1`. Connector between steps with `is-completed` when `i < modelValue`. `header-actions` slot at the end.
- Body: `<div class="arcana-wizard__body"><slot /></div>` (the steps self-render their active body).
- Footer: `__footer-text` = `formatStepLabel(stepLabel, modelValue, steps.length)`. `__footer-actions`: if `footer` slot provided, render it with scope; else default buttons — Cancel (`v-if="cancellable"`, `@click="$emit('cancel')"`), Back (`v-if="modelValue > 0"`, `@click="goBack"`, text `backLabel`), then either Continue (`v-if="!isLast"`, `@click="handleNext"`, text `continueLabel`) or Finish (`v-else`, `@click="$emit('finish')"`, text `finalLabel`, `:disabled="finalDisabled"`). Use plain `<button>` elements with classes `arcana-wizard__btn` + a variant class (do NOT depend on ArcanaButton to keep the parity test framework-pure; style buttons in `wizard.scss`).

Methods:
```ts
computed: {
  isLast(): boolean { return this.modelValue >= this.steps.length - 1 },
  isFirst(): boolean { return this.modelValue <= 0 },
},
methods: {
  stepClasses(i) { return [`is-${stepStatus(i, this.modelValue)}`, { 'is-clickable': canNavigateTo(i, this.modelValue, this.linear) }] },
  goToStep(step) { const s = clampStep(step, this.steps.length); this.$emit('update:modelValue', s) },
  goToStepIfAllowed(i) { if (canNavigateTo(i, this.modelValue, this.linear)) this.goToStep(i) },
  goBack() { this.$emit('back', this.modelValue); this.goToStep(this.modelValue - 1) },
  async handleNext() {
    if (this.validate) { const r = await this.validate(this.modelValue); if (r === false || typeof r === 'string') return }
    this.$emit('next', this.modelValue); this.goToStep(this.modelValue + 1)
  },
}
```
Header doc-comment (Portuguese) describing anatomy, props/emits/slots, the `validate` contract (false/string block; string surfaced to consumer, not auto-alerted), and the static-steps caveat.

- [ ] **Step 4: Register in `src/vue.ts`**

```ts
export { default as ArcanaWizard } from "./vue/components/ArcanaWizard.vue";
export { default as ArcanaWizardStep } from "./vue/components/ArcanaWizardStep.vue";
```

- [ ] **Step 5: Run, verify pass** — Run: `npx vitest run tests/wizard-components.test.tsx -t "Vue"` → PASS.

- [ ] **Step 6: Commit** — `git commit -m "feat(vue): ArcanaWizard + ArcanaWizardStep"`

---

### Task B4: Wizard — React port + barrel + parity test

**Files:**
- Create: `src/react/ArcanaWizard.tsx`, `src/react/ArcanaWizardStep.tsx`
- Modify: `src/react/index.ts`
- Test: append React block to `tests/wizard-components.test.tsx`

**Interfaces:**
- `ArcanaWizard.tsx` exports `WizardContext` (`createContext<WizardApi | null>(null)`), `ArcanaWizard`, `ArcanaWizardProps`. Props mirror B3 with `value`/`onValueChange` instead of `modelValue`; events `onNext`, `onBack`, `onCancel`, `onFinish`; slots `headerActions?: ReactNode`, `footer?: (scope) => ReactNode`.
- `ArcanaWizardStep.tsx` exports `ArcanaWizardStep`, `ArcanaWizardStepProps { title: string; description?: string; children?: ReactNode }`.

React registration approach (mirror Accordion context; avoid mount-order index races): the step **does not** self-index. Instead, `ArcanaWizard` reads step metadata by iterating `React.Children` of its `children` to build the `steps[]` for the stepper header (title/description), and renders only the child at `value`. Each `ArcanaWizardStep` renders its own children only when `useContext(WizardContext).activeIndex === itsDeclaredIndex`; the wizard passes each child a clone with its index via `React.Children.map((child, i) => cloneElement(child, { __index: i }))`, OR simpler: the wizard itself renders `childrenArray[value]` in the body and derives the header from `childrenArray.map(c => c.props)`. Use the simpler approach — the step component becomes a pure metadata+content holder, and the shell controls what renders. Document this in the header.

- [ ] **Step 1: Write failing React test** (append) — mirror the Vue test: render `<ArcanaWizard value={step} onValueChange={setStep}>` with 3 `<ArcanaWizardStep>`; assert titles, active body, advance on Continue click, `validate` blocks, Finish emits `onFinish`. Use a small wrapper component with `useState`.

- [ ] **Step 2: Run, verify fail** → FAIL.

- [ ] **Step 3: Write both `.tsx`** per the approach above; buttons are plain `<button className="arcana-wizard__btn …">`. Follow `src/react/ArcanaAccordion.tsx` context idioms and `formatStepLabel`/`stepStatus`/`canNavigateTo` from `../core/wizard`. `handleNext` awaits `validate` and returns early on `false`/string.

- [ ] **Step 4: Register in `src/react/index.ts`** — `ArcanaWizard`, `ArcanaWizardStep`, `ArcanaWizardProps`, `ArcanaWizardStepProps`.

- [ ] **Step 5: Run, verify pass** → PASS.

- [ ] **Step 6: Commit** — `git commit -m "feat(react): ArcanaWizard + ArcanaWizardStep"`

---

### Task B5: Wizard — Angular port + barrel + parity test

**Files:**
- Create: `src/angular/arcana-wizard.component.ts`, `src/angular/arcana-wizard-step.component.ts`
- Modify: `src/angular/index.ts`
- Test: append Angular block to `tests/wizard-components.test.tsx`

**Interfaces:**
- `ArcanaWizardComponent`, selector `div[arcanaWizard]`, `@Input()`s mirroring B3 (`value`, `validate`, `linear`, `cancellable`, `continueLabel`, `backLabel`, `cancelLabel`, `finalLabel`, `finalDisabled`, `stepLabel`), `@Output()`s `valueChange`, `next`, `back`, `cancel`, `finish`.
- `ArcanaWizardStepComponent`, selector `[arcanaWizardStep]`, `@Input()`s `title`, `description`; registers with parent via `inject(ArcanaWizardComponent)` on init, unregisters on destroy; projects content (`<ng-content>`) only when active.

Angular approach: parent-component DI exactly like Accordion. Steps register `{ title, description }` and get an index; parent keeps a `steps` array (mutate + `markForCheck()`). Step template: `@if (wizard.isActive(index)) { <div class="arcana-wizard-step"><ng-content></ng-content></div> }`. Parent stepper header renders from `steps`. Because content projection needs the step host in the DOM regardless, the step host may be a bare `<div arcanaWizardStep>` whose inner `@if` gates the visible `.arcana-wizard-step`.

- [ ] **Step 1: Write failing Angular test** (append) — Host component with `<div arcanaWizard [value]="step" (valueChange)="step=$event">` containing 3 `<div arcanaWizardStep title="…">`. Assert titles, active body, advance, validate-block, Finish label + `finish` emit. Use `TestBed` + `provideZonelessChangeDetection` (copy setup from `tests/metrics-components.test.tsx`).

- [ ] **Step 2: Run, verify fail** → FAIL.

- [ ] **Step 3: Write both components** — standalone, OnPush, inline templates using `@if`/`@for`, `NgZone`/`markForCheck` where needed. Buttons plain `<button class="arcana-wizard__btn …" (click)>`. Follow `src/angular/arcana-accordion.component.ts` + item DI idioms; import helpers from `../core/wizard`.

- [ ] **Step 4: Register in `src/angular/index.ts`** — both classes.

- [ ] **Step 5: Run, verify pass** → PASS.

- [ ] **Step 6: Commit** — `git commit -m "feat(angular): ArcanaWizard + ArcanaWizardStep"`

---

### Task B6: Wizard — Svelte port + context module + barrel + parity test

**Files:**
- Create: `src/svelte/ArcanaWizard.svelte`, `src/svelte/ArcanaWizardStep.svelte`, `src/svelte/wizard-context.ts`
- Modify: `src/svelte.ts` (3 spots × 2 components)
- Test: append Svelte block to `tests/wizard-components.test.tsx`

**Interfaces:**
- `src/svelte/wizard-context.ts` (separate module because the parent may import the child):
  ```ts
  export interface WizardContextValue {
    register: (step: { title: string; description?: string }) => number;
    unregister: (index: number) => void;
    isActive: (index: number) => boolean;
    current: () => number;
  }
  export const WIZARD_CONTEXT = Symbol("arcana-wizard");
  ```
- `ArcanaWizard.svelte` props mirror B3 with `value`/`onValueChange`, callback props `onNext/onBack/onCancel/onFinish`, snippet props `children`, `headerActions?`, `footer?`.
- `ArcanaWizardStep.svelte` props `title`, `description`, snippet `children`.

Svelte approach: `setContext(WIZARD_CONTEXT, …)` in the shell; the step uses `getContext`. Because Svelte snippets don't expose child metadata to the parent for the header, the shell renders the stepper from a reactive `steps = $state<{title,description?}[]>([])` that steps push into via `register()` in an `$effect`/on init, mirroring Accordion. Step body wrapped in `{#if ctx.isActive(index)}`. Follow `src/svelte/context-menu-context.ts` + `ArcanaAccordion.svelte` idioms.

- [ ] **Step 1: Write failing Svelte test** (append) — build a tiny wrapper `.svelte`? Simpler: mount `ArcanaWizard` with a `children` snippet is awkward in a `.tsx` test. Instead create a test-only harness `tests/fixtures/WizardHarness.svelte` that declares the 3 steps, exposes `step` via a bindable prop, and mount that. Assert titles, active body, advance on Continue click (dispatch click on last footer button), validate-block, Finish. (Add the fixture under `tests/fixtures/`.)

- [ ] **Step 2: Run, verify fail** → FAIL.

- [ ] **Step 3: Write the two `.svelte` + `wizard-context.ts`.** Buttons plain `<button class="arcana-wizard__btn …" onclick={…}>`. `handleNext` awaits `validate`.

- [ ] **Step 4: Register in `src/svelte.ts`** — for each of `ArcanaWizard`, `ArcanaWizardStep`: top import, typed props interface (`ArcanaWizardProps`, `ArcanaWizardStepProps`), and `export const … as unknown as Component<…>`.

- [ ] **Step 5: Run, verify pass** → PASS.

- [ ] **Step 6: Commit** — `git commit -m "feat(svelte): ArcanaWizard + ArcanaWizardStep"`

---

### Task B7: Full parity sweep + typecheck

- [ ] **Step 1: Run the whole suite** — Run: `npx vitest run tests/quick-search-components.test.tsx tests/wizard-components.test.tsx tests/core-wizard.test.ts` → all PASS.
- [ ] **Step 2: Typecheck** — Run: `npm run typecheck` → no errors (fix any barrel/type mismatches).
- [ ] **Step 3: Commit** any fixes — `git commit -m "test: paridade cross-framework de QuickSearch e Wizard"`

---

# PART C — Documentation (all 8 languages)

### Task C1: Registry + DocumentedKey

**Files:**
- Modify: `docs/src/components/registry.ts`, `docs/src/i18n/types.ts`

- [ ] **Step 1: Add registry entries** to `COMPONENTS` in `registry.ts`:
```ts
{ id: "arcana-quick-search", name: "ArcanaQuickSearch", label: "Quick Search", category: "forms", docKey: "quickSearch" },
```
in the forms block, and in the layout & navigation block:
```ts
{ id: "arcana-wizard", name: "ArcanaWizard", label: "Wizard", category: "layoutNav", docKey: "wizard" },
```
(Single `wizard` doc covers the shell + step; do not add a separate `wizard-step` doc entry.)

- [ ] **Step 2: Add keys to `DocumentedKey`** union in `docs/src/i18n/types.ts`:
```ts
  | "quickSearch"
  | "wizard"
```
- [ ] **Step 3: Typecheck docs to see the enforced gaps** — Run: `npm run typecheck:docs`
Expected: FAIL — every `i18n/*.ts` now missing `components.quickSearch` and `components.wizard`, and `COMPONENT_DOCS`/`FRAMEWORK_SNIPPETS` missing the two keys. (This confirms the parity gate; the next tasks fill the gaps.)
- [ ] **Step 4: Commit** — `git commit -m "docs: registra quickSearch e wizard (registry + DocumentedKey)"`

---

### Task C2: i18n blurbs + demo chrome in all 8 languages

**Files:**
- Modify: `docs/src/i18n/{en,pt,es,it,zh,ja,de,ru}.ts`

- [ ] **Step 1: Add `components.quickSearch.blurb` and `components.wizard.blurb`** to each of the 8 files (translated). English reference:
  - `quickSearch`: "A compact search field with an optional searchable-fields hint and a record-counter pill. Emits `search` on Enter and on clear; exposes `reset()`."
  - `wizard`: "A multi-step shell that renders a stepper header, one active step body, and a navigation footer. Compose it with `ArcanaWizardStep` children; gate advancement with `validate`."
- [ ] **Step 2: Add demo chrome strings** to the `demos` object in each of the 8 files (translated), e.g. `quickSearchPlaceholder`, `quickSearchUnit`, `quickSearchFieldsLabel`, `quickSearchFieldCode`/`quickSearchFieldName`/`quickSearchFieldPhone`, `wizardStepTypeTitle`/`wizardStepTypeDesc`, `wizardStepDocTitle`, `wizardStepConfirmTitle`/`wizardStepConfirmDesc`, `wizardContinue`, `wizardBack`, `wizardFinish`, `wizardTypePerson`, `wizardTypeCompany`, `wizardValidateHint`. Use the exact same keys in all 8 files (the shared `Messages` interface enforces parity).
- [ ] **Step 3: Typecheck docs** — Run: `npm run typecheck:docs`
Expected: now only `COMPONENT_DOCS` + `FRAMEWORK_SNIPPETS` gaps remain (blurb/demos parity satisfied).
- [ ] **Step 4: Commit** — `git commit -m "docs(i18n): blurbs e chrome de demo de quickSearch e wizard (8 idiomas)"`

---

### Task C3: Live demos + COMPONENT_DOCS entries

**Files:**
- Modify: `docs/src/components/componentDocs.ts`

- [ ] **Step 1: Add two live Vue demo components** (`QuickSearchDemo`, `WizardDemo`) as `const … : Component = { components: { ArcanaQuickSearch } | { ArcanaWizard, ArcanaWizardStep }, data() {…}, template: /* html */\`…\` }`. Import the SFCs at the top of the file (mirror how `CountdownDemo` imports). **All visible chrome via `{{ $dt.<key> }}`** (the keys added in C2) — no hardcoded strings. The Wizard demo wires `v-model` to a local `step` and shows the 3-step flow; the QuickSearch demo shows fields + a counter.
- [ ] **Step 2: Add `quickSearch` and `wizard` entries to `COMPONENT_DOCS`** with `demo`, `props: PropRow[]` (list every prop with type/default/description in English), `events` (e.g. `["search(value: string)", "update:modelValue(value: string)", "clear()"]` and `["update:modelValue(step)", "next(step)", "back(step)", "cancel()", "finish()"]`), `slots` (Wizard: `["default — <ArcanaWizardStep> children", "header-actions", "footer — { step, total, isFirst, isLast, back, next, finish, cancel }"]`; QuickSearch: none or omit), and a `vueSnippet` string mirroring real usage.
- [ ] **Step 3: Typecheck docs** — Run: `npm run typecheck:docs` → PASS (all `DocumentedKey` records now complete except `FRAMEWORK_SNIPPETS`, handled next; if `FRAMEWORK_SNIPPETS` is also `Record<DocumentedKey,…>` it will still error until C4).
- [ ] **Step 4: Commit** — `git commit -m "docs: demos e COMPONENT_DOCS de quickSearch e wizard"`

---

### Task C4: Framework snippets (React/Angular/Svelte)

**Files:**
- Modify: `docs/src/components/frameworkSnippets.ts`

- [ ] **Step 1: Add `quickSearch` and `wizard` entries** to `FRAMEWORK_SNIPPETS` — each a `FrameworkTriple { react, angular, svelte }` of realistic usage code strings mirroring the Vue snippet (import from `@arcanalabs/ui-components/{react,angular,svelte}`), including the compound `<ArcanaWizardStep>` usage and a `validate` example.
- [ ] **Step 2: Typecheck docs** — Run: `npm run typecheck:docs` → PASS.
- [ ] **Step 3: Docs i18n integrity test** — Run: `npx vitest run tests/docs-i18n.test.ts` → PASS (confirms no hardcoded demo chrome and language parity).
- [ ] **Step 4: Build docs** — Run: `npm run docs:build` → succeeds.
- [ ] **Step 5: Commit** — `git commit -m "docs: snippets React/Angular/Svelte de quickSearch e wizard"`

---

# PART D — Release

### Task D1: Version bump + changelog + full gate

**Files:**
- Modify: `package.json` (version `2.5.1` → `2.6.0`), `CHANGELOG.md`

- [ ] **Step 1: Bump version** in `package.json` to `2.6.0`.
- [ ] **Step 2: Prepend a `CHANGELOG.md` section** (Portuguese), format matching existing entries:
```markdown
## 2.6.0

### Novos recursos
- **ArcanaQuickSearch** — campo de busca compacto com dica de campos pesquisáveis e pill de contador. Emite `search` no Enter/limpar; expõe `reset()`/`focus()`. Portado para Vue, React, Angular e Svelte.
- **ArcanaWizard + ArcanaWizardStep** — shell multi-etapas (stepper + corpo do passo ativo + rodapé de navegação) com passos declarativos, hook `validate`, modo `linear` e slot de rodapé customizável. Portado para os 4 frameworks.

### Documentação
- Páginas de QuickSearch e Wizard nos 8 idiomas, com demos ao vivo e snippets React/Angular/Svelte.
```
- [ ] **Step 3: Run the full gate** — Run: `npm run check`
Expected: PASS (typecheck + typecheck:docs + test + build + docs:build).
- [ ] **Step 4: Commit the release** —
```bash
git add package.json CHANGELOG.md
git commit -m "release: v2.6.0 — QuickSearch e Wizard (shell + steps)"
```

### Task D2: Publish (gated on user confirmation)

- [ ] **Step 1: Confirm with the user** that pushing `main` (which triggers the live npm publish via CI `release.yml` and docs deploy via `docs.yml`) is authorized **now**.
- [ ] **Step 2: Push** — Run: `git push origin main`
- [ ] **Step 3: Watch CI** — Run: `gh run watch` (or `gh run list --limit 3`) until `release.yml` and `docs.yml` succeed.
- [ ] **Step 4: Verify publish** — Run: `npm view @arcanalabs/ui-components version` → `2.6.0`; confirm tag `v2.6.0` and the GitHub Release exist (`gh release view v2.6.0`).

---

## Self-Review

**Spec coverage:** QuickSearch (all props/events/reset/focus, field hint, counter, inline SVG) → A1–A5. Wizard shell+steps compound, validate, linear, footer slot, stepper header → B1–B6. Core module + tests → B1. Styles parts → A1/B2. Barrels + core re-exports → in each port task + B1. Docs across 8 languages (registry, DocumentedKey, blurbs, demo chrome, live demos, COMPONENT_DOCS, framework snippets) → C1–C4. Tests (core + cross-framework parity + docs-i18n integrity) → A2–A5, B1/B3–B7, C4. Release 2.6.0 + changelog + publish-on-push with confirmation → D1–D2. All spec sections mapped.

**Placeholder scan:** No "TBD"/"handle edge cases". The ports (A3–A5, B4–B6) intentionally reference the Vue source-of-truth + cited analog files rather than transcribing ~200 mechanical lines each — this matches how the repo is actually built and the "identical markup" contract + parity tests make the target unambiguous. Each such task still pins exact file paths, the full prop/event/method contract, the DOM contract, the context-wiring approach, and concrete test assertions.

**Type consistency:** `stepStatus`/`clampStep`/`canNavigateTo`/`formatStepLabel` signatures are identical in B1's core file, its tests, and every consumer (B3–B6). `WizardApi`/`WizardContextValue` register/unregister/isActive/current match across Vue provide, React context, Angular DI, Svelte context module. QuickSearch contract (`reset()`/`focus()`, `search`/`clear` events, `has-counter`/`is-disabled` classes) is identical across A2–A5. `formatStepLabel` is documented 1-based in both the test and the implementation.
