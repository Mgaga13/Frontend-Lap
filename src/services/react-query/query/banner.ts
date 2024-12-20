import { useMutation, useQuery } from "@tanstack/react-query";
import { useDebounce } from "../../../components/hooks/useDebounce";
import { ApiService } from "../../api/ApiClient";
import { List } from "./commom";

export const useGetListBanner = (params: List) => {
  const bannerService = ApiService.createInstance();
  const debouncedSearchText = useDebounce<string>(params.searchText, 500);
  return useQuery(
    ["getListBanner", params.page, debouncedSearchText],
    () => {
      const queryParams: any = {
        page: params.page,
        limit: params.limit,
      };

      if (debouncedSearchText) {
        queryParams.searchText = debouncedSearchText;
      }
      return bannerService.getListBanner({
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

export const useCreateBanner = () => {
  const bannerService = ApiService.createInstance();
  return useMutation(
    (payload: any) => {
      return bannerService.createBanner({
        data: payload,
      });
    },
    {
      onSuccess: (data: any) => {
        console.log("data from useGenerateVideoFromText", data);
      },
      onError: (error: any) => {},
    }
  );
};
export const useRemoveBanner = () => {
  const bannerService = ApiService.createInstance();
  return useMutation(
    (id: any) => {
      return bannerService.deleteBanner({
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

export const useEditBanner = () => {
  const bannerService = ApiService.createInstance();
  return useMutation(
    (payload: any) => {
      return bannerService.editBanner({
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
