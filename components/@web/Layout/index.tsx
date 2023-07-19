"use client";

import { ReactNode, useContext } from "react";
import WebSideBar from "./Sidebar";
import WebHeader from "./Header";
import { WebPreviewContext, WebPreviewContextType } from "@/context/webPreview.context";

const WebLayout = ({ children }: { children: ReactNode }) => {
  const { isFullscreen } = useContext(WebPreviewContext) as WebPreviewContextType;

  return (
    <main
      //
      style={{ "--image-url": `url(/assets/images/web-bg.png)` } as React.CSSProperties}
      className=" h-full bg-gray-300/50 bg-[image:var(--image-url)] bg-cover bg-no-repeat"
    >
      <div className="flex h-full w-full justify-center p-5">
        <div className={"relative flex h-full w-full max-w-screen-2xl flex-row overflow-hidden rounded-2xl bg-white transition-all duration-1000" + (isFullscreen ? " !max-w-full" : "")}>
          <WebSideBar />
          <WebHeader />
        </div>
      </div>
    </main>
  );
};

export default WebLayout;
