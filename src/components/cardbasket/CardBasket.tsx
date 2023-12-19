import React, { useState, type FC, useEffect } from 'react';
import { Card, Button, InputNumber } from 'antd';
import { ButtonPlusMinusClose, useNotif } from '~/components';
import { api } from '~/utils/api';
import { useAuthInfo } from '@propelauth/react';

type Basket = {
  [barcode: string]: {
    user: string;
    name: string;
    barcode: string;
    quantityinventory: number;
    priceunit: number;
    id: number;
    quantity: number;
    price: number;
    type?: string;
  };
};

type PropsType = {
  basket: Basket | undefined;
  handleIncrementDecrementRemove: (
    inventoryBarcode: string,
    operation: 'increment' | 'decrement' | 'remove' | 'reset',
    inventoryType?: string,
    inventoryName?: string,
    inventoryQuantity?: number,
    inventoryPrice?: number,
    id?: number
  ) => void;
};

export const CardBasket: FC<PropsType> = ({ basket, handleIncrementDecrementRemove }) => {
  const { mutateAsync: setTicketsMutation } = api.tickets.setTickets.useMutation();
  const [moneypaidclient, setmoneypaidclient] = useState(0);
  const [totalpurchaseprice, settotalpurchaseprice] = useState(0);
  const [change, setchange] = useState(0);
  const { opennotification } = useNotif();
  const { user } = useAuthInfo();
  const email = user?.email as string;
  const handlemoneypaidclient = (value: number | null) => {
    setmoneypaidclient(value as number);
  };

  const disablePlus = (barcode: string, quantityinventory: number) =>
    basket?.[barcode]?.quantity === quantityinventory;
  const disableMinus = (barcode: string) => basket?.[barcode]?.quantity === 1;
  const onReset = () => {
    Object.keys(basket as Basket).map((key) => {
      const { barcode } = basket?.[key] || {};
      handleIncrementDecrementRemove(barcode as string, 'reset');
    });
  };

  const submitSalesTickets = async () => {
    try {
      await setTicketsMutation({
        user: email,
        moneypaidclient,
        change,
        totalpurchaseprice,
        basket: basket as Basket,
      });
      opennotification('success', 'Sale success', 'the sale is succes');
      setTimeout(() => {
        onReset();
      }, 1000);
    } catch {
      opennotification('error', 'Sale  failed', 'the sale is failed');
    }
  };
  const disablePay = () => {
    if (!totalpurchaseprice) return true;
    if (moneypaidclient === 0 && totalpurchaseprice === 0) return true;
    if (moneypaidclient === totalpurchaseprice) return false;
    if (change === 0) return true;
  };

  const mouseMoneyPaideClient = () => {
    setmoneypaidclient(0);
  };

  useEffect(() => {
    const newchange = moneypaidclient - totalpurchaseprice;
    if ((newchange as number) <= 0 || !totalpurchaseprice) return setchange(0);
    setchange(newchange);
  }, [moneypaidclient, totalpurchaseprice]);

  useEffect(() => {
    const total =
      basket &&
      Object.keys(basket as Basket).reduce((oldvalue, key) => {
        return oldvalue + (basket?.[key]?.price || 0);
      }, 0);

    settotalpurchaseprice(total as number);
  }, [basket]);

  return (
    <div className='ml-2  w-1/3'>
      <Card>
        {basket &&
          Object.keys(basket as Basket).map((key) => (
            <div className='grid  grid-cols-3 ' key={basket?.[key]?.barcode}>
              <div className=''>
                <li>
                  {basket?.[key]?.name}-{basket?.[key]?.barcode}- {basket?.[key]?.quantity}{' '}
                </li>
              </div>
              <div className='ml-2  '>
                <ButtonPlusMinusClose
                  disablebuttonplus={disablePlus(
                    basket?.[key]?.barcode as string,
                    basket?.[key]?.quantityinventory as number
                  )}
                  disablebuttonminus={disableMinus(basket?.[key]?.barcode as string)}
                  inventoryBarcode={basket?.[key]?.barcode as string}
                  handleIncrementDecrementRemove={handleIncrementDecrementRemove}
                />
              </div>
              <div>item price: {basket?.[key]?.price as number}</div>
            </div>
          ))}
        <div>Price Total: {totalpurchaseprice}</div>
        <div>
          money paid by client:{' '}
          <InputNumber
            value={moneypaidclient}
            onChange={handlemoneypaidclient}
            min={0}
            disabled={!totalpurchaseprice}
            onMouseUp={mouseMoneyPaideClient}
          />
        </div>
        <div>change: {change} </div>
        <Button disabled={disablePay()} onClick={submitSalesTickets}>
          Pay
        </Button>
      </Card>
    </div>
  );
};
