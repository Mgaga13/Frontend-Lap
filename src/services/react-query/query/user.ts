import { useMutation, useQuery } from "@tanstack/react-query";
import { ApiService } from "../../api/ApiClient";
import { IStore, updateStore } from "../../../store";
import { List } from "./commom";

interface LoginI {
  email: string;
  password: string;
  rememberPassword?: boolean;
}

interface SignUpI {
  country: string;
  device_id: string;
  app_type: string;
  version?: string;
  ref_code?: string;
  email: string;
  password: string;
}

interface ReponseLoginI {
  data?: {
    access_token: string;
    refresh_token: string;
    user_id: string;
  };
  error_message: string;
  success: boolean;
}

export const useLogin = () => {
  const loginRequestService = ApiService.createInstance();

  return useMutation(
    (payload: LoginI) => {
      localStorage.setItem(
        "rememberPassword",
        JSON.stringify(payload.rememberPassword)
      );
      return loginRequestService.login({
        data: payload,
      });
    },
    {
      onSuccess: (data: ReponseLoginI) => {
        if (!data.success) {
          updateStore((state: IStore) => {
            state.UserSlice.isError = true;
            state.UserSlice.errorMess = data.error_message;
          });
        } else {
          // set token into local storage
          localStorage.setItem("data", JSON.stringify(data.data));
          updateStore((state: IStore) => {
            state.UserSlice.isSuccess = true;
            state.UserSlice.isLoggedIn = true;
            state.UserSlice.successMess = "Logged in successfully";
            state.AuthSlice.accessToken = data.data!.access_token;
            state.AuthSlice.refreshToken = data.data!.refresh_token;
          });
        }
      },
      onError: (error: any) => {
        updateStore((state: IStore) => {
          state.UserSlice.isError = true;
          state.UserSlice.errorMess = error.response.data.message;
        });
      },
    }
  );
};

export const useSignup = () => {
  const signUpRequestService = ApiService.createInstance();

  return useMutation(
    (payload: SignUpI) => {
      return signUpRequestService.signup({
        data: payload,
      });
    },
    {
      onSuccess: (data: ReponseLoginI) => {
        if (!data.success) {
          updateStore((state: IStore) => {
            state.UserSlice.isSignUpError = true;
            state.UserSlice.errorSignUpMess = data.error_message;
          });
        } else {
          updateStore((state: IStore) => {
            state.UserSlice.isSignUpSuccess = true;
            state.UserSlice.successSignUpMess =
              "Account registration successful!";
          });
        }
      },
      onError: (error: any) => {
        updateStore((state: IStore) => {
          state.UserSlice.isSignUpError = true;
          state.UserSlice.errorSignUpMess = error.response.data.message;
        });
      },
    }
  );
};

export const useRefreshToken = () => {
  const refreshTokenService = ApiService.createInstance();

  return useMutation(
    ({
      access_token,
      refresh_token,
    }: {
      access_token: string;
      refresh_token: string;
    }) => {
      return refreshTokenService.refreshToken({
        data: {
          access_token,
          refresh_token,
        },
      });
    },
    {
      onSuccess: (data: any) => {
        if (!data.success) {
          updateStore((state: IStore) => {
            state.UserSlice.isError = true;
            state.UserSlice.errorMess = data.error_message;
          });
        } else {
          // set token into local storage
          localStorage.setItem("data", JSON.stringify(data.data));
          updateStore((state: IStore) => {
            state.UserSlice.isLoggedIn = true;
          });
        }
      },
      onError: (error: any) => {
        updateStore((state: IStore) => {
          localStorage.removeItem("data");
          state.UserSlice.isLoggedIn = false;
          state.UserSlice.isError = true;
          state.UserSlice.errorMess = error.response.data.message;
        });
      },
    }
  );
};
export const useGetListUser = (params: List) => {
  const getListUserService = ApiService.createInstance();

  return useQuery(
    ["getListUser", params.page],
    () => {
      return getListUserService.getListUser({
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

export const useCreateUser = () => {
  const userService = ApiService.createInstance();
  return useMutation(
    (payload: any) => {
      return userService.createUser({
        data: payload,
      });
    },
    {
      onSuccess: (data: any) => {
        console.log("data from useGenerateVideoFromText", data);
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
export const useRemoveUser = () => {
  const getVideoService = ApiService.createInstance();
  return useMutation(
    (id: any) => {
      console.log(id);
      return getVideoService.deleteUser({
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
