import { AxiosRequestConfig } from "axios";

// eslint-disable-next-line import/no-named-as-default
import configApi from "./client";
import { useStore } from "../../store";

export class ApiService {
  config: AxiosRequestConfig = {};

  private controller = new AbortController();

  static createInstance(): ApiService {
    const activeInstance = new ApiService();

    activeInstance.controller = new AbortController();

    return activeInstance;
  }

  cancelRequest() {
    this.controller.abort();
  }
  private getAccessToken = () => {
    const { AuthSlice } = useStore();
    return AuthSlice.accessToken;
  };

  login = configApi({
    path: "v1/auth/sign-in",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  signup = configApi({
    path: "v1/auth/register",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  logout = configApi({
    path: "v1/auth/logout",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  getAllProduct = configApi({
    // or pass query key = name to get a specific app
    path: "v1/products",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.getAccessToken()}`,
    },
  });

  searchAppByName = configApi({
    path: "v1/listApp",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  getChartData = configApi({
    path: "v1/transactions/chart",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  getAllTransaction = configApi({
    path: "v1/transactions",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  getTransactionByApp = configApi({
    path: "v1/transactions/app",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  getPackageByApp = configApi({
    path: "v1/transactions/package",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  refreshToken = configApi({
    path: "v1/auth/refresh-tokens",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // user
  getListUser = configApi({
    path: "v1/users/all",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.getAccessToken()}`,
    },
  });
  createUser = configApi({
    path: "v1/users",
    method: "POST",
    headers: {
      "Content-type": "multipart/form-data",
      Authorization: `Bearer ${this.getAccessToken()}`,
    },
  });
  deleteUser = configApi({
    path: "v1/users",
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${this.getAccessToken()}`,
    },
  });
  // product
  getListProduct = configApi({
    path: "v1/products/list",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.getAccessToken()}`,
    },
  });

  // Category
  getListCategory = configApi({
    path: "v1/categories",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.getAccessToken()}`,
    },
  });

  // Banner
  getListBanner = configApi({
    path: "v1/banner",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.getAccessToken()}`,
    },
  });
}
