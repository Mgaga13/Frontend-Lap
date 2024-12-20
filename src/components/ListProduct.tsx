import { useEffect, useState } from "react";
import FilterBar from "./FilterBar";
import { useGetListProduct } from "../services/react-query/query/product";
import ProductCard from "./ProductCard";

const ListProduct = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [filters, setFilters] = useState({
    category: "",
    brand: "",
    priceRange: "all",
  });
  const {
    data: ListProduct,
    isLoading,
    refetch,
    isFetching,
  } = useGetListProduct({
    page,
    limit,
    searchText: "",
  });
  const handleFilterChange = (newFilters: {
    category?: string;
    brand?: string;
    priceRange?: string;
  }) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
    // Reset to the first page on filter change
    setPage(1);
  };
  // useEffect(() => {
  //   refetch();
  // }, [filters, page, limit, refetch]);
  return (
    <section className='py-24 content'>
      <aside className='lg:col-span-1'>
        {/* <FilterBar onFilter={handleFilterChange} /> */}
      </aside>
      <div className='mx-auto max-w-7xl'>
        <h2 className='font-manrope font-bold text-3xl min-[400px]:text-4xl text-black mb-8 max-lg:text-center'>
          Products
        </h2>
      </div>
      <div className='container mx-auto px-4 py-8'>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
          {ListProduct?.datas?.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
export default ListProduct;
