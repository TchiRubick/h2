import React, { type FC } from "react";
import { Button, Form, Input, Space, InputNumber, Select, Card } from "antd";

type Props = {
  title: string;
  onSubmit: (values: { [key: string]: unknown }) => void;
}
const StockForm: FC<Props> = ({ title, onSubmit }) => {
  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Card className="w-full" title={title}>
      <Form
        form={form}
        layout="vertical"
        name="control-hooks"
        onFinish={onSubmit}
      >
        <div className="w-full grid grid-cols-1 gap-5 sm:grid-cols-2" >
            <Form.Item name="barcode" label="Barcode" rules={[{ required: true }]}>
              <Input className="w-full" />
            </Form.Item>
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
              <Input className="w-full" />
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
        </div>
      </Form>
    </Card>
  );
};

export default StockForm;
