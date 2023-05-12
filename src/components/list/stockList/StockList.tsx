import React from "react";

import { Card, Space, Button } from "antd";
import { type tDataStocks, mappingStockType } from "~/types/stock";
import Link from "next/link";

const StockList: React.FC<{ data: tDataStocks[] }> = ({ data }) => {
  return (
    <Card>
      <div className="flex justify-end pb-3">
        <Space>
          <Link href="stocks/create">
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </Link>
        </Space>
      </div>
      <div className="w-full">
        <table className="w-full border-4 border-white">
          <thead className="w-full  text-sm text-white ">
            <tr className="grid h-fit w-full grid-cols-6 gap-3 rounded-xl border border-solid border-white py-4 text-center ">
              <th>Barcode</th>
              <th>Name</th>
              <th>Cost</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody className="mb-auto mt-4 grid w-full gap-y-4">
            {data.map((stock) => (
              <Link key={stock.id} href={`/stocks/${stock.barcode}`} className=" text-white">
                <tr
                  className="grid w-full grid-cols-6 gap-3 text-center"
                >
                  <td>{stock.barcode}</td>
                  <td>{stock.name}</td>
                  <td>{stock.cost}</td>
                  <td>{stock.price}</td>
                  <td>{stock.quantity}</td>
                  <td
                    className={`rounded border bg-cyan-50 bg-opacity-5 py-1 px-1 text-xs ${
                      mappingStockType[stock.type].color
                    } `}
                  >
                    {mappingStockType[stock.type].text}
                  </td>
                </tr>
              </Link>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default StockList;
