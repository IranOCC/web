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
import MarkerIcon from "@/components/Icons/MarkerIcon";
import moment from "jalali-moment";
import ShareButton from "../Features/@common/ShareButton";
import ReportButton from "../Features/@common/ReportButton";
import RatingButton from "../Features/@common/RatingButton";
import ContactUsModal from "@/components/Modals/ContactUsModal";
import { GoogleAnalytics } from "nextjs-google-analytics";
import { ExitToAppSharp } from "@mui/icons-material";

const getDynamicComponent = (path: string) =>
  dynamic(() => import("@/components/@web/" + path), {
    ssr: false,
    loading: () => <LoadingWithoutBg />,
  });

const WebLayout = ({ children }: { children: ReactNode }) => {
  const { isFullscreen, isFullContent, isOpenDetail, toggleOpenDetail, toggleFullscreen, background, sidebar, headerTitle, headerSubTitle } = useContext(WebPreviewContext) as WebPreviewContextType;

  const SideBarComponent = !!sidebar ? getDynamicComponent(sidebar.component) : undefined;
  return (
    <main
      //
      style={{ "--image-url": `url(/assets/images/web-bg.png)` } as React.CSSProperties}
      className="h-full bg-gray-300/50 bg-cover bg-no-repeat md:bg-[image:var(--image-url)]"
    >
      <GoogleAnalytics trackPageViews />
      <div className="flex h-full w-full flex-col justify-center p-0 md:flex-row md:p-5">
        <div className={"relative flex h-full w-full flex-row overflow-hidden bg-gray-200 transition-all duration-[2s] md:max-w-screen-2xl md:rounded-2xl md:bg-white" + (isFullscreen ? " md:!max-w-full" : "")}>
          <div className={"z-[101] flex h-full w-full flex-row shadow-[-6px_0px_20px_2px_#00000040] transition-all duration-1000 md:rounded-e-2xl" + (background ? " " + background : "")}>
            <WebSideBar />
            <div className="flex flex-1 flex-col">
              <WebHeader />

              {headerTitle && (
                <div className="hidden flex-col gap-2 px-3 md:flex">
                  <h1 className="text-lg font-bold">{headerTitle}</h1>
                  <div className="flex flex-col justify-between gap-y-1 py-1.5 empty:hidden lg:flex-row">
                    {headerSubTitle?.type === "estate" && <h4 className="text-sm font-bold">کد: {headerSubTitle.code || "-"}</h4>}
                    {headerSubTitle?.type === "estate" && (
                      <h6 className="flex items-center gap-1 text-sm font-medium text-gray-600">
                        <MarkerIcon />
                        <span className="order-last lg:order-first">{headerSubTitle.location || "-"}</span>
                      </h6>
                    )}
                    {headerSubTitle?.type === "blog" && (
                      <h6 className="flex items-center gap-1 truncate text-sm font-medium">
                        <span className="text-gray-600">دسته بندی:</span>
                        <span className="text-black">{headerSubTitle.category || "-"}</span>
                      </h6>
                    )}
                    {headerSubTitle?.type === "blog" && (
                      <h6 className="flex items-center gap-1 truncate text-sm font-medium ">
                        <span className="text-gray-600">نویسنده:</span>
                        <span className="text-black">{headerSubTitle.author || "-"}</span>
                      </h6>
                    )}
                    {headerSubTitle?.type === "blog" && (
                      <h6 className="flex items-center gap-1 truncate text-sm font-medium ">
                        <span className="text-gray-600">تاریخ انتشار:</span>
                        <span className="text-black">{moment(headerSubTitle.publishedAt).locale("fa").format("DD MMM YYYY") || "-"}</span>
                      </h6>
                    )}
                    {headerSubTitle?.type === "page" && (
                      <h6 className="flex items-center gap-1 truncate text-sm font-medium ">
                        <span className="text-gray-600">تاریخ انتشار:</span>
                        <span className="text-black">{moment(headerSubTitle.publishedAt).locale("fa").format("DD MMM YYYY") || "-"}</span>
                      </h6>
                    )}
                    {(headerSubTitle?.type === "blog" || headerSubTitle?.type === "page") && (
                      <div className="flex flex-row items-stretch gap-2">
                        {headerSubTitle?.rating && (
                          <RatingButton
                            //
                            userRate={headerSubTitle?.userRate}
                            rate={headerSubTitle?.rateScore}
                          />
                        )}
                        <div className="flex items-center justify-center gap-1 rounded-2xl bg-gray-100 p-1 empty:hidden">
                          {headerSubTitle?.report && <ReportButton />}
                          {headerSubTitle?.sharing && <ShareButton />}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {/*   */}
              <div className="h-full overflow-hidden">
                <Scrollbars
                  //
                  id="main"
                  universal
                  // autoHide={false}
                  hideTracksWhenNotNeeded
                  renderView={(props) => <div {...props} id="mainScroll" style={{ ...props.style, padding: 0, scrollBehavior: "smooth", marginLeft: props.style.marginRight, marginRight: 0 }} />}
                  //
                  renderTrackHorizontal={(props) => <div {...props} style={{ ...props.style, borderRadius: 0, background: "#D6D6D6", zIndex: 20, bottom: 2, right: 2, left: 2, height: 2 }} />}
                  renderThumbHorizontal={(props) => <div {...props} style={{ ...props.style, background: "#BEBEBE", borderRadius: "20px", height: 6, bottom: 2 }} />}
                  //
                  renderTrackVertical={(props) => <div {...props} style={{ ...props.style, borderRadius: 0, background: "#D6D6D6", zIndex: 20, right: 2, bottom: 2, top: 2, width: 2 }} />}
                  renderThumbVertical={(props) => <div {...props} style={{ ...props.style, background: "#BEBEBE", borderRadius: "20px", width: 6, right: -2 }} />}
                >
                  {children}
                </Scrollbars>
              </div>
            </div>
          </div>

          {/* SIDEBAR:::: only show upper xl size */}
          <div className={"relative h-full w-0 transition-all duration-[2s] xl:flex" + (!isFullContent && !!sidebar ? (sidebar?.small ? " xl:w-[32rem]" : " xl:w-[32rem] 2xl:w-[64rem]") : "")}>
            <div className="absolute end-4 top-4 z-[100]">
              <div
                //
                onClick={toggleFullscreen}
                className="hidden h-full cursor-pointer items-center justify-center rounded-3xl bg-white p-2 text-gray-500 shadow-[0px_0px_22px_0px_rgba(0,0,0,0.25)] 2xl:flex"
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

          {/* SIDEBAR:::: only show lower xl size */}
          <div className={"absolute z-[103] flex h-full w-full bg-background transition-all duration-[2s] xl:hidden" + (!sidebar ? " hidden" : "") + (!isOpenDetail ? " translate-x-full" : "")}>
            <div className="absolute end-4 top-4 z-10">
              <div
                //
                onClick={toggleOpenDetail}
                className="flex h-full cursor-pointer items-center justify-center rounded-3xl bg-white p-2 text-gray-500 shadow-[0px_0px_22px_0px_rgba(0,0,0,0.25)] 2xl:hidden"
              >
                <ExitToAppSharp />
              </div>
            </div>
            {!!SideBarComponent && (
              <div className="relative h-full w-full overflow-hidden">
                <div className="sidebar-component h-full w-full overflow-hidden">
                  <SideBarComponent {...(sidebar?.props || {})} />
                </div>
              </div>
            )}
          </div>
        </div>

        <WebBottomMenu />
      </div>
      <ContactUsModal />
    </main>
  );
};

export default WebLayout;
