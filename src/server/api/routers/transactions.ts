import { getTransactionsservice } from '~/services/transaction/getTransactionsservice';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import z from 'zod';

export const transactionsRouter = createTRPCRouter({
  gettransactions: publicProcedure
    .input(z.object({ searchTransactions: z.string() }))
    .query(({ input }) => getTransactionsservice(input.searchTransactions)),
});
