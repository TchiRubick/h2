import React from 'react';

import type { NextPage } from 'next';
import { StockForm } from '~/components';

const Stocks: NextPage = () => {
  const onSubmit = (values: { [key: string]: unknown }) => {
    console.log(values);
  };

  return (
    <div className='m-auto w-full sm:w-3/4'>
      <StockForm title='Create an inventory' onSubmit={onSubmit} />
    </div>
  );
};

export default Stocks;
