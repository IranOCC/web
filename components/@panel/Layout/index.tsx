import { ReactNode } from "react";
import PanelFooter from "./Footer";
import PanelSideBar from "./Sidebar";

const PanelLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full flex flex-row bg-slate-100">
      {/* <PanelSideBar /> */}
      <main className="relative w-full h-full">
        {children}
        <PanelFooter />
      </main>
    </div>
  );
};

export default PanelLayout;
