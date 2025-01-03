import { useCallback, useContext, useState } from "react";
import debounce from "lodash.debounce";
import ProductCard from "./ProductCard";
import FilterBar from "./FilterBar";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  useGetProductAll,
  useGetTopFiveSellProduct,
} from "../services/react-query/query/product";
import { SearchContext } from "./Layout";
import TopSellCard from "./TopSellCard";
import TopSellingProducts from "./TopSellCard";

const ListProduct = () => {
  const { search, setTotalCart } = useContext(SearchContext);
  const router = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(16);
  const [filters, setFilters] = useState({
    category: "",
    brand: "",
    priceRange: "all",
  });

  const debouncedSetFilters = useCallback(
    debounce((newFilters: any) => {
      setFilters((prevFilters) => ({
        ...prevFilters,
        ...newFilters,
      }));
      setPage(1);
    }, 300), // Debounce với 300ms
    []
  );

  const handleFilterChange = useCallback(
    (newFilters: {
      category?: string;
      brand?: string;
      priceRange?: string;
    }) => {
      debouncedSetFilters(newFilters);
    },
    [debouncedSetFilters]
  );

  const { data, isLoading } = useGetProductAll({
    page,
    limit,
    searchText: search ?? "",
    categoryId: filters.category,
    brandId: filters.brand,
    sortPrice: filters.priceRange,
  });
  const { data: topFiveSellProduct, isLoading: loadingTopFive } =
    useGetTopFiveSellProduct({ limit: 7 });

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= data?.meta?.pageCount) {
      setPage(newPage);
    }
  };

  const pages = Array.from(
    { length: data?.meta?.pageCount ?? 1 },
    (_, i) => i + 1
  );
  const isEmptySellProduct = topFiveSellProduct?.length === 0;

  const products = data?.datas || [];
  const isEmpty = products.length === 0;

  return (
    <section className='pt-24 content block'>
      <aside className='lg:col-span-1'>
        <FilterBar onFilter={handleFilterChange} />
      </aside>
      <div className='mx-auto max-w-7xl mt-8'>
        <h4 className='font-manrope font-bold text-3xl min-[400px]:text-2xl text-black mb-8 max-lg:text-center'>
          Sản phẩm bán chạy
        </h4>
      </div>
      {loadingTopFive ? (
        <p className='text-center h-96'>loading ....</p>
      ) : isEmptySellProduct ? (
        <p className='text-center'>No products found.</p>
      ) : (
        <>
          <TopSellingProducts
            topFiveSellProduct={topFiveSellProduct}
          ></TopSellingProducts>
        </>
      )}

      <div className='mx-auto max-w-7xl mt-8'>
        <h4 className='font-manrope font-bold text-3xl min-[400px]:text-2xl text-black mb-8 max-lg:text-center'>
          Danh sách các sản phẩm
        </h4>
      </div>

      <div className='container mx-auto px-4 py-8 '>
        {isLoading ? (
          <p className='text-center h-96'>loading ....</p>
        ) : isEmpty ? (
          <p className='text-center'>No products found.</p>
        ) : (
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 '>
            {products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      <div>
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

          {pages.map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                pageNumber === page
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {pageNumber}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === data?.meta?.pageCount}
            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
              page === data?.meta?.pageCount
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            <span className='mr-1'>Next</span>
            <FaChevronRight className='h-4 w-4' />
          </button>
        </nav>
      </div>
    </section>
  );
};

export default ListProduct;
