import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { LANG_ORDER, MESSAGES } from "../docs/src/i18n";

const translatedLanguages = LANG_ORDER.filter((lang) => lang !== "en");

describe("documentation i18n", () => {
  it("keeps the palette roles and new Select/Tooltip demo chrome translated", () => {
    const english = MESSAGES.en;
    const keys = [
      "selectCustomizationTitle",
      "selectGroupedPlaceholder",
      "selectCatalog",
      "selectGroupCommon",
      "selectGroupSeasonal",
      "selectDisabled",
      "selectSelected",
      "selectCustomizationNote",
      "avatarPortraitAlt",
      "profilePictureAlt",
      "tooltipDraftLabel",
      "tooltipDraftButton",
      "tooltipCopyLink",
      "tooltipNoArrow",
      "tooltipCustomTrigger",
      "tooltipUndo",
      "inputSearchPlaceholder",
      "tabsAria",
      "paymentMethodAria",
      "disabledAria"
    ] as const;

    for (const lang of LANG_ORDER) {
      expect(MESSAGES[lang].palette.stepRoles).toHaveLength(12);
      expect(MESSAGES[lang].palette.stepRoles.every(Boolean)).toBe(true);
    }

    for (const lang of translatedLanguages) {
      for (const key of keys) {
        expect(MESSAGES[lang].demos[key], `${lang}: demos.${key}`).not.toBe(
          english.demos[key]
        );
      }
    }
  });

  it("does not retain obsolete DatePicker or dependency prose in translations", () => {
    for (const lang of LANG_ORDER) {
      const messages = MESSAGES[lang];
      expect(messages.components.datePicker.blurb).toContain("<c>daterange</c>");
      expect(messages.components.datePicker.blurb).toContain("<c>datetime</c>");
      expect(messages.gettingStarted.install.p1).not.toMatch(
        /only peer|única peer|único peer|唯一.*peer|einzige.*Peer|единственной peer/i
      );
    }
  });

  it("keeps visible demo chrome behind $dt instead of hardcoding one language", () => {
    const source = fs.readFileSync(
      path.join(process.cwd(), "docs/src/components/componentDocs.ts"),
      "utf8"
    );
    const liveDemoSource = source.slice(0, source.indexOf("export const COMPONENT_DOCS"));
    const normalizedLiveDemoSource = liveDemoSource
      .replace(/<!--[\s\S]*?-->/g, "")
      .replace(/\/\/[^\n]*/g, "");
    const forbidden = [
      "SLOTS · PREFIX / SUFFIX · GROUPS",
      "Open the field to see option slots",
      "Salvar rascunho",
      "Salva sem publicar",
      "conteúdo custom",
      ">Desfazer&nbsp;",
      'alt="Team member portrait"',
      'alt="Profile picture"',
      'aria-label="Demo tabs"',
      'placeholder="Buscar…"'
    ];

    for (const text of forbidden) expect(normalizedLiveDemoSource).not.toContain(text);
  });
});
