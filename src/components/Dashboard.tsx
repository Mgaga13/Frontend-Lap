import React, { useEffect } from "react";
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
  getStatisticMonth,
  getStatisticRevenue,
  getStatisticSelling,
} from "../services/react-query/query/statistic";
import { formatVND } from "../utils/formatprice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);
const getStartAndEndDate = (year: any) => {
  const startDate = `${year}-01-01`;
  const endDate = `${year}-12-31`;
  return { startDate, endDate };
};
const Dashboard = () => {
  const currentYear = new Date().getFullYear(); // Năm hiện tại
  const { startDate, endDate } = getStartAndEndDate(currentYear); // Ngày bắt đầu và kết thúc năm hiện tại

  const { data: statisticDay, refetch } = getStatisticRevenue({
    startDate,
    endDate,
  });
  const { data: revenueData, isLoading: isLoadingMonth } = getStatisticMonth({
    startYear: currentYear.toString(),
    endYear: currentYear.toString(),
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
  }, []);

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
      <div className='flex flex-col md:flex-row gap-6'>
        {/* Biểu đồ */}
        <div className='flex-1 p-4 bg-white shadow rounded'>
          <h2 className='text-xl font-semibold mb-4'>Sản phẩm bán chạy</h2>
          <div style={{ width: "100%", height: "300px" }}>
            <Pie data={productSalesData} options={{ responsive: true }} />
          </div>
        </div>

        {/* Thông tin */}
        <div className='flex-1 p-4 bg-white shadow rounded'>
          <h2 className='text-xl font-semibold mb-4'>Thông tin doanh thu</h2>
          <div className='grid gap-4'>
            <div className='p-4 bg-gray-50 shadow rounded'>
              <h3 className='text-lg font-medium'>Tổng đơn hàng</h3>
              <p className='text-2xl font-bold'>{statisticDay?.totalOrders}</p>
            </div>
            <div className='p-4 bg-gray-50 shadow rounded'>
              <h3 className='text-lg font-medium'>Doanh thu</h3>
              <p className='text-2xl font-bold'>
                {formatVND(statisticDay?.totalRevenue)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-3'>
        <div className='mb-6'>
          <h2 className='text-xl font-semibold mb-2'>Doanh thu 12 tháng</h2>
          {isLoadingMonth ? (
            <div>loading...</div>
          ) : (
            <div style={{ width: "900px", height: "600px", margin: "0 auto" }}>
              <Bar data={revenueData} options={{ responsive: true }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
