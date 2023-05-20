import React from 'react';

import type { NextPage } from 'next';
import { StockForm } from '~/components';
import { useRouter } from 'next/router';
import { fixturesStocks } from '~/fixtures/fixturesStocks';

const Stocks: NextPage = () => {
  const onSubmit = (values: { [key: string]: unknown }) => {
    console.log(values);
  };

  const router = useRouter();
  const postsBarcode = router.query.barcode;
  const data = fixturesStocks.filter((f) => f.barcode === postsBarcode)[0];

  return (
    <div className='m-auto w-full sm:w-3/4'>
      <StockForm data={data} title='Modify an inventory' onSubmit={onSubmit} />
    </div>
  );
};

export default Stocks;
