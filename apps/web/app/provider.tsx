"use client";
import { NextUIProvider } from "@nextui-org/react";
import CustomNavbar from "@repo/ui/customNavbar";
import "@repo/ui/globals.css";
export interface ProviderProps {
  children: React.ReactNode;
}
export function Provider({ children }: ProviderProps) {
  return (
    <NextUIProvider>
      <h1>HERE</h1>
      <CustomNavbar />
      {children}
    </NextUIProvider>
  );
}
