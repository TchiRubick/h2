import React, { type FC, useState } from 'react';
import { api } from '~/utils/api';
import type { NextPage } from 'next';
import { StockForm } from '~/components';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useRouter } from 'next/router';
import { Form } from 'antd';

const Stocks: NextPage = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [succesMessage, setsuccesMessage] = useState('');
  const router = useRouter();
  const [targetcheck, settargetcheck] = useState(false);
  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
    settargetcheck(e.target.checked);
  };

  const { mutateAsync, isLoading } = api.inventory.set.useMutation();

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
      if (targetcheck === true) return setsuccesMessage('Succes');
      router.push('/stocks');
    } catch (error) {
      setErrorMessage('Error, barcode is unique');
      setsuccesMessage('');
    }
  };

  return (
    <div className='m-auto w-full sm:w-3/4'>
      <h1 className='text-red-500'>{errorMessage}</h1>
      <h1 className='text-blue-800'>{succesMessage}</h1>
      <StockForm
        title='Create an inventory'
        onSubmit={onSubmit}
        isEditing={false}
        isLoading={isLoading}
        onChange={onChange}
      />
    </div>
  );
};

export default Stocks;
