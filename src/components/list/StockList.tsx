import React from "react";

import { Card } from "antd";
import type { tFakeDataStocks } from "../../types/stock";
type tProps = {
  data: tFakeDataStocks[];
};
const StockList = (props: tProps) => {
  const { data } = props;
  return (
    <Card>
      <div className="w-full">
        <table className="w-full ">
          <thead className="mb-4 w-full text-sm text-white">
            <tr className=" grid w-full grid-cols-6 gap-3 text-center">
              <td>Barrcode</td>
              <td>Name</td>
              <td>Cost</td>
              <td>Price</td>
              <td>Quantity</td>
              <td>Type</td>
            </tr>
          </thead>
          <tbody className="mb-auto grid w-full gap-y-4 text-white">
            {data.map((stock) => (
              <tr
                key={stock.id}
                className="grid w-full grid-cols-6 gap-3 text-center"
              >
                <td>{stock.barrcode}</td>
                <td>{stock.name}</td>
                <td>{stock.cost}</td>
                <td>{stock.price}</td>
                <td>{stock.quantity}</td>
                <td className={`border bg-cyan-50 bg-opacity-5 text-xs rounded py-1 px-1 ${stock.type === "FULL_UNIT"? "text-green-700" :stock.type === "CONSUMABLE"? "text-blue-400": stock.type === "PACKS"? "text-red-500" : "text-white"} `}>{stock.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default StockList;
