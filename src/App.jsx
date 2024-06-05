import React, { useContext } from "react";

import { CryptoContextProvider } from "./context/crypto-context";

import AppLayout from "./components/layout/AppLayout";

import "./index.css";

export default function App() {
   return (
      <CryptoContextProvider>
         <AppLayout />
      </CryptoContextProvider>
   );
}
