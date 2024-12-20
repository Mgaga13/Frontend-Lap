import { useState } from "react";
import {
  FaTruck,
  FaShoppingBag,
  FaBoxOpen,
  FaCheckCircle,
} from "react-icons/fa";

const TrackOrder = () => {
  const [currentStep, setCurrentStep] = useState(2);

  const orders = [
    {
      id: 1,
      name: "John Doe",
      status: "Order Placed",
      date: "2024-01-15 10:30 AM",
    },
    {
      id: 2,
      name: "Jane Smith",
      status: "In Transit",
      date: "2024-01-16 09:15 AM",
    },
    {
      id: 3,
      name: "Mike Johnson",
      status: "Delivered",
      date: "2024-01-17 02:30 PM",
    },
  ];

  const getStatusColor = (status: any) => {
    switch (status) {
      case "Order Placed":
        return "text-yellow-600 bg-yellow-100";
      case "In Transit":
        return "text-blue-600 bg-blue-100";
      case "Delivered":
        return "text-green-600 bg-green-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-3xl w-full space-y-8 bg-white p-8 rounded-xl shadow-lg'>
        <div className='text-center'>
          <h2 className='text-3xl font-extrabold text-gray-900 mb-2'>
            Order Status Table
          </h2>
        </div>

        <div className='mt-8 overflow-x-auto'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                >
                  Order ID
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                >
                  Customer Name
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                >
                  Status
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                >
                  Date
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                    #{order.id}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {order.name}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {order.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
