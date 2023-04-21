import React from 'react';
import type { NextPage } from 'next';
import { Button, Form, Input, Space, InputNumber, Select } from "antd";

const Stocks: NextPage = () => {
  const [form] = Form.useForm();

  const onFinish = (values: { [key: string]: unknown }) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <div>
      <Form form={form} layout="vertical" name="control-hooks" onFinish={onFinish} className="w-96 bg-opacity-40 bg-slate-800 p-5 rounded-md shadow-sm">
        <Form.Item name="barcode" label="Barcode" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="cost" label="Cost" rules={[{ required: true }]}>
          <InputNumber size="large" min={0} max={100000}  defaultValue={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="price" label="Price" rules={[{ required: true }]}>
          <InputNumber size="large" min={0} max={100000}  defaultValue={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="quantity" label="Quantity" rules={[{ required: true }]}>
          <InputNumber size="large" min={0} max={100000}  defaultValue={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="type" label="Type" rules={[{ required: true }]}>
          <Select defaultValue="Full Unit"style={{ width: '100%' }}
            options={[
              {value: 'Full Unit', label: 'Full Unit' },
              { value: 'Partial Unit', label: 'Partial Unit' },
              { value: 'Packs', label: 'Packs' },
              { value: 'Consumable', label: 'Consumable' },
                    ]}
          />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button htmlType="submit">
              Submit
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Stocks