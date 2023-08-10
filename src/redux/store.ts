import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import { productApi } from "./api/productApi";
import { promptApi } from "./api/promptApi";
import { authApi } from "./api/authApi";
import genieReducer from "./features/genieSlice";
import userReducer from "./features/userSlice";
import { userApi } from "./api/userApi";
import { genieApi } from "./api/genieApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [promptApi.reducerPath]: promptApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [genieApi.reducerPath]: genieApi.reducer,
    genieState: genieReducer,
    userState: userReducer,
  },
  devTools: process.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([
      productApi.middleware,
      promptApi.middleware,
      authApi.middleware,
      userApi.middleware,
      genieApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
