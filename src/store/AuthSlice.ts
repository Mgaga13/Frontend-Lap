import { StateCreator, StoreApi } from "zustand";

export interface IAuthSlice {
  xClientId: string;
  accessToken: string | null;
  refreshToken: string | null;
  setAccessToken: (token: any) => void;
  clearAccessToken: () => void;
  setRefreshToken: (token: any) => void;
  clearRefreshToken: () => void;
  setXClientId: (value: string) => void;
}

const AuthSlice: StateCreator<
  IAuthSlice,
  [
    ["zustand/persist", IAuthSlice],
    ["zustand/devtools", never],
    ["zustand/immer", never]
  ],
  [],
  IAuthSlice
> = (set) => ({
  accessToken: null,
  refreshToken: null,
  xClientId: "",
  setXClientId: (value) =>
    set(({ AuthSlice }: any) => {
      AuthSlice.xClientId = value;
    }),
  setAccessToken: (token) =>
    set(({ AuthSlice }: any) => {
      AuthSlice.accessToken = token;
    }),
  clearAccessToken: () =>
    set(({ AuthSlice }: any) => {
      AuthSlice.accessToken = null;
    }),
  setRefreshToken: (token) =>
    set(({ AuthSlice }: any) => {
      AuthSlice.refreshToken = token;
    }),
  clearRefreshToken: () =>
    set(({ AuthSlice }: any) => {
      AuthSlice.refreshToken = null;
    }),
});

export default AuthSlice as (
  set: StoreApi<IAuthSlice>["setState"],
  get: StoreApi<IAuthSlice>["getState"],
  api: StoreApi<IAuthSlice>
) => IAuthSlice;
