import { useQuery } from "@tanstack/react-query";
import { ApiService } from "../../api/ApiClient";

export const getStatisticRevenue = (params: any) => {
  const getProductService = ApiService.createInstance();
  return useQuery(
    ["getStatistic"],
    () => {
      const queryParams: any = {
        startDate: params.startDate,
        endDate: params.endDate,
      };
      return getProductService.getStatisticRevenue({
        queryParams,
      });
    },
    {
      onSuccess: () => {
        // Xử lý thành công nếu cần thiết
      },
    }
  );
};

export const getStatisticMonth = (params: any) => {
  const getProductService = ApiService.createInstance();
  return useQuery(
    ["getStatisticMonth"],
    () => {
      const queryParams: any = {
        startYear: params.startYear,
        endYear: params.endYear,
      };
      return getProductService.getStatisticRevenueMonth({
        queryParams,
      });
    },
    {
      onSuccess: () => {
        // Xử lý thành công nếu cần thiết
      },
    }
  );
};
export const getStatisticSelling = (params: any) => {
  const getProductService = ApiService.createInstance();
  return useQuery(
    ["getStatisticSelling"],
    () => {
      const queryParams: any = {
        limit: params.limit,
        startDate: params.startDate,
        endDate: params.endDate,
      };
      return getProductService.getStatisticSellingProduct({
        queryParams,
      });
    },
    {
      onSuccess: () => {
        // Xử lý thành công nếu cần thiết
      },
    }
  );
};
