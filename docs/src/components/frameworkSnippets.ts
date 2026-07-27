import type { DocumentedKey } from "../i18n/types";

/**
 * Real *usage* snippets for the React, Angular and Svelte ports, keyed by the
 * same {@link DocumentedKey} used for the Vue snippet in `componentDocs.ts`.
 *
 * These mirror the Vue example one-to-one, translated to each framework's real
 * public API:
 *   • React   — `value` + `onValueChange`, `onX` event props, `children` / render props.
 *   • Angular — standalone components (`imports: [...]`), `arcana*` attribute selectors,
 *               `[(value)]` two-way binding, `(x)` outputs, `<ng-template>` slots.
 *   • Svelte  — `value` + `onValueChange`, `{#snippet}` named slots, `bind:this` for
 *               the imperative (dialog) API.
 */
export interface FrameworkTriple {
  react: string;
  angular: string;
  svelte: string;
}

export const FRAMEWORK_SNIPPETS: Record<DocumentedKey, FrameworkTriple> = {
  button: {
    react: `import { useState } from 'react'
import { ArcanaButton } from '@arcanalabs/ui-components/react'

export function Toolbar() {
  const [clicks, setClicks] = useState(0)
  return (
    <>
      {/* Variants — 'primary' is the default */}
      <ArcanaButton onClick={() => setClicks(clicks + 1)}>Primary</ArcanaButton>
      <ArcanaButton variant="secondary">Secondary</ArcanaButton>
      <ArcanaButton variant="outline">Outline</ArcanaButton>
      <ArcanaButton variant="ghost">Ghost</ArcanaButton>
      <ArcanaButton variant="success">Success</ArcanaButton>
      <ArcanaButton variant="indigo">Indigo</ArcanaButton>
      <ArcanaButton variant="destructive">Destructive</ArcanaButton>
      <ArcanaButton variant="outline-danger">Outline danger</ArcanaButton>
      <ArcanaButton disabled>Disabled</ArcanaButton>

      {/* Icon + label — the icon is just markup in the default slot */}
      <ArcanaButton variant="primary"><i className="fa-solid fa-plus" /> New</ArcanaButton>
      <ArcanaButton variant="outline"><i className="fa-solid fa-download" /> Export</ArcanaButton>
      <ArcanaButton variant="destructive"><i className="fa-solid fa-trash" /> Delete</ArcanaButton>
      <ArcanaButton variant="success">Save <i className="fa-solid fa-arrow-right" /></ArcanaButton>

      {/* Icon only — always pass aria-label for accessibility */}
      <ArcanaButton variant="outline" aria-label="Settings"><i className="fa-solid fa-gear" /></ArcanaButton>
      <ArcanaButton variant="ghost" aria-label="More options"><i className="fa-solid fa-ellipsis" /></ArcanaButton>
      <ArcanaButton variant="primary" aria-label="Add"><i className="fa-solid fa-plus" /></ArcanaButton>
      <ArcanaButton variant="destructive" aria-label="Delete"><i className="fa-solid fa-trash" /></ArcanaButton>

      <p>Primary clicked <strong>{clicks}</strong> times</p>
    </>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaButtonComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [ArcanaButtonComponent],
  template: \`
    <!-- Variants — 'primary' is the default -->
    <button arcanaButton (click)="clicks = clicks + 1">Primary</button>
    <button arcanaButton variant="secondary">Secondary</button>
    <button arcanaButton variant="outline">Outline</button>
    <button arcanaButton variant="ghost">Ghost</button>
    <button arcanaButton variant="success">Success</button>
    <button arcanaButton variant="indigo">Indigo</button>
    <button arcanaButton variant="destructive">Destructive</button>
    <button arcanaButton variant="outline-danger">Outline danger</button>
    <button arcanaButton [disabled]="true">Disabled</button>

    <!-- Icon + label — the icon is just markup projected into the button -->
    <button arcanaButton variant="primary"><i class="fa-solid fa-plus"></i> New</button>
    <button arcanaButton variant="outline"><i class="fa-solid fa-download"></i> Export</button>
    <button arcanaButton variant="destructive"><i class="fa-solid fa-trash"></i> Delete</button>
    <button arcanaButton variant="success">Save <i class="fa-solid fa-arrow-right"></i></button>

    <!-- Icon only — always pass aria-label for accessibility -->
    <button arcanaButton variant="outline" aria-label="Settings"><i class="fa-solid fa-gear"></i></button>
    <button arcanaButton variant="ghost" aria-label="More options"><i class="fa-solid fa-ellipsis"></i></button>
    <button arcanaButton variant="primary" aria-label="Add"><i class="fa-solid fa-plus"></i></button>
    <button arcanaButton variant="destructive" aria-label="Delete"><i class="fa-solid fa-trash"></i></button>

    <p>Primary clicked <strong>{{ clicks }}</strong> times</p>
  \`
})
export class ToolbarComponent {
  clicks = 0
}`,
    svelte: `<script lang="ts">
  import { ArcanaButton } from '@arcanalabs/ui-components/svelte'

  let clicks = $state(0)
</script>

<!-- Variants — 'primary' is the default -->
<ArcanaButton onClick={() => clicks++}>Primary</ArcanaButton>
<ArcanaButton variant="secondary">Secondary</ArcanaButton>
<ArcanaButton variant="outline">Outline</ArcanaButton>
<ArcanaButton variant="ghost">Ghost</ArcanaButton>
<ArcanaButton variant="success">Success</ArcanaButton>
<ArcanaButton variant="indigo">Indigo</ArcanaButton>
<ArcanaButton variant="destructive">Destructive</ArcanaButton>
<ArcanaButton variant="outline-danger">Outline danger</ArcanaButton>
<ArcanaButton disabled>Disabled</ArcanaButton>

<!-- Icon + label — the icon is just markup in the default slot -->
<ArcanaButton variant="primary"><i class="fa-solid fa-plus"></i> New</ArcanaButton>
<ArcanaButton variant="outline"><i class="fa-solid fa-download"></i> Export</ArcanaButton>
<ArcanaButton variant="destructive"><i class="fa-solid fa-trash"></i> Delete</ArcanaButton>
<ArcanaButton variant="success">Save <i class="fa-solid fa-arrow-right"></i></ArcanaButton>

<!-- Icon only — always pass aria-label for accessibility -->
<ArcanaButton variant="outline" aria-label="Settings"><i class="fa-solid fa-gear"></i></ArcanaButton>
<ArcanaButton variant="ghost" aria-label="More options"><i class="fa-solid fa-ellipsis"></i></ArcanaButton>
<ArcanaButton variant="primary" aria-label="Add"><i class="fa-solid fa-plus"></i></ArcanaButton>
<ArcanaButton variant="destructive" aria-label="Delete"><i class="fa-solid fa-trash"></i></ArcanaButton>

<p>Primary clicked <strong>{clicks}</strong> times</p>`
  },

  badge: {
    react: `import { ArcanaBadge } from '@arcanalabs/ui-components/react'

export function Statuses() {
  function filterByTag() { /* …apply filter */ }
  return (
    <>
      {/* Colour variants — 'neutral' is the default */}
      <ArcanaBadge>Neutral</ArcanaBadge>
      <ArcanaBadge variant="blue">Blue</ArcanaBadge>
      <ArcanaBadge variant="green">Green</ArcanaBadge>
      <ArcanaBadge variant="red">Red</ArcanaBadge>
      <ArcanaBadge variant="amber">Amber</ArcanaBadge>
      <ArcanaBadge variant="violet">Violet</ArcanaBadge>

      {/* Modifiers */}
      <ArcanaBadge variant="green" dot>Active</ArcanaBadge>
      <ArcanaBadge variant="red" dot>Offline</ArcanaBadge>
      <ArcanaBadge variant="blue" size="sm">Small size</ArcanaBadge>
      <ArcanaBadge variant="violet" clickable onClick={filterByTag}>Clickable</ArcanaBadge>
    </>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaBadgeComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-statuses',
  standalone: true,
  imports: [ArcanaBadgeComponent],
  template: \`
    <!-- Colour variants — 'neutral' is the default -->
    <span arcanaBadge>Neutral</span>
    <span arcanaBadge variant="blue">Blue</span>
    <span arcanaBadge variant="green">Green</span>
    <span arcanaBadge variant="red">Red</span>
    <span arcanaBadge variant="amber">Amber</span>
    <span arcanaBadge variant="violet">Violet</span>

    <!-- Modifiers -->
    <span arcanaBadge variant="green" [dot]="true">Active</span>
    <span arcanaBadge variant="red" [dot]="true">Offline</span>
    <span arcanaBadge variant="blue" size="sm">Small size</span>
    <span arcanaBadge variant="violet" [clickable]="true" (click)="filterByTag()">Clickable</span>
  \`
})
export class StatusesComponent {
  filterByTag() { /* …apply filter */ }
}`,
    svelte: `<script lang="ts">
  import { ArcanaBadge } from '@arcanalabs/ui-components/svelte'

  function filterByTag() { /* …apply filter */ }
</script>

<!-- Colour variants — 'neutral' is the default -->
<ArcanaBadge>Neutral</ArcanaBadge>
<ArcanaBadge variant="blue">Blue</ArcanaBadge>
<ArcanaBadge variant="green">Green</ArcanaBadge>
<ArcanaBadge variant="red">Red</ArcanaBadge>
<ArcanaBadge variant="amber">Amber</ArcanaBadge>
<ArcanaBadge variant="violet">Violet</ArcanaBadge>

<!-- Modifiers -->
<ArcanaBadge variant="green" dot>Active</ArcanaBadge>
<ArcanaBadge variant="red" dot>Offline</ArcanaBadge>
<ArcanaBadge variant="blue" size="sm">Small size</ArcanaBadge>
<ArcanaBadge variant="violet" clickable onClick={filterByTag}>Clickable</ArcanaBadge>`
  },

  input: {
    react: `import { useState } from 'react'
import { ArcanaInput } from '@arcanalabs/ui-components/react'

export function Fields() {
  const [email, setEmail] = useState('')
  const [qty, setQty] = useState<number | null>(null)
  const [search, setSearch] = useState('')
  return (
    <>
      <ArcanaInput value={email} onValueChange={(v) => setEmail(v as string)} type="email" placeholder="email@company.com" />
      <ArcanaInput value={qty} onValueChange={(v) => setQty(v as number | null)} type="number" min={0} max={99} />

      {/* Ícones no início e/ou no fim (qualquer ReactNode) */}
      <ArcanaInput value={search} onValueChange={(v) => setSearch(v as string)} placeholder="Search…" iconStart={<i className="icon-search" />} />
      <ArcanaInput value={qty} onValueChange={(v) => setQty(v as number | null)} type="number" iconEnd={<span>kg</span>} />
    </>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaInputComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-fields',
  standalone: true,
  imports: [ArcanaInputComponent],
  template: \`
    <input arcanaInput [(value)]="email" type="email" placeholder="email@company.com" />
    <input arcanaInput [(value)]="qty" type="number" [min]="0" [max]="99" />

    <!-- Ícones no início e/ou no fim (via TemplateRef) -->
    <input arcanaInput [(value)]="search" placeholder="Search…" [iconStart]="searchIcon" />
    <ng-template #searchIcon><i class="icon-search"></i></ng-template>

    <input arcanaInput [(value)]="qty" type="number" [iconEnd]="unit" />
    <ng-template #unit><span>kg</span></ng-template>
  \`
})
export class FieldsComponent {
  email: string | number | null = ''
  qty: string | number | null = null
  search: string | number | null = ''
}`,
    svelte: `<script lang="ts">
  import { ArcanaInput } from '@arcanalabs/ui-components/svelte'

  let email = $state('')
  let qty = $state<number | null>(null)
  let search = $state('')
</script>

<ArcanaInput value={email} onValueChange={(v) => (email = v as string)} type="email" placeholder="email@company.com" />
<ArcanaInput value={qty} onValueChange={(v) => (qty = v as number | null)} type="number" min={0} max={99} />

<!-- Ícones no início e/ou no fim (via snippets) -->
<ArcanaInput value={search} onValueChange={(v) => (search = v as string)} placeholder="Search…">
  {#snippet iconStart()}<i class="icon-search"></i>{/snippet}
</ArcanaInput>
<ArcanaInput value={qty} onValueChange={(v) => (qty = v as number | null)} type="number">
  {#snippet iconEnd()}<span>kg</span>{/snippet}
</ArcanaInput>`
  },

  select: {
    react: `import { useState } from 'react'
import { ArcanaSelect, type SelectOption } from '@arcanalabs/ui-components/react'

const fruits: SelectOption[] = [
  { label: 'Apple', value: 'apple', group: 'Common' },
  { label: 'Banana', value: 'banana', group: 'Common' },
  { label: 'Cherry', value: 'cherry', description: 'seasonal', group: 'Seasonal' },
  { label: 'Durian', value: 'durian', disabled: true, group: 'Seasonal' },
  { label: 'Elderberry', value: 'elderberry', group: 'Seasonal' },
]

// \`color\` on an option renders a dot; with triggerMode="dots" the trigger
// shows only the dots — the pattern used by the task status quick filter.
const statusOptions: SelectOption[] = [
  { label: 'To do', value: 'todo', color: '#10b981' },
  { label: 'In progress', value: 'in_progress', color: '#3b82f6' },
  { label: 'In review', value: 'in_review', color: '#8b5cf6' },
  { label: 'Done', value: 'done', color: '#64748b' },
  { label: 'Blocked', value: 'blocked', color: '#ef4444' },
]

export function FruitPicker() {
  const [single, setSingle] = useState<string | null>(null)
  const [many, setMany] = useState<string[]>([])
  const [statuses, setStatuses] = useState<string[]>(['todo', 'in_progress', 'in_review'])
  return (
    <>
      {/* Single + search */}
      <ArcanaSelect value={single} onValueChange={(v) => setSingle(v as string | null)} options={fruits} searchable placeholder="Pick a fruit" />

      {/* Closed-field and popover adornments; groups get headings + separators */}
      <ArcanaSelect
        value={single}
        onValueChange={(v) => setSingle(v as string | null)}
        options={fruits}
        prefix={<span>From</span>}
        suffix={<span>BR</span>}
        renderOptionPrefix={(option) => <span>#{option.value}</span>}
        renderOptionSuffix={(_option) => <span aria-hidden="true">›</span>}
        renderGroupLabel={(group) => <strong>{group}</strong>}
      />

      {/* Multiple — value is an array */}
      <ArcanaSelect value={many} onValueChange={(v) => setMany(v as string[])} options={fruits} multiple placeholder="Pick several" />

      {/* Quick filter: dots trigger, leading icon and a footer with a clear action */}
      <ArcanaSelect
        value={statuses}
        onValueChange={(v) => setStatuses(v as string[])}
        options={statusOptions}
        multiple
        triggerMode="dots"
        icon="fa-solid fa-flag"
        showFooter
        footerCountLabel="{count} selected"
        clearLabel="Clear"
        placeholder="Status"
      />
    </>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaSelectComponent, type SelectOption } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-fruit-picker',
  standalone: true,
  imports: [ArcanaSelectComponent],
  template: \`
    <ng-template #fieldPrefix>From</ng-template>
    <ng-template #fieldSuffix>BR</ng-template>
    <ng-template #optionPrefix let-option>#{{ option.value }}</ng-template>
    <ng-template #optionSuffix><span aria-hidden="true">›</span></ng-template>
    <ng-template #groupLabel let-group><strong>{{ group }}</strong></ng-template>

    <!-- Single + search -->
    <div arcanaSelect [(value)]="single" [options]="fruits" [searchable]="true" placeholder="Pick a fruit"></div>

    <!-- Closed-field and popover adornments; groups get headings + separators -->
    <div arcanaSelect
      [(value)]="single"
      [options]="fruits"
      [prefixTemplate]="fieldPrefix"
      [suffixTemplate]="fieldSuffix"
      [optionPrefixTemplate]="optionPrefix"
      [optionSuffixTemplate]="optionSuffix"
      [groupLabelTemplate]="groupLabel"></div>

    <!-- Multiple — value is an array -->
    <div arcanaSelect [(value)]="many" [options]="fruits" [multiple]="true" placeholder="Pick several"></div>

    <!-- Quick filter: dots trigger, leading icon and a footer with a clear action -->
    <div arcanaSelect
      [(value)]="statuses"
      [options]="statusOptions"
      [multiple]="true"
      triggerMode="dots"
      icon="fa-solid fa-flag"
      [showFooter]="true"
      footerCountLabel="{count} selected"
      clearLabel="Clear"
      placeholder="Status"></div>
  \`
})
export class FruitPickerComponent {
  single: string | null = null
  many: string[] = []
  statuses: string[] = ['todo', 'in_progress', 'in_review']
  fruits: SelectOption[] = [
    { label: 'Apple', value: 'apple', group: 'Common' },
    { label: 'Banana', value: 'banana', group: 'Common' },
    { label: 'Cherry', value: 'cherry', description: 'seasonal', group: 'Seasonal' },
    { label: 'Durian', value: 'durian', disabled: true, group: 'Seasonal' },
    { label: 'Elderberry', value: 'elderberry', group: 'Seasonal' },
  ]
  // \`color\` on an option renders a dot; with triggerMode="dots" the trigger
  // shows only the dots — the pattern used by the task status quick filter.
  statusOptions: SelectOption[] = [
    { label: 'To do', value: 'todo', color: '#10b981' },
    { label: 'In progress', value: 'in_progress', color: '#3b82f6' },
    { label: 'In review', value: 'in_review', color: '#8b5cf6' },
    { label: 'Done', value: 'done', color: '#64748b' },
    { label: 'Blocked', value: 'blocked', color: '#ef4444' },
  ]
}`,
    svelte: `<script lang="ts">
  import { ArcanaSelect, type SelectOption } from '@arcanalabs/ui-components/svelte'

  let single = $state<string | null>(null)
  let many = $state<string[]>([])
  let statuses = $state<string[]>(['todo', 'in_progress', 'in_review'])

  const fruits: SelectOption[] = [
    { label: 'Apple', value: 'apple', group: 'Common' },
    { label: 'Banana', value: 'banana', group: 'Common' },
    { label: 'Cherry', value: 'cherry', description: 'seasonal', group: 'Seasonal' },
    { label: 'Durian', value: 'durian', disabled: true, group: 'Seasonal' },
    { label: 'Elderberry', value: 'elderberry', group: 'Seasonal' },
  ]
  // \`color\` on an option renders a dot; with triggerMode="dots" the trigger
  // shows only the dots — the pattern used by the task status quick filter.
  const statusOptions: SelectOption[] = [
    { label: 'To do', value: 'todo', color: '#10b981' },
    { label: 'In progress', value: 'in_progress', color: '#3b82f6' },
    { label: 'In review', value: 'in_review', color: '#8b5cf6' },
    { label: 'Done', value: 'done', color: '#64748b' },
    { label: 'Blocked', value: 'blocked', color: '#ef4444' },
  ]
</script>

<!-- Single + search -->
<ArcanaSelect value={single} onValueChange={(v) => (single = v as string | null)} options={fruits} searchable placeholder="Pick a fruit" />

<!-- Closed-field and popover adornments; groups get headings + separators -->
<ArcanaSelect value={single} onValueChange={(v) => (single = v as string | null)} options={fruits}>
  {#snippet prefix()}<span>From</span>{/snippet}
  {#snippet suffix()}<span>BR</span>{/snippet}
  {#snippet optionPrefix({ option })}<span>#{option.value}</span>{/snippet}
  {#snippet optionSuffix()}<span aria-hidden="true">›</span>{/snippet}
  {#snippet groupLabel({ group })}<strong>{group}</strong>{/snippet}
</ArcanaSelect>

<!-- Multiple — value is an array -->
<ArcanaSelect value={many} onValueChange={(v) => (many = v as string[])} options={fruits} multiple placeholder="Pick several" />

<!-- Quick filter: dots trigger, leading icon and a footer with a clear action -->
<ArcanaSelect
  value={statuses}
  onValueChange={(v) => (statuses = v as string[])}
  options={statusOptions}
  multiple
  triggerMode="dots"
  icon="fa-solid fa-flag"
  showFooter
  footerCountLabel={'{count} selected'}
  clearLabel="Clear"
  placeholder="Status"
/>`
  },

  treeSelect: {
    react: `import { useState } from 'react'
import { ArcanaTreeSelect, type TreeSelectNode } from '@arcanalabs/ui-components/react'

const tree: TreeSelectNode[] = [
  { id: 1, name: 'Engineering', children: [
    { id: 11, name: 'Frontend' },
    { id: 12, name: 'Backend' },
  ] },
  { id: 2, name: 'Marketing', children: [{ id: 21, name: 'Content' }] },
]

export function DepartmentField() {
  const [department, setDepartment] = useState<string | number | null>(null)
  const [picked, setPicked] = useState<(string | number)[]>([])
  return (
    <>
      {/* Single: only leaves select; clicking a parent just expands it. */}
      <ArcanaTreeSelect value={department} onValueChange={setDepartment} options={tree} placeholder="Pick a department" />

      {/* Multiple: removable tags; allowParentSelection lets parents be picked too. */}
      <ArcanaTreeSelect value={picked} onValueChange={setPicked} options={tree} multiple allowParentSelection />

      {/* Theming: scope the CSS custom properties with panelClass (the panel lives in <body>).
          .my-tree { --arcana-tree-select-folder-color: #f59e0b; --arcana-tree-select-selected-bg: #fef3c7; … } */}
      <ArcanaTreeSelect value={department} onValueChange={setDepartment} options={tree} panelClass="my-tree" />
    </>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaTreeSelectComponent, type TreeSelectNode } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-department-field',
  standalone: true,
  imports: [ArcanaTreeSelectComponent],
  // Theming: scope the CSS custom properties with panelClass (the panel lives in <body>).
  // .my-tree { --arcana-tree-select-folder-color: #f59e0b; --arcana-tree-select-selected-bg: #fef3c7; … }
  template: \`
    <!-- Single: only leaves select; clicking a parent just expands it. -->
    <div arcanaTreeSelect [(value)]="department" [options]="tree" placeholder="Pick a department"></div>

    <!-- Multiple: removable tags; [allowParentSelection]="true" lets parents be picked too. -->
    <div arcanaTreeSelect [(value)]="picked" [options]="tree" [multiple]="true" [allowParentSelection]="true"></div>

    <div arcanaTreeSelect [(value)]="department" [options]="tree" panelClass="my-tree"></div>
  \`
})
export class DepartmentFieldComponent {
  department: string | number | null = null
  picked: (string | number)[] = []
  tree: TreeSelectNode[] = [
    { id: 1, name: 'Engineering', children: [
      { id: 11, name: 'Frontend' },
      { id: 12, name: 'Backend' },
    ] },
    { id: 2, name: 'Marketing', children: [{ id: 21, name: 'Content' }] },
  ]
}`,
    svelte: `<script lang="ts">
  import { ArcanaTreeSelect, type TreeSelectNode } from '@arcanalabs/ui-components/svelte'

  let department = $state<string | number | null>(null)
  let picked = $state<(string | number)[]>([])
  const tree: TreeSelectNode[] = [
    { id: 1, name: 'Engineering', children: [
      { id: 11, name: 'Frontend' },
      { id: 12, name: 'Backend' },
    ] },
    { id: 2, name: 'Marketing', children: [{ id: 21, name: 'Content' }] },
  ]
</script>

<!-- Single: only leaves select; clicking a parent just expands it. -->
<ArcanaTreeSelect value={department} onValueChange={(v) => (department = v)} options={tree} placeholder="Pick a department" />

<!-- Multiple: removable tags; allowParentSelection lets parents be picked too. -->
<ArcanaTreeSelect value={picked} onValueChange={(v) => (picked = v)} options={tree} multiple allowParentSelection />

<!-- Theming: scope the tokens with panelClass (the panel lives in <body>). -->
<ArcanaTreeSelect value={department} onValueChange={(v) => (department = v)} options={tree} panelClass="my-tree" />

<style>
  /* Icon colours, selected item and search highlight are CSS custom properties. */
  :global(.my-tree) {
    --arcana-tree-select-folder-color: #f59e0b;
    --arcana-tree-select-leaf-color: #38bdf8;
    --arcana-tree-select-selected-bg: #fef3c7;
    --arcana-tree-select-selected-text: #92400e;
  }
</style>`
  },

  checkbox: {
    react: `import { useState } from 'react'
import { ArcanaCheckbox } from '@arcanalabs/ui-components/react'

export function DocumentPicker() {
  const [items, setItems] = useState({ invoices: true, receipts: false, statements: false })
  const values = Object.values(items)
  const allChecked = values.every(Boolean)
  const someChecked = values.some(Boolean) && !allChecked
  function toggleAll(value: boolean) {
    setItems({ invoices: value, receipts: value, statements: value })
  }
  return (
    <>
      {/* Tri-state parent: \`indeterminate\` renders the dash, not the tick */}
      <ArcanaCheckbox value={allChecked} indeterminate={someChecked} onValueChange={toggleAll} label="Select all" />

      <ArcanaCheckbox value={items.invoices} onValueChange={(v) => setItems({ ...items, invoices: v })} label="Invoices" />
      <ArcanaCheckbox value={items.receipts} onValueChange={(v) => setItems({ ...items, receipts: v })} label="Receipts" />
      <ArcanaCheckbox value={items.statements} onValueChange={(v) => setItems({ ...items, statements: v })} label="Statements" />

      <ArcanaCheckbox value={false} disabled label="Archived (disabled)" />
    </>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaCheckboxComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-document-picker',
  standalone: true,
  imports: [ArcanaCheckboxComponent],
  template: \`
    <!-- Tri-state parent: [indeterminate] renders the dash, not the tick -->
    <label arcanaCheckbox [value]="allChecked" [indeterminate]="someChecked" (valueChange)="toggleAll($event)" label="Select all"></label>

    <label arcanaCheckbox [(value)]="items.invoices" label="Invoices"></label>
    <label arcanaCheckbox [(value)]="items.receipts" label="Receipts"></label>
    <label arcanaCheckbox [(value)]="items.statements" label="Statements"></label>

    <label arcanaCheckbox [value]="false" [disabled]="true" label="Archived (disabled)"></label>
  \`
})
export class DocumentPickerComponent {
  items = { invoices: true, receipts: false, statements: false }

  get allChecked(): boolean {
    return Object.values(this.items).every(Boolean)
  }
  get someChecked(): boolean {
    return Object.values(this.items).some(Boolean) && !this.allChecked
  }
  toggleAll(value: boolean) {
    this.items = { invoices: value, receipts: value, statements: value }
  }
}`,
    svelte: `<script lang="ts">
  import { ArcanaCheckbox } from '@arcanalabs/ui-components/svelte'

  let items = $state({ invoices: true, receipts: false, statements: false })
  const allChecked = $derived(Object.values(items).every(Boolean))
  const someChecked = $derived(Object.values(items).some(Boolean) && !allChecked)

  function toggleAll(value: boolean) {
    items = { invoices: value, receipts: value, statements: value }
  }
</script>

<!-- Tri-state parent: \`indeterminate\` renders the dash, not the tick -->
<ArcanaCheckbox value={allChecked} indeterminate={someChecked} onValueChange={toggleAll} label="Select all" />

<ArcanaCheckbox value={items.invoices} onValueChange={(v) => (items.invoices = v)} label="Invoices" />
<ArcanaCheckbox value={items.receipts} onValueChange={(v) => (items.receipts = v)} label="Receipts" />
<ArcanaCheckbox value={items.statements} onValueChange={(v) => (items.statements = v)} label="Statements" />

<ArcanaCheckbox value={false} disabled label="Archived (disabled)" />`
  },

  switch: {
    react: `import { useState } from 'react'
import { ArcanaSwitch } from '@arcanalabs/ui-components/react'

export function Preferences() {
  const [notifications, setNotifications] = useState(true)
  const [beta, setBeta] = useState(false)
  return (
    <>
      <label className="form-row">
        <ArcanaSwitch value={notifications} onValueChange={setNotifications} ariaLabel="Notifications" />
        <span>Notifications ({notifications ? 'on' : 'off'})</span>
      </label>
      <label className="form-row">
        <ArcanaSwitch value={beta} onValueChange={setBeta} ariaLabel="Beta features" />
        <span>Beta features ({beta ? 'on' : 'off'})</span>
      </label>

      {/* Sizes and disabled state */}
      <ArcanaSwitch value={notifications} onValueChange={setNotifications} size="sm" ariaLabel="small" />
      <ArcanaSwitch value={notifications} onValueChange={setNotifications} size="md" ariaLabel="medium" />
      <ArcanaSwitch value={notifications} onValueChange={setNotifications} size="lg" ariaLabel="large" />
      <ArcanaSwitch value disabled ariaLabel="disabled" />
    </>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaSwitchComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-preferences',
  standalone: true,
  imports: [ArcanaSwitchComponent],
  template: \`
    <label class="form-row">
      <button arcanaSwitch [(value)]="notifications" ariaLabel="Notifications"></button>
      <span>Notifications ({{ notifications ? 'on' : 'off' }})</span>
    </label>
    <label class="form-row">
      <button arcanaSwitch [(value)]="beta" ariaLabel="Beta features"></button>
      <span>Beta features ({{ beta ? 'on' : 'off' }})</span>
    </label>

    <!-- Sizes and disabled state -->
    <button arcanaSwitch [(value)]="notifications" size="sm" ariaLabel="small"></button>
    <button arcanaSwitch [(value)]="notifications" size="md" ariaLabel="medium"></button>
    <button arcanaSwitch [(value)]="notifications" size="lg" ariaLabel="large"></button>
    <button arcanaSwitch [value]="true" [disabled]="true" ariaLabel="disabled"></button>
  \`
})
export class PreferencesComponent {
  notifications = true
  beta = false
}`,
    svelte: `<script lang="ts">
  import { ArcanaSwitch } from '@arcanalabs/ui-components/svelte'

  let notifications = $state(true)
  let beta = $state(false)
</script>

<label class="form-row">
  <ArcanaSwitch value={notifications} onValueChange={(v) => (notifications = v)} ariaLabel="Notifications" />
  <span>Notifications ({notifications ? 'on' : 'off'})</span>
</label>
<label class="form-row">
  <ArcanaSwitch value={beta} onValueChange={(v) => (beta = v)} ariaLabel="Beta features" />
  <span>Beta features ({beta ? 'on' : 'off'})</span>
</label>

<!-- Sizes and disabled state -->
<ArcanaSwitch value={notifications} onValueChange={(v) => (notifications = v)} size="sm" ariaLabel="small" />
<ArcanaSwitch value={notifications} onValueChange={(v) => (notifications = v)} size="md" ariaLabel="medium" />
<ArcanaSwitch value={notifications} onValueChange={(v) => (notifications = v)} size="lg" ariaLabel="large" />
<ArcanaSwitch value disabled ariaLabel="disabled" />`
  },

  tabs: {
    react: `import { useState } from 'react'
import { ArcanaTabs, type ArcanaTabItem } from '@arcanalabs/ui-components/react'

const tabs: ArcanaTabItem[] = [
  { name: 'overview', label: 'Overview' },
  { name: 'activity', label: 'Activity', badge: 3 },
  { name: 'settings', label: 'Settings' },
]

export function Panel() {
  const [active, setActive] = useState<string | number>('overview')
  return (
    <ArcanaTabs
      value={active}
      onValueChange={setActive}
      tabs={tabs}
      variant="pills"
      panels={{
        overview: <div>Overview…</div>,
        activity: <div>Activity…</div>,
        settings: <div>Settings…</div>,
      }}
    />
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaTabsComponent, ArcanaTabPanelDirective, type ArcanaTabItem } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [ArcanaTabsComponent, ArcanaTabPanelDirective],
  template: \`
    <div arcanaTabs [(value)]="active" [tabs]="tabs" variant="pills">
      <ng-container *arcanaTabPanel="'overview'">Overview…</ng-container>
      <ng-container *arcanaTabPanel="'activity'">Activity…</ng-container>
      <ng-container *arcanaTabPanel="'settings'">Settings…</ng-container>
    </div>
  \`
})
export class PanelComponent {
  active: string | number = 'overview'
  tabs: ArcanaTabItem[] = [
    { name: 'overview', label: 'Overview' },
    { name: 'activity', label: 'Activity', badge: 3 },
    { name: 'settings', label: 'Settings' },
  ]
}`,
    svelte: `<script lang="ts">
  import { ArcanaTabs, type ArcanaTabItem } from '@arcanalabs/ui-components/svelte'

  let active = $state<string | number>('overview')
  const tabs: ArcanaTabItem[] = [
    { name: 'overview', label: 'Overview' },
    { name: 'activity', label: 'Activity', badge: 3 },
    { name: 'settings', label: 'Settings' },
  ]
</script>

{#snippet overview()}<div>Overview…</div>{/snippet}
{#snippet activity()}<div>Activity…</div>{/snippet}
{#snippet settings()}<div>Settings…</div>{/snippet}

<ArcanaTabs value={active} onValueChange={(v) => (active = v)} {tabs} variant="pills" panels={{ overview, activity, settings }} />`
  },

  dialog: {
    react: `import { useRef } from 'react'
import { ArcanaDialog, ArcanaButton, type ArcanaDialogHandle } from '@arcanalabs/ui-components/react'

export function DeleteDialog() {
  const dialog = useRef<ArcanaDialogHandle>(null)
  return (
    <>
      <ArcanaButton onClick={() => dialog.current?.show()}>Open</ArcanaButton>

      <ArcanaDialog
        ref={dialog}
        title="Delete workspace"
        description="This cannot be undone."
        footer={(hide) => (
          <>
            <ArcanaButton variant="outline" onClick={hide}>Cancel</ArcanaButton>
            <ArcanaButton variant="destructive" onClick={hide}>Delete</ArcanaButton>
          </>
        )}
      >
        <p>Body content…</p>
      </ArcanaDialog>
    </>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaDialogComponent, ArcanaButtonComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [ArcanaDialogComponent, ArcanaButtonComponent],
  template: \`
    <button arcanaButton (click)="d.show()">Open</button>

    <div arcanaDialog #d title="Delete workspace" description="This cannot be undone." [footerTemplate]="ft">
      <p>Body content…</p>
    </div>
    <ng-template #ft let-hide>
      <button arcanaButton variant="outline" (click)="hide()">Cancel</button>
      <button arcanaButton variant="destructive" (click)="hide()">Delete</button>
    </ng-template>
  \`
})
export class DeleteDialogComponent {}`,
    svelte: `<script lang="ts">
  import { ArcanaDialog, ArcanaButton } from '@arcanalabs/ui-components/svelte'

  let dialog: ArcanaDialog
</script>

<ArcanaButton onClick={() => dialog.show()}>Open</ArcanaButton>

<ArcanaDialog bind:this={dialog} title="Delete workspace" description="This cannot be undone.">
  <p>Body content…</p>
  {#snippet footer(hide)}
    <ArcanaButton variant="outline" onClick={hide}>Cancel</ArcanaButton>
    <ArcanaButton variant="destructive" onClick={hide}>Delete</ArcanaButton>
  {/snippet}
</ArcanaDialog>`
  },

  inputMask: {
    react: `import { useState } from 'react'
import { ArcanaInputMask } from '@arcanalabs/ui-components/react'
// Masking is built into the component — no global directive needed.

export function MaskedFields() {
  const [phone, setPhone] = useState('')
  const [card, setCard] = useState('')
  return (
    <>
      <ArcanaInputMask value={phone} onValueChange={setPhone} mask="(###) ###-####" placeholder="Phone" />
      <ArcanaInputMask value={card} onValueChange={setCard} mask="#### #### #### ####" placeholder="Card number" />
    </>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaInputMaskComponent } from '@arcanalabs/ui-components/angular'

// Masking is built into the component — no global directive needed.
@Component({
  selector: 'app-masked-fields',
  standalone: true,
  imports: [ArcanaInputMaskComponent],
  template: \`
    <input arcanaInputMask [(value)]="phone" mask="(###) ###-####" placeholder="Phone" />
    <input arcanaInputMask [(value)]="card" mask="#### #### #### ####" placeholder="Card number" />
  \`
})
export class MaskedFieldsComponent {
  phone = ''
  card = ''
}`,
    svelte: `<script lang="ts">
  import { ArcanaInputMask } from '@arcanalabs/ui-components/svelte'
  // Masking is built into the component — no global directive needed.
  let phone = $state('')
  let card = $state('')
</script>

<ArcanaInputMask value={phone} onValueChange={(v) => (phone = v)} mask="(###) ###-####" placeholder="Phone" />
<ArcanaInputMask value={card} onValueChange={(v) => (card = v)} mask="#### #### #### ####" placeholder="Card number" />`
  },

  inputBoolean: {
    react: `import { useState } from 'react'
import { ArcanaInputBoolean } from '@arcanalabs/ui-components/react'

export function BooleanFilters() {
  const [answer, setAnswer] = useState<unknown>(null)
  const [status, setStatus] = useState<unknown>(1)
  const [filter, setFilter] = useState<unknown>(null)
  return (
    <>
      {/* Default variation — Yes / No */}
      <ArcanaInputBoolean value={answer} onValueChange={setAnswer} placeholder="Yes / No" />

      {/* 'status' — Active / Inactive */}
      <ArcanaInputBoolean value={status} onValueChange={setStatus} variation="status" />

      {/* 'nullable' — adds a "not set" option, ideal for filters */}
      <ArcanaInputBoolean value={filter} onValueChange={setFilter} variation="nullable" placeholder="Has value?" />
    </>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaInputBooleanComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-boolean-filters',
  standalone: true,
  imports: [ArcanaInputBooleanComponent],
  template: \`
    <!-- Default variation — Yes / No -->
    <div arcanaInputBoolean [(value)]="answer" placeholder="Yes / No"></div>

    <!-- 'status' — Active / Inactive -->
    <div arcanaInputBoolean [(value)]="status" variation="status"></div>

    <!-- 'nullable' — adds a "not set" option, ideal for filters -->
    <div arcanaInputBoolean [(value)]="filter" variation="nullable" placeholder="Has value?"></div>
  \`
})
export class BooleanFiltersComponent {
  answer: unknown = null
  status: unknown = 1
  filter: unknown = null
}`,
    svelte: `<script lang="ts">
  import { ArcanaInputBoolean } from '@arcanalabs/ui-components/svelte'

  let answer = $state<unknown>(null)
  let status = $state<unknown>(1)
  let filter = $state<unknown>(null)
</script>

<!-- Default variation — Yes / No -->
<ArcanaInputBoolean value={answer} onValueChange={(v) => (answer = v)} placeholder="Yes / No" />

<!-- 'status' — Active / Inactive -->
<ArcanaInputBoolean value={status} onValueChange={(v) => (status = v)} variation="status" />

<!-- 'nullable' — adds a "not set" option, ideal for filters -->
<ArcanaInputBoolean value={filter} onValueChange={(v) => (filter = v)} variation="nullable" placeholder="Has value?" />`
  },

  numberStepper: {
    react: `import { useState } from 'react'
import { ArcanaNumberStepper } from '@arcanalabs/ui-components/react'

export function Quantity() {
  const [qty, setQty] = useState<number | null>(2)
  const [weight, setWeight] = useState<number | null>(10)
  return (
    <>
      <ArcanaNumberStepper value={qty} onValueChange={setQty} min={0} max={10} ariaLabel="Quantity" />

      {/* \`step\` changes the increment of each click */}
      <ArcanaNumberStepper value={weight} onValueChange={setWeight} min={0} max={100} step={5} ariaLabel="Weight" />

      <ArcanaNumberStepper value={5} disabled ariaLabel="Disabled" />
    </>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaNumberStepperComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-quantity',
  standalone: true,
  imports: [ArcanaNumberStepperComponent],
  template: \`
    <div arcanaNumberStepper [(value)]="qty" [min]="0" [max]="10" ariaLabel="Quantity"></div>

    <!-- [step] changes the increment of each click -->
    <div arcanaNumberStepper [(value)]="weight" [min]="0" [max]="100" [step]="5" ariaLabel="Weight"></div>

    <div arcanaNumberStepper [value]="5" [disabled]="true" ariaLabel="Disabled"></div>
  \`
})
export class QuantityComponent {
  qty: number | null = 2
  weight: number | null = 10
}`,
    svelte: `<script lang="ts">
  import { ArcanaNumberStepper } from '@arcanalabs/ui-components/svelte'

  let qty = $state<number | null>(2)
  let weight = $state<number | null>(10)
</script>

<ArcanaNumberStepper value={qty} onValueChange={(v) => (qty = v)} min={0} max={10} ariaLabel="Quantity" />

<!-- \`step\` changes the increment of each click -->
<ArcanaNumberStepper value={weight} onValueChange={(v) => (weight = v)} min={0} max={100} step={5} ariaLabel="Weight" />

<ArcanaNumberStepper value={5} disabled ariaLabel="Disabled" />`
  },

  multiSelectPopover: {
    react: `import { useState } from 'react'
import { ArcanaMultiSelectPopover, type MultiSelectTab } from '@arcanalabs/ui-components/react'

const tabs: MultiSelectTab[] = [
  { key: 'USER', label: 'Users', icon: 'fa-solid fa-user', fetch: loadUsers },
  { key: 'DEPARTMENT', label: 'Departments', icon: 'fa-solid fa-sitemap', fetch: loadDepts },
]

export function AssigneePicker() {
  const [selections, setSelections] = useState<Record<string, number[]>>({ USER: [], DEPARTMENT: [] })
  return <ArcanaMultiSelectPopover value={selections} onValueChange={setSelections} tabs={tabs} emptyLabel="Select people" />
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaMultiSelectPopoverComponent, type MultiSelectTab } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-assignee-picker',
  standalone: true,
  imports: [ArcanaMultiSelectPopoverComponent],
  template: \`<div arcanaMultiSelectPopover [(value)]="selections" [tabs]="tabs" emptyLabel="Select people"></div>\`
})
export class AssigneePickerComponent {
  selections: Record<string, number[]> = { USER: [], DEPARTMENT: [] }
  tabs: MultiSelectTab[] = [
    { key: 'USER', label: 'Users', icon: 'fa-solid fa-user', fetch: loadUsers },
    { key: 'DEPARTMENT', label: 'Departments', icon: 'fa-solid fa-sitemap', fetch: loadDepts },
  ]
}`,
    svelte: `<script lang="ts">
  import { ArcanaMultiSelectPopover, type MultiSelectTab } from '@arcanalabs/ui-components/svelte'

  let selections = $state<Record<string, number[]>>({ USER: [], DEPARTMENT: [] })
  const tabs: MultiSelectTab[] = [
    { key: 'USER', label: 'Users', icon: 'fa-solid fa-user', fetch: loadUsers },
    { key: 'DEPARTMENT', label: 'Departments', icon: 'fa-solid fa-sitemap', fetch: loadDepts },
  ]
</script>

<ArcanaMultiSelectPopover value={selections} onValueChange={(v) => (selections = v)} {tabs} emptyLabel="Select people" />`
  },

  radio: {
    react: `import { useState } from 'react'
import { ArcanaRadio } from '@arcanalabs/ui-components/react'

export function Plan() {
  const [plan, setPlan] = useState('pro')
  return (
    <>
      <ArcanaRadio name="plan" value="free" groupValue={plan} onChange={(v) => setPlan(v as string)} label="Grátis" />
      <ArcanaRadio name="plan" value="pro" groupValue={plan} onChange={(v) => setPlan(v as string)} label="Pro" />
      <ArcanaRadio name="plan" value="enterprise" groupValue={plan} onChange={(v) => setPlan(v as string)} label="Enterprise" disabled />
    </>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaRadioComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-plan',
  standalone: true,
  imports: [ArcanaRadioComponent],
  template: \`
    <arcana-radio name="plan" value="free" [groupValue]="plan" (valueChange)="plan = $any($event)" label="Grátis"></arcana-radio>
    <arcana-radio name="plan" value="pro" [groupValue]="plan" (valueChange)="plan = $any($event)" label="Pro"></arcana-radio>
    <arcana-radio name="plan" value="enterprise" [groupValue]="plan" (valueChange)="plan = $any($event)" label="Enterprise" [disabled]="true"></arcana-radio>
  \`
})
export class PlanComponent {
  plan: string | number | boolean | null = 'pro'
}`,
    svelte: `<script lang="ts">
  import { ArcanaRadio } from '@arcanalabs/ui-components/svelte'

  let plan = $state('pro')
</script>

<ArcanaRadio name="plan" value="free" groupValue={plan} onChange={(v) => (plan = v as string)} label="Grátis" />
<ArcanaRadio name="plan" value="pro" groupValue={plan} onChange={(v) => (plan = v as string)} label="Pro" />
<ArcanaRadio name="plan" value="enterprise" groupValue={plan} onChange={(v) => (plan = v as string)} label="Enterprise" disabled />`
  },

  radioCardGroup: {
    react: `import { useState } from 'react'
import { ArcanaRadioCardGroup, type RadioCardOption } from '@arcanalabs/ui-components/react'

const options: RadioCardOption[] = [
  { label: 'Credit card', value: 'credit_card', description: 'Automatic recurring charge.' },
  { label: 'Bank transfer', value: 'bank_transfer', description: 'Instant, no fees.', badge: 'Recommended' },
  { label: 'Invoice', value: 'invoice', description: 'Due in 3 business days.' },
  { label: 'Cash on delivery', value: 'cash', disabled: true },
]

// Coloured icon chip: iconBg/iconColor/iconBorder paint the square behind the icon.
const iconOptions: RadioCardOption[] = [
  { label: 'Personal account', value: 'personal', description: 'For individual use', icon: 'fa-solid fa-file-invoice', iconBg: '#dbeafe', iconColor: '#2563eb', iconBorder: '#bfdbfe' },
  { label: 'Business account', value: 'business', description: 'For teams and companies', icon: 'fa-solid fa-receipt', iconBg: '#d1fae5', iconColor: '#059669', iconBorder: '#a7f3d0' },
]

const shippingOptions: RadioCardOption[] = [
  { label: 'Standard shipping', value: 'standard', description: 'Arrives in 5–7 business days', icon: 'fa-solid fa-truck', iconBg: '#e0e7ff', iconColor: '#4f46e5', iconBorder: '#c7d2fe' },
  { label: 'Express shipping', value: 'express', description: 'Arrives next business day', icon: 'fa-solid fa-user', iconBg: '#fef3c7', iconColor: '#b45309', iconBorder: '#fde68a' },
]

export function PaymentMethod() {
  const [method, setMethod] = useState<string | number | boolean | null>('bank_transfer')
  const [accountType, setAccountType] = useState<string | number | boolean | null>('personal')
  const [shipping, setShipping] = useState<string | number | boolean | null>('standard')
  return (
    <>
      <ArcanaRadioCardGroup value={method} onValueChange={setMethod} options={options} ariaLabel="Payment method" />

      {/* Icon at the start (default) */}
      <ArcanaRadioCardGroup value={accountType} onValueChange={setAccountType} options={iconOptions} columns={2} ariaLabel="Icon at the start" />

      {/* Icon at the end */}
      <ArcanaRadioCardGroup value={accountType} onValueChange={setAccountType} options={iconOptions} columns={2} iconPosition="end" ariaLabel="Icon at the end" />

      {/* Radio at the end */}
      <ArcanaRadioCardGroup value={shipping} onValueChange={setShipping} options={shippingOptions} columns={2} radioPosition="end" ariaLabel="Radio at the end" />
    </>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaRadioCardGroupComponent, type RadioCardOption } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-payment-method',
  standalone: true,
  imports: [ArcanaRadioCardGroupComponent],
  template: \`
    <div arcanaRadioCardGroup [(value)]="method" [options]="options" ariaLabel="Payment method"></div>

    <!-- Icon at the start (default) -->
    <div arcanaRadioCardGroup [(value)]="accountType" [options]="iconOptions" [columns]="2" ariaLabel="Icon at the start"></div>

    <!-- Icon at the end -->
    <div arcanaRadioCardGroup [(value)]="accountType" [options]="iconOptions" [columns]="2" [iconPosition]="'end'" ariaLabel="Icon at the end"></div>

    <!-- Radio at the end -->
    <div arcanaRadioCardGroup [(value)]="shipping" [options]="shippingOptions" [columns]="2" [radioPosition]="'end'" ariaLabel="Radio at the end"></div>
  \`
})
export class PaymentMethodComponent {
  method: string | number | boolean | null = 'bank_transfer'
  accountType: string | number | boolean | null = 'personal'
  shipping: string | number | boolean | null = 'standard'

  options: RadioCardOption[] = [
    { label: 'Credit card', value: 'credit_card', description: 'Automatic recurring charge.' },
    { label: 'Bank transfer', value: 'bank_transfer', description: 'Instant, no fees.', badge: 'Recommended' },
    { label: 'Invoice', value: 'invoice', description: 'Due in 3 business days.' },
    { label: 'Cash on delivery', value: 'cash', disabled: true },
  ]

  // Coloured icon chip: iconBg/iconColor/iconBorder paint the square behind the icon.
  iconOptions: RadioCardOption[] = [
    { label: 'Personal account', value: 'personal', description: 'For individual use', icon: 'fa-solid fa-file-invoice', iconBg: '#dbeafe', iconColor: '#2563eb', iconBorder: '#bfdbfe' },
    { label: 'Business account', value: 'business', description: 'For teams and companies', icon: 'fa-solid fa-receipt', iconBg: '#d1fae5', iconColor: '#059669', iconBorder: '#a7f3d0' },
  ]

  shippingOptions: RadioCardOption[] = [
    { label: 'Standard shipping', value: 'standard', description: 'Arrives in 5–7 business days', icon: 'fa-solid fa-truck', iconBg: '#e0e7ff', iconColor: '#4f46e5', iconBorder: '#c7d2fe' },
    { label: 'Express shipping', value: 'express', description: 'Arrives next business day', icon: 'fa-solid fa-user', iconBg: '#fef3c7', iconColor: '#b45309', iconBorder: '#fde68a' },
  ]
}`,
    svelte: `<script lang="ts">
  import { ArcanaRadioCardGroup, type RadioCardOption } from '@arcanalabs/ui-components/svelte'

  let method = $state<string | number | boolean | null>('bank_transfer')
  let accountType = $state<string | number | boolean | null>('personal')
  let shipping = $state<string | number | boolean | null>('standard')

  const options: RadioCardOption[] = [
    { label: 'Credit card', value: 'credit_card', description: 'Automatic recurring charge.' },
    { label: 'Bank transfer', value: 'bank_transfer', description: 'Instant, no fees.', badge: 'Recommended' },
    { label: 'Invoice', value: 'invoice', description: 'Due in 3 business days.' },
    { label: 'Cash on delivery', value: 'cash', disabled: true },
  ]

  // Coloured icon chip: iconBg/iconColor/iconBorder paint the square behind the icon.
  const iconOptions: RadioCardOption[] = [
    { label: 'Personal account', value: 'personal', description: 'For individual use', icon: 'fa-solid fa-file-invoice', iconBg: '#dbeafe', iconColor: '#2563eb', iconBorder: '#bfdbfe' },
    { label: 'Business account', value: 'business', description: 'For teams and companies', icon: 'fa-solid fa-receipt', iconBg: '#d1fae5', iconColor: '#059669', iconBorder: '#a7f3d0' },
  ]

  const shippingOptions: RadioCardOption[] = [
    { label: 'Standard shipping', value: 'standard', description: 'Arrives in 5–7 business days', icon: 'fa-solid fa-truck', iconBg: '#e0e7ff', iconColor: '#4f46e5', iconBorder: '#c7d2fe' },
    { label: 'Express shipping', value: 'express', description: 'Arrives next business day', icon: 'fa-solid fa-user', iconBg: '#fef3c7', iconColor: '#b45309', iconBorder: '#fde68a' },
  ]
</script>

<ArcanaRadioCardGroup value={method} onValueChange={(v) => (method = v)} {options} ariaLabel="Payment method" />

<!-- Icon at the start (default) -->
<ArcanaRadioCardGroup value={accountType} onValueChange={(v) => (accountType = v)} options={iconOptions} columns={2} ariaLabel="Icon at the start" />

<!-- Icon at the end -->
<ArcanaRadioCardGroup value={accountType} onValueChange={(v) => (accountType = v)} options={iconOptions} columns={2} iconPosition="end" ariaLabel="Icon at the end" />

<!-- Radio at the end -->
<ArcanaRadioCardGroup value={shipping} onValueChange={(v) => (shipping = v)} options={shippingOptions} columns={2} radioPosition="end" ariaLabel="Radio at the end" />`
  },

  segmentedOptions: {
    react: `import { useState, type CSSProperties } from 'react'
import { ArcanaSegmentedControl, type SegmentedOption } from '@arcanalabs/ui-components/react'

const options: SegmentedOption[] = [
  { label: 'List', value: 'list' },
  { label: 'Grid', value: 'grid' },
  { label: 'Board', value: 'board' },
]

const iconOptions: SegmentedOption[] = [
  { label: 'List', value: 'list', icon: 'fa-solid fa-list' },
  { label: 'Grid', value: 'grid', icon: 'fa-solid fa-table-cells-large' },
  { label: 'Board', value: 'board', icon: 'fa-solid fa-columns' },
]

// \`iconColor\` tints each option's icon — handy for semantics
// (green = low risk, amber = attention, red = urgent).
const colorOptions: SegmentedOption[] = [
  { label: 'Low', value: 'low', icon: 'fa-solid fa-circle-check', iconColor: '#16a34a' },
  { label: 'Medium', value: 'medium', icon: 'fa-solid fa-triangle-exclamation', iconColor: '#f59e0b' },
  { label: 'High', value: 'high', icon: 'fa-solid fa-fire', iconColor: '#dc2626' },
]

// Icon-only: empty labels, so the group needs an ariaLabel of its own.
const iconOnlyOptions: SegmentedOption[] = [
  { label: '', value: 'list', icon: 'fa-solid fa-list' },
  { label: '', value: 'grid', icon: 'fa-solid fa-table-cells-large' },
  { label: '', value: 'board', icon: 'fa-solid fa-columns' },
]

// Off the scale: these tokens beat any \`size\`. They inherit, so setting them on
// a wrapper is enough (the control reads them from the cascade).
const customSize = {
  '--arcana-segmented-control-height': '40px',
  '--arcana-segmented-control-font-size': '15px',
  '--arcana-segmented-control-padding-x': '22px',
} as CSSProperties

export function ViewMode() {
  const [view, setView] = useState<string | number | null>('list')
  const [priority, setPriority] = useState<string | number | null>('medium')
  return (
    <>
      <ArcanaSegmentedControl value={view} onValueChange={setView} options={options} ariaLabel="View mode" />

      {/* Denser, square-cornered variant */}
      <ArcanaSegmentedControl value={view} onValueChange={setView} options={options} compact squared />

      {/* With icons */}
      <ArcanaSegmentedControl value={view} onValueChange={setView} options={iconOptions} />

      {/* With coloured icons */}
      <ArcanaSegmentedControl value={priority} onValueChange={setPriority} options={colorOptions} />

      {/* Icon-only */}
      <ArcanaSegmentedControl value={view} onValueChange={setView} options={iconOnlyOptions} ariaLabel="View mode" />

      {/* The four sizes */}
      <ArcanaSegmentedControl value={view} onValueChange={setView} options={options} size="sm" />
      <ArcanaSegmentedControl value={view} onValueChange={setView} options={options} size="md" />
      <ArcanaSegmentedControl value={view} onValueChange={setView} options={options} size="lg" />
      <ArcanaSegmentedControl value={view} onValueChange={setView} options={options} size="xl" />

      {/* Custom dimension via the CSS tokens — no \`size\` needed */}
      <div style={customSize}>
        <ArcanaSegmentedControl value={view} onValueChange={setView} options={options} />
      </div>
    </>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaSegmentedControlComponent, type SegmentedOption } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-view-mode',
  standalone: true,
  imports: [ArcanaSegmentedControlComponent],
  template: \`
    <div arcanaSegmentedControl [(value)]="view" [options]="options" ariaLabel="View mode"></div>

    <!-- Denser, square-cornered variant -->
    <div arcanaSegmentedControl [(value)]="view" [options]="options" [compact]="true" [squared]="true"></div>

    <!-- With icons -->
    <div arcanaSegmentedControl [(value)]="view" [options]="iconOptions"></div>

    <!-- With coloured icons -->
    <div arcanaSegmentedControl [(value)]="priority" [options]="colorOptions"></div>

    <!-- Icon-only: empty labels, so the group carries the accessible name -->
    <div arcanaSegmentedControl [(value)]="view" [options]="iconOnlyOptions" ariaLabel="View mode"></div>

    <!-- The four sizes -->
    <div arcanaSegmentedControl [(value)]="view" [options]="options" size="sm"></div>
    <div arcanaSegmentedControl [(value)]="view" [options]="options" size="md"></div>
    <div arcanaSegmentedControl [(value)]="view" [options]="options" size="lg"></div>
    <div arcanaSegmentedControl [(value)]="view" [options]="options" size="xl"></div>

    <!-- Custom dimension: the CSS tokens beat any size, so no size input here.
         They inherit, so declaring them on a wrapper is enough. -->
    <div class="seg-custom-size">
      <div arcanaSegmentedControl [(value)]="view" [options]="options"></div>
    </div>
  \`,
  styles: [
    '.seg-custom-size {' +
    '  --arcana-segmented-control-height: 40px;' +
    '  --arcana-segmented-control-font-size: 15px;' +
    '  --arcana-segmented-control-padding-x: 22px;' +
    '}'
  ]
})
export class ViewModeComponent {
  view: string | number | null = 'list'
  priority: string | number | null = 'medium'
  options: SegmentedOption[] = [
    { label: 'List', value: 'list' },
    { label: 'Grid', value: 'grid' },
    { label: 'Board', value: 'board' },
  ]
  iconOptions: SegmentedOption[] = [
    { label: 'List', value: 'list', icon: 'fa-solid fa-list' },
    { label: 'Grid', value: 'grid', icon: 'fa-solid fa-table-cells-large' },
    { label: 'Board', value: 'board', icon: 'fa-solid fa-columns' },
  ]
  // iconColor tints each option's icon — handy for semantics
  // (green = low risk, amber = attention, red = urgent).
  colorOptions: SegmentedOption[] = [
    { label: 'Low', value: 'low', icon: 'fa-solid fa-circle-check', iconColor: '#16a34a' },
    { label: 'Medium', value: 'medium', icon: 'fa-solid fa-triangle-exclamation', iconColor: '#f59e0b' },
    { label: 'High', value: 'high', icon: 'fa-solid fa-fire', iconColor: '#dc2626' },
  ]
  // Icon-only: empty labels, so the group needs its own ariaLabel.
  iconOnlyOptions: SegmentedOption[] = [
    { label: '', value: 'list', icon: 'fa-solid fa-list' },
    { label: '', value: 'grid', icon: 'fa-solid fa-table-cells-large' },
    { label: '', value: 'board', icon: 'fa-solid fa-columns' },
  ]
}`,
    svelte: `<script lang="ts">
  import { ArcanaSegmentedControl, type SegmentedOption } from '@arcanalabs/ui-components/svelte'

  let view = $state<string | number | null>('list')
  let priority = $state<string | number | null>('medium')

  const options: SegmentedOption[] = [
    { label: 'List', value: 'list' },
    { label: 'Grid', value: 'grid' },
    { label: 'Board', value: 'board' },
  ]
  const iconOptions: SegmentedOption[] = [
    { label: 'List', value: 'list', icon: 'fa-solid fa-list' },
    { label: 'Grid', value: 'grid', icon: 'fa-solid fa-table-cells-large' },
    { label: 'Board', value: 'board', icon: 'fa-solid fa-columns' },
  ]
  // \`iconColor\` tints each option's icon — handy for semantics
  // (green = low risk, amber = attention, red = urgent).
  const colorOptions: SegmentedOption[] = [
    { label: 'Low', value: 'low', icon: 'fa-solid fa-circle-check', iconColor: '#16a34a' },
    { label: 'Medium', value: 'medium', icon: 'fa-solid fa-triangle-exclamation', iconColor: '#f59e0b' },
    { label: 'High', value: 'high', icon: 'fa-solid fa-fire', iconColor: '#dc2626' },
  ]
  // Icon-only: empty labels, so the group needs its own ariaLabel.
  const iconOnlyOptions: SegmentedOption[] = [
    { label: '', value: 'list', icon: 'fa-solid fa-list' },
    { label: '', value: 'grid', icon: 'fa-solid fa-table-cells-large' },
    { label: '', value: 'board', icon: 'fa-solid fa-columns' },
  ]
</script>

<ArcanaSegmentedControl value={view} onValueChange={(v) => (view = v)} {options} ariaLabel="View mode" />

<!-- Denser, square-cornered variant -->
<ArcanaSegmentedControl value={view} onValueChange={(v) => (view = v)} {options} compact squared />

<!-- With icons -->
<ArcanaSegmentedControl value={view} onValueChange={(v) => (view = v)} options={iconOptions} />

<!-- With coloured icons -->
<ArcanaSegmentedControl value={priority} onValueChange={(v) => (priority = v)} options={colorOptions} />

<!-- Icon-only -->
<ArcanaSegmentedControl value={view} onValueChange={(v) => (view = v)} options={iconOnlyOptions} ariaLabel="View mode" />

<!-- The four sizes -->
<ArcanaSegmentedControl value={view} onValueChange={(v) => (view = v)} {options} size="sm" />
<ArcanaSegmentedControl value={view} onValueChange={(v) => (view = v)} {options} size="md" />
<ArcanaSegmentedControl value={view} onValueChange={(v) => (view = v)} {options} size="lg" />
<ArcanaSegmentedControl value={view} onValueChange={(v) => (view = v)} {options} size="xl" />

<!-- Custom dimension: the CSS tokens beat any size, so no size prop here.
     They inherit, so declaring them on a wrapper is enough. -->
<div style="--arcana-segmented-control-height: 40px; --arcana-segmented-control-font-size: 15px; --arcana-segmented-control-padding-x: 22px">
  <ArcanaSegmentedControl value={view} onValueChange={(v) => (view = v)} {options} />
</div>`
  },

  datePicker: {
    react: `import { useState } from 'react'
import { ArcanaDatePicker } from '@arcanalabs/ui-components/react'

export function Dates() {
  const [date, setDate] = useState('2026-07-24')                       // 'YYYY-MM-DD'
  const [month, setMonth] = useState('2026-07')                        // 'YYYY-MM'
  const [year, setYear] = useState('2026')                             // 'YYYY'
  const [range, setRange] = useState<[string, string]>(['2026-07-01', '2026-07-15'])
  const [at, setAt] = useState('2026-07-24 14:30')                     // 'YYYY-MM-DD HH:mm'
  return (
    <>
      <ArcanaDatePicker type="date" value={date} onValueChange={(v) => setDate(v as string)} />
      <ArcanaDatePicker type="month" value={month} onValueChange={(v) => setMonth(v as string)} />
      <ArcanaDatePicker type="year" value={year} onValueChange={(v) => setYear(v as string)} />
      <ArcanaDatePicker type="daterange" value={range} onValueChange={(v) => setRange(v as [string, string])} locale="en" />
      <ArcanaDatePicker type="datetime" value={at} onValueChange={(v) => setAt(v as string)} />
    </>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaDatePickerComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-dates',
  standalone: true,
  imports: [ArcanaDatePickerComponent],
  template: \`
    <div arcanaDatePicker type="date" [(value)]="date"></div>
    <div arcanaDatePicker type="month" [(value)]="month"></div>
    <div arcanaDatePicker type="year" [(value)]="year"></div>
    <div arcanaDatePicker type="daterange" [(value)]="range" locale="en"></div>
    <div arcanaDatePicker type="datetime" [(value)]="at"></div>
  \`
})
export class DatesComponent {
  date = '2026-07-24'          // 'YYYY-MM-DD'
  month = '2026-07'            // 'YYYY-MM'
  year = '2026'                // 'YYYY'
  range: [string, string] = ['2026-07-01', '2026-07-15']
  at = '2026-07-24 14:30'      // 'YYYY-MM-DD HH:mm'
}`,
    svelte: `<script lang="ts">
  import { ArcanaDatePicker } from '@arcanalabs/ui-components/svelte'

  let date = $state('2026-07-24')          // 'YYYY-MM-DD'
  let month = $state('2026-07')            // 'YYYY-MM'
  let year = $state('2026')                // 'YYYY'
  let range = $state<[string, string]>(['2026-07-01', '2026-07-15'])
  let at = $state('2026-07-24 14:30')      // 'YYYY-MM-DD HH:mm'
</script>

<ArcanaDatePicker type="date" value={date} onValueChange={(v) => (date = v as string)} />
<ArcanaDatePicker type="month" value={month} onValueChange={(v) => (month = v as string)} />
<ArcanaDatePicker type="year" value={year} onValueChange={(v) => (year = v as string)} />
<ArcanaDatePicker type="daterange" value={range} onValueChange={(v) => (range = v as [string, string])} locale="en" />
<ArcanaDatePicker type="datetime" value={at} onValueChange={(v) => (at = v as string)} />`
  },

  inputCurrency: {
    react: `import { useState } from 'react'
import { ArcanaInputCurrency } from '@arcanalabs/ui-components/react'

export function Price() {
  const [price, setPrice] = useState('1500.00')
  return <ArcanaInputCurrency value={price} onValueChange={setPrice} shadcn />
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaInputCurrencyComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-price',
  standalone: true,
  imports: [ArcanaInputCurrencyComponent],
  template: \`<div arcanaInputCurrency [(value)]="price" [shadcn]="true"></div>\`
})
export class PriceComponent {
  price = '1500.00'
}`,
    svelte: `<script lang="ts">
  import { ArcanaInputCurrency } from '@arcanalabs/ui-components/svelte'
  let price = $state('1500.00')
</script>

<ArcanaInputCurrency value={price} onValueChange={(v) => (price = v)} shadcn />`
  },

  accordion: {
    react: `import { useState } from 'react'
import { ArcanaAccordion, ArcanaAccordionItem } from '@arcanalabs/ui-components/react'

export function Faq() {
  const [open, setOpen] = useState<string | string[] | null>('shipping')
  const [openAnimated, setOpenAnimated] = useState<string | string[] | null>('shipping')
  return (
    <>
      <ArcanaAccordion value={open} onValueChange={setOpen}>
        <ArcanaAccordionItem name="shipping" title="Shipping">Ships in 2–3 days.</ArcanaAccordionItem>
        <ArcanaAccordionItem name="returns" title="Returns">30-day free returns.</ArcanaAccordionItem>
        <ArcanaAccordionItem name="warranty" title="Warranty" disabled>12 months against defects.</ArcanaAccordionItem>
      </ArcanaAccordion>

      {/* \`animated\` slides the body open/closed instead of toggling instantly */}
      <ArcanaAccordion value={openAnimated} onValueChange={setOpenAnimated} animated>
        <ArcanaAccordionItem name="shipping" title="Shipping">Ships in 2–3 days.</ArcanaAccordionItem>
        <ArcanaAccordionItem name="returns" title="Returns">30-day free returns.</ArcanaAccordionItem>
      </ArcanaAccordion>
    </>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaAccordionComponent, ArcanaAccordionItemComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [ArcanaAccordionComponent, ArcanaAccordionItemComponent],
  template: \`
    <div arcanaAccordion [(value)]="open">
      <div arcanaAccordionItem name="shipping" title="Shipping">Ships in 2–3 days.</div>
      <div arcanaAccordionItem name="returns" title="Returns">30-day free returns.</div>
      <div arcanaAccordionItem name="warranty" title="Warranty" [disabled]="true">12 months against defects.</div>
    </div>

    <!-- [animated] slides the body open/closed instead of toggling instantly -->
    <div arcanaAccordion [(value)]="openAnimated" [animated]="true">
      <div arcanaAccordionItem name="shipping" title="Shipping">Ships in 2–3 days.</div>
      <div arcanaAccordionItem name="returns" title="Returns">30-day free returns.</div>
    </div>
  \`
})
export class FaqComponent {
  open: string | string[] | null = 'shipping'
  openAnimated: string | string[] | null = 'shipping'
}`,
    svelte: `<script lang="ts">
  import { ArcanaAccordion, ArcanaAccordionItem } from '@arcanalabs/ui-components/svelte'

  let open = $state<string | string[] | null>('shipping')
  let openAnimated = $state<string | string[] | null>('shipping')
</script>

<ArcanaAccordion value={open} onValueChange={(v) => (open = v)}>
  <ArcanaAccordionItem name="shipping" title="Shipping">Ships in 2–3 days.</ArcanaAccordionItem>
  <ArcanaAccordionItem name="returns" title="Returns">30-day free returns.</ArcanaAccordionItem>
  <ArcanaAccordionItem name="warranty" title="Warranty" disabled>12 months against defects.</ArcanaAccordionItem>
</ArcanaAccordion>

<!-- \`animated\` slides the body open/closed instead of toggling instantly -->
<ArcanaAccordion value={openAnimated} onValueChange={(v) => (openAnimated = v)} animated>
  <ArcanaAccordionItem name="shipping" title="Shipping">Ships in 2–3 days.</ArcanaAccordionItem>
  <ArcanaAccordionItem name="returns" title="Returns">30-day free returns.</ArcanaAccordionItem>
</ArcanaAccordion>`
  },

  accordionItem: {
    react: `import { useState } from 'react'
import { ArcanaAccordion, ArcanaAccordionItem } from '@arcanalabs/ui-components/react'

export function Details() {
  // Multiple-open mode: value is an array of open names.
  const [open, setOpen] = useState<string[]>(['specs'])
  return (
    <ArcanaAccordion value={open} onValueChange={(v) => setOpen(v as string[])} accordion={false}>
      <ArcanaAccordionItem name="specs" title="Specifications">Weight, dimensions…</ArcanaAccordionItem>
      <ArcanaAccordionItem name="care" title={<span>Care <strong>instructions</strong></span>}>Hand wash cold.</ArcanaAccordionItem>
    </ArcanaAccordion>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaAccordionComponent, ArcanaAccordionItemComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [ArcanaAccordionComponent, ArcanaAccordionItemComponent],
  template: \`
    <!-- Multiple-open mode: value is an array of open names. -->
    <div arcanaAccordion [(value)]="open" [accordion]="false">
      <div arcanaAccordionItem name="specs" title="Specifications">Weight, dimensions…</div>
      <div arcanaAccordionItem name="care" title="Care instructions">Hand wash cold.</div>
    </div>
  \`
})
export class DetailsComponent {
  open: string[] = ['specs']
}`,
    svelte: `<script lang="ts">
  import { ArcanaAccordion, ArcanaAccordionItem } from '@arcanalabs/ui-components/svelte'
  // Multiple-open mode: value is an array of open names.
  let open = $state<string[]>(['specs'])
</script>

<ArcanaAccordion value={open} onValueChange={(v) => (open = v as string[])} accordion={false}>
  <ArcanaAccordionItem name="specs" title="Specifications">Weight, dimensions…</ArcanaAccordionItem>
  <ArcanaAccordionItem name="care">
    {#snippet title()}Care <strong>instructions</strong>{/snippet}
    Hand wash cold.
  </ArcanaAccordionItem>
</ArcanaAccordion>`
  },

  dropdown: {
    react: `import { useState } from 'react'
import { ArcanaDropdown, ArcanaDropdownItem, ArcanaButton } from '@arcanalabs/ui-components/react'

// Uso básico: menu de ações
export function RowActions() {
  return (
    <ArcanaDropdown placement="bottom-start" trigger={<ArcanaButton variant="outline">Actions ▾</ArcanaButton>}>
      <ArcanaDropdownItem icon="fa-solid fa-pen" onClick={rename}>Rename</ArcanaDropdownItem>
      <ArcanaDropdownItem icon="fa-solid fa-trash" variant="danger" divided onClick={del}>Delete</ArcanaDropdownItem>
    </ArcanaDropdown>
  )
}

// Recipe: quick date filter — trigger custom + presets com check + rodapé "Mais opções".
// O cálculo do range ([de, até]) é lógica de negócio (fica no app); aqui só a UI.
const PRESETS = [
  { key: 'today', label: 'Hoje' },
  { key: 'yesterday', label: 'Ontem' },
  { key: 'last7', label: 'Últimos 7 dias' },
  { key: 'last30', label: 'Últimos 30 dias' },
]

export function DateQuickFilter({ onChange, onMore }) {
  const [activeKey, setActiveKey] = useState('today')
  const activeLabel = PRESETS.find(p => p.key === activeKey)?.label ?? 'Período'

  const pick = (key) => { setActiveKey(key); onChange(rangeFor(key)) }
  const openMore = () => { setActiveKey(null); onMore() }

  return (
    <ArcanaDropdown
      placement="bottom-end"
      trigger={<ArcanaButton variant="outline"><i className="fa-solid fa-calendar-day" /> {activeLabel} ▾</ArcanaButton>}
    >
      {PRESETS.map(p => (
        <ArcanaDropdownItem
          key={p.key}
          onClick={() => pick(p.key)}
          suffix={activeKey === p.key ? <i className="fa-solid fa-check" /> : undefined}
        >
          {p.label}
        </ArcanaDropdownItem>
      ))}
      <ArcanaDropdownItem icon="fa-solid fa-sliders" divided onClick={openMore}>Mais opções</ArcanaDropdownItem>
    </ArcanaDropdown>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaDropdownComponent, ArcanaDropdownItemComponent, ArcanaButtonComponent } from '@arcanalabs/ui-components/angular'

// Uso básico: menu de ações
@Component({
  selector: 'app-row-actions',
  standalone: true,
  imports: [ArcanaDropdownComponent, ArcanaDropdownItemComponent, ArcanaButtonComponent],
  template: \`
    <div arcanaDropdown placement="bottom-start">
      <button arcanaDropdownTrigger arcanaButton variant="outline">Actions ▾</button>
      <div arcanaDropdownItem icon="fa-solid fa-pen" (click)="rename()">Rename</div>
      <div arcanaDropdownItem icon="fa-solid fa-trash" variant="danger" [divided]="true" (click)="del()">Delete</div>
    </div>
  \`
})
export class RowActionsComponent {
  rename() {}
  del() {}
}

// Recipe: quick date filter — trigger custom + presets com check + rodapé "Mais opções".
// rangeFor() (o cálculo do [de, até]) é lógica de negócio; fica no app.
@Component({
  selector: 'app-date-quick-filter',
  standalone: true,
  imports: [ArcanaDropdownComponent, ArcanaDropdownItemComponent, ArcanaButtonComponent],
  template: \`
    <div arcanaDropdown placement="bottom-end">
      <button arcanaDropdownTrigger arcanaButton variant="outline">
        <i class="fa-solid fa-calendar-day"></i> {{ activeLabel }} ▾
      </button>

      <div *ngFor="let p of presets" arcanaDropdownItem (click)="pick(p.key)">
        {{ p.label }}
        <i *ngIf="activeKey === p.key" arcanaDropdownItemSuffix class="fa-solid fa-check"></i>
      </div>

      <div arcanaDropdownItem icon="fa-solid fa-sliders" [divided]="true" (click)="openMore()">Mais opções</div>
    </div>
  \`
})
export class DateQuickFilterComponent {
  presets = [
    { key: 'today', label: 'Hoje' },
    { key: 'yesterday', label: 'Ontem' },
    { key: 'last7', label: 'Últimos 7 dias' },
    { key: 'last30', label: 'Últimos 30 dias' },
  ]
  activeKey: string | null = 'today'
  get activeLabel() { return this.presets.find(p => p.key === this.activeKey)?.label ?? 'Período' }
  pick(key: string) { this.activeKey = key /* emit change(rangeFor(key)) */ }
  openMore() { this.activeKey = null /* emit more */ }
}`,
    svelte: `<script lang="ts">
  import { ArcanaDropdown, ArcanaDropdownItem, ArcanaButton } from '@arcanalabs/ui-components/svelte'

  // Uso básico
  function rename() {}
  function del() {}

  // Recipe: quick date filter. rangeFor() (o [de, até]) é lógica de negócio; fica no app.
  const presets = [
    { key: 'today', label: 'Hoje' },
    { key: 'yesterday', label: 'Ontem' },
    { key: 'last7', label: 'Últimos 7 dias' },
    { key: 'last30', label: 'Últimos 30 dias' },
  ]
  let activeKey: string | null = 'today'
  $: activeLabel = presets.find(p => p.key === activeKey)?.label ?? 'Período'
  const pick = (key: string) => { activeKey = key /* dispatch('change', rangeFor(key)) */ }
  const openMore = () => { activeKey = null /* dispatch('more') */ }
</script>

<!-- Uso básico: menu de ações -->
<ArcanaDropdown placement="bottom-start">
  {#snippet trigger({ toggle })}
    <ArcanaButton variant="outline" onClick={toggle}>Actions ▾</ArcanaButton>
  {/snippet}
  <ArcanaDropdownItem icon="fa-solid fa-pen" onClick={rename}>Rename</ArcanaDropdownItem>
  <ArcanaDropdownItem icon="fa-solid fa-trash" variant="danger" divided onClick={del}>Delete</ArcanaDropdownItem>
</ArcanaDropdown>

<!-- Recipe: quick date filter — trigger custom + presets com check + rodapé -->
<ArcanaDropdown placement="bottom-end">
  {#snippet trigger({ toggle })}
    <ArcanaButton variant="outline" onClick={toggle}><i class="fa-solid fa-calendar-day"></i> {activeLabel} ▾</ArcanaButton>
  {/snippet}
  {#each presets as p (p.key)}
    <ArcanaDropdownItem onClick={() => pick(p.key)}>
      {p.label}
      {#snippet suffix()}{#if activeKey === p.key}<i class="fa-solid fa-check"></i>{/if}{/snippet}
    </ArcanaDropdownItem>
  {/each}
  <ArcanaDropdownItem icon="fa-solid fa-sliders" divided onClick={openMore}>Mais opções</ArcanaDropdownItem>
</ArcanaDropdown>`
  },

  dropdownItem: {
    react: `import { useState } from 'react'
import { ArcanaDropdown, ArcanaDropdownItem, ArcanaButton } from '@arcanalabs/ui-components/react'

export function Menu() {
  const [last, setLast] = useState('—')
  return (
    <>
      <ArcanaDropdown
        placement="bottom-start"
        size="comfortable"
        trigger={<ArcanaButton variant="outline">Open menu ▾</ArcanaButton>}
      >
        {/* \`suffix\` renders on the right — usually a keyboard shortcut */}
        <ArcanaDropdownItem icon="fa-solid fa-user" suffix={<span>⌘P</span>} onClick={() => setLast('Profile')}>Profile</ArcanaDropdownItem>
        <ArcanaDropdownItem icon="fa-solid fa-check" variant="success" onClick={() => setLast('Approve')}>Approve</ArcanaDropdownItem>
        <ArcanaDropdownItem icon="fa-solid fa-flag" variant="warning" onClick={() => setLast('Flag')}>Flag for review</ArcanaDropdownItem>
        {/* \`divided\` draws a separator above the item */}
        <ArcanaDropdownItem icon="fa-solid fa-trash" variant="danger" divided onClick={() => setLast('Delete')}>Delete</ArcanaDropdownItem>
      </ArcanaDropdown>

      <p>Last action: <strong>{last}</strong></p>
    </>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaDropdownComponent, ArcanaDropdownItemComponent, ArcanaButtonComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [ArcanaDropdownComponent, ArcanaDropdownItemComponent, ArcanaButtonComponent],
  template: \`
    <div arcanaDropdown placement="bottom-start" size="comfortable">
      <button arcanaDropdownTrigger arcanaButton variant="outline">Open menu ▾</button>

      <!-- suffix renders on the right — usually a keyboard shortcut -->
      <div arcanaDropdownItem icon="fa-solid fa-user" suffix="⌘P" (click)="last = 'Profile'">Profile</div>
      <div arcanaDropdownItem icon="fa-solid fa-check" variant="success" (click)="last = 'Approve'">Approve</div>
      <div arcanaDropdownItem icon="fa-solid fa-flag" variant="warning" (click)="last = 'Flag'">Flag for review</div>
      <!-- [divided] draws a separator above the item -->
      <div arcanaDropdownItem icon="fa-solid fa-trash" variant="danger" [divided]="true" (click)="last = 'Delete'">Delete</div>
    </div>

    <p>Last action: <strong>{{ last }}</strong></p>
  \`
})
export class MenuComponent {
  last = '—'
}`,
    svelte: `<script lang="ts">
  import { ArcanaDropdown, ArcanaDropdownItem, ArcanaButton } from '@arcanalabs/ui-components/svelte'

  let last = $state('—')
</script>

<ArcanaDropdown placement="bottom-start" size="comfortable">
  {#snippet trigger({ toggle })}
    <ArcanaButton variant="outline" onClick={toggle}>Open menu ▾</ArcanaButton>
  {/snippet}

  <!-- the \`suffix\` snippet renders on the right — usually a keyboard shortcut -->
  <ArcanaDropdownItem icon="fa-solid fa-user" onClick={() => (last = 'Profile')}>
    Profile
    {#snippet suffix()}⌘P{/snippet}
  </ArcanaDropdownItem>
  <ArcanaDropdownItem icon="fa-solid fa-check" variant="success" onClick={() => (last = 'Approve')}>Approve</ArcanaDropdownItem>
  <ArcanaDropdownItem icon="fa-solid fa-flag" variant="warning" onClick={() => (last = 'Flag')}>Flag for review</ArcanaDropdownItem>
  <!-- \`divided\` draws a separator above the item -->
  <ArcanaDropdownItem icon="fa-solid fa-trash" variant="danger" divided onClick={() => (last = 'Delete')}>Delete</ArcanaDropdownItem>
</ArcanaDropdown>

<p>Last action: <strong>{last}</strong></p>`
  },

  table: {
    react: `import { ArcanaTable, ArcanaBadge, type ArcanaTableColumn } from '@arcanalabs/ui-components/react'

const columns: ArcanaTableColumn[] = [
  { key: 'sku', label: 'SKU', width: '96px' },
  // A custom cell can render any component — here a status badge next to the name.
  { key: 'name', label: 'Product', render: ({ row }) => (
    <>
      <strong>{row.name}</strong>
      <ArcanaBadge variant={row.status === 'low' ? 'amber' : 'green'} size="sm">
        {row.status === 'low' ? 'Low stock' : 'In stock'}
      </ArcanaBadge>
    </>
  ) },
  { key: 'qty', label: 'Qty', align: 'right' },
  { key: 'total', label: 'Total', align: 'right', valueGetter: (v) => '$' + Number(v).toFixed(2) },
]
const rows = [
  { sku: 'WM-100', name: 'Wireless Mouse', qty: 2, total: 260, status: 'in' },
  { sku: 'KB-200', name: 'Mechanical Keyboard', qty: 1, total: 480, status: 'low' },
  { sku: 'HUB-300', name: 'USB-C Hub', qty: 5, total: 45, status: 'in' },
]

export function ProductsTable() {
  return (
    <ArcanaTable columns={columns} rows={rows} footer={
      <tr><td colSpan={3}>Total of items</td><td className="arcana-table__td--right">$785.00</td></tr>
    } />
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaTableComponent, ArcanaBadgeComponent, type ArcanaTableColumn } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-products-table',
  standalone: true,
  imports: [ArcanaTableComponent, ArcanaBadgeComponent],
  template: \`
    <div arcanaTable [columns]="columns" [rows]="rows" [cellTemplates]="{ name: nameCell }" [footerTemplate]="foot"></div>

    <!-- A custom cell can render any component — here a status badge next to the name. -->
    <ng-template #nameCell let-row="row">
      <strong>{{ row.name }}</strong>
      <span arcanaBadge [variant]="row.status === 'low' ? 'amber' : 'green'" size="sm">
        {{ row.status === 'low' ? 'Low stock' : 'In stock' }}
      </span>
    </ng-template>
    <ng-template #foot><tr><td colspan="3">Total of items</td><td class="arcana-table__td--right">$785.00</td></tr></ng-template>
  \`
})
export class ProductsTableComponent {
  columns: ArcanaTableColumn[] = [
    { key: 'sku', label: 'SKU', width: '96px' },
    { key: 'name', label: 'Product' },
    { key: 'qty', label: 'Qty', align: 'right' },
    { key: 'total', label: 'Total', align: 'right', valueGetter: (v) => '$' + Number(v).toFixed(2) },
  ]
  rows = [
    { sku: 'WM-100', name: 'Wireless Mouse', qty: 2, total: 260, status: 'in' },
    { sku: 'KB-200', name: 'Mechanical Keyboard', qty: 1, total: 480, status: 'low' },
    { sku: 'HUB-300', name: 'USB-C Hub', qty: 5, total: 45, status: 'in' },
  ]
}`,
    svelte: `<script lang="ts">
  import { ArcanaTable, ArcanaBadge, type ArcanaTableColumn } from '@arcanalabs/ui-components/svelte'

  const columns: ArcanaTableColumn[] = [
    { key: 'sku', label: 'SKU', width: '96px' },
    { key: 'name', label: 'Product', render: nameCell },
    { key: 'qty', label: 'Qty', align: 'right' },
    { key: 'total', label: 'Total', align: 'right', valueGetter: (v) => '$' + Number(v).toFixed(2) },
  ]
  const rows = [
    { sku: 'WM-100', name: 'Wireless Mouse', qty: 2, total: 260, status: 'in' },
    { sku: 'KB-200', name: 'Mechanical Keyboard', qty: 1, total: 480, status: 'low' },
    { sku: 'HUB-300', name: 'USB-C Hub', qty: 5, total: 45, status: 'in' },
  ]
</script>

<!-- A custom cell can render any component — here a status badge next to the name. -->
{#snippet nameCell({ row })}
  <strong>{row.name}</strong>
  <ArcanaBadge variant={row.status === 'low' ? 'amber' : 'green'} size="sm">
    {row.status === 'low' ? 'Low stock' : 'In stock'}
  </ArcanaBadge>
{/snippet}

<ArcanaTable {columns} {rows}>
  {#snippet footer()}<tr><td colspan="3">Total of items</td><td class="arcana-table__td--right">$785.00</td></tr>{/snippet}
</ArcanaTable>`
  },

  specSheet: {
    react: `import { ArcanaSpecSheet, ArcanaSpecSheetSection, ArcanaSpecSheetField, ArcanaButton } from '@arcanalabs/ui-components/react'

const form = {
  legal_name: 'Acme Corporation',
  tax_id: '12-3456789',
  registration_no: '',                    // empty → renders the "not provided" text
  phone: '+1 (555) 010-4477',
  email: 'hello@acme.com',
}

export function OrgSheet() {
  return (
    <ArcanaSpecSheet
      docNum="Record Nº 042"
      title="Acme Corporation"
      metaLabel="Status"
      meta={<span className="arcana-spec-sheet-badge arcana-spec-sheet-badge--active">Active</span>}
      footer={<ArcanaButton variant="outline">Change data</ArcanaButton>}
    >
      <ArcanaSpecSheetSection title="Company details" sectionNum="§ 01" icon="fa-solid fa-building" iconColor="blue" columns={3}>
        <ArcanaSpecSheetField label="Legal name" value={form.legal_name} />
        <ArcanaSpecSheetField label="Tax ID" value={form.tax_id} />
        <ArcanaSpecSheetField label="Registration no." value={form.registration_no} />
      </ArcanaSpecSheetSection>

      {/* A second section — each one gets its own number, icon and accent colour */}
      <ArcanaSpecSheetSection title="Contact" sectionNum="§ 02" icon="fa-solid fa-phone" iconColor="emerald">
        <ArcanaSpecSheetField label="Phone" value={form.phone} />
        <ArcanaSpecSheetField label="E-mail" value={form.email} />
      </ArcanaSpecSheetSection>
    </ArcanaSpecSheet>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaSpecSheetComponent, ArcanaSpecSheetSectionComponent, ArcanaSpecSheetFieldComponent, ArcanaButtonComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-org-sheet',
  standalone: true,
  imports: [ArcanaSpecSheetComponent, ArcanaSpecSheetSectionComponent, ArcanaSpecSheetFieldComponent, ArcanaButtonComponent],
  template: \`
    <article arcanaSpecSheet docNum="Record Nº 042" title="Acme Corporation" metaLabel="Status" [metaTemplate]="meta" [footerTemplate]="foot">
      <section arcanaSpecSheetSection title="Company details" sectionNum="§ 01" icon="fa-solid fa-building" iconColor="blue" [columns]="3">
        <div arcanaSpecSheetField label="Legal name" [value]="form.legal_name"></div>
        <div arcanaSpecSheetField label="Tax ID" [value]="form.tax_id"></div>
        <div arcanaSpecSheetField label="Registration no." [value]="form.registration_no"></div>
      </section>

      <!-- A second section — each one gets its own number, icon and accent colour -->
      <section arcanaSpecSheetSection title="Contact" sectionNum="§ 02" icon="fa-solid fa-phone" iconColor="emerald">
        <div arcanaSpecSheetField label="Phone" [value]="form.phone"></div>
        <div arcanaSpecSheetField label="E-mail" [value]="form.email"></div>
      </section>
    </article>
    <ng-template #meta><span class="arcana-spec-sheet-badge arcana-spec-sheet-badge--active">Active</span></ng-template>
    <ng-template #foot><button arcanaButton variant="outline">Change data</button></ng-template>
  \`
})
export class OrgSheetComponent {
  form = {
    legal_name: 'Acme Corporation',
    tax_id: '12-3456789',
    registration_no: '',                    // empty → renders the "not provided" text
    phone: '+1 (555) 010-4477',
    email: 'hello@acme.com',
  }
}`,
    svelte: `<script lang="ts">
  import { ArcanaSpecSheet, ArcanaSpecSheetSection, ArcanaSpecSheetField, ArcanaButton } from '@arcanalabs/ui-components/svelte'

  const form = {
    legal_name: 'Acme Corporation',
    tax_id: '12-3456789',
    registration_no: '',                    // empty → renders the "not provided" text
    phone: '+1 (555) 010-4477',
    email: 'hello@acme.com',
  }
</script>

<ArcanaSpecSheet docNum="Record Nº 042" title="Acme Corporation" metaLabel="Status">
  {#snippet meta()}<span class="arcana-spec-sheet-badge arcana-spec-sheet-badge--active">Active</span>{/snippet}

  <ArcanaSpecSheetSection title="Company details" sectionNum="§ 01" icon="fa-solid fa-building" iconColor="blue" columns={3}>
    <ArcanaSpecSheetField label="Legal name" value={form.legal_name} />
    <ArcanaSpecSheetField label="Tax ID" value={form.tax_id} />
    <ArcanaSpecSheetField label="Registration no." value={form.registration_no} />
  </ArcanaSpecSheetSection>

  <!-- A second section — each one gets its own number, icon and accent colour -->
  <ArcanaSpecSheetSection title="Contact" sectionNum="§ 02" icon="fa-solid fa-phone" iconColor="emerald">
    <ArcanaSpecSheetField label="Phone" value={form.phone} />
    <ArcanaSpecSheetField label="E-mail" value={form.email} />
  </ArcanaSpecSheetSection>

  {#snippet footer()}<ArcanaButton variant="outline">Change data</ArcanaButton>{/snippet}
</ArcanaSpecSheet>`
  },

  specSheetSection: {
    react: `import { ArcanaSpecSheet, ArcanaSpecSheetSection, ArcanaSpecSheetField, ArcanaButton } from '@arcanalabs/ui-components/react'

export function Financials() {
  return (
    // \`flat\` drops the sheet chrome so the sections stand on their own.
    <ArcanaSpecSheet flat>
      <ArcanaSpecSheetSection
        title="Billing"
        sectionNum="§ 03"
        icon="fa-solid fa-dollar-sign"
        iconColor="amber"
        columns={3}
        actions={<ArcanaButton variant="ghost">Change</ArcanaButton>}
      >
        <ArcanaSpecSheetField label="Credit limit" value="$5,000.00" />
        <ArcanaSpecSheetField label="Balance" value="$1,240.00" />
        <ArcanaSpecSheetField label="Due date" value="Every 10th" />
      </ArcanaSpecSheetSection>

      {/* \`noRowDividers\` removes the rules between rows — good for free text */}
      <ArcanaSpecSheetSection title="Notes" icon="fa-solid fa-note-sticky" iconColor="violet" noRowDividers>
        <ArcanaSpecSheetField label="Internal notes" value="Customer prefers morning deliveries." span={2} />
      </ArcanaSpecSheetSection>
    </ArcanaSpecSheet>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaSpecSheetComponent, ArcanaSpecSheetSectionComponent, ArcanaSpecSheetFieldComponent, ArcanaButtonComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-financials',
  standalone: true,
  imports: [ArcanaSpecSheetComponent, ArcanaSpecSheetSectionComponent, ArcanaSpecSheetFieldComponent, ArcanaButtonComponent],
  template: \`
    <!-- [flat] drops the sheet chrome so the sections stand on their own. -->
    <article arcanaSpecSheet [flat]="true">
      <section arcanaSpecSheetSection title="Billing" sectionNum="§ 03" icon="fa-solid fa-dollar-sign" iconColor="amber" [columns]="3" [actionsTemplate]="acts">
        <div arcanaSpecSheetField label="Credit limit" value="$5,000.00"></div>
        <div arcanaSpecSheetField label="Balance" value="$1,240.00"></div>
        <div arcanaSpecSheetField label="Due date" value="Every 10th"></div>
      </section>

      <!-- [noRowDividers] removes the rules between rows — good for free text -->
      <section arcanaSpecSheetSection title="Notes" icon="fa-solid fa-note-sticky" iconColor="violet" [noRowDividers]="true">
        <div arcanaSpecSheetField label="Internal notes" value="Customer prefers morning deliveries." [span]="2"></div>
      </section>
    </article>
    <ng-template #acts><button arcanaButton variant="ghost">Change</button></ng-template>
  \`
})
export class FinancialsComponent {}`,
    svelte: `<script lang="ts">
  import { ArcanaSpecSheet, ArcanaSpecSheetSection, ArcanaSpecSheetField, ArcanaButton } from '@arcanalabs/ui-components/svelte'
</script>

<!-- \`flat\` drops the sheet chrome so the sections stand on their own. -->
<ArcanaSpecSheet flat>
  <ArcanaSpecSheetSection title="Billing" sectionNum="§ 03" icon="fa-solid fa-dollar-sign" iconColor="amber" columns={3}>
    {#snippet actions()}<ArcanaButton variant="ghost">Change</ArcanaButton>{/snippet}
    <ArcanaSpecSheetField label="Credit limit" value="$5,000.00" />
    <ArcanaSpecSheetField label="Balance" value="$1,240.00" />
    <ArcanaSpecSheetField label="Due date" value="Every 10th" />
  </ArcanaSpecSheetSection>

  <!-- \`noRowDividers\` removes the rules between rows — good for free text -->
  <ArcanaSpecSheetSection title="Notes" icon="fa-solid fa-note-sticky" iconColor="violet" noRowDividers>
    <ArcanaSpecSheetField label="Internal notes" value="Customer prefers morning deliveries." span={2} />
  </ArcanaSpecSheetSection>
</ArcanaSpecSheet>`
  },

  specSheetField: {
    react: `import { ArcanaSpecSheet, ArcanaSpecSheetSection, ArcanaSpecSheetField } from '@arcanalabs/ui-components/react'

// Fields always live inside a section — the section drives the column grid.
export function Fields() {
  return (
    <ArcanaSpecSheet flat>
      <ArcanaSpecSheetSection columns={2}>
        <ArcanaSpecSheetField label="Name" value="Ana Ribeiro" />

        {/* Empty value → \`emptyText\` is rendered in the muted style */}
        <ArcanaSpecSheetField label="Nickname" value="" emptyText="Not provided" />

        {/* Children replace the value entirely; \`span\` widens the field */}
        <ArcanaSpecSheetField label="Status" span={2}>
          <span className="arcana-spec-sheet-badge arcana-spec-sheet-badge--active">Active</span>
        </ArcanaSpecSheetField>
      </ArcanaSpecSheetSection>
    </ArcanaSpecSheet>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaSpecSheetComponent, ArcanaSpecSheetSectionComponent, ArcanaSpecSheetFieldComponent } from '@arcanalabs/ui-components/angular'

// Fields always live inside a section — the section drives the column grid.
@Component({
  selector: 'app-fields',
  standalone: true,
  imports: [ArcanaSpecSheetComponent, ArcanaSpecSheetSectionComponent, ArcanaSpecSheetFieldComponent],
  template: \`
    <article arcanaSpecSheet [flat]="true">
      <section arcanaSpecSheetSection [columns]="2">
        <div arcanaSpecSheetField label="Name" value="Ana Ribeiro"></div>

        <!-- Empty value → emptyText is rendered in the muted style -->
        <div arcanaSpecSheetField label="Nickname" value="" emptyText="Not provided"></div>

        <!-- [valueTemplate] replaces the value entirely; [span] widens the field -->
        <div arcanaSpecSheetField label="Status" [span]="2" [valueTemplate]="status"></div>
      </section>
    </article>
    <ng-template #status><span class="arcana-spec-sheet-badge arcana-spec-sheet-badge--active">Active</span></ng-template>
  \`
})
export class FieldsComponent {}`,
    svelte: `<script lang="ts">
  import { ArcanaSpecSheet, ArcanaSpecSheetSection, ArcanaSpecSheetField } from '@arcanalabs/ui-components/svelte'
</script>

<!-- Fields always live inside a section — the section drives the column grid. -->
<ArcanaSpecSheet flat>
  <ArcanaSpecSheetSection columns={2}>
    <ArcanaSpecSheetField label="Name" value="Ana Ribeiro" />

    <!-- Empty value → \`emptyText\` is rendered in the muted style -->
    <ArcanaSpecSheetField label="Nickname" value="" emptyText="Not provided" />

    <!-- Children replace the value entirely; \`span\` widens the field -->
    <ArcanaSpecSheetField label="Status" span={2}>
      <span class="arcana-spec-sheet-badge arcana-spec-sheet-badge--active">Active</span>
    </ArcanaSpecSheetField>
  </ArcanaSpecSheetSection>
</ArcanaSpecSheet>`
  },

  summaryTiles: {
    react: `import { ArcanaSummaryTilesGroup, ArcanaSummaryTile } from '@arcanalabs/ui-components/react'

export function Kpis() {
  return (
    <>
      {/* Grid layout — \`columns\` sets how many tiles fit per row */}
      <ArcanaSummaryTilesGroup columns={3}>
        <ArcanaSummaryTile tone="positive" icon="fa-solid fa-arrow-down" label="Income" value="$1,250.00" sub="4 methods" />
        <ArcanaSummaryTile tone="negative" icon="fa-solid fa-arrow-up" label="Expenses" value="$85.00" sub="2 methods" />
        <ArcanaSummaryTile tone="indigo" icon="fa-solid fa-sack-dollar" label="Total" value="$1,165.00" />
      </ArcanaSummaryTilesGroup>

      {/* format="rows" stacks the tiles — ideal for narrow sidebars */}
      <ArcanaSummaryTilesGroup format="rows">
        <ArcanaSummaryTile tone="positive" icon="fa-solid fa-arrow-down" label="Income" value="$1,250.00" sub="4 methods" />
        <ArcanaSummaryTile tone="negative" icon="fa-solid fa-arrow-up" label="Expenses" value="$85.00" sub="2 methods" />
      </ArcanaSummaryTilesGroup>
    </>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaSummaryTilesGroupComponent, ArcanaSummaryTileComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-kpis',
  standalone: true,
  imports: [ArcanaSummaryTilesGroupComponent, ArcanaSummaryTileComponent],
  template: \`
    <!-- Grid layout — [columns] sets how many tiles fit per row -->
    <div arcanaSummaryTilesGroup [columns]="3">
      <div arcanaSummaryTile tone="positive" icon="fa-solid fa-arrow-down" label="Income" value="$1,250.00" sub="4 methods"></div>
      <div arcanaSummaryTile tone="negative" icon="fa-solid fa-arrow-up" label="Expenses" value="$85.00" sub="2 methods"></div>
      <div arcanaSummaryTile tone="indigo" icon="fa-solid fa-sack-dollar" label="Total" value="$1,165.00"></div>
    </div>

    <!-- format="rows" stacks the tiles — ideal for narrow sidebars -->
    <div arcanaSummaryTilesGroup format="rows">
      <div arcanaSummaryTile tone="positive" icon="fa-solid fa-arrow-down" label="Income" value="$1,250.00" sub="4 methods"></div>
      <div arcanaSummaryTile tone="negative" icon="fa-solid fa-arrow-up" label="Expenses" value="$85.00" sub="2 methods"></div>
    </div>
  \`
})
export class KpisComponent {}`,
    svelte: `<script lang="ts">
  import { ArcanaSummaryTilesGroup, ArcanaSummaryTile } from '@arcanalabs/ui-components/svelte'
</script>

<!-- Grid layout — \`columns\` sets how many tiles fit per row -->
<ArcanaSummaryTilesGroup columns={3}>
  <ArcanaSummaryTile tone="positive" icon="fa-solid fa-arrow-down" label="Income" value="$1,250.00" sub="4 methods" />
  <ArcanaSummaryTile tone="negative" icon="fa-solid fa-arrow-up" label="Expenses" value="$85.00" sub="2 methods" />
  <ArcanaSummaryTile tone="indigo" icon="fa-solid fa-sack-dollar" label="Total" value="$1,165.00" />
</ArcanaSummaryTilesGroup>

<!-- format="rows" stacks the tiles — ideal for narrow sidebars -->
<ArcanaSummaryTilesGroup format="rows">
  <ArcanaSummaryTile tone="positive" icon="fa-solid fa-arrow-down" label="Income" value="$1,250.00" sub="4 methods" />
  <ArcanaSummaryTile tone="negative" icon="fa-solid fa-arrow-up" label="Expenses" value="$85.00" sub="2 methods" />
</ArcanaSummaryTilesGroup>`
  },

  summaryTile: {
    react: `import { ArcanaSummaryTile, ArcanaBadge } from '@arcanalabs/ui-components/react'

export function Kpis() {
  return (
    <>
      {/* One tile per tone */}
      <ArcanaSummaryTile tone="neutral" icon="fa-solid fa-box" label="Orders" value="128" sub="today" />
      <ArcanaSummaryTile tone="positive" icon="fa-solid fa-check" label="Approved" value="112" />
      <ArcanaSummaryTile tone="negative" icon="fa-solid fa-xmark" label="Canceled" value="16" />

      {/* \`valueSlot\` replaces the plain value with any node */}
      <ArcanaSummaryTile
        tone="indigo"
        icon="fa-solid fa-percent"
        label="Conversion"
        valueSlot={<ArcanaBadge variant="green">87.5%</ArcanaBadge>}
      />
    </>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaSummaryTileComponent, ArcanaBadgeComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-kpis',
  standalone: true,
  imports: [ArcanaSummaryTileComponent, ArcanaBadgeComponent],
  template: \`
    <!-- One tile per tone -->
    <div arcanaSummaryTile tone="neutral" icon="fa-solid fa-box" label="Orders" value="128" sub="today"></div>
    <div arcanaSummaryTile tone="positive" icon="fa-solid fa-check" label="Approved" value="112"></div>
    <div arcanaSummaryTile tone="negative" icon="fa-solid fa-xmark" label="Canceled" value="16"></div>

    <!-- Content projected as [tileValue] replaces the plain value -->
    <div arcanaSummaryTile tone="indigo" icon="fa-solid fa-percent" label="Conversion">
      <span tileValue><span arcanaBadge variant="green">87.5%</span></span>
    </div>
  \`
})
export class KpisComponent {}`,
    svelte: `<script lang="ts">
  import { ArcanaSummaryTile, ArcanaBadge } from '@arcanalabs/ui-components/svelte'
</script>

<!-- One tile per tone -->
<ArcanaSummaryTile tone="neutral" icon="fa-solid fa-box" label="Orders" value="128" sub="today" />
<ArcanaSummaryTile tone="positive" icon="fa-solid fa-check" label="Approved" value="112" />
<ArcanaSummaryTile tone="negative" icon="fa-solid fa-xmark" label="Canceled" value="16" />

<!-- The \`valueSlot\` snippet replaces the plain value -->
{#snippet conversion()}<ArcanaBadge variant="green">87.5%</ArcanaBadge>{/snippet}
<ArcanaSummaryTile tone="indigo" icon="fa-solid fa-percent" label="Conversion" valueSlot={conversion} />`
  },

  settingsList: {
    react: `import { useState } from 'react'
import { ArcanaSettingsList, ArcanaSettingsListItem, ArcanaSwitch } from '@arcanalabs/ui-components/react'

export function Settings() {
  const [enabled, setEnabled] = useState(true)
  const [email, setEmail] = useState(false)
  return (
    <ArcanaSettingsList>
      <ArcanaSettingsListItem label="Advanced features" caption="Enables internal functionality.">
        <ArcanaSwitch value={enabled} onValueChange={setEnabled} ariaLabel="Advanced features" />
      </ArcanaSettingsListItem>

      <ArcanaSettingsListItem label="E-mail notifications" caption="Daily activity digest.">
        <ArcanaSwitch value={email} onValueChange={setEmail} ariaLabel="E-mail" />
      </ArcanaSettingsListItem>

      {/* The trailing slot takes any control — not just a switch */}
      <ArcanaSettingsListItem label="Plan" caption="Your current subscription.">
        <span className="arcana-settings-list__current-value">Professional</span>
        <button className="arcana-settings-list__edit-btn" type="button">Change</button>
      </ArcanaSettingsListItem>
    </ArcanaSettingsList>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaSettingsListComponent, ArcanaSettingsListItemComponent, ArcanaSwitchComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ArcanaSettingsListComponent, ArcanaSettingsListItemComponent, ArcanaSwitchComponent],
  template: \`
    <div arcanaSettingsList>
      <div arcanaSettingsListItem label="Advanced features" caption="Enables internal functionality.">
        <button arcanaSwitch [(value)]="enabled" ariaLabel="Advanced features"></button>
      </div>

      <div arcanaSettingsListItem label="E-mail notifications" caption="Daily activity digest.">
        <button arcanaSwitch [(value)]="email" ariaLabel="E-mail"></button>
      </div>

      <!-- The trailing slot takes any control — not just a switch -->
      <div arcanaSettingsListItem label="Plan" caption="Your current subscription.">
        <span class="arcana-settings-list__current-value">Professional</span>
        <button class="arcana-settings-list__edit-btn" type="button">Change</button>
      </div>
    </div>
  \`
})
export class SettingsComponent {
  enabled = true
  email = false
}`,
    svelte: `<script lang="ts">
  import { ArcanaSettingsList, ArcanaSettingsListItem, ArcanaSwitch } from '@arcanalabs/ui-components/svelte'

  let enabled = $state(true)
  let email = $state(false)
</script>

<ArcanaSettingsList>
  <ArcanaSettingsListItem label="Advanced features" caption="Enables internal functionality.">
    <ArcanaSwitch value={enabled} onValueChange={(v) => (enabled = v)} ariaLabel="Advanced features" />
  </ArcanaSettingsListItem>

  <ArcanaSettingsListItem label="E-mail notifications" caption="Daily activity digest.">
    <ArcanaSwitch value={email} onValueChange={(v) => (email = v)} ariaLabel="E-mail" />
  </ArcanaSettingsListItem>

  <!-- The trailing slot takes any control — not just a switch -->
  <ArcanaSettingsListItem label="Plan" caption="Your current subscription.">
    <span class="arcana-settings-list__current-value">Professional</span>
    <button class="arcana-settings-list__edit-btn" type="button">Change</button>
  </ArcanaSettingsListItem>
</ArcanaSettingsList>`
  },

  settingsListGroup: {
    react: `import { useState } from 'react'
import { ArcanaSettingsList, ArcanaSettingsListGroup, ArcanaSettingsListItem, ArcanaSwitch } from '@arcanalabs/ui-components/react'

export function OrderSettings() {
  const [accept, setAccept] = useState(true)
  const [autoConfirm, setAutoConfirm] = useState(false)
  const [tracking, setTracking] = useState(true)
  return (
    <ArcanaSettingsList>
      <ArcanaSettingsListGroup title="Orders" icon="fa-solid fa-cart-shopping" iconColor="indigo" sectionNum="§ 01" meta="2 settings">
        <ArcanaSettingsListItem label="Accept orders" caption="Turn the storefront on or off.">
          <ArcanaSwitch value={accept} onValueChange={setAccept} ariaLabel="Accept orders" />
        </ArcanaSettingsListItem>
        {/* \`nested\` indents a dependent setting */}
        <ArcanaSettingsListItem label="Auto-confirm" caption="Skips manual review." nested>
          <ArcanaSwitch value={autoConfirm} onValueChange={setAutoConfirm} ariaLabel="Auto-confirm" />
        </ArcanaSettingsListItem>
      </ArcanaSettingsListGroup>

      {/* Collapsible group, starting closed and in the denser spacing */}
      <ArcanaSettingsListGroup title="Delivery" icon="fa-solid fa-truck" iconColor="emerald" collapsible defaultCollapsed compact>
        <ArcanaSettingsListItem label="Real-time tracking">
          <ArcanaSwitch value={tracking} onValueChange={setTracking} ariaLabel="Real-time tracking" />
        </ArcanaSettingsListItem>
      </ArcanaSettingsListGroup>
    </ArcanaSettingsList>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaSettingsListComponent, ArcanaSettingsListGroupComponent, ArcanaSettingsListItemComponent, ArcanaSwitchComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-order-settings',
  standalone: true,
  imports: [ArcanaSettingsListComponent, ArcanaSettingsListGroupComponent, ArcanaSettingsListItemComponent, ArcanaSwitchComponent],
  template: \`
    <div arcanaSettingsList>
      <section arcanaSettingsListGroup title="Orders" icon="fa-solid fa-cart-shopping" iconColor="indigo" sectionNum="§ 01" meta="2 settings">
        <div arcanaSettingsListItem label="Accept orders" caption="Turn the storefront on or off.">
          <button arcanaSwitch [(value)]="accept" ariaLabel="Accept orders"></button>
        </div>
        <!-- [nested] indents a dependent setting -->
        <div arcanaSettingsListItem label="Auto-confirm" caption="Skips manual review." [nested]="true">
          <button arcanaSwitch [(value)]="autoConfirm" ariaLabel="Auto-confirm"></button>
        </div>
      </section>

      <!-- Collapsible group, starting closed and in the denser spacing -->
      <section arcanaSettingsListGroup title="Delivery" icon="fa-solid fa-truck" iconColor="emerald" [collapsible]="true" [defaultCollapsed]="true" [compact]="true">
        <div arcanaSettingsListItem label="Real-time tracking">
          <button arcanaSwitch [(value)]="tracking" ariaLabel="Real-time tracking"></button>
        </div>
      </section>
    </div>
  \`
})
export class OrderSettingsComponent {
  accept = true
  autoConfirm = false
  tracking = true
}`,
    svelte: `<script lang="ts">
  import { ArcanaSettingsList, ArcanaSettingsListGroup, ArcanaSettingsListItem, ArcanaSwitch } from '@arcanalabs/ui-components/svelte'

  let accept = $state(true)
  let autoConfirm = $state(false)
  let tracking = $state(true)
</script>

<ArcanaSettingsList>
  <ArcanaSettingsListGroup title="Orders" icon="fa-solid fa-cart-shopping" iconColor="indigo" sectionNum="§ 01" meta="2 settings">
    <ArcanaSettingsListItem label="Accept orders" caption="Turn the storefront on or off.">
      <ArcanaSwitch value={accept} onValueChange={(v) => (accept = v)} ariaLabel="Accept orders" />
    </ArcanaSettingsListItem>
    <!-- \`nested\` indents a dependent setting -->
    <ArcanaSettingsListItem label="Auto-confirm" caption="Skips manual review." nested>
      <ArcanaSwitch value={autoConfirm} onValueChange={(v) => (autoConfirm = v)} ariaLabel="Auto-confirm" />
    </ArcanaSettingsListItem>
  </ArcanaSettingsListGroup>

  <!-- Collapsible group, starting closed and in the denser spacing -->
  <ArcanaSettingsListGroup title="Delivery" icon="fa-solid fa-truck" iconColor="emerald" collapsible defaultCollapsed compact>
    <ArcanaSettingsListItem label="Real-time tracking">
      <ArcanaSwitch value={tracking} onValueChange={(v) => (tracking = v)} ariaLabel="Real-time tracking" />
    </ArcanaSettingsListItem>
  </ArcanaSettingsListGroup>
</ArcanaSettingsList>`
  },

  settingsListItem: {
    react: `import { useState } from 'react'
import { ArcanaSettingsList, ArcanaSettingsListItem, ArcanaSwitch } from '@arcanalabs/ui-components/react'

export function Rows() {
  const [subscription, setSubscription] = useState(true)
  const [showWebApp, setShowWebApp] = useState(false)
  return (
    <ArcanaSettingsList>
      {/* \`label\` accepts a node, so it can carry a badge */}
      <ArcanaSettingsListItem
        label={<>Subscription v2 <span className="arcana-spec-sheet-badge arcana-spec-sheet-badge--active">Active</span></>}
        caption="New SaaS billing engine."
      >
        <ArcanaSwitch value={subscription} onValueChange={setSubscription} ariaLabel="Subscription v2" />
      </ArcanaSettingsListItem>

      {/* \`nested\` indents a dependent setting */}
      <ArcanaSettingsListItem label="Show in the web app" caption="Visible on the customer portal." nested>
        <ArcanaSwitch value={showWebApp} onValueChange={setShowWebApp} ariaLabel="Show in the web app" />
      </ArcanaSettingsListItem>

      {/* \`disabled\` dims the whole row — disable the control too */}
      <ArcanaSettingsListItem label="Unavailable feature" caption="Not included in your plan." disabled>
        <ArcanaSwitch value={false} disabled ariaLabel="Unavailable feature" />
      </ArcanaSettingsListItem>
    </ArcanaSettingsList>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaSettingsListComponent, ArcanaSettingsListItemComponent, ArcanaSwitchComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-rows',
  standalone: true,
  imports: [ArcanaSettingsListComponent, ArcanaSettingsListItemComponent, ArcanaSwitchComponent],
  template: \`
    <div arcanaSettingsList>
      <!-- [labelTemplate] replaces the plain label, so it can carry a badge -->
      <div arcanaSettingsListItem [labelTemplate]="subLabel" caption="New SaaS billing engine.">
        <button arcanaSwitch [(value)]="subscription" ariaLabel="Subscription v2"></button>
      </div>

      <!-- [nested] indents a dependent setting -->
      <div arcanaSettingsListItem label="Show in the web app" caption="Visible on the customer portal." [nested]="true">
        <button arcanaSwitch [(value)]="showWebApp" ariaLabel="Show in the web app"></button>
      </div>

      <!-- [disabled] dims the whole row — disable the control too -->
      <div arcanaSettingsListItem label="Unavailable feature" caption="Not included in your plan." [disabled]="true">
        <button arcanaSwitch [value]="false" [disabled]="true" ariaLabel="Unavailable feature"></button>
      </div>
    </div>
    <ng-template #subLabel>
      Subscription v2 <span class="arcana-spec-sheet-badge arcana-spec-sheet-badge--active">Active</span>
    </ng-template>
  \`
})
export class RowsComponent {
  subscription = true
  showWebApp = false
}`,
    svelte: `<script lang="ts">
  import { ArcanaSettingsList, ArcanaSettingsListItem, ArcanaSwitch } from '@arcanalabs/ui-components/svelte'

  let subscription = $state(true)
  let showWebApp = $state(false)
</script>

<!-- \`label\` accepts a snippet, so it can carry a badge -->
{#snippet subLabel()}
  Subscription v2 <span class="arcana-spec-sheet-badge arcana-spec-sheet-badge--active">Active</span>
{/snippet}

<ArcanaSettingsList>
  <ArcanaSettingsListItem label={subLabel} caption="New SaaS billing engine.">
    <ArcanaSwitch value={subscription} onValueChange={(v) => (subscription = v)} ariaLabel="Subscription v2" />
  </ArcanaSettingsListItem>

  <!-- \`nested\` indents a dependent setting -->
  <ArcanaSettingsListItem label="Show in the web app" caption="Visible on the customer portal." nested>
    <ArcanaSwitch value={showWebApp} onValueChange={(v) => (showWebApp = v)} ariaLabel="Show in the web app" />
  </ArcanaSettingsListItem>

  <!-- \`disabled\` dims the whole row — disable the control too -->
  <ArcanaSettingsListItem label="Unavailable feature" caption="Not included in your plan." disabled>
    <ArcanaSwitch value={false} disabled ariaLabel="Unavailable feature" />
  </ArcanaSettingsListItem>
</ArcanaSettingsList>`
  },

  settingsEditableField: {
    react: `import { useState } from 'react'
import { ArcanaSettingsList, ArcanaSettingsEditableField, type SelectOption } from '@arcanalabs/ui-components/react'

const planOptions: SelectOption[] = [
  { label: 'Basic', value: 'basic' },
  { label: 'Professional', value: 'pro' },
  { label: 'Enterprise', value: 'enterprise' },
]

export function AccountSettings() {
  const [name, setName] = useState<string | number | boolean | null>('Arcana Labs HQ')
  const [discount, setDiscount] = useState<string | number | boolean | null>('1500.00')
  const [plan, setPlan] = useState<string | number | boolean | null>('pro')
  function autoSave(value: string | number | boolean | null) { /* …persist */ }
  return (
    <ArcanaSettingsList>
      {/* Each \`type\` opens the matching editor in the modal */}
      <ArcanaSettingsEditableField
        editLabel="Change"
        label="Unit name"
        caption="Shown on invoices."
        type="text"
        value={name}
        onValueChange={setName}
        onSave={autoSave}
      />
      <ArcanaSettingsEditableField
        editLabel="Change"
        label="First-purchase discount"
        caption="Per-unit amount applied."
        type="currency"
        value={discount}
        onValueChange={setDiscount}
        onSave={autoSave}
      />
      <ArcanaSettingsEditableField
        editLabel="Change"
        label="Plan"
        caption="Your current subscription."
        type="select"
        options={planOptions}
        value={plan}
        onValueChange={setPlan}
        onSave={autoSave}
      />
    </ArcanaSettingsList>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaSettingsListComponent, ArcanaSettingsEditableFieldComponent, type SelectOption } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-account-settings',
  standalone: true,
  imports: [ArcanaSettingsListComponent, ArcanaSettingsEditableFieldComponent],
  template: \`
    <div arcanaSettingsList>
      <!-- Each type opens the matching editor in the modal -->
      <div arcanaSettingsEditableField editLabel="Change" label="Unit name" caption="Shown on invoices." type="text" [(value)]="name" (save)="autoSave($event)"></div>
      <div arcanaSettingsEditableField editLabel="Change" label="First-purchase discount" caption="Per-unit amount applied." type="currency" [(value)]="discount" (save)="autoSave($event)"></div>
      <div arcanaSettingsEditableField editLabel="Change" label="Plan" caption="Your current subscription." type="select" [options]="planOptions" [(value)]="plan" (save)="autoSave($event)"></div>
    </div>
  \`
})
export class AccountSettingsComponent {
  name: unknown = 'Arcana Labs HQ'
  discount: unknown = '1500.00'
  plan: unknown = 'pro'
  planOptions: SelectOption[] = [
    { label: 'Basic', value: 'basic' },
    { label: 'Professional', value: 'pro' },
    { label: 'Enterprise', value: 'enterprise' },
  ]
  autoSave(value: unknown) { /* …persist */ }
}`,
    svelte: `<script lang="ts">
  import { ArcanaSettingsList, ArcanaSettingsEditableField, type SelectOption } from '@arcanalabs/ui-components/svelte'

  let name = $state<string | number | boolean | null>('Arcana Labs HQ')
  let discount = $state<string | number | boolean | null>('1500.00')
  let plan = $state<string | number | boolean | null>('pro')

  const planOptions: SelectOption[] = [
    { label: 'Basic', value: 'basic' },
    { label: 'Professional', value: 'pro' },
    { label: 'Enterprise', value: 'enterprise' },
  ]
  function autoSave(value: string | number | boolean | null) { /* …persist */ }
</script>

<ArcanaSettingsList>
  <!-- Each \`type\` opens the matching editor in the modal -->
  <ArcanaSettingsEditableField
    editLabel="Change"
    label="Unit name"
    caption="Shown on invoices."
    type="text"
    value={name}
    onValueChange={(v) => (name = v)}
    onSave={autoSave}
  />
  <ArcanaSettingsEditableField
    editLabel="Change"
    label="First-purchase discount"
    caption="Per-unit amount applied."
    type="currency"
    value={discount}
    onValueChange={(v) => (discount = v)}
    onSave={autoSave}
  />
  <ArcanaSettingsEditableField
    editLabel="Change"
    label="Plan"
    caption="Your current subscription."
    type="select"
    options={planOptions}
    value={plan}
    onValueChange={(v) => (plan = v)}
    onSave={autoSave}
  />
</ArcanaSettingsList>`
  },

  notice: {
    react: `import { useState } from 'react'
import { ArcanaNotice } from '@arcanalabs/ui-components/react'

export function Notices() {
  const [dismissed, setDismissed] = useState(false)
  return (
    <>
      {/* One notice per variant — each brings its own icon */}
      <ArcanaNotice variant="info" title="Heads-up">
        This workspace is running on the trial plan.
      </ArcanaNotice>
      <ArcanaNotice variant="blue" title="What's new">
        Order routing now supports multiple warehouses.
      </ArcanaNotice>
      <ArcanaNotice variant="success" title="Integration activated">
        Your WhatsApp number is connected and verified.
      </ArcanaNotice>
      <ArcanaNotice variant="warning" title="Manual payment">
        Bank transfer and invoice issue a new charge link every cycle.
      </ArcanaNotice>
      <ArcanaNotice variant="pending" title="Awaiting confirmation">
        The bank has not cleared this payment yet.
      </ArcanaNotice>

      {/* \`dismissible\` renders the close button and fires onDismiss */}
      {!dismissed && (
        <ArcanaNotice variant="destructive" title="Something went wrong" dismissible onDismiss={() => setDismissed(true)}>
          Please try again.
        </ArcanaNotice>
      )}
    </>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaNoticeComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-notices',
  standalone: true,
  imports: [ArcanaNoticeComponent],
  template: \`
    <!-- One notice per variant — each brings its own icon -->
    <div arcanaNotice variant="info" title="Heads-up">
      This workspace is running on the trial plan.
    </div>
    <div arcanaNotice variant="blue" title="What's new">
      Order routing now supports multiple warehouses.
    </div>
    <div arcanaNotice variant="success" title="Integration activated">
      Your WhatsApp number is connected and verified.
    </div>
    <div arcanaNotice variant="warning" title="Manual payment">
      Bank transfer and invoice issue a new charge link every cycle.
    </div>
    <div arcanaNotice variant="pending" title="Awaiting confirmation">
      The bank has not cleared this payment yet.
    </div>

    <!-- [dismissible] renders the close button and fires (dismiss) -->
    @if (!dismissed) {
      <div arcanaNotice variant="destructive" title="Something went wrong" [dismissible]="true" (dismiss)="dismissed = true">
        Please try again.
      </div>
    }
  \`
})
export class NoticesComponent {
  dismissed = false
}`,
    svelte: `<script lang="ts">
  import { ArcanaNotice } from '@arcanalabs/ui-components/svelte'

  let dismissed = $state(false)
</script>

<!-- One notice per variant — each brings its own icon -->
<ArcanaNotice variant="info" title="Heads-up">
  This workspace is running on the trial plan.
</ArcanaNotice>
<ArcanaNotice variant="blue" title="What's new">
  Order routing now supports multiple warehouses.
</ArcanaNotice>
<ArcanaNotice variant="success" title="Integration activated">
  Your WhatsApp number is connected and verified.
</ArcanaNotice>
<ArcanaNotice variant="warning" title="Manual payment">
  Bank transfer and invoice issue a new charge link every cycle.
</ArcanaNotice>
<ArcanaNotice variant="pending" title="Awaiting confirmation">
  The bank has not cleared this payment yet.
</ArcanaNotice>

<!-- \`dismissible\` renders the close button and fires onDismiss -->
{#if !dismissed}
  <ArcanaNotice variant="destructive" title="Something went wrong" dismissible onDismiss={() => (dismissed = true)}>
    Please try again.
  </ArcanaNotice>
{/if}`
  },

  editFieldModal: {
    react: `import { useRef, useState } from 'react'
import { ArcanaEditFieldDialog, ArcanaInput, ArcanaButton, type ArcanaEditFieldDialogHandle } from '@arcanalabs/ui-components/react'

export function NameRow() {
  const modal = useRef<ArcanaEditFieldDialogHandle>(null)
  const [value, setValue] = useState('Arcana Labs HQ')
  const [saved, setSaved] = useState('Arcana Labs HQ')
  // \`onSave\` does NOT auto-close — validate first, then call hide().
  function save() {
    setSaved(value)
    modal.current?.hide()
  }
  return (
    <>
      <ArcanaButton onClick={() => modal.current?.show()}>Change name</ArcanaButton>
      <p>Saved value: <strong>{saved}</strong></p>

      <ArcanaEditFieldDialog
        ref={modal}
        title="Change unit name"
        description="This name appears on invoices and reports."
        onSave={save}
      >
        <ArcanaInput value={value} onValueChange={(v) => setValue(v as string)} placeholder="Unit name" />
      </ArcanaEditFieldDialog>
    </>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaEditFieldDialogComponent, ArcanaInputComponent, ArcanaButtonComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-name-row',
  standalone: true,
  imports: [ArcanaEditFieldDialogComponent, ArcanaInputComponent, ArcanaButtonComponent],
  template: \`
    <button arcanaButton (click)="m.show()">Change name</button>
    <p>Saved value: <strong>{{ saved }}</strong></p>

    <div arcanaEditFieldDialog #m title="Change unit name" description="This name appears on invoices and reports." (save)="save(m)">
      <input arcanaInput [(value)]="value" placeholder="Unit name" />
    </div>
  \`
})
export class NameRowComponent {
  value: string | number | null = 'Arcana Labs HQ'
  saved = 'Arcana Labs HQ'
  // (save) does NOT auto-close — validate first, then call hide().
  save(m: ArcanaEditFieldDialogComponent) {
    this.saved = String(this.value)
    m.hide()
  }
}`,
    svelte: `<script lang="ts">
  import { ArcanaEditFieldDialog, ArcanaInput, ArcanaButton } from '@arcanalabs/ui-components/svelte'

  let modal: ArcanaEditFieldDialog
  let value = $state('Arcana Labs HQ')
  let saved = $state('Arcana Labs HQ')
  // \`onSave\` does NOT auto-close — validate first, then call hide().
  function save() {
    saved = value
    modal.hide()
  }
</script>

<ArcanaButton onClick={() => modal.show()}>Change name</ArcanaButton>
<p>Saved value: <strong>{saved}</strong></p>

<ArcanaEditFieldDialog
  bind:this={modal}
  title="Change unit name"
  description="This name appears on invoices and reports."
  onSave={save}
>
  <ArcanaInput value={value} onValueChange={(v) => (value = v as string)} placeholder="Unit name" />
</ArcanaEditFieldDialog>`
  },

  requiredFieldsDialog: {
    react: `import { useRef } from 'react'
import { ArcanaRequiredFieldsDialog, ArcanaButton, type ArcanaRequiredFieldsDialogHandle } from '@arcanalabs/ui-components/react'

export function CustomerForm({ form }) {
  const dialog = useRef<ArcanaRequiredFieldsDialogHandle>(null)
  const missing = REQUIRED.filter((f) => !f.check(form))
  function validate() {
    if (missing.length) dialog.current?.show()
  }
  return (
    <>
      <ArcanaButton onClick={validate}>Validar formulário</ArcanaButton>
      <ArcanaRequiredFieldsDialog ref={dialog} fields={missing} description="…antes de criar o cliente." />
    </>
  )
}`,
    angular: `import { Component, Input } from '@angular/core'
import { ArcanaRequiredFieldsDialogComponent, ArcanaButtonComponent, type RequiredField } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [ArcanaRequiredFieldsDialogComponent, ArcanaButtonComponent],
  template: \`
    <button arcanaButton (click)="missing.length && r.show()">Validar formulário</button>
    <div arcanaRequiredFieldsDialog #r [fields]="missing" description="…antes de criar o cliente."></div>
  \`
})
export class CustomerFormComponent {
  @Input() missing: RequiredField[] = []
}`,
    svelte: `<script lang="ts">
  import { ArcanaRequiredFieldsDialog, ArcanaButton, type RequiredField } from '@arcanalabs/ui-components/svelte'

  let { missing = [] }: { missing: RequiredField[] } = $props()
  let dialog: ArcanaRequiredFieldsDialog
  function validate() {
    if (missing.length) dialog.show()
  }
</script>

<ArcanaButton onClick={validate}>Validar formulário</ArcanaButton>
<ArcanaRequiredFieldsDialog bind:this={dialog} fields={missing} description="…antes de criar o cliente." />`
  },

  onboardingPanel: {
    react: `import { ArcanaActionPanel } from '@arcanalabs/ui-components/react'

export function EmptyProjects({ openCreate }) {
  return (
    <ArcanaActionPanel
      icon="fa-solid fa-folder-open"
      title="No projects yet"
      description="Create your first project to get started."
      actionLabel="Create project"
      onAction={openCreate}
    />
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaActionPanelComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-empty-projects',
  standalone: true,
  imports: [ArcanaActionPanelComponent],
  template: \`
    <div arcanaActionPanel
      icon="fa-solid fa-folder-open"
      title="No projects yet"
      description="Create your first project to get started."
      actionLabel="Create project"
      (action)="openCreate()"></div>
  \`
})
export class EmptyProjectsComponent {
  openCreate() {}
}`,
    svelte: `<script lang="ts">
  import { ArcanaActionPanel } from '@arcanalabs/ui-components/svelte'
  export let openCreate: () => void
</script>

<ArcanaActionPanel
  icon="fa-solid fa-folder-open"
  title="No projects yet"
  description="Create your first project to get started."
  actionLabel="Create project"
  onAction={openCreate}
/>`
  },

  loadingOverlay: {
    react: `import { useState } from 'react'
import { ArcanaLoadingOverlay, ArcanaButton } from '@arcanalabs/ui-components/react'

export function Card() {
  const [loading, setLoading] = useState(false)
  function run() {
    setLoading(true)
    setTimeout(() => setLoading(false), 1600)
  }
  return (
    <>
      {/* The parent MUST be position: relative — the overlay is absolute */}
      <div style={{ position: 'relative' }}>
        <p>Order summary</p>
        <p>Click Save to cover this card with the overlay.</p>
        <ArcanaLoadingOverlay visible={loading} text="Saving…" />
      </div>

      <ArcanaButton onClick={run} disabled={loading}>Save</ArcanaButton>
    </>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaLoadingOverlayComponent, ArcanaButtonComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [ArcanaLoadingOverlayComponent, ArcanaButtonComponent],
  template: \`
    <!-- The parent MUST be position: relative — the overlay is absolute -->
    <div style="position: relative">
      <p>Order summary</p>
      <p>Click Save to cover this card with the overlay.</p>
      <div arcanaLoadingOverlay [visible]="loading" text="Saving…"></div>
    </div>

    <button arcanaButton (click)="run()" [disabled]="loading">Save</button>
  \`
})
export class CardComponent {
  loading = false
  run() {
    this.loading = true
    setTimeout(() => { this.loading = false }, 1600)
  }
}`,
    svelte: `<script lang="ts">
  import { ArcanaLoadingOverlay, ArcanaButton } from '@arcanalabs/ui-components/svelte'

  let loading = $state(false)
  function run() {
    loading = true
    setTimeout(() => { loading = false }, 1600)
  }
</script>

<!-- The parent MUST be position: relative — the overlay is absolute -->
<div style="position: relative">
  <p>Order summary</p>
  <p>Click Save to cover this card with the overlay.</p>
  <ArcanaLoadingOverlay visible={loading} text="Saving…" />
</div>

<ArcanaButton onClick={run} disabled={loading}>Save</ArcanaButton>`
  },

  skeleton: {
    react: `import { ArcanaSkeleton } from '@arcanalabs/ui-components/react'

export function CardSkeleton() {
  return (
    <>
      {/* Avatar + two text lines */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <ArcanaSkeleton width="40px" height="40px" rounded="full" />
        <div style={{ display: 'grid', gap: 8, flex: 1 }}>
          <ArcanaSkeleton width="70%" height="12px" />
          <ArcanaSkeleton width="45%" height="10px" />
        </div>
      </div>

      {/* Block placeholder — width defaults to 100% */}
      <ArcanaSkeleton height="80px" rounded="lg" />

      {/* Button placeholders */}
      <div style={{ display: 'flex', gap: 8 }}>
        <ArcanaSkeleton width="84px" height="28px" rounded="md" />
        <ArcanaSkeleton width="84px" height="28px" rounded="md" />
      </div>
    </>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaSkeletonComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-card-skeleton',
  standalone: true,
  imports: [ArcanaSkeletonComponent],
  template: \`
    <!-- Avatar + two text lines -->
    <div style="display: flex; align-items: center; gap: 12px">
      <span arcanaSkeleton width="40px" height="40px" rounded="full"></span>
      <div style="display: grid; gap: 8px; flex: 1">
        <span arcanaSkeleton width="70%" height="12px"></span>
        <span arcanaSkeleton width="45%" height="10px"></span>
      </div>
    </div>

    <!-- Block placeholder — width defaults to 100% -->
    <span arcanaSkeleton height="80px" rounded="lg"></span>

    <!-- Button placeholders -->
    <div style="display: flex; gap: 8px">
      <span arcanaSkeleton width="84px" height="28px" rounded="md"></span>
      <span arcanaSkeleton width="84px" height="28px" rounded="md"></span>
    </div>
  \`
})
export class CardSkeletonComponent {}`,
    svelte: `<script lang="ts">
  import { ArcanaSkeleton } from '@arcanalabs/ui-components/svelte'
</script>

<!-- Avatar + two text lines -->
<div style="display: flex; align-items: center; gap: 12px">
  <ArcanaSkeleton width="40px" height="40px" rounded="full" />
  <div style="display: grid; gap: 8px; flex: 1">
    <ArcanaSkeleton width="70%" height="12px" />
    <ArcanaSkeleton width="45%" height="10px" />
  </div>
</div>

<!-- Block placeholder — width defaults to 100% -->
<ArcanaSkeleton height="80px" rounded="lg" />

<!-- Button placeholders -->
<div style="display: flex; gap: 8px">
  <ArcanaSkeleton width="84px" height="28px" rounded="md" />
  <ArcanaSkeleton width="84px" height="28px" rounded="md" />
</div>`
  },

  switchCard: {
    react: `import { useState } from 'react'
import { ArcanaSwitchCard } from '@arcanalabs/ui-components/react'

export function TwoFactor() {
  const [twoFa, setTwoFa] = useState(true)
  return <ArcanaSwitchCard value={twoFa} onValueChange={setTwoFa} icon="fa-solid fa-shield-halved" title="Autenticação 2FA" statusOn="ATIVO · TOTP" />
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaSwitchCardComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-two-factor',
  standalone: true,
  imports: [ArcanaSwitchCardComponent],
  template: \`<button arcanaSwitchCard [(value)]="twoFa" icon="fa-solid fa-shield-halved" title="Autenticação 2FA" statusOn="ATIVO · TOTP"></button>\`
})
export class TwoFactorComponent {
  twoFa = true
}`,
    svelte: `<script lang="ts">
  import { ArcanaSwitchCard } from '@arcanalabs/ui-components/svelte'
  let twoFa = $state(true)
</script>

<ArcanaSwitchCard value={twoFa} onValueChange={(v) => (twoFa = v)} icon="fa-solid fa-shield-halved" title="Autenticação 2FA" statusOn="ATIVO · TOTP" />`
  },

  switchRow: {
    react: `import { useState } from 'react'
import { ArcanaSwitchRow } from '@arcanalabs/ui-components/react'

export function EmailPref() {
  const [email, setEmail] = useState(true)
  return <ArcanaSwitchRow value={email} onValueChange={setEmail} label="Notificações por e-mail" description="Resumo diário das atividades." />
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaSwitchRowComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-email-pref',
  standalone: true,
  imports: [ArcanaSwitchRowComponent],
  template: \`<button arcanaSwitchRow [(value)]="email" label="Notificações por e-mail" description="Resumo diário das atividades."></button>\`
})
export class EmailPrefComponent {
  email = true
}`,
    svelte: `<script lang="ts">
  import { ArcanaSwitchRow } from '@arcanalabs/ui-components/svelte'
  let email = $state(true)
</script>

<ArcanaSwitchRow value={email} onValueChange={(v) => (email = v)} label="Notificações por e-mail" description="Resumo diário das atividades." />`
  },

  switchSegmented: {
    react: `import { useState } from 'react'
import { ArcanaSwitchSegmented } from '@arcanalabs/ui-components/react'

export function BillingCycle() {
  const [yearly, setYearly] = useState(false)
  const [env, setEnv] = useState(true)
  const [dark, setDark] = useState(false)
  const [listMode, setListMode] = useState(true)
  return (
    <>
      <ArcanaSwitchSegmented value={yearly} onValueChange={setYearly} offLabel="Monthly" onLabel="Annual · −20%" />

      {/* Denser, square-cornered variant */}
      <ArcanaSwitchSegmented value={env} onValueChange={setEnv} offLabel="Sandbox" onLabel="Production" compact squared />

      {/* With icons — the icon colours survive on the active side too */}
      <ArcanaSwitchSegmented
        value={dark}
        onValueChange={setDark}
        offLabel="Light"
        onLabel="Dark"
        offIcon="fa-solid fa-sun"
        onIcon="fa-solid fa-moon"
        offIconColor="#f59e0b"
        onIconColor="#6366f1"
      />

      {/* Icon-only: empty labels, so pass an ariaLabel (the icons are decorative) */}
      <ArcanaSwitchSegmented
        value={listMode}
        onValueChange={setListMode}
        offLabel=""
        onLabel=""
        offIcon="fa-solid fa-list"
        onIcon="fa-solid fa-table-cells-large"
        ariaLabel="View mode"
      />
    </>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaSwitchSegmentedComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-billing-cycle',
  standalone: true,
  imports: [ArcanaSwitchSegmentedComponent],
  template: \`
    <div arcanaSwitchSegmented [(value)]="yearly" offLabel="Monthly" onLabel="Annual · −20%"></div>

    <!-- Denser, square-cornered variant -->
    <div arcanaSwitchSegmented [(value)]="env" offLabel="Sandbox" onLabel="Production" [compact]="true" [squared]="true"></div>

    <!-- With icons: the icon colours survive on the active side too -->
    <div
      arcanaSwitchSegmented
      [(value)]="dark"
      offLabel="Light"
      onLabel="Dark"
      offIcon="fa-solid fa-sun"
      onIcon="fa-solid fa-moon"
      offIconColor="#f59e0b"
      onIconColor="#6366f1"
    ></div>

    <!-- Icon-only: empty labels, so pass an ariaLabel (the icons are decorative) -->
    <div
      arcanaSwitchSegmented
      [(value)]="listMode"
      offLabel=""
      onLabel=""
      offIcon="fa-solid fa-list"
      onIcon="fa-solid fa-table-cells-large"
      ariaLabel="View mode"
    ></div>
  \`
})
export class BillingCycleComponent {
  yearly = false
  env = true
  dark = false
  listMode = true
}`,
    svelte: `<script lang="ts">
  import { ArcanaSwitchSegmented } from '@arcanalabs/ui-components/svelte'

  let yearly = $state(false)
  let env = $state(true)
  let dark = $state(false)
  let listMode = $state(true)
</script>

<ArcanaSwitchSegmented value={yearly} onValueChange={(v) => (yearly = v)} offLabel="Monthly" onLabel="Annual · −20%" />

<!-- Denser, square-cornered variant -->
<ArcanaSwitchSegmented value={env} onValueChange={(v) => (env = v)} offLabel="Sandbox" onLabel="Production" compact squared />

<!-- With icons: the icon colours survive on the active side too -->
<ArcanaSwitchSegmented
  value={dark}
  onValueChange={(v) => (dark = v)}
  offLabel="Light"
  onLabel="Dark"
  offIcon="fa-solid fa-sun"
  onIcon="fa-solid fa-moon"
  offIconColor="#f59e0b"
  onIconColor="#6366f1"
/>

<!-- Icon-only: empty labels, so pass an ariaLabel (the icons are decorative) -->
<ArcanaSwitchSegmented
  value={listMode}
  onValueChange={(v) => (listMode = v)}
  offLabel=""
  onLabel=""
  offIcon="fa-solid fa-list"
  onIcon="fa-solid fa-table-cells-large"
  ariaLabel="View mode"
/>`
  },

  rate: {
    react: `import { useState } from 'react'
import { ArcanaRate } from '@arcanalabs/ui-components/react'

export function ReviewRating() {
  const [rating, setRating] = useState(3)
  const [half, setHalf] = useState(3.5)
  const [described, setDescribed] = useState(4)

  return (
    <>
      {/* Basic — interactive */}
      <ArcanaRate value={rating} onValueChange={setRating} />
      <p>Your rating: <strong>{rating}</strong></p>

      {/* Half stars + numeric score */}
      <ArcanaRate value={half} onValueChange={setHalf} allowHalf showScore />

      {/* Descriptive text instead of the score */}
      <ArcanaRate
        value={described}
        onValueChange={setDescribed}
        showText
        texts={['Terrible', 'Poor', 'Average', 'Good', 'Excellent']}
      />

      {/* Read-only — showing an average */}
      <ArcanaRate value={4.3} readonly allowHalf showScore />
      <p>Average of 128 reviews</p>

      {/* Sizes */}
      <ArcanaRate value={4} readonly size="sm" /> <span>Small</span>
      <ArcanaRate value={4} readonly size="md" /> <span>Medium</span>
      <ArcanaRate value={4} readonly size="lg" /> <span>Large</span>

      {/* Custom colours and disabled */}
      <ArcanaRate value={4} readonly color="var(--arcana-warning-solid)" />
      <ArcanaRate value={4} readonly color="#e11d48" voidColor="#fecdd3" />
      <ArcanaRate value={3} disabled /> <span>Disabled</span>
    </>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaRateComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-review-rating',
  standalone: true,
  imports: [ArcanaRateComponent],
  template: \`
    <!-- Basic — interactive -->
    <div arcanaRate [(value)]="rating"></div>
    <p>Your rating: <strong>{{ rating }}</strong></p>

    <!-- Half stars + numeric score -->
    <div arcanaRate [(value)]="half" [allowHalf]="true" [showScore]="true"></div>

    <!-- Descriptive text instead of the score -->
    <div arcanaRate [(value)]="described" [showText]="true" [texts]="ratingTexts"></div>

    <!-- Read-only — showing an average -->
    <div arcanaRate [value]="4.3" [readonly]="true" [allowHalf]="true" [showScore]="true"></div>
    <p>Average of 128 reviews</p>

    <!-- Sizes -->
    <div arcanaRate [value]="4" [readonly]="true" size="sm"></div> <span>Small</span>
    <div arcanaRate [value]="4" [readonly]="true" size="md"></div> <span>Medium</span>
    <div arcanaRate [value]="4" [readonly]="true" size="lg"></div> <span>Large</span>

    <!-- Custom colours and disabled -->
    <div arcanaRate [value]="4" [readonly]="true" color="var(--arcana-warning-solid)"></div>
    <div arcanaRate [value]="4" [readonly]="true" color="#e11d48" voidColor="#fecdd3"></div>
    <div arcanaRate [value]="3" [disabled]="true"></div> <span>Disabled</span>
  \`
})
export class ReviewRatingComponent {
  rating = 3
  half = 3.5
  described = 4
  ratingTexts = ['Terrible', 'Poor', 'Average', 'Good', 'Excellent']
}`,
    svelte: `<script lang="ts">
  import { ArcanaRate } from '@arcanalabs/ui-components/svelte'

  let rating = $state(3)
  let half = $state(3.5)
  let described = $state(4)
  const ratingTexts = ['Terrible', 'Poor', 'Average', 'Good', 'Excellent']
</script>

<!-- Basic — interactive -->
<ArcanaRate value={rating} onValueChange={(v) => (rating = v)} />
<p>Your rating: <strong>{rating}</strong></p>

<!-- Half stars + numeric score -->
<ArcanaRate value={half} onValueChange={(v) => (half = v)} allowHalf showScore />

<!-- Descriptive text instead of the score -->
<ArcanaRate value={described} onValueChange={(v) => (described = v)} showText texts={ratingTexts} />

<!-- Read-only — showing an average -->
<ArcanaRate value={4.3} readonly allowHalf showScore />
<p>Average of 128 reviews</p>

<!-- Sizes -->
<ArcanaRate value={4} readonly size="sm" /> <span>Small</span>
<ArcanaRate value={4} readonly size="md" /> <span>Medium</span>
<ArcanaRate value={4} readonly size="lg" /> <span>Large</span>

<!-- Custom colours and disabled -->
<ArcanaRate value={4} readonly color="var(--arcana-warning-solid)" />
<ArcanaRate value={4} readonly color="#e11d48" voidColor="#fecdd3" />
<ArcanaRate value={3} disabled /> <span>Disabled</span>`
  },

  avatar: {
    react: `import { ArcanaAvatar } from '@arcanalabs/ui-components/react'

export function AvatarShowcase() {
  return (
    <>
      {/* Fallback cascade — image, initials, icon, silhouette */}
      <ArcanaAvatar src="https://i.pravatar.cc/120?img=12" alt="Team member portrait" />
      <ArcanaAvatar initials="AM" alt="Alice Moreau" />
      <ArcanaAvatar icon="fa-solid fa-user-tie" alt="Account manager" />
      <ArcanaAvatar alt="Unknown member" />
      <p>A broken image falls back to the next step, automatically.</p>

      {/* Shapes */}
      <ArcanaAvatar src="https://i.pravatar.cc/120?img=32" alt="Team member portrait" shape="circle" /> <span>Circle</span>
      <ArcanaAvatar src="https://i.pravatar.cc/120?img=32" alt="Team member portrait" shape="square" /> <span>Square</span>

      {/* Sizes — named steps and an exact pixel value */}
      <ArcanaAvatar initials="XS" size="xs" />
      <ArcanaAvatar initials="SM" size="sm" />
      <ArcanaAvatar initials="MD" size="md" />
      <ArcanaAvatar initials="LG" size="lg" />
      <ArcanaAvatar initials="XL" size="xl" />
      <ArcanaAvatar src="https://i.pravatar.cc/120?img=45" alt="Team member portrait" size={64} />
      <p>Named steps or an exact pixel value</p>

      {/* Custom background colour */}
      <ArcanaAvatar initials="AM" color="#6366f1" />
      <ArcanaAvatar initials="BR" color="#10b981" />
      <ArcanaAvatar icon="fa-solid fa-robot" color="#f59e0b" />
    </>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaAvatarComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-avatar-showcase',
  standalone: true,
  imports: [ArcanaAvatarComponent],
  template: \`
    <!-- Fallback cascade — image, initials, icon, silhouette -->
    <span arcanaAvatar src="https://i.pravatar.cc/120?img=12" alt="Team member portrait"></span>
    <span arcanaAvatar initials="AM" alt="Alice Moreau"></span>
    <span arcanaAvatar icon="fa-solid fa-user-tie" alt="Account manager"></span>
    <span arcanaAvatar alt="Unknown member"></span>
    <p>A broken image falls back to the next step, automatically.</p>

    <!-- Shapes -->
    <span arcanaAvatar src="https://i.pravatar.cc/120?img=32" alt="Team member portrait" shape="circle"></span> <span>Circle</span>
    <span arcanaAvatar src="https://i.pravatar.cc/120?img=32" alt="Team member portrait" shape="square"></span> <span>Square</span>

    <!-- Sizes — named steps and an exact pixel value -->
    <span arcanaAvatar initials="XS" size="xs"></span>
    <span arcanaAvatar initials="SM" size="sm"></span>
    <span arcanaAvatar initials="MD" size="md"></span>
    <span arcanaAvatar initials="LG" size="lg"></span>
    <span arcanaAvatar initials="XL" size="xl"></span>
    <span arcanaAvatar src="https://i.pravatar.cc/120?img=45" alt="Team member portrait" [size]="64"></span>
    <p>Named steps or an exact pixel value</p>

    <!-- Custom background colour -->
    <span arcanaAvatar initials="AM" color="#6366f1"></span>
    <span arcanaAvatar initials="BR" color="#10b981"></span>
    <span arcanaAvatar icon="fa-solid fa-robot" color="#f59e0b"></span>
  \`
})
export class AvatarShowcaseComponent {}`,
    svelte: `<script lang="ts">
  import { ArcanaAvatar } from '@arcanalabs/ui-components/svelte'
</script>

<!-- Fallback cascade — image, initials, icon, silhouette -->
<ArcanaAvatar src="https://i.pravatar.cc/120?img=12" alt="Team member portrait" />
<ArcanaAvatar initials="AM" alt="Alice Moreau" />
<ArcanaAvatar icon="fa-solid fa-user-tie" alt="Account manager" />
<ArcanaAvatar alt="Unknown member" />
<p>A broken image falls back to the next step, automatically.</p>

<!-- Shapes -->
<ArcanaAvatar src="https://i.pravatar.cc/120?img=32" alt="Team member portrait" shape="circle" /> <span>Circle</span>
<ArcanaAvatar src="https://i.pravatar.cc/120?img=32" alt="Team member portrait" shape="square" /> <span>Square</span>

<!-- Sizes — named steps and an exact pixel value -->
<ArcanaAvatar initials="XS" size="xs" />
<ArcanaAvatar initials="SM" size="sm" />
<ArcanaAvatar initials="MD" size="md" />
<ArcanaAvatar initials="LG" size="lg" />
<ArcanaAvatar initials="XL" size="xl" />
<ArcanaAvatar src="https://i.pravatar.cc/120?img=45" alt="Team member portrait" size={64} />
<p>Named steps or an exact pixel value</p>

<!-- Custom background colour -->
<ArcanaAvatar initials="AM" color="#6366f1" />
<ArcanaAvatar initials="BR" color="#10b981" />
<ArcanaAvatar icon="fa-solid fa-robot" color="#f59e0b" />`
  },

  avatarGroup: {
    react: `import { ArcanaAvatarGroup, ArcanaAvatar } from '@arcanalabs/ui-components/react'
import type { AvatarGroupItem } from '@arcanalabs/ui-components/react'

const team: AvatarGroupItem[] = [
  { initials: 'AM', alt: 'Alice Moreau' },
  { initials: 'BR', alt: 'Ben Rivas' },
  { initials: 'CS', alt: 'Cora Silva' },
  { initials: 'DL', alt: 'Dan Lee' },
  { initials: 'EM', alt: 'Elena Marx' }
]

export function TeamAvatars() {
  return (
    <>
      {/* Data-driven with an overflow bubble */}
      <ArcanaAvatarGroup avatars={team} max={3} ariaLabel="Project team" />
      <p>Project team</p>

      {/* Sizes and shape */}
      <ArcanaAvatarGroup avatars={team} max={3} size="sm" />
      <ArcanaAvatarGroup avatars={team} max={3} size="lg" shape="square" />

      {/* Spacing instead of overlap */}
      <ArcanaAvatarGroup avatars={team} max={4} /> <span>Overlapping (default)</span>
      <ArcanaAvatarGroup avatars={team} max={4} spacing={4} /> <span>Spaced apart</span>

      {/* Composition — children instead of the array */}
      <ArcanaAvatarGroup overflowCount={7} size="md" ariaLabel="Project team">
        <ArcanaAvatar src="https://i.pravatar.cc/120?img=12" alt="Alice Moreau" />
        <ArcanaAvatar initials="BR" alt="Ben Rivas" color="#10b981" />
        <ArcanaAvatar icon="fa-solid fa-user-tie" alt="Cora Silva" color="#6366f1" />
      </ArcanaAvatarGroup>
      <p>Composed children with an explicit overflow count</p>
    </>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaAvatarGroupComponent, ArcanaAvatarComponent } from '@arcanalabs/ui-components/angular'
import type { AvatarGroupItem } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-team-avatars',
  standalone: true,
  imports: [ArcanaAvatarGroupComponent, ArcanaAvatarComponent],
  template: \`
    <!-- Data-driven with an overflow bubble -->
    <div arcanaAvatarGroup [avatars]="team" [max]="3" ariaLabel="Project team"></div>
    <p>Project team</p>

    <!-- Sizes and shape -->
    <div arcanaAvatarGroup [avatars]="team" [max]="3" size="sm"></div>
    <div arcanaAvatarGroup [avatars]="team" [max]="3" size="lg" shape="square"></div>

    <!-- Spacing instead of overlap -->
    <div arcanaAvatarGroup [avatars]="team" [max]="4"></div> <span>Overlapping (default)</span>
    <div arcanaAvatarGroup [avatars]="team" [max]="4" [spacing]="4"></div> <span>Spaced apart</span>

    <!-- Composition — children instead of the array -->
    <div arcanaAvatarGroup [overflowCount]="7" size="md" ariaLabel="Project team">
      <span arcanaAvatar src="https://i.pravatar.cc/120?img=12" alt="Alice Moreau"></span>
      <span arcanaAvatar initials="BR" alt="Ben Rivas" color="#10b981"></span>
      <span arcanaAvatar icon="fa-solid fa-user-tie" alt="Cora Silva" color="#6366f1"></span>
    </div>
    <p>Composed children with an explicit overflow count</p>
  \`
})
export class TeamAvatarsComponent {
  team: AvatarGroupItem[] = [
    { initials: 'AM', alt: 'Alice Moreau' },
    { initials: 'BR', alt: 'Ben Rivas' },
    { initials: 'CS', alt: 'Cora Silva' },
    { initials: 'DL', alt: 'Dan Lee' },
    { initials: 'EM', alt: 'Elena Marx' }
  ]
}`,
    svelte: `<script lang="ts">
  import { ArcanaAvatarGroup, ArcanaAvatar } from '@arcanalabs/ui-components/svelte'
  import type { AvatarGroupItem } from '@arcanalabs/ui-components/svelte'

  const team: AvatarGroupItem[] = [
    { initials: 'AM', alt: 'Alice Moreau' },
    { initials: 'BR', alt: 'Ben Rivas' },
    { initials: 'CS', alt: 'Cora Silva' },
    { initials: 'DL', alt: 'Dan Lee' },
    { initials: 'EM', alt: 'Elena Marx' }
  ]
</script>

<!-- Data-driven with an overflow bubble -->
<ArcanaAvatarGroup avatars={team} max={3} ariaLabel="Project team" />
<p>Project team</p>

<!-- Sizes and shape -->
<ArcanaAvatarGroup avatars={team} max={3} size="sm" />
<ArcanaAvatarGroup avatars={team} max={3} size="lg" shape="square" />

<!-- Spacing instead of overlap -->
<ArcanaAvatarGroup avatars={team} max={4} /> <span>Overlapping (default)</span>
<ArcanaAvatarGroup avatars={team} max={4} spacing={4} /> <span>Spaced apart</span>

<!-- Composition — children instead of the array -->
<ArcanaAvatarGroup overflowCount={7} size="md" ariaLabel="Project team">
  <ArcanaAvatar src="https://i.pravatar.cc/120?img=12" alt="Alice Moreau" />
  <ArcanaAvatar initials="BR" alt="Ben Rivas" color="#10b981" />
  <ArcanaAvatar icon="fa-solid fa-user-tie" alt="Cora Silva" color="#6366f1" />
</ArcanaAvatarGroup>
<p>Composed children with an explicit overflow count</p>`
  },

  statistic: {
    react: `import { ArcanaStatistic } from '@arcanalabs/ui-components/react'

export function SalesPanel() {
  return (
    <>
      {/* Basic */}
      <ArcanaStatistic value={1284} title="Active users" />

      {/* Precision and separators */}
      <ArcanaStatistic value={1234567.891} precision={2} groupSeparator="," decimalSeparator="." title="Monthly revenue" />
      <ArcanaStatistic value={1234567.891} precision={2} groupSeparator="." decimalSeparator="," title="Same number, pt-BR separators" />

      {/* Prefix, suffix and icon */}
      <ArcanaStatistic value={48250.75} precision={2} prefix="$" icon="fa-solid fa-arrow-trend-up" title="Monthly revenue" />
      <ArcanaStatistic value={3.42} precision={2} suffix="%" title="Conversion rate" />
      {/* The same three spots are also slots, for rich content */}
      <ArcanaStatistic
        value={99.98}
        precision={2}
        tone="success"
        titleSlot="Uptime"
        suffixSlot={<span style={{ fontSize: '.6em' }}>%</span>}
      />

      {/* Tones */}
      <ArcanaStatistic value={1284} title="Orders" tone="neutral" />
      <ArcanaStatistic value={99.98} precision={2} suffix="%" title="Uptime" tone="success" />
      <ArcanaStatistic value={2.1} precision={1} suffix="%" title="Churn" tone="danger" />
      <ArcanaStatistic value={17} title="Pending reviews" tone="warning" />
      <ArcanaStatistic value={42} title="Open tickets" tone="info" />

      {/* Sizes */}
      <ArcanaStatistic value={1284} title="Orders" size="sm" />
      <ArcanaStatistic value={1284} title="Orders" size="md" />
      <ArcanaStatistic value={1284} title="Orders" size="lg" />
      <ArcanaStatistic value={1284} title="Orders" size="xl" />
    </>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaStatisticComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-sales-panel',
  standalone: true,
  imports: [ArcanaStatisticComponent],
  template: \`
    <!-- Basic -->
    <div arcanaStatistic [value]="1284" title="Active users"></div>

    <!-- Precision and separators -->
    <div arcanaStatistic [value]="1234567.891" [precision]="2" groupSeparator="," decimalSeparator="." title="Monthly revenue"></div>
    <div arcanaStatistic [value]="1234567.891" [precision]="2" groupSeparator="." decimalSeparator="," title="Same number, pt-BR separators"></div>

    <!-- Prefix, suffix and icon -->
    <div arcanaStatistic [value]="48250.75" [precision]="2" prefix="$" icon="fa-solid fa-arrow-trend-up" title="Monthly revenue"></div>
    <div arcanaStatistic [value]="3.42" [precision]="2" suffix="%" title="Conversion rate"></div>
    <!-- The same three spots are also slots, for rich content -->
    <div arcanaStatistic [value]="99.98" [precision]="2" tone="success">
      <span statTitle>Uptime</span>
      <span statSuffix style="font-size: .6em">%</span>
    </div>

    <!-- Tones -->
    <div arcanaStatistic [value]="1284" title="Orders" tone="neutral"></div>
    <div arcanaStatistic [value]="99.98" [precision]="2" suffix="%" title="Uptime" tone="success"></div>
    <div arcanaStatistic [value]="2.1" [precision]="1" suffix="%" title="Churn" tone="danger"></div>
    <div arcanaStatistic [value]="17" title="Pending reviews" tone="warning"></div>
    <div arcanaStatistic [value]="42" title="Open tickets" tone="info"></div>

    <!-- Sizes -->
    <div arcanaStatistic [value]="1284" title="Orders" size="sm"></div>
    <div arcanaStatistic [value]="1284" title="Orders" size="md"></div>
    <div arcanaStatistic [value]="1284" title="Orders" size="lg"></div>
    <div arcanaStatistic [value]="1284" title="Orders" size="xl"></div>
  \`
})
export class SalesPanelComponent {}`,
    svelte: `<script lang="ts">
  import { ArcanaStatistic } from '@arcanalabs/ui-components/svelte'
</script>

<!-- Basic -->
<ArcanaStatistic value={1284} title="Active users" />

<!-- Precision and separators -->
<ArcanaStatistic value={1234567.891} precision={2} groupSeparator="," decimalSeparator="." title="Monthly revenue" />
<ArcanaStatistic value={1234567.891} precision={2} groupSeparator="." decimalSeparator="," title="Same number, pt-BR separators" />

<!-- Prefix, suffix and icon -->
<ArcanaStatistic value={48250.75} precision={2} prefix="$" icon="fa-solid fa-arrow-trend-up" title="Monthly revenue" />
<ArcanaStatistic value={3.42} precision={2} suffix="%" title="Conversion rate" />
<!-- The same three spots are also slots, for rich content -->
{#snippet uptimeTitle()}Uptime{/snippet}
{#snippet percent()}<span style="font-size: .6em">%</span>{/snippet}
<ArcanaStatistic value={99.98} precision={2} tone="success" titleSlot={uptimeTitle} suffixSlot={percent} />

<!-- Tones -->
<ArcanaStatistic value={1284} title="Orders" tone="neutral" />
<ArcanaStatistic value={99.98} precision={2} suffix="%" title="Uptime" tone="success" />
<ArcanaStatistic value={2.1} precision={1} suffix="%" title="Churn" tone="danger" />
<ArcanaStatistic value={17} title="Pending reviews" tone="warning" />
<ArcanaStatistic value={42} title="Open tickets" tone="info" />

<!-- Sizes -->
<ArcanaStatistic value={1284} title="Orders" size="sm" />
<ArcanaStatistic value={1284} title="Orders" size="md" />
<ArcanaStatistic value={1284} title="Orders" size="lg" />
<ArcanaStatistic value={1284} title="Orders" size="xl" />`
  },

  countdown: {
    react: `import { useMemo, useState } from 'react'
import { ArcanaButton, ArcanaCountdown } from '@arcanalabs/ui-components/react'

export function DeadlinePanel() {
  // The target instant, computed once — two hours from now.
  const deadline = useMemo(() => Date.now() + 2 * 60 * 60 * 1000, [])
  const [paused, setPaused] = useState(true)

  return (
    <>
      {/* Basic — time left until a deadline */}
      <ArcanaCountdown value={deadline} />

      {/* Custom format */}
      <ArcanaCountdown value={deadline} format="D[d] HH:mm:ss" />
      <ArcanaCountdown value={deadline} format="mm:ss" />

      {/* Title, prefix and suffix */}
      <ArcanaCountdown
        value={deadline}
        title="Flash sale ends in"
        prefixSlot={<i className="fa-solid fa-hourglass-half" />}
        suffixSlot={<i className="fa-solid fa-bolt" />}
      />

      {/* Tones and sizes */}
      <ArcanaCountdown value={deadline} title="Flash sale ends in" tone="danger" size="lg" />
      <ArcanaCountdown value={deadline} title="Session expires in" tone="success" size="sm" />

      {/* Paused */}
      <ArcanaCountdown value={deadline} paused={paused} onFinish={() => console.log('done')} />
      <ArcanaButton variant="outline" onClick={() => setPaused(!paused)}>Pause / resume</ArcanaButton>
      <p>Fires the finish event when it reaches zero.</p>
    </>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaButtonComponent, ArcanaCountdownComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-deadline-panel',
  standalone: true,
  imports: [ArcanaButtonComponent, ArcanaCountdownComponent],
  template: \`
    <!-- Basic — time left until a deadline -->
    <div arcanaCountdown [value]="deadline"></div>

    <!-- Custom format -->
    <div arcanaCountdown [value]="deadline" format="D[d] HH:mm:ss"></div>
    <div arcanaCountdown [value]="deadline" format="mm:ss"></div>

    <!-- Title, prefix and suffix -->
    <div arcanaCountdown [value]="deadline" title="Flash sale ends in">
      <i countdownPrefix class="fa-solid fa-hourglass-half"></i>
      <i countdownSuffix class="fa-solid fa-bolt"></i>
    </div>

    <!-- Tones and sizes -->
    <div arcanaCountdown [value]="deadline" title="Flash sale ends in" tone="danger" size="lg"></div>
    <div arcanaCountdown [value]="deadline" title="Session expires in" tone="success" size="sm"></div>

    <!-- Paused -->
    <div arcanaCountdown [value]="deadline" [paused]="paused" (finish)="onFinish()"></div>
    <button arcanaButton variant="outline" (click)="paused = !paused">Pause / resume</button>
    <p>Fires the finish event when it reaches zero.</p>
  \`
})
export class DeadlinePanelComponent {
  /** The target instant, computed once — two hours from now. */
  readonly deadline = Date.now() + 2 * 60 * 60 * 1000
  paused = true

  onFinish() {
    console.log('done')
  }
}`,
    svelte: `<script lang="ts">
  import { ArcanaButton, ArcanaCountdown } from '@arcanalabs/ui-components/svelte'

  // The target instant, computed once — two hours from now.
  const deadline = Date.now() + 2 * 60 * 60 * 1000
  let paused = $state(true)
</script>

<!-- Basic — time left until a deadline -->
<ArcanaCountdown value={deadline} />

<!-- Custom format -->
<ArcanaCountdown value={deadline} format="D[d] HH:mm:ss" />
<ArcanaCountdown value={deadline} format="mm:ss" />

<!-- Title, prefix and suffix -->
{#snippet hourglass()}<i class="fa-solid fa-hourglass-half"></i>{/snippet}
{#snippet bolt()}<i class="fa-solid fa-bolt"></i>{/snippet}
<ArcanaCountdown value={deadline} title="Flash sale ends in" prefixSlot={hourglass} suffixSlot={bolt} />

<!-- Tones and sizes -->
<ArcanaCountdown value={deadline} title="Flash sale ends in" tone="danger" size="lg" />
<ArcanaCountdown value={deadline} title="Session expires in" tone="success" size="sm" />

<!-- Paused -->
<ArcanaCountdown value={deadline} {paused} onFinish={() => console.log('done')} />
<ArcanaButton variant="outline" onClick={() => (paused = !paused)}>Pause / resume</ArcanaButton>
<p>Fires the finish event when it reaches zero.</p>`
  },

  progress: {
    react: `import { ArcanaProgress } from '@arcanalabs/ui-components/react'

export function ProgressPanel() {
  return (
    <>
      {/* Determinate */}
      <ArcanaProgress value={25} showValue ariaLabel="Uploading" /> <span>Uploading</span>
      <ArcanaProgress value={60} showValue ariaLabel="Storage used" /> <span>Storage used</span>
      <ArcanaProgress value={100} showValue ariaLabel="Complete" /> <span>Complete</span>

      {/* Indeterminate — value is null */}
      <ArcanaProgress value={null} ariaLabel="Uploading" />
      <p>No known total — the bar loops.</p>

      {/* Tones */}
      <ArcanaProgress value={40} tone="accent" />
      <ArcanaProgress value={70} tone="success" />
      <ArcanaProgress value={90} tone="danger" />
      <ArcanaProgress value={55} tone="warning" />
      <ArcanaProgress value={30} tone="info" />

      {/* Variants and radius */}
      <ArcanaProgress value={60} variant="solid" />
      <ArcanaProgress value={60} variant="soft" />
      <ArcanaProgress value={60} radius="none" />
      <ArcanaProgress value={60} radius="full" />

      {/* Sizes */}
      <ArcanaProgress value={60} size="sm" />
      <ArcanaProgress value={60} size="md" />
      <ArcanaProgress value={60} size="lg" />

      {/* Custom label through the value slot */}
      <ArcanaProgress value={3} max={5} showValue valueSlot={<strong>3 of 5 steps</strong>} />
    </>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaProgressComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-progress-panel',
  standalone: true,
  imports: [ArcanaProgressComponent],
  template: \`
    <!-- Determinate -->
    <div arcanaProgress [value]="25" [showValue]="true" ariaLabel="Uploading"></div> <span>Uploading</span>
    <div arcanaProgress [value]="60" [showValue]="true" ariaLabel="Storage used"></div> <span>Storage used</span>
    <div arcanaProgress [value]="100" [showValue]="true" ariaLabel="Complete"></div> <span>Complete</span>

    <!-- Indeterminate — value is null -->
    <div arcanaProgress [value]="null" ariaLabel="Uploading"></div>
    <p>No known total — the bar loops.</p>

    <!-- Tones -->
    <div arcanaProgress [value]="40" tone="accent"></div>
    <div arcanaProgress [value]="70" tone="success"></div>
    <div arcanaProgress [value]="90" tone="danger"></div>
    <div arcanaProgress [value]="55" tone="warning"></div>
    <div arcanaProgress [value]="30" tone="info"></div>

    <!-- Variants and radius -->
    <div arcanaProgress [value]="60" variant="solid"></div>
    <div arcanaProgress [value]="60" variant="soft"></div>
    <div arcanaProgress [value]="60" radius="none"></div>
    <div arcanaProgress [value]="60" radius="full"></div>

    <!-- Sizes -->
    <div arcanaProgress [value]="60" size="sm"></div>
    <div arcanaProgress [value]="60" size="md"></div>
    <div arcanaProgress [value]="60" size="lg"></div>

    <!-- Custom label through the value slot -->
    <div arcanaProgress [value]="3" [max]="5" [showValue]="true">
      <strong progressValue>3 of 5 steps</strong>
    </div>
  \`
})
export class ProgressPanelComponent {}`,
    svelte: `<script lang="ts">
  import { ArcanaProgress } from '@arcanalabs/ui-components/svelte'
</script>

<!-- Determinate -->
<ArcanaProgress value={25} showValue ariaLabel="Uploading" /> <span>Uploading</span>
<ArcanaProgress value={60} showValue ariaLabel="Storage used" /> <span>Storage used</span>
<ArcanaProgress value={100} showValue ariaLabel="Complete" /> <span>Complete</span>

<!-- Indeterminate — value is null -->
<ArcanaProgress value={null} ariaLabel="Uploading" />
<p>No known total — the bar loops.</p>

<!-- Tones -->
<ArcanaProgress value={40} tone="accent" />
<ArcanaProgress value={70} tone="success" />
<ArcanaProgress value={90} tone="danger" />
<ArcanaProgress value={55} tone="warning" />
<ArcanaProgress value={30} tone="info" />

<!-- Variants and radius -->
<ArcanaProgress value={60} variant="solid" />
<ArcanaProgress value={60} variant="soft" />
<ArcanaProgress value={60} radius="none" />
<ArcanaProgress value={60} radius="full" />

<!-- Sizes -->
<ArcanaProgress value={60} size="sm" />
<ArcanaProgress value={60} size="md" />
<ArcanaProgress value={60} size="lg" />

<!-- Custom label through the value slot -->
<ArcanaProgress value={3} max={5} showValue>
  {#snippet valueSlot()}<strong>3 of 5 steps</strong>{/snippet}
</ArcanaProgress>`
  },

  aspectRatio: {
    react: `import { ArcanaAspectRatio } from '@arcanalabs/ui-components/react'

export function MediaGrid() {
  return (
    <>
      {/* Default — 16 / 9 */}
      <ArcanaAspectRatio>
        <img src="https://picsum.photos/seed/arcana1/800/600" alt="Landscape photograph" />
      </ArcanaAspectRatio>

      {/* Square and portrait */}
      <ArcanaAspectRatio ratio={1}>
        <img src="https://picsum.photos/seed/arcana2/800/600" alt="Landscape photograph" />
      </ArcanaAspectRatio>
      <span>1 / 1</span>
      <ArcanaAspectRatio ratio={3 / 4}>
        <img src="https://picsum.photos/seed/arcana3/800/600" alt="Landscape photograph" />
      </ArcanaAspectRatio>
      <span>3 / 4</span>

      {/* Classic 4 / 3 */}
      <ArcanaAspectRatio ratio={4 / 3}>
        <img src="https://picsum.photos/seed/arcana4/800/600" alt="Landscape photograph" />
      </ArcanaAspectRatio>
      <span>4 / 3</span>

      {/* Any embedded content — here a coloured placeholder */}
      <ArcanaAspectRatio ratio={16 / 9}>
        <div style={{ display: 'grid', placeItems: 'center', width: '100%', height: '100%', background: 'var(--arcana-bg-subtle)' }}>
          Works with iframes, maps and video too
        </div>
      </ArcanaAspectRatio>
    </>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaAspectRatioComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-media-grid',
  standalone: true,
  imports: [ArcanaAspectRatioComponent],
  template: \`
    <!-- Default — 16 / 9 -->
    <div arcanaAspectRatio>
      <img src="https://picsum.photos/seed/arcana1/800/600" alt="Landscape photograph" />
    </div>

    <!-- Square and portrait -->
    <div arcanaAspectRatio [ratio]="1">
      <img src="https://picsum.photos/seed/arcana2/800/600" alt="Landscape photograph" />
    </div>
    <span>1 / 1</span>
    <div arcanaAspectRatio [ratio]="3 / 4">
      <img src="https://picsum.photos/seed/arcana3/800/600" alt="Landscape photograph" />
    </div>
    <span>3 / 4</span>

    <!-- Classic 4 / 3 -->
    <div arcanaAspectRatio [ratio]="4 / 3">
      <img src="https://picsum.photos/seed/arcana4/800/600" alt="Landscape photograph" />
    </div>
    <span>4 / 3</span>

    <!-- Any embedded content — here a coloured placeholder -->
    <div arcanaAspectRatio [ratio]="16 / 9">
      <div class="placeholder">Works with iframes, maps and video too</div>
    </div>
  \`,
  styles: [\`
    .placeholder {
      display: grid;
      place-items: center;
      width: 100%;
      height: 100%;
      background: var(--arcana-bg-subtle);
    }
  \`]
})
export class MediaGridComponent {}`,
    svelte: `<script lang="ts">
  import { ArcanaAspectRatio } from '@arcanalabs/ui-components/svelte'
</script>

<!-- Default — 16 / 9 -->
<ArcanaAspectRatio>
  <img src="https://picsum.photos/seed/arcana1/800/600" alt="Landscape photograph" />
</ArcanaAspectRatio>

<!-- Square and portrait -->
<ArcanaAspectRatio ratio={1}>
  <img src="https://picsum.photos/seed/arcana2/800/600" alt="Landscape photograph" />
</ArcanaAspectRatio>
<span>1 / 1</span>
<ArcanaAspectRatio ratio={3 / 4}>
  <img src="https://picsum.photos/seed/arcana3/800/600" alt="Landscape photograph" />
</ArcanaAspectRatio>
<span>3 / 4</span>

<!-- Classic 4 / 3 -->
<ArcanaAspectRatio ratio={4 / 3}>
  <img src="https://picsum.photos/seed/arcana4/800/600" alt="Landscape photograph" />
</ArcanaAspectRatio>
<span>4 / 3</span>

<!-- Any embedded content — here a coloured placeholder -->
<ArcanaAspectRatio ratio={16 / 9}>
  <div class="placeholder">Works with iframes, maps and video too</div>
</ArcanaAspectRatio>

<style>
  .placeholder {
    display: grid;
    place-items: center;
    width: 100%;
    height: 100%;
    background: var(--arcana-bg-subtle);
  }
</style>`
  },

  scrollArea: {
    react: `import { ArcanaScrollArea } from '@arcanalabs/ui-components/react'

const rows = Array.from({ length: 12 }, (_, i) => 'Item ' + (i + 1))

export function ScrollPanels() {
  return (
    <>
      {/* Vertical with a max height */}
      <p>Vertical, capped height</p>
      <ArcanaScrollArea maxHeight={180}>
        {rows.map((row) => <div key={row}>{row}</div>)}
      </ArcanaScrollArea>

      {/* Horizontal */}
      <p>Horizontal</p>
      <ArcanaScrollArea orientation="horizontal">
        <div style={{ display: 'flex', gap: 12 }}>
          {rows.map((row) => <div key={row} style={{ minWidth: 160 }}>{row}</div>)}
        </div>
      </ArcanaScrollArea>

      {/* Both axes */}
      <p>Both axes</p>
      <ArcanaScrollArea orientation="both" height={180}>
        <div style={{ width: 1200 }}>
          {rows.map((row) => <div key={row}>{row}</div>)}
        </div>
      </ArcanaScrollArea>

      {/* Always-visible vs auto-hiding scrollbars */}
      <p>Scrollbar always visible</p>
      <ArcanaScrollArea maxHeight={140} type="always">
        {rows.map((row) => <div key={row}>{row}</div>)}
      </ArcanaScrollArea>
      <p>Scrollbar appears on hover</p>
      <ArcanaScrollArea maxHeight={140} type="hover">
        {rows.map((row) => <div key={row}>{row}</div>)}
      </ArcanaScrollArea>
    </>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaScrollAreaComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-scroll-panels',
  standalone: true,
  imports: [ArcanaScrollAreaComponent],
  template: \`
    <!-- Vertical with a max height -->
    <p>Vertical, capped height</p>
    <div arcanaScrollArea [maxHeight]="180">
      @for (row of rows; track row) { <div>{{ row }}</div> }
    </div>

    <!-- Horizontal -->
    <p>Horizontal</p>
    <div arcanaScrollArea orientation="horizontal">
      <div class="row">
        @for (row of rows; track row) { <div class="card">{{ row }}</div> }
      </div>
    </div>

    <!-- Both axes -->
    <p>Both axes</p>
    <div arcanaScrollArea orientation="both" [height]="180">
      <div class="wide">
        @for (row of rows; track row) { <div>{{ row }}</div> }
      </div>
    </div>

    <!-- Always-visible vs auto-hiding scrollbars -->
    <p>Scrollbar always visible</p>
    <div arcanaScrollArea [maxHeight]="140" type="always">
      @for (row of rows; track row) { <div>{{ row }}</div> }
    </div>
    <p>Scrollbar appears on hover</p>
    <div arcanaScrollArea [maxHeight]="140" type="hover">
      @for (row of rows; track row) { <div>{{ row }}</div> }
    </div>
  \`,
  styles: [\`
    .row { display: flex; gap: 12px; }
    .card { min-width: 160px; }
    .wide { width: 1200px; }
  \`]
})
export class ScrollPanelsComponent {
  rows = Array.from({ length: 12 }, (_, i) => 'Item ' + (i + 1))
}`,
    svelte: `<script lang="ts">
  import { ArcanaScrollArea } from '@arcanalabs/ui-components/svelte'

  const rows = Array.from({ length: 12 }, (_, i) => 'Item ' + (i + 1))
</script>

<!-- Vertical with a max height -->
<p>Vertical, capped height</p>
<ArcanaScrollArea maxHeight={180}>
  {#each rows as row (row)}<div>{row}</div>{/each}
</ArcanaScrollArea>

<!-- Horizontal -->
<p>Horizontal</p>
<ArcanaScrollArea orientation="horizontal">
  <div class="row">
    {#each rows as row (row)}<div class="card">{row}</div>{/each}
  </div>
</ArcanaScrollArea>

<!-- Both axes -->
<p>Both axes</p>
<ArcanaScrollArea orientation="both" height={180}>
  <div class="wide">
    {#each rows as row (row)}<div>{row}</div>{/each}
  </div>
</ArcanaScrollArea>

<!-- Always-visible vs auto-hiding scrollbars -->
<p>Scrollbar always visible</p>
<ArcanaScrollArea maxHeight={140} type="always">
  {#each rows as row (row)}<div>{row}</div>{/each}
</ArcanaScrollArea>
<p>Scrollbar appears on hover</p>
<ArcanaScrollArea maxHeight={140} type="hover">
  {#each rows as row (row)}<div>{row}</div>{/each}
</ArcanaScrollArea>

<style>
  .row { display: flex; gap: 12px; }
  .card { min-width: 160px; }
  .wide { width: 1200px; }
</style>`
  },

  tooltip: {
    react: `import { ArcanaTooltip } from '@arcanalabs/ui-components/react'

export function Toolbar() {
  return (
    <>
      {/* Texto via label */}
      <ArcanaTooltip label="Saves without publishing" trigger={<button>Save draft</button>} />

      {/* Lados */}
      <ArcanaTooltip side="top" label="No topo" trigger={<button>top</button>} />
      <ArcanaTooltip side="right" label="À direita" trigger={<button>right</button>} />

      {/* Sem seta */}
      <ArcanaTooltip arrow={false} label="Sem setinha" trigger={<button>flat</button>} />

      {/* Conteúdo custom (sobrepõe label) */}
      <ArcanaTooltip side="top" trigger={<button aria-label="Undo">↺</button>}>
        <span>Undo <strong>⌘Z</strong></span>
      </ArcanaTooltip>
    </>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaTooltipComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [ArcanaTooltipComponent],
  template: \`
    <!-- Texto via label -->
    <span arcanaTooltip label="Saves without publishing">
      <button arcanaTooltipTrigger>Save draft</button>
    </span>

    <!-- Lados -->
    <span arcanaTooltip label="No topo" side="top">
      <button arcanaTooltipTrigger>top</button>
    </span>

    <!-- Sem seta -->
    <span arcanaTooltip label="Sem setinha" [arrow]="false">
      <button arcanaTooltipTrigger>flat</button>
    </span>

    <!-- Conteúdo custom (sobrepõe label) -->
    <span arcanaTooltip side="top">
      <button arcanaTooltipTrigger aria-label="Undo">↺</button>
      <span>Undo <strong>⌘Z</strong></span>
    </span>
  \`
})
export class ToolbarComponent {}`,
    svelte: `<script lang="ts">
  import { ArcanaTooltip } from '@arcanalabs/ui-components/svelte'
</script>

<!-- Texto via label -->
<ArcanaTooltip label="Saves without publishing">
  {#snippet trigger()}<button>Save draft</button>{/snippet}
</ArcanaTooltip>

<!-- Lados + sem seta -->
<ArcanaTooltip label="No topo" side="top">
  {#snippet trigger()}<button>top</button>{/snippet}
</ArcanaTooltip>
<ArcanaTooltip label="Sem setinha" arrow={false}>
  {#snippet trigger()}<button>flat</button>{/snippet}
</ArcanaTooltip>

<!-- Conteúdo custom (sobrepõe label) -->
<ArcanaTooltip side="top">
  {#snippet trigger()}<button aria-label="Undo">↺</button>{/snippet}
  <span>Undo <strong>⌘Z</strong></span>
</ArcanaTooltip>`
  },

  hoverCard: {
    react: `import { ArcanaHoverCard, ArcanaAvatar } from '@arcanalabs/ui-components/react'

function ProfileCard() {
  return (
    <div>
      <ArcanaAvatar src="https://i.pravatar.cc/120?img=32" alt="Dana Whitfield" size="lg" />
      <strong>Dana Whitfield</strong>
      <span>@danaw</span>
      <p>Design systems lead. Writes about accessibility and colour.</p>
      <span>1.2k followers</span>
    </div>
  )
}

export function ProfileLinks() {
  return (
    <>
      {/* Basic — a profile preview on a link */}
      <ArcanaHoverCard trigger={<a href="#profile">Dana Whitfield</a>}>
        <ProfileCard />
      </ArcanaHoverCard>

      {/* Sides */}
      <p>One trigger per side</p>
      <ArcanaHoverCard side="top" trigger={<a href="#profile">Dana Whitfield</a>}><ProfileCard /></ArcanaHoverCard>
      <ArcanaHoverCard side="right" trigger={<a href="#profile">Dana Whitfield</a>}><ProfileCard /></ArcanaHoverCard>
      <ArcanaHoverCard side="bottom" trigger={<a href="#profile">Dana Whitfield</a>}><ProfileCard /></ArcanaHoverCard>
      <ArcanaHoverCard side="left" trigger={<a href="#profile">Dana Whitfield</a>}><ProfileCard /></ArcanaHoverCard>

      {/* Alignment and offset */}
      <ArcanaHoverCard align="start" offset={16} trigger={<a href="#profile">Dana Whitfield</a>}>
        <ProfileCard />
      </ArcanaHoverCard>

      {/* Delays */}
      <ArcanaHoverCard openDelay={0} closeDelay={0} trigger={<a href="#profile">Instant</a>}>
        <ProfileCard />
      </ArcanaHoverCard>
      <ArcanaHoverCard openDelay={600} trigger={<a href="#profile">Slow (600 ms)</a>}>
        <ProfileCard />
      </ArcanaHoverCard>

      {/* Disabled */}
      <ArcanaHoverCard disabled trigger={<a href="#profile">Disabled — nothing opens</a>}>
        <ProfileCard />
      </ArcanaHoverCard>
    </>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaHoverCardComponent, ArcanaAvatarComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-profile-links',
  standalone: true,
  imports: [ArcanaHoverCardComponent, ArcanaAvatarComponent],
  template: \`
    <!-- Basic — a profile preview on a link -->
    <span arcanaHoverCard>
      <a arcanaHoverCardTrigger href="#profile">Dana Whitfield</a>
      <div>
        <span arcanaAvatar src="https://i.pravatar.cc/120?img=32" alt="Dana Whitfield" size="lg"></span>
        <strong>Dana Whitfield</strong>
        <span>&#64;danaw</span>
        <p>Design systems lead. Writes about accessibility and colour.</p>
        <span>1.2k followers</span>
      </div>
    </span>

    <!-- Sides -->
    <p>One trigger per side</p>
    <span arcanaHoverCard side="top">
      <a arcanaHoverCardTrigger href="#profile">Dana Whitfield</a>
      <p>Design systems lead. Writes about accessibility and colour.</p>
    </span>
    <span arcanaHoverCard side="right">
      <a arcanaHoverCardTrigger href="#profile">Dana Whitfield</a>
      <p>Design systems lead. Writes about accessibility and colour.</p>
    </span>
    <span arcanaHoverCard side="bottom">
      <a arcanaHoverCardTrigger href="#profile">Dana Whitfield</a>
      <p>Design systems lead. Writes about accessibility and colour.</p>
    </span>
    <span arcanaHoverCard side="left">
      <a arcanaHoverCardTrigger href="#profile">Dana Whitfield</a>
      <p>Design systems lead. Writes about accessibility and colour.</p>
    </span>

    <!-- Alignment and offset -->
    <span arcanaHoverCard align="start" [offset]="16">
      <a arcanaHoverCardTrigger href="#profile">Dana Whitfield</a>
      <p>Design systems lead. Writes about accessibility and colour.</p>
    </span>

    <!-- Delays -->
    <span arcanaHoverCard [openDelay]="0" [closeDelay]="0">
      <a arcanaHoverCardTrigger href="#profile">Instant</a>
      <p>Design systems lead. Writes about accessibility and colour.</p>
    </span>
    <span arcanaHoverCard [openDelay]="600">
      <a arcanaHoverCardTrigger href="#profile">Slow (600 ms)</a>
      <p>Design systems lead. Writes about accessibility and colour.</p>
    </span>

    <!-- Disabled -->
    <span arcanaHoverCard [disabled]="true">
      <a arcanaHoverCardTrigger href="#profile">Disabled — nothing opens</a>
      <p>Design systems lead. Writes about accessibility and colour.</p>
    </span>
  \`
})
export class ProfileLinksComponent {}`,
    svelte: `<script lang="ts">
  import { ArcanaHoverCard, ArcanaAvatar } from '@arcanalabs/ui-components/svelte'
</script>

{#snippet profileCard()}
  <div>
    <ArcanaAvatar src="https://i.pravatar.cc/120?img=32" alt="Dana Whitfield" size="lg" />
    <strong>Dana Whitfield</strong>
    <span>@danaw</span>
    <p>Design systems lead. Writes about accessibility and colour.</p>
    <span>1.2k followers</span>
  </div>
{/snippet}

<!-- Basic — a profile preview on a link -->
<ArcanaHoverCard>
  {#snippet trigger()}<a href="#profile">Dana Whitfield</a>{/snippet}
  {@render profileCard()}
</ArcanaHoverCard>

<!-- Sides -->
<p>One trigger per side</p>
<ArcanaHoverCard side="top">
  {#snippet trigger()}<a href="#profile">Dana Whitfield</a>{/snippet}
  {@render profileCard()}
</ArcanaHoverCard>
<ArcanaHoverCard side="right">
  {#snippet trigger()}<a href="#profile">Dana Whitfield</a>{/snippet}
  {@render profileCard()}
</ArcanaHoverCard>
<ArcanaHoverCard side="bottom">
  {#snippet trigger()}<a href="#profile">Dana Whitfield</a>{/snippet}
  {@render profileCard()}
</ArcanaHoverCard>
<ArcanaHoverCard side="left">
  {#snippet trigger()}<a href="#profile">Dana Whitfield</a>{/snippet}
  {@render profileCard()}
</ArcanaHoverCard>

<!-- Alignment and offset -->
<ArcanaHoverCard align="start" offset={16}>
  {#snippet trigger()}<a href="#profile">Dana Whitfield</a>{/snippet}
  {@render profileCard()}
</ArcanaHoverCard>

<!-- Delays -->
<ArcanaHoverCard openDelay={0} closeDelay={0}>
  {#snippet trigger()}<a href="#profile">Instant</a>{/snippet}
  {@render profileCard()}
</ArcanaHoverCard>
<ArcanaHoverCard openDelay={600}>
  {#snippet trigger()}<a href="#profile">Slow (600 ms)</a>{/snippet}
  {@render profileCard()}
</ArcanaHoverCard>

<!-- Disabled -->
<ArcanaHoverCard disabled>
  {#snippet trigger()}<a href="#profile">Disabled — nothing opens</a>{/snippet}
  {@render profileCard()}
</ArcanaHoverCard>`
  },

  contextMenu: {
    react: `import { useState } from 'react'
import { ArcanaContextMenu, ArcanaContextMenuItem } from '@arcanalabs/ui-components/react'
import type { ArcanaContextMenuItemSpec } from '@arcanalabs/ui-components/react'

const items: ArcanaContextMenuItemSpec[] = [
  { label: 'Open', icon: 'fa-regular fa-folder-open' },
  { label: 'Rename', icon: 'fa-solid fa-pen' },
  { label: 'Duplicate', icon: 'fa-solid fa-copy', suffix: '⌘D' },
  { label: 'Share', icon: 'fa-solid fa-share-nodes', divided: true },
  { label: 'Delete', icon: 'fa-solid fa-trash', variant: 'danger', divided: true },
  { label: 'Move to folder', icon: 'fa-solid fa-folder-tree', disabled: true }
]

export function LibraryItem() {
  const [last, setLast] = useState('none yet')

  return (
    <>
      {/* Data-driven items — right-click the area */}
      <ArcanaContextMenu items={items} ariaLabel="Library item actions" trigger={<div>Right-click this area</div>} />

      {/* Reacting to the selection */}
      <ArcanaContextMenu
        items={items}
        onSelect={(item) => setLast(item.label)}
        trigger={<div>Right-click this area</div>}
      />
      <p>Last action: <strong>{last}</strong></p>

      {/* Composition — children instead of the array */}
      <ArcanaContextMenu trigger={<div>Right-click this area</div>}>
        <ArcanaContextMenuItem icon="fa-regular fa-folder-open" onSelect={() => setLast('Open')}>Open</ArcanaContextMenuItem>
        <ArcanaContextMenuItem icon="fa-solid fa-box-archive" onSelect={() => setLast('Archive')}>Archive</ArcanaContextMenuItem>
        <ArcanaContextMenuItem icon="fa-solid fa-trash" variant="danger" divided onSelect={() => setLast('Delete')}>Delete</ArcanaContextMenuItem>
      </ArcanaContextMenu>

      {/* Disabled — the native menu comes back */}
      <ArcanaContextMenu disabled items={items} trigger={<div>Disabled — the browser menu shows instead</div>} />
    </>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaContextMenuComponent, ArcanaContextMenuItemComponent } from '@arcanalabs/ui-components/angular'
import type { ArcanaContextMenuItemSpec } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-library-item',
  standalone: true,
  imports: [ArcanaContextMenuComponent, ArcanaContextMenuItemComponent],
  template: \`
    <!-- Data-driven items — right-click the area -->
    <div arcanaContextMenu [items]="items" ariaLabel="Library item actions">
      <div arcanaContextMenuTrigger>Right-click this area</div>
    </div>

    <!-- Reacting to the selection -->
    <div arcanaContextMenu [items]="items" (selected)="last = $event.item.label">
      <div arcanaContextMenuTrigger>Right-click this area</div>
    </div>
    <p>Last action: <strong>{{ last }}</strong></p>

    <!-- Composition — children instead of the array -->
    <div arcanaContextMenu>
      <div arcanaContextMenuTrigger>Right-click this area</div>
      <div arcanaContextMenuItem icon="fa-regular fa-folder-open" (selected)="last = 'Open'">Open</div>
      <div arcanaContextMenuItem icon="fa-solid fa-box-archive" (selected)="last = 'Archive'">Archive</div>
      <div arcanaContextMenuItem icon="fa-solid fa-trash" variant="danger" [divided]="true" (selected)="last = 'Delete'">Delete</div>
    </div>

    <!-- Disabled — the native menu comes back -->
    <div arcanaContextMenu [disabled]="true" [items]="items">
      <div arcanaContextMenuTrigger>Disabled — the browser menu shows instead</div>
    </div>
  \`
})
export class LibraryItemComponent {
  last = 'none yet'
  items: ArcanaContextMenuItemSpec[] = [
    { label: 'Open', icon: 'fa-regular fa-folder-open' },
    { label: 'Rename', icon: 'fa-solid fa-pen' },
    { label: 'Duplicate', icon: 'fa-solid fa-copy', suffix: '⌘D' },
    { label: 'Share', icon: 'fa-solid fa-share-nodes', divided: true },
    { label: 'Delete', icon: 'fa-solid fa-trash', variant: 'danger', divided: true },
    { label: 'Move to folder', icon: 'fa-solid fa-folder-tree', disabled: true }
  ]
}`,
    svelte: `<script lang="ts">
  import { ArcanaContextMenu, ArcanaContextMenuItem } from '@arcanalabs/ui-components/svelte'
  import type { ArcanaContextMenuItemSpec } from '@arcanalabs/ui-components/svelte'

  let last = $state('none yet')

  const items: ArcanaContextMenuItemSpec[] = [
    { label: 'Open', icon: 'fa-regular fa-folder-open' },
    { label: 'Rename', icon: 'fa-solid fa-pen' },
    { label: 'Duplicate', icon: 'fa-solid fa-copy', suffix: '⌘D' },
    { label: 'Share', icon: 'fa-solid fa-share-nodes', divided: true },
    { label: 'Delete', icon: 'fa-solid fa-trash', variant: 'danger', divided: true },
    { label: 'Move to folder', icon: 'fa-solid fa-folder-tree', disabled: true }
  ]
</script>

<!-- Data-driven items — right-click the area -->
<ArcanaContextMenu {items} ariaLabel="Library item actions">
  {#snippet trigger()}<div>Right-click this area</div>{/snippet}
</ArcanaContextMenu>

<!-- Reacting to the selection -->
<ArcanaContextMenu {items} onSelect={(item) => (last = item.label)}>
  {#snippet trigger()}<div>Right-click this area</div>{/snippet}
</ArcanaContextMenu>
<p>Last action: <strong>{last}</strong></p>

<!-- Composition — children instead of the array -->
<ArcanaContextMenu>
  {#snippet trigger()}<div>Right-click this area</div>{/snippet}
  <ArcanaContextMenuItem icon="fa-regular fa-folder-open" onSelect={() => (last = 'Open')}>Open</ArcanaContextMenuItem>
  <ArcanaContextMenuItem icon="fa-solid fa-box-archive" onSelect={() => (last = 'Archive')}>Archive</ArcanaContextMenuItem>
  <ArcanaContextMenuItem icon="fa-solid fa-trash" variant="danger" divided onSelect={() => (last = 'Delete')}>Delete</ArcanaContextMenuItem>
</ArcanaContextMenu>

<!-- Disabled — the native menu comes back -->
<ArcanaContextMenu disabled {items}>
  {#snippet trigger()}<div>Disabled — the browser menu shows instead</div>{/snippet}
</ArcanaContextMenu>`
  },
  contextMenuItem: {
    react: `import { useState } from 'react'
import { ArcanaContextMenu, ArcanaContextMenuItem } from '@arcanalabs/ui-components/react'

export function FileActions() {
  const [lastAction, setLastAction] = useState<string | null>(null)

  return (
    <>
      {/* Composition — one <ArcanaContextMenuItem> per entry */}
      <ArcanaContextMenu ariaLabel="Right-click this area" trigger={<div className="drop-zone">Right-click this area</div>}>
        <ArcanaContextMenuItem icon="fa-regular fa-folder-open" onSelect={() => setLastAction('Open')}>
          Open
        </ArcanaContextMenuItem>
        <ArcanaContextMenuItem icon="fa-solid fa-clone" suffix="⌘D" onSelect={() => setLastAction('Duplicate')}>
          Duplicate
        </ArcanaContextMenuItem>
        <ArcanaContextMenuItem icon="fa-solid fa-folder-tree" disabled>
          Move to folder
        </ArcanaContextMenuItem>

        {/* \`divided\` draws the separator ABOVE the item */}
        <ArcanaContextMenuItem icon="fa-solid fa-trash" variant="danger" divided onSelect={() => setLastAction('Delete')}>
          Delete
        </ArcanaContextMenuItem>
      </ArcanaContextMenu>

      <p>Last action: <strong>{lastAction ?? 'none yet'}</strong></p>
    </>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaContextMenuComponent, ArcanaContextMenuItemComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-file-actions',
  standalone: true,
  imports: [ArcanaContextMenuComponent, ArcanaContextMenuItemComponent],
  template: \`
    <!-- Composition — one item component per entry -->
    <div arcanaContextMenu ariaLabel="Right-click this area">
      <div arcanaContextMenuTrigger class="drop-zone">Right-click this area</div>

      <div arcanaContextMenuItem icon="fa-regular fa-folder-open" (selected)="lastAction = 'Open'">Open</div>
      <div arcanaContextMenuItem icon="fa-solid fa-clone" suffix="⌘D" (selected)="lastAction = 'Duplicate'">Duplicate</div>
      <div arcanaContextMenuItem icon="fa-solid fa-folder-tree" [disabled]="true">Move to folder</div>

      <!-- \`divided\` draws the separator ABOVE the item -->
      <div arcanaContextMenuItem icon="fa-solid fa-trash" variant="danger" [divided]="true" (selected)="lastAction = 'Delete'">Delete</div>
    </div>

    <p>Last action: <strong>{{ lastAction ?? 'none yet' }}</strong></p>
  \`
})
export class FileActionsComponent {
  lastAction: string | null = null
}`,
    svelte: `<script lang="ts">
  import { ArcanaContextMenu, ArcanaContextMenuItem } from '@arcanalabs/ui-components/svelte'

  let lastAction = $state<string | null>(null)
</script>

<!-- Composition — one <ArcanaContextMenuItem> per entry -->
<ArcanaContextMenu ariaLabel="Right-click this area">
  {#snippet trigger()}
    <div class="drop-zone">Right-click this area</div>
  {/snippet}

  <ArcanaContextMenuItem icon="fa-regular fa-folder-open" onSelect={() => (lastAction = 'Open')}>
    Open
  </ArcanaContextMenuItem>
  <ArcanaContextMenuItem icon="fa-solid fa-clone" suffix="⌘D" onSelect={() => (lastAction = 'Duplicate')}>
    Duplicate
  </ArcanaContextMenuItem>
  <ArcanaContextMenuItem icon="fa-solid fa-folder-tree" disabled>
    Move to folder
  </ArcanaContextMenuItem>

  <!-- \`divided\` draws the separator ABOVE the item -->
  <ArcanaContextMenuItem icon="fa-solid fa-trash" variant="danger" divided onSelect={() => (lastAction = 'Delete')}>
    Delete
  </ArcanaContextMenuItem>
</ArcanaContextMenu>

<p>Last action: <strong>{lastAction ?? 'none yet'}</strong></p>`
  }
};
