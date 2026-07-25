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
  return (
    <>
      <ArcanaInput value={email} onValueChange={(v) => setEmail(v as string)} type="email" placeholder="email@company.com" />
      <ArcanaInput value={qty} onValueChange={(v) => setQty(v as number | null)} type="number" min={0} max={99} />
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
  \`
})
export class FieldsComponent {
  email: string | number | null = ''
  qty: string | number | null = null
}`,
    svelte: `<script lang="ts">
  import { ArcanaInput } from '@arcanalabs/ui-components/svelte'

  let email = $state('')
  let qty = $state<number | null>(null)
</script>

<ArcanaInput value={email} onValueChange={(v) => (email = v as string)} type="email" placeholder="email@company.com" />
<ArcanaInput value={qty} onValueChange={(v) => (qty = v as number | null)} type="number" min={0} max={99} />`
  },

  select: {
    react: `import { useState } from 'react'
import { ArcanaSelect, type SelectOption } from '@arcanalabs/ui-components/react'

const fruits: SelectOption[] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry', description: 'seasonal' },
  { label: 'Durian', value: 'durian', disabled: true },
  { label: 'Elderberry', value: 'elderberry' },
]

// \`color\` on an option renders a dot; with triggerMode="dots" the trigger
// shows only the dots — the pattern used by the order status quick filter.
const statusOptions: SelectOption[] = [
  { label: 'Open', value: 'open', color: '#10b981' },
  { label: 'Confirmed', value: 'confirmed', color: '#3b82f6' },
  { label: 'Shipped', value: 'shipped', color: '#8b5cf6' },
  { label: 'Delivered', value: 'delivered', color: '#64748b' },
  { label: 'Canceled', value: 'canceled', color: '#ef4444' },
]

export function FruitPicker() {
  const [single, setSingle] = useState<string | null>(null)
  const [many, setMany] = useState<string[]>([])
  const [statuses, setStatuses] = useState<string[]>(['open', 'confirmed', 'shipped'])
  return (
    <>
      {/* Single + search */}
      <ArcanaSelect value={single} onValueChange={(v) => setSingle(v as string | null)} options={fruits} searchable placeholder="Pick a fruit" />

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
    <!-- Single + search -->
    <div arcanaSelect [(value)]="single" [options]="fruits" [searchable]="true" placeholder="Pick a fruit"></div>

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
  statuses: string[] = ['open', 'confirmed', 'shipped']
  fruits: SelectOption[] = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Cherry', value: 'cherry', description: 'seasonal' },
    { label: 'Durian', value: 'durian', disabled: true },
    { label: 'Elderberry', value: 'elderberry' },
  ]
  // \`color\` on an option renders a dot; with triggerMode="dots" the trigger
  // shows only the dots — the pattern used by the order status quick filter.
  statusOptions: SelectOption[] = [
    { label: 'Open', value: 'open', color: '#10b981' },
    { label: 'Confirmed', value: 'confirmed', color: '#3b82f6' },
    { label: 'Shipped', value: 'shipped', color: '#8b5cf6' },
    { label: 'Delivered', value: 'delivered', color: '#64748b' },
    { label: 'Canceled', value: 'canceled', color: '#ef4444' },
  ]
}`,
    svelte: `<script lang="ts">
  import { ArcanaSelect, type SelectOption } from '@arcanalabs/ui-components/svelte'

  let single = $state<string | null>(null)
  let many = $state<string[]>([])
  let statuses = $state<string[]>(['open', 'confirmed', 'shipped'])

  const fruits: SelectOption[] = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Cherry', value: 'cherry', description: 'seasonal' },
    { label: 'Durian', value: 'durian', disabled: true },
    { label: 'Elderberry', value: 'elderberry' },
  ]
  // \`color\` on an option renders a dot; with triggerMode="dots" the trigger
  // shows only the dots — the pattern used by the order status quick filter.
  const statusOptions: SelectOption[] = [
    { label: 'Open', value: 'open', color: '#10b981' },
    { label: 'Confirmed', value: 'confirmed', color: '#3b82f6' },
    { label: 'Shipped', value: 'shipped', color: '#8b5cf6' },
    { label: 'Delivered', value: 'delivered', color: '#64748b' },
    { label: 'Canceled', value: 'canceled', color: '#ef4444' },
  ]
</script>

<!-- Single + search -->
<ArcanaSelect value={single} onValueChange={(v) => (single = v as string | null)} options={fruits} searchable placeholder="Pick a fruit" />

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
  { id: 1, name: 'Administrativo', children: [
    { id: 11, name: 'RH' },
    { id: 12, name: 'Financeiro' },
  ] },
  { id: 2, name: 'Operações', children: [{ id: 21, name: 'Logística' }] },
]

export function CostCentreField() {
  const [costCentre, setCostCentre] = useState<string | number | null>(null)
  const [picked, setPicked] = useState<(string | number)[]>([])
  return (
    <>
      {/* Single: only leaves select; clicking a parent just expands it. */}
      <ArcanaTreeSelect value={costCentre} onValueChange={setCostCentre} options={tree} placeholder="Centro de custo" />

      {/* Multiple: removable tags; allowParentSelection lets parents be picked too. */}
      <ArcanaTreeSelect value={picked} onValueChange={setPicked} options={tree} multiple allowParentSelection />

      {/* Theming: scope the CSS custom properties with panelClass (the panel lives in <body>).
          .my-tree { --arcana-tree-select-folder-color: #f59e0b; --arcana-tree-select-selected-bg: #fef3c7; … } */}
      <ArcanaTreeSelect value={costCentre} onValueChange={setCostCentre} options={tree} panelClass="my-tree" />
    </>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaTreeSelectComponent, type TreeSelectNode } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-cost-centre-field',
  standalone: true,
  imports: [ArcanaTreeSelectComponent],
  // Theming: scope the CSS custom properties with panelClass (the panel lives in <body>).
  // .my-tree { --arcana-tree-select-folder-color: #f59e0b; --arcana-tree-select-selected-bg: #fef3c7; … }
  template: \`
    <!-- Single: only leaves select; clicking a parent just expands it. -->
    <div arcanaTreeSelect [(value)]="costCentre" [options]="tree" placeholder="Centro de custo"></div>

    <!-- Multiple: removable tags; [allowParentSelection]="true" lets parents be picked too. -->
    <div arcanaTreeSelect [(value)]="picked" [options]="tree" [multiple]="true" [allowParentSelection]="true"></div>

    <div arcanaTreeSelect [(value)]="costCentre" [options]="tree" panelClass="my-tree"></div>
  \`
})
export class CostCentreFieldComponent {
  costCentre: string | number | null = null
  picked: (string | number)[] = []
  tree: TreeSelectNode[] = [
    { id: 1, name: 'Administrativo', children: [
      { id: 11, name: 'RH' },
      { id: 12, name: 'Financeiro' },
    ] },
    { id: 2, name: 'Operações', children: [{ id: 21, name: 'Logística' }] },
  ]
}`,
    svelte: `<script lang="ts">
  import { ArcanaTreeSelect, type TreeSelectNode } from '@arcanalabs/ui-components/svelte'

  let costCentre = $state<string | number | null>(null)
  let picked = $state<(string | number)[]>([])
  const tree: TreeSelectNode[] = [
    { id: 1, name: 'Administrativo', children: [
      { id: 11, name: 'RH' },
      { id: 12, name: 'Financeiro' },
    ] },
    { id: 2, name: 'Operações', children: [{ id: 21, name: 'Logística' }] },
  ]
</script>

<!-- Single: only leaves select; clicking a parent just expands it. -->
<ArcanaTreeSelect value={costCentre} onValueChange={(v) => (costCentre = v)} options={tree} placeholder="Centro de custo" />

<!-- Multiple: removable tags; allowParentSelection lets parents be picked too. -->
<ArcanaTreeSelect value={picked} onValueChange={(v) => (picked = v)} options={tree} multiple allowParentSelection />

<!-- Theming: scope the tokens with panelClass (the panel lives in <body>). -->
<ArcanaTreeSelect value={costCentre} onValueChange={(v) => (costCentre = v)} options={tree} panelClass="my-tree" />

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

export function Document() {
  const [cpf, setCpf] = useState('')
  const [phone, setPhone] = useState('')
  return (
    <>
      <ArcanaInputMask value={cpf} onValueChange={setCpf} mask="###.###.###-##" placeholder="CPF" />
      <ArcanaInputMask value={phone} onValueChange={setPhone} mask={['(##) ####-####', '(##) #####-####']} />
    </>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaInputMaskComponent } from '@arcanalabs/ui-components/angular'

// Masking is built into the component — no global directive needed.
@Component({
  selector: 'app-document',
  standalone: true,
  imports: [ArcanaInputMaskComponent],
  template: \`
    <input arcanaInputMask [(value)]="cpf" mask="###.###.###-##" placeholder="CPF" />
    <input arcanaInputMask [(value)]="phone" [mask]="['(##) ####-####', '(##) #####-####']" />
  \`
})
export class DocumentComponent {
  cpf = ''
  phone = ''
}`,
    svelte: `<script lang="ts">
  import { ArcanaInputMask } from '@arcanalabs/ui-components/svelte'
  // Masking is built into the component — no global directive needed.
  let cpf = $state('')
  let phone = $state('')
</script>

<ArcanaInputMask value={cpf} onValueChange={(v) => (cpf = v)} mask="###.###.###-##" placeholder="CPF" />
<ArcanaInputMask value={phone} onValueChange={(v) => (phone = v)} mask={['(##) ####-####', '(##) #####-####']} />`
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

  radioCardGroup: {
    react: `import { useState } from 'react'
import { ArcanaRadioCardGroup, type RadioCardOption } from '@arcanalabs/ui-components/react'

const options: RadioCardOption[] = [
  { label: 'Credit card', value: 'credit_card', description: 'Recurring charge.' },
  { label: 'Pix', value: 'pix', badge: 'Recommended' },
]

export function PaymentMethod() {
  const [method, setMethod] = useState<string | number | boolean | null>('pix')
  return <ArcanaRadioCardGroup value={method} onValueChange={setMethod} options={options} ariaLabel="Payment method" />
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaRadioCardGroupComponent, type RadioCardOption } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-payment-method',
  standalone: true,
  imports: [ArcanaRadioCardGroupComponent],
  template: \`<div arcanaRadioCardGroup [(value)]="method" [options]="options" ariaLabel="Payment method"></div>\`
})
export class PaymentMethodComponent {
  method: string | number | boolean | null = 'pix'
  options: RadioCardOption[] = [
    { label: 'Credit card', value: 'credit_card', description: 'Recurring charge.' },
    { label: 'Pix', value: 'pix', badge: 'Recommended' },
  ]
}`,
    svelte: `<script lang="ts">
  import { ArcanaRadioCardGroup, type RadioCardOption } from '@arcanalabs/ui-components/svelte'

  let method = $state<string | number | boolean | null>('pix')
  const options: RadioCardOption[] = [
    { label: 'Credit card', value: 'credit_card', description: 'Recurring charge.' },
    { label: 'Pix', value: 'pix', badge: 'Recommended' },
  ]
</script>

<ArcanaRadioCardGroup value={method} onValueChange={(v) => (method = v)} {options} ariaLabel="Payment method" />`
  },

  segmentedOptions: {
    react: `import { useState } from 'react'
import { ArcanaSegmentedOptions, type SegmentedOption } from '@arcanalabs/ui-components/react'

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

export function ViewMode() {
  const [view, setView] = useState<string | number | null>('list')
  const [priority, setPriority] = useState<string | number | null>('medium')
  return (
    <>
      <ArcanaSegmentedOptions value={view} onValueChange={setView} options={options} ariaLabel="View mode" />

      {/* Denser, square-cornered variant */}
      <ArcanaSegmentedOptions value={view} onValueChange={setView} options={options} compact squared />

      {/* With icons */}
      <ArcanaSegmentedOptions value={view} onValueChange={setView} options={iconOptions} />

      {/* With coloured icons */}
      <ArcanaSegmentedOptions value={priority} onValueChange={setPriority} options={colorOptions} />
    </>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaSegmentedOptionsComponent, type SegmentedOption } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-view-mode',
  standalone: true,
  imports: [ArcanaSegmentedOptionsComponent],
  template: \`
    <div arcanaSegmentedOptions [(value)]="view" [options]="options" ariaLabel="View mode"></div>

    <!-- Denser, square-cornered variant -->
    <div arcanaSegmentedOptions [(value)]="view" [options]="options" [compact]="true" [squared]="true"></div>

    <!-- With icons -->
    <div arcanaSegmentedOptions [(value)]="view" [options]="iconOptions"></div>

    <!-- With coloured icons -->
    <div arcanaSegmentedOptions [(value)]="priority" [options]="colorOptions"></div>
  \`
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
}`,
    svelte: `<script lang="ts">
  import { ArcanaSegmentedOptions, type SegmentedOption } from '@arcanalabs/ui-components/svelte'

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
</script>

<ArcanaSegmentedOptions value={view} onValueChange={(v) => (view = v)} {options} ariaLabel="View mode" />

<!-- Denser, square-cornered variant -->
<ArcanaSegmentedOptions value={view} onValueChange={(v) => (view = v)} {options} compact squared />

<!-- With icons -->
<ArcanaSegmentedOptions value={view} onValueChange={(v) => (view = v)} options={iconOptions} />

<!-- With coloured icons -->
<ArcanaSegmentedOptions value={priority} onValueChange={(v) => (priority = v)} options={colorOptions} />`
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
    react: `import { ArcanaDropdown, ArcanaDropdownItem, ArcanaButton } from '@arcanalabs/ui-components/react'

export function RowActions() {
  return (
    <ArcanaDropdown placement="bottom-start" trigger={<ArcanaButton variant="outline">Actions ▾</ArcanaButton>}>
      <ArcanaDropdownItem icon="fa-solid fa-pen" onClick={rename}>Rename</ArcanaDropdownItem>
      <ArcanaDropdownItem icon="fa-solid fa-trash" variant="danger" divided onClick={del}>Delete</ArcanaDropdownItem>
    </ArcanaDropdown>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaDropdownComponent, ArcanaDropdownItemComponent, ArcanaButtonComponent } from '@arcanalabs/ui-components/angular'

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
}`,
    svelte: `<script lang="ts">
  import { ArcanaDropdown, ArcanaDropdownItem, ArcanaButton } from '@arcanalabs/ui-components/svelte'
  function rename() {}
  function del() {}
</script>

<ArcanaDropdown placement="bottom-start">
  {#snippet trigger({ toggle })}
    <ArcanaButton variant="outline" onClick={toggle}>Actions ▾</ArcanaButton>
  {/snippet}
  <ArcanaDropdownItem icon="fa-solid fa-pen" onClick={rename}>Rename</ArcanaDropdownItem>
  <ArcanaDropdownItem icon="fa-solid fa-trash" variant="danger" divided onClick={del}>Delete</ArcanaDropdownItem>
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
  { key: 'total', label: 'Total', align: 'right', valueGetter: (v) => 'R$ ' + Number(v).toFixed(2) },
]
const rows = [
  { sku: 'GLP-13', name: 'Botijão P13', qty: 2, total: 260, status: 'in' },
  { sku: 'GLP-45', name: 'Botijão P45', qty: 1, total: 480, status: 'low' },
  { sku: 'AGUA-20', name: 'Galão 20L', qty: 5, total: 45, status: 'in' },
]

export function ProductsTable() {
  return (
    <ArcanaTable columns={columns} rows={rows} footer={
      <tr><td colSpan={3}>Total of items</td><td className="arcana-table__td--right">R$ 785,00</td></tr>
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
    <ng-template #foot><tr><td colspan="3">Total of items</td><td class="arcana-table__td--right">R$ 785,00</td></tr></ng-template>
  \`
})
export class ProductsTableComponent {
  columns: ArcanaTableColumn[] = [
    { key: 'sku', label: 'SKU', width: '96px' },
    { key: 'name', label: 'Product' },
    { key: 'qty', label: 'Qty', align: 'right' },
    { key: 'total', label: 'Total', align: 'right', valueGetter: (v) => 'R$ ' + Number(v).toFixed(2) },
  ]
  rows = [
    { sku: 'GLP-13', name: 'Botijão P13', qty: 2, total: 260, status: 'in' },
    { sku: 'GLP-45', name: 'Botijão P45', qty: 1, total: 480, status: 'low' },
    { sku: 'AGUA-20', name: 'Galão 20L', qty: 5, total: 45, status: 'in' },
  ]
}`,
    svelte: `<script lang="ts">
  import { ArcanaTable, ArcanaBadge, type ArcanaTableColumn } from '@arcanalabs/ui-components/svelte'

  const columns: ArcanaTableColumn[] = [
    { key: 'sku', label: 'SKU', width: '96px' },
    { key: 'name', label: 'Product', render: nameCell },
    { key: 'qty', label: 'Qty', align: 'right' },
    { key: 'total', label: 'Total', align: 'right', valueGetter: (v) => 'R$ ' + Number(v).toFixed(2) },
  ]
  const rows = [
    { sku: 'GLP-13', name: 'Botijão P13', qty: 2, total: 260, status: 'in' },
    { sku: 'GLP-45', name: 'Botijão P45', qty: 1, total: 480, status: 'low' },
    { sku: 'AGUA-20', name: 'Galão 20L', qty: 5, total: 45, status: 'in' },
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
  {#snippet footer()}<tr><td colspan="3">Total of items</td><td class="arcana-table__td--right">R$ 785,00</td></tr>{/snippet}
</ArcanaTable>`
  },

  specSheet: {
    react: `import { ArcanaSpecSheet, ArcanaSpecSheetSection, ArcanaSpecSheetField, ArcanaButton } from '@arcanalabs/ui-components/react'

const form = {
  trading_name: 'Arcana Labs Tecnologia LTDA',
  document_number: '12.345.678/0001-90',
  state_registration: '',                 // empty → renders the "not provided" text
  phone: '(11) 4002-8922',
  email: 'contato@arcanalabs.com',
}

export function OrgSheet() {
  return (
    <ArcanaSpecSheet
      docNum="Record Nº 042"
      title="Arcana Labs"
      metaLabel="Status"
      meta={<span className="arcana-spec-sheet-badge arcana-spec-sheet-badge--active">Active</span>}
      footer={<ArcanaButton variant="outline">Change data</ArcanaButton>}
    >
      <ArcanaSpecSheetSection title="Registration data" sectionNum="§ 01" icon="fa-solid fa-building" iconColor="blue" columns={3}>
        <ArcanaSpecSheetField label="Legal name" value={form.trading_name} />
        <ArcanaSpecSheetField label="CNPJ" value={form.document_number} />
        <ArcanaSpecSheetField label="State registration" value={form.state_registration} />
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
    <article arcanaSpecSheet docNum="Record Nº 042" title="Arcana Labs" metaLabel="Status" [metaTemplate]="meta" [footerTemplate]="foot">
      <section arcanaSpecSheetSection title="Registration data" sectionNum="§ 01" icon="fa-solid fa-building" iconColor="blue" [columns]="3">
        <div arcanaSpecSheetField label="Legal name" [value]="form.trading_name"></div>
        <div arcanaSpecSheetField label="CNPJ" [value]="form.document_number"></div>
        <div arcanaSpecSheetField label="State registration" [value]="form.state_registration"></div>
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
    trading_name: 'Arcana Labs Tecnologia LTDA',
    document_number: '12.345.678/0001-90',
    state_registration: '',                 // empty → renders the "not provided" text
    phone: '(11) 4002-8922',
    email: 'contato@arcanalabs.com',
  }
}`,
    svelte: `<script lang="ts">
  import { ArcanaSpecSheet, ArcanaSpecSheetSection, ArcanaSpecSheetField, ArcanaButton } from '@arcanalabs/ui-components/svelte'

  const form = {
    trading_name: 'Arcana Labs Tecnologia LTDA',
    document_number: '12.345.678/0001-90',
    state_registration: '',                 // empty → renders the "not provided" text
    phone: '(11) 4002-8922',
    email: 'contato@arcanalabs.com',
  }
</script>

<ArcanaSpecSheet docNum="Record Nº 042" title="Arcana Labs" metaLabel="Status">
  {#snippet meta()}<span class="arcana-spec-sheet-badge arcana-spec-sheet-badge--active">Active</span>{/snippet}

  <ArcanaSpecSheetSection title="Registration data" sectionNum="§ 01" icon="fa-solid fa-building" iconColor="blue" columns={3}>
    <ArcanaSpecSheetField label="Legal name" value={form.trading_name} />
    <ArcanaSpecSheetField label="CNPJ" value={form.document_number} />
    <ArcanaSpecSheetField label="State registration" value={form.state_registration} />
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
        title="Financial"
        sectionNum="§ 03"
        icon="fa-solid fa-dollar-sign"
        iconColor="amber"
        columns={3}
        actions={<ArcanaButton variant="ghost">Change</ArcanaButton>}
      >
        <ArcanaSpecSheetField label="Credit limit" value="R$ 5.000,00" />
        <ArcanaSpecSheetField label="Balance" value="R$ 1.240,00" />
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
      <section arcanaSpecSheetSection title="Financial" sectionNum="§ 03" icon="fa-solid fa-dollar-sign" iconColor="amber" [columns]="3" [actionsTemplate]="acts">
        <div arcanaSpecSheetField label="Credit limit" value="R$ 5.000,00"></div>
        <div arcanaSpecSheetField label="Balance" value="R$ 1.240,00"></div>
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
  <ArcanaSpecSheetSection title="Financial" sectionNum="§ 03" icon="fa-solid fa-dollar-sign" iconColor="amber" columns={3}>
    {#snippet actions()}<ArcanaButton variant="ghost">Change</ArcanaButton>{/snippet}
    <ArcanaSpecSheetField label="Credit limit" value="R$ 5.000,00" />
    <ArcanaSpecSheetField label="Balance" value="R$ 1.240,00" />
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
        <ArcanaSummaryTile tone="positive" icon="fa-solid fa-arrow-down" label="Income" value="R$ 1.250,00" sub="4 methods" />
        <ArcanaSummaryTile tone="negative" icon="fa-solid fa-arrow-up" label="Expenses" value="R$ 85,00" sub="2 methods" />
        <ArcanaSummaryTile tone="indigo" icon="fa-solid fa-sack-dollar" label="Total" value="R$ 1.165,00" />
      </ArcanaSummaryTilesGroup>

      {/* format="rows" stacks the tiles — ideal for narrow sidebars */}
      <ArcanaSummaryTilesGroup format="rows">
        <ArcanaSummaryTile tone="positive" icon="fa-solid fa-arrow-down" label="Income" value="R$ 1.250,00" sub="4 methods" />
        <ArcanaSummaryTile tone="negative" icon="fa-solid fa-arrow-up" label="Expenses" value="R$ 85,00" sub="2 methods" />
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
      <div arcanaSummaryTile tone="positive" icon="fa-solid fa-arrow-down" label="Income" value="R$ 1.250,00" sub="4 methods"></div>
      <div arcanaSummaryTile tone="negative" icon="fa-solid fa-arrow-up" label="Expenses" value="R$ 85,00" sub="2 methods"></div>
      <div arcanaSummaryTile tone="indigo" icon="fa-solid fa-sack-dollar" label="Total" value="R$ 1.165,00"></div>
    </div>

    <!-- format="rows" stacks the tiles — ideal for narrow sidebars -->
    <div arcanaSummaryTilesGroup format="rows">
      <div arcanaSummaryTile tone="positive" icon="fa-solid fa-arrow-down" label="Income" value="R$ 1.250,00" sub="4 methods"></div>
      <div arcanaSummaryTile tone="negative" icon="fa-solid fa-arrow-up" label="Expenses" value="R$ 85,00" sub="2 methods"></div>
    </div>
  \`
})
export class KpisComponent {}`,
    svelte: `<script lang="ts">
  import { ArcanaSummaryTilesGroup, ArcanaSummaryTile } from '@arcanalabs/ui-components/svelte'
</script>

<!-- Grid layout — \`columns\` sets how many tiles fit per row -->
<ArcanaSummaryTilesGroup columns={3}>
  <ArcanaSummaryTile tone="positive" icon="fa-solid fa-arrow-down" label="Income" value="R$ 1.250,00" sub="4 methods" />
  <ArcanaSummaryTile tone="negative" icon="fa-solid fa-arrow-up" label="Expenses" value="R$ 85,00" sub="2 methods" />
  <ArcanaSummaryTile tone="indigo" icon="fa-solid fa-sack-dollar" label="Total" value="R$ 1.165,00" />
</ArcanaSummaryTilesGroup>

<!-- format="rows" stacks the tiles — ideal for narrow sidebars -->
<ArcanaSummaryTilesGroup format="rows">
  <ArcanaSummaryTile tone="positive" icon="fa-solid fa-arrow-down" label="Income" value="R$ 1.250,00" sub="4 methods" />
  <ArcanaSummaryTile tone="negative" icon="fa-solid fa-arrow-up" label="Expenses" value="R$ 85,00" sub="2 methods" />
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
        Pix and bank slip issue a new charge link every cycle.
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
      Pix and bank slip issue a new charge link every cycle.
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
  Pix and bank slip issue a new charge link every cycle.
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
  return <ArcanaSwitchSegmented value={yearly} onValueChange={setYearly} offLabel="Mensal" onLabel="Anual · −20%" />
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaSwitchSegmentedComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-billing-cycle',
  standalone: true,
  imports: [ArcanaSwitchSegmentedComponent],
  template: \`<div arcanaSwitchSegmented [(value)]="yearly" offLabel="Mensal" onLabel="Anual · −20%"></div>\`
})
export class BillingCycleComponent {
  yearly = false
}`,
    svelte: `<script lang="ts">
  import { ArcanaSwitchSegmented } from '@arcanalabs/ui-components/svelte'
  let yearly = $state(false)
</script>

<ArcanaSwitchSegmented value={yearly} onValueChange={(v) => (yearly = v)} offLabel="Mensal" onLabel="Anual · −20%" />`
  }
};
