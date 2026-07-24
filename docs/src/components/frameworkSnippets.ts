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
    react: `import { ArcanaButton } from '@arcanalabs/ui-components/react'

export function Toolbar() {
  function save() {
    // …persist changes
  }
  return (
    <>
      <ArcanaButton variant="primary" onClick={save}>Save</ArcanaButton>
      <ArcanaButton variant="outline">Cancel</ArcanaButton>
      <ArcanaButton variant="destructive" disabled={busy}>Delete</ArcanaButton>

      {/* Icon + label */}
      <ArcanaButton variant="primary"><i className="fa-solid fa-plus" /> New</ArcanaButton>
      {/* Icon only — pass aria-label for accessibility */}
      <ArcanaButton variant="outline" aria-label="Settings"><i className="fa-solid fa-gear" /></ArcanaButton>
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
    <button arcanaButton variant="primary" (click)="save()">Save</button>
    <button arcanaButton variant="outline">Cancel</button>
    <button arcanaButton variant="destructive" [disabled]="busy">Delete</button>

    <!-- Icon + label -->
    <button arcanaButton variant="primary"><i class="fa-solid fa-plus"></i> New</button>
    <!-- Icon only — pass aria-label for accessibility -->
    <button arcanaButton variant="outline" aria-label="Settings"><i class="fa-solid fa-gear"></i></button>
  \`
})
export class ToolbarComponent {
  busy = false
  save() { /* …persist changes */ }
}`,
    svelte: `<script lang="ts">
  import { ArcanaButton } from '@arcanalabs/ui-components/svelte'

  let busy = $state(false)
  function save() {
    // …persist changes
  }
</script>

<ArcanaButton variant="primary" onClick={save}>Save</ArcanaButton>
<ArcanaButton variant="outline">Cancel</ArcanaButton>
<ArcanaButton variant="destructive" disabled={busy}>Delete</ArcanaButton>

<!-- Icon + label -->
<ArcanaButton variant="primary"><i class="fa-solid fa-plus"></i> New</ArcanaButton>
<!-- Icon only — pass aria-label for accessibility -->
<ArcanaButton variant="outline" aria-label="Settings"><i class="fa-solid fa-gear"></i></ArcanaButton>`
  },

  badge: {
    react: `import { ArcanaBadge } from '@arcanalabs/ui-components/react'

export function Statuses() {
  return (
    <>
      <ArcanaBadge variant="green" dot>Active</ArcanaBadge>
      <ArcanaBadge variant="blue">12 records</ArcanaBadge>
      <ArcanaBadge variant="red" size="sm">Overdue</ArcanaBadge>
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
    <span arcanaBadge variant="green" [dot]="true">Active</span>
    <span arcanaBadge variant="blue">12 records</span>
    <span arcanaBadge variant="red" size="sm">Overdue</span>
  \`
})
export class StatusesComponent {}`,
    svelte: `<script lang="ts">
  import { ArcanaBadge } from '@arcanalabs/ui-components/svelte'
</script>

<ArcanaBadge variant="green" dot>Active</ArcanaBadge>
<ArcanaBadge variant="blue">12 records</ArcanaBadge>
<ArcanaBadge variant="red" size="sm">Overdue</ArcanaBadge>`
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

const options: SelectOption[] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry', description: 'seasonal' },
]

export function FruitPicker() {
  const [fruit, setFruit] = useState<string | null>(null)
  return (
    <ArcanaSelect value={fruit} onValueChange={(v) => setFruit(v as string | null)} options={options} searchable placeholder="Pick a fruit" />
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaSelectComponent, type SelectOption } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-fruit-picker',
  standalone: true,
  imports: [ArcanaSelectComponent],
  template: \`
    <div arcanaSelect [(value)]="fruit" [options]="options" [searchable]="true" placeholder="Pick a fruit"></div>
  \`
})
export class FruitPickerComponent {
  fruit: string | null = null
  options: SelectOption[] = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Cherry', value: 'cherry', description: 'seasonal' },
  ]
}`,
    svelte: `<script lang="ts">
  import { ArcanaSelect, type SelectOption } from '@arcanalabs/ui-components/svelte'

  let fruit = $state<string | null>(null)
  const options: SelectOption[] = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Cherry', value: 'cherry', description: 'seasonal' },
  ]
</script>

<ArcanaSelect value={fruit} onValueChange={(v) => (fruit = v as string | null)} {options} searchable placeholder="Pick a fruit" />`
  },

  checkbox: {
    react: `import { useState } from 'react'
import { ArcanaCheckbox } from '@arcanalabs/ui-components/react'

export function Terms() {
  const [accepted, setAccepted] = useState(false)
  return <ArcanaCheckbox value={accepted} onValueChange={setAccepted} label="I accept the terms" />
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaCheckboxComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [ArcanaCheckboxComponent],
  template: \`<label arcanaCheckbox [(value)]="accepted" label="I accept the terms"></label>\`
})
export class TermsComponent {
  accepted = false
}`,
    svelte: `<script lang="ts">
  import { ArcanaCheckbox } from '@arcanalabs/ui-components/svelte'
  let accepted = $state(false)
</script>

<ArcanaCheckbox value={accepted} onValueChange={(v) => (accepted = v)} label="I accept the terms" />`
  },

  switch: {
    react: `import { useState } from 'react'
import { ArcanaSwitch } from '@arcanalabs/ui-components/react'

export function AutoRenew() {
  const [autoRenew, setAutoRenew] = useState(true)
  return (
    <label className="form-row">
      <span>Auto-renew</span>
      <ArcanaSwitch value={autoRenew} onValueChange={setAutoRenew} ariaLabel="Auto-renew" />
    </label>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaSwitchComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-auto-renew',
  standalone: true,
  imports: [ArcanaSwitchComponent],
  template: \`
    <label class="form-row">
      <span>Auto-renew</span>
      <button arcanaSwitch [(value)]="autoRenew" ariaLabel="Auto-renew"></button>
    </label>
  \`
})
export class AutoRenewComponent {
  autoRenew = true
}`,
    svelte: `<script lang="ts">
  import { ArcanaSwitch } from '@arcanalabs/ui-components/svelte'
  let autoRenew = $state(true)
</script>

<label class="form-row">
  <span>Auto-renew</span>
  <ArcanaSwitch value={autoRenew} onValueChange={(v) => (autoRenew = v)} ariaLabel="Auto-renew" />
</label>`
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

export function ActiveFilter() {
  const [active, setActive] = useState<unknown>(1)
  return <ArcanaInputBoolean value={active} onValueChange={setActive} variation="status" clearable={false} />
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaInputBooleanComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-active-filter',
  standalone: true,
  imports: [ArcanaInputBooleanComponent],
  template: \`<div arcanaInputBoolean [(value)]="active" variation="status" [clearable]="false"></div>\`
})
export class ActiveFilterComponent {
  active: unknown = 1
}`,
    svelte: `<script lang="ts">
  import { ArcanaInputBoolean } from '@arcanalabs/ui-components/svelte'
  let active = $state<unknown>(1)
</script>

<ArcanaInputBoolean value={active} onValueChange={(v) => (active = v)} variation="status" clearable={false} />`
  },

  numberStepper: {
    react: `import { useState } from 'react'
import { ArcanaNumberStepper } from '@arcanalabs/ui-components/react'

export function Quantity() {
  const [qty, setQty] = useState<number | null>(1)
  return <ArcanaNumberStepper value={qty} onValueChange={setQty} min={0} max={10} ariaLabel="Quantity" />
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaNumberStepperComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-quantity',
  standalone: true,
  imports: [ArcanaNumberStepperComponent],
  template: \`<div arcanaNumberStepper [(value)]="qty" [min]="0" [max]="10" ariaLabel="Quantity"></div>\`
})
export class QuantityComponent {
  qty: number | null = 1
}`,
    svelte: `<script lang="ts">
  import { ArcanaNumberStepper } from '@arcanalabs/ui-components/svelte'
  let qty = $state<number | null>(1)
</script>

<ArcanaNumberStepper value={qty} onValueChange={(v) => (qty = v)} min={0} max={10} ariaLabel="Quantity" />`
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
]

export function ViewMode() {
  const [view, setView] = useState<string | number | null>('list')
  return <ArcanaSegmentedOptions value={view} onValueChange={setView} options={options} ariaLabel="View mode" />
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaSegmentedOptionsComponent, type SegmentedOption } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-view-mode',
  standalone: true,
  imports: [ArcanaSegmentedOptionsComponent],
  template: \`<div arcanaSegmentedOptions [(value)]="view" [options]="options" ariaLabel="View mode"></div>\`
})
export class ViewModeComponent {
  view: string | number | null = 'list'
  options: SegmentedOption[] = [
    { label: 'List', value: 'list' },
    { label: 'Grid', value: 'grid' },
  ]
}`,
    svelte: `<script lang="ts">
  import { ArcanaSegmentedOptions, type SegmentedOption } from '@arcanalabs/ui-components/svelte'

  let view = $state<string | number | null>('list')
  const options: SegmentedOption[] = [
    { label: 'List', value: 'list' },
    { label: 'Grid', value: 'grid' },
  ]
</script>

<ArcanaSegmentedOptions value={view} onValueChange={(v) => (view = v)} {options} ariaLabel="View mode" />`
  },

  datePicker: {
    react: `import { useState } from 'react'
import { ArcanaDatePicker } from '@arcanalabs/ui-components/react'
// Masking is built into the component — no global directive needed.

export function BirthDate() {
  const [date, setDate] = useState<string | null>('2026-07-24')
  return <ArcanaDatePicker value={date} onValueChange={setDate} />
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaDatePickerComponent } from '@arcanalabs/ui-components/angular'

// Masking is built into the component — no global directive needed.
@Component({
  selector: 'app-birth-date',
  standalone: true,
  imports: [ArcanaDatePickerComponent],
  template: \`<div arcanaDatePicker [(value)]="date"></div>\`
})
export class BirthDateComponent {
  date: string | null = '2026-07-24'
}`,
    svelte: `<script lang="ts">
  import { ArcanaDatePicker } from '@arcanalabs/ui-components/svelte'
  // Masking is built into the component — no global directive needed.
  let date = $state<string | null>('2026-07-24')
</script>

<ArcanaDatePicker value={date} onValueChange={(v) => (date = v)} />`
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
  return (
    <ArcanaAccordion value={open} onValueChange={setOpen}>
      <ArcanaAccordionItem name="shipping" title="Shipping">Ships in 2–3 days.</ArcanaAccordionItem>
      <ArcanaAccordionItem name="returns" title="Returns">30-day free returns.</ArcanaAccordionItem>
    </ArcanaAccordion>
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
    </div>
  \`
})
export class FaqComponent {
  open: string | string[] | null = 'shipping'
}`,
    svelte: `<script lang="ts">
  import { ArcanaAccordion, ArcanaAccordionItem } from '@arcanalabs/ui-components/svelte'
  let open = $state<string | string[] | null>('shipping')
</script>

<ArcanaAccordion value={open} onValueChange={(v) => (open = v)}>
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
    react: `import { ArcanaDropdown, ArcanaDropdownItem } from '@arcanalabs/ui-components/react'

export function Menu() {
  return (
    <ArcanaDropdown size="comfortable" trigger={<button>Menu ▾</button>}>
      <ArcanaDropdownItem icon="fa-solid fa-user" suffix={<span>⌘P</span>}>Profile</ArcanaDropdownItem>
      <ArcanaDropdownItem variant="danger" divided onClick={del}>Delete</ArcanaDropdownItem>
    </ArcanaDropdown>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaDropdownComponent, ArcanaDropdownItemComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [ArcanaDropdownComponent, ArcanaDropdownItemComponent],
  template: \`
    <div arcanaDropdown size="comfortable">
      <button arcanaDropdownTrigger>Menu ▾</button>
      <div arcanaDropdownItem icon="fa-solid fa-user" suffix="⌘P">Profile</div>
      <div arcanaDropdownItem variant="danger" [divided]="true" (click)="del()">Delete</div>
    </div>
  \`
})
export class MenuComponent {
  del() {}
}`,
    svelte: `<script lang="ts">
  import { ArcanaDropdown, ArcanaDropdownItem } from '@arcanalabs/ui-components/svelte'
  function del() {}
</script>

<ArcanaDropdown size="comfortable">
  {#snippet trigger({ toggle })}<button onclick={toggle}>Menu ▾</button>{/snippet}
  <ArcanaDropdownItem icon="fa-solid fa-user">
    Profile
    {#snippet suffix()}⌘P{/snippet}
  </ArcanaDropdownItem>
  <ArcanaDropdownItem variant="danger" divided onClick={del}>Delete</ArcanaDropdownItem>
</ArcanaDropdown>`
  },

  table: {
    react: `import { ArcanaTable, type ArcanaTableColumn } from '@arcanalabs/ui-components/react'

const columns: ArcanaTableColumn[] = [
  { key: 'sku', label: 'SKU', width: '96px' },
  { key: 'name', label: 'Product', render: ({ row }) => <strong>{row.name}</strong> },
  { key: 'total', label: 'Total', align: 'right', valueGetter: (v) => 'R$ ' + Number(v).toFixed(2) },
]
const rows = [{ sku: 'GLP-13', name: 'Botijão P13', total: 260 }]

export function ProductsTable() {
  return (
    <ArcanaTable columns={columns} rows={rows} footer={
      <tr><td colSpan={2}>Total</td><td className="arcana-table__td--right">R$ 260,00</td></tr>
    } />
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaTableComponent, type ArcanaTableColumn } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-products-table',
  standalone: true,
  imports: [ArcanaTableComponent],
  template: \`
    <div arcanaTable [columns]="columns" [rows]="rows" [cellTemplates]="{ name: nameCell }" [footerTemplate]="foot"></div>
    <ng-template #nameCell let-row="row"><strong>{{ row.name }}</strong></ng-template>
    <ng-template #foot><tr><td colspan="2">Total</td><td class="arcana-table__td--right">R$ 260,00</td></tr></ng-template>
  \`
})
export class ProductsTableComponent {
  columns: ArcanaTableColumn[] = [
    { key: 'sku', label: 'SKU', width: '96px' },
    { key: 'name', label: 'Product' },
    { key: 'total', label: 'Total', align: 'right', valueGetter: (v) => 'R$ ' + Number(v).toFixed(2) },
  ]
  rows = [{ sku: 'GLP-13', name: 'Botijão P13', total: 260 }]
}`,
    svelte: `<script lang="ts">
  import { ArcanaTable, type ArcanaTableColumn } from '@arcanalabs/ui-components/svelte'

  const columns: ArcanaTableColumn[] = [
    { key: 'sku', label: 'SKU', width: '96px' },
    { key: 'name', label: 'Product', render: nameCell },
    { key: 'total', label: 'Total', align: 'right', valueGetter: (v) => 'R$ ' + Number(v).toFixed(2) },
  ]
  const rows = [{ sku: 'GLP-13', name: 'Botijão P13', total: 260 }]
</script>

{#snippet nameCell({ row })}<strong>{row.name}</strong>{/snippet}

<ArcanaTable {columns} {rows}>
  {#snippet footer()}<tr><td colspan="2">Total</td><td class="arcana-table__td--right">R$ 260,00</td></tr>{/snippet}
</ArcanaTable>`
  },

  specSheet: {
    react: `import { ArcanaSpecSheet, ArcanaSpecSheetSection, ArcanaSpecSheetField, ArcanaButton } from '@arcanalabs/ui-components/react'

export function OrgSheet() {
  return (
    <ArcanaSpecSheet
      docNum="Cadastro Nº 042"
      title="Arcana Labs"
      metaLabel="Status"
      meta={<span className="arcana-spec-sheet-badge arcana-spec-sheet-badge--active">Ativo</span>}
      footer={<ArcanaButton variant="outline">Alterar Dados</ArcanaButton>}
    >
      <ArcanaSpecSheetSection title="Dados Cadastrais" sectionNum="§ 01" icon="fa-solid fa-building" iconColor="blue" columns={3}>
        <ArcanaSpecSheetField label="Razão Social" value={form.trading_name} />
        <ArcanaSpecSheetField label="CNPJ" value={form.document_number} />
        <ArcanaSpecSheetField label="Inscrição Estadual" value={form.state_registration} />
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
    <article arcanaSpecSheet docNum="Cadastro Nº 042" title="Arcana Labs" metaLabel="Status" [metaTemplate]="meta" [footerTemplate]="foot">
      <section arcanaSpecSheetSection title="Dados Cadastrais" sectionNum="§ 01" icon="fa-solid fa-building" iconColor="blue" [columns]="3">
        <div arcanaSpecSheetField label="Razão Social" [value]="form.trading_name"></div>
        <div arcanaSpecSheetField label="CNPJ" [value]="form.document_number"></div>
        <div arcanaSpecSheetField label="Inscrição Estadual" [value]="form.state_registration"></div>
      </section>
    </article>
    <ng-template #meta><span class="arcana-spec-sheet-badge arcana-spec-sheet-badge--active">Ativo</span></ng-template>
    <ng-template #foot><button arcanaButton variant="outline">Alterar Dados</button></ng-template>
  \`
})
export class OrgSheetComponent {
  form = { trading_name: 'Arcana Labs Tecnologia LTDA', document_number: '12.345.678/0001-90', state_registration: '110.042.490.114' }
}`,
    svelte: `<script lang="ts">
  import { ArcanaSpecSheet, ArcanaSpecSheetSection, ArcanaSpecSheetField, ArcanaButton } from '@arcanalabs/ui-components/svelte'
  const form = { trading_name: 'Arcana Labs Tecnologia LTDA', document_number: '12.345.678/0001-90', state_registration: '110.042.490.114' }
</script>

<ArcanaSpecSheet docNum="Cadastro Nº 042" title="Arcana Labs" metaLabel="Status">
  {#snippet meta()}<span class="arcana-spec-sheet-badge arcana-spec-sheet-badge--active">Ativo</span>{/snippet}
  <ArcanaSpecSheetSection title="Dados Cadastrais" sectionNum="§ 01" icon="fa-solid fa-building" iconColor="blue" columns={3}>
    <ArcanaSpecSheetField label="Razão Social" value={form.trading_name} />
    <ArcanaSpecSheetField label="CNPJ" value={form.document_number} />
    <ArcanaSpecSheetField label="Inscrição Estadual" value={form.state_registration} />
  </ArcanaSpecSheetSection>
  {#snippet footer()}<ArcanaButton variant="outline">Alterar Dados</ArcanaButton>{/snippet}
</ArcanaSpecSheet>`
  },

  specSheetSection: {
    react: `import { ArcanaSpecSheetSection, ArcanaSpecSheetField, ArcanaButton } from '@arcanalabs/ui-components/react'

// Nested inside a <ArcanaSpecSheet>.
export function Financials() {
  return (
    <ArcanaSpecSheetSection
      title="Financeiro"
      sectionNum="§ 03"
      icon="fa-solid fa-dollar-sign"
      iconColor="amber"
      columns={3}
      actions={<ArcanaButton variant="ghost">Alterar</ArcanaButton>}
    >
      <ArcanaSpecSheetField label="Limite" value="R$ 5.000,00" />
      <ArcanaSpecSheetField label="Saldo" value="R$ 1.240,00" />
    </ArcanaSpecSheetSection>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaSpecSheetSectionComponent, ArcanaSpecSheetFieldComponent, ArcanaButtonComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-financials',
  standalone: true,
  imports: [ArcanaSpecSheetSectionComponent, ArcanaSpecSheetFieldComponent, ArcanaButtonComponent],
  template: \`
    <!-- Nested inside a <article arcanaSpecSheet> -->
    <section arcanaSpecSheetSection title="Financeiro" sectionNum="§ 03" icon="fa-solid fa-dollar-sign" iconColor="amber" [columns]="3" [actionsTemplate]="acts">
      <div arcanaSpecSheetField label="Limite" value="R$ 5.000,00"></div>
      <div arcanaSpecSheetField label="Saldo" value="R$ 1.240,00"></div>
    </section>
    <ng-template #acts><button arcanaButton variant="ghost">Alterar</button></ng-template>
  \`
})
export class FinancialsComponent {}`,
    svelte: `<script lang="ts">
  import { ArcanaSpecSheetSection, ArcanaSpecSheetField, ArcanaButton } from '@arcanalabs/ui-components/svelte'
</script>

<!-- Nested inside a <ArcanaSpecSheet> -->
<ArcanaSpecSheetSection title="Financeiro" sectionNum="§ 03" icon="fa-solid fa-dollar-sign" iconColor="amber" columns={3}>
  {#snippet actions()}<ArcanaButton variant="ghost">Alterar</ArcanaButton>{/snippet}
  <ArcanaSpecSheetField label="Limite" value="R$ 5.000,00" />
  <ArcanaSpecSheetField label="Saldo" value="R$ 1.240,00" />
</ArcanaSpecSheetSection>`
  },

  specSheetField: {
    react: `import { ArcanaSpecSheetField } from '@arcanalabs/ui-components/react'

export function Fields() {
  return (
    <>
      <ArcanaSpecSheetField label="CNPJ" value={form.document_number} />
      <ArcanaSpecSheetField label="Observações" value="" emptyText="Não informado" />
      <ArcanaSpecSheetField label="Status" span={2}>
        <span className="arcana-spec-sheet-badge arcana-spec-sheet-badge--active">Ativo</span>
      </ArcanaSpecSheetField>
    </>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaSpecSheetFieldComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-fields',
  standalone: true,
  imports: [ArcanaSpecSheetFieldComponent],
  template: \`
    <div arcanaSpecSheetField label="CNPJ" [value]="form.document_number"></div>
    <div arcanaSpecSheetField label="Observações" value="" emptyText="Não informado"></div>
    <div arcanaSpecSheetField label="Status" [span]="2" [valueTemplate]="status"></div>
    <ng-template #status><span class="arcana-spec-sheet-badge arcana-spec-sheet-badge--active">Ativo</span></ng-template>
  \`
})
export class FieldsComponent {
  form = { document_number: '12.345.678/0001-90' }
}`,
    svelte: `<script lang="ts">
  import { ArcanaSpecSheetField } from '@arcanalabs/ui-components/svelte'
  const form = { document_number: '12.345.678/0001-90' }
</script>

<ArcanaSpecSheetField label="CNPJ" value={form.document_number} />
<ArcanaSpecSheetField label="Observações" value="" emptyText="Não informado" />
<ArcanaSpecSheetField label="Status" span={2}>
  <span class="arcana-spec-sheet-badge arcana-spec-sheet-badge--active">Ativo</span>
</ArcanaSpecSheetField>`
  },

  summaryTiles: {
    react: `import { ArcanaSummaryTilesGroup, ArcanaSummaryTile } from '@arcanalabs/ui-components/react'

export function Kpis() {
  return (
    <ArcanaSummaryTilesGroup columns={3}>
      <ArcanaSummaryTile tone="positive" icon="fa-solid fa-arrow-down" label="Entradas" value="R$ 1.250,00" sub="4 formas" />
      <ArcanaSummaryTile tone="negative" icon="fa-solid fa-arrow-up" label="Despesas" value="R$ 85,00" />
      <ArcanaSummaryTile tone="indigo" icon="fa-solid fa-sack-dollar" label="Total" value="R$ 1.165,00" />
    </ArcanaSummaryTilesGroup>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaSummaryTilesGroupComponent, ArcanaSummaryTileComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-kpis',
  standalone: true,
  imports: [ArcanaSummaryTilesGroupComponent, ArcanaSummaryTileComponent],
  template: \`
    <div arcanaSummaryTilesGroup [columns]="3">
      <div arcanaSummaryTile tone="positive" icon="fa-solid fa-arrow-down" label="Entradas" value="R$ 1.250,00" sub="4 formas"></div>
      <div arcanaSummaryTile tone="negative" icon="fa-solid fa-arrow-up" label="Despesas" value="R$ 85,00"></div>
      <div arcanaSummaryTile tone="indigo" icon="fa-solid fa-sack-dollar" label="Total" value="R$ 1.165,00"></div>
    </div>
  \`
})
export class KpisComponent {}`,
    svelte: `<script lang="ts">
  import { ArcanaSummaryTilesGroup, ArcanaSummaryTile } from '@arcanalabs/ui-components/svelte'
</script>

<ArcanaSummaryTilesGroup columns={3}>
  <ArcanaSummaryTile tone="positive" icon="fa-solid fa-arrow-down" label="Entradas" value="R$ 1.250,00" sub="4 formas" />
  <ArcanaSummaryTile tone="negative" icon="fa-solid fa-arrow-up" label="Despesas" value="R$ 85,00" />
  <ArcanaSummaryTile tone="indigo" icon="fa-solid fa-sack-dollar" label="Total" value="R$ 1.165,00" />
</ArcanaSummaryTilesGroup>`
  },

  summaryTile: {
    react: `import { ArcanaSummaryTile } from '@arcanalabs/ui-components/react'

export function Approved() {
  return <ArcanaSummaryTile tone="positive" icon="fa-solid fa-check" label="Aprovados" value="112" sub="hoje" />
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaSummaryTileComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-approved',
  standalone: true,
  imports: [ArcanaSummaryTileComponent],
  template: \`<div arcanaSummaryTile tone="positive" icon="fa-solid fa-check" label="Aprovados" value="112" sub="hoje"></div>\`
})
export class ApprovedComponent {}`,
    svelte: `<script lang="ts">
  import { ArcanaSummaryTile } from '@arcanalabs/ui-components/svelte'
</script>

<ArcanaSummaryTile tone="positive" icon="fa-solid fa-check" label="Aprovados" value="112" sub="hoje" />`
  },

  settingsList: {
    react: `import { useState } from 'react'
import { ArcanaSettingsList, ArcanaSettingsListItem, ArcanaSwitch } from '@arcanalabs/ui-components/react'

export function Settings() {
  const [enabled, setEnabled] = useState(true)
  return (
    <ArcanaSettingsList>
      <ArcanaSettingsListItem label="Recursos avançados" caption="Habilita funcionalidades internas.">
        <ArcanaSwitch value={enabled} onValueChange={setEnabled} ariaLabel="Recursos avançados" />
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
      <div arcanaSettingsListItem label="Recursos avançados" caption="Habilita funcionalidades internas.">
        <button arcanaSwitch [(value)]="enabled" ariaLabel="Recursos avançados"></button>
      </div>
    </div>
  \`
})
export class SettingsComponent {
  enabled = true
}`,
    svelte: `<script lang="ts">
  import { ArcanaSettingsList, ArcanaSettingsListItem, ArcanaSwitch } from '@arcanalabs/ui-components/svelte'
  let enabled = $state(true)
</script>

<ArcanaSettingsList>
  <ArcanaSettingsListItem label="Recursos avançados" caption="Habilita funcionalidades internas.">
    <ArcanaSwitch value={enabled} onValueChange={(v) => (enabled = v)} ariaLabel="Recursos avançados" />
  </ArcanaSettingsListItem>
</ArcanaSettingsList>`
  },

  settingsListGroup: {
    react: `import { ArcanaSettingsList, ArcanaSettingsListGroup, ArcanaSettingsListItem } from '@arcanalabs/ui-components/react'

export function OrderSettings() {
  return (
    <ArcanaSettingsList>
      <ArcanaSettingsListGroup title="Pedidos" icon="fa-solid fa-cart-shopping" iconColor="indigo" meta="2 configs">
        <ArcanaSettingsListItem label="Aceitar pedidos">…</ArcanaSettingsListItem>
      </ArcanaSettingsListGroup>
    </ArcanaSettingsList>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaSettingsListComponent, ArcanaSettingsListGroupComponent, ArcanaSettingsListItemComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-order-settings',
  standalone: true,
  imports: [ArcanaSettingsListComponent, ArcanaSettingsListGroupComponent, ArcanaSettingsListItemComponent],
  template: \`
    <div arcanaSettingsList>
      <section arcanaSettingsListGroup title="Pedidos" icon="fa-solid fa-cart-shopping" iconColor="indigo" meta="2 configs">
        <div arcanaSettingsListItem label="Aceitar pedidos">…</div>
      </section>
    </div>
  \`
})
export class OrderSettingsComponent {}`,
    svelte: `<script lang="ts">
  import { ArcanaSettingsList, ArcanaSettingsListGroup, ArcanaSettingsListItem } from '@arcanalabs/ui-components/svelte'
</script>

<ArcanaSettingsList>
  <ArcanaSettingsListGroup title="Pedidos" icon="fa-solid fa-cart-shopping" iconColor="indigo" meta="2 configs">
    <ArcanaSettingsListItem label="Aceitar pedidos">…</ArcanaSettingsListItem>
  </ArcanaSettingsListGroup>
</ArcanaSettingsList>`
  },

  settingsListItem: {
    react: `import { useState } from 'react'
import { ArcanaSettingsListItem, ArcanaSwitch } from '@arcanalabs/ui-components/react'

export function EmailRow() {
  const [notifyEmail, setNotifyEmail] = useState(true)
  return (
    <ArcanaSettingsListItem label="Notificações por e-mail" caption="Resumo diário.">
      <ArcanaSwitch value={notifyEmail} onValueChange={setNotifyEmail} ariaLabel="E-mail" />
    </ArcanaSettingsListItem>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaSettingsListItemComponent, ArcanaSwitchComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-email-row',
  standalone: true,
  imports: [ArcanaSettingsListItemComponent, ArcanaSwitchComponent],
  template: \`
    <div arcanaSettingsListItem label="Notificações por e-mail" caption="Resumo diário.">
      <button arcanaSwitch [(value)]="notifyEmail" ariaLabel="E-mail"></button>
    </div>
  \`
})
export class EmailRowComponent {
  notifyEmail = true
}`,
    svelte: `<script lang="ts">
  import { ArcanaSettingsListItem, ArcanaSwitch } from '@arcanalabs/ui-components/svelte'
  let notifyEmail = $state(true)
</script>

<ArcanaSettingsListItem label="Notificações por e-mail" caption="Resumo diário.">
  <ArcanaSwitch value={notifyEmail} onValueChange={(v) => (notifyEmail = v)} ariaLabel="E-mail" />
</ArcanaSettingsListItem>`
  },

  settingsEditableField: {
    react: `import { useState } from 'react'
import { ArcanaSettingsList, ArcanaSettingsEditableField } from '@arcanalabs/ui-components/react'

export function DiscountRow() {
  const [discount, setDiscount] = useState<string | number | boolean | null>('1500.00')
  return (
    <ArcanaSettingsList>
      <ArcanaSettingsEditableField
        label="Desconto 1ª compra"
        caption="Valor unitário aplicado."
        type="currency"
        value={discount}
        onValueChange={setDiscount}
        onSave={autoSave}
      />
    </ArcanaSettingsList>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaSettingsListComponent, ArcanaSettingsEditableFieldComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-discount-row',
  standalone: true,
  imports: [ArcanaSettingsListComponent, ArcanaSettingsEditableFieldComponent],
  template: \`
    <div arcanaSettingsList>
      <div arcanaSettingsEditableField label="Desconto 1ª compra" caption="Valor unitário aplicado." type="currency" [(value)]="discount" (save)="autoSave($event)"></div>
    </div>
  \`
})
export class DiscountRowComponent {
  discount: unknown = '1500.00'
  autoSave(value: unknown) { /* …persist */ }
}`,
    svelte: `<script lang="ts">
  import { ArcanaSettingsList, ArcanaSettingsEditableField } from '@arcanalabs/ui-components/svelte'

  let discount = $state<string | number | boolean | null>('1500.00')
  function autoSave(value: unknown) { /* …persist */ }
</script>

<ArcanaSettingsList>
  <ArcanaSettingsEditableField
    label="Desconto 1ª compra"
    caption="Valor unitário aplicado."
    type="currency"
    value={discount}
    onValueChange={(v) => (discount = v)}
    onSave={autoSave}
  />
</ArcanaSettingsList>`
  },

  notice: {
    react: `import { ArcanaNotice } from '@arcanalabs/ui-components/react'

export function Notices({ dismissed, onHide }) {
  return (
    <>
      <ArcanaNotice variant="warning" title="Pagamento manual">
        Pix e Boleto geram um link novo de cobrança a cada ciclo.
      </ArcanaNotice>
      {!dismissed && (
        <ArcanaNotice variant="destructive" title="Falha" dismissible onDismiss={onHide}>
          Tente novamente.
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
    <div arcanaNotice variant="warning" title="Pagamento manual">
      Pix e Boleto geram um link novo de cobrança a cada ciclo.
    </div>
    <div arcanaNotice variant="destructive" title="Falha" [dismissible]="true" (dismiss)="hide()">
      Tente novamente.
    </div>
  \`
})
export class NoticesComponent {
  hide() {}
}`,
    svelte: `<script lang="ts">
  import { ArcanaNotice } from '@arcanalabs/ui-components/svelte'
  function hide() {}
</script>

<ArcanaNotice variant="warning" title="Pagamento manual">
  Pix e Boleto geram um link novo de cobrança a cada ciclo.
</ArcanaNotice>
<ArcanaNotice variant="destructive" title="Falha" dismissible onDismiss={hide}>
  Tente novamente.
</ArcanaNotice>`
  },

  editFieldModal: {
    react: `import { useRef, useState } from 'react'
import { ArcanaEditFieldModal, ArcanaSelect, ArcanaButton, type ArcanaEditFieldModalHandle } from '@arcanalabs/ui-components/react'

export function PlanRow({ planOptions }) {
  const modal = useRef<ArcanaEditFieldModalHandle>(null)
  const [plan, setPlan] = useState('pro')
  function savePlan() {
    // …persist
    modal.current?.hide()
  }
  return (
    <>
      <ArcanaButton onClick={() => modal.current?.show()}>Alterar Plano</ArcanaButton>
      <ArcanaEditFieldModal ref={modal} title="Alterar Plano" onSave={savePlan}>
        <ArcanaSelect value={plan} onValueChange={(v) => setPlan(v as string)} options={planOptions} />
      </ArcanaEditFieldModal>
    </>
  )
}`,
    angular: `import { Component, Input } from '@angular/core'
import { ArcanaEditFieldModalComponent, ArcanaSelectComponent, ArcanaButtonComponent, type SelectOption } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-plan-row',
  standalone: true,
  imports: [ArcanaEditFieldModalComponent, ArcanaSelectComponent, ArcanaButtonComponent],
  template: \`
    <button arcanaButton (click)="m.show()">Alterar Plano</button>
    <div arcanaEditFieldModal #m title="Alterar Plano" (save)="savePlan(m)">
      <div arcanaSelect [(value)]="plan" [options]="planOptions"></div>
    </div>
  \`
})
export class PlanRowComponent {
  @Input() planOptions: SelectOption[] = []
  plan = 'pro'
  savePlan(m: ArcanaEditFieldModalComponent) {
    // …persist
    m.hide()
  }
}`,
    svelte: `<script lang="ts">
  import { ArcanaEditFieldModal, ArcanaSelect, ArcanaButton, type SelectOption } from '@arcanalabs/ui-components/svelte'

  let { planOptions }: { planOptions: SelectOption[] } = $props()
  let modal: ArcanaEditFieldModal
  let plan = $state('pro')
  function savePlan() {
    // …persist
    modal.hide()
  }
</script>

<ArcanaButton onClick={() => modal.show()}>Alterar Plano</ArcanaButton>
<ArcanaEditFieldModal bind:this={modal} title="Alterar Plano" onSave={savePlan}>
  <ArcanaSelect value={plan} onValueChange={(v) => (plan = v as string)} options={planOptions} />
</ArcanaEditFieldModal>`
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
    react: `import { ArcanaOnboardingPanel } from '@arcanalabs/ui-components/react'

export function CertificateSetup({ openCreate }) {
  return (
    <ArcanaOnboardingPanel
      icon="fa-solid fa-file-shield"
      title="Configure seu certificado"
      description="O certificado A1 é necessário para emitir NF-e."
      actionLabel="Configurar Certificado"
      onAction={openCreate}
    />
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaOnboardingPanelComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-certificate-setup',
  standalone: true,
  imports: [ArcanaOnboardingPanelComponent],
  template: \`
    <div arcanaOnboardingPanel
      icon="fa-solid fa-file-shield"
      title="Configure seu certificado"
      description="O certificado A1 é necessário para emitir NF-e."
      actionLabel="Configurar Certificado"
      (action)="openCreate()"></div>
  \`
})
export class CertificateSetupComponent {
  openCreate() {}
}`,
    svelte: `<script lang="ts">
  import { ArcanaOnboardingPanel } from '@arcanalabs/ui-components/svelte'
  export let openCreate: () => void
</script>

<ArcanaOnboardingPanel
  icon="fa-solid fa-file-shield"
  title="Configure seu certificado"
  description="O certificado A1 é necessário para emitir NF-e."
  actionLabel="Configurar Certificado"
  onAction={openCreate}
/>`
  },

  loadingOverlay: {
    react: `import { useState } from 'react'
import { ArcanaLoadingOverlay } from '@arcanalabs/ui-components/react'

export function Card() {
  const [saving, setSaving] = useState(false)
  return (
    <div style={{ position: 'relative' }}>
      {/* card content */}
      <ArcanaLoadingOverlay visible={saving} text="Salvando…" />
    </div>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ArcanaLoadingOverlayComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [ArcanaLoadingOverlayComponent],
  template: \`
    <div style="position: relative">
      <!-- card content -->
      <div arcanaLoadingOverlay [visible]="saving" text="Salvando…"></div>
    </div>
  \`
})
export class CardComponent {
  saving = false
}`,
    svelte: `<script lang="ts">
  import { ArcanaLoadingOverlay } from '@arcanalabs/ui-components/svelte'
  let saving = $state(false)
</script>

<div style="position: relative">
  <!-- card content -->
  <ArcanaLoadingOverlay visible={saving} text="Salvando…" />
</div>`
  },

  skeleton: {
    react: `import { ArcanaSkeleton } from '@arcanalabs/ui-components/react'

export function CardSkeleton() {
  return (
    <>
      <ArcanaSkeleton width="40px" height="40px" rounded="full" />
      <ArcanaSkeleton width="200px" height="14px" />
      <ArcanaSkeleton width="60%" height="12px" />
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
    <span arcanaSkeleton width="40px" height="40px" rounded="full"></span>
    <span arcanaSkeleton width="200px" height="14px"></span>
    <span arcanaSkeleton width="60%" height="12px"></span>
  \`
})
export class CardSkeletonComponent {}`,
    svelte: `<script lang="ts">
  import { ArcanaSkeleton } from '@arcanalabs/ui-components/svelte'
</script>

<ArcanaSkeleton width="40px" height="40px" rounded="full" />
<ArcanaSkeleton width="200px" height="14px" />
<ArcanaSkeleton width="60%" height="12px" />`
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
