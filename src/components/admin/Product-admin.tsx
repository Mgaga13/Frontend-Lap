import React, { useEffect, useState } from "react";
import {
  useCreateUser,
  useEditUser,
  useGetListUser,
  useRemoveUser,
} from "../../services/react-query/query/user";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteConfirmation from "../../components/DeleteConfirmation";
import Modal from "../../components/Modal";
import { FiEdit2, FiSearch, FiTrash2 } from "react-icons/fi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
  useGetListProduct,
  useRemoveProduct,
} from "../../services/react-query/query/product";
import { useNavigate } from "react-router-dom";
import { formatVND } from "../../utils/formatprice";

interface FormData {
  price: string;
  oldprice: string;
  name: string;
  image: File | null; // Either a File object or null
  description: string;
  specification: string;
  quantity: string;
}
function ProductAdmin() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: listData,
    isLoading,
    isFetching,
    refetch,
  } = useGetListProduct({
    page,
    limit,
    searchText: searchQuery,
  });
  const {
    mutate: removeProduct,
    data: videoData,
    isSuccess: getSuccess,
  } = useRemoveProduct();
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<any>(null);

  const handleDelete = (user: any) => {
    setUserToDelete(user);
    setIsDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      const { id } = userToDelete;
      removeProduct(id, {
        onSuccess: () => {
          toast.success("Xóa thành công!");
          refetch();
          setIsDeleteConfirmOpen(false);
        },
      });
    }
  };

  const cancelDelete = () => {
    setIsDeleteConfirmOpen(false);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= listData?.meta?.pageCount) {
      setPage(newPage);
    }
  };
  const pages = Array.from(
    { length: listData?.meta?.pageCount ?? 10 },
    (_, i) => i + 1
  );
  return (
    <div className='min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8'>
      <div className='max-w-6xl mx-auto'>
        <div
          className='bg-white rounded-lg shadow-lg p-6'
          style={{ maxWidth: "67rem" }}
        >
          <div className='flex flex-col sm:flex-row justify-between items-center mb-6'>
            <h1 className='text-2xl font-bold text-gray-800 mb-4 sm:mb-0'>
              Quản lý sản phẩm
            </h1>
            <button
              onClick={() => navigate("/dashboard/products/create-product")}
              className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors'
            >
              Thêm mới sản phẩm
            </button>
          </div>

          <div className='relative mb-6'>
            <FiSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
            <input
              type='text'
              placeholder='Search product...'
              className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className='overflow-x-auto'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead>
                <tr>
                  <th className='px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Tên sản phẩm
                  </th>
                  <th className='px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Giá
                  </th>
                  <th className='px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Giá Cũ
                  </th>
                  <th className='px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Mô tả
                  </th>
                  <th className='px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Hình ảnh
                  </th>
                  <th className='px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Số lượng
                  </th>
                  <th className='px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Thông số kỹ thuật
                  </th>
                  <th className='px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {listData?.datas.map((product: any) => (
                  <tr key={product.id}>
                    <td className='px-6 py-4  max-w-[200px] truncate whitespace-nowrap text-sm text-gray-500'>
                      {product.name}
                    </td>
                    <td className='px-6 py-4  max-w-[200px] truncate whitespace-nowrap text-sm text-gray-500'>
                      {formatVND(product.price)}
                    </td>
                    <td className='px-6 py-4  max-w-[200px] truncate whitespace-nowrap text-sm text-gray-500'>
                      {formatVND(product.oldprice)}
                    </td>
                    <td className='px-6 py-4 max-w-[200px] truncate whitespace-nowrap text-sm text-gray-500'>
                      {product.description}
                    </td>
                    <td className='px-6 py-4 max-w-[200px] truncate whitespace-nowrap text-sm text-gray-500'>
                      {product.image}
                    </td>
                    <td className='px-6 py-4 max-w-[200px] truncate whitespace-nowrap text-sm text-gray-500'>
                      {product.quantity}
                    </td>
                    <td className='px-6 py-4 max-w-[200px] truncate whitespace-nowrap text-sm text-gray-500'>
                      {JSON.stringify(product.specification)}
                    </td>
                    <td className='px-6 py-4 max-w-[200px] truncate whitespace-nowrap text-right text-sm font-medium'>
                      <button
                        onClick={() => {
                          navigate(`/dashboard/products/edit/${product.id}`);
                        }}
                        className='text-blue-600 hover:text-blue-900 mr-4'
                      >
                        <FiEdit2 className='inline-block' />
                      </button>
                      <button
                        onClick={() => handleDelete(product)}
                        className='text-red-600 hover:text-red-900'
                      >
                        <FiTrash2 className='inline-block' />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <nav
            className='flex items-center justify-center space-x-2 py-4'
            aria-label='Pagination'
          >
            <button
              onClick={() => handlePageChange(1)}
              disabled={page === 1}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                page === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              aria-label='Go to first page'
            >
              Trang đầu
            </button>

            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                page === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              aria-label='Previous page'
            >
              <FaChevronLeft className='h-4 w-4' />
              <span className='ml-1'>Lùi Trang</span>
            </button>

            <div className='hidden sm:flex space-x-2'>
              {isLoading ? (
                ""
              ) : (
                <>
                  {pages.map((pageNumber) => (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`px-4 py-2 rounded-md text-sm font-medium ${
                        pageNumber === page
                          ? "bg-blue-600 text-white"
                          : "bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                      aria-label={`Page ${pageNumber}`}
                      aria-current={pageNumber === page ? "page" : undefined}
                    >
                      {pageNumber}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === listData.meta.pageCount}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                      page === listData.meta.pageCount
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                    aria-label='Next page'
                  >
                    <span className='mr-1'>Tiến Trang</span>
                    <FaChevronRight className='h-4 w-4' />
                  </button>

                  <button
                    onClick={() => handlePageChange(listData.meta.pageCount)}
                    disabled={page === listData.meta.pageCount}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      page === listData.meta.pageCount
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                    aria-label='Go to last page'
                  >
                    Trang cuối
                  </button>

                  <div className='flex items-center text-sm text-gray-500 ml-4'>
                    Trang {page} trong {listData.meta.pageCount}
                  </div>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
      {isDeleteConfirmOpen && (
        <DeleteConfirmation
          message='Bạn có muốn xóa sản phẩm này không?'
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}

      <ToastContainer position='top-right' autoClose={5000} />
    </div>
  );
}

export default ProductAdmin;
