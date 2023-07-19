"use client";

import React, { ReactNode } from "react";

export type WebPreviewContextType = {
  isFullscreen: boolean;
  toggleFullscreen: () => void;
};

export const WebPreviewContext = React.createContext<WebPreviewContextType | null>(null);

export const WebPreviewProvider = ({ children, initial }: { children: ReactNode; initial?: { full: boolean } }) => {
  const [isFullscreen, setFullscreen] = React.useState<boolean>(initial?.full || false);

  const toggleFullscreen = () => {
    setFullscreen((prev) => !prev);
  };

  return (
    <WebPreviewContext.Provider value={{ isFullscreen, toggleFullscreen }}>
      {children}
      {/*  */}
    </WebPreviewContext.Provider>
  );
};
