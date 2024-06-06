import React, { useContext } from "react";
import { Layout, Typography, Col, Row } from "antd";

import CryptoContext from "../../context/crypto-context";
import PortfolioChart from "../PortfolioChart";
import AssetsTable from "../AssetsTable";

const contentStyle = {
   textAlign: "center",
   minHeight: "calc(100vh - 60px)",
   color: "#fff",
   backgroundColor: "#24293e",
};

export default function AppContent() {
   const { assets, crypto } = useContext(CryptoContext);

   const cryptoPriceMap = crypto.reduce((acc, coin) => {
      acc[coin.id] = coin.price;
      return acc;
   }, {});

   return (
      <Layout.Content style={contentStyle} width="75%">
         <Typography.Title
            level={3}
            style={{ textAlign: "left", color: "#fff" }}
         >
            Portrolio:
            {assets
               .map((asset) => {
                  return asset.amount * cryptoPriceMap[asset.id];
               })
               .reduce((acc, val) => (acc += val), 0)
               .toFixed(2)}
            $
         </Typography.Title>
         <PortfolioChart />
         <AssetsTable />
      </Layout.Content>
   );
}
