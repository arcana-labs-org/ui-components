import react from "@vitejs/plugin-react";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vitest/config";
import { svelteWarningFilter } from "./vite.config";

export default defineConfig({
  plugins: [vue(), react(), svelte(svelteWarningFilter)],
  // Svelte 5 publica builds server/client; os testes em happy-dom precisam resolver
  // o build client (browser) ou `mount()` lança `lifecycle_function_unavailable`.
  resolve: { conditions: ["browser"] },
  test: {
    environment: "happy-dom",
    globals: true,
    include: ["tests/**/*.test.ts", "tests/**/*.test.tsx"]
  }
});
