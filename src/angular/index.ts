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

export { ArcanaSegmentedControlComponent } from "./arcana-segmented-control.component";
export type { SegmentedOption, SegmentedControlSize } from "./arcana-segmented-control.component";

export { ArcanaRateComponent } from "./arcana-rate.component";
export type { RateSize } from "./arcana-rate.component";

export { ArcanaAvatarComponent } from "./arcana-avatar.component";
export type { AvatarSize, AvatarShape } from "./arcana-avatar.component";

export { ArcanaAvatarGroupComponent } from "./arcana-avatar-group.component";
export type { AvatarGroupItem } from "./arcana-avatar-group.component";

export { ArcanaStatisticComponent } from "./arcana-statistic.component";
export type { StatisticTone, StatisticSize } from "./arcana-statistic.component";

export { ArcanaCountdownComponent } from "./arcana-countdown.component";
export type { CountdownTone, CountdownSize } from "./arcana-countdown.component";

export { ArcanaProgressComponent } from "./arcana-progress.component";
export type {
  ProgressTone,
  ProgressSize,
  ProgressVariant,
  ProgressRadius
} from "./arcana-progress.component";

export { ArcanaAspectRatioComponent } from "./arcana-aspect-ratio.component";

export { ArcanaHoverCardComponent } from "./arcana-hover-card.component";
export type { HoverCardAlign, HoverCardPlacement, HoverCardSide } from "../core/hover-card";

export { ArcanaTooltipComponent } from "./arcana-tooltip.component";
export type {
  HoverCardAlign as TooltipAlign,
  HoverCardPlacement as TooltipPlacement,
  HoverCardSide as TooltipSide
} from "../core/hover-card";

export { ArcanaScrollAreaComponent } from "./arcana-scroll-area.component";
export type { ScrollAreaOrientation, ScrollAreaType } from "./arcana-scroll-area.component";

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

export { ArcanaTreeSelectComponent } from "./arcana-tree-select.component";
export type { TreeSelectNode, TreeSelectValue } from "./arcana-tree-select.component";

export { ArcanaInputBooleanComponent } from "./arcana-input-boolean.component";

export { ArcanaNumberStepperComponent } from "./arcana-number-stepper.component";

export { ArcanaRadioIndicatorComponent } from "./arcana-radio-indicator.component";

export { ArcanaRadioComponent } from "./arcana-radio.component";

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

export { ArcanaSummaryTilesGroupComponent } from "./arcana-summary-tiles-group.component";

export { ArcanaLoadingOverlayComponent } from "./arcana-loading-overlay.component";

// ── Lote 3 (final): overlay / composição ────────────────────────────────────

export { ArcanaDialogComponent } from "./arcana-dialog.component";
export type { ArcanaDialogSize } from "./arcana-dialog.component";

export { ArcanaDropdownComponent } from "./arcana-dropdown.component";
export type { ArcanaDropdownPlacement, ArcanaDropdownSize } from "./arcana-dropdown.component";

export { ArcanaDropdownItemComponent } from "./arcana-dropdown-item.component";

export { ArcanaContextMenuComponent } from "./arcana-context-menu.component";
export { ArcanaContextMenuItemComponent } from "./arcana-context-menu-item.component";
export type { ArcanaContextMenuItemSpec, ArcanaContextMenuVariant } from "../core/context-menu";

export { ArcanaEditFieldDialogComponent } from "./arcana-edit-field-dialog.component";

export { ArcanaRequiredFieldsDialogComponent } from "./arcana-required-fields-dialog.component";
export type { RequiredField } from "./arcana-required-fields-dialog.component";

export { ArcanaActionPanelComponent } from "./arcana-action-panel.component";

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

export { ArcanaQuickSearchComponent } from "./arcana-quick-search.component";

export { ArcanaWizardComponent } from "./arcana-wizard.component";
export type { ArcanaWizardValidate } from "./arcana-wizard.component";
export { ArcanaWizardStepComponent } from "./arcana-wizard-step.component";
