import { TypesProduct } from "@prisma/client";
import { z } from "zod";
import getInventories from "~/services/inventory/getInventories";
import { createTRPCRouter,publicProcedure } from "../trpc";

export const inventoryRouter = createTRPCRouter (
    {
        getList: publicProcedure
        .input(z.object({ barcode: z.string(), name: z.string(), cost: z.number().optional(),
              price: z.number().optional(), quantity: z.number().optional(),
               type: z.nativeEnum(TypesProduct) }))
        .query(()=> getInventories),
    }
)