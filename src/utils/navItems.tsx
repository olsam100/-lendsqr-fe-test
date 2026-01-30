import {
  DashboardIcon,
  UsersIcon,
  Guarantors,
  Loans,
  DecisionModel,
  Savings,
  LoanRequests,
  Whitelist,
  Karma,
  Organization,
  LoanProducts,
  SavingsProducts,
  FeesAndCharges,
  Transactions,
  Services,
  ServiceAccount,
  Settlements,
  Reports,
  Preferences,
  FeesAndPricing,
  AuditLogs,
} from '../assets/icons/dashboard-icons/dashboard'

export const sidebarItems = [
  {
    items: [
      {
        name: 'Dashboard',
        value: 'Dashboard',
        icon: <DashboardIcon />,
        link: '/',
      },
    ],
  },
  {
    title: 'Customers',
    items: [
      {
        name: 'Users',
        value: 'Users',
        icon: <UsersIcon />,
        link: '/users',
      },
      {
        name: 'Guarantors',
        value: 'Guarantors',
        icon: <Guarantors />,
        link: '/guarantors',
      },
      {
        name: 'Loans',
        value: 'Loans',
        icon: <Loans />,
        link: '/loans',
      },
      {
        name: 'Decison Models',
        value: 'Decison Models',
        icon: <DecisionModel />,
        link: '/decisonModels',
      },
      {
        name: 'Savings',
        value: 'Savings',
        icon: <Savings />,
        link: '/savings',
      },
      {
        name: 'Loan Requests',
        value: 'Loan Requests',
        icon: <LoanRequests />,
        link: '/loan Requests',
      },
      {
        name: 'Whitelist',
        value: 'Whitelist',
        icon: <Whitelist />,
        link: '/whitelist',
      },
      {
        name: 'Karma',
        value: 'Karma',
        icon: <Karma />,
        link: '/karma',
      },
    ],
  },
  {
    title: 'Businesses',
    items: [
      {
        name: 'Organization',
        value: 'Organization',
        icon: <Organization />,
        link: '/organization',
      },
      {
        name: 'Loan Products',
        value: 'Loan Products',
        icon: <LoanProducts />,
        link: '/loan Products',
      },
      {
        name: 'Savings Products',
        value: 'Savings Products',
        icon: <SavingsProducts />,
        link: '/savings Products',
      },
      {
        name: 'Fees and Charges',
        value: 'Fees and Charges',
        icon: <FeesAndCharges />,
        link: '/fees and Charges',
      },
      {
        name: 'transactions',
        value: 'transactions',
        icon: <Transactions />,
        link: '/transactions',
      },
      {
        name: 'Services',
        value: 'Services',
        icon: <Services />,
        link: '/services',
      },
      {
        name: 'Service Account',
        value: 'Service Account',
        icon: <ServiceAccount />,
        link: '/service Account',
      },
      {
        name: 'Settlements',
        value: 'Settlements',
        icon: <Settlements />,
        link: '/settlements',
      },
      {
        name: 'Reports',
        value: 'Reports',
        icon: <Reports />,
        link: '/reports',
      },
    ],
  },
  {
    title: 'Settings',
    items: [
      {
        name: 'Preferences',
        value: 'Preferences',
        icon: <Preferences />,
        link: '/preferences',
      },
      {
        name: 'Fees and Pricing',
        value: 'Fees and Pricing',
        icon: <FeesAndPricing />,
        link: '/fees and Pricing',
      },
      {
        name: 'Audit Logs',
        value: 'Audit Logs',
        icon: <AuditLogs />,
        link: '/audit Logs',
      },
    ],
  },
]
