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
    }
  }
};
