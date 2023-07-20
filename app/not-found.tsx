"use client";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2">
      <div className="">404 | چیزی پیدا نشد</div>
      <Link href="/" className="p-1 text-blue-500">
        صفحه اصلی
      </Link>
    </div>
  );
}
