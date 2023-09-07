"use client";

import Link from "next/link";
import { WebPreviewContext, WebPreviewContextType } from "@/context/webPreview.context";
import { useContext, useEffect } from "react";
import { Card, CardBody } from "@nextui-org/react";
import { signOut } from "next-auth/react";

export default function Page() {
  const { dashboardPage } = useContext(WebPreviewContext) as WebPreviewContextType;
  useEffect(() => {
    dashboardPage();
  }, []);

  return (
    <div className="flex h-auto min-h-full flex-col items-center justify-between bg-gray-200 pb-16 md:bg-transparent md:pb-4">
      <div className="sticky top-0 z-20 flex w-full flex-col gap-2 self-start bg-gray-200 py-3 md:bg-white">
        <h1 className="relative flex w-fit justify-center pb-1 text-lg font-bold after:absolute after:bottom-0 after:h-1 after:w-[calc(100%-30px)] after:rounded-md after:bg-secondary after:content-['']">
          علاقه مندی های من
          {/*  */}
        </h1>
      </div>

      <div className="flex flex-row flex-wrap gap-4 px-4 py-5"></div>
      <div />
    </div>
  );
}
