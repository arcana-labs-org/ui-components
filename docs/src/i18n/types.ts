/**
 * Complete, typed message catalog for the @arcanalabs/ui-components docs.
 *
 * Every language file exports a `Messages` object — the shared interface keeps
 * the eight dictionaries in parity: a missing or extra key is a type error.
 *
 * Prose strings may carry minimal inline markup, interpreted by the mini
 * renderer in `index.ts`:
 *   <c>…</c> → inline code   ·   <b>…</b> → strong   ·   <i>…</i> → emphasis
 * Placeholders like {count} or {title} are replaced via `fmt()`.
 */

export type Lang = "en" | "pt-BR" | "es" | "it" | "zh" | "ja" | "de" | "ru";

/** Top-level navigation groups the 39 components are bucketed into. */
export type CategoryId =
  | "gettingStarted"
  | "forms"
  | "dataDisplay"
  | "overlay"
  | "layoutNav"
  | "feedback";

/** Components documented in depth in this batch (title + blurb prose). */
export type DocumentedKey =
  | "button"
  | "badge"
  | "input"
  | "select"
  | "checkbox"
  | "switch"
  | "tabs"
  | "dialog"
  // ── Batch 2 ──
  | "inputMask"
  | "inputBoolean"
  | "numberStepper"
  | "multiSelectPopover"
  | "radioCardGroup"
  | "segmentedOptions"
  | "datePicker"
  | "inputCurrency"
  | "accordion"
  | "accordionItem"
  | "dropdown"
  | "dropdownItem"
  // ── Batch 3 ──
  | "table"
  | "specSheet"
  | "specSheetSection"
  | "specSheetField"
  | "summaryTile"
  | "summaryTiles"
  | "settingsList"
  | "settingsListGroup"
  | "settingsListItem"
  | "settingsEditableField"
  | "notice"
  | "editFieldModal"
  | "requiredFieldsDialog"
  | "onboardingPanel"
  | "loadingOverlay"
  | "skeleton"
  | "switchCard"
  | "switchRow"
  | "switchSegmented";

export interface SectionProse {
  title: string;
  p1: string;
  p2: string;
}

export interface Messages {
  meta: {
    /** BCP-47 tag applied to <html lang>. */
    htmlLang: string;
    /** Locale used for locale-aware comparisons (search). */
    locale: string;
  };
  /** Language name written in the language itself (shown in the switcher). */
  langName: string;

  shell: {
    kicker: string;
    lead: string;
    /** Muted word next to the logo in the top bar. */
    brandLib: string;
    /** Big <h1> at the top of the content column. */
    docTitle: string;
    searchPlaceholder: string;
    searchAria: string;
    chooseFramework: string;
    chooseLanguage: string;
    openNav: string;
    closeNav: string;
    sidebarAria: string;
    noSectionsFound: string;
    previewTab: string;
    codeTab: string;
    referenceTab: string;
    codeOnlyLabel: string;
    defaultPreviewCaption: string;
    /** aria-label of a section's Preview/Code tablist; {title} placeholder. */
    sectionExampleAria: string;
    /** aria-label of the GitHub star count; {count} placeholder. */
    githubStars: string;
    /** Footer line under the content. */
    footer: string;
  };

  codeBlock: {
    copy: string;
    copied: string;
  };

  /** Sidebar group titles. */
  categories: Record<CategoryId, string>;

  gettingStarted: {
    install: SectionProse;
    usage: SectionProse;
    styles: SectionProse;
    maska: SectionProse;
  };

  /** Column headers of every props reference table. */
  propsTable: {
    name: string;
    type: string;
    default: string;
    description: string;
    /** Small caption above the props table. */
    caption: string;
    /** Heading for the emitted-events list under a component. */
    eventsTitle: string;
  };

  /** Caption shown over a live component preview. */
  demoCaption: string;

  /** Body of a not-yet-documented component section. */
  comingSoon: string;

  /** Note shown in place of the snippet for frameworks other than Vue. */
  frameworkSoon: string;

  /** Per-component prose (the heading is the component name, untranslated). */
  components: Record<DocumentedKey, { blurb: string }>;

  /**
   * "Chrome" strings for the live demos (status lines, notes, affordance labels
   * like "Open dialog", "last action", etc.). Injected into each mounted Vue
   * demo as the global `$dt`, read in templates via `{{ $dt.someKey }}`.
   */
  demos: Record<string, string>;
}
