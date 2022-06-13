import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { message } from 'mishu-ui';
import { redirectToLogin } from 'Src/request/config';
import { getUserInfoApi, buriedApi } from './services';

const Root = () => {
  const navigator = useNavigate();
  const { pathname } = useLocation();

  const handleGetUserInfo = async () => {
    const token = localStorage.getItem('token') || '';
    if (!token) {
      message.warning('未登录！');
      redirectToLogin();
      return;
    }
    const res = await getUserInfoApi({ token });
    if (res) {
      localStorage.setItem('user', JSON.stringify(res));
      buriedApi({
        orginData: {},
        nodeName: '登录成功',
        operateType: 1,
      });
      navigator('/app');
    }
  };

  useEffect(() => {
    const userInfo = localStorage.getItem('user');
    if (userInfo && pathname === '/') navigator('/app');
    if (!userInfo && pathname !== '/login') handleGetUserInfo();
  }, [pathname]);

  return <Outlet />;
};

export default Root;
