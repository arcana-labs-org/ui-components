import { useState } from "react";
import { fmt, useLang } from "../i18n";

/* Os componentes reais, importados dos ports React. O resto da documentação
   monta demos em Vue (ver VueDemo.tsx) — aqui usamos React de propósito: a folha
   de estilo é a mesma para os quatro frameworks, então se a paleta troca por
   classe aqui, troca em todos. */
import { ArcanaButton } from "../../../src/react/ArcanaButton";
import { ArcanaBadge } from "../../../src/react/ArcanaBadge";
import { ArcanaProgress } from "../../../src/react/ArcanaProgress";
import { ArcanaSwitch } from "../../../src/react/ArcanaSwitch";
import { ArcanaRate } from "../../../src/react/ArcanaRate";
import { ArcanaAvatar } from "../../../src/react/ArcanaAvatar";

/**
 * Espelham `ACCENT_SCALES` / `GRAY_SCALES` em `scripts/build-palette.mjs`. Se uma
 * escala for adicionada lá, acrescente aqui — a lista é só de apresentação, a
 * fonte de verdade continua sendo o gerador.
 */
const ACCENTS = [
  "gray", "tomato", "red", "ruby", "crimson", "pink", "plum", "purple", "violet",
  "iris", "indigo", "blue", "cyan", "teal", "jade", "green", "grass",
  "orange", "amber", "yellow", "lime", "mint", "sky", "bronze", "gold", "brown"
];

const GRAYS = ["gray", "mauve", "slate", "sage", "olive", "sand"];

const STEPS = Array.from({ length: 12 }, (_, i) => i + 1);

/** O papel de cada degrau, na ordem — é o contrato do modelo Radix. */
const STEP_ROLES = [
  "App background", "Subtle background", "Component background", "Component hover",
  "Component active", "Subtle border", "Border", "Border hover",
  "Solid", "Solid hover", "Secondary text", "High-contrast text"
];

export function PaletteExplorer() {
  const { msg } = useLang();
  const [accent, setAccent] = useState("indigo");
  const [gray, setGray] = useState("gray");
  const [dark, setDark] = useState(false);
  const [rating, setRating] = useState(4);
  const [switched, setSwitched] = useState(true);

  // É exatamente isto que o consumidor escreve no elemento raiz da aplicação.
  const themeClass = `arcana-accent-${accent} arcana-gray-${gray}${dark ? " arcana-dark" : ""}`;

  return <div className="palette-explorer">
    <div className="palette-controls">
      <div className="palette-control">
        <span className="palette-control-label">{msg.palette.accentLabel}</span>
        <div className="palette-swatches" role="radiogroup" aria-label={msg.palette.accentLabel}>
          {ACCENTS.map((scale) => <button
            key={scale}
            type="button"
            role="radio"
            aria-checked={scale === accent}
            aria-label={scale}
            title={scale}
            className={scale === accent ? "palette-swatch is-active" : "palette-swatch"}
            style={{ background: `var(--arcana-${scale}-9)` }}
            onClick={() => setAccent(scale)}
          />)}
        </div>
      </div>

      <div className="palette-control">
        <span className="palette-control-label">{msg.palette.grayLabel}</span>
        <div className="palette-swatches" role="radiogroup" aria-label={msg.palette.grayLabel}>
          {GRAYS.map((scale) => <button
            key={scale}
            type="button"
            role="radio"
            aria-checked={scale === gray}
            aria-label={scale}
            title={scale}
            className={scale === gray ? "palette-swatch is-active" : "palette-swatch"}
            style={{ background: `var(--arcana-${scale}-9)` }}
            onClick={() => setGray(scale)}
          />)}
        </div>
      </div>

      <div className="palette-control">
        <span className="palette-control-label">{msg.palette.darkLabel}</span>
        <ArcanaSwitch value={dark} onValueChange={setDark} ariaLabel={msg.palette.darkLabel} />
      </div>
    </div>

    <code className="palette-classname">&lt;div class="{themeClass}"&gt;</code>

    {/* Tudo daqui para baixo herda a paleta da classe no contêiner. */}
    <div className={`palette-stage ${themeClass}`}>
      <div className="palette-scale">
        <div className="palette-scale-caption">{fmt(msg.palette.scaleCaption, { scale: accent })}</div>
        <div className="palette-scale-row">
          {STEPS.map((step) => <div
            key={step}
            className="palette-step"
            style={{ background: `var(--arcana-accent-${step})` }}
            title={`${step} — ${STEP_ROLES[step - 1]}`}
          ><span>{step}</span></div>)}
        </div>
      </div>

      <div className="palette-preview">
        <div className="palette-preview-title">{msg.palette.previewTitle}</div>

        <div className="palette-preview-row">
          <ArcanaButton variant="primary">{msg.demos.btnSave}</ArcanaButton>
          <ArcanaButton variant="secondary">{msg.demos.btnSecondary}</ArcanaButton>
          <ArcanaButton variant="outline">{msg.demos.btnOutline}</ArcanaButton>
          <ArcanaButton variant="ghost">{msg.demos.btnGhost}</ArcanaButton>
          <ArcanaButton variant="destructive">{msg.demos.btnDelete}</ArcanaButton>
        </div>

        <div className="palette-preview-row">
          <ArcanaBadge variant="green" dot>{msg.demos.badgeActive}</ArcanaBadge>
          <ArcanaBadge variant="blue">{msg.demos.badgeBlue}</ArcanaBadge>
          <ArcanaBadge variant="amber">{msg.demos.badgeAmber}</ArcanaBadge>
          <ArcanaAvatar initials="AM" />
          <ArcanaAvatar icon="fa-solid fa-user" />
          <ArcanaSwitch value={switched} onValueChange={setSwitched} ariaLabel={msg.demos.badgeActive} />
          <ArcanaRate value={rating} onValueChange={setRating} />
        </div>

        <div className="palette-preview-row palette-preview-row--stack">
          <ArcanaProgress value={68} showValue />
          <ArcanaProgress value={34} variant="soft" showValue />
        </div>
      </div>
    </div>

    <p className="palette-hint">{msg.palette.hint}</p>
  </div>;
}
