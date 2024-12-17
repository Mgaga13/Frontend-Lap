import { useQuery } from "@tanstack/react-query";
import { List } from "./commom";
import { ApiService } from "../../api/ApiClient";

export const useGetListCategory = (params: List) => {
  const getListCategoryService = ApiService.createInstance();

  return useQuery(
    ["getListCategory", params.page],
    () => {
      return getListCategoryService.getListCategory({
        queryParams: { page: params.page },
      });
    },
    {
      onSuccess: () => {
        // Xử lý thành công nếu cần thiết
      },
    }
  );
};
