// authAPI.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import { IUser, IResCommon, ILoginResponse, IRegisterResponse } from "@/types";
import { baseQueryWithReAuth } from "./baseQuery";

export const authAPI = createApi({
  reducerPath: "AuthAPI",
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({
    login: builder.mutation<IResCommon<ILoginResponse>, Partial<IUser>>({
      query: (body) => ({
        url: `/authen/login`,
        method: "POST",
        body,
      }),
    }),
    register: builder.mutation<IResCommon<IRegisterResponse>, Partial<IUser>>({
      query: (body) => ({
        url: `/authen/register`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authAPI;
