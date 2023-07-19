"use client";

import { ReactNode, useEffect, useState } from "react";
import PanelSideBar from "./Sidebar";
import PanelHeader from "./Header";

const PanelLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-row ">
      <PanelSideBar />
      <main className={"relative h-auto w-[calc(100%-4rem)] transition-all duration-500 start-16 xl:w-[calc(100%-20rem)] xl:start-80"}>
        <PanelHeader />
        {children}
      </main>
    </div>
  );
};

export default PanelLayout;
