<h1 align="center">@arcanalabs/ui-components</h1>

<p align="center">
  A typed, shadcn-style component library — <b>41 components</b>, native for
  <b>Vue 3</b>, <b>React</b>, <b>Angular</b> and <b>Svelte 5</b>,
  sharing one framework-agnostic stylesheet.
</p>

<p align="center">
  <a href="https://arcana-labs-org.github.io/ui-components/"><b>📖 Documentation &amp; live demos</b></a>
</p>

---

```bash
npm install @arcanalabs/ui-components
```

```tsx
// React — also /vue, /angular, /svelte
import { ShadcnButton, ShadcnSelect } from "@arcanalabs/ui-components/react";
import "@arcanalabs/ui-components/styles.css";

<ShadcnButton variant="primary" onClick={save}>Salvar</ShadcnButton>
```

Every component ships in all four frameworks with the **same markup, classes and
behavior**, backed by a single shared `styles.css`. Import the entrypoint for your
framework — `@arcanalabs/ui-components/{vue,react,angular,svelte}` — plus the stylesheet
once. The full catalog, props, events and per-framework usage live in the
**[documentation](https://arcana-labs-org.github.io/ui-components/)** (8 languages, live demos).

Framework peers are **optional** — install only the one you use. Vue's mask directive
(`ShadcnInputMask` / `ShadcnDatePicker`) needs `app.use(Maska)` in the host app; the other
frameworks have masking built in.

MIT © Arcana Labs
