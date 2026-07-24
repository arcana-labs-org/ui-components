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
    },
    table: {
      blurb: "Eine statische Tabelle im shadcn-Stil für Arrays, die du bereits im Speicher hast (anders als <c>SparkGrid</c>, das per Backend fetcht und paginiert). Spalten deklarieren <c>{ key, label, width?, align?, valueGetter? }</c>; ein <c>#cell-&lt;key&gt;</c>-Slot übernimmt das Rendering jeder Zelle, und ein <c>#footer</c>-Slot füllt ein <c>&lt;tfoot&gt;</c> für Summen."
    },
    specSheet: {
      blurb: "Ein schreibgeschütztes, redaktionelles \"Spec Sheet\" für formale Datensätze — denk an offizielle Akten und Datenblätter. Ein Mono-<c>docNum</c>-Eyebrow sitzt über dem <c>title</c> und einem optionalen <c>meta</c>-Badge; die <c>&lt;ShadcnSpecSheetSection&gt;</c>-Kinder halten die Felder, ein <c>#footer</c>-Slot trägt die Bearbeitungsaktionen. Setze <c>flat</c>, um das Karten-Chrome zu entfernen, wenn du es in eine andere Karte einbettest."
    },
    specSheetSection: {
      blurb: "Ein Abschnitt innerhalb eines <c>ShadcnSpecSheet</c>: ein optionales, gerahmtes Akzent-<c>icon</c> (acht Farben) + <c>title</c> + ein rechtsbündiges <c>sectionNum</c>, über einem konfigurierbaren <c>columns</c>-Raster aus <c>&lt;ShadcnSpecSheetField&gt;</c>. Ein <c>#actions</c>-Slot beherbergt Header-Buttons; <c>noRowDividers</c> und <c>compact</c> justieren das Layout."
    },
    specSheetField: {
      blurb: "Ein einzelnes Label/Wert-Paar innerhalb eines Abschnitts. Das <c>label</c> erscheint in Mono-Großbuchstaben, der <c>value</c> in Inter; ein leerer Wert (<c>null</c>/<c>undefined</c>/'') zeigt <c>emptyText</c> kursiv gedämpft, sodass Lücken als beabsichtigt lesbar sind. Nutze <c>span</c>, um ein Feld zu verbreitern, oder den Default-Slot für Badges, Links und andere reiche Werte."
    },
    summaryTiles: {
      blurb: "Der responsive Rastercontainer für eine Reihe von KPI-Kacheln. Setze <c>columns</c> (Standard 3); unter 880px klappt er stets auf eine einzige Spalte zusammen. Füge so viele <c>&lt;ShadcnSummaryTile&gt;</c>-Kinder ein, wie du brauchst."
    },
    summaryTile: {
      blurb: "Eine kompakte KPI-Statistik im Layout <c>[Icon] [label + sub] [Wert]</c> mit ~52px Höhe. Vier <c>tone</c>s — <c>neutral</c>, <c>positive</c>, <c>negative</c>, <c>indigo</c> — färben sie zur schnellen Erfassung. Die Slots <c>#value</c> und <c>#sub</c> überschreiben die einfachen Props für Inline-Badges oder reichere Inhalte."
    },
    settingsList: {
      blurb: "Ein Container im iOS-Einstellungen-Stil: Zeilen durch Haarlinien getrennt, jede mit Label + Caption links und einem Steuerelement rechts. Fülle ihn mit <c>&lt;ShadcnSettingsListItem&gt;</c>, <c>&lt;ShadcnSettingsListGroup&gt;</c> oder dem smarten <c>&lt;ShadcnSettingsEditableField&gt;</c>."
    },
    settingsListGroup: {
      blurb: "Ein betitelter Abschnitt innerhalb eines <c>ShadcnSettingsList</c> zum Gruppieren verwandter Zeilen. Der Header trägt ein optionales gerahmtes <c>icon</c> (acht Farben), ein <c>sectionNum</c> und ein rechtsbündiges <c>meta</c>. Setze <c>collapsible</c>, um den Header zu einem Toggle zu machen (mit <c>defaultCollapsed</c>), und <c>compact</c> für dichtere Abstände."
    },
    settingsListItem: {
      blurb: "Eine einzelne Zeile eines <c>ShadcnSettingsList</c>: <c>label</c> + <c>caption</c> links, dein Steuerelement im Default-Slot rechts. Der <c>#label</c>-Slot erlaubt ein inline eingebettetes Status-Badge; <c>nested</c> wendet Sub-Item-Styling für Toggles an, die nur zählen, wenn ein Elternteil aktiv ist; <c>disabled</c> dimmt und sperrt die Zeile."
    },
    settingsEditableField: {
      blurb: "Eine smarte Zeile, die einen schreibgeschützten Wert, einen \"Alterar\"-Button und sein Bearbeiten-Modal in einem Tag vereint. Wähle einen <c>type</c> — <c>text</c>, <c>currency</c>, <c>number</c> oder <c>select</c> — und sie rendert das passende Eingabefeld in einem teleportierten Modal. Änderungen werden gepuffert: Abbrechen verwirft sie, Speichern emittiert sowohl <c>update:modelValue</c> als auch <c>save</c> (für Auto-Save)."
    },
    sparkGridEmptyState: {
      blurb: "Ein Wrapper, der den Inhalt eines Grids gegen ein <c>ShadcnOnboardingPanel</c> tauscht, wenn es wirklich nichts zu zeigen gibt. Er wartet, bis <c>loading</c> sich beruhigt (true → false), und zeigt das Panel nur, wenn <c>total</c> 0 ist und kein Filter aktiv ist — so behält eine leer gefilterte Liste ihre Toolbar. Er emittiert <c>panel-visible</c>, damit der Host Header-Aktionen ausblenden kann."
    },
    notice: {
      blurb: "Ein Inline-Banner mit semantischen Varianten — <c>info</c>, <c>blue</c>, <c>success</c>, <c>warning</c>, <c>pending</c> und <c>destructive</c> — jede mit einem passenden Standard-Icon. Nutze es für kontextuelle Hinweise, Status-Karten und nicht-blockierende Fehler. Füge <c>dismissible</c> für einen Schließen-Button hinzu, der <c>dismiss</c> emittiert; Titel, Body und Icon lassen sich alle per Slot überschreiben."
    },
    editFieldModal: {
      blurb: "Ein generischer \"Alterar X\"-Modal-Wrapper für Einstellungslisten. Er liefert das Chrome (Header, Footer, Speichern/Abbrechen) und nimmt das Feld-Eingabefeld über seinen Default-Slot auf, sodass eine Komponente jede editierbare Zeile bedient statt einer Datei pro Modal. Er ist ref-gesteuert (<c>show()</c> / <c>hide()</c>) und emittiert <c>save</c> ohne automatisches Schließen, damit du zuerst validieren kannst."
    },
    requiredFieldsDialog: {
      blurb: "Ein bernsteinfarbener Warndialog, der die noch fehlenden Pflichtfelder eines mehrstufigen Formulars auflistet. Übergib ein <c>fields</c>-Array aus <c>{ key, label, hint }</c> — jeder <c>hint</c> weist auf den zu korrigierenden Schritt — und öffne ihn per ref (<c>show()</c>). Er ersetzt das alte Muster \"ein <c>Alert.info</c> nach dem anderen\" durch eine einzige, überschaubare Liste."
    },
    onboardingPanel: {
      blurb: "Ein poliertes Empty-State-/CTA-Panel für die Erstkonfiguration: ein Gradient-Icon in pulsierenden Ringen, Titel + Beschreibung, eine primäre CTA sowie ein optionaler Sekundär-Button und Footer-Hinweis. Steuere alles über Props, oder greife zu den Slots <c>#action</c> und <c>#sub-hint</c> für eigene Buttons und reichen Text. Es emittiert <c>action</c> / <c>secondary-action</c>."
    },
    loadingOverlay: {
      blurb: "Ein begrenztes Lade-Overlay — Spinner + Text über einem durchscheinenden, verschwommenen Hintergrund, der den nächsten positionierten Vorfahren bedeckt (der Elternteil braucht <c>position: relative</c>). Schalte es mit <c>visible</c> für asynchrones Feedback auf Karten- oder Abschnittsebene statt eines Vollbild-Loaders."
    },
    skeleton: {
      blurb: "Ein schimmernder Platzhalterblock für Ladezustände. Setze <c>width</c> / <c>height</c> auf beliebige CSS-Werte und wähle ein <c>rounded</c>-Preset (<c>full</c> für Avatare). Er ist <c>aria-hidden</c> (rein visuell) und respektiert <c>prefers-reduced-motion</c> — der Schimmer stoppt, der Block bleibt. Bevorzuge ihn gegenüber Fake-Platzhaltern, die flackern, wenn echte Daten eintreffen."
    },
    switchCard: {
      blurb: "Ein wirkungsstarker Full-Width-Toggle: eingeschaltet wird die ganze Karte smaragdgrün mit einem invertierten internen Switch — du liest ihren Zustand aus der Ferne. Reserviere ihn für gewichtige Einstellungen (2FA, Wartungsmodus, Premium-Features). Ein gerahmtes <c>icon</c>, <c>title</c> und die Mono-Zeilen <c>statusOn</c>/<c>statusOff</c> beschreiben ihn."
    },
    switchRow: {
      blurb: "Ein Full-Width-\"Einstellungszeilen\"-Toggle: Titel + optionale Beschreibung links, ein kompakter Switch rechts, und die ganze Zeile ist klickbar für eine großzügige Touch-Fläche. Er ist der ruhige Mittelweg zwischen einem nackten <c>ShadcnSwitch</c> und dem lauten <c>ShadcnSwitchCard</c> — ideal für Listen verwandter Präferenzen."
    },
    switchSegmented: {
      blurb: "Ein binärer Toggle in Form einer segmentierten Kapsel: zwei klickbare Hälften mit einem gleitenden Indikator, sodass er sich als \"A oder B\" statt an/aus liest. Ideal für beschriftete Entweder-Oder-Entscheidungen (monatlich / jährlich, Sandbox / Produktion). <c>compact</c> und <c>squared</c> justieren die Geometrie, <c>activeColor</c> färbt den Indikator um, und Pfeiltasten wechseln zwischen den Seiten."
    }
  }
};
