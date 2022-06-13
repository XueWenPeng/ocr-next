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
          // 首页
          {
            routePath: 'dashboard/index',
            componentPath: 'home',
          },
          // 非车案件管理
          {
            routePath: 'case/case',
            componentPath: 'home',
          },
          {
            routePath: 'case/casedid',
            componentPath: 'home',
          },
          {
            routePath: 'case/caseback',
            componentPath: 'home',
          },
          // 车险案件管理
          {
            routePath: 'moduleCase/case',
            componentPath: 'home',
          },
          {
            routePath: 'moduleCase/casedid',
            componentPath: 'home',
          },
          {
            routePath: 'moduleCase/caseback',
            componentPath: 'home',
          },
          // 案件查询
          {
            routePath: 'case/querycase',
            componentPath: 'home',
          },
          // 规则管理
          {
            routePath: 'case/rule/CaseRuleSet',
            componentPath: 'home',
          },
          {
            routePath: 'case/insurance/type',
            componentPath: 'home',
          },
          // 信息管理
          {
            routePath: 'user/main',
            componentPath: 'home',
          },
          {
            routePath: 'user/center',
            componentPath: 'home',
          },
          // 问题反馈
          {
            routePath: 'problem',
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
