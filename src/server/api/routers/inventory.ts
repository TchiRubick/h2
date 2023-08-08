import {
  getInventories,
  setInventories,
  getInventorie,
  updateInventoryByBarcode,
} from '~/services/inventory';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { Prisma } from '@prisma/client';
import z from 'zod';

const setValidatorSchemas = {
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
};

export const inventoryRouter = createTRPCRouter({
  getall: publicProcedure.query(() => getInventories()),
  set: publicProcedure
    .input(z.object(setValidatorSchemas))
    .mutation(({ input }) => setInventories(input)),
  getByBarcode: publicProcedure
    .input(z.object({ barcode: z.string() }))
    .query(({ input }) => getInventorie(input.barcode)),
  updateInventoryByBarcode: publicProcedure
    .input(
      z.object({
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
      })
    )
    .mutation(({ input }) => updateInventoryByBarcode(input)),
});
