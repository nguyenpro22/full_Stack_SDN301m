import { CookieStorageKey, LocalStorageKey } from "@/constants";
import {
  clearLocalStorage,
  clearSessionStorage,
  getCookie,
  getFromLocalStorage,
  getFromSessionStorage,
  removeCookie,
  setCookie,
  setToLocalStorage,
} from "@/utils";

export const clearToken = () => {
  clearLocalStorage();
  clearSessionStorage();
  removeCookie(CookieStorageKey.ACCESS_TOKEN);
};

export const getAccessToken = (): string | null => {
  // return getFromSessionStorage(SessionStorageKey.ACCESS_TOKEN);
  return (
    getFromLocalStorage(LocalStorageKey.ACCESS_TOKEN) ||
    getFromSessionStorage(LocalStorageKey.ACCESS_TOKEN)
  );
};

export const setAccessToken = (value: any) => {
  return setToLocalStorage(LocalStorageKey.ACCESS_TOKEN, value);
};

export const getRefreshToken = () => {
  return getFromLocalStorage(LocalStorageKey.REFRESH_TOKEN);
};

export const setRefreshToken = (key: string, value: any) => {
  return setToLocalStorage(key, value);
};

export const decodeJwt = (token: string | null) => {
  if (!token) {
    return null;
  }
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  return JSON.parse(atob(base64));
};

export const GetDataByToken = (token: string): any | null => {
  const decoded = decodeJwt(token);
  const id = decoded?.id;
  const name = decoded?.membername;
  // const avatar = decoded?.avatar
  const isAdmin = decoded?.isAdmin;
  // const YoB = decoded?.YoB;
  return { id, name, isAdmin };
};

export const rememberMe = (token: string): void => {
  setCookie(CookieStorageKey.ACCESS_TOKEN, token, 30);
};
export const isRememberMe = (): boolean => {
  return getCookie(CookieStorageKey.ACCESS_TOKEN) ? true : false;
};
