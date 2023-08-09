import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { IGenericResponse } from "./types";

const BASE_URL = process.env.REACT_APP_SERVER_ENDPOINT as string;

export const genieApi = createApi({
  reducerPath: "",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/genie/`,
  }),
  endpoints: (builder) => ({}),
});

export const {} = genieApi;
