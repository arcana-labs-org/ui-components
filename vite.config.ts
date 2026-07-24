import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    vue(),
    react(),
    dts({ include: ["src"], tsconfigPath: "./tsconfig.json" })
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
        react: resolve(__dirname, "src/react.ts")
      },
      formats: ["es", "cjs"],
      fileName: (format, entry) => `${entry}.${format === "es" ? "js" : "cjs"}`
    },
    rollupOptions: {
      external: ["vue", "react", "react-dom", "react/jsx-runtime", "maska", "v-money3", "moment"],
      output: {
        exports: "named",
        assetFileNames: (asset) =>
          asset.name?.endsWith(".css") ? "ui-components.css" : "assets/[name][extname]"
      }
    }
  }
});
