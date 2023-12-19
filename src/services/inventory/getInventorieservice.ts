import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getInventorieservice = async (barcode: string) =>
  prisma.inventory.findFirst({
    where: { barcode },
  });
