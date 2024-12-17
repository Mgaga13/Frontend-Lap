import { useMutation, useQuery } from "@tanstack/react-query";
import { List } from "./commom";
import { ApiService } from "../../api/ApiClient";
import { IStore, updateStore } from "../../../store";
interface CateDto {
  id?: string;
  name: string;
}
export const useGetListType = (params: List) => {
  const getListTypeService = ApiService.createInstance();

  return useQuery(
    ["getListType", params.page],
    () => {
      return getListTypeService.getListType({
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

export const useCreateType = () => {
  const userService = ApiService.createInstance();
  return useMutation(
    (payload: CateDto) => {
      return userService.getCreateType({
        data: {
          name: payload.name,
        },
      });
    },
    {
      onSuccess: (data: any) => {
        console.log("data from Type", data);
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
export const useRemoveType = () => {
  const getVideoService = ApiService.createInstance();
  return useMutation(
    (id: any) => {
      return getVideoService.deleteType({
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

export const useEditType = () => {
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
