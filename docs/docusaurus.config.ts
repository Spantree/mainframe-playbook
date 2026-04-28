import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Mainframe Playbook',
  tagline: 'Built with Trellis',

  url: 'https://mainframe-playbook.example.com',
  baseUrl: '/docs/',

  organizationName: 'mainframe-playbook',
  projectName: 'mainframe-playbook',

  // Cross-package links (e.g. /slides/) are only valid when all packages are
  // served together behind a reverse proxy. Use 'warn' so the docs build
  // succeeds in isolation without false "broken link" errors.
  onBrokenLinks: 'warn',

  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          path: 'content',
          routeBasePath: '/',
          sidebarCollapsed: false,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'Mainframe Playbook',
      items: [
        {
          to: '/',
          label: 'Home',
          position: 'left',
        },
        {
          type: 'html',
          position: 'right',
          value: '<a class="navbar__item navbar__link" href="/slides/">Slides</a>',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Project',
          items: [
            {
              label: 'Home',
              to: '/',
            },
            {
              html: '<a class="footer__link-item" href="/slides/">Slides</a>',
            },
          ],
        },
        {
          title: 'Trifork',
          items: [
            {
              label: 'Website',
              href: 'https://spantree.net',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Trifork.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
