"use client";

import Loading from "@/components/Loading";
import { useSession } from "next-auth/react";
import { ReactNode, useEffect, useState } from "react";
import PanelFooter from "./Footer";
import PanelSideBar from "./Sidebar";
import PanelHeader from "./Header";

const PanelLayout = ({ children }: { children: ReactNode }) => {
  const { status } = useSession();
  if (status === "loading") return <Loading />;

  return (
    <div className="flex h-full flex-row ">
      <PanelSideBar />
      <main className={"relative mb-12 h-full w-[calc(100%-4rem)] transition-all duration-500 start-16 xl:w-[calc(100%-20rem)] xl:start-80"}>
        <PanelHeader />
        {children}
      </main>
    </div>
  );
};

export default PanelLayout;
