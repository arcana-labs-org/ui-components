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
    react: `import { ShadcnButton } from '@arcanalabs/ui-components/react'

export function Toolbar() {
  function save() {
    // …persist changes
  }
  return (
    <>
      <ShadcnButton variant="primary" onClick={save}>Save</ShadcnButton>
      <ShadcnButton variant="outline">Cancel</ShadcnButton>
      <ShadcnButton variant="destructive" disabled={busy}>Delete</ShadcnButton>
    </>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ShadcnButtonComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [ShadcnButtonComponent],
  template: \`
    <button arcanaShadcnButton variant="primary" (click)="save()">Save</button>
    <button arcanaShadcnButton variant="outline">Cancel</button>
    <button arcanaShadcnButton variant="destructive" [disabled]="busy">Delete</button>
  \`
})
export class ToolbarComponent {
  busy = false
  save() { /* …persist changes */ }
}`,
    svelte: `<script lang="ts">
  import { ShadcnButton } from '@arcanalabs/ui-components/svelte'

  let busy = $state(false)
  function save() {
    // …persist changes
  }
</script>

<ShadcnButton variant="primary" onClick={save}>Save</ShadcnButton>
<ShadcnButton variant="outline">Cancel</ShadcnButton>
<ShadcnButton variant="destructive" disabled={busy}>Delete</ShadcnButton>`
  },

  badge: {
    react: `import { ShadcnBadge } from '@arcanalabs/ui-components/react'

export function Statuses() {
  return (
    <>
      <ShadcnBadge variant="green" dot>Active</ShadcnBadge>
      <ShadcnBadge variant="blue">12 records</ShadcnBadge>
      <ShadcnBadge variant="red" size="sm">Overdue</ShadcnBadge>
    </>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ShadcnBadgeComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-statuses',
  standalone: true,
  imports: [ShadcnBadgeComponent],
  template: \`
    <span arcanaShadcnBadge variant="green" [dot]="true">Active</span>
    <span arcanaShadcnBadge variant="blue">12 records</span>
    <span arcanaShadcnBadge variant="red" size="sm">Overdue</span>
  \`
})
export class StatusesComponent {}`,
    svelte: `<script lang="ts">
  import { ShadcnBadge } from '@arcanalabs/ui-components/svelte'
</script>

<ShadcnBadge variant="green" dot>Active</ShadcnBadge>
<ShadcnBadge variant="blue">12 records</ShadcnBadge>
<ShadcnBadge variant="red" size="sm">Overdue</ShadcnBadge>`
  },

  input: {
    react: `import { useState } from 'react'
import { ShadcnInput } from '@arcanalabs/ui-components/react'

export function Fields() {
  const [email, setEmail] = useState('')
  const [qty, setQty] = useState<number | null>(null)
  return (
    <>
      <ShadcnInput value={email} onValueChange={(v) => setEmail(v as string)} type="email" placeholder="email@company.com" />
      <ShadcnInput value={qty} onValueChange={(v) => setQty(v as number | null)} type="number" min={0} max={99} />
    </>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ShadcnInputComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-fields',
  standalone: true,
  imports: [ShadcnInputComponent],
  template: \`
    <input arcanaShadcnInput [(value)]="email" type="email" placeholder="email@company.com" />
    <input arcanaShadcnInput [(value)]="qty" type="number" [min]="0" [max]="99" />
  \`
})
export class FieldsComponent {
  email: string | number | null = ''
  qty: string | number | null = null
}`,
    svelte: `<script lang="ts">
  import { ShadcnInput } from '@arcanalabs/ui-components/svelte'

  let email = $state('')
  let qty = $state<number | null>(null)
</script>

<ShadcnInput value={email} onValueChange={(v) => (email = v as string)} type="email" placeholder="email@company.com" />
<ShadcnInput value={qty} onValueChange={(v) => (qty = v as number | null)} type="number" min={0} max={99} />`
  },

  select: {
    react: `import { useState } from 'react'
import { ShadcnSelect, type SelectOption } from '@arcanalabs/ui-components/react'

const options: SelectOption[] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry', description: 'seasonal' },
]

export function FruitPicker() {
  const [fruit, setFruit] = useState<string | null>(null)
  return (
    <ShadcnSelect value={fruit} onValueChange={(v) => setFruit(v as string | null)} options={options} searchable placeholder="Pick a fruit" />
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ShadcnSelectComponent, type SelectOption } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-fruit-picker',
  standalone: true,
  imports: [ShadcnSelectComponent],
  template: \`
    <div arcanaShadcnSelect [(value)]="fruit" [options]="options" [searchable]="true" placeholder="Pick a fruit"></div>
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
  import { ShadcnSelect, type SelectOption } from '@arcanalabs/ui-components/svelte'

  let fruit = $state<string | null>(null)
  const options: SelectOption[] = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Cherry', value: 'cherry', description: 'seasonal' },
  ]
</script>

<ShadcnSelect value={fruit} onValueChange={(v) => (fruit = v as string | null)} {options} searchable placeholder="Pick a fruit" />`
  },

  checkbox: {
    react: `import { useState } from 'react'
import { ShadcnCheckbox } from '@arcanalabs/ui-components/react'

export function Terms() {
  const [accepted, setAccepted] = useState(false)
  return <ShadcnCheckbox value={accepted} onValueChange={setAccepted} label="I accept the terms" />
}`,
    angular: `import { Component } from '@angular/core'
import { ShadcnCheckboxComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [ShadcnCheckboxComponent],
  template: \`<label arcanaShadcnCheckbox [(value)]="accepted" label="I accept the terms"></label>\`
})
export class TermsComponent {
  accepted = false
}`,
    svelte: `<script lang="ts">
  import { ShadcnCheckbox } from '@arcanalabs/ui-components/svelte'
  let accepted = $state(false)
</script>

<ShadcnCheckbox value={accepted} onValueChange={(v) => (accepted = v)} label="I accept the terms" />`
  },

  switch: {
    react: `import { useState } from 'react'
import { ShadcnSwitch } from '@arcanalabs/ui-components/react'

export function AutoRenew() {
  const [autoRenew, setAutoRenew] = useState(true)
  return (
    <label className="form-row">
      <span>Auto-renew</span>
      <ShadcnSwitch value={autoRenew} onValueChange={setAutoRenew} ariaLabel="Auto-renew" />
    </label>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ShadcnSwitchComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-auto-renew',
  standalone: true,
  imports: [ShadcnSwitchComponent],
  template: \`
    <label class="form-row">
      <span>Auto-renew</span>
      <button arcanaShadcnSwitch [(value)]="autoRenew" ariaLabel="Auto-renew"></button>
    </label>
  \`
})
export class AutoRenewComponent {
  autoRenew = true
}`,
    svelte: `<script lang="ts">
  import { ShadcnSwitch } from '@arcanalabs/ui-components/svelte'
  let autoRenew = $state(true)
</script>

<label class="form-row">
  <span>Auto-renew</span>
  <ShadcnSwitch value={autoRenew} onValueChange={(v) => (autoRenew = v)} ariaLabel="Auto-renew" />
</label>`
  },

  tabs: {
    react: `import { useState } from 'react'
import { ShadcnTabs, type ShadcnTabItem } from '@arcanalabs/ui-components/react'

const tabs: ShadcnTabItem[] = [
  { name: 'overview', label: 'Overview' },
  { name: 'activity', label: 'Activity', badge: 3 },
  { name: 'settings', label: 'Settings' },
]

export function Panel() {
  const [active, setActive] = useState<string | number>('overview')
  return (
    <ShadcnTabs
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
import { ShadcnTabsComponent, ArcanaTabPanelDirective, type ShadcnTabItem } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [ShadcnTabsComponent, ArcanaTabPanelDirective],
  template: \`
    <div arcanaShadcnTabs [(value)]="active" [tabs]="tabs" variant="pills">
      <ng-container *arcanaTabPanel="'overview'">Overview…</ng-container>
      <ng-container *arcanaTabPanel="'activity'">Activity…</ng-container>
      <ng-container *arcanaTabPanel="'settings'">Settings…</ng-container>
    </div>
  \`
})
export class PanelComponent {
  active: string | number = 'overview'
  tabs: ShadcnTabItem[] = [
    { name: 'overview', label: 'Overview' },
    { name: 'activity', label: 'Activity', badge: 3 },
    { name: 'settings', label: 'Settings' },
  ]
}`,
    svelte: `<script lang="ts">
  import { ShadcnTabs, type ShadcnTabItem } from '@arcanalabs/ui-components/svelte'

  let active = $state<string | number>('overview')
  const tabs: ShadcnTabItem[] = [
    { name: 'overview', label: 'Overview' },
    { name: 'activity', label: 'Activity', badge: 3 },
    { name: 'settings', label: 'Settings' },
  ]
</script>

{#snippet overview()}<div>Overview…</div>{/snippet}
{#snippet activity()}<div>Activity…</div>{/snippet}
{#snippet settings()}<div>Settings…</div>{/snippet}

<ShadcnTabs value={active} onValueChange={(v) => (active = v)} {tabs} variant="pills" panels={{ overview, activity, settings }} />`
  },

  dialog: {
    react: `import { useRef } from 'react'
import { ShadcnDialog, ShadcnButton, type ShadcnDialogHandle } from '@arcanalabs/ui-components/react'

export function DeleteDialog() {
  const dialog = useRef<ShadcnDialogHandle>(null)
  return (
    <>
      <ShadcnButton onClick={() => dialog.current?.show()}>Open</ShadcnButton>

      <ShadcnDialog
        ref={dialog}
        title="Delete workspace"
        description="This cannot be undone."
        footer={(hide) => (
          <>
            <ShadcnButton variant="outline" onClick={hide}>Cancel</ShadcnButton>
            <ShadcnButton variant="destructive" onClick={hide}>Delete</ShadcnButton>
          </>
        )}
      >
        <p>Body content…</p>
      </ShadcnDialog>
    </>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ShadcnDialogComponent, ShadcnButtonComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [ShadcnDialogComponent, ShadcnButtonComponent],
  template: \`
    <button arcanaShadcnButton (click)="d.show()">Open</button>

    <div arcanaShadcnDialog #d title="Delete workspace" description="This cannot be undone." [footerTemplate]="ft">
      <p>Body content…</p>
    </div>
    <ng-template #ft let-hide>
      <button arcanaShadcnButton variant="outline" (click)="hide()">Cancel</button>
      <button arcanaShadcnButton variant="destructive" (click)="hide()">Delete</button>
    </ng-template>
  \`
})
export class DeleteDialogComponent {}`,
    svelte: `<script lang="ts">
  import { ShadcnDialog, ShadcnButton } from '@arcanalabs/ui-components/svelte'

  let dialog: ShadcnDialog
</script>

<ShadcnButton onClick={() => dialog.show()}>Open</ShadcnButton>

<ShadcnDialog bind:this={dialog} title="Delete workspace" description="This cannot be undone.">
  <p>Body content…</p>
  {#snippet footer(hide)}
    <ShadcnButton variant="outline" onClick={hide}>Cancel</ShadcnButton>
    <ShadcnButton variant="destructive" onClick={hide}>Delete</ShadcnButton>
  {/snippet}
</ShadcnDialog>`
  },

  inputMask: {
    react: `import { useState } from 'react'
import { ShadcnInputMask } from '@arcanalabs/ui-components/react'
// Masking is built into the component — no global directive needed.

export function Document() {
  const [cpf, setCpf] = useState('')
  const [phone, setPhone] = useState('')
  return (
    <>
      <ShadcnInputMask value={cpf} onValueChange={setCpf} mask="###.###.###-##" placeholder="CPF" />
      <ShadcnInputMask value={phone} onValueChange={setPhone} mask={['(##) ####-####', '(##) #####-####']} />
    </>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ShadcnInputMaskComponent } from '@arcanalabs/ui-components/angular'

// Masking is built into the component — no global directive needed.
@Component({
  selector: 'app-document',
  standalone: true,
  imports: [ShadcnInputMaskComponent],
  template: \`
    <input arcanaShadcnInputMask [(value)]="cpf" mask="###.###.###-##" placeholder="CPF" />
    <input arcanaShadcnInputMask [(value)]="phone" [mask]="['(##) ####-####', '(##) #####-####']" />
  \`
})
export class DocumentComponent {
  cpf = ''
  phone = ''
}`,
    svelte: `<script lang="ts">
  import { ShadcnInputMask } from '@arcanalabs/ui-components/svelte'
  // Masking is built into the component — no global directive needed.
  let cpf = $state('')
  let phone = $state('')
</script>

<ShadcnInputMask value={cpf} onValueChange={(v) => (cpf = v)} mask="###.###.###-##" placeholder="CPF" />
<ShadcnInputMask value={phone} onValueChange={(v) => (phone = v)} mask={['(##) ####-####', '(##) #####-####']} />`
  },

  inputBoolean: {
    react: `import { useState } from 'react'
import { ShadcnInputBoolean } from '@arcanalabs/ui-components/react'

export function ActiveFilter() {
  const [active, setActive] = useState<unknown>(1)
  return <ShadcnInputBoolean value={active} onValueChange={setActive} variation="status" clearable={false} />
}`,
    angular: `import { Component } from '@angular/core'
import { ShadcnInputBooleanComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-active-filter',
  standalone: true,
  imports: [ShadcnInputBooleanComponent],
  template: \`<div arcanaShadcnInputBoolean [(value)]="active" variation="status" [clearable]="false"></div>\`
})
export class ActiveFilterComponent {
  active: unknown = 1
}`,
    svelte: `<script lang="ts">
  import { ShadcnInputBoolean } from '@arcanalabs/ui-components/svelte'
  let active = $state<unknown>(1)
</script>

<ShadcnInputBoolean value={active} onValueChange={(v) => (active = v)} variation="status" clearable={false} />`
  },

  numberStepper: {
    react: `import { useState } from 'react'
import { ShadcnNumberStepper } from '@arcanalabs/ui-components/react'

export function Quantity() {
  const [qty, setQty] = useState<number | null>(1)
  return <ShadcnNumberStepper value={qty} onValueChange={setQty} min={0} max={10} ariaLabel="Quantity" />
}`,
    angular: `import { Component } from '@angular/core'
import { ShadcnNumberStepperComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-quantity',
  standalone: true,
  imports: [ShadcnNumberStepperComponent],
  template: \`<div arcanaShadcnNumberStepper [(value)]="qty" [min]="0" [max]="10" ariaLabel="Quantity"></div>\`
})
export class QuantityComponent {
  qty: number | null = 1
}`,
    svelte: `<script lang="ts">
  import { ShadcnNumberStepper } from '@arcanalabs/ui-components/svelte'
  let qty = $state<number | null>(1)
</script>

<ShadcnNumberStepper value={qty} onValueChange={(v) => (qty = v)} min={0} max={10} ariaLabel="Quantity" />`
  },

  multiSelectPopover: {
    react: `import { useState } from 'react'
import { MultiSelectPopover, type MultiSelectTab } from '@arcanalabs/ui-components/react'

const tabs: MultiSelectTab[] = [
  { key: 'USER', label: 'Users', icon: 'fa-solid fa-user', fetch: loadUsers },
  { key: 'DEPARTMENT', label: 'Departments', icon: 'fa-solid fa-sitemap', fetch: loadDepts },
]

export function AssigneePicker() {
  const [selections, setSelections] = useState<Record<string, number[]>>({ USER: [], DEPARTMENT: [] })
  return <MultiSelectPopover value={selections} onValueChange={setSelections} tabs={tabs} emptyLabel="Select people" />
}`,
    angular: `import { Component } from '@angular/core'
import { MultiSelectPopoverComponent, type MultiSelectTab } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-assignee-picker',
  standalone: true,
  imports: [MultiSelectPopoverComponent],
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
  import { MultiSelectPopover, type MultiSelectTab } from '@arcanalabs/ui-components/svelte'

  let selections = $state<Record<string, number[]>>({ USER: [], DEPARTMENT: [] })
  const tabs: MultiSelectTab[] = [
    { key: 'USER', label: 'Users', icon: 'fa-solid fa-user', fetch: loadUsers },
    { key: 'DEPARTMENT', label: 'Departments', icon: 'fa-solid fa-sitemap', fetch: loadDepts },
  ]
</script>

<MultiSelectPopover value={selections} onValueChange={(v) => (selections = v)} {tabs} emptyLabel="Select people" />`
  },

  radioCardGroup: {
    react: `import { useState } from 'react'
import { ShadcnRadioCardGroup, type RadioCardOption } from '@arcanalabs/ui-components/react'

const options: RadioCardOption[] = [
  { label: 'Credit card', value: 'credit_card', description: 'Recurring charge.' },
  { label: 'Pix', value: 'pix', badge: 'Recommended' },
]

export function PaymentMethod() {
  const [method, setMethod] = useState<string | number | boolean | null>('pix')
  return <ShadcnRadioCardGroup value={method} onValueChange={setMethod} options={options} ariaLabel="Payment method" />
}`,
    angular: `import { Component } from '@angular/core'
import { ShadcnRadioCardGroupComponent, type RadioCardOption } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-payment-method',
  standalone: true,
  imports: [ShadcnRadioCardGroupComponent],
  template: \`<div arcanaShadcnRadioCardGroup [(value)]="method" [options]="options" ariaLabel="Payment method"></div>\`
})
export class PaymentMethodComponent {
  method: string | number | boolean | null = 'pix'
  options: RadioCardOption[] = [
    { label: 'Credit card', value: 'credit_card', description: 'Recurring charge.' },
    { label: 'Pix', value: 'pix', badge: 'Recommended' },
  ]
}`,
    svelte: `<script lang="ts">
  import { ShadcnRadioCardGroup, type RadioCardOption } from '@arcanalabs/ui-components/svelte'

  let method = $state<string | number | boolean | null>('pix')
  const options: RadioCardOption[] = [
    { label: 'Credit card', value: 'credit_card', description: 'Recurring charge.' },
    { label: 'Pix', value: 'pix', badge: 'Recommended' },
  ]
</script>

<ShadcnRadioCardGroup value={method} onValueChange={(v) => (method = v)} {options} ariaLabel="Payment method" />`
  },

  segmentedOptions: {
    react: `import { useState } from 'react'
import { ShadcnSegmentedOptions, type SegmentedOption } from '@arcanalabs/ui-components/react'

const options: SegmentedOption[] = [
  { label: 'List', value: 'list' },
  { label: 'Grid', value: 'grid' },
]

export function ViewMode() {
  const [view, setView] = useState<string | number | null>('list')
  return <ShadcnSegmentedOptions value={view} onValueChange={setView} options={options} ariaLabel="View mode" />
}`,
    angular: `import { Component } from '@angular/core'
import { ShadcnSegmentedOptionsComponent, type SegmentedOption } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-view-mode',
  standalone: true,
  imports: [ShadcnSegmentedOptionsComponent],
  template: \`<div arcanaShadcnSegmentedOptions [(value)]="view" [options]="options" ariaLabel="View mode"></div>\`
})
export class ViewModeComponent {
  view: string | number | null = 'list'
  options: SegmentedOption[] = [
    { label: 'List', value: 'list' },
    { label: 'Grid', value: 'grid' },
  ]
}`,
    svelte: `<script lang="ts">
  import { ShadcnSegmentedOptions, type SegmentedOption } from '@arcanalabs/ui-components/svelte'

  let view = $state<string | number | null>('list')
  const options: SegmentedOption[] = [
    { label: 'List', value: 'list' },
    { label: 'Grid', value: 'grid' },
  ]
</script>

<ShadcnSegmentedOptions value={view} onValueChange={(v) => (view = v)} {options} ariaLabel="View mode" />`
  },

  datePicker: {
    react: `import { useState } from 'react'
import { ShadcnDatePicker } from '@arcanalabs/ui-components/react'
// Masking is built into the component — no global directive needed.

export function BirthDate() {
  const [date, setDate] = useState<string | null>('2026-07-24')
  return <ShadcnDatePicker value={date} onValueChange={setDate} />
}`,
    angular: `import { Component } from '@angular/core'
import { ShadcnDatePickerComponent } from '@arcanalabs/ui-components/angular'

// Masking is built into the component — no global directive needed.
@Component({
  selector: 'app-birth-date',
  standalone: true,
  imports: [ShadcnDatePickerComponent],
  template: \`<div arcanaShadcnDatePicker [(value)]="date"></div>\`
})
export class BirthDateComponent {
  date: string | null = '2026-07-24'
}`,
    svelte: `<script lang="ts">
  import { ShadcnDatePicker } from '@arcanalabs/ui-components/svelte'
  // Masking is built into the component — no global directive needed.
  let date = $state<string | null>('2026-07-24')
</script>

<ShadcnDatePicker value={date} onValueChange={(v) => (date = v)} />`
  },

  inputCurrency: {
    react: `import { useState } from 'react'
import { InputCurrency } from '@arcanalabs/ui-components/react'

export function Price() {
  const [price, setPrice] = useState('1500.00')
  return <InputCurrency value={price} onValueChange={setPrice} shadcn />
}`,
    angular: `import { Component } from '@angular/core'
import { InputCurrencyComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-price',
  standalone: true,
  imports: [InputCurrencyComponent],
  template: \`<div arcanaInputCurrency [(value)]="price" [shadcn]="true"></div>\`
})
export class PriceComponent {
  price = '1500.00'
}`,
    svelte: `<script lang="ts">
  import { InputCurrency } from '@arcanalabs/ui-components/svelte'
  let price = $state('1500.00')
</script>

<InputCurrency value={price} onValueChange={(v) => (price = v)} shadcn />`
  },

  labeledButton: {
    react: `import { LabeledButton } from '@arcanalabs/ui-components/react'

export function Actions() {
  return (
    <>
      <LabeledButton shadcn label="Save" color="green-600" icon="fa-solid fa-check" onClick={save} />
      <LabeledButton shadcn label="Saving…" color="green-600" loading={busy} />
    </>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { LabeledButtonComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-actions',
  standalone: true,
  imports: [LabeledButtonComponent],
  template: \`
    <button arcanaLabeledButton [shadcn]="true" label="Save" color="green-600" icon="fa-solid fa-check" (click)="save()"></button>
    <button arcanaLabeledButton [shadcn]="true" label="Saving…" color="green-600" [loading]="busy"></button>
  \`
})
export class ActionsComponent {
  busy = false
  save() {}
}`,
    svelte: `<script lang="ts">
  import { LabeledButton } from '@arcanalabs/ui-components/svelte'

  let busy = $state(false)
  function save() {}
</script>

<LabeledButton shadcn label="Save" color="green-600" icon="fa-solid fa-check" onClick={save} />
<LabeledButton shadcn label="Saving…" color="green-600" loading={busy} />`
  },

  accordion: {
    react: `import { useState } from 'react'
import { ShadcnAccordion, ShadcnAccordionItem } from '@arcanalabs/ui-components/react'

export function Faq() {
  const [open, setOpen] = useState<string | string[] | null>('shipping')
  return (
    <ShadcnAccordion value={open} onValueChange={setOpen}>
      <ShadcnAccordionItem name="shipping" title="Shipping">Ships in 2–3 days.</ShadcnAccordionItem>
      <ShadcnAccordionItem name="returns" title="Returns">30-day free returns.</ShadcnAccordionItem>
    </ShadcnAccordion>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ShadcnAccordionComponent, ShadcnAccordionItemComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [ShadcnAccordionComponent, ShadcnAccordionItemComponent],
  template: \`
    <div arcanaShadcnAccordion [(value)]="open">
      <div arcanaShadcnAccordionItem name="shipping" title="Shipping">Ships in 2–3 days.</div>
      <div arcanaShadcnAccordionItem name="returns" title="Returns">30-day free returns.</div>
    </div>
  \`
})
export class FaqComponent {
  open: string | string[] | null = 'shipping'
}`,
    svelte: `<script lang="ts">
  import { ShadcnAccordion, ShadcnAccordionItem } from '@arcanalabs/ui-components/svelte'
  let open = $state<string | string[] | null>('shipping')
</script>

<ShadcnAccordion value={open} onValueChange={(v) => (open = v)}>
  <ShadcnAccordionItem name="shipping" title="Shipping">Ships in 2–3 days.</ShadcnAccordionItem>
  <ShadcnAccordionItem name="returns" title="Returns">30-day free returns.</ShadcnAccordionItem>
</ShadcnAccordion>`
  },

  accordionItem: {
    react: `import { useState } from 'react'
import { ShadcnAccordion, ShadcnAccordionItem } from '@arcanalabs/ui-components/react'

export function Details() {
  // Multiple-open mode: value is an array of open names.
  const [open, setOpen] = useState<string[]>(['specs'])
  return (
    <ShadcnAccordion value={open} onValueChange={(v) => setOpen(v as string[])} accordion={false}>
      <ShadcnAccordionItem name="specs" title="Specifications">Weight, dimensions…</ShadcnAccordionItem>
      <ShadcnAccordionItem name="care" title={<span>Care <strong>instructions</strong></span>}>Hand wash cold.</ShadcnAccordionItem>
    </ShadcnAccordion>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ShadcnAccordionComponent, ShadcnAccordionItemComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [ShadcnAccordionComponent, ShadcnAccordionItemComponent],
  template: \`
    <!-- Multiple-open mode: value is an array of open names. -->
    <div arcanaShadcnAccordion [(value)]="open" [accordion]="false">
      <div arcanaShadcnAccordionItem name="specs" title="Specifications">Weight, dimensions…</div>
      <div arcanaShadcnAccordionItem name="care" title="Care instructions">Hand wash cold.</div>
    </div>
  \`
})
export class DetailsComponent {
  open: string[] = ['specs']
}`,
    svelte: `<script lang="ts">
  import { ShadcnAccordion, ShadcnAccordionItem } from '@arcanalabs/ui-components/svelte'
  // Multiple-open mode: value is an array of open names.
  let open = $state<string[]>(['specs'])
</script>

<ShadcnAccordion value={open} onValueChange={(v) => (open = v as string[])} accordion={false}>
  <ShadcnAccordionItem name="specs" title="Specifications">Weight, dimensions…</ShadcnAccordionItem>
  <ShadcnAccordionItem name="care">
    {#snippet title()}Care <strong>instructions</strong>{/snippet}
    Hand wash cold.
  </ShadcnAccordionItem>
</ShadcnAccordion>`
  },

  dropdown: {
    react: `import { ShadcnDropdown, ShadcnDropdownItem, ShadcnButton } from '@arcanalabs/ui-components/react'

export function RowActions() {
  return (
    <ShadcnDropdown placement="bottom-start" trigger={<ShadcnButton variant="outline">Actions ▾</ShadcnButton>}>
      <ShadcnDropdownItem icon="fa-solid fa-pen" onClick={rename}>Rename</ShadcnDropdownItem>
      <ShadcnDropdownItem icon="fa-solid fa-trash" variant="danger" divided onClick={del}>Delete</ShadcnDropdownItem>
    </ShadcnDropdown>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ShadcnDropdownComponent, ShadcnDropdownItemComponent, ShadcnButtonComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-row-actions',
  standalone: true,
  imports: [ShadcnDropdownComponent, ShadcnDropdownItemComponent, ShadcnButtonComponent],
  template: \`
    <div arcanaShadcnDropdown placement="bottom-start">
      <button arcanaDropdownTrigger arcanaShadcnButton variant="outline">Actions ▾</button>
      <div arcanaShadcnDropdownItem icon="fa-solid fa-pen" (click)="rename()">Rename</div>
      <div arcanaShadcnDropdownItem icon="fa-solid fa-trash" variant="danger" [divided]="true" (click)="del()">Delete</div>
    </div>
  \`
})
export class RowActionsComponent {
  rename() {}
  del() {}
}`,
    svelte: `<script lang="ts">
  import { ShadcnDropdown, ShadcnDropdownItem, ShadcnButton } from '@arcanalabs/ui-components/svelte'
  function rename() {}
  function del() {}
</script>

<ShadcnDropdown placement="bottom-start">
  {#snippet trigger({ toggle })}
    <ShadcnButton variant="outline" onClick={toggle}>Actions ▾</ShadcnButton>
  {/snippet}
  <ShadcnDropdownItem icon="fa-solid fa-pen" onClick={rename}>Rename</ShadcnDropdownItem>
  <ShadcnDropdownItem icon="fa-solid fa-trash" variant="danger" divided onClick={del}>Delete</ShadcnDropdownItem>
</ShadcnDropdown>`
  },

  dropdownItem: {
    react: `import { ShadcnDropdown, ShadcnDropdownItem } from '@arcanalabs/ui-components/react'

export function Menu() {
  return (
    <ShadcnDropdown size="comfortable" trigger={<button>Menu ▾</button>}>
      <ShadcnDropdownItem icon="fa-solid fa-user" suffix={<span>⌘P</span>}>Profile</ShadcnDropdownItem>
      <ShadcnDropdownItem variant="danger" divided onClick={del}>Delete</ShadcnDropdownItem>
    </ShadcnDropdown>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ShadcnDropdownComponent, ShadcnDropdownItemComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [ShadcnDropdownComponent, ShadcnDropdownItemComponent],
  template: \`
    <div arcanaShadcnDropdown size="comfortable">
      <button arcanaDropdownTrigger>Menu ▾</button>
      <div arcanaShadcnDropdownItem icon="fa-solid fa-user" suffix="⌘P">Profile</div>
      <div arcanaShadcnDropdownItem variant="danger" [divided]="true" (click)="del()">Delete</div>
    </div>
  \`
})
export class MenuComponent {
  del() {}
}`,
    svelte: `<script lang="ts">
  import { ShadcnDropdown, ShadcnDropdownItem } from '@arcanalabs/ui-components/svelte'
  function del() {}
</script>

<ShadcnDropdown size="comfortable">
  {#snippet trigger({ toggle })}<button onclick={toggle}>Menu ▾</button>{/snippet}
  <ShadcnDropdownItem icon="fa-solid fa-user">
    Profile
    {#snippet suffix()}⌘P{/snippet}
  </ShadcnDropdownItem>
  <ShadcnDropdownItem variant="danger" divided onClick={del}>Delete</ShadcnDropdownItem>
</ShadcnDropdown>`
  },

  table: {
    react: `import { ShadcnTable, type ShadcnTableColumn } from '@arcanalabs/ui-components/react'

const columns: ShadcnTableColumn[] = [
  { key: 'sku', label: 'SKU', width: '96px' },
  { key: 'name', label: 'Product', render: ({ row }) => <strong>{row.name}</strong> },
  { key: 'total', label: 'Total', align: 'right', valueGetter: (v) => 'R$ ' + Number(v).toFixed(2) },
]
const rows = [{ sku: 'GLP-13', name: 'Botijão P13', total: 260 }]

export function ProductsTable() {
  return (
    <ShadcnTable columns={columns} rows={rows} footer={
      <tr><td colSpan={2}>Total</td><td className="shadcn-table__td--right">R$ 260,00</td></tr>
    } />
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ShadcnTableComponent, type ShadcnTableColumn } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-products-table',
  standalone: true,
  imports: [ShadcnTableComponent],
  template: \`
    <div arcanaShadcnTable [columns]="columns" [rows]="rows" [cellTemplates]="{ name: nameCell }" [footerTemplate]="foot"></div>
    <ng-template #nameCell let-row="row"><strong>{{ row.name }}</strong></ng-template>
    <ng-template #foot><tr><td colspan="2">Total</td><td class="shadcn-table__td--right">R$ 260,00</td></tr></ng-template>
  \`
})
export class ProductsTableComponent {
  columns: ShadcnTableColumn[] = [
    { key: 'sku', label: 'SKU', width: '96px' },
    { key: 'name', label: 'Product' },
    { key: 'total', label: 'Total', align: 'right', valueGetter: (v) => 'R$ ' + Number(v).toFixed(2) },
  ]
  rows = [{ sku: 'GLP-13', name: 'Botijão P13', total: 260 }]
}`,
    svelte: `<script lang="ts">
  import { ShadcnTable, type ShadcnTableColumn } from '@arcanalabs/ui-components/svelte'

  const columns: ShadcnTableColumn[] = [
    { key: 'sku', label: 'SKU', width: '96px' },
    { key: 'name', label: 'Product', render: nameCell },
    { key: 'total', label: 'Total', align: 'right', valueGetter: (v) => 'R$ ' + Number(v).toFixed(2) },
  ]
  const rows = [{ sku: 'GLP-13', name: 'Botijão P13', total: 260 }]
</script>

{#snippet nameCell({ row })}<strong>{row.name}</strong>{/snippet}

<ShadcnTable {columns} {rows}>
  {#snippet footer()}<tr><td colspan="2">Total</td><td class="shadcn-table__td--right">R$ 260,00</td></tr>{/snippet}
</ShadcnTable>`
  },

  specSheet: {
    react: `import { ShadcnSpecSheet, ShadcnSpecSheetSection, ShadcnSpecSheetField, ShadcnButton } from '@arcanalabs/ui-components/react'

export function OrgSheet() {
  return (
    <ShadcnSpecSheet
      docNum="Cadastro Nº 042"
      title="Popgás Distribuidora"
      metaLabel="Status"
      meta={<span className="shadcn-spec-sheet-badge shadcn-spec-sheet-badge--active">Ativo</span>}
      footer={<ShadcnButton variant="outline">Alterar Dados</ShadcnButton>}
    >
      <ShadcnSpecSheetSection title="Dados Cadastrais" sectionNum="§ 01" icon="fa-solid fa-building" iconColor="blue">
        <ShadcnSpecSheetField label="Razão Social" value={form.trading_name} span={2} />
        <ShadcnSpecSheetField label="CNPJ" value={form.document_number} />
      </ShadcnSpecSheetSection>
    </ShadcnSpecSheet>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ShadcnSpecSheetComponent, ShadcnSpecSheetSectionComponent, ShadcnSpecSheetFieldComponent, ShadcnButtonComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-org-sheet',
  standalone: true,
  imports: [ShadcnSpecSheetComponent, ShadcnSpecSheetSectionComponent, ShadcnSpecSheetFieldComponent, ShadcnButtonComponent],
  template: \`
    <article arcanaShadcnSpecSheet docNum="Cadastro Nº 042" title="Popgás Distribuidora" metaLabel="Status" [metaTemplate]="meta" [footerTemplate]="foot">
      <section arcanaShadcnSpecSheetSection title="Dados Cadastrais" sectionNum="§ 01" icon="fa-solid fa-building" iconColor="blue">
        <div arcanaShadcnSpecSheetField label="Razão Social" [value]="form.trading_name" [span]="2"></div>
        <div arcanaShadcnSpecSheetField label="CNPJ" [value]="form.document_number"></div>
      </section>
    </article>
    <ng-template #meta><span class="shadcn-spec-sheet-badge shadcn-spec-sheet-badge--active">Ativo</span></ng-template>
    <ng-template #foot><button arcanaShadcnButton variant="outline">Alterar Dados</button></ng-template>
  \`
})
export class OrgSheetComponent {
  form = { trading_name: 'Popgás Distribuidora de Gás LTDA', document_number: '12.345.678/0001-90' }
}`,
    svelte: `<script lang="ts">
  import { ShadcnSpecSheet, ShadcnSpecSheetSection, ShadcnSpecSheetField, ShadcnButton } from '@arcanalabs/ui-components/svelte'
  const form = { trading_name: 'Popgás Distribuidora de Gás LTDA', document_number: '12.345.678/0001-90' }
</script>

<ShadcnSpecSheet docNum="Cadastro Nº 042" title="Popgás Distribuidora" metaLabel="Status">
  {#snippet meta()}<span class="shadcn-spec-sheet-badge shadcn-spec-sheet-badge--active">Ativo</span>{/snippet}
  <ShadcnSpecSheetSection title="Dados Cadastrais" sectionNum="§ 01" icon="fa-solid fa-building" iconColor="blue">
    <ShadcnSpecSheetField label="Razão Social" value={form.trading_name} span={2} />
    <ShadcnSpecSheetField label="CNPJ" value={form.document_number} />
  </ShadcnSpecSheetSection>
  {#snippet footer()}<ShadcnButton variant="outline">Alterar Dados</ShadcnButton>{/snippet}
</ShadcnSpecSheet>`
  },

  specSheetSection: {
    react: `import { ShadcnSpecSheetSection, ShadcnSpecSheetField, ShadcnButton } from '@arcanalabs/ui-components/react'

// Nested inside a <ShadcnSpecSheet>.
export function Financials() {
  return (
    <ShadcnSpecSheetSection
      title="Financeiro"
      sectionNum="§ 03"
      icon="fa-solid fa-dollar-sign"
      iconColor="amber"
      columns={3}
      actions={<ShadcnButton variant="ghost">Alterar</ShadcnButton>}
    >
      <ShadcnSpecSheetField label="Limite" value="R$ 5.000,00" />
      <ShadcnSpecSheetField label="Saldo" value="R$ 1.240,00" />
    </ShadcnSpecSheetSection>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ShadcnSpecSheetSectionComponent, ShadcnSpecSheetFieldComponent, ShadcnButtonComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-financials',
  standalone: true,
  imports: [ShadcnSpecSheetSectionComponent, ShadcnSpecSheetFieldComponent, ShadcnButtonComponent],
  template: \`
    <!-- Nested inside a <article arcanaShadcnSpecSheet> -->
    <section arcanaShadcnSpecSheetSection title="Financeiro" sectionNum="§ 03" icon="fa-solid fa-dollar-sign" iconColor="amber" [columns]="3" [actionsTemplate]="acts">
      <div arcanaShadcnSpecSheetField label="Limite" value="R$ 5.000,00"></div>
      <div arcanaShadcnSpecSheetField label="Saldo" value="R$ 1.240,00"></div>
    </section>
    <ng-template #acts><button arcanaShadcnButton variant="ghost">Alterar</button></ng-template>
  \`
})
export class FinancialsComponent {}`,
    svelte: `<script lang="ts">
  import { ShadcnSpecSheetSection, ShadcnSpecSheetField, ShadcnButton } from '@arcanalabs/ui-components/svelte'
</script>

<!-- Nested inside a <ShadcnSpecSheet> -->
<ShadcnSpecSheetSection title="Financeiro" sectionNum="§ 03" icon="fa-solid fa-dollar-sign" iconColor="amber" columns={3}>
  {#snippet actions()}<ShadcnButton variant="ghost">Alterar</ShadcnButton>{/snippet}
  <ShadcnSpecSheetField label="Limite" value="R$ 5.000,00" />
  <ShadcnSpecSheetField label="Saldo" value="R$ 1.240,00" />
</ShadcnSpecSheetSection>`
  },

  specSheetField: {
    react: `import { ShadcnSpecSheetField } from '@arcanalabs/ui-components/react'

export function Fields() {
  return (
    <>
      <ShadcnSpecSheetField label="CNPJ" value={form.document_number} />
      <ShadcnSpecSheetField label="Observações" value="" emptyText="Não informado" />
      <ShadcnSpecSheetField label="Status" span={2}>
        <span className="shadcn-spec-sheet-badge shadcn-spec-sheet-badge--active">Ativo</span>
      </ShadcnSpecSheetField>
    </>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ShadcnSpecSheetFieldComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-fields',
  standalone: true,
  imports: [ShadcnSpecSheetFieldComponent],
  template: \`
    <div arcanaShadcnSpecSheetField label="CNPJ" [value]="form.document_number"></div>
    <div arcanaShadcnSpecSheetField label="Observações" value="" emptyText="Não informado"></div>
    <div arcanaShadcnSpecSheetField label="Status" [span]="2" [valueTemplate]="status"></div>
    <ng-template #status><span class="shadcn-spec-sheet-badge shadcn-spec-sheet-badge--active">Ativo</span></ng-template>
  \`
})
export class FieldsComponent {
  form = { document_number: '12.345.678/0001-90' }
}`,
    svelte: `<script lang="ts">
  import { ShadcnSpecSheetField } from '@arcanalabs/ui-components/svelte'
  const form = { document_number: '12.345.678/0001-90' }
</script>

<ShadcnSpecSheetField label="CNPJ" value={form.document_number} />
<ShadcnSpecSheetField label="Observações" value="" emptyText="Não informado" />
<ShadcnSpecSheetField label="Status" span={2}>
  <span class="shadcn-spec-sheet-badge shadcn-spec-sheet-badge--active">Ativo</span>
</ShadcnSpecSheetField>`
  },

  summaryTiles: {
    react: `import { ShadcnSummaryTiles, ShadcnSummaryTile } from '@arcanalabs/ui-components/react'

export function Kpis() {
  return (
    <ShadcnSummaryTiles columns={3}>
      <ShadcnSummaryTile tone="positive" icon="fa-solid fa-arrow-down" label="Entradas" value="R$ 1.250,00" sub="4 formas" />
      <ShadcnSummaryTile tone="negative" icon="fa-solid fa-arrow-up" label="Despesas" value="R$ 85,00" />
      <ShadcnSummaryTile tone="indigo" icon="fa-solid fa-sack-dollar" label="Total" value="R$ 1.165,00" />
    </ShadcnSummaryTiles>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ShadcnSummaryTilesComponent, ShadcnSummaryTileComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-kpis',
  standalone: true,
  imports: [ShadcnSummaryTilesComponent, ShadcnSummaryTileComponent],
  template: \`
    <div arcanaShadcnSummaryTiles [columns]="3">
      <div arcanaShadcnSummaryTile tone="positive" icon="fa-solid fa-arrow-down" label="Entradas" value="R$ 1.250,00" sub="4 formas"></div>
      <div arcanaShadcnSummaryTile tone="negative" icon="fa-solid fa-arrow-up" label="Despesas" value="R$ 85,00"></div>
      <div arcanaShadcnSummaryTile tone="indigo" icon="fa-solid fa-sack-dollar" label="Total" value="R$ 1.165,00"></div>
    </div>
  \`
})
export class KpisComponent {}`,
    svelte: `<script lang="ts">
  import { ShadcnSummaryTiles, ShadcnSummaryTile } from '@arcanalabs/ui-components/svelte'
</script>

<ShadcnSummaryTiles columns={3}>
  <ShadcnSummaryTile tone="positive" icon="fa-solid fa-arrow-down" label="Entradas" value="R$ 1.250,00" sub="4 formas" />
  <ShadcnSummaryTile tone="negative" icon="fa-solid fa-arrow-up" label="Despesas" value="R$ 85,00" />
  <ShadcnSummaryTile tone="indigo" icon="fa-solid fa-sack-dollar" label="Total" value="R$ 1.165,00" />
</ShadcnSummaryTiles>`
  },

  summaryTile: {
    react: `import { ShadcnSummaryTile } from '@arcanalabs/ui-components/react'

export function Approved() {
  return <ShadcnSummaryTile tone="positive" icon="fa-solid fa-check" label="Aprovados" value="112" sub="hoje" />
}`,
    angular: `import { Component } from '@angular/core'
import { ShadcnSummaryTileComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-approved',
  standalone: true,
  imports: [ShadcnSummaryTileComponent],
  template: \`<div arcanaShadcnSummaryTile tone="positive" icon="fa-solid fa-check" label="Aprovados" value="112" sub="hoje"></div>\`
})
export class ApprovedComponent {}`,
    svelte: `<script lang="ts">
  import { ShadcnSummaryTile } from '@arcanalabs/ui-components/svelte'
</script>

<ShadcnSummaryTile tone="positive" icon="fa-solid fa-check" label="Aprovados" value="112" sub="hoje" />`
  },

  settingsList: {
    react: `import { useState } from 'react'
import { ShadcnSettingsList, ShadcnSettingsListItem, ShadcnSwitch } from '@arcanalabs/ui-components/react'

export function Settings() {
  const [popgas, setPopgas] = useState(true)
  return (
    <ShadcnSettingsList>
      <ShadcnSettingsListItem label="Modo PopGás" caption="Habilita recursos internos.">
        <ShadcnSwitch value={popgas} onValueChange={setPopgas} ariaLabel="Modo PopGás" />
      </ShadcnSettingsListItem>
    </ShadcnSettingsList>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ShadcnSettingsListComponent, ShadcnSettingsListItemComponent, ShadcnSwitchComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ShadcnSettingsListComponent, ShadcnSettingsListItemComponent, ShadcnSwitchComponent],
  template: \`
    <div arcanaShadcnSettingsList>
      <div arcanaShadcnSettingsListItem label="Modo PopGás" caption="Habilita recursos internos.">
        <button arcanaShadcnSwitch [(value)]="popgas" ariaLabel="Modo PopGás"></button>
      </div>
    </div>
  \`
})
export class SettingsComponent {
  popgas = true
}`,
    svelte: `<script lang="ts">
  import { ShadcnSettingsList, ShadcnSettingsListItem, ShadcnSwitch } from '@arcanalabs/ui-components/svelte'
  let popgas = $state(true)
</script>

<ShadcnSettingsList>
  <ShadcnSettingsListItem label="Modo PopGás" caption="Habilita recursos internos.">
    <ShadcnSwitch value={popgas} onValueChange={(v) => (popgas = v)} ariaLabel="Modo PopGás" />
  </ShadcnSettingsListItem>
</ShadcnSettingsList>`
  },

  settingsListGroup: {
    react: `import { ShadcnSettingsList, ShadcnSettingsListGroup, ShadcnSettingsListItem } from '@arcanalabs/ui-components/react'

export function OrderSettings() {
  return (
    <ShadcnSettingsList>
      <ShadcnSettingsListGroup title="Pedidos" icon="fa-solid fa-cart-shopping" iconColor="indigo" meta="2 configs">
        <ShadcnSettingsListItem label="Aceitar pedidos">…</ShadcnSettingsListItem>
      </ShadcnSettingsListGroup>
    </ShadcnSettingsList>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ShadcnSettingsListComponent, ShadcnSettingsListGroupComponent, ShadcnSettingsListItemComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-order-settings',
  standalone: true,
  imports: [ShadcnSettingsListComponent, ShadcnSettingsListGroupComponent, ShadcnSettingsListItemComponent],
  template: \`
    <div arcanaShadcnSettingsList>
      <section arcanaShadcnSettingsListGroup title="Pedidos" icon="fa-solid fa-cart-shopping" iconColor="indigo" meta="2 configs">
        <div arcanaShadcnSettingsListItem label="Aceitar pedidos">…</div>
      </section>
    </div>
  \`
})
export class OrderSettingsComponent {}`,
    svelte: `<script lang="ts">
  import { ShadcnSettingsList, ShadcnSettingsListGroup, ShadcnSettingsListItem } from '@arcanalabs/ui-components/svelte'
</script>

<ShadcnSettingsList>
  <ShadcnSettingsListGroup title="Pedidos" icon="fa-solid fa-cart-shopping" iconColor="indigo" meta="2 configs">
    <ShadcnSettingsListItem label="Aceitar pedidos">…</ShadcnSettingsListItem>
  </ShadcnSettingsListGroup>
</ShadcnSettingsList>`
  },

  settingsListItem: {
    react: `import { useState } from 'react'
import { ShadcnSettingsListItem, ShadcnSwitch } from '@arcanalabs/ui-components/react'

export function EmailRow() {
  const [notifyEmail, setNotifyEmail] = useState(true)
  return (
    <ShadcnSettingsListItem label="Notificações por e-mail" caption="Resumo diário.">
      <ShadcnSwitch value={notifyEmail} onValueChange={setNotifyEmail} ariaLabel="E-mail" />
    </ShadcnSettingsListItem>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ShadcnSettingsListItemComponent, ShadcnSwitchComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-email-row',
  standalone: true,
  imports: [ShadcnSettingsListItemComponent, ShadcnSwitchComponent],
  template: \`
    <div arcanaShadcnSettingsListItem label="Notificações por e-mail" caption="Resumo diário.">
      <button arcanaShadcnSwitch [(value)]="notifyEmail" ariaLabel="E-mail"></button>
    </div>
  \`
})
export class EmailRowComponent {
  notifyEmail = true
}`,
    svelte: `<script lang="ts">
  import { ShadcnSettingsListItem, ShadcnSwitch } from '@arcanalabs/ui-components/svelte'
  let notifyEmail = $state(true)
</script>

<ShadcnSettingsListItem label="Notificações por e-mail" caption="Resumo diário.">
  <ShadcnSwitch value={notifyEmail} onValueChange={(v) => (notifyEmail = v)} ariaLabel="E-mail" />
</ShadcnSettingsListItem>`
  },

  settingsEditableField: {
    react: `import { useState } from 'react'
import { ShadcnSettingsList, ShadcnSettingsEditableField } from '@arcanalabs/ui-components/react'

export function DiscountRow() {
  const [discount, setDiscount] = useState<string | number | boolean | null>('1500.00')
  return (
    <ShadcnSettingsList>
      <ShadcnSettingsEditableField
        label="Desconto 1ª compra"
        caption="Valor unitário aplicado."
        type="currency"
        value={discount}
        onValueChange={setDiscount}
        onSave={autoSave}
      />
    </ShadcnSettingsList>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ShadcnSettingsListComponent, ShadcnSettingsEditableFieldComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-discount-row',
  standalone: true,
  imports: [ShadcnSettingsListComponent, ShadcnSettingsEditableFieldComponent],
  template: \`
    <div arcanaShadcnSettingsList>
      <div arcanaShadcnSettingsEditableField label="Desconto 1ª compra" caption="Valor unitário aplicado." type="currency" [(value)]="discount" (save)="autoSave($event)"></div>
    </div>
  \`
})
export class DiscountRowComponent {
  discount: unknown = '1500.00'
  autoSave(value: unknown) { /* …persist */ }
}`,
    svelte: `<script lang="ts">
  import { ShadcnSettingsList, ShadcnSettingsEditableField } from '@arcanalabs/ui-components/svelte'

  let discount = $state<string | number | boolean | null>('1500.00')
  function autoSave(value: unknown) { /* …persist */ }
</script>

<ShadcnSettingsList>
  <ShadcnSettingsEditableField
    label="Desconto 1ª compra"
    caption="Valor unitário aplicado."
    type="currency"
    value={discount}
    onValueChange={(v) => (discount = v)}
    onSave={autoSave}
  />
</ShadcnSettingsList>`
  },

  sparkGridEmptyState: {
    react: `import { SparkGridEmptyState } from '@arcanalabs/ui-components/react'

export function Products({ rows, loading, hasActiveFilter, openCreate }) {
  return (
    <SparkGridEmptyState
      total={rows.length}
      loading={loading}
      filtered={hasActiveFilter}
      icon="fa-solid fa-box-open"
      title="Nenhum produto cadastrado"
      actionLabel="Adicionar Produto"
      onAction={openCreate}
    >
      <MyGrid rows={rows} />
    </SparkGridEmptyState>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { SparkGridEmptyStateComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [SparkGridEmptyStateComponent],
  template: \`
    <div arcanaSparkGridEmptyState
      [total]="rows.length" [loading]="loading" [filtered]="hasActiveFilter"
      icon="fa-solid fa-box-open" title="Nenhum produto cadastrado" actionLabel="Adicionar Produto"
      (action)="openCreate()">
      <app-my-grid [rows]="rows"></app-my-grid>
    </div>
  \`
})
export class ProductsComponent {
  rows: unknown[] = []
  loading = false
  hasActiveFilter = false
  openCreate() {}
}`,
    svelte: `<script lang="ts">
  import { SparkGridEmptyState } from '@arcanalabs/ui-components/svelte'
  export let rows: unknown[] = []
  export let loading = false
  export let hasActiveFilter = false
  export let openCreate: () => void
</script>

<SparkGridEmptyState
  total={rows.length}
  loading={loading}
  filtered={hasActiveFilter}
  icon="fa-solid fa-box-open"
  title="Nenhum produto cadastrado"
  actionLabel="Adicionar Produto"
  onAction={openCreate}
>
  <MyGrid {rows} />
</SparkGridEmptyState>`
  },

  notice: {
    react: `import { ShadcnNotice } from '@arcanalabs/ui-components/react'

export function Notices({ dismissed, onHide }) {
  return (
    <>
      <ShadcnNotice variant="warning" title="Pagamento manual">
        Pix e Boleto geram um link novo de cobrança a cada ciclo.
      </ShadcnNotice>
      {!dismissed && (
        <ShadcnNotice variant="destructive" title="Falha" dismissible onDismiss={onHide}>
          Tente novamente.
        </ShadcnNotice>
      )}
    </>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ShadcnNoticeComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-notices',
  standalone: true,
  imports: [ShadcnNoticeComponent],
  template: \`
    <div arcanaShadcnNotice variant="warning" title="Pagamento manual">
      Pix e Boleto geram um link novo de cobrança a cada ciclo.
    </div>
    <div arcanaShadcnNotice variant="destructive" title="Falha" [dismissible]="true" (dismiss)="hide()">
      Tente novamente.
    </div>
  \`
})
export class NoticesComponent {
  hide() {}
}`,
    svelte: `<script lang="ts">
  import { ShadcnNotice } from '@arcanalabs/ui-components/svelte'
  function hide() {}
</script>

<ShadcnNotice variant="warning" title="Pagamento manual">
  Pix e Boleto geram um link novo de cobrança a cada ciclo.
</ShadcnNotice>
<ShadcnNotice variant="destructive" title="Falha" dismissible onDismiss={hide}>
  Tente novamente.
</ShadcnNotice>`
  },

  editFieldModal: {
    react: `import { useRef, useState } from 'react'
import { ShadcnEditFieldModal, ShadcnSelect, ShadcnButton, type ShadcnEditFieldModalHandle } from '@arcanalabs/ui-components/react'

export function PlanRow({ planOptions }) {
  const modal = useRef<ShadcnEditFieldModalHandle>(null)
  const [plan, setPlan] = useState('pro')
  function savePlan() {
    // …persist
    modal.current?.hide()
  }
  return (
    <>
      <ShadcnButton onClick={() => modal.current?.show()}>Alterar Plano</ShadcnButton>
      <ShadcnEditFieldModal ref={modal} title="Alterar Plano" onSave={savePlan}>
        <ShadcnSelect value={plan} onValueChange={(v) => setPlan(v as string)} options={planOptions} />
      </ShadcnEditFieldModal>
    </>
  )
}`,
    angular: `import { Component, Input } from '@angular/core'
import { ShadcnEditFieldModalComponent, ShadcnSelectComponent, ShadcnButtonComponent, type SelectOption } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-plan-row',
  standalone: true,
  imports: [ShadcnEditFieldModalComponent, ShadcnSelectComponent, ShadcnButtonComponent],
  template: \`
    <button arcanaShadcnButton (click)="m.show()">Alterar Plano</button>
    <div arcanaShadcnEditFieldModal #m title="Alterar Plano" (save)="savePlan(m)">
      <div arcanaShadcnSelect [(value)]="plan" [options]="planOptions"></div>
    </div>
  \`
})
export class PlanRowComponent {
  @Input() planOptions: SelectOption[] = []
  plan = 'pro'
  savePlan(m: ShadcnEditFieldModalComponent) {
    // …persist
    m.hide()
  }
}`,
    svelte: `<script lang="ts">
  import { ShadcnEditFieldModal, ShadcnSelect, ShadcnButton, type SelectOption } from '@arcanalabs/ui-components/svelte'

  let { planOptions }: { planOptions: SelectOption[] } = $props()
  let modal: ShadcnEditFieldModal
  let plan = $state('pro')
  function savePlan() {
    // …persist
    modal.hide()
  }
</script>

<ShadcnButton onClick={() => modal.show()}>Alterar Plano</ShadcnButton>
<ShadcnEditFieldModal bind:this={modal} title="Alterar Plano" onSave={savePlan}>
  <ShadcnSelect value={plan} onValueChange={(v) => (plan = v as string)} options={planOptions} />
</ShadcnEditFieldModal>`
  },

  requiredFieldsDialog: {
    react: `import { useRef } from 'react'
import { ShadcnRequiredFieldsDialog, ShadcnButton, type ShadcnRequiredFieldsDialogHandle } from '@arcanalabs/ui-components/react'

export function CustomerForm({ form }) {
  const dialog = useRef<ShadcnRequiredFieldsDialogHandle>(null)
  const missing = REQUIRED.filter((f) => !f.check(form))
  function validate() {
    if (missing.length) dialog.current?.show()
  }
  return (
    <>
      <ShadcnButton onClick={validate}>Validar formulário</ShadcnButton>
      <ShadcnRequiredFieldsDialog ref={dialog} fields={missing} description="…antes de criar o cliente." />
    </>
  )
}`,
    angular: `import { Component, Input } from '@angular/core'
import { ShadcnRequiredFieldsDialogComponent, ShadcnButtonComponent, type RequiredField } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [ShadcnRequiredFieldsDialogComponent, ShadcnButtonComponent],
  template: \`
    <button arcanaShadcnButton (click)="missing.length && r.show()">Validar formulário</button>
    <div arcanaShadcnRequiredFieldsDialog #r [fields]="missing" description="…antes de criar o cliente."></div>
  \`
})
export class CustomerFormComponent {
  @Input() missing: RequiredField[] = []
}`,
    svelte: `<script lang="ts">
  import { ShadcnRequiredFieldsDialog, ShadcnButton, type RequiredField } from '@arcanalabs/ui-components/svelte'

  let { missing = [] }: { missing: RequiredField[] } = $props()
  let dialog: ShadcnRequiredFieldsDialog
  function validate() {
    if (missing.length) dialog.show()
  }
</script>

<ShadcnButton onClick={validate}>Validar formulário</ShadcnButton>
<ShadcnRequiredFieldsDialog bind:this={dialog} fields={missing} description="…antes de criar o cliente." />`
  },

  onboardingPanel: {
    react: `import { ShadcnOnboardingPanel } from '@arcanalabs/ui-components/react'

export function CertificateSetup({ openCreate }) {
  return (
    <ShadcnOnboardingPanel
      icon="fa-solid fa-file-shield"
      title="Configure seu certificado"
      description="O certificado A1 é necessário para emitir NF-e."
      actionLabel="Configurar Certificado"
      onAction={openCreate}
    />
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ShadcnOnboardingPanelComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-certificate-setup',
  standalone: true,
  imports: [ShadcnOnboardingPanelComponent],
  template: \`
    <div arcanaShadcnOnboardingPanel
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
  import { ShadcnOnboardingPanel } from '@arcanalabs/ui-components/svelte'
  export let openCreate: () => void
</script>

<ShadcnOnboardingPanel
  icon="fa-solid fa-file-shield"
  title="Configure seu certificado"
  description="O certificado A1 é necessário para emitir NF-e."
  actionLabel="Configurar Certificado"
  onAction={openCreate}
/>`
  },

  loadingOverlay: {
    react: `import { useState } from 'react'
import { ShadcnLoadingOverlay } from '@arcanalabs/ui-components/react'

export function Card() {
  const [saving, setSaving] = useState(false)
  return (
    <div style={{ position: 'relative' }}>
      {/* card content */}
      <ShadcnLoadingOverlay visible={saving} text="Salvando…" />
    </div>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ShadcnLoadingOverlayComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [ShadcnLoadingOverlayComponent],
  template: \`
    <div style="position: relative">
      <!-- card content -->
      <div arcanaShadcnLoadingOverlay [visible]="saving" text="Salvando…"></div>
    </div>
  \`
})
export class CardComponent {
  saving = false
}`,
    svelte: `<script lang="ts">
  import { ShadcnLoadingOverlay } from '@arcanalabs/ui-components/svelte'
  let saving = $state(false)
</script>

<div style="position: relative">
  <!-- card content -->
  <ShadcnLoadingOverlay visible={saving} text="Salvando…" />
</div>`
  },

  skeleton: {
    react: `import { ShadcnSkeleton } from '@arcanalabs/ui-components/react'

export function CardSkeleton() {
  return (
    <>
      <ShadcnSkeleton width="40px" height="40px" rounded="full" />
      <ShadcnSkeleton width="200px" height="14px" />
      <ShadcnSkeleton width="60%" height="12px" />
    </>
  )
}`,
    angular: `import { Component } from '@angular/core'
import { ShadcnSkeletonComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-card-skeleton',
  standalone: true,
  imports: [ShadcnSkeletonComponent],
  template: \`
    <span arcanaShadcnSkeleton width="40px" height="40px" rounded="full"></span>
    <span arcanaShadcnSkeleton width="200px" height="14px"></span>
    <span arcanaShadcnSkeleton width="60%" height="12px"></span>
  \`
})
export class CardSkeletonComponent {}`,
    svelte: `<script lang="ts">
  import { ShadcnSkeleton } from '@arcanalabs/ui-components/svelte'
</script>

<ShadcnSkeleton width="40px" height="40px" rounded="full" />
<ShadcnSkeleton width="200px" height="14px" />
<ShadcnSkeleton width="60%" height="12px" />`
  },

  switchCard: {
    react: `import { useState } from 'react'
import { ShadcnSwitchCard } from '@arcanalabs/ui-components/react'

export function TwoFactor() {
  const [twoFa, setTwoFa] = useState(true)
  return <ShadcnSwitchCard value={twoFa} onValueChange={setTwoFa} icon="fa-solid fa-shield-halved" title="Autenticação 2FA" statusOn="ATIVO · TOTP" />
}`,
    angular: `import { Component } from '@angular/core'
import { ShadcnSwitchCardComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-two-factor',
  standalone: true,
  imports: [ShadcnSwitchCardComponent],
  template: \`<button arcanaShadcnSwitchCard [(value)]="twoFa" icon="fa-solid fa-shield-halved" title="Autenticação 2FA" statusOn="ATIVO · TOTP"></button>\`
})
export class TwoFactorComponent {
  twoFa = true
}`,
    svelte: `<script lang="ts">
  import { ShadcnSwitchCard } from '@arcanalabs/ui-components/svelte'
  let twoFa = $state(true)
</script>

<ShadcnSwitchCard value={twoFa} onValueChange={(v) => (twoFa = v)} icon="fa-solid fa-shield-halved" title="Autenticação 2FA" statusOn="ATIVO · TOTP" />`
  },

  switchRow: {
    react: `import { useState } from 'react'
import { ShadcnSwitchRow } from '@arcanalabs/ui-components/react'

export function EmailPref() {
  const [email, setEmail] = useState(true)
  return <ShadcnSwitchRow value={email} onValueChange={setEmail} label="Notificações por e-mail" description="Resumo diário das atividades." />
}`,
    angular: `import { Component } from '@angular/core'
import { ShadcnSwitchRowComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-email-pref',
  standalone: true,
  imports: [ShadcnSwitchRowComponent],
  template: \`<button arcanaShadcnSwitchRow [(value)]="email" label="Notificações por e-mail" description="Resumo diário das atividades."></button>\`
})
export class EmailPrefComponent {
  email = true
}`,
    svelte: `<script lang="ts">
  import { ShadcnSwitchRow } from '@arcanalabs/ui-components/svelte'
  let email = $state(true)
</script>

<ShadcnSwitchRow value={email} onValueChange={(v) => (email = v)} label="Notificações por e-mail" description="Resumo diário das atividades." />`
  },

  switchSegmented: {
    react: `import { useState } from 'react'
import { ShadcnSwitchSegmented } from '@arcanalabs/ui-components/react'

export function BillingCycle() {
  const [yearly, setYearly] = useState(false)
  return <ShadcnSwitchSegmented value={yearly} onValueChange={setYearly} offLabel="Mensal" onLabel="Anual · −20%" />
}`,
    angular: `import { Component } from '@angular/core'
import { ShadcnSwitchSegmentedComponent } from '@arcanalabs/ui-components/angular'

@Component({
  selector: 'app-billing-cycle',
  standalone: true,
  imports: [ShadcnSwitchSegmentedComponent],
  template: \`<div arcanaShadcnSwitchSegmented [(value)]="yearly" offLabel="Mensal" onLabel="Anual · −20%"></div>\`
})
export class BillingCycleComponent {
  yearly = false
}`,
    svelte: `<script lang="ts">
  import { ShadcnSwitchSegmented } from '@arcanalabs/ui-components/svelte'
  let yearly = $state(false)
</script>

<ShadcnSwitchSegmented value={yearly} onValueChange={(v) => (yearly = v)} offLabel="Mensal" onLabel="Anual · −20%" />`
  }
};
