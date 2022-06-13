import React, { ReactNode } from 'react';
import { Badge } from 'antd';
import {
  HomeOutlined,
  AppstoreOutlined,
  DatabaseOutlined,
  ClusterOutlined,
  QuestionCircleOutlined,
  ContactsOutlined,
} from '@ant-design/icons';

export interface MenuConfig {
  key: string;
  label: ReactNode;
  icon?: ReactNode;
  children?: MenuConfig[];
  auth?: string;
  path?: string;
  hidden?: boolean;
}

export const path2openKeys: Record<string, string> = {
  '/app/case/case': '/app/case',
  '/app/case/casedid': '/app/case',
  '/app/case/caseback': '/app/case',
  '/app/moduleCase/case': '/app/moduleCase',
  '/app/moduleCase/casedid': '/app/moduleCase',
  '/app/moduleCase/caseback': '/app/moduleCase',
  '/app/case/rule/CaseRuleSet': '/app/case/rule',
  '/app/case/insurance/type': '/app/case/rule',
  '/app/user/main': '/app/user',
  '/app/user/center': '/app/user',
};

export const getMenuConfig = (backCase: number): MenuConfig[] => [
  {
    key: '/app/dashboard/index',
    label: '首页',
    icon: <HomeOutlined />,
  },
  {
    key: '/app/case',
    label: '案件管理',
    icon: <AppstoreOutlined />,
    children: [
      {
        key: '/app/case/case',
        label: '待处理',
        auth: 'auth/case/select',
      },
      {
        key: '/app/case/casedid',
        label: '已处理',
        auth: 'auth/case/did/select',
      },
      {
        key: '/app/case/caseback',
        label: (
          <Badge overflowCount={9999} count={backCase} offset={[18, 0]}>
            <span>退回案件</span>
          </Badge>
        ),
      },
    ],
  },
  {
    key: '/app/moduleCase',
    label: '案件管理',
    icon: <AppstoreOutlined />,
    hidden: true,
    children: [
      {
        key: '/app/moduleCase/case',
        label: '待处理',
        auth: 'auth/case/select',
      },
      {
        key: '/app/moduleCase/casedid',
        label: '已处理',
        auth: 'auth/case/did/select',
      },
      {
        key: '/app/moduleCase/caseback',
        label: '退回案件',
      },
    ],
  },
  {
    key: '/app/case/querycase',
    label: '案件查询',
    icon: <DatabaseOutlined />,
  },
  {
    key: '/app/case/rule',
    label: '规则管理',
    icon: <ClusterOutlined />,
    children: [
      {
        key: '/app/case/rule/CaseRuleSet',
        label: '默认比例设置',
        auth: 'auth/case/typeb-edit-close',
      },
      {
        key: '/app/case/insurance/type',
        label: '非车险种设置',
        auth: 'auth/case/insurance/type/select',
      },
    ],
  },
  {
    key: '/app/user',
    label: '信息管理',
    icon: <ContactsOutlined />,
    children: [
      {
        key: '/app/user/main',
        label: '用户管理',
        auth: 'auth/user/select',
      },
      {
        key: '/app/user/center',
        label: '个人信息',
      },
    ],
  },
  {
    key: '/app/problem',
    label: '问题反馈',
    icon: <QuestionCircleOutlined />,
  },
];
