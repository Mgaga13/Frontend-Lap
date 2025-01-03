import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import {
  useEditOrder,
  useGetListOrder,
} from "../../services/react-query/query/order";
import Modal from "../Modal";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { formatVND } from "../../utils/formatprice";
import { set } from "ramda";

const ORDER_STATUSES = [
  { value: 0, label: "Đang xử lý" },
  { value: 1, label: "Đang vận chuyển" },
  { value: 2, label: "Thành công" },
];

const getStatusClass = (value: any) => {
  switch (value) {
    case 0:
      return "text-yellow-500"; // Pending
    case 1:
      return "text-blue-500"; // Delivery
    case 2:
      return "text-green-500"; // Success
    default:
      return "text-gray-500"; // Unknown
  }
};
const getStatusLabel = (value: any) => {
  const status = ORDER_STATUSES.find((status) => status.value === value);
  return status ? status.label : "Unknown";
};
const OrderAdmin = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [statusFilter, setStatusFilter] = useState(-1); // -1: Không lọc
  const [status, setStatus] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOrderDetailId, setEditingOrderDetailId] = useState<
    string | null
  >(null);

  const {
    data: listData,
    isLoading,
    refetch,
  } = useGetListOrder({ page, limit, status: statusFilter });

  const { mutate: editOrder } = useEditOrder();

  const handleStatusFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setStatusFilter(parseInt(e.target.value));
  };

  useEffect(() => {
    refetch();
  }, [statusFilter]);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingOrderDetailId) return;
    editOrder(
      { orderId: editingOrderDetailId, status },
      {
        onSuccess: () => {
          toast.success("Trạng thái đơn hàng đã được cập nhật.");
          resetForm();
          refetch();
        },
        onError: () => {
          toast.error("Lỗi khi cập nhật trạng thái.");
        },
      }
    );
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setStatus(parseInt(value));
  };

  const handleEdit = (orderDetail: any) => {
    setStatus(orderDetail.status);
    setEditingOrderDetailId(orderDetail.id);
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setStatus(0);
    setEditingOrderDetailId(null);
    setIsModalOpen(false);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= (listData?.meta?.pageCount || 1)) {
      setPage(newPage);
    }
  };

  const pages = Array.from(
    { length: listData?.meta?.pageCount || 1 },
    (_, i) => i + 1
  );

  return (
    <div className='min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8'>
      <div className='max-w-6xl mx-auto'>
        <div className='bg-white rounded-lg shadow-lg p-6'>
          <h1 className='text-2xl font-bold text-gray-800 mb-6'>
            Quản lý đơn hàng
          </h1>

          <div className='mb-4'>
            <label htmlFor='statusFilter' className='mr-2 text-gray-700'>
              Lọc theo trạng thái:
            </label>
            <select
              id='statusFilter'
              value={statusFilter}
              onChange={handleStatusFilterChange}
              className='p-2 border rounded'
            >
              <option value='-1'>Tất cả</option>
              {ORDER_STATUSES.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>

          {isLoading ? (
            <p>Đang tải...</p>
          ) : (
            <>
              <div className='overflow-x-auto'>
                <table className='min-w-full divide-y divide-gray-200'>
                  <thead>
                    <tr>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                        Tên khách hàng
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                        Tên sản phẩm
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                        Tổng tiền
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                        Trạng thái
                      </th>
                      <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase'>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className='bg-white divide-y divide-gray-200'>
                    {listData?.datas.map((order: any) => (
                      <tr key={order.id}>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                          {order.order?.user?.name ?? ""}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                          {order.product?.name ?? ""}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                          {formatVND(order.price)}
                        </td>
                        <td
                          className={`px-6 py-4 whitespace-nowrap text-sm ${getStatusClass(
                            order.status
                          )}`}
                        >
                          {getStatusLabel(order.status)}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-right text-sm'>
                          <button
                            onClick={() => handleEdit(order)}
                            className='text-blue-600 hover:text-blue-900'
                          >
                            <FiEdit2 className='inline-block' />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <nav className='flex justify-center items-center space-x-2 py-4'>
                <button
                  onClick={() => handlePageChange(1)}
                  disabled={page === 1}
                  className='px-3 py-2 rounded-md text-sm bg-white text-gray-700 hover:bg-gray-50'
                >
                  Trang đầu
                </button>
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className='px-3 py-2 rounded-md text-sm bg-white text-gray-700 hover:bg-gray-50'
                >
                  <FaChevronLeft />
                </button>
                {pages.map((pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`px-4 py-2 rounded-md text-sm ${
                      pageNumber === page
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {pageNumber}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === listData?.meta?.pageCount}
                  className='px-3 py-2 rounded-md text-sm bg-white text-gray-700 hover:bg-gray-50'
                >
                  <FaChevronRight />
                </button>
                <button
                  onClick={() =>
                    handlePageChange(listData?.meta?.pageCount || 1)
                  }
                  disabled={page === listData?.meta?.pageCount}
                  className='px-3 py-2 rounded-md text-sm bg-white text-gray-700 hover:bg-gray-50'
                >
                  Trang cuối
                </button>
              </nav>
            </>
          )}
        </div>
      </div>

      <Modal title='Sửa đơn hàng' isOpen={isModalOpen} onClose={resetForm}>
        <form onSubmit={handleSubmit} className='grid gap-4'>
          <select
            name='status'
            value={status}
            onChange={handleChange}
            className='p-2 border rounded'
            required
          >
            {ORDER_STATUSES.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
          <button
            type='submit'
            className='p-2 bg-blue-500 text-white rounded hover:bg-blue-600'
          >
            Sửa đơn hàng
          </button>
        </form>
      </Modal>

      <ToastContainer position='top-right' autoClose={5000} />
    </div>
  );
};

export default OrderAdmin;
