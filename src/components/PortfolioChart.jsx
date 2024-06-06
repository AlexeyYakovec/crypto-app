import React, { useContext } from "react";
import { Pie } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import CryptoContext from "../context/crypto-context";

export default function PortfolioChart() {
   const { assets } = useContext(CryptoContext);

   const data = {
      labels: assets.map((asset) => asset.name),
      datasets: [
         {
            label: "$",
            data: assets.map((asset) => asset.totalAmount),
            backgroundColor: [
               "rgba(255, 99, 132, 0.5)",
               "rgba(54, 162, 235, 0.5)",
               "rgba(255, 206, 86, 0.5)",
               "rgba(75, 192, 192, 0.5)",
               "rgba(153, 102, 255, 0.5)",
               "rgba(255, 159, 64, 0.5)",
            ],
         },
      ],
   };
   return (
      <div
         style={{
            display: "flex",
            marginBottm: "1rem",
            justifyContent: "center",
            height: "400px",
         }}
      >
         <Pie data={data} />
      </div>
   );
}
