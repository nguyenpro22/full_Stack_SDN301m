import { createApi } from "@reduxjs/toolkit/query/react";
import { IWatch, IParamsCommon, IResCommon } from "@/types";
import { baseQueryWithReAuth } from "./baseQuery";

export const watchApi = createApi({
  reducerPath: "watchApi",
  tagTypes: ["Watch"],
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({
    getWatches: builder.query<IResCommon<IWatch[]>, void>({
      query: () => ({
        url: "/watch/getAllWatches",
      }),
      providesTags: ["Watch"],
    }),
    getWatchById: builder.query<IResCommon<IWatch>, string | undefined>({
      query: (id) => ({
        url: `/watch/${id}`,
      }),
      providesTags: ["Watch"],
    }),
    getWatchByBrandId: builder.query<IResCommon<IWatch[]>, string | undefined>({
      query: (id) => ({
        url: `/watch/brand/${id}`,
      }),
      providesTags: ["Watch"],
    }),
    createWatch: builder.mutation<IResCommon<IWatch>, Partial<IWatch>>({
      query: (body) => ({
        url: "/watch",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Watch"],
    }),
    updateWatchById: builder.mutation<
      IResCommon<IWatch>,
      { id: string; body: Partial<IWatch> }
    >({
      query: ({ id, body }) => ({
        url: `/watch/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Watch"],
    }),
    deleteWatchById: builder.mutation<IResCommon<IWatch>, string>({
      query: (id) => ({
        url: `/watch/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Watch"],
    }),
  }),
});

export const {
  useGetWatchesQuery,
  useGetWatchByIdQuery,
  useCreateWatchMutation,
  useUpdateWatchByIdMutation,
  useDeleteWatchByIdMutation,
  useGetWatchByBrandIdQuery,
} = watchApi;
