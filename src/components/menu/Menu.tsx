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
  DollarOutlined,
} from '@ant-design/icons';
import { Menu as MenuAntd, type MenuProps } from 'antd';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import { useLogoutFunction } from '@propelauth/react';

const items: MenuProps['items'] = [
  {
    label: 'Dashboard',
    key: '/dashboard',
    icon: <AppstoreOutlined />,
  },
  {
    label: 'Stocks',
    key: 'stocks',
    icon: <InboxOutlined />,
    children: [
      {
        label: 'List',
        key: '/stocks',
      },
      {
        label: 'Create',
        key: '/stocks/create',
      },
    ],
  },
  {
    label: 'Sales',
    key: '/sales',
    icon: <DollarOutlined />,
  },
  {
    label: 'Tickets',
    key: '/tickets',
    icon: <CreditCardOutlined />,
  },
  {
    label: 'Employee',
    key: '/employee',
    icon: <UsergroupDeleteOutlined />,
  },
  {
    label: 'History',
    key: '/history',
    icon: <HistoryOutlined />,
  },
  {
    label: 'Client',
    key: '/client',
    icon: <UserOutlined />,
  },
  {
    label: 'Discount',
    key: '/discount',
    icon: <PercentageOutlined />,
  },
  {
    label: 'Finance',
    key: '/finance',
    icon: <BankOutlined />,
  },
  {
    label: 'Performance',
    key: '/performance',
    icon: <FundProjectionScreenOutlined />,
  },
  {
    label: 'Logout',
    key: '/logout',
    icon: <LogoutOutlined />,
  },
];

export const Menu: FC = () => {
  const router = useRouter();

  const logoutFn: (redirectOnLogout: boolean) => Promise<void> = useLogoutFunction();

  const onClick: MenuProps['onClick'] = async (e) => {
    if (e.key === '/logout') {
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
      className='rounded-lg'
    />
  );
};
