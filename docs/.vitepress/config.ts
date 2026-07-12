import { defineConfig } from 'vitepress'
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs'

const base = '/docs-hlauncher/' 

export default defineConfig({
  lang: 'ru-RU',
  title: 'HytaleNet Launcher',
  description: 'Документация по HLauncher — лаунчеру для Hytale',
  base,
  cleanUrls: true,
  // lastUpdated требует git в PATH — включите после `git init` и установки Git
  // lastUpdated: true,

  head: [
    ['link', { rel: 'icon', href: `${base}favicon.ico` }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap', rel: 'stylesheet' }],
  ],

  markdown: {
    config(md) {
      md.use(tabsMarkdownPlugin)
    },
  },

  themeConfig: {
    logo: '/logo/logo.png',

    appearance: true,

    nav: [
      { text: 'Сайт', link: 'https://hlauncher.com', target: '_blank' },
      { text: 'Скачать', link: 'https://cdn.hlauncher.com', target: '_blank' },
      { text: 'Support', link: 'https://t.me/LauncherHytaleSupportBot', target: '_blank' },
    ],

    sidebar: [
      {
        text: 'Главная',
        link: '/',
      },
      {
        text: 'Лаунчер',
        collapsed: false,
        items: [
          { text: 'Решение частых проблем', link: '/guides/launcher/faq' },
          { text: 'Установка модов', link: '/guides/launcher/mods' },
        ],
      },
      {
        text: 'Игра',
        collapsed: false,
        items: [
          { text: 'Список команд', link: '/guides/server/commands' },
        ],
      },
      {
        text: 'Создание сервера',
        collapsed: false,
        items: [
          { text: 'Как создать пиратский сервер', link: '/guides/create-server/pirate-server' },
        ],
      },
      {
        text: 'Игра с другом',
        collapsed: false,
        items: [
          { text: 'Хостинг через одиночный мир', link: '/guides/friends/singleworld-server' },
          { text: 'Игра через сервер в лаунчере', link: '/guides/friends/launcher-server' },
        ],
      },
      {
        text: 'Сервер',
        collapsed: false,
        items: [
          { text: 'PVP режим', link: '/guides/server/pvp' },
          { text: 'Установка модов', link: '/guides/server/mods' },
          { text: 'Перенос мира', link: '/guides/server/worldchange' },
          { text: 'Пересоздание мира', link: '/guides/server/worldclear' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'discord', link: 'https://discord.gg/Dsqe6JfZGS' },
      { icon: { svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>' }, link: 'https://t.me/launcherhytale' },
    ],

    footer: {
      message: 'Документация HLauncher',
      copyright: '© HytaleNet Launcher',
    },

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: 'Поиск',
            buttonAriaLabel: 'Поиск',
          },
          modal: {
            displayDetails: 'Показать подробности',
            resetButtonTitle: 'Сбросить',
            backButtonTitle: 'Назад',
            noResultsText: 'Ничего не найдено',
            footer: {
              selectText: 'выбрать',
              selectKeyAriaLabel: 'Enter',
              navigateText: 'перейти',
              navigateUpKeyAriaLabel: 'стрелка вверх',
              navigateDownKeyAriaLabel: 'стрелка вниз',
              closeText: 'закрыть',
              closeKeyAriaLabel: 'Escape',
            },
          },
        },
      },
    },

    docFooter: {
      prev: 'Предыдущая',
      next: 'Следующая',
    },

    outline: {
      label: 'На этой странице',
    },
  },
})
