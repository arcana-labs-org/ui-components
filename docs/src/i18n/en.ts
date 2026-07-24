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
    }
  }
};
