import type { Component } from "vue";
import type { DocumentedKey } from "../i18n/types";

import ArcanaButton from "../../../src/vue/components/ArcanaButton.vue";
import ArcanaBadge from "../../../src/vue/components/ArcanaBadge.vue";
import ArcanaInput from "../../../src/vue/components/ArcanaInput.vue";
import ArcanaSelect from "../../../src/vue/components/ArcanaSelect.vue";
import ArcanaTreeSelect from "../../../src/vue/components/ArcanaTreeSelect.vue";
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
import ArcanaSegmentedControl from "../../../src/vue/components/ArcanaSegmentedControl.vue";
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
import ArcanaActionPanel from "../../../src/vue/components/ArcanaActionPanel.vue";
import ArcanaLoadingOverlay from "../../../src/vue/components/ArcanaLoadingOverlay.vue";
import ArcanaSkeleton from "../../../src/vue/components/ArcanaSkeleton.vue";
import ArcanaSwitchCard from "../../../src/vue/components/ArcanaSwitchCard.vue";
import ArcanaSwitchRow from "../../../src/vue/components/ArcanaSwitchRow.vue";
import ArcanaSwitchSegmented from "../../../src/vue/components/ArcanaSwitchSegmented.vue";
// ── Batch 4 ──
import ArcanaRate from "../../../src/vue/components/ArcanaRate.vue";
import ArcanaAvatar from "../../../src/vue/components/ArcanaAvatar.vue";
import ArcanaAvatarGroup from "../../../src/vue/components/ArcanaAvatarGroup.vue";
import ArcanaStatistic from "../../../src/vue/components/ArcanaStatistic.vue";
import ArcanaCountdown from "../../../src/vue/components/ArcanaCountdown.vue";
import ArcanaProgress from "../../../src/vue/components/ArcanaProgress.vue";
import ArcanaAspectRatio from "../../../src/vue/components/ArcanaAspectRatio.vue";
import ArcanaScrollArea from "../../../src/vue/components/ArcanaScrollArea.vue";
import ArcanaHoverCard from "../../../src/vue/components/ArcanaHoverCard.vue";
import ArcanaContextMenu from "../../../src/vue/components/ArcanaContextMenu.vue";
import ArcanaContextMenuItem from "../../../src/vue/components/ArcanaContextMenuItem.vue";

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

const TreeSelectDemo: Component = {
  components: { ArcanaTreeSelect },
  data() {
    const $dt = (this as unknown as { $dt: Record<string, string> }).$dt;
    return {
      single: null as string | number | null,
      many: [] as (string | number)[],
      themed: 21 as string | number | null,
      tree: [
        {
          id: 1,
          name: $dt.treeEngineering,
          children: [
            { id: 11, name: $dt.treeFrontend },
            { id: 12, name: $dt.treeBackend }
          ]
        },
        {
          id: 2,
          name: $dt.treeMarketing,
          children: [
            { id: 21, name: $dt.treeContent },
            { id: 22, name: $dt.treeGrowth },
            { id: 23, name: $dt.treeBrand }
          ]
        },
        { id: 3, name: $dt.treeSales }
      ]
    };
  },
  template: /* html */ `
    <div class="demo-stack" style="max-width: 340px">
      <div class="demo-field">
        <span class="demo-field-label">{{ $dt.treeSingleTitle }}</span>
        <ArcanaTreeSelect v-model="single" :options="tree" :placeholder="$dt.treePickOne" />
        <p class="demo-note">{{ $dt.selectSingleLabel }}: <strong>{{ single ?? "null" }}</strong></p>
      </div>

      <div class="demo-field">
        <span class="demo-field-label">{{ $dt.treeMultipleTitle }}</span>
        <ArcanaTreeSelect v-model="many" :options="tree" :placeholder="$dt.treePickSeveral" multiple allow-parent-selection />
        <p class="demo-note">{{ $dt.selectMultipleLabel }}: <strong>[{{ many.join(", ") }}]</strong></p>
      </div>

      <div class="demo-field">
        <span class="demo-field-label">{{ $dt.treeThemedTitle }}</span>
        <ArcanaTreeSelect v-model="themed" :options="tree" :placeholder="$dt.treePickOne" panel-class="demo-tree-amber" />
        <p class="demo-note">{{ $dt.treeThemedHint }}</p>
      </div>
    </div>
  `
};

const SelectDemo: Component = {
  components: { ArcanaSelect },
  data() {
    const $dt = (this as unknown as { $dt: Record<string, string> }).$dt;
    return {
      single: null as string | null,
      many: [] as string[],
      statuses: ["todo", "in_progress", "in_review"] as string[],
      fruits: [
        { label: $dt.fruitApple, value: "apple" },
        { label: $dt.fruitBanana, value: "banana" },
        { label: $dt.fruitCherry, value: "cherry", description: $dt.fruitCherryDesc },
        { label: $dt.fruitDurian, value: "durian", disabled: true },
        { label: $dt.fruitElderberry, value: "elderberry" }
      ],
      // `color` na opção vira uma bolinha; com trigger-mode="dots" o gatilho
      // mostra só as bolinhas — o padrão de um filtro rápido de status.
      statusOptions: [
        { label: $dt.statusTodo, value: "todo", color: "#10b981" },
        { label: $dt.statusInProgress, value: "in_progress", color: "#3b82f6" },
        { label: $dt.statusInReview, value: "in_review", color: "#8b5cf6" },
        { label: $dt.statusDone, value: "done", color: "#64748b" },
        { label: $dt.statusBlocked, value: "blocked", color: "#ef4444" }
      ]
    };
  },
  template: /* html */ `
    <div class="demo-stack" style="max-width: 340px">
      <ArcanaSelect v-model="single" :options="fruits" :placeholder="$dt.selectPickFruit" searchable />
      <ArcanaSelect v-model="many" :options="fruits" :placeholder="$dt.selectPickSeveral" multiple />
      <p class="demo-note">{{ $dt.selectSingleLabel }}: <strong>{{ single ?? "null" }}</strong> · {{ $dt.selectMultipleLabel }}: <strong>[{{ many.join(", ") }}]</strong></p>

      <div class="demo-field">
        <span class="demo-field-label">{{ $dt.selectQuickFilterTitle }}</span>
        <ArcanaSelect
          v-model="statuses"
          :options="statusOptions"
          :placeholder="$dt.selectStatusPlaceholder"
          multiple
          trigger-mode="dots"
          icon="fa-solid fa-flag"
          :show-footer="true"
          :footer-count-label="$dt.selectFooterCount"
          :clear-label="$dt.selectClearLabel"
        />
        <p class="demo-note">{{ $dt.selectStatusLabel }}: <strong>[{{ statuses.join(", ") }}]</strong></p>
      </div>
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
  data: () => ({ phone: "", card: "" }),
  template: /* html */ `
    <div class="demo-stack" style="max-width: 340px">
      <!-- Máscara dinâmica: com um array, a máscara aplicada acompanha o
           comprimento digitado (nacional → internacional). -->
      <ArcanaInputMask v-model="phone" :mask="['(###) ###-####', '+## (###) ###-####']" :placeholder="$dt.maskPhone" />
      <ArcanaInputMask v-model="card" mask="#### #### #### ####" :placeholder="$dt.maskCard" />
      <p class="demo-note">{{ $dt.phoneRaw }}: <strong>{{ phone || "—" }}</strong> · {{ $dt.cardRaw }}: <strong>{{ card || "—" }}</strong></p>
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
      method: "bank_transfer",
      model: "personal",
      freight: "standard",
      options: [
        { label: $dt.payCreditCard, value: "credit_card", description: $dt.payCreditCardDesc },
        { label: $dt.payBankTransfer, value: "bank_transfer", description: $dt.payBankTransferDesc, badge: $dt.payBankTransferBadge },
        { label: $dt.payInvoice, value: "invoice", description: $dt.payInvoiceDesc },
        { label: $dt.payCash, value: "cash", disabled: true }
      ],
      // Ícone em "chip" colorido: o trio iconBg/iconColor/iconBorder desenha o
      // quadrado atrás do ícone.
      iconOptions: [
        { label: $dt.rcPersonalAccount, value: "personal", description: $dt.rcPersonalAccountDesc, icon: "fa-solid fa-file-invoice", iconBg: "#dbeafe", iconColor: "#2563eb", iconBorder: "#bfdbfe" },
        { label: $dt.rcBusinessAccount, value: "business", description: $dt.rcBusinessAccountDesc, icon: "fa-solid fa-receipt", iconBg: "#d1fae5", iconColor: "#059669", iconBorder: "#a7f3d0" }
      ],
      freightOptions: [
        { label: $dt.rcShippingStandard, value: "standard", description: $dt.rcShippingStandardDesc, icon: "fa-solid fa-truck", iconBg: "#e0e7ff", iconColor: "#4f46e5", iconBorder: "#c7d2fe" },
        { label: $dt.rcShippingExpress, value: "express", description: $dt.rcShippingExpressDesc, icon: "fa-solid fa-user", iconBg: "#fef3c7", iconColor: "#b45309", iconBorder: "#fde68a" }
      ]
    };
  },
  template: /* html */ `
    <div class="demo-stack" style="max-width: 440px">
      <ArcanaRadioCardGroup v-model="method" :options="options" aria-label="Payment method" />
      <p class="demo-note">{{ $dt.selectedLabel }}: <strong>{{ method }}</strong></p>

      <div class="demo-field">
        <span class="demo-field-label">{{ $dt.rcIconStart }}</span>
        <ArcanaRadioCardGroup v-model="model" :options="iconOptions" :columns="2" :aria-label="$dt.rcIconStart" />
      </div>

      <div class="demo-field">
        <span class="demo-field-label">{{ $dt.rcIconEnd }}</span>
        <ArcanaRadioCardGroup v-model="model" :options="iconOptions" :columns="2" icon-position="end" :aria-label="$dt.rcIconEnd" />
      </div>

      <div class="demo-field">
        <span class="demo-field-label">{{ $dt.rcRadioEnd }}</span>
        <ArcanaRadioCardGroup v-model="freight" :options="freightOptions" :columns="2" radio-position="end" :aria-label="$dt.rcRadioEnd" />
      </div>
    </div>
  `
};

/* ────────────────────── ArcanaSegmentedControl ─────────────────────── */

const SegmentedControlDemo: Component = {
  components: { ArcanaSegmentedControl },
  data() {
    const $dt = (this as unknown as { $dt: Record<string, string> }).$dt;
    return {
      view: "list",
      priority: "medium",
      options: [
        { label: $dt.segList, value: "list" },
        { label: $dt.segGrid, value: "grid" },
        { label: $dt.segBoard, value: "board" }
      ],
      iconOptions: [
        { label: $dt.segList, value: "list", icon: "fa-solid fa-list" },
        { label: $dt.segGrid, value: "grid", icon: "fa-solid fa-table-cells-large" },
        { label: $dt.segBoard, value: "board", icon: "fa-solid fa-columns" }
      ],
      // `iconColor` colore o ícone de cada opção — útil pra semântica (verde =
      // baixo risco, âmbar = atenção, vermelho = urgente).
      colorOptions: [
        { label: $dt.segLow, value: "low", icon: "fa-solid fa-circle-check", iconColor: "#16a34a" },
        { label: $dt.segMedium, value: "medium", icon: "fa-solid fa-triangle-exclamation", iconColor: "#f59e0b" },
        { label: $dt.segHigh, value: "high", icon: "fa-solid fa-fire", iconColor: "#dc2626" }
      ],
      // Só ícones: omita `label` e informe `ariaLabel` na opção pra manter o
      // controle acessível (o rótulo visível some, o acessível não).
      iconOnlyOptions: [
        { label: "", value: "list", icon: "fa-solid fa-list", ariaLabel: $dt.segList },
        { label: "", value: "grid", icon: "fa-solid fa-table-cells-large", ariaLabel: $dt.segGrid },
        { label: "", value: "board", icon: "fa-solid fa-columns", ariaLabel: $dt.segBoard }
      ]
    };
  },
  template: /* html */ `
    <div class="demo-stack" style="max-width: 440px">
      <ArcanaSegmentedControl v-model="view" :options="options" aria-label="View mode" />
      <ArcanaSegmentedControl v-model="view" :options="options" :compact="true" :squared="true" />

      <div class="demo-field">
        <span class="demo-field-label">{{ $dt.segWithIcons }}</span>
        <ArcanaSegmentedControl v-model="view" :options="iconOptions" />
      </div>

      <div class="demo-field">
        <span class="demo-field-label">{{ $dt.segColoredIcons }}</span>
        <ArcanaSegmentedControl v-model="priority" :options="colorOptions" />
      </div>

      <div class="demo-field">
        <span class="demo-field-label">{{ $dt.segIconOnly }}</span>
        <ArcanaSegmentedControl v-model="view" :options="iconOnlyOptions" :aria-label="$dt.viewLabel" />
      </div>

      <div class="demo-field">
        <span class="demo-field-label">{{ $dt.segSizes }}</span>
        <ArcanaSegmentedControl v-model="view" :options="options" size="sm" />
        <ArcanaSegmentedControl v-model="view" :options="options" size="md" />
        <ArcanaSegmentedControl v-model="view" :options="options" size="lg" />
        <ArcanaSegmentedControl v-model="view" :options="options" size="xl" />
      </div>

      <div class="demo-field">
        <span class="demo-field-label">{{ $dt.segCustomSize }}</span>
        <!-- Fora da escala: os tokens CSS vencem qualquer 'size'. -->
        <ArcanaSegmentedControl
          v-model="view"
          :options="options"
          style="--arcana-segmented-control-height: 40px; --arcana-segmented-control-font-size: 15px; --arcana-segmented-control-padding-x: 22px"
        />
        <p class="demo-note">{{ $dt.segCustomSizeHint }}</p>
      </div>

      <p class="demo-note">{{ $dt.viewLabel }}: <strong>{{ view }}</strong> · {{ $dt.segPriorityLabel }}: <strong>{{ priority }}</strong></p>
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
  data: () => ({ open: "shipping" as string | null, openAnimated: "shipping" as string | null }),
  template: /* html */ `
    <div class="demo-stack">
      <ArcanaAccordion v-model="open">
        <ArcanaAccordionItem name="shipping" :title="$dt.accShipping">{{ $dt.accShippingBody }}</ArcanaAccordionItem>
        <ArcanaAccordionItem name="returns" :title="$dt.accReturns">{{ $dt.accReturnsBody }}</ArcanaAccordionItem>
        <ArcanaAccordionItem name="warranty" :title="$dt.accWarranty" :disabled="true">{{ $dt.accWarrantyBody }}</ArcanaAccordionItem>
      </ArcanaAccordion>
      <p class="demo-note">{{ $dt.accOpenSingleLabel }}: <strong>{{ open ?? "null" }}</strong></p>

      <div class="demo-field">
        <span class="demo-field-label">{{ $dt.accAnimatedTitle }}</span>
        <ArcanaAccordion v-model="openAnimated" :animated="true">
          <ArcanaAccordionItem name="shipping" :title="$dt.accShipping">{{ $dt.accShippingBody }}</ArcanaAccordionItem>
          <ArcanaAccordionItem name="returns" :title="$dt.accReturns">{{ $dt.accReturnsBody }}</ArcanaAccordionItem>
        </ArcanaAccordion>
        <p class="demo-note">{{ $dt.accAnimatedHint }}</p>
      </div>
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
      { key: "total", label: $dt.colTotal, align: "right", valueGetter: (v: number) => "$" + v.toFixed(2) }
    ],
    rows: [
      { sku: "WM-100", name: "Wireless Mouse", qty: 2, total: 260, status: "in" },
      { sku: "KB-200", name: "Mechanical Keyboard", qty: 1, total: 480, status: "low" },
      { sku: "HUB-300", name: "USB-C Hub", qty: 5, total: 45, status: "in" }
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
        <tr><td colspan="3">{{ $dt.tableTotalItems }}</td><td class="arcana-table__td--right">$785.00</td></tr>
      </template>
    </ArcanaTable>
  `
};

/* ────────────── ArcanaSpecSheet + Section + Field (composite) ──────── */

const SpecSheetDemo: Component = {
  components: { ArcanaSpecSheet, ArcanaSpecSheetSection, ArcanaSpecSheetField, ArcanaButton },
  template: /* html */ `
    <ArcanaSpecSheet :doc-num="$dt.specSheetDocNum" title="Acme Corporation" :meta-label="$dt.statusLabel">
      <template #meta>
        <span class="arcana-spec-sheet-badge arcana-spec-sheet-badge--active">{{ $dt.statusActive }}</span>
      </template>
      <ArcanaSpecSheetSection :title="$dt.specSheetRegistrationData" section-num="§ 01" icon="fa-solid fa-building" icon-color="blue" :columns="3">
        <ArcanaSpecSheetField :label="$dt.specSheetLegalName" value="Acme Corporation" />
        <ArcanaSpecSheetField label="Tax ID" value="12-3456789" />
        <ArcanaSpecSheetField :label="$dt.specSheetRegistrationNo" value="" />
      </ArcanaSpecSheetSection>
      <ArcanaSpecSheetSection :title="$dt.specSheetContact" section-num="§ 02" icon="fa-solid fa-phone" icon-color="emerald">
        <ArcanaSpecSheetField :label="$dt.specSheetPhone" value="+1 (555) 010-4477" />
        <ArcanaSpecSheetField :label="$dt.specSheetEmail" value="hello@acme.com" />
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
      <ArcanaSpecSheetSection :title="$dt.specSheetBilling" section-num="§ 03" icon="fa-solid fa-dollar-sign" icon-color="amber" :columns="3">
        <template #actions><ArcanaButton variant="ghost">{{ $dt.actionChange }}</ArcanaButton></template>
        <ArcanaSpecSheetField :label="$dt.specSheetLimit" value="$5,000.00" />
        <ArcanaSpecSheetField :label="$dt.specSheetBalance" value="$1,240.00" />
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
        <ArcanaSummaryTile tone="positive" icon="fa-solid fa-arrow-down" :label="$dt.tileIncome" value="$1,250.00" :sub="$dt.tileIncomeSub" />
        <ArcanaSummaryTile tone="negative" icon="fa-solid fa-arrow-up" :label="$dt.tileExpenses" value="$85.00" :sub="$dt.tileExpensesSub" />
        <ArcanaSummaryTile tone="indigo" icon="fa-solid fa-sack-dollar" :label="$dt.tileTotal" value="$1,165.00" />
      </ArcanaSummaryTilesGroup>
      <ArcanaSummaryTilesGroup format="rows">
        <ArcanaSummaryTile tone="positive" icon="fa-solid fa-arrow-down" :label="$dt.tileIncome" value="$1,250.00" :sub="$dt.tileIncomeSub" />
        <ArcanaSummaryTile tone="negative" icon="fa-solid fa-arrow-up" :label="$dt.tileExpenses" value="$85.00" :sub="$dt.tileExpensesSub" />
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
      name: "Arcana Labs HQ",
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
  data: () => ({ value: "Arcana Labs HQ", saved: "Arcana Labs HQ" }),
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
        { key: "taxId", label: "Tax ID", hint: $dt.requiredTaxIdHint },
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

/* ──────────────────────── ArcanaActionPanel ────────────────────── */

const ActionPanelDemo: Component = {
  components: { ArcanaActionPanel },
  data: () => ({ last: "—" }),
  template: /* html */ `
    <div class="demo-stack">
      <ArcanaActionPanel
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
  data: () => ({ yearly: false, env: true, theme: false, listMode: true }),
  template: /* html */ `
    <div class="demo-stack" style="max-width: 440px">
      <ArcanaSwitchSegmented v-model="yearly" :off-label="$dt.switchSegMonthly" :on-label="$dt.switchSegAnnual" />
      <ArcanaSwitchSegmented v-model="env" :off-label="$dt.switchSegSandbox" :on-label="$dt.switchSegProduction" :compact="true" :squared="true" />

      <div class="demo-field">
        <span class="demo-field-label">{{ $dt.switchSegWithIcons }}</span>
        <ArcanaSwitchSegmented
          v-model="theme"
          :off-label="$dt.switchSegLight"
          :on-label="$dt.switchSegDark"
          off-icon="fa-solid fa-sun"
          on-icon="fa-solid fa-moon"
          off-icon-color="#f59e0b"
          on-icon-color="#6366f1"
        />
      </div>

      <div class="demo-field">
        <span class="demo-field-label">{{ $dt.switchSegIconOnly }}</span>
        <!-- Sem labels: informe 'ariaLabel', já que os ícones são decorativos. -->
        <ArcanaSwitchSegmented
          v-model="listMode"
          off-label=""
          on-label=""
          off-icon="fa-solid fa-list"
          on-icon="fa-solid fa-table-cells-large"
          :aria-label="$dt.viewLabel"
        />
      </div>

      <p class="demo-note">{{ $dt.switchSegCycleLabel }}: <strong>{{ yearly ? 'annual' : 'monthly' }}</strong> · {{ $dt.switchSegEnvLabel }}: <strong>{{ env ? 'production' : 'sandbox' }}</strong></p>
    </div>
  `
};

/* ─────────────────────────── ArcanaRate ────────────────────────────── */

const RateDemo: Component = {
  components: { ArcanaRate },
  data: () => ({ rating: 3, half: 3.5, textual: 4 }),
  template: /* html */ `
    <div class="demo-stack">
      <!-- Basic — interactive -->
      <div class="demo-field">
        <ArcanaRate v-model="rating" :aria-label="$dt.rateValueLabel" />
        <p class="demo-note">{{ $dt.rateValueLabel }}: <strong>{{ rating }}</strong></p>
      </div>

      <!-- Half stars + numeric score -->
      <ArcanaRate v-model="half" :allow-half="true" :show-score="true" />

      <!-- Descriptive text instead of the score -->
      <ArcanaRate
        v-model="textual"
        :show-text="true"
        :texts="[$dt.rateText1, $dt.rateText2, $dt.rateText3, $dt.rateText4, $dt.rateText5]"
      />

      <!-- Read-only — showing an average -->
      <div class="demo-field">
        <ArcanaRate :model-value="4.3" :readonly="true" :show-score="true" />
        <p class="demo-note">{{ $dt.rateAverageNote }}</p>
      </div>

      <!-- Sizes -->
      <div class="demo-row" style="align-items: center">
        <div class="demo-field">
          <span class="demo-field-label">{{ $dt.rateSizeSm }}</span>
          <ArcanaRate :model-value="4" size="sm" :readonly="true" />
        </div>
        <div class="demo-field">
          <span class="demo-field-label">{{ $dt.rateSizeMd }}</span>
          <ArcanaRate :model-value="4" size="md" :readonly="true" />
        </div>
        <div class="demo-field">
          <span class="demo-field-label">{{ $dt.rateSizeLg }}</span>
          <ArcanaRate :model-value="4" size="lg" :readonly="true" />
        </div>
      </div>

      <!-- Custom colours and disabled -->
      <div class="demo-row" style="align-items: center">
        <ArcanaRate :model-value="4" :readonly="true" color="var(--arcana-warning-solid)" />
        <ArcanaRate :model-value="3" :readonly="true" color="#8b5cf6" void-color="#e4e4e7" />
        <div class="demo-field">
          <ArcanaRate :model-value="2" :disabled="true" />
          <span class="demo-field-label">{{ $dt.rateDisabledNote }}</span>
        </div>
      </div>
    </div>
  `
};

/* ─────────────────────────── ArcanaAvatar ──────────────────────────── */

const AvatarDemo: Component = {
  components: { ArcanaAvatar },
  template: /* html */ `
    <div class="demo-stack">
      <!-- Fallback cascade — image, initials, icon, silhouette -->
      <div class="demo-field">
        <div class="demo-row" style="align-items: center">
          <ArcanaAvatar src="https://i.pravatar.cc/120?img=12" alt="Team member portrait" />
          <ArcanaAvatar initials="AM" />
          <ArcanaAvatar icon="fa-solid fa-user-tie" />
          <ArcanaAvatar />
        </div>
        <p class="demo-note">{{ $dt.avatarFallbackNote }}</p>
      </div>

      <!-- Shapes -->
      <div class="demo-row" style="align-items: center">
        <div class="demo-field">
          <span class="demo-field-label">{{ $dt.avatarShapeCircle }}</span>
          <ArcanaAvatar src="https://i.pravatar.cc/120?img=32" alt="Team member portrait" shape="circle" />
        </div>
        <div class="demo-field">
          <span class="demo-field-label">{{ $dt.avatarShapeSquare }}</span>
          <ArcanaAvatar src="https://i.pravatar.cc/120?img=45" alt="Team member portrait" shape="square" />
        </div>
      </div>

      <!-- Sizes — named steps and an exact pixel value -->
      <div class="demo-field">
        <div class="demo-row" style="align-items: center">
          <ArcanaAvatar initials="XS" size="xs" />
          <ArcanaAvatar initials="SM" size="sm" />
          <ArcanaAvatar initials="MD" size="md" />
          <ArcanaAvatar initials="LG" size="lg" />
          <ArcanaAvatar initials="XL" size="xl" />
          <ArcanaAvatar initials="64" :size="64" />
        </div>
        <p class="demo-note">{{ $dt.avatarSizesNote }}</p>
      </div>

      <!-- Custom background colour -->
      <div class="demo-row" style="align-items: center">
        <ArcanaAvatar initials="AM" color="#6366f1" />
        <ArcanaAvatar initials="BR" color="#10b981" />
        <ArcanaAvatar icon="fa-solid fa-building" color="#f59e0b" />
      </div>
    </div>
  `
};

/* ───────────────────────── ArcanaAvatarGroup ───────────────────────── */

const AvatarGroupDemo: Component = {
  components: { ArcanaAvatarGroup, ArcanaAvatar },
  data: () => ({
    team: [
      { initials: "AM", alt: "Ana Moreira", color: "#6366f1" },
      { initials: "BR", alt: "Bruno Reis", color: "#10b981" },
      { initials: "CS", alt: "Carla Silva", color: "#f59e0b" },
      { initials: "DL", alt: "Diego Lopes", color: "#ef4444" },
      { initials: "EM", alt: "Elena Marques", color: "#8b5cf6" }
    ]
  }),
  template: /* html */ `
    <div class="demo-stack">
      <!-- Data-driven with an overflow bubble -->
      <div class="demo-field">
        <span class="demo-field-label">{{ $dt.avatarGroupTeamLabel }}</span>
        <ArcanaAvatarGroup :avatars="team" :max="3" :aria-label="$dt.avatarGroupTeamLabel" />
      </div>

      <!-- Sizes and shape -->
      <div class="demo-row" style="align-items: center; gap: 24px">
        <ArcanaAvatarGroup :avatars="team" :max="4" size="sm" />
        <ArcanaAvatarGroup :avatars="team" :max="4" size="lg" shape="square" />
      </div>

      <!-- Spacing instead of overlap -->
      <div class="demo-row" style="align-items: center; gap: 24px">
        <div class="demo-field">
          <span class="demo-field-label">{{ $dt.avatarGroupOverlapNote }}</span>
          <ArcanaAvatarGroup :avatars="team" :max="4" />
        </div>
        <div class="demo-field">
          <span class="demo-field-label">{{ $dt.avatarGroupSpacingNote }}</span>
          <ArcanaAvatarGroup :avatars="team" :max="4" :spacing="4" />
        </div>
      </div>

      <!-- Composition — children instead of the array -->
      <div class="demo-field">
        <ArcanaAvatarGroup :overflow-count="7" size="md">
          <ArcanaAvatar src="https://i.pravatar.cc/120?img=12" alt="Team member portrait" />
          <ArcanaAvatar initials="BR" color="#10b981" />
          <ArcanaAvatar icon="fa-solid fa-user-tie" color="#0ea5e9" />
        </ArcanaAvatarGroup>
        <p class="demo-note">{{ $dt.avatarGroupCompositionNote }}</p>
      </div>
    </div>
  `
};

/* ─────────────────────────── ArcanaStatistic ───────────────────────── */

const StatisticDemo: Component = {
  components: { ArcanaStatistic },
  template: /* html */ `
    <div class="demo-stack">
      <!-- Basic -->
      <ArcanaStatistic :value="1284" :title="$dt.statActiveUsers" />

      <!-- Precision and separators -->
      <div class="demo-row" style="gap: 32px">
        <ArcanaStatistic
          :value="1234567.891"
          :precision="2"
          group-separator=","
          decimal-separator="."
          :title="$dt.statRevenue"
        />
        <div class="demo-field">
          <ArcanaStatistic
            :value="1234567.891"
            :precision="2"
            group-separator="."
            decimal-separator=","
            :title="$dt.statRevenue"
          />
          <p class="demo-note">{{ $dt.statLocaleNote }}</p>
        </div>
      </div>

      <!-- Prefix, suffix and icon -->
      <div class="demo-row" style="gap: 32px">
        <ArcanaStatistic
          :value="48250.75"
          :precision="2"
          prefix="$"
          icon="fa-solid fa-arrow-trend-up"
          :title="$dt.statRevenue"
          tone="success"
        />
        <ArcanaStatistic :value="3.8" :precision="1" suffix="%" :title="$dt.statConversion" />
        <!-- The same three spots are also slots, for rich content -->
        <ArcanaStatistic :value="99.98" :precision="2" tone="success">
          <template #title>{{ $dt.statUptime }}</template>
          <template #suffix><span style="font-size: .6em">%</span></template>
        </ArcanaStatistic>
      </div>

      <!-- Tones -->
      <div class="demo-row" style="gap: 32px">
        <ArcanaStatistic :value="1284" :title="$dt.statOrders" tone="neutral" />
        <ArcanaStatistic :value="892" :title="$dt.statActiveUsers" tone="success" />
        <ArcanaStatistic :value="2.4" :precision="1" suffix="%" :title="$dt.statChurn" tone="danger" />
        <ArcanaStatistic :value="17" :title="$dt.statPending" tone="warning" />
        <ArcanaStatistic :value="42" :title="$dt.statTickets" tone="info" />
      </div>

      <!-- Sizes -->
      <div class="demo-row" style="gap: 32px; align-items: baseline">
        <ArcanaStatistic :value="1284" :title="$dt.statOrders" size="sm" />
        <ArcanaStatistic :value="1284" :title="$dt.statOrders" size="md" />
        <ArcanaStatistic :value="1284" :title="$dt.statOrders" size="lg" />
        <ArcanaStatistic :value="1284" :title="$dt.statOrders" size="xl" />
      </div>
    </div>
  `
};

/* ─────────────────────────── ArcanaCountdown ───────────────────────── */

const CountdownDemo: Component = {
  components: { ArcanaCountdown, ArcanaButton },
  data() {
    // Targets are computed at mount time, so the demo is always counting down
    // (a hard-coded date would be in the past by the time you read this).
    const now = Date.now();
    return {
      deadline: now + 2 * 60 * 60 * 1000,
      longDeadline: now + 3 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000,
      shortDeadline: now + 15 * 60 * 1000,
      isPaused: true
    };
  },
  template: /* html */ `
    <div class="demo-stack">
      <!-- Basic — time left until a deadline -->
      <div class="demo-field">
        <ArcanaCountdown :value="deadline" />
        <p class="demo-note">{{ $dt.countdownFinishedNote }}</p>
      </div>

      <!-- Custom format -->
      <div class="demo-row" style="gap: 32px">
        <ArcanaCountdown :value="longDeadline" format="D[d] HH:mm:ss" />
        <ArcanaCountdown :value="shortDeadline" format="mm:ss" />
      </div>

      <!-- Title, prefix and suffix -->
      <ArcanaCountdown :value="deadline" :title="$dt.countdownFlashSale">
        <template #prefix><i class="fa-solid fa-hourglass-half" aria-hidden="true"></i></template>
        <template #suffix><i class="fa-solid fa-bolt" aria-hidden="true"></i></template>
      </ArcanaCountdown>

      <!-- Tones and sizes -->
      <div class="demo-row" style="gap: 32px; align-items: baseline">
        <ArcanaCountdown :value="shortDeadline" :title="$dt.countdownSessionExpires" tone="danger" size="lg" />
        <ArcanaCountdown :value="longDeadline" :title="$dt.countdownMaintenance" tone="success" size="sm" />
      </div>

      <!-- Paused -->
      <div class="demo-field">
        <ArcanaCountdown :value="deadline" :paused="isPaused" />
        <div class="demo-row">
          <ArcanaButton variant="outline" @click="isPaused = !isPaused">{{ $dt.countdownToggle }}</ArcanaButton>
        </div>
      </div>
    </div>
  `
};


/* ──────────────────── ArcanaContextMenuItem ───────────────────── */

const ContextMenuItemDemo: Component = {
  components: { ArcanaContextMenu, ArcanaContextMenuItem },
  data: () => ({ lastAction: null as string | null }),
  template: /* html */ `
    <div class="demo-stack" style="max-width: 420px">
      <!-- Composition — one <ArcanaContextMenuItem> per entry -->
      <ArcanaContextMenu :aria-label="$dt.contextTriggerNote">
        <template #trigger>
          <div class="demo-panel" style="border-style: dashed; text-align: center">
            {{ $dt.contextTriggerNote }}
          </div>
        </template>
        <ArcanaContextMenuItem icon="fa-regular fa-folder-open" @select="lastAction = $dt.contextOpen">
          {{ $dt.contextOpen }}
        </ArcanaContextMenuItem>
        <ArcanaContextMenuItem icon="fa-solid fa-clone" suffix="⌘D" @select="lastAction = $dt.contextDuplicate">
          {{ $dt.contextDuplicate }}
        </ArcanaContextMenuItem>
        <ArcanaContextMenuItem icon="fa-solid fa-folder-tree" :disabled="true">
          {{ $dt.contextDisabledItem }}
        </ArcanaContextMenuItem>
        <ArcanaContextMenuItem icon="fa-solid fa-trash" variant="danger" :divided="true" @select="lastAction = $dt.contextDelete">
          {{ $dt.contextDelete }}
        </ArcanaContextMenuItem>
      </ArcanaContextMenu>
      <p class="demo-note">{{ $dt.contextLastAction }}: <strong>{{ lastAction ?? $dt.contextNoneYet }}</strong></p>
    </div>
  `
};

/* ─────────────────────────── ArcanaProgress ────────────────────────── */

const ProgressDemo: Component = {
  components: { ArcanaProgress },
  template: /* html */ `
    <div class="demo-stack" style="max-width: 380px">
      <!-- Determinate -->
      <div class="demo-field">
        <span class="demo-field-label">{{ $dt.progressUploading }}</span>
        <ArcanaProgress :value="25" :show-value="true" :aria-label="$dt.progressUploading" />
      </div>
      <div class="demo-field">
        <span class="demo-field-label">{{ $dt.progressStorage }}</span>
        <ArcanaProgress :value="60" :show-value="true" :aria-label="$dt.progressStorage" />
      </div>
      <div class="demo-field">
        <span class="demo-field-label">{{ $dt.progressComplete }}</span>
        <ArcanaProgress :value="100" :show-value="true" tone="success" :aria-label="$dt.progressComplete" />
      </div>

      <!-- Indeterminate — value is null -->
      <div class="demo-field">
        <ArcanaProgress :value="null" :show-value="true" :aria-label="$dt.progressUploading" />
        <p class="demo-note">{{ $dt.progressIndeterminateNote }}</p>
      </div>

      <!-- Tones -->
      <ArcanaProgress :value="70" tone="accent" />
      <ArcanaProgress :value="70" tone="success" />
      <ArcanaProgress :value="70" tone="danger" />
      <ArcanaProgress :value="70" tone="warning" />
      <ArcanaProgress :value="70" tone="info" />

      <!-- Variants and radius -->
      <ArcanaProgress :value="45" variant="solid" />
      <ArcanaProgress :value="45" variant="soft" />
      <ArcanaProgress :value="45" radius="none" />
      <ArcanaProgress :value="45" radius="full" />

      <!-- Sizes -->
      <ArcanaProgress :value="55" size="sm" />
      <ArcanaProgress :value="55" size="md" />
      <ArcanaProgress :value="55" size="lg" />

      <!-- Custom label through the value slot -->
      <ArcanaProgress :value="3" :max="5" :show-value="true">
        <template #value>{{ $dt.progressCustomLabel }}</template>
      </ArcanaProgress>
    </div>
  `
};

/* ───────────────────────── ArcanaAspectRatio ───────────────────────── */

const AspectRatioDemo: Component = {
  components: { ArcanaAspectRatio },
  template: /* html */ `
    <div class="demo-stack">
      <!-- Default — 16 / 9 -->
      <div style="max-width: 380px">
        <ArcanaAspectRatio style="--arcana-aspect-ratio-radius: 10px">
          <img src="https://picsum.photos/seed/arcana1/800/600" :alt="$dt.aspectCoverAlt" />
        </ArcanaAspectRatio>
      </div>

      <!-- Square and portrait -->
      <div class="demo-row" style="gap: 16px">
        <div class="demo-field" style="width: 180px">
          <span class="demo-field-label">{{ $dt.aspectSquareNote }}</span>
          <ArcanaAspectRatio :ratio="1" style="--arcana-aspect-ratio-radius: 10px">
            <img src="https://picsum.photos/seed/arcana2/800/800" :alt="$dt.aspectCoverAlt" />
          </ArcanaAspectRatio>
        </div>
        <div class="demo-field" style="width: 180px">
          <span class="demo-field-label">{{ $dt.aspectPortraitNote }}</span>
          <ArcanaAspectRatio :ratio="3 / 4" style="--arcana-aspect-ratio-radius: 10px">
            <img src="https://picsum.photos/seed/arcana3/600/800" :alt="$dt.aspectCoverAlt" />
          </ArcanaAspectRatio>
        </div>
      </div>

      <!-- Classic 4 / 3 -->
      <div class="demo-field" style="width: 240px">
        <span class="demo-field-label">{{ $dt.aspectClassicNote }}</span>
        <ArcanaAspectRatio :ratio="4 / 3" style="--arcana-aspect-ratio-radius: 10px">
          <img src="https://picsum.photos/seed/arcana4/800/600" :alt="$dt.aspectCoverAlt" />
        </ArcanaAspectRatio>
      </div>

      <!-- Any embedded content — here a coloured placeholder -->
      <div style="max-width: 380px">
        <ArcanaAspectRatio :ratio="16 / 9" style="--arcana-aspect-ratio-radius: 10px">
          <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: linear-gradient(135deg, #6366f1, #0ea5e9); color: #fff; font-size: 13px; text-align: center; padding: 12px">
            {{ $dt.aspectEmbedNote }}
          </div>
        </ArcanaAspectRatio>
      </div>
    </div>
  `
};

/* ────────────────────────── ArcanaScrollArea ───────────────────────── */

const ScrollAreaDemo: Component = {
  components: { ArcanaScrollArea },
  template: /* html */ `
    <div class="demo-stack" style="max-width: 420px">
      <!-- Vertical with a max height -->
      <div class="demo-field">
        <span class="demo-field-label">{{ $dt.scrollVerticalNote }}</span>
        <ArcanaScrollArea :max-height="180" style="border: 1px solid var(--border); border-radius: 8px">
          <div style="padding: 8px 12px">
            <p v-for="n in 12" :key="n" style="margin: 0; padding: 6px 0; font-size: 13px">
              {{ $dt.scrollItemPrefix }} {{ n }}
            </p>
          </div>
        </ArcanaScrollArea>
      </div>

      <!-- Horizontal -->
      <div class="demo-field">
        <span class="demo-field-label">{{ $dt.scrollHorizontalNote }}</span>
        <ArcanaScrollArea orientation="horizontal" style="border: 1px solid var(--border); border-radius: 8px">
          <div style="display: flex; gap: 10px; padding: 12px; width: max-content">
            <div v-for="n in 8" :key="n" class="demo-panel" style="width: 130px; flex: 0 0 auto; text-align: center">
              {{ $dt.scrollItemPrefix }} {{ n }}
            </div>
          </div>
        </ArcanaScrollArea>
      </div>

      <!-- Both axes -->
      <div class="demo-field">
        <span class="demo-field-label">{{ $dt.scrollBothNote }}</span>
        <ArcanaScrollArea orientation="both" :height="180" style="border: 1px solid var(--border); border-radius: 8px">
          <div style="width: 760px; padding: 8px 12px">
            <p v-for="n in 12" :key="n" style="margin: 0; padding: 6px 0; font-size: 13px; white-space: nowrap">
              {{ $dt.scrollItemPrefix }} {{ n }}
            </p>
          </div>
        </ArcanaScrollArea>
      </div>

      <!-- Always-visible vs auto-hiding scrollbars -->
      <div class="demo-field">
        <span class="demo-field-label">{{ $dt.scrollTypeAlways }}</span>
        <ArcanaScrollArea type="always" :max-height="120" style="border: 1px solid var(--border); border-radius: 8px">
          <div style="padding: 8px 12px">
            <p v-for="n in 10" :key="n" style="margin: 0; padding: 6px 0; font-size: 13px">
              {{ $dt.scrollItemPrefix }} {{ n }}
            </p>
          </div>
        </ArcanaScrollArea>
      </div>
      <div class="demo-field">
        <span class="demo-field-label">{{ $dt.scrollTypeHover }}</span>
        <ArcanaScrollArea type="hover" :max-height="120" style="border: 1px solid var(--border); border-radius: 8px">
          <div style="padding: 8px 12px">
            <p v-for="n in 10" :key="n" style="margin: 0; padding: 6px 0; font-size: 13px">
              {{ $dt.scrollItemPrefix }} {{ n }}
            </p>
          </div>
        </ArcanaScrollArea>
      </div>
    </div>
  `
};

/* ────────────────────────── ArcanaHoverCard ────────────────────────── */

const HoverCardDemo: Component = {
  components: { ArcanaHoverCard, ArcanaAvatar },
  template: /* html */ `
    <div class="demo-stack">
      <!-- Basic — a profile preview on a link -->
      <div style="font-size: 14px">
        <ArcanaHoverCard>
          <template #trigger>
            <a href="#" @click.prevent style="color: var(--arcana-text, #4f46e5); text-decoration: underline">{{ $dt.hoverProfileName }}</a>
          </template>

          <div style="display: flex; gap: 10px; align-items: center">
            <ArcanaAvatar src="https://i.pravatar.cc/120?img=32" alt="Profile picture" size="lg" />
            <div>
              <p class="arcana-hover-card__title">{{ $dt.hoverProfileName }}</p>
              <p class="arcana-hover-card__text">{{ $dt.hoverProfileHandle }}</p>
            </div>
          </div>
          <p class="arcana-hover-card__text">{{ $dt.hoverProfileBio }}</p>
          <p class="arcana-hover-card__text"><strong>{{ $dt.hoverProfileFollowers }}</strong></p>
        </ArcanaHoverCard>
      </div>

      <!-- Sides -->
      <div class="demo-field">
        <div class="demo-row" style="gap: 20px; font-size: 14px">
          <ArcanaHoverCard side="top">
            <template #trigger><a href="#" @click.prevent>top</a></template>
            <p class="arcana-hover-card__title">{{ $dt.hoverProfileName }}</p>
            <p class="arcana-hover-card__text">{{ $dt.hoverProfileBio }}</p>
          </ArcanaHoverCard>
          <ArcanaHoverCard side="right">
            <template #trigger><a href="#" @click.prevent>right</a></template>
            <p class="arcana-hover-card__title">{{ $dt.hoverProfileName }}</p>
            <p class="arcana-hover-card__text">{{ $dt.hoverProfileBio }}</p>
          </ArcanaHoverCard>
          <ArcanaHoverCard side="bottom">
            <template #trigger><a href="#" @click.prevent>bottom</a></template>
            <p class="arcana-hover-card__title">{{ $dt.hoverProfileName }}</p>
            <p class="arcana-hover-card__text">{{ $dt.hoverProfileBio }}</p>
          </ArcanaHoverCard>
          <ArcanaHoverCard side="left">
            <template #trigger><a href="#" @click.prevent>left</a></template>
            <p class="arcana-hover-card__title">{{ $dt.hoverProfileName }}</p>
            <p class="arcana-hover-card__text">{{ $dt.hoverProfileBio }}</p>
          </ArcanaHoverCard>
        </div>
        <p class="demo-note">{{ $dt.hoverSideNote }}</p>
      </div>

      <!-- Alignment and offset -->
      <div style="font-size: 14px">
        <ArcanaHoverCard side="bottom" align="start" :offset="16">
          <template #trigger><a href="#" @click.prevent>{{ $dt.hoverProfileHandle }}</a></template>
          <p class="arcana-hover-card__title">{{ $dt.hoverProfileName }}</p>
          <p class="arcana-hover-card__text">{{ $dt.hoverProfileBio }}</p>
        </ArcanaHoverCard>
      </div>

      <!-- Delays -->
      <div class="demo-row" style="gap: 20px; font-size: 14px">
        <ArcanaHoverCard :open-delay="0" :close-delay="0">
          <template #trigger><a href="#" @click.prevent>{{ $dt.hoverDelayInstant }}</a></template>
          <p class="arcana-hover-card__text">{{ $dt.hoverProfileBio }}</p>
        </ArcanaHoverCard>
        <ArcanaHoverCard :open-delay="600">
          <template #trigger><a href="#" @click.prevent>{{ $dt.hoverDelaySlow }}</a></template>
          <p class="arcana-hover-card__text">{{ $dt.hoverProfileBio }}</p>
        </ArcanaHoverCard>
      </div>

      <!-- Disabled -->
      <div class="demo-field">
        <div style="font-size: 14px">
          <ArcanaHoverCard :disabled="true">
            <template #trigger><a href="#" @click.prevent>{{ $dt.hoverProfileHandle }}</a></template>
            <p class="arcana-hover-card__text">{{ $dt.hoverProfileBio }}</p>
          </ArcanaHoverCard>
        </div>
        <p class="demo-note">{{ $dt.hoverDisabledNote }}</p>
      </div>
    </div>
  `
};

/* ───────────────────────── ArcanaContextMenu ───────────────────────── */

const ContextMenuDemo: Component = {
  components: { ArcanaContextMenu, ArcanaContextMenuItem },
  data() {
    const $dt = (this as unknown as { $dt: Record<string, string> }).$dt;
    return {
      lastAction: null as string | null,
      items: [
        { label: $dt.contextOpen, icon: "fa-regular fa-folder-open" },
        { label: $dt.contextRename, icon: "fa-solid fa-pen" },
        { label: $dt.contextDuplicate, icon: "fa-solid fa-clone", suffix: "⌘D" },
        { label: $dt.contextDisabledItem, icon: "fa-solid fa-folder-tree", disabled: true },
        { label: $dt.contextShare, icon: "fa-solid fa-share-nodes", divided: true },
        { label: $dt.contextDelete, icon: "fa-solid fa-trash", variant: "danger", divided: true }
      ]
    };
  },
  methods: {
    onSelect(item: { label: string }) {
      (this as unknown as { lastAction: string | null }).lastAction = item.label;
    }
  },
  template: /* html */ `
    <div class="demo-stack" style="max-width: 420px">
      <!-- Data-driven items — right-click the area -->
      <ArcanaContextMenu :items="items" :aria-label="$dt.contextTriggerNote">
        <template #trigger>
          <div class="demo-panel" style="border-style: dashed; text-align: center; cursor: context-menu">
            {{ $dt.contextTriggerNote }}
          </div>
        </template>
      </ArcanaContextMenu>

      <!-- Reacting to the selection -->
      <div class="demo-field">
        <ArcanaContextMenu :items="items" :aria-label="$dt.contextTriggerNote" @select="onSelect">
          <template #trigger>
            <div class="demo-panel" style="border-style: dashed; text-align: center; cursor: context-menu">
              {{ $dt.contextTriggerNote }}
            </div>
          </template>
        </ArcanaContextMenu>
        <p class="demo-note">{{ $dt.contextLastAction }}: <strong>{{ lastAction || $dt.contextNoneYet }}</strong></p>
      </div>

      <!-- Composition — children instead of the array -->
      <ArcanaContextMenu :aria-label="$dt.contextTriggerNote">
        <template #trigger>
          <div class="demo-panel" style="border-style: dashed; text-align: center; cursor: context-menu">
            {{ $dt.contextTriggerNote }}
          </div>
        </template>

        <ArcanaContextMenuItem icon="fa-regular fa-folder-open">{{ $dt.contextOpen }}</ArcanaContextMenuItem>
        <ArcanaContextMenuItem icon="fa-solid fa-box-archive">{{ $dt.contextArchive }}</ArcanaContextMenuItem>
        <ArcanaContextMenuItem icon="fa-solid fa-trash" variant="danger" :divided="true">{{ $dt.contextDelete }}</ArcanaContextMenuItem>
      </ArcanaContextMenu>

      <!-- Disabled — the native menu comes back -->
      <div class="demo-field">
        <ArcanaContextMenu :items="items" :disabled="true">
          <template #trigger>
            <div class="demo-panel" style="border-style: dashed; text-align: center; cursor: context-menu">
              {{ $dt.contextTriggerNote }}
            </div>
          </template>
        </ArcanaContextMenu>
        <p class="demo-note">{{ $dt.contextDisabledNote }}</p>
      </div>
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
      "  <!-- Variants -->",
      "  <ArcanaButton @click=\"save\">Primary</ArcanaButton>",
      "  <ArcanaButton variant=\"secondary\">Secondary</ArcanaButton>",
      "  <ArcanaButton variant=\"outline\">Outline</ArcanaButton>",
      "  <ArcanaButton variant=\"ghost\">Ghost</ArcanaButton>",
      "  <ArcanaButton variant=\"success\">Success</ArcanaButton>",
      "  <ArcanaButton variant=\"indigo\">Indigo</ArcanaButton>",
      "  <ArcanaButton variant=\"destructive\">Destructive</ArcanaButton>",
      "  <ArcanaButton variant=\"outline-danger\">Outline danger</ArcanaButton>",
      "  <ArcanaButton :disabled=\"true\">Disabled</ArcanaButton>",
      "",
      "  <!-- Icon + label: drop a FontAwesome <i> inside the default slot -->",
      "  <ArcanaButton variant=\"primary\"><i class=\"fa-solid fa-plus\" /> New</ArcanaButton>",
      "  <ArcanaButton variant=\"outline\"><i class=\"fa-solid fa-download\" /> Export</ArcanaButton>",
      "  <ArcanaButton variant=\"destructive\"><i class=\"fa-solid fa-trash\" /> Delete</ArcanaButton>",
      "  <ArcanaButton variant=\"success\">Save <i class=\"fa-solid fa-arrow-right\" /></ArcanaButton>",
      "",
      "  <!-- Icon only: pass aria-label for accessibility -->",
      "  <ArcanaButton variant=\"outline\" aria-label=\"Settings\"><i class=\"fa-solid fa-gear\" /></ArcanaButton>",
      "  <ArcanaButton variant=\"ghost\" aria-label=\"More options\"><i class=\"fa-solid fa-ellipsis\" /></ArcanaButton>",
      "  <ArcanaButton variant=\"primary\" aria-label=\"Add\"><i class=\"fa-solid fa-plus\" /></ArcanaButton>",
      "  <ArcanaButton variant=\"destructive\" aria-label=\"Delete\"><i class=\"fa-solid fa-trash\" /></ArcanaButton>",
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
      "  <!-- Variants -->",
      "  <ArcanaBadge>Neutral</ArcanaBadge>",
      "  <ArcanaBadge variant=\"blue\">Blue</ArcanaBadge>",
      "  <ArcanaBadge variant=\"green\">Green</ArcanaBadge>",
      "  <ArcanaBadge variant=\"red\">Red</ArcanaBadge>",
      "  <ArcanaBadge variant=\"amber\">Amber</ArcanaBadge>",
      "  <ArcanaBadge variant=\"violet\">Violet</ArcanaBadge>",
      "",
      "  <!-- Status dot, compact size and clickable -->",
      "  <ArcanaBadge variant=\"green\" dot>Active</ArcanaBadge>",
      "  <ArcanaBadge variant=\"red\" dot>Offline</ArcanaBadge>",
      "  <ArcanaBadge variant=\"blue\" size=\"sm\">Small</ArcanaBadge>",
      "  <ArcanaBadge variant=\"violet\" clickable>Clickable</ArcanaBadge>",
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
      { name: "size", type: "sm | md | lg", default: "md", description: "Control height/padding." },
      { name: "min", type: "string | number", default: "—", description: "Forwarded to the native input; meaningful for number and date types." },
      { name: "max", type: "string | number", default: "—", description: "Forwarded to the native input; meaningful for number and date types." },
      { name: "step", type: "string | number", default: "—", description: "Increment of the native number input." },
      { name: "maxlength", type: "string | number", default: "—", description: "Maximum character count, enforced by the browser." },
      { name: "autocomplete", type: "string", default: "—", description: "Native autocomplete hint (e.g. \"email\", \"off\")." },
      { name: "name", type: "string", default: "—", description: "Field name, for native form submission." }
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
      { name: "size", type: "sm | md | lg", default: "md", description: "Trigger height/padding." },
      { name: "option.color", type: "string", default: "undefined", description: "Any CSS colour on an option renders a dot before its label — for status/tag palettes." },
      { name: "triggerMode", type: "labels | dots", default: "labels", description: "With 'dots' + multiple, the trigger shows only the coloured dots of what's selected (quick-filter pattern) instead of the labels." },
      { name: "icon / iconColor", type: "string", default: "''", description: "FontAwesome class (and optional colour) rendered at the left of the trigger." },
      { name: "showFooter", type: "boolean", default: "false", description: "In multiple mode, adds a footer to the panel with the selected count and a clear button." },
      { name: "footerCountLabel", type: "string", default: "'{count} selecionada(s)'", description: "Footer counter text; {count} is replaced by the number of selected options." },
      { name: "clearLabel", type: "string", default: "'Limpar'", description: "Label of the footer's clear button (clears the selection, keeping the panel open)." },
      { name: "searchPlaceholder", type: "string", default: "'Buscar...'", description: "Placeholder of the search box, shown when searchable is on." },
      { name: "icon", type: "string", default: "''", description: "Font Awesome class of an icon rendered at the start of the trigger." },
      { name: "iconColor", type: "string", default: "''", description: "Colour of that icon; any valid CSS colour string." }
    ],
    events: ["update:modelValue(value) — v-model update", "change(value) — same payload, on selection"],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ref } from 'vue'",
      "import { ArcanaSelect } from '@arcanalabs/ui-components/vue'",
      "",
      "const fruit = ref<string | null>(null)",
      "const fruits = ref<string[]>([])",
      "const statuses = ref(['todo', 'in_progress', 'in_review'])",
      "",
      "const options = [",
      "  { label: 'Apple', value: 'apple' },",
      "  { label: 'Banana', value: 'banana' },",
      "  { label: 'Cherry', value: 'cherry', description: 'seasonal' },",
      "  { label: 'Durian', value: 'durian', disabled: true },",
      "  { label: 'Elderberry', value: 'elderberry' },",
      "]",
      "",
      "// `color` on an option renders a dot before its label.",
      "const statusOptions = [",
      "  { label: 'To do', value: 'todo', color: '#10b981' },",
      "  { label: 'In progress', value: 'in_progress', color: '#3b82f6' },",
      "  { label: 'In review', value: 'in_review', color: '#8b5cf6' },",
      "  { label: 'Done', value: 'done', color: '#64748b' },",
      "  { label: 'Blocked', value: 'blocked', color: '#ef4444' },",
      "]",
      "</script>",
      "",
      "<template>",
      "  <!-- Single, with the search field -->",
      "  <ArcanaSelect v-model=\"fruit\" :options=\"options\" searchable placeholder=\"Pick a fruit\" />",
      "",
      "  <!-- Multiple: the value becomes an array and the panel stays open -->",
      "  <ArcanaSelect v-model=\"fruits\" :options=\"options\" multiple placeholder=\"Pick several\" />",
      "",
      "  <!-- Quick filter: only the coloured dots on the trigger, plus a footer -->",
      "  <ArcanaSelect",
      "    v-model=\"statuses\"",
      "    :options=\"statusOptions\"",
      "    placeholder=\"Status\"",
      "    multiple",
      "    trigger-mode=\"dots\"",
      "    icon=\"fa-solid fa-flag\"",
      "    show-footer",
      "    footer-count-label=\"{count} selected\"",
      "    clear-label=\"Clear\"",
      "  />",
      "</template>"
    ].join("\n")
  },

  treeSelect: {
    demo: TreeSelectDemo,
    props: [
      { name: "modelValue", type: "string | number | null | (string | number)[]", default: "null", description: "Selected node id (single) or array of ids (multiple)." },
      { name: "options", type: "TreeSelectNode[]", default: "[]", description: "Hierarchy: { id, name, children?, disabled? }." },
      { name: "multiple", type: "boolean", default: "false", description: "Multi-select; the trigger renders removable tags." },
      { name: "allowParentSelection", type: "boolean", default: "false", description: "When false, clicking a parent only expands it — only leaves select." },
      { name: "placeholder", type: "string", default: "'Selecione…'", description: "Shown when nothing is selected." },
      { name: "searchPlaceholder", type: "string", default: "'Buscar...'", description: "Placeholder of the filter input." },
      { name: "emptyText", type: "string", default: "'Nenhum resultado encontrado'", description: "Shown when the filter matches nothing." },
      { name: "clearable", type: "boolean", default: "true", description: "Shows an X on hover to clear the value." },
      { name: "disabled", type: "boolean", default: "false", description: "Disables the field." },
      { name: "size", type: "sm | md | lg", default: "md", description: "Trigger height/padding." },
      { name: "panelClass", type: "string", default: "undefined", description: "Extra class on the panel. The panel is teleported to <body>, so a selector on the field wrapper can't reach it — use this to scope the theme tokens below to one instance." },
      { name: "ariaLabel", type: "string", default: "—", description: "Accessible name of the trigger, when no visible label is associated." }
    ],
    events: ["update:modelValue(value) — v-model update", "change(value) — same payload, on selection"],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ref } from 'vue'",
      "import { ArcanaTreeSelect, type TreeSelectNode } from '@arcanalabs/ui-components/vue'",
      "",
      "const department = ref<number | null>(null)",
      "const picked = ref<number[]>([])",
      "const tree: TreeSelectNode[] = [",
      "  { id: 1, name: 'Engineering', children: [",
      "    { id: 11, name: 'Frontend' },",
      "    { id: 12, name: 'Backend' },",
      "  ] },",
      "  { id: 2, name: 'Marketing', children: [{ id: 21, name: 'Content' }] },",
      "]",
      "</script>",
      "",
      "<template>",
      "  <!-- Single: only leaves select; clicking a parent just expands it. -->",
      "  <ArcanaTreeSelect v-model=\"department\" :options=\"tree\" placeholder=\"Pick a department\" />",
      "",
      "  <!-- Multiple: removable tags; allow-parent-selection lets parents be picked too. -->",
      "  <ArcanaTreeSelect v-model=\"picked\" :options=\"tree\" multiple allow-parent-selection />",
      "",
      "  <!-- Theming: scope the tokens with panel-class (the panel lives in <body>). -->",
      "  <ArcanaTreeSelect v-model=\"department\" :options=\"tree\" panel-class=\"my-tree\" />",
      "</template>",
      "",
      "<style>",
      "/* Icon colours, selected item and search highlight are all CSS custom",
      "   properties — override them globally (:root) or per instance (panel-class). */",
      ".my-tree {",
      "  --arcana-tree-select-folder-color: #f59e0b;        /* folder icon (branch) */",
      "  --arcana-tree-select-leaf-color: #38bdf8;          /* document icon (leaf) */",
      "  --arcana-tree-select-selected-bg: #fef3c7;         /* selected row */",
      "  --arcana-tree-select-selected-text: #92400e;",
      "  --arcana-tree-select-selected-icon-color: #b45309;",
      "  --arcana-tree-select-hover-bg: #fffbeb;",
      "  --arcana-tree-select-mark-bg: #fde68a;             /* search highlight */",
      "}",
      "</style>"
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
      "import { computed, ref } from 'vue'",
      "import { ArcanaCheckbox } from '@arcanalabs/ui-components/vue'",
      "",
      "const items = ref({ invoices: true, receipts: false, statements: false })",
      "",
      "const values = computed(() => Object.values(items.value))",
      "const allChecked = computed(() => values.value.every(Boolean))",
      "const someChecked = computed(() => values.value.some(Boolean) && !allChecked.value)",
      "",
      "function toggleAll(checked: boolean) {",
      "  items.value = { invoices: checked, receipts: checked, statements: checked }",
      "}",
      "</script>",
      "",
      "<template>",
      "  <!-- Parent row: `indeterminate` draws the dash when only some are checked -->",
      "  <ArcanaCheckbox",
      "    :model-value=\"allChecked\"",
      "    :indeterminate=\"someChecked\"",
      "    label=\"Select all\"",
      "    @update:modelValue=\"toggleAll\"",
      "  />",
      "",
      "  <ArcanaCheckbox v-model=\"items.invoices\" label=\"Invoices\" />",
      "  <ArcanaCheckbox v-model=\"items.receipts\" label=\"Receipts\" />",
      "  <ArcanaCheckbox v-model=\"items.statements\" label=\"Statements\" />",
      "  <ArcanaCheckbox :model-value=\"false\" disabled label=\"Archived (disabled)\" />",
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
      "const beta = ref(false)",
      "</script>",
      "",
      "<template>",
      "  <label class=\"form-row\">",
      "    <span>Auto-renew</span>",
      "    <ArcanaSwitch v-model=\"autoRenew\" aria-label=\"Auto-renew\" />",
      "  </label>",
      "  <label class=\"form-row\">",
      "    <span>Beta features</span>",
      "    <ArcanaSwitch v-model=\"beta\" aria-label=\"Beta features\" />",
      "  </label>",
      "",
      "  <!-- Sizes and disabled state -->",
      "  <ArcanaSwitch v-model=\"autoRenew\" size=\"sm\" aria-label=\"Small\" />",
      "  <ArcanaSwitch v-model=\"autoRenew\" size=\"md\" aria-label=\"Medium\" />",
      "  <ArcanaSwitch v-model=\"autoRenew\" size=\"lg\" aria-label=\"Large\" />",
      "  <ArcanaSwitch :model-value=\"true\" disabled aria-label=\"Disabled\" />",
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
      { name: "ariaLabel", type: "string", default: "''", description: "Accessible name of the tablist." },
      { name: "flush", type: "boolean", default: "false", description: "Zeroes the margin inherited from a parent tablist, for nested tabs." },
      { name: "tooltipPlacement", type: "string", default: "''", description: "Shows the tab label in a tooltip at this placement — for collapsed sidebars that hide labels." }
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
      { name: "closeOnEscape", type: "boolean", default: "true", description: "Close when Escape is pressed." },
      { name: "fullHeight", type: "boolean", default: "false", description: "Stretches the dialog to the available viewport height." },
      { name: "contentClass", type: "string", default: "''", description: "Extra class on the dialog content box, for one-off sizing or spacing." },
      { name: "noBodyPadding", type: "boolean", default: "false", description: "Removes the body padding, for content that draws its own edges (tables, maps)." },
      { name: "bodyScrollable", type: "boolean", default: "true", description: "Lets the body scroll when the content overflows; off, the whole dialog grows." },
      { name: "flatFooter", type: "boolean", default: "false", description: "Drops the footer separator and background, so the actions sit flush with the body." }
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
      "const phone = ref('')",
      "const card = ref('')",
      "</script>",
      "",
      "<template>",
      "  <ArcanaInputMask v-model=\"phone\" mask=\"(###) ###-####\" placeholder=\"Phone\" />",
      "  <ArcanaInputMask v-model=\"card\" mask=\"#### #### #### ####\" placeholder=\"Card number\" />",
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
      "const answer = ref<number | null>(null)      // '' → Sim/Não (1/0)",
      "const active = ref<number | null>(1)        // status → Ativo/Inativo (1/0)",
      "const hasValue = ref<string | null>(null)   // nullable → IS_NOT_NULL/IS_NULL",
      "</script>",
      "",
      "<template>",
      "  <ArcanaInputBoolean v-model=\"answer\" placeholder=\"Yes / No\" />",
      "  <ArcanaInputBoolean v-model=\"active\" variation=\"status\" :clearable=\"false\" />",
      "  <ArcanaInputBoolean v-model=\"hasValue\" variation=\"nullable\" placeholder=\"Has a value?\" />",
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
      "const weight = ref(10)",
      "</script>",
      "",
      "<template>",
      "  <ArcanaNumberStepper v-model=\"qty\" :min=\"0\" :max=\"10\" aria-label=\"Quantity\" />",
      "",
      "  <!-- step jumps by 5 -->",
      "  <ArcanaNumberStepper v-model=\"weight\" :min=\"0\" :max=\"100\" :step=\"5\" aria-label=\"Weight\" />",
      "",
      "  <ArcanaNumberStepper :model-value=\"5\" disabled aria-label=\"Disabled\" />",
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
      { name: "radioPosition", type: "start | end", default: "start", description: "Places the radio circle on the left (start) or right (end)." },
      { name: "iconPosition", type: "start | end", default: "start", description: "Places the icon chip before (start) or after (end) the text block. Combines with radioPosition." },
      { name: "option.iconBg / iconColor / iconBorder", type: "string (CSS color)", default: "undefined", description: "Paint the icon chip — background, glyph colour and border, as in the ERP's invoice wizard." }
    ],
    events: ["update:modelValue(value) — v-model update", "change(value) — on selection"],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ref } from 'vue'",
      "import { ArcanaRadioCardGroup } from '@arcanalabs/ui-components/vue'",
      "",
      "const method = ref('bank_transfer')",
      "const model = ref('personal')",
      "const freight = ref('standard')",
      "",
      "const options = [",
      "  { label: 'Credit card', value: 'credit_card', description: 'Automatic recurring charge.' },",
      "  { label: 'Bank transfer', value: 'bank_transfer', description: 'Instant, no fees.', badge: 'Recommended' },",
      "  { label: 'Invoice', value: 'invoice', description: 'Due in 3 business days.' },",
      "  { label: 'Cash on delivery', value: 'cash', disabled: true },",
      "]",
      "",
      "// Coloured icon chip: iconBg/iconColor/iconBorder paint the square behind the icon.",
      "const iconOptions = [",
      "  { label: 'Personal account', value: 'personal', description: 'For individual use', icon: 'fa-solid fa-file-invoice', iconBg: '#dbeafe', iconColor: '#2563eb', iconBorder: '#bfdbfe' },",
      "  { label: 'Business account', value: 'business', description: 'For teams and companies', icon: 'fa-solid fa-receipt', iconBg: '#d1fae5', iconColor: '#059669', iconBorder: '#a7f3d0' },",
      "]",
      "",
      "const freightOptions = [",
      "  { label: 'Standard shipping', value: 'standard', description: 'Arrives in 5–7 business days', icon: 'fa-solid fa-truck', iconBg: '#e0e7ff', iconColor: '#4f46e5', iconBorder: '#c7d2fe' },",
      "  { label: 'Express shipping', value: 'express', description: 'Arrives next business day', icon: 'fa-solid fa-user', iconBg: '#fef3c7', iconColor: '#b45309', iconBorder: '#fde68a' },",
      "]",
      "</script>",
      "",
      "<template>",
      "  <ArcanaRadioCardGroup v-model=\"method\" :options=\"options\" aria-label=\"Payment method\" />",
      "",
      "  <!-- Icon at the start (default) -->",
      "  <ArcanaRadioCardGroup v-model=\"model\" :options=\"iconOptions\" :columns=\"2\" aria-label=\"Icon at the start\" />",
      "",
      "  <!-- Icon at the end -->",
      "  <ArcanaRadioCardGroup v-model=\"model\" :options=\"iconOptions\" :columns=\"2\" icon-position=\"end\" aria-label=\"Icon at the end\" />",
      "",
      "  <!-- Radio at the end -->",
      "  <ArcanaRadioCardGroup v-model=\"freight\" :options=\"freightOptions\" :columns=\"2\" radio-position=\"end\" aria-label=\"Radio at the end\" />",
      "</template>"
    ].join("\n")
  },

  segmentedOptions: {
    demo: SegmentedControlDemo,
    props: [
      { name: "modelValue", type: "string | number | null", default: "null", description: "Value of the active option (v-model)." },
      { name: "options", type: "Array<{ label, value, disabled?, icon?, iconColor?, ariaLabel? }>", default: "[]", description: "The segments. `iconColor` tints that option's icon; leave `label` empty for an icon-only segment and give it an `ariaLabel`." },
      { name: "size", type: "sm | md | lg | xl", default: "md", description: "Height, padding, font and icon size of the control." },
      { name: "CSS tokens", type: "custom properties", default: "per size", description: "--arcana-segmented-control-{height,padding,padding-x,font-size,icon-size} override any size, for a fully custom dimension." },
      { name: "disabled", type: "boolean", default: "false", description: "Disables the whole group." },
      { name: "compact", type: "boolean (deprecated)", default: "false", description: "Legacy shorthand for size=\"sm\"; an explicit `size` wins." },
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
      "import { ArcanaSegmentedControl } from '@arcanalabs/ui-components/vue'",
      "",
      "const view = ref('list')",
      "const priority = ref('medium')",
      "",
      "const options = [",
      "  { label: 'List', value: 'list' },",
      "  { label: 'Grid', value: 'grid' },",
      "  { label: 'Board', value: 'board' },",
      "]",
      "",
      "const iconOptions = [",
      "  { label: 'List', value: 'list', icon: 'fa-solid fa-list' },",
      "  { label: 'Grid', value: 'grid', icon: 'fa-solid fa-table-cells-large' },",
      "  { label: 'Board', value: 'board', icon: 'fa-solid fa-columns' },",
      "]",
      "",
      "// `iconColor` tints each option's icon — handy for semantics",
      "// (green = low risk, amber = attention, red = urgent).",
      "const colorOptions = [",
      "  { label: 'Low', value: 'low', icon: 'fa-solid fa-circle-check', iconColor: '#16a34a' },",
      "  { label: 'Medium', value: 'medium', icon: 'fa-solid fa-triangle-exclamation', iconColor: '#f59e0b' },",
      "  { label: 'High', value: 'high', icon: 'fa-solid fa-fire', iconColor: '#dc2626' },",
      "]",
      "",
      "// Icon-only: leave `label` empty and name each segment with `ariaLabel`.",
      "// The <i> is aria-hidden, so without it the button has no accessible name.",
      "const iconOnlyOptions = [",
      "  { label: '', value: 'list', icon: 'fa-solid fa-list', ariaLabel: 'List' },",
      "  { label: '', value: 'grid', icon: 'fa-solid fa-table-cells-large', ariaLabel: 'Grid' },",
      "  { label: '', value: 'board', icon: 'fa-solid fa-columns', ariaLabel: 'Board' },",
      "]",
      "</script>",
      "",
      "<template>",
      "  <ArcanaSegmentedControl v-model=\"view\" :options=\"options\" aria-label=\"View mode\" />",
      "",
      "  <!-- Dense variant: shorter height and moderate corner radius -->",
      "  <ArcanaSegmentedControl v-model=\"view\" :options=\"options\" compact squared />",
      "",
      "  <!-- With icons -->",
      "  <ArcanaSegmentedControl v-model=\"view\" :options=\"iconOptions\" />",
      "",
      "  <!-- With coloured icons -->",
      "  <ArcanaSegmentedControl v-model=\"priority\" :options=\"colorOptions\" />",
      "",
      "  <!-- Icon-only: empty labels + per-option ariaLabel -->",
      "  <ArcanaSegmentedControl v-model=\"view\" :options=\"iconOnlyOptions\" aria-label=\"View mode\" />",
      "",
      "  <!-- The four sizes -->",
      "  <ArcanaSegmentedControl v-model=\"view\" :options=\"options\" size=\"sm\" />",
      "  <ArcanaSegmentedControl v-model=\"view\" :options=\"options\" size=\"md\" />",
      "  <ArcanaSegmentedControl v-model=\"view\" :options=\"options\" size=\"lg\" />",
      "  <ArcanaSegmentedControl v-model=\"view\" :options=\"options\" size=\"xl\" />",
      "",
      "  <!-- Off the scale: the CSS tokens beat any `size` (drop `size` altogether) -->",
      "  <ArcanaSegmentedControl",
      "    v-model=\"view\"",
      "    :options=\"options\"",
      "    style=\"--arcana-segmented-control-height: 40px; --arcana-segmented-control-font-size: 15px; --arcana-segmented-control-padding-x: 22px\"",
      "  />",
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
      { name: "size", type: "sm | md | lg", default: "md", description: "Field height/padding." },
      { name: "ariaLabel", type: "string", default: "—", description: "Accessible name of the field, when no visible label is associated." }
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
      "  <ArcanaDatePicker v-model=\"month\" type=\"month\" />",
      "  <ArcanaDatePicker v-model=\"year\" type=\"year\" />",
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
      { name: "allowBlank", type: "boolean", default: "false", description: "Permits an empty field instead of coercing to 0." },
      { name: "name", type: "string", default: "—", description: "Field name, for native form submission." },
      { name: "formatCurrency", type: "boolean", default: "true", description: "Formats as currency while typing; off, the field keeps a plain number." }
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
      { name: "accordion", type: "boolean", default: "true", description: "true → one panel open at a time; false → multiple panels can be open." },
      { name: "animated", type: "boolean", default: "false", description: "Animates open/close with a height + fade transition (~200ms). Each <ArcanaAccordionItem> also accepts it, taking precedence over the container. Honours prefers-reduced-motion." }
    ],
    events: ["update:modelValue(value) — v-model update", "Provides accordionApi to child <ArcanaAccordionItem> via provide/inject"],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ref } from 'vue'",
      "import { ArcanaAccordion, ArcanaAccordionItem } from '@arcanalabs/ui-components/vue'",
      "",
      "const open = ref('shipping')",
      "const openAnimated = ref('shipping')",
      "</script>",
      "",
      "<template>",
      "  <ArcanaAccordion v-model=\"open\">",
      "    <ArcanaAccordionItem name=\"shipping\" title=\"Shipping\">Ships in 2–3 days.</ArcanaAccordionItem>",
      "    <ArcanaAccordionItem name=\"returns\" title=\"Returns\">30-day free returns.</ArcanaAccordionItem>",
      "    <ArcanaAccordionItem name=\"warranty\" title=\"Warranty\" disabled>12 months.</ArcanaAccordionItem>",
      "  </ArcanaAccordion>",
      "",
      "  <!-- animated: height + fade transition (~200ms), honours prefers-reduced-motion -->",
      "  <ArcanaAccordion v-model=\"openAnimated\" animated>",
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
      { name: "disabled", type: "boolean", default: "false", description: "Blocks toggling this panel." },
      { name: "animated", type: "boolean", default: "inherited", description: "Animates the open/close transition. Omitted, it inherits the accordion; set, it wins over the container." }
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
      "import { ArcanaDropdown, ArcanaDropdownItem, ArcanaButton } from '@arcanalabs/ui-components/vue'",
      "</script>",
      "",
      "<template>",
      "  <ArcanaDropdown placement=\"bottom-start\" size=\"comfortable\">",
      "    <template #trigger>",
      "      <ArcanaButton variant=\"outline\">Open menu ▾</ArcanaButton>",
      "    </template>",
      "",
      "    <!-- #suffix renders a right-aligned hint (shortcut, counter…) -->",
      "    <ArcanaDropdownItem icon=\"fa-solid fa-user\" @click=\"openProfile\">",
      "      Profile",
      "      <template #suffix>⌘P</template>",
      "    </ArcanaDropdownItem>",
      "",
      "    <ArcanaDropdownItem icon=\"fa-solid fa-check\" variant=\"success\" @click=\"approve\">Approve</ArcanaDropdownItem>",
      "    <ArcanaDropdownItem icon=\"fa-solid fa-flag\" variant=\"warning\" @click=\"flag\">Flag for review</ArcanaDropdownItem>",
      "    <ArcanaDropdownItem icon=\"fa-solid fa-trash\" variant=\"danger\" divided @click=\"del\">Delete</ArcanaDropdownItem>",
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
      "import { ArcanaTable, ArcanaBadge } from '@arcanalabs/ui-components/vue'",
      "",
      "const columns = [",
      "  { key: 'sku', label: 'SKU', width: '96px' },",
      "  { key: 'name', label: 'Product' },",
      "  { key: 'qty', label: 'Qty', align: 'right' },",
      "  { key: 'total', label: 'Total', align: 'right', valueGetter: (v: number) => '$' + v.toFixed(2) },",
      "]",
      "const rows = [",
      "  { sku: 'WM-100', name: 'Wireless Mouse', qty: 2, total: 260, status: 'in' },",
      "  { sku: 'KB-200', name: 'Mechanical Keyboard', qty: 1, total: 480, status: 'low' },",
      "]",
      "</script>",
      "",
      "<template>",
      "  <ArcanaTable :columns=\"columns\" :rows=\"rows\">",
      "    <!-- #cell-<key> takes over the render of that column -->",
      "    <template #cell-name=\"{ row }\">",
      "      <strong>{{ row.name }}</strong>",
      "      <ArcanaBadge :variant=\"row.status === 'low' ? 'amber' : 'green'\" size=\"sm\">",
      "        {{ row.status === 'low' ? 'Low stock' : 'In stock' }}",
      "      </ArcanaBadge>",
      "    </template>",
      "    <template #footer><tr><td colspan=\"3\">Total</td><td class=\"arcana-table__td--right\">$740.00</td></tr></template>",
      "  </ArcanaTable>",
      "</template>"
    ].join("\n")
  },

  specSheet: {
    demo: SpecSheetDemo,
    props: [
      { name: "docNum", type: "string", default: "''", description: "Mono uppercase eyebrow at the top (e.g. 'Record No. 042')." },
      { name: "title", type: "string", default: "''", description: "Main heading (or use the #title slot for rich markup)." },
      { name: "metaLabel", type: "string", default: "''", description: "Small uppercase label above the meta block on the right." },
      { name: "flat", type: "boolean", default: "false", description: "Drops the card chrome (border/radius/bg/shadow) for embedding inside another card." }
    ],
    events: [
      "Slots: default (sections), #header (replace whole header), #title, #meta, #footer (action zone)"
    ],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ArcanaSpecSheet, ArcanaSpecSheetSection, ArcanaSpecSheetField, ArcanaButton } from '@arcanalabs/ui-components/vue'",
      "</script>",
      "",
      "<template>",
      "  <ArcanaSpecSheet doc-num=\"Record No. 042\" title=\"Acme Corporation\" meta-label=\"Status\">",
      "    <template #meta><span class=\"arcana-spec-sheet-badge arcana-spec-sheet-badge--active\">Active</span></template>",
      "",
      "    <ArcanaSpecSheetSection title=\"Company details\" section-num=\"§ 01\" icon=\"fa-solid fa-building\" icon-color=\"blue\" :columns=\"3\">",
      "      <ArcanaSpecSheetField label=\"Legal name\" :value=\"form.legal_name\" />",
      "      <ArcanaSpecSheetField label=\"Tax ID\" :value=\"form.tax_id\" />",
      "      <ArcanaSpecSheetField label=\"Registration no.\" :value=\"form.registration_number\" />",
      "    </ArcanaSpecSheetSection>",
      "",
      "    <!-- Sections stack; each one gets its own icon colour and column count -->",
      "    <ArcanaSpecSheetSection title=\"Contact\" section-num=\"§ 02\" icon=\"fa-solid fa-phone\" icon-color=\"emerald\">",
      "      <ArcanaSpecSheetField label=\"Phone\" :value=\"form.phone\" />",
      "      <ArcanaSpecSheetField label=\"E-mail\" :value=\"form.email\" />",
      "    </ArcanaSpecSheetSection>",
      "",
      "    <template #footer><ArcanaButton variant=\"outline\">Change data</ArcanaButton></template>",
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
      "import { ArcanaSpecSheet, ArcanaSpecSheetSection, ArcanaSpecSheetField, ArcanaButton } from '@arcanalabs/ui-components/vue'",
      "</script>",
      "",
      "<template>",
      "  <!-- Sections always live inside a <ArcanaSpecSheet>; `flat` drops the card chrome -->",
      "  <ArcanaSpecSheet flat>",
      "    <ArcanaSpecSheetSection title=\"Billing\" section-num=\"§ 03\" icon=\"fa-solid fa-dollar-sign\" icon-color=\"amber\" :columns=\"3\">",
      "      <template #actions><ArcanaButton variant=\"ghost\">Change</ArcanaButton></template>",
      "      <ArcanaSpecSheetField label=\"Limit\" value=\"$5,000.00\" />",
      "      <ArcanaSpecSheetField label=\"Balance\" value=\"$1,240.00\" />",
      "      <ArcanaSpecSheetField label=\"Due date\" value=\"10th of every month\" />",
      "    </ArcanaSpecSheetSection>",
      "",
      "    <!-- no-row-dividers removes the dashed lines between field rows -->",
      "    <ArcanaSpecSheetSection title=\"Notes\" icon=\"fa-solid fa-note-sticky\" icon-color=\"violet\" no-row-dividers>",
      "      <ArcanaSpecSheetField label=\"Internal notes\" value=\"Priority customer.\" :span=\"2\" />",
      "    </ArcanaSpecSheetSection>",
      "  </ArcanaSpecSheet>",
      "</template>"
    ].join("\n")
  },

  specSheetField: {
    demo: SpecSheetFieldDemo,
    props: [
      { name: "label", type: "string", default: "— (required)", description: "Uppercase mono label (e.g. 'Legal name')." },
      { name: "value", type: "string | number | null", default: "''", description: "Text value. Empty (null/undefined/'') shows emptyText." },
      { name: "emptyText", type: "string", default: "'Não informado'", description: "Italic muted fallback shown when value is empty." },
      { name: "span", type: "number | string", default: "1", description: "How many grid columns the field spans." }
    ],
    events: ["Slots: default — replaces the rendered value (use for badges/links/HTML)"],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ArcanaSpecSheet, ArcanaSpecSheetSection, ArcanaSpecSheetField } from '@arcanalabs/ui-components/vue'",
      "</script>",
      "",
      "<template>",
      "  <ArcanaSpecSheet flat>",
      "    <ArcanaSpecSheetSection :columns=\"2\">",
      "      <ArcanaSpecSheetField label=\"Name\" value=\"Ana Ribeiro\" />",
      "",
      "      <!-- Empty value falls back to empty-text, in muted italics -->",
      "      <ArcanaSpecSheetField label=\"Nickname\" value=\"\" empty-text=\"Not provided\" />",
      "",
      "      <!-- The default slot replaces the value; :span widens the field -->",
      "      <ArcanaSpecSheetField label=\"Status\" :span=\"2\">",
      "        <span class=\"arcana-spec-sheet-badge arcana-spec-sheet-badge--active\">Active</span>",
      "      </ArcanaSpecSheetField>",
      "    </ArcanaSpecSheetSection>",
      "  </ArcanaSpecSheet>",
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
      "    <ArcanaSummaryTile tone=\"positive\" icon=\"fa-solid fa-arrow-down\" label=\"Income\" value=\"$1,250.00\" sub=\"4 payment methods\" />",
      "    <ArcanaSummaryTile tone=\"negative\" icon=\"fa-solid fa-arrow-up\" label=\"Expenses\" value=\"$85.00\" sub=\"1 payment method\" />",
      "    <ArcanaSummaryTile tone=\"indigo\" icon=\"fa-solid fa-sack-dollar\" label=\"Total\" value=\"$1,165.00\" />",
      "  </ArcanaSummaryTilesGroup>",
      "",
      "  <!-- format=\"rows\": one tile per full-width row -->",
      "  <ArcanaSummaryTilesGroup format=\"rows\">",
      "    <ArcanaSummaryTile tone=\"positive\" icon=\"fa-solid fa-arrow-down\" label=\"Income\" value=\"$1,250.00\" sub=\"4 payment methods\" />",
      "    <ArcanaSummaryTile tone=\"negative\" icon=\"fa-solid fa-arrow-up\" label=\"Expenses\" value=\"$85.00\" sub=\"1 payment method\" />",
      "  </ArcanaSummaryTilesGroup>",
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
      "import { ArcanaSummaryTile, ArcanaBadge } from '@arcanalabs/ui-components/vue'",
      "</script>",
      "",
      "<template>",
      "  <ArcanaSummaryTile tone=\"neutral\" icon=\"fa-solid fa-box\" label=\"Orders\" value=\"128\" sub=\"today\" />",
      "  <ArcanaSummaryTile tone=\"positive\" icon=\"fa-solid fa-check\" label=\"Approved\" value=\"112\" />",
      "  <ArcanaSummaryTile tone=\"negative\" icon=\"fa-solid fa-xmark\" label=\"Canceled\" value=\"16\" />",
      "",
      "  <!-- #value replaces the rendered value — use it for badges/links -->",
      "  <ArcanaSummaryTile tone=\"indigo\" icon=\"fa-solid fa-percent\" label=\"Conversion\">",
      "    <template #value><ArcanaBadge variant=\"green\">87.5%</ArcanaBadge></template>",
      "  </ArcanaSummaryTile>",
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
      "const email = ref(false)",
      "</script>",
      "",
      "<template>",
      "  <ArcanaSettingsList>",
      "    <ArcanaSettingsListItem label=\"Advanced features\" caption=\"Enables internal functionality.\">",
      "      <ArcanaSwitch v-model=\"enabled\" aria-label=\"Advanced features\" />",
      "    </ArcanaSettingsListItem>",
      "",
      "    <ArcanaSettingsListItem label=\"E-mail notifications\" caption=\"Daily summary of activity.\">",
      "      <ArcanaSwitch v-model=\"email\" aria-label=\"E-mail notifications\" />",
      "    </ArcanaSettingsListItem>",
      "",
      "    <!-- The default slot takes any control — not just a switch -->",
      "    <ArcanaSettingsListItem label=\"Plan\" caption=\"Defines the available limits.\">",
      "      <span class=\"arcana-settings-list__current-value\">Professional</span>",
      "      <button class=\"arcana-settings-list__edit-btn\" type=\"button\" @click=\"changePlan\">Change</button>",
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
      "import { ref } from 'vue'",
      "import { ArcanaSettingsList, ArcanaSettingsListGroup, ArcanaSettingsListItem, ArcanaSwitch } from '@arcanalabs/ui-components/vue'",
      "",
      "const acceptOrders = ref(true)",
      "const autoConfirm = ref(false)",
      "const tracking = ref(true)",
      "</script>",
      "",
      "<template>",
      "  <ArcanaSettingsList>",
      "    <ArcanaSettingsListGroup title=\"Orders\" icon=\"fa-solid fa-cart-shopping\" icon-color=\"indigo\" section-num=\"§ 01\" meta=\"2 settings\">",
      "      <ArcanaSettingsListItem label=\"Accept orders\" caption=\"Turn off to pause the store.\">",
      "        <ArcanaSwitch v-model=\"acceptOrders\" aria-label=\"Accept orders\" />",
      "      </ArcanaSettingsListItem>",
      "      <ArcanaSettingsListItem label=\"Auto-confirm\" caption=\"Skips manual approval.\" nested>",
      "        <ArcanaSwitch v-model=\"autoConfirm\" aria-label=\"Auto-confirm\" />",
      "      </ArcanaSettingsListItem>",
      "    </ArcanaSettingsListGroup>",
      "",
      "    <!-- collapsible turns the header into a toggle; compact tightens the padding -->",
      "    <ArcanaSettingsListGroup title=\"Delivery\" icon=\"fa-solid fa-truck\" icon-color=\"emerald\" collapsible default-collapsed compact>",
      "      <ArcanaSettingsListItem label=\"Real-time tracking\">",
      "        <ArcanaSwitch v-model=\"tracking\" aria-label=\"Real-time tracking\" />",
      "      </ArcanaSettingsListItem>",
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
      "import { ref } from 'vue'",
      "import { ArcanaSettingsList, ArcanaSettingsListItem, ArcanaSwitch } from '@arcanalabs/ui-components/vue'",
      "",
      "const subscription = ref(true)",
      "const showInApp = ref(false)",
      "</script>",
      "",
      "<template>",
      "  <ArcanaSettingsList>",
      "    <!-- #label accepts rich markup (badges, links…) -->",
      "    <ArcanaSettingsListItem caption=\"New SaaS billing engine.\">",
      "      <template #label>",
      "        Subscription v2",
      "        <span class=\"arcana-spec-sheet-badge arcana-spec-sheet-badge--active\">Active</span>",
      "      </template>",
      "      <ArcanaSwitch v-model=\"subscription\" aria-label=\"Subscription v2\" />",
      "    </ArcanaSettingsListItem>",
      "",
      "    <!-- nested: extra indent, muted background and a connector mark -->",
      "    <ArcanaSettingsListItem label=\"Show in the web app\" caption=\"Depends on the setting above.\" nested>",
      "      <ArcanaSwitch v-model=\"showInApp\" aria-label=\"Show in the web app\" />",
      "    </ArcanaSettingsListItem>",
      "",
      "    <ArcanaSettingsListItem label=\"Unavailable feature\" caption=\"Not included in your plan.\" disabled>",
      "      <ArcanaSwitch :model-value=\"false\" disabled aria-label=\"Unavailable feature\" />",
      "    </ArcanaSettingsListItem>",
      "  </ArcanaSettingsList>",
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
      { name: "emptyText", type: "string", default: "'Não definido'", description: "Italic fallback shown when the value is empty." },
      { name: "disabled", type: "boolean", default: "false", description: "Disables the row and its edit button." },
      { name: "modalTitle", type: "string", default: "''", description: "Title of the edit dialog; falls back to the field label." },
      { name: "modalDescription", type: "string", default: "''", description: "Support text under the dialog title." },
      { name: "inputLabel", type: "string", default: "''", description: "Label of the input inside the dialog; falls back to the field label." },
      { name: "inputPlaceholder", type: "string", default: "''", description: "Placeholder of the input inside the dialog." },
      { name: "min", type: "number | string", default: "—", description: "Lower bound forwarded to the numeric/currency editor." },
      { name: "max", type: "number | string", default: "—", description: "Upper bound forwarded to the numeric/currency editor." }
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
      "const name = ref('Arcana Labs HQ')",
      "const discount = ref('1500.00')",
      "const plan = ref('pro')",
      "const planOptions = [",
      "  { label: 'Basic', value: 'basic' },",
      "  { label: 'Professional', value: 'pro' },",
      "  { label: 'Enterprise', value: 'enterprise' },",
      "]",
      "</script>",
      "",
      "<template>",
      "  <ArcanaSettingsList>",
      "    <ArcanaSettingsEditableField",
      "      label=\"Unit name\"",
      "      caption=\"Shown on receipts and invoices.\"",
      "      type=\"text\"",
      "      edit-label=\"Change\"",
      "      v-model=\"name\"",
      "    />",
      "",
      "    <ArcanaSettingsEditableField",
      "      label=\"First-purchase discount\"",
      "      caption=\"Unit amount applied.\"",
      "      type=\"currency\"",
      "      edit-label=\"Change\"",
      "      v-model=\"discount\"",
      "      @save=\"autoSave\"",
      "    />",
      "",
      "    <!-- type=\"select\" renders the options inside the edit modal -->",
      "    <ArcanaSettingsEditableField",
      "      label=\"Plan\"",
      "      caption=\"Defines the available limits.\"",
      "      type=\"select\"",
      "      edit-label=\"Change\"",
      "      :options=\"planOptions\"",
      "      v-model=\"plan\"",
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
      "  <ArcanaNotice variant=\"info\" title=\"How it works\">Changes apply to the next cycle.</ArcanaNotice>",
      "  <ArcanaNotice variant=\"blue\" title=\"New\">Bulk export is now available.</ArcanaNotice>",
      "  <ArcanaNotice variant=\"success\" title=\"Activated\">Your subscription is up to date.</ArcanaNotice>",
      "  <ArcanaNotice variant=\"warning\" title=\"Manual payment\">",
      "    Bank transfer and invoice generate a new charge link each cycle.",
      "  </ArcanaNotice>",
      "  <ArcanaNotice variant=\"pending\" title=\"Waiting for confirmation\">The bank may take up to 2 business days.</ArcanaNotice>",
      "",
      "  <!-- dismissible adds the X and emits `dismiss` (you own the visibility) -->",
      "  <ArcanaNotice variant=\"destructive\" title=\"Failed\" dismissible @dismiss=\"hide\">Try again.</ArcanaNotice>",
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
      { name: "size", type: "sm | md | lg | xl | number", default: "md", description: "Modal width preset or px number." },
      { name: "cancelColor", type: "string", default: "'white'", description: "Colour forwarded to the Cancel button; e.g. \"danger-700\" for a destructive cancel." },
      { name: "saveColor", type: "string", default: "'primary-700'", description: "Colour forwarded to the Save button; e.g. \"success-700\" for a green confirm." },
      { name: "cancelClass", type: "string", default: "''", description: "Extra class forwarded to the Cancel button." },
      { name: "saveClass", type: "string", default: "''", description: "Extra class forwarded to the Save button." }
    ],
    events: [
      "save — emitted on Save (no auto-close; the caller validates then calls hide())",
      "Methods (via ref): show(), hide()",
      "Slots: default — the field input(s)"
    ],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ref } from 'vue'",
      "import { ArcanaEditFieldDialog, ArcanaInput, ArcanaButton } from '@arcanalabs/ui-components/vue'",
      "",
      "const modal = ref()",
      "const name = ref('Arcana Labs HQ')",
      "",
      "// `save` does not auto-close: validate first, then hide().",
      "function saveName() { /* …persist */ modal.value.hide() }",
      "</script>",
      "",
      "<template>",
      "  <ArcanaButton @click=\"modal.show()\">Change name</ArcanaButton>",
      "",
      "  <ArcanaEditFieldDialog",
      "    ref=\"modal\"",
      "    title=\"Change name\"",
      "    description=\"This name shows up on receipts and invoices.\"",
      "    @save=\"saveName\"",
      "  >",
      "    <ArcanaInput v-model=\"name\" placeholder=\"Unit name\" />",
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
      "import { ArcanaRequiredFieldsDialog, ArcanaButton } from '@arcanalabs/ui-components/vue'",
      "",
      "const dialog = ref()",
      "const missing = computed(() => REQUIRED.filter(f => !f.check(form)))",
      "function validate() { if (missing.value.length) dialog.value.show() }",
      "</script>",
      "",
      "<template>",
      "  <ArcanaButton @click=\"validate\">Validate form</ArcanaButton>",
      "",
      "  <ArcanaRequiredFieldsDialog ref=\"dialog\" :fields=\"missing\" description=\"…before creating the customer.\" />",
      "</template>"
    ].join("\n")
  },

  onboardingPanel: {
    demo: ActionPanelDemo,
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
      "import { ArcanaActionPanel } from '@arcanalabs/ui-components/vue'",
      "</script>",
      "",
      "<template>",
      "  <ArcanaActionPanel",
      "    icon=\"fa-solid fa-folder-open\"",
      "    title=\"No projects here yet\"",
      "    description=\"Create your first project to start organizing your work.\"",
      "    action-label=\"Create project\"",
      "    secondary-action-label=\"See examples\"",
      "    secondary-action-icon=\"fa-solid fa-circle-info\"",
      "    sub-hint=\"You can invite your team later.\"",
      "    sub-hint-icon=\"fa-solid fa-users\"",
      "    @action=\"openCreate\"",
      "    @secondary-action=\"openExamples\"",
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
      "import { ArcanaLoadingOverlay, ArcanaButton } from '@arcanalabs/ui-components/vue'",
      "",
      "const saving = ref(false)",
      "",
      "async function save() {",
      "  saving.value = true",
      "  try { await api.save() } finally { saving.value = false }",
      "}",
      "</script>",
      "",
      "<template>",
      "  <!-- The overlay covers the nearest positioned ancestor -->",
      "  <div style=\"position: relative\">",
      "    <!-- card content -->",
      "    <ArcanaLoadingOverlay :visible=\"saving\" text=\"Saving…\" />",
      "  </div>",
      "",
      "  <ArcanaButton :disabled=\"saving\" @click=\"save\">Save</ArcanaButton>",
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
      "  <!-- Avatar + two text lines -->",
      "  <div style=\"display: flex; align-items: center; gap: 12px\">",
      "    <ArcanaSkeleton width=\"40px\" height=\"40px\" rounded=\"full\" />",
      "    <div style=\"flex: 1\">",
      "      <ArcanaSkeleton width=\"70%\" height=\"12px\" />",
      "      <ArcanaSkeleton width=\"45%\" height=\"10px\" />",
      "    </div>",
      "  </div>",
      "",
      "  <!-- Content block -->",
      "  <ArcanaSkeleton height=\"80px\" rounded=\"lg\" />",
      "",
      "  <!-- Action buttons -->",
      "  <ArcanaSkeleton width=\"84px\" height=\"28px\" rounded=\"md\" />",
      "  <ArcanaSkeleton width=\"84px\" height=\"28px\" rounded=\"md\" />",
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
      { name: "offIcon / onIcon", type: "string", default: "''", description: "FontAwesome class rendered before each side's text. Pass empty labels for an icon-only toggle (then set ariaLabel)." },
      { name: "offIconColor / onIconColor", type: "string (CSS color)", default: "''", description: "Inline colour for the respective icon — kept even on the active side." },
      { name: "disabled", type: "boolean", default: "false", description: "Disables the control." },
      { name: "compact", type: "boolean", default: "false", description: "Shorter height/font for inline use in dense forms." },
      { name: "squared", type: "boolean", default: "false", description: "Moderate corner radius instead of the full pill." },
      { name: "activeColor", type: "string (CSS color)", default: "'#18181b'", description: "Fill colour of the sliding indicator." },
      { name: "radio", type: "boolean", default: "false", description: "Shows a radio circle on each side, filled on the active one." },
      { name: "ariaLabel", type: "string", default: "auto", description: "Accessible name; falls back to 'off ou on'." },
      { name: "offIcon", type: "string", default: "''", description: "Font Awesome class of the left option icon, rendered before its label." },
      { name: "onIcon", type: "string", default: "''", description: "Font Awesome class of the right option icon." },
      { name: "offIconColor", type: "string", default: "''", description: "Inline colour of offIcon; wins over the inherited CSS, including while active." },
      { name: "onIconColor", type: "string", default: "''", description: "Inline colour of onIcon; same semantics as offIconColor." }
    ],
    events: ["update:modelValue(value) — v-model update", "change(value) — on toggle", "Slots: #off-label, #on-label"],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ref } from 'vue'",
      "import { ArcanaSwitchSegmented } from '@arcanalabs/ui-components/vue'",
      "",
      "const yearly = ref(false)",
      "const env = ref(true)",
      "const theme = ref(false)",
      "const listMode = ref(true)",
      "</script>",
      "",
      "<template>",
      "  <ArcanaSwitchSegmented v-model=\"yearly\" off-label=\"Monthly\" on-label=\"Annual · −20%\" />",
      "",
      "  <!-- Dense variant: shorter height and moderate corner radius -->",
      "  <ArcanaSwitchSegmented v-model=\"env\" off-label=\"Sandbox\" on-label=\"Production\" compact squared />",
      "",
      "  <!-- With icons: `off-icon-color`/`on-icon-color` survive on the active side too -->",
      "  <ArcanaSwitchSegmented",
      "    v-model=\"theme\"",
      "    off-label=\"Light\"",
      "    on-label=\"Dark\"",
      "    off-icon=\"fa-solid fa-sun\"",
      "    on-icon=\"fa-solid fa-moon\"",
      "    off-icon-color=\"#f59e0b\"",
      "    on-icon-color=\"#6366f1\"",
      "  />",
      "",
      "  <!-- Icon-only: empty labels, so give it an `aria-label` (the icons are decorative) -->",
      "  <ArcanaSwitchSegmented",
      "    v-model=\"listMode\"",
      "    off-label=\"\"",
      "    on-label=\"\"",
      "    off-icon=\"fa-solid fa-list\"",
      "    on-icon=\"fa-solid fa-table-cells-large\"",
      "    aria-label=\"View mode\"",
      "  />",
      "</template>"
    ].join("\n")
  },

  /* ── Batch 4 ── */

  rate: {
    demo: RateDemo,
    props: [
      { name: "modelValue", type: "number", default: "0", description: "Current rating (v-model), clamped to 0…max." },
      { name: "max", type: "number", default: "5", description: "How many stars are rendered." },
      { name: "disabled", type: "boolean", default: "false", description: "Turns interaction off and dims the stars (aria-disabled)." },
      { name: "readonly", type: "boolean", default: "false", description: "Turns interaction off but keeps full contrast — the mode for showing an average." },
      { name: "allowHalf", type: "boolean", default: "false", description: "Half stars: the left half of a star means n − 0.5, and the keyboard step becomes 0.5." },
      { name: "showText", type: "boolean", default: "false", description: "Shows the label of the current rating (texts[ceil(value) − 1]); wins over showScore." },
      { name: "texts", type: "string[]", default: "[]", description: "Label per rating — texts[0] is rating 1, texts[max − 1] is rating max." },
      { name: "showScore", type: "boolean", default: "false", description: "Shows the numeric rating next to the stars." },
      { name: "size", type: "sm | md | lg", default: "md", description: "Star size, gap and font size." },
      { name: "color", type: "string (CSS colour)", default: "''", description: "Filled-star colour; defaults to the --arcana-warning-solid token." },
      { name: "voidColor", type: "string (CSS colour)", default: "''", description: "Empty-star colour; defaults to step 6 of the neutral scale." },
      { name: "ariaLabel", type: "string", default: "''", description: "Accessible name of the radiogroup." }
    ],
    events: [
      "update:modelValue(value: number) — v-model update",
      "change(value: number) — same payload, on every rating change"
    ],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ref } from 'vue'",
      "import { ArcanaRate } from '@arcanalabs/ui-components/vue'",
      "",
      "const rating = ref(3)",
      "const half = ref(3.5)",
      "const textual = ref(4)",
      "",
      "const texts = ['Terrible', 'Poor', 'Average', 'Good', 'Excellent']",
      "</script>",
      "",
      "<template>",
      "  <!-- Basic — interactive -->",
      "  <ArcanaRate v-model=\"rating\" aria-label=\"Your rating\" />",
      "  <p>Your rating: {{ rating }}</p>",
      "",
      "  <!-- Half stars + numeric score -->",
      "  <ArcanaRate v-model=\"half\" allow-half show-score />",
      "",
      "  <!-- Descriptive text instead of the score -->",
      "  <ArcanaRate v-model=\"textual\" show-text :texts=\"texts\" />",
      "",
      "  <!-- Read-only — showing an average -->",
      "  <ArcanaRate :model-value=\"4.3\" readonly show-score />",
      "  <p>Average of 128 reviews</p>",
      "",
      "  <!-- Sizes -->",
      "  <ArcanaRate :model-value=\"4\" size=\"sm\" readonly />",
      "  <ArcanaRate :model-value=\"4\" size=\"md\" readonly />",
      "  <ArcanaRate :model-value=\"4\" size=\"lg\" readonly />",
      "",
      "  <!-- Custom colours and disabled -->",
      "  <ArcanaRate :model-value=\"4\" readonly color=\"var(--arcana-warning-solid)\" />",
      "  <ArcanaRate :model-value=\"3\" readonly color=\"#8b5cf6\" void-color=\"#e4e4e7\" />",
      "  <ArcanaRate :model-value=\"2\" disabled />",
      "</template>"
    ].join("\n")
  },

  avatar: {
    demo: AvatarDemo,
    props: [
      { name: "src", type: "string", default: "''", description: "Image URL. A load error drops it from the cascade at runtime." },
      { name: "alt", type: "string", default: "''", description: "Alt text of the native <img>." },
      { name: "initials", type: "string", default: "''", description: "Short text fallback (CSS already uppercases it)." },
      { name: "icon", type: "string", default: "''", description: "Icon-class fallback (e.g. fa-solid fa-user). Without initials/icon an inline SVG silhouette is used." },
      { name: "size", type: "xs | sm | md | lg | xl | number (px)", default: "md", description: "Named step (md = 40px) or an exact pixel value; font, radius and icon derive from it." },
      { name: "shape", type: "circle | square", default: "circle", description: "Outline of the avatar." },
      { name: "color", type: "string (CSS colour)", default: "''", description: "Background of the fallback; defaults to the --arcana-solid accent token." }
    ],
    events: ["error(ev: Event) — the image failed to load; the component falls through to the next fallback step"],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ArcanaAvatar } from '@arcanalabs/ui-components/vue'",
      "</script>",
      "",
      "<template>",
      "  <!-- Fallback cascade — image, initials, icon, silhouette -->",
      "  <ArcanaAvatar src=\"https://i.pravatar.cc/120?img=12\" alt=\"Team member portrait\" />",
      "  <ArcanaAvatar initials=\"AM\" />",
      "  <ArcanaAvatar icon=\"fa-solid fa-user-tie\" />",
      "  <ArcanaAvatar />",
      "  <p>A broken image falls back to the next step, automatically.</p>",
      "",
      "  <!-- Shapes -->",
      "  <ArcanaAvatar src=\"https://i.pravatar.cc/120?img=32\" alt=\"Team member portrait\" shape=\"circle\" />",
      "  <ArcanaAvatar src=\"https://i.pravatar.cc/120?img=45\" alt=\"Team member portrait\" shape=\"square\" />",
      "",
      "  <!-- Sizes — named steps and an exact pixel value -->",
      "  <ArcanaAvatar initials=\"XS\" size=\"xs\" />",
      "  <ArcanaAvatar initials=\"SM\" size=\"sm\" />",
      "  <ArcanaAvatar initials=\"MD\" size=\"md\" />",
      "  <ArcanaAvatar initials=\"LG\" size=\"lg\" />",
      "  <ArcanaAvatar initials=\"XL\" size=\"xl\" />",
      "  <ArcanaAvatar initials=\"64\" :size=\"64\" />",
      "",
      "  <!-- Custom background colour -->",
      "  <ArcanaAvatar initials=\"AM\" color=\"#6366f1\" />",
      "  <ArcanaAvatar initials=\"BR\" color=\"#10b981\" />",
      "  <ArcanaAvatar icon=\"fa-solid fa-building\" color=\"#f59e0b\" />",
      "</template>"
    ].join("\n")
  },

  avatarGroup: {
    demo: AvatarGroupDemo,
    props: [
      { name: "avatars", type: "Array<{ src?, alt?, initials?, icon?, color? }>", default: "[]", description: "Data-driven list; only these entries are counted (and sliced) by max." },
      { name: "max", type: "number", default: "0", description: "Max entries of `avatars` to render; the rest collapse into a +N bubble. 0 = no limit." },
      { name: "overflowCount", type: "number", default: "0", description: "Manual +N, for the composition mode (the group never slices slot content). Adds to the computed overflow." },
      { name: "size", type: "xs | sm | md | lg | xl | number (px)", default: "undefined", description: "Propagates to every child, slotted ones included. Omitted: each avatar keeps its own." },
      { name: "shape", type: "circle | square", default: "undefined", description: "Normalises the shape of every child. Omitted: each avatar keeps its own." },
      { name: "overlap", type: "number (px)", default: "30% of the size", description: "How much each avatar covers the previous one." },
      { name: "spacing", type: "number (px)", default: "undefined", description: "Positive gap between avatars; when set it wins over overlap (the stack stops overlapping)." },
      { name: "ariaLabel", type: "string", default: "''", description: "Accessible name of the role=\"group\"." }
    ],
    events: ["Slots: default — <ArcanaAvatar> children, rendered after the data-driven ones"],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ArcanaAvatar, ArcanaAvatarGroup } from '@arcanalabs/ui-components/vue'",
      "",
      "const team = [",
      "  { initials: 'AM', alt: 'Ana Moreira', color: '#6366f1' },",
      "  { initials: 'BR', alt: 'Bruno Reis', color: '#10b981' },",
      "  { initials: 'CS', alt: 'Carla Silva', color: '#f59e0b' },",
      "  { initials: 'DL', alt: 'Diego Lopes', color: '#ef4444' },",
      "  { initials: 'EM', alt: 'Elena Marques', color: '#8b5cf6' },",
      "]",
      "</script>",
      "",
      "<template>",
      "  <!-- Data-driven with an overflow bubble -->",
      "  <ArcanaAvatarGroup :avatars=\"team\" :max=\"3\" aria-label=\"Project team\" />",
      "",
      "  <!-- Sizes and shape -->",
      "  <ArcanaAvatarGroup :avatars=\"team\" :max=\"4\" size=\"sm\" />",
      "  <ArcanaAvatarGroup :avatars=\"team\" :max=\"4\" size=\"lg\" shape=\"square\" />",
      "",
      "  <!-- Spacing instead of overlap -->",
      "  <ArcanaAvatarGroup :avatars=\"team\" :max=\"4\" />",
      "  <ArcanaAvatarGroup :avatars=\"team\" :max=\"4\" :spacing=\"4\" />",
      "",
      "  <!-- Composition — children instead of the array -->",
      "  <ArcanaAvatarGroup :overflow-count=\"7\" size=\"md\">",
      "    <ArcanaAvatar src=\"https://i.pravatar.cc/120?img=12\" alt=\"Team member portrait\" />",
      "    <ArcanaAvatar initials=\"BR\" color=\"#10b981\" />",
      "    <ArcanaAvatar icon=\"fa-solid fa-user-tie\" color=\"#0ea5e9\" />",
      "  </ArcanaAvatarGroup>",
      "</template>"
    ].join("\n")
  },

  statistic: {
    demo: StatisticDemo,
    props: [
      { name: "value", type: "number | string | null", default: "null", description: "The number on display. A string passes through untouched (escape hatch for pre-formatted values)." },
      { name: "title", type: "string", default: "''", description: "Label above the value (or the #title slot)." },
      { name: "label", type: "string", default: "''", description: "Alias of title; title wins when both are set." },
      { name: "precision", type: "number", default: "undefined", description: "Fixed decimal places. Without it the number keeps its own." },
      { name: "groupSeparator", type: "string", default: "','", description: "Thousands separator; '' turns grouping off." },
      { name: "decimalSeparator", type: "string", default: "'.'", description: "Decimal separator." },
      { name: "locale", type: "string", default: "''", description: "Switches formatting to Intl.NumberFormat(locale); the manual separators are then ignored. An invalid tag falls back to the manual path." },
      { name: "formatter", type: "(value) => string", default: "undefined", description: "Full control over the rendered text; takes precedence over everything else." },
      { name: "prefix / suffix", type: "string", default: "''", description: "Text before/after the value (or the slots of the same name)." },
      { name: "tone", type: "neutral | success | danger | warning | info", default: "neutral", description: "Colours value + icon with the state tokens." },
      { name: "valueColor", type: "string (CSS colour)", default: "''", description: "Arbitrary colour for the value; wins over tone." },
      { name: "size", type: "sm | md | lg | xl", default: "md", description: "Value/title type scale." },
      { name: "icon", type: "string", default: "''", description: "Icon class rendered before the prefix (e.g. fa-solid fa-arrow-trend-up)." },
      { name: "prefix", type: "string", default: "''", description: "Text rendered before the value. The #prefix slot takes precedence over it." },
      { name: "suffix", type: "string", default: "''", description: "Text rendered after the value. The #suffix slot takes precedence over it." }
    ],
    events: ["Slots: #title, #prefix, #suffix — each one overrides the prop of the same name"],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ArcanaStatistic } from '@arcanalabs/ui-components/vue'",
      "</script>",
      "",
      "<template>",
      "  <!-- Basic -->",
      "  <ArcanaStatistic :value=\"1284\" title=\"Active users\" />",
      "",
      "  <!-- Precision and separators -->",
      "  <ArcanaStatistic :value=\"1234567.891\" :precision=\"2\" group-separator=\",\" decimal-separator=\".\" title=\"Monthly revenue\" />",
      "  <ArcanaStatistic :value=\"1234567.891\" :precision=\"2\" group-separator=\".\" decimal-separator=\",\" title=\"Monthly revenue\" />",
      "  <p>Same number, pt-BR separators</p>",
      "",
      "  <!-- Prefix, suffix and icon -->",
      "  <ArcanaStatistic",
      "    :value=\"48250.75\"",
      "    :precision=\"2\"",
      "    prefix=\"$\"",
      "    icon=\"fa-solid fa-arrow-trend-up\"",
      "    title=\"Monthly revenue\"",
      "    tone=\"success\"",
      "  />",
      "  <ArcanaStatistic :value=\"3.8\" :precision=\"1\" suffix=\"%\" title=\"Conversion rate\" />",
      "  <!-- The same three spots are also slots, for rich content -->",
      "  <ArcanaStatistic :value=\"99.98\" :precision=\"2\" tone=\"success\">",
      "    <template #title>Uptime</template>",
      "    <template #suffix><span style=\"font-size: .6em\">%</span></template>",
      "  </ArcanaStatistic>",
      "",
      "  <!-- Tones -->",
      "  <ArcanaStatistic :value=\"1284\" title=\"Orders\" tone=\"neutral\" />",
      "  <ArcanaStatistic :value=\"892\" title=\"Active users\" tone=\"success\" />",
      "  <ArcanaStatistic :value=\"2.4\" :precision=\"1\" suffix=\"%\" title=\"Churn\" tone=\"danger\" />",
      "  <ArcanaStatistic :value=\"17\" title=\"Pending reviews\" tone=\"warning\" />",
      "  <ArcanaStatistic :value=\"42\" title=\"Open tickets\" tone=\"info\" />",
      "",
      "  <!-- Sizes -->",
      "  <ArcanaStatistic :value=\"1284\" title=\"Orders\" size=\"sm\" />",
      "  <ArcanaStatistic :value=\"1284\" title=\"Orders\" size=\"md\" />",
      "  <ArcanaStatistic :value=\"1284\" title=\"Orders\" size=\"lg\" />",
      "  <ArcanaStatistic :value=\"1284\" title=\"Orders\" size=\"xl\" />",
      "</template>"
    ].join("\n")
  },

  countdown: {
    demo: CountdownDemo,
    props: [
      { name: "value", type: "number | string | Date | null", default: "null", description: "Target instant: epoch in ms, a Date or an ISO string. An invalid/empty value renders zero instead of NaN." },
      { name: "format", type: "string", default: "'HH:mm:ss'", description: "Tokens DD, D, HH, H, mm, m, ss, s, SSS, SS, S plus literals in brackets. The largest unit present absorbs the excess (50h render as 50:00:00)." },
      { name: "prefix / suffix", type: "string", default: "''", description: "Text before/after the value (or the slots of the same name)." },
      { name: "title", type: "string", default: "''", description: "Label above the value (or the #title slot)." },
      { name: "tone", type: "neutral | success | danger | warning | info", default: "neutral", description: "Colours the value with the state tokens." },
      { name: "valueColor", type: "string (CSS colour)", default: "''", description: "Arbitrary colour for the value; wins over tone." },
      { name: "size", type: "sm | md | lg | xl", default: "md", description: "Value/title type scale." },
      { name: "paused", type: "boolean", default: "false", description: "Freezes the countdown. Reactive: setting it back to false resumes." },
      { name: "interval", type: "number (ms)", default: "auto", description: "Tick period. Automatic default: 50ms when the format shows milliseconds, 1000ms otherwise." },
      { name: "prefix", type: "string", default: "''", description: "Text rendered before the value. The #prefix slot takes precedence over it." },
      { name: "suffix", type: "string", default: "''", description: "Text rendered after the value. The #suffix slot takes precedence over it." }
    ],
    events: [
      "change(remaining: number) — on every tick, with the time left in ms",
      "finish() — once, when it reaches zero",
      "Slots: #title, #prefix, #suffix",
      "Methods (via ref): pause(), resume(), restart()"
    ],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ref } from 'vue'",
      "import { ArcanaButton, ArcanaCountdown } from '@arcanalabs/ui-components/vue'",
      "",
      "// The target is an instant, not a duration.",
      "const now = Date.now()",
      "const deadline = now + 2 * 60 * 60 * 1000",
      "const longDeadline = now + 3 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000",
      "const shortDeadline = now + 15 * 60 * 1000",
      "",
      "const isPaused = ref(true)",
      "",
      "function onFinish() {",
      "  // …the deadline passed",
      "}",
      "</script>",
      "",
      "<template>",
      "  <!-- Basic — time left until a deadline -->",
      "  <ArcanaCountdown :value=\"deadline\" @finish=\"onFinish\" />",
      "  <p>Fires the finish event when it reaches zero.</p>",
      "",
      "  <!-- Custom format -->",
      "  <ArcanaCountdown :value=\"longDeadline\" format=\"D[d] HH:mm:ss\" />",
      "  <ArcanaCountdown :value=\"shortDeadline\" format=\"mm:ss\" />",
      "",
      "  <!-- Title, prefix and suffix -->",
      "  <ArcanaCountdown :value=\"deadline\" title=\"Flash sale ends in\">",
      "    <template #prefix><i class=\"fa-solid fa-hourglass-half\" /></template>",
      "    <template #suffix><i class=\"fa-solid fa-bolt\" /></template>",
      "  </ArcanaCountdown>",
      "",
      "  <!-- Tones and sizes -->",
      "  <ArcanaCountdown :value=\"shortDeadline\" title=\"Session expires in\" tone=\"danger\" size=\"lg\" />",
      "  <ArcanaCountdown :value=\"longDeadline\" title=\"Maintenance window\" tone=\"success\" size=\"sm\" />",
      "",
      "  <!-- Paused -->",
      "  <ArcanaCountdown :value=\"deadline\" :paused=\"isPaused\" />",
      "  <ArcanaButton variant=\"outline\" @click=\"isPaused = !isPaused\">Pause / resume</ArcanaButton>",
      "</template>"
    ].join("\n")
  },

  progress: {
    demo: ProgressDemo,
    props: [
      { name: "value", type: "number | null", default: "null", description: "0–max. null/undefined means indeterminate (continuous animation, no aria-valuenow). Out-of-range values are clamped." },
      { name: "max", type: "number", default: "100", description: "Top of the scale; max <= 0 falls back to the default." },
      { name: "size", type: "sm | md | lg", default: "md", description: "Track height." },
      { name: "variant", type: "solid | soft", default: "solid", description: "solid fills with step 9 of the tone; soft uses step 8 over a tonal track." },
      { name: "tone", type: "accent | success | danger | warning | info", default: "accent", description: "Colour of the indicator." },
      { name: "showValue", type: "boolean", default: "false", description: "Shows the NN% label beside the bar (the #value slot overrides it)." },
      { name: "indeterminateText", type: "string", default: "'…'", description: "Label used while indeterminate." },
      { name: "radius", type: "none | sm | md | lg | full", default: "full", description: "Corner radius of track and indicator." },
      { name: "ariaLabel", type: "string", default: "''", description: "Accessible name of the progressbar — recommended when there is no visible label." }
    ],
    events: ["Slots: #value — replaces the label rendered when showValue is on"],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ArcanaProgress } from '@arcanalabs/ui-components/vue'",
      "</script>",
      "",
      "<template>",
      "  <!-- Determinate -->",
      "  <ArcanaProgress :value=\"25\" show-value aria-label=\"Uploading\" />",
      "  <ArcanaProgress :value=\"60\" show-value aria-label=\"Storage used\" />",
      "  <ArcanaProgress :value=\"100\" show-value tone=\"success\" aria-label=\"Complete\" />",
      "",
      "  <!-- Indeterminate — value is null -->",
      "  <ArcanaProgress :value=\"null\" show-value aria-label=\"Uploading\" />",
      "  <p>No known total — the bar loops.</p>",
      "",
      "  <!-- Tones -->",
      "  <ArcanaProgress :value=\"70\" tone=\"accent\" />",
      "  <ArcanaProgress :value=\"70\" tone=\"success\" />",
      "  <ArcanaProgress :value=\"70\" tone=\"danger\" />",
      "  <ArcanaProgress :value=\"70\" tone=\"warning\" />",
      "  <ArcanaProgress :value=\"70\" tone=\"info\" />",
      "",
      "  <!-- Variants and radius -->",
      "  <ArcanaProgress :value=\"45\" variant=\"solid\" />",
      "  <ArcanaProgress :value=\"45\" variant=\"soft\" />",
      "  <ArcanaProgress :value=\"45\" radius=\"none\" />",
      "  <ArcanaProgress :value=\"45\" radius=\"full\" />",
      "",
      "  <!-- Sizes -->",
      "  <ArcanaProgress :value=\"55\" size=\"sm\" />",
      "  <ArcanaProgress :value=\"55\" size=\"md\" />",
      "  <ArcanaProgress :value=\"55\" size=\"lg\" />",
      "",
      "  <!-- Custom label through the value slot -->",
      "  <ArcanaProgress :value=\"3\" :max=\"5\" show-value>",
      "    <template #value>3 of 5 steps</template>",
      "  </ArcanaProgress>",
      "</template>"
    ].join("\n")
  },

  aspectRatio: {
    demo: AspectRatioDemo,
    props: [
      { name: "ratio", type: "number", default: "16 / 9", description: "Width ÷ height. Non-finite values or <= 0 fall back to the default. No JavaScript involved — it becomes the CSS aspect-ratio property." },
      { name: "--arcana-aspect-ratio-radius", type: "CSS custom property", default: "0", description: "Corner radius of the box (clips the media)." },
      { name: "--arcana-aspect-ratio-background", type: "CSS custom property", default: "transparent", description: "Background shown while the media loads." },
      { name: "--arcana-aspect-ratio-fit", type: "CSS custom property", default: "cover", description: "object-fit applied to direct img/video/iframe/canvas/svg children." }
    ],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ArcanaAspectRatio } from '@arcanalabs/ui-components/vue'",
      "</script>",
      "",
      "<template>",
      "  <!-- Default — 16 / 9 -->",
      "  <ArcanaAspectRatio style=\"--arcana-aspect-ratio-radius: 10px\">",
      "    <img src=\"https://picsum.photos/seed/arcana1/800/600\" alt=\"Landscape photograph\" />",
      "  </ArcanaAspectRatio>",
      "",
      "  <!-- Square and portrait -->",
      "  <ArcanaAspectRatio :ratio=\"1\">",
      "    <img src=\"https://picsum.photos/seed/arcana2/800/800\" alt=\"Landscape photograph\" />",
      "  </ArcanaAspectRatio>",
      "  <ArcanaAspectRatio :ratio=\"3 / 4\">",
      "    <img src=\"https://picsum.photos/seed/arcana3/600/800\" alt=\"Landscape photograph\" />",
      "  </ArcanaAspectRatio>",
      "",
      "  <!-- Classic 4 / 3 -->",
      "  <ArcanaAspectRatio :ratio=\"4 / 3\">",
      "    <img src=\"https://picsum.photos/seed/arcana4/800/600\" alt=\"Landscape photograph\" />",
      "  </ArcanaAspectRatio>",
      "",
      "  <!-- Any embedded content — here a coloured placeholder -->",
      "  <ArcanaAspectRatio :ratio=\"16 / 9\">",
      "    <div class=\"placeholder\">Works with iframes, maps and video too</div>",
      "  </ArcanaAspectRatio>",
      "</template>"
    ].join("\n")
  },

  scrollArea: {
    demo: ScrollAreaDemo,
    props: [
      { name: "orientation", type: "vertical | horizontal | both", default: "vertical", description: "Which axes may scroll; the other one is overflow: hidden." },
      { name: "height", type: "number (px) | string (CSS) | null", default: "null", description: "Fixed viewport height. Without height/maxHeight the height comes from the context." },
      { name: "maxHeight", type: "number (px) | string (CSS) | null", default: "null", description: "Maximum viewport height." },
      { name: "scrollbarSize", type: "number (px)", default: "10", description: "Scrollbar thickness (WebKit); on Firefox the thickness is 'thin'." },
      { name: "type", type: "auto | always | hover", default: "auto", description: "auto: native behaviour; always: overflow scroll with a reserved gutter; hover: the thumb fades in on hover/focus." },
      { name: "hideDelay", type: "number (ms)", default: "500", description: "Auto-hide delay of the thumb — only meaningful with type=\"hover\"." },
      { name: "tabbable", type: "boolean", default: "true", description: "Puts tabindex=\"0\" on the viewport so the region scrolls by keyboard even with no focusable content." }
    ],
    events: ["Methods (via ref): viewport() — the element that actually scrolls (for scrollTo/scrollTop)"],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ArcanaScrollArea } from '@arcanalabs/ui-components/vue'",
      "",
      "const items = Array.from({ length: 12 }, (_, i) => `Item ${i + 1}`)",
      "</script>",
      "",
      "<template>",
      "  <!-- Vertical with a max height -->",
      "  <ArcanaScrollArea :max-height=\"180\">",
      "    <p v-for=\"item in items\" :key=\"item\">{{ item }}</p>",
      "  </ArcanaScrollArea>",
      "",
      "  <!-- Horizontal -->",
      "  <ArcanaScrollArea orientation=\"horizontal\">",
      "    <div class=\"row\">",
      "      <div v-for=\"item in items\" :key=\"item\" class=\"card\">{{ item }}</div>",
      "    </div>",
      "  </ArcanaScrollArea>",
      "",
      "  <!-- Both axes -->",
      "  <ArcanaScrollArea orientation=\"both\" :height=\"180\">",
      "    <div style=\"width: 760px\">",
      "      <p v-for=\"item in items\" :key=\"item\">{{ item }}</p>",
      "    </div>",
      "  </ArcanaScrollArea>",
      "",
      "  <!-- Always-visible vs auto-hiding scrollbars -->",
      "  <ArcanaScrollArea type=\"always\" :max-height=\"120\">",
      "    <p v-for=\"item in items\" :key=\"item\">{{ item }}</p>",
      "  </ArcanaScrollArea>",
      "  <ArcanaScrollArea type=\"hover\" :max-height=\"120\">",
      "    <p v-for=\"item in items\" :key=\"item\">{{ item }}</p>",
      "  </ArcanaScrollArea>",
      "</template>"
    ].join("\n")
  },

  hoverCard: {
    demo: HoverCardDemo,
    props: [
      { name: "openDelay", type: "number (ms)", default: "300", description: "Wait after mouseenter before opening; keyboard focus opens immediately." },
      { name: "closeDelay", type: "number (ms)", default: "150", description: "Grace period on leave — it is what lets the pointer travel from the trigger to the card." },
      { name: "side", type: "top | right | bottom | left", default: "bottom", description: "Preferred side; flips automatically when it does not fit." },
      { name: "align", type: "start | center | end", default: "center", description: "Alignment along the chosen side." },
      { name: "placement", type: "'{side}-{align}' (e.g. bottom-start)", default: "undefined", description: "Shorthand; when set it wins over side/align." },
      { name: "offset", type: "number (px)", default: "8", description: "Distance between trigger and card." },
      { name: "disabled", type: "boolean", default: "false", description: "Never opens (and closes it if open)." },
      { name: "panelClass", type: "string", default: "undefined", description: "Extra class on the teleported card — the way to theme a single instance, since it lives in <body>." }
    ],
    events: [
      "open-change(open: boolean) — on every transition",
      "Slots: #trigger (put a natively focusable element in it), default (the card content)"
    ],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ArcanaAvatar, ArcanaHoverCard } from '@arcanalabs/ui-components/vue'",
      "</script>",
      "",
      "<template>",
      "  <!-- Basic — a profile preview on a link -->",
      "  <ArcanaHoverCard>",
      "    <template #trigger><a href=\"/dana\">Dana Whitfield</a></template>",
      "",
      "    <ArcanaAvatar src=\"https://i.pravatar.cc/120?img=32\" alt=\"Profile picture\" size=\"lg\" />",
      "    <p class=\"arcana-hover-card__title\">Dana Whitfield</p>",
      "    <p class=\"arcana-hover-card__text\">@danaw</p>",
      "    <p class=\"arcana-hover-card__text\">Design systems lead. Writes about accessibility and colour.</p>",
      "    <p class=\"arcana-hover-card__text\"><strong>1.2k followers</strong></p>",
      "  </ArcanaHoverCard>",
      "",
      "  <!-- Sides -->",
      "  <ArcanaHoverCard side=\"top\"><template #trigger><a href=\"#\">top</a></template>…</ArcanaHoverCard>",
      "  <ArcanaHoverCard side=\"right\"><template #trigger><a href=\"#\">right</a></template>…</ArcanaHoverCard>",
      "  <ArcanaHoverCard side=\"bottom\"><template #trigger><a href=\"#\">bottom</a></template>…</ArcanaHoverCard>",
      "  <ArcanaHoverCard side=\"left\"><template #trigger><a href=\"#\">left</a></template>…</ArcanaHoverCard>",
      "",
      "  <!-- Alignment and offset -->",
      "  <ArcanaHoverCard side=\"bottom\" align=\"start\" :offset=\"16\">",
      "    <template #trigger><a href=\"/dana\">@danaw</a></template>",
      "    <p class=\"arcana-hover-card__title\">Dana Whitfield</p>",
      "  </ArcanaHoverCard>",
      "",
      "  <!-- Delays -->",
      "  <ArcanaHoverCard :open-delay=\"0\" :close-delay=\"0\">",
      "    <template #trigger><a href=\"#\">Instant</a></template>",
      "    <p class=\"arcana-hover-card__text\">Opens with no delay.</p>",
      "  </ArcanaHoverCard>",
      "  <ArcanaHoverCard :open-delay=\"600\">",
      "    <template #trigger><a href=\"#\">Slow (600 ms)</a></template>",
      "    <p class=\"arcana-hover-card__text\">Waits 600 ms before opening.</p>",
      "  </ArcanaHoverCard>",
      "",
      "  <!-- Disabled -->",
      "  <ArcanaHoverCard disabled>",
      "    <template #trigger><a href=\"#\">@danaw</a></template>",
      "    <p class=\"arcana-hover-card__text\">Disabled — nothing opens</p>",
      "  </ArcanaHoverCard>",
      "</template>"
    ].join("\n")
  },

  contextMenu: {
    demo: ContextMenuDemo,
    props: [
      { name: "items", type: "Array<{ label, icon?, suffix?, variant?, disabled?, divided?, closeOnClick? }>", default: "[]", description: "Data-driven mode — ignored when the default slot is used. variant is 'default' | 'danger' | 'success' | 'warning'; divided adds a separator above the item." },
      { name: "disabled", type: "boolean", default: "false", description: "Never opens — the browser's native menu shows instead." },
      { name: "panelClass", type: "string", default: "''", description: "Extra class on the teleported panel (theming a single portal)." },
      { name: "ariaLabel", type: "string", default: "''", description: "Accessible name of the role=\"menu\"." }
    ],
    events: [
      "open() — the menu opened at the pointer",
      "close() — the menu closed (outside click, Escape, scroll, resize, selection or another context menu opening)",
      "select(item, index) — a data-driven item was chosen",
      "Slots: #trigger (props: open, close), default (props: close)"
    ],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ref } from 'vue'",
      "import { ArcanaContextMenu, ArcanaContextMenuItem } from '@arcanalabs/ui-components/vue'",
      "",
      "const lastAction = ref<string | null>(null)",
      "",
      "const items = [",
      "  { label: 'Open', icon: 'fa-regular fa-folder-open' },",
      "  { label: 'Rename', icon: 'fa-solid fa-pen' },",
      "  { label: 'Duplicate', icon: 'fa-solid fa-clone', suffix: '⌘D' },",
      "  { label: 'Move to folder', icon: 'fa-solid fa-folder-tree', disabled: true },",
      "  { label: 'Share', icon: 'fa-solid fa-share-nodes', divided: true },",
      "  { label: 'Delete', icon: 'fa-solid fa-trash', variant: 'danger', divided: true },",
      "]",
      "",
      "function onSelect(item: { label: string }) {",
      "  lastAction.value = item.label",
      "}",
      "</script>",
      "",
      "<template>",
      "  <!-- Data-driven items — right-click the area -->",
      "  <ArcanaContextMenu :items=\"items\" aria-label=\"Right-click this area\">",
      "    <template #trigger><div class=\"drop-zone\">Right-click this area</div></template>",
      "  </ArcanaContextMenu>",
      "",
      "  <!-- Reacting to the selection -->",
      "  <ArcanaContextMenu :items=\"items\" @select=\"onSelect\">",
      "    <template #trigger><div class=\"drop-zone\">Right-click this area</div></template>",
      "  </ArcanaContextMenu>",
      "  <p>Last action: {{ lastAction ?? 'none yet' }}</p>",
      "",
      "  <!-- Composition — children instead of the array -->",
      "  <ArcanaContextMenu>",
      "    <template #trigger><div class=\"drop-zone\">Right-click this area</div></template>",
      "",
      "    <ArcanaContextMenuItem icon=\"fa-regular fa-folder-open\">Open</ArcanaContextMenuItem>",
      "    <ArcanaContextMenuItem icon=\"fa-solid fa-box-archive\">Archive</ArcanaContextMenuItem>",
      "    <ArcanaContextMenuItem icon=\"fa-solid fa-trash\" variant=\"danger\" divided>Delete</ArcanaContextMenuItem>",
      "  </ArcanaContextMenu>",
      "",
      "  <!-- Disabled — the native menu comes back -->",
      "  <ArcanaContextMenu :items=\"items\" disabled>",
      "    <template #trigger><div class=\"drop-zone\">Right-click this area</div></template>",
      "  </ArcanaContextMenu>",
      "  <p>Disabled — the browser menu shows instead</p>",
      "</template>"
    ].join("\n")
  },

  contextMenuItem: {
    demo: ContextMenuItemDemo,
    props: [
      { name: "icon", type: "string", default: "''", description: "Font Awesome class rendered before the label." },
      { name: "suffix", type: "string", default: "''", description: "Shortcut or affix shown right-aligned (e.g. \"⌘C\"). The #suffix slot takes precedence." },
      { name: "variant", type: "default | danger | success | warning", default: "'default'", description: "Semantic tone of the item; danger paints it in the destructive colour." },
      { name: "disabled", type: "boolean", default: "false", description: "Greys the item out and stops it from being selected or focused." },
      { name: "divided", type: "boolean", default: "false", description: "Draws a separator ABOVE this item, to group entries." },
      { name: "closeOnClick", type: "boolean", default: "true", description: "Closes the menu on selection; off, the menu stays open for repeated actions." }
    ],
    events: [
      "click — raw click on the item",
      "select — selection through mouse or keyboard; prefer this one",
      "Slots: default (label), #suffix (overrides the suffix prop)"
    ],
    vueSnippet: [
      "<script setup lang=\"ts\">",
      "import { ArcanaContextMenu, ArcanaContextMenuItem } from '@arcanalabs/ui-components/vue'",
      "",
      "const lastAction = ref<string | null>(null)",
      "</script>",
      "",
      "<template>",
      "  <!-- Composition — one <ArcanaContextMenuItem> per entry -->",
      "  <ArcanaContextMenu aria-label=\"Right-click this area\">",
      "    <template #trigger>",
      "      <div class=\"drop-zone\">Right-click this area</div>",
      "    </template>",
      "",
      "    <ArcanaContextMenuItem icon=\"fa-regular fa-folder-open\" @select=\"lastAction = 'Open'\">",
      "      Open",
      "    </ArcanaContextMenuItem>",
      "    <ArcanaContextMenuItem icon=\"fa-solid fa-clone\" suffix=\"⌘D\" @select=\"lastAction = 'Duplicate'\">",
      "      Duplicate",
      "    </ArcanaContextMenuItem>",
      "    <ArcanaContextMenuItem icon=\"fa-solid fa-folder-tree\" :disabled=\"true\">",
      "      Move to folder",
      "    </ArcanaContextMenuItem>",
      "",
      "    <!-- `divided` draws the separator ABOVE the item -->",
      "    <ArcanaContextMenuItem icon=\"fa-solid fa-trash\" variant=\"danger\" :divided=\"true\" @select=\"lastAction = 'Delete'\">",
      "      Delete",
      "    </ArcanaContextMenuItem>",
      "  </ArcanaContextMenu>",
      "",
      "  <p>Last action: <strong>{{ lastAction ?? 'none yet' }}</strong></p>",
      "</template>"
    ].join("\n")
  },
};
