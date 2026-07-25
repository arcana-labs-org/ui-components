import type { Messages } from "./types";

export const de: Messages = {
  meta: { htmlLang: "de", locale: "de-DE" },
  langName: "Deutsch",

  shell: {
    kicker: "Dokumentation · v{version}",
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
      p2: "Die Farben stammen aus 12-stufigen Skalen nach dem Radix-Modell; Akzent und Neutralton lassen sich per Klasse am Wurzelelement tauschen — siehe den Abschnitt <b>Farben</b> weiter unten."
    },
    styles: {
      title: "Styles",
      p1: "Importiere das Stylesheet einmal an der Wurzel deiner Anwendung: <c>import '@arcanalabs/ui-components/styles.css'</c>. Es enthält die visuellen Tokens aller Komponenten.",
      p2: "Die Styles sind reines, pro Komponente gescoptes CSS — es gibt keine Style-Engine zur Laufzeit und keine Tailwind-Anforderung im Konsumenten."
    },
    palette: {
      title: "Farben",
      p1: "Farbe ist ein 12-stufiges System nach dem Radix-Modell: Jede Stufe hat eine feste Aufgabe — Stufe 1 ist der App-Hintergrund, Stufe 9 die deckende Fläche, mit der sich eine Komponente selbst füllt, Stufe 12 der Text mit dem höchsten Kontrast. Die Bibliothek liefert 31 Skalen in Hell und Dunkel, jede mit Alpha-Variante, sodass ein Token überall dasselbe bedeutet.",
      p2: "Die Palette zu wechseln ist eine Klasse am Wurzelelement: <c>.arcana-accent-violet</c> wählt den Akzent, <c>.arcana-gray-slate</c> den Neutralton und <c>.arcana-dark</c> den Dunkelmodus. Komponenten lesen ausschließlich semantische Tokens — sie ziehen also alle mit, ohne dass du einen einzigen Stil anfassen musst."
    },
    deps: {
      title: "Abhängigkeiten",
      p1: "Die Tabelle wird aus der <c>package.json</c> des Pakets selbst erzeugt und ist damit nie veraltet. <b>Runtime</b>-Einträge werden mit der Bibliothek installiert. <b>Peer</b>-Einträge stellt Ihre Anwendung bereit — die Bibliothek deklariert nur, was sie erwartet, und bündelt es nicht.",
      p2: "Jede Peer hier ist <b>optional</b>: Installieren Sie nur das Framework, das Sie verwenden, plus die Extras für die Funktionen, die Sie rendern. Bei der Installation bricht nichts, wenn Sie eine auslassen — verlangt wird sie von der Komponente, die sie braucht."
    },
    maska: {
      title: "v-maska installieren",
      p1: "Die Komponente <c>ArcanaInputMask</c> nutzt die Direktive <c>v-maska</c> aus dem Paket <c>maska</c>. Es ist eine <b>optionale Peer-Dependency</b>: Installieren Sie es zusammen mit der Bibliothek und registrieren Sie es einmalig global beim Erstellen der App.",
      p2: "Komponenten ohne Maskierung brauchen keine zusätzliche Einrichtung — dieser Schritt ist nur nötig, wenn Sie ein maskiertes Eingabefeld rendern."
    }
  },

  palette: {
    accentLabel: "Akzent",
    grayLabel: "Neutral",
    darkLabel: "Dunkelmodus",
    scaleCaption: "Die 12 Stufen von {scale}",
    previewTitle: "Echte Komponenten unter der gewählten Palette",
    hint: "Jede Komponente liest semantische Tokens — ein Klassenwechsel an der Wurzel thematisiert die ganze Seite neu."
  },

  dependencies: {
    colPackage: "Paket",
    colVersion: "Version",
    colKind: "Art",
    colPurpose: "Wofür",
    kindRuntime: "Runtime",
    kindPeer: "Peer",
    kindPeerOptional: "Peer · optional",
    note: "Runtime-Abhängigkeiten landen in Ihrem Bundle. Optionale Peers zählen nur, wenn Sie die Komponente rendern, die sie nutzt."
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
    treeSelect: {
      blurb: "Ein Select, dessen Panel eine durchsuchbare Hierarchie ist — wähle einen Knoten aus dem Baum (Abteilungen, Kategorien), einzeln oder mehrfach, standardmäßig nur Blätter."
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
      blurb: "Ein maskiertes Texteingabefeld auf <c>v-maska</c>, dessen <c>v-model</c> stets den <b>rohen</b> Wert hält (Telefon, Kartennummer, PLZ…); erfordert global registriertes <c>v-maska</c>."
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
    },

    // ── Batch 4 ──
    rate: {
      blurb: "Eine Sternebewertung über <c>v-model</c> — <c>allowHalf</c> für halbe Sterne, <c>showScore</c> oder <c>texts</c> für eine Beschriftung und <c>readonly</c> für Durchschnittswerte."
    },
    avatar: {
      blurb: "Ein Benutzer-Avatar mit vierstufigem Fallback — Bild, <c>initials</c>, <c>icon</c>, Silhouette — in fünf benannten Größen oder einem exakten Pixelwert."
    },
    avatarGroup: {
      blurb: "Überlappende Avatare aus einem <c>avatars</c>-Array oder aus Kindelementen, mit einer <c>+N</c>-Überlaufblase und <c>spacing</c> statt Überlappung, wenn nötig."
    },
    statistic: {
      blurb: "Eine formatierte KPI-Zahl mit <c>precision</c>, locale-bewussten Trennzeichen, <c>prefix</c>/<c>suffix</c>, Icon und fünf semantischen <c>tone</c>s."
    },
    countdown: {
      blurb: "Ein laufender Countdown auf einen Zeitpunkt, mit token-basiertem <c>format</c> (<c>D H m s S</c>), <c>paused</c>-Steuerung und <c>finish</c>-Event."
    },
    progress: {
      blurb: "Ein Fortschrittsbalken als <c>solid</c> oder <c>soft</c>; <c>null</c> als Wert ergibt die unbestimmte Endlosschleife, und der <c>value</c>-Slot übernimmt die Beschriftung."
    },
    aspectRatio: {
      blurb: "Eine Box aus reinem CSS, die jedes Kind auf einem festen <c>ratio</c> hält — Bilder, iframes, Karten oder Video — ganz ohne JavaScript."
    },
    scrollArea: {
      blurb: "Ein Scroll-Container mit gestylten, sich selbst ausblendenden Scrollbars auf beiden Achsen, begrenzt durch <c>height</c> oder <c>maxHeight</c>."
    },
    hoverCard: {
      blurb: "Ein reichhaltiges Vorschau-Panel, das nach <c>openDelay</c> bei Hover oder Fokus öffnet, positioniert über <c>side</c>/<c>align</c> oder die Kurzform <c>placement</c>."
    },
    contextMenu: {
      blurb: "Ein Rechtsklick-Menü aus einem <c>items</c>-Array (Icons, Suffixe, <c>danger</c>-Varianten, Trenner) oder aus Kindelementen komponiert."
    }
  },

  demos: {
    depMoment: "Datums-Parsing und -Formatierung hinter ArcanaDatePicker.",
    depVMoney: "Währungsmaske in ArcanaInputCurrency (Vue).",
    depMaska: "Eingabemaske in ArcanaInputMask; in Vue die Direktive mit app.use(Maska) registrieren.",
    depVue: "Nur für den /vue-Einstiegspunkt nötig.",
    depReact: "Nur für den /react-Einstiegspunkt nötig.",
    depReactDom: "Nur für den /react-Einstiegspunkt nötig.",
    depAngular: "Nur für den /angular-Einstiegspunkt nötig.",
    depSvelte: "Nur für den /svelte-Einstiegspunkt nötig.",
    depFontAwesome: "Icon-Klassen (fa-solid fa-*), die von den Icon-Props genutzt werden.",
    // ── shared ──
    lastAction: "letzte Aktion",
    timesSuffix: "Mal",
    disabledLabel: "Deaktiviert",

    // ── button ──
    btnPrimary: "Primär",
    btnSecondary: "Sekundär",
    btnOutline: "Umriss",
    btnGhost: "Ghost",
    btnSuccess: "Erfolg",
    btnIndigo: "Indigo",
    btnDestructive: "Destruktiv",
    btnOutlineDanger: "Umriss Gefahr",
    primaryClickedPrefix: "Geklickt",

    // ── badge ──
    badgeNeutral: "neutral",
    badgeBlue: "blau",
    badgeGreen: "grün",
    badgeRed: "rot",
    badgeAmber: "bernstein",
    badgeViolet: "violett",
    badgeActive: "Aktiv",
    badgeOffline: "Offline",
    badgeSmSize: "sm Größe",
    badgeClickable: "klickbar",

    // ── input ──
    quantity: "Menge",
    inputReadonly: "Schreibgeschützt",
    inputLockedValue: "Gesperrter Wert",
    inputEmailLabel: "E-Mail",
    inputQtyLabel: "Menge",

    // ── select ──
    selectPickFruit: "Obst auswählen",
    selectPickSeveral: "Mehrere auswählen",
    fruitApple: "Apfel",
    fruitBanana: "Banane",
    fruitCherry: "Kirsche",
    fruitCherryDesc: "saisonal",
    fruitDurian: "Durian",
    fruitElderberry: "Holunderbeere",
    selectSingleLabel: "einzeln",
    selectMultipleLabel: "mehrfach",

    // ── checkbox ──
    checkboxSelectAll: "Alle auswählen",
    checkboxInvoices: "Rechnungen",
    checkboxReceipts: "Belege",
    checkboxStatements: "Kontoauszüge",
    checkboxArchivedDisabled: "Archiviert (deaktiviert)",

    // ── switch ──
    switchNotifications: "Benachrichtigungen",
    switchBetaFeatures: "Beta-Funktionen",

    // ── tabs ──
    tabOverview: "Übersicht",
    tabActivity: "Aktivität",
    tabSettings: "Einstellungen",
    tabOverviewPanel: "Das Übersichtsfeld ist aktiv.",
    tabActivityPanel: "3 neue Einträge in Aktivität.",
    tabSettingsPanel: "Passen Sie hier Ihre Einstellungen an.",

    // ── dialog ──
    dialogOpen: "Dialog öffnen",
    dialogTitle: "Arbeitsbereich löschen",
    dialogDescription: "Diese Aktion kann nicht rückgängig gemacht werden.",
    dialogBody: "Das Entfernen dieses Arbeitsbereichs löscht jedes Projekt und jede Einladung darin. Geben Sie den Namen zur Bestätigung in einem echten Formular ein — hier schließen Sie einfach den Dialog.",
    dialogCancel: "Abbrechen",
    dialogDelete: "Löschen",

    // ── input mask ──
    maskPhone: "Telefon",
    maskCard: "Kartennummer",
    phoneRaw: "Telefon (roh)",
    cardRaw: "Karte (roh)",

    // ── input boolean ──
    boolYesNo: "Ja / Nein",
    boolHasValue: "Hat Wert?",
    boolYesNoLabel: "ja/nein",
    boolStatusLabel: "Status",
    boolNullableLabel: "nullbar",

    // ── number stepper ──
    stepperQtyLabel: "Menge (0–10)",
    stepperWeightLabel: "Gewicht (Schritt 5)",

    // ── multi-select popover ──
    mspUsers: "Benutzer",
    mspDepartments: "Abteilungen",
    mspSales: "Vertrieb",
    mspSupport: "Support",
    mspEmptyLabel: "Personen oder Abteilungen auswählen",
    mspUsersLabel: "Benutzer",
    mspDepartmentsLabel: "Abteilungen",

    // ── radio card group ──
    payCreditCard: "Kreditkarte",
    payCreditCardDesc: "Automatische wiederkehrende Abbuchung.",
    payBankTransfer: "Banküberweisung",
    payBankTransferDesc: "Sofort, keine Gebühren.",
    payBankTransferBadge: "Empfohlen",
    payInvoice: "Rechnung",
    payInvoiceDesc: "Fällig in 3 Werktagen.",
    payCash: "Barzahlung bei Lieferung",
    selectedLabel: "ausgewählt",

    // ── segmented options ──
    segList: "Liste",
    segGrid: "Raster",
    segBoard: "Board",
    viewLabel: "Ansicht",

    // ── date picker ──
    datePickerValueLabel: "Wert (YYYY-MM-DD)",
    datePickerTypeHint: "DD/MM/AAAA eingeben",

    // ── input currency ──
    priceRaw: "Preis (roh)",

    // ── accordion ──
    accShipping: "Versand",
    accShippingBody: "Versand in 2–3 Werktagen.",
    accReturns: "Rückgabe",
    accReturnsBody: "30 Tage kostenlose Rückgabe, ohne Wenn und Aber.",
    accWarranty: "Garantie (deaktiviert)",
    accWarrantyBody: "Demnächst verfügbar.",
    accOpenSingleLabel: "geöffnet (Einzelmodus)",

    // ── accordion item ──
    accSpecifications: "Spezifikationen",
    accSpecificationsBody: "Gewicht, Abmessungen und Materialien.",
    accCareTitle: "Pflegehinweise",
    accCareBody: "Kalt handwaschen, nicht im Trockner trocknen.",
    accOpenMultipleLabel: "geöffnet (Mehrfachmodus)",

    // ── dropdown ──
    dropdownActions: "Aktionen",
    ddRename: "Umbenennen",
    ddDuplicate: "Duplizieren",
    ddDelete: "Löschen",

    // ── dropdown item ──
    dropdownOpenMenu: "Menü öffnen",
    ddProfile: "Profil",
    ddApprove: "Genehmigen",
    ddFlag: "Markieren",
    ddFlagLabel: "Zur Überprüfung markieren",

    // ── table ──
    colSku: "SKU",
    colProduct: "Produkt",
    colQty: "Menge",
    colTotal: "Gesamt",
    tableLow: "niedrig",
    tableInStock: "auf Lager",
    tableTotalItems: "Gesamt (3 Artikel)",

    // ── settings editable field ──
    editableFieldHintPrefix: "Klicken Sie",
    editableFieldHintSuffix: "in einer beliebigen Zeile, um ihr Bearbeitungsmodal zu öffnen.",

    // ── notice ──
    noticeDismissedHint: "Der destruktive Hinweis wurde geschlossen — laden Sie die Vorschau neu, um ihn zurückzuholen.",

    // ── edit field modal ──
    savedValue: "gespeicherter Wert",

    // ── onboarding panel ──
    onboardingPrimary: "primär",
    onboardingSecondary: "sekundär",

    // ── loading overlay ──
    loadingOverlayHint: "Klicken Sie auf \"Salvar\", um diese Karte für ~1,6 s mit dem Overlay zu bedecken.",

    // ── switch card ──
    switchCard2faLabel: "2FA",
    switchCardMaintenanceLabel: "Wartung",

    // ── switch row ──
    switchRowEmailLabel: "E-Mail",
    switchRowPushLabel: "Push",

    // ── switch segmented ──
    switchSegCycleLabel: "Zyklus",
    switchSegEnvLabel: "Umgebung",

    // ── added: previously-hardcoded PT demo strings (English copy — pending translation) ──
    statusActive: "Aktiv",
    statusLabel: "Status",
    actionChange: "Ändern",

    btnNew: "Neu",
    btnExport: "Exportieren",
    btnDelete: "Löschen",
    btnSave: "Speichern",
    btnSettings: "Einstellungen",
    btnMoreOptions: "Weitere Optionen",
    btnAdd: "Hinzufügen",

    specSheetDocNum: "Datensatz Nr. 042 · Aktualisiert 14.Mar.2026",
    specSheetRegistrationData: "Unternehmensdaten",
    specSheetLegalName: "Firmenname",
    specSheetRegistrationNo: "Registernummer",
    specSheetContact: "Kontakt",
    specSheetPhone: "Telefon",
    specSheetEmail: "E-Mail",
    specSheetChangeData: "Daten ändern",
    specSheetBilling: "Abrechnung",
    specSheetLimit: "Limit",
    specSheetBalance: "Saldo",
    specSheetDueDate: "Fälligkeitsdatum",
    specSheetDueDateValue: "Tag 10",
    specSheetNotes: "Notizen",
    specSheetNotesLabel: "Notizen",
    specSheetNotesValue: "Bevorzugter Kunde seit 2019.",
    specSheetName: "Name",
    specSheetNickname: "Spitzname",
    specSheetNotProvided: "Nicht angegeben",

    tileIncome: "Einnahmen",
    tileIncomeSub: "4 Methoden",
    tileExpenses: "Ausgaben",
    tileExpensesSub: "3 Einträge",
    tileTotal: "Gesamt",
    tileOrders: "Bestellungen",
    tileToday: "heute",
    tileApproved: "Genehmigt",
    tileCanceled: "Storniert",
    tileConversion: "Konversion",

    settingsAdvancedFeatures: "Erweiterte Funktionen",
    settingsAdvancedFeaturesCaption: "Aktiviert interne Funktionen.",
    settingsEmailNotifications: "E-Mail-Benachrichtigungen",
    settingsEmailNotificationsCaption: "Tägliche Zusammenfassung der betrieblichen Aktivitäten.",
    settingsPlan: "Plan",
    settingsPlanCaption: "Für die Organisation aktivierte Funktionen.",
    settingsPlanShortCaption: "Aktivierte Funktionen.",
    settingsTwoConfigs: "2 Einstellungen",
    settingsAcceptOrders: "Bestellungen annehmen",
    settingsAcceptOrdersCaption: "Empfängt neue Bestellungen über die App.",
    settingsAutoConfirm: "Automatische Bestätigung",
    settingsAutoConfirmCaption: "Bestätigt ohne manuelle Prüfung.",
    settingsDelivery: "Lieferung",
    settingsRealtimeTracking: "Echtzeit-Verfolgung",
    settingsSaasCaption: "SaaS-System — Plan über Abonnementtabelle.",
    settingsSubscriptionV2: "Abonnement V2",
    settingsShowWebApp: "Web-App anzeigen",
    settingsShowWebAppCaption: "Untereinstellung der Kreditkarte.",
    settingsUnavailableFeature: "Nicht verfügbare Funktion",
    settingsUnavailableFeatureCaption: "Erfordert einen höheren Plan.",

    planBasic: "Basis",
    planProfessional: "Professionell",
    planEnterprise: "Enterprise",

    editableUnitName: "Einheitsname",
    editableUnitNameCaption: "Wird in Berichten angezeigt.",
    editableFirstPurchaseDiscount: "Erstkaufrabatt",
    editableFirstPurchaseDiscountCaption: "Angewendeter Einheitswert.",

    noticeInfoTitle: "Information",
    noticeInfoBody: "Einstellung automatisch gespeichert.",
    noticeNewTitle: "Was ist neu",
    noticeNewBody: "Das neue Routen-Panel ist jetzt verfügbar.",
    noticeActivatedTitle: "Aktiviert",
    noticeActivatedBody: "Integration erfolgreich abgeschlossen.",
    noticeManualPaymentTitle: "Manuelle Zahlung",
    noticeManualPaymentBody: "Banküberweisung und Rechnung erzeugen in jedem Zyklus einen neuen Zahlungslink.",
    noticePendingTitle: "Warten auf Aktivierung bei Stripe",
    noticePendingBody: "Klicken Sie auf \"Sync\", um das Abonnement im Gateway zu erstellen.",
    noticeErrorTitle: "Laden fehlgeschlagen",
    noticeErrorBody: "Daten konnten nicht abgerufen werden.",

    editDialogChangeName: "Name ändern",
    editDialogTitle: "Name ändern",
    editDialogDescription: "Aktualisieren Sie den Einheitsnamen.",
    editDialogPlaceholder: "Einheitsname",

    requiredValidateForm: "Formular validieren",
    requiredDescription: "Die folgenden Felder müssen vor dem Anlegen des Kunden ausgefüllt werden.",
    requiredTaxIdHint: "Schritt 1 · Unternehmensdaten",
    requiredPhoneHint: "Schritt 2 · Kontakt",
    requiredDeliveryAddress: "Lieferadresse",
    requiredDeliveryAddressHint: "Schritt 3 · Versand",

    onboardingTitle: "Noch keine Projekte hier",
    onboardingDescription: "Erstellen Sie Ihr erstes Projekt, um Ihre Arbeit zu organisieren.",
    onboardingActionLabel: "Projekt erstellen",
    onboardingSecondaryLabel: "Beispiele ansehen",
    onboardingSubHint: "Sie können Ihr Team später einladen.",

    loadingOrderSummary: "Bestellübersicht",
    loadingSavingText: "Wird gespeichert…",

    switchCard2faTitle: "2FA-Authentifizierung",
    switchCard2faStatusOn: "AN · TOTP",
    switchCard2faStatusOff: "AUS",
    switchCardMaintenanceTitle: "Wartungsmodus",

    switchRowEmailDesc: "Tägliche Zusammenfassung der Aktivitäten der Organisation.",
    switchRowPushTitle: "Push-Benachrichtigungen",
    switchRowPushDesc: "Echtzeit-Warnungen auf dem Gerät.",

    switchSegMonthly: "Monatlich",
    switchSegAnnual: "Jährlich · −20%",
    switchSegSandbox: "Sandbox",
    switchSegProduction: "Produktion",

    // ── tree select ──
    treeEngineering: "Engineering",
    treeFrontend: "Frontend",
    treeBackend: "Backend",
    treeMarketing: "Marketing",
    treeContent: "Content",
    treeGrowth: "Growth",
    treeBrand: "Brand",
    treeSales: "Vertrieb",
    treePickOne: "Abteilung wählen",
    treePickSeveral: "Mehrere wählen",
    treeSingleTitle: "Einfachauswahl",
    treeMultipleTitle: "Mehrfachauswahl",
    treeThemedTitle: "Eigenes Theme",
    treeThemedHint: "Icon- und Auswahlfarben über CSS Custom Properties",
    segWithIcons: "Mit Symbolen",
    segColoredIcons: "Farbige Symbole",
    segLow: "Niedrig",
    segMedium: "Mittel",
    segHigh: "Hoch",
    segPriorityLabel: "Priorität",
    selectQuickFilterTitle: "Schnellfilter (Farbpunkte)",
    selectStatusPlaceholder: "Status",
    selectFooterCount: "{count} ausgewählt",
    selectClearLabel: "Zurücksetzen",
    selectStatusLabel: "Status",
    statusTodo: "Zu erledigen",
    statusInProgress: "In Arbeit",
    statusInReview: "In Prüfung",
    statusDone: "Erledigt",
    statusBlocked: "Blockiert",
    accAnimatedTitle: "Animiert",
    accAnimatedHint: "Weiche Höhenanimation; beachtet Reduced Motion",
    segIconOnly: "Nur Symbole",
    segSizes: "Größen (sm · md · lg · xl)",
    segCustomSize: "Eigene Größe",
    segCustomSizeHint: "CSS Custom Properties überschreiben jedes size",
    switchSegWithIcons: "Mit Symbolen",
    switchSegIconOnly: "Nur Symbole",
    switchSegLight: "Hell",
    switchSegDark: "Dunkel",
    rcIconStart: "Symbol am Anfang",
    rcIconEnd: "Symbol am Ende",
    rcRadioEnd: "Radio am Ende",
    rcPersonalAccount: "Privatkonto",
    rcPersonalAccountDesc: "Für die private Nutzung",
    rcBusinessAccount: "Geschäftskonto",
    rcBusinessAccountDesc: "Für Teams und Unternehmen",
    rcShippingStandard: "Standardversand",
    rcShippingStandardDesc: "Ankunft in 5–7 Werktagen",
    rcShippingExpress: "Expressversand",
    rcShippingExpressDesc: "Ankunft am nächsten Werktag",

    // ── rate ──
    rateValueLabel: "Deine Bewertung",
    rateText1: "Schrecklich",
    rateText2: "Schwach",
    rateText3: "Durchschnittlich",
    rateText4: "Gut",
    rateText5: "Ausgezeichnet",
    rateAverageNote: "Durchschnitt aus 128 Bewertungen",
    rateSizeSm: "Klein",
    rateSizeMd: "Mittel",
    rateSizeLg: "Groß",
    rateDisabledNote: "Deaktiviert",

    // ── avatar ──
    avatarFallbackNote: "Ein kaputtes Bild fällt automatisch auf die nächste Stufe zurück.",
    avatarShapeCircle: "Kreis",
    avatarShapeSquare: "Quadrat",
    avatarSizesNote: "Benannte Stufen oder ein exakter Pixelwert",

    // ── avatar group ──
    avatarGroupTeamLabel: "Projektteam",
    avatarGroupOverlapNote: "Überlappend (Standard)",
    avatarGroupSpacingNote: "Mit Abstand",
    avatarGroupCompositionNote: "Komponierte Kindelemente mit explizitem Überlaufzähler",

    // ── statistic ──
    statActiveUsers: "Aktive Nutzer",
    statRevenue: "Monatsumsatz",
    statConversion: "Konversionsrate",
    statOrders: "Bestellungen",
    statChurn: "Abwanderung",
    statUptime: "Verfügbarkeit",
    statPending: "Offene Bewertungen",
    statTickets: "Offene Tickets",
    statLocaleNote: "Dieselbe Zahl, pt-BR-Trennzeichen",

    // ── countdown ──
    countdownFlashSale: "Blitzangebot endet in",
    countdownSessionExpires: "Sitzung läuft ab in",
    countdownMaintenance: "Wartungsfenster",
    countdownToggle: "Pausieren / fortsetzen",
    countdownFinishedNote: "Löst bei null das finish-Event aus.",

    // ── progress ──
    progressUploading: "Wird hochgeladen",
    progressStorage: "Belegter Speicher",
    progressComplete: "Abgeschlossen",
    progressIndeterminateNote: "Keine bekannte Gesamtmenge — der Balken läuft in Schleife.",
    progressCustomLabel: "3 von 5 Schritten",

    // ── aspect ratio ──
    aspectCoverAlt: "Querformat-Fotografie",
    aspectSquareNote: "1 / 1",
    aspectPortraitNote: "3 / 4",
    aspectClassicNote: "4 / 3",
    aspectEmbedNote: "Funktioniert auch mit iframes, Karten und Video",

    // ── scroll area ──
    scrollVerticalNote: "Vertikal, begrenzte Höhe",
    scrollHorizontalNote: "Horizontal",
    scrollBothNote: "Beide Achsen",
    scrollTypeAlways: "Scrollbar immer sichtbar",
    scrollTypeHover: "Scrollbar erscheint beim Hovern",
    scrollItemPrefix: "Element",

    // ── hover card ──
    hoverProfileName: "Dana Whitfield",
    hoverProfileHandle: "@danaw",
    hoverProfileBio: "Leitet Design Systems. Schreibt über Barrierefreiheit und Farbe.",
    hoverProfileFollowers: "1,2 Tsd. Follower",
    hoverSideNote: "Ein Trigger pro Seite",
    hoverDelayInstant: "Sofort",
    hoverDelaySlow: "Langsam (600 ms)",
    hoverDisabledNote: "Deaktiviert — es öffnet sich nichts",

    // ── context menu ──
    contextTriggerNote: "Rechtsklick in diesen Bereich",
    contextOpen: "Öffnen",
    contextRename: "Umbenennen",
    contextDuplicate: "Duplizieren",
    contextShare: "Teilen",
    contextDelete: "Löschen",
    contextArchive: "Archivieren",
    contextDisabledItem: "In Ordner verschieben",
    contextLastAction: "Letzte Aktion",
    contextNoneYet: "noch keine",
    contextDisabledNote: "Deaktiviert — stattdessen erscheint das Browsermenü"

  }
};
