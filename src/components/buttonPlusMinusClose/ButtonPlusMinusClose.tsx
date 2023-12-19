import React, { type FC } from 'react';
import { CloseSquareOutlined, MinusSquareOutlined, PlusSquareOutlined } from '@ant-design/icons';

type PropsType = {
  disablebuttonplus: boolean;
  disablebuttonminus: boolean;
  inventoryBarcode: string;
  handleIncrementDecrementRemove: (
    inventoryBarcode: string,
    operation: 'increment' | 'decrement' | 'remove',
    inventoryType?: string,
    inventoryName?: string,
    inventoryQuantity?: number,
    inventoryPrice?: number,
    id?: number
  ) => void;
};

export const ButtonPlusMinusClose: FC<PropsType> = ({
  disablebuttonplus,
  disablebuttonminus,
  handleIncrementDecrementRemove,
  inventoryBarcode,
}) => {
  return (
    <>
      <PlusSquareOutlined
        key={'a'}
        onClick={() => handleIncrementDecrementRemove(inventoryBarcode, 'increment')}
        style={{
          fontSize: '22px',
          color: disablebuttonplus ? '#ccc' : '#8ce767',
          cursor: disablebuttonplus ? 'not-allowed' : 'pointer',
        }}
      />
      <MinusSquareOutlined
        key={'b'}
        onClick={() => handleIncrementDecrementRemove(inventoryBarcode, 'decrement')}
        style={{
          fontSize: '22px',
          color: disablebuttonminus ? '#ccc' : '#faad14',
          cursor: disablebuttonminus ? 'not-allowed' : 'pointer',
        }}
        className=' ml-1'
      />
      <CloseSquareOutlined
        onClick={() => handleIncrementDecrementRemove(inventoryBarcode, 'remove')}
        className='ml-1'
        style={{ fontSize: '22px', color: '#ff4d4f' }}
      />
    </>
  );
};
