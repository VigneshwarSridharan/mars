import { lazy } from 'react';

const Dashboard = lazy(() => import(/* webpackChunkName: "dashboard" */'../views/Dashboard'));
const Calendar = lazy(() => import(/* webpackChunkName: "calendar" */'../views/Calendar'));
const Reports = lazy(() => import(/* webpackChunkName: "reports" */'../views/Reports'));



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
        path: '/reports',
        component: Reports,
        name: 'Reports',
        icon: 'mdi mdi-clipboard-text'
    },
    {
        path: '/communication',
        component: Reports,
        name: 'Communication',
        icon: 'mdi mdi-message-processing'
    },
    {
        path: '/deployment',
        component: Reports,
        name: 'Deployment',
        icon: 'mdi mdi-cube'
    },
    {
        path: '/security',
        component: Reports,
        name: 'Security',
        icon: 'mdi mdi-security'
    },
    {
        path: '/settings',
        component: Reports,
        name: 'Settings',
        icon: 'mdi mdi-settings'
    }
]