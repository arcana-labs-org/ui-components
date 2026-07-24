/// <reference types="vite/client" />

// The docs mount real library SFCs; let TS resolve `*.vue` default imports.
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>;
  export default component;
}
