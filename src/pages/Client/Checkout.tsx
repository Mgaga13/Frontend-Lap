import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Chuyển hướng sau 5 giây
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer); // Dọn dẹp nếu component bị hủy
  }, [navigate]);

  return (
    <div className='content flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-md text-center'>
        <h1 className='text-2xl font-bold text-green-600'>
          Thanh toán thành công!
        </h1>
        <p className='mt-4 text-gray-600'>
          Cảm ơn bạn đã mua hàng. Bạn sẽ được chuyển hướng về trang chủ trong
          giây lát...
        </p>
      </div>
    </div>
  );
};

export default Checkout;
