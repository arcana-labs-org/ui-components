import type { Messages } from "./types";

export const zh: Messages = {
  meta: { htmlLang: "zh-CN", locale: "zh-CN" },
  langName: "中文",

  shell: {
    kicker: "文档 · v0.x",
    lead: "一个带类型、shadcn 风格的组件库。Vue 3 今天即可使用；React、Angular 和 Svelte 适配器正在路上——相同的 API、相同的外观，适用于任何框架。",
    brandLib: "UI Components",
    docTitle: "Arcana UI Components",
    searchPlaceholder: "搜索组件…（⌘K）",
    searchAria: "搜索文档",
    chooseFramework: "选择框架",
    chooseLanguage: "选择语言",
    openNav: "打开导航",
    closeNav: "关闭导航",
    sidebarAria: "文档导航",
    noSectionsFound: "未找到组件。",
    previewTab: "预览",
    codeTab: "代码",
    codeOnlyLabel: "代码",
    defaultPreviewCaption: "实时组件 · 可交互",
    sectionExampleAria: "{title} 示例",
    githubStars: "GitHub 上 {count} 个星标",
    footer: "Arcana UI Components · MIT"
  },

  codeBlock: {
    copy: "复制",
    copied: "已复制！"
  },

  categories: {
    gettingStarted: "开始使用",
    forms: "表单",
    dataDisplay: "数据展示",
    overlay: "浮层",
    layoutNav: "布局与导航",
    feedback: "反馈"
  },

  gettingStarted: {
    install: {
      title: "安装",
      p1: "该库以单个 npm 包的形式发布。用你喜欢的包管理器安装即可——<c>vue</c>（3.4+）是唯一的 peer dependency。",
      p2: "所有 Vue 组件都从 <c>@arcanalabs/ui-components/vue</c> 子路径导出，均为自包含的 SFC；只导入你需要的即可。"
    },
    usage: {
      title: "用法",
      p1: "导入一个组件并放入模板即可。所有组件遵循相同约定：用 <c>v-model</c> 进行双向绑定、prop 使用 kebab-case，并在 <c>update:modelValue</c> 旁提供对应的 <c>change</c> 事件。",
      p2: "调色板采用中性的 shadcn <i>zinc</i> 色阶，因此组件彼此并列时无需任何主题配置也很协调。"
    },
    styles: {
      title: "样式",
      p1: "在应用根部导入一次样式表：<c>import '@arcanalabs/ui-components/styles.css'</c>。它包含每个组件的视觉令牌。",
      p2: "样式是按组件作用域的纯 CSS——没有运行时样式引擎，也不要求使用方引入 Tailwind。"
    },
    maska: {
      title: "注册 v-maska",
      p1: "少数组件（<c>ShadcnInputMask</c>、<c>ShadcnDatePicker</c>）依赖来自 <c>maska</c> 包的 <c>v-maska</c> 指令。创建应用时全局注册一次即可。",
      p2: "不使用掩码的组件无需额外设置——只有渲染带掩码的输入框时才需要此步骤。"
    }
  },

  propsTable: {
    name: "属性",
    type: "类型",
    default: "默认值",
    description: "说明",
    caption: "属性",
    eventsTitle: "触发的事件"
  },

  demoCaption: "实时组件 · 可交互",
  comingSoon: "该组件的完整文档将在后续批次中提供。它已经从 <c>@arcanalabs/ui-components/vue</c> 导出，可直接使用。",
  frameworkSoon: "// React · Angular · Svelte 适配器即将推出。\n// Vue 3 今天即可使用——请将框架切换到 Vue。",

  components: {
    button: {
      blurb: "一个可点击的按钮，镜像 shadcn 按钮的几何尺寸（13px / 字重 500 / 圆角 6）。十五种语义变体覆盖主要操作、破坏性流程、中性描边和状态强调。标签通过默认插槽提供；点击通过 <c>click</c> 事件暴露。"
    },
    badge: {
      blurb: "用于计数、状态和标签的紧凑胶囊。六种颜色变体可搭配左侧可选的 <c>dot</c> 指示点、两种尺寸，以及为可操作徽章增加指针可供性的 <c>clickable</c> 模式。内容来自默认插槽。"
    },
    input: {
      blurb: "一个带 shadcn 样式的原生 <c>&lt;input&gt;</c>，并具备数字感知的 <c>v-model</c>（空的 <c>type=\"number\"</c> 会发出 <c>null</c>，有效的会发出真正的数字）。标准 HTML 属性——<c>placeholder</c>、<c>readonly</c>、<c>min/max/step</c>、<c>maxlength</c>、<c>autocomplete</c>——直接透传。"
    },
    select: {
      blurb: "一个完全自定义的下拉选择——底层不使用 Element Plus。下拉面板被传送到 <c>&lt;body&gt;</c>，具备自动翻转定位，支持单选或 <c>multiple</c> 多选、内置的 <c>searchable</c> 过滤、悬停时的 <c>clearable</c> 清除可供性以及完整的键盘导航。选项接受纯字符串或 <c>{ label, value, disabled?, description? }</c> 对象。"
    },
    checkbox: {
      blurb: "一个二态复选框，内部封装了<b>真正的</b>原生 <c>&lt;input type=\"checkbox\"&gt;</c>——因此对键盘和测试驱动都友好（Dusk 的 <c>check()</c>/<c>uncheck()</c> 可用）。用它从列表中选择项目；<c>indeterminate</c> 状态会显示经典的“部分选中”横线。若要开关某个设置，请改用 <c>ShadcnSwitch</c>。"
    },
    switch: {
      blurb: "一个遵循 WAI-ARIA switch 模式的二态开关（<c>role=\"switch\"</c> + <c>aria-checked</c>，空格/回车可激活）。轨道按语义着色以便快速扫读——关闭时为红色，开启时为绿色——可选的隐藏复选框（<c>name</c>）可与原生表单提交集成。"
    },
    tabs: {
      blurb: "由 <c>tabs</c> 数组和持有活动标签名的 <c>v-model</c> 驱动的自定义标签页。每个标签成为一个具名插槽。六种视觉变体——<c>pills</c>、<c>underline</c>、<c>boxed</c>、<c>sidebar</c>、<c>sidebar-soft</c>、<c>segmented</c>——覆盖从模态框中的紧凑标签到完整侧边栏导航，支持可选的图标和徽章，以及保留非活动面板的 <c>keepAlive</c> 模式。"
    },
    dialog: {
      blurb: "一个基于 ref 的 API 的 shadcn 风格模态框——在组件 ref 上调用 <c>show()</c> / <c>hide()</c>，而不是绑定 <c>v-model</c>。它传送到 <c>&lt;body&gt;</c>、锁定焦点、按 Escape 关闭（也可选在点击遮罩时关闭），并在嵌套时正确分层。尺寸预设从 <c>sm → full</c>；<c>header</c> 和 <c>footer</c> 插槽是可选的（footer 插槽会接收 <c>{ hide }</c>）。"
    }
  }
};
