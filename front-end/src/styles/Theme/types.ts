export interface ITheme {
  colors: IColors;
  fontSizes: IFontSizes;
  breakPoints: IBreakPoins;
  zIndexs: IZIndexs;
  fontWeights: IFontWeights;
}

export interface IColors {
  WHITE: string;
  GREEN: string;

  BLUE_LIGHT: string;
  BLUE: string;
  BlUE_DARK: string;

  ORANGE_LIGHT: string;
  ORANGE: string;
  ORANGE_DARK: string;
  ORANGE_PINK: string;

  BLACK_DARK: string;
  BLACK: string;
  BLACK_LIGHT: string;
  BLACK_WHITE: string;
  BLACK_WHITE_LIGHT: string;

  GRAY_DARK: string;
  GRAY: string;
  GRAY_LIGHT: string;
  GRAY_CUSTOM: string;
  GRAY_DARK_LIGHT: string;

  YELLOW_DARK: string;
  YELLOW: string;
  YELLOW_LIGHT: string;

  PINK_LIGHT: string;
  PINK: string;
  PRIMARY_RED: string;

  INPUT_COLOR: string;

  YELLOW_GRADIENT: string;
  YELLOW_GRADIENT_2: string;
  YELLOW_GRADIENT_3: string;

  PRIMARY_YELLOW: string;
  PRIMARY_BLUE: string;
  PRIMARY_ORANGE: string;
  PRIMARY_BLACK: string;
  PRIMARY_WHITE: string;
  PRIMARY_GREEN: string;
  PRIMARY_GRAY: string;

  COLLAPSE: string;
}

export interface IFontSizes {
  DEFAULT: string;
  MIN: string;
  MAX: string;
  XXXS: string; // 10px
  XXS: string; // 12px
  XS: string; // 14px
  S: string; // 16px
  M: string; // DEFAULT, 18px
  L: string; // 20px
  XL: string; // 24px
  XL2: string; // 26px
  XL2_5: string; // 28px
  XL3: string; // 32px
  XL4: string; // 36px
  XL5: string; // 40px
  XL6: string; // 48px
  XL7: string; // 56px
  XL8: string; // 60px
  XL9: string; // 64px
}

export interface IBreakPoins {
  XS: string;
  SM: string;
  MD: string;
  LG: string;
  XL: string;
}

export interface IZIndexs {
  NORMAL: number;
  MEDIUM: number;
  MAXIMUM: number;
  MINIMUM: number;
}

export interface IFontWeights {
  THIN: number;
  EXTRA_LIGHT: number;
  LIGHT: number;
  NORMAL: number;
  MEDIUM: number;
  SEMI_BOLD: number;
  EXTRA_BOLD: number;
}
