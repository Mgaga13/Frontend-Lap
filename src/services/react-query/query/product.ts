import { useMutation, useQuery } from "@tanstack/react-query";
import { useDebounce } from "../../../components/hooks/useDebounce";
import { ApiService } from "../../api/ApiClient";
import { List } from "./commom";

interface filterProduct {
  page: number;
  limit: number;
  searchText?: string;
  categoryId?: string;
  brandId?: string;
  sort?: string;
  sortPrice?: any;
}

export const useGetListProduct = (params: List) => {
  const getProductService = ApiService.createInstance();
  const debouncedSearchText = useDebounce<string>(params.searchText, 500);
  return useQuery(
    ["getListProduct", params.page, debouncedSearchText],
    () => {
      const queryParams: any = {
        page: params.page,
        limit: params.limit,
      };

      if (debouncedSearchText) {
        queryParams.searchText = debouncedSearchText;
      }
      return getProductService.getListProduct({
        queryParams,
      });
    },
    {
      enabled: !!debouncedSearchText || debouncedSearchText === "",
      onSuccess: () => {
        // Xử lý thành công nếu cần thiết
      },
    }
  );
};

export const useGetProduct = (params: any) => {
  const productService = ApiService.createInstance();
  return useQuery(
    ["getProduct"],
    () => {
      return productService.getProduct({
        pathParams: {
          id: params,
        },
      });
    },
    {
      onSuccess: (data: any) => {
        console.log("User removed successfully:", data);
      },
      onError: (error: any) => {
        console.error("Error removing user:", error);
      },
    }
  );
};

export const useCreateProduct = () => {
  const productService = ApiService.createInstance();
  return useMutation(
    (payload: any) => {
      return productService.createProduct({
        data: payload,
      });
    },
    {
      onSuccess: (data: any) => {
        console.log("createProduct", data);
      },
      onError: (error: any) => {
        console.log("ErrorProduct", error);
      },
    }
  );
};
export const useRemoveProduct = () => {
  const productService = ApiService.createInstance();
  return useMutation(
    (id: any) => {
      return productService.deleteProduct({
        pathParams: {
          id: id,
        },
      });
    },
    {
      onSuccess: (data: any) => {
        console.log("User removed successfully:", data);
      },
      onError: (error: any) => {
        console.error("Error removing user:", error);
      },
    }
  );
};

export const useEditProduct = () => {
  const productService = ApiService.createInstance();
  return useMutation(
    (payload: any) => {
      return productService.editProduct({
        data: payload,
      });
    },
    {
      onSuccess: (data: any) => {
        console.log("Edit successfully:", data);
      },
      onError: (error: any) => {
        console.error("Error Edit user:", error);
      },
    }
  );
};

export const useGetProductAll = (payload: filterProduct) => {
  const productService = ApiService.createInstance();

  return useQuery(
    ["getProductDetail", payload], // Bao gồm payload để caching chính xác
    () => {
      console.log(payload);
      if (payload.sortPrice === "all") {
        delete payload.sortPrice;
      }
      payload.sortPrice = Number(payload.sortPrice);
      return productService.getProductDetail({
        data: payload, // Truyền payload vào body của POST request
      });
    },
    {
      onSuccess: (data: any) => {
        console.log("Product detail fetched successfully:", data);
      },
      onError: (error: any) => {
        console.error("Error fetching product detail:", error);
      },
    }
  );
};
