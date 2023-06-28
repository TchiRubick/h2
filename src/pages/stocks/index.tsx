import React from 'react';
import type { NextPage } from 'next';
import { StockList } from '~/components';
import { api } from '~/utils/api';
const Stocks: NextPage = () => {
  const { data } = api.inventory.getall.useQuery();

  return (
    <div className='m-auto mt-10 w-full sm:w-3/4'>
      <StockList data={data || []} />
    </div>
  );
};

export default Stocks;
