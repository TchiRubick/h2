import type { FC, ReactNode } from 'react';
import type { Inventory } from '@prisma/client';
import { Card, Space, Button } from 'antd';
import Link from 'next/link';
import { mappingStockType } from '~/types/stock';

type tRows = {
  [x: string]: ReactNode | string | number;
  key: string | number;
};

type tHeaders = {
  label: string;
  key: string | number;
};

type Props = {
  linkToCreate?: string;
  linkToModify: string;
  headers: tHeaders[];
  rows: tRows[];
};

export const Table: FC<Props> = ({ linkToCreate, headers, linkToModify, rows }) => {
  const renderCells = (h: tHeaders, r: tRows) => <th key={`${r.key}_${h.key}`}>{r[h.key]}</th>;

  return (
    <Card>
      <div className='w-full'>
        <table className='w-full border-4 border-white'>
          <thead className='w-full  text-sm text-white '>
            <tr className='grid h-fit w-full grid-cols-6 gap-3 rounded-xl border border-solid border-white py-4 text-center '>
              {headers.map((dh) => (
                <th key={dh.key}>{dh.label}</th>
              ))}
            </tr>
          </thead>
          <tbody className='mb-auto mt-4 grid w-full gap-y-4'>
            {rows?.map((r) => (
              <Link key={r.key} href={`${linkToModify}${r.key}`} className=' text-white'>
                <tr className='grid w-full grid-cols-6 gap-3 text-center' key={r.key}>
                  {headers.map((h) => renderCells(h, r))}
                </tr>
              </Link>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
