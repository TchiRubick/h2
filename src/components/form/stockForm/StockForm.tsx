import React, { type FC,useState } from 'react';
import { Button, Form, Input, Space, InputNumber, Select, Card } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { api } from "~/utils/api";


type Props = {
  title: string;
};
export const StockForm: FC<Props> = ({ title}) => {
  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  };
  const [barcode, setbarcode] = useState("");
  const [name, setname] = useState("");
  const [cost, setcost] = useState(0);
  const [price, setprice] = useState(0);
  const [quantity, setquantity] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [succesMessage, setsuccesMessage] = useState("");

  const { mutateAsync} = api.inventory.set.useMutation();
  const inventory = async () => {
    try{
      const invent = await mutateAsync({ name,barcode,cost,price,quantity,type});
      setsuccesMessage("Succes");
      setErrorMessage('');
    }

    catch{
      setErrorMessage("Error, barcode is unique");
      setsuccesMessage("");
    }  
  }
  const onSubmit = (values: { [key: any] }) => {
    return inventory;
  }


  return (
    <Card className='w-full'>
      <div className=' flex h-auto w-full flex-row items-center pb-2 text-xl'>
        <Link href='/stocks'>
          <ArrowLeftOutlined className='mr-4 w-4 text-xl text-white' />
        </Link>
        <span>{title}</span>
      </div>
      <h1 className="text-blue-800">{succesMessage}</h1>
      <h1 className="text-red-500">{errorMessage}</h1>
      <hr className='opacity-5' />
      <Form form={form} layout='vertical' name='control-hooks' onFinish={onSubmit}>
        <div className='grid w-full grid-cols-1 gap-5 sm:grid-cols-2'>
          <Form.Item
            name='barcode'
            label='Barcode'
            rules={[{ required: true }]}
            initialValue={barcode}
          >
            <Input className='w-full' />
          </Form.Item>
          <Form.Item
            name='name'
            label='Name'
            rules={[{ required: true }]}
            initialValue={name}
          >
            <Input className='w-full' />
          </Form.Item>
          <Form.Item
            name='cost'
            label='Cost'
            rules={[{ required: true }]}
            initialValue={cost ?? 0}
          >
            <InputNumber size='middle' min={0} className='w-full' />
          </Form.Item>
          <Form.Item
            name='price'
            label='Price'
            rules={[{ required: true }]}
            initialValue={price??0}
          >
            <InputNumber size='middle' min={0} className='w-full' />
          </Form.Item>
          <Form.Item
            name='quantity'
            label='Quantity'
            rules={[{ required: true }]}
            initialValue={quantity??0}
          >
            <InputNumber size='middle' min={0} className='w-full' />
          </Form.Item>
          <Form.Item
            name='type'
            label='Type'
            rules={[{ required: true }]}
            initialValue={'FULL_UNIT'}
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
          <Form.Item>
            <Space>
              <Button type='primary' htmlType='submit'>
                Submit
              </Button>
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
