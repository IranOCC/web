"use client";

import { WebPreviewContext, WebPreviewContextType } from "@/context/webPreview.context";
import { useContext, useEffect } from "react";

export default function Page() {
  const { searchPage } = useContext(WebPreviewContext) as WebPreviewContextType;
  useEffect(() => {
    searchPage();
  }, []);

  return (
    <>
      <div className="flex h-auto min-h-full flex-col bg-gray-200 pb-16 md:bg-transparent md:px-4 md:pb-4">
        {/*  */}
        <div className="">43 مورد یافت شد</div>
      </div>
    </>
  );
}
