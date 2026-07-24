import type { Component } from "vue";
import type { DocumentedKey } from "../i18n/types";

import ShadcnButton from "../../../src/vue/components/ShadcnButton.vue";
import ShadcnBadge from "../../../src/vue/components/ShadcnBadge.vue";
import ShadcnInput from "../../../src/vue/components/ShadcnInput.vue";
import ShadcnSelect from "../../../src/vue/components/ShadcnSelect.vue";
import ShadcnCheckbox from "../../../src/vue/components/ShadcnCheckbox.vue";
import ShadcnSwitch from "../../../src/vue/components/ShadcnSwitch.vue";
import ShadcnTabs from "../../../src/vue/components/ShadcnTabs.vue";
import ShadcnDialog from "../../../src/vue/components/ShadcnDialog.vue";
// ── Batch 2 ──
import ShadcnInputMask from "../../../src/vue/components/ShadcnInputMask.vue";
import ShadcnInputBoolean from "../../../src/vue/components/ShadcnInputBoolean.vue";
import ShadcnNumberStepper from "../../../src/vue/components/ShadcnNumberStepper.vue";
import MultiSelectPopover from "../../../src/vue/components/MultiSelectPopover.vue";
import ShadcnRadioCardGroup from "../../../src/vue/components/ShadcnRadioCardGroup.vue";
import ShadcnSegmentedOptions from "../../../src/vue/components/ShadcnSegmentedOptions.vue";
import ShadcnDatePicker from "../../../src/vue/components/ShadcnDatePicker.vue";
import InputCurrency from "../../../src/vue/components/InputCurrency.vue";
import LabeledButton from "../../../src/vue/components/LabeledButton.vue";
import ShadcnAccordion from "../../../src/vue/components/ShadcnAccordion.vue";
import ShadcnAccordionItem from "../../../src/vue/components/ShadcnAccordionItem.vue";
import ShadcnDropdown from "../../../src/vue/components/ShadcnDropdown.vue";
import ShadcnDropdownItem from "../../../src/vue/components/ShadcnDropdownItem.vue";
// ── Batch 3 ──
import ShadcnTable from "../../../src/vue/components/ShadcnTable.vue";
import ShadcnSpecSheet from "../../../src/vue/components/ShadcnSpecSheet.vue";
import ShadcnSpecSheetSection from "../../../src/vue/components/ShadcnSpecSheetSection.vue";
import ShadcnSpecSheetField from "../../../src/vue/components/ShadcnSpecSheetField.vue";
import ShadcnSummaryTile from "../../../src/vue/components/ShadcnSummaryTile.vue";
import ShadcnSummaryTiles from "../../../src/vue/components/ShadcnSummaryTiles.vue";
import ShadcnSettingsList from "../../../src/vue/components/ShadcnSettingsList.vue";
import ShadcnSettingsListGroup from "../../../src/vue/components/ShadcnSettingsListGroup.vue";
import ShadcnSettingsListItem from "../../../src/vue/components/ShadcnSettingsListItem.vue";
import ShadcnSettingsEditableField from "../../../src/vue/components/ShadcnSettingsEditableField.vue";
import SparkGridEmptyState from "../../../src/vue/components/SparkGridEmptyState.vue";
import ShadcnNotice from "../../../src/vue/components/ShadcnNotice.vue";
import ShadcnEditFieldModal from "../../../src/vue/components/ShadcnEditFieldModal.vue";
import ShadcnRequiredFieldsDialog from "../../../src/vue/components/ShadcnRequiredFieldsDialog.vue";
import ShadcnOnboardingPanel from "../../../src/vue/components/ShadcnOnboardingPanel.vue";
import ShadcnLoadingOverlay from "../../../src/vue/components/ShadcnLoadingOverlay.vue";
import ShadcnSkeleton from "../../../src/vue/components/ShadcnSkeleton.vue";
import ShadcnSwitchCard from "../../../src/vue/components/ShadcnSwitchCard.vue";
import ShadcnSwitchRow from "../../../src/vue/components/ShadcnSwitchRow.vue";
import ShadcnSwitchSegmented from "../../../src/vue/components/ShadcnSwitchSegmented.vue";

export interface PropRow {
  name: string;
  type: string;
  default: string;
  /** Short technical description (English; language-neutral reference text). */
  description: string;
}

export interface ComponentDoc {
  /** A real Vue component definition, mounted live in the preview. */
  demo: Component;
  props: PropRow[];
  /** Emitted events, shown as a small list under the props table. */
  events?: string[];
  /** The Vue `<script setup>` + template snippet shown in the Code tab. */
  vueSnippet: string;
}

/* ─────────────────────────── ShadcnButton ─────────────────────────── */

const ButtonDemo: Component = {
  components: { ShadcnButton },
  data: () => ({ clicks: 0 }),
  template: /* html */ `
    <div class="demo-stack">
      <div class="demo-row">
        <ShadcnButton @click="clicks++">Primary</ShadcnButton>
        <ShadcnButton variant="secondary">Secondary</ShadcnButton>
        <ShadcnButton variant="outline">Outline</ShadcnButton>
        <ShadcnButton variant="ghost">Ghost</ShadcnButton>
        <ShadcnButton variant="success">Success</ShadcnButton>
        <ShadcnButton variant="indigo">Indigo</ShadcnButton>
        <ShadcnButton variant="destructive">Destructive</ShadcnButton>
        <ShadcnButton variant="outline-danger">Outline danger</ShadcnButton>
        <ShadcnButton :disabled="true">Disabled</ShadcnButton>
      </div>
      <p class="demo-note">Primary clicked <strong>{{ clicks }}</strong> time(s)</p>
    </div>
  `
};

/* ─────────────────────────── ShadcnBadge ──────────────────────────── */

const BadgeDemo: Component = {
  components: { ShadcnBadge },
  template: /* html */ `
    <div class="demo-stack">
      <div class="demo-row">
        <ShadcnBadge>neutral</ShadcnBadge>
        <ShadcnBadge variant="blue">blue</ShadcnBadge>
        <ShadcnBadge variant="green">green</ShadcnBadge>
        <ShadcnBadge variant="red">red</ShadcnBadge>
        <ShadcnBadge variant="amber">amber</ShadcnBadge>
        <ShadcnBadge variant="violet">violet</ShadcnBadge>
      </div>
      <div class="demo-row">
        <ShadcnBadge variant="green" :dot="true">Active</ShadcnBadge>
        <ShadcnBadge variant="red" :dot="true">Offline</ShadcnBadge>
        <ShadcnBadge variant="blue" size="sm">sm size</ShadcnBadge>
        <ShadcnBadge variant="violet" :clickable="true">clickable</ShadcnBadge>
      </div>
    </div>
  `
};

/* ─────────────────────────── ShadcnInput ──────────────────────────── */

const InputDemo: Component = {
  components: { ShadcnInput },
  data: () => ({ email: "", qty: null as number | null }),
  template: /* html */ `
    <div class="demo-stack" style="max-width: 340px">
      <ShadcnInput v-model="email" type="email" placeholder="email@company.com" />
      <ShadcnInput v-model="qty" type="number" placeholder="Quantity" :min="0" :max="99" />
      <ShadcnInput placeholder="Read-only" model-value="Locked value" :readonly="true" />
      <p class="demo-note">email: <strong>{{ email || "—" }}</strong> · qty: <strong>{{ qty === null ? "null" : qty }}</strong> ({{ qty === null ? "empty" : typeof qty }})</p>
    </div>
  `
};

/* ─────────────────────────── ShadcnSelect ─────────────────────────── */

const SelectDemo: Component = {
  components: { ShadcnSelect },
  data: () => ({
    single: null as string | null,
    many: [] as string[],
    fruits: [
      { label: "Apple", value: "apple" },
      { label: "Banana", value: "banana" },
      { label: "Cherry", value: "cherry", description: "seasonal" },
      { label: "Durian", value: "durian", disabled: true },
      { label: "Elderberry", value: "elderberry" }
    ]
  }),
  template: /* html */ `
    <div class="demo-stack" style="max-width: 340px">
      <ShadcnSelect v-model="single" :options="fruits" placeholder="Pick a fruit" searchable />
      <ShadcnSelect v-model="many" :options="fruits" placeholder="Pick several" multiple />
      <p class="demo-note">single: <strong>{{ single ?? "null" }}</strong> · multiple: <strong>[{{ many.join(", ") }}]</strong></p>
    </div>
  `
};

/* ────────────────────────── ShadcnCheckbox ────────────────────────── */

const CheckboxDemo: Component = {
  components: { ShadcnCheckbox },
  data: () => ({ items: { a: true, b: false, c: false } as Record<string, boolean> }),
  computed: {
    allChecked(): boolean {
      const v = (this as unknown as { items: Record<string, boolean> }).items;
      return v.a && v.b && v.c;
    },
    someChecked(): boolean {
      const v = (this as unknown as { items: Record<string, boolean> }).items;
      const n = [v.a, v.b, v.c].filter(Boolean).length;
      return n > 0 && n < 3;
    }
  },
  methods: {
    toggleAll(value: boolean) {
      (this as unknown as { items: Record<string, boolean> }).items = { a: value, b: value, c: value };
    }
  },
  template: /* html */ `
    <div class="demo-stack">
      <ShadcnCheckbox
        :model-value="allChecked"
        :indeterminate="someChecked"
        label="Select all"
        @update:modelValue="toggleAll"
      />
      <div class="demo-stack" style="padding-left: 22px; gap: 6px">
        <ShadcnCheckbox v-model="items.a" label="Invoices" />
        <ShadcnCheckbox v-model="items.b" label="Receipts" />
        <ShadcnCheckbox v-model="items.c" label="Statements" />
        <ShadcnCheckbox :model-value="false" :disabled="true" label="Archived (disabled)" />
      </div>
    </div>
  `
};

/* ─────────────────────────── ShadcnSwitch ─────────────────────────── */

const SwitchDemo: Component = {
  components: { ShadcnSwitch },
  data: () => ({ on: true, off: false }),
  template: /* html */ `
    <div class="demo-stack">
      <label class="demo-switch-row"><ShadcnSwitch v-model="on" aria-label="Notifications" /> <span>Notifications ({{ on ? "on" : "off" }})</span></label>
      <label class="demo-switch-row"><ShadcnSwitch v-model="off" aria-label="Beta features" /> <span>Beta features ({{ off ? "on" : "off" }})</span></label>
      <div class="demo-row" style="align-items: center">
        <ShadcnSwitch v-model="on" size="sm" aria-label="small" />
        <ShadcnSwitch v-model="on" size="md" aria-label="medium" />
        <ShadcnSwitch v-model="on" size="lg" aria-label="large" />
        <ShadcnSwitch :model-value="true" :disabled="true" aria-label="disabled" />
      </div>
    </div>
  `
};

/* ──────────────────────────── ShadcnTabs ──────────────────────────── */

const TabsDemo: Component = {
  components: { ShadcnTabs },
  data: () => ({
    active: "overview",
    variant: "pills" as string,
    tabs: [
      { name: "overview", label: "Overview" },
      { name: "activity", label: "Activity", badge: 3 },
      { name: "settings", label: "Settings" }
    ]
  }),
  template: /* html */ `
    <div class="demo-stack">
      <div class="demo-row">
        <button
          v-for="v in ['pills','underline','boxed','segmented']"
          :key="v"
          type="button"
          class="demo-chip"
          :class="{ 'is-on': variant === v }"
          @click="variant = v"
        >{{ v }}</button>
      </div>
      <ShadcnTabs v-model="active" :tabs="tabs" :variant="variant" aria-label="Demo tabs">
        <template #overview><div class="demo-panel">The <strong>Overview</strong> panel is active.</div></template>
        <template #activity><div class="demo-panel">3 new items in <strong>Activity</strong>.</div></template>
        <template #settings><div class="demo-panel">Adjust your <strong>Settings</strong> here.</div></template>
      </ShadcnTabs>
    </div>
  `
};

/* ─────────────────────────── ShadcnDialog ─────────────────────────── */

const DialogDemo: Component = {
  components: { ShadcnButton, ShadcnDialog },
  methods: {
    open() {
      (this.$refs.dialog as unknown as { show: () => void }).show();
    }
  },
  template: /* html */ `
    <div>
      <ShadcnButton @click="open">Open dialog</ShadcnButton>
      <ShadcnDialog ref="dialog" title="Delete workspace" description="This action cannot be undone.">
        <p style="font-size: 13px; color: #52525b; line-height: 1.6">
          Removing this workspace deletes every project and invite inside it.
          Type the name to confirm in a real form — here, just close the dialog.
        </p>
        <template #footer="{ hide }">
          <ShadcnButton variant="outline" @click="hide">Cancel</ShadcnButton>
          <ShadcnButton variant="destructive" @click="hide">Delete</ShadcnButton>
        </template>
      </ShadcnDialog>
    </div>
  `
};

/* ──────────────────────── ShadcnInputMask ─────────────────────────── */

const InputMaskDemo: Component = {
  components: { ShadcnInputMask },
  data: () => ({ cpf: "", phone: "" }),
  template: /* html */ `
    <div class="demo-stack" style="max-width: 340px">
      <ShadcnInputMask v-model="cpf" mask="###.###.###-##" placeholder="CPF" />
      <ShadcnInputMask v-model="phone" :mask="['(##) ####-####', '(##) #####-####']" placeholder="Phone" />
      <p class="demo-note">cpf (raw): <strong>{{ cpf || "—" }}</strong> · phone (raw): <strong>{{ phone || "—" }}</strong></p>
    </div>
  `
};

/* ────────────────────── ShadcnInputBoolean ─────────────────────────── */

const InputBooleanDemo: Component = {
  components: { ShadcnInputBoolean },
  data: () => ({ answer: null as unknown, status: 1 as unknown, filter: null as unknown }),
  template: /* html */ `
    <div class="demo-stack" style="max-width: 340px">
      <ShadcnInputBoolean v-model="answer" placeholder="Yes / No" />
      <ShadcnInputBoolean v-model="status" variation="status" />
      <ShadcnInputBoolean v-model="filter" variation="nullable" placeholder="Has value?" />
      <p class="demo-note">yes/no: <strong>{{ answer ?? "null" }}</strong> · status: <strong>{{ status ?? "null" }}</strong> · nullable: <strong>{{ filter ?? "null" }}</strong></p>
    </div>
  `
};

/* ────────────────────── ShadcnNumberStepper ────────────────────────── */

const NumberStepperDemo: Component = {
  components: { ShadcnNumberStepper },
  data: () => ({ qty: 2, weight: 10 }),
  template: /* html */ `
    <div class="demo-stack">
      <ShadcnNumberStepper v-model="qty" :min="0" :max="10" aria-label="Quantity" />
      <ShadcnNumberStepper v-model="weight" :min="0" :max="100" :step="5" aria-label="Weight" />
      <ShadcnNumberStepper :model-value="5" :disabled="true" aria-label="Disabled" />
      <p class="demo-note">qty (0–10): <strong>{{ qty }}</strong> · weight (step 5): <strong>{{ weight }}</strong></p>
    </div>
  `
};

/* ────────────────────── MultiSelectPopover ─────────────────────────── */

const MultiSelectPopoverDemo: Component = {
  components: { MultiSelectPopover },
  data: () => ({
    selections: { USER: [] as number[], DEPARTMENT: [] as number[] } as Record<string, number[]>,
    tabs: [
      { key: "USER", label: "Users", icon: "fa-solid fa-user", fetch: () => Promise.resolve([{ id: 1, name: "Ana" }, { id: 2, name: "Bruno" }, { id: 3, name: "Carla" }]) },
      { key: "DEPARTMENT", label: "Departments", icon: "fa-solid fa-sitemap", fetch: () => Promise.resolve([{ id: 10, name: "Sales" }, { id: 11, name: "Support" }]) }
    ]
  }),
  template: /* html */ `
    <div class="demo-stack" style="max-width: 340px">
      <MultiSelectPopover v-model="selections" :tabs="tabs" empty-label="Select people or departments" />
      <p class="demo-note">users: [{{ selections.USER.join(", ") }}] · departments: [{{ selections.DEPARTMENT.join(", ") }}]</p>
    </div>
  `
};

/* ────────────────────── ShadcnRadioCardGroup ───────────────────────── */

const RadioCardGroupDemo: Component = {
  components: { ShadcnRadioCardGroup },
  data: () => ({
    method: "pix",
    options: [
      { label: "Credit card", value: "credit_card", description: "Automatic recurring charge." },
      { label: "Pix", value: "pix", description: "Instant, no fees.", badge: "Recommended" },
      { label: "Boleto", value: "boleto", description: "Due in 3 business days." },
      { label: "Cash on delivery", value: "cash", disabled: true }
    ]
  }),
  template: /* html */ `
    <div class="demo-stack" style="max-width: 440px">
      <ShadcnRadioCardGroup v-model="method" :options="options" aria-label="Payment method" />
      <p class="demo-note">selected: <strong>{{ method }}</strong></p>
    </div>
  `
};

/* ────────────────────── ShadcnSegmentedOptions ─────────────────────── */

const SegmentedOptionsDemo: Component = {
  components: { ShadcnSegmentedOptions },
  data: () => ({
    view: "list",
    options: [
      { label: "List", value: "list" },
      { label: "Grid", value: "grid" },
      { label: "Board", value: "board" }
    ]
  }),
  template: /* html */ `
    <div class="demo-stack" style="max-width: 440px">
      <ShadcnSegmentedOptions v-model="view" :options="options" aria-label="View mode" />
      <ShadcnSegmentedOptions v-model="view" :options="options" :compact="true" :squared="true" />
      <p class="demo-note">view: <strong>{{ view }}</strong></p>
    </div>
  `
};

/* ────────────────────── ShadcnDatePicker ───────────────────────────── */

const DatePickerDemo: Component = {
  components: { ShadcnDatePicker },
  data: () => ({ date: "2026-07-24" as string | null }),
  template: /* html */ `
    <div class="demo-stack" style="max-width: 340px">
      <ShadcnDatePicker v-model="date" />
      <p class="demo-note">value (YYYY-MM-DD): <strong>{{ date ?? "null" }}</strong> · type DD/MM/AAAA</p>
    </div>
  `
};

/* ────────────────────────── InputCurrency ──────────────────────────── */

const InputCurrencyDemo: Component = {
  components: { InputCurrency },
  data: () => ({ price: "1500.00", cost: "0" }),
  template: /* html */ `
    <div class="demo-stack" style="max-width: 340px">
      <InputCurrency v-model="price" :shadcn="true" />
      <InputCurrency v-model="cost" :shadcn="true" :disabled="true" />
      <p class="demo-note">price (raw): <strong>{{ price }}</strong></p>
    </div>
  `
};

/* ────────────────────────── LabeledButton ──────────────────────────── */

const LabeledButtonDemo: Component = {
  components: { LabeledButton },
  data: () => ({ clicks: 0 }),
  template: /* html */ `
    <div class="demo-stack">
      <div class="demo-row">
        <LabeledButton :shadcn="true" label="Save" color="green-600" @click="clicks++" />
        <LabeledButton :shadcn="true" label="Cancel" color="grey-500" />
        <LabeledButton :shadcn="true" label="Delete" color="danger-600" />
        <LabeledButton :shadcn="true" label="Sync" color="blue-500" />
        <LabeledButton :shadcn="true" label="Saving…" color="green-600" :loading="true" />
      </div>
      <p class="demo-note">Save clicked <strong>{{ clicks }}</strong> time(s)</p>
    </div>
  `
};

/* ─────────────────── ShadcnAccordion + AccordionItem ───────────────── */

const AccordionDemo: Component = {
  components: { ShadcnAccordion, ShadcnAccordionItem },
  data: () => ({ open: "shipping" as string | null }),
  template: /* html */ `
    <div class="demo-stack">
      <ShadcnAccordion v-model="open">
        <ShadcnAccordionItem name="shipping" title="Shipping">Ships in 2–3 business days.</ShadcnAccordionItem>
        <ShadcnAccordionItem name="returns" title="Returns">30-day free returns, no questions asked.</ShadcnAccordionItem>
        <ShadcnAccordionItem name="warranty" title="Warranty (disabled)" :disabled="true">Coming soon.</ShadcnAccordionItem>
      </ShadcnAccordion>
      <p class="demo-note">open (single mode): <strong>{{ open ?? "null" }}</strong></p>
    </div>
  `
};

const AccordionItemDemo: Component = {
  components: { ShadcnAccordion, ShadcnAccordionItem },
  data: () => ({ open: ["specs"] as string[] }),
  template: /* html */ `
    <div class="demo-stack">
      <ShadcnAccordion v-model="open" :accordion="false">
        <ShadcnAccordionItem name="specs" title="Specifications">Weight, dimensions and materials.</ShadcnAccordionItem>
        <ShadcnAccordionItem name="care">
          <template #title><span>Care <strong>instructions</strong></span></template>
          Hand wash cold, do not tumble dry.
        </ShadcnAccordionItem>
      </ShadcnAccordion>
      <p class="demo-note">open (multiple mode): [{{ open.join(", ") }}]</p>
    </div>
  `
};

/* ──────────────────── ShadcnDropdown + DropdownItem ────────────────── */

const DropdownDemo: Component = {
  components: { ShadcnDropdown, ShadcnDropdownItem, ShadcnButton },
  data: () => ({ last: "—" }),
  template: /* html */ `
    <div class="demo-stack">
      <ShadcnDropdown placement="bottom-start">
        <template #trigger>
          <ShadcnButton variant="outline">Actions ▾</ShadcnButton>
        </template>
        <ShadcnDropdownItem icon="fa-solid fa-pen" @click="last = 'Rename'">Rename</ShadcnDropdownItem>
        <ShadcnDropdownItem icon="fa-solid fa-copy" @click="last = 'Duplicate'">Duplicate</ShadcnDropdownItem>
        <ShadcnDropdownItem icon="fa-solid fa-trash" variant="danger" :divided="true" @click="last = 'Delete'">Delete</ShadcnDropdownItem>
      </ShadcnDropdown>
      <p class="demo-note">last action: <strong>{{ last }}</strong></p>
    </div>
  `
};

const DropdownItemDemo: Component = {
  components: { ShadcnDropdown, ShadcnDropdownItem, ShadcnButton },
  data: () => ({ last: "—" }),
  template: /* html */ `
    <div class="demo-stack">
      <ShadcnDropdown placement="bottom-start" size="comfortable">
        <template #trigger>
          <ShadcnButton variant="outline">Open menu ▾</ShadcnButton>
        </template>
        <ShadcnDropdownItem icon="fa-solid fa-user" @click="last = 'Profile'">
          Profile
          <template #suffix>⌘P</template>
        </ShadcnDropdownItem>
        <ShadcnDropdownItem icon="fa-solid fa-check" variant="success" @click="last = 'Approve'">Approve</ShadcnDropdownItem>
        <ShadcnDropdownItem icon="fa-solid fa-flag" variant="warning" @click="last = 'Flag'">Flag for review</ShadcnDropdownItem>
        <ShadcnDropdownItem icon="fa-solid fa-trash" variant="danger" :divided="true" @click="last = 'Delete'">Delete</ShadcnDropdownItem>
      </ShadcnDropdown>
      <p class="demo-note">last action: <strong>{{ last }}</strong></p>
    </div>
  `
};

/* ─────────────────────────── ShadcnTable ──────────────────────────── */

const TableDemo: Component = {
  components: { ShadcnTable, ShadcnBadge },
  data: () => ({
    columns: [
      { key: "sku", label: "SKU", width: "96px" },
      { key: "name", label: "Product" },
      { key: "qty", label: "Qty", align: "right" },
      { key: "total", label: "Total", align: "right", valueGetter: (v: number) => "R$ " + v.toFixed(2) }
    ],
    rows: [
      { sku: "GLP-13", name: "Botijão P13", qty: 2, total: 260, status: "in" },
      { sku: "GLP-45", name: "Botijão P45", qty: 1, total: 480, status: "low" },
      { sku: "AGUA-20", name: "Galão 20L", qty: 5, total: 45, status: "in" }
    ]
  }),
  template: /* html */ `
    <ShadcnTable :columns="columns" :rows="rows">
      <template #cell-name="{ row }">
        <strong>{{ row.name }}</strong>
        <ShadcnBadge :variant="row.status === 'low' ? 'amber' : 'green'" size="sm" style="margin-left: 6px">{{ row.status === 'low' ? 'low' : 'in stock' }}</ShadcnBadge>
      </template>
      <template #footer>
        <tr><td colspan="3">Total (3 items)</td><td class="shadcn-table__td--right">R$ 785,00</td></tr>
      </template>
    </ShadcnTable>
  `
};

/* ────────────── ShadcnSpecSheet + Section + Field (composite) ──────── */

const SpecSheetDemo: Component = {
  components: { ShadcnSpecSheet, ShadcnSpecSheetSection, ShadcnSpecSheetField, ShadcnButton },
  template: /* html */ `
    <ShadcnSpecSheet doc-num="Cadastro Nº 042 · Atualizado 14.Mar.2026" title="Popgás Distribuidora" meta-label="Status">
      <template #meta>
        <span class="shadcn-spec-sheet-badge shadcn-spec-sheet-badge--active">Ativo</span>
      </template>
      <ShadcnSpecSheetSection title="Dados Cadastrais" section-num="§ 01" icon="fa-solid fa-building" icon-color="blue">
        <ShadcnSpecSheetField label="Razão Social" value="Popgás Distribuidora de Gás LTDA" :span="2" />
        <ShadcnSpecSheetField label="CNPJ" value="12.345.678/0001-90" />
        <ShadcnSpecSheetField label="Inscrição Estadual" value="" />
      </ShadcnSpecSheetSection>
      <ShadcnSpecSheetSection title="Contato" section-num="§ 02" icon="fa-solid fa-phone" icon-color="emerald">
        <ShadcnSpecSheetField label="Telefone" value="(11) 4002-8922" />
        <ShadcnSpecSheetField label="E-mail" value="contato@popgas.com.br" />
      </ShadcnSpecSheetSection>
      <template #footer>
        <ShadcnButton variant="outline">Alterar Dados</ShadcnButton>
      </template>
    </ShadcnSpecSheet>
  `
};

const SpecSheetSectionDemo: Component = {
  components: { ShadcnSpecSheet, ShadcnSpecSheetSection, ShadcnSpecSheetField, ShadcnButton },
  template: /* html */ `
    <ShadcnSpecSheet flat>
      <ShadcnSpecSheetSection title="Financeiro" section-num="§ 03" icon="fa-solid fa-dollar-sign" icon-color="amber" :columns="3">
        <template #actions><ShadcnButton variant="ghost">Alterar</ShadcnButton></template>
        <ShadcnSpecSheetField label="Limite" value="R$ 5.000,00" />
        <ShadcnSpecSheetField label="Saldo" value="R$ 1.240,00" />
        <ShadcnSpecSheetField label="Vencimento" value="Dia 10" />
      </ShadcnSpecSheetSection>
      <ShadcnSpecSheetSection title="Observações" icon="fa-solid fa-note-sticky" icon-color="violet" no-row-dividers>
        <ShadcnSpecSheetField label="Notas" value="Cliente preferencial desde 2019." :span="2" />
      </ShadcnSpecSheetSection>
    </ShadcnSpecSheet>
  `
};

const SpecSheetFieldDemo: Component = {
  components: { ShadcnSpecSheet, ShadcnSpecSheetSection, ShadcnSpecSheetField },
  template: /* html */ `
    <ShadcnSpecSheet flat>
      <ShadcnSpecSheetSection :columns="2">
        <ShadcnSpecSheetField label="Nome" value="Ana Ribeiro" />
        <ShadcnSpecSheetField label="Apelido" value="" empty-text="Não informado" />
        <ShadcnSpecSheetField label="Status" :span="2">
          <span class="shadcn-spec-sheet-badge shadcn-spec-sheet-badge--active">Ativo</span>
        </ShadcnSpecSheetField>
      </ShadcnSpecSheetSection>
    </ShadcnSpecSheet>
  `
};

/* ─────────────── ShadcnSummaryTiles + SummaryTile (composite) ──────── */

const SummaryTilesDemo: Component = {
  components: { ShadcnSummaryTiles, ShadcnSummaryTile },
  template: /* html */ `
    <ShadcnSummaryTiles :columns="3">
      <ShadcnSummaryTile tone="positive" icon="fa-solid fa-arrow-down" label="Entradas" value="R$ 1.250,00" sub="4 formas" />
      <ShadcnSummaryTile tone="negative" icon="fa-solid fa-arrow-up" label="Despesas" value="R$ 85,00" sub="3 lançamentos" />
      <ShadcnSummaryTile tone="indigo" icon="fa-solid fa-sack-dollar" label="Total" value="R$ 1.165,00" />
    </ShadcnSummaryTiles>
  `
};

const SummaryTileDemo: Component = {
  components: { ShadcnSummaryTile, ShadcnBadge },
  template: /* html */ `
    <div class="demo-stack" style="max-width: 360px">
      <ShadcnSummaryTile tone="neutral" icon="fa-solid fa-box" label="Pedidos" value="128" sub="hoje" />
      <ShadcnSummaryTile tone="positive" icon="fa-solid fa-check" label="Aprovados" value="112" />
      <ShadcnSummaryTile tone="negative" icon="fa-solid fa-xmark" label="Cancelados" value="16" />
      <ShadcnSummaryTile tone="indigo" icon="fa-solid fa-percent" label="Conversão">
        <template #value><ShadcnBadge variant="green">87.5%</ShadcnBadge></template>
      </ShadcnSummaryTile>
    </div>
  `
};

/* ─── ShadcnSettingsList + Group + Item + EditableField (composite) ─── */

const SettingsListDemo: Component = {
  components: { ShadcnSettingsList, ShadcnSettingsListItem, ShadcnSwitch },
  data: () => ({ popgas: true, email: false }),
  template: /* html */ `
    <ShadcnSettingsList>
      <ShadcnSettingsListItem label="Modo PopGás" caption="Habilita recursos internos da distribuidora.">
        <ShadcnSwitch v-model="popgas" aria-label="Modo PopGás" />
      </ShadcnSettingsListItem>
      <ShadcnSettingsListItem label="Notificações por e-mail" caption="Resumo diário das atividades operacionais.">
        <ShadcnSwitch v-model="email" aria-label="E-mail" />
      </ShadcnSettingsListItem>
      <ShadcnSettingsListItem label="Plano" caption="Recursos habilitados para a organização.">
        <span class="shadcn-settings-list__current-value">Profissional</span>
        <button class="shadcn-settings-list__edit-btn" type="button">Alterar</button>
      </ShadcnSettingsListItem>
    </ShadcnSettingsList>
  `
};

const SettingsListGroupDemo: Component = {
  components: { ShadcnSettingsList, ShadcnSettingsListGroup, ShadcnSettingsListItem, ShadcnSwitch },
  data: () => ({ a: true, b: false, c: true }),
  template: /* html */ `
    <ShadcnSettingsList>
      <ShadcnSettingsListGroup title="Pedidos" icon="fa-solid fa-cart-shopping" icon-color="indigo" section-num="§ 01" meta="2 configs">
        <ShadcnSettingsListItem label="Aceitar pedidos" caption="Recebe novos pedidos pelo app.">
          <ShadcnSwitch v-model="a" aria-label="Aceitar" />
        </ShadcnSettingsListItem>
        <ShadcnSettingsListItem label="Confirmação automática" caption="Confirma sem revisão manual." nested>
          <ShadcnSwitch v-model="b" aria-label="Confirmação" />
        </ShadcnSettingsListItem>
      </ShadcnSettingsListGroup>
      <ShadcnSettingsListGroup title="Entrega" icon="fa-solid fa-truck" icon-color="emerald" collapsible default-collapsed compact>
        <ShadcnSettingsListItem label="Rastreio em tempo real">
          <ShadcnSwitch v-model="c" aria-label="Rastreio" />
        </ShadcnSettingsListItem>
      </ShadcnSettingsListGroup>
    </ShadcnSettingsList>
  `
};

const SettingsListItemDemo: Component = {
  components: { ShadcnSettingsList, ShadcnSettingsListItem, ShadcnSwitch },
  data: () => ({ x: true, y: false }),
  template: /* html */ `
    <ShadcnSettingsList>
      <ShadcnSettingsListItem caption="Sistema SaaS — plano via tabela de assinaturas.">
        <template #label>Assinatura V2 <span class="shadcn-spec-sheet-badge shadcn-spec-sheet-badge--active">Ativo</span></template>
        <ShadcnSwitch v-model="x" aria-label="Assinatura" />
      </ShadcnSettingsListItem>
      <ShadcnSettingsListItem label="Exibir App Web" caption="Sub-config do cartão de crédito." nested>
        <ShadcnSwitch v-model="y" aria-label="App Web" />
      </ShadcnSettingsListItem>
      <ShadcnSettingsListItem label="Recurso indisponível" caption="Requer plano superior." disabled>
        <ShadcnSwitch :model-value="false" :disabled="true" aria-label="Indisponível" />
      </ShadcnSettingsListItem>
    </ShadcnSettingsList>
  `
};

const SettingsEditableFieldDemo: Component = {
  components: { ShadcnSettingsList, ShadcnSettingsEditableField },
  data: () => ({
    name: "Popgás Matriz",
    discount: "1500.00",
    plan: "pro" as string,
    planOptions: [
      { label: "Básico", value: "basic" },
      { label: "Profissional", value: "pro" },
      { label: "Enterprise", value: "enterprise" }
    ]
  }),
  template: /* html */ `
    <div class="demo-stack">
      <ShadcnSettingsList>
        <ShadcnSettingsEditableField label="Nome da unidade" caption="Exibido em relatórios." type="text" v-model="name" />
        <ShadcnSettingsEditableField label="Desconto 1ª compra" caption="Valor unitário aplicado." type="currency" v-model="discount" />
        <ShadcnSettingsEditableField label="Plano" caption="Recursos habilitados." type="select" :options="planOptions" v-model="plan" />
      </ShadcnSettingsList>
      <p class="demo-note">Click <strong>Alterar</strong> on any row to open its edit modal.</p>
    </div>
  `
};

/* ───────────────────────── SparkGridEmptyState ─────────────────────── */

const SparkGridEmptyStateDemo: Component = {
  components: { SparkGridEmptyState },
  data: () => ({ loading: true, last: "—" }),
  mounted() {
    // The panel only appears after loading transitions true → false (mirrors a real
    // fetch settling). Flip it shortly after mount so the preview shows the empty state.
    setTimeout(() => { (this as unknown as { loading: boolean }).loading = false; }, 500);
  },
  template: /* html */ `
    <div class="demo-stack">
      <SparkGridEmptyState
        :total="0"
        :loading="loading"
        :filtered="false"
        icon="fa-solid fa-box-open"
        title="Nenhum produto cadastrado"
        description="Cadastre seu primeiro produto para começar a vender."
        action-label="Adicionar Produto"
        secondary-action-label="Ver Recomendados"
        secondary-action-icon="fa-solid fa-wand-magic-sparkles"
        sub-hint="Você pode importar em massa depois."
        @action="last = 'primary'"
        @secondary-action="last = 'secondary'"
      >
        <div class="demo-note">Grid rows would render here while data loads…</div>
      </SparkGridEmptyState>
      <p class="demo-note">last action: <strong>{{ last }}</strong></p>
    </div>
  `
};

/* ─────────────────────────── ShadcnNotice ──────────────────────────── */

const NoticeDemo: Component = {
  components: { ShadcnNotice },
  data: () => ({ dismissed: false }),
  template: /* html */ `
    <div class="demo-stack">
      <ShadcnNotice variant="info" title="Informação">Configuração salva automaticamente.</ShadcnNotice>
      <ShadcnNotice variant="blue" title="Novidade">O novo painel de rotas já está disponível.</ShadcnNotice>
      <ShadcnNotice variant="success" title="Ativado">Integração concluída com sucesso.</ShadcnNotice>
      <ShadcnNotice variant="warning" title="Pagamento manual">Pix e Boleto geram um link novo de cobrança a cada ciclo.</ShadcnNotice>
      <ShadcnNotice variant="pending" title="Aguardando ativação no Stripe">Clique em "Sincronizar" para criar a assinatura no gateway.</ShadcnNotice>
      <ShadcnNotice v-if="!dismissed" variant="destructive" title="Falha ao carregar" :dismissible="true" @dismiss="dismissed = true">Não foi possível buscar os dados.</ShadcnNotice>
      <p v-else class="demo-note">The destructive notice was dismissed — reload the preview to bring it back.</p>
    </div>
  `
};

/* ──────────────────────── ShadcnEditFieldModal ─────────────────────── */

const EditFieldModalDemo: Component = {
  components: { ShadcnEditFieldModal, ShadcnButton, ShadcnInput },
  data: () => ({ value: "Popgás Matriz", saved: "Popgás Matriz" }),
  methods: {
    open() {
      (this.$refs.modal as unknown as { show: () => void }).show();
    },
    save() {
      const vm = this as unknown as { value: string; saved: string };
      vm.saved = vm.value;
      (this.$refs.modal as unknown as { hide: () => void }).hide();
    }
  },
  template: /* html */ `
    <div class="demo-stack">
      <ShadcnButton @click="open">Alterar nome</ShadcnButton>
      <p class="demo-note">saved value: <strong>{{ saved }}</strong></p>
      <ShadcnEditFieldModal ref="modal" title="Alterar Nome" description="Atualize o nome da unidade." @save="save">
        <ShadcnInput v-model="value" placeholder="Nome da unidade" />
      </ShadcnEditFieldModal>
    </div>
  `
};

/* ────────────────────── ShadcnRequiredFieldsDialog ─────────────────── */

const RequiredFieldsDialogDemo: Component = {
  components: { ShadcnRequiredFieldsDialog, ShadcnButton },
  data: () => ({
    fields: [
      { key: "cnpj", label: "CNPJ", hint: "Passo 1 · Dados cadastrais" },
      { key: "phone", label: "Telefone", hint: "Passo 2 · Contato" },
      { key: "address", label: "Endereço de entrega", hint: "Passo 3 · Logística" }
    ]
  }),
  methods: {
    open() {
      (this.$refs.dialog as unknown as { show: () => void }).show();
    }
  },
  template: /* html */ `
    <div>
      <ShadcnButton @click="open">Validar formulário</ShadcnButton>
      <ShadcnRequiredFieldsDialog
        ref="dialog"
        description="Os campos abaixo precisam ser preenchidos antes de criar o cliente."
        :fields="fields"
      />
    </div>
  `
};

/* ──────────────────────── ShadcnOnboardingPanel ────────────────────── */

const OnboardingPanelDemo: Component = {
  components: { ShadcnOnboardingPanel },
  data: () => ({ last: "—" }),
  template: /* html */ `
    <div class="demo-stack">
      <ShadcnOnboardingPanel
        icon="fa-solid fa-file-shield"
        title="Configure seu certificado digital"
        description="O certificado A1 é necessário para emitir NF-e e demais documentos fiscais."
        action-label="Configurar Certificado"
        secondary-action-label="Saiba mais"
        secondary-action-icon="fa-solid fa-circle-info"
        sub-hint="O arquivo é encriptado antes de ser armazenado."
        sub-hint-icon="fa-solid fa-lock"
        @action="last = 'primary'"
        @secondary-action="last = 'secondary'"
      />
      <p class="demo-note">last action: <strong>{{ last }}</strong></p>
    </div>
  `
};

/* ──────────────────────── ShadcnLoadingOverlay ─────────────────────── */

const LoadingOverlayDemo: Component = {
  components: { ShadcnLoadingOverlay, ShadcnButton },
  data: () => ({ loading: false }),
  methods: {
    run() {
      const vm = this as unknown as { loading: boolean };
      vm.loading = true;
      setTimeout(() => { vm.loading = false; }, 1600);
    }
  },
  template: /* html */ `
    <div class="demo-stack">
      <div style="position: relative; border: 1px solid #e4e4e7; border-radius: 10px; padding: 22px; min-height: 118px; background: #fff">
        <p style="font-size: 13px; font-weight: 600; color: #18181b; margin: 0 0 6px">Resumo do pedido</p>
        <p class="demo-note" style="margin: 0">Click "Salvar" to cover this card with the overlay for ~1.6s.</p>
        <ShadcnLoadingOverlay :visible="loading" text="Salvando…" />
      </div>
      <ShadcnButton @click="run" :disabled="loading">Salvar</ShadcnButton>
    </div>
  `
};

/* ─────────────────────────── ShadcnSkeleton ────────────────────────── */

const SkeletonDemo: Component = {
  components: { ShadcnSkeleton },
  template: /* html */ `
    <div class="demo-stack" style="max-width: 340px">
      <div class="demo-row" style="align-items: center; gap: 12px">
        <ShadcnSkeleton width="40px" height="40px" rounded="full" />
        <div class="demo-stack" style="gap: 8px; flex: 1">
          <ShadcnSkeleton width="70%" height="12px" />
          <ShadcnSkeleton width="45%" height="10px" />
        </div>
      </div>
      <ShadcnSkeleton height="80px" rounded="lg" />
      <div class="demo-row" style="gap: 8px">
        <ShadcnSkeleton width="84px" height="28px" rounded="md" />
        <ShadcnSkeleton width="84px" height="28px" rounded="md" />
      </div>
    </div>
  `
};

/* ─────────────────────────── ShadcnSwitchCard ──────────────────────── */

const SwitchCardDemo: Component = {
  components: { ShadcnSwitchCard },
  data: () => ({ twoFa: true, maintenance: false }),
  template: /* html */ `
    <div class="demo-stack" style="max-width: 440px">
      <ShadcnSwitchCard v-model="twoFa" icon="fa-solid fa-shield-halved" title="Autenticação 2FA" status-on="ATIVO · TOTP" status-off="DESLIGADO" />
      <ShadcnSwitchCard v-model="maintenance" icon="fa-solid fa-screwdriver-wrench" title="Modo manutenção" />
      <p class="demo-note">2FA: <strong>{{ twoFa }}</strong> · maintenance: <strong>{{ maintenance }}</strong></p>
    </div>
  `
};

/* ─────────────────────────── ShadcnSwitchRow ───────────────────────── */

const SwitchRowDemo: Component = {
  components: { ShadcnSwitchRow },
  data: () => ({ email: true, push: false }),
  template: /* html */ `
    <div class="demo-stack" style="max-width: 440px">
      <ShadcnSwitchRow v-model="email" label="Notificações por e-mail" description="Resumo diário das atividades da organização." />
      <ShadcnSwitchRow v-model="push" label="Notificações push" description="Alertas em tempo real no dispositivo." />
      <p class="demo-note">e-mail: <strong>{{ email }}</strong> · push: <strong>{{ push }}</strong></p>
    </div>
  `
};

/* ───────────────────────── ShadcnSwitchSegmented ───────────────────── */

const SwitchSegmentedDemo: Component = {
  components: { ShadcnSwitchSegmented },
  data: () => ({ yearly: false, env: true }),
  template: /* html */ `
    <div class="demo-stack" style="max-width: 440px">
      <ShadcnSwitchSegmented v-model="yearly" off-label="Mensal" on-label="Anual · −20%" />
      <ShadcnSwitchSegmented v-model="env" off-label="Sandbox" on-label="Produção" :compact="true" :squared="true" />
      <p class="demo-note">cycle: <strong>{{ yearly ? 'annual' : 'monthly' }}</strong> · env: <strong>{{ env ? 'production' : 'sandbox' }}</strong></p>
    </div>
  `
};

/* ─────────────────────────── The registry ─────────────────────────── */

export const COMPONENT_DOCS: Record<DocumentedKey, ComponentDoc> = {
  button: {
    demo: ButtonDemo,
    props: [
      { name: "variant", type: "primary | secondary | outline | ghost | success | teal | info | warning | indigo | alert | danger | destructive | outline-danger | destructive-outline | dark", default: "primary", description: "Colour/emphasis of the button." },
      { name: "type", type: "button | submit", default: "button", description: "Native button type." },
      { name: "disabled", type: "boolean", default: "false", description: "Disables the button and dims it to 50% opacity." }
    ],
    events: ["click(ev: MouseEvent) — emitted on click"],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ShadcnButton } from '@arcanalabs/ui-components/vue'",
      "",
      "function save() {",
      "  // …persist changes",
      "}",
      "</script>",
      "",
      "<template>",
      "  <ShadcnButton variant=\"primary\" @click=\"save\">Save</ShadcnButton>",
      "  <ShadcnButton variant=\"outline\">Cancel</ShadcnButton>",
      "  <ShadcnButton variant=\"destructive\" :disabled=\"busy\">Delete</ShadcnButton>",
      "</template>"
    ].join("\n")
  },

  badge: {
    demo: BadgeDemo,
    props: [
      { name: "variant", type: "neutral | blue | green | red | amber | violet", default: "neutral", description: "Colour palette of the pill." },
      { name: "dot", type: "boolean", default: "false", description: "Shows a leading coloured status dot." },
      { name: "size", type: "sm | md", default: "md", description: "Compact (sm) or default (md) sizing." },
      { name: "clickable", type: "boolean", default: "false", description: "Adds pointer cursor + hover for actionable badges." }
    ],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ShadcnBadge } from '@arcanalabs/ui-components/vue'",
      "</script>",
      "",
      "<template>",
      "  <ShadcnBadge variant=\"green\" dot>Active</ShadcnBadge>",
      "  <ShadcnBadge variant=\"blue\">12 records</ShadcnBadge>",
      "  <ShadcnBadge variant=\"red\" size=\"sm\">Overdue</ShadcnBadge>",
      "</template>"
    ].join("\n")
  },

  input: {
    demo: InputDemo,
    props: [
      { name: "modelValue", type: "string | number | null", default: "''", description: "The bound value (v-model). type=\"number\" emits a real number or null." },
      { name: "type", type: "string", default: "text", description: "HTML input type (text, email, password, number, …)." },
      { name: "placeholder", type: "string", default: "''", description: "Placeholder text." },
      { name: "disabled", type: "boolean", default: "false", description: "Disables the input." },
      { name: "readonly", type: "boolean", default: "false", description: "Renders the input read-only." },
      { name: "size", type: "sm | md | lg", default: "md", description: "Control height/padding." }
    ],
    events: [
      "update:modelValue(value) — v-model update",
      "change / blur / focus / keydown / keyup — forwarded native events"
    ],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ref } from 'vue'",
      "import { ShadcnInput } from '@arcanalabs/ui-components/vue'",
      "",
      "const email = ref('')",
      "const qty = ref<number | null>(null)",
      "</script>",
      "",
      "<template>",
      "  <ShadcnInput v-model=\"email\" type=\"email\" placeholder=\"email@company.com\" />",
      "  <ShadcnInput v-model=\"qty\" type=\"number\" :min=\"0\" :max=\"99\" />",
      "</template>"
    ].join("\n")
  },

  select: {
    demo: SelectDemo,
    props: [
      { name: "modelValue", type: "any", default: "null", description: "Selected value (single) or array of values (multiple)." },
      { name: "options", type: "Array<{ label, value, disabled?, description? }> | string[] | number[]", default: "[]", description: "The choices; plain strings/numbers are normalised." },
      { name: "placeholder", type: "string", default: "'Selecione…'", description: "Shown when nothing is selected." },
      { name: "multiple", type: "boolean", default: "false", description: "Enables multi-select (value becomes an array; panel stays open)." },
      { name: "searchable", type: "boolean", default: "false", description: "Adds a filter input at the top of the dropdown." },
      { name: "clearable", type: "boolean", default: "true", description: "Shows an X on hover to clear the value." },
      { name: "disabled", type: "boolean", default: "false", description: "Disables the select." },
      { name: "size", type: "sm | md | lg", default: "md", description: "Trigger height/padding." }
    ],
    events: ["update:modelValue(value) — v-model update", "change(value) — same payload, on selection"],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ref } from 'vue'",
      "import { ShadcnSelect } from '@arcanalabs/ui-components/vue'",
      "",
      "const fruit = ref<string | null>(null)",
      "const options = [",
      "  { label: 'Apple', value: 'apple' },",
      "  { label: 'Banana', value: 'banana' },",
      "  { label: 'Cherry', value: 'cherry', description: 'seasonal' },",
      "]",
      "</script>",
      "",
      "<template>",
      "  <ShadcnSelect v-model=\"fruit\" :options=\"options\" searchable placeholder=\"Pick a fruit\" />",
      "</template>"
    ].join("\n")
  },

  checkbox: {
    demo: CheckboxDemo,
    props: [
      { name: "modelValue", type: "boolean", default: "false", description: "Checked state (v-model)." },
      { name: "indeterminate", type: "boolean", default: "false", description: "Renders the \"some selected\" dash; does not change the emitted value." },
      { name: "disabled", type: "boolean", default: "false", description: "Disables the checkbox." },
      { name: "label", type: "string", default: "''", description: "Inline label (or use the default slot)." },
      { name: "name", type: "string", default: "''", description: "name attribute of the underlying input." },
      { name: "ariaLabel", type: "string", default: "''", description: "aria-label when there is no visible label." }
    ],
    events: ["update:modelValue(checked) — v-model update", "change(checked) — on toggle"],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ref } from 'vue'",
      "import { ShadcnCheckbox } from '@arcanalabs/ui-components/vue'",
      "",
      "const accepted = ref(false)",
      "</script>",
      "",
      "<template>",
      "  <ShadcnCheckbox v-model=\"accepted\" label=\"I accept the terms\" />",
      "</template>"
    ].join("\n")
  },

  switch: {
    demo: SwitchDemo,
    props: [
      { name: "modelValue", type: "boolean", default: "false", description: "On/off state (v-model)." },
      { name: "disabled", type: "boolean", default: "false", description: "Disables the switch." },
      { name: "size", type: "sm | md | lg", default: "md", description: "Track/thumb sizing." },
      { name: "name", type: "string", default: "''", description: "When set, renders a hidden checkbox for native form submission." },
      { name: "ariaLabel", type: "string", default: "''", description: "aria-label for screen readers (recommended)." }
    ],
    events: ["update:modelValue(value) — v-model update", "change(value) — on toggle"],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ref } from 'vue'",
      "import { ShadcnSwitch } from '@arcanalabs/ui-components/vue'",
      "",
      "const autoRenew = ref(true)",
      "</script>",
      "",
      "<template>",
      "  <label class=\"form-row\">",
      "    <span>Auto-renew</span>",
      "    <ShadcnSwitch v-model=\"autoRenew\" aria-label=\"Auto-renew\" />",
      "  </label>",
      "</template>"
    ].join("\n")
  },

  tabs: {
    demo: TabsDemo,
    props: [
      { name: "modelValue", type: "string | number", default: "— (required)", description: "Name of the active tab (v-model)." },
      { name: "tabs", type: "Array<{ name, label, disabled?, icon?, badge?, group?, tone? }>", default: "— (required)", description: "Tab definitions; each name becomes a matching slot." },
      { name: "variant", type: "pills | underline | boxed | sidebar | sidebar-soft | segmented", default: "pills", description: "Visual style of the tablist." },
      { name: "orientation", type: "horizontal | vertical", default: "horizontal", description: "Tablist placement (sidebar variants force vertical)." },
      { name: "keepAlive", type: "boolean", default: "false", description: "Keeps inactive panels mounted (preserves their state)." },
      { name: "ariaLabel", type: "string", default: "''", description: "Accessible name of the tablist." }
    ],
    events: ["update:modelValue(name) — v-model update", "change(name) — on tab change"],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ref } from 'vue'",
      "import { ShadcnTabs } from '@arcanalabs/ui-components/vue'",
      "",
      "const active = ref('overview')",
      "const tabs = [",
      "  { name: 'overview', label: 'Overview' },",
      "  { name: 'activity', label: 'Activity', badge: 3 },",
      "  { name: 'settings', label: 'Settings' },",
      "]",
      "</script>",
      "",
      "<template>",
      "  <ShadcnTabs v-model=\"active\" :tabs=\"tabs\" variant=\"pills\">",
      "    <template #overview>…</template>",
      "    <template #activity>…</template>",
      "    <template #settings>…</template>",
      "  </ShadcnTabs>",
      "</template>"
    ].join("\n")
  },

  dialog: {
    demo: DialogDemo,
    props: [
      { name: "title", type: "string", default: "''", description: "Header title (ignored if the header slot is used)." },
      { name: "description", type: "string", default: "''", description: "Sub-title under the header title." },
      { name: "size", type: "sm | md | lg | xl | full | number", default: "md", description: "Max width preset (md = 580px) or a px number." },
      { name: "closeable", type: "boolean", default: "true", description: "Shows the X close button in the header." },
      { name: "closeOnOverlayClick", type: "boolean", default: "false", description: "Close when the backdrop is clicked." },
      { name: "closeOnEscape", type: "boolean", default: "true", description: "Close when Escape is pressed." }
    ],
    events: [
      "show — emitted from show()",
      "hide — emitted from hide()",
      "Methods (via ref): show(), hide()"
    ],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ref } from 'vue'",
      "import { ShadcnDialog, ShadcnButton } from '@arcanalabs/ui-components/vue'",
      "",
      "const dialog = ref()",
      "</script>",
      "",
      "<template>",
      "  <ShadcnButton @click=\"dialog.show()\">Open</ShadcnButton>",
      "",
      "  <ShadcnDialog ref=\"dialog\" title=\"Delete workspace\" description=\"This cannot be undone.\">",
      "    <p>Body content…</p>",
      "    <template #footer=\"{ hide }\">",
      "      <ShadcnButton variant=\"outline\" @click=\"hide\">Cancel</ShadcnButton>",
      "      <ShadcnButton variant=\"destructive\" @click=\"hide\">Delete</ShadcnButton>",
      "    </template>",
      "  </ShadcnDialog>",
      "</template>"
    ].join("\n")
  },

  inputMask: {
    demo: InputMaskDemo,
    props: [
      { name: "modelValue", type: "string | number | null", default: "''", description: "The bound RAW value (v-model) — mask characters are stripped." },
      { name: "mask", type: "string | string[]", default: "— (required)", description: "Mask pattern. An array enables length-driven dynamic masks (e.g. landline vs mobile)." },
      { name: "placeholder", type: "string", default: "''", description: "Placeholder text." },
      { name: "disabled", type: "boolean", default: "false", description: "Disables the input." },
      { name: "readonly", type: "boolean", default: "false", description: "Renders the input read-only." },
      { name: "name", type: "string", default: "undefined", description: "name attribute of the underlying input." },
      { name: "size", type: "sm | md | lg", default: "md", description: "Control height/padding." }
    ],
    events: [
      "update:modelValue(raw) — v-model update with the unmasked value",
      "blur / focus — forwarded native events"
    ],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ref } from 'vue'",
      "import { ShadcnInputMask } from '@arcanalabs/ui-components/vue'",
      "// Requires Maska registered globally — see \"Registering v-maska\".",
      "",
      "const cpf = ref('')",
      "const phone = ref('')",
      "</script>",
      "",
      "<template>",
      "  <ShadcnInputMask v-model=\"cpf\" mask=\"###.###.###-##\" placeholder=\"CPF\" />",
      "  <ShadcnInputMask v-model=\"phone\" :mask=\"['(##) ####-####', '(##) #####-####']\" />",
      "</template>"
    ].join("\n")
  },

  inputBoolean: {
    demo: InputBooleanDemo,
    props: [
      { name: "modelValue", type: "boolean | number | string | null", default: "— (required)", description: "Bound value; accepts true/1, false/0, 'IS_NOT_NULL'/'IS_NULL' or null." },
      { name: "variation", type: "'' | status | nullable", default: "''", description: "'' → Sim/Não (1/0); status → Ativo/Inativo (1/0); nullable → IS_NOT_NULL/IS_NULL." },
      { name: "clearable", type: "boolean", default: "true", description: "Adds a leading \"Todos\" option that resets the value to null (filter contexts)." },
      { name: "disabled", type: "boolean | number", default: "false", description: "Disables the select." },
      { name: "placeholder", type: "string", default: "'Selecione…'", description: "Shown when nothing is selected." }
    ],
    events: ["update:modelValue(value) — v-model update", "change(value) — on selection"],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ref } from 'vue'",
      "import { ShadcnInputBoolean } from '@arcanalabs/ui-components/vue'",
      "",
      "const active = ref<number | null>(1)",
      "</script>",
      "",
      "<template>",
      "  <ShadcnInputBoolean v-model=\"active\" variation=\"status\" :clearable=\"false\" />",
      "</template>"
    ].join("\n")
  },

  numberStepper: {
    demo: NumberStepperDemo,
    props: [
      { name: "modelValue", type: "number | string | null", default: "0", description: "The numeric value (v-model)." },
      { name: "min", type: "number", default: "0", description: "Lower bound; the − button disables here." },
      { name: "max", type: "number", default: "Infinity", description: "Upper bound; the + button disables here." },
      { name: "step", type: "number", default: "1", description: "Increment/decrement amount." },
      { name: "disabled", type: "boolean", default: "false", description: "Disables the whole control." },
      { name: "ariaLabel", type: "string", default: "''", description: "Accessible name used on the input and both buttons." }
    ],
    events: ["update:modelValue(value) — v-model update (clamped)", "change(value) — on button/keyboard change"],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ref } from 'vue'",
      "import { ShadcnNumberStepper } from '@arcanalabs/ui-components/vue'",
      "",
      "const qty = ref(1)",
      "</script>",
      "",
      "<template>",
      "  <ShadcnNumberStepper v-model=\"qty\" :min=\"0\" :max=\"10\" aria-label=\"Quantity\" />",
      "</template>"
    ].join("\n")
  },

  multiSelectPopover: {
    demo: MultiSelectPopoverDemo,
    props: [
      { name: "modelValue", type: "Record<string, number[]>", default: "{}", description: "Map of tab key → selected id array (one bucket per tab)." },
      { name: "tabs", type: "Array<{ key, label, icon?, placeholder?, fetch, searchFields?, countLabel? }>", default: "— (required)", description: "Tab definitions; each fetch() is async and cached for the component's lifetime." },
      { name: "emptyLabel", type: "string", default: "'Selecionar…'", description: "Trigger text when nothing is selected." },
      { name: "triggerIcon", type: "string", default: "'fa-solid fa-list-check'", description: "Icon of the default trigger (ignored when the #trigger slot is used)." },
      { name: "defaultTab", type: "string", default: "''", description: "Initial active tab key; falls back to the first tab." }
    ],
    events: [
      "update:modelValue(map) — v-model update",
      "change(map) — on any selection change",
      "open / close — panel visibility",
      "Slots: #trigger { open, toggle, isOpen, summary, isEmpty, selectedCount }, #item { item, tab, selected }"
    ],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ref } from 'vue'",
      "import { MultiSelectPopover } from '@arcanalabs/ui-components/vue'",
      "",
      "const selections = ref<Record<string, number[]>>({ USER: [], DEPARTMENT: [] })",
      "const tabs = [",
      "  { key: 'USER', label: 'Users', icon: 'fa-solid fa-user', fetch: loadUsers },",
      "  { key: 'DEPARTMENT', label: 'Departments', icon: 'fa-solid fa-sitemap', fetch: loadDepts },",
      "]",
      "</script>",
      "",
      "<template>",
      "  <MultiSelectPopover v-model=\"selections\" :tabs=\"tabs\" empty-label=\"Select people\" />",
      "</template>"
    ].join("\n")
  },

  radioCardGroup: {
    demo: RadioCardGroupDemo,
    props: [
      { name: "modelValue", type: "string | number | boolean | null", default: "null", description: "Selected option value (v-model)." },
      { name: "options", type: "Array<{ label, value, description?, icon?, badge?, disabled?, iconBg?, iconColor?, iconBorder? }>", default: "— (required)", description: "The card options." },
      { name: "name", type: "string", default: "auto", description: "name shared by the radio inputs; auto-generated per instance if omitted." },
      { name: "ariaLabel", type: "string", default: "''", description: "Accessible name for the role=\"radiogroup\"." },
      { name: "disabled", type: "boolean", default: "false", description: "Disables every option." },
      { name: "inline", type: "boolean", default: "false", description: "Lays cards out in a single equal-width row." },
      { name: "columns", type: "number", default: "0", description: "When > 0, renders an N-column grid (overrides inline)." },
      { name: "radioPosition", type: "start | end", default: "start", description: "Places the radio circle on the left (start) or right (end)." }
    ],
    events: ["update:modelValue(value) — v-model update", "change(value) — on selection"],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ref } from 'vue'",
      "import { ShadcnRadioCardGroup } from '@arcanalabs/ui-components/vue'",
      "",
      "const method = ref('pix')",
      "const options = [",
      "  { label: 'Credit card', value: 'credit_card', description: 'Recurring charge.' },",
      "  { label: 'Pix', value: 'pix', badge: 'Recommended' },",
      "]",
      "</script>",
      "",
      "<template>",
      "  <ShadcnRadioCardGroup v-model=\"method\" :options=\"options\" aria-label=\"Payment method\" />",
      "</template>"
    ].join("\n")
  },

  segmentedOptions: {
    demo: SegmentedOptionsDemo,
    props: [
      { name: "modelValue", type: "string | number | null", default: "null", description: "Value of the active option (v-model)." },
      { name: "options", type: "Array<{ label, value, disabled?, icon? }>", default: "[]", description: "The segments." },
      { name: "disabled", type: "boolean", default: "false", description: "Disables the whole group." },
      { name: "compact", type: "boolean", default: "false", description: "Reduced height/font for dense forms." },
      { name: "squared", type: "boolean", default: "false", description: "Moderate corner radius instead of the full pill." },
      { name: "activeColor", type: "string (CSS color)", default: "'#18181b'", description: "Fill colour of the active segment." },
      { name: "radio", type: "boolean", default: "false", description: "Shows a radio circle to the left of each option." },
      { name: "autoSelectFirst", type: "boolean", default: "false", description: "Selects the first enabled option when nothing is selected (dynamic lists)." },
      { name: "ariaLabel", type: "string", default: "''", description: "Accessible name for the role=\"radiogroup\"." },
      { name: "emptyText", type: "string", default: "'Sem opções disponíveis'", description: "Shown when options is empty." }
    ],
    events: ["update:modelValue(value) — v-model update", "change(value) — on selection"],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ref } from 'vue'",
      "import { ShadcnSegmentedOptions } from '@arcanalabs/ui-components/vue'",
      "",
      "const view = ref('list')",
      "const options = [",
      "  { label: 'List', value: 'list' },",
      "  { label: 'Grid', value: 'grid' },",
      "]",
      "</script>",
      "",
      "<template>",
      "  <ShadcnSegmentedOptions v-model=\"view\" :options=\"options\" aria-label=\"View mode\" />",
      "</template>"
    ].join("\n")
  },

  datePicker: {
    demo: DatePickerDemo,
    props: [
      { name: "modelValue", type: "string | string[] | null", default: "null", description: "ISO 'YYYY-MM-DD' string (or a tuple for ranges)." },
      { name: "type", type: "date | daterange | month | year | …", default: "date", description: "'date' uses the masked composite; other types use the calendar directly." },
      { name: "disabled", type: "boolean", default: "false", description: "Disables the field." },
      { name: "clearable", type: "boolean", default: "true", description: "Shows a clear affordance (non-composite types)." },
      { name: "editable", type: "boolean", default: "true", description: "Allows typing (ignored for ranges)." },
      { name: "placeholder", type: "string", default: "''", description: "Placeholder text." },
      { name: "size", type: "sm | md | lg", default: "md", description: "Field height/padding." }
    ],
    events: ["update:modelValue(ymd) — v-model update", "change(ymd) — on pick/type", "blur / focus — forwarded"],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ref } from 'vue'",
      "import { ShadcnDatePicker } from '@arcanalabs/ui-components/vue'",
      "// Requires Maska registered globally — see \"Registering v-maska\".",
      "",
      "const date = ref('2026-07-24')",
      "</script>",
      "",
      "<template>",
      "  <ShadcnDatePicker v-model=\"date\" />",
      "</template>"
    ].join("\n")
  },

  inputCurrency: {
    demo: InputCurrencyDemo,
    props: [
      { name: "modelValue", type: "string | number", default: "—", description: "The bound amount (v-model); carries the formatted string." },
      { name: "shadcn", type: "boolean", default: "false", description: "Renders the zinc-styled field; without it the legacy Bootstrap look is kept." },
      { name: "disabled", type: "boolean | number", default: "false", description: "Shows a read-only formatted value." },
      { name: "fraction", type: "number", default: "2", description: "Number of decimal places." },
      { name: "showIcon", type: "boolean", default: "true", description: "Shows the leading currency icon." },
      { name: "icon", type: "string", default: "'icon-coin-dollar'", description: "Icon class for the leading addon." },
      { name: "prefix", type: "string", default: "''", description: "String prefix rendered before the number (e.g. 'R$ ')." },
      { name: "min", type: "number", default: "undefined", description: "Minimum value clamp." },
      { name: "max", type: "number", default: "MAX_SAFE_INTEGER", description: "Maximum value clamp." },
      { name: "allowBlank", type: "boolean", default: "false", description: "Permits an empty field instead of coercing to 0." }
    ],
    events: [
      "update:modelValue(value) — v-model update",
      "change / blur — forwarded native events",
      "enter — Enter pressed",
      "Slots: #prepend, #append; Method (via ref): focus()"
    ],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ref } from 'vue'",
      "import { InputCurrency } from '@arcanalabs/ui-components/vue'",
      "",
      "const price = ref('1500.00')",
      "</script>",
      "",
      "<template>",
      "  <InputCurrency v-model=\"price\" :shadcn=\"true\" />",
      "</template>"
    ].join("\n")
  },

  labeledButton: {
    demo: LabeledButtonDemo,
    props: [
      { name: "label", type: "string", default: "— (required)", description: "Button text." },
      { name: "icon", type: "string", default: "''", description: "Leading icon class (FontAwesome)." },
      { name: "color", type: "string", default: "'info-700'", description: "Legacy colour; mapped to a shadcn variant when shadcn is set." },
      { name: "shadcn", type: "boolean", default: "false", description: "Maps color onto a semantic shadcn variant (danger→destructive, grey→ghost, blue→info, …)." },
      { name: "loading", type: "boolean", default: "false", description: "Swaps the icon for a spinner and disables the button." },
      { name: "disabled", type: "boolean", default: "false", description: "Disables the button." },
      { name: "centerLabel", type: "boolean", default: "false", description: "(shadcn) Anchors the icon left and centres the label." },
      { name: "centerContent", type: "boolean", default: "false", description: "(shadcn) Centres icon + label together as a group." }
    ],
    events: ["click(ev: MouseEvent) — emitted on click"],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { LabeledButton } from '@arcanalabs/ui-components/vue'",
      "</script>",
      "",
      "<template>",
      "  <LabeledButton :shadcn=\"true\" label=\"Save\" color=\"green-600\" icon=\"fa-solid fa-check\" @click=\"save\" />",
      "  <LabeledButton :shadcn=\"true\" label=\"Saving…\" color=\"green-600\" :loading=\"busy\" />",
      "</template>"
    ].join("\n")
  },

  accordion: {
    demo: AccordionDemo,
    props: [
      { name: "modelValue", type: "string | string[] | null", default: "null", description: "Open item name (single mode) or array of open names (multiple mode)." },
      { name: "accordion", type: "boolean", default: "true", description: "true → one panel open at a time; false → multiple panels can be open." }
    ],
    events: ["update:modelValue(value) — v-model update", "Provides accordionApi to child <ShadcnAccordionItem> via provide/inject"],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ref } from 'vue'",
      "import { ShadcnAccordion, ShadcnAccordionItem } from '@arcanalabs/ui-components/vue'",
      "",
      "const open = ref('shipping')",
      "</script>",
      "",
      "<template>",
      "  <ShadcnAccordion v-model=\"open\">",
      "    <ShadcnAccordionItem name=\"shipping\" title=\"Shipping\">Ships in 2–3 days.</ShadcnAccordionItem>",
      "    <ShadcnAccordionItem name=\"returns\" title=\"Returns\">30-day free returns.</ShadcnAccordionItem>",
      "  </ShadcnAccordion>",
      "</template>"
    ].join("\n")
  },

  accordionItem: {
    demo: AccordionItemDemo,
    props: [
      { name: "name", type: "string", default: "— (required)", description: "Unique key identifying this panel within the accordion." },
      { name: "title", type: "string", default: "''", description: "Header text (or use the #title slot for rich headers)." },
      { name: "disabled", type: "boolean", default: "false", description: "Blocks toggling this panel." }
    ],
    events: [
      "Reads open state from the parent <ShadcnAccordion> (inject) — must be nested inside one",
      "Slots: #title (header), default (collapsible body)"
    ],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ref } from 'vue'",
      "import { ShadcnAccordion, ShadcnAccordionItem } from '@arcanalabs/ui-components/vue'",
      "",
      "// Multiple-open mode: v-model is an array of open names.",
      "const open = ref<string[]>(['specs'])",
      "</script>",
      "",
      "<template>",
      "  <ShadcnAccordion v-model=\"open\" :accordion=\"false\">",
      "    <ShadcnAccordionItem name=\"specs\" title=\"Specifications\">…</ShadcnAccordionItem>",
      "    <ShadcnAccordionItem name=\"care\">",
      "      <template #title>Care <strong>instructions</strong></template>",
      "      Hand wash cold.",
      "    </ShadcnAccordionItem>",
      "  </ShadcnAccordion>",
      "</template>"
    ].join("\n")
  },

  dropdown: {
    demo: DropdownDemo,
    props: [
      { name: "placement", type: "bottom-end | bottom-start | top-end | top-start", default: "bottom-end", description: "Menu position relative to the trigger (auto flip/shift on overflow)." },
      { name: "offset", type: "number", default: "4", description: "Gap in px between trigger and menu." },
      { name: "disabled", type: "boolean", default: "false", description: "Prevents the menu from opening." },
      { name: "size", type: "default | comfortable", default: "default", description: "Menu density; propagated to child items via provide/inject." }
    ],
    events: [
      "open / close — menu visibility",
      "Slots: #trigger { open, toggle }, default { close } — holds <ShadcnDropdownItem>s"
    ],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ShadcnDropdown, ShadcnDropdownItem, ShadcnButton } from '@arcanalabs/ui-components/vue'",
      "</script>",
      "",
      "<template>",
      "  <ShadcnDropdown placement=\"bottom-start\">",
      "    <template #trigger>",
      "      <ShadcnButton variant=\"outline\">Actions ▾</ShadcnButton>",
      "    </template>",
      "    <ShadcnDropdownItem icon=\"fa-solid fa-pen\" @click=\"rename\">Rename</ShadcnDropdownItem>",
      "    <ShadcnDropdownItem icon=\"fa-solid fa-trash\" variant=\"danger\" divided @click=\"del\">Delete</ShadcnDropdownItem>",
      "  </ShadcnDropdown>",
      "</template>"
    ].join("\n")
  },

  dropdownItem: {
    demo: DropdownItemDemo,
    props: [
      { name: "icon", type: "string", default: "undefined", description: "Leading icon class (FontAwesome)." },
      { name: "iconColor", type: "string", default: "''", description: "Custom colour for the icon only (does not affect text/hover)." },
      { name: "variant", type: "default | danger | success | warning", default: "default", description: "Colour scheme of the row." },
      { name: "disabled", type: "boolean", default: "false", description: "Disables the item." },
      { name: "divided", type: "boolean", default: "false", description: "Draws a separator line above this item." },
      { name: "closeOnClick", type: "boolean", default: "true", description: "Closes the parent dropdown after the click handler runs." },
      { name: "size", type: "default | comfortable | null", default: "null", description: "Overrides the density inherited from <ShadcnDropdown>." }
    ],
    events: [
      "click(ev: MouseEvent) — emitted on click",
      "Dispatches a bubbling shadcn-dropdown-close event unless closeOnClick is false",
      "Slots: default (label), #suffix (right-aligned hint)"
    ],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ShadcnDropdown, ShadcnDropdownItem } from '@arcanalabs/ui-components/vue'",
      "</script>",
      "",
      "<template>",
      "  <ShadcnDropdown size=\"comfortable\">",
      "    <template #trigger><button>Menu ▾</button></template>",
      "    <ShadcnDropdownItem icon=\"fa-solid fa-user\">",
      "      Profile",
      "      <template #suffix>⌘P</template>",
      "    </ShadcnDropdownItem>",
      "    <ShadcnDropdownItem variant=\"danger\" divided @click=\"del\">Delete</ShadcnDropdownItem>",
      "  </ShadcnDropdown>",
      "</template>"
    ].join("\n")
  },

  table: {
    demo: TableDemo,
    props: [
      { name: "columns", type: "Array<{ key, label, width?, align?, valueGetter? }>", default: "— (required)", description: "Column definitions. valueGetter(value, row, index) formats a cell; align: 'right' right-aligns." },
      { name: "rows", type: "any[]", default: "[]", description: "The data rows; each cell reads row[col.key]." },
      { name: "emptyText", type: "string", default: "'Nenhum registro.'", description: "Shown as a single centred cell when rows is empty." }
    ],
    events: [
      "Slots: #cell-<key> { row, value, index } — custom cell render; #footer — a raw <tr> in the tfoot"
    ],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ShadcnTable } from '@arcanalabs/ui-components/vue'",
      "",
      "const columns = [",
      "  { key: 'sku', label: 'SKU', width: '96px' },",
      "  { key: 'name', label: 'Product' },",
      "  { key: 'total', label: 'Total', align: 'right', valueGetter: (v: number) => 'R$ ' + v.toFixed(2) },",
      "]",
      "const rows = [",
      "  { sku: 'GLP-13', name: 'Botijão P13', total: 260 },",
      "]",
      "</script>",
      "",
      "<template>",
      "  <ShadcnTable :columns=\"columns\" :rows=\"rows\">",
      "    <template #cell-name=\"{ row }\"><strong>{{ row.name }}</strong></template>",
      "    <template #footer><tr><td colspan=\"2\">Total</td><td class=\"shadcn-table__td--right\">R$ 260,00</td></tr></template>",
      "  </ShadcnTable>",
      "</template>"
    ].join("\n")
  },

  specSheet: {
    demo: SpecSheetDemo,
    props: [
      { name: "docNum", type: "string", default: "''", description: "Mono uppercase eyebrow at the top (e.g. 'Cadastro Nº 042')." },
      { name: "title", type: "string", default: "''", description: "Main heading (or use the #title slot for rich markup)." },
      { name: "metaLabel", type: "string", default: "''", description: "Small uppercase label above the meta block on the right." },
      { name: "flat", type: "boolean", default: "false", description: "Drops the card chrome (border/radius/bg/shadow) for embedding inside another card." }
    ],
    events: [
      "Slots: default (sections), #header (replace whole header), #title, #meta, #footer (action zone)"
    ],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ShadcnSpecSheet, ShadcnSpecSheetSection, ShadcnSpecSheetField } from '@arcanalabs/ui-components/vue'",
      "</script>",
      "",
      "<template>",
      "  <ShadcnSpecSheet doc-num=\"Cadastro Nº 042\" title=\"Popgás Distribuidora\" meta-label=\"Status\">",
      "    <template #meta><span class=\"shadcn-spec-sheet-badge shadcn-spec-sheet-badge--active\">Ativo</span></template>",
      "    <ShadcnSpecSheetSection title=\"Dados Cadastrais\" section-num=\"§ 01\" icon=\"fa-solid fa-building\" icon-color=\"blue\">",
      "      <ShadcnSpecSheetField label=\"Razão Social\" :value=\"form.trading_name\" :span=\"2\" />",
      "      <ShadcnSpecSheetField label=\"CNPJ\" :value=\"form.document_number\" />",
      "    </ShadcnSpecSheetSection>",
      "    <template #footer><ShadcnButton variant=\"outline\">Alterar Dados</ShadcnButton></template>",
      "  </ShadcnSpecSheet>",
      "</template>"
    ].join("\n")
  },

  specSheetSection: {
    demo: SpecSheetSectionDemo,
    props: [
      { name: "title", type: "string", default: "''", description: "Section heading (or #title slot)." },
      { name: "sectionNum", type: "string", default: "''", description: "Small label on the right of the header (e.g. '§ 01')." },
      { name: "icon", type: "string", default: "''", description: "FontAwesome class for the boxed accent icon." },
      { name: "iconColor", type: "blue | emerald | amber | rose | violet | indigo | teal | slate", default: "slate", description: "Colour of the accent icon/tint." },
      { name: "columns", type: "1 | 2 | 3 | 4 | 5 | 6", default: "2", description: "Number of columns in the field grid." },
      { name: "noRowDividers", type: "boolean", default: "false", description: "Removes the dashed horizontal lines between field rows." },
      { name: "compact", type: "boolean", default: "false", description: "Removes vertical padding for a tight, header-less layout." }
    ],
    events: ["Slots: default (<ShadcnSpecSheetField>s), #title, #actions (right-side header actions)"],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ShadcnSpecSheetSection, ShadcnSpecSheetField } from '@arcanalabs/ui-components/vue'",
      "</script>",
      "",
      "<template>",
      "  <!-- Nested inside a <ShadcnSpecSheet> -->",
      "  <ShadcnSpecSheetSection title=\"Financeiro\" section-num=\"§ 03\" icon=\"fa-solid fa-dollar-sign\" icon-color=\"amber\" :columns=\"3\">",
      "    <template #actions><ShadcnButton variant=\"ghost\">Alterar</ShadcnButton></template>",
      "    <ShadcnSpecSheetField label=\"Limite\" value=\"R$ 5.000,00\" />",
      "    <ShadcnSpecSheetField label=\"Saldo\" value=\"R$ 1.240,00\" />",
      "  </ShadcnSpecSheetSection>",
      "</template>"
    ].join("\n")
  },

  specSheetField: {
    demo: SpecSheetFieldDemo,
    props: [
      { name: "label", type: "string", default: "— (required)", description: "Uppercase mono label (e.g. 'Razão Social')." },
      { name: "value", type: "string | number | null", default: "''", description: "Text value. Empty (null/undefined/'') shows emptyText." },
      { name: "emptyText", type: "string", default: "'Não informado'", description: "Italic muted fallback shown when value is empty." },
      { name: "span", type: "number | string", default: "1", description: "How many grid columns the field spans." }
    ],
    events: ["Slots: default — replaces the rendered value (use for badges/links/HTML)"],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ShadcnSpecSheetField } from '@arcanalabs/ui-components/vue'",
      "</script>",
      "",
      "<template>",
      "  <ShadcnSpecSheetField label=\"CNPJ\" :value=\"form.document_number\" />",
      "  <ShadcnSpecSheetField label=\"Observações\" value=\"\" empty-text=\"Não informado\" />",
      "  <ShadcnSpecSheetField label=\"Status\" :span=\"2\">",
      "    <span class=\"shadcn-spec-sheet-badge shadcn-spec-sheet-badge--active\">Ativo</span>",
      "  </ShadcnSpecSheetField>",
      "</template>"
    ].join("\n")
  },

  summaryTiles: {
    demo: SummaryTilesDemo,
    props: [
      { name: "columns", type: "number | string", default: "3", description: "Grid columns (collapses to 1 below 880px width regardless)." }
    ],
    events: ["Slots: default — one or more <ShadcnSummaryTile>"],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ShadcnSummaryTiles, ShadcnSummaryTile } from '@arcanalabs/ui-components/vue'",
      "</script>",
      "",
      "<template>",
      "  <ShadcnSummaryTiles :columns=\"3\">",
      "    <ShadcnSummaryTile tone=\"positive\" icon=\"fa-solid fa-arrow-down\" label=\"Entradas\" value=\"R$ 1.250,00\" sub=\"4 formas\" />",
      "    <ShadcnSummaryTile tone=\"negative\" icon=\"fa-solid fa-arrow-up\" label=\"Despesas\" value=\"R$ 85,00\" />",
      "    <ShadcnSummaryTile tone=\"indigo\" icon=\"fa-solid fa-sack-dollar\" label=\"Total\" value=\"R$ 1.165,00\" />",
      "  </ShadcnSummaryTiles>",
      "</template>"
    ].join("\n")
  },

  summaryTile: {
    demo: SummaryTileDemo,
    props: [
      { name: "label", type: "string", default: "— (required)", description: "Uppercase eyebrow label." },
      { name: "value", type: "string | number | null", default: "null", description: "Formatted numeric/monetary value (or use the #value slot)." },
      { name: "icon", type: "string", default: "''", description: "FontAwesome class for the leading icon pip." },
      { name: "sub", type: "string", default: "''", description: "Secondary text under the label (or #sub slot)." },
      { name: "tone", type: "neutral | positive | negative | indigo", default: "neutral", description: "Colour variant of the tile." }
    ],
    events: ["Slots: #value (replaces the value), #sub (replaces the sub text)"],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ShadcnSummaryTile } from '@arcanalabs/ui-components/vue'",
      "</script>",
      "",
      "<template>",
      "  <ShadcnSummaryTile tone=\"positive\" icon=\"fa-solid fa-check\" label=\"Aprovados\" value=\"112\" sub=\"hoje\" />",
      "</template>"
    ].join("\n")
  },

  settingsList: {
    demo: SettingsListDemo,
    props: [],
    events: ["Slots: default — <ShadcnSettingsListItem>, <ShadcnSettingsListGroup> or <ShadcnSettingsEditableField>"],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ShadcnSettingsList, ShadcnSettingsListItem, ShadcnSwitch } from '@arcanalabs/ui-components/vue'",
      "import { ref } from 'vue'",
      "",
      "const popgas = ref(true)",
      "</script>",
      "",
      "<template>",
      "  <ShadcnSettingsList>",
      "    <ShadcnSettingsListItem label=\"Modo PopGás\" caption=\"Habilita recursos internos.\">",
      "      <ShadcnSwitch v-model=\"popgas\" aria-label=\"Modo PopGás\" />",
      "    </ShadcnSettingsListItem>",
      "  </ShadcnSettingsList>",
      "</template>"
    ].join("\n")
  },

  settingsListGroup: {
    demo: SettingsListGroupDemo,
    props: [
      { name: "title", type: "string", default: "''", description: "Group header title (or #title slot)." },
      { name: "sectionNum", type: "string", default: "''", description: "Small mono label above the title (e.g. '§ 01')." },
      { name: "meta", type: "string", default: "''", description: "Right-aligned counter/context (or #meta slot)." },
      { name: "icon", type: "string", default: "''", description: "FontAwesome class for the boxed header icon." },
      { name: "iconColor", type: "blue | emerald | amber | rose | violet | indigo | teal | slate", default: "slate", description: "Colour of the header icon box." },
      { name: "collapsible", type: "boolean", default: "false", description: "Turns the header into a button that shows/hides the items + chevron." },
      { name: "defaultCollapsed", type: "boolean", default: "false", description: "When collapsible, starts collapsed." },
      { name: "compact", type: "boolean", default: "false", description: "Reduced padding for header + items." }
    ],
    events: ["Slots: default (items), #title, #meta"],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ShadcnSettingsList, ShadcnSettingsListGroup, ShadcnSettingsListItem } from '@arcanalabs/ui-components/vue'",
      "</script>",
      "",
      "<template>",
      "  <ShadcnSettingsList>",
      "    <ShadcnSettingsListGroup title=\"Pedidos\" icon=\"fa-solid fa-cart-shopping\" icon-color=\"indigo\" meta=\"2 configs\">",
      "      <ShadcnSettingsListItem label=\"Aceitar pedidos\">…</ShadcnSettingsListItem>",
      "    </ShadcnSettingsListGroup>",
      "  </ShadcnSettingsList>",
      "</template>"
    ].join("\n")
  },

  settingsListItem: {
    demo: SettingsListItemDemo,
    props: [
      { name: "label", type: "string", default: "''", description: "Main title (or #label slot for badges/HTML)." },
      { name: "caption", type: "string", default: "''", description: "Muted description under the label (or #caption slot)." },
      { name: "disabled", type: "boolean", default: "false", description: "Dims the row and blocks pointer events." },
      { name: "nested", type: "boolean", default: "false", description: "Sub-item styling: extra indent, muted bg and a connector mark." }
    ],
    events: ["Slots: default (right-side control), #label, #caption"],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ShadcnSettingsListItem, ShadcnSwitch } from '@arcanalabs/ui-components/vue'",
      "</script>",
      "",
      "<template>",
      "  <ShadcnSettingsListItem label=\"Notificações por e-mail\" caption=\"Resumo diário.\">",
      "    <ShadcnSwitch v-model=\"form.notify_email\" aria-label=\"E-mail\" />",
      "  </ShadcnSettingsListItem>",
      "</template>"
    ].join("\n")
  },

  settingsEditableField: {
    demo: SettingsEditableFieldDemo,
    props: [
      { name: "modelValue", type: "any", default: "null", description: "The current value (v-model). Buffered while the edit modal is open." },
      { name: "label", type: "string", default: "— (required)", description: "Row label." },
      { name: "caption", type: "string", default: "''", description: "Muted description under the label." },
      { name: "type", type: "text | currency | number | select", default: "text", description: "Which input the edit modal renders." },
      { name: "options", type: "Array<{ label, value }>", default: "[]", description: "Options for type='select'." },
      { name: "displayFormatter", type: "(value) => string", default: "null", description: "Formats the read-only display next to the button." },
      { name: "nested", type: "boolean", default: "false", description: "Sub-item styling (forwarded to the inner list item)." },
      { name: "min / max", type: "number | string", default: "undefined", description: "Bounds for type='number'." },
      { name: "modalTitle / modalDescription / inputLabel / inputPlaceholder", type: "string", default: "''", description: "Copy overrides for the edit modal." },
      { name: "emptyText", type: "string", default: "'Não definido'", description: "Italic fallback shown when the value is empty." }
    ],
    events: [
      "update:modelValue(value) — emitted on save (with the buffered value)",
      "save(value) — emitted on save, next to update:modelValue (for auto-save)"
    ],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ref } from 'vue'",
      "import { ShadcnSettingsList, ShadcnSettingsEditableField } from '@arcanalabs/ui-components/vue'",
      "",
      "const discount = ref('1500.00')",
      "</script>",
      "",
      "<template>",
      "  <ShadcnSettingsList>",
      "    <ShadcnSettingsEditableField",
      "      label=\"Desconto 1ª compra\"",
      "      caption=\"Valor unitário aplicado.\"",
      "      type=\"currency\"",
      "      v-model=\"discount\"",
      "      @save=\"autoSave\"",
      "    />",
      "  </ShadcnSettingsList>",
      "</template>"
    ].join("\n")
  },

  sparkGridEmptyState: {
    demo: SparkGridEmptyStateDemo,
    props: [
      { name: "total", type: "number", default: "— (required)", description: "Row count; the panel only shows when total is 0." },
      { name: "loading", type: "boolean", default: "— (required)", description: "Fetch state. The panel arms after loading goes true → false." },
      { name: "filtered", type: "boolean", default: "— (required)", description: "When true (a filter is active) the panel is suppressed." },
      { name: "icon", type: "string", default: "— (required)", description: "FontAwesome class for the panel icon." },
      { name: "title", type: "string", default: "— (required)", description: "Panel title." },
      { name: "description", type: "string", default: "''", description: "Panel description." },
      { name: "actionLabel", type: "string", default: "— (required)", description: "Primary CTA label." },
      { name: "secondaryActionLabel", type: "string", default: "''", description: "Optional secondary CTA label." },
      { name: "secondaryActionIcon", type: "string", default: "''", description: "Icon for the secondary CTA." },
      { name: "subHint", type: "string", default: "''", description: "Discreet footer hint." }
    ],
    events: [
      "action / secondary-action — CTA clicks",
      "panel-visible(visible) — fires when the empty-state panel shows/hides",
      "Slots: default — the real grid content, shown while the panel is hidden"
    ],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { SparkGridEmptyState } from '@arcanalabs/ui-components/vue'",
      "</script>",
      "",
      "<template>",
      "  <SparkGridEmptyState",
      "    :total=\"rows.length\"",
      "    :loading=\"loading\"",
      "    :filtered=\"hasActiveFilter\"",
      "    icon=\"fa-solid fa-box-open\"",
      "    title=\"Nenhum produto cadastrado\"",
      "    action-label=\"Adicionar Produto\"",
      "    @action=\"openCreate\"",
      "  >",
      "    <MyGrid :rows=\"rows\" />",
      "  </SparkGridEmptyState>",
      "</template>"
    ].join("\n")
  },

  notice: {
    demo: NoticeDemo,
    props: [
      { name: "variant", type: "info | blue | success | warning | pending | destructive", default: "info", description: "Semantic colour + default icon." },
      { name: "title", type: "string", default: "''", description: "Bold title line (or #title slot)." },
      { name: "icon", type: "string", default: "''", description: "Overrides the variant's default FontAwesome icon." },
      { name: "showIcon", type: "boolean", default: "true", description: "Toggles the leading icon." },
      { name: "dismissible", type: "boolean", default: "false", description: "Shows an X that emits dismiss." }
    ],
    events: ["dismiss — emitted when the close button is clicked", "Slots: default (body), #title, #icon"],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ShadcnNotice } from '@arcanalabs/ui-components/vue'",
      "</script>",
      "",
      "<template>",
      "  <ShadcnNotice variant=\"warning\" title=\"Pagamento manual\">",
      "    Pix e Boleto geram um link novo de cobrança a cada ciclo.",
      "  </ShadcnNotice>",
      "  <ShadcnNotice variant=\"destructive\" title=\"Falha\" dismissible @dismiss=\"hide\">Tente novamente.</ShadcnNotice>",
      "</template>"
    ].join("\n")
  },

  editFieldModal: {
    demo: EditFieldModalDemo,
    props: [
      { name: "title", type: "string", default: "— (required)", description: "Modal header title." },
      { name: "description", type: "string", default: "''", description: "Sub-title under the header title." },
      { name: "cancelLabel", type: "string", default: "'Cancelar'", description: "Cancel button label." },
      { name: "saveLabel", type: "string", default: "'Salvar Alterações'", description: "Save button label." },
      { name: "cancelColor / saveColor", type: "string", default: "'white' / 'primary-700'", description: "LabeledButton colours for the footer buttons." },
      { name: "size", type: "sm | md | lg | xl | number", default: "md", description: "Modal width preset or px number." }
    ],
    events: [
      "save — emitted on Save (no auto-close; the caller validates then calls hide())",
      "Methods (via ref): show(), hide()",
      "Slots: default — the field input(s)"
    ],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ref } from 'vue'",
      "import { ShadcnEditFieldModal, ShadcnSelect, ShadcnButton } from '@arcanalabs/ui-components/vue'",
      "",
      "const modal = ref()",
      "const plan = ref('pro')",
      "function savePlan() { /* …persist */ modal.value.hide() }",
      "</script>",
      "",
      "<template>",
      "  <ShadcnButton @click=\"modal.show()\">Alterar Plano</ShadcnButton>",
      "  <ShadcnEditFieldModal ref=\"modal\" title=\"Alterar Plano\" @save=\"savePlan\">",
      "    <ShadcnSelect v-model=\"plan\" :options=\"planOptions\" />",
      "  </ShadcnEditFieldModal>",
      "</template>"
    ].join("\n")
  },

  requiredFieldsDialog: {
    demo: RequiredFieldsDialogDemo,
    props: [
      { name: "title", type: "string", default: "'Faltam campos obrigatórios'", description: "Header title." },
      { name: "description", type: "string", default: "'Os campos abaixo…'", description: "Text under the title (pass the context)." },
      { name: "fields", type: "Array<{ key, label, hint }>", default: "[]", description: "The missing fields; hint points to the step/section to fix." },
      { name: "buttonLabel", type: "string", default: "'Voltar e corrigir'", description: "Dismiss button label." },
      { name: "size", type: "number | string", default: "560", description: "Dialog width." }
    ],
    events: ["Methods (via ref): show(), hide()"],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ref, computed } from 'vue'",
      "import { ShadcnRequiredFieldsDialog } from '@arcanalabs/ui-components/vue'",
      "",
      "const dialog = ref()",
      "const missing = computed(() => REQUIRED.filter(f => !f.check(form)))",
      "function validate() { if (missing.value.length) dialog.value.show() }",
      "</script>",
      "",
      "<template>",
      "  <ShadcnRequiredFieldsDialog ref=\"dialog\" :fields=\"missing\" description=\"…antes de criar o cliente.\" />",
      "</template>"
    ].join("\n")
  },

  onboardingPanel: {
    demo: OnboardingPanelDemo,
    props: [
      { name: "icon", type: "string", default: "— (required)", description: "FontAwesome class for the central gradient icon." },
      { name: "title", type: "string", default: "— (required)", description: "Big panel title." },
      { name: "description", type: "string", default: "''", description: "Body text (or the default slot for rich markup)." },
      { name: "actionLabel", type: "string", default: "''", description: "Primary CTA label (or the #action slot)." },
      { name: "actionIcon", type: "string", default: "'fa-solid fa-plus'", description: "Icon on the primary CTA." },
      { name: "actionLoading", type: "boolean", default: "false", description: "Swaps the CTA icon for a spinner and disables it." },
      { name: "secondaryActionLabel", type: "string", default: "''", description: "Optional secondary (amber) button label." },
      { name: "secondaryActionIcon", type: "string", default: "''", description: "Icon on the secondary button." },
      { name: "subHint", type: "string", default: "''", description: "Discreet footer hint (or #sub-hint slot)." },
      { name: "subHintIcon", type: "string", default: "''", description: "Icon for the sub-hint." }
    ],
    events: [
      "action / secondary-action — CTA clicks",
      "Slots: default (description), #action, #sub-hint"
    ],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ShadcnOnboardingPanel } from '@arcanalabs/ui-components/vue'",
      "</script>",
      "",
      "<template>",
      "  <ShadcnOnboardingPanel",
      "    icon=\"fa-solid fa-file-shield\"",
      "    title=\"Configure seu certificado\"",
      "    description=\"O certificado A1 é necessário para emitir NF-e.\"",
      "    action-label=\"Configurar Certificado\"",
      "    @action=\"openCreate\"",
      "  />",
      "</template>"
    ].join("\n")
  },

  loadingOverlay: {
    demo: LoadingOverlayDemo,
    props: [
      { name: "visible", type: "boolean", default: "false", description: "Shows/hides the overlay (with a fade)." },
      { name: "text", type: "string", default: "'Carregando…'", description: "Message shown under the spinner." }
    ],
    events: ["Covers the nearest positioned ancestor — the parent must be position: relative"],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ref } from 'vue'",
      "import { ShadcnLoadingOverlay } from '@arcanalabs/ui-components/vue'",
      "",
      "const saving = ref(false)",
      "</script>",
      "",
      "<template>",
      "  <div style=\"position: relative\">",
      "    <!-- card content -->",
      "    <ShadcnLoadingOverlay :visible=\"saving\" text=\"Salvando…\" />",
      "  </div>",
      "</template>"
    ].join("\n")
  },

  skeleton: {
    demo: SkeletonDemo,
    props: [
      { name: "width", type: "string (CSS)", default: "'100%'", description: "Any valid CSS width (px, %, rem…)." },
      { name: "height", type: "string (CSS)", default: "'14px'", description: "Any valid CSS height." },
      { name: "rounded", type: "sm | md | lg | full | none", default: "md", description: "Corner radius; 'full' for circles/pills." }
    ],
    events: ["aria-hidden — decorative only; pair with an aria-live \"Carregando…\" for screen readers"],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ShadcnSkeleton } from '@arcanalabs/ui-components/vue'",
      "</script>",
      "",
      "<template>",
      "  <ShadcnSkeleton width=\"40px\" height=\"40px\" rounded=\"full\" />",
      "  <ShadcnSkeleton width=\"200px\" height=\"14px\" />",
      "  <ShadcnSkeleton width=\"60%\" height=\"12px\" />",
      "</template>"
    ].join("\n")
  },

  switchCard: {
    demo: SwitchCardDemo,
    props: [
      { name: "modelValue", type: "boolean", default: "false", description: "On/off state (v-model). When on, the whole card turns emerald." },
      { name: "title", type: "string", default: "''", description: "Card title (or #title slot)." },
      { name: "statusOn", type: "string", default: "'ATIVO'", description: "Mono status text shown when on." },
      { name: "statusOff", type: "string", default: "'DESLIGADO'", description: "Mono status text shown when off." },
      { name: "icon", type: "string", default: "''", description: "FontAwesome class for the boxed icon (or #icon slot for SVG)." },
      { name: "disabled", type: "boolean", default: "false", description: "Disables the card." },
      { name: "ariaLabel", type: "string", default: "''", description: "Accessible name when the title isn't enough." }
    ],
    events: ["update:modelValue(value) — v-model update", "change(value) — on toggle", "Slots: #icon, #title, #status"],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ref } from 'vue'",
      "import { ShadcnSwitchCard } from '@arcanalabs/ui-components/vue'",
      "",
      "const twoFa = ref(true)",
      "</script>",
      "",
      "<template>",
      "  <ShadcnSwitchCard v-model=\"twoFa\" icon=\"fa-solid fa-shield-halved\" title=\"Autenticação 2FA\" status-on=\"ATIVO · TOTP\" />",
      "</template>"
    ].join("\n")
  },

  switchRow: {
    demo: SwitchRowDemo,
    props: [
      { name: "modelValue", type: "boolean", default: "false", description: "On/off state (v-model). The whole row is clickable." },
      { name: "label", type: "string", default: "''", description: "Title (or #label slot)." },
      { name: "description", type: "string", default: "''", description: "Sub-title/description (or #description slot)." },
      { name: "disabled", type: "boolean", default: "false", description: "Disables the row." },
      { name: "ariaLabel", type: "string", default: "''", description: "Accessible name fallback when there is no visible label." }
    ],
    events: ["update:modelValue(value) — v-model update", "change(value) — on toggle", "Slots: #label, #description"],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ref } from 'vue'",
      "import { ShadcnSwitchRow } from '@arcanalabs/ui-components/vue'",
      "",
      "const email = ref(true)",
      "</script>",
      "",
      "<template>",
      "  <ShadcnSwitchRow v-model=\"email\" label=\"Notificações por e-mail\" description=\"Resumo diário das atividades.\" />",
      "</template>"
    ].join("\n")
  },

  switchSegmented: {
    demo: SwitchSegmentedDemo,
    props: [
      { name: "modelValue", type: "boolean", default: "false", description: "false = left option, true = right option (v-model)." },
      { name: "offLabel", type: "string", default: "'Inativo'", description: "Left option label (or #off-label slot)." },
      { name: "onLabel", type: "string", default: "'Ativo'", description: "Right option label (or #on-label slot)." },
      { name: "disabled", type: "boolean", default: "false", description: "Disables the control." },
      { name: "compact", type: "boolean", default: "false", description: "Shorter height/font for inline use in dense forms." },
      { name: "squared", type: "boolean", default: "false", description: "Moderate corner radius instead of the full pill." },
      { name: "activeColor", type: "string (CSS color)", default: "'#18181b'", description: "Fill colour of the sliding indicator." },
      { name: "radio", type: "boolean", default: "false", description: "Shows a radio circle on each side, filled on the active one." },
      { name: "ariaLabel", type: "string", default: "auto", description: "Accessible name; falls back to 'off ou on'." }
    ],
    events: ["update:modelValue(value) — v-model update", "change(value) — on toggle", "Slots: #off-label, #on-label"],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ref } from 'vue'",
      "import { ShadcnSwitchSegmented } from '@arcanalabs/ui-components/vue'",
      "",
      "const yearly = ref(false)",
      "</script>",
      "",
      "<template>",
      "  <ShadcnSwitchSegmented v-model=\"yearly\" off-label=\"Mensal\" on-label=\"Anual · −20%\" />",
      "</template>"
    ].join("\n")
  }
};
