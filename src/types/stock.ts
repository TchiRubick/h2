export type tDataStocks = {
  id: number;
  barcode: string;
  name: string;
  cost: number;
  price: number;
  quantity: number;
  type: 'FULL_UNIT' | 'CONSUMABLE' | 'PARTIAL_UNIT' | 'PACKS';
};
export type TMappingStockType = {
  [type in 'FULL_UNIT' | 'CONSUMABLE' | 'PARTIAL_UNIT' | 'PACKS']: {
    text: string;
    color: string;
  };

};
export const mappingStockType: TMappingStockType = {
  FULL_UNIT: {
    text: 'Full Unit',
    color: 'text-green-400'
  },
  CONSUMABLE: {
    text: 'Consumable',
    color: 'text-blue-400'
  },
  PARTIAL_UNIT: {
    text: 'Partial Unit',
    color: 'text-white'
  },
  PACKS: {
    text: 'Packs',
    color: 'text-red-500'
  },
};
