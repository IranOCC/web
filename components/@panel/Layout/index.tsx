"use client";

import Loading from "@/components/Loading";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { useSession } from "next-auth/react";
import { ReactNode, useEffect, useState } from "react";
import PanelFooter from "./Footer";
import PanelSideBar from "./Sidebar";

const PanelLayout = ({ children }: { children: ReactNode }) => {
  const { status } = useSession();
  if (status === "loading") return <Loading />;

  return (
    <div className="h-full flex flex-row ">
      <PanelSideBar />
      <main className={"relative h-full mb-12 w-[calc(100%-4rem)] xl:w-[calc(100%-20rem)] transition-all duration-500 start-16 xl:start-80"}>{children}</main>
      {/* <PanelFooter /> */}
    </div>
  );
};

export default PanelLayout;
