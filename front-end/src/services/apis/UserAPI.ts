import { createApi } from "@reduxjs/toolkit/query/react";
import { IUser, IParamsCommon, IResCommon, IErrorType } from "@/types";
import { baseQueryWithReAuth } from "./baseQuery";

export const userApi = createApi({
  reducerPath: "userApi",
  tagTypes: ["User"],
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({
    getUsers: builder.query<IResCommon<IUser[]>, void>({
      query: () => ({
        url: "/member/",
      }),
      providesTags: ["User"],
    }),
    getUserById: builder.query<IResCommon<IUser>, string | undefined>({
      query: (id) => ({
        url: `/member/${id}`,
      }),
      providesTags: ["User"],
    }),
    updateUserById: builder.mutation<
      IResCommon<IUser>,
      { id: string; body: Partial<IUser> }
    >({
      query: ({ id, body }) => ({
        url: `/member/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUserById: builder.mutation<IResCommon<IUser>, string>({
      query: (id) => ({
        url: `/brands/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserByIdMutation,
  useDeleteUserByIdMutation,
} = userApi;
