"use client";

import { ReactNode, useContext } from "react";
import WebSideBar from "./Sidebar";
import WebHeader from "./Header";
import { WebPreviewContext, WebPreviewContextType } from "@/context/webPreview.context";
import WebBottomMenu from "./BottomMenu";
import FullscreenExitIcon from "@/components/Icons/web/FullscreenExit";
import FullscreenIcon from "@/components/Icons/web/Fullscreen";
// import MapEstate from "../Features/Estate/MapEstate";

const WebLayout = ({ children }: { children: ReactNode }) => {
  const { isFullscreen, isFullContent, toggleFullscreen, background, sidebar } = useContext(WebPreviewContext) as WebPreviewContextType;

  return (
    <main
      //
      style={{ "--image-url": `url(/assets/images/web-bg.png)` } as React.CSSProperties}
      className="h-full bg-gray-300/50 bg-cover bg-no-repeat md:bg-[image:var(--image-url)]"
    >
      <div className="flex h-full w-full flex-col justify-center p-0 md:flex-row md:p-5">
        <div className={"relative flex h-full w-full flex-row overflow-hidden bg-white transition-all duration-1000 md:max-w-screen-2xl md:rounded-2xl" + (isFullscreen ? " md:!max-w-full" : "")}>
          <div className={"z-[101] flex h-full w-full flex-row transition-all duration-1000 md:rounded-e-2xl" + (background ? " " + background : "")}>
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
          {/* SIDEBAR:::: only show upper xl size */}
          <div className={"relative h-full w-0 transition-all duration-1000 xl:flex" + (!isFullContent && !!sidebar ? (sidebar?.small ? " xl:w-[32rem]" : " xl:w-[32rem] 2xl:w-[64rem]") : "")}>
            <div className="absolute top-4 z-[100] end-4">
              <div
                //
                onClick={toggleFullscreen}
                className="hidden h-full cursor-pointer items-center justify-center rounded-lg bg-white p-2 text-gray-500 shadow-[0px_0px_22px_0px_rgba(0,0,0,0.25)] 2xl:flex"
              >
                {isFullscreen && <FullscreenExitIcon />}
                {!isFullscreen && <FullscreenIcon />}
              </div>
            </div>
            {/* {!!sidebar &&
              (() => {
                switch (sidebar.content) {
                  case "MapEstate":
                    return <MapEstate {...(sidebar.props || {})} />;
                  case "RelatePost":
                    return "RelatePost";
                  default:
                    return sidebar.content;
                }
              })()} */}
          </div>
        </div>

        <WebBottomMenu />
      </div>
    </main>
  );
};

export default WebLayout;
