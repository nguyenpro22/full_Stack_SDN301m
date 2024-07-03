const publicRoutePath = "";
const privateRoutePath = "/admin";
const privateRouteManagerPath = "/manager";
const AUTH_URL = `${publicRoutePath}/auth`;

export const PublicRoute = {
  LOGIN: `${AUTH_URL}/login`,
  FORBIDDEN: `${publicRoutePath}/403`,
  ERROR: `${publicRoutePath}/error`,
  HOME: `${publicRoutePath}/`,
  MENU: `${publicRoutePath}/menu`,
  ORDER: `${publicRoutePath}/menu/order`,
  CONTACT: `${publicRoutePath}/contact`,
  NEWS: `${publicRoutePath}/news`,
  PAYMENT: `${publicRoutePath}/payment`,
  PAYMENT_SUCCESS: `${publicRoutePath}/payment/success`,
  ABOUT: `${publicRoutePath}/about`,
  NUTRITIONS: `${publicRoutePath}/nutritions`,
  PROFILE: `${publicRoutePath}/profile`,
  ORDER_HISTORY: `${publicRoutePath}/profile/order`,
  PASSWORD: `${publicRoutePath}/profile/password`,
};

export const PrivateRoute = {
  HOME: `${privateRoutePath}`,

  ACCOUNT: `${privateRoutePath}/account`,
  ADD_NEW_USER: `${privateRoutePath}/addnewuser`,
};

export const PrivateManagerRoute = {
  HOME: `${privateRouteManagerPath}`,
  DASHBOARD: `${privateRouteManagerPath}/dashboard`,
  PRODUCT: `${privateRouteManagerPath}/product/productTemplate`,
  CATEGORY: `${privateRouteManagerPath}/product/category`,
  INGREDIENT_LIST: `${privateRouteManagerPath}/ingredient/ingredientList`,
  INGREDIENT_TYPE: `${privateRouteManagerPath}/ingredient/ingredientType`,
  NEWS_LIST: `${privateRouteManagerPath}/news/newsList`,
  TEMPLATESTEP: `${privateRouteManagerPath}/templateStep`,
};
