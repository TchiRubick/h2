import React from "react";

import { Card } from "antd";
import { type tFakeDataStocks , mappingStockType} from "../../types/stock";

const StockList: React.FC<{ data: tFakeDataStocks[]}> = ({ data }) => {
 
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
                <td className={`border bg-cyan-50 bg-opacity-5 text-xs rounded py-1 px-1 ${mappingStockType[stock.type].color } `}>{mappingStockType[stock.type].text}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default StockList;
