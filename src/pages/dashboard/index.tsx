import type { NextPage } from 'next';
import { DollarOutlined } from '@ant-design/icons';

const Dashboard: NextPage = () => (
  <div className='ml-40 text-clip text-7xl font-bold capitalize text-white '>
    {' '}
    <DollarOutlined />
    PAYMENT <br /> MANAGEMENT
    <DollarOutlined />
  </div>
);

export default Dashboard;
