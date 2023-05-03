import React, { type FC } from "react";
import {
  Button,
  Form,
  Input,
  Space,
  InputNumber,
  Select,
  Card,
  Divider,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Link from "next/link";

type Props = {
  title: string;
  onSubmit: (values: { [key: string]: unknown }) => void;
};
const StockForm: FC<Props> = ({ title, onSubmit }) => {
  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Card className="w-full">
      <div className=" flex h-auto w-full flex-row items-center pb-2 text-xl">
        <Link href="/stocks">
          <ArrowLeftOutlined className="mr-4 w-4 text-xl text-white" />
        </Link>
        <span>{title}</span>
      </div>
      <hr className="opacity-5" />
      <Form
        form={form}
        layout="vertical"
        name="control-hooks"
        onFinish={onSubmit}
      >
        <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2">
          <Form.Item
            name="barcode"
            label="Barcode"
            rules={[{ required: true }]}
          >
            <Input className="w-full" />
          </Form.Item>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input className="w-full" />
          </Form.Item>
          <Form.Item
            name="cost"
            label="Cost"
            rules={[{ required: true }]}
            initialValue={0}
          >
            <InputNumber size="middle" min={0} className="w-full" />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true }]}
            initialValue={0}
          >
            <InputNumber size="middle" min={0} className="w-full" />
          </Form.Item>
          <Form.Item
            name="quantity"
            label="Quantity"
            rules={[{ required: true }]}
            initialValue={0}
          >
            <InputNumber size="middle" min={0} className="w-full" />
          </Form.Item>
          <Form.Item
            name="type"
            label="Type"
            rules={[{ required: true }]}
            initialValue="FULL_UNIT"
          >
            <Select
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
