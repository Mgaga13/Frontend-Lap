import React, { useState, useEffect } from "react";
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
import { getStatisticRevenue } from "../../services/react-query/query/statistic";
import { formatVND } from "../../utils/formatprice";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
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

  useEffect(() => {
    refetch();
  }, [startDate, endDate]);

  // Dữ liệu cho biểu đồ cột
  const chartData = {
    labels: [statisticDay?.totalOrders], // Các nhãn
    datasets: [
      {
        label: "Thống kê",
        data: [statisticDay?.totalRevenue], // Dữ liệu
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Màu nền của cột
        borderColor: "rgba(75, 192, 192, 1)", // Màu viền của cột
        borderWidth: 1,
      },
    ],
  };

  // Cấu hình cho biểu đồ
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Thống kê đơn hàng và doanh thu",
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            if (context.dataset.label === "Thống kê") {
              return context.raw !== null ? formatVND(context.raw) : "";
            }
            return context.raw;
          },
        },
      },
    },
  };

  // Xử lý xuất Excel
  const exportToExcel = () => {
    const data = [
      {
        "Ngày bắt đầu": startDate,
        "Ngày kết thúc": endDate,
        "Tổng đơn hàng": statisticDay?.totalOrders,
        "Doanh thu": statisticDay ? formatVND(statisticDay.totalRevenue) : "0",
      },
    ];

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Statistics");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, `Statistics_${startDate}_to_${endDate}.xlsx`);
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

      {/* Nút xuất Excel */}
      <button
        onClick={exportToExcel}
        className='mb-6 bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600'
      >
        Xuất Excel
      </button>

      {/* Hiển thị biểu đồ cột */}
      <div className='mb-6' style={{ maxWidth: "600px", margin: "0 auto" }}>
        <Bar data={chartData} options={options} />
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
