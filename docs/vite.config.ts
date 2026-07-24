import react from "@vitejs/plugin-react";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

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
  resolve: {
    alias: {
      vue: "vue/dist/vue.esm-bundler.js"
    }
  },
  build: { outDir: "dist", emptyOutDir: true }
});
