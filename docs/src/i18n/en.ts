import type { Messages } from "./types";

export const en: Messages = {
  meta: { htmlLang: "en", locale: "en-US" },
  langName: "English",

  shell: {
    kicker: "Documentation · v0.x",
    lead: "A typed, shadcn-style component library. Vue 3 ships today; React, Angular and Svelte adapters are on the way — same API, same look, in every framework.",
    brandLib: "UI Components",
    docTitle: "Arcana UI Components",
    searchPlaceholder: "Search components… (⌘K)",
    searchAria: "Search the documentation",
    chooseFramework: "Choose framework",
    chooseLanguage: "Choose language",
    openNav: "Open navigation",
    closeNav: "Close navigation",
    sidebarAria: "Documentation navigation",
    noSectionsFound: "No components found.",
    previewTab: "Preview",
    codeTab: "Code",
    codeOnlyLabel: "Code",
    defaultPreviewCaption: "live component · interact with it",
    sectionExampleAria: "{title} example",
    githubStars: "{count} stars on GitHub",
    footer: "Arcana UI Components · MIT"
  },

  codeBlock: {
    copy: "Copy",
    copied: "Copied!"
  },

  categories: {
    gettingStarted: "Getting started",
    forms: "Forms",
    dataDisplay: "Data display",
    overlay: "Overlay",
    layoutNav: "Layout & navigation",
    feedback: "Feedback"
  },

  gettingStarted: {
    install: {
      title: "Installation",
      p1: "The library ships as a single npm package. Install it with your package manager of choice — <c>vue</c> (3.4+) is the only peer dependency.",
      p2: "All Vue components are exported from the <c>@arcanalabs/ui-components/vue</c> subpath as self-contained SFCs; import just the ones you use."
    },
    usage: {
      title: "Usage",
      p1: "Import a component and drop it into your template. Every component follows the same conventions: <c>v-model</c> for two-way values, kebab-case props, and a matching <c>change</c> event next to <c>update:modelValue</c>.",
      p2: "The palette is the neutral shadcn <i>zinc</i> scale, so components sit comfortably next to each other with no theme configuration."
    },
    styles: {
      title: "Styles",
      p1: "Import the stylesheet once, at the root of your application: <c>import '@arcanalabs/ui-components/styles.css'</c>. It carries every component's visual tokens.",
      p2: "Styles are plain CSS scoped per component — there is no runtime style engine and no Tailwind requirement in the consumer."
    },
    maska: {
      title: "Registering v-maska",
      p1: "A few components (<c>ShadcnInputMask</c>, <c>ShadcnDatePicker</c>) rely on the <c>v-maska</c> directive from the <c>maska</c> package. Register it globally once when you create the app.",
      p2: "Components that don't use masking need no extra setup — this step is only required if you render a masked input."
    }
  },

  propsTable: {
    name: "Prop",
    type: "Type",
    default: "Default",
    description: "Description",
    caption: "Props",
    eventsTitle: "Emitted events"
  },

  demoCaption: "live component · interact with it",
  comingSoon: "Full documentation for this component is coming in a future batch. It is already exported from <c>@arcanalabs/ui-components/vue</c> and ready to use.",
  frameworkSoon: "// React · Angular · Svelte adapters are coming soon.\n// Vue 3 is available today — switch the framework toggle to Vue.",

  components: {
    button: {
      blurb: "A pressable button that mirrors the shadcn button geometry (13px / weight 500 / radius 6). Fifteen semantic variants cover primary actions, destructive flows, neutral outlines and status accents. The label is provided through the default slot; clicks are surfaced through the <c>click</c> event."
    },
    badge: {
      blurb: "A compact pill for counts, statuses and tags. Six colour variants pair with an optional leading <c>dot</c> indicator, two sizes, and a <c>clickable</c> mode that adds pointer affordance for actionable badges. Content comes from the default slot."
    },
    input: {
      blurb: "A native <c>&lt;input&gt;</c> with shadcn styling and a number-aware <c>v-model</c> (an empty <c>type=\"number\"</c> emits <c>null</c>, a valid one emits a real number). Standard HTML attributes — <c>placeholder</c>, <c>readonly</c>, <c>min/max/step</c>, <c>maxlength</c>, <c>autocomplete</c> — pass straight through."
    },
    select: {
      blurb: "A fully custom select — no Element Plus underneath. The dropdown is teleported to <c>&lt;body&gt;</c> with auto-flip positioning, and supports single or <c>multiple</c> selection, a built-in <c>searchable</c> filter, a hover <c>clearable</c> affordance and full keyboard navigation. Options accept plain strings or <c>{ label, value, disabled?, description? }</c> objects."
    },
    checkbox: {
      blurb: "A binary checkbox that wraps a <b>real</b> native <c>&lt;input type=\"checkbox\"&gt;</c> — so it is keyboard- and test-driver-friendly (Dusk <c>check()</c>/<c>uncheck()</c> work). Use it to pick items from a list; an <c>indeterminate</c> state renders the classic \"some selected\" dash. Reach for <c>ShadcnSwitch</c> instead when toggling a setting on/off."
    },
    switch: {
      blurb: "A binary on/off toggle following the WAI-ARIA switch pattern (<c>role=\"switch\"</c> + <c>aria-checked</c>, Space/Enter activate). The track is colour-coded for scannability — red when off, green when on — and an optional hidden checkbox (<c>name</c>) integrates with native form submission."
    },
    tabs: {
      blurb: "Custom tabs driven by a <c>tabs</c> array and a <c>v-model</c> holding the active tab name. Each tab becomes a named slot. Six visual variants — <c>pills</c>, <c>underline</c>, <c>boxed</c>, <c>sidebar</c>, <c>sidebar-soft</c>, <c>segmented</c> — cover everything from compact modal tabs to full sidebar navigation, with optional icons, badges and a <c>keepAlive</c> mode that preserves inactive panels."
    },
    dialog: {
      blurb: "A shadcn-style modal with a ref-based API — call <c>show()</c> / <c>hide()</c> on the component ref rather than binding <c>v-model</c>. It teleports to <c>&lt;body&gt;</c>, traps focus, closes on Escape (and optionally on overlay click), and layers correctly when nested. Size presets run <c>sm → full</c>; the <c>header</c> and <c>footer</c> slots are optional (the footer slot receives <c>{ hide }</c>)."
    },
    inputMask: {
      blurb: "A masked text input built on the <c>v-maska</c> directive and styled to match <c>ShadcnInput</c>. Pass a <c>mask</c> string, or an array of strings for length-driven dynamic masks (e.g. landline vs. mobile phone). The <c>v-model</c> always holds the <b>raw</b> value — no mask characters — so CPF, CNPJ, CEP or phone numbers reach your backend unformatted while the field shows the formatted display. Requires <c>v-maska</c> registered globally."
    },
    inputBoolean: {
      blurb: "A yes/no select for boolean fields, rendered as a <c>ShadcnSelect</c>. It normalises the usual boolean shapes — <c>true</c>/<c>1</c>, <c>false</c>/<c>0</c>, <c>null</c>. A <c>variation</c> switches the labels to <c>status</c> (Ativo/Inativo) or to SQL-like <c>nullable</c> values (<c>IS_NOT_NULL</c>/<c>IS_NULL</c>) for filters. When <c>clearable</c> (default), a leading \"Todos\" option resets the value to <c>null</c>."
    },
    numberStepper: {
      blurb: "A numeric input flanked by <c>−</c> / <c>+</c> buttons for fine quantity adjustments. The buttons respect <c>min</c> / <c>max</c> / <c>step</c> and disable at the limits; Arrow Up/Down work from the keyboard, and an empty or invalid entry is coerced to <c>min</c> on blur. Native spinners are hidden in favour of the custom buttons."
    },
    multiSelectPopover: {
      blurb: "A generic body-teleported popover with configurable tabs and checkbox multi-selection — a reusable base for pickers that span several buckets (users + departments, branches, machines…). The <c>v-model</c> is a <c>{ [tabKey]: number[] }</c> map, one selected-id array per tab. Each tab supplies an async <c>fetch()</c> whose result is cached for the component's lifetime; the panel flips and shifts to stay in the viewport. The <c>trigger</c> and <c>item</c> slots customise rendering."
    },
    radioCardGroup: {
      blurb: "A group of selectable cards backed by real <c>&lt;input type=\"radio\"&gt;</c> elements — more tactile than a select when there are a handful of options that each carry a description, icon or badge. Options are <c>{ label, value, description?, icon?, badge?, disabled? }</c> objects. Lay them out stacked, <c>inline</c>, or in a fixed number of <c>columns</c>, and move the radio to the <c>end</c> when a leading icon should carry the visual weight."
    },
    segmentedOptions: {
      blurb: "A segmented control for N mutually-exclusive options rendered inside a pill — the multi-option sibling of the binary <c>ShadcnSwitchSegmented</c>. The active segment is highlighted; options accept an optional <c>icon</c> and a per-option <c>disabled</c>. <c>compact</c> and <c>squared</c> tune the geometry, <c>activeColor</c> overrides the active fill, and <c>autoSelectFirst</c> picks the first enabled option when nothing is selected (handy for dynamic lists)."
    },
    datePicker: {
      blurb: "A shadcn-styled date field. For <c>type=\"date\"</c> it composes a live-masked <c>DD/MM/AAAA</c> text input (via <c>v-maska</c>) with an Element Plus calendar popover opened by the calendar icon; other types (<c>daterange</c>, <c>month</c>, <c>year</c>) use the calendar directly. The <c>v-model</c> is an ISO <c>YYYY-MM-DD</c> string (or a tuple for ranges), and typed dates are strictly validated (31/02 is rejected)."
    },
    inputCurrency: {
      blurb: "A currency input built on <c>v-money3</c> that formats as the user types — thousands separator, decimal comma and a configurable <c>fraction</c> of decimal places (BRL by default). Enable the <c>shadcn</c> flag for the zinc-styled field with a leading currency icon; <c>min</c> / <c>max</c> clamp the value and <c>allowBlank</c> permits an empty field. The <c>v-model</c> carries the formatted string; the disabled state shows a read-only formatted value."
    },
    labeledButton: {
      blurb: "The base button behind the higher-level button wrappers: a <c>label</c>, an optional leading <c>icon</c> (FontAwesome class) and a <c>loading</c> state that swaps the icon for a spinner and disables the button. Set the <c>shadcn</c> flag to map the legacy <c>color</c> prop onto a semantic shadcn variant (danger → destructive, grey → ghost, blue → info, …); without it the legacy Bootstrap styling is kept. <c>centerLabel</c> / <c>centerContent</c> control alignment in full-width buttons."
    },
    accordion: {
      blurb: "The container for a set of collapsible <c>ShadcnAccordionItem</c>s. It provides the open/close state to its children through provide/inject and binds to a <c>v-model</c>. In the default single (<c>accordion</c>) mode the model is the open item's <c>name</c> (or <c>null</c>); set <c>:accordion=\"false\"</c> for multiple-open mode, where the model becomes an array of open names."
    },
    accordionItem: {
      blurb: "A single collapsible panel inside a <c>ShadcnAccordion</c>, identified by a required <c>name</c>. The header shows the <c>title</c> prop (or a <c>title</c> slot for rich headers) plus a chevron that rotates when open; the default slot is the collapsible body. <c>disabled</c> blocks toggling. It reads its open state from the parent accordion — it only works nested inside one."
    },
    dropdown: {
      blurb: "A shadcn-style dropdown menu that replaces <c>el-dropdown</c>. The <c>trigger</c> slot holds whatever opens it; the default slot holds <c>ShadcnDropdownItem</c>s (and receives a <c>close</c> helper). The menu teleports to <c>&lt;body&gt;</c> to escape ancestor <c>overflow:hidden</c>, positions itself with automatic flip/shift, and closes on outside click, Escape or item selection. <c>placement</c> and a <c>size</c> density (propagated to items) tune it."
    },
    dropdownItem: {
      blurb: "A row inside a <c>ShadcnDropdown</c>: an optional <c>icon</c>, the label (default slot) and an optional <c>suffix</c> slot (e.g. a shortcut). <c>variant</c> colours it <c>default</c>, <c>danger</c>, <c>success</c> or <c>warning</c>; <c>divided</c> draws a separator above it to fence destructive actions off. On click it emits <c>click</c> and — unless <c>closeOnClick</c> is false — asks the parent dropdown to close via a bubbling custom event."
    }
  }
};
