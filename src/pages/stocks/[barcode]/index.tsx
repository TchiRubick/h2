import React, { type FC, useState } from 'react';
import type { NextPage } from 'next';
import { StockForm } from '~/components';
import { useRouter } from 'next/router';
import { api } from '~/utils/api';
import { fixturesStocks } from '~/fixtures/fixturesStocks';
import { string } from 'zod';

const Stocks: NextPage = () => {
  /*const onSubmits = (values: { [key: string]: unknown }) => {
    console.log(values);
  };*/
  const [errorMessage, setErrorMessage] = useState('');
  const [succesMessage, setsuccesMessage] = useState('');
  const router = useRouter();
  const postsBarcode = router.query.barcode as string;
  {
    /*const data = fixturesStocks.filter((f) => f.barcode === postsBarcode)[0];*/
  }
  const { data } = api.inventory.getByBarcode.useQuery({ barcode: postsBarcode });

  const { mutateAsync } = api.inventory.updateInventory.useMutation();

  const onSubmit = async (values: {
    barcode: string;
    name: string;
    cost: number;
    price: number;
    quantity: number;
    type: 'FULL_UNIT' | 'PARTIAL_UNIT' | 'PACKS' | 'CONSUMABLE';
  }) => {
    try {
      const updatedQuantity = values.quantity + Number(data?.quantity || 0);
      await mutateAsync({ ...values, quantity: updatedQuantity });
      setsuccesMessage('update Succes');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Error, barcode is unique');
      setsuccesMessage('');
    }
  };

  return (
    <div className='m-auto w-full sm:w-3/4'>
      <h1 className='bg-red-600'>{errorMessage}</h1>
      <h1 className='bg-blue-600'>{succesMessage}</h1>
      <StockForm data={data} title='Modify an inventory' onSubmit={onSubmit} isEditing={true} />
    </div>
  );
};

export default Stocks;
