import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductSettingSaveInput } from "../../pages/admin/product.page";
import { IGenericResponse, IPrompt } from "./types";
import { IPromptSchema } from "../../components/Prompt";

const BASE_URL = process.env.REACT_APP_SERVER_ENDPOINT as string;

export const promptApi = createApi({
  reducerPath: "promptApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/prompts/`,
  }),
  tagTypes: ["Prompt"],
  endpoints: (builder) => ({
    addPrompt: builder.mutation<IGenericResponse, IPromptSchema>({
      query(data) {
        return {
          url: "",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: [{ type: "Prompt", id: "LIST" }],
    }),
    getPrompts: builder.query<IPrompt[], void>({
      query() {
        return {
          url: "",
          method: "GET",
        };
      },
    }),
    // updateProduct: builder.mutation<IGenericResponse, ProductSettingSaveInput>({
    //   query(data) {
    //     return {
    //       url: "",
    //       method: "PATCH",
    //       body: data,
    //     };
    //   },
    //   invalidatesTags: [{ type: "Product", id: "LIST" }],
    // }),
  }),
});

export const { useAddPromptMutation } = promptApi;
