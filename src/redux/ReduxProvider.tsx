"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import StateInitializer from "./StateInitializer";
import { SessionProvider } from "next-auth/react";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Provider store={store}>
        {children}

        <StateInitializer />
      </Provider>
    </SessionProvider>
  );
}
