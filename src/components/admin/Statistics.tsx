import React, { useState, useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import {
  getStatisticRevenue,
  getStatisticSelling,
} from "../../services/react-query/query/statistic";
import { formatVND } from "../../utils/formatprice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function Statistics() {
  const today = new Date();
  const threeDaysAgo = new Date(today);
  threeDaysAgo.setDate(today.getDate() + 1 - 3);

  const [startDate, setStartDate] = useState(
    threeDaysAgo.toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState(today.toISOString().split("T")[0]);
  const { data: statisticDay, refetch } = getStatisticRevenue({
    startDate,
    endDate,
  });
  const { data: statisticTopSell, refetch: topQuatitySell } =
    getStatisticSelling({
      limit: 5,
      startDate,
      endDate,
    });
  useEffect(() => {
    refetch();
    topQuatitySell();
  }, [startDate, endDate]);

  const labelSalesProduct = statisticTopSell?.map((value: any) =>
    value.productName.length > 50
      ? value.productName.substring(0, 50) + "..."
      : value.productName
  );
  const dataSalesProduct = statisticTopSell?.map(
    (value: any) => value.totalQuantity
  );

  const productSalesData = {
    labels: labelSalesProduct,
    datasets: [
      {
        label: "Products Sold",
        data: dataSalesProduct,
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className='p-6 bg-gray-100'>
      <h1 className='text-2xl font-bold mb-4'>Thống kê</h1>

      <div className='flex flex-col sm:flex-row gap-4 mb-6'>
        <div className='flex flex-col'>
          <label htmlFor='startDate' className='mb-2 font-medium'>
            Ngày bắt đầu
          </label>
          <input
            id='startDate'
            type='date'
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className='border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>

        <div className='flex flex-col'>
          <label htmlFor='endDate' className='mb-2 font-medium'>
            Ngày kết thúc
          </label>
          <input
            id='endDate'
            type='date'
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className='border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>
      </div>

      <div className='mb-6'>
        <h2 className='text-xl font-semibold mb-2'>Sản phẩm bán chạy</h2>
        <div style={{ width: "400px", height: "400px", margin: "0 auto" }}>
          <Pie data={productSalesData} options={{ responsive: true }} />
        </div>
      </div>

      <div className='grid gap-4'>
        <div className='p-4 bg-white shadow rounded'>
          <h3 className='text-lg font-medium'>Tổng đơn hàng</h3>
          <p className='text-2xl font-bold'>{statisticDay?.totalOrders}</p>
        </div>
        <div className='p-4 bg-white shadow rounded'>
          <h3 className='text-lg font-medium'>Doanh thu</h3>
          <p className='text-2xl font-bold'>
            {formatVND(statisticDay?.totalRevenue)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
