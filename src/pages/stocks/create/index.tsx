import React, { type FC, useState } from 'react';
import { api } from '~/utils/api';
import type { NextPage } from 'next';
import { StockForm } from '~/components';

const Stocks: NextPage = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [succesMessage, setsuccesMessage] = useState('');

  const { mutateAsync } = api.inventory.set.useMutation();

  const onSubmit = async (values: {
    barcode: string;
    name: string;
    cost: number;
    price: number;
    quantity: number;
    type: 'FULL_UNIT' | 'PARTIAL_UNIT' | 'PACKS' | 'CONSUMABLE';
  }) => {
    try {
      await mutateAsync(values);
      setsuccesMessage('Succes');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Error, barcode is unique');
      setsuccesMessage('');
    }
  };

  return (
    <div className='m-auto w-full sm:w-3/4'>
      <h1 className='text-red-500'>{errorMessage}</h1>
      <h1 className='text-blue-800'>{succesMessage}</h1>
      <StockForm title='Create an inventory' onSubmit={onSubmit} isEditing={false} />
    </div>
  );
};

export default Stocks;
