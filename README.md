# HLauncher Docs

Документация лаунчера HytaleNet на [VitePress](https://vitepress.dev/).

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

## Структура проекта

```
├── docs/                    # Контент VitePress
│   ├── .vitepress/
│   │   ├── config.ts        # Навигация, тема, настройки
│   │   └── theme/           # Кастомные стили (цвета бренда)
│   ├── index.md             # Главная страница
│   ├── guides/              # Руководства
│   └── public/              # Статика (картинки, favicon)
├── docs-main/               # Старый Mintlify-проект (можно удалить)
├── package.json
└── .github/workflows/       # CI/CD для GitHub Pages
```

## Добавление новых страниц

1. Создайте `.md` файл в `docs/guides/...`
2. Добавьте ссылку в `docs/.vitepress/config.ts` → `themeConfig.sidebar`
