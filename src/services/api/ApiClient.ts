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
    path: "v1/auth/sign-up",
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
  forgetPassword = configApi({
    path: "v1/auth/forgot-password",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  resetPassword = configApi({
    path: "v1/auth/reset-password",
    method: "PUT",
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
  getProfileUser = configApi({
    path: "v1/users/profile",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.getAccessToken()}`,
    },
  });
  updateProfleUser = configApi({
    path: "v1/users/update/profile",
    method: "POST",
    headers: {
      "Content-type": "multipart/form-data",
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

  editUser = configApi({
    path: "v1/users/update",
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
    path: "v1/product/list",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.getAccessToken()}`,
    },
  });
  createProduct = configApi({
    path: "v1/product",
    method: "POST",
    headers: {
      "Content-type": "multipart/form-data",
      Authorization: `Bearer ${this.getAccessToken()}`,
    },
  });
  getProduct = configApi({
    path: "v1/product",
    method: "GET",
    headers: {
      Authorization: `Bearer ${this.getAccessToken()}`,
    },
  });
  editProduct = configApi({
    path: "v1/product/update",
    method: "POST",
    headers: {
      "Content-type": "multipart/form-data",
      Authorization: `Bearer ${this.getAccessToken()}`,
    },
  });

  deleteProduct = configApi({
    path: "v1/product",
    method: "DELETE",
    headers: {
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
  getCreateCategory = configApi({
    path: "v1/categories",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.getAccessToken()}`,
    },
  });
  getEditCategory = configApi({
    path: "v1/categories/edit",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.getAccessToken()}`,
    },
  });
  deleteCategory = configApi({
    path: "v1/categories",
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${this.getAccessToken()}`,
    },
  });

  // Type

  getListBrand = configApi({
    path: "v1/brands",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.getAccessToken()}`,
    },
  });
  getCreateBrand = configApi({
    path: "v1/brands",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.getAccessToken()}`,
    },
  });
  getEditBrand = configApi({
    path: "v1/brands/edit",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.getAccessToken()}`,
    },
  });
  deleteBrand = configApi({
    path: "v1/brands",
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${this.getAccessToken()}`,
    },
  });

  // Banner

  getListBanner = configApi({
    path: "v1/banner/all",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.getAccessToken()}`,
    },
  });
  createBanner = configApi({
    path: "v1/banner",
    method: "POST",
    headers: {
      "Content-type": "multipart/form-data",
      Authorization: `Bearer ${this.getAccessToken()}`,
    },
  });
  editBanner = configApi({
    path: "v1/banner/update",
    method: "POST",
    headers: {
      "Content-type": "multipart/form-data",
      Authorization: `Bearer ${this.getAccessToken()}`,
    },
  });
  deleteBanner = configApi({
    path: "v1/banner",
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${this.getAccessToken()}`,
    },
  });

  // Cart

  getListCartUser = configApi({
    path: "v1/cart/user",
    method: "GET",
    headers: {
      Authorization: `Bearer ${this.getAccessToken()}`,
    },
  });

  createCart = configApi({
    path: "v1/cart",
    method: "POST",
    headers: {
      Authorization: `Bearer ${this.getAccessToken()}`,
    },
  });
  updateCart = configApi({
    path: "v1/cart/update",
    method: "POST",
    headers: {
      Authorization: `Bearer ${this.getAccessToken()}`,
    },
  });
  removeItemCart = configApi({
    path: "v1/cart/delete",
    method: "POST",
    headers: {
      Authorization: `Bearer ${this.getAccessToken()}`,
    },
  });
  countCart = configApi({
    path: "v1/cart/user/count",
    method: "GET",
    headers: {
      Authorization: `Bearer ${this.getAccessToken()}`,
    },
  });
}
