import { ConfigProvider, Layout as LayoutAntd } from "antd";
import { antdConfig } from "./antdConfig";
import { Menu } from "~/components";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { Content } = LayoutAntd;

  return (
    <ConfigProvider theme={antdConfig}>
      <LayoutAntd>
        <Menu />
        <Content className="container m-auto mt-5">{children}</Content>
      </LayoutAntd>
    </ConfigProvider>
  );
};

export default Layout;
