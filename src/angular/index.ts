// @arcanalabs/ui-components — Angular barrel (lote 1).
//
// Ports Angular (standalone, attribute selectors `arcana*`) dos SFCs Vue de mesmo nome.
// Cada componente é o PRÓPRIO elemento semântico (host = `<button>`/`<span>`/`<div>`/…) e
// emite o MESMO markup e as MESMAS classes arcana do equivalente Vue/React, reusando o CSS
// compartilhado (`@arcanalabs/ui-components/styles.css`).
//
// v-model → `@Input() value` + `@Output() valueChange` (suporta `[(value)]`);
// `emit('x')` → `@Output() x`; slots → `<ng-content>` / `@Input` (string) / diretiva de template.

export { ArcanaButtonComponent } from "./arcana-button.component";
export type { ArcanaButtonVariant } from "./arcana-button.component";

export { ArcanaBadgeComponent } from "./arcana-badge.component";
export type { ArcanaBadgeVariant } from "./arcana-badge.component";

export { ArcanaInputComponent } from "./arcana-input.component";

export { ArcanaCheckboxComponent } from "./arcana-checkbox.component";

export { ArcanaSwitchComponent } from "./arcana-switch.component";

export { ArcanaSwitchRowComponent } from "./arcana-switch-row.component";

export { ArcanaSwitchCardComponent } from "./arcana-switch-card.component";

export { ArcanaSegmentedOptionsComponent } from "./arcana-segmented-options.component";
export type { SegmentedOption } from "./arcana-segmented-options.component";

export { ArcanaSkeletonComponent } from "./arcana-skeleton.component";
export type { SkeletonRounded } from "./arcana-skeleton.component";

export { ArcanaNoticeComponent } from "./arcana-notice.component";
export type { NoticeVariant } from "./arcana-notice.component";

export { ArcanaTabsComponent } from "./arcana-tabs.component";
export type { ArcanaTabItem, ArcanaTabsVariant } from "./arcana-tabs.component";
export { ArcanaTabPanelDirective } from "./tab-panel.directive";

export { ArcanaAccordionComponent } from "./arcana-accordion.component";
export { ArcanaAccordionItemComponent } from "./arcana-accordion-item.component";

// ── Lote 2: form / deps / estrutura ─────────────────────────────────────────

export { ArcanaSelectComponent } from "./arcana-select.component";
export type { SelectOption } from "./arcana-select.component";

export { ArcanaInputBooleanComponent } from "./arcana-input-boolean.component";

export { ArcanaNumberStepperComponent } from "./arcana-number-stepper.component";

export { ArcanaRadioCardGroupComponent } from "./arcana-radio-card-group.component";
export type { RadioCardOption } from "./arcana-radio-card-group.component";

export { ArcanaSwitchSegmentedComponent } from "./arcana-switch-segmented.component";

export { ArcanaMultiSelectPopoverComponent } from "./arcana-multi-select-popover.component";
export type { MultiSelectTab, MultiSelectTriggerContext } from "./arcana-multi-select-popover.component";

export { ArcanaInputMaskComponent } from "./arcana-input-mask.component";

export { ArcanaInputCurrencyComponent } from "./arcana-input-currency.component";

export { ArcanaDatePickerComponent } from "./arcana-date-picker.component";

export { ArcanaTableComponent } from "./arcana-table.component";
export type { ArcanaTableColumn } from "./arcana-table.component";

export { ArcanaSummaryTileComponent } from "./arcana-summary-tile.component";
export type { SummaryTileTone } from "./arcana-summary-tile.component";

export { ArcanaSummaryTilesComponent } from "./arcana-summary-tiles.component";

export { ArcanaLoadingOverlayComponent } from "./arcana-loading-overlay.component";

// ── Lote 3 (final): overlay / composição ────────────────────────────────────

export { ArcanaDialogComponent } from "./arcana-dialog.component";
export type { ArcanaDialogSize } from "./arcana-dialog.component";

export { ArcanaDropdownComponent } from "./arcana-dropdown.component";
export type { ArcanaDropdownPlacement, ArcanaDropdownSize } from "./arcana-dropdown.component";

export { ArcanaDropdownItemComponent } from "./arcana-dropdown-item.component";

export { ArcanaEditFieldModalComponent } from "./arcana-edit-field-modal.component";

export { ArcanaRequiredFieldsDialogComponent } from "./arcana-required-fields-dialog.component";
export type { RequiredField } from "./arcana-required-fields-dialog.component";

export { ArcanaOnboardingPanelComponent } from "./arcana-onboarding-panel.component";

export { ArcanaGridEmptyStateComponent } from "./arcana-grid-empty-state.component";

export {
  ArcanaSettingsListComponent,
  ArcanaSettingsEditButtonComponent
} from "./arcana-settings-list.component";

export { ArcanaSettingsListGroupComponent } from "./arcana-settings-list-group.component";
export type { SettingsGroupIconColor } from "./arcana-settings-list-group.component";

export { ArcanaSettingsListItemComponent } from "./arcana-settings-list-item.component";

export { ArcanaSettingsEditableFieldComponent } from "./arcana-settings-editable-field.component";

export { ArcanaSpecSheetComponent } from "./arcana-spec-sheet.component";

export { ArcanaSpecSheetSectionComponent } from "./arcana-spec-sheet-section.component";
export type { SpecSheetAccentColor } from "./arcana-spec-sheet-section.component";

export { ArcanaSpecSheetFieldComponent } from "./arcana-spec-sheet-field.component";
