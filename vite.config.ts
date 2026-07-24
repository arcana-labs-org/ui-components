import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import { defineConfig } from "vite";

// O adaptador Svelte reproduz de propósito o markup exato dos ports React/Vue
// (spans clicáveis, divs com role de grid, etc.); as dicas de a11y pediriam um DOM
// diferente. `state_referenced_locally` sinaliza o padrão deliberado de "valor
// inicial" também usado pelo port React.
export const svelteWarningFilter = {
  onwarn(warning: { code: string }, handler: (warning: { code: string }) => void) {
    if (warning.code.startsWith("a11y") || warning.code === "state_referenced_locally") return;
    handler(warning);
  }
};

export default defineConfig({
  plugins: [
    vue(),
    react(),
    svelte(svelteWarningFilter),
    // A entry Angular é compilada pelo `ngc` (npm run build:angular), não por
    // este bundle — ver tsconfig.angular.json.
    dts({ include: ["src"], exclude: ["src/angular", "src/angular.ts"], tsconfigPath: "./tsconfig.json" })
  ],
  build: {
    minify: "oxc",
    sourcemap: true,
    cssCodeSplit: false,
    lib: {
      // `.` e `./vue` apontam para a mesma lib Vue; `./react` é o port React
      // (lote 1). Angular/Svelte entram em fases posteriores.
      entry: {
        index: resolve(__dirname, "src/index.ts"),
        vue: resolve(__dirname, "src/vue.ts"),
        react: resolve(__dirname, "src/react.ts"),
        svelte: resolve(__dirname, "src/svelte.ts")
      },
      formats: ["es", "cjs"],
      fileName: (format, entry) => `${entry}.${format === "es" ? "js" : "cjs"}`
    },
    rollupOptions: {
      external: ["vue", "react", "react-dom", "react/jsx-runtime", "maska", "v-money3", "moment", /^svelte(\/|$)/],
      output: {
        exports: "named",
        assetFileNames: (asset) =>
          asset.name?.endsWith(".css") ? "ui-components.css" : "assets/[name][extname]"
      }
    }
  }
});
