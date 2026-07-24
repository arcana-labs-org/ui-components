import React from "react";
import { createRoot } from "react-dom/client";
import { LangProvider } from "./i18n";
import { App } from "./App";
// Icon webfont — the components render FontAwesome classes (`fa-solid fa-*`).
// Consumers install `@fortawesome/fontawesome-free` (optional peer) and load its
// CSS once; the docs mirror that so every demo shows its icons.
import "@fortawesome/fontawesome-free/css/all.min.css";
// Shared, framework-agnostic component styles (the SFCs no longer ship
// `<style scoped>` — see src/styles/components.scss). Loaded here so the live
// Vue demos render with the real library visual.
import "../../src/styles/components.scss";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  React.createElement(
    React.StrictMode,
    null,
    React.createElement(LangProvider, null, React.createElement(App))
  )
);
