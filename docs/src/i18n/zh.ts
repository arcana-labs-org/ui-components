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
    },
    inputMask: {
      blurb: "一个基于 <c>v-maska</c> 指令构建、样式与 <c>ShadcnInput</c> 一致的带掩码文本输入框。传入一个 <c>mask</c> 字符串，或传入字符串数组以按长度动态切换掩码（例如固定电话与手机）。<c>v-model</c> 始终保存<b>原始</b>值——不含掩码字符——因此 CPF、CNPJ、CEP 或电话号码会以未格式化的形式到达后端，而字段显示格式化后的内容。需要全局注册 <c>v-maska</c>。"
    },
    inputBoolean: {
      blurb: "用于布尔字段的是/否选择器，渲染为一个 <c>ShadcnSelect</c>。它会规范化常见的布尔形式——<c>true</c>/<c>1</c>、<c>false</c>/<c>0</c>、<c>null</c>。<c>variation</c> 可将标签切换为 <c>status</c>（Ativo/Inativo）或用于筛选的类 SQL <c>nullable</c> 值（<c>IS_NOT_NULL</c>/<c>IS_NULL</c>）。当 <c>clearable</c>（默认）时，顶部的“Todos”选项会将值重置为 <c>null</c>。"
    },
    numberStepper: {
      blurb: "一个两侧带 <c>−</c> / <c>+</c> 按钮的数字输入框，便于精细调整数量。按钮会遵循 <c>min</c> / <c>max</c> / <c>step</c> 并在到达边界时禁用；上/下方向键可通过键盘操作，失焦时空值或无效值会被强制为 <c>min</c>。原生步进器被隐藏，改用自定义按钮。"
    },
    multiSelectPopover: {
      blurb: "一个传送到 body 的通用弹出层，带可配置的标签页和复选框多选——是跨多个分组的选择器（用户 + 部门、分店、机器……）的可复用基座。<c>v-model</c> 是一个 <c>{ [tabKey]: number[] }</c> 映射，每个标签页对应一个已选 id 数组。每个标签页提供一个异步 <c>fetch()</c>，其结果在组件生命周期内被缓存；面板会翻转和平移以留在视口内。<c>trigger</c> 和 <c>item</c> 插槽可自定义渲染。"
    },
    radioCardGroup: {
      blurb: "一组由真实 <c>&lt;input type=\"radio\"&gt;</c> 元素支撑的可选卡片——当选项不多且每个都带描述、图标或徽标时，比下拉选择更有触感。选项是 <c>{ label, value, description?, icon?, badge?, disabled? }</c> 对象。可将它们堆叠排列、<c>inline</c> 排列，或按固定的 <c>columns</c> 列数排列；当左侧图标应承载视觉重心时，可把单选圆点移到 <c>end</c>。"
    },
    segmentedOptions: {
      blurb: "用于 N 个互斥选项的分段控件，渲染在一个胶囊内——是二元 <c>ShadcnSwitchSegmented</c> 的多选项兄弟组件。激活的分段会被高亮；选项可接受可选的 <c>icon</c> 和逐项的 <c>disabled</c>。<c>compact</c> 与 <c>squared</c> 调整几何外观，<c>activeColor</c> 覆盖激活项的填充色，<c>autoSelectFirst</c> 会在未选择任何项时选中第一个启用的选项（适合动态列表）。"
    },
    datePicker: {
      blurb: "一个 shadcn 风格的日期字段。对于 <c>type=\"date\"</c>，它将一个实时掩码的 <c>DD/MM/AAAA</c> 文本输入框（通过 <c>v-maska</c>）与由日历图标打开的 Element Plus 日历弹出层组合在一起；其他 type（<c>daterange</c>、<c>month</c>、<c>year</c>）直接使用日历。<c>v-model</c> 是 ISO <c>YYYY-MM-DD</c> 字符串（区间则为元组），且键入的日期会经过严格校验（31/02 会被拒绝）。"
    },
    inputCurrency: {
      blurb: "一个基于 <c>v-money3</c> 的货币输入框，会在用户输入时实时格式化——千位分隔符、小数逗号，以及可配置的小数位数 <c>fraction</c>（默认 BRL）。启用 <c>shadcn</c> 标志可得到带左侧货币图标的 zinc 风格字段；<c>min</c> / <c>max</c> 会约束数值，<c>allowBlank</c> 允许空字段。<c>v-model</c> 承载格式化后的字符串；禁用状态显示只读的格式化值。"
    },
    labeledButton: {
      blurb: "更高层按钮封装背后的基础按钮：一个 <c>label</c>、一个可选的左侧 <c>icon</c>（FontAwesome 类）以及一个 <c>loading</c> 状态，会把图标换成加载动画并禁用按钮。设置 <c>shadcn</c> 标志可将旧的 <c>color</c> 属性映射到语义化的 shadcn 变体（danger → destructive、grey → ghost、blue → info…）；不设置则保留旧的 Bootstrap 样式。<c>centerLabel</c> / <c>centerContent</c> 控制全宽按钮中的对齐。"
    },
    accordion: {
      blurb: "一组可折叠的 <c>ShadcnAccordionItem</c> 的容器。它通过 provide/inject 向子组件提供展开/折叠状态，并绑定到一个 <c>v-model</c>。在默认的单开（<c>accordion</c>）模式下，模型是当前展开项的 <c>name</c>（或 <c>null</c>）；设置 <c>:accordion=\"false\"</c> 进入多开模式，此时模型变为展开项 name 的数组。"
    },
    accordionItem: {
      blurb: "<c>ShadcnAccordion</c> 内的单个可折叠面板，由必填的 <c>name</c> 标识。头部显示 <c>title</c> 属性（或用 <c>title</c> 插槽做富头部）以及一个展开时旋转的箭头；默认插槽是可折叠的主体。<c>disabled</c> 会阻止切换。它从父级 accordion 读取展开状态——只有嵌套在其中才能工作。"
    },
    dropdown: {
      blurb: "一个替代 <c>el-dropdown</c> 的 shadcn 风格下拉菜单。<c>trigger</c> 插槽放置用于打开菜单的元素；默认插槽放置 <c>ShadcnDropdownItem</c>（并会收到一个 <c>close</c> 辅助函数）。菜单会传送到 <c>&lt;body&gt;</c> 以摆脱祖先的 <c>overflow:hidden</c>，通过自动翻转/平移定位，并在点击外部、按 Escape 或选择项时关闭。<c>placement</c> 和 <c>size</c> 密度（会传播给各项）可对其进行调整。"
    },
    dropdownItem: {
      blurb: "<c>ShadcnDropdown</c> 内的一行：一个可选的 <c>icon</c>、标签（默认插槽）以及一个可选的 <c>suffix</c> 插槽（例如快捷键）。<c>variant</c> 将其着色为 <c>default</c>、<c>danger</c>、<c>success</c> 或 <c>warning</c>；<c>divided</c> 会在其上方画一条分隔线以隔离破坏性操作。点击时会触发 <c>click</c>，并——除非 <c>closeOnClick</c> 为 false——通过一个冒泡的自定义事件请求父下拉菜单关闭。"
    }
  }
};
