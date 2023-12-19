import type { NextPage } from 'next';
import { Card, Button } from 'antd';
import Link from 'next/link';
import { api } from '~/utils/api';
import { DatePicker, Space, DatePickerProps } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

let debounceTimeout: string | number | NodeJS.Timeout | undefined;
const defaultDate = dayjs();

const Tickets: NextPage = () => {
  const [searchValue, setsearchValue] = useState(defaultDate);
  const [enabledatapass, setenabledatapass] = useState(true);
  const { data, refetch, isLoading } = api.tickets.getTickets.useQuery(
    { searchTicket: searchValue.toISOString() },
    { enabled: enabledatapass }
  );

  const onChange: DatePickerProps['onChange'] = (date) => {
    if (!date) {
      setsearchValue(defaultDate);
      return;
    }

    setsearchValue(date);
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

  return (
    <Card className='m-auto w-2/3'>
      <div className='flex justify-end pb-3'>
        <Space>
          <DatePicker value={searchValue} defaultValue={defaultDate} onChange={onChange} />
        </Space>
      </div>
      <div className='w-full'>
        <table className='w-full border-4 border-white'>
          <thead className='w-full  text-sm text-white '>
            <tr className='grid h-fit w-full grid-cols-5 gap-3 rounded-xl border border-solid border-white py-4 text-center '>
              <th>Ticket Id</th>
              <th>Total purchase price</th>
              <th>Money paid by client</th>
              <th>Change</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className='mb-auto mt-4 grid w-full gap-y-3'>
            {data?.map((ticket) => (
              <tr className='grid w-full grid-cols-5 gap-3 text-center text-white' key={ticket.id}>
                <td>{ticket.id}</td>
                <td>{Number(ticket.totalpurchaseprice)}</td>
                <td>{Number(ticket.moneypaidclient)}</td>
                <td>{Number(ticket.change)}</td>
                <td>
                  <Link href={`/ticketdetails/${ticket.id as number}`}>
                    <Button>view</Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default Tickets;
