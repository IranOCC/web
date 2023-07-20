"use client";

import { WebPreviewContext, WebPreviewContextType } from "@/context/webPreview.context";
import { useContext, useEffect } from "react";

export default function Page() {
  const { setBackground, setBreadCrump, setSidebar } = useContext(WebPreviewContext) as WebPreviewContextType;
  useEffect(() => {
    setBackground("bg-white");
    setBreadCrump(undefined);
    setSidebar(undefined);
  }, []);

  return (
    <>
      <div>
        {/*  */}
        لیست پست ها
      </div>
    </>
  );
}
