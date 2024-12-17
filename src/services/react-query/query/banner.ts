import { useQuery } from "@tanstack/react-query";
import { ApiService } from "../../api/ApiClient";
import { List } from "./commom";

export const useGetListBanner = (params: List) => {
  const getListBannerService = ApiService.createInstance();

  return useQuery(
    ["getListBanner", params.page],
    () => {
      return getListBannerService.getListBanner({
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
