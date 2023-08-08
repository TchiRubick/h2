import { PrismaClient, TypesProduct } from '@prisma/client';
import { Decimal as PrismaDecimal } from '@prisma/client/runtime';

const prisma = new PrismaClient();

export const updateInventoryByBarcode = async (input: {
  name?: string;
  barcode: string;
  cost?: number;
  price?: number;
  quantity?: number;
  type?: TypesProduct;
}) => {
  const { barcode, quantity, cost, price, ...rest } = input;
  const currentInventory = await prisma.inventory.findUnique({
    where: { barcode },
  });

  if (!currentInventory) {
    throw new Error(`L'inventaire avec le code-barres ${barcode} n'existe pas.`);
  }

  const currentQuantity = new PrismaDecimal(currentInventory.quantity);
  const currentCost = cost !== undefined ? new PrismaDecimal(cost) : undefined;
  const currentPrice = price !== undefined ? new PrismaDecimal(price) : undefined;

  let updatedQuantity: PrismaDecimal | undefined;
  let updatedCost: PrismaDecimal | undefined;
  let updatedPrice: PrismaDecimal | undefined;

  if (quantity !== undefined && quantity !== 0) {
    updatedQuantity = currentQuantity.add(new PrismaDecimal(quantity));
  } else {
    updatedQuantity = currentQuantity;
  }

  if (currentCost !== undefined) {
    updatedCost = currentCost;
  }

  if (currentPrice !== undefined) {
    updatedPrice = currentPrice;
  }

  const updatedInventory = await prisma.inventory.update({
    where: { barcode },
    data: { quantity: updatedQuantity, cost: updatedCost, price: updatedPrice, ...rest },
  });

  return updatedInventory;
};
