import { ConfigProvider, Layout as LayoutAntd, notification } from 'antd';
import { antdConfig } from './antdConfig';
import { Menu } from '~/components';
import { ModificationProvider } from '../appContext/AppContext';

const { Content, Sider } = LayoutAntd;

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ModificationProvider>
      <ConfigProvider theme={antdConfig}>
        <LayoutAntd>
          <Sider className='bg-transparent' style={{ background: 'transparent' }}>
            <Menu />
          </Sider>
          <Content className='container m-auto'>{children}</Content>
        </LayoutAntd>
      </ConfigProvider>
    </ModificationProvider>
  );
};
