import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./customFetchBase";
import {
  IGenericResponse,
  ISigninReseponseSchema,
  ISocialSignupSchema,
} from "./types";
import { SignupInput } from "../../pages/auth/signup.page";
import { SigninInput } from "../../pages/auth/signin.page";
import { userApi } from "./userApi";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    socialAuth: builder.mutation<
      { access_token: string; role: string },
      ISocialSignupSchema
    >({
      query(data) {
        return {
          url: "auth/social",
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
    signupUser: builder.mutation<IGenericResponse, SignupInput>({
      query(data) {
        return {
          url: "auth/signup",
          method: "POST",
          body: data,
        };
      },
    }),
    signinUser: builder.mutation<ISigninReseponseSchema, SigninInput>({
      query(data) {
        return {
          url: "auth/signin",
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
          url: "auth/verify",
          method: "PATCH",
          body: data,
        };
      },
    }),
    resetPassword: builder.mutation<IGenericResponse, { email: string }>({
      query(data) {
        return {
          url: "auth/forgot",
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
  useResetPasswordMutation,
} = authApi;
