import { PrismaClient, TypesProduct } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { createTransactionservice } from '~/services/transaction';
import { getInventorieservice } from '~/services/inventory';

const prisma = new PrismaClient();

export const updateInventoryByBarcodeservice = async (input: {
  name?: string;
  user: string;
  barcode: string;
  cost?: number;
  price?: number;
  quantity?: number;
  type?: TypesProduct;
  packunit?: number;
  unitperpack?: number;
}) => {
  try {
    const { name, barcode, cost, price, quantity, type, user, packunit, unitperpack } = input;
    let updatedQuantity = type === 'CONSUMABLE' ? 0 : { increment: quantity };

    const quantityafter = await getInventorieservice(barcode).then((value) =>
      (value?.quantity as Decimal).add(new Decimal(quantity as number))
    );
    createTransactionservice(
      user,
      'update',
      await getInventorieservice(barcode).then((value) => value?.name as string),
      name as string,
      await getInventorieservice(barcode).then((value) => value?.cost as Decimal),
      new Decimal(cost as number),
      await getInventorieservice(barcode).then((value) => value?.price as Decimal),
      new Decimal(price as number),
      await getInventorieservice(barcode).then((value) => value?.quantity as Decimal),
      quantityafter,
      await getInventorieservice(barcode).then((value) => value?.type as TypesProduct),
      type as TypesProduct,
      await getInventorieservice(barcode).then((value) => value?.packunit as Decimal),
      new Decimal(packunit as number),
      await getInventorieservice(barcode).then((value) => value?.unitperpack as Decimal),
      new Decimal(unitperpack as number),
      await getInventorieservice(barcode).then((value) => value?.id as number)
    );
    await prisma.inventory.update({
      where: { barcode },
      data: { name, cost, price, quantity: updatedQuantity, type, user, packunit, unitperpack },
    });
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
