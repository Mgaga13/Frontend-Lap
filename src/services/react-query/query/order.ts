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
  const getOrderService = ApiService.createInstance();
  return useQuery(
    ["getListOrder", params.page],
    () => {
      console.log(params);
      const queryParams: any = {
        page: params.page,
        limit: params.limit,
        status: params.status === -1 ? "all" : params.status,
      };
      return getOrderService.getListOrder({
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
