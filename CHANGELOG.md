# Changelog

## 1.0.0 — 2026-07-24

Primeira versão pública da biblioteca de componentes.

- **41 componentes** estilo shadcn, portados nativamente para **Vue 3, React, Angular e Svelte 5** — mesma marcação, mesmas classes e mesmo comportamento em todos.
- **Folha de estilos única e independente de framework** (`@arcanalabs/ui-components/styles.css`), compartilhada pelos quatro adaptadores.
- **Entrypoints separados**: `/vue`, `/react`, `/angular`, `/svelte` e `/styles.css`. Os peers de cada framework são opcionais — instala-se apenas o que se usa.
- **Máscaras e moeda** (`ShadcnInputMask`, `ShadcnInputCurrency`, `ShadcnDatePicker`) sem dependências específicas de framework: máscara via núcleo do `maska`, moeda BRL própria e campo de data nativo.
- **Portais** para escapar de `overflow` (diálogos, selects, tooltips) implementados nativamente em cada framework.
- No Vue, a diretiva de máscara exige `app.use(Maska)` no app consumidor; nos demais frameworks a máscara já vem embutida.
- **Documentação completa** dos 41 componentes em 8 idiomas, com demos ao vivo e snippets de uso para os 4 frameworks: https://arcana-labs-org.github.io/ui-components/
