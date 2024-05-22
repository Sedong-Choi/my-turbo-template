"use client";

import { NextUIProvider } from "@nextui-org/react";
export interface ProviderProps {
  children: React.ReactNode;
}
export function Provider({ children }: ProviderProps) {
  return (
    <NextUIProvider>
      {children}
    </NextUIProvider>
  );
}
