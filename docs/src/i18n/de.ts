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
    },
    inputMask: {
      blurb: "Ein maskiertes Texteingabefeld, das auf der <c>v-maska</c>-Direktive aufbaut und wie <c>ShadcnInput</c> gestylt ist. Übergib einen <c>mask</c>-String oder ein Array von Strings für längenabhängige dynamische Masken (z. B. Festnetz vs. Mobil). Das <c>v-model</c> hält stets den <b>rohen</b> Wert — ohne Maskenzeichen —, sodass CPF, CNPJ, CEP oder Telefonnummern unformatiert im Backend ankommen, während das Feld die formatierte Anzeige zeigt. Erfordert global registriertes <c>v-maska</c>."
    },
    inputBoolean: {
      blurb: "Ein Ja/Nein-Select für boolesche Felder, gerendert als <c>ShadcnSelect</c>. Es normalisiert die üblichen booleschen Formen — <c>true</c>/<c>1</c>, <c>false</c>/<c>0</c>, <c>null</c>. Eine <c>variation</c> schaltet die Labels auf <c>status</c> (Ativo/Inativo) oder auf SQL-artige <c>nullable</c>-Werte (<c>IS_NOT_NULL</c>/<c>IS_NULL</c>) für Filter um. Bei <c>clearable</c> (Standard) setzt eine führende „Todos“-Option den Wert auf <c>null</c> zurück."
    },
    numberStepper: {
      blurb: "Ein Zahlenfeld, flankiert von <c>−</c> / <c>+</c>-Buttons für feine Mengenanpassungen. Die Buttons respektieren <c>min</c> / <c>max</c> / <c>step</c> und deaktivieren sich an den Grenzen; Pfeil hoch/runter funktionieren per Tastatur, und eine leere oder ungültige Eingabe wird beim Blur auf <c>min</c> korrigiert. Native Spinner werden zugunsten der eigenen Buttons ausgeblendet."
    },
    multiSelectPopover: {
      blurb: "Ein generisches, ins Body teleportiertes Popover mit konfigurierbaren Tabs und Checkbox-Mehrfachauswahl — eine wiederverwendbare Basis für Picker, die mehrere Buckets umfassen (Nutzer + Abteilungen, Filialen, Maschinen…). Das <c>v-model</c> ist eine <c>{ [tabKey]: number[] }</c>-Map, ein Array ausgewählter IDs pro Tab. Jeder Tab liefert ein asynchrones <c>fetch()</c>, dessen Ergebnis für die Lebensdauer der Komponente gecacht wird; das Panel klappt und verschiebt sich, um im Viewport zu bleiben. Die Slots <c>trigger</c> und <c>item</c> passen das Rendering an."
    },
    radioCardGroup: {
      blurb: "Eine Gruppe auswählbarer Karten auf Basis echter <c>&lt;input type=\"radio\"&gt;</c>-Elemente — griffiger als ein Select, wenn es wenige Optionen gibt, die jeweils Beschreibung, Icon oder Badge tragen. Optionen sind <c>{ label, value, description?, icon?, badge?, disabled? }</c>-Objekte. Ordne sie gestapelt, <c>inline</c> oder in einer festen Zahl von <c>columns</c> an und verschiebe den Radio ans <c>end</c>, wenn ein führendes Icon das visuelle Gewicht tragen soll."
    },
    segmentedOptions: {
      blurb: "Ein Segmented Control für N sich gegenseitig ausschließende Optionen innerhalb einer Kapsel — das Mehr-Optionen-Geschwister des binären <c>ShadcnSwitchSegmented</c>. Das aktive Segment wird hervorgehoben; Optionen akzeptieren ein optionales <c>icon</c> und ein <c>disabled</c> je Option. <c>compact</c> und <c>squared</c> justieren die Geometrie, <c>activeColor</c> überschreibt die Füllung des aktiven Segments, und <c>autoSelectFirst</c> wählt die erste aktivierte Option, wenn nichts ausgewählt ist (praktisch für dynamische Listen)."
    },
    datePicker: {
      blurb: "Ein Datumsfeld im shadcn-Stil. Bei <c>type=\"date\"</c> kombiniert es ein live maskiertes <c>DD/MM/AAAA</c>-Texteingabefeld (via <c>v-maska</c>) mit einem Element-Plus-Kalender-Popover, das über das Kalendersymbol geöffnet wird; andere Typen (<c>daterange</c>, <c>month</c>, <c>year</c>) nutzen den Kalender direkt. Das <c>v-model</c> ist ein ISO-String <c>YYYY-MM-DD</c> (oder ein Tupel für Bereiche), und getippte Daten werden streng validiert (31/02 wird abgelehnt)."
    },
    inputCurrency: {
      blurb: "Ein Währungsfeld auf Basis von <c>v-money3</c>, das während der Eingabe formatiert — Tausendertrennzeichen, Dezimalkomma und eine konfigurierbare <c>fraction</c> an Nachkommastellen (standardmäßig BRL). Aktiviere das <c>shadcn</c>-Flag für das zinc-gestylte Feld mit führendem Währungssymbol; <c>min</c> / <c>max</c> begrenzen den Wert und <c>allowBlank</c> erlaubt ein leeres Feld. Das <c>v-model</c> trägt den formatierten String; der deaktivierte Zustand zeigt einen schreibgeschützten formatierten Wert."
    },
    labeledButton: {
      blurb: "Der Basis-Button hinter den übergeordneten Button-Wrappern: ein <c>label</c>, ein optionales führendes <c>icon</c> (FontAwesome-Klasse) und ein <c>loading</c>-Zustand, der das Icon durch einen Spinner ersetzt und den Button deaktiviert. Setze das <c>shadcn</c>-Flag, um die alte <c>color</c>-Prop auf eine semantische shadcn-Variante abzubilden (danger → destructive, grey → ghost, blue → info, …); ohne es bleibt das alte Bootstrap-Styling erhalten. <c>centerLabel</c> / <c>centerContent</c> steuern die Ausrichtung in Full-Width-Buttons."
    },
    accordion: {
      blurb: "Der Container für eine Reihe einklappbarer <c>ShadcnAccordionItem</c>s. Er stellt den Auf-/Zu-Zustand über provide/inject an seine Kinder bereit und bindet an ein <c>v-model</c>. Im Standard-Einzelmodus (<c>accordion</c>) ist das Modell der <c>name</c> des offenen Elements (oder <c>null</c>); mit <c>:accordion=\"false\"</c> gilt der Mehrfach-Modus, in dem das Modell ein Array offener Namen wird."
    },
    accordionItem: {
      blurb: "Ein einzelnes einklappbares Panel innerhalb eines <c>ShadcnAccordion</c>, identifiziert durch einen erforderlichen <c>name</c>. Der Header zeigt die <c>title</c>-Prop (oder einen <c>title</c>-Slot für reichhaltige Header) plus ein Chevron, das sich beim Öffnen dreht; der Standard-Slot ist der einklappbare Inhalt. <c>disabled</c> blockiert das Umschalten. Es liest seinen Offen-Zustand vom übergeordneten Accordion — es funktioniert nur darin verschachtelt."
    },
    dropdown: {
      blurb: "Ein Dropdown-Menü im shadcn-Stil, das <c>el-dropdown</c> ersetzt. Der <c>trigger</c>-Slot enthält das öffnende Element; der Standard-Slot enthält die <c>ShadcnDropdownItem</c>s (und erhält einen <c>close</c>-Helfer). Das Menü teleportiert ins <c>&lt;body&gt;</c>, um dem <c>overflow:hidden</c> von Vorfahren zu entkommen, positioniert sich mit automatischem Flip/Shift und schließt bei Klick außerhalb, Escape oder Item-Auswahl. <c>placement</c> und eine <c>size</c>-Dichte (an die Items weitergereicht) justieren es."
    },
    dropdownItem: {
      blurb: "Eine Zeile innerhalb eines <c>ShadcnDropdown</c>: ein optionales <c>icon</c>, das Label (Standard-Slot) und ein optionaler <c>suffix</c>-Slot (z. B. ein Shortcut). <c>variant</c> färbt sie als <c>default</c>, <c>danger</c>, <c>success</c> oder <c>warning</c>; <c>divided</c> zeichnet darüber eine Trennlinie, um destruktive Aktionen abzugrenzen. Beim Klick emittiert sie <c>click</c> und bittet — sofern <c>closeOnClick</c> nicht false ist — das übergeordnete Dropdown per aufsteigendem Custom-Event, sich zu schließen."
    }
  }
};
