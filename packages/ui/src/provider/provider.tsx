"use client";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import {ThemeProviderProps} from "next-themes/dist/types";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}
export function Provider({ children ,themeProps}: ProvidersProps) {
  return (
    <NextUIProvider>
      <NextThemeProvider {...themeProps}>
        {children}
        <ToastContainer/>
      </NextThemeProvider>
    </NextUIProvider>
  );
}
