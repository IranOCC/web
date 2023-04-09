import { ReactNode } from "react";
import PanelSideBar from "./Sidebar";

const PanelLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-full flex flex-row bg-slate-100">
      <PanelSideBar />
      <main className="w-full h-full">{children}</main>
    </div>
  );
};

export default PanelLayout;
