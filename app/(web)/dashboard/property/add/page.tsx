"use client";

import { WebPreviewContext, WebPreviewContextType } from "@/context/webPreview.context";
import { useContext, useEffect } from "react";
import React from "react";
import AddPropertyForm from "@/components/@web/Features/Dashboard/AddPropertyForm";

export default function Page() {
  const { dashboardPage } = useContext(WebPreviewContext) as WebPreviewContextType;
  useEffect(() => {
    dashboardPage();
  }, []);

  return (
    <div className="flex h-auto min-h-full flex-col items-center justify-start bg-gray-200 pb-16 md:bg-transparent md:pb-4">
      <div className="sticky top-[-1px] z-20 flex w-full flex-col gap-2 self-start bg-gray-200 px-4 py-3 md:bg-white">
        <h1 className="relative flex w-fit justify-center pb-1 text-lg font-bold after:absolute after:bottom-0 after:h-1 after:w-[calc(100%-30px)] after:rounded-md after:bg-secondary after:content-['']">
          ثبت ملک جدید
          {/*  */}
        </h1>
      </div>
      <AddPropertyForm />
      <div />
    </div>
  );
}
