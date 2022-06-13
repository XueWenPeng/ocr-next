import Request from 'Src/request';

export interface PwdModeParams {
  account: string;
  password: string;
}

export interface LoginRes {
  status: number;
  message: string;
  token?: string;
}

export const pwdLoginApi = (data: PwdModeParams) =>
  Request<PwdModeParams, LoginRes>({
    url: '/api/user/login',
    method: 'POST',
    data,
  });

export interface SendMsgParams {
  account: string;
}

export interface SendMsgRes {
  phone: string;
  sendStatus: number;
}

export const sendMsgApi = (data: SendMsgParams) =>
  Request<SendMsgParams, SendMsgRes>({
    url: '/sms/verifyCode',
    method: 'POST',
    data,
  });

export interface MsgModePrams {
  account: string;
  verifyCode: string;
}

export const msgLoginApi = (data: MsgModePrams) =>
  Request<MsgModePrams, LoginRes>({
    url: '/sms/login',
    method: 'POST',
    data,
  });
