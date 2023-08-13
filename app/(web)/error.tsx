"use client";

import { WebPreviewContext, WebPreviewContextType } from "@/context/webPreview.context";
import { useContext, useEffect, useState } from "react";
import BlackLogo from "@/assets/images/black-logo.png";
import Image from "next/image";
import { Input } from "@/components/Input";
import Link from "next/link";
import SearchBox from "@/components/@web/Features/@common/SearchBox";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  const { errorPage } = useContext(WebPreviewContext) as WebPreviewContextType;

  useEffect(() => {
    console.log("#Err:", error);
    console.log("#ErrName:", error.name);
    console.log("#ErrMessage:", error.message);
    console.log("#ErrCause:", error.cause);
    console.log("#ErrStack:", error.stack);
  }, [error]);

  useEffect(() => {
    errorPage();
  }, []);

  let _error = { code: 500, title: "مشکلی پیش اومده", message: error.message };
  switch (error.message) {
    case "PropertyNotFound":
    case "PostNotFound":
    case "PageNotFound":
      _error = { code: 404, title: "چیزی یافت نشد", message: error.message };
      break;
    case "Maintenance":
      _error = { code: 503, title: "در حال تعمیرات هستیم", message: error.message };
      break;
  }

  return (
    <div className="relative h-full">
      <div className="absolute flex h-full w-full items-center justify-center">
        <h1 className="text-[40vw] font-bold text-black/10 md:text-[25vw]">{_error.code}</h1>
      </div>
      <div className="relative flex h-full flex-col items-center justify-center gap-4">
        <Image src={BlackLogo} alt="logo" height={125} />
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold">{_error.title}</h2>
          {!!_error.message && <h6>{_error.message}</h6>}
        </div>
        <SearchBox />
        <Link href="/" className="p-1 font-bold text-blue-500">
          صفحه اصلی
        </Link>
        {/* <Input /> */}
      </div>
    </div>
  );
}
