"use client";

import Link from "next/link";
import ArrowLeftOutlineIcon from "@/components/Icons/web/ArrowLeftOutline";
import { WebPreviewContext, WebPreviewContextType } from "@/context/webPreview.context";
import { useContext } from "react";

const BreadCrump = () => {
  const { breadCrump: items } = useContext(WebPreviewContext) as WebPreviewContextType;
  if (!items?.length) return null;
  return (
    <>
      <div className="flex h-full items-center">
        <ul className="flex flex-row">
          {items.map(({ title, url }, idx) => {
            const isLast = !(items.length === idx + 1);
            return (
              <>
                <li key={idx} className="flex justify-center pe-2">
                  <Link className="transition-colors pe-2 hover:text-blue-500" href={url || "#"}>
                    {title}
                  </Link>
                  {isLast && <ArrowLeftOutlineIcon />}
                </li>
              </>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default BreadCrump;
