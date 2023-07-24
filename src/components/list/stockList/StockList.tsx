import type { FC, ReactNode } from 'react';
import type { Inventory } from '@prisma/client';
import { Card, Space, Button } from 'antd';
import Link from 'next/link';
import { mappingStockType } from '~/types/stock';
import { Table} from '~/components';

type tResponse = {
  barrcode : ReactNode;
  name : ReactNode;
  cost : ReactNode;
  price : ReactNode;
  quantity : ReactNode;
  type : ReactNode;
  key: string | number;
}

export const StockList: FC<{ data: Inventory[] }> = ({ data }) => {
  const headers = [{key:0, label:'Barcode'},{key:1, label:'Name'},{key:2, label:'Cost'},{key:3, label:'Price'} ,{key:4, label:'Quantity'},{key:5, label:'Type'}];
  const tableStock = (data: Inventory) : tResponse => {
    const {id ,barrcode, name, cost, price, quantity,type} = data;

    return {
      barrcode :  <td>{barrcode}</td> , 
      name : <td>{name}</td>,
      cost : <td>{String(cost)}</td>,
      price : <td>{String(price)}</td>,
      quantity :<td>{String(quantity)}</td>,  
      type : <td
      className={`rounded border bg-cyan-50 bg-opacity-5 py-1 px-1 text-xs ${
        mappingStockType[type].color
      } `}
    >
      {mappingStockType[type].text}
    </td> ,
      key: id ,
    };

  }
  const row = () => data?.map(tableStock) || [];
return(
  <Card>
    <div className='flex justify-end pb-3'>
      <Space>
        <Link href='stocks/create'>
          <Button type='primary' htmlType='submit'>
            Create
          </Button>
        </Link>
      </Space>
    </div>
    <div className='w-full'>

      <Table headers={headers} rows={row()} linkToModify={`/stocks/`}/>
    </div>
  </Card>
  );
};