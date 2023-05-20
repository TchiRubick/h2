import { type Inventory, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type OmitedProperty = 'id' | 'createdAt' | 'updatedAt';

export const setInventories = async (data: Omit<Inventory, OmitedProperty>) =>
  prisma.inventory.create({ data });
