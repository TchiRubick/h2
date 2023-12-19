import type { FC } from 'react';
import { Spin } from 'antd';

export const Load: FC = () => {
  return (
    <>
      <Spin tip='Loading...' />
    </>
  );
};
