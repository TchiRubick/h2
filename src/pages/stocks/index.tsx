import React from "react";
import type { NextPage } from "next";
import { StockForm } from "~/components";
import { StockList } from "~/components";
import { fakeDataStocks } from "~/components/list/FakeData";

const Stocks: NextPage = () => {
  const onSubmit = (values: { [key: string]: unknown }) => {
    console.log(values);
  };

  return (
    <div>
      <div className="sm:w-2/3 w-full m-auto mt-10">
        <StockForm title="Create a stock" onSubmit={onSubmit} />
      </div>
      <div className="sm:w-2/3 w-full m-auto mt-10">
        <StockList data={fakeDataStocks}/>
      </div>
    </div>
  );
};

export default Stocks;
