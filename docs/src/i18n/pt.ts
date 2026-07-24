import type { Messages } from "./types";

export const pt: Messages = {
  meta: { htmlLang: "pt-BR", locale: "pt-BR" },
  langName: "Português",

  shell: {
    kicker: "Documentação · v0.x",
    lead: "Uma biblioteca de componentes tipada, no estilo shadcn. Vue 3 já hoje; adaptadores React, Angular e Svelte estão a caminho — mesma API, mesmo visual, em qualquer framework.",
    brandLib: "UI Components",
    docTitle: "Arcana UI Components",
    searchPlaceholder: "Buscar componentes… (⌘K)",
    searchAria: "Buscar na documentação",
    chooseFramework: "Escolher framework",
    chooseLanguage: "Escolher idioma",
    openNav: "Abrir navegação",
    closeNav: "Fechar navegação",
    sidebarAria: "Navegação da documentação",
    noSectionsFound: "Nenhum componente encontrado.",
    previewTab: "Prévia",
    codeTab: "Código",
    codeOnlyLabel: "Código",
    defaultPreviewCaption: "componente ao vivo · interaja com ele",
    sectionExampleAria: "Exemplo de {title}",
    githubStars: "{count} estrelas no GitHub",
    footer: "Arcana UI Components · MIT"
  },

  codeBlock: {
    copy: "Copiar",
    copied: "Copiado!"
  },

  categories: {
    gettingStarted: "Começando",
    forms: "Formulários",
    dataDisplay: "Exibição de dados",
    overlay: "Sobreposição",
    layoutNav: "Layout & navegação",
    feedback: "Feedback"
  },

  gettingStarted: {
    install: {
      title: "Instalação",
      p1: "A biblioteca é distribuída como um único pacote npm. Instale com o gerenciador de sua preferência — <c>vue</c> (3.4+) é a única peer dependency.",
      p2: "Todos os componentes Vue são exportados pelo subpath <c>@arcanalabs/ui-components/vue</c> como SFCs autocontidos; importe apenas os que você usa."
    },
    usage: {
      title: "Uso",
      p1: "Importe um componente e use no seu template. Todos seguem as mesmas convenções: <c>v-model</c> para valores bidirecionais, props em kebab-case e um evento <c>change</c> ao lado do <c>update:modelValue</c>.",
      p2: "A paleta é a escala neutra shadcn <i>zinc</i>, então os componentes convivem bem lado a lado sem nenhuma configuração de tema."
    },
    styles: {
      title: "Estilos",
      p1: "Importe a folha de estilos uma vez, na raiz da aplicação: <c>import '@arcanalabs/ui-components/styles.css'</c>. Ela carrega os tokens visuais de todos os componentes.",
      p2: "Os estilos são CSS puro, escopado por componente — não há engine de estilo em runtime nem exigência de Tailwind no consumidor."
    },
    maska: {
      title: "Registrando o v-maska",
      p1: "Alguns componentes (<c>ShadcnInputMask</c>, <c>ShadcnDatePicker</c>) dependem da diretiva <c>v-maska</c> do pacote <c>maska</c>. Registre-a globalmente uma vez ao criar o app.",
      p2: "Componentes que não usam máscara não exigem setup extra — este passo só é necessário se você renderizar um input com máscara."
    }
  },

  propsTable: {
    name: "Prop",
    type: "Tipo",
    default: "Padrão",
    description: "Descrição",
    caption: "Props",
    eventsTitle: "Eventos emitidos"
  },

  demoCaption: "componente ao vivo · interaja com ele",
  comingSoon: "A documentação completa deste componente chega num próximo lote. Ele já é exportado por <c>@arcanalabs/ui-components/vue</c> e está pronto para uso.",
  frameworkSoon: "// Adaptadores React · Angular · Svelte em breve.\n// Vue 3 já está disponível — troque o seletor de framework para Vue.",

  components: {
    button: {
      blurb: "Um botão clicável que espelha a geometria do botão shadcn (13px / peso 500 / raio 6). Quinze variantes semânticas cobrem ações primárias, fluxos destrutivos, contornos neutros e destaques de status. O rótulo vem pelo slot default; os cliques são expostos pelo evento <c>click</c>."
    },
    badge: {
      blurb: "Uma pílula compacta para contadores, status e tags. Seis variantes de cor combinam com um <c>dot</c> indicador opcional à esquerda, dois tamanhos e um modo <c>clickable</c> que adiciona affordance de ponteiro para badges acionáveis. O conteúdo vem do slot default."
    },
    input: {
      blurb: "Um <c>&lt;input&gt;</c> nativo com estilo shadcn e um <c>v-model</c> ciente de números (um <c>type=\"number\"</c> vazio emite <c>null</c>; um válido emite um número de verdade). Atributos HTML padrão — <c>placeholder</c>, <c>readonly</c>, <c>min/max/step</c>, <c>maxlength</c>, <c>autocomplete</c> — passam direto."
    },
    select: {
      blurb: "Um select totalmente custom — sem Element Plus por baixo. O dropdown é teleportado pro <c>&lt;body&gt;</c> com posicionamento auto-flip e suporta seleção única ou <c>multiple</c>, filtro <c>searchable</c> embutido, affordance <c>clearable</c> no hover e navegação completa por teclado. As opções aceitam strings simples ou objetos <c>{ label, value, disabled?, description? }</c>."
    },
    checkbox: {
      blurb: "Um checkbox binário que envolve um <c>&lt;input type=\"checkbox\"&gt;</c> nativo <b>de verdade</b> — logo é amigável a teclado e a drivers de teste (o <c>check()</c>/<c>uncheck()</c> do Dusk funciona). Use para escolher itens de uma lista; um estado <c>indeterminate</c> mostra o clássico traço de \"alguns selecionados\". Prefira o <c>ShadcnSwitch</c> para ligar/desligar uma configuração."
    },
    switch: {
      blurb: "Um toggle binário liga/desliga que segue o padrão WAI-ARIA de switch (<c>role=\"switch\"</c> + <c>aria-checked</c>, Space/Enter ativam). O trilho é colorido por semântica para leitura rápida — vermelho quando off, verde quando on — e um checkbox escondido opcional (<c>name</c>) integra com o submit de formulários nativos."
    },
    tabs: {
      blurb: "Tabs custom guiadas por um array <c>tabs</c> e um <c>v-model</c> com o nome da aba ativa. Cada aba vira um slot nomeado. Seis variantes visuais — <c>pills</c>, <c>underline</c>, <c>boxed</c>, <c>sidebar</c>, <c>sidebar-soft</c>, <c>segmented</c> — cobrem desde abas compactas em modais até navegação lateral completa, com ícones e badges opcionais e um modo <c>keepAlive</c> que preserva os painéis inativos."
    },
    dialog: {
      blurb: "Um modal no estilo shadcn com API baseada em ref — chame <c>show()</c> / <c>hide()</c> no ref do componente em vez de usar <c>v-model</c>. Ele teleporta pro <c>&lt;body&gt;</c>, prende o foco, fecha no Escape (e opcionalmente no clique do overlay) e empilha corretamente quando aninhado. Presets de tamanho vão de <c>sm → full</c>; os slots <c>header</c> e <c>footer</c> são opcionais (o slot footer recebe <c>{ hide }</c>)."
    }
  }
};
