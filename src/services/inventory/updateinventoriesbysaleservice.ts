import { PrismaClient, TypesProduct } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { createTransactionservice } from '~/services/transaction';
import { getInventorieservice } from '~/services/inventory';

const prisma = new PrismaClient();
type Basket = {
  [key: string]: {
    barcode: string;
    quantity: Decimal;
  };
};

export const updateinventoriesbysaleservice = async (basket: Basket, user: string) => {
  console.log('basket', basket);
  Object.keys(basket).map(async (key: string) => {
    const quantitybefore = await getInventorieservice(basket[key]?.barcode as string).then(
      (value) => value?.quantity as Decimal
    );
    const quantityafter = await getInventorieservice(basket[key]?.barcode as string).then((value) =>
      (value?.quantity as Decimal).minus(basket[key]?.quantity as Decimal)
    );

    createTransactionservice(
      user,
      'sales',
      await getInventorieservice(basket[key]?.barcode as string).then(
        (value) => value?.name as string
      ),
      await getInventorieservice(basket[key]?.barcode as string).then(
        (value) => value?.name as string
      ),
      await getInventorieservice(basket[key]?.barcode as string).then(
        (value) => value?.cost as Decimal
      ),
      await getInventorieservice(basket[key]?.barcode as string).then(
        (value) => value?.cost as Decimal
      ),
      await getInventorieservice(basket[key]?.barcode as string).then(
        (value) => value?.price as Decimal
      ),
      await getInventorieservice(basket[key]?.barcode as string).then(
        (value) => value?.price as Decimal
      ),
      quantitybefore,
      quantityafter,
      await getInventorieservice(basket[key]?.barcode as string).then(
        (value) => value?.type as TypesProduct
      ),
      await getInventorieservice(basket[key]?.barcode as string).then(
        (value) => value?.type as TypesProduct
      ),
      await getInventorieservice(basket[key]?.barcode as string).then(
        (value) => value?.id as number
      )
    );
  });
  await Promise.all(
    Object.keys(basket).map((key: string) =>
      prisma.inventory.update({
        data: {
          quantity: {
            decrement: basket[key]?.quantity,
          },
        },
        where: { barcode: basket[key]?.barcode },
      })
    )
  );
};
