"use client";

import React, { ReactNode } from "react";

export type WebPreviewContextType = {
  isFullscreen: boolean;
  toggleFullscreen: () => void;

  background: string;
  setBackground: (n: string) => void;

  breadCrump?: { title: string; url?: string }[];
  setBreadCrump: (n: { title: string; url?: string }[]) => void;

  isFullContent: boolean;
  toggleFullContent: () => void;

  sidebar?: { small: boolean; content: ReactNode };
  setSidebar: (n: { small: boolean; content: ReactNode }) => void;
};

export const WebPreviewContext = React.createContext<WebPreviewContextType | null>(null);

export const WebPreviewProvider = ({ children, initial }: { children: ReactNode; initial?: { full: boolean } }) => {
  const [isFullscreen, setFullscreen] = React.useState<boolean>(initial?.full || false);
  const [background, setBackground] = React.useState<string>("bg-white");
  const [breadCrump, setBreadCrump] = React.useState<{ title: string; url?: string }[] | undefined>(undefined);
  const [sidebar, setSidebar] = React.useState<{ small: boolean; content: ReactNode } | undefined>(undefined);
  const [isFullContent, setFullContent] = React.useState<boolean>(false);

  const toggleFullscreen = () => {
    setFullscreen((prev) => !prev);
  };
  const toggleFullContent = () => {
    setFullContent((prev) => !prev);
  };
  return (
    <WebPreviewContext.Provider
      value={{
        isFullscreen,
        toggleFullscreen,
        isFullContent,
        toggleFullContent,
        background,
        setBackground,
        breadCrump,
        setBreadCrump,
        sidebar,
        setSidebar,
      }}
    >
      {children}
      {/*  */}
    </WebPreviewContext.Provider>
  );
};
