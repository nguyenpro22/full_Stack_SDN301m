import { PublicRoute } from "@/constants/route.constant";
import { MouseEventHandler } from "react";

export interface IMenuItem {
  title: string;
  path?: string;
  type: "link" | "button" | "group" | "external";
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  items?: SubMenuItem[];
  isLarge?: boolean;
}

export interface ISubMenuItem extends MenuItem {
  main?: boolean;
}

const Home: MenuItem = {
  title: "Home",
  path: PublicRoute.HOME,
  type: "link",
};

const Menu: MenuItem = {
  title: "Menu",
  path: PublicRoute.MENU,
  type: "link",
};

const About: MenuItem = {
  title: "About",
  path: PublicRoute.ABOUT,
  type: "link",
};
const Contact: MenuItem = {
  title: "Contact",
  path: PublicRoute.CONTACT,
  type: "link",
};
const Nutritions: MenuItem = {
  title: "Nutritions",
  path: PublicRoute.NUTRITIONS,
  type: "link",
};

const FoodFooterHome: MenuItem = {
  title: "Home",
  path: PublicRoute.HOME,
  type: "link",
  items: [
    {
      title: "Menu",
      path: PublicRoute.MENU,
      type: "link",
      isLarge: true,
    },
  ],
};

const FoodFooterAbout: MenuItem = {
  title: "About",
  path: PublicRoute.ABOUT,
  type: "link",
  items: [
    {
      title: "Contact",
      path: PublicRoute.CONTACT,
      type: "link",
      isLarge: true,
    },
  ],
};

const FoodFooterNutritions: MenuItem = {
  title: "Nutrtions",
  path: PublicRoute.NUTRITIONS,
  type: "link",
  items: [
    {
      title: "News",
      path: PublicRoute.NEWS,
      type: "link",
      isLarge: true,
    },
  ],
};

export const headerNavList: MenuItem[] = [
  Home,
  Menu,
  About,
  Contact,
  Nutritions,
];
export const footerNavList: MenuItem[] = [
  FoodFooterHome,
  FoodFooterAbout,
  FoodFooterNutritions,
];
