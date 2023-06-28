import React, { type FC, useState } from 'react';
import type { FormInstance } from 'antd';
import { Button, Form, Input, Space, InputNumber, Select, Card } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { Inventory } from '@prisma/client';

type Props = {
  title: string;
  data?: Inventory | null;
  onSubmit: (values: {
    barcode: string;
    name: string;
    cost: number;
    price: number;
    quantity: number;
    type: 'FULL_UNIT' | 'PARTIAL_UNIT' | 'PACKS' | 'CONSUMABLE';
  }) => Promise<void>;
  isEditing: boolean;
};

const SubmitButton = ({ form }: { form: FormInstance }) => {
  const [submittable, setSubmittable] = React.useState(false);

  // Watch all values
  const values = Form.useWatch([], form);

  React.useEffect(() => {
    form.validateFields().then(
      () => {
        setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      }
    );
  }, [values]);

  return (
    <Button type='primary' htmlType='submit' disabled={!submittable}>
      Submit
    </Button>
  );
};
export const StockForm: FC<Props> = ({ title, data, onSubmit, isEditing }) => {
  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  };
  const stock = () => {
    if (Number(data?.quantity) > 0) {
      return <div> The number of stocks is {Number(data?.quantity)}</div>;
    } else {
      return <div> </div>;
    }
  };

  return (
    <Card className='w-full'>
      <div className=' flex h-auto w-full flex-row items-center pb-2 text-xl'>
        <Link href='/stocks'>
          <ArrowLeftOutlined className='mr-4 w-4 text-xl text-white' />
        </Link>
        <span>{title}</span>
      </div>
      <hr className='opacity-5' />
      <Form form={form} layout='vertical' name='validateOnly' onFinish={onSubmit}>
        <div className='grid w-full grid-cols-1 gap-5 sm:grid-cols-2'>
          <Form.Item
            name='barcode'
            label='Barcode'
            rules={[{ required: true }, { min: 9 }]}
            initialValue={data?.barcode}
          >
            <Input className='w-full' disabled={isEditing} max={10} />
          </Form.Item>
          <Form.Item
            name='name'
            label='Name'
            rules={[{ required: true }]}
            initialValue={data?.name}
          >
            <Input className='w-full' />
          </Form.Item>
          <Form.Item
            name='cost'
            label='Cost'
            rules={[{ type: 'number', required: true }]}
            initialValue={Number(data?.cost ?? 0)}
          >
            <InputNumber size='middle' min={0} className='w-full' />
          </Form.Item>
          <Form.Item
            name='price'
            label='Price'
            rules={[{ type: 'number', required: true }]}
            initialValue={Number(data?.price ?? 0)}
          >
            <InputNumber size='middle' min={0} className='w-full' />
          </Form.Item>
          <Form.Item
            name='quantity'
            label='Quantity'
            rules={[{ type: 'number', required: true }]}
            initialValue={0}
          >
            <InputNumber size='middle' min={0} className='w-full' />
          </Form.Item>
          <Form.Item
            name='type'
            label='Type'
            rules={[{ required: true }]}
            initialValue={data?.type ?? 'FULL_UNIT'}
          >
            <Select
              className='w-full'
              options={[
                { value: 'FULL_UNIT', label: 'Full Unit' },
                { value: 'PARTIAL_UNIT', label: 'Partial Unit' },
                { value: 'PACKS', label: 'Packs' },
                { value: 'CONSUMABLE', label: 'Consumable' },
              ]}
            />
          </Form.Item>
          <Form.Item initialValue={Number(data?.quantity ?? 0)}>{stock()}</Form.Item>
          <Form.Item>
            <Space>
              <SubmitButton form={form} />
              <Button htmlType='button' onClick={onReset}>
                Reset
              </Button>
            </Space>
          </Form.Item>
        </div>
      </Form>
    </Card>
  );
};
