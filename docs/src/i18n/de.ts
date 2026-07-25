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
    treeSelect: {
      blurb: "Ein Select, dessen Panel eine durchsuchbare Hierarchie ist — wähle einen Knoten aus dem Baum (Kostenstellen, Kategorien), einzeln oder mehrfach, standardmäßig nur Blätter."
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
  },

  demos: {
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
    cpfRaw: "CPF (roh)",
    phoneRaw: "Telefon (roh)",

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
    payPix: "Pix",
    payPixDesc: "Sofort, keine Gebühren.",
    payPixBadge: "Empfohlen",
    payBoleto: "Boleto",
    payBoletoDesc: "Fällig in 3 Werktagen.",
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
    specSheetRegistrationData: "Registrierungsdaten",
    specSheetLegalName: "Firmenname",
    specSheetStateRegistration: "Staatliche Registrierung",
    specSheetContact: "Kontakt",
    specSheetPhone: "Telefon",
    specSheetEmail: "E-Mail",
    specSheetChangeData: "Daten ändern",
    specSheetFinancial: "Finanzen",
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
    noticeManualPaymentBody: "Pix und Boleto erzeugen in jedem Zyklus einen neuen Zahlungslink.",
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
    requiredCnpjHint: "Schritt 1 · Registrierungsdaten",
    requiredPhoneHint: "Schritt 2 · Kontakt",
    requiredDeliveryAddress: "Lieferadresse",
    requiredDeliveryAddressHint: "Schritt 3 · Logistik",

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
    treeAdministrative: "Verwaltung",
    treeHr: "Personal",
    treeFinance: "Finanzen",
    treeOperations: "Betrieb",
    treeLogistics: "Logistik",
    treeFleet: "Fuhrpark",
    treeWarehouse: "Lager",
    treeCommercial: "Vertrieb",
    treePickOne: "Kostenstelle wählen",
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
    statusOpen: "Offen",
    statusConfirmed: "Bestätigt",
    statusShipped: "Versandt",
    statusDelivered: "Zugestellt",
    statusCanceled: "Storniert",
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
    rcNfeModel: "NF-e",
    rcNfeModelDesc: "Warenrechnung",
    rcNfceModel: "NFC-e",
    rcNfceModelDesc: "Verbraucherbeleg",
    rcFreightSender: "Absender",
    rcFreightSenderDesc: "Fracht vom Verkäufer bezahlt",
    rcFreightRecipient: "Empfänger",
    rcFreightRecipientDesc: "Fracht bei Lieferung bezahlt"

  }
};
