import { getSalesservice, getSaleservice } from '~/services/sales';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import z from 'zod';

export const salesRouter = createTRPCRouter({
  getsales: publicProcedure
    .input(z.object({ searchSales: z.string() }))
    .query(({ input }) => getSalesservice(input.searchSales)),
  getSale: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input }) => getSaleservice(input.id)),
});
