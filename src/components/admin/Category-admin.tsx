import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteConfirmation from "../../components/DeleteConfirmation";
import Modal from "../../components/Modal";
import { FiEdit2, FiSearch, FiTrash2 } from "react-icons/fi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
  useCreateCategory,
  useEditCategory,
  useGetListCategory,
  useRemoveCategory,
} from "../../services/react-query/query/category";
function CategoryAdmin() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: listData,
    isLoading,
    isFetching,
    refetch,
  } = useGetListCategory({
    page,
    limit,
    searchText: searchQuery,
  });

  const { mutate: createCate, isSuccess: isSuccessCreate } =
    useCreateCategory();

  const { mutate: editCate, isSuccess: isSuccessEdit } = useEditCategory();

  const { mutate: removeCate, isSuccess: getSuccess } = useRemoveCategory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<any>(null);
  const [name, setName] = useState("");
  const [editingUserId, setEditingUserId] = useState(null);

  const resetForm = () => {
    setName("");
    setEditingUserId(null);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingUserId) {
      editCate(
        { id: editingUserId, name: name },
        {
          onSuccess: () => {
            toast.success("Câp nhật thành công");
            resetForm();
            setIsModalOpen(false);
          },
        }
      );
    } else {
      createCate(
        { name },
        {
          onSuccess: () => {
            toast.success("Thêm mới thành công");
            resetForm();
            setIsModalOpen(false);
          },
        }
      );
    }
  };

  useEffect(() => {
    if (isSuccessCreate || isSuccessEdit) {
      setName("");
      refetch();
      setIsModalOpen(false);
    }
  }, [isSuccessCreate, isSuccessEdit]);

  useEffect(() => {
    refetch();
  }, [getSuccess]);

  const handleEdit = (cate: any) => {
    setName(cate.name);
    setEditingUserId(cate.id);
    setIsModalOpen(true);
  };

  const handleDelete = (cate: any) => {
    setUserToDelete(cate);
    setIsDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      const { id } = userToDelete;
      removeCate(id);
      toast.success("Xóa thành công!");
      refetch();
      setIsDeleteConfirmOpen(false);
    }
  };

  const cancelDelete = () => {
    setIsDeleteConfirmOpen(false);
  };

  const openModal = () => {
    setName("");
    setEditingUserId(null);
    setIsModalOpen(true);
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
      <div className='max-w-6xl'>
        <div className='bg-white rounded-lg shadow-lg p-6'>
          <div className='flex flex-col sm:flex-row justify-between items-center mb-6'>
            <h1 className='text-2xl font-bold text-gray-800 mb-4 sm:mb-0'>
              Quản lý thể loại sản phẩm
            </h1>
            <button
              onClick={openModal}
              className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors'
            >
              Thêm mới loại
            </button>
          </div>
          <div className='overflow-x-auto'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead>
                <tr>
                  <th className='px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    ID
                  </th>
                  <th className='px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Name
                  </th>
                  <th className='px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {listData?.datas.map((cate: any) => (
                  <tr key={cate.id}>
                    <td className='px-6 py-4 whitespace-nowrap'>{cate.id}</td>
                    <td className='px-6 py-4 whitespace-nowrap'>{cate.name}</td>
                    <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                      <button
                        onClick={() => handleEdit(cate)}
                        className='text-blue-600 hover:text-blue-900 mr-4'
                      >
                        <FiEdit2 className='inline-block' />
                      </button>
                      <button
                        onClick={() => handleDelete(cate)}
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
              First
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
              <span className='ml-1'>Previous</span>
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
                    <span className='mr-1'>Next</span>
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
                    Last
                  </button>

                  <div className='flex items-center text-sm text-gray-500 ml-4'>
                    Page {page} of {listData.meta.pageCount}
                  </div>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
      <Modal
        title={editingUserId ? "Sủa loại" : "Tạo mới loại"}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <form onSubmit={handleSubmit} className='grid gap-4'>
          <input
            type='text'
            name='name'
            placeholder='Name'
            onChange={(e) => setName(e.target.value)}
            value={name}
            className='p-2 border rounded'
            required
          />
          <button
            type='submit'
            className='p-2 bg-blue-500 text-white rounded hover:bg-blue-600'
          >
            {editingUserId ? "Sửa" : "Tạo"}
          </button>
        </form>
      </Modal>
      {isDeleteConfirmOpen && (
        <DeleteConfirmation
          message='Bạn có muốn xóa loại bàn phím này không?'
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
      <ToastContainer position='top-right' autoClose={5000} />
    </div>
  );
}

export default CategoryAdmin;
