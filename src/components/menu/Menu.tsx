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
  LogoutOutlined,
} from "@ant-design/icons";
import { Menu as MenuAntd, type MenuProps } from "antd";
import { useRouter } from "next/router";
import type { FC } from "react";
import { useLogoutFunction } from "@propelauth/react";

const items: MenuProps["items"] = [
  {
    label: "Dashboard",
    key: "/dashboard",
    icon: <AppstoreOutlined />,
  },
  {
    label: "Stocks",
    key: "stocks",
    icon: <InboxOutlined />,
    children: [
      {
        type: 'group',
        label: 'Stock 1',
        children: [
          {
            label: 'List 1',
            key: 'setting:1',
            children: [
              {
                label: 'Stocks',
                key: "/stocks",
              },
            ],
          },
          {
            label: 'List 2',
            key: 'setting:2',
            children: [
              {
                label: 'Stocks',
                key: "/stocks",
              },
            ],
          },
        ],
      },
      {
        type: 'group',
        label: 'Stock 2',
        children: [
          {
            label: 'List 3',
            key: 'setting:3',
            children: [
              {
                label: 'Stocks',
                key: "/stocks",
              },
            ],
          },
          {
            label: 'List 4',
            key: "/stocks",
          },
        ],
      },
    ],
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
  {
    label: "Logout",
    key: "/logout",
    icon: <LogoutOutlined />,
  },
];

const Menu: FC = () => {
  const router = useRouter();

  const logoutFn: (redirectOnLogout: boolean) => Promise<void> =
    useLogoutFunction();

  const onClick: MenuProps["onClick"] = async (e) => {
    if (e.key === "/logout") {
      logoutFn(true)
        .then((value: void) => value)
        .catch((err) => console.error(err));
      return;
    }

    await router.push(e.key);
  };

  return (
    <MenuAntd
      onClick={onClick}
      selectedKeys={[router.pathname]}
      items={items}
      className="rounded-lg"
    >
      <MenuAntd.Item key='test'>Test</MenuAntd.Item>
      <MenuAntd.Item key='testw'>Testw</MenuAntd.Item>
    </MenuAntd>
  );
};

export default Menu;
