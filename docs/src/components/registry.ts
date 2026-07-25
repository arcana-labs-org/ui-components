import type { CategoryId, DocumentedKey } from "../i18n/types";

/**
 * The full catalogue of components exported by `@arcanalabs/ui-components/vue`,
 * bucketed into the sidebar categories. `docKey` is set for the components that
 * are documented in depth in this batch (demo + props + snippet); the rest are
 * registered as "coming soon" stubs so the navigation is already complete.
 *
 * `id` is the section anchor (used in the URL hash). `name` is the exported
 * component identifier, shown verbatim in the code examples (not translated).
 * `label` is the short, human-friendly name shown in the sidebar and heading.
 */
export interface ComponentEntry {
  id: string;
  name: string;
  label: string;
  category: CategoryId;
  /** Present ⇒ fully documented; keyed into `messages.components` + the doc map. */
  docKey?: DocumentedKey;
}

export const COMPONENTS: ComponentEntry[] = [
  // ── Forms ──────────────────────────────────────────────────────────────
  { id: "arcana-button", name: "ArcanaButton", label: "Button", category: "forms", docKey: "button" },
  { id: "arcana-input", name: "ArcanaInput", label: "Input", category: "forms", docKey: "input" },
  { id: "arcana-input-mask", name: "ArcanaInputMask", label: "Input Mask", category: "forms", docKey: "inputMask" },
  { id: "arcana-input-boolean", name: "ArcanaInputBoolean", label: "Input Boolean", category: "forms", docKey: "inputBoolean" },
  { id: "arcana-number-stepper", name: "ArcanaNumberStepper", label: "Number Stepper", category: "forms", docKey: "numberStepper" },
  { id: "input-currency", name: "ArcanaInputCurrency", label: "Input Currency", category: "forms", docKey: "inputCurrency" },
  { id: "arcana-select", name: "ArcanaSelect", label: "Select", category: "forms", docKey: "select" },
  { id: "arcana-tree-select", name: "ArcanaTreeSelect", label: "Tree Select", category: "forms", docKey: "treeSelect" },
  { id: "multi-select-popover", name: "ArcanaMultiSelectPopover", label: "Multi-Select Popover", category: "forms", docKey: "multiSelectPopover" },
  { id: "arcana-checkbox", name: "ArcanaCheckbox", label: "Checkbox", category: "forms", docKey: "checkbox" },
  { id: "arcana-switch", name: "ArcanaSwitch", label: "Switch", category: "forms", docKey: "switch" },
  { id: "arcana-radio-card-group", name: "ArcanaRadioCardGroup", label: "Radio Card Group", category: "forms", docKey: "radioCardGroup" },
  { id: "arcana-segmented-control", name: "ArcanaSegmentedControl", label: "Segmented Control", category: "forms", docKey: "segmentedOptions" },
  { id: "arcana-date-picker", name: "ArcanaDatePicker", label: "Date Picker", category: "forms", docKey: "datePicker" },
  { id: "arcana-rate", name: "ArcanaRate", label: "Rate", category: "forms", docKey: "rate" },

  // ── Data display ───────────────────────────────────────────────────────
  { id: "arcana-badge", name: "ArcanaBadge", label: "Badge", category: "dataDisplay", docKey: "badge" },
  { id: "arcana-table", name: "ArcanaTable", label: "Table", category: "dataDisplay", docKey: "table" },
  { id: "arcana-spec-sheet", name: "ArcanaSpecSheet", label: "Spec Sheet", category: "dataDisplay", docKey: "specSheet" },
  { id: "arcana-spec-sheet-section", name: "ArcanaSpecSheetSection", label: "Spec Sheet Section", category: "dataDisplay", docKey: "specSheetSection" },
  { id: "arcana-spec-sheet-field", name: "ArcanaSpecSheetField", label: "Spec Sheet Field", category: "dataDisplay", docKey: "specSheetField" },
  { id: "arcana-summary-tile", name: "ArcanaSummaryTile", label: "Summary Tile", category: "dataDisplay", docKey: "summaryTile" },
  { id: "arcana-summary-tiles", name: "ArcanaSummaryTilesGroup", label: "Summary Tiles Group", category: "dataDisplay", docKey: "summaryTiles" },
  { id: "arcana-settings-list", name: "ArcanaSettingsList", label: "Settings List", category: "dataDisplay", docKey: "settingsList" },
  { id: "arcana-settings-list-group", name: "ArcanaSettingsListGroup", label: "Settings List Group", category: "dataDisplay", docKey: "settingsListGroup" },
  { id: "arcana-settings-list-item", name: "ArcanaSettingsListItem", label: "Settings List Item", category: "dataDisplay", docKey: "settingsListItem" },
  { id: "arcana-settings-editable-field", name: "ArcanaSettingsEditableField", label: "Settings Editable Field", category: "dataDisplay", docKey: "settingsEditableField" },
  { id: "arcana-avatar", name: "ArcanaAvatar", label: "Avatar", category: "dataDisplay", docKey: "avatar" },
  { id: "arcana-avatar-group", name: "ArcanaAvatarGroup", label: "Avatar Group", category: "dataDisplay", docKey: "avatarGroup" },
  { id: "arcana-statistic", name: "ArcanaStatistic", label: "Statistic", category: "dataDisplay", docKey: "statistic" },
  { id: "arcana-countdown", name: "ArcanaCountdown", label: "Countdown", category: "dataDisplay", docKey: "countdown" },

  // ── Overlay ────────────────────────────────────────────────────────────
  { id: "arcana-dialog", name: "ArcanaDialog", label: "Dialog", category: "overlay", docKey: "dialog" },
  { id: "arcana-dropdown", name: "ArcanaDropdown", label: "Dropdown", category: "overlay", docKey: "dropdown" },
  { id: "arcana-dropdown-item", name: "ArcanaDropdownItem", label: "Dropdown Item", category: "overlay", docKey: "dropdownItem" },
  { id: "arcana-edit-field-dialog", name: "ArcanaEditFieldDialog", label: "Edit Field Dialog", category: "overlay", docKey: "editFieldModal" },
  { id: "arcana-required-fields-dialog", name: "ArcanaRequiredFieldsDialog", label: "Required Fields Dialog", category: "overlay", docKey: "requiredFieldsDialog" },
  { id: "arcana-notice", name: "ArcanaNotice", label: "Notice", category: "overlay", docKey: "notice" },
  { id: "arcana-action-panel", name: "ArcanaActionPanel", label: "Action Panel", category: "overlay", docKey: "onboardingPanel" },
  { id: "arcana-hover-card", name: "ArcanaHoverCard", label: "Hover Card", category: "overlay", docKey: "hoverCard" },
  { id: "arcana-context-menu", name: "ArcanaContextMenu", label: "Context Menu", category: "overlay", docKey: "contextMenu" },
  { id: "arcana-context-menu-item", name: "ArcanaContextMenuItem", label: "Context Menu Item", category: "overlay", docKey: "contextMenuItem" },

  // ── Layout & navigation ────────────────────────────────────────────────
  { id: "arcana-tabs", name: "ArcanaTabs", label: "Tabs", category: "layoutNav", docKey: "tabs" },
  { id: "arcana-accordion", name: "ArcanaAccordion", label: "Accordion", category: "layoutNav", docKey: "accordion" },
  { id: "arcana-accordion-item", name: "ArcanaAccordionItem", label: "Accordion Item", category: "layoutNav", docKey: "accordionItem" },
  { id: "arcana-switch-card", name: "ArcanaSwitchCard", label: "Switch Card", category: "layoutNav", docKey: "switchCard" },
  { id: "arcana-switch-row", name: "ArcanaSwitchRow", label: "Switch Row", category: "layoutNav", docKey: "switchRow" },
  { id: "arcana-switch-segmented", name: "ArcanaSwitchSegmented", label: "Switch Segmented", category: "layoutNav", docKey: "switchSegmented" },
  { id: "arcana-aspect-ratio", name: "ArcanaAspectRatio", label: "Aspect Ratio", category: "layoutNav", docKey: "aspectRatio" },
  { id: "arcana-scroll-area", name: "ArcanaScrollArea", label: "Scroll Area", category: "layoutNav", docKey: "scrollArea" },

  // ── Feedback ───────────────────────────────────────────────────────────
  { id: "arcana-skeleton", name: "ArcanaSkeleton", label: "Skeleton", category: "feedback", docKey: "skeleton" },
  { id: "arcana-loading-overlay", name: "ArcanaLoadingOverlay", label: "Loading Overlay", category: "feedback", docKey: "loadingOverlay" },
  { id: "arcana-progress", name: "ArcanaProgress", label: "Progress", category: "feedback", docKey: "progress" }
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
