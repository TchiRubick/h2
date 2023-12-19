import { type Inventory, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type OmitedProperty = 'id' | 'createdAt' | 'updatedAt';

export const setInventoriesservice = async (data: Omit<Inventory, OmitedProperty>) =>
  prisma.inventory.create({ data });
