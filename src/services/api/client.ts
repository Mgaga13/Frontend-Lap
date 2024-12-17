import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const BASE_URL = "http://localhost:3337/api/";

// const { UserSlice, AuthSlice } = useStore();

const apiClient = axios.create({
  baseURL: BASE_URL,
  responseType: "json",
  withCredentials: true,
});

apiClient.interceptors.request.use(
  async (config: any) => {
    if (
      config.url?.indexOf("login") >= 0 ||
      config.url?.indexOf("signup") >= 0 ||
      config.url?.indexOf("refresh-token") >= 0
    ) {
      return config;
    }
    // get token from localStorage
    const data = JSON.parse(localStorage.getItem("data") || "null");
    if (data) {
      const { access_token, refresh_token, user_id } = data;
      let decodedToken = jwtDecode(access_token);
      let currentDate = new Date();
      const isRemember = localStorage.getItem("rememberPassword") === "true";
      if (decodedToken && decodedToken.exp) {
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
          if (isRemember) {
            console.log("call refresh token", isRemember);
          } else {
            localStorage.removeItem("data");
          }
        }
      }
    } else {
      localStorage.removeItem("data");
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

apiClient.interceptors.response.use((response) => {
  return response;
});

const fetchApi = async (url: string, config: any) => {
  return new Promise((resolve, reject) => {
    apiClient
      .request({
        url,
        ...config,
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const configApi: any = ({ path, method, headers }: any) => {
  const config: any = {
    method: "",
    headers: "",
    data: "",
  };

  if (headers) {
    config.headers = headers;
  }

  if (method) {
    config.method = method;
  }

  return ({ data, pathParams, queryParams }: any) => {
    let url = "";
    let params = "";
    let query = "";
    if (path) {
      url += `/${path}`;
    }
    if (pathParams) {
      Object.keys(pathParams).forEach((key) => {
        params = "/" + pathParams[key];
      });
      url += params;
    }
    if (queryParams) {
      query = Object.keys(queryParams)
        .map((key) => `${key}=${queryParams[key]}`)
        .join("&");

      url += `?${query}`;
    }

    if (data) {
      config.data = data;
    }
    return fetchApi(url, config);
  };
};

export default configApi;
