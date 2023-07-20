"use client";

import React, { ReactNode } from "react";

export type WebPreviewContextType = {
  isFullscreen: boolean;
  background: string;
  setBackground: (n: string) => void;
  toggleFullscreen: () => void;
};

export const WebPreviewContext = React.createContext<WebPreviewContextType | null>(null);

export const WebPreviewProvider = ({ children, initial }: { children: ReactNode; initial?: { full: boolean } }) => {
  const [isFullscreen, setFullscreen] = React.useState<boolean>(initial?.full || false);
  const [background, setBackground] = React.useState<string>("bg-white");

  const toggleFullscreen = () => {
    setFullscreen((prev) => !prev);
  };

  return (
    <WebPreviewContext.Provider value={{ isFullscreen, background, setBackground, toggleFullscreen }}>
      {children}
      {/*  */}
    </WebPreviewContext.Provider>
  );
};
