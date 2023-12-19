import React, { useEffect, type FC, useState } from 'react';
import { Button, Form, Input, InputNumber, Select, Card, FormInstance } from 'antd';
import { Load } from '~/components';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { Inventory } from '@prisma/client';
import { Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useAuthInfo } from '@propelauth/react';

type PropsType = {
  title: string;
  data?: Inventory;
  onSubmit: (values: {
    user: string;
    barcode: string;
    name: string;
    cost: number;
    price: number;
    quantity: number;
    type: 'FULL_UNIT' | 'PARTIAL_UNIT' | 'PACKS' | 'CONSUMABLE';
    packunit: number;
    unitperpack: number;
  }) => Promise<void>;
  isEditing: boolean;
  isLoading: boolean;
  onChange: ((e: CheckboxChangeEvent) => void) | undefined;
  checkboxVerification?: boolean;
  onUpdateAction?: (values: {
    user: string;
    barcode: string;
    action: string;
    quantity: number;
  }) => Promise<void>;
};

type FormItemProps = {
  shouldUpdate: boolean;
  className: string;
  form: FormInstance;
};

const FormItem: FC<FormItemProps> = ({ shouldUpdate, className, form }) => {
  return (
    <Form.Item shouldUpdate={shouldUpdate} className={className}>
      {() => (
        <Button
          type='primary'
          htmlType='submit'
          disabled={form.getFieldsError().filter(({ errors }) => errors.length).length > 0}
        >
          Submit
        </Button>
      )}
    </Form.Item>
  );
};
export const StockForm: FC<PropsType> = ({
  title,
  data,
  onSubmit,
  isEditing,
  isLoading,
  onChange,
  checkboxVerification,
  onUpdateAction,
}) => {
  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
  };

  const { user } = useAuthInfo();
  const email = user?.email as string;

  const [isQuantityDisabled, setIsQuantityDisabled] = useState(false);

  const handleTypeChange = (value: string) => {
    setIsQuantityDisabled(value === 'CONSUMABLE');
    if (value === 'CONSUMABLE') {
      form.setFieldsValue({ quantity: 0 });
    }
  };

  useEffect(() => {
    setIsQuantityDisabled(data?.type === 'CONSUMABLE');
  }, [data?.type]);
  const quantityunit = () => {
    if (!Number(data?.quantity)) return null;
    return <div>{`The unit number ${data?.quantity}`}</div>;
  };
  const packunit = () => {
    if (!Number(data?.packunit)) return null;
    return (
      <div>{`The pack unit is  ${data?.packunit} and unit per pack is ${data?.unitperpack}   `}</div>
    );
  };
  const check = () => {
    if (!data)
      return (
        <Checkbox onChange={onChange} defaultChecked={checkboxVerification}>
          if you want create again
        </Checkbox>
      );
    return null;
  };

  const onSubmitCheck = (values: {
    user: string;
    barcode: string;
    name: string;
    cost: number;
    price: number;
    quantity: number;
    type: 'FULL_UNIT' | 'PARTIAL_UNIT' | 'PACKS' | 'CONSUMABLE';
    packunit: number;
    unitperpack: number;
  }) => {
    const valueswithemail = {
      ...values,
      user: email,
    };
    onSubmit(valueswithemail);
    if (checkboxVerification === true) {
      onReset();
    }
  };

  const onAction = (values: {
    user: string;
    barcode: string;
    action: string;
    quantity: number;
  }) => {
    const valueswithemail = {
      ...values,
      user: email,
      barcode: data?.barcode as string,
    };
    onUpdateAction?.(valueswithemail);
  };

  return (
    <div>
      <Card className='w-full'>
        <div className=' flex h-auto w-full flex-row items-center pb-2 text-xl'>
          <Link href='/stocks'>
            <ArrowLeftOutlined className='mr-4 w-4 text-xl text-white' />
          </Link>
          <span>{title}</span>
        </div>
        <hr className='opacity-5' />
        {isLoading ? (
          <div className='m-auto grid w-full grid-cols-1 gap-5 p-48 sm:grid-cols-1'>
            <Load />
          </div>
        ) : (
          <Form form={form} layout='vertical' name='validateOnly' onFinish={onSubmitCheck}>
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
                <InputNumber
                  size='middle'
                  min={0}
                  className='w-full'
                  disabled={isQuantityDisabled}
                />
              </Form.Item>
              <Form.Item
                name='type'
                label='Type'
                rules={[{ required: true }]}
                initialValue={data?.type ?? 'FULL_UNIT'}
              >
                <Select
                  className='w-full'
                  onChange={handleTypeChange}
                  options={[
                    { value: 'FULL_UNIT', label: 'Full Unit' },
                    { value: 'PARTIAL_UNIT', label: 'Partial Unit' },
                    { value: 'PACKS', label: 'Packs' },
                    { value: 'CONSUMABLE', label: 'Consumable' },
                  ]}
                />
              </Form.Item>
              <Form.Item
                name='packunit'
                label='Packunit'
                rules={[{ type: 'number', required: true }]}
                initialValue={Number(data?.packunit ?? 0)}
              >
                <InputNumber size='middle' min={0} className='w-full' />
              </Form.Item>
              <Form.Item
                name='unitperpack'
                label='Unitperpack'
                rules={[{ type: 'number', required: true }]}
                initialValue={Number(data?.unitperpack ?? 0)}
              >
                <InputNumber size='middle' min={0} className='w-full' />
              </Form.Item>
              <Form.Item initialValue={Number(data?.quantity ?? 0)}>{quantityunit()}</Form.Item>
              <div className='flex justify-items-start'>
                <FormItem shouldUpdate={true} className='submit' form={form} />
                <div className='pl-2'>
                  <Button htmlType='button' onClick={onReset}>
                    Reset
                  </Button>
                </div>
                <div className='pl-2'>{check()}</div>
              </div>
              <div>{packunit()}</div>
            </div>
          </Form>
        )}
      </Card>
      {isEditing ? (
        <Form layout='vertical' onFinish={onAction}>
          <Form.Item name='action' label='Action' rules={[{ required: true }]}>
            <Input className='w-full' />
          </Form.Item>
          <Form.Item
            name='quantity'
            label='Quantity'
            rules={[{ type: 'number', required: true }]}
            initialValue={0}
          >
            <InputNumber size='middle' min={0} className='w-full' />
          </Form.Item>

          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form>
      ) : null}
    </div>
  );
};
