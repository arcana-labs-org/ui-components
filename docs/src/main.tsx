import React from "react";
import { createRoot } from "react-dom/client";
import { LangProvider } from "./i18n";
import { App } from "./App";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  React.createElement(
    React.StrictMode,
    null,
    React.createElement(LangProvider, null, React.createElement(App))
  )
);
