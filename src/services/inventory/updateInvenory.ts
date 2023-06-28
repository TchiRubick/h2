import { PrismaClient, TypesProduct } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';

const prisma = new PrismaClient();

export const updateInventory = async (input: {
  name: string;
  barcode: string;
  cost: Decimal;
  price: Decimal;
  quantity: Decimal;
  type: TypesProduct;
}) => {
  const { barcode } = input;
  const Inventor = await prisma.inventory.update({
    where: { barcode },
    data: input,
  });

  return Inventor;
};
