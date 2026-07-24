import React from "react";
import { createRoot } from "react-dom/client";

// TODO(docs): docs em construção. A documentação da lib (@arcanalabs/ui-components)
// será reconstruída numa fase própria — os arquivos antigos (App.tsx, demos, i18n,
// snippets) ainda referenciam a src do datatable que foi removida. Este placeholder
// mantém `docs:build` compilando sem travar o build do pacote.
function Placeholder() {
  return React.createElement(
    "div",
    { style: { fontFamily: "system-ui, sans-serif", padding: "4rem", textAlign: "center" } },
    React.createElement("h1", null, "UI Components — docs em construção"),
    React.createElement(
      "p",
      { style: { color: "#71717a" } },
      "@arcanalabs/ui-components — biblioteca de componentes shadcn para Vue 3."
    )
  );
}

createRoot(document.getElementById("root")!).render(
  React.createElement(React.StrictMode, null, React.createElement(Placeholder))
);
