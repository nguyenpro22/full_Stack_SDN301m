import {
  brandApi,
  userApi,
  watchApi,
  commentApi,
  authAPI,
} from "@/services/apis";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
  reducer: {
    [watchApi.reducerPath]: watchApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [brandApi.reducerPath]: brandApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    [authAPI.reducerPath]: authAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      watchApi.middleware,
      userApi.middleware,
      brandApi.middleware,
      commentApi.middleware,
      authAPI.middleware
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
