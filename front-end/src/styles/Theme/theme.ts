import { ITheme } from "./types";
import type { ThemeConfig } from "antd";

const color = {
  WHITE: "#FFFFFF",
  GREEN: "#03A91D",

  BLUE_LIGHT: "#1AA7EC",
  BLUE: "#005FDD",
  BlUE_DARK: "#186DDF",

  ORANGE_LIGHT: "#F79520",
  ORANGE: "#FF9900",
  ORANGE_DARK: "#ff5200",
  ORANGE_PINK: "#E7582E",

  BLACK_DARK: "#000000",
  BLACK: "#111921",
  BLACK_GRAY: "#111827",
  BLACK_LIGHT: "#222324",
  BLACK_WHITE: "#F6F7F8",
  BLACK_WHITE_LIGHT: "#F5F6F7",

  GRAY_DARK: "#676869",
  GRAY: "#9A9898",
  GRAY2: "#dfdfdf",
  GRAY_LIGHT: "#DFDFDF",
  GRAY_CUSTOM: "#C1C1C1",
  GRAY_DARK_LIGHT: "#6D7280",
  GRAY_DARK_LIGHT_SECOND: "#777777",

  YELLOW_DARK: "#E8BA00",
  YELLOW: "#F3C300",
  YELLOW_LIGHT: "#FAD851",
  YELLOW_LIGHTER: "#ffefae",

  PINK_LIGHT: "#FFECD4",
  PINK: "#F1592C",
  PRIMARY_RED: "#FF0000",

  INPUT_COLOR: "rgba(27, 31, 59, 0.65)",
  YELLOW_GRADIENT:
    "linear-gradient(88.88deg, #F3C300 30.82%, #F79520 55.87%, #F1592C 75.79%)",
  YELLOW_GRADIENT_2: "linear-gradient(90deg, #F3C300 11.89%, #F79520 97.8%)",
  YELLOW_GRADIENT_3:
    "linear-gradient(89deg, #F3C300 39.93%, #F79520 76.36%, #F1592C 96.86%)",

  POPOVER: "rgba(0,0,0, 0.65)",
  LOGIN_WHITE: "rgba(255, 255, 255, 0.3)",

  COLLAPSE: "rgba(255, 255, 255, 0.20)",
  COLLAPSE_TEXT: "#111920",
  BANNER_OVERLAY: "rgba(0,0,0, 0.6)",

  PRIMARY_YELLOW: "#F3C300",
  PRIMARY_BLUE: "#005FDD",
  PRIMARY_ORANGE: "#F1592C",
  PRIMARY_BLACK: "#111921",
  PRIMARY_WHITE: "#FFFFFF",
  PRIMARY_GREEN: "#03A91D",
  PRIMARY_GRAY: "#9A9898",
};

const fontSize = {
  DEFAULT: "1.125rem",
  MIN: "0.75rem",
  MAX: "3rem",
  XS3: "0.625rem", //10px
  XXS: "0.75rem", // 12px
  XSS: "0.8125rem", // 13px
  XS: "0.875rem", // 14px
  S: "1rem", // 16px
  M: "1.125rem", // DEFAULT, 18px
  L: "1.25rem", // 20px
  XSL: "1.4rem", // 20px
  XL: "1.5rem", // 24px
  XL2: "1.625rem", // 26px
  XL2_5: "1.75rem", // 28px
  XL3: "2rem", // 32px
  XL4: "2.25rem", // 36px
  XL5: "2.5rem", // 40px
  XL6: "3rem", // 48px
  XL7: "3.5rem", // 56px
  XL8: "3.75rem", // 60px
  XL9: "4rem", // 64px
};

const fontWeight = {
  THIN: 100,
  EXTRA_LIGHT: 200,
  LIGHT: 300,
  NORMAL: 400,
  MEDIUM: 500,
  SEMI_BOLD: 600,
  EXTRA_BOLD: 700,
  BOLD: "bold",
};

const breakPoint = {
  XS: "576px",
  SM: "768px",
  MD: "992px",
  LG: "1200px",
  XL: "1600px",
};

const breakPointValue = {
  XS: 576,
  SM: 768,
  MD: 992,
  LG: 1200,
  XL: 1600,
};

const zIndex = {
  NORMAL: 1,
  MEDIUM: 99,
  HIGH: 999,
  HIGHEST: 9999,
};

const theme: ITheme = {
  colors: color,
  fontSizes: {
    DEFAULT: "1.125rem",
    MIN: "0.75rem",
    MAX: "3rem",
    XXXS: "0.625rem", //10px
    XXS: "0.75rem", // 12px
    XS: "0.875rem", // 14px
    S: "1rem", // 16px
    M: "1.125rem", // DEFAULT, 18px
    L: "1.25rem", // 20px
    XL: "1.5rem", // 24px
    XL2: "1.625rem", // 26px
    XL2_5: "1.75rem", // 28px
    XL3: "2rem", // 32px
    XL4: "2.25rem", // 36px
    XL5: "2.5rem", // 40px
    XL6: "3rem", // 48px
    XL7: "3.5rem", // 56px
    XL8: "3.75rem", // 60px
    XL9: "4rem", // 64px
  },
  breakPoints: {
    // <= this break point
    // E.g: xs:  <= 576px, sm: <=768px
    XS: "576px",
    SM: "768px",
    MD: "992px",
    LG: "1200px",
    XL: "1600px",
  },
  zIndexs: {
    NORMAL: 1,
    MEDIUM: 10,
    MAXIMUM: 99,
    MINIMUM: -1,
  },
  fontWeights: {
    THIN: 100,
    EXTRA_LIGHT: 200,
    LIGHT: 300,
    NORMAL: 400,
    MEDIUM: 500,
    SEMI_BOLD: 600,
    EXTRA_BOLD: 700,
  },
};

const antdTheme: ThemeConfig = {
  token: {
    fontSize: 14,
    colorPrimary: color.PRIMARY_ORANGE,
    colorPrimaryHover: color.PRIMARY_YELLOW,
    colorPrimaryActive: color.YELLOW_DARK,
    colorText: color.BLACK,
    colorTextPlaceholder: color.GRAY,
    colorBorder: color.GRAY_LIGHT,
    colorLinkHover: color.YELLOW,
    fontFamily: "Inter,system-ui,Avenir,Helvetica,Arial,sans-serif!important",
    boxShadow: "none",
    colorError: color.PRIMARY_RED,
    colorBgLayout: color.BANNER_OVERLAY, // Set the color you want for the sidebar background
  },
  components: {
    Button: {
      borderRadius: 8,
    },
    Input: {
      borderRadius: 12,
      // colorBorder: color.GRAY,
    },
    DatePicker: {
      controlHeight: 44,
      colorPrimaryBorderHover: color.YELLOW,
      borderRadius: 12,
    },
  },
};

export {
  antdTheme,
  theme,
  fontSize,
  fontWeight,
  color,
  breakPoint,
  breakPointValue,
  zIndex,
};
