import type { Messages } from "./types";

export const de: Messages = {
  meta: { htmlLang: "de", locale: "de-DE" },
  langName: "Deutsch",

  shell: {
    kicker: "Dokumentation · v0.x",
    lead: "Eine typisierte Komponentenbibliothek im arcana-Stil — Vue 3, React, Angular und Svelte, mit derselben API und demselben Aussehen in jedem Framework.",
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
    referenceTab: "Props & Events",
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
      p2: "Jede Komponente wird für alle vier Frameworks über einen passenden Subpath veröffentlicht — <c>@arcanalabs/ui-components/vue</c>, <c>/react</c>, <c>/angular</c> und <c>/svelte</c>; importiere nur die, die du verwendest. Die Icons nutzen Font Awesome Free — installiere <c>@fortawesome/fontawesome-free</c> und binde dessen CSS einmal ein."
    },
    usage: {
      title: "Verwendung",
      p1: "Importiere eine Komponente und setze sie in dein Template. Alle folgen denselben Konventionen: <c>v-model</c> für bidirektionale Werte, Props in kebab-case und ein <c>change</c>-Event neben <c>update:modelValue</c>.",
      p2: "Die Palette ist die neutrale arcana-<i>zinc</i>-Skala, sodass die Komponenten ohne Theme-Konfiguration angenehm nebeneinander stehen."
    },
    styles: {
      title: "Styles",
      p1: "Importiere das Stylesheet einmal an der Wurzel deiner Anwendung: <c>import '@arcanalabs/ui-components/styles.css'</c>. Es enthält die visuellen Tokens aller Komponenten.",
      p2: "Die Styles sind reines, pro Komponente gescoptes CSS — es gibt keine Style-Engine zur Laufzeit und keine Tailwind-Anforderung im Konsumenten."
    },
    maska: {
      title: "v-maska registrieren",
      p1: "Einige Komponenten (<c>ArcanaInputMask</c>, <c>ArcanaDatePicker</c>) nutzen die Direktive <c>v-maska</c> aus dem Paket <c>maska</c>. Registriere sie einmal global beim Erstellen der App.",
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
  comingSoon: "Die vollständige Dokumentation für diese Komponente kommt in einem späteren Batch. Sie wird bereits für Vue, React, Angular und Svelte veröffentlicht und ist einsatzbereit.",
  frameworkSoon: "// Vue, React, Angular und Svelte liefern dieselbe Komponente — wähle oben ein Framework, um die Verwendung zu sehen.",

  components: {
    button: {
      blurb: "Ein klickbarer Button in fünfzehn semantischen Varianten; Label über den Default-Slot, Klicks über das <c>click</c>-Event."
    },
    badge: {
      blurb: "Eine kompakte Pille für Zähler, Status und Tags — sechs Farben, zwei Größen, optionaler <c>dot</c>- und <c>clickable</c>-Modus."
    },
    input: {
      blurb: "Ein natives <c>&lt;input&gt;</c> mit arcana-Styling und einem zahlenbewussten <c>v-model</c>; Standard-HTML-Attribute werden direkt durchgereicht."
    },
    select: {
      blurb: "Ein vollständig eigenes Select (ohne Element Plus), ins <c>&lt;body&gt;</c> teleportiert, mit Einfach-/<c>multiple</c>-Auswahl, <c>searchable</c>, <c>clearable</c> und Tastaturnavigation."
    },
    checkbox: {
      blurb: "Eine binäre Checkbox, die ein echtes natives <c>&lt;input type=\"checkbox\"&gt;</c> mit <c>indeterminate</c>-Zustand umschließt; für Einstellungen nimm <c>ArcanaSwitch</c>."
    },
    switch: {
      blurb: "Ein binärer An/Aus-Umschalter (WAI-ARIA-Switch), rot/grün farbcodiert, mit optionaler versteckter Checkbox für native Formulare."
    },
    tabs: {
      blurb: "Eigene Tabs, gesteuert über ein <c>tabs</c>-Array und <c>v-model</c>, mit sechs Varianten von Pills bis zur vollständigen Sidebar-Navigation."
    },
    dialog: {
      blurb: "Ein Modal im arcana-Stil mit ref-basierter <c>show()</c>/<c>hide()</c>-API — teleportiert ins <c>&lt;body&gt;</c>, fängt den Fokus und schließt bei Escape."
    },
    inputMask: {
      blurb: "Ein maskiertes Texteingabefeld auf <c>v-maska</c>, dessen <c>v-model</c> stets den <b>rohen</b> Wert hält (CPF, CNPJ, Telefon…); erfordert global registriertes <c>v-maska</c>."
    },
    inputBoolean: {
      blurb: "Ein Ja/Nein-Select für boolesche Felder, das <c>true</c>/<c>false</c>/<c>null</c> normalisiert, mit Status- und SQL-artigen Label-Varianten."
    },
    numberStepper: {
      blurb: "Ein Zahlenfeld, flankiert von <c>−</c>/<c>+</c>-Buttons, die <c>min</c>/<c>max</c>/<c>step</c> und die Pfeiltasten respektieren."
    },
    multiSelectPopover: {
      blurb: "Ein ins Body teleportiertes Popover mit getabbter Checkbox-Mehrfachauswahl; das <c>v-model</c> ist eine <c>{ [tabKey]: number[] }</c>-Map, jeder Tab per asynchronem <c>fetch()</c> gespeist."
    },
    radioCardGroup: {
      blurb: "Auswählbare Karten auf Basis echter <c>&lt;input type=\"radio\"&gt;</c>, jede mit Beschreibung, Icon oder Badge; angeordnet gestapelt, <c>inline</c> oder in <c>columns</c>."
    },
    segmentedOptions: {
      blurb: "Ein Segmented Control für N sich gegenseitig ausschließende Optionen in einer Kapsel, mit Icons je Option und Deaktivierung."
    },
    datePicker: {
      blurb: "Ein Datumsfeld im arcana-Stil, das ein maskiertes <c>DD/MM/AAAA</c>-Eingabefeld mit einem Kalender-Popover verbindet; das <c>v-model</c> ist ein ISO-String <c>YYYY-MM-DD</c>."
    },
    inputCurrency: {
      blurb: "Ein Währungsfeld (auf <c>v-money3</c>), das während der Eingabe formatiert, mit konfigurierbaren Nachkommastellen und <c>min</c>/<c>max</c>-Begrenzung; standardmäßig BRL."
    },
    accordion: {
      blurb: "Der Container für einklappbare <c>ArcanaAccordionItem</c>s, der ein <c>v-model</c> für Einzel- oder Mehrfach-Öffnen-Modus bindet."
    },
    accordionItem: {
      blurb: "Ein einzelnes einklappbares Panel innerhalb eines <c>ArcanaAccordion</c>, identifiziert durch einen <c>name</c>, mit <c>title</c>-Header und Slot-Inhalt."
    },
    dropdown: {
      blurb: "Ein Dropdown-Menü im arcana-Stil, das ins <c>&lt;body&gt;</c> teleportiert, sich automatisch positioniert und bei Außenklick, Escape oder Auswahl schließt."
    },
    dropdownItem: {
      blurb: "Eine Zeile innerhalb eines <c>ArcanaDropdown</c> — optionales <c>icon</c>, Label und <c>suffix</c> — färbbar, mit einer <c>divided</c>-Trennlinie für destruktive Aktionen."
    },
    table: {
      blurb: "Eine statische Tabelle im arcana-Stil für Arrays im Speicher; Spalten deklarieren <c>{ key, label, width?, align?, valueGetter? }</c>, mit Zell- und Footer-Slots."
    },
    specSheet: {
      blurb: "Ein schreibgeschütztes, redaktionelles \"Spec Sheet\" für formale Datensätze, mit <c>docNum</c>-Eyebrow, einem <c>title</c> und Abschnitts-Kindern."
    },
    specSheetSection: {
      blurb: "Ein Abschnitt innerhalb eines <c>ArcanaSpecSheet</c> — Akzent-<c>icon</c>, <c>title</c> und <c>sectionNum</c> über einem <c>columns</c>-Raster aus Feldern."
    },
    specSheetField: {
      blurb: "Ein einzelnes Label/Wert-Paar; ein leerer Wert zeigt <c>emptyText</c>, sodass Lücken als beabsichtigt lesbar sind, und <c>span</c> verbreitert es."
    },
    summaryTiles: {
      blurb: "Der responsive Rastercontainer für KPI-Kacheln; setze <c>columns</c> (Standard 3), klappt unter 880px auf eine Spalte zusammen."
    },
    summaryTile: {
      blurb: "Eine kompakte KPI-Statistik im Layout <c>[icon] [label + sub] [value]</c>, in vier schnell erfassbaren <c>tone</c>s."
    },
    settingsList: {
      blurb: "Ein Container im iOS-Einstellungen-Stil aus haarlinien-getrennten Zeilen, jede mit Label + Caption und einem rechtsbündigen Steuerelement."
    },
    settingsListGroup: {
      blurb: "Ein betitelter, optional <c>collapsible</c>-Abschnitt innerhalb eines <c>ArcanaSettingsList</c>, mit Icon, <c>sectionNum</c> und <c>meta</c>."
    },
    settingsListItem: {
      blurb: "Eine einzelne Einstellungszeile — <c>label</c> + <c>caption</c> links, dein Steuerelement rechts."
    },
    settingsEditableField: {
      blurb: "Eine smarte Zeile, die einen schreibgeschützten Wert, einen \"Alterar\"-Button und sein Bearbeiten-Modal in einem Tag vereint (<c>text</c>/<c>currency</c>/<c>number</c>/<c>select</c>)."
    },
    notice: {
      blurb: "Ein Inline-Banner in sechs semantischen Varianten mit passenden Icons, optional <c>dismissible</c>, für Hinweise und nicht-blockierende Fehler."
    },
    editFieldModal: {
      blurb: "Ein generischer, ref-gesteuerter \"Alterar X\"-Modal-Wrapper, der das Chrome liefert und das Feld-Eingabefeld über seinen Slot aufnimmt."
    },
    requiredFieldsDialog: {
      blurb: "Ein bernsteinfarbener Dialog, der die noch fehlenden Pflichtfelder eines mehrstufigen Formulars auflistet, jeder Hinweis weist auf den zu korrigierenden Schritt."
    },
    onboardingPanel: {
      blurb: "Ein poliertes Empty-State-/CTA-Panel für die Erstkonfiguration — Gradient-Icon, Titel, Beschreibung und eine primäre Handlungsaufforderung."
    },
    loadingOverlay: {
      blurb: "Ein begrenztes Spinner-Overlay über einem verschwommenen Hintergrund, das den nächsten positionierten Vorfahren bedeckt; schalte es mit <c>visible</c>."
    },
    skeleton: {
      blurb: "Ein schimmernder Platzhalterblock für Ladezustände; setze <c>width</c>/<c>height</c>, wähle ein <c>rounded</c>-Preset, respektiert Reduced-Motion."
    },
    switchCard: {
      blurb: "Ein wirkungsstarker Full-Width-Toggle, der die ganze Karte im An-Zustand smaragdgrün färbt — reserviere ihn für gewichtige Einstellungen."
    },
    switchRow: {
      blurb: "Ein Full-Width-Einstellungszeilen-Toggle — Titel + Beschreibung links, ein kompakter Switch rechts, die ganze Zeile klickbar."
    },
    switchSegmented: {
      blurb: "Ein binärer Toggle in Form einer segmentierten Kapsel mit gleitendem Indikator, der sich als \"A oder B\" statt an/aus liest."
    }
  }
};
