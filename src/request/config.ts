import axios, { AxiosRequestConfig } from 'axios';

const isProduction = process.env.NODE_ENV === 'production';
const { protocol, host } = window.location;
const COMMON_URL = `${protocol}//${host}`;

let BASE_URL = 'https://testocr.mishudata.com/ocr';
let BAIDU_OCR_REQUEST_URI = 'https://ocr.mishudata.com/rect_ocr_by_baidu';
let GT_OCR_REQUEST_URI = 'https://testocr.mishudata.com/receipt_ocr';
let OCR_ANALYSIS_REQUEST_URI = 'https://testocr.mishudata.com/analysis';
let IMAGE_BASE_URI = 'https://cdn.mishudata.com/';
const HIOCR_URI = `${COMMON_URL}/hiocr`;

if (isProduction) {
  BASE_URL = `${COMMON_URL}/ocr`;
  BAIDU_OCR_REQUEST_URI = `${COMMON_URL}/rect_ocr_by_baidu`;
  GT_OCR_REQUEST_URI = `${COMMON_URL}/receipt_ocr`;
  OCR_ANALYSIS_REQUEST_URI = `${COMMON_URL}/analysis`;
  IMAGE_BASE_URI = `${COMMON_URL}/`;
}

export const URL_CONFIG = {
  BASE_URL,
  BAIDU_OCR_REQUEST_URI,
  GT_OCR_REQUEST_URI,
  OCR_ANALYSIS_REQUEST_URI,
  IMAGE_BASE_URI,
  HIOCR_URI,
};

export const API_TIMEOUT = 30 * 1000;

export const RequestPendingMap = new Map();

export interface RequestErrorStatus {
  errMsg: string;
  needLogin: boolean;
}

export const handleRequestErrorStatus = (error: any): RequestErrorStatus | void => {
  if (axios.isCancel(error)) return console.error(`该请求为重复请求，已被阻止！：${error.message}`);
  let errMsg = '请求出错！';
  let needLogin = false;
  if (error?.response) {
    switch (error.response?.status) {
      case 302:
        errMsg = '接口重定向了！';
        break;
      case 400:
        errMsg = '参数不正确！';
        break;
      case 401:
        errMsg = '您未登录，或者登录已经超时，请先登录！';
        needLogin = true;
        break;
      case 403:
        errMsg = '您没有权限操作！';
        break;
      case 404:
        errMsg = `请求地址出错: ${error.response.config.url}`;
        break;
      case 408:
        errMsg = '请求超时！';
        break;
      case 409:
        errMsg = '系统已存在相同数据！';
        break;
      case 500:
        errMsg = '接口报错！';
        break;
      case 501:
        errMsg = '服务未实现！';
        break;
      case 502:
        errMsg = '网关错误！';
        break;
      case 503:
        errMsg = '服务不可用！';
        break;
      case 504:
        errMsg = '服务暂时无法访问，请稍后再试！';
        break;
      case 505:
        errMsg = 'HTTP版本不受支持！';
        break;
      default:
        errMsg = '请求异常！';
        break;
    }
  }
  if (error?.message?.includes('timeout')) errMsg = '网络请求超时！';
  if (error?.message?.includes('Network')) errMsg = window.navigator.onLine ? '服务端异常！' : '请检查网络！';
  return { errMsg, needLogin };
};

export const getPendingKey = ({ url, method }: AxiosRequestConfig): string => [url, method].join('&');

export const addPendingKey = (config: AxiosRequestConfig): void => {
  const pendingKey = getPendingKey(config);
  const cancelToken = new axios.CancelToken((cancel) => {
    if (!RequestPendingMap.has(pendingKey)) RequestPendingMap.set(pendingKey, cancel);
  });
  Reflect.defineProperty(config, 'cancelToken', { value: cancelToken });
};

export const removePendingKey = (config: AxiosRequestConfig): void => {
  const pendingKey = getPendingKey(config);
  if (RequestPendingMap.has(pendingKey)) {
    const cancelToken = RequestPendingMap.get(pendingKey);
    cancelToken(pendingKey);
    RequestPendingMap.delete(pendingKey);
  }
};

export const redirectToLogin = () => {
  setTimeout(() => {
    window.location.href = '/login';
  }, 1500);
};
