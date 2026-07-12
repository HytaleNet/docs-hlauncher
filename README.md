# HLauncher Docs

Документация лаунчера HytaleNet на [VitePress](https://vitepress.dev/).

Миграция с Mintlify — контент из папки `docs-main/` перенесён в `docs/`.

## Локальная разработка

```bash
npm install
npm run docs:dev
```

Сайт откроется на http://localhost:5173

## Сборка

```bash
npm run docs:build
npm run docs:preview
```

1. Создайте `.md` файл в `docs/guides/...`
2. Добавьте ссылку в `docs/.vitepress/config.ts` → `themeConfig.sidebar`
