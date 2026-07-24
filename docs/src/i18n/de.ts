import type { Messages } from "./types";

export const de: Messages = {
  meta: { htmlLang: "de", locale: "de-DE" },
  langName: "Deutsch",

  shell: {
    kicker: "Dokumentation · v0.x",
    lead: "Eine typisierte Komponentenbibliothek im shadcn-Stil. Vue 3 ist schon heute verfügbar; Adapter für React, Angular und Svelte sind in Arbeit — dieselbe API, dasselbe Aussehen, in jedem Framework.",
    brandLib: "UI Components",
    docTitle: "Arcana UI Components",
    searchPlaceholder: "Komponenten suchen… (⌘K)",
    searchAria: "Dokumentation durchsuchen",
    chooseFramework: "Framework wählen",
    chooseLanguage: "Sprache wählen",
    openNav: "Navigation öffnen",
    closeNav: "Navigation schließen",
    sidebarAria: "Navigation der Dokumentation",
    noSectionsFound: "Keine Komponenten gefunden.",
    previewTab: "Vorschau",
    codeTab: "Code",
    codeOnlyLabel: "Code",
    defaultPreviewCaption: "Live-Komponente · interagiere damit",
    sectionExampleAria: "Beispiel für {title}",
    githubStars: "{count} Sterne auf GitHub",
    footer: "Arcana UI Components · MIT"
  },

  codeBlock: {
    copy: "Kopieren",
    copied: "Kopiert!"
  },

  categories: {
    gettingStarted: "Erste Schritte",
    forms: "Formulare",
    dataDisplay: "Datenanzeige",
    overlay: "Overlay",
    layoutNav: "Layout & Navigation",
    feedback: "Feedback"
  },

  gettingStarted: {
    install: {
      title: "Installation",
      p1: "Die Bibliothek wird als einzelnes npm-Paket ausgeliefert. Installiere sie mit dem Paketmanager deiner Wahl — <c>vue</c> (3.4+) ist die einzige Peer-Dependency.",
      p2: "Alle Vue-Komponenten werden über den Subpath <c>@arcanalabs/ui-components/vue</c> als eigenständige SFCs exportiert; importiere nur die, die du verwendest."
    },
    usage: {
      title: "Verwendung",
      p1: "Importiere eine Komponente und setze sie in dein Template. Alle folgen denselben Konventionen: <c>v-model</c> für bidirektionale Werte, Props in kebab-case und ein <c>change</c>-Event neben <c>update:modelValue</c>.",
      p2: "Die Palette ist die neutrale shadcn-<i>zinc</i>-Skala, sodass die Komponenten ohne Theme-Konfiguration angenehm nebeneinander stehen."
    },
    styles: {
      title: "Styles",
      p1: "Importiere das Stylesheet einmal an der Wurzel deiner Anwendung: <c>import '@arcanalabs/ui-components/styles.css'</c>. Es enthält die visuellen Tokens aller Komponenten.",
      p2: "Die Styles sind reines, pro Komponente gescoptes CSS — es gibt keine Style-Engine zur Laufzeit und keine Tailwind-Anforderung im Konsumenten."
    },
    maska: {
      title: "v-maska registrieren",
      p1: "Einige Komponenten (<c>ShadcnInputMask</c>, <c>ShadcnDatePicker</c>) nutzen die Direktive <c>v-maska</c> aus dem Paket <c>maska</c>. Registriere sie einmal global beim Erstellen der App.",
      p2: "Komponenten ohne Maskierung benötigen kein zusätzliches Setup — dieser Schritt ist nur nötig, wenn du ein maskiertes Eingabefeld renderst."
    }
  },

  propsTable: {
    name: "Prop",
    type: "Typ",
    default: "Standard",
    description: "Beschreibung",
    caption: "Props",
    eventsTitle: "Ausgelöste Events"
  },

  demoCaption: "Live-Komponente · interagiere damit",
  comingSoon: "Die vollständige Dokumentation für diese Komponente kommt in einem späteren Batch. Sie wird bereits aus <c>@arcanalabs/ui-components/vue</c> exportiert und ist einsatzbereit.",
  frameworkSoon: "// React-, Angular- und Svelte-Adapter folgen in Kürze.\n// Vue 3 ist schon heute verfügbar — stelle den Framework-Umschalter auf Vue.",

  components: {
    button: {
      blurb: "Ein klickbarer Button, der die shadcn-Button-Geometrie widerspiegelt (13px / Gewicht 500 / Radius 6). Fünfzehn semantische Varianten decken primäre Aktionen, destruktive Abläufe, neutrale Umrisse und Status-Akzente ab. Das Label kommt über den Default-Slot; Klicks werden über das <c>click</c>-Event bereitgestellt."
    },
    badge: {
      blurb: "Eine kompakte Pille für Zähler, Status und Tags. Sechs Farbvarianten lassen sich mit einem optionalen führenden <c>dot</c>-Indikator, zwei Größen und einem <c>clickable</c>-Modus kombinieren, der eine Zeiger-Affordanz für interaktive Badges hinzufügt. Der Inhalt stammt aus dem Default-Slot."
    },
    input: {
      blurb: "Ein natives <c>&lt;input&gt;</c> mit shadcn-Styling und einem zahlenbewussten <c>v-model</c> (ein leeres <c>type=\"number\"</c> gibt <c>null</c> aus, ein gültiges eine echte Zahl). Standard-HTML-Attribute — <c>placeholder</c>, <c>readonly</c>, <c>min/max/step</c>, <c>maxlength</c>, <c>autocomplete</c> — werden direkt durchgereicht."
    },
    select: {
      blurb: "Ein vollständig eigenes Select — ohne Element Plus darunter. Das Dropdown wird mit Auto-Flip-Positionierung ins <c>&lt;body&gt;</c> teleportiert und unterstützt Einfach- oder <c>multiple</c>-Auswahl, einen integrierten <c>searchable</c>-Filter, eine <c>clearable</c>-Affordanz beim Hover und volle Tastaturnavigation. Optionen akzeptieren einfache Strings oder <c>{ label, value, disabled?, description? }</c>-Objekte."
    },
    checkbox: {
      blurb: "Eine binäre Checkbox, die ein <b>echtes</b> natives <c>&lt;input type=\"checkbox\"&gt;</c> umschließt — daher tastatur- und testtreiberfreundlich (Dusks <c>check()</c>/<c>uncheck()</c> funktioniert). Nutze sie, um Elemente aus einer Liste auszuwählen; ein <c>indeterminate</c>-Zustand zeigt den klassischen „einige ausgewählt“-Strich. Für das Ein-/Ausschalten einer Einstellung nimm stattdessen <c>ShadcnSwitch</c>."
    },
    switch: {
      blurb: "Ein binärer An/Aus-Umschalter nach dem WAI-ARIA-Switch-Muster (<c>role=\"switch\"</c> + <c>aria-checked</c>, Space/Enter aktivieren). Die Spur ist zur schnellen Erfassung farbcodiert — rot bei Aus, grün bei An — und eine optionale versteckte Checkbox (<c>name</c>) integriert sich in den nativen Formularversand."
    },
    tabs: {
      blurb: "Eigene Tabs, gesteuert über ein <c>tabs</c>-Array und ein <c>v-model</c> mit dem Namen des aktiven Tabs. Jeder Tab wird zu einem benannten Slot. Sechs visuelle Varianten — <c>pills</c>, <c>underline</c>, <c>boxed</c>, <c>sidebar</c>, <c>sidebar-soft</c>, <c>segmented</c> — decken alles von kompakten Modal-Tabs bis zur vollständigen Sidebar-Navigation ab, mit optionalen Icons und Badges sowie einem <c>keepAlive</c>-Modus, der inaktive Panels bewahrt."
    },
    dialog: {
      blurb: "Ein Modal im shadcn-Stil mit ref-basierter API — rufe <c>show()</c> / <c>hide()</c> auf der Komponenten-Ref auf, statt <c>v-model</c> zu binden. Es teleportiert ins <c>&lt;body&gt;</c>, fängt den Fokus, schließt bei Escape (und optional beim Overlay-Klick) und stapelt sich beim Verschachteln korrekt. Größen-Presets reichen von <c>sm → full</c>; die Slots <c>header</c> und <c>footer</c> sind optional (der Footer-Slot erhält <c>{ hide }</c>)."
    }
  }
};
