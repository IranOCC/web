"use client";


import Link from "next/link";
import { WebPreviewContext, WebPreviewContextType } from "@/context/webPreview.context";
import { useContext, useEffect } from "react";
import { Card, CardBody } from "@nextui-org/react";
import { signOut } from "next-auth/react";

export default function Page() {
  const { dashboardPage } = useContext(WebPreviewContext) as WebPreviewContextType;
  useEffect(() => {
    dashboardPage("علاقه مندی های من");
  }, []);

  return (
    <div className="flex h-auto min-h-full flex-col items-center justify-between bg-gray-200 px-4 pb-16 md:bg-transparent md:pb-4">
      <div className="flex flex-row flex-wrap gap-4 py-5">
        
      </div>
      <div />
    </div>
  );
}
