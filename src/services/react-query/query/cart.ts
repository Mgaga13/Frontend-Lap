import { useMutation, useQuery } from "@tanstack/react-query";
import { List } from "./commom";
import { ApiService } from "../../api/ApiClient";
import { IStore, updateStore } from "../../../store";
interface CartDto {
  productId: string;
}
interface updateCart {
  cartId: string;
  productId: string;
  status?: string;
}
export const useGetListCart = (params: List) => {
  const cartService = ApiService.createInstance();

  return useQuery(
    ["getListCart", params.page],
    () => {
      return cartService.getListCartUser({
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

export const useCreateCart = () => {
  const cartService = ApiService.createInstance();
  return useMutation(
    (payload: CartDto) => {
      console.log(payload);
      return cartService.createCart({
        data: {
          productId: payload.productId,
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
export const useRemoveCart = () => {
  const cartService = ApiService.createInstance();
  return useMutation(
    (payload: updateCart) => {
      return cartService.removeItemCart({
        data: {
          cartId: payload.cartId,
          productId: payload.productId,
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

export const useEditCart = () => {
  const cartService = ApiService.createInstance();
  return useMutation(
    (payload: updateCart) => {
      return cartService.updateCart({
        data: {
          cartId: payload.cartId,
          productId: payload.productId,
          quantity: payload.status,
        },
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
export const useCountCart = () => {
  const cartService = ApiService.createInstance();
  return useQuery(
    ["getListUser"],
    () => {
      return cartService.countCart({});
    },
    {
      onSuccess: () => {
        // Xử lý thành công nếu cần thiết
      },
    }
  );
};
