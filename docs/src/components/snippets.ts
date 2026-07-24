import type { Framework, SectionCode } from "./DocsShell";

/** `ArcanaButton` → `arcana-button` (Angular file-name convention). */
function kebab(name: string): string {
  return name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

/**
 * Builds the per-framework code record for a documented component section. Each
 * framework now carries its own real usage snippet (see `frameworkSnippets.ts`
 * for React / Angular / Svelte, and `componentDocs.ts` for Vue).
 */
export function frameworkCode(
  name: string,
  code: { vue: string; react: string; angular: string; svelte: string }
): Record<Framework, SectionCode> {
  return {
    vue: { file: `${name}.vue`, code: code.vue },
    react: { file: `${name}.tsx`, code: code.react },
    angular: { file: `${kebab(name)}.component.ts`, code: code.angular },
    svelte: { file: `${name}.svelte`, code: code.svelte }
  };
}

/** Same code for every framework (install / terminal snippets). */
export function sameForAll(file: string, code: string): Record<Framework, SectionCode> {
  const same: SectionCode = { file, code };
  return { vue: same, react: same, angular: same, svelte: same };
}

export const installCode = "npm i @arcanalabs/ui-components";

/* ─────────────────────────── Usage (per framework) ─────────────────────────── */

export const usageSnippets: Record<Framework, SectionCode> = {
  vue: {
    file: "App.vue",
    code: [
      "<script setup lang=\"ts\">",
      "import { ArcanaButton, ArcanaBadge } from '@arcanalabs/ui-components/vue'",
      "</script>",
      "",
      "<template>",
      "  <ArcanaButton variant=\"primary\">Save</ArcanaButton>",
      "  <ArcanaBadge variant=\"green\" dot>Active</ArcanaBadge>",
      "</template>"
    ].join("\n")
  },
  react: {
    file: "Toolbar.tsx",
    code: [
      "import { ArcanaButton, ArcanaBadge } from '@arcanalabs/ui-components/react'",
      "",
      "export function Toolbar() {",
      "  return (",
      "    <>",
      "      <ArcanaButton variant=\"primary\">Save</ArcanaButton>",
      "      <ArcanaBadge variant=\"green\" dot>Active</ArcanaBadge>",
      "    </>",
      "  )",
      "}"
    ].join("\n")
  },
  angular: {
    file: "toolbar.component.ts",
    code: [
      "import { Component } from '@angular/core'",
      "import { ArcanaButtonComponent, ArcanaBadgeComponent } from '@arcanalabs/ui-components/angular'",
      "",
      "// Every component is standalone — add it to the host component's `imports`.",
      "@Component({",
      "  selector: 'app-toolbar',",
      "  standalone: true,",
      "  imports: [ArcanaButtonComponent, ArcanaBadgeComponent],",
      "  template: `",
      "    <button arcanaButton variant=\"primary\">Save</button>",
      "    <span arcanaBadge variant=\"green\" [dot]=\"true\">Active</span>",
      "  `",
      "})",
      "export class ToolbarComponent {}"
    ].join("\n")
  },
  svelte: {
    file: "Toolbar.svelte",
    code: [
      "<script lang=\"ts\">",
      "  import { ArcanaButton, ArcanaBadge } from '@arcanalabs/ui-components/svelte'",
      "</script>",
      "",
      "<ArcanaButton variant=\"primary\">Save</ArcanaButton>",
      "<ArcanaBadge variant=\"green\" dot>Active</ArcanaBadge>"
    ].join("\n")
  }
};

/* ─────────────────────────── Styles (per framework) ─────────────────────────── */

export const stylesSnippets: Record<Framework, SectionCode> = {
  vue: {
    file: "main.ts",
    code: [
      "// main.ts — once, at the application entrypoint",
      "import { createApp } from 'vue'",
      "import App from './App.vue'",
      "import '@arcanalabs/ui-components/styles.css'",
      "",
      "createApp(App).mount('#app')"
    ].join("\n")
  },
  react: {
    file: "main.tsx",
    code: [
      "// main.tsx — once, at the application entrypoint",
      "import { StrictMode } from 'react'",
      "import { createRoot } from 'react-dom/client'",
      "import { App } from './App'",
      "import '@arcanalabs/ui-components/styles.css'",
      "",
      "createRoot(document.getElementById('root')!).render(",
      "  <StrictMode><App /></StrictMode>",
      ")"
    ].join("\n")
  },
  angular: {
    file: "main.ts",
    code: [
      "// main.ts — once, at the application entrypoint",
      "import { bootstrapApplication } from '@angular/platform-browser'",
      "import { AppComponent } from './app/app.component'",
      "import '@arcanalabs/ui-components/styles.css'",
      "",
      "bootstrapApplication(AppComponent)"
    ].join("\n")
  },
  svelte: {
    file: "main.ts",
    code: [
      "// main.ts — once, at the application entrypoint",
      "import { mount } from 'svelte'",
      "import App from './App.svelte'",
      "import '@arcanalabs/ui-components/styles.css'",
      "",
      "mount(App, { target: document.getElementById('app')! })"
    ].join("\n")
  }
};

/* ───────────────── Masking — Vue registers v-maska; others built-in ──────────── */

export const maskaSnippets: Record<Framework, SectionCode> = {
  vue: {
    file: "main.ts",
    code: [
      "// main.ts — Vue needs the global v-maska directive registered once.",
      "import { createApp } from 'vue'",
      "import Maska from 'maska'",
      "import App from './App.vue'",
      "import '@arcanalabs/ui-components/styles.css'",
      "",
      "const app = createApp(App)",
      "app.use(Maska) // registers the global v-maska directive",
      "app.mount('#app')"
    ].join("\n")
  },
  react: {
    file: "CpfField.tsx",
    code: [
      "// No global setup in React — masking is built into ArcanaInputMask.",
      "import { useState } from 'react'",
      "import { ArcanaInputMask } from '@arcanalabs/ui-components/react'",
      "",
      "export function CpfField() {",
      "  const [cpf, setCpf] = useState('')",
      "  return <ArcanaInputMask value={cpf} onValueChange={setCpf} mask=\"###.###.###-##\" />",
      "}"
    ].join("\n")
  },
  angular: {
    file: "cpf-field.component.ts",
    code: [
      "// No global setup in Angular — masking is built into ArcanaInputMask.",
      "import { Component } from '@angular/core'",
      "import { ArcanaInputMaskComponent } from '@arcanalabs/ui-components/angular'",
      "",
      "@Component({",
      "  selector: 'app-cpf-field',",
      "  standalone: true,",
      "  imports: [ArcanaInputMaskComponent],",
      "  template: `<input arcanaInputMask [(value)]=\"cpf\" mask=\"###.###.###-##\" />`",
      "})",
      "export class CpfFieldComponent {",
      "  cpf = ''",
      "}"
    ].join("\n")
  },
  svelte: {
    file: "CpfField.svelte",
    code: [
      "<script lang=\"ts\">",
      "  // No global setup in Svelte — masking is built into ArcanaInputMask.",
      "  import { ArcanaInputMask } from '@arcanalabs/ui-components/svelte'",
      "  let cpf = $state('')",
      "</script>",
      "",
      "<ArcanaInputMask value={cpf} onValueChange={(v) => (cpf = v)} mask=\"###.###.###-##\" />"
    ].join("\n")
  }
};
