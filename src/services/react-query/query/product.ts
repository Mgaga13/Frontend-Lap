import { useQuery } from "@tanstack/react-query";
import { ApiService } from "../../api/ApiClient";
import { IStore, updateStore } from "../../../store";

export const useGetListProduct = ({ page_index }: { page_index: number }) => {
  const getHistoryService = ApiService.createInstance();
  return useQuery(
    ["getProduct"],
    () => {
      return getHistoryService.getListProduct({
        data: {
          page_index: page_index || 1,
          page_size: 20,
          service_id: "",
        },
      });
    },
    {
      onSuccess: (data: any) => {},
      onError: (error: any) => {
        updateStore((state: IStore) => {
          state.UserSlice.isError = true;
          state.UserSlice.errorMess = error.response.data.message;
        });
      },
    }
  );
};
