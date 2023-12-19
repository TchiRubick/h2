import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getInventoriesservice = async () => prisma.inventory.findMany();
