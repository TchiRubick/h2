import { ConfigProvider, theme, Layout as LayoutAntd } from "antd";
import { Menu } from "~/components";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {   Content } = LayoutAntd;

  return (
    <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#fdb485",
            borderRadius: 5,
            wireframe: false,
            fontSize: 13,
            sizeStep: 3,
            sizeUnit: 3,
            colorBgContainer: "#162556",
            colorBgElevated: "#3C549366",
            colorBgLayout: "#162556",
            colorBorder: "#fff",
            colorBorderSecondary: "#fff",
            colorPrimaryBg: "#6C688E",
            colorPrimaryBgHover: "#6C688E",
          },
          algorithm: theme.darkAlgorithm
        }}
      >
        <LayoutAntd>
          <Menu />
          <Content className="container m-auto mt-5">
            {children}
          </Content>
        </LayoutAntd>
      </ConfigProvider>
  )
}

export default Layout