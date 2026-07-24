import type { Messages } from "./types";

export const it: Messages = {
  meta: { htmlLang: "it", locale: "it-IT" },
  langName: "Italiano",

  shell: {
    kicker: "Documentazione · v0.x",
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
    codeOnlyLabel: "Codice",
    defaultPreviewCaption: "componente dal vivo · interagisci con esso",
    sectionExampleAria: "Esempio di {title}",
    githubStars: "{count} stelle su GitHub",
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
      p2: "Ogni componente è pubblicato per tutti e quattro i framework in un subpath dedicato — <c>@arcanalabs/ui-components/vue</c>, <c>/react</c>, <c>/angular</c> e <c>/svelte</c>; importa solo quelli che usi."
    },
    usage: {
      title: "Utilizzo",
      p1: "Importa un componente e inseriscilo nel tuo template. Tutti seguono le stesse convenzioni: <c>v-model</c> per i valori bidirezionali, prop in kebab-case e un evento <c>change</c> accanto a <c>update:modelValue</c>.",
      p2: "La palette è la scala neutra shadcn <i>zinc</i>, quindi i componenti convivono bene fianco a fianco senza alcuna configurazione del tema."
    },
    styles: {
      title: "Stili",
      p1: "Importa il foglio di stile una sola volta, alla radice della tua applicazione: <c>import '@arcanalabs/ui-components/styles.css'</c>. Contiene i token visivi di tutti i componenti.",
      p2: "Gli stili sono CSS puro, con scope per componente — non c'è alcun motore di stile a runtime né requisito di Tailwind nel consumatore."
    },
    maska: {
      title: "Registrare v-maska",
      p1: "Alcuni componenti (<c>ShadcnInputMask</c>, <c>ShadcnDatePicker</c>) si basano sulla direttiva <c>v-maska</c> del pacchetto <c>maska</c>. Registrala globalmente una volta quando crei l'app.",
      p2: "I componenti che non usano le maschere non richiedono configurazione extra — questo passaggio serve solo se renderizzi un input con maschera."
    }
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
      blurb: "Un pulsante cliccabile che rispecchia la geometria del pulsante shadcn (13px / peso 500 / raggio 6). Quindici varianti semantiche coprono azioni primarie, flussi distruttivi, contorni neutri e accenti di stato. L'etichetta arriva dallo slot di default; i clic sono esposti tramite l'evento <c>click</c>."
    },
    badge: {
      blurb: "Una pillola compatta per contatori, stati e tag. Sei varianti di colore si combinano con un <c>dot</c> indicatore opzionale a sinistra, due dimensioni e una modalità <c>clickable</c> che aggiunge l'affordance del puntatore per i badge azionabili. Il contenuto proviene dallo slot di default."
    },
    input: {
      blurb: "Un <c>&lt;input&gt;</c> nativo con stile shadcn e un <c>v-model</c> consapevole dei numeri (un <c>type=\"number\"</c> vuoto emette <c>null</c>; uno valido emette un numero reale). Gli attributi HTML standard — <c>placeholder</c>, <c>readonly</c>, <c>min/max/step</c>, <c>maxlength</c>, <c>autocomplete</c> — passano direttamente."
    },
    select: {
      blurb: "Un select completamente personalizzato — senza Element Plus sotto. Il dropdown viene teletrasportato in <c>&lt;body&gt;</c> con posizionamento auto-flip e supporta selezione singola o <c>multiple</c>, filtro <c>searchable</c> integrato, affordance <c>clearable</c> al passaggio del mouse e navigazione completa da tastiera. Le opzioni accettano semplici stringhe oppure oggetti <c>{ label, value, disabled?, description? }</c>."
    },
    checkbox: {
      blurb: "Un checkbox binario che avvolge un <c>&lt;input type=\"checkbox\"&gt;</c> nativo <b>vero</b> — quindi è compatibile con tastiera e driver di test (il <c>check()</c>/<c>uncheck()</c> di Dusk funziona). Usalo per scegliere elementi da una lista; uno stato <c>indeterminate</c> mostra il classico trattino di \"alcuni selezionati\". Preferisci <c>ShadcnSwitch</c> per attivare/disattivare un'impostazione."
    },
    switch: {
      blurb: "Un toggle binario on/off che segue il pattern WAI-ARIA dello switch (<c>role=\"switch\"</c> + <c>aria-checked</c>, Space/Enter attivano). La traccia è codificata a colori per una lettura rapida — rosso quando è off, verde quando è on — e un checkbox nascosto opzionale (<c>name</c>) si integra con l'invio di form nativi."
    },
    tabs: {
      blurb: "Tab personalizzate guidate da un array <c>tabs</c> e da un <c>v-model</c> con il nome della tab attiva. Ogni tab diventa uno slot con nome. Sei varianti visive — <c>pills</c>, <c>underline</c>, <c>boxed</c>, <c>sidebar</c>, <c>sidebar-soft</c>, <c>segmented</c> — coprono dalle tab compatte nei modali alla navigazione laterale completa, con icone e badge opzionali e una modalità <c>keepAlive</c> che preserva i pannelli inattivi."
    },
    dialog: {
      blurb: "Un modale in stile shadcn con API basata su ref — chiama <c>show()</c> / <c>hide()</c> sul ref del componente invece di usare <c>v-model</c>. Si teletrasporta in <c>&lt;body&gt;</c>, intrappola il focus, si chiude con Escape (e opzionalmente al clic sull'overlay) e si impila correttamente quando è annidato. I preset di dimensione vanno da <c>sm → full</c>; gli slot <c>header</c> e <c>footer</c> sono opzionali (lo slot footer riceve <c>{ hide }</c>)."
    },
    inputMask: {
      blurb: "Un input di testo con maschera costruito sulla direttiva <c>v-maska</c> e con lo stile di <c>ShadcnInput</c>. Passa una stringa in <c>mask</c>, o un array di stringhe per maschere dinamiche in base alla lunghezza (es. fisso vs. cellulare). Il <c>v-model</c> contiene sempre il valore <b>raw</b> — senza i caratteri della maschera —, così CPF, CNPJ, CEP o numeri di telefono arrivano al backend senza formattazione mentre il campo mostra la vista formattata. Richiede <c>v-maska</c> registrato globalmente."
    },
    inputBoolean: {
      blurb: "Un select sì/no per campi booleani, reso come un <c>ShadcnSelect</c>. Normalizza le consuete forme booleane — <c>true</c>/<c>1</c>, <c>false</c>/<c>0</c>, <c>null</c>. Una <c>variation</c> cambia le etichette in <c>status</c> (Ativo/Inativo) o in valori tipo SQL <c>nullable</c> (<c>IS_NOT_NULL</c>/<c>IS_NULL</c>) per i filtri. Quando è <c>clearable</c> (predefinito), un'opzione \"Todos\" in cima azzera il valore a <c>null</c>."
    },
    numberStepper: {
      blurb: "Un input numerico affiancato da pulsanti <c>−</c> / <c>+</c> per regolazioni fini della quantità. I pulsanti rispettano <c>min</c> / <c>max</c> / <c>step</c> e si disabilitano ai limiti; le frecce Su/Giù funzionano da tastiera, e un valore vuoto o non valido viene forzato a <c>min</c> al blur. Gli spinner nativi sono nascosti a favore dei pulsanti personalizzati."
    },
    multiSelectPopover: {
      blurb: "Un popover generico teletrasportato nel body con schede configurabili e multi-selezione tramite checkbox — una base riutilizzabile per picker che coprono più bucket (utenti + reparti, filiali, macchine…). Il <c>v-model</c> è una mappa <c>{ [tabKey]: number[] }</c>, un array di id selezionati per scheda. Ogni scheda fornisce un <c>fetch()</c> asincrono il cui risultato è messo in cache per la durata del componente; il pannello fa flip e shift per restare nel viewport. Gli slot <c>trigger</c> e <c>item</c> personalizzano il rendering."
    },
    radioCardGroup: {
      blurb: "Un gruppo di card selezionabili basate su veri elementi <c>&lt;input type=\"radio\"&gt;</c> — più tattile di un select quando ci sono poche opzioni e ognuna porta una descrizione, un'icona o un badge. Le opzioni sono oggetti <c>{ label, value, description?, icon?, badge?, disabled? }</c>. Disponile impilate, <c>inline</c>, o in un numero fisso di <c>columns</c>, e sposta il radio all'<c>end</c> quando un'icona a sinistra deve portare il peso visivo."
    },
    segmentedOptions: {
      blurb: "Un controllo segmentato per N opzioni mutuamente esclusive dentro una capsula — il fratello multi-opzione del binario <c>ShadcnSwitchSegmented</c>. Il segmento attivo è evidenziato; le opzioni accettano un'<c>icon</c> opzionale e un <c>disabled</c> per opzione. <c>compact</c> e <c>squared</c> regolano la geometria, <c>activeColor</c> sovrascrive il riempimento dell'attivo, e <c>autoSelectFirst</c> seleziona la prima opzione abilitata quando nulla è selezionato (utile per liste dinamiche)."
    },
    datePicker: {
      blurb: "Un campo data in stile shadcn. Per <c>type=\"date\"</c> compone un input di testo con maschera dal vivo <c>DD/MM/AAAA</c> (via <c>v-maska</c>) con un popover calendario di Element Plus aperto dall'icona calendario; gli altri type (<c>daterange</c>, <c>month</c>, <c>year</c>) usano il calendario direttamente. Il <c>v-model</c> è una stringa ISO <c>YYYY-MM-DD</c> (o una tupla per gli intervalli), e le date digitate sono validate in modo rigoroso (31/02 viene rifiutato)."
    },
    inputCurrency: {
      blurb: "Un input valuta costruito su <c>v-money3</c> che formatta mentre l'utente digita — separatore delle migliaia, virgola decimale e una <c>fraction</c> configurabile di cifre decimali (BRL per impostazione predefinita). Attiva il flag <c>shadcn</c> per il campo in stile zinc con un'icona valuta a sinistra; <c>min</c> / <c>max</c> vincolano il valore e <c>allowBlank</c> consente un campo vuoto. Il <c>v-model</c> porta la stringa formattata; lo stato disabilitato mostra un valore formattato in sola lettura."
    },
    labeledButton: {
      blurb: "Il pulsante base dietro i wrapper di pulsante di livello superiore: un <c>label</c>, un'<c>icon</c> opzionale a sinistra (classe FontAwesome) e uno stato <c>loading</c> che scambia l'icona con uno spinner e disabilita il pulsante. Imposta il flag <c>shadcn</c> per mappare la prop legacy <c>color</c> su una variante semantica shadcn (danger → destructive, grey → ghost, blue → info, …); senza di esso viene mantenuto lo stile Bootstrap legacy. <c>centerLabel</c> / <c>centerContent</c> controllano l'allineamento nei pulsanti full-width."
    },
    accordion: {
      blurb: "Il contenitore di un insieme di <c>ShadcnAccordionItem</c> collassabili. Fornisce lo stato aperto/chiuso ai figli tramite provide/inject e si lega a un <c>v-model</c>. Nella modalità single predefinita (<c>accordion</c>) il modello è il <c>name</c> dell'elemento aperto (o <c>null</c>); imposta <c>:accordion=\"false\"</c> per la modalità multipla, dove il modello diventa un array di name aperti."
    },
    accordionItem: {
      blurb: "Un singolo pannello collassabile dentro un <c>ShadcnAccordion</c>, identificato da un <c>name</c> obbligatorio. L'intestazione mostra la prop <c>title</c> (o uno slot <c>title</c> per intestazioni ricche) più un chevron che ruota all'apertura; lo slot predefinito è il corpo collassabile. <c>disabled</c> blocca il toggle. Legge il suo stato aperto dall'accordion padre — funziona solo annidato dentro uno."
    },
    dropdown: {
      blurb: "Un menu a discesa in stile shadcn che sostituisce <c>el-dropdown</c>. Lo slot <c>trigger</c> contiene ciò che lo apre; lo slot predefinito contiene i <c>ShadcnDropdownItem</c> (e riceve un helper <c>close</c>). Il menu si teletrasporta nel <c>&lt;body&gt;</c> per sfuggire all'<c>overflow:hidden</c> degli antenati, si posiziona con flip/shift automatico e si chiude al clic esterno, con Escape o alla selezione di un elemento. <c>placement</c> e una densità <c>size</c> (propagata agli elementi) lo regolano."
    },
    dropdownItem: {
      blurb: "Una riga dentro un <c>ShadcnDropdown</c>: un'<c>icon</c> opzionale, l'etichetta (slot predefinito) e uno slot <c>suffix</c> opzionale (es. una scorciatoia). <c>variant</c> lo colora come <c>default</c>, <c>danger</c>, <c>success</c> o <c>warning</c>; <c>divided</c> disegna un separatore sopra di esso per isolare le azioni distruttive. Al clic emette <c>click</c> e — a meno che <c>closeOnClick</c> sia false — chiede al dropdown padre di chiudersi tramite un evento personalizzato che risale per bubbling."
    },
    table: {
      blurb: "Una tabella statica in stile shadcn per array che hai già in memoria (a differenza di <c>SparkGrid</c>, che fa fetch e paginazione via backend). Le colonne dichiarano <c>{ key, label, width?, align?, valueGetter? }</c>; uno slot <c>#cell-&lt;key&gt;</c> prende il controllo del render di qualsiasi cella, e uno slot <c>#footer</c> riempie un <c>&lt;tfoot&gt;</c> per i totali."
    },
    specSheet: {
      blurb: "Una \"spec sheet\" read-only ed editoriale per record formali — pensa a fascicoli ufficiali e datasheet. Un eyebrow mono <c>docNum</c> sta sopra il <c>title</c> e un badge <c>meta</c> opzionale; i figli <c>&lt;ShadcnSpecSheetSection&gt;</c> contengono i campi e uno slot <c>#footer</c> porta le azioni di modifica. Usa <c>flat</c> per togliere il chrome della card quando la incorpori in un'altra card."
    },
    specSheetSection: {
      blurb: "Una sezione dentro un <c>ShadcnSpecSheet</c>: un <c>icon</c> boxed d'accento opzionale (otto colori) + <c>title</c> + un <c>sectionNum</c> allineato a destra, sopra una griglia di <c>columns</c> configurabile di <c>&lt;ShadcnSpecSheetField&gt;</c>. Uno slot <c>#actions</c> ospita pulsanti nell'header; <c>noRowDividers</c> e <c>compact</c> regolano il layout."
    },
    specSheetField: {
      blurb: "Una coppia label/valore dentro una sezione. La <c>label</c> è resa in maiuscolo mono, il <c>value</c> in Inter; un valore vuoto (<c>null</c>/<c>undefined</c>/'') mostra <c>emptyText</c> in corsivo attenuato così i vuoti si leggono come intenzionali. Usa <c>span</c> per allargare un campo, o lo slot predefinito per badge, link e altri valori ricchi."
    },
    summaryTiles: {
      blurb: "Il contenitore a griglia responsiva per una riga di tile KPI. Imposta <c>columns</c> (default 3); sotto gli 880px collassa sempre a una singola colonna. Inserisci tutti i <c>&lt;ShadcnSummaryTile&gt;</c> che ti servono."
    },
    summaryTile: {
      blurb: "Uno stat KPI compatto disposto come <c>[icona] [label + sub] [valore]</c> in ~52px di altezza. Quattro <c>tone</c> — <c>neutral</c>, <c>positive</c>, <c>negative</c>, <c>indigo</c> — lo colorano per una lettura rapida. Gli slot <c>#value</c> e <c>#sub</c> sostituiscono le prop semplici con badge inline o contenuti più ricchi."
    },
    settingsList: {
      blurb: "Un contenitore in stile Impostazioni iOS: righe separate da hairline, ognuna con label + caption a sinistra e un controllo a destra. Riempilo con <c>&lt;ShadcnSettingsListItem&gt;</c>, <c>&lt;ShadcnSettingsListGroup&gt;</c> o l'intelligente <c>&lt;ShadcnSettingsEditableField&gt;</c>."
    },
    settingsListGroup: {
      blurb: "Una sezione titolata dentro un <c>ShadcnSettingsList</c> per raggruppare righe correlate. L'header porta un <c>icon</c> boxed opzionale (otto colori), un <c>sectionNum</c> e un <c>meta</c> a destra. Usa <c>collapsible</c> per rendere l'header un toggle (con <c>defaultCollapsed</c>) e <c>compact</c> per maggiore densità."
    },
    settingsListItem: {
      blurb: "Una riga di un <c>ShadcnSettingsList</c>: <c>label</c> + <c>caption</c> a sinistra, il tuo controllo nello slot predefinito a destra. Lo slot <c>#label</c> permette di inserire inline un badge di stato; <c>nested</c> applica lo stile sub-item per toggle che contano solo quando un genitore è attivo; <c>disabled</c> attenua e blocca la riga."
    },
    settingsEditableField: {
      blurb: "Una riga smart che unisce il valore read-only, un pulsante \"Alterar\" e il suo modal di modifica in un unico tag. Scegli un <c>type</c> — <c>text</c>, <c>currency</c>, <c>number</c> o <c>select</c> — e rende l'input giusto dentro un modal teleportato. Le modifiche sono bufferizzate: annullare le scarta, salvare emette sia <c>update:modelValue</c> sia <c>save</c> (per l'auto-save)."
    },
    sparkGridEmptyState: {
      blurb: "Un wrapper che sostituisce il contenuto di una griglia con un <c>ShadcnOnboardingPanel</c> quando non c'è davvero nulla da mostrare. Attende che <c>loading</c> si stabilizzi (true → false) e rivela il pannello solo quando <c>total</c> è 0 e nessun filtro è attivo — così una lista filtrata fino a svuotarsi mantiene la sua toolbar. Emette <c>panel-visible</c> perché l'host nasconda le azioni dell'header."
    },
    notice: {
      blurb: "Un banner inline con varianti semantiche — <c>info</c>, <c>blue</c>, <c>success</c>, <c>warning</c>, <c>pending</c> e <c>destructive</c> — ciascuna con un'icona predefinita coerente. Usalo per avvisi contestuali, card di stato ed errori non bloccanti. Aggiungi <c>dismissible</c> per un pulsante di chiusura che emette <c>dismiss</c>; titolo, corpo e icona sono tutti sostituibili via slot."
    },
    editFieldModal: {
      blurb: "Un wrapper di modal \"Alterar X\" generico per liste di impostazioni. Fornisce il chrome (header, footer, salva/annulla) e riceve l'input del campo tramite il suo slot predefinito, così un unico componente serve ogni riga modificabile invece di un file per modal. È guidato da ref (<c>show()</c> / <c>hide()</c>) ed emette <c>save</c> senza chiudersi da solo, così puoi validare prima."
    },
    requiredFieldsDialog: {
      blurb: "Un dialog di avviso ambra che elenca i campi obbligatori ancora mancanti in un form multi-step. Passa un array <c>fields</c> di <c>{ key, label, hint }</c> — ogni <c>hint</c> indica il passo da correggere — e aprilo con una ref (<c>show()</c>). Sostituisce il vecchio pattern di \"un <c>Alert.info</c> alla volta\" con un'unica lista scansionabile."
    },
    onboardingPanel: {
      blurb: "Un pannello empty-state / CTA curato per la prima configurazione: un'icona in gradiente dentro anelli pulsanti, titolo + descrizione, una CTA primaria e un pulsante secondario e un sub-hint opzionali. Controllalo interamente via prop, o usa gli slot <c>#action</c> e <c>#sub-hint</c> per pulsanti custom e testo ricco. Emette <c>action</c> / <c>secondary-action</c>."
    },
    loadingOverlay: {
      blurb: "Un overlay di caricamento con ambito ristretto — spinner + testo su uno sfondo translucido con blur che copre l'antenato posizionato più vicino (il genitore ha bisogno di <c>position: relative</c>). Attivalo con <c>visible</c> per feedback asincrono a livello di card/sezione invece di un loader a schermo intero."
    },
    skeleton: {
      blurb: "Un blocco placeholder con shimmer per stati di caricamento. Imposta <c>width</c> / <c>height</c> con qualsiasi valore CSS e scegli un preset <c>rounded</c> (<c>full</c> per gli avatar). È <c>aria-hidden</c> (solo visivo) e rispetta <c>prefers-reduced-motion</c> — lo shimmer si ferma ma il blocco resta. Preferiscilo ai placeholder finti che tremolano quando arrivano i dati reali."
    },
    switchCard: {
      blurb: "Un toggle full-width ad alto impatto: quando è attivo, l'intera card diventa smeraldo con uno switch interno invertito — ne leggi lo stato da lontano. Riservalo a impostazioni di peso (2FA, modalità manutenzione, funzioni premium). Un <c>icon</c> boxed, <c>title</c> e le righe mono <c>statusOn</c>/<c>statusOff</c> lo descrivono."
    },
    switchRow: {
      blurb: "Un toggle \"riga di impostazioni\" full-width: titolo + descrizione opzionale a sinistra, uno switch compatto a destra, e l'intera riga è cliccabile per un'area di tocco generosa. È la via di mezzo tranquilla tra un <c>ShadcnSwitch</c> nudo e il vistoso <c>ShadcnSwitchCard</c> — ideale per liste di preferenze correlate."
    },
    switchSegmented: {
      blurb: "Un toggle binario a forma di capsula segmentata: due metà cliccabili con un indicatore scorrevole, così si legge come \"A o B\" invece che on/off. Ottimo per scelte etichettate (mensile / annuale, sandbox / produzione). <c>compact</c> e <c>squared</c> regolano la geometria, <c>activeColor</c> ricolora l'indicatore, e le frecce navigano tra i lati."
    }
  }
};
