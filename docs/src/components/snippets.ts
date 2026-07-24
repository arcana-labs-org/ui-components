import type { Framework, SectionCode } from "./DocsShell";

/**
 * Builds the per-framework code record for a section. Only the Vue variant
 * carries real code in this batch; the React / Angular / Svelte ports land in a
 * later batch, so their tab shows the translated "coming soon" placeholder while
 * the framework toggle keeps working.
 */
export function vueOnly(file: string, vueCode: string, placeholder: string): Record<Framework, SectionCode> {
  const soon: SectionCode = { file: "adapter.soon", code: placeholder };
  return {
    vue: { file, code: vueCode },
    react: soon,
    angular: soon,
    svelte: soon
  };
}

/** Same code for every framework (install / terminal snippets). */
export function sameForAll(file: string, code: string): Record<Framework, SectionCode> {
  const same: SectionCode = { file, code };
  return { vue: same, react: same, angular: same, svelte: same };
}

export const installCode = "npm i @arcanalabs/ui-components";

export const usageCode = [
  "<script setup lang=\"ts\">",
  "import { ShadcnButton, ShadcnBadge } from '@arcanalabs/ui-components/vue'",
  "</script>",
  "",
  "<template>",
  "  <ShadcnButton variant=\"primary\">Save</ShadcnButton>",
  "  <ShadcnBadge variant=\"green\" dot>Active</ShadcnBadge>",
  "</template>"
].join("\n");

export const stylesCode = [
  "// main.ts — once, at the application entrypoint",
  "import { createApp } from 'vue'",
  "import App from './App.vue'",
  "import '@arcanalabs/ui-components/styles.css'",
  "",
  "createApp(App).mount('#app')"
].join("\n");

export const maskaCode = [
  "// main.ts",
  "import { createApp } from 'vue'",
  "import Maska from 'maska'",
  "import App from './App.vue'",
  "import '@arcanalabs/ui-components/styles.css'",
  "",
  "const app = createApp(App)",
  "app.use(Maska) // registers the global v-maska directive",
  "app.mount('#app')"
].join("\n");
