import { useMutation, useQuery } from "@tanstack/react-query";
import { useDebounce } from "../../../components/hooks/useDebounce";
import { ApiService } from "../../api/ApiClient";
import { List } from "./commom";

export const useGetListProduct = (params: List) => {
  const getListUserService = ApiService.createInstance();
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
      return getListUserService.getListProduct({
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

export const useCreateUser = () => {
  const userService = ApiService.createInstance();
  return useMutation(
    (payload: any) => {
      return userService.createUser({
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
export const useRemoveUser = () => {
  const getVideoService = ApiService.createInstance();
  return useMutation(
    (id: any) => {
      return getVideoService.deleteUser({
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

export const useEditUser = () => {
  const getVideoService = ApiService.createInstance();
  return useMutation(
    (payload: any) => {
      return getVideoService.editUser({
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
