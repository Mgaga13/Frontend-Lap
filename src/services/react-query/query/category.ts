import { useMutation, useQuery } from "@tanstack/react-query";
import { List } from "./commom";
import { ApiService } from "../../api/ApiClient";
import { IStore, updateStore } from "../../../store";
interface CateDto {
  id?: string;
  name: string;
}
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

export const useCreateCategory = () => {
  const userService = ApiService.createInstance();
  return useMutation(
    (payload: CateDto) => {
      return userService.getCreateCategory({
        data: {
          name: payload.name,
        },
      });
    },
    {
      onSuccess: (data: any) => {
        console.log("data from category", data);
      },
      onError: (error: any) => {
        updateStore((state: IStore) => {
          state.UserSlice.isError = true;
          state.UserSlice.errorMess = error.response.data.error_message;
        });
      },
    }
  );
};
export const useRemoveCategory = () => {
  const getVideoService = ApiService.createInstance();
  return useMutation(
    (id: any) => {
      return getVideoService.deleteCategory({
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

export const useEditCategory = () => {
  const getVideoService = ApiService.createInstance();
  return useMutation(
    (payload: CateDto) => {
      console.log(payload);
      return getVideoService.getEditCategory({
        data: { id: payload.id, name: payload.name },
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
