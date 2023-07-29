import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import { productApi } from "./api/productApi";

export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
  },
  devTools: process.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([productApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
