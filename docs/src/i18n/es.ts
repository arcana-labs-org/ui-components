import type { Messages } from "./types";

export const es: Messages = {
  meta: { htmlLang: "es", locale: "es-ES" },
  langName: "Español",

  shell: {
    kicker: "Documentación · v0.x",
    lead: "Una biblioteca de componentes tipada, al estilo shadcn. Vue 3 ya está disponible; los adaptadores para React, Angular y Svelte están en camino — misma API, mismo aspecto, en cualquier framework.",
    brandLib: "UI Components",
    docTitle: "Arcana UI Components",
    searchPlaceholder: "Buscar componentes… (⌘K)",
    searchAria: "Buscar en la documentación",
    chooseFramework: "Elegir framework",
    chooseLanguage: "Elegir idioma",
    openNav: "Abrir navegación",
    closeNav: "Cerrar navegación",
    sidebarAria: "Navegación de la documentación",
    noSectionsFound: "No se encontraron componentes.",
    previewTab: "Vista previa",
    codeTab: "Código",
    codeOnlyLabel: "Código",
    defaultPreviewCaption: "componente en vivo · interactúa con él",
    sectionExampleAria: "Ejemplo de {title}",
    githubStars: "{count} estrellas en GitHub",
    footer: "Arcana UI Components · MIT"
  },

  codeBlock: {
    copy: "Copiar",
    copied: "¡Copiado!"
  },

  categories: {
    gettingStarted: "Primeros pasos",
    forms: "Formularios",
    dataDisplay: "Presentación de datos",
    overlay: "Superposición",
    layoutNav: "Diseño y navegación",
    feedback: "Feedback"
  },

  gettingStarted: {
    install: {
      title: "Instalación",
      p1: "La biblioteca se distribuye como un único paquete npm. Instálalo con el gestor de tu preferencia — <c>vue</c> (3.4+) es la única peer dependency.",
      p2: "Todos los componentes Vue se exportan desde el subpath <c>@arcanalabs/ui-components/vue</c> como SFCs autocontenidos; importa solo los que uses."
    },
    usage: {
      title: "Uso",
      p1: "Importa un componente y colócalo en tu plantilla. Todos siguen las mismas convenciones: <c>v-model</c> para valores bidireccionales, props en kebab-case y un evento <c>change</c> junto a <c>update:modelValue</c>.",
      p2: "La paleta es la escala neutra shadcn <i>zinc</i>, así que los componentes conviven bien entre sí sin configurar ningún tema."
    },
    styles: {
      title: "Estilos",
      p1: "Importa la hoja de estilos una vez, en la raíz de tu aplicación: <c>import '@arcanalabs/ui-components/styles.css'</c>. Contiene los tokens visuales de todos los componentes.",
      p2: "Los estilos son CSS puro, con scope por componente — no hay motor de estilos en runtime ni requisito de Tailwind en el consumidor."
    },
    maska: {
      title: "Registrar v-maska",
      p1: "Algunos componentes (<c>ShadcnInputMask</c>, <c>ShadcnDatePicker</c>) dependen de la directiva <c>v-maska</c> del paquete <c>maska</c>. Regístrala globalmente una vez al crear la app.",
      p2: "Los componentes que no usan máscara no necesitan configuración extra — este paso solo hace falta si renderizas un input con máscara."
    }
  },

  propsTable: {
    name: "Prop",
    type: "Tipo",
    default: "Por defecto",
    description: "Descripción",
    caption: "Props",
    eventsTitle: "Eventos emitidos"
  },

  demoCaption: "componente en vivo · interactúa con él",
  comingSoon: "La documentación completa de este componente llegará en un próximo lote. Ya se exporta desde <c>@arcanalabs/ui-components/vue</c> y está lista para usar.",
  frameworkSoon: "// Los adaptadores React · Angular · Svelte llegan pronto.\n// Vue 3 ya está disponible — cambia el selector de framework a Vue.",

  components: {
    button: {
      blurb: "Un botón pulsable que replica la geometría del botón shadcn (13px / peso 500 / radio 6). Quince variantes semánticas cubren acciones primarias, flujos destructivos, contornos neutros y acentos de estado. La etiqueta se pasa por el slot por defecto; los clics se exponen mediante el evento <c>click</c>."
    },
    badge: {
      blurb: "Una píldora compacta para contadores, estados y etiquetas. Seis variantes de color se combinan con un <c>dot</c> indicador opcional a la izquierda, dos tamaños y un modo <c>clickable</c> que añade affordance de puntero para badges accionables. El contenido viene del slot por defecto."
    },
    input: {
      blurb: "Un <c>&lt;input&gt;</c> nativo con estilo shadcn y un <c>v-model</c> consciente de números (un <c>type=\"number\"</c> vacío emite <c>null</c>; uno válido emite un número real). Los atributos HTML estándar — <c>placeholder</c>, <c>readonly</c>, <c>min/max/step</c>, <c>maxlength</c>, <c>autocomplete</c> — pasan directamente."
    },
    select: {
      blurb: "Un select totalmente personalizado — sin Element Plus por debajo. El desplegable se teletransporta a <c>&lt;body&gt;</c> con posicionamiento auto-flip y admite selección única o <c>multiple</c>, filtro <c>searchable</c> integrado, affordance <c>clearable</c> al pasar el ratón y navegación completa por teclado. Las opciones aceptan strings simples u objetos <c>{ label, value, disabled?, description? }</c>."
    },
    checkbox: {
      blurb: "Un checkbox binario que envuelve un <c>&lt;input type=\"checkbox\"&gt;</c> nativo <b>real</b> — por eso es compatible con teclado y con drivers de test (el <c>check()</c>/<c>uncheck()</c> de Dusk funciona). Úsalo para elegir ítems de una lista; un estado <c>indeterminate</c> muestra el clásico guion de \"algunos seleccionados\". Usa <c>ShadcnSwitch</c> para activar/desactivar un ajuste."
    },
    switch: {
      blurb: "Un toggle binario on/off que sigue el patrón WAI-ARIA de switch (<c>role=\"switch\"</c> + <c>aria-checked</c>, Space/Enter activan). La pista está codificada por color para escanear rápido — rojo cuando está off, verde cuando está on — y un checkbox oculto opcional (<c>name</c>) se integra con el envío de formularios nativos."
    },
    tabs: {
      blurb: "Tabs personalizadas controladas por un array <c>tabs</c> y un <c>v-model</c> con el nombre de la pestaña activa. Cada pestaña se convierte en un slot con nombre. Seis variantes visuales — <c>pills</c>, <c>underline</c>, <c>boxed</c>, <c>sidebar</c>, <c>sidebar-soft</c>, <c>segmented</c> — cubren desde pestañas compactas en modales hasta navegación lateral completa, con iconos y badges opcionales y un modo <c>keepAlive</c> que conserva los paneles inactivos."
    },
    dialog: {
      blurb: "Un modal al estilo shadcn con API basada en ref — llama a <c>show()</c> / <c>hide()</c> en el ref del componente en lugar de usar <c>v-model</c>. Se teletransporta a <c>&lt;body&gt;</c>, atrapa el foco, cierra con Escape (y opcionalmente al hacer clic en el overlay) y se apila correctamente cuando se anida. Los presets de tamaño van de <c>sm → full</c>; los slots <c>header</c> y <c>footer</c> son opcionales (el slot footer recibe <c>{ hide }</c>)."
    }
  }
};
