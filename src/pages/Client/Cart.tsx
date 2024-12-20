import { FiTrash2 } from "react-icons/fi";
import {
  useEditCart,
  useGetListCart,
  useRemoveCart,
} from "../../services/react-query/query/cart"; // API hook
import { useState } from "react";
import CartSummary from "../../components/CartSummary"; // Import component tóm tắt đơn hàng

const Cart = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedItems, setSelectedItems] = useState<number[]>([]); // Thêm state để theo dõi item được chọn

  const {
    data: ListCart,
    isLoading,
    refetch,
    isFetching,
  } = useGetListCart({
    page,
    limit,
  });
  const { mutate: updateQuantityCart } = useEditCart();
  const { mutate: removeItemCart } = useRemoveCart();

  const totalPrice = () => {
    return ListCart?.datas[0]?.cartItems?.reduce(
      (total: number, item: any) =>
        selectedItems.includes(item.id) // Chỉ tính những sản phẩm được chọn
          ? total + item.product.price * item.quantity
          : total,
      0
    );
  };
  const handelRemove = (item: any) => {
    if (item) {
      removeItemCart(
        {
          cartId: item.id,
          productId: item.product.id,
        },
        {
          onSuccess: () => {
            refetch();
          },
        }
      );
    }
  };

  const increamQuantity = (item: any) => {
    if (item) {
      console.log(ListCart);
      updateQuantityCart(
        {
          cartId: ListCart.datas[0].id,
          productId: item.product.id,
          status: "increment",
        },
        {
          onSuccess: () => {
            refetch();
          },
        }
      );
    }
  };

  const decreamQuantity = (item: any) => {
    if (item && item.quantity > 1) {
      updateQuantityCart(
        {
          cartId: ListCart.datas[0].id,
          productId: item.product.id,
          status: "decrement",
        },
        {
          onSuccess: () => {
            refetch();
          },
        }
      );
    }
  };

  const toggleSelectItem = (itemId: number) => {
    setSelectedItems(
      (prevSelectedItems) =>
        prevSelectedItems.includes(itemId)
          ? prevSelectedItems.filter((id) => id !== itemId) // Bỏ chọn nếu đã chọn
          : [...prevSelectedItems, itemId] // Thêm vào danh sách chọn
    );
  };

  return (
    <div className='min-h-screen bg-gray-100 pt-20'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <h1 className='text-3xl font-bold text-gray-900 mb-8'>Giỏ Hàng</h1>

        <div className='flex flex-col lg:flex-row gap-8'>
          <div className='lg:w-2/3'>
            <div className='bg-white rounded-lg shadow'>
              {ListCart?.datas[0]?.cartItems?.map((item: any) => (
                <div
                  key={item.id}
                  className='p-6 border-b border-gray-200 last:border-b-0'
                >
                  <div className='flex items-center'>
                    <input
                      type='checkbox'
                      checked={selectedItems.includes(item.id)} // Kiểm tra xem sản phẩm có được chọn không
                      onChange={() => toggleSelectItem(item.id)} // Thay đổi trạng thái chọn
                      className='mr-4'
                    />
                    <img
                      src={item.product.image[0]} // Lấy ảnh đầu tiên
                      alt={item.product.name}
                      className='w-24 h-24 object-cover rounded'
                    />
                    <div className='ml-6 flex-1'>
                      <h2 className='text-lg font-medium text-gray-900'>
                        {item.product.name}
                      </h2>
                      <div className='mt-1 flex items-center'>
                        <div className='flex items-center border rounded'>
                          <button
                            className='px-3 py-1 border-r hover:bg-gray-100'
                            onClick={() => decreamQuantity(item)}
                          >
                            -
                          </button>
                          <span className='px-3 py-1'>{item.quantity}</span>
                          <button
                            className='px-3 py-1 border-l hover:bg-gray-100'
                            onClick={() => increamQuantity(item)}
                          >
                            +
                          </button>
                        </div>
                        <span className='ml-4 text-gray-500'>
                          ${item.product.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <div className='ml-6'>
                      <button
                        onClick={() => handelRemove(item)}
                        className='text-red-500 hover:text-red-700'
                        aria-label='Xóa sản phẩm'
                      >
                        <FiTrash2 className='h-5 w-5' />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='lg:w-1/3'>
            <CartSummary subtotal={totalPrice()} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
