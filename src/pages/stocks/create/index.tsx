import React, { useState } from 'react';
import { api } from '~/utils/api';
import type { NextPage } from 'next';
import { StockForm, useNotif } from '~/components';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useRouter } from 'next/router';

const Stocks: NextPage = () => {
  const { opennotification } = useNotif();
  const router = useRouter();
  const [targetcheck, settargetcheck] = useState(false);
  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
    settargetcheck(e.target.checked);
  };

  const { mutateAsync, isLoading } = api.inventory.set.useMutation();

  const onSubmit = async (values: {
    user: string;
    barcode: string;
    name: string;
    cost: number;
    price: number;
    quantity: number;
    type: 'FULL_UNIT' | 'PARTIAL_UNIT' | 'PACKS' | 'CONSUMABLE';
    packunit: number;
    unitperpack: number;
  }) => {
    try {
      await mutateAsync(values);
      if (targetcheck === true)
        return opennotification('success', 'Creation success', 'the creation is succes');
      opennotification('success', 'Creation success', 'the creation is succes');
      setTimeout(() => {
        router.push('/stocks');
      }, 3000);
    } catch (error) {
      opennotification('error', 'Update  failed', 'the upload is failed');
    }
  };

  return (
    <div className='m-auto w-full sm:w-3/4'>
      <StockForm
        title='Create an inventory'
        onSubmit={onSubmit}
        isEditing={false}
        isLoading={isLoading}
        onChange={onChange}
        checkboxVerification={targetcheck}
      />
    </div>
  );
};

export default Stocks;
