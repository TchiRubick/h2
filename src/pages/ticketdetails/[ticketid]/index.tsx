import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Card } from 'antd';
import { api } from '~/utils/api';

const Ticketdetails: NextPage = () => {
  const router = useRouter();
  const ticketidFromQueryUrl = router.query.ticketid as string;

  const { data } = api.sales.getSale.useQuery({
    id: parseInt(ticketidFromQueryUrl),
  });

  return (
    <Card className='m-auto w-2/3'>
      <div className='w-full'>
        <div>
          <li>TicketID: {data?.[0]?.ticketId}</li>
          <li>Date: {data?.[0]?.ticket.createdAt.toLocaleString()}</li>
          <table className='w-full border-4 border-white'>
            <thead className='w-full  text-sm text-white'>
              <tr className='grid h-fit w-full grid-cols-4 gap-6 rounded-xl border border-solid border-white py-4 text-center '>
                <th>Name</th>
                <th>Unit price:</th>
                <th>Quantity purchase by client</th>
                <th>Price total item:</th>
              </tr>
            </thead>
            <tbody className='mb-auto mt-4 grid w-full gap-y-3'>
              {data?.map((key) => (
                <tr className='grid w-full grid-cols-4 gap-3 text-center text-white'>
                  <td> {key.inventory.name}</td>
                  <td>{Number(key.pricetotalitem) / Number(key.quantitybuyclient)}</td>
                  <td>{Number(key.quantitybuyclient)}</td>
                  <td> {Number(key.pricetotalitem)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <li>Total purchase: {Number(data?.[0]?.ticket.totalpurchaseprice)}</li>
          <li>Money paid by client: {Number(data?.[0]?.ticket.moneypaidclient)}</li>
          <li>Change: {Number(data?.[0]?.ticket.change)}</li>
        </div>
      </div>
    </Card>
  );
};

export default Ticketdetails;
