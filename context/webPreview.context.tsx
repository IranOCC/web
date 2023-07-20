"use client";

import React, { ReactNode } from "react";

export type WebPreviewContextType = {
  isFullscreen: boolean;
  background: string;
  setBackground: (n: string) => void;
  toggleFullscreen: () => void;

  breadCrump?: { title: string; url?: string }[];
  setBreadCrump: (n: { title: string; url?: string }[]) => void;

  // hasSidebar: boolean;
};

export const WebPreviewContext = React.createContext<WebPreviewContextType | null>(null);

export const WebPreviewProvider = ({ children, initial }: { children: ReactNode; initial?: { full: boolean } }) => {
  const [isFullscreen, setFullscreen] = React.useState<boolean>(initial?.full || false);
  const [background, setBackground] = React.useState<string>("bg-white");
  const [breadCrump, setBreadCrump] = React.useState<{ title: string; url?: string }[] | undefined>(undefined);
  const toggleFullscreen = () => {
    setFullscreen((prev) => !prev);
  };

  return (
    <WebPreviewContext.Provider value={{ isFullscreen, background, setBackground, toggleFullscreen, breadCrump, setBreadCrump }}>
      {children}
      {/*  */}
    </WebPreviewContext.Provider>
  );
};
