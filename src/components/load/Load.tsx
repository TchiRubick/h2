import type { FC } from 'react';
import { Spin, Alert } from 'antd';

export const Load: FC = () => {
  return (
    <>
      <Spin tip='Loading...' />
    </>
  );
};