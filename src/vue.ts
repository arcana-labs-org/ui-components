// @arcanalabs/ui-components — Vue 3 entry.
//
// Biblioteca de componentes shadcn-style (palette zinc) para Vue 3.
// Todos os componentes são SFCs autocontidos; os nomes mantêm a convenção
// `Shadcn*` original do ERP de onde foram extraídos.
//
// Nota: `ShadcnInputMask` e `ShadcnDatePicker` usam a diretiva `v-maska` (lib
// `maska`), que precisa ser registrada globalmente pelo app consumidor:
//     import Maska from "maska"; app.use(Maska)

// ── Componentes shadcn ──────────────────────────────────────────────────────
export { default as ShadcnAccordion } from "./vue/components/ShadcnAccordion.vue";
export { default as ShadcnAccordionItem } from "./vue/components/ShadcnAccordionItem.vue";
export { default as ShadcnBadge } from "./vue/components/ShadcnBadge.vue";
export { default as ShadcnButton } from "./vue/components/ShadcnButton.vue";
export { default as ShadcnCheckbox } from "./vue/components/ShadcnCheckbox.vue";
export { default as ShadcnDatePicker } from "./vue/components/ShadcnDatePicker.vue";
export { default as ShadcnDialog } from "./vue/components/ShadcnDialog.vue";
export { default as ShadcnDropdown } from "./vue/components/ShadcnDropdown.vue";
export { default as ShadcnDropdownItem } from "./vue/components/ShadcnDropdownItem.vue";
export { default as ShadcnEditFieldModal } from "./vue/components/ShadcnEditFieldModal.vue";
export { default as ShadcnInput } from "./vue/components/ShadcnInput.vue";
export { default as ShadcnInputBoolean } from "./vue/components/ShadcnInputBoolean.vue";
export { default as ShadcnInputMask } from "./vue/components/ShadcnInputMask.vue";
export { default as ShadcnLoadingOverlay } from "./vue/components/ShadcnLoadingOverlay.vue";
export { default as ShadcnNotice } from "./vue/components/ShadcnNotice.vue";
export { default as ShadcnNumberStepper } from "./vue/components/ShadcnNumberStepper.vue";
export { default as ShadcnOnboardingPanel } from "./vue/components/ShadcnOnboardingPanel.vue";
export { default as ShadcnRadioCardGroup } from "./vue/components/ShadcnRadioCardGroup.vue";
export { default as ShadcnRequiredFieldsDialog } from "./vue/components/ShadcnRequiredFieldsDialog.vue";
export { default as ShadcnSegmentedOptions } from "./vue/components/ShadcnSegmentedOptions.vue";
export { default as ShadcnSelect } from "./vue/components/ShadcnSelect.vue";
export { default as ShadcnSettingsEditableField } from "./vue/components/ShadcnSettingsEditableField.vue";
export { default as ShadcnSettingsList } from "./vue/components/ShadcnSettingsList.vue";
export { default as ShadcnSettingsListGroup } from "./vue/components/ShadcnSettingsListGroup.vue";
export { default as ShadcnSettingsListItem } from "./vue/components/ShadcnSettingsListItem.vue";
export { default as ShadcnSkeleton } from "./vue/components/ShadcnSkeleton.vue";
export { default as ShadcnSpecSheet } from "./vue/components/ShadcnSpecSheet.vue";
export { default as ShadcnSpecSheetField } from "./vue/components/ShadcnSpecSheetField.vue";
export { default as ShadcnSpecSheetSection } from "./vue/components/ShadcnSpecSheetSection.vue";
export { default as ShadcnSummaryTile } from "./vue/components/ShadcnSummaryTile.vue";
export { default as ShadcnSummaryTiles } from "./vue/components/ShadcnSummaryTiles.vue";
export { default as ShadcnSwitch } from "./vue/components/ShadcnSwitch.vue";
export { default as ShadcnSwitchCard } from "./vue/components/ShadcnSwitchCard.vue";
export { default as ShadcnSwitchRow } from "./vue/components/ShadcnSwitchRow.vue";
export { default as ShadcnSwitchSegmented } from "./vue/components/ShadcnSwitchSegmented.vue";
export { default as ShadcnTable } from "./vue/components/ShadcnTable.vue";
export { default as ShadcnTabs } from "./vue/components/ShadcnTabs.vue";
export { default as MultiSelectPopover } from "./vue/components/MultiSelectPopover.vue";
export { default as SparkGridEmptyState } from "./vue/components/SparkGridEmptyState.vue";

// ── Form helpers (extraídos junto; usados por alguns Shadcn* acima) ──────────
export { default as LabeledButton } from "./vue/components/LabeledButton.vue";
export { default as InputCurrency } from "./vue/components/InputCurrency.vue";

// ── Utilitários ─────────────────────────────────────────────────────────────
export { CurrencyFormatter } from "./core/currency";
export { DateFormatter } from "./core/date";
export { acquireZIndex, releaseZIndex } from "./vue/services/dialog-stack";
