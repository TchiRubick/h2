import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getTicketservice = async (id: number) =>
  prisma.sales.findFirst({
    where: { id },
    include: {
      inventory: true,
    },
  });
