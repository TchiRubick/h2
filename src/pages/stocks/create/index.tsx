import React from "react";
import type { NextPage } from "next";
import { StockForm } from "~/components";


const Stocks: NextPage = () => {
  const onSubmit = (values: { [key: string]: unknown }) => {
    console.log(values);
  };

  return (
    
      <div className="sm:w-3/4 w-full m-auto">
        <StockForm title="Create a stock" onSubmit={onSubmit} />
      </div>
      
    
  );
};

export default Stocks;