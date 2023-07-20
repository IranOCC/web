"use client";

import { ReactNode, useContext } from "react";
import WebSideBar from "./Sidebar";
import WebHeader from "./Header";
import { WebPreviewContext, WebPreviewContextType } from "@/context/webPreview.context";
import WebBottomMenu from "./BottomMenu";

const WebLayout = ({ children }: { children: ReactNode }) => {
  const { isFullscreen, background } = useContext(WebPreviewContext) as WebPreviewContextType;

  return (
    <main
      //
      style={{ "--image-url": `url(/assets/images/web-bg.png)` } as React.CSSProperties}
      className="h-full bg-gray-300/50 bg-cover bg-no-repeat md:bg-[image:var(--image-url)]"
    >
      <div className="flex h-full w-full flex-col justify-center p-0 md:flex-row md:p-5">
        <div className={"relative flex h-full w-full flex-row overflow-hidden bg-secondary transition-all duration-1000 md:max-w-screen-2xl md:rounded-2xl" + (isFullscreen ? " md:!max-w-full" : "")}>
          <div className={"flex h-full w-full flex-row md:rounded-e-2xl " + (background ? " " + background : "")}>
            <WebSideBar />
            <div className="flex flex-1 flex-col">
              <WebHeader />
              <div className="h-full overflow-hidden p-0 pb-16 md:pb-0">
                <div className="h-full overflow-auto p-2">
                  {/*  */}
                  {children}
                  {/*  */}
                </div>
              </div>
            </div>
          </div>
          {/* left sidebar */}
          <div className="h-full w-0 transition-all duration-1000 xl:flex xl:w-[32rem] 2xl:w-[64rem]">
            {/*  */}
            sidebar
            {/*  */}
          </div>
        </div>

        <WebBottomMenu />
      </div>
    </main>
  );
};

export default WebLayout;
