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

## Деплой на GitHub Pages

### 1. Подготовка репозитория

1. Создайте репозиторий на GitHub и запушьте этот проект.
2. В **Settings → Pages → Build and deployment** выберите **GitHub Actions**.

### 2. Base URL

Workflow автоматически задаёт `BASE_URL` как `/имя-репозитория/`.

| Тип репозитория | URL | BASE_URL |
|---|---|---|
| Project pages | `username.github.io/my-docs` | `/my-docs/` (автоматически) |
| User/Org pages | `username.github.io` | `/` |

Для user/org pages (`username.github.io`) измените в `.github/workflows/deploy.yml`:

```yaml
BASE_URL: /
```

### 3. Деплой

При пуше в `main` или `master` workflow `.github/workflows/deploy.yml` автоматически соберёт и задеплоит сайт.

Ручной запуск: **Actions → Deploy to GitHub Pages → Run workflow**.

### 4. Кастомный домен (опционально)

1. Добавьте файл `docs/public/CNAME` с вашим доменом (например `docs.hlauncher.com`).
2. Настройте DNS у регистратора.
3. В GitHub Pages укажите Custom domain.

## Статические файлы

Скопируйте из старого Mintlify-проекта в `docs/public/`:

```
docs/public/
├── favicon.ico
├── logo/
│   └── logo.png
└── images/
    ├── Virtualization.png
    ├── Virtualization-1.png
    ├── Portable.png
    ├── Portable-1.png
    ├── OnlinePlayButton.png
    ├── OnlinePlayON.png
    ├── OnlinePlayCode.png
    └── ServerButton.png
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
