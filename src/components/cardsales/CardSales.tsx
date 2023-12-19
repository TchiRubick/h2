import React, { useState, type FC, useEffect } from 'react';
import { Card, Space, Input } from 'antd';
import { ButtonPlusMinusClose, Load } from '~/components';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { api } from '~/utils/api';

let debounceTimeout: string | number | NodeJS.Timeout | undefined;

type Basket = {
  [barcode: string]: {
    name: string;
    barcode: string;
    quantityinventory: number;
    priceunit: number;
    id: number;
    quantity: number;
    price: number;
  };
};

type PropsType = {
  basket: Basket | undefined;
  handleIncrementDecrementRemove: (
    inventoryBarcode: string,
    operation: 'increment' | 'decrement' | 'remove' | 'shoppingcart',
    inventoryType?: string,
    inventoryName?: string,
    inventoryQuantity?: number,
    inventoryPrice?: number,
    id?: number
  ) => void;
};

export const CardSales: FC<PropsType> = ({ handleIncrementDecrementRemove, basket }) => {
  const [searchValue, setsearchValue] = useState('');
  const [enabledatapass, setenabledatapass] = useState(true);
  const { data, refetch, isLoading } = api.inventory.getallsales.useQuery(
    { searchText: searchValue },
    { enabled: enabledatapass }
  );
  const changeValuesearch = (e: any) => {
    setsearchValue(e.target.value);
  };
  const disablePlus = (barcode: string, quantityinventory: number) =>
    basket?.[barcode]?.quantity === quantityinventory;
  const disableMinus = (barcode: string) => basket?.[barcode]?.quantity === 1;
  const disableShoppingCart = (type: string, quantityinventory: number) => {
    if (type === 'CONSUMABLE') {
      return false;
    }
    if (Number(quantityinventory) === 0) {
      return true;
    }
  };

  useEffect(() => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      refetch();
    }, 500);
  }, [searchValue, refetch]);

  useEffect(() => {
    if (data !== null) return setenabledatapass(false);
  }, [data]);
  return (
    <div className='ml-8  w-2/3'>
      <Card>
        <div className='flex justify-end pb-3'>
          <Space>
            <Input placeholder='search' onChange={changeValuesearch} />
          </Space>
        </div>
        <div className='w-full'>
          <table className='w-full border-4 border-white'>
            <thead className='w-full  text-sm text-white '>
              <tr className='grid h-fit w-full grid-cols-4 gap-3 rounded-xl border border-solid border-white py-4 text-center '>
                <th>Barcode</th>
                <th>Name</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className='mb-auto mt-4 grid w-full gap-y-3'>
              {isLoading ? (
                <div className='m-auto p-28'>
                  <Load />
                </div>
              ) : (
                data?.map((inventory) => (
                  <tr
                    className='grid w-full grid-cols-4 gap-3 text-center text-white'
                    key={inventory.id}
                  >
                    <td>{inventory.barcode}</td>
                    <td>{inventory.name}</td>
                    <td>{String(inventory.price)}</td>
                    <td>
                      {!basket?.[inventory.barcode] ? (
                        <ShoppingCartOutlined
                          key={inventory.name}
                          style={{
                            fontSize: '22px',
                            color: disableShoppingCart(inventory.type, Number(inventory.quantity))
                              ? '#ccc'
                              : '#8ce767',
                            cursor: disableShoppingCart(inventory.type, Number(inventory.quantity))
                              ? 'not-allowed'
                              : 'pointer',
                          }}
                          onClick={() =>
                            handleIncrementDecrementRemove(
                              inventory.barcode,
                              'shoppingcart',
                              inventory.type,
                              inventory.name,
                              Number(inventory.quantity),
                              Number(inventory.price),
                              inventory.id
                            )
                          }
                        />
                      ) : (
                        <>
                          <ButtonPlusMinusClose
                            disablebuttonplus={disablePlus(
                              inventory.barcode,
                              Number(inventory.quantity)
                            )}
                            disablebuttonminus={disableMinus(inventory.barcode)}
                            inventoryBarcode={inventory.barcode}
                            handleIncrementDecrementRemove={handleIncrementDecrementRemove}
                          />
                        </>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
