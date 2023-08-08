import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getInventorie = async (barcode: string) =>
  prisma.inventory.findFirst({
    where: { barcode },
  });
