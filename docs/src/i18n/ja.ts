import type { Messages } from "./types";

export const ja: Messages = {
  meta: { htmlLang: "ja", locale: "ja-JP" },
  langName: "日本語",

  shell: {
    kicker: "ドキュメント · v0.x",
    lead: "型付きの shadcn スタイルのコンポーネントライブラリです。Vue 3 は今すぐ利用でき、React・Angular・Svelte のアダプターも準備中です — 同じ API、同じ見た目を、どのフレームワークでも。",
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
      p2: "すべての Vue コンポーネントは <c>@arcanalabs/ui-components/vue</c> のサブパスから自己完結型の SFC としてエクスポートされます。使うものだけをインポートしてください。"
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
      p1: "一部のコンポーネント（<c>ShadcnInputMask</c>、<c>ShadcnDatePicker</c>）は <c>maska</c> パッケージの <c>v-maska</c> ディレクティブに依存します。アプリ作成時に一度グローバル登録してください。",
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
  comingSoon: "このコンポーネントの完全なドキュメントは今後のバッチで提供されます。すでに <c>@arcanalabs/ui-components/vue</c> からエクスポートされており、そのまま利用できます。",
  frameworkSoon: "// React · Angular · Svelte のアダプターは近日公開予定です。\n// Vue 3 は今すぐ利用可能です — フレームワーク切替を Vue にしてください。",

  components: {
    button: {
      blurb: "shadcn ボタンの寸法（13px / ウェイト 500 / 半径 6）を踏襲した押下可能なボタンです。15 種類のセマンティックなバリアントが、主要アクション・破壊的フロー・ニュートラルなアウトライン・ステータスアクセントをカバーします。ラベルはデフォルトスロットで渡し、クリックは <c>click</c> イベントで公開されます。"
    },
    badge: {
      blurb: "カウント・ステータス・タグ用のコンパクトなピルです。6 種類のカラーバリアントに、任意の先頭 <c>dot</c> インジケーター、2 つのサイズ、そして操作可能なバッジにポインターのアフォーダンスを加える <c>clickable</c> モードを組み合わせられます。内容はデフォルトスロットから渡します。"
    },
    input: {
      blurb: "shadcn スタイルのネイティブ <c>&lt;input&gt;</c> で、数値対応の <c>v-model</c> を備えます（空の <c>type=\"number\"</c> は <c>null</c> を、正しい値は本物の数値を発行します）。標準の HTML 属性 — <c>placeholder</c>、<c>readonly</c>、<c>min/max/step</c>、<c>maxlength</c>、<c>autocomplete</c> — はそのまま透過します。"
    },
    select: {
      blurb: "完全にカスタムなセレクトです — 内部で Element Plus を使いません。ドロップダウンは自動フリップ配置で <c>&lt;body&gt;</c> にテレポートされ、単一選択または <c>multiple</c>、組み込みの <c>searchable</c> フィルター、ホバー時の <c>clearable</c> アフォーダンス、完全なキーボード操作をサポートします。オプションは単なる文字列、または <c>{ label, value, disabled?, description? }</c> オブジェクトを受け付けます。"
    },
    checkbox: {
      blurb: "<b>本物の</b>ネイティブ <c>&lt;input type=\"checkbox\"&gt;</c> をラップした二値チェックボックスです — そのためキーボードやテストドライバーに優しく、Dusk の <c>check()</c>/<c>uncheck()</c> が動作します。リストから項目を選ぶのに使います。<c>indeterminate</c> 状態では、おなじみの「一部選択」のダッシュが表示されます。設定のオン/オフには <c>ShadcnSwitch</c> を使ってください。"
    },
    switch: {
      blurb: "WAI-ARIA のスイッチパターンに従う二値オン/オフトグルです（<c>role=\"switch\"</c> + <c>aria-checked</c>、Space/Enter で切替）。トラックは素早く読み取れるよう色分けされ — オフは赤、オンは緑 — 任意の隠しチェックボックス（<c>name</c>）がネイティブフォーム送信と統合します。"
    },
    tabs: {
      blurb: "<c>tabs</c> 配列とアクティブタブ名を保持する <c>v-model</c> で駆動するカスタムタブです。各タブは名前付きスロットになります。6 つの視覚バリアント — <c>pills</c>、<c>underline</c>、<c>boxed</c>、<c>sidebar</c>、<c>sidebar-soft</c>、<c>segmented</c> — が、モーダル内のコンパクトなタブから完全なサイドバーナビゲーションまでをカバーし、任意のアイコンやバッジ、非アクティブパネルを保持する <c>keepAlive</c> モードも備えます。"
    },
    dialog: {
      blurb: "ref ベース API の shadcn スタイルのモーダルです — <c>v-model</c> をバインドする代わりに、コンポーネントの ref で <c>show()</c> / <c>hide()</c> を呼び出します。<c>&lt;body&gt;</c> にテレポートし、フォーカスをトラップし、Escape で閉じ（任意でオーバーレイクリックでも）、ネスト時も正しく重なります。サイズプリセットは <c>sm → full</c>。<c>header</c> と <c>footer</c> のスロットは任意です（footer スロットは <c>{ hide }</c> を受け取ります）。"
    }
  }
};
