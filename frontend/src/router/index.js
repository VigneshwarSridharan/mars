import { lazy } from 'react';

const Dashboard = lazy(() => import(/* webpackChunkName: "dashboard" */'../views/Dashboard'));
const Calendar = lazy(() => import(/* webpackChunkName: "calendar" */'../views/Calendar'));
const Trading = lazy(() => import(/* webpackChunkName: "reports" */'../views/Trading'));
const SymbolInfo = lazy(() => import(/* webpackChunkName: "symbol-info" */'../views/SymbolInfo'));
const BugCatcher = lazy(() => import(/* webpackChunkName: "bug-catcher" */'../views/BugCatcher'));
const BugDetails = lazy(() => import(/* webpackChunkName: "bug-details" */'../views/BugDetails'));



export default [
    {
        path: '/',
        component: Dashboard,
        name: 'Dashboard',
        icon: 'mdi mdi-collage',
        exact: true,
        animation: false
    },
    {
        path: '/trading/:symbol',
        component: SymbolInfo,
        name: 'Symbol Info',
        icon: 'mdi mdi-chart-timeline-variant',
        display: false
    },
    {
        path: '/trading',
        component: Trading,
        name: 'Trading',
        icon: 'mdi mdi-chart-timeline-variant'
    },
    {
        path: '/bug/:id',
        component: BugDetails,
        name: 'Bug Details',
        icon: 'mdi mdi-bug',
        display: false
    },
    {
        path: '/bug',
        component: BugCatcher,
        name: 'Bug Catcher',
        icon: 'mdi mdi-bug'
    },
    {
        path: '/communication',
        component: Trading,
        name: 'Communication',
        icon: 'mdi mdi-message-processing'
    },
    {
        path: '/deployment',
        component: Trading,
        name: 'Deployment',
        icon: 'mdi mdi-cube'
    },
    {
        path: '/security',
        component: Trading,
        name: 'Security',
        icon: 'mdi mdi-security'
    },
    {
        path: '/settings',
        component: Trading,
        name: 'Settings',
        icon: 'mdi mdi-settings'
    }
]