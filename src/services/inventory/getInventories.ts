import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getInventories = async () => prisma.inventory.findMany();
