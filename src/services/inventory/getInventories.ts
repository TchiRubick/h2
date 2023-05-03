import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const getInventories = async () =>{
    const Invent = await prisma.inventory.findMany();
        return Invent;
}

export default getInventories;

