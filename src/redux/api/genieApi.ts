import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./customFetchBase";
import { IGenericResponse } from "./types";

export const genieApi = createApi({
  reducerPath: "",
  baseQuery: customFetchBase,
  endpoints: (builder) => ({}),
});

export const {} = genieApi;
