import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Statistics() {
  const productSalesData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Products Sold",
        data: [50, 75, 150, 200, 250, 300],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const revenueData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Revenue ($)",
        data: [5000, 7500, 15000, 20000, 25000, 30000],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className='p-6 bg-gray-100'>
      <h1 className='text-2xl font-bold mb-4'>Statistics</h1>

      <div className='mb-6'>
        <h2 className='text-xl font-semibold mb-2'>Product Sales</h2>
        <Bar data={productSalesData} options={{ responsive: true }} />
      </div>

      <div className='mb-6'>
        <h2 className='text-xl font-semibold mb-2'>Revenue</h2>
        <Bar data={revenueData} options={{ responsive: true }} />
      </div>

      <div className='grid gap-4'>
        <div className='p-4 bg-white shadow rounded'>
          <h3 className='text-lg font-medium'>Total Products</h3>
          <p className='text-2xl font-bold'>150</p>
        </div>
        <div className='p-4 bg-white shadow rounded'>
          <h3 className='text-lg font-medium'>Total Sales</h3>
          <p className='text-2xl font-bold'>$45,000</p>
        </div>
        <div className='p-4 bg-white shadow rounded'>
          <h3 className='text-lg font-medium'>Total Orders</h3>
          <p className='text-2xl font-bold'>320</p>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
