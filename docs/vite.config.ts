import react from "@vitejs/plugin-react";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import { readFileSync } from "node:fs";

// A versão exibida na docs vem do package.json — antes era a string fixa "v0.x",
// que ficou parada enquanto a lib avançava até a 1.6.1.
const pkg = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8")) as { version: string };

// The docs are a React app that mounts REAL Vue components inline (see
// `components/VueDemo.tsx`). We therefore load BOTH plugins:
//   • @vitejs/plugin-react — compiles the docs shell (.tsx)
//   • @vitejs/plugin-vue    — compiles the library SFCs (.vue) imported by the demos
// `vue` is aliased to the esm-bundler build so the demo root components can be
// authored as plain `{ template, setup }` objects (runtime template compilation).
export default defineConfig({
  root: __dirname,
  base: process.env.DOCS_BASE ?? "/ui-components/",
  plugins: [react(), vue()],
  define: { __ARCANA_VERSION__: JSON.stringify(pkg.version) },
  resolve: {
    alias: {
      vue: "vue/dist/vue.esm-bundler.js"
    }
  },
  build: { outDir: "dist", emptyOutDir: true }
});
