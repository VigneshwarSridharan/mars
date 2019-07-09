import { lazy } from 'react';

const Dashboard = lazy(() => import(/* webpackChunkName: "dashboard" */'../views/Dashboard'));
const Calendar = lazy(() => import(/* webpackChunkName: "calendar" */'../views/Calendar'));
const Trading = lazy(() => import(/* webpackChunkName: "reports" */'../views/Trading'));
const SymbolInfo = lazy(() => import(/* webpackChunkName: "symbol-info" */'../views/SymbolInfo'));



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
        path: '/calendar',
        component: Calendar,
        name: 'Calendar',
        icon: 'mdi mdi-calendar'
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