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
    if (error.response?.status === 400 || error.response?.status === 401) needLogin = true;
    if (error.response.data?.message) errMsg = error.response.data.message;
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
