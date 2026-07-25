/// <reference types="vite/client" />

// The docs mount real library SFCs; let TS resolve `*.vue` default imports.
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>;
  export default component;
}

/** Versão do package.json, injetada pelo Vite (ver `define` em docs/vite.config.ts). */
declare const __ARCANA_VERSION__: string;

/** `dependencies` / `peerDependencies` do package.json, injetadas pelo Vite. */
declare const __ARCANA_DEPS__: {
  dependencies: Record<string, string>;
  peerDependencies: Record<string, string>;
  peerDependenciesMeta: Record<string, { optional?: boolean }>;
};
