import React, { useState, useContext } from "react";
import {
   Select,
   Space,
   Typography,
   Flex,
   Divider,
   Form,
   Input,
   InputNumber,
   Checkbox,
   Button,
   DatePicker,
} from "antd";

import CryptoContext from "../context/crypto-context";

export default function AddAssetForm() {
   const [form] = Form.useForm();
   const { crypto } = useContext(CryptoContext);
   const [coin, setCoin] = useState("");

   console.log(`form: `, form);

   const validateMessages = {
      required: "${label} is required",
      types: {
         number: "${label} is not valid number",
      },
      number: {
         range: "${label} must be berween ${min} amd ${max}",
      },
   };

   if (!coin) {
      return (
         <Select
            style={{
               width: "100%",
            }}
            onSelect={(v) => setCoin(crypto.find((c) => c.id === v))}
            placeholder="select coin"
            options={crypto.map((coin) => ({
               label: coin.name,
               value: coin.id,
               icon: coin.icon,
            }))}
            optionRender={(option) => (
               <Space>
                  <img
                     src={option.data.icon}
                     alt={option.data.label}
                     style={{ height: "28px", width: "28px" }}
                  />
                  {option.data.label}
               </Space>
            )}
         />
      );
   }

   function onFinish(values) {
      console.log(`finish: `, values);
   }

   function handleAmountChange(value) {
      form.setFieldsValue({
         total: value * coin.price,
      });
   }

   return (
      <Form
         form={form}
         name="basic"
         labelCol={{
            span: 8,
         }}
         wrapperCol={{
            span: 10,
         }}
         style={{
            maxWidth: 600,
         }}
         initialValues={{
            price: Number(coin.price.toFixed(2)),
         }}
         onFinish={onFinish}
         validateMessages={validateMessages}
      >
         <Flex align="center">
            <img
               src={coin.icon}
               alt={coin.name}
               style={{ width: 40, marginRight: 12 }}
            />
            <Typography.Title level={2} style={{ margin: 0 }}>
               {coin.name}
            </Typography.Title>
         </Flex>
         <Divider />

         <Form.Item
            label="Amount"
            name="amount"
            rules={[
               {
                  required: true,
                  type: "number",
                  min: 0,
               },
            ]}
         >
            <InputNumber
               placeholder="Enter coin amount"
               onChange={handleAmountChange}
               style={{ width: "100%" }}
            />
         </Form.Item>

         <Form.Item label="Price" name="price">
            <InputNumber disabled style={{ width: "100%" }} />
         </Form.Item>

         <Form.Item label="Date & Time" name="date">
            <DatePicker showTime style={{ width: "100%" }} />
         </Form.Item>

         <Form.Item label="Total" name="total">
            <InputNumber disabled style={{ width: "100%" }} />
         </Form.Item>

         <Form.Item>
            <Button type="primary" htmlType="submit">
               Add Asset
            </Button>
         </Form.Item>
      </Form>
   );
}
