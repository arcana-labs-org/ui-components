import type { Component } from "vue";
import type { DocumentedKey } from "../i18n/types";

import ArcanaButton from "../../../src/vue/components/ArcanaButton.vue";
import ArcanaBadge from "../../../src/vue/components/ArcanaBadge.vue";
import ArcanaInput from "../../../src/vue/components/ArcanaInput.vue";
import ArcanaSelect from "../../../src/vue/components/ArcanaSelect.vue";
import ArcanaCheckbox from "../../../src/vue/components/ArcanaCheckbox.vue";
import ArcanaSwitch from "../../../src/vue/components/ArcanaSwitch.vue";
import ArcanaTabs from "../../../src/vue/components/ArcanaTabs.vue";
import ArcanaDialog from "../../../src/vue/components/ArcanaDialog.vue";
// ── Batch 2 ──
import ArcanaInputMask from "../../../src/vue/components/ArcanaInputMask.vue";
import ArcanaInputBoolean from "../../../src/vue/components/ArcanaInputBoolean.vue";
import ArcanaNumberStepper from "../../../src/vue/components/ArcanaNumberStepper.vue";
import ArcanaMultiSelectPopover from "../../../src/vue/components/ArcanaMultiSelectPopover.vue";
import ArcanaRadioCardGroup from "../../../src/vue/components/ArcanaRadioCardGroup.vue";
import ArcanaSegmentedOptions from "../../../src/vue/components/ArcanaSegmentedOptions.vue";
import ArcanaDatePicker from "../../../src/vue/components/ArcanaDatePicker.vue";
import ArcanaInputCurrency from "../../../src/vue/components/ArcanaInputCurrency.vue";
import ArcanaAccordion from "../../../src/vue/components/ArcanaAccordion.vue";
import ArcanaAccordionItem from "../../../src/vue/components/ArcanaAccordionItem.vue";
import ArcanaDropdown from "../../../src/vue/components/ArcanaDropdown.vue";
import ArcanaDropdownItem from "../../../src/vue/components/ArcanaDropdownItem.vue";
// ── Batch 3 ──
import ArcanaTable from "../../../src/vue/components/ArcanaTable.vue";
import ArcanaSpecSheet from "../../../src/vue/components/ArcanaSpecSheet.vue";
import ArcanaSpecSheetSection from "../../../src/vue/components/ArcanaSpecSheetSection.vue";
import ArcanaSpecSheetField from "../../../src/vue/components/ArcanaSpecSheetField.vue";
import ArcanaSummaryTile from "../../../src/vue/components/ArcanaSummaryTile.vue";
import ArcanaSummaryTilesGroup from "../../../src/vue/components/ArcanaSummaryTilesGroup.vue";
import ArcanaSettingsList from "../../../src/vue/components/ArcanaSettingsList.vue";
import ArcanaSettingsListGroup from "../../../src/vue/components/ArcanaSettingsListGroup.vue";
import ArcanaSettingsListItem from "../../../src/vue/components/ArcanaSettingsListItem.vue";
import ArcanaSettingsEditableField from "../../../src/vue/components/ArcanaSettingsEditableField.vue";
import ArcanaNotice from "../../../src/vue/components/ArcanaNotice.vue";
import ArcanaEditFieldDialog from "../../../src/vue/components/ArcanaEditFieldDialog.vue";
import ArcanaRequiredFieldsDialog from "../../../src/vue/components/ArcanaRequiredFieldsDialog.vue";
import ArcanaOnboardingPanel from "../../../src/vue/components/ArcanaOnboardingPanel.vue";
import ArcanaLoadingOverlay from "../../../src/vue/components/ArcanaLoadingOverlay.vue";
import ArcanaSkeleton from "../../../src/vue/components/ArcanaSkeleton.vue";
import ArcanaSwitchCard from "../../../src/vue/components/ArcanaSwitchCard.vue";
import ArcanaSwitchRow from "../../../src/vue/components/ArcanaSwitchRow.vue";
import ArcanaSwitchSegmented from "../../../src/vue/components/ArcanaSwitchSegmented.vue";

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

/* ─────────────────────────── ArcanaButton ─────────────────────────── */

const ButtonDemo: Component = {
  components: { ArcanaButton },
  data: () => ({ clicks: 0 }),
  template: /* html */ `
    <div class="demo-stack">
      <div class="demo-row">
        <ArcanaButton @click="clicks++">{{ $dt.btnPrimary }}</ArcanaButton>
        <ArcanaButton variant="secondary">{{ $dt.btnSecondary }}</ArcanaButton>
        <ArcanaButton variant="outline">{{ $dt.btnOutline }}</ArcanaButton>
        <ArcanaButton variant="ghost">{{ $dt.btnGhost }}</ArcanaButton>
        <ArcanaButton variant="success">{{ $dt.btnSuccess }}</ArcanaButton>
        <ArcanaButton variant="indigo">{{ $dt.btnIndigo }}</ArcanaButton>
        <ArcanaButton variant="destructive">{{ $dt.btnDestructive }}</ArcanaButton>
        <ArcanaButton variant="outline-danger">{{ $dt.btnOutlineDanger }}</ArcanaButton>
        <ArcanaButton :disabled="true">{{ $dt.disabledLabel }}</ArcanaButton>
      </div>
      <div class="demo-row">
        <ArcanaButton variant="primary"><i class="fa-solid fa-plus"></i> {{ $dt.btnNew }}</ArcanaButton>
        <ArcanaButton variant="outline"><i class="fa-solid fa-download"></i> {{ $dt.btnExport }}</ArcanaButton>
        <ArcanaButton variant="destructive"><i class="fa-solid fa-trash"></i> {{ $dt.btnDelete }}</ArcanaButton>
        <ArcanaButton variant="success">{{ $dt.btnSave }} <i class="fa-solid fa-arrow-right"></i></ArcanaButton>
      </div>
      <div class="demo-row">
        <ArcanaButton variant="outline" :aria-label="$dt.btnSettings"><i class="fa-solid fa-gear"></i></ArcanaButton>
        <ArcanaButton variant="ghost" :aria-label="$dt.btnMoreOptions"><i class="fa-solid fa-ellipsis"></i></ArcanaButton>
        <ArcanaButton variant="primary" :aria-label="$dt.btnAdd"><i class="fa-solid fa-plus"></i></ArcanaButton>
        <ArcanaButton variant="destructive" :aria-label="$dt.btnDelete"><i class="fa-solid fa-trash"></i></ArcanaButton>
      </div>
      <p class="demo-note">{{ $dt.primaryClickedPrefix }} <strong>{{ clicks }}</strong> {{ $dt.timesSuffix }}</p>
    </div>
  `
};

/* ─────────────────────────── ArcanaBadge ──────────────────────────── */

const BadgeDemo: Component = {
  components: { ArcanaBadge },
  template: /* html */ `
    <div class="demo-stack">
      <div class="demo-row">
        <ArcanaBadge>{{ $dt.badgeNeutral }}</ArcanaBadge>
        <ArcanaBadge variant="blue">{{ $dt.badgeBlue }}</ArcanaBadge>
        <ArcanaBadge variant="green">{{ $dt.badgeGreen }}</ArcanaBadge>
        <ArcanaBadge variant="red">{{ $dt.badgeRed }}</ArcanaBadge>
        <ArcanaBadge variant="amber">{{ $dt.badgeAmber }}</ArcanaBadge>
        <ArcanaBadge variant="violet">{{ $dt.badgeViolet }}</ArcanaBadge>
      </div>
      <div class="demo-row">
        <ArcanaBadge variant="green" :dot="true">{{ $dt.badgeActive }}</ArcanaBadge>
        <ArcanaBadge variant="red" :dot="true">{{ $dt.badgeOffline }}</ArcanaBadge>
        <ArcanaBadge variant="blue" size="sm">{{ $dt.badgeSmSize }}</ArcanaBadge>
        <ArcanaBadge variant="violet" :clickable="true">{{ $dt.badgeClickable }}</ArcanaBadge>
      </div>
    </div>
  `
};

/* ─────────────────────────── ArcanaInput ──────────────────────────── */

const InputDemo: Component = {
  components: { ArcanaInput },
  data: () => ({ email: "", qty: null as number | null }),
  template: /* html */ `
    <div class="demo-stack" style="max-width: 340px">
      <ArcanaInput v-model="email" type="email" placeholder="email@company.com" />
      <ArcanaInput v-model="qty" type="number" :placeholder="$dt.quantity" :min="0" :max="99" />
      <ArcanaInput :placeholder="$dt.inputReadonly" :model-value="$dt.inputLockedValue" :readonly="true" />
      <p class="demo-note">{{ $dt.inputEmailLabel }}: <strong>{{ email || "—" }}</strong> · {{ $dt.inputQtyLabel }}: <strong>{{ qty === null ? "null" : qty }}</strong> ({{ qty === null ? "empty" : typeof qty }})</p>
    </div>
  `
};

/* ─────────────────────────── ArcanaSelect ─────────────────────────── */

const SelectDemo: Component = {
  components: { ArcanaSelect },
  data() {
    const $dt = (this as unknown as { $dt: Record<string, string> }).$dt;
    return {
      single: null as string | null,
      many: [] as string[],
      fruits: [
        { label: $dt.fruitApple, value: "apple" },
        { label: $dt.fruitBanana, value: "banana" },
        { label: $dt.fruitCherry, value: "cherry", description: $dt.fruitCherryDesc },
        { label: $dt.fruitDurian, value: "durian", disabled: true },
        { label: $dt.fruitElderberry, value: "elderberry" }
      ]
    };
  },
  template: /* html */ `
    <div class="demo-stack" style="max-width: 340px">
      <ArcanaSelect v-model="single" :options="fruits" :placeholder="$dt.selectPickFruit" searchable />
      <ArcanaSelect v-model="many" :options="fruits" :placeholder="$dt.selectPickSeveral" multiple />
      <p class="demo-note">{{ $dt.selectSingleLabel }}: <strong>{{ single ?? "null" }}</strong> · {{ $dt.selectMultipleLabel }}: <strong>[{{ many.join(", ") }}]</strong></p>
    </div>
  `
};

/* ────────────────────────── ArcanaCheckbox ────────────────────────── */

const CheckboxDemo: Component = {
  components: { ArcanaCheckbox },
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
      <ArcanaCheckbox
        :model-value="allChecked"
        :indeterminate="someChecked"
        :label="$dt.checkboxSelectAll"
        @update:modelValue="toggleAll"
      />
      <div class="demo-stack" style="padding-left: 22px; gap: 6px">
        <ArcanaCheckbox v-model="items.a" :label="$dt.checkboxInvoices" />
        <ArcanaCheckbox v-model="items.b" :label="$dt.checkboxReceipts" />
        <ArcanaCheckbox v-model="items.c" :label="$dt.checkboxStatements" />
        <ArcanaCheckbox :model-value="false" :disabled="true" :label="$dt.checkboxArchivedDisabled" />
      </div>
    </div>
  `
};

/* ─────────────────────────── ArcanaSwitch ─────────────────────────── */

const SwitchDemo: Component = {
  components: { ArcanaSwitch },
  data: () => ({ on: true, off: false }),
  template: /* html */ `
    <div class="demo-stack">
      <label class="demo-switch-row"><ArcanaSwitch v-model="on" :aria-label="$dt.switchNotifications" /> <span>{{ $dt.switchNotifications }} ({{ on ? "on" : "off" }})</span></label>
      <label class="demo-switch-row"><ArcanaSwitch v-model="off" :aria-label="$dt.switchBetaFeatures" /> <span>{{ $dt.switchBetaFeatures }} ({{ off ? "on" : "off" }})</span></label>
      <div class="demo-row" style="align-items: center">
        <ArcanaSwitch v-model="on" size="sm" aria-label="small" />
        <ArcanaSwitch v-model="on" size="md" aria-label="medium" />
        <ArcanaSwitch v-model="on" size="lg" aria-label="large" />
        <ArcanaSwitch :model-value="true" :disabled="true" aria-label="disabled" />
      </div>
    </div>
  `
};

/* ──────────────────────────── ArcanaTabs ──────────────────────────── */

const TabsDemo: Component = {
  components: { ArcanaTabs },
  data() {
    const $dt = (this as unknown as { $dt: Record<string, string> }).$dt;
    return {
      active: "overview",
      variant: "pills" as string,
      tabs: [
        { name: "overview", label: $dt.tabOverview },
        { name: "activity", label: $dt.tabActivity, badge: 3 },
        { name: "settings", label: $dt.tabSettings }
      ]
    };
  },
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
      <ArcanaTabs v-model="active" :tabs="tabs" :variant="variant" aria-label="Demo tabs">
        <template #overview><div class="demo-panel">{{ $dt.tabOverviewPanel }}</div></template>
        <template #activity><div class="demo-panel">{{ $dt.tabActivityPanel }}</div></template>
        <template #settings><div class="demo-panel">{{ $dt.tabSettingsPanel }}</div></template>
      </ArcanaTabs>
    </div>
  `
};

/* ─────────────────────────── ArcanaDialog ─────────────────────────── */

const DialogDemo: Component = {
  components: { ArcanaButton, ArcanaDialog },
  methods: {
    open() {
      (this.$refs.dialog as unknown as { show: () => void }).show();
    }
  },
  template: /* html */ `
    <div>
      <ArcanaButton @click="open">{{ $dt.dialogOpen }}</ArcanaButton>
      <ArcanaDialog ref="dialog" :title="$dt.dialogTitle" :description="$dt.dialogDescription">
        <p style="font-size: 13px; color: #52525b; line-height: 1.6">
          {{ $dt.dialogBody }}
        </p>
        <template #footer="{ hide }">
          <ArcanaButton variant="outline" @click="hide">{{ $dt.dialogCancel }}</ArcanaButton>
          <ArcanaButton variant="destructive" @click="hide">{{ $dt.dialogDelete }}</ArcanaButton>
        </template>
      </ArcanaDialog>
    </div>
  `
};

/* ──────────────────────── ArcanaInputMask ─────────────────────────── */

const InputMaskDemo: Component = {
  components: { ArcanaInputMask },
  data: () => ({ cpf: "", phone: "" }),
  template: /* html */ `
    <div class="demo-stack" style="max-width: 340px">
      <ArcanaInputMask v-model="cpf" mask="###.###.###-##" placeholder="CPF" />
      <ArcanaInputMask v-model="phone" :mask="['(##) ####-####', '(##) #####-####']" :placeholder="$dt.maskPhone" />
      <p class="demo-note">{{ $dt.cpfRaw }}: <strong>{{ cpf || "—" }}</strong> · {{ $dt.phoneRaw }}: <strong>{{ phone || "—" }}</strong></p>
    </div>
  `
};

/* ────────────────────── ArcanaInputBoolean ─────────────────────────── */

const InputBooleanDemo: Component = {
  components: { ArcanaInputBoolean },
  data: () => ({ answer: null as unknown, status: 1 as unknown, filter: null as unknown }),
  template: /* html */ `
    <div class="demo-stack" style="max-width: 340px">
      <ArcanaInputBoolean v-model="answer" :placeholder="$dt.boolYesNo" />
      <ArcanaInputBoolean v-model="status" variation="status" />
      <ArcanaInputBoolean v-model="filter" variation="nullable" :placeholder="$dt.boolHasValue" />
      <p class="demo-note">{{ $dt.boolYesNoLabel }}: <strong>{{ answer ?? "null" }}</strong> · {{ $dt.boolStatusLabel }}: <strong>{{ status ?? "null" }}</strong> · {{ $dt.boolNullableLabel }}: <strong>{{ filter ?? "null" }}</strong></p>
    </div>
  `
};

/* ────────────────────── ArcanaNumberStepper ────────────────────────── */

const NumberStepperDemo: Component = {
  components: { ArcanaNumberStepper },
  data: () => ({ qty: 2, weight: 10 }),
  template: /* html */ `
    <div class="demo-stack">
      <ArcanaNumberStepper v-model="qty" :min="0" :max="10" aria-label="Quantity" />
      <ArcanaNumberStepper v-model="weight" :min="0" :max="100" :step="5" aria-label="Weight" />
      <ArcanaNumberStepper :model-value="5" :disabled="true" aria-label="Disabled" />
      <p class="demo-note">{{ $dt.stepperQtyLabel }}: <strong>{{ qty }}</strong> · {{ $dt.stepperWeightLabel }}: <strong>{{ weight }}</strong></p>
    </div>
  `
};

/* ────────────────────── ArcanaMultiSelectPopover ─────────────────────────── */

const ArcanaMultiSelectPopoverDemo: Component = {
  components: { ArcanaMultiSelectPopover },
  data() {
    const $dt = (this as unknown as { $dt: Record<string, string> }).$dt;
    return {
      selections: { USER: [] as number[], DEPARTMENT: [] as number[] } as Record<string, number[]>,
      tabs: [
        { key: "USER", label: $dt.mspUsers, icon: "fa-solid fa-user", fetch: () => Promise.resolve([{ id: 1, name: "Ana" }, { id: 2, name: "Bruno" }, { id: 3, name: "Carla" }]) },
        { key: "DEPARTMENT", label: $dt.mspDepartments, icon: "fa-solid fa-sitemap", fetch: () => Promise.resolve([{ id: 10, name: $dt.mspSales }, { id: 11, name: $dt.mspSupport }]) }
      ]
    };
  },
  template: /* html */ `
    <div class="demo-stack" style="max-width: 340px">
      <ArcanaMultiSelectPopover v-model="selections" :tabs="tabs" :empty-label="$dt.mspEmptyLabel" />
      <p class="demo-note">{{ $dt.mspUsersLabel }}: [{{ selections.USER.join(", ") }}] · {{ $dt.mspDepartmentsLabel }}: [{{ selections.DEPARTMENT.join(", ") }}]</p>
    </div>
  `
};

/* ────────────────────── ArcanaRadioCardGroup ───────────────────────── */

const RadioCardGroupDemo: Component = {
  components: { ArcanaRadioCardGroup },
  data() {
    const $dt = (this as unknown as { $dt: Record<string, string> }).$dt;
    return {
      method: "pix",
      options: [
        { label: $dt.payCreditCard, value: "credit_card", description: $dt.payCreditCardDesc },
        { label: $dt.payPix, value: "pix", description: $dt.payPixDesc, badge: $dt.payPixBadge },
        { label: $dt.payBoleto, value: "boleto", description: $dt.payBoletoDesc },
        { label: $dt.payCash, value: "cash", disabled: true }
      ]
    };
  },
  template: /* html */ `
    <div class="demo-stack" style="max-width: 440px">
      <ArcanaRadioCardGroup v-model="method" :options="options" aria-label="Payment method" />
      <p class="demo-note">{{ $dt.selectedLabel }}: <strong>{{ method }}</strong></p>
    </div>
  `
};

/* ────────────────────── ArcanaSegmentedOptions ─────────────────────── */

const SegmentedOptionsDemo: Component = {
  components: { ArcanaSegmentedOptions },
  data() {
    const $dt = (this as unknown as { $dt: Record<string, string> }).$dt;
    return {
      view: "list",
      options: [
        { label: $dt.segList, value: "list" },
        { label: $dt.segGrid, value: "grid" },
        { label: $dt.segBoard, value: "board" }
      ]
    };
  },
  template: /* html */ `
    <div class="demo-stack" style="max-width: 440px">
      <ArcanaSegmentedOptions v-model="view" :options="options" aria-label="View mode" />
      <ArcanaSegmentedOptions v-model="view" :options="options" :compact="true" :squared="true" />
      <p class="demo-note">{{ $dt.viewLabel }}: <strong>{{ view }}</strong></p>
    </div>
  `
};

/* ────────────────────── ArcanaDatePicker ───────────────────────────── */

const DatePickerDemo: Component = {
  components: { ArcanaDatePicker },
  data: () => ({
    date: "2026-07-24",
    month: "2026-07",
    year: "2026",
    range: ["2026-07-01", "2026-07-15"] as string[],
    datetime: "2026-07-24 14:30"
  }),
  template: /* html */ `
    <div class="demo-stack" style="max-width: 340px">
      <ArcanaDatePicker v-model="date" type="date" />
      <ArcanaDatePicker v-model="month" type="month" />
      <ArcanaDatePicker v-model="year" type="year" />
      <ArcanaDatePicker v-model="range" type="daterange" />
      <ArcanaDatePicker v-model="datetime" type="datetime" />
      <p class="demo-note">{{ $dt.datePickerValueLabel }}: <strong>{{ date }}</strong> · <strong>{{ month }}</strong> · <strong>{{ year }}</strong> · <strong>{{ datetime }}</strong></p>
    </div>
  `
};

/* ────────────────────────── ArcanaInputCurrency ──────────────────────────── */

const ArcanaInputCurrencyDemo: Component = {
  components: { ArcanaInputCurrency },
  data: () => ({ price: "1500.00", cost: "0" }),
  template: /* html */ `
    <div class="demo-stack" style="max-width: 340px">
      <ArcanaInputCurrency v-model="price" :shadcn="true" />
      <ArcanaInputCurrency v-model="cost" :shadcn="true" :disabled="true" />
      <p class="demo-note">{{ $dt.priceRaw }}: <strong>{{ price }}</strong></p>
    </div>
  `
};

/* ─────────────────── ArcanaAccordion + AccordionItem ───────────────── */

const AccordionDemo: Component = {
  components: { ArcanaAccordion, ArcanaAccordionItem },
  data: () => ({ open: "shipping" as string | null }),
  template: /* html */ `
    <div class="demo-stack">
      <ArcanaAccordion v-model="open">
        <ArcanaAccordionItem name="shipping" :title="$dt.accShipping">{{ $dt.accShippingBody }}</ArcanaAccordionItem>
        <ArcanaAccordionItem name="returns" :title="$dt.accReturns">{{ $dt.accReturnsBody }}</ArcanaAccordionItem>
        <ArcanaAccordionItem name="warranty" :title="$dt.accWarranty" :disabled="true">{{ $dt.accWarrantyBody }}</ArcanaAccordionItem>
      </ArcanaAccordion>
      <p class="demo-note">{{ $dt.accOpenSingleLabel }}: <strong>{{ open ?? "null" }}</strong></p>
    </div>
  `
};

const AccordionItemDemo: Component = {
  components: { ArcanaAccordion, ArcanaAccordionItem },
  data: () => ({ open: ["specs"] as string[] }),
  template: /* html */ `
    <div class="demo-stack">
      <ArcanaAccordion v-model="open" :accordion="false">
        <ArcanaAccordionItem name="specs" :title="$dt.accSpecifications">{{ $dt.accSpecificationsBody }}</ArcanaAccordionItem>
        <ArcanaAccordionItem name="care">
          <template #title><span>{{ $dt.accCareTitle }}</span></template>
          {{ $dt.accCareBody }}
        </ArcanaAccordionItem>
      </ArcanaAccordion>
      <p class="demo-note">{{ $dt.accOpenMultipleLabel }}: [{{ open.join(", ") }}]</p>
    </div>
  `
};

/* ──────────────────── ArcanaDropdown + DropdownItem ────────────────── */

const DropdownDemo: Component = {
  components: { ArcanaDropdown, ArcanaDropdownItem, ArcanaButton },
  data: () => ({ last: "—" }),
  template: /* html */ `
    <div class="demo-stack">
      <ArcanaDropdown placement="bottom-start">
        <template #trigger>
          <ArcanaButton variant="outline">{{ $dt.dropdownActions }} ▾</ArcanaButton>
        </template>
        <ArcanaDropdownItem icon="fa-solid fa-pen" @click="last = $dt.ddRename">{{ $dt.ddRename }}</ArcanaDropdownItem>
        <ArcanaDropdownItem icon="fa-solid fa-copy" @click="last = $dt.ddDuplicate">{{ $dt.ddDuplicate }}</ArcanaDropdownItem>
        <ArcanaDropdownItem icon="fa-solid fa-trash" variant="danger" :divided="true" @click="last = $dt.ddDelete">{{ $dt.ddDelete }}</ArcanaDropdownItem>
      </ArcanaDropdown>
      <p class="demo-note">{{ $dt.lastAction }}: <strong>{{ last }}</strong></p>
    </div>
  `
};

const DropdownItemDemo: Component = {
  components: { ArcanaDropdown, ArcanaDropdownItem, ArcanaButton },
  data: () => ({ last: "—" }),
  template: /* html */ `
    <div class="demo-stack">
      <ArcanaDropdown placement="bottom-start" size="comfortable">
        <template #trigger>
          <ArcanaButton variant="outline">{{ $dt.dropdownOpenMenu }} ▾</ArcanaButton>
        </template>
        <ArcanaDropdownItem icon="fa-solid fa-user" @click="last = $dt.ddProfile">
          {{ $dt.ddProfile }}
          <template #suffix>⌘P</template>
        </ArcanaDropdownItem>
        <ArcanaDropdownItem icon="fa-solid fa-check" variant="success" @click="last = $dt.ddApprove">{{ $dt.ddApprove }}</ArcanaDropdownItem>
        <ArcanaDropdownItem icon="fa-solid fa-flag" variant="warning" @click="last = $dt.ddFlag">{{ $dt.ddFlagLabel }}</ArcanaDropdownItem>
        <ArcanaDropdownItem icon="fa-solid fa-trash" variant="danger" :divided="true" @click="last = $dt.ddDelete">{{ $dt.ddDelete }}</ArcanaDropdownItem>
      </ArcanaDropdown>
      <p class="demo-note">{{ $dt.lastAction }}: <strong>{{ last }}</strong></p>
    </div>
  `
};

/* ─────────────────────────── ArcanaTable ──────────────────────────── */

const TableDemo: Component = {
  components: { ArcanaTable, ArcanaBadge },
  data() {
    const $dt = (this as unknown as { $dt: Record<string, string> }).$dt;
    return {
    columns: [
      { key: "sku", label: $dt.colSku, width: "96px" },
      { key: "name", label: $dt.colProduct },
      { key: "qty", label: $dt.colQty, align: "right" },
      { key: "total", label: $dt.colTotal, align: "right", valueGetter: (v: number) => "R$ " + v.toFixed(2) }
    ],
    rows: [
      { sku: "GLP-13", name: "Botijão P13", qty: 2, total: 260, status: "in" },
      { sku: "GLP-45", name: "Botijão P45", qty: 1, total: 480, status: "low" },
      { sku: "AGUA-20", name: "Galão 20L", qty: 5, total: 45, status: "in" }
    ]
    };
  },
  template: /* html */ `
    <ArcanaTable :columns="columns" :rows="rows">
      <template #cell-name="{ row }">
        <strong>{{ row.name }}</strong>
        <ArcanaBadge :variant="row.status === 'low' ? 'amber' : 'green'" size="sm" style="margin-left: 6px">{{ row.status === 'low' ? $dt.tableLow : $dt.tableInStock }}</ArcanaBadge>
      </template>
      <template #footer>
        <tr><td colspan="3">{{ $dt.tableTotalItems }}</td><td class="arcana-table__td--right">R$ 785,00</td></tr>
      </template>
    </ArcanaTable>
  `
};

/* ────────────── ArcanaSpecSheet + Section + Field (composite) ──────── */

const SpecSheetDemo: Component = {
  components: { ArcanaSpecSheet, ArcanaSpecSheetSection, ArcanaSpecSheetField, ArcanaButton },
  template: /* html */ `
    <ArcanaSpecSheet :doc-num="$dt.specSheetDocNum" title="Arcana Labs" :meta-label="$dt.statusLabel">
      <template #meta>
        <span class="arcana-spec-sheet-badge arcana-spec-sheet-badge--active">{{ $dt.statusActive }}</span>
      </template>
      <ArcanaSpecSheetSection :title="$dt.specSheetRegistrationData" section-num="§ 01" icon="fa-solid fa-building" icon-color="blue" :columns="3">
        <ArcanaSpecSheetField :label="$dt.specSheetLegalName" value="Arcana Labs Tecnologia LTDA" />
        <ArcanaSpecSheetField label="CNPJ" value="12.345.678/0001-90" />
        <ArcanaSpecSheetField :label="$dt.specSheetStateRegistration" value="" />
      </ArcanaSpecSheetSection>
      <ArcanaSpecSheetSection :title="$dt.specSheetContact" section-num="§ 02" icon="fa-solid fa-phone" icon-color="emerald">
        <ArcanaSpecSheetField :label="$dt.specSheetPhone" value="(11) 4002-8922" />
        <ArcanaSpecSheetField :label="$dt.specSheetEmail" value="contato@arcanalabs.com" />
      </ArcanaSpecSheetSection>
      <template #footer>
        <ArcanaButton variant="outline">{{ $dt.specSheetChangeData }}</ArcanaButton>
      </template>
    </ArcanaSpecSheet>
  `
};

const SpecSheetSectionDemo: Component = {
  components: { ArcanaSpecSheet, ArcanaSpecSheetSection, ArcanaSpecSheetField, ArcanaButton },
  template: /* html */ `
    <ArcanaSpecSheet flat>
      <ArcanaSpecSheetSection :title="$dt.specSheetFinancial" section-num="§ 03" icon="fa-solid fa-dollar-sign" icon-color="amber" :columns="3">
        <template #actions><ArcanaButton variant="ghost">{{ $dt.actionChange }}</ArcanaButton></template>
        <ArcanaSpecSheetField :label="$dt.specSheetLimit" value="R$ 5.000,00" />
        <ArcanaSpecSheetField :label="$dt.specSheetBalance" value="R$ 1.240,00" />
        <ArcanaSpecSheetField :label="$dt.specSheetDueDate" :value="$dt.specSheetDueDateValue" />
      </ArcanaSpecSheetSection>
      <ArcanaSpecSheetSection :title="$dt.specSheetNotes" icon="fa-solid fa-note-sticky" icon-color="violet" no-row-dividers>
        <ArcanaSpecSheetField :label="$dt.specSheetNotesLabel" :value="$dt.specSheetNotesValue" :span="2" />
      </ArcanaSpecSheetSection>
    </ArcanaSpecSheet>
  `
};

const SpecSheetFieldDemo: Component = {
  components: { ArcanaSpecSheet, ArcanaSpecSheetSection, ArcanaSpecSheetField },
  template: /* html */ `
    <ArcanaSpecSheet flat>
      <ArcanaSpecSheetSection :columns="2">
        <ArcanaSpecSheetField :label="$dt.specSheetName" value="Ana Ribeiro" />
        <ArcanaSpecSheetField :label="$dt.specSheetNickname" value="" :empty-text="$dt.specSheetNotProvided" />
        <ArcanaSpecSheetField :label="$dt.statusLabel" :span="2">
          <span class="arcana-spec-sheet-badge arcana-spec-sheet-badge--active">{{ $dt.statusActive }}</span>
        </ArcanaSpecSheetField>
      </ArcanaSpecSheetSection>
    </ArcanaSpecSheet>
  `
};

/* ──────────── ArcanaSummaryTilesGroup + SummaryTile (composite) ─────── */

const SummaryTilesDemo: Component = {
  components: { ArcanaSummaryTilesGroup, ArcanaSummaryTile },
  template: /* html */ `
    <div class="demo-stack">
      <ArcanaSummaryTilesGroup :columns="3">
        <ArcanaSummaryTile tone="positive" icon="fa-solid fa-arrow-down" :label="$dt.tileIncome" value="R$ 1.250,00" :sub="$dt.tileIncomeSub" />
        <ArcanaSummaryTile tone="negative" icon="fa-solid fa-arrow-up" :label="$dt.tileExpenses" value="R$ 85,00" :sub="$dt.tileExpensesSub" />
        <ArcanaSummaryTile tone="indigo" icon="fa-solid fa-sack-dollar" :label="$dt.tileTotal" value="R$ 1.165,00" />
      </ArcanaSummaryTilesGroup>
      <ArcanaSummaryTilesGroup format="rows">
        <ArcanaSummaryTile tone="positive" icon="fa-solid fa-arrow-down" :label="$dt.tileIncome" value="R$ 1.250,00" :sub="$dt.tileIncomeSub" />
        <ArcanaSummaryTile tone="negative" icon="fa-solid fa-arrow-up" :label="$dt.tileExpenses" value="R$ 85,00" :sub="$dt.tileExpensesSub" />
      </ArcanaSummaryTilesGroup>
    </div>
  `
};

const SummaryTileDemo: Component = {
  components: { ArcanaSummaryTile, ArcanaBadge },
  template: /* html */ `
    <div class="demo-stack" style="max-width: 360px">
      <ArcanaSummaryTile tone="neutral" icon="fa-solid fa-box" :label="$dt.tileOrders" value="128" :sub="$dt.tileToday" />
      <ArcanaSummaryTile tone="positive" icon="fa-solid fa-check" :label="$dt.tileApproved" value="112" />
      <ArcanaSummaryTile tone="negative" icon="fa-solid fa-xmark" :label="$dt.tileCanceled" value="16" />
      <ArcanaSummaryTile tone="indigo" icon="fa-solid fa-percent" :label="$dt.tileConversion">
        <template #value><ArcanaBadge variant="green">87.5%</ArcanaBadge></template>
      </ArcanaSummaryTile>
    </div>
  `
};

/* ─── ArcanaSettingsList + Group + Item + EditableField (composite) ─── */

const SettingsListDemo: Component = {
  components: { ArcanaSettingsList, ArcanaSettingsListItem, ArcanaSwitch },
  data: () => ({ enabled: true, email: false }),
  template: /* html */ `
    <ArcanaSettingsList>
      <ArcanaSettingsListItem :label="$dt.settingsAdvancedFeatures" :caption="$dt.settingsAdvancedFeaturesCaption">
        <ArcanaSwitch v-model="enabled" :aria-label="$dt.settingsAdvancedFeatures" />
      </ArcanaSettingsListItem>
      <ArcanaSettingsListItem :label="$dt.settingsEmailNotifications" :caption="$dt.settingsEmailNotificationsCaption">
        <ArcanaSwitch v-model="email" :aria-label="$dt.specSheetEmail" />
      </ArcanaSettingsListItem>
      <ArcanaSettingsListItem :label="$dt.settingsPlan" :caption="$dt.settingsPlanCaption">
        <span class="arcana-settings-list__current-value">{{ $dt.planProfessional }}</span>
        <button class="arcana-settings-list__edit-btn" type="button">{{ $dt.actionChange }}</button>
      </ArcanaSettingsListItem>
    </ArcanaSettingsList>
  `
};

const SettingsListGroupDemo: Component = {
  components: { ArcanaSettingsList, ArcanaSettingsListGroup, ArcanaSettingsListItem, ArcanaSwitch },
  data: () => ({ a: true, b: false, c: true }),
  template: /* html */ `
    <ArcanaSettingsList>
      <ArcanaSettingsListGroup :title="$dt.tileOrders" icon="fa-solid fa-cart-shopping" icon-color="indigo" section-num="§ 01" :meta="$dt.settingsTwoConfigs">
        <ArcanaSettingsListItem :label="$dt.settingsAcceptOrders" :caption="$dt.settingsAcceptOrdersCaption">
          <ArcanaSwitch v-model="a" :aria-label="$dt.settingsAcceptOrders" />
        </ArcanaSettingsListItem>
        <ArcanaSettingsListItem :label="$dt.settingsAutoConfirm" :caption="$dt.settingsAutoConfirmCaption" nested>
          <ArcanaSwitch v-model="b" :aria-label="$dt.settingsAutoConfirm" />
        </ArcanaSettingsListItem>
      </ArcanaSettingsListGroup>
      <ArcanaSettingsListGroup :title="$dt.settingsDelivery" icon="fa-solid fa-truck" icon-color="emerald" collapsible default-collapsed compact>
        <ArcanaSettingsListItem :label="$dt.settingsRealtimeTracking">
          <ArcanaSwitch v-model="c" :aria-label="$dt.settingsRealtimeTracking" />
        </ArcanaSettingsListItem>
      </ArcanaSettingsListGroup>
    </ArcanaSettingsList>
  `
};

const SettingsListItemDemo: Component = {
  components: { ArcanaSettingsList, ArcanaSettingsListItem, ArcanaSwitch },
  data: () => ({ x: true, y: false }),
  template: /* html */ `
    <ArcanaSettingsList>
      <ArcanaSettingsListItem :caption="$dt.settingsSaasCaption">
        <template #label>{{ $dt.settingsSubscriptionV2 }} <span class="arcana-spec-sheet-badge arcana-spec-sheet-badge--active">{{ $dt.statusActive }}</span></template>
        <ArcanaSwitch v-model="x" :aria-label="$dt.settingsSubscriptionV2" />
      </ArcanaSettingsListItem>
      <ArcanaSettingsListItem :label="$dt.settingsShowWebApp" :caption="$dt.settingsShowWebAppCaption" nested>
        <ArcanaSwitch v-model="y" :aria-label="$dt.settingsShowWebApp" />
      </ArcanaSettingsListItem>
      <ArcanaSettingsListItem :label="$dt.settingsUnavailableFeature" :caption="$dt.settingsUnavailableFeatureCaption" disabled>
        <ArcanaSwitch :model-value="false" :disabled="true" :aria-label="$dt.settingsUnavailableFeature" />
      </ArcanaSettingsListItem>
    </ArcanaSettingsList>
  `
};

const SettingsEditableFieldDemo: Component = {
  components: { ArcanaSettingsList, ArcanaSettingsEditableField },
  data() {
    const $dt = (this as unknown as { $dt: Record<string, string> }).$dt;
    return {
      name: "Arcana Labs Matriz",
      discount: "1500.00",
      plan: "pro" as string,
      planOptions: [
        { label: $dt.planBasic, value: "basic" },
        { label: $dt.planProfessional, value: "pro" },
        { label: $dt.planEnterprise, value: "enterprise" }
      ]
    };
  },
  template: /* html */ `
    <div class="demo-stack">
      <ArcanaSettingsList>
        <ArcanaSettingsEditableField :edit-label="$dt.actionChange" :label="$dt.editableUnitName" :caption="$dt.editableUnitNameCaption" type="text" v-model="name" />
        <ArcanaSettingsEditableField :edit-label="$dt.actionChange" :label="$dt.editableFirstPurchaseDiscount" :caption="$dt.editableFirstPurchaseDiscountCaption" type="currency" v-model="discount" />
        <ArcanaSettingsEditableField :edit-label="$dt.actionChange" :label="$dt.settingsPlan" :caption="$dt.settingsPlanShortCaption" type="select" :options="planOptions" v-model="plan" />
      </ArcanaSettingsList>
      <p class="demo-note">{{ $dt.editableFieldHintPrefix }} <strong>{{ $dt.actionChange }}</strong> {{ $dt.editableFieldHintSuffix }}</p>
    </div>
  `
};

/* ─────────────────────────── ArcanaNotice ──────────────────────────── */

const NoticeDemo: Component = {
  components: { ArcanaNotice },
  data: () => ({ dismissed: false }),
  template: /* html */ `
    <div class="demo-stack">
      <ArcanaNotice variant="info" :title="$dt.noticeInfoTitle">{{ $dt.noticeInfoBody }}</ArcanaNotice>
      <ArcanaNotice variant="blue" :title="$dt.noticeNewTitle">{{ $dt.noticeNewBody }}</ArcanaNotice>
      <ArcanaNotice variant="success" :title="$dt.noticeActivatedTitle">{{ $dt.noticeActivatedBody }}</ArcanaNotice>
      <ArcanaNotice variant="warning" :title="$dt.noticeManualPaymentTitle">{{ $dt.noticeManualPaymentBody }}</ArcanaNotice>
      <ArcanaNotice variant="pending" :title="$dt.noticePendingTitle">{{ $dt.noticePendingBody }}</ArcanaNotice>
      <ArcanaNotice v-if="!dismissed" variant="destructive" :title="$dt.noticeErrorTitle" :dismissible="true" @dismiss="dismissed = true">{{ $dt.noticeErrorBody }}</ArcanaNotice>
      <p v-else class="demo-note">{{ $dt.noticeDismissedHint }}</p>
    </div>
  `
};

/* ──────────────────────── ArcanaEditFieldDialog ─────────────────────── */

const EditFieldDialogDemo: Component = {
  components: { ArcanaEditFieldDialog, ArcanaButton, ArcanaInput },
  data: () => ({ value: "Arcana Labs Matriz", saved: "Arcana Labs Matriz" }),
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
      <ArcanaButton style="align-self: flex-start" @click="open">{{ $dt.editDialogChangeName }}</ArcanaButton>
      <p class="demo-note">{{ $dt.savedValue }}: <strong>{{ saved }}</strong></p>
      <ArcanaEditFieldDialog ref="modal" :title="$dt.editDialogTitle" :description="$dt.editDialogDescription" @save="save">
        <ArcanaInput v-model="value" :placeholder="$dt.editDialogPlaceholder" />
      </ArcanaEditFieldDialog>
    </div>
  `
};

/* ────────────────────── ArcanaRequiredFieldsDialog ─────────────────── */

const RequiredFieldsDialogDemo: Component = {
  components: { ArcanaRequiredFieldsDialog, ArcanaButton },
  data() {
    const $dt = (this as unknown as { $dt: Record<string, string> }).$dt;
    return {
      fields: [
        { key: "cnpj", label: "CNPJ", hint: $dt.requiredCnpjHint },
        { key: "phone", label: $dt.specSheetPhone, hint: $dt.requiredPhoneHint },
        { key: "address", label: $dt.requiredDeliveryAddress, hint: $dt.requiredDeliveryAddressHint }
      ]
    };
  },
  methods: {
    open() {
      (this.$refs.dialog as unknown as { show: () => void }).show();
    }
  },
  template: /* html */ `
    <div>
      <ArcanaButton @click="open">{{ $dt.requiredValidateForm }}</ArcanaButton>
      <ArcanaRequiredFieldsDialog
        ref="dialog"
        :description="$dt.requiredDescription"
        :fields="fields"
      />
    </div>
  `
};

/* ──────────────────────── ArcanaOnboardingPanel ────────────────────── */

const OnboardingPanelDemo: Component = {
  components: { ArcanaOnboardingPanel },
  data: () => ({ last: "—" }),
  template: /* html */ `
    <div class="demo-stack">
      <ArcanaOnboardingPanel
        icon="fa-solid fa-folder-open"
        :title="$dt.onboardingTitle"
        :description="$dt.onboardingDescription"
        :action-label="$dt.onboardingActionLabel"
        :secondary-action-label="$dt.onboardingSecondaryLabel"
        secondary-action-icon="fa-solid fa-circle-info"
        :sub-hint="$dt.onboardingSubHint"
        sub-hint-icon="fa-solid fa-users"
        @action="last = $dt.onboardingPrimary"
        @secondary-action="last = $dt.onboardingSecondary"
      />
      <p class="demo-note">{{ $dt.lastAction }}: <strong>{{ last }}</strong></p>
    </div>
  `
};

/* ──────────────────────── ArcanaLoadingOverlay ─────────────────────── */

const LoadingOverlayDemo: Component = {
  components: { ArcanaLoadingOverlay, ArcanaButton },
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
        <p style="font-size: 13px; font-weight: 600; color: #18181b; margin: 0 0 6px">{{ $dt.loadingOrderSummary }}</p>
        <p class="demo-note" style="margin: 0">{{ $dt.loadingOverlayHint }}</p>
        <ArcanaLoadingOverlay :visible="loading" :text="$dt.loadingSavingText" />
      </div>
      <ArcanaButton @click="run" :disabled="loading">{{ $dt.btnSave }}</ArcanaButton>
    </div>
  `
};

/* ─────────────────────────── ArcanaSkeleton ────────────────────────── */

const SkeletonDemo: Component = {
  components: { ArcanaSkeleton },
  template: /* html */ `
    <div class="demo-stack" style="max-width: 340px">
      <div class="demo-row" style="align-items: center; gap: 12px">
        <ArcanaSkeleton width="40px" height="40px" rounded="full" />
        <div class="demo-stack" style="gap: 8px; flex: 1">
          <ArcanaSkeleton width="70%" height="12px" />
          <ArcanaSkeleton width="45%" height="10px" />
        </div>
      </div>
      <ArcanaSkeleton height="80px" rounded="lg" />
      <div class="demo-row" style="gap: 8px">
        <ArcanaSkeleton width="84px" height="28px" rounded="md" />
        <ArcanaSkeleton width="84px" height="28px" rounded="md" />
      </div>
    </div>
  `
};

/* ─────────────────────────── ArcanaSwitchCard ──────────────────────── */

const SwitchCardDemo: Component = {
  components: { ArcanaSwitchCard },
  data: () => ({ twoFa: true, maintenance: false }),
  template: /* html */ `
    <div class="demo-stack" style="max-width: 440px">
      <ArcanaSwitchCard v-model="twoFa" icon="fa-solid fa-shield-halved" :title="$dt.switchCard2faTitle" :status-on="$dt.switchCard2faStatusOn" :status-off="$dt.switchCard2faStatusOff" />
      <ArcanaSwitchCard v-model="maintenance" icon="fa-solid fa-screwdriver-wrench" :title="$dt.switchCardMaintenanceTitle" />
      <p class="demo-note">{{ $dt.switchCard2faLabel }}: <strong>{{ twoFa }}</strong> · {{ $dt.switchCardMaintenanceLabel }}: <strong>{{ maintenance }}</strong></p>
    </div>
  `
};

/* ─────────────────────────── ArcanaSwitchRow ───────────────────────── */

const SwitchRowDemo: Component = {
  components: { ArcanaSwitchRow },
  data: () => ({ email: true, push: false }),
  template: /* html */ `
    <div class="demo-stack" style="max-width: 440px">
      <ArcanaSwitchRow v-model="email" :label="$dt.settingsEmailNotifications" :description="$dt.switchRowEmailDesc" />
      <ArcanaSwitchRow v-model="push" :label="$dt.switchRowPushTitle" :description="$dt.switchRowPushDesc" />
      <p class="demo-note">{{ $dt.switchRowEmailLabel }}: <strong>{{ email }}</strong> · {{ $dt.switchRowPushLabel }}: <strong>{{ push }}</strong></p>
    </div>
  `
};

/* ───────────────────────── ArcanaSwitchSegmented ───────────────────── */

const SwitchSegmentedDemo: Component = {
  components: { ArcanaSwitchSegmented },
  data: () => ({ yearly: false, env: true }),
  template: /* html */ `
    <div class="demo-stack" style="max-width: 440px">
      <ArcanaSwitchSegmented v-model="yearly" :off-label="$dt.switchSegMonthly" :on-label="$dt.switchSegAnnual" />
      <ArcanaSwitchSegmented v-model="env" :off-label="$dt.switchSegSandbox" :on-label="$dt.switchSegProduction" :compact="true" :squared="true" />
      <p class="demo-note">{{ $dt.switchSegCycleLabel }}: <strong>{{ yearly ? 'annual' : 'monthly' }}</strong> · {{ $dt.switchSegEnvLabel }}: <strong>{{ env ? 'production' : 'sandbox' }}</strong></p>
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
      "import { ArcanaButton } from '@arcanalabs/ui-components/vue'",
      "",
      "function save() {",
      "  // …persist changes",
      "}",
      "</script>",
      "",
      "<template>",
      "  <ArcanaButton variant=\"primary\" @click=\"save\">Save</ArcanaButton>",
      "  <ArcanaButton variant=\"outline\">Cancel</ArcanaButton>",
      "  <ArcanaButton variant=\"destructive\" :disabled=\"busy\">Delete</ArcanaButton>",
      "",
      "  <!-- Icon + label: drop a FontAwesome <i> inside the default slot -->",
      "  <ArcanaButton variant=\"primary\"><i class=\"fa-solid fa-plus\" /> New</ArcanaButton>",
      "  <ArcanaButton variant=\"success\">Save <i class=\"fa-solid fa-arrow-right\" /></ArcanaButton>",
      "",
      "  <!-- Icon only: pass aria-label for accessibility -->",
      "  <ArcanaButton variant=\"outline\" aria-label=\"Settings\"><i class=\"fa-solid fa-gear\" /></ArcanaButton>",
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
      "import { ArcanaBadge } from '@arcanalabs/ui-components/vue'",
      "</script>",
      "",
      "<template>",
      "  <ArcanaBadge variant=\"green\" dot>Active</ArcanaBadge>",
      "  <ArcanaBadge variant=\"blue\">12 records</ArcanaBadge>",
      "  <ArcanaBadge variant=\"red\" size=\"sm\">Overdue</ArcanaBadge>",
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
      "import { ArcanaInput } from '@arcanalabs/ui-components/vue'",
      "",
      "const email = ref('')",
      "const qty = ref<number | null>(null)",
      "</script>",
      "",
      "<template>",
      "  <ArcanaInput v-model=\"email\" type=\"email\" placeholder=\"email@company.com\" />",
      "  <ArcanaInput v-model=\"qty\" type=\"number\" :min=\"0\" :max=\"99\" />",
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
      "import { ArcanaSelect } from '@arcanalabs/ui-components/vue'",
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
      "  <ArcanaSelect v-model=\"fruit\" :options=\"options\" searchable placeholder=\"Pick a fruit\" />",
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
      "import { ArcanaCheckbox } from '@arcanalabs/ui-components/vue'",
      "",
      "const accepted = ref(false)",
      "</script>",
      "",
      "<template>",
      "  <ArcanaCheckbox v-model=\"accepted\" label=\"I accept the terms\" />",
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
      "import { ArcanaSwitch } from '@arcanalabs/ui-components/vue'",
      "",
      "const autoRenew = ref(true)",
      "</script>",
      "",
      "<template>",
      "  <label class=\"form-row\">",
      "    <span>Auto-renew</span>",
      "    <ArcanaSwitch v-model=\"autoRenew\" aria-label=\"Auto-renew\" />",
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
      "import { ArcanaTabs } from '@arcanalabs/ui-components/vue'",
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
      "  <ArcanaTabs v-model=\"active\" :tabs=\"tabs\" variant=\"pills\">",
      "    <template #overview>…</template>",
      "    <template #activity>…</template>",
      "    <template #settings>…</template>",
      "  </ArcanaTabs>",
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
      "import { ArcanaDialog, ArcanaButton } from '@arcanalabs/ui-components/vue'",
      "",
      "const dialog = ref()",
      "</script>",
      "",
      "<template>",
      "  <ArcanaButton @click=\"dialog.show()\">Open</ArcanaButton>",
      "",
      "  <ArcanaDialog ref=\"dialog\" title=\"Delete workspace\" description=\"This cannot be undone.\">",
      "    <p>Body content…</p>",
      "    <template #footer=\"{ hide }\">",
      "      <ArcanaButton variant=\"outline\" @click=\"hide\">Cancel</ArcanaButton>",
      "      <ArcanaButton variant=\"destructive\" @click=\"hide\">Delete</ArcanaButton>",
      "    </template>",
      "  </ArcanaDialog>",
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
      "import { ArcanaInputMask } from '@arcanalabs/ui-components/vue'",
      "// Requires Maska registered globally — see \"Registering v-maska\".",
      "",
      "const cpf = ref('')",
      "const phone = ref('')",
      "</script>",
      "",
      "<template>",
      "  <ArcanaInputMask v-model=\"cpf\" mask=\"###.###.###-##\" placeholder=\"CPF\" />",
      "  <ArcanaInputMask v-model=\"phone\" :mask=\"['(##) ####-####', '(##) #####-####']\" />",
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
      "import { ArcanaInputBoolean } from '@arcanalabs/ui-components/vue'",
      "",
      "const active = ref<number | null>(1)",
      "</script>",
      "",
      "<template>",
      "  <ArcanaInputBoolean v-model=\"active\" variation=\"status\" :clearable=\"false\" />",
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
      "import { ArcanaNumberStepper } from '@arcanalabs/ui-components/vue'",
      "",
      "const qty = ref(1)",
      "</script>",
      "",
      "<template>",
      "  <ArcanaNumberStepper v-model=\"qty\" :min=\"0\" :max=\"10\" aria-label=\"Quantity\" />",
      "</template>"
    ].join("\n")
  },

  multiSelectPopover: {
    demo: ArcanaMultiSelectPopoverDemo,
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
      "import { ArcanaMultiSelectPopover } from '@arcanalabs/ui-components/vue'",
      "",
      "const selections = ref<Record<string, number[]>>({ USER: [], DEPARTMENT: [] })",
      "const tabs = [",
      "  { key: 'USER', label: 'Users', icon: 'fa-solid fa-user', fetch: loadUsers },",
      "  { key: 'DEPARTMENT', label: 'Departments', icon: 'fa-solid fa-sitemap', fetch: loadDepts },",
      "]",
      "</script>",
      "",
      "<template>",
      "  <ArcanaMultiSelectPopover v-model=\"selections\" :tabs=\"tabs\" empty-label=\"Select people\" />",
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
      "import { ArcanaRadioCardGroup } from '@arcanalabs/ui-components/vue'",
      "",
      "const method = ref('pix')",
      "const options = [",
      "  { label: 'Credit card', value: 'credit_card', description: 'Recurring charge.' },",
      "  { label: 'Pix', value: 'pix', badge: 'Recommended' },",
      "]",
      "</script>",
      "",
      "<template>",
      "  <ArcanaRadioCardGroup v-model=\"method\" :options=\"options\" aria-label=\"Payment method\" />",
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
      "import { ArcanaSegmentedOptions } from '@arcanalabs/ui-components/vue'",
      "",
      "const view = ref('list')",
      "const options = [",
      "  { label: 'List', value: 'list' },",
      "  { label: 'Grid', value: 'grid' },",
      "]",
      "</script>",
      "",
      "<template>",
      "  <ArcanaSegmentedOptions v-model=\"view\" :options=\"options\" aria-label=\"View mode\" />",
      "</template>"
    ].join("\n")
  },

  datePicker: {
    demo: DatePickerDemo,
    props: [
      { name: "modelValue", type: "string | [string, string]", default: "''", description: "Value: 'YYYY-MM-DD' (date), 'YYYY-MM' (month), 'YYYY' (year), 'YYYY-MM-DD HH:mm' (datetime), or a tuple for daterange." },
      { name: "type", type: "date | month | year | daterange | datetime", default: "date", description: "Which self-contained calendar to render." },
      { name: "locale", type: "string", default: "'pt-BR'", description: "BCP-47 locale for month/weekday names (via Intl)." },
      { name: "messages", type: "Partial<CalendarMessages>", default: "{}", description: "Override the chrome copy (placeholders, clear, nav, confirm)." },
      { name: "disabled", type: "boolean", default: "false", description: "Disables the field." },
      { name: "clearable", type: "boolean", default: "true", description: "Shows a clear affordance." },
      { name: "placeholder", type: "string", default: "''", description: "Overrides the per-type default placeholder." },
      { name: "size", type: "sm | md | lg", default: "md", description: "Field height/padding." }
    ],
    events: ["update:modelValue(value) — v-model update", "change(value) — on pick / confirm"],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ref } from 'vue'",
      "import { ArcanaDatePicker } from '@arcanalabs/ui-components/vue'",
      "",
      "const date = ref('2026-07-24')      // type=\"date\"     → 'YYYY-MM-DD'",
      "const month = ref('2026-07')        // type=\"month\"    → 'YYYY-MM'",
      "const year = ref('2026')            // type=\"year\"     → 'YYYY'",
      "const range = ref(['2026-07-01', '2026-07-15'])  // type=\"daterange\"",
      "const at = ref('2026-07-24 14:30')  // type=\"datetime\" → 'YYYY-MM-DD HH:mm'",
      "</script>",
      "",
      "<template>",
      "  <ArcanaDatePicker v-model=\"date\" type=\"date\" />",
      "  <ArcanaDatePicker v-model=\"range\" type=\"daterange\" locale=\"en\" />",
      "  <ArcanaDatePicker v-model=\"at\" type=\"datetime\" />",
      "</template>"
    ].join("\n")
  },

  inputCurrency: {
    demo: ArcanaInputCurrencyDemo,
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
      "import { ArcanaInputCurrency } from '@arcanalabs/ui-components/vue'",
      "",
      "const price = ref('1500.00')",
      "</script>",
      "",
      "<template>",
      "  <ArcanaInputCurrency v-model=\"price\" :shadcn=\"true\" />",
      "</template>"
    ].join("\n")
  },

  accordion: {
    demo: AccordionDemo,
    props: [
      { name: "modelValue", type: "string | string[] | null", default: "null", description: "Open item name (single mode) or array of open names (multiple mode)." },
      { name: "accordion", type: "boolean", default: "true", description: "true → one panel open at a time; false → multiple panels can be open." }
    ],
    events: ["update:modelValue(value) — v-model update", "Provides accordionApi to child <ArcanaAccordionItem> via provide/inject"],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ref } from 'vue'",
      "import { ArcanaAccordion, ArcanaAccordionItem } from '@arcanalabs/ui-components/vue'",
      "",
      "const open = ref('shipping')",
      "</script>",
      "",
      "<template>",
      "  <ArcanaAccordion v-model=\"open\">",
      "    <ArcanaAccordionItem name=\"shipping\" title=\"Shipping\">Ships in 2–3 days.</ArcanaAccordionItem>",
      "    <ArcanaAccordionItem name=\"returns\" title=\"Returns\">30-day free returns.</ArcanaAccordionItem>",
      "  </ArcanaAccordion>",
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
      "Reads open state from the parent <ArcanaAccordion> (inject) — must be nested inside one",
      "Slots: #title (header), default (collapsible body)"
    ],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ref } from 'vue'",
      "import { ArcanaAccordion, ArcanaAccordionItem } from '@arcanalabs/ui-components/vue'",
      "",
      "// Multiple-open mode: v-model is an array of open names.",
      "const open = ref<string[]>(['specs'])",
      "</script>",
      "",
      "<template>",
      "  <ArcanaAccordion v-model=\"open\" :accordion=\"false\">",
      "    <ArcanaAccordionItem name=\"specs\" title=\"Specifications\">…</ArcanaAccordionItem>",
      "    <ArcanaAccordionItem name=\"care\">",
      "      <template #title>Care <strong>instructions</strong></template>",
      "      Hand wash cold.",
      "    </ArcanaAccordionItem>",
      "  </ArcanaAccordion>",
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
      "Slots: #trigger { open, toggle }, default { close } — holds <ArcanaDropdownItem>s"
    ],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ArcanaDropdown, ArcanaDropdownItem, ArcanaButton } from '@arcanalabs/ui-components/vue'",
      "</script>",
      "",
      "<template>",
      "  <ArcanaDropdown placement=\"bottom-start\">",
      "    <template #trigger>",
      "      <ArcanaButton variant=\"outline\">Actions ▾</ArcanaButton>",
      "    </template>",
      "    <ArcanaDropdownItem icon=\"fa-solid fa-pen\" @click=\"rename\">Rename</ArcanaDropdownItem>",
      "    <ArcanaDropdownItem icon=\"fa-solid fa-trash\" variant=\"danger\" divided @click=\"del\">Delete</ArcanaDropdownItem>",
      "  </ArcanaDropdown>",
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
      { name: "size", type: "default | comfortable | null", default: "null", description: "Overrides the density inherited from <ArcanaDropdown>." }
    ],
    events: [
      "click(ev: MouseEvent) — emitted on click",
      "Dispatches a bubbling arcana-dropdown-close event unless closeOnClick is false",
      "Slots: default (label), #suffix (right-aligned hint)"
    ],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ArcanaDropdown, ArcanaDropdownItem } from '@arcanalabs/ui-components/vue'",
      "</script>",
      "",
      "<template>",
      "  <ArcanaDropdown size=\"comfortable\">",
      "    <template #trigger><button>Menu ▾</button></template>",
      "    <ArcanaDropdownItem icon=\"fa-solid fa-user\">",
      "      Profile",
      "      <template #suffix>⌘P</template>",
      "    </ArcanaDropdownItem>",
      "    <ArcanaDropdownItem variant=\"danger\" divided @click=\"del\">Delete</ArcanaDropdownItem>",
      "  </ArcanaDropdown>",
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
      "import { ArcanaTable } from '@arcanalabs/ui-components/vue'",
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
      "  <ArcanaTable :columns=\"columns\" :rows=\"rows\">",
      "    <template #cell-name=\"{ row }\"><strong>{{ row.name }}</strong></template>",
      "    <template #footer><tr><td colspan=\"2\">Total</td><td class=\"arcana-table__td--right\">R$ 260,00</td></tr></template>",
      "  </ArcanaTable>",
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
      "import { ArcanaSpecSheet, ArcanaSpecSheetSection, ArcanaSpecSheetField } from '@arcanalabs/ui-components/vue'",
      "</script>",
      "",
      "<template>",
      "  <ArcanaSpecSheet doc-num=\"Cadastro Nº 042\" title=\"Arcana Labs\" meta-label=\"Status\">",
      "    <template #meta><span class=\"arcana-spec-sheet-badge arcana-spec-sheet-badge--active\">Ativo</span></template>",
      "    <ArcanaSpecSheetSection title=\"Dados Cadastrais\" section-num=\"§ 01\" icon=\"fa-solid fa-building\" icon-color=\"blue\" :columns=\"3\">",
      "      <ArcanaSpecSheetField label=\"Razão Social\" :value=\"form.trading_name\" />",
      "      <ArcanaSpecSheetField label=\"CNPJ\" :value=\"form.document_number\" />",
      "      <ArcanaSpecSheetField label=\"Inscrição Estadual\" :value=\"form.state_registration\" />",
      "    </ArcanaSpecSheetSection>",
      "    <template #footer><ArcanaButton variant=\"outline\">Alterar Dados</ArcanaButton></template>",
      "  </ArcanaSpecSheet>",
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
    events: ["Slots: default (<ArcanaSpecSheetField>s), #title, #actions (right-side header actions)"],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ArcanaSpecSheetSection, ArcanaSpecSheetField } from '@arcanalabs/ui-components/vue'",
      "</script>",
      "",
      "<template>",
      "  <!-- Nested inside a <ArcanaSpecSheet> -->",
      "  <ArcanaSpecSheetSection title=\"Financeiro\" section-num=\"§ 03\" icon=\"fa-solid fa-dollar-sign\" icon-color=\"amber\" :columns=\"3\">",
      "    <template #actions><ArcanaButton variant=\"ghost\">Alterar</ArcanaButton></template>",
      "    <ArcanaSpecSheetField label=\"Limite\" value=\"R$ 5.000,00\" />",
      "    <ArcanaSpecSheetField label=\"Saldo\" value=\"R$ 1.240,00\" />",
      "  </ArcanaSpecSheetSection>",
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
      "import { ArcanaSpecSheetField } from '@arcanalabs/ui-components/vue'",
      "</script>",
      "",
      "<template>",
      "  <ArcanaSpecSheetField label=\"CNPJ\" :value=\"form.document_number\" />",
      "  <ArcanaSpecSheetField label=\"Observações\" value=\"\" empty-text=\"Não informado\" />",
      "  <ArcanaSpecSheetField label=\"Status\" :span=\"2\">",
      "    <span class=\"arcana-spec-sheet-badge arcana-spec-sheet-badge--active\">Ativo</span>",
      "  </ArcanaSpecSheetField>",
      "</template>"
    ].join("\n")
  },

  summaryTiles: {
    demo: SummaryTilesDemo,
    props: [
      { name: "format", type: "columns | rows", default: "columns", description: "Layout: 'columns' = responsive grid; 'rows' = one tile per full-width row." },
      { name: "columns", type: "number | string", default: "3", description: "Grid columns in 'columns' format (collapses to 1 below 880px width regardless)." }
    ],
    events: ["Slots: default — one or more <ArcanaSummaryTile>"],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ArcanaSummaryTilesGroup, ArcanaSummaryTile } from '@arcanalabs/ui-components/vue'",
      "</script>",
      "",
      "<template>",
      "  <ArcanaSummaryTilesGroup :columns=\"3\">",
      "    <ArcanaSummaryTile tone=\"positive\" icon=\"fa-solid fa-arrow-down\" label=\"Entradas\" value=\"R$ 1.250,00\" sub=\"4 formas\" />",
      "    <ArcanaSummaryTile tone=\"negative\" icon=\"fa-solid fa-arrow-up\" label=\"Despesas\" value=\"R$ 85,00\" />",
      "    <ArcanaSummaryTile tone=\"indigo\" icon=\"fa-solid fa-sack-dollar\" label=\"Total\" value=\"R$ 1.165,00\" />",
      "  </ArcanaSummaryTilesGroup>",
      "",
      "  <!-- format=\"rows\": one tile per full-width row -->",
      "  <ArcanaSummaryTilesGroup format=\"rows\"> … </ArcanaSummaryTilesGroup>",
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
      "import { ArcanaSummaryTile } from '@arcanalabs/ui-components/vue'",
      "</script>",
      "",
      "<template>",
      "  <ArcanaSummaryTile tone=\"positive\" icon=\"fa-solid fa-check\" label=\"Aprovados\" value=\"112\" sub=\"hoje\" />",
      "</template>"
    ].join("\n")
  },

  settingsList: {
    demo: SettingsListDemo,
    props: [],
    events: ["Slots: default — <ArcanaSettingsListItem>, <ArcanaSettingsListGroup> or <ArcanaSettingsEditableField>"],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ArcanaSettingsList, ArcanaSettingsListItem, ArcanaSwitch } from '@arcanalabs/ui-components/vue'",
      "import { ref } from 'vue'",
      "",
      "const enabled = ref(true)",
      "</script>",
      "",
      "<template>",
      "  <ArcanaSettingsList>",
      "    <ArcanaSettingsListItem label=\"Recursos avançados\" caption=\"Habilita funcionalidades internas.\">",
      "      <ArcanaSwitch v-model=\"enabled\" aria-label=\"Recursos avançados\" />",
      "    </ArcanaSettingsListItem>",
      "  </ArcanaSettingsList>",
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
      "import { ArcanaSettingsList, ArcanaSettingsListGroup, ArcanaSettingsListItem } from '@arcanalabs/ui-components/vue'",
      "</script>",
      "",
      "<template>",
      "  <ArcanaSettingsList>",
      "    <ArcanaSettingsListGroup title=\"Pedidos\" icon=\"fa-solid fa-cart-shopping\" icon-color=\"indigo\" meta=\"2 configs\">",
      "      <ArcanaSettingsListItem label=\"Aceitar pedidos\">…</ArcanaSettingsListItem>",
      "    </ArcanaSettingsListGroup>",
      "  </ArcanaSettingsList>",
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
      "import { ArcanaSettingsListItem, ArcanaSwitch } from '@arcanalabs/ui-components/vue'",
      "</script>",
      "",
      "<template>",
      "  <ArcanaSettingsListItem label=\"Notificações por e-mail\" caption=\"Resumo diário.\">",
      "    <ArcanaSwitch v-model=\"form.notify_email\" aria-label=\"E-mail\" />",
      "  </ArcanaSettingsListItem>",
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
      { name: "editLabel", type: "string", default: "'Alterar'", description: "Trigger button label (also the default modal title prefix). Pass a translated value for i18n." },
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
      "import { ArcanaSettingsList, ArcanaSettingsEditableField } from '@arcanalabs/ui-components/vue'",
      "",
      "const discount = ref('1500.00')",
      "</script>",
      "",
      "<template>",
      "  <ArcanaSettingsList>",
      "    <ArcanaSettingsEditableField",
      "      label=\"Desconto 1ª compra\"",
      "      caption=\"Valor unitário aplicado.\"",
      "      type=\"currency\"",
      "      v-model=\"discount\"",
      "      @save=\"autoSave\"",
      "    />",
      "  </ArcanaSettingsList>",
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
      "import { ArcanaNotice } from '@arcanalabs/ui-components/vue'",
      "</script>",
      "",
      "<template>",
      "  <ArcanaNotice variant=\"warning\" title=\"Pagamento manual\">",
      "    Pix e Boleto geram um link novo de cobrança a cada ciclo.",
      "  </ArcanaNotice>",
      "  <ArcanaNotice variant=\"destructive\" title=\"Falha\" dismissible @dismiss=\"hide\">Tente novamente.</ArcanaNotice>",
      "</template>"
    ].join("\n")
  },

  editFieldModal: {
    demo: EditFieldDialogDemo,
    props: [
      { name: "title", type: "string", default: "— (required)", description: "Modal header title." },
      { name: "description", type: "string", default: "''", description: "Sub-title under the header title." },
      { name: "cancelLabel", type: "string", default: "'Cancelar'", description: "Cancel button label." },
      { name: "saveLabel", type: "string", default: "'Salvar Alterações'", description: "Save button label." },
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
      "import { ArcanaEditFieldDialog, ArcanaSelect, ArcanaButton } from '@arcanalabs/ui-components/vue'",
      "",
      "const modal = ref()",
      "const plan = ref('pro')",
      "function savePlan() { /* …persist */ modal.value.hide() }",
      "</script>",
      "",
      "<template>",
      "  <ArcanaButton @click=\"modal.show()\">Alterar Plano</ArcanaButton>",
      "  <ArcanaEditFieldDialog ref=\"modal\" title=\"Alterar Plano\" @save=\"savePlan\">",
      "    <ArcanaSelect v-model=\"plan\" :options=\"planOptions\" />",
      "  </ArcanaEditFieldDialog>",
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
      "import { ArcanaRequiredFieldsDialog } from '@arcanalabs/ui-components/vue'",
      "",
      "const dialog = ref()",
      "const missing = computed(() => REQUIRED.filter(f => !f.check(form)))",
      "function validate() { if (missing.value.length) dialog.value.show() }",
      "</script>",
      "",
      "<template>",
      "  <ArcanaRequiredFieldsDialog ref=\"dialog\" :fields=\"missing\" description=\"…antes de criar o cliente.\" />",
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
      "import { ArcanaOnboardingPanel } from '@arcanalabs/ui-components/vue'",
      "</script>",
      "",
      "<template>",
      "  <ArcanaOnboardingPanel",
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
      "import { ArcanaLoadingOverlay } from '@arcanalabs/ui-components/vue'",
      "",
      "const saving = ref(false)",
      "</script>",
      "",
      "<template>",
      "  <div style=\"position: relative\">",
      "    <!-- card content -->",
      "    <ArcanaLoadingOverlay :visible=\"saving\" text=\"Salvando…\" />",
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
      "import { ArcanaSkeleton } from '@arcanalabs/ui-components/vue'",
      "</script>",
      "",
      "<template>",
      "  <ArcanaSkeleton width=\"40px\" height=\"40px\" rounded=\"full\" />",
      "  <ArcanaSkeleton width=\"200px\" height=\"14px\" />",
      "  <ArcanaSkeleton width=\"60%\" height=\"12px\" />",
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
      "import { ArcanaSwitchCard } from '@arcanalabs/ui-components/vue'",
      "",
      "const twoFa = ref(true)",
      "</script>",
      "",
      "<template>",
      "  <ArcanaSwitchCard v-model=\"twoFa\" icon=\"fa-solid fa-shield-halved\" title=\"Autenticação 2FA\" status-on=\"ATIVO · TOTP\" />",
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
      "import { ArcanaSwitchRow } from '@arcanalabs/ui-components/vue'",
      "",
      "const email = ref(true)",
      "</script>",
      "",
      "<template>",
      "  <ArcanaSwitchRow v-model=\"email\" label=\"Notificações por e-mail\" description=\"Resumo diário das atividades.\" />",
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
      "import { ArcanaSwitchSegmented } from '@arcanalabs/ui-components/vue'",
      "",
      "const yearly = ref(false)",
      "</script>",
      "",
      "<template>",
      "  <ArcanaSwitchSegmented v-model=\"yearly\" off-label=\"Mensal\" on-label=\"Anual · −20%\" />",
      "</template>"
    ].join("\n")
  }
};
