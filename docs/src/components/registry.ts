import type { CategoryId, DocumentedKey } from "../i18n/types";

/**
 * The full catalogue of components exported by `@arcanalabs/ui-components/vue`,
 * bucketed into the sidebar categories. `docKey` is set for the components that
 * are documented in depth in this batch (demo + props + snippet); the rest are
 * registered as "coming soon" stubs so the navigation is already complete.
 *
 * `id` is the section anchor (used in the URL hash). `name` is the exported
 * component identifier, shown verbatim as the section heading (not translated).
 */
export interface ComponentEntry {
  id: string;
  name: string;
  category: CategoryId;
  /** Present ⇒ fully documented; keyed into `messages.components` + the doc map. */
  docKey?: DocumentedKey;
}

export const COMPONENTS: ComponentEntry[] = [
  // ── Forms ──────────────────────────────────────────────────────────────
  { id: "shadcn-button", name: "ShadcnButton", category: "forms", docKey: "button" },
  { id: "shadcn-input", name: "ShadcnInput", category: "forms", docKey: "input" },
  { id: "shadcn-input-mask", name: "ShadcnInputMask", category: "forms", docKey: "inputMask" },
  { id: "shadcn-input-boolean", name: "ShadcnInputBoolean", category: "forms", docKey: "inputBoolean" },
  { id: "shadcn-number-stepper", name: "ShadcnNumberStepper", category: "forms", docKey: "numberStepper" },
  { id: "shadcn-select", name: "ShadcnSelect", category: "forms", docKey: "select" },
  { id: "multi-select-popover", name: "MultiSelectPopover", category: "forms", docKey: "multiSelectPopover" },
  { id: "shadcn-checkbox", name: "ShadcnCheckbox", category: "forms", docKey: "checkbox" },
  { id: "shadcn-switch", name: "ShadcnSwitch", category: "forms", docKey: "switch" },
  { id: "shadcn-radio-card-group", name: "ShadcnRadioCardGroup", category: "forms", docKey: "radioCardGroup" },
  { id: "shadcn-segmented-options", name: "ShadcnSegmentedOptions", category: "forms", docKey: "segmentedOptions" },
  { id: "shadcn-date-picker", name: "ShadcnDatePicker", category: "forms", docKey: "datePicker" },
  { id: "input-currency", name: "InputCurrency", category: "forms", docKey: "inputCurrency" },
  { id: "labeled-button", name: "LabeledButton", category: "forms", docKey: "labeledButton" },

  // ── Data display ───────────────────────────────────────────────────────
  { id: "shadcn-badge", name: "ShadcnBadge", category: "dataDisplay", docKey: "badge" },
  { id: "shadcn-table", name: "ShadcnTable", category: "dataDisplay" },
  { id: "shadcn-spec-sheet", name: "ShadcnSpecSheet", category: "dataDisplay" },
  { id: "shadcn-spec-sheet-section", name: "ShadcnSpecSheetSection", category: "dataDisplay" },
  { id: "shadcn-spec-sheet-field", name: "ShadcnSpecSheetField", category: "dataDisplay" },
  { id: "shadcn-summary-tile", name: "ShadcnSummaryTile", category: "dataDisplay" },
  { id: "shadcn-summary-tiles", name: "ShadcnSummaryTiles", category: "dataDisplay" },
  { id: "shadcn-settings-list", name: "ShadcnSettingsList", category: "dataDisplay" },
  { id: "shadcn-settings-list-group", name: "ShadcnSettingsListGroup", category: "dataDisplay" },
  { id: "shadcn-settings-list-item", name: "ShadcnSettingsListItem", category: "dataDisplay" },
  { id: "shadcn-settings-editable-field", name: "ShadcnSettingsEditableField", category: "dataDisplay" },
  { id: "spark-grid-empty-state", name: "SparkGridEmptyState", category: "dataDisplay" },

  // ── Overlay ────────────────────────────────────────────────────────────
  { id: "shadcn-dialog", name: "ShadcnDialog", category: "overlay", docKey: "dialog" },
  { id: "shadcn-dropdown", name: "ShadcnDropdown", category: "overlay", docKey: "dropdown" },
  { id: "shadcn-dropdown-item", name: "ShadcnDropdownItem", category: "overlay", docKey: "dropdownItem" },
  { id: "shadcn-edit-field-modal", name: "ShadcnEditFieldModal", category: "overlay" },
  { id: "shadcn-required-fields-dialog", name: "ShadcnRequiredFieldsDialog", category: "overlay" },
  { id: "shadcn-notice", name: "ShadcnNotice", category: "overlay" },
  { id: "shadcn-onboarding-panel", name: "ShadcnOnboardingPanel", category: "overlay" },

  // ── Layout & navigation ────────────────────────────────────────────────
  { id: "shadcn-tabs", name: "ShadcnTabs", category: "layoutNav", docKey: "tabs" },
  { id: "shadcn-accordion", name: "ShadcnAccordion", category: "layoutNav", docKey: "accordion" },
  { id: "shadcn-accordion-item", name: "ShadcnAccordionItem", category: "layoutNav", docKey: "accordionItem" },
  { id: "shadcn-switch-card", name: "ShadcnSwitchCard", category: "layoutNav" },
  { id: "shadcn-switch-row", name: "ShadcnSwitchRow", category: "layoutNav" },
  { id: "shadcn-switch-segmented", name: "ShadcnSwitchSegmented", category: "layoutNav" },

  // ── Feedback ───────────────────────────────────────────────────────────
  { id: "shadcn-skeleton", name: "ShadcnSkeleton", category: "feedback" },
  { id: "shadcn-loading-overlay", name: "ShadcnLoadingOverlay", category: "feedback" }
];

/** Sidebar category order. */
export const CATEGORY_ORDER: CategoryId[] = [
  "gettingStarted",
  "forms",
  "dataDisplay",
  "overlay",
  "layoutNav",
  "feedback"
];
