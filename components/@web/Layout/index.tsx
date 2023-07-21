"use client";

import { ReactNode, useContext } from "react";
import WebSideBar from "./Sidebar";
import WebHeader from "./Header";
import { WebPreviewContext, WebPreviewContextType } from "@/context/webPreview.context";
import WebBottomMenu from "./BottomMenu";
import FullscreenExitIcon from "@/components/Icons/web/FullscreenExit";
import FullscreenIcon from "@/components/Icons/web/Fullscreen";
import dynamic from "next/dynamic";
import { LoadingWithoutBg } from "@/components/Loading";
import Scrollbars from "react-custom-scrollbars-2";

const getDynamicComponent = (path: string) =>
  dynamic(() => import("@/components/@web/" + path), {
    ssr: false,
    loading: () => <LoadingWithoutBg />,
  });

const WebLayout = ({ children }: { children: ReactNode }) => {
  const { isFullscreen, isFullContent, toggleFullscreen, background, sidebar } = useContext(WebPreviewContext) as WebPreviewContextType;

  const SideBarComponent = !!sidebar ? getDynamicComponent(sidebar.component) : undefined;
  return (
    <main
      //
      style={{ "--image-url": `url(/assets/images/web-bg.png)` } as React.CSSProperties}
      className="h-full bg-gray-300/50 bg-cover bg-no-repeat md:bg-[image:var(--image-url)]"
    >
      <div className="flex h-full w-full flex-col justify-center p-0 md:flex-row md:p-5">
        <div className={"relative flex h-full w-full flex-row overflow-hidden bg-white transition-all duration-1000 md:max-w-screen-2xl md:rounded-2xl" + (isFullscreen ? " md:!max-w-full" : "")}>
          <div className={"z-[101] flex h-full w-full flex-row shadow-[-6px_0px_20px_2px_#00000040] transition-all duration-1000 md:rounded-e-2xl" + (background ? " " + background : "")}>
            <WebSideBar />
            <div className="flex flex-1 flex-col">
              <WebHeader />
              <div className="h-full overflow-hidden p-0 pb-16 md:pb-0">
                {/* <div className="h-full overflow-auto p-2"> */}
                <Scrollbars
                  //

                  universal
                  renderView={(props) => <div {...props} style={{ ...props.style, padding: "0 15px", marginLeft: props.style.marginRight, marginRight: 0 }} />}
                >
                  {children}
                </Scrollbars>
                {/* </div> */}
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
            {!!SideBarComponent && (
              <div className="absolute -start-6 h-full w-[calc(100%+1.5rem)] overflow-hidden">
                <div className="sidebar-component h-full w-full overflow-hidden">
                  <SideBarComponent {...(sidebar?.props || {})} />
                </div>
              </div>
            )}
          </div>
        </div>

        <WebBottomMenu />
      </div>
    </main>
  );
};

export default WebLayout;
