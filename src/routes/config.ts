import { RouteConfig } from '.';

export const routeConfig: RouteConfig[] = [
  {
    routePath: '/',
    componentPath: 'root',
    children: [
      {
        routePath: 'app',
        componentPath: 'base',
        children: [
          {
            routePath: 'home',
            componentPath: 'home',
          },
        ],
      },
      {
        routePath: 'login',
        componentPath: 'login',
      },
      {
        routePath: '*',
        componentPath: 'notfound',
      },
    ],
  },
];
