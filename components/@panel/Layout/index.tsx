import { ReactNode, useState } from "react";
import PanelFooter from "./Footer";
import PanelSideBar from "./Sidebar";

const PanelLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full flex flex-row ">
      <PanelSideBar />
      <main className={"relative h-full mb-12 w-[calc(100%-4rem)] xl:w-[calc(100%-20rem)] transition-all duration-500 start-16 xl:start-80"}>{children}</main>
      <PanelFooter />
    </div>
  );
};

export default PanelLayout;
