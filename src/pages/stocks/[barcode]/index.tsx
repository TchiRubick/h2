import React, { type FC, useState } from 'react';
import type { NextPage } from 'next';
import { StockForm } from '~/components';
import { useRouter } from 'next/router';
import { api } from '~/utils/api';

const Stocks: NextPage = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [succesMessage, setsuccesMessage] = useState('');
  const router = useRouter();
  const barcodeFromQueryUrl = router.query.barcode as string;
  const { data, isLoading: isLoadingquery } = api.inventory.getByBarcode.useQuery({
    barcode: barcodeFromQueryUrl,
  });
  const utils = api.useContext();
  const { mutateAsync, isLoading: isLoadingMutaion } =
    api.inventory.updateInventoryByBarcode.useMutation();
  const onSubmit = async (values: {
    barcode: string;
    name: string;
    cost: number;
    price: number;
    quantity: number;
    type: 'FULL_UNIT' | 'PARTIAL_UNIT' | 'PACKS' | 'CONSUMABLE';
  }) => {
    try {
      await mutateAsync({ ...values });
      setsuccesMessage('update Succes');
      utils.inventory.getByBarcode.invalidate();
      router.push('/stocks');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Error');
      setsuccesMessage('');
    }
  };

  return (
    <div className='m-auto w-full sm:w-3/4'>
      <h1 className='bg-red-600'>{errorMessage}</h1>
      <h1 className='bg-blue-600'>{succesMessage}</h1>
      <StockForm
        data={data !== null ? data : undefined}
        title='Modify an inventory'
        onSubmit={onSubmit}
        isEditing={true}
        isLoading={isLoadingMutaion || isLoadingquery}
        onChange={undefined}
      />
    </div>
  );
};

export default Stocks;
