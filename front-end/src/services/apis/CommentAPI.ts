import { createApi } from "@reduxjs/toolkit/query/react";
import { IComment, IResCommon } from "@/types";
import { baseQueryWithReAuth } from "./baseQuery";

export const commentApi = createApi({
  reducerPath: "commentAPI",
  tagTypes: ["Comment"],
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({
    createComment: builder.mutation<
      IResCommon<IComment>,
      { watchId: string; body: Partial<IComment> }
    >({
      query: ({ watchId, body }) => ({
        url: `/comment/${watchId}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Comment"],
    }),
    updateCommentById: builder.mutation<
      IResCommon<IComment>,
      { watchId: string; body: Partial<IComment> }
    >({
      query: ({ watchId, body }) => ({
        url: `/comment/${watchId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Comment"],
    }),
    deleteCommentById: builder.mutation<
      IResCommon<IComment>,
      { watchId: string; commentId: string }
    >({
      query: ({ watchId, commentId }) => ({
        url: `/comment/${watchId}/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Comment"],
    }),
  }),
});

export const {
  useCreateCommentMutation,
  useUpdateCommentByIdMutation,
  useDeleteCommentByIdMutation,
} = commentApi;
