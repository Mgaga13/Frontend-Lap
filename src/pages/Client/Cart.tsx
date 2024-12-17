import { FiTrash2 } from "react-icons/fi";

const Cart = () => {
  const cartItems = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 199.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    },
    {
      id: 2,
      name: "Smart Watch Series 5",
      price: 299.99,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12",
    },
    {
      id: 3,
      name: "Wireless Gaming Mouse",
      price: 79.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1527814050087-3793815479db",
    },
  ];

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const shipping = 10.0;
  const tax = calculateSubtotal() * 0.1;

  return (
    <div className='min-h-screen bg-gray-100 pt-20'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <h1 className='text-3xl font-bold text-gray-900 mb-8'>Shopping Cart</h1>

        <div className='flex flex-col lg:flex-row gap-8'>
          {/* Cart Items */}
          <div className='lg:w-2/3'>
            <div className='bg-white rounded-lg shadow'>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className='p-6 border-b border-gray-200 last:border-b-0'
                >
                  <div className='flex items-center'>
                    <img
                      src={item.image}
                      alt={item.name}
                      className='w-24 h-24 object-cover rounded'
                    />
                    <div className='ml-6 flex-1'>
                      <h2 className='text-lg font-medium text-gray-900'>
                        {item.name}
                      </h2>
                      <div className='mt-1 flex items-center'>
                        <div className='flex items-center border rounded'>
                          <button className='px-3 py-1 border-r hover:bg-gray-100'>
                            -
                          </button>
                          <span className='px-3 py-1'>{item.quantity}</span>
                          <button className='px-3 py-1 border-l hover:bg-gray-100'>
                            +
                          </button>
                        </div>
                        <span className='ml-4 text-gray-500'>
                          ${item.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <div className='ml-6'>
                      <button
                        className='text-red-500 hover:text-red-700'
                        aria-label='Remove item'
                      >
                        <FiTrash2 className='h-5 w-5' />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className='lg:w-1/3'>
            <div className='bg-white rounded-lg shadow p-6'>
              <h2 className='text-lg font-medium text-gray-900 mb-4'>
                Order Summary
              </h2>
              <div className='space-y-4'>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Subtotal</span>
                  <span className='text-gray-900'>
                    ${calculateSubtotal().toFixed(2)}
                  </span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Shipping</span>
                  <span className='text-gray-900'>${shipping.toFixed(2)}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Tax</span>
                  <span className='text-gray-900'>${tax.toFixed(2)}</span>
                </div>
                <div className='border-t pt-4'>
                  <div className='flex justify-between'>
                    <span className='text-lg font-medium text-gray-900'>
                      Total
                    </span>
                    <span className='text-lg font-medium text-gray-900'>
                      ${(calculateSubtotal() + shipping + tax).toFixed(2)}
                    </span>
                  </div>
                </div>
                <button className='w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200'>
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cart;
