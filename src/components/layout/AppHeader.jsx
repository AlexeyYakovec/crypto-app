import React, { useContext, useState, useEffect } from "react";
import { Layout, Select, Space, Button, Modal, Drawer } from "antd";

import CryptoContext from "../../context/crypto-context";
import CoinInfoModal from "../CoinInfoModal";
import AddAssetForm from "../AddAssetForm";

const headerStyle = {
   width: "100%",
   display: "flex",
   justifyContent: "space-between",
   alignItems: "center",
   height: 60,
   color: "#fff",
   backgroundColor: "#2f3651",
   padding: "1rem",
};

export default function AppHeader() {
   const [select, setSelect] = useState(false);
   const [modal, setModal] = useState(false);
   const [drawer, setDrawer] = useState(false);
   const [coin, setCoin] = useState(null);

   const { crypto } = useContext(CryptoContext);

   useEffect(() => {
      const keypress = (event) => {
         if (event.key === "/") {
            setSelect((prev) => !prev);
         }
      };
      document.addEventListener("keypress", keypress);
      return () => document.removeEventListener("keypress", keypress);
   }, []);

   function handleSelect(value) {
      setCoin(crypto.find((c) => c.id === value));
      setModal(true);
   }

   return (
      <Layout.Header style={headerStyle}>
         <Select
            style={{
               width: 250,
            }}
            onSelect={handleSelect}
            open={select}
            onClick={() => setSelect((prev) => !prev)}
            value="press / open"
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
         <Button type="primary" onClick={() => setDrawer(true)}>
            Add asset
         </Button>

         <Modal open={modal} onCancel={() => setModal(false)} footer={null}>
            <CoinInfoModal coin={coin} />
         </Modal>

         <Drawer
            width={600}
            title="Add asset"
            onClose={() => setDrawer(false)}
            open={drawer}
            destroyOnClose
         >
            <AddAssetForm onClose={() => setDrawer(false)} />
         </Drawer>
      </Layout.Header>
   );
}
