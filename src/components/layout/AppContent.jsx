import React from "react";
import { Layout } from "antd";

const contentStyle = {
   textAlign: "center",
   minHeight: "calc(100vh - 60px)",
   color: "#fff",
   backgroundColor: "#24293e",
};

export default function AppContent() {
   return <Layout.Content style={contentStyle}></Layout.Content>;
}
