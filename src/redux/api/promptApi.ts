import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./customFetchBase";

import {
  IGenericResponse,
  IPromptAcceptSchema,
  IPromptRunSchema,
} from "./types";
import { IPromptSchema } from "../../components/Prompt";

export const promptApi = createApi({
  reducerPath: "promptApi",
  baseQuery: customFetchBase,
  tagTypes: ["Prompt"],
  endpoints: (builder) => ({
    addPrompt: builder.mutation<IGenericResponse, IPromptSchema>({
      query(data) {
        return {
          url: "prompts",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: [{ type: "Prompt", id: "LIST" }],
    }),
    getPrompts: builder.query<IPromptAcceptSchema[], void>({
      query() {
        return {
          url: "prompts",
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
          url: `prompts/${id}`,
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
          url: `prompts/names?product_name=${product_name}&product_module=${product_module}`,
        };
      },
      transformResponse: (results: { data: { prompt_name: string }[] }) =>
        results.data.map((item) => item.prompt_name),
    }),
    runPrompt: builder.mutation<Array<any>, IPromptRunSchema>({
      query(data) {
        return {
          url: "prompts/run",
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
