import {
  CreditCardOutlined,
  InboxOutlined,
  UsergroupDeleteOutlined,
  HistoryOutlined,
  FundProjectionScreenOutlined,
  UserOutlined,
  PercentageOutlined,
  BankOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { Menu as MenuAntd, type MenuProps } from "antd";
import { useRouter } from "next/router";
import type { FC } from "react";

const items: MenuProps["items"] = [
  {
    label: "Dashboard",
    key: "/dashboard",
    icon: <AppstoreOutlined />,
  },
  {
    label: "Stocks",
    key: "/stocks",
    icon: <InboxOutlined />,
  },
  {
    label: "Sales",
    key: "/sales",
    icon: <CreditCardOutlined />,
  },
  {
    label: "Employee",
    key: "/employee",
    icon: <UsergroupDeleteOutlined />,
  },
  {
    label: "History",
    key: "/history",
    icon: <HistoryOutlined />,
  },
  {
    label: "Client",
    key: "/client",
    icon: <UserOutlined />,
  },
  {
    label: "Discount",
    key: "/discount",
    icon: <PercentageOutlined />,
  },
  {
    label: "Finance",
    key: "/finance",
    icon: <BankOutlined />,
  },
  {
    label: "Performance",
    key: "/performance",
    icon: <FundProjectionScreenOutlined />,
  },
];

const Menu: FC = () => {
  const router = useRouter();

  const onClick: MenuProps["onClick"] = async (e) => {
    await router.push(e.key);
  };

  return (
    <MenuAntd
      onClick={onClick}
      selectedKeys={[router.pathname]}
      mode="horizontal"
      items={items}
    />
  );
};

export default Menu;
