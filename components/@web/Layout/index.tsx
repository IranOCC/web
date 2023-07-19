"use client";

import { ReactNode, useContext } from "react";
import WebSideBar from "./Sidebar";
import WebHeader from "./Header";
import { WebPreviewContext, WebPreviewContextType } from "@/context/webPreview.context";
import WebBottomMenu from "./BottomMenu";

const WebLayout = ({ children }: { children: ReactNode }) => {
  const { isFullscreen } = useContext(WebPreviewContext) as WebPreviewContextType;

  return (
    <main
      //
      style={{ "--image-url": `url(/assets/images/web-bg.png)` } as React.CSSProperties}
      className="h-full bg-gray-300/50 bg-cover bg-no-repeat md:bg-[image:var(--image-url)]"
    >
      <div className="flex h-full w-full flex-col justify-center p-0 md:flex-row md:p-5">
        <div className={"relative flex h-full w-full flex-row overflow-hidden md:max-w-screen-2xl md:rounded-2xl md:bg-white md:transition-all md:duration-1000" + (isFullscreen ? " md:!max-w-full" : "")}>
          <WebSideBar />
          <div className="flex flex-1 flex-col">
            <WebHeader />
            <div className="h-full overflow-x-hidden bg-green-400 p-2 pb-[5.5rem] md:pb-2">
              {children}
              {/*  */}
            </div>
          </div>
        </div>
        <WebBottomMenu />
      </div>
    </main>
  );
};

export default WebLayout;
