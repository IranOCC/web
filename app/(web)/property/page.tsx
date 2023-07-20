"use client";

import { WebPreviewContext, WebPreviewContextType } from "@/context/webPreview.context";
import { useContext, useEffect } from "react";

export default function Page() {
  const { setBreadCrump } = useContext(WebPreviewContext) as WebPreviewContextType;

  useEffect(() => {
    setBreadCrump([
      { title: "ایران اکازیون", url: "/" },
      { title: "ویلا", url: "/" },
      { title: "متل قو", url: "/" },
    ]);
  }, []);
  return (
    <>
      <div>
        {/*  */}
        جستجو و لیست املاک
      </div>
    </>
  );
}
