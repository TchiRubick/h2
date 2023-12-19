import type { NextPage } from 'next';
import { CardSales, CardBasket } from '~/components';
import { useState } from 'react';
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
  };
};

const Sales: NextPage = () => {
  const [basket, setbasket] = useState<Basket>();
  const { user } = useAuthInfo();
  const email = user?.email as string;

  const handleIncrementDecrementRemove = (
    inventoryBarcode: string,
    operation: 'increment' | 'decrement' | 'remove' | 'shoppingcart' | 'reset',
    inventoryType?: string,
    inventoryName?: string,
    inventoryQuantity?: number,
    inventoryPrice?: number,
    id?: number
  ) => {
    if (operation === 'shoppingcart') {
      if (inventoryType !== 'CONSUMABLE' && inventoryQuantity === 0) return null;
      setbasket(() => {
        const baseValuebasket: Basket = {
          ...basket,
          [inventoryBarcode]: {
            user: email,
            name: inventoryName as string,
            barcode: inventoryBarcode as string,
            quantityinventory: inventoryQuantity as number,
            priceunit: inventoryPrice as number,
            id: id as number,
            quantity: 1,
            price: inventoryPrice as number,
          },
        };

        return baseValuebasket;
      });
    }

    if (operation === 'increment') {
      if (basket?.[inventoryBarcode]?.quantity === basket?.[inventoryBarcode]?.quantityinventory)
        return null;
      setbasket((prev) => {
        const baseValuebasket: Basket = {
          ...basket,
          [inventoryBarcode]: {
            user: email,
            ...prev?.[inventoryBarcode],
            quantity: (prev?.[inventoryBarcode]?.quantity ?? 0) + 1,
            price:
              ((prev?.[inventoryBarcode]?.quantity ?? 0) + 1) *
              (prev?.[inventoryBarcode]?.priceunit ?? 0),
          },
        } as Basket;
        return baseValuebasket;
      });
    }

    if (operation === 'decrement') {
      if (!basket?.[inventoryBarcode]) return null;
      if (basket[inventoryBarcode]?.quantity === 1) return null;
      setbasket((prev) => {
        const baseValuebasket: Basket = {
          ...basket,
          [inventoryBarcode]: {
            user: email,
            ...prev?.[inventoryBarcode],
            quantity: (prev?.[inventoryBarcode]?.quantity ?? 0) - 1,
            price:
              ((prev?.[inventoryBarcode]?.quantity ?? 0) - 1) *
              (prev?.[inventoryBarcode]?.priceunit ?? 0),
          },
        } as Basket;
        return baseValuebasket;
      });
    }

    if (operation === 'remove') {
      const newData = Object.assign({}, basket);
      delete newData[inventoryBarcode];
      return setbasket(newData);
    }

    if (operation === 'reset') {
      return setbasket({});
    }
  };

  return (
    <div className='flex'>
      <CardSales basket={basket} handleIncrementDecrementRemove={handleIncrementDecrementRemove} />
      <CardBasket basket={basket} handleIncrementDecrementRemove={handleIncrementDecrementRemove} />
    </div>
  );
};

export default Sales;
