import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getSalesservice = async (searchSales: string) => {
  const searchDate = new Date(searchSales);

  searchDate.setHours(0, 0, 0, 0);

  const startOfDay = searchDate.toISOString();
  searchDate.setDate(searchDate.getDate() + 1);
  searchDate.setMilliseconds(-1);

  const endOfDay = searchDate.toISOString();

  return prisma.sales.findMany({
    where: {
      createdAt: {
        gte: startOfDay,
        lt: endOfDay,
      },
    },
  });
};
