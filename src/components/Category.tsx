import { Link } from "react-router-dom";

const Category = () => {
  const categories = [
    { id: 1, name: "Điện thoại", image: "https://via.placeholder.com/150" },
    { id: 2, name: "Laptop", image: "https://via.placeholder.com/150" },
    { id: 3, name: "Đồng hồ", image: "https://via.placeholder.com/150" },
    { id: 4, name: "Tai nghe", image: "https://via.placeholder.com/150" },
    { id: 5, name: "Phụ kiện", image: "https://via.placeholder.com/150" },
  ];

  return (
    <section className='py-10 content'>
      <div className='container mx-auto '>
        <h2 className='text-2xl font-bold text-gray-900 mb-6'>
          Danh mục nổi bật
        </h2>
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6'>
          {categories.map((category) => (
            <Link to={`/category/${category.id}`} key={category.id}>
              <div className='text-center bg-white p-4 rounded-lg shadow hover:shadow-md transition'>
                <img
                  src={category.image}
                  alt={category.name}
                  className='w-full h-24 object-cover mb-2'
                />
                <h3 className='text-lg font-medium'>{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Category;
