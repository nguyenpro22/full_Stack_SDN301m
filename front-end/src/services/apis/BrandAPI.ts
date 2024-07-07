import { createApi } from "@reduxjs/toolkit/query/react";
import { IBrand, IParamsCommon, IResCommon } from "@/types";
import { baseQueryWithReAuth } from "./baseQuery";

export const brandApi = createApi({
  reducerPath: "brandApi",
  tagTypes: ["Brand"],
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({
    getBrands: builder.query<IResCommon<IBrand[]>, void>({
      query: () => ({
        url: "/brand",
      }),
      providesTags: ["Brand"],
    }),
    getBrandById: builder.query<IResCommon<IBrand>, string | undefined>({
      query: (id) => ({
        url: `/brand/${id}`,
      }),
      providesTags: ["Brand"],
    }),
    createBrand: builder.mutation<IResCommon<IBrand>, Partial<IBrand>>({
      query: (body) => ({
        url: "/brand",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Brand"],
    }),
    updateBrandById: builder.mutation<
      IResCommon<IBrand>,
      { id: string; body: Partial<IBrand> }
    >({
      query: ({ id, body }) => ({
        url: `/brand/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Brand"],
    }),
    deleteBrandById: builder.mutation<IResCommon<IBrand>, string>({
      query: (id) => ({
        url: `/brand/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Brand"],
    }),
  }),
});

export const {
  useGetBrandsQuery,
  useGetBrandByIdQuery,
  useCreateBrandMutation,
  useUpdateBrandByIdMutation,
  useDeleteBrandByIdMutation,
} = brandApi;
