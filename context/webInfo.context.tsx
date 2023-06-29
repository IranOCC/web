"use client";

import React, { ReactNode } from "react";
import { WebInfo } from "@/types/interfaces";

export type WebInfoType = {
  title: string;
  description: string;
  keywords: string[];
  setWebInfo: (data: any) => void;
};

export const WebInfoContext = React.createContext<WebInfoType | null>(null);

export const WebInfoProvider = ({ children, initial }: { children: ReactNode; initial: WebInfo }) => {
  const [info, setInfo] = React.useState<any>(initial);

  const setWebInfo = (data: any) => {
    setInfo(data);
  };

  return (
    <WebInfoContext.Provider value={{ ...info, setWebInfo }}>
      {children}
      {/*  */}
    </WebInfoContext.Provider>
  );
};
