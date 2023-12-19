import { createTRPCRouter } from '~/server/api/trpc';
import { inventoryRouter } from '~/server/api/routers/inventory';
import { salesRouter } from '~/server/api/routers/sales';
import { ticketsRouter } from '~/server/api/routers/tickets';
import { transactionsRouter } from '~/server/api/routers/transactions';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  inventory: inventoryRouter,
  sales: salesRouter,
  tickets: ticketsRouter,
  transactions: transactionsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
