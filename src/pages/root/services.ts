import Request from 'Src/request';
import { safeJSONParse } from 'Utils/methods';

export interface UserInfoParams {
  token: string;
}

export interface UserInfoRes extends Record<string, any> {
  acount?: string;
  id?: number;
  name?: string;
  phone?: string;
  userType?: number;
  permissions?: string[];
}

export const getUserInfoApi = (params: UserInfoParams) =>
  Request<UserInfoParams, UserInfoRes>({
    url: '/api/user/detail',
    method: 'GET',
    params,
  });

export type OperateType = 1 | 2 | 3 | 4;
// 1：点击2：删除3：修改 4：新增

export interface BuiredParams {
  orginData: Record<string, any>;
  nodeName: string;
  operateType: OperateType;
  preContent?: Record<string, any> | null;
  newContent?: Record<string, any> | null;
  plateType?: number;
}

export interface BuiredRequestParams extends Record<string, any> {
  dataJson: string;
  nodeName: string;
  operateType: OperateType;
  plateType: number;
  userId: string;
}

export const buriedApi = ({
  orginData,
  nodeName,
  operateType,
  preContent,
  newContent,
  plateType = 0,
}: BuiredParams) => {
  const userId = safeJSONParse<UserInfoRes, Record<string, any>>(localStorage.getItem('user'), {}).id;
  const dataJson = orginData.dataJson || {};
  if (preContent || newContent) {
    dataJson.preContent = preContent;
    dataJson.newContent = newContent;
  }
  const data: BuiredRequestParams = {
    ...orginData,
    nodeName,
    operateType,
    plateType,
    userId,
    dataJson: JSON.stringify(dataJson),
  };
  Request<BuiredRequestParams, any>({
    url: '/tracking/point',
    method: 'POST',
    data,
  });
};
