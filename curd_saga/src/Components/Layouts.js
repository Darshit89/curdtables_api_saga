import React, { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import HeaderDiv from './HeaderDiv';
import { Layout, Menu, Icon } from 'antd';
const { Header, Sider, Content } = Layout;

const Layouts = (props) => {
  const { classname, children } = props;
  const { pathname } = useLocation();
  const [collapsed, setcollapsed] = useState(false);

  const toggle = () => {
    setcollapsed(!collapsed);
  };

  const menuItems = [
    {
      key: 1,
      link: '/user',
      icon: 'user',
      text: 'Users'
    },
    {
      key: 2,
      link: '/chord',
      icon: 'profile',
      text: 'Chords'
    },
    {
      key: 3,
      link: '/artist',
      icon: 'user',
      text: 'Artists'
    },
    {
      key: 4,
      link: '/song',
      icon: 'profile',
      text: 'Songs'
    },
    {
      key: 5,
      link: '/plan',
      icon: 'profile',
      text: 'Plans'
    },
    {
      key: 6,
      link: '/lesson',
      icon: 'profile',
      text: 'Lessons'
    },
    {
      key: 7,
      link: '/subscription',
      icon: 'profile',
      text: 'User Subscription'
    },
    {
      key: 8,
      link: '/profile',
      icon: 'profile',
      text: 'Profile'
    }
  ];

  const activeKeys = useMemo(() => {
    return menuItems.filter((key) => pathname.startsWith(key.link)).map(({ key }) => String(key));
  }, [menuItems, pathname])


  const onCollapse = () => { };
  return (
    <Layout className={`${classname}`}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="sidebar-left bg-color"
        onCollapse={onCollapse}
      >
        <div className="logo" />
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={activeKeys}
        >
          {menuItems.map((menu) => {
            return (
              <Menu.Item key={menu.key} >
                <Link to={menu.link}>
                  <div>
                    <Icon type={menu.icon} />
                    <span>{menu.text}</span>
                  </div>
                </Link>
              </Menu.Item>
            );
          })}
        </Menu>
        <Icon
          className="trigger"
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={toggle}
        />
      </Sider>
      <Layout>
        <Header className="headerTop">
          <HeaderDiv />
        </Header>
        <Content
          style={{
            padding: 24,
            minHeight: '100vh'
          }}
          className={collapsed ? 'collapsed mainContnet ' : 'mainContnet'}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default Layouts;
