import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getSaleservice = async (id: number) =>
  prisma.sales.findMany({
    where: { ticketId: id },
    include: {
      ticket: true,
      inventory: true,
    },
  });
