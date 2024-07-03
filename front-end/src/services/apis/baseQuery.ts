import { CookieStorageKey, PublicRoute, SessionStorageKey } from "@/constants";
import {
  clearToken,
  getCookie,
  setCookie,
  getRefreshToken,
  setRefreshToken,
} from "@/utils";
import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env["NEXT_PUBLIC_BASE_API_URL"],
  prepareHeaders: (headers) => {
    const token = getCookie(CookieStorageKey.ACCESS_TOKEN);

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    const refreshArgs = {
      url: `${process.env["NEXT_PUBLIC_BASE_API_URL"]}/auth/refresh`,

      body: {
        refresh_token: getRefreshToken(),
      },

      method: "POST",
    };

    const { data }: { [key: string]: any } = await baseQuery(
      refreshArgs,
      api,
      extraOptions
    );
    // if (data) {
    //   setCookie(CookieStorageKey.ACCESS_TOKEN, data.access_token);
    //   setRefreshToken(CookieStorageKey.REFRESH_TOKEN, data.refresh_token);
    // } else {
    //   clearToken();
    //   window.location.href = PublicRoute.LOGIN;
    // }
    result = await baseQuery(args, api, extraOptions);
  }

  if (result.error && result.error.status === 403) {
    // window.location.href = PublicRoute.HOME;
  }
  return result;
};
