import { useMutation, useQuery } from "@tanstack/react-query";
import { List } from "./commom";
import { ApiService } from "../../api/ApiClient";
import { IStore, updateStore } from "../../../store";
interface BrandDto {
  id?: string;
  name: string;
}
export const useGetListBrand = (params: List) => {
  const brandService = ApiService.createInstance();

  return useQuery(
    ["getListBrand", params.page],
    () => {
      return brandService.getListBrand({
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

export const useCreateBrand = () => {
  const brandService = ApiService.createInstance();
  return useMutation(
    (payload: BrandDto) => {
      return brandService.getCreateBrand({
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
export const useRemoveBrand = () => {
  const brandService = ApiService.createInstance();
  return useMutation(
    (id: any) => {
      return brandService.deleteBrand({
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

export const useEditBrand = () => {
  const brandService = ApiService.createInstance();
  return useMutation(
    (payload: BrandDto) => {
      return brandService.getEditBrand({
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
