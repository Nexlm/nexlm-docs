import { defineConfig } from 'vitepress';
import { adminSidebar, apiSidebar, developersSidebar, guideSidebar, productSidebar } from './sidebars.mjs';

export default defineConfig({
  title: 'Nexlm Docs',
  description: 'Guides, developer documentation and API reference for Nexlm, the P2P XLM ↔ Naira exchange on Stellar.',
  lang: 'en-NG',
  // GitHub Pages serves the site under /nexlm-docs/; custom domains use '/'.
  base: process.env.DOCS_BASE || '/',
  cleanUrls: true,
  lastUpdated: true,
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${process.env.DOCS_BASE || '/'}logo.svg` }],
    ['meta', { name: 'theme-color', content: '#4f46e5' }],
  ],
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: 'User guide', link: '/guide/', activeMatch: '^/guide/' },
      { text: 'Admin', link: '/admin/', activeMatch: '^/admin/' },
      { text: 'Developers', link: '/developers/', activeMatch: '^/developers/' },
      { text: 'API', link: '/api/', activeMatch: '^/api/' },
      { text: 'Product', link: '/product/', activeMatch: '^/product/' },
    ],
    sidebar: {
      '/guide/': guideSidebar,
      '/admin/': adminSidebar,
      '/developers/': developersSidebar,
      '/api/': apiSidebar,
      '/product/': productSidebar,
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/Nexlm' }],
    search: { provider: 'local' },
    editLink: {
      pattern: 'https://github.com/Nexlm/nexlm-docs/edit/main/docs/:path',
      text: 'Suggest an edit',
    },
    outline: { level: [2, 3] },
    footer: {
      message: 'Nexlm is a peer-to-peer facilitator and never holds customer Naira.',
      copyright: '© 2026 Nexlm',
    },
  },
});
