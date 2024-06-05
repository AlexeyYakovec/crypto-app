import React, { useContext } from "react";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Layout, Card, Statistic, List, Typography, Spin, Tag } from "antd";

import { capitalize } from "../../utils";
import CryptoContext from "../../context/crypto-context";

const siderStyle = {
   padding: `1rem`,
   color: "white",
   backgroundColor: "#24293e",
};

export default function AppSider() {
   const { assets } = useContext(CryptoContext);

   return (
      <Layout.Sider width="25%" style={siderStyle}>
         {assets.map((asset) => (
            <Card key={asset.id} style={{ width: 300, marginBottom: "1rem" }}>
               <Statistic
                  title={capitalize(asset.id)}
                  value={asset.totalAmount}
                  precision={2}
                  valueStyle={{ color: asset.grow ? "#3f8600" : "#cf1322" }}
                  prefix={
                     asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />
                  }
                  suffix="$"
               />
               <List
                  dataSource={[
                     {
                        title: "Total Profit",
                        value: asset.totalProfit,
                        withTag: true,
                     },
                     {
                        title: "Asset Amount",
                        value: asset.amount,
                        isPlane: true,
                     },
                     //    { title: "Difference", value: asset.growPercent },
                  ]}
                  size={"small"}
                  renderItem={(item) => (
                     <List.Item>
                        <span>{item.title}</span>
                        <span>
                           {item.withTag && (
                              <Tag color={asset.grow ? "green" : "red"}>
                                 {asset.growPercent} %
                              </Tag>
                           )}
                           {item.isPlane && item.value}
                           {!item.isPlane && (
                              <Typography.Text
                                 type={asset.grow ? "success" : "danger"}
                              >
                                 {item.value.toFixed(2)} $
                              </Typography.Text>
                           )}
                        </span>
                     </List.Item>
                  )}
               />
            </Card>
         ))}
      </Layout.Sider>
   );
}
