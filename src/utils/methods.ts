import { UserInfoRes } from 'Pages/root/services';

export const safeJSONParse = <T, U>(data: any, defaultValue: U): T | U => {
  try {
    const result: T = JSON.parse(data);
    return result;
  } catch (error) {
    console.log(error);
    return defaultValue;
  }
};

export const getUserInfo = (): UserInfoRes =>
  safeJSONParse<Record<string, any>, Record<string, any>>(localStorage.getItem('user'), {});

export const renderBigNumber = (num: number): string | number => {
  if (num >= 10 ** 12) return `${(num / 10 ** 12).toFixed(2)}兆`;
  if (num >= 10 ** 8) return `${(num / 10 ** 8).toFixed(2)}亿`;
  if (num >= 10 ** 4) return `${(num / 10 ** 4).toFixed(2)}万`;
  return num;
};
