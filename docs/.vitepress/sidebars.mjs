export const guideSidebar = [
  {
    text: 'Getting started',
    items: [
      { text: 'Welcome to Nexlm', link: '/guide/' },
      { text: 'Early access on testnet', link: '/guide/testnet' },
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

export const adminSidebar = [
  {
    text: 'Admin guide',
    items: [
      { text: 'Overview', link: '/admin/' },
      { text: 'Getting admin access', link: '/admin/access' },
      { text: 'Overview dashboard', link: '/admin/dashboard' },
      { text: 'Users', link: '/admin/users' },
      { text: 'KYC review', link: '/admin/kyc-review' },
      { text: 'Account status', link: '/admin/account-status' },
      { text: 'Trade monitoring', link: '/admin/trade-monitoring' },
      { text: 'Stuck trades', link: '/admin/stuck-trades' },
      { text: 'Incident playbook', link: '/admin/incident-playbook' },
    ],
  },
];

export const developersSidebar = [
  {
    text: 'Introduction',
    items: [
      { text: 'Overview', link: '/developers/' },
      { text: 'Architecture', link: '/developers/architecture' },
      { text: 'Tech stack', link: '/developers/tech-stack' },
      { text: 'Project structure', link: '/developers/project-structure' },
    ],
  },
  {
    text: 'Setup',
    items: [
      { text: 'Local setup', link: '/developers/local-setup' },
      { text: 'Environment variables', link: '/developers/environment-variables' },
      { text: 'Migrations and seeding', link: '/developers/migrations' },
    ],
  },
  {
    text: 'Stellar & escrow',
    items: [
      { text: 'Stellar integration', link: '/developers/stellar-integration' },
      { text: 'Custodial wallets', link: '/developers/custodial-wallets' },
      { text: 'Escrow design', link: '/developers/escrow-design' },
      { text: 'Escrow operations', link: '/developers/escrow-operations' },
      { text: 'Trade state machine', link: '/developers/trade-state-machine' },
      { text: 'Reconciliation', link: '/developers/reconciliation' },
      { text: 'Amounts and precision', link: '/developers/amounts-and-precision' },
    ],
  },
  {
    text: 'Data',
    items: [
      { text: 'Database schema', link: '/developers/database-schema' },
      { text: 'User', link: '/developers/models/user' },
      { text: 'PaymentAccount', link: '/developers/models/payment-account' },
      { text: 'Order', link: '/developers/models/order' },
      { text: 'Trade', link: '/developers/models/trade' },
      { text: 'Message', link: '/developers/models/message' },
      { text: 'Transaction', link: '/developers/models/transaction' },
    ],
  },
  {
    text: 'Server internals',
    items: [
      { text: 'Authentication', link: '/developers/authentication' },
      { text: 'Request validation', link: '/developers/validation' },
      { text: 'Error handling', link: '/developers/error-handling' },
      { text: 'Rate limiting', link: '/developers/rate-limiting' },
      { text: 'File uploads', link: '/developers/file-uploads' },
      { text: 'KYC integration', link: '/developers/kyc-integration' },
      { text: 'Email', link: '/developers/email' },
      { text: 'Realtime events', link: '/developers/realtime' },
      { text: 'Background jobs', link: '/developers/background-jobs' },
      { text: 'Logging', link: '/developers/logging' },
    ],
  },
  {
    text: 'Client',
    items: [{ text: 'Client architecture', link: '/developers/client-architecture' }],
  },
  {
    text: 'How-to',
    items: [
      { text: 'Add an API endpoint', link: '/developers/adding-an-endpoint' },
      { text: 'Add a payment method', link: '/developers/adding-a-payment-method' },
    ],
  },
  {
    text: 'Operations',
    items: [
      { text: 'Testing', link: '/developers/testing' },
      { text: 'Deployment', link: '/developers/deployment' },
      { text: 'Security model', link: '/developers/security-model' },
      { text: 'Troubleshooting', link: '/developers/troubleshooting' },
      { text: 'Contributing', link: '/developers/contributing' },
    ],
  },
];

export const apiSidebar = [
  {
    text: 'Basics',
    items: [
      { text: 'Overview', link: '/api/' },
      { text: 'Quickstart', link: '/api/quickstart' },
      { text: 'JavaScript client', link: '/api/client-example' },
      { text: 'Errors', link: '/api/errors' },
      { text: 'Pagination', link: '/api/pagination' },
      { text: 'Health check', link: '/api/health' },
      { text: 'Realtime events', link: '/api/socket-events' },
    ],
  },
  {
    text: 'Auth',
    collapsed: false,
    items: [
      { text: 'Register', link: '/api/auth/register' },
      { text: 'Log in', link: '/api/auth/login' },
      { text: 'Current session', link: '/api/auth/me' },
      { text: 'Verify email', link: '/api/auth/verify-email' },
      { text: 'Resend verification', link: '/api/auth/resend-verification' },
      { text: 'Forgot password', link: '/api/auth/forgot-password' },
      { text: 'Reset password', link: '/api/auth/reset-password' },
      { text: 'Change password', link: '/api/auth/change-password' },
    ],
  },
  {
    text: 'Users',
    collapsed: true,
    items: [
      { text: 'Get my profile', link: '/api/users/me' },
      { text: 'Update my profile', link: '/api/users/update-me' },
      { text: 'List payout accounts', link: '/api/users/payment-accounts-list' },
      { text: 'Add payout account', link: '/api/users/payment-accounts-create' },
      { text: 'Delete payout account', link: '/api/users/payment-accounts-delete' },
      { text: 'Public profile', link: '/api/users/public-profile' },
    ],
  },
  {
    text: 'KYC',
    collapsed: true,
    items: [
      { text: 'Status', link: '/api/kyc/status' },
      { text: 'Submit', link: '/api/kyc/submit' },
    ],
  },
  {
    text: 'Wallet',
    collapsed: true,
    items: [
      { text: 'Summary', link: '/api/wallet/summary' },
      { text: 'Deposit details', link: '/api/wallet/deposit' },
      { text: 'Activity', link: '/api/wallet/activity' },
      { text: 'Transactions', link: '/api/wallet/transactions' },
      { text: 'Withdraw', link: '/api/wallet/withdraw' },
    ],
  },
  {
    text: 'Orders',
    collapsed: true,
    items: [
      { text: 'List market orders', link: '/api/orders/list' },
      { text: 'My orders', link: '/api/orders/mine' },
      { text: 'Get an order', link: '/api/orders/get' },
      { text: 'Create an order', link: '/api/orders/create' },
      { text: 'Cancel an order', link: '/api/orders/cancel' },
    ],
  },
  {
    text: 'Trades',
    collapsed: true,
    items: [
      { text: 'My trades', link: '/api/trades/list' },
      { text: 'Open a trade', link: '/api/trades/open' },
      { text: 'Get a trade', link: '/api/trades/get' },
      { text: 'Mark as paid', link: '/api/trades/mark-paid' },
      { text: 'Release escrow', link: '/api/trades/release' },
      { text: 'Cancel a trade', link: '/api/trades/cancel' },
      { text: 'List messages', link: '/api/trades/messages-list' },
      { text: 'Send a message', link: '/api/trades/messages-send' },
    ],
  },
  {
    text: 'Admin',
    collapsed: true,
    items: [
      { text: 'Overview', link: '/api/admin/overview' },
      { text: 'List users', link: '/api/admin/users-list' },
      { text: 'Get a user', link: '/api/admin/users-get' },
      { text: 'Change user status', link: '/api/admin/users-status' },
      { text: 'Review KYC', link: '/api/admin/kyc-review' },
      { text: 'List trades', link: '/api/admin/trades-list' },
      { text: 'Get a trade', link: '/api/admin/trades-get' },
    ],
  },
];

export const productSidebar = [
  {
    text: 'Product',
    items: [
      { text: 'Overview', link: '/product/' },
      { text: 'Roadmap', link: '/product/roadmap' },
      { text: 'Changelog', link: '/product/changelog' },
      { text: 'Glossary', link: '/product/glossary' },
    ],
  },
  {
    text: 'Design decisions',
    items: [
      { text: 'Index', link: '/product/decisions/' },
      { text: '0001 Custodial wallets for Phase 1', link: '/product/decisions/0001-custodial-wallets' },
      { text: '0002 One escrow account per trade', link: '/product/decisions/0002-escrow-account-per-trade' },
      { text: '0003 BigInt minor units for money', link: '/product/decisions/0003-bigint-amounts' },
      { text: '0004 Reconcile unknown outcomes', link: '/product/decisions/0004-reconcile-unknown-outcomes' },
      { text: '0005 Manual Naira confirmation', link: '/product/decisions/0005-manual-naira-confirmation' },
    ],
  },
];
