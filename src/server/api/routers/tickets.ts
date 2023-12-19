import { setTicketsservice, getTicketsservice, getTicketservice } from '~/services/tickets';
import { updateinventoriesbysaleservice } from '~/services/inventory';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { Prisma } from '@prisma/client';
import z from 'zod';

const setValidatorSchemas = {
  user: z.string(),
  moneypaidclient: z.number().transform((value) => new Prisma.Decimal(value)),
  change: z.number().transform((value) => new Prisma.Decimal(value)),
  totalpurchaseprice: z.number().transform((value) => new Prisma.Decimal(value)),
  basket: z.record(
    z.object({
      user: z.string(),
      id: z.number(),
      quantity: z.number().transform((value) => new Prisma.Decimal(value)),
      price: z.number().transform((value) => new Prisma.Decimal(value)),
      barcode: z.string(),
    })
  ),
};

export const ticketsRouter = createTRPCRouter({
  setTickets: publicProcedure.input(z.object(setValidatorSchemas)).mutation(({ input }) => {
    setTicketsservice(
      input.user,
      input.change,
      input.moneypaidclient,
      input.totalpurchaseprice,
      input.basket
    );
    updateinventoriesbysaleservice(input.basket, input.user);
  }),
  getTickets: publicProcedure
    .input(z.object({ searchTicket: z.string() }))
    .query(({ input }) => getTicketsservice(input.searchTicket)),
  getTicket: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input }) => getTicketservice(input.id)),
});
