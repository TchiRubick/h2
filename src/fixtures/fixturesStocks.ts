import type { tDataStocks } from "~/types/stock"

export const fixturesStocks: tDataStocks[] = [
    {
        id: 1,
        barcode: 'V5T-7UIHYG',
        name: 'riz',
        cost: 10,
        price: 450,
        quantity: 12,
        type: "CONSUMABLE",
    },
    {
        id: 2,
        barcode: 'V5T-7UIHIOG',
        name: 'Bonbon',
        cost: 10,
        price: 450,
        quantity: 12,
        type: "FULL_UNIT",
    },
    {
        id: 3,
        barcode: 'V5T-7UIHYGHY',
        name: 'savon de toilette',
        cost: 10,
        price: 450,
        quantity: 12,
        type: "PACKS",
    }
    ,
    {
        id: 4,
        barcode: 'V5T-7UIHYGY',
        name: 'savon de toilette',
        cost: 10,
        price: 450,
        quantity: 12,
        type: "PARTIAL_UNIT",
    }
]