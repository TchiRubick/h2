import { PrismaClient, TypesProduct } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';

const prisma = new PrismaClient();

export const createTransactionservice = async (
  user: string,
  action: string,
  namebefore: string,
  nameafter: string,
  costbefore: Decimal,
  costafter: Decimal,
  pricebefore: Decimal,
  priceafter: Decimal,
  quantitybefore: Decimal,
  quantityafter: Decimal,
  typebefore: TypesProduct,
  typeafter: TypesProduct,
  packunitbefore: Decimal,
  packunitafter: Decimal,
  unitperpackbefore: Decimal,
  unitperpackafter: Decimal,
  inventoryId: number
) => {
  return prisma.transaction.create({
    data: {
      user,
      action,
      namebefore,
      nameafter,
      costbefore,
      costafter,
      pricebefore,
      priceafter,
      quantitybefore,
      quantityafter,
      typebefore,
      typeafter,
      packunitbefore,
      packunitafter,
      unitperpackbefore,
      unitperpackafter,
      inventoryId,
    },
  });
};
