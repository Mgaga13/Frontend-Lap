import { useMutation } from "@tanstack/react-query";
import { ApiService } from "../../api/ApiClient";

export const useCreatePayment = () => {
  const paymentService = ApiService.createInstance();
  return useMutation(
    (payload: any) => {
      return paymentService.createPaymentZaloPay({
        data: {
          amount: 10000,
          cartItem: payload.cartItem,
        },
      });
    },
    {
      onSuccess: (data: any) => {
        console.log("data from category", data);
      },
      onError: (error: any) => {},
    }
  );
};
