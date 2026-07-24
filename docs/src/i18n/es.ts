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
  comingSoon: "La documentación completa de este componente llegará en un próximo lote. Ya se publica para Vue, React, Angular y Svelte y está lista para usar.",
  frameworkSoon: "// Vue, React, Angular y Svelte ofrecen el mismo componente — elige un framework arriba para ver su uso.",

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
    },
    inputMask: {
      blurb: "Un input de texto con máscara construido sobre la directiva <c>v-maska</c> y con el mismo estilo que <c>ShadcnInput</c>. Pasa una string en <c>mask</c>, o un array de strings para máscaras dinámicas según la longitud (p. ej. fijo vs. móvil). El <c>v-model</c> siempre guarda el valor <b>raw</b> — sin los caracteres de la máscara —, así CPF, CNPJ, CEP o teléfonos llegan sin formato al backend mientras el campo muestra la vista formateada. Requiere <c>v-maska</c> registrado globalmente."
    },
    inputBoolean: {
      blurb: "Un select sí/no para campos booleanos, renderizado como un <c>ShadcnSelect</c>. Normaliza las formas booleanas habituales — <c>true</c>/<c>1</c>, <c>false</c>/<c>0</c>, <c>null</c>. Una <c>variation</c> cambia las etiquetas a <c>status</c> (Ativo/Inativo) o a valores tipo SQL <c>nullable</c> (<c>IS_NOT_NULL</c>/<c>IS_NULL</c>) para filtros. Cuando es <c>clearable</c> (por defecto), una opción \"Todos\" al inicio reinicia el valor a <c>null</c>."
    },
    numberStepper: {
      blurb: "Un input numérico flanqueado por botones <c>−</c> / <c>+</c> para ajustes finos de cantidad. Los botones respetan <c>min</c> / <c>max</c> / <c>step</c> y se desactivan en los límites; las flechas Arriba/Abajo funcionan desde el teclado, y una entrada vacía o inválida se coacciona a <c>min</c> al perder el foco. Los spinners nativos se ocultan a favor de los botones personalizados."
    },
    multiSelectPopover: {
      blurb: "Un popover genérico teletransportado al body con pestañas configurables y multiselección por checkbox — una base reutilizable para selectores que abarcan varios buckets (usuarios + departamentos, sucursales, máquinas…). El <c>v-model</c> es un mapa <c>{ [tabKey]: number[] }</c>, un array de ids seleccionados por pestaña. Cada pestaña aporta un <c>fetch()</c> asíncrono cuyo resultado se cachea durante la vida del componente; el panel hace flip y shift para caber en el viewport. Los slots <c>trigger</c> e <c>item</c> personalizan el renderizado."
    },
    radioCardGroup: {
      blurb: "Un grupo de tarjetas seleccionables respaldadas por elementos <c>&lt;input type=\"radio\"&gt;</c> reales — más táctil que un select cuando hay pocas opciones y cada una lleva descripción, icono o badge. Las opciones son objetos <c>{ label, value, description?, icon?, badge?, disabled? }</c>. Colócalas apiladas, <c>inline</c>, o en un número fijo de <c>columns</c>, y mueve el radio al <c>end</c> cuando un icono a la izquierda deba llevar el peso visual."
    },
    segmentedOptions: {
      blurb: "Un control segmentado para N opciones mutuamente excluyentes dentro de una cápsula — el hermano multiopción del binario <c>ShadcnSwitchSegmented</c>. El segmento activo se resalta; las opciones aceptan un <c>icon</c> opcional y un <c>disabled</c> por opción. <c>compact</c> y <c>squared</c> ajustan la geometría, <c>activeColor</c> sobrescribe el relleno del activo, y <c>autoSelectFirst</c> elige la primera opción habilitada cuando no hay nada seleccionado (útil en listas dinámicas)."
    },
    datePicker: {
      blurb: "Un campo de fecha con estilo shadcn. Para <c>type=\"date\"</c> compone un input de texto con máscara en vivo <c>DD/MM/AAAA</c> (vía <c>v-maska</c>) con un popover de calendario de Element Plus que abre el icono de calendario; los demás types (<c>daterange</c>, <c>month</c>, <c>year</c>) usan el calendario directamente. El <c>v-model</c> es una string ISO <c>YYYY-MM-DD</c> (o una tupla para rangos), y las fechas escritas se validan estrictamente (31/02 se rechaza)."
    },
    inputCurrency: {
      blurb: "Un input de moneda construido sobre <c>v-money3</c> que formatea mientras el usuario escribe — separador de miles, coma decimal y una <c>fraction</c> configurable de decimales (BRL por defecto). Activa la flag <c>shadcn</c> para el campo con estilo zinc e icono de moneda a la izquierda; <c>min</c> / <c>max</c> acotan el valor y <c>allowBlank</c> permite un campo vacío. El <c>v-model</c> lleva la string formateada; el estado deshabilitado muestra un valor formateado de solo lectura."
    },
    labeledButton: {
      blurb: "El botón base detrás de los wrappers de botón de más alto nivel: un <c>label</c>, un <c>icon</c> opcional a la izquierda (clase FontAwesome) y un estado <c>loading</c> que cambia el icono por un spinner y desactiva el botón. Activa la flag <c>shadcn</c> para mapear la prop heredada <c>color</c> a una variante semántica de shadcn (danger → destructive, grey → ghost, blue → info, …); sin ella se conserva el estilo Bootstrap heredado. <c>centerLabel</c> / <c>centerContent</c> controlan la alineación en botones full-width."
    },
    accordion: {
      blurb: "El contenedor de un conjunto de <c>ShadcnAccordionItem</c>s colapsables. Provee el estado abierto/cerrado a sus hijos mediante provide/inject y se enlaza a un <c>v-model</c>. En el modo single por defecto (<c>accordion</c>) el modelo es el <c>name</c> del ítem abierto (o <c>null</c>); usa <c>:accordion=\"false\"</c> para el modo múltiple, donde el modelo pasa a ser un array de names abiertos."
    },
    accordionItem: {
      blurb: "Un único panel colapsable dentro de un <c>ShadcnAccordion</c>, identificado por un <c>name</c> obligatorio. La cabecera muestra la prop <c>title</c> (o un slot <c>title</c> para cabeceras ricas) más un chevron que gira al abrir; el slot por defecto es el cuerpo colapsable. <c>disabled</c> bloquea el toggle. Lee su estado abierto del accordion padre — solo funciona anidado dentro de uno."
    },
    dropdown: {
      blurb: "Un menú desplegable al estilo shadcn que reemplaza a <c>el-dropdown</c>. El slot <c>trigger</c> contiene lo que lo abre; el slot por defecto contiene los <c>ShadcnDropdownItem</c>s (y recibe un helper <c>close</c>). El menú se teletransporta a <c>&lt;body&gt;</c> para escapar del <c>overflow:hidden</c> de ancestros, se posiciona con flip/shift automático y se cierra al hacer clic fuera, con Escape o al seleccionar un ítem. <c>placement</c> y una densidad <c>size</c> (propagada a los ítems) lo ajustan."
    },
    dropdownItem: {
      blurb: "Una fila dentro de un <c>ShadcnDropdown</c>: un <c>icon</c> opcional, la etiqueta (slot por defecto) y un slot <c>suffix</c> opcional (p. ej. un atajo). <c>variant</c> lo colorea como <c>default</c>, <c>danger</c>, <c>success</c> o <c>warning</c>; <c>divided</c> dibuja un separador encima para aislar acciones destructivas. Al hacer clic emite <c>click</c> y — salvo que <c>closeOnClick</c> sea false — pide al dropdown padre que cierre mediante un evento personalizado que sube por bubbling."
    },
    table: {
      blurb: "Una tabla estática al estilo shadcn para arrays que ya tienes en memoria (a diferencia de <c>SparkGrid</c>, que hace fetch y paginación por backend). Las columnas declaran <c>{ key, label, width?, align?, valueGetter? }</c>; un slot <c>#cell-&lt;key&gt;</c> asume el render de cualquier celda, y un slot <c>#footer</c> rellena un <c>&lt;tfoot&gt;</c> para totales."
    },
    specSheet: {
      blurb: "Una \"spec sheet\" de solo lectura y editorial para registros formales — piensa en expedientes oficiales y datasheets. Un eyebrow mono <c>docNum</c> va sobre el <c>title</c> y un badge <c>meta</c> opcional; los hijos <c>&lt;ShadcnSpecSheetSection&gt;</c> contienen los campos y un slot <c>#footer</c> lleva las acciones de edición. Usa <c>flat</c> para quitar el chrome de la tarjeta al incrustarla dentro de otra."
    },
    specSheetSection: {
      blurb: "Una sección dentro de un <c>ShadcnSpecSheet</c>: un <c>icon</c> boxed de acento opcional (ocho colores) + <c>title</c> + un <c>sectionNum</c> a la derecha, sobre una grilla de <c>columns</c> configurable de <c>&lt;ShadcnSpecSheetField&gt;</c>. Un slot <c>#actions</c> aloja botones en la cabecera; <c>noRowDividers</c> y <c>compact</c> ajustan el layout."
    },
    specSheetField: {
      blurb: "Un par etiqueta/valor dentro de una sección. La <c>label</c> se muestra en mayúsculas mono y el <c>value</c> en Inter; un valor vacío (<c>null</c>/<c>undefined</c>/'') muestra <c>emptyText</c> en cursiva atenuada para que los huecos se lean como intencionales. Usa <c>span</c> para ensanchar un campo, o el slot por defecto para badges, enlaces y otros valores ricos."
    },
    summaryTiles: {
      blurb: "El contenedor en grilla responsiva para una fila de tiles de KPI. Define <c>columns</c> (por defecto 3); por debajo de 880px siempre colapsa a una sola columna. Coloca tantos <c>&lt;ShadcnSummaryTile&gt;</c> como necesites."
    },
    summaryTile: {
      blurb: "Un stat de KPI compacto con layout <c>[icono] [label + sub] [valor]</c> en ~52px de alto. Cuatro <c>tone</c>s — <c>neutral</c>, <c>positive</c>, <c>negative</c>, <c>indigo</c> — lo colorean para lectura rápida. Los slots <c>#value</c> y <c>#sub</c> sustituyen las props simples por badges inline o contenido más rico."
    },
    settingsList: {
      blurb: "Un contenedor al estilo Ajustes de iOS: filas separadas por hairlines, cada una con label + caption a la izquierda y un control a la derecha. Rellénalo con <c>&lt;ShadcnSettingsListItem&gt;</c>, <c>&lt;ShadcnSettingsListGroup&gt;</c> o el inteligente <c>&lt;ShadcnSettingsEditableField&gt;</c>."
    },
    settingsListGroup: {
      blurb: "Una sección titulada dentro de un <c>ShadcnSettingsList</c> para agrupar filas relacionadas. La cabecera lleva un <c>icon</c> boxed opcional (ocho colores), un <c>sectionNum</c> y un <c>meta</c> a la derecha. Usa <c>collapsible</c> para volver la cabecera un toggle (con <c>defaultCollapsed</c>) y <c>compact</c> para mayor densidad."
    },
    settingsListItem: {
      blurb: "Una fila de un <c>ShadcnSettingsList</c>: <c>label</c> + <c>caption</c> a la izquierda, tu control en el slot por defecto a la derecha. El slot <c>#label</c> permite incrustar un badge de estado; <c>nested</c> aplica el estilo de sub-ítem para toggles que solo importan cuando un padre está activo; <c>disabled</c> atenúa y bloquea la fila."
    },
    settingsEditableField: {
      blurb: "Una fila inteligente que reúne el valor de solo lectura, un botón \"Alterar\" y su modal de edición en una sola etiqueta. Elige un <c>type</c> — <c>text</c>, <c>currency</c>, <c>number</c> o <c>select</c> — y renderiza el input correcto dentro de un modal teleportado. Las ediciones se bufferizan: cancelar las descarta, guardar emite tanto <c>update:modelValue</c> como <c>save</c> (para auto-guardado)."
    },
    sparkGridEmptyState: {
      blurb: "Un wrapper que cambia el contenido de una grilla por un <c>ShadcnOnboardingPanel</c> cuando realmente no hay nada que mostrar. Espera a que <c>loading</c> se asiente (true → false) y solo revela el panel cuando <c>total</c> es 0 y no hay filtro activo — así una lista filtrada hasta quedar vacía conserva su toolbar. Emite <c>panel-visible</c> para que el host oculte las acciones de cabecera."
    },
    notice: {
      blurb: "Un banner inline con variantes semánticas — <c>info</c>, <c>blue</c>, <c>success</c>, <c>warning</c>, <c>pending</c> y <c>destructive</c> — cada una con un icono por defecto acorde. Úsalo para avisos contextuales, tarjetas de estado y errores no bloqueantes. Añade <c>dismissible</c> para un botón de cerrar que emite <c>dismiss</c>; título, cuerpo e icono se pueden sustituir por slot."
    },
    editFieldModal: {
      blurb: "Un wrapper de modal \"Alterar X\" genérico para listas de configuración. Aporta el chrome (cabecera, footer, guardar/cancelar) y recibe el input del campo por su slot por defecto, así un solo componente sirve para cada fila editable en vez de un archivo por modal. Se maneja por ref (<c>show()</c> / <c>hide()</c>) y emite <c>save</c> sin cerrarse solo, para que valides primero."
    },
    requiredFieldsDialog: {
      blurb: "Un diálogo de advertencia ámbar que lista los campos obligatorios que aún faltan en un formulario multi-paso. Pasa un array <c>fields</c> de <c>{ key, label, hint }</c> — cada <c>hint</c> señala el paso a corregir — y ábrelo con una ref (<c>show()</c>). Reemplaza el viejo patrón de \"un <c>Alert.info</c> a la vez\" por una lista única y escaneable."
    },
    onboardingPanel: {
      blurb: "Un panel de empty-state / CTA pulido para la primera configuración: un icono en degradado dentro de anillos que laten, título + descripción, una CTA primaria y un botón secundario y sub-hint opcionales. Contrólalo todo por props, o usa los slots <c>#action</c> y <c>#sub-hint</c> para botones personalizados y texto rico. Emite <c>action</c> / <c>secondary-action</c>."
    },
    loadingOverlay: {
      blurb: "Un overlay de carga con alcance acotado — spinner + texto sobre un fondo translúcido con blur que cubre el ancestro posicionado más cercano (el padre necesita <c>position: relative</c>). Altérnalo con <c>visible</c> para feedback asíncrono a nivel de tarjeta/sección en vez de un loader a pantalla completa."
    },
    skeleton: {
      blurb: "Un bloque placeholder con shimmer para estados de carga. Define <c>width</c> / <c>height</c> con cualquier valor CSS y elige un preset <c>rounded</c> (<c>full</c> para avatares). Es <c>aria-hidden</c> (solo visual) y respeta <c>prefers-reduced-motion</c> — el shimmer se detiene pero el bloque permanece. Prefiérelo a placeholders falsos que parpadean cuando llegan los datos reales."
    },
    switchCard: {
      blurb: "Un toggle full-width de alto impacto: al activarse, toda la tarjeta se vuelve esmeralda con un switch interno invertido — puedes leer su estado a distancia. Resérvalo para ajustes de peso (2FA, modo mantenimiento, funciones premium). Un <c>icon</c> boxed, <c>title</c> y las líneas mono <c>statusOn</c>/<c>statusOff</c> lo describen."
    },
    switchRow: {
      blurb: "Un toggle de \"fila de ajustes\" full-width: título + descripción opcional a la izquierda, un switch compacto a la derecha, y toda la fila es clicable para un área de toque generosa. Es el término medio tranquilo entre un <c>ShadcnSwitch</c> pelado y el llamativo <c>ShadcnSwitchCard</c> — ideal para listas de preferencias relacionadas."
    },
    switchSegmented: {
      blurb: "Un toggle binario con forma de cápsula segmentada: dos mitades clicables con un indicador deslizante, así se lee como \"A o B\" en vez de on/off. Genial para elecciones etiquetadas (mensual / anual, sandbox / producción). <c>compact</c> y <c>squared</c> ajustan la geometría, <c>activeColor</c> recolorea el indicador, y las flechas navegan entre lados."
    }
  }
};
