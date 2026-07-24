<h1 align="center">@arcanalabs/ui-components</h1>

<p align="center">
  A typed, shadcn-style component library — <b>39 components</b>, native for
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
import { ArcanaButton, ArcanaSelect } from "@arcanalabs/ui-components/react";
import "@arcanalabs/ui-components/styles.css";

<ArcanaButton variant="primary" onClick={save}>Salvar</ArcanaButton>
```

Every component ships in all four frameworks with the **same markup, classes and
behavior**, backed by a single shared `styles.css`. Import the entrypoint for your
framework — `@arcanalabs/ui-components/{vue,react,angular,svelte}` — plus the stylesheet
once. The full catalog, props, events and per-framework usage live in the
**[documentation](https://arcana-labs-org.github.io/ui-components/)** (8 languages, live demos).

Framework peers are **optional** — install only the one you use. Vue's mask directive
(`ArcanaInputMask` / `ArcanaDatePicker`) needs `app.use(Maska)` in the host app; the other
frameworks have masking built in.

**Icons** use [Font Awesome Free](https://fontawesome.com/) (the `fa-solid fa-*` classes on
`icon` props). Install the optional peer and load its CSS once in your app:

```bash
npm install @fortawesome/fontawesome-free
```

```ts
import "@fortawesome/fontawesome-free/css/all.min.css";
```

MIT © Arcana Labs
