"use client";

import { store } from "@/redux/store";
import { Provider as ReduxProvider } from "react-redux";
import AuthProvider from "./auth-provider";

export function Providers({ children }: any) {
  return (
    <AuthProvider>
      <ReduxProvider store={store}>{children}</ReduxProvider>
    </AuthProvider>
  );
}
