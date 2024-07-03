"use client";

import { Provider } from "react-redux";
import React, { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from "@/redux/store";
import "./globals.css";
import { ConfigProvider, Layout, theme } from "antd";
import { ThemeProvider } from "styled-components";
import { antdTheme } from "@/styles";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Provider store={store}>
          <ConfigProvider theme={antdTheme}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
          </ConfigProvider>
          <ToastContainer />
        </Provider>
      </body>
    </html>
  );
}
