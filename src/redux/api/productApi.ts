import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductSettingSaveInput } from "../../pages/admin/product.page";
import { IGenericResponse, IProduct } from "./types";

const BASE_URL = process.env.REACT_APP_SERVER_ENDPOINT as string;

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/config/`,
  }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProduct: builder.query<IProduct, void>({
      query() {
        return {
          url: "product",
        };
      },
      transformResponse: (results: { data: IProduct }) => results.data,
      providesTags: [{ type: "Product", id: "LIST" }],
    }),
    updateProduct: builder.mutation<IGenericResponse, ProductSettingSaveInput>({
      query(data) {
        return {
          url: "product",
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),
  }),
});

export const { useUpdateProductMutation, useGetProductQuery } = productApi;
