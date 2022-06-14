import { UserInfoRes } from 'Pages/root/services';
import { safeJSONParse } from './methods';

export const path2contentTitle: Record<string, string> = {
  '/app/dashboard/index': '首页',
  '/app/case/case': '案件管理/待处理案件',
  '/app/case/casedid': '案件管理/已处理案件',
  '/app/case/caseback': '案件管理/退回案件',
};

export const userInfo: UserInfoRes = safeJSONParse<Record<string, any>, Record<string, any>>(
  localStorage.getItem('user'),
  {},
);
