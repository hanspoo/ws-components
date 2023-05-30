import { ConfigProvider, Image, Layout } from 'antd';
import logo from './logo.png';

const { Header, Content, Footer } = Layout;

/* eslint-disable-next-line */
export interface PublicDecoratorProps {
  children: React.ReactNode;
}

const headerStyle: React.CSSProperties = {
  boxShadow: '0 5px 5px rgba(182, 182, 182, 0.75)',
  zIndex: 1000,
  paddingLeft: '1em',
};

const contentStyle: React.CSSProperties = {
  display: 'flex',
  // backgroundColor: 'red',
  minHeight: '75vh',

  justifyContent: 'center',
  alignItems: 'center',
  padding: '.5em',
  // position: 'relative',
  // top: '-100px',
};

const layoutStyle: React.CSSProperties = {
  // minHeight: '95vh',
};

const footerStyle: React.CSSProperties = {
  backgroundColor: 'coral',
  // textAlign: 'center',
  // color: '#fff',
};

const goHome = () => {
  window.location.assign('/');
};
export function PublicDecorator(props: PublicDecoratorProps) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#666',
        },
      }}
    >
      <Layout>
        <Header style={headerStyle}>
          <img
            style={{ cursor: 'pointer', marginTop: '10px' }}
            onClick={goHome}
            alt=""
            src={logo}
          />
        </Header>
        <Content style={contentStyle}>{props.children}</Content>
      </Layout>
      <footer>
        Desarrollado por Lorem Ipsum,
        <em>última actualización Mayo de 2023</em>
      </footer>
    </ConfigProvider>
  );
}

export default PublicDecorator;
