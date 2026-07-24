import type { Messages } from "./types";

export const ja: Messages = {
  meta: { htmlLang: "ja", locale: "ja-JP" },
  langName: "日本語",

  shell: {
    kicker: "ドキュメント · v0.x",
    lead: "型付きの shadcn スタイルのコンポーネントライブラリです — Vue 3・React・Angular・Svelte で、同じ API、同じ見た目を、どのフレームワークでも。",
    brandLib: "UI Components",
    docTitle: "Arcana UI Components",
    searchPlaceholder: "コンポーネントを検索…（⌘K）",
    searchAria: "ドキュメントを検索",
    chooseFramework: "フレームワークを選択",
    chooseLanguage: "言語を選択",
    openNav: "ナビゲーションを開く",
    closeNav: "ナビゲーションを閉じる",
    sidebarAria: "ドキュメントのナビゲーション",
    noSectionsFound: "コンポーネントが見つかりません。",
    previewTab: "プレビュー",
    codeTab: "コード",
    referenceTab: "Props とイベント",
    codeOnlyLabel: "コード",
    defaultPreviewCaption: "ライブコンポーネント · 操作できます",
    sectionExampleAria: "{title} の例",
    githubStars: "GitHub で {count} スター",
    footer: "Arcana UI Components · MIT"
  },

  codeBlock: {
    copy: "コピー",
    copied: "コピーしました！"
  },

  categories: {
    gettingStarted: "はじめに",
    forms: "フォーム",
    dataDisplay: "データ表示",
    overlay: "オーバーレイ",
    layoutNav: "レイアウトとナビゲーション",
    feedback: "フィードバック"
  },

  gettingStarted: {
    install: {
      title: "インストール",
      p1: "このライブラリは単一の npm パッケージとして提供されます。お好みのパッケージマネージャーでインストールしてください — <c>vue</c>（3.4+）が唯一の peer dependency です。",
      p2: "各コンポーネントは 4 つのフレームワーク向けに、対応するサブパスで公開されています — <c>@arcanalabs/ui-components/vue</c>、<c>/react</c>、<c>/angular</c>、<c>/svelte</c>。使うものだけをインポートしてください。 アイコンは Font Awesome Free を使用します。<c>@fortawesome/fontawesome-free</c> をインストールし、その CSS を一度読み込んでください。"
    },
    usage: {
      title: "使い方",
      p1: "コンポーネントをインポートしてテンプレートに置くだけです。すべて同じ規約に従います。双方向の値には <c>v-model</c>、props は kebab-case、そして <c>update:modelValue</c> と並んで対応する <c>change</c> イベントを発行します。",
      p2: "パレットはニュートラルな shadcn の <i>zinc</i> スケールなので、テーマ設定なしでもコンポーネントを並べて心地よく共存します。"
    },
    styles: {
      title: "スタイル",
      p1: "スタイルシートはアプリのルートで一度だけインポートします：<c>import '@arcanalabs/ui-components/styles.css'</c>。すべてのコンポーネントの視覚トークンを含みます。",
      p2: "スタイルはコンポーネントごとにスコープされた素の CSS です — ランタイムのスタイルエンジンも、利用側での Tailwind 要件もありません。"
    },
    maska: {
      title: "v-maska の登録",
      p1: "一部のコンポーネント（<c>ArcanaInputMask</c>、<c>ArcanaDatePicker</c>）は <c>maska</c> パッケージの <c>v-maska</c> ディレクティブに依存します。アプリ作成時に一度グローバル登録してください。",
      p2: "マスクを使わないコンポーネントに追加設定は不要です — この手順はマスク付き入力をレンダリングする場合にのみ必要です。"
    }
  },

  propsTable: {
    name: "プロパティ",
    type: "型",
    default: "デフォルト",
    description: "説明",
    caption: "プロパティ",
    eventsTitle: "発行イベント"
  },

  demoCaption: "ライブコンポーネント · 操作できます",
  comingSoon: "このコンポーネントの完全なドキュメントは今後のバッチで提供されます。すでに Vue・React・Angular・Svelte 向けに公開されており、そのまま利用できます。",
  frameworkSoon: "// Vue・React・Angular・Svelte は同じコンポーネントを提供します — 上部でフレームワークを選ぶと使い方を確認できます。",

  components: {
    button: {
      blurb: "15 種類のセマンティックなバリアントを持つ押下可能なボタンで、ラベルはデフォルトスロット、クリックは <c>click</c> イベントで扱います。"
    },
    badge: {
      blurb: "カウント・ステータス・タグ用のコンパクトなピルで、6 色・2 サイズに、任意の <c>dot</c> と <c>clickable</c> モードを備えます。"
    },
    input: {
      blurb: "shadcn スタイルと数値対応の <c>v-model</c> を備えたネイティブ <c>&lt;input&gt;</c> で、標準の HTML 属性はそのまま透過します。"
    },
    select: {
      blurb: "<c>&lt;body&gt;</c> にテレポートする完全カスタムなセレクト（Element Plus 不使用）で、単一/<c>multiple</c>、<c>searchable</c>、<c>clearable</c>、キーボード操作をサポートします。"
    },
    checkbox: {
      blurb: "本物のネイティブ <c>&lt;input type=\"checkbox\"&gt;</c> をラップし <c>indeterminate</c> 状態を持つ二値チェックボックスで、設定のオン/オフには <c>ArcanaSwitch</c> を使います。"
    },
    switch: {
      blurb: "赤/緑で色分けされた二値オン/オフトグル（WAI-ARIA スイッチ）で、ネイティブフォーム用の任意の隠しチェックボックスを備えます。"
    },
    tabs: {
      blurb: "<c>tabs</c> 配列と <c>v-model</c> で駆動するカスタムタブで、ピルからフルサイドバーナビゲーションまで 6 種類のバリアントを備えます。"
    },
    dialog: {
      blurb: "ref ベースの <c>show()</c>/<c>hide()</c> API を持つ shadcn モーダルで、<c>&lt;body&gt;</c> にテレポートし、フォーカスをトラップし、Escape で閉じます。"
    },
    inputMask: {
      blurb: "<c>v-maska</c> 上に構築され、<c>v-model</c> が常に <b>raw</b> の値（CPF・CNPJ・電話番号…）を保持するマスク付きテキスト入力で、<c>v-maska</c> のグローバル登録が必要です。"
    },
    inputBoolean: {
      blurb: "<c>true</c>/<c>false</c>/<c>null</c> を正規化するブール値フィールド向けの「はい/いいえ」セレクトで、status や SQL ライクなラベルのバリエーションを備えます。"
    },
    numberStepper: {
      blurb: "<c>min</c>/<c>max</c>/<c>step</c> と矢印キーを尊重する <c>−</c>/<c>+</c> ボタンを両脇に備えた数値入力です。"
    },
    multiSelectPopover: {
      blurb: "body にテレポートし、タブ付きチェックボックスで複数選択するポップオーバーで、<c>v-model</c> は <c>{ [tabKey]: number[] }</c> のマップ、各タブは非同期 <c>fetch()</c> で供給されます。"
    },
    radioCardGroup: {
      blurb: "本物の <c>&lt;input type=\"radio\"&gt;</c> に支えられた選択可能なカード群で、各カードに説明・アイコン・バッジを持ち、積み重ね・<c>inline</c>・<c>columns</c> で配置できます。"
    },
    segmentedOptions: {
      blurb: "ピル内に N 個の相互排他オプションを並べるセグメンテッドコントロールで、オプションごとのアイコンと無効化に対応します。"
    },
    datePicker: {
      blurb: "マスク付きの <c>DD/MM/AAAA</c> 入力とカレンダーポップオーバーを組み合わせた shadcn 日付フィールドで、<c>v-model</c> は ISO の <c>YYYY-MM-DD</c> 文字列です。"
    },
    inputCurrency: {
      blurb: "入力に合わせて整形する通貨入力（<c>v-money3</c> 上に構築）で、小数桁数の設定と <c>min</c>/<c>max</c> の制限を備え、デフォルトは BRL です。"
    },
    accordion: {
      blurb: "折りたたみ可能な <c>ArcanaAccordionItem</c> 群のコンテナで、単一または複数開けるモード向けに <c>v-model</c> をバインドします。"
    },
    accordionItem: {
      blurb: "<c>ArcanaAccordion</c> 内の単一の折りたたみパネルで、<c>name</c> で識別され、<c>title</c> ヘッダーとスロット本文を持ちます。"
    },
    dropdown: {
      blurb: "<c>&lt;body&gt;</c> にテレポートする shadcn ドロップダウンメニューで、自動配置し、外側クリック・Escape・選択で閉じます。"
    },
    dropdownItem: {
      blurb: "<c>ArcanaDropdown</c> 内の 1 行で、任意の <c>icon</c>・ラベル・<c>suffix</c> を持ち、色付け可能で、破壊的操作向けに <c>divided</c> の区切り線を備えます。"
    },
    table: {
      blurb: "メモリ上の配列向けの静的な shadcn テーブルで、列は <c>{ key, label, width?, align?, valueGetter? }</c> で宣言し、セルとフッターのスロットを備えます。"
    },
    specSheet: {
      blurb: "正式な記録のための読み取り専用・エディトリアルな\"スペックシート\"で、<c>docNum</c> のアイブロウ、<c>title</c>、セクションの子を備えます。"
    },
    specSheetSection: {
      blurb: "<c>ArcanaSpecSheet</c> 内のセクションで、アクセント <c>icon</c>・<c>title</c>・<c>sectionNum</c> が、フィールドの <c>columns</c> グリッドの上に並びます。"
    },
    specSheetField: {
      blurb: "単一のラベル/値ペアで、空の値は <c>emptyText</c> を表示して空白が意図的であることを示し、<c>span</c> で幅を広げます。"
    },
    summaryTiles: {
      blurb: "KPI タイル向けのレスポンシブなグリッドコンテナで、<c>columns</c>（デフォルト 3）を設定でき、880px 未満では 1 列に折りたたまれます。"
    },
    summaryTile: {
      blurb: "<c>[icon] [label + sub] [value]</c> のレイアウトのコンパクトな KPI スタットで、視認しやすい 4 種類の <c>tone</c> を備えます。"
    },
    settingsList: {
      blurb: "iOS 設定風の、ヘアラインで区切られた行のコンテナで、各行は左にラベル + キャプション、右寄せのコントロールを持ちます。"
    },
    settingsListGroup: {
      blurb: "<c>ArcanaSettingsList</c> 内のタイトル付きで任意に <c>collapsible</c> なセクションで、アイコン・<c>sectionNum</c>・<c>meta</c> を備えます。"
    },
    settingsListItem: {
      blurb: "単一の設定行で、左に <c>label</c> + <c>caption</c>、右にコントロールを置きます。"
    },
    settingsEditableField: {
      blurb: "読み取り専用の値・\"Alterar\"ボタン・編集モーダルを 1 つのタグにまとめたスマートな行です（<c>text</c>/<c>currency</c>/<c>number</c>/<c>select</c>）。"
    },
    notice: {
      blurb: "対応アイコン付きの 6 種類のセマンティックなバリアントを持つインラインバナーで、任意で <c>dismissible</c> にでき、注意喚起や非ブロッキングのエラーに使います。"
    },
    editFieldModal: {
      blurb: "枠を提供し、フィールド入力をスロットで受け取る、ref 駆動の汎用的な\"Alterar X\"モーダルラッパーです。"
    },
    requiredFieldsDialog: {
      blurb: "マルチステップフォームでまだ欠けている必須フィールドを列挙する琥珀色のダイアログで、各ヒントが修正すべきステップを示します。"
    },
    onboardingPanel: {
      blurb: "初回設定のための洗練された空状態 / CTA パネルで、グラデーションアイコン・タイトル・説明・主 CTA を備えます。"
    },
    loadingOverlay: {
      blurb: "ぼかした背景の上にスコープを限定したスピナーオーバーレイで、最も近い位置指定された祖先を覆い、<c>visible</c> で切り替えます。"
    },
    skeleton: {
      blurb: "ローディング状態向けのシマーアニメーション付きプレースホルダーブロックで、<c>width</c>/<c>height</c> を設定し、<c>rounded</c> プリセットを選べ、reduced-motion を尊重します。"
    },
    switchCard: {
      blurb: "オンにするとカード全体がエメラルドになる存在感の強いフル幅トグルで、重要な設定向けに取っておきましょう。"
    },
    switchRow: {
      blurb: "フル幅の設定行トグルで、左にタイトル + 説明、右にコンパクトなスイッチを置き、行全体がクリック可能です。"
    },
    switchSegmented: {
      blurb: "スライドするインジケーター付きのセグメンテッドカプセル形の二値トグルで、オン/オフではなく\"A か B\"として読めます。"
    }
  }
};
