import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IGenericResponse,
  IPromptAcceptSchema,
  IPromptRunSchema,
} from "./types";
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
    getPrompts: builder.query<IPromptAcceptSchema[], void>({
      query() {
        return {
          url: "",
          method: "GET",
        };
      },
      transformResponse: (results: { data: IPromptAcceptSchema[] }) =>
        results.data,
      providesTags: [{ type: "Prompt", id: "LIST" }],
    }),
    updatePrompt: builder.mutation<
      IGenericResponse,
      { id: string; info: IPromptSchema }
    >({
      query({ id, info }) {
        return {
          url: `${id}`,
          method: "PATCH",
          body: info,
        };
      },
      invalidatesTags: [{ type: "Prompt", id: "LIST" }],
    }),
    getPromptNames: builder.query<
      string[],
      { product_name: string; product_module: string }
    >({
      query({ product_name, product_module }) {
        return {
          url: `names?product_name=${product_name}&product_module=${product_module}`,
        };
      },
      transformResponse: (results: { data: { prompt_name: string }[] }) =>
        results.data.map((item) => item.prompt_name),
    }),
    runPrompt: builder.mutation<Array<any>, IPromptRunSchema>({
      query(data) {
        return {
          url: "run",
          method: "POST",
          body: data,
        };
      },
      transformResponse: (results: { msg: Array<any> }) => results.msg,
    }),
  }),
});

export const {
  useAddPromptMutation,
  useGetPromptsQuery,
  useUpdatePromptMutation,
  useGetPromptNamesQuery,
  useRunPromptMutation,
} = promptApi;
