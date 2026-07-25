import type { Messages } from "./types";

export const it: Messages = {
  meta: { htmlLang: "it", locale: "it-IT" },
  langName: "Italiano",

  shell: {
    kicker: "Documentazione · v{version}",
    lead: "Una libreria di componenti tipizzata, in stile shadcn — Vue 3, React, Angular e Svelte, con la stessa API e lo stesso aspetto in qualsiasi framework.",
    brandLib: "UI Components",
    docTitle: "Arcana UI Components",
    searchPlaceholder: "Cerca componenti… (⌘K)",
    searchAria: "Cerca nella documentazione",
    chooseFramework: "Scegli il framework",
    chooseLanguage: "Scegli la lingua",
    openNav: "Apri la navigazione",
    closeNav: "Chiudi la navigazione",
    sidebarAria: "Navigazione della documentazione",
    noSectionsFound: "Nessun componente trovato.",
    previewTab: "Anteprima",
    codeTab: "Codice",
    referenceTab: "Props ed Eventi",
    codeOnlyLabel: "Codice",
    defaultPreviewCaption: "componente dal vivo · interagisci con esso",
    sectionExampleAria: "Esempio di {title}",
    githubStars: "{count} stelle su GitHub",
    npmPackage: "@arcanalabs/ui-components su npm",
    footer: "Arcana UI Components · MIT"
  },

  codeBlock: {
    copy: "Copia",
    copied: "Copiato!"
  },

  categories: {
    gettingStarted: "Per iniziare",
    forms: "Form",
    dataDisplay: "Visualizzazione dati",
    overlay: "Sovrapposizione",
    layoutNav: "Layout e navigazione",
    feedback: "Feedback"
  },

  gettingStarted: {
    install: {
      title: "Installazione",
      p1: "La libreria è distribuita come un unico pacchetto npm. Installala con il gestore che preferisci — <c>vue</c> (3.4+) è l'unica peer dependency.",
      p2: "Ogni componente è pubblicato per tutti e quattro i framework in un subpath dedicato — <c>@arcanalabs/ui-components/vue</c>, <c>/react</c>, <c>/angular</c> e <c>/svelte</c>; importa solo quelli che usi. Le icone usano Font Awesome Free — installa <c>@fortawesome/fontawesome-free</c> e importane il CSS una volta."
    },
    usage: {
      title: "Utilizzo",
      p1: "Importa un componente e inseriscilo nel tuo template. Tutti seguono le stesse convenzioni: <c>v-model</c> per i valori bidirezionali, prop in kebab-case e un evento <c>change</c> accanto a <c>update:modelValue</c>.",
      p2: "Il colore viene da scale a 12 gradini secondo il modello Radix, con accento e neutro sostituibili tramite una classe sull'elemento radice — vedi <b>Colori</b> più sotto."
    },
    styles: {
      title: "Stili",
      p1: "Importa il foglio di stile una sola volta, alla radice della tua applicazione: <c>import '@arcanalabs/ui-components/styles.css'</c>. Contiene i token visivi di tutti i componenti.",
      p2: "Gli stili sono CSS puro, con scope per componente — non c'è alcun motore di stile a runtime né requisito di Tailwind nel consumatore."
    },
    palette: {
      title: "Colori",
      p1: "Il colore è un sistema a 12 gradini secondo il modello Radix: ogni gradino ha un ruolo fisso — il gradino 1 è lo sfondo dell'applicazione, il 9 il riempimento solido con cui il componente si dipinge e il 12 il testo a contrasto massimo. La libreria include 31 scale in chiaro e scuro, ciascuna con variante alpha, così un token significa sempre la stessa cosa ovunque finisca.",
      p2: "Cambiare palette significa mettere una classe sull'elemento radice: <c>.arcana-accent-violet</c> sceglie l'accento, <c>.arcana-gray-slate</c> il neutro e <c>.arcana-dark</c> la modalità scura. I componenti leggono solo token semantici, quindi si adeguano tutti senza toccare un solo stile."
    },
    deps: {
      title: "Dipendenze",
      p1: "La tabella è generata dal <c>package.json</c> del pacchetto, quindi non è mai obsoleta. Quelle di <b>runtime</b> vengono installate insieme alla libreria. Le <b>peer</b> le fornisce la tua app — la libreria dichiara ciò che si aspetta, ma non lo incorpora.",
      p2: "Ogni peer qui è <b>opzionale</b>: installa solo il framework che usi, più gli extra delle funzionalità che rendi. Nulla si rompe in fase di installazione se ne salti una — a richiederla è il componente che ne ha bisogno."
    },
    maska: {
      title: "Maschere",
      p1: "La maschera di input è disponibile in <b>tutti e quattro i framework</b> tramite il pacchetto <c>maska</c>, una <b>peer dependency opzionale</b> — installala quando rendi un <c>ArcanaInputMask</c>. Solo Vue ha un passaggio in più: registrare la direttiva <c>v-maska</c> globalmente una volta.",
      p2: "I componenti che non usano maschere non richiedono configurazione — questo passaggio serve solo se rendi un input mascherato."
    }
  },

  palette: {
    accentLabel: "Accento",
    grayLabel: "Neutro",
    darkLabel: "Modalità scura",
    scaleCaption: "I 12 gradini di {scale}",
    previewTitle: "Componenti reali con la palette selezionata",
    hint: "Ogni componente legge token semantici, quindi cambiare la classe radice ritematizza l'intera pagina."
  },

  dependencies: {
    colPackage: "Pacchetto",
    colVersion: "Versione",
    colKind: "Tipo",
    colPurpose: "Serve per",
    kindRuntime: "runtime",
    kindPeer: "peer",
    kindPeerOptional: "peer · opzionale",
    note: "Le dipendenze di runtime finiscono nel tuo bundle. Le peer opzionali contano solo se rendi il componente che le usa."
  },

  propsTable: {
    name: "Prop",
    type: "Tipo",
    default: "Default",
    description: "Descrizione",
    caption: "Prop",
    eventsTitle: "Eventi emessi"
  },

  demoCaption: "componente dal vivo · interagisci con esso",
  comingSoon: "La documentazione completa di questo componente arriverà in un lotto successivo. È già pubblicato per Vue, React, Angular e Svelte ed è pronto all'uso.",
  frameworkSoon: "// Vue, React, Angular e Svelte offrono lo stesso componente — scegli un framework sopra per vederne l'uso.",

  components: {
    button: {
      blurb: "Un pulsante cliccabile in quindici varianti semantiche; l'etichetta arriva dallo slot di default, i clic tramite l'evento <c>click</c>."
    },
    badge: {
      blurb: "Una pillola compatta per contatori, stati e tag — sei colori, due dimensioni, <c>dot</c> opzionale e modalità <c>clickable</c>."
    },
    input: {
      blurb: "Un <c>&lt;input&gt;</c> nativo con stile shadcn e un <c>v-model</c> consapevole dei numeri; gli attributi HTML standard passano direttamente."
    },
    select: {
      blurb: "Un select completamente personalizzato (senza Element Plus) teletrasportato in <c>&lt;body&gt;</c>, con singola/<c>multiple</c>, <c>searchable</c>, <c>clearable</c> e navigazione da tastiera."
    },
    treeSelect: {
      blurb: "Un select il cui pannello è una gerarchia ricercabile — scegli un nodo dall'albero (reparti, categorie), singolo o multiplo, selezionando solo le foglie per impostazione predefinita."
    },
    checkbox: {
      blurb: "Un checkbox binario che avvolge un <c>&lt;input type=\"checkbox\"&gt;</c> nativo vero con uno stato <c>indeterminate</c>; usa <c>ArcanaSwitch</c> per attivare un'impostazione."
    },
    switch: {
      blurb: "Un toggle binario on/off (switch WAI-ARIA), codificato a colori rosso/verde, con un checkbox nascosto opzionale per i form nativi."
    },
    tabs: {
      blurb: "Tab personalizzate guidate da un array <c>tabs</c> e da un <c>v-model</c>, con sei varianti dalle pillole alla navigazione laterale completa."
    },
    dialog: {
      blurb: "Un modale shadcn con API basata su ref <c>show()</c>/<c>hide()</c> — si teletrasporta in <c>&lt;body&gt;</c>, intrappola il focus e si chiude con Escape."
    },
    inputMask: {
      blurb: "Un input di testo con maschera su <c>v-maska</c> il cui <c>v-model</c> contiene sempre il valore <b>raw</b> (telefono, numero di carta, CAP…); richiede <c>v-maska</c> registrato globalmente."
    },
    inputBoolean: {
      blurb: "Un select sì/no per campi booleani che normalizza <c>true</c>/<c>false</c>/<c>null</c>, con variazioni di etichetta di stato e tipo SQL."
    },
    numberStepper: {
      blurb: "Un input numerico affiancato da pulsanti <c>−</c>/<c>+</c> che rispettano <c>min</c>/<c>max</c>/<c>step</c> e le frecce da tastiera."
    },
    multiSelectPopover: {
      blurb: "Un popover teletrasportato nel body con multi-selezione a checkbox per schede; il <c>v-model</c> è una mappa <c>{ [tabKey]: number[] }</c>, ogni scheda alimentata da un <c>fetch()</c> asincrono."
    },
    radioCardGroup: {
      blurb: "Card selezionabili basate su veri <c>&lt;input type=\"radio\"&gt;</c>, ognuna con descrizione, icona o badge; disponile impilate, <c>inline</c> o in <c>columns</c>."
    },
    segmentedOptions: {
      blurb: "Un controllo segmentato per N opzioni mutuamente esclusive dentro una capsula, con icone e disabilitazione per opzione."
    },
    datePicker: {
      blurb: "Un campo data shadcn che abbina un input con maschera <c>DD/MM/AAAA</c> a un popover calendario; il <c>v-model</c> è una stringa ISO <c>YYYY-MM-DD</c>."
    },
    inputCurrency: {
      blurb: "Un input valuta che formatta da destra a sinistra mentre digiti, con decimali configurabili e vincolo <c>min</c>/<c>max</c>; BRL per impostazione predefinita."
    },
    accordion: {
      blurb: "Il contenitore per <c>ArcanaAccordionItem</c> collassabili, che lega un <c>v-model</c> per la modalità apertura singola o multipla."
    },
    accordionItem: {
      blurb: "Un singolo pannello collassabile dentro un <c>ArcanaAccordion</c>, identificato da un <c>name</c>, con intestazione <c>title</c> e corpo a slot."
    },
    dropdown: {
      blurb: "Un menu a discesa shadcn che si teletrasporta in <c>&lt;body&gt;</c>, si posiziona automaticamente e si chiude al clic esterno, con Escape o alla selezione."
    },
    dropdownItem: {
      blurb: "Una riga dentro un <c>ArcanaDropdown</c> — <c>icon</c>, etichetta e <c>suffix</c> opzionali — colorabile, con un separatore <c>divided</c> per le azioni distruttive."
    },
    table: {
      blurb: "Una tabella shadcn statica per array in memoria; le colonne dichiarano <c>{ key, label, width?, align?, valueGetter? }</c>, con slot per celle e footer."
    },
    specSheet: {
      blurb: "Una \"spec sheet\" editoriale read-only per record formali, con un eyebrow <c>docNum</c>, un <c>title</c> e sezioni figlie."
    },
    specSheetSection: {
      blurb: "Una sezione dentro un <c>ArcanaSpecSheet</c> — <c>icon</c> d'accento, <c>title</c> e <c>sectionNum</c> sopra una griglia di <c>columns</c> di campi."
    },
    specSheetField: {
      blurb: "Una singola coppia label/valore; un valore vuoto mostra <c>emptyText</c> così i vuoti si leggono come intenzionali, e <c>span</c> lo allarga."
    },
    summaryTiles: {
      blurb: "Il contenitore a griglia responsiva per tile KPI; imposta <c>columns</c> (default 3), collassando a una sotto gli 880px."
    },
    summaryTile: {
      blurb: "Uno stat KPI compatto disposto come <c>[icon] [label + sub] [value]</c>, in quattro <c>tone</c> scansionabili."
    },
    settingsList: {
      blurb: "Un contenitore in stile Impostazioni iOS di righe separate da hairline, ognuna con label + caption e un controllo allineato a destra."
    },
    settingsListGroup: {
      blurb: "Una sezione titolata, opzionalmente <c>collapsible</c>, dentro un <c>ArcanaSettingsList</c>, con un'icona, <c>sectionNum</c> e <c>meta</c>."
    },
    settingsListItem: {
      blurb: "Una singola riga di impostazioni — <c>label</c> + <c>caption</c> a sinistra, il tuo controllo a destra."
    },
    settingsEditableField: {
      blurb: "Una riga smart che unisce un valore read-only, un pulsante \"Alterar\" e il suo modal di modifica in un unico tag (<c>text</c>/<c>currency</c>/<c>number</c>/<c>select</c>)."
    },
    notice: {
      blurb: "Un banner inline in sei varianti semantiche con icone coerenti, opzionalmente <c>dismissible</c>, per avvisi ed errori non bloccanti."
    },
    editFieldModal: {
      blurb: "Un wrapper di modal \"Alterar X\" generico guidato da ref che fornisce il chrome e riceve l'input del campo tramite il suo slot."
    },
    requiredFieldsDialog: {
      blurb: "Un dialog ambra che elenca i campi obbligatori ancora mancanti in un form multi-step, ogni suggerimento indica il passo da correggere."
    },
    onboardingPanel: {
      blurb: "Un pannello empty-state / CTA curato per la prima configurazione — icona in gradiente, titolo, descrizione e una call to action primaria."
    },
    loadingOverlay: {
      blurb: "Un overlay spinner con ambito ristretto su uno sfondo sfocato, che copre l'antenato posizionato più vicino; attivalo con <c>visible</c>."
    },
    skeleton: {
      blurb: "Un blocco placeholder con shimmer per stati di caricamento; imposta <c>width</c>/<c>height</c>, scegli un preset <c>rounded</c>, rispetta reduced-motion."
    },
    switchCard: {
      blurb: "Un toggle full-width ad alto impatto che rende l'intera card smeraldo quando è attivo — riservalo a impostazioni di peso."
    },
    switchRow: {
      blurb: "Un toggle riga di impostazioni full-width — titolo + descrizione a sinistra, uno switch compatto a destra, l'intera riga cliccabile."
    },
    switchSegmented: {
      blurb: "Un toggle binario a forma di capsula segmentata con un indicatore scorrevole, che si legge come \"A o B\" invece che on/off."
    },

    // ── Batch 4 ──
    rate: {
      blurb: "Una valutazione a stelle guidata da <c>v-model</c> — <c>allowHalf</c> per le mezze stelle, <c>showScore</c> o <c>texts</c> per una didascalia e <c>readonly</c> per le medie."
    },
    avatar: {
      blurb: "Un avatar utente con fallback a quattro passi — immagine, <c>initials</c>, <c>icon</c>, silhouette — in cinque taglie nominate o un valore esatto in pixel."
    },
    avatarGroup: {
      blurb: "Avatar sovrapposti da un array <c>avatars</c> o dai figli, con una bolla di eccedenza <c>+N</c> e <c>spacing</c> al posto della sovrapposizione quando serve."
    },
    statistic: {
      blurb: "Un numero KPI formattato con <c>precision</c>, separatori consapevoli del locale, <c>prefix</c>/<c>suffix</c>, icona e cinque <c>tone</c> semantici."
    },
    countdown: {
      blurb: "Un conto alla rovescia dal vivo verso un istante, con <c>format</c> a token (<c>D H m s S</c>), controllo <c>paused</c> ed evento <c>finish</c>."
    },
    progress: {
      blurb: "Una barra di avanzamento in <c>solid</c> o <c>soft</c>; passa <c>null</c> come valore per il ciclo indeterminato, oppure prendi il controllo dell'etichetta con lo slot <c>value</c>."
    },
    aspectRatio: {
      blurb: "Un box in puro CSS che mantiene qualsiasi figlio a un <c>ratio</c> fisso — immagini, iframe, mappe o video — senza JavaScript."
    },
    scrollArea: {
      blurb: "Un contenitore di scorrimento con barre stilizzate che si nascondono da sole, su entrambi gli assi, limitato da <c>height</c> o <c>maxHeight</c>."
    },
    hoverCard: {
      blurb: "Un pannello di anteprima che si apre al passaggio del mouse o al focus dopo <c>openDelay</c>, posizionato con <c>side</c>/<c>align</c> o con la scorciatoia <c>placement</c>."
    },
    contextMenu: {
      blurb: "Un menu contestuale costruito da un array <c>items</c> (icone, suffissi, varianti <c>danger</c>, divisori) o composto dai figli."
    },
    contextMenuItem: {
      blurb: "Una voce dell'<c>ArcanaContextMenu</c> in modalità composizione — icona, <c>suffix</c> a destra per la scorciatoia, <c>variant</c> semantico e separatore <c>divided</c> disegnato sopra."
    },  },

  demos: {
    depMoment: "Parsing e formattazione delle date dietro ad ArcanaDatePicker.",
    depMaska: "Maschera di input in ArcanaInputMask — usata da tutti e quattro i framework. Vue registra in più la direttiva v-maska.",
    depVue: "Necessaria solo per l'entrypoint /vue.",
    depReact: "Necessaria solo per l'entrypoint /react.",
    depReactDom: "Necessaria solo per l'entrypoint /react.",
    depAngular: "Necessaria solo per l'entrypoint /angular.",
    depSvelte: "Necessaria solo per l'entrypoint /svelte.",
    depFontAwesome: "Classi di icone (fa-solid fa-*) usate dalle prop icona.",
    // ── shared ──
    lastAction: "ultima azione",
    timesSuffix: "volta/e",
    disabledLabel: "Disabilitato",

    // ── button ──
    btnPrimary: "Primario",
    btnSecondary: "Secondario",
    btnOutline: "Contorno",
    btnGhost: "Ghost",
    btnSuccess: "Successo",
    btnIndigo: "Indaco",
    btnDestructive: "Distruttivo",
    btnOutlineDanger: "Contorno pericolo",
    primaryClickedPrefix: "Cliccato",

    // ── badge ──
    badgeNeutral: "neutro",
    badgeBlue: "blu",
    badgeGreen: "verde",
    badgeRed: "rosso",
    badgeAmber: "ambra",
    badgeViolet: "viola",
    badgeActive: "Attivo",
    badgeOffline: "Offline",
    badgeSmSize: "dimensione sm",
    badgeClickable: "cliccabile",

    // ── input ──
    quantity: "Quantità",
    inputReadonly: "Sola lettura",
    inputLockedValue: "Valore bloccato",
    inputEmailLabel: "email",
    inputQtyLabel: "qtà",

    // ── select ──
    selectPickFruit: "Scegli un frutto",
    selectPickSeveral: "Scegli più opzioni",
    fruitApple: "Mela",
    fruitBanana: "Banana",
    fruitCherry: "Ciliegia",
    fruitCherryDesc: "stagionale",
    fruitDurian: "Durian",
    fruitElderberry: "Sambuco",
    selectSingleLabel: "singolo",
    selectMultipleLabel: "multiplo",

    // ── checkbox ──
    checkboxSelectAll: "Seleziona tutto",
    checkboxInvoices: "Fatture",
    checkboxReceipts: "Ricevute",
    checkboxStatements: "Estratti conto",
    checkboxArchivedDisabled: "Archiviati (disabilitato)",

    // ── switch ──
    switchNotifications: "Notifiche",
    switchBetaFeatures: "Funzioni beta",

    // ── tabs ──
    tabOverview: "Panoramica",
    tabActivity: "Attività",
    tabSettings: "Impostazioni",
    tabOverviewPanel: "Il pannello Panoramica è attivo.",
    tabActivityPanel: "3 nuovi elementi in Attività.",
    tabSettingsPanel: "Modifica qui le tue Impostazioni.",

    // ── dialog ──
    dialogOpen: "Apri finestra",
    dialogTitle: "Elimina area di lavoro",
    dialogDescription: "Questa azione non può essere annullata.",
    dialogBody: "La rimozione di quest'area di lavoro elimina ogni progetto e invito al suo interno. Digita il nome per confermare in un modulo reale — qui basta chiudere la finestra.",
    dialogCancel: "Annulla",
    dialogDelete: "Elimina",

    // ── input mask ──
    maskPhone: "Telefono",
    maskCard: "Numero carta",
    phoneRaw: "telefono (grezzo)",
    cardRaw: "carta (grezzo)",

    // ── input boolean ──
    boolYesNo: "Sì / No",
    boolHasValue: "Ha un valore?",
    boolYesNoLabel: "sì/no",
    boolStatusLabel: "stato",
    boolNullableLabel: "nullable",

    // ── number stepper ──
    stepperQtyLabel: "qtà (0–10)",
    stepperWeightLabel: "peso (passo 5)",

    // ── multi-select popover ──
    mspUsers: "Utenti",
    mspDepartments: "Reparti",
    mspSales: "Vendite",
    mspSupport: "Supporto",
    mspEmptyLabel: "Seleziona persone o reparti",
    mspUsersLabel: "utenti",
    mspDepartmentsLabel: "reparti",

    // ── radio card group ──
    payCreditCard: "Carta di credito",
    payCreditCardDesc: "Addebito ricorrente automatico.",
    payBankTransfer: "Bonifico bancario",
    payBankTransferDesc: "Istantaneo, senza commissioni.",
    payBankTransferBadge: "Consigliato",
    payInvoice: "Fattura",
    payInvoiceDesc: "Scadenza in 3 giorni lavorativi.",
    payCash: "Pagamento alla consegna",
    selectedLabel: "selezionato",

    // ── segmented options ──
    segList: "Elenco",
    segGrid: "Griglia",
    segBoard: "Bacheca",
    viewLabel: "vista",

    // ── date picker ──
    datePickerValueLabel: "valore (YYYY-MM-DD)",
    datePickerTypeHint: "digita DD/MM/AAAA",

    // ── input currency ──
    priceRaw: "prezzo (grezzo)",

    // ── accordion ──
    accShipping: "Spedizione",
    accShippingBody: "Spedizione in 2–3 giorni lavorativi.",
    accReturns: "Resi",
    accReturnsBody: "Resi gratuiti entro 30 giorni, senza domande.",
    accWarranty: "Garanzia (disabilitato)",
    accWarrantyBody: "Prossimamente.",
    accOpenSingleLabel: "aperto (modalità singola)",

    // ── accordion item ──
    accSpecifications: "Specifiche",
    accSpecificationsBody: "Peso, dimensioni e materiali.",
    accCareTitle: "Istruzioni per la cura",
    accCareBody: "Lavare a mano in acqua fredda, non asciugare in asciugatrice.",
    accOpenMultipleLabel: "aperto (modalità multipla)",

    // ── dropdown ──
    dropdownActions: "Azioni",
    ddRename: "Rinomina",
    ddDuplicate: "Duplica",
    ddDelete: "Elimina",

    // ── dropdown item ──
    dropdownOpenMenu: "Apri menu",
    ddProfile: "Profilo",
    ddApprove: "Approva",
    ddFlag: "Segnala",
    ddFlagLabel: "Segnala per revisione",

    // ── table ──
    colSku: "SKU",
    colProduct: "Prodotto",
    colQty: "Qtà",
    colTotal: "Totale",
    tableLow: "scorte basse",
    tableInStock: "disponibile",
    tableTotalItems: "Totale (3 articoli)",

    // ── settings editable field ──
    editableFieldHintPrefix: "Clicca",
    editableFieldHintSuffix: "su una riga per aprire la finestra di modifica.",

    // ── notice ──
    noticeDismissedHint: "L'avviso distruttivo è stato chiuso — ricarica l'anteprima per farlo riapparire.",

    // ── edit field modal ──
    savedValue: "valore salvato",

    // ── onboarding panel ──
    onboardingPrimary: "primario",
    onboardingSecondary: "secondario",

    // ── loading overlay ──
    loadingOverlayHint: "Clicca \"Salvar\" per coprire questa scheda con l'overlay per ~1,6s.",

    // ── switch card ──
    switchCard2faLabel: "2FA",
    switchCardMaintenanceLabel: "manutenzione",

    // ── switch row ──
    switchRowEmailLabel: "e-mail",
    switchRowPushLabel: "push",

    // ── switch segmented ──
    switchSegCycleLabel: "ciclo",
    switchSegEnvLabel: "env",

    // ── added: previously-hardcoded PT demo strings ──
    statusActive: "Attivo",
    statusLabel: "Stato",
    actionChange: "Modifica",

    btnNew: "Nuovo",
    btnExport: "Esporta",
    btnDelete: "Elimina",
    btnSave: "Salva",
    btnSettings: "Impostazioni",
    btnMoreOptions: "Altre opzioni",
    btnAdd: "Aggiungi",

    specSheetDocNum: "Registro n. 042 · Aggiornato 14.Mar.2026",
    specSheetRegistrationData: "Dati aziendali",
    specSheetLegalName: "Ragione sociale",
    specSheetRegistrationNo: "N. registrazione",
    specSheetContact: "Contatto",
    specSheetPhone: "Telefono",
    specSheetEmail: "Email",
    specSheetChangeData: "Modifica dati",
    specSheetBilling: "Fatturazione",
    specSheetLimit: "Limite",
    specSheetBalance: "Saldo",
    specSheetDueDate: "Scadenza",
    specSheetDueDateValue: "Giorno 10",
    specSheetNotes: "Note",
    specSheetNotesLabel: "Note",
    specSheetNotesValue: "Cliente preferenziale dal 2019.",
    specSheetName: "Nome",
    specSheetNickname: "Soprannome",
    specSheetNotProvided: "Non fornito",

    tileIncome: "Entrate",
    tileIncomeSub: "4 metodi",
    tileExpenses: "Uscite",
    tileExpensesSub: "3 voci",
    tileTotal: "Totale",
    tileOrders: "Ordini",
    tileToday: "oggi",
    tileApproved: "Approvati",
    tileCanceled: "Annullati",
    tileConversion: "Conversione",

    settingsAdvancedFeatures: "Funzioni avanzate",
    settingsAdvancedFeaturesCaption: "Abilita funzionalità interne.",
    settingsEmailNotifications: "Notifiche email",
    settingsEmailNotificationsCaption: "Riepilogo giornaliero delle attività operative.",
    settingsPlan: "Piano",
    settingsPlanCaption: "Funzioni abilitate per l'organizzazione.",
    settingsPlanShortCaption: "Funzioni abilitate.",
    settingsTwoConfigs: "2 impostazioni",
    settingsAcceptOrders: "Accetta ordini",
    settingsAcceptOrdersCaption: "Riceve nuovi ordini tramite l'app.",
    settingsAutoConfirm: "Conferma automatica",
    settingsAutoConfirmCaption: "Conferma senza revisione manuale.",
    settingsDelivery: "Consegna",
    settingsRealtimeTracking: "Tracciamento in tempo reale",
    settingsSaasCaption: "Sistema SaaS — piano tramite tabella di abbonamento.",
    settingsSubscriptionV2: "Abbonamento V2",
    settingsShowWebApp: "Mostra Web App",
    settingsShowWebAppCaption: "Sotto-impostazione della carta di credito.",
    settingsUnavailableFeature: "Funzione non disponibile",
    settingsUnavailableFeatureCaption: "Richiede un piano superiore.",

    planBasic: "Base",
    planProfessional: "Professionale",
    planEnterprise: "Enterprise",

    editableUnitName: "Nome unità",
    editableUnitNameCaption: "Mostrato nei report.",
    editableFirstPurchaseDiscount: "Sconto primo acquisto",
    editableFirstPurchaseDiscountCaption: "Valore unitario applicato.",

    noticeInfoTitle: "Informazione",
    noticeInfoBody: "Impostazione salvata automaticamente.",
    noticeNewTitle: "Novità",
    noticeNewBody: "Il nuovo pannello dei percorsi è ora disponibile.",
    noticeActivatedTitle: "Attivato",
    noticeActivatedBody: "Integrazione completata con successo.",
    noticeManualPaymentTitle: "Pagamento manuale",
    noticeManualPaymentBody: "Bonifico e fattura generano un nuovo link di pagamento a ogni ciclo.",
    noticePendingTitle: "In attesa di attivazione su Stripe",
    noticePendingBody: "Clicca \"Sync\" per creare l'abbonamento sul gateway.",
    noticeErrorTitle: "Caricamento non riuscito",
    noticeErrorBody: "Impossibile recuperare i dati.",

    editDialogChangeName: "Modifica nome",
    editDialogTitle: "Modifica nome",
    editDialogDescription: "Aggiorna il nome dell'unità.",
    editDialogPlaceholder: "Nome unità",

    requiredValidateForm: "Valida modulo",
    requiredDescription: "I campi seguenti devono essere compilati prima di creare il cliente.",
    requiredTaxIdHint: "Passo 1 · Dati aziendali",
    requiredPhoneHint: "Passo 2 · Contatto",
    requiredDeliveryAddress: "Indirizzo di spedizione",
    requiredDeliveryAddressHint: "Passo 3 · Spedizione",

    onboardingTitle: "Ancora nessun progetto qui",
    onboardingDescription: "Crea il tuo primo progetto per iniziare a organizzare il tuo lavoro.",
    onboardingActionLabel: "Crea progetto",
    onboardingSecondaryLabel: "Vedi esempi",
    onboardingSubHint: "Puoi invitare il tuo team più tardi.",

    loadingOrderSummary: "Riepilogo ordine",
    loadingSavingText: "Salvataggio…",

    switchCard2faTitle: "Autenticazione 2FA",
    switchCard2faStatusOn: "ON · TOTP",
    switchCard2faStatusOff: "OFF",
    switchCardMaintenanceTitle: "Modalità manutenzione",

    switchRowEmailDesc: "Riepilogo giornaliero delle attività dell'organizzazione.",
    switchRowPushTitle: "Notifiche push",
    switchRowPushDesc: "Avvisi in tempo reale sul dispositivo.",

    switchSegMonthly: "Mensile",
    switchSegAnnual: "Annuale · −20%",
    switchSegSandbox: "Sandbox",
    switchSegProduction: "Produzione",

    // ── tree select ──
    treeEngineering: "Ingegneria",
    treeFrontend: "Frontend",
    treeBackend: "Backend",
    treeMarketing: "Marketing",
    treeContent: "Contenuti",
    treeGrowth: "Growth",
    treeBrand: "Brand",
    treeSales: "Vendite",
    treePickOne: "Scegli un reparto",
    treePickSeveral: "Scegline diversi",
    treeSingleTitle: "Selezione singola",
    treeMultipleTitle: "Selezione multipla",
    treeThemedTitle: "Tema personalizzato",
    treeThemedHint: "Colori di icone e selezione tramite custom properties CSS",
    segWithIcons: "Con icone",
    segColoredIcons: "Icone colorate",
    segLow: "Bassa",
    segMedium: "Media",
    segHigh: "Alta",
    segPriorityLabel: "priorità",
    selectQuickFilterTitle: "Filtro rapido (pallini colorati)",
    selectStatusPlaceholder: "Stato",
    selectFooterCount: "{count} selezionati",
    selectClearLabel: "Pulisci",
    selectStatusLabel: "stato",
    statusTodo: "Da fare",
    statusInProgress: "In corso",
    statusInReview: "In revisione",
    statusDone: "Fatto",
    statusBlocked: "Bloccato",
    accAnimatedTitle: "Animato",
    accAnimatedHint: "Transizione fluida dell'altezza; rispetta reduced-motion",
    segIconOnly: "Solo icone",
    segSizes: "Dimensioni (sm · md · lg · xl)",
    segCustomSize: "Dimensione personalizzata",
    segCustomSizeHint: "Le custom properties CSS prevalgono su qualsiasi size",
    switchSegWithIcons: "Con icone",
    switchSegIconOnly: "Solo icone",
    switchSegLight: "Chiaro",
    switchSegDark: "Scuro",
    rcIconStart: "Icona all'inizio",
    rcIconEnd: "Icona alla fine",
    rcRadioEnd: "Radio alla fine",
    rcPersonalAccount: "Account personale",
    rcPersonalAccountDesc: "Per uso individuale",
    rcBusinessAccount: "Account aziendale",
    rcBusinessAccountDesc: "Per team e aziende",
    rcShippingStandard: "Spedizione standard",
    rcShippingStandardDesc: "Arriva in 5–7 giorni lavorativi",
    rcShippingExpress: "Spedizione espressa",
    rcShippingExpressDesc: "Arriva il giorno lavorativo successivo",

    // ── rate ──
    rateValueLabel: "La tua valutazione",
    rateText1: "Pessimo",
    rateText2: "Scarso",
    rateText3: "Nella media",
    rateText4: "Buono",
    rateText5: "Eccellente",
    rateAverageNote: "Media di 128 recensioni",
    rateSizeSm: "Piccolo",
    rateSizeMd: "Medio",
    rateSizeLg: "Grande",
    rateDisabledNote: "Disabilitato",

    // ── avatar ──
    avatarFallbackNote: "Un'immagine rotta ricade automaticamente sul passo successivo.",
    avatarShapeCircle: "Cerchio",
    avatarShapeSquare: "Quadrato",
    avatarSizesNote: "Taglie nominate o un valore esatto in pixel",

    // ── avatar group ──
    avatarGroupTeamLabel: "Team di progetto",
    avatarGroupOverlapNote: "Sovrapposti (predefinito)",
    avatarGroupSpacingNote: "Distanziati",
    avatarGroupCompositionNote: "Figli composti con un conteggio di eccedenza esplicito",

    // ── statistic ──
    statActiveUsers: "Utenti attivi",
    statRevenue: "Ricavi mensili",
    statConversion: "Tasso di conversione",
    statOrders: "Ordini",
    statChurn: "Churn",
    statUptime: "Uptime",
    statPending: "Recensioni in attesa",
    statTickets: "Ticket aperti",
    statLocaleNote: "Stesso numero, separatori pt-BR",

    // ── countdown ──
    countdownFlashSale: "L'offerta lampo finisce tra",
    countdownSessionExpires: "La sessione scade tra",
    countdownMaintenance: "Finestra di manutenzione",
    countdownToggle: "Pausa / riprendi",
    countdownFinishedNote: "Emette l'evento finish quando arriva a zero.",

    // ── progress ──
    progressUploading: "Caricamento",
    progressStorage: "Spazio usato",
    progressComplete: "Completato",
    progressIndeterminateNote: "Nessun totale noto — la barra va in ciclo.",
    progressCustomLabel: "3 di 5 passaggi",

    // ── aspect ratio ──
    aspectCoverAlt: "Fotografia in orizzontale",
    aspectSquareNote: "1 / 1",
    aspectPortraitNote: "3 / 4",
    aspectClassicNote: "4 / 3",
    aspectEmbedNote: "Funziona anche con iframe, mappe e video",

    // ── scroll area ──
    scrollVerticalNote: "Verticale, altezza limitata",
    scrollHorizontalNote: "Orizzontale",
    scrollBothNote: "Entrambi gli assi",
    scrollTypeAlways: "Barra sempre visibile",
    scrollTypeHover: "La barra compare al passaggio del mouse",
    scrollItemPrefix: "Elemento",

    // ── hover card ──
    hoverProfileName: "Dana Whitfield",
    hoverProfileHandle: "@danaw",
    hoverProfileBio: "Responsabile di design system. Scrive di accessibilità e colore.",
    hoverProfileFollowers: "1,2k follower",
    hoverSideNote: "Un trigger per lato",
    hoverDelayInstant: "Istantaneo",
    hoverDelaySlow: "Lento (600 ms)",
    hoverDisabledNote: "Disabilitato — non si apre nulla",

    // ── context menu ──
    contextTriggerNote: "Fai clic destro su quest'area",
    contextOpen: "Apri",
    contextRename: "Rinomina",
    contextDuplicate: "Duplica",
    contextShare: "Condividi",
    contextDelete: "Elimina",
    contextArchive: "Archivia",
    contextDisabledItem: "Sposta nella cartella",
    contextLastAction: "Ultima azione",
    contextNoneYet: "ancora nessuna",
    contextDisabledNote: "Disabilitato — compare invece il menu del browser"

  }
};
