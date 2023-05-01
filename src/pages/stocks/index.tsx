import React from "react";
import type { NextPage } from "next";
import { StockForm, StockList } from "~/components";
import { fixturesStocks } from "~/fixtures/fixturesStocks";

const Stocks: NextPage = () => {
  const onSubmit = (values: { [key: string]: unknown }) => {
    console.log(values);
  };

  return (
    <div>
      <div className="sm:w-3/4 w-full m-auto">
        <StockForm title="Create a stock" onSubmit={onSubmit} />
      </div>
      <div className="sm:w-3/4 w-full m-auto mt-10">
        <StockList data={fixturesStocks}/>
      </div>
    </div>
  );
};

export default Stocks;
