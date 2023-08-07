import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  IGenericResponse,
  ISigninReseponseSchema,
  ISocialSignupSchema,
} from "./types";
import { SignupInput } from "../../pages/auth/signup.page";
import { SigninInput } from "../../pages/auth/signin.page";

const BASE_URL = process.env.REACT_APP_SERVER_ENDPOINT as string;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/auth/`,
  }),
  endpoints: (builder) => ({
    socialSignup: builder.mutation<IGenericResponse, ISocialSignupSchema>({
      query(data) {
        return {
          url: "signup/social",
          method: "POST",
          body: data,
        };
      },
    }),
    signupUser: builder.mutation<IGenericResponse, SignupInput>({
      query(data) {
        return {
          url: "signup",
          method: "POST",
          body: data,
        };
      },
    }),
    signinUser: builder.mutation<ISigninReseponseSchema, SigninInput>({
      query(data) {
        return {
          url: "signin",
          method: "POST",
          body: data,
          credentials: "include",
        };
      },
    }),
    verifyEmail: builder.mutation<IGenericResponse, { code: string }>({
      query(data) {
        return {
          url: "verify",
          method: "PATCH",
          body: data,
        };
      },
    }),
  }),
});

export const {
  useSocialSignupMutation,
  useSignupUserMutation,
  useSigninUserMutation,
  useVerifyEmailMutation,
} = authApi;
