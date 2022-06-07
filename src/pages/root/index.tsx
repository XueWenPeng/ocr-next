import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const Root = () => {
  const navigator = useNavigate();
  const { pathname } = useLocation();
  const [userInfo, setUserInfo] = useState(false);

  const getUserInfo = () => {
    setUserInfo(true);
    if (pathname === '/') navigator('/app');
  };

  useEffect(() => {
    if (!userInfo && pathname !== '/login') getUserInfo();
  }, []);

  return <Outlet />;
};

export default Root;
