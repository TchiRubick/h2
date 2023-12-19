import type { NextPage } from 'next';
import { Card, Button } from 'antd';
import { api } from '~/utils/api';
import { DatePicker, Space, DatePickerProps } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Decimal } from '@prisma/client/runtime';
import { TypesProduct } from '@prisma/client';
import style from '~/components/scrollCss/Scroll.module.css';
let debounceTimeout: string | number | NodeJS.Timeout | undefined;
const defaultDate = dayjs();

type Transactiontype = {
  key: React.Key;
  action: string;
  inventoryId: number;
  namebefore: string;
  nameafter: string;
  costbefore: Decimal;
  costafter: Decimal;
  pricebefore: Decimal;
  priceafter: Decimal;
  quantitybefore: Decimal;
  quantityafter: Decimal;
  typebefore: TypesProduct;
  typeafter: TypesProduct;
  packunitbefore: Decimal;
  packunitafter: Decimal;
  unitperpackbefore: Decimal;
  unitperpackafter: Decimal;
  user: string;
};

const Transaction: NextPage = () => {
  const [searchValue, setsearchValue] = useState(defaultDate);
  const [enabledatapass, setenabledatapass] = useState(true);
  const { data, refetch, isLoading } = api.transactions.gettransactions.useQuery(
    { searchTransactions: searchValue.toISOString() },
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

  const columns: ColumnsType<Transactiontype> = [
    { title: 'Action', dataIndex: 'action', key: 'transaction.id' },
    { title: 'InventoryId', dataIndex: 'inventoryId', key: 'transaction.id' },
    { title: 'Name Before', dataIndex: 'namebefore', key: 'transaction.id' },
    { title: 'Name After', dataIndex: 'nameafter', key: 'transaction.id' },
    { title: 'Cost before', dataIndex: 'costbefore', key: 'transaction.id' },
    { title: 'Cost After', dataIndex: 'costafter', key: 'transaction.id' },
    { title: 'Price Before', dataIndex: 'pricebefore', key: 'transaction.id' },
    { title: 'Price After', dataIndex: 'priceafter', key: 'transaction.id' },
    { title: 'Quantity Before', dataIndex: 'quantitybefore', key: 'transaction.id' },
    { title: 'Quantity After', dataIndex: 'quantityafter', key: 'transaction.id' },
    { title: 'Type Before', dataIndex: 'typebefore', key: 'transaction.id' },
    { title: 'Type After', dataIndex: 'typeafter', key: 'transaction.id' },
    { title: 'Pack Unit Before', dataIndex: 'packunitbefore', key: 'transaction.id' },
    { title: 'Pack Unit After', dataIndex: 'packunitafter', key: 'transaction.id' },
    { title: 'Unit per Pack Before', dataIndex: 'unitperpackbefore', key: 'transaction.id' },
    { title: 'Unit per Pack After', dataIndex: 'unitperpackafter', key: 'transaction.id' },
    { title: 'User', dataIndex: 'user', key: 'transaction.id' },
  ];

  const datas: Transactiontype[] = [];

  data?.map((transaction) => {
    datas.push({
      key: transaction.id,
      action: transaction.action,
      inventoryId: transaction.inventoryId,
      namebefore: transaction.namebefore,
      nameafter: transaction.nameafter,
      costbefore: transaction.costbefore,
      costafter: transaction.costafter,
      pricebefore: transaction.pricebefore,
      priceafter: transaction.priceafter,
      quantitybefore: transaction.quantitybefore,
      quantityafter: transaction.quantityafter,
      typebefore: transaction.typebefore,
      typeafter: transaction.typeafter,
      packunitbefore: transaction.packunitbefore,
      packunitafter: transaction.packunitafter,
      unitperpackbefore: transaction.unitperpackbefore,
      unitperpackafter: transaction.unitperpackafter,
      user: transaction.user,
    });
  });

  return (
    <Card className='m-auto w-full'>
      <div className='flex justify-end pb-3 '>
        <Space>
          <DatePicker value={searchValue} defaultValue={defaultDate} onChange={onChange} />
        </Space>
      </div>
      <Table columns={columns} dataSource={datas} scroll={{ x: 1300 }} />
      <div className='style.error'></div>
    </Card>
  );
};

export default Transaction;
