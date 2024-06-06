import React, { useState, useContext, useRef } from "react";
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
   Result,
} from "antd";

import CryptoContext from "../context/crypto-context";
import CoinInfo from "./CoinInfo";

export default function AddAssetForm({ onClose }) {
   const [form] = Form.useForm();
   const { crypto, addAsset } = useContext(CryptoContext);
   const [coin, setCoin] = useState("");
   const [submitted, setSubmitted] = useState(false);
   const assetRef = useRef();

   if (submitted) {
      return (
         <Result
            status="success"
            title="New Asset Added"
            subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
            extra={[
               <Button type="primary" key="console" onClick={onClose}>
                  Close
               </Button>,
            ]}
         />
      );
   }

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
      const newAsset = {
         id: coin.id,
         amount: values.amount,
         price: values.price,
         date: values.date?.$d ?? new Date(),
      };
      assetRef.current = newAsset;
      setSubmitted(true);
      addAsset(newAsset);
   }

   function handleAmountChange(value) {
      const price = form.getFieldValue("price");
      form.setFieldsValue({
         total: Number(value * price).toFixed(2),
      });
   }
   function handlePriceChange(value) {
      const amount = form.getFieldValue("amount");
      form.setFieldsValue({
         total: Number(value * amount).toFixed(2),
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
         <CoinInfo coin={coin} />
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
            <InputNumber
               onChange={handlePriceChange}
               style={{ width: "100%" }}
            />
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
