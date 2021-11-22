import { lazy } from 'react';

export const mainRoutes = [
  {
    name: 'login',
    path: '/login',
    exact: true,
    component: lazy(() => import('../views/login')),
    isPrivate: false,
    restricted: false,
  },
  {
    name: 'user',
    path: '/user',
    exact: true,
    component: lazy(() => import('../views/user')),
    isPrivate: true,
    restricted: false,
  },
  {
    name: 'users',
    path: '/users',
    exact: true,
    component: lazy(() => import('../Components/Users')),
    isPrivate: true,
    restricted: false,
  },
  {
    name: 'admin',
    path: '/admin',
    exact: true,
    component: lazy(() => import('../views/AdminView')),
    isPrivate: true,
    restricted: false,
  },
  {
    name: 'super',
    path: '/super',
    exact: true,
    component: lazy(() => import('../views/AdminView')),
    isPrivate: true,
    restricted: false,
  },
  {
    name: 'dashbord',
    path: '/dashbord',
    exact: true,
    component: lazy(() => import('../Components/Dashbord')),
    isPrivate: true,
    restricted: false,
  },
];
