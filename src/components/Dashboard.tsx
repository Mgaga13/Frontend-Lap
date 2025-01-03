import React, { useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import * as XLSX from "xlsx"; // Import thư viện xlsx
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
  const endDate = `${year + 1}-01-01`;
  return { startDate, endDate };
};

const Dashboard = () => {
  const currentYear = new Date().getFullYear();
  const { startDate, endDate } = getStartAndEndDate(currentYear);
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
  const exportProductSales = () => {
    const productsSheet = statisticTopSell.map((product: any) => ({
      "Tên sản phẩm": product.productName,
      "Số lượng bán": product.totalQuantity,
    }));
    const wb = XLSX.utils.book_new();
    const productsWs = XLSX.utils.json_to_sheet(productsSheet);
    XLSX.utils.book_append_sheet(wb, productsWs, "Sản phẩm bán chạy");
    XLSX.writeFile(wb, `SanPhamBanChay_${currentYear}.xlsx`);
  };

  const exportRevenue = () => {
    const revenueSheet = [
      { "Tổng đơn hàng": statisticDay?.totalOrders },
      { "Tổng doanh thu": formatVND(statisticDay?.totalRevenue) },
    ];
    const wb = XLSX.utils.book_new();
    const revenueWs = XLSX.utils.json_to_sheet(revenueSheet);
    XLSX.utils.book_append_sheet(wb, revenueWs, "Doanh thu");
    XLSX.writeFile(wb, `DoanhThu_${currentYear}.xlsx`);
  };

  const exportMonthlyRevenue = () => {
    const monthlyRevenueSheet = revenueData.labels.map(
      (label: string, index: number) => ({
        Tháng: label,
        "Doanh thu": revenueData.datasets[0].data[index],
      })
    );
    const wb = XLSX.utils.book_new();
    const monthlyRevenueWs = XLSX.utils.json_to_sheet(monthlyRevenueSheet);
    XLSX.utils.book_append_sheet(wb, monthlyRevenueWs, "Doanh thu 12 tháng");
    XLSX.writeFile(wb, `DoanhThu12Thang_${currentYear}.xlsx`);
  };

  return (
    <div className='p-6 bg-gray-100'>
      <div className='flex flex-col md:flex-row gap-6'>
        {/* Sản phẩm bán chạy */}
        <div className='flex-1 p-4 bg-white shadow rounded'>
          <div className='flex justify-between items-center'>
            <h2 className='text-xl font-semibold mb-4'>Sản phẩm bán chạy</h2>
            <button
              onClick={exportProductSales}
              className='px-2 py-1 bg-blue-600 text-white rounded text-sm'
            >
              Xuất Excel
            </button>
          </div>
          <div style={{ width: "100%", height: "300px" }}>
            <Pie data={productSalesData} options={{ responsive: true }} />
          </div>
        </div>

        {/* Thông tin doanh thu */}
        <div className='flex-1 p-4 bg-white shadow rounded'>
          <div className='flex justify-between items-center'>
            <h2 className='text-xl font-semibold mb-4'>Thông tin doanh thu</h2>
            <button
              onClick={exportRevenue}
              className='px-2 py-1 bg-blue-600 text-white rounded text-sm'
            >
              Xuất Excel
            </button>
          </div>
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

      {/* Doanh thu 12 tháng */}
      <div className='mt-6 p-4 bg-white shadow rounded'>
        <div className='flex justify-between items-center'>
          <h2 className='text-xl font-semibold mb-4'>Doanh thu 12 tháng</h2>
          <button
            onClick={exportMonthlyRevenue}
            className='px-2 py-1 bg-blue-600 text-white rounded text-sm'
          >
            Xuất Excel
          </button>
        </div>
        {isLoadingMonth ? (
          <div>Đang tải...</div>
        ) : (
          <div style={{ width: "900px", height: "600px", margin: "0 auto" }}>
            <Bar data={revenueData} options={{ responsive: true }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
