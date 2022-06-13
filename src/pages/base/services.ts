import Request from 'Src/request';

export interface BackcaseNum {
  backCaseNum: number;
}

export const getBackcaseApi = () =>
  Request<null, BackcaseNum>({
    url: '/api/case/count/web',
    method: 'GET',
    params: null,
  });
