import { resolve } from "node:path";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    vue(),
    dts({ include: ["src"], tsconfigPath: "./tsconfig.json" })
  ],
  build: {
    minify: "oxc",
    sourcemap: true,
    cssCodeSplit: false,
    lib: {
      // `.` e `./vue` apontam para a mesma lib Vue nesta fase; os ports
      // React/Angular/Svelte entram em fases posteriores.
      entry: {
        index: resolve(__dirname, "src/index.ts"),
        vue: resolve(__dirname, "src/vue.ts")
      },
      formats: ["es", "cjs"],
      fileName: (format, entry) => `${entry}.${format === "es" ? "js" : "cjs"}`
    },
    rollupOptions: {
      external: ["vue", "maska", "v-money3", "moment"],
      output: {
        exports: "named",
        assetFileNames: (asset) =>
          asset.name?.endsWith(".css") ? "ui-components.css" : "assets/[name][extname]"
      }
    }
  }
});
