/* eslint-disable import/no-cycle */

import { mergeDeepLeft } from "ramda";
import { StoreApi, create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import createUserSlice, { IUserSlice } from "./UserSlice";
import createAuthSlice, { IAuthSlice } from "./AuthSlice";
import { encryptStorage } from "../services/encrypt-storage/storage";

const store = (set: any, get: any, api: StoreApi<any>) => ({
  UserSlice: createUserSlice(
    set as unknown as StoreApi<IUserSlice>["setState"],
    get as StoreApi<IUserSlice>["getState"],
    api as unknown as StoreApi<IUserSlice>
  ),
  AuthSlice: createAuthSlice(
    set as unknown as StoreApi<IAuthSlice>["setState"],
    get as StoreApi<IAuthSlice>["getState"],
    api as unknown as StoreApi<IAuthSlice>
  ),
});

export type IStore = ReturnType<typeof store>;

export const useStore = create<IStore>()(
  persist(immer(devtools(store)), {
    name: "zustand",
    getStorage: () => encryptStorage,
    merge: (persistedState: any, currentState) =>
      mergeDeepLeft(persistedState, currentState),
  })
);

export const {
  getState: getStore,
  setState: updateStore,
  subscribe: subscribeStore,
  destroy: destroyStore,
} = useStore;
