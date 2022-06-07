import axios, { AxiosRequestConfig } from 'axios';
import { message } from 'mishu-ui';
import {
  URL_CONFIG,
  API_TIMEOUT,
  RequestPendingMap,
  addPendingKey,
  removePendingKey,
  redirectToLogin,
  handleRequestErrorStatus,
} from './config';

export type RequestMethod = 'GET' | 'POST' | 'DELETE' | 'PUT';

export interface ApiResponse<T> {
  success: boolean;
  errMessage: null | string;
  data: T;
}

export interface ApiRequestParams<T> {
  url: string;
  method?: RequestMethod;
  params?: T;
  data?: T;
}

export interface CustomSettings {
  repeatRequestHandle?: boolean;
}

const Request = <T, U>(
  reqConfig: ApiRequestParams<T>,
  customSettings: CustomSettings,
  otherConfig: AxiosRequestConfig,
): Promise<U> => {
  const { url, method = 'GET', params, data } = reqConfig;
  const { pathname } = window.location;
  const ACCESS_TOKEN = localStorage.getItem('token') || '';
  const hasCancelToken = RequestPendingMap.size > 0;

  const api = axios.create({
    timeout: API_TIMEOUT,
    baseURL: URL_CONFIG.BASE_URL,
    headers: {
      Authorization: ACCESS_TOKEN,
      Source: 'PC-OCR',
    },
    ...otherConfig,
  });

  api.interceptors.request.use(
    (config) => {
      if (hasCancelToken) removePendingKey(config);
      if (customSettings?.repeatRequestHandle) addPendingKey(config);
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  api.interceptors.response.use(
    (res) => {
      console.log('%c[打印api请求结果]\n', 'color: green', `url：${res.config.url}\n`, 'res：', res);
      if (hasCancelToken) removePendingKey(res.config);
      const resData: U = res.data;
      return resData;
    },
    (error) => {
      const errorInfo = handleRequestErrorStatus(error);
      if (errorInfo) {
        message.error(errorInfo.errMsg);
        if (errorInfo.needLogin && pathname !== '/login') redirectToLogin();
      }
    },
  );

  const requestOptions = method === 'POST' ? { url, method, data } : { url, method, params };
  return api(requestOptions) as Promise<any>;
};

export default Request;
