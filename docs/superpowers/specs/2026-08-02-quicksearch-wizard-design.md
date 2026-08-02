# Design: `ArcanaQuickSearch` + `ArcanaWizard` / `ArcanaWizardStep`

**Date:** 2026-08-02
**Status:** Approved
**Target version:** 2.6.0 (two new components → minor bump)

## Motivation

The ERP (`erp-web`) uses two reusable UI patterns that belong in the shared library:

1. **QuickSearch** — a compact search input with a searchable-fields hint and a
   record-counter pill, used in list/grid page headers
   (`Customer.vue`, `Organisation.vue`).
2. **Wizard shell + steps** — a generic multi-step flow shell (stepper header +
   per-step body + navigation footer) that many `*WizardDialog.vue` consumers wrap
   inside a dialog (`WizardShell.vue`).

Both are currently Vue-only, depend on Element Plus / FontAwesome, and carry
Portuguese-hardcoded defaults. This work extracts them into `@arcanalabs/ui-components`
as framework-native, dependency-free, shadcn-styled components with identical markup
across Vue 3, React, Angular and Svelte, plus documentation in all 8 supported
languages.

## Conventions this follows

- **Vue SFC is the source of truth**; React/Angular/Svelte are hand-written ports that
  emit **identical DOM and CSS classes**.
- Shared non-visual logic → `src/core/*.ts` (pure, `now`/inputs injected, unit-tested).
- **All CSS is shared** in `src/styles/parts/<name>.scss`, `@import`ed at the top of
  `src/styles/components.scss`. SFCs carry no `<style>` block. BEM-ish classes + CSS
  custom properties with fallbacks; `.arcana-dark` support.
- Icons are **inline SVG** (no FontAwesome, no Element Plus).
- Compound (parent/child) components share an "api" object: Vue `provide`/`inject`,
  React `createContext`, Svelte `Symbol` + `setContext` (in a **separate module** when
  the parent imports the child), Angular parent-component `inject()`.
- Docs are a React+Vite app mounting the **real Vue components**; i18n parity across
  8 languages is compiler-enforced via a shared `Messages` interface.

---

## Component 1 — `ArcanaQuickSearch`

Single-line search input. Left→right anatomy:
info icon (only when `searchFields` present) → magnifying-glass icon → text input →
clear ✕ (only when text present) → counter pill (only when `counter != null`).
The searchable-fields hint is a **pure-CSS popover** shown on hover/focus of the info
icon (no positioning library, no Element Plus tooltip).

### Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `modelValue` | `string` | `""` | v-model / `value` in React/Svelte, `[value]` Angular |
| `placeholder` | `string` | `"Search"` (docs demo passes localized) | |
| `searchFields` | `string[]` | `[]` | when empty, info icon + hint hidden |
| `fieldsLabel` | `string` | `"Searchable fields:"` | hint heading |
| `counter` | `number \| string \| null` | `null` | when null, pill hidden |
| `unit` | `string` | `"registro(s)"` | suffix after counter |
| `hideUnit` | `boolean` | `false` | show only the number |
| `disabled` | `boolean` | `false` | |

> Defaults keep the ERP behavior where practical, but are neutral English strings so
> the component is not Portuguese-locked; ERP/consumers pass their own labels.

### Events

- `search(value: string)` — emitted on Enter and on clear (clear emits `""`).
- `update:modelValue(value: string)` / `onValueChange`.
- `clear()` — emitted when the clear button is pressed (in addition to `search("")`).

### Public methods (imperative handle)

- `reset()` — clears the text **without** emitting `search` (matches the original
  public method used when an external filter already refreshed).
- `focus()` — focuses the input.

### Markup / classes

Root `div.arcana-quick-search` (+ `is-disabled`, `has-counter`). Children:
`__info` (button/span wrapping info SVG) + `__hint` (CSS popover with `__hint-label`
and `__hint-list > __hint-item`), `__icon` (magnifying glass SVG), `__input`,
`__clear` (✕ SVG button), `__counter` pill (`__counter-value` + optional
`__counter-unit`). a11y: input `role` default, `__clear` has `aria-label`, hint has
`role="tooltip"` linked via `aria-describedby` when open.

### Core module

None — state is a single string; no shared pure logic worth extracting.

---

## Component 2 — `ArcanaWizard` (shell) + `ArcanaWizardStep` (child)

Compound. The shell renders three regions: **stepper header** (numbered circles that
become a check when completed, with connectors), **body** (only the active step's
content), and **footer** ("Step X of N" text + Back / Continue / Finish buttons). Step
metadata (title/description) is collected from the registered `ArcanaWizardStep`
children through shared context; only the active step's body is rendered.

### `ArcanaWizard` props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `modelValue` | `number` | `0` | current step, 0-indexed; v-model |
| `validate` | `(step: number) => boolean \| string \| Promise<boolean \| string>` | `undefined` | run by `next()` |
| `linear` | `boolean` | `true` | block header clicks on not-yet-reached steps |
| `cancellable` | `boolean` | `false` | show Cancel button in default footer |
| `continueLabel` | `string` | `"Continue"` | |
| `backLabel` | `string` | `"Back"` | |
| `cancelLabel` | `string` | `"Cancel"` | |
| `finalLabel` | `string` | `"Finish"` | |
| `finalDisabled` | `boolean` | `false` | |
| `stepLabel` | `string` | `"Step {current} of {total}"` | footer counter template (`{current}`/`{total}` placeholders) |

### `ArcanaWizard` events

`update:modelValue(step)`, `next(step)`, `back(step)`, `cancel()`, `finish()`.

### `ArcanaWizard` slots

- **default** — the `ArcanaWizardStep` children.
- **`header-actions`** — optional, right side of the stepper header.
- **`footer`** — scoped `{ step, total, isFirst, isLast, back, next, finish, cancel }`
  to fully replace the default footer buttons.

### `ArcanaWizardStep` props

- `title: string` (required)
- `description?: string`

Body content is the step's default slot / children. A step registers itself with the
shell on mount (index = declaration order) and unregisters on unmount.

### Navigation logic (shared via `src/core/wizard.ts`)

- `next()`: `result = await validate?.(current)`. `false` → block silently;
  `string` → block and emit nothing extra (consumer decides how to surface the message;
  the return string is exposed to the `footer` slot / not auto-alerted — keeps the lib
  dependency-free); `true`/`undefined` → advance via `update:modelValue(current+1)` and
  emit `next`. On the last step, the Continue button is replaced by Finish, which emits
  `finish`.
- `back()`: decrement, emit `back` + `update:modelValue`.
- Header click on step `i`: allowed if `!linear || i <= current`; navigates directly.

### Core module `src/core/wizard.ts`

Pure, DOM-free, unit-tested:

```ts
export type WizardStepStatus = "completed" | "active" | "pending";
export function stepStatus(index: number, current: number): WizardStepStatus;
export function clampStep(step: number, total: number): number;
export function canNavigateTo(target: number, current: number, linear: boolean): boolean;
export function formatStepLabel(tpl: string, current: number, total: number): string;
```

### Markup / classes

Root `div.arcana-wizard`. Header `div.arcana-wizard__stepper` with, per step,
`__step` (`is-completed` / `is-active` / `is-pending`, `is-clickable`) containing
`__indicator` (SVG check when completed, else `index+1`) and `__label`
(`__title` + optional `__description`), and `__connector` (`is-completed`) between
steps. Body `div.arcana-wizard__body` renders the active `div.arcana-wizard-step`.
Footer `div.arcana-wizard__footer` with `__footer-text` (step counter) and
`__footer-actions` (buttons). shadcn zinc palette; completed = emerald.

---

## Cross-framework port matrix

| | Vue | React | Angular | Svelte |
|---|---|---|---|---|
| QuickSearch | `src/vue/components/ArcanaQuickSearch.vue` (Options API) | `src/react/ArcanaQuickSearch.tsx` (`forwardRef` handle) | `src/angular/arcana-quick-search.component.ts` (`div[arcanaQuickSearch]`) | `src/svelte/ArcanaQuickSearch.svelte` (runes) |
| Wizard shell | `ArcanaWizard.vue` (`provide`) | `ArcanaWizard.tsx` (`createContext`) | `arcana-wizard.component.ts` | `ArcanaWizard.svelte` (`setContext`) |
| Wizard step | `ArcanaWizardStep.vue` (`inject`) | `ArcanaWizardStep.tsx` (`useContext`) | `arcana-wizard-step.component.ts` (`inject(ArcanaWizardComponent)`) | `ArcanaWizardStep.svelte` (`getContext`) |
| Wizard context module | provide/inject keys | context exported from `ArcanaWizard.tsx` | parent-component DI | `src/svelte/wizard-context.ts` (Symbol) — separate module because parent imports child |

Mapping rules per convention: slots → `ReactNode` props / content projection / Snippet
props; events → `onSearch`/`onFinish`/`@Output()`/callback props; v-model → `value` +
`onValueChange` (React/Svelte) / `[value]` + `(valueChange)` (Angular); imperative
methods → `useImperativeHandle` / `@ViewChild` methods / `export function`.

## Styles

- `src/styles/parts/quick-search.scss`
- `src/styles/parts/wizard.scss`
- Two `@import` lines near the top of `src/styles/components.scss`.

## Barrels & core re-exports

- `src/vue.ts`: `export { default as ArcanaQuickSearch } …`, `ArcanaWizard`, `ArcanaWizardStep`.
- `src/react/index.ts`: `export { … } from "./ArcanaQuickSearch"` (+ prop/handle types),
  wizard shell + step (+ context/prop types).
- `src/angular/index.ts`: the three component classes + exported types.
- `src/svelte.ts`: 3 spots each — top import, typed props block, `export const … as Component<…>`.
- `vue.ts` / `react.ts` / `angular.ts`: re-export `src/core/wizard` types + helpers.

## Docs (all 8 languages: en, pt, es, it, zh, ja, de, ru)

- `docs/src/components/registry.ts`: entries for QuickSearch and Wizard.
  `docKey`s: **`quickSearch`** and **`wizard`** (a single `wizard` doc documents both
  the shell and the step API inline, mirroring how Accordion documents its item).
- `docs/src/i18n/types.ts`: add `quickSearch` + `wizard` to `DocumentedKey`.
- All 8 `docs/src/i18n/*.ts`: add `components.quickSearch.blurb`,
  `components.wizard.blurb`, and any `demos.*` chrome strings (translated). No demo
  chrome hardcoded in a single language (enforced by `tests/docs-i18n.test.ts`).
- `docs/src/components/componentDocs.ts`: live Vue demos (chrome via `$dt`) + two
  `COMPONENT_DOCS` entries with `props` / `events` / `slots` / `vueSnippet`.
- `docs/src/components/frameworkSnippets.ts`: React/Angular/Svelte usage triples for both.

## Tests

- `tests/core-wizard.test.ts` — pure logic (`stepStatus`, `clampStep`,
  `canNavigateTo`, `formatStepLabel`).
- Cross-framework parity test(s) mounting each component in all 4 ports, asserting
  identical `arcana-*` classes, identical rendered text, a11y attributes, and behavior:
  QuickSearch emits `search` on Enter and clears; Wizard advances/blocks per `validate`,
  renders only the active step, marks completed steps, and respects `linear`.
- Keep `tests/docs-i18n.test.ts` green.

## Release

1. Update barrels + core re-exports.
2. Bump `package.json` `version` → `2.6.0`.
3. Prepend a Portuguese `CHANGELOG.md` section (`### Novos recursos`, etc.).
4. Run `npm run check` locally (typecheck + typecheck:docs + test + build + docs:build).
5. Commit `release: v2.6.0 — QuickSearch e Wizard (shell + steps)`.
6. **Publish** = push to `main`. CI `release.yml` re-runs `check` and publishes to npm
   (idempotent on version) + tags `v2.6.0` + GitHub Release; `docs.yml` deploys docs to
   GitHub Pages. **Confirm with the user before pushing to main**, since that push
   triggers the live npm publish.

## Out of scope

- No dialog wrapper component (`*WizardDialog`) — consumers wrap `ArcanaWizard` in
  `ArcanaDialog` themselves, as in the ERP.
- No `WizardProgress` chevron/arrow variant (separate presentational component in the
  ERP, not requested here).
- No auto-alerting of `validate` string results (would require a toast dependency);
  the string is surfaced to consumers via the footer slot instead.
