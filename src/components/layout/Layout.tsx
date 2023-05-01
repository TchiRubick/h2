import { ConfigProvider, Layout as LayoutAntd } from "antd";
import { antdConfig } from "./antdConfig";
import { Menu } from "~/components";

const { Content, Sider } = LayoutAntd;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  return (
    <ConfigProvider theme={antdConfig}>
      <LayoutAntd>
        <Sider className="bg-transparent" style={{ background: 'transparent' }}>
          <Menu />
        </Sider>
        <Content className="container m-auto">{children}</Content>
      </LayoutAntd>
    </ConfigProvider>
  );
};

export default Layout;
