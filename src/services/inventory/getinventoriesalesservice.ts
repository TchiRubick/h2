import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getinventoriesalesservice = async (searchText: string) =>
  prisma.inventory.findMany({
    take: 5,
    where: {
      name: {
        startsWith: searchText,
      },
    },
  });
