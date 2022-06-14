import React, { useEffect, useMemo, useState } from 'react';
import { Layout, Popover, Menu } from 'mishu-ui';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import logoImage from 'Assets/images/logo.png';
import defaultAvatar from 'Assets/images/defaultAvatar.jpg';
import { safeJSONParse } from 'Utils/methods';
import ContentCard from 'Components/contentcard';
import ContentTitle from 'Components/contenttitle';
import XCXImg from 'Assets/images/XCXImg.jpg';
import { path2contentTitle, userInfo } from 'Utils/constants';
import { getMenuConfig, path2openKeys } from './constants';
import { getBackcaseApi } from './services';
import './index.less';

const getItems = (backCase: number) =>
  getMenuConfig(backCase).filter((cfg) => {
    if (cfg.hidden) return false;
    if ((cfg.auth && userInfo.permissions?.includes(cfg.auth)) || !cfg.auth) {
      if (cfg.children) {
        cfg.children = cfg.children.filter(
          (childCfg) => (childCfg.auth && userInfo.permissions?.includes(childCfg.auth)) || !childCfg.auth,
        );
      }
      return true;
    }
    return false;
  });

const Base = () => {
  const { pathname } = useLocation();
  const navigator = useNavigate();
  const backCase: number = safeJSONParse<number, number>(localStorage.getItem('backCase'), 0);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [openKeys, setOpenKeys] = useState<string[]>([path2openKeys[pathname]]);
  const items = useMemo(() => getItems(backCase), [backCase]);

  const logout = () => {
    localStorage.clear();
    navigator('/login');
  };

  const clickMenu = (key: string) => {
    navigator(key);
  };

  const getBackcase = async () => {
    const res = await getBackcaseApi();
    if (res && res.backCaseNum) {
      localStorage.setItem('backCase', JSON.stringify(res.backCaseNum));
    }
  };

  useEffect(() => {
    if (pathname === '/app') navigator('dashboard/index');
    getBackcase();
  }, []);

  return (
    <Layout className='h-100'>
      <Layout.Header className='base-header'>
        <img src={logoImage} alt='LOGO' />
        <div className='base-userinfo'>
          <Popover placement='bottom' content={<img className='base-xcx' src={XCXImg} alt='小程序二维码' />}>
            <span className='mr-16 base-module-text'>小程序</span>
          </Popover>
          <img src={userInfo.avatarUrl || defaultAvatar} alt='avator' className='base-avatar' />
          <Popover
            placement='bottom'
            content={
              <div className='link-text w-100 text-align-r' onClick={logout}>
                退出登录
              </div>
            }
          >
            <span className='base-username'>{userInfo.name || ''}</span>
          </Popover>
        </div>
      </Layout.Header>
      <Layout hasSider>
        <Layout.Sider
          theme='light'
          collapsible
          width={160}
          collapsedWidth={48}
          collapsed={collapsed}
          onCollapse={() => setCollapsed((pre) => !pre)}
          trigger={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        >
          <Menu
            mode='inline'
            selectedKeys={[pathname]}
            openKeys={openKeys}
            onClick={(menuCfg) => clickMenu(menuCfg.key)}
            onOpenChange={(keys) => setOpenKeys(keys)}
            items={items}
          />
        </Layout.Sider>
        <Layout>
          <ContentTitle title={path2contentTitle[pathname]} />
          <ContentCard>
            <Outlet />
          </ContentCard>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Base;
