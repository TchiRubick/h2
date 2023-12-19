import {
  getInventoriesservice,
  setInventoriesservice,
  getInventorieservice,
  updateInventoryByBarcodeservice,
  getinventoriesalesservice,
  updateinventoryByActionservice,
} from '~/services/inventory';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { Prisma } from '@prisma/client';
import z from 'zod';

const setValidatorSchemas = {
  user: z.string(),
  barcode: z.string(),
  name: z.string(),
  quantity: z.number().transform((value) => new Prisma.Decimal(value)),
  price: z.number().transform((value) => new Prisma.Decimal(value)),
  cost: z.number().transform((value) => new Prisma.Decimal(value)),
  type: z.union([
    z.literal('FULL_UNIT'),
    z.literal('PARTIAL_UNIT'),
    z.literal('PACKS'),
    z.literal('CONSUMABLE'),
  ]),
  packunit: z.number().transform((value) => new Prisma.Decimal(value)),
  unitperpack: z.number().transform((value) => new Prisma.Decimal(value)),
};

export const inventoryRouter = createTRPCRouter({
  getall: publicProcedure.query(() => getInventoriesservice()),
  set: publicProcedure
    .input(z.object(setValidatorSchemas))
    .mutation(({ input }) => setInventoriesservice(input)),
  getByBarcode: publicProcedure
    .input(z.object({ barcode: z.string() }))
    .query(({ input }) => getInventorieservice(input.barcode)),
  updateInventoryByBarcode: publicProcedure
    .input(
      z.object({
        user: z.string(),
        barcode: z.string(),
        name: z.string().optional(),
        quantity: z.number().optional(),
        price: z.number().optional(),
        cost: z.number().optional(),
        type: z
          .union([
            z.literal('FULL_UNIT'),
            z.literal('PARTIAL_UNIT'),
            z.literal('PACKS'),
            z.literal('CONSUMABLE'),
          ])
          .optional(),
        packunit: z.number().optional(),
        unitperpack: z.number().optional(),
      })
    )
    .mutation(({ input }) => updateInventoryByBarcodeservice(input)),
  getallsales: publicProcedure
    .input(z.object({ searchText: z.string() }))
    .query(({ input }) => getinventoriesalesservice(input.searchText)),
  updateinventoryByAction: publicProcedure
    .input(
      z.object({ user: z.string(), barcode: z.string(), action: z.string(), quantity: z.number() })
    )
    .mutation(({ input }) =>
      updateinventoryByActionservice(input.user, input.barcode, input.action, input.quantity)
    ),
});
