"use client";

import { store } from "@/redux/store";
import { Provider as ReduxProvider } from "react-redux";
import AuthProvider from "./auth-provider";
import { ReactNode } from "react";

export function Providers({ children }:{children:ReactNode}) {
  return (
    <AuthProvider>
      <ReduxProvider store={store}>{children}</ReduxProvider>
    </AuthProvider>
  );
}
