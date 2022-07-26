import React from 'react';
import avatar from '../Static/images/flat-avatar.png';
import { Link } from 'react-router-dom';
import { Menu, Input, Avatar } from 'antd';
import authActions from '../Redux/Auth/actions';
import { useDispatch, useSelector } from 'react-redux';

const SubMenu = Menu.SubMenu;

const Search = Input.Search;

const HeaderDiv = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth)

  const logout = () => {
    dispatch(authActions.logout());
  };

  return (
    <Menu
      mode="horizontal"
      theme="dark"
      className="d-flex align-items-center custom-navigation"
    >
      <Menu.Item key="brand-logo" className="brand-logo">
        <Link to="/">
          <span>Accompany Me</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="search" className="custom-search auto">
        <Search onSearch={(value) => value} />
      </Menu.Item>
      <SubMenu
        key="profile"
        title={
          <span>
            <Avatar size={30} src={avatar} />
            <span className="email-style">{user?.email}</span>
          </span>
        }
      >
        <Menu.Item key="profile-view">
          <Link to="/profile">Profile</Link>
        </Menu.Item>
        <Menu.Item key="logout">
          <Link to="/" onClick={logout}>
            Logout
          </Link>
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
};
export default HeaderDiv;
