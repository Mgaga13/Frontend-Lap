import { useMutation, useQuery } from "@tanstack/react-query";
import { ApiService } from "../../api/ApiClient";

interface createFeedback {
  star: number;
  productId: string;
  content: string;
}
export const useCreateFeedback = () => {
  const feedbackService = ApiService.createInstance();
  return useMutation(
    (payload: createFeedback) => {
      return feedbackService.createFeedback({
        data: {
          star: payload.star,
          productId: payload.productId,
          content: payload.content,
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

export const useGetFeedback = (params: any) => {
  const feedbackService = ApiService.createInstance();
  return useQuery(
    ["getFeedback"],
    () => {
      return feedbackService.getFeedback({
        pathParams: {
          id: params,
        },
      });
    },
    {
      onSuccess: () => {
        // Xử lý thành công nếu cần thiết
      },
    }
  );
};
