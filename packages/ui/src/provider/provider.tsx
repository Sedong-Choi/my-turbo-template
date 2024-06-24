"use client";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import {ThemeProviderProps} from "next-themes/dist/types";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function Provider({children}: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <NextThemeProvider attribute="class" defaultTheme="dark" >
        {children}
        <ToastContainer/>
      </NextThemeProvider>
    </NextUIProvider>
  );
}
