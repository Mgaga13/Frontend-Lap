import axios from "axios";
import React, { useEffect, useState } from "react";

const ProductAdmin = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Laptop",
      category: "Electronics",
      price: 1000,
      quantity: 50,
    },
    {
      id: 2,
      name: "T-shirt",
      category: "Clothing",
      price: 20,
      quantity: 200,
    },
  ]);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });
  const [editingProductId, setEditingProductId] = useState(null);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (editingProductId) {
      setProducts((prevProducts: any) =>
        prevProducts.map((product: any) =>
          product.id === editingProductId
            ? { ...product, ...formData }
            : product
        )
      );
      setEditingProductId(null);
    } else {
      setProducts((prevProducts: any) => [
        ...prevProducts,
        { id: Date.now(), ...formData },
      ]);
    }
    setFormData({ name: "", category: "", price: "", quantity: "" });
  };

  const handleEdit = (product: any) => {
    setFormData(product);
    setEditingProductId(product.id);
  };

  const handleDelete = (id: any) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
  };

  return (
    <div className='p-6 bg-gray-100'>
      <h1 className='text-2xl font-bold mb-4'>Product Management</h1>
      <form onSubmit={handleSubmit} className='grid gap-4 mb-6'>
        <input
          type='text'
          name='name'
          placeholder='Product Name'
          value={formData.name}
          onChange={handleChange}
          className='p-2 border rounded'
          required
        />
        <input
          type='text'
          name='category'
          placeholder='Category'
          value={formData.category}
          onChange={handleChange}
          className='p-2 border rounded'
          required
        />
        <input
          type='number'
          name='price'
          placeholder='Price'
          value={formData.price}
          onChange={handleChange}
          className='p-2 border rounded'
          required
        />
        <input
          type='number'
          name='quantity'
          placeholder='Quantity'
          value={formData.quantity}
          onChange={handleChange}
          className='p-2 border rounded'
          required
        />
        <button
          type='submit'
          className='p-2 bg-green-500 text-white rounded hover:bg-green-600'
        >
          {editingProductId ? "Update" : "Add"} Product
        </button>
      </form>
      <table className='w-full bg-white shadow rounded'>
        <thead className='bg-gray-200'>
          <tr>
            <th className='p-2'>Name</th>
            <th className='p-2'>Category</th>
            <th className='p-2'>Price</th>
            <th className='p-2'>Quantity</th>
            <th className='p-2'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className='hover:bg-gray-100'>
              <td className='p-2 border'>{product.name}</td>
              <td className='p-2 border'>{product.category}</td>
              <td className='p-2 border'>{product.price}</td>
              <td className='p-2 border'>{product.quantity}</td>
              <td className='p-2 border'>
                <button
                  onClick={() => handleEdit(product)}
                  className='p-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 mr-2'
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className='p-1 bg-red-500 text-white rounded hover:bg-red-600'
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ProductAdmin;
