import { PrismaClient } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';

const prisma = new PrismaClient();
type Basket = {
  [key: string]: {
    user: string;
    id: number;
    price: Decimal;
    quantity: Decimal;
  };
};

export const setTicketsservice = async (
  user: string,
  change: Decimal,
  moneypaidclient: Decimal,
  totalpurchaseprice: Decimal,
  basket: Basket
) => {
  console.log('basket:', basket);

  try {
    const ticket = await prisma.ticket.create({
      data: {
        user,
        change,
        moneypaidclient,
        totalpurchaseprice,
        sales: {
          create: Object.keys(basket).map((key) => ({
            user: basket[key]?.user as string,
            inventoryId: basket[key]?.id as number,
            pricetotalitem: basket[key]?.price as Decimal,
            quantitybuyclient: basket[key]?.quantity as Decimal,
          })),
        },
      },
    });

    console.log('Created ticket:', ticket);
  } catch (error) {
    console.error('Error creating ticket:', error);
  }
};
