import React from "react";
import type { NextPage } from "next";
import { Button, Form, Input, Space, InputNumber, Select, Card } from "antd";

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
      <Card className="w-96" title="Default size card">
        <Form
          form={form}
          layout="vertical"
          name="control-hooks"
          onFinish={onFinish}
        >
          <Form.Item
            name="barcode"
            label="Barcode"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="cost" label="Cost" rules={[{ required: true }]}>
            <InputNumber
              size="middle"
              min={0}
              defaultValue={0}
              className="w-full"
            />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <InputNumber
              size="middle"
              min={0}
              defaultValue={0}
              className="w-full"
            />
          </Form.Item>
          <Form.Item
            name="quantity"
            label="Quantity"
            rules={[{ required: true }]}
          >
            <InputNumber
              size="middle"
              min={0}
              defaultValue={0}
              className="w-full"
            />
          </Form.Item>
          <Form.Item name="type" label="Type" rules={[{ required: true }]}>
            <Select
              defaultValue="FULL_UNIT"
              className="w-full"
              options={[
                { value: "FULL_UNIT", label: "Full Unit" },
                { value: "PARTIAL_UNIT", label: "Partial Unit" },
                { value: "PACKS", label: "Packs" },
                { value: "CONSUMABLE", label: "Consumable" },
              ]}
            />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button htmlType="button" onClick={onReset}>
                Reset
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Stocks;
