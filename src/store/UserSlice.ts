import { StateCreator, StoreApi } from "zustand";

export interface IUserSlice {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  errorMess: string;
  setErrorMess: (value: string) => void;
  isError: boolean;
  setIsError: (value: boolean) => void;
  isSuccess: boolean;
  setIsSuccess: (value: boolean) => void;
  successMess: string;
  setSuccessMess: (value: string) => void;
  rememberPassword: boolean;
  errorSignUpMess: string;
  setSignUpErrorMess: (value: string) => void;
  isSignUpError: boolean;
  setIsSignUpError: (value: boolean) => void;
  isSignUpSuccess: boolean;
  setIsSignUpSuccess: (value: boolean) => void;
  successSignUpMess: string;
  setSuccessSignUpMess: (value: string) => void;
}

const UserSlice: StateCreator<
  IUserSlice,
  [
    ["zustand/persist", IUserSlice],
    ["zustand/devtools", never],
    ["zustand/immer", never]
  ],
  [],
  IUserSlice
> = (set) => ({
  isLoggedIn: false,
  isError: false,
  isSuccess: false,
  successMess: "",
  rememberPassword: false,
  errorMess: "",
  isSignUpSuccess: false,
  isSignUpError: false,
  errorSignUpMess: "",
  successSignUpMess: "",
  setIsLoggedIn: (isLoggedIn) =>
    set(({ UserSlice }: any) => {
      UserSlice.isLoggedIn = isLoggedIn;
    }),
  setIsSuccess: (isSuccess) =>
    set(({ UserSlice }: any) => {
      UserSlice.isSuccess = isSuccess;
    }),
  setSuccessMess: (successMess) =>
    set(({ UserSlice }: any) => {
      UserSlice.successMess = successMess;
    }),
  setErrorMess: (errorMess) =>
    set(({ UserSlice }: any) => {
      UserSlice.errorMess = errorMess;
    }),
  setIsError: (isError) =>
    set(({ UserSlice }: any) => {
      UserSlice.isError = isError;
    }),
  setIsSignUpSuccess: (isSuccess) =>
    set(({ UserSlice }: any) => {
      UserSlice.isSignUpSuccess = isSuccess;
    }),
  setSuccessSignUpMess: (successMess) =>
    set(({ UserSlice }: any) => {
      UserSlice.successMess = successMess;
    }),
  setSignUpErrorMess: (errorMess) =>
    set(({ UserSlice }: any) => {
      UserSlice.errorMess = errorMess;
    }),
  setIsSignUpError: (isError) =>
    set(({ UserSlice }: any) => {
      UserSlice.isError = isError;
    }),
});

export default UserSlice as (
  set: StoreApi<IUserSlice>["setState"],
  get: StoreApi<IUserSlice>["getState"],
  api: StoreApi<IUserSlice>
) => IUserSlice;
