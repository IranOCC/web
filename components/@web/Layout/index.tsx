"use client";

import { ReactNode, useContext, useEffect } from "react";
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
import { ReportGmailerrorredOutlined, ShareOutlined } from "@mui/icons-material";
import { Tooltip } from "antd";
import { Rating } from "@mui/material";

const getDynamicComponent = (path: string) =>
  dynamic(() => import("@/components/@web/" + path), {
    ssr: false,
    loading: () => <LoadingWithoutBg />,
  });

const WebLayout = ({ children }: { children: ReactNode }) => {
  const { isFullscreen, isFullContent, toggleFullscreen, background, sidebar, headerTitle, headerSubTitle } = useContext(WebPreviewContext) as WebPreviewContextType;

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

              {headerTitle && (
                <div className="flex flex-col gap-2 px-3">
                  <h1 className="text-lg font-bold">{headerTitle}</h1>
                  <div className="flex flex-col justify-between gap-y-1 empty:hidden lg:flex-row">
                    {headerSubTitle?.type === "estate" && <h4 className="text-sm font-bold">کد: {headerSubTitle.code || "-"}</h4>}
                    {headerSubTitle?.type === "estate" && (
                      <h6 className="flex items-center gap-1 text-sm font-medium text-gray-600">
                        <MarkerIcon />
                        <span className="order-last lg:order-first">{headerSubTitle.location || "-"}</span>
                      </h6>
                    )}
                    {headerSubTitle?.type === "blog" && (
                      <h6 className="flex items-center gap-1 text-sm font-medium ">
                        <span className="text-gray-600">دسته بندی:</span>
                        <span className="text-black">{headerSubTitle.category || "-"}</span>
                      </h6>
                    )}
                    {headerSubTitle?.type === "blog" && (
                      <h6 className="flex items-center gap-1 text-sm font-medium ">
                        <span className="text-gray-600">نویسنده:</span>
                        <span className="text-black">{headerSubTitle.author || "-"}</span>
                      </h6>
                    )}
                    {headerSubTitle?.type === "blog" && (
                      <h6 className="flex items-center gap-1 text-sm font-medium ">
                        <span className="text-gray-600">تاریخ انتشار:</span>
                        <span className="text-black">{headerSubTitle.publishedAt?.toString() || "-"}</span>
                      </h6>
                    )}
                    {headerSubTitle?.type === "page" && (
                      <h6 className="flex items-center gap-1 text-sm font-medium ">
                        <span className="text-gray-600">تاریخ انتشار:</span>
                        <span className="text-black">{headerSubTitle.publishedAt?.toString()}</span>
                      </h6>
                    )}
                    {(headerSubTitle?.type === "blog" || headerSubTitle?.type === "page") && (
                      <div className="flex flex-row items-stretch gap-2">
                        {headerSubTitle?.rating && (
                          <div className="flex items-center justify-center rounded-xl bg-gray-100 p-1">
                            <Rating
                              //
                              size="small"
                              readOnly={!!headerSubTitle?.userRate}
                              value={headerSubTitle?.rateScore || 0}
                              onChange={(e) => {}}
                            />
                          </div>
                        )}
                        <div className="flex items-center justify-center gap-1 rounded-xl bg-gray-100 p-1 empty:hidden">
                          {headerSubTitle?.report && (
                            <Tooltip title="گزارش مشکل" placement="top" arrow={false}>
                              <div role="report" className="flex cursor-pointer items-center justify-center text-gray-500">
                                <ReportGmailerrorredOutlined style={{ fontSize: 20 }} />
                              </div>
                            </Tooltip>
                          )}
                          {headerSubTitle?.sharing && (
                            <Tooltip title="اشتراک گذاری" placement="top" arrow={false}>
                              <div role="share" className="flex cursor-pointer items-center justify-center text-gray-500">
                                <ShareOutlined style={{ fontSize: 20 }} />
                              </div>
                            </Tooltip>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {/* <SingleEstateHeader />
              <SinglePageHeader />
              <SingleBlogHeader /> */}
              <div className="h-full overflow-hidden p-0 pb-20 pt-4 md:pb-4">
                <Scrollbars
                  //
                  universal
                  autoHide={false}
                  hideTracksWhenNotNeeded
                  renderView={(props) => <div {...props} style={{ ...props.style, padding: "0 15px", marginLeft: props.style.marginRight, marginRight: 0 }} />}
                  //
                  renderTrackHorizontal={(props) => <div {...props} style={{ ...props.style, right: 2, bottom: 2, top: 2, borderRadius: 0, background: "#D6D6D6", width: 2 }} />}
                  renderThumbHorizontal={(props) => <div {...props} style={{ ...props.style, background: "#BEBEBE", width: 6, borderRadius: "20px" }} />}
                  //
                  renderTrackVertical={(props) => <div {...props} style={{ ...props.style, right: 2, bottom: 2, top: 2, borderRadius: 0, background: "#D6D6D6", width: 2 }} />}
                  renderThumbVertical={(props) => <div {...props} style={{ ...props.style, background: "#BEBEBE", right: -2, width: 6, borderRadius: "20px" }} />}
                >
                  {children}
                </Scrollbars>
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
              <div className="absolute h-full w-[calc(100%+1.5rem)] overflow-hidden -start-6">
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
