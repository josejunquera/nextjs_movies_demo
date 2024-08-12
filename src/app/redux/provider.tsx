"use client";

import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "./store";

interface ProviderProps {
  children: ReactNode;
}

const ProviderComponent = ({ children }: ProviderProps) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ProviderComponent;
