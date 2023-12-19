import type { NextPage } from 'next';
import { Card } from 'antd';
import { api } from '~/utils/api';
import { useEffect, useState } from 'react';
import { DatePicker, Space, DatePickerProps } from 'antd';

import dayjs from 'dayjs';

let debounceTimeout: string | number | NodeJS.Timeout | undefined;
const defaultDate = dayjs();

const History: NextPage = () => {
  const [searchValue, setsearchValue] = useState(defaultDate);
  const [enabledatapass, setenabledatapass] = useState(true);
  const { data, refetch, isLoading } = api.sales.getsales.useQuery(
    { searchSales: searchValue.toISOString() },
    { enabled: enabledatapass }
  );

  const onChange: DatePickerProps['onChange'] = (date) => {
    if (!date) {
      setsearchValue(defaultDate);
      return;
    }

    setsearchValue(date);
    console.log(date);
  };

  useEffect(() => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      refetch();
    }, 500);
  }, [searchValue, refetch]);

  useEffect(() => {
    if (data !== null) return setenabledatapass(false);
  }, [data]);

  const totalPrice = data?.reduce((acc: number, sales) => acc + Number(sales.pricetotalitem), 0);

  return (
    <Card className='m-auto w-2/3'>
      <div className='flex justify-end pb-3'>
        <li>{totalPrice}</li>
        <Space>
          <DatePicker value={searchValue} defaultValue={defaultDate} onChange={onChange} />
        </Space>
      </div>
      <div className='w-full'>
        <table className='w-full border-4 border-white'>
          <thead className='w-full  text-sm text-white '>
            <tr className='grid h-fit w-full grid-cols-4 gap-3 rounded-xl border border-solid border-white py-4 text-center '>
              <th>InventoryId</th>
              <th>TicketId</th>
              <th>quantitybuyclient</th>
              <th>pricetotalitem</th>
            </tr>
          </thead>
          <tbody className='mb-auto mt-4 grid w-full gap-y-3'>
            {data?.map((sales) => (
              <tr className='grid w-full grid-cols-4 gap-3 text-center text-white' key={sales.id}>
                <td>{sales.inventoryId}</td>
                <td>{sales.ticketId}</td>
                <td>{Number(sales.quantitybuyclient)}</td>
                <td>{Number(sales.pricetotalitem)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default History;
