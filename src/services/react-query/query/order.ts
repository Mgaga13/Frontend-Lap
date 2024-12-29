import { useMutation, useQuery } from "@tanstack/react-query";
import { ApiService } from "../../api/ApiClient";

export const useEditOrder = () => {
  const getOrderService = ApiService.createInstance();
  return useMutation(
    (payload: any) => {
      return getOrderService.EditOrder({
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
export const useGetListOrder = (params: any) => {
  const getProductService = ApiService.createInstance();
  return useQuery(
    ["getListProduct", params.page],
    () => {
      const queryParams: any = {
        page: params.page,
        limit: params.limit,
      };
      return getProductService.getListProduct({
        queryParams,
      });
    },
    {
      onSuccess: () => {
        // Xử lý thành công nếu cần thiết
      },
    }
  );
};
