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
    referenceTab: "Props ed Eventi",
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
      p1: "Alcuni componenti (<c>ArcanaInputMask</c>, <c>ArcanaDatePicker</c>) si basano sulla direttiva <c>v-maska</c> del pacchetto <c>maska</c>. Registrala globalmente una volta quando crei l'app.",
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
      blurb: "Un input di testo con maschera su <c>v-maska</c> il cui <c>v-model</c> contiene sempre il valore <b>raw</b> (CPF, CNPJ, telefono…); richiede <c>v-maska</c> registrato globalmente."
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
      blurb: "Un input valuta (su <c>v-money3</c>) che formatta mentre digiti, con decimali configurabili e vincolo <c>min</c>/<c>max</c>; BRL per impostazione predefinita."
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
    sparkGridEmptyState: {
      blurb: "Un wrapper che sostituisce il contenuto di una griglia con un pannello di onboarding solo quando <c>total</c> è 0 e nessun filtro è attivo."
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
    }
  }
};
