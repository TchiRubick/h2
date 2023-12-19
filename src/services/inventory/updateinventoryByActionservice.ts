import { PrismaClient, TypesProduct } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { createTransactionservice } from '~/services/transaction';
import { getInventorieservice } from '~/services/inventory';
import { SingletonRouter } from 'next/router';

const prisma = new PrismaClient();

export const updateinventoryByActionservice = async (
  user: string,
  barcode: string,
  action: string,
  quantity: number
) => {
  try {
    //getInventorieservice(barcode).then((value) => value?.name as string);
    const quantityafter = await getInventorieservice(barcode).then((value) =>
      (value?.quantity as Decimal).minus(new Decimal(quantity as number))
    );
    createTransactionservice(
      user,
      action,
      await getInventorieservice(barcode).then((value) => value?.name as string),
      await getInventorieservice(barcode).then((value) => value?.name as string),
      await getInventorieservice(barcode).then((value) => value?.cost as Decimal),
      await getInventorieservice(barcode).then((value) => value?.cost as Decimal),
      await getInventorieservice(barcode).then((value) => value?.price as Decimal),
      await getInventorieservice(barcode).then((value) => value?.price as Decimal),
      await getInventorieservice(barcode).then((value) => value?.quantity as Decimal),
      quantityafter,
      await getInventorieservice(barcode).then((value) => value?.type as TypesProduct),
      await getInventorieservice(barcode).then((value) => value?.type as TypesProduct),
      await getInventorieservice(barcode).then((value) => value?.packunit as Decimal),
      await getInventorieservice(barcode).then((value) => value?.packunit as Decimal),
      await getInventorieservice(barcode).then((value) => value?.unitperpack as Decimal),
      await getInventorieservice(barcode).then((value) => value?.unitperpack as Decimal),
      await getInventorieservice(barcode).then((value) => value?.id as number)
    );
    await prisma.inventory.update({
      where: { barcode },
      data: { quantity: { decrement: quantity } },
    });
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
