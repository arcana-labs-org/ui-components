import type { Messages } from "./types";

export const it: Messages = {
  meta: { htmlLang: "it", locale: "it-IT" },
  langName: "Italiano",

  shell: {
    kicker: "Documentazione · v0.x",
    lead: "Una libreria di componenti tipizzata, in stile shadcn. Vue 3 è già disponibile; gli adattatori per React, Angular e Svelte sono in arrivo — stessa API, stesso aspetto, in qualsiasi framework.",
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
      p2: "Tutti i componenti Vue sono esportati dal subpath <c>@arcanalabs/ui-components/vue</c> come SFC autonomi; importa solo quelli che usi."
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
  comingSoon: "La documentazione completa di questo componente arriverà in un lotto successivo. È già esportato da <c>@arcanalabs/ui-components/vue</c> ed è pronto all'uso.",
  frameworkSoon: "// Gli adattatori React · Angular · Svelte arriveranno presto.\n// Vue 3 è già disponibile — imposta il selettore del framework su Vue.",

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
    }
  }
};
