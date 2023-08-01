import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductSettingSaveInput } from "../../pages/admin/product.page";
import { PriceSettingSaveInput } from "../../pages/admin/price.page";
import {
  IGenericResponse,
  IPlanDetail,
  IProduct,
  IProductHeadings,
} from "./types";

const BASE_URL = process.env.REACT_APP_SERVER_ENDPOINT as string;

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/products/`,
  }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProduct: builder.query<IProduct, IProductHeadings>({
      query({ product_name, product_module }) {
        return {
          url: `?product_name=${product_name}&product_module=${product_module}`,
        };
      },
      transformResponse: (results: { data: IProduct }) => results.data,
      providesTags: [{ type: "Product", id: "LIST" }],
    }),
    addProduct: builder.mutation<IGenericResponse, ProductSettingSaveInput>({
      query(data) {
        return {
          url: "",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),
    updateProduct: builder.mutation<IGenericResponse, ProductSettingSaveInput>({
      query(data) {
        return {
          url: "",
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),
    searchProduct: builder.query<IProductHeadings[], string>({
      query(searchKey: string) {
        return {
          url: `search?search_key=${searchKey}`,
        };
      },
      transformResponse: (results: { data: IProductHeadings[] }) =>
        results.data,
    }),
    updatePrice: builder.mutation<IGenericResponse, PriceSettingSaveInput>({
      query(data) {
        return {
          url: "update_price",
          method: "PATCH",
          body: data,
        };
      },
    }),
    getProductsNames: builder.query<string[], void>({
      query() {
        return {
          url: "names",
          method: "GET",
        };
      },
      transformResponse: (results: { data: string[] }) => results.data,
    }),
    getModules: builder.query<string[], string>({
      query(product_name: string) {
        return {
          url: `modules?product_name=${product_name}`,
          method: "GET",
        };
      },
      transformResponse: (results: { data: { product_module: string }[] }) =>
        results.data.map((item) => item.product_module),
    }),
    getPrices: builder.query<
      IPlanDetail[],
      { product_name: string; product_module: string }
    >({
      query({ product_name, product_module }) {
        return {
          url: `prices?product_name=${product_name}&product_module=${product_module}`,
          method: "GET",
        };
      },
      transformResponse: (results: { data: { plan_details: IPlanDetail[] } }) =>
        results.data.plan_details,
    }),
  }),
});

export const {
  useUpdateProductMutation,
  useLazyGetProductQuery,
  useLazySearchProductQuery,
  useUpdatePriceMutation,
  useAddProductMutation,
  useGetProductsNamesQuery,
  useLazyGetModulesQuery,
  useLazyGetPricesQuery,
} = productApi;
