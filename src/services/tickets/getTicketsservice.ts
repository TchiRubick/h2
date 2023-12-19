import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getTicketsservice = async (searchTicket: string) => {
  const searchDate = new Date(searchTicket);

  searchDate.setHours(0, 0, 0, 0);

  const startOfDay = searchDate.toISOString();

  searchDate.setDate(searchDate.getDate() + 1);
  searchDate.setMilliseconds(-1);

  const endOfDay = searchDate.toISOString();

  return prisma.ticket.findMany({
    where: {
      createdAt: {
        gte: startOfDay,
        lt: endOfDay,
      },
    },
  });
};
