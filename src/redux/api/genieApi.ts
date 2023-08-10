import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./customFetchBase";

export const genieApi = createApi({
  reducerPath: "",
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    uploadImage: builder.mutation<{ content: string }, FormData>({
      query(data) {
        return {
          url: "genie/image",
          method: "POST",
          credentials: "include",
          body: data,
        };
      },
    }),
    sendUrl: builder.mutation<{ content: string }, { url: string }>({
      query(data) {
        return {
          url: "genie/url",
          method: "POST",
          credentials: "include",
          body: data,
        };
      },
    }),
    exportFile: builder.mutation<
      { path: string },
      { doc_type: string; advice: any }
    >({
      query({ doc_type, advice }) {
        return {
          url: `genie/export/${doc_type}`,
          method: "POST",
          credentials: "include",
          body: { advice },
        };
      },
    }),
  }),
});

export const {
  useUploadImageMutation,
  useSendUrlMutation,
  useExportFileMutation,
} = genieApi;
