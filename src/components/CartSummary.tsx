import React from "react";
import {
  useCreateCod,
  useCreatePayment,
} from "../services/react-query/query/payment";
import { formatVND } from "../utils/formatprice";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface CartSummaryProps {
  subtotal: number;
  cartItem: any;
  refetch: any;
  setCartItem: any;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  subtotal,
  cartItem,
  refetch,
  setCartItem,
}) => {
  const router = useNavigate();
  const { mutate: createPaymentZalo } = useCreatePayment();
  const { mutate: createCod } = useCreateCod();
  const createPayment = () => {
    if (cartItem.length === 0) {
      toast.info("Vui lòng chọn sản phẩm để thanh toán");
    } else {
      createPaymentZalo(
        {
          cartItem: cartItem,
        },
        {
          onSuccess: (data) => {
            console.log(data);
            location.href = data.paymentUrl;
          },
          onError: () => {
            toast.error(
              "Sản phẩm không đủ số lượng mua vui lòng chọn lại số lượng"
            );
          },
        }
      );
    }
  };

  const handleCashOnDelivery = () => {
    // Logic cho Thanh toán khi nhận hàng
    if (cartItem.length === 0) {
      toast.info("Vui lòng chọn sản phẩm để thanh toán");
    } else {
      createCod(
        {
          cartItem: cartItem,
        },
        {
          onSuccess: (data) => {
            toast.success(
              "Đơn hàng của bạn đã được ghi nhận, vui lòng thanh toán khi nhận hàng!"
            );
            setCartItem([]);
            refetch();
            // router("/user/order");
          },
          onError: () => {
            toast.error(
              "Sản phẩm không đủ số lượng mua vui lòng chọn lại số lượng"
            );
          },
        }
      );
    }
  };

  return (
    <div className='bg-white rounded-lg shadow p-6'>
      <h2 className='text-lg font-medium text-gray-900 mb-4'>
        {/* Tóm tắt đơn hàng */}
      </h2>
      <div className='space-y-4'>
        <div className='flex justify-between'>
          {/* <span className='text-gray-600'>Tổng phụ</span> */}
          {/* <span className='text-gray-900'>{subtotal} VND</span> */}
        </div>
        <div className='border-t pt-4'>
          <div className='flex justify-between'>
            <span className='text-lg font-medium text-gray-900'>Tổng cộng</span>
            <span className='text-lg font-medium text-gray-900'>
              {formatVND(subtotal)}
            </span>
          </div>
        </div>
        <button
          onClick={createPayment}
          className='w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200'
        >
          Thanh toán
        </button>
        <button
          onClick={handleCashOnDelivery}
          className='w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 mt-4'
        >
          Thanh toán khi nhận hàng
        </button>
      </div>
      <ToastContainer position='top-center' autoClose={5000} />
    </div>
  );
};

export default CartSummary;
