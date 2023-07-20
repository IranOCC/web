"use client";

import { WebPreviewContext, WebPreviewContextType } from "@/context/webPreview.context";
import { useContext, useEffect } from "react";

export default function Page() {
  const { setBreadCrump, setSidebar } = useContext(WebPreviewContext) as WebPreviewContextType;
  useEffect(() => {
    setBreadCrump(undefined);
    setSidebar(undefined);
  }, []);

  return (
    <div>
      {/*  */}
      صفحه اصلی
    </div>
  );
}
