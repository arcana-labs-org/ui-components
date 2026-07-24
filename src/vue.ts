// @arcanalabs/ui-components — Vue 3 entry.
//
// Biblioteca de componentes arcana-style (palette zinc) para Vue 3.
// Os SFCs NÃO carregam mais `<style scoped>`: todo o CSS vive num stylesheet
// compartilhado, agnóstico de framework (`./styles/components.scss`), por
// seletores de classe puros (sem `[data-v-*]`), pra que os ports React /
// Angular / Svelte reusem o MESMO visual.
//
// Nota: `ArcanaInputMask` e `ArcanaDatePicker` usam a diretiva `v-maska` (lib
// `maska`), que precisa ser registrada globalmente pelo app consumidor:
//     import Maska from "maska"; app.use(Maska)

// ── Estilos compartilhados ──────────────────────────────────────────────────
// Importado como side-effect pra que o build o embuta em `dist/ui-components.css`
// (exportado como `@arcanalabs/ui-components/styles.css`).
import "./styles/components.scss";

// ── Componentes shadcn ──────────────────────────────────────────────────────
export { default as ArcanaAccordion } from "./vue/components/ArcanaAccordion.vue";
export { default as ArcanaAccordionItem } from "./vue/components/ArcanaAccordionItem.vue";
export { default as ArcanaBadge } from "./vue/components/ArcanaBadge.vue";
export { default as ArcanaButton } from "./vue/components/ArcanaButton.vue";
export { default as ArcanaCheckbox } from "./vue/components/ArcanaCheckbox.vue";
export { default as ArcanaDatePicker } from "./vue/components/ArcanaDatePicker.vue";
export { default as ArcanaDialog } from "./vue/components/ArcanaDialog.vue";
export { default as ArcanaDropdown } from "./vue/components/ArcanaDropdown.vue";
export { default as ArcanaDropdownItem } from "./vue/components/ArcanaDropdownItem.vue";
export { default as ArcanaEditFieldModal } from "./vue/components/ArcanaEditFieldModal.vue";
export { default as ArcanaInput } from "./vue/components/ArcanaInput.vue";
export { default as ArcanaInputBoolean } from "./vue/components/ArcanaInputBoolean.vue";
export { default as ArcanaInputMask } from "./vue/components/ArcanaInputMask.vue";
export { default as ArcanaLoadingOverlay } from "./vue/components/ArcanaLoadingOverlay.vue";
export { default as ArcanaNotice } from "./vue/components/ArcanaNotice.vue";
export { default as ArcanaNumberStepper } from "./vue/components/ArcanaNumberStepper.vue";
export { default as ArcanaOnboardingPanel } from "./vue/components/ArcanaOnboardingPanel.vue";
export { default as ArcanaRadioCardGroup } from "./vue/components/ArcanaRadioCardGroup.vue";
export { default as ArcanaRequiredFieldsDialog } from "./vue/components/ArcanaRequiredFieldsDialog.vue";
export { default as ArcanaSegmentedOptions } from "./vue/components/ArcanaSegmentedOptions.vue";
export { default as ArcanaSelect } from "./vue/components/ArcanaSelect.vue";
export { default as ArcanaSettingsEditableField } from "./vue/components/ArcanaSettingsEditableField.vue";
export { default as ArcanaSettingsList } from "./vue/components/ArcanaSettingsList.vue";
export { default as ArcanaSettingsListGroup } from "./vue/components/ArcanaSettingsListGroup.vue";
export { default as ArcanaSettingsListItem } from "./vue/components/ArcanaSettingsListItem.vue";
export { default as ArcanaSkeleton } from "./vue/components/ArcanaSkeleton.vue";
export { default as ArcanaSpecSheet } from "./vue/components/ArcanaSpecSheet.vue";
export { default as ArcanaSpecSheetField } from "./vue/components/ArcanaSpecSheetField.vue";
export { default as ArcanaSpecSheetSection } from "./vue/components/ArcanaSpecSheetSection.vue";
export { default as ArcanaSummaryTile } from "./vue/components/ArcanaSummaryTile.vue";
export { default as ArcanaSummaryTilesGroup } from "./vue/components/ArcanaSummaryTilesGroup.vue";
export { default as ArcanaSwitch } from "./vue/components/ArcanaSwitch.vue";
export { default as ArcanaSwitchCard } from "./vue/components/ArcanaSwitchCard.vue";
export { default as ArcanaSwitchRow } from "./vue/components/ArcanaSwitchRow.vue";
export { default as ArcanaSwitchSegmented } from "./vue/components/ArcanaSwitchSegmented.vue";
export { default as ArcanaTable } from "./vue/components/ArcanaTable.vue";
export { default as ArcanaTabs } from "./vue/components/ArcanaTabs.vue";
export { default as ArcanaMultiSelectPopover } from "./vue/components/ArcanaMultiSelectPopover.vue";

// ── Form helpers (extraídos junto; usados por alguns Arcana* acima) ──────────
export { default as ArcanaInputCurrency } from "./vue/components/ArcanaInputCurrency.vue";

// ── Utilitários ─────────────────────────────────────────────────────────────
export { CurrencyFormatter } from "./core/currency";
export { DateFormatter } from "./core/date";
export { acquireZIndex, releaseZIndex } from "./vue/services/dialog-stack";
