"use client";

import { WebPreviewContext, WebPreviewContextType } from "@/context/webPreview.context";
import { useContext, useEffect } from "react";

export default function Page() {
  const { internalPage } = useContext(WebPreviewContext) as WebPreviewContextType;
  useEffect(() => {
    internalPage();
  }, []);

  return (
    <div>
      {/*  */}
      صفحه اصلی
    </div>
  );
}
