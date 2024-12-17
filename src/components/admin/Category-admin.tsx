import axios from "axios";
import { useEffect, useState } from "react";

const CategoryAdmin = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "Electronics" },
    { id: 2, name: "Clothing" },
  ]);
  const [formData, setFormData] = useState({ name: "" });
  const [editingCategoryId, setEditingCategoryId] = useState(null);

  const handleChange = (e: any) => {
    setFormData({ ...formData, name: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (editingCategoryId) {
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.id === editingCategoryId
            ? { ...category, name: formData.name }
            : category
        )
      );
      setEditingCategoryId(null);
    } else {
      setCategories((prevCategories) => [
        ...prevCategories,
        { id: Date.now(), name: formData.name },
      ]);
    }
    setFormData({ name: "" });
  };

  const handleEdit = (category: any) => {
    setFormData(category);
    setEditingCategoryId(category.id);
  };

  const handleDelete = (id: any) => {
    setCategories((prevCategories) =>
      prevCategories.filter((category) => category.id !== id)
    );
  };

  return (
    <div className='p-6 bg-gray-100'>
      <h1 className='text-2xl font-bold mb-4'>Category Management</h1>
      <form onSubmit={handleSubmit} className='flex gap-4 mb-6'>
        <input
          type='text'
          name='name'
          placeholder='Category Name'
          value={formData.name}
          onChange={handleChange}
          className='p-2 border rounded'
          required
        />
        <button
          type='submit'
          className='p-2 bg-green-500 text-white rounded hover:bg-green-600'
        >
          {editingCategoryId ? "Update" : "Add"} Category
        </button>
      </form>
      <ul className='list-disc pl-6'>
        {categories.map((category) => (
          <li key={category.id} className='flex justify-between items-center'>
            {category.name}
            <div>
              <button
                onClick={() => handleEdit(category)}
                className='p-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 mr-2'
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(category.id)}
                className='p-1 bg-red-500 text-white rounded hover:bg-red-600'
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default CategoryAdmin;
