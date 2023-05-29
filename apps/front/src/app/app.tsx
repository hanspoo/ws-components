import {
  HomeOutlined,
  InfoCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import "../styles.css"

import { LoginState, LoginSection, UsersContainer } from '@starter-ws/auth/ui';
import { useSelector } from 'react-redux';
import { RootState } from '@starter-ws/reductor';

const { Header, Sider, Content } = Layout;

enum Modo {
  HOME = 'Home',
  USERS = 'Usuarios',
  ABOUT = 'Acerca de',
}

const App = () => {
  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);
  const [modo, setModo] = useState(Modo.HOME);
  const [collapsed, setCollapsed] = useState(false);

  if (!loggedIn) return <LoginSection />;

  function onChangeMenu(args: any) {
    setModo(args.key);
  }

  return (
    <Layout id="container" role="container">
      <LoginState />
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />

        <Menu
          onClick={onChangeMenu}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[Modo.HOME + '']}
          items={[
            {
              key: Modo.HOME,
              icon: <HomeOutlined />,
              label: 'Home',
            },
            {
              key: Modo.USERS,
              icon: <UserOutlined />,
              label: 'Usuarios',
            },
            {
              key: Modo.ABOUT,
              icon: <InfoCircleOutlined />,
              label: 'Acerca de',
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            }
          )}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            minHeight: 280,
          }}
        >
          {modo === Modo.HOME && <Home />}
          {modo === Modo.ABOUT && <About />}
          {modo === Modo.USERS && <UsersContainer />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;

function Home() {
  return <div>Home</div>;
}
function About() {
  return <div>Acá va la descripción de tu proyecto.</div>;
}
