"use client";

import React, { ReactNode } from "react";

export type LoadingContextType = {
  label: string | null;
  isLoading: boolean;
  showLoading: (label?: string) => void;
  hideLoading: () => void;
};

export const LoadingContext = React.createContext<LoadingContextType | null>(null);

export const LoadingProvider = ({ children, initial }: { children: ReactNode; initial?: { label?: string; loading: boolean } }) => {
  const [isLoading, setLoading] = React.useState<boolean>(initial?.loading || false);
  const [label, setLoadingLabel] = React.useState<string | null>(initial?.label || "در حال بارگذاری ...");

  const showLoading = (label?: string) => {
    setLoadingLabel(label || null);
    setLoading(true);
  };
  const hideLoading = () => setLoading(false);

  return (
    <LoadingContext.Provider value={{ label, isLoading, showLoading, hideLoading }}>
      {children}
      {/*  */}
    </LoadingContext.Provider>
  );
};
