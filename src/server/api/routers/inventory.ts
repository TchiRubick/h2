import { TypesProduct } from "@prisma/client";
import { z } from "zod";
import getInventories from "~/services/inventory/getInventories";
import { createTRPCRouter,publicProcedure } from "../trpc";

export const inventoryRouter = createTRPCRouter (
    {
        getList: publicProcedure
            .query(() => getInventories()),
    }
)