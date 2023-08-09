import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  IGenericResponse,
  ISigninReseponseSchema,
  ISocialSignupSchema,
} from "./types";
import { SignupInput } from "../../pages/auth/signup.page";
import { SigninInput } from "../../pages/auth/signin.page";
import { userApi } from "./userApi";

const BASE_URL = process.env.REACT_APP_SERVER_ENDPOINT as string;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/auth/`,
  }),
  endpoints: (builder) => ({
    socialAuth: builder.mutation<
      { access_token: string; role: string },
      ISocialSignupSchema
    >({
      query(data) {
        return {
          url: "social",
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
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(userApi.endpoints.getMe.initiate(null));
        } catch (error) {}
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
  useSocialAuthMutation,
  useSignupUserMutation,
  useSigninUserMutation,
  useVerifyEmailMutation,
} = authApi;
