import { defineConfig } from 'vitepress';

const guideSidebar = [
  {
    text: 'Getting started',
    items: [
      { text: 'Welcome to Nexlm', link: '/guide/' },
      { text: 'Create an account', link: '/guide/create-account' },
      { text: 'Verify your email', link: '/guide/verify-email' },
      { text: 'Verify your identity (KYC)', link: '/guide/identity-verification' },
      { text: 'Add payout accounts', link: '/guide/payout-accounts' },
    ],
  },
  {
    text: 'Wallet',
    items: [
      { text: 'Your Stellar wallet', link: '/guide/wallet-overview' },
      { text: 'Deposit XLM', link: '/guide/deposit-xlm' },
      { text: 'Withdraw XLM', link: '/guide/withdraw-xlm' },
      { text: 'Balances explained', link: '/guide/balances' },
    ],
  },
  {
    text: 'Trading',
    items: [
      { text: 'The P2P market', link: '/guide/market' },
      { text: 'Buy XLM', link: '/guide/buy-xlm' },
      { text: 'Sell XLM', link: '/guide/sell-xlm' },
      { text: 'Post an order', link: '/guide/post-order' },
      { text: 'Manage your orders', link: '/guide/manage-orders' },
      { text: 'The trade room', link: '/guide/trade-room' },
      { text: 'Payment window', link: '/guide/payment-window' },
      { text: 'Chat and payment proof', link: '/guide/chat' },
      { text: 'Releasing XLM', link: '/guide/release' },
      { text: 'Cancelling a trade', link: '/guide/cancel-trade' },
      { text: 'Trade statuses', link: '/guide/trade-statuses' },
    ],
  },
  {
    text: 'Reputation & account',
    items: [
      { text: 'Reputation', link: '/guide/reputation' },
      { text: 'Account settings', link: '/guide/account-settings' },
      { text: 'Reset your password', link: '/guide/password-reset' },
    ],
  },
  {
    text: 'Safety & help',
    items: [
      { text: 'Staying safe', link: '/guide/safety' },
      { text: 'Common scams', link: '/guide/scams' },
      { text: 'Limits and fees', link: '/guide/limits-and-fees' },
      { text: 'Troubleshooting', link: '/guide/troubleshooting' },
      { text: 'FAQ', link: '/guide/faq' },
    ],
  },
];

export default defineConfig({
  title: 'Nexlm Docs',
  description: 'Guides, developer documentation and API reference for Nexlm, the P2P XLM ↔ Naira exchange on Stellar.',
  lang: 'en-NG',
  cleanUrls: true,
  lastUpdated: true,
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#4f46e5' }],
  ],
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: 'User guide', link: '/guide/' },
      { text: 'GitHub', link: 'https://github.com/Nexlm/nexlm' },
    ],
    sidebar: {
      '/guide/': guideSidebar,
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/Nexlm' }],
    search: { provider: 'local' },
    footer: {
      message: 'Nexlm is a peer-to-peer facilitator and never holds customer Naira.',
      copyright: '© 2026 Nexlm',
    },
  },
});
