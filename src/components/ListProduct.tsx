import { useCallback, useContext, useState } from "react";
import ProductCard from "./ProductCard";
import FilterBar from "./FilterBar";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useGetProductAll } from "../services/react-query/query/product";
import { SearchContext } from "./Layout";

const ListProduct = () => {
  const { search, setTotalCart } = useContext(SearchContext);
  const router = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [filters, setFilters] = useState({
    category: "",
    brand: "",
    priceRange: "all",
  });

  const handleFilterChange = useCallback(
    (newFilters: {
      category?: string;
      brand?: string;
      priceRange?: string;
    }) => {
      setFilters((prevFilters) => ({
        ...prevFilters,
        ...newFilters,
      }));
      setPage(1); // Reset page về 1 khi thay đổi bộ lọc
    },
    []
  );
  const { data, isLoading } = useGetProductAll({
    page,
    limit,
    searchText: search ?? "",
    categoryId: filters.category,
    brandId: filters.brand,
    sortPrice: filters.priceRange,
  });

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= data?.meta?.pageCount) {
      setPage(newPage);

      // Cuộn lên trên một khoảng 680px
      window.scrollBy({
        top: -720, // Cuộn lên trên 680px
        behavior: "smooth",
      });

      // Kiểm tra cuộn
      console.log("Scrolling up by 680px");
    }
  };

  const pages = Array.from(
    { length: data?.meta?.pageCount ?? 10 },
    (_, i) => i + 1
  );

  const products = data?.datas || []; // Danh sách sản phẩm
  const isEmpty = products.length === 0; // Kiểm tra rỗng

  return (
    <section className='pt-24 content block'>
      {/* Sidebar bộ lọc */}
      <aside className='lg:col-span-1'>
        <FilterBar onFilter={handleFilterChange} />
      </aside>

      {/* Tiêu đề */}
      <div className='mx-auto max-w-7xl mt-8'>
        <h2 className='font-manrope font-bold text-3xl min-[400px]:text-4xl text-black mb-8 max-lg:text-center'>
          Sản phẩm
        </h2>
      </div>

      {/* Danh sách sản phẩm */}
      <div className='container mx-auto px-4 py-8 h-[860px]'>
        {isLoading ? (
          <p className='text-center'>Loading...</p>
        ) : isEmpty ? (
          <p className='text-center'>No products found.</p>
        ) : (
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 '>
            {products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
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

          <div className='hidden sm:flex space-x-2'>
            {isLoading ? (
              ""
            ) : (
              <>
                {pages.map((pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      pageNumber === page
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                    aria-label={`Page ${pageNumber}`}
                    aria-current={pageNumber === page ? "page" : undefined}
                  >
                    {pageNumber}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === data.meta.pageCount}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    page === data.meta.pageCount
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                  aria-label='Next page'
                >
                  <span className='mr-1'>Next</span>
                  <FaChevronRight className='h-4 w-4' />
                </button>

                <button
                  onClick={() => handlePageChange(data.meta.pageCount)}
                  disabled={page === data.meta.pageCount}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    page === data.meta.pageCount
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                  aria-label='Go to last page'
                >
                  Last
                </button>

                <div className='flex items-center text-sm text-gray-500 ml-4'>
                  Page {page} of {data.meta.pageCount}
                </div>
              </>
            )}
          </div>
        </nav>
      </div>
    </section>
  );
};

export default ListProduct;
