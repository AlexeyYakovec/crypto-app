import React, { useContext } from "react";
import { Layout, Spin, Row, Col } from "antd";
import AppHeader from "./AppHeader";
import AppSider from "./AppSider";
import AppContent from "./AppContent";
import CryptoContext from "../../context/crypto-context";

export default function AppLayout() {
   const { loading } = useContext(CryptoContext);

   if (loading) {
      return <Spin fullscreen />;
   }
   return (
      <Layout style={{ fontFamily: "Segoe UI" }}>
         <AppHeader />
         <Layout>
            <AppSider />
            <AppContent />
         </Layout>
      </Layout>
   );
}
