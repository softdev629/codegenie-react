import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IGenericResponse, IPrompt, IPromptAcceptSchema } from "./types";
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
  }),
});

export const {
  useAddPromptMutation,
  useGetPromptsQuery,
  useUpdatePromptMutation,
} = promptApi;
