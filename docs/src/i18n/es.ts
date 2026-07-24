import type { Messages } from "./types";

export const es: Messages = {
  meta: { htmlLang: "es", locale: "es-ES" },
  langName: "Español",

  shell: {
    kicker: "Documentación · v0.x",
    lead: "Una biblioteca de componentes tipada, al estilo shadcn — Vue 3, React, Angular y Svelte, con la misma API y el mismo aspecto en cualquier framework.",
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
    referenceTab: "Props y Eventos",
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
      p2: "Cada componente se publica para los cuatro frameworks en un subpath correspondiente — <c>@arcanalabs/ui-components/vue</c>, <c>/react</c>, <c>/angular</c> y <c>/svelte</c>; importa solo los que uses."
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
      p1: "Algunos componentes (<c>ArcanaInputMask</c>, <c>ArcanaDatePicker</c>) dependen de la directiva <c>v-maska</c> del paquete <c>maska</c>. Regístrala globalmente una vez al crear la app.",
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
  comingSoon: "La documentación completa de este componente llegará en un próximo lote. Ya se publica para Vue, React, Angular y Svelte y está lista para usar.",
  frameworkSoon: "// Vue, React, Angular y Svelte ofrecen el mismo componente — elige un framework arriba para ver su uso.",

  components: {
    button: {
      blurb: "Un botón pulsable en quince variantes semánticas; la etiqueta va por el slot por defecto y los clics por el evento <c>click</c>."
    },
    badge: {
      blurb: "Una píldora compacta para contadores, estados y etiquetas — seis colores, dos tamaños y modo <c>dot</c> y <c>clickable</c> opcionales."
    },
    input: {
      blurb: "Un <c>&lt;input&gt;</c> nativo con estilo shadcn y un <c>v-model</c> consciente de números; los atributos HTML estándar pasan directamente."
    },
    select: {
      blurb: "Un select totalmente personalizado (sin Element Plus) teletransportado a <c>&lt;body&gt;</c>, con selección única/<c>multiple</c>, <c>searchable</c>, <c>clearable</c> y navegación por teclado."
    },
    checkbox: {
      blurb: "Un checkbox binario que envuelve un <c>&lt;input type=\"checkbox\"&gt;</c> nativo real con estado <c>indeterminate</c>; usa <c>ArcanaSwitch</c> para activar un ajuste."
    },
    switch: {
      blurb: "Un toggle binario on/off (switch WAI-ARIA), codificado por color rojo/verde, con un checkbox oculto opcional para formularios nativos."
    },
    tabs: {
      blurb: "Pestañas personalizadas gobernadas por un array <c>tabs</c> y <c>v-model</c>, con seis variantes desde píldoras hasta navegación lateral completa."
    },
    dialog: {
      blurb: "Un modal shadcn con API <c>show()</c>/<c>hide()</c> basada en ref — se teletransporta a <c>&lt;body&gt;</c>, atrapa el foco y cierra con Escape."
    },
    inputMask: {
      blurb: "Un input de texto con máscara sobre <c>v-maska</c> cuyo <c>v-model</c> siempre guarda el valor <b>crudo</b> (CPF, CNPJ, teléfono…); requiere <c>v-maska</c> registrado globalmente."
    },
    inputBoolean: {
      blurb: "Un select sí/no para campos booleanos que normaliza <c>true</c>/<c>false</c>/<c>null</c>, con variaciones de etiqueta de estado y tipo SQL."
    },
    numberStepper: {
      blurb: "Un input numérico flanqueado por botones <c>−</c>/<c>+</c> que respetan <c>min</c>/<c>max</c>/<c>step</c> y las flechas del teclado."
    },
    multiSelectPopover: {
      blurb: "Un popover teletransportado al body con multiselección por checkbox en pestañas; el <c>v-model</c> es un mapa <c>{ [tabKey]: number[] }</c>, cada pestaña alimentada por un <c>fetch()</c> asíncrono."
    },
    radioCardGroup: {
      blurb: "Tarjetas seleccionables respaldadas por <c>&lt;input type=\"radio\"&gt;</c> reales, cada una con descripción, icono o badge; dispuestas apiladas, <c>inline</c> o en <c>columns</c>."
    },
    segmentedOptions: {
      blurb: "Un control segmentado para N opciones mutuamente excluyentes dentro de una píldora, con iconos y desactivación por opción."
    },
    datePicker: {
      blurb: "Un campo de fecha shadcn que combina un input con máscara <c>DD/MM/AAAA</c> y un popover de calendario; el <c>v-model</c> es una cadena ISO <c>YYYY-MM-DD</c>."
    },
    inputCurrency: {
      blurb: "Un input de moneda (sobre <c>v-money3</c>) que formatea mientras escribes, con decimales configurables y límites <c>min</c>/<c>max</c>; BRL por defecto."
    },
    accordion: {
      blurb: "El contenedor de <c>ArcanaAccordionItem</c>s plegables, que vincula un <c>v-model</c> para el modo de apertura única o múltiple."
    },
    accordionItem: {
      blurb: "Un único panel plegable dentro de un <c>ArcanaAccordion</c>, identificado por un <c>name</c>, con cabecera <c>title</c> y cuerpo por slot."
    },
    dropdown: {
      blurb: "Un menú desplegable shadcn que se teletransporta a <c>&lt;body&gt;</c>, se autoposiciona y cierra al clicar fuera, con Escape o al seleccionar."
    },
    dropdownItem: {
      blurb: "Una fila dentro de un <c>ArcanaDropdown</c> — <c>icon</c>, etiqueta y <c>suffix</c> opcionales — coloreable, con separador <c>divided</c> para acciones destructivas."
    },
    table: {
      blurb: "Una tabla shadcn estática para arrays en memoria; las columnas declaran <c>{ key, label, width?, align?, valueGetter? }</c>, con slots de celda y pie."
    },
    specSheet: {
      blurb: "Una \"ficha técnica\" editorial de solo lectura para registros formales, con antetítulo <c>docNum</c>, un <c>title</c> y secciones hijas."
    },
    specSheetSection: {
      blurb: "Una sección dentro de un <c>ArcanaSpecSheet</c> — <c>icon</c> de acento, <c>title</c> y <c>sectionNum</c> sobre una cuadrícula <c>columns</c> de campos."
    },
    specSheetField: {
      blurb: "Un único par etiqueta/valor; un valor vacío muestra <c>emptyText</c> para que los huecos parezcan intencionales, y <c>span</c> lo ensancha."
    },
    summaryTiles: {
      blurb: "El contenedor de cuadrícula responsiva para tiles de KPI; ajusta <c>columns</c> (3 por defecto), colapsando a una por debajo de 880px."
    },
    summaryTile: {
      blurb: "Una estadística KPI compacta dispuesta como <c>[icon] [label + sub] [value]</c>, en cuatro <c>tone</c>s fáciles de escanear."
    },
    settingsList: {
      blurb: "Un contenedor estilo Ajustes de iOS con filas separadas por líneas finas, cada una con etiqueta + subtítulo y un control alineado a la derecha."
    },
    settingsListGroup: {
      blurb: "Una sección titulada, opcionalmente <c>collapsible</c>, dentro de un <c>ArcanaSettingsList</c>, con un icono, <c>sectionNum</c> y <c>meta</c>."
    },
    settingsListItem: {
      blurb: "Una única fila de ajustes — <c>label</c> + <c>caption</c> a la izquierda, tu control a la derecha."
    },
    settingsEditableField: {
      blurb: "Una fila inteligente que agrupa un valor de solo lectura, un botón \"Alterar\" y su modal de edición en una etiqueta (<c>text</c>/<c>currency</c>/<c>number</c>/<c>select</c>)."
    },
    sparkGridEmptyState: {
      blurb: "Un envoltorio que cambia el contenido de una cuadrícula por un panel de onboarding solo cuando <c>total</c> es 0 y no hay filtro activo."
    },
    notice: {
      blurb: "Un banner en línea en seis variantes semánticas con iconos a juego, opcionalmente <c>dismissible</c>, para avisos y errores no bloqueantes."
    },
    editFieldModal: {
      blurb: "Un envoltorio de modal genérico \"Alterar X\" gobernado por ref que aporta el marco y recibe el input del campo por su slot."
    },
    requiredFieldsDialog: {
      blurb: "Un diálogo ámbar que lista los campos obligatorios que aún faltan en un formulario multipaso, cada pista apuntando al paso a corregir."
    },
    onboardingPanel: {
      blurb: "Un panel pulido de estado vacío / CTA para la configuración inicial — icono con degradado, título, descripción y una llamada a la acción principal."
    },
    loadingOverlay: {
      blurb: "Una superposición de spinner acotada sobre un fondo difuminado, que cubre su ancestro posicionado más cercano; se alterna con <c>visible</c>."
    },
    skeleton: {
      blurb: "Un bloque marcador de posición con brillo para estados de carga; ajusta <c>width</c>/<c>height</c>, elige un preset <c>rounded</c> y respeta reduced-motion."
    },
    switchCard: {
      blurb: "Un toggle de alto impacto a todo el ancho que pone toda la tarjeta esmeralda al activarse — resérvalo para ajustes importantes."
    },
    switchRow: {
      blurb: "Un toggle de fila de ajustes a todo el ancho — título + descripción a la izquierda, un switch compacto a la derecha, toda la fila clicable."
    },
    switchSegmented: {
      blurb: "Un toggle binario con forma de cápsula segmentada con un indicador deslizante, que se lee como \"A o B\" en lugar de on/off."
    }
  }
};
