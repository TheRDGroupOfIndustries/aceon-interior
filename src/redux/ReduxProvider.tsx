"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import StateInitializer from "./StateInitializer";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      {children}

      <StateInitializer />
    </Provider>
  );
}
