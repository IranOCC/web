"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error("RootError:", error);
  }, [error]);
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2">
      <div className="">500 | خطای ناشناخته ای رخ داد</div>
      <pre className="">{error.message}</pre>
      <Link href="/" className="p-1 text-blue-500">
        صفحه اصلی
      </Link>
    </div>
  );
}
