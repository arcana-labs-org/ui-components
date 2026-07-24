/**
 * Ambient module declaration so `vue-tsc --noEmit` (que não entende SFCs `.svelte`)
 * consiga typechecar `src/svelte.ts`. Os tipos públicos são fixados explicitamente
 * em `src/svelte.ts` (cada componente é castado pra `Component<Props>`).
 */
declare module "*.svelte" {
  import type { Component } from "svelte";
  const component: Component<Record<string, any>, Record<string, any>>;
  export default component;
}
