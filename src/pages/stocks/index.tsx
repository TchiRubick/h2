import React from "react";
import type { NextPage } from "next";
import { StockList } from "~/components";
import { fixturesStocks } from "~/fixtures/fixturesStocks";

const Stocks: NextPage = () => {
  const onSubmit = (values: { [key: string]: unknown }) => {
    console.log(values);
  };

  return (
    
      <div className="sm:w-3/4 w-full m-auto mt-10">
        <StockList data={fixturesStocks}/>
      </div>

  );
};

export default Stocks;
