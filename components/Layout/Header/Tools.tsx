"use client";

import { OpenModalLink } from "@/components/Modals";
import LoginModal from "@/components/Modals/LoginModal";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { MouseEventHandler, ReactNode } from "react";

type ToolsItemProps = {
  title?: string;
  icon?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  modalPath: string;
  href?: string;
};

const Tools = () => {
  const router = useRouter();
  const session = useSession();

  const items: ToolsItemProps[] = [
    {
      title: session.status === "authenticated" ? "من" : "حساب من",
      modalPath: "auth",
      icon: "M10 11V8L15 12L10 16V13H1V11H10ZM2.4578 15H4.58152C5.76829 17.9318 8.64262 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C8.64262 4 5.76829 6.06817 4.58152 9H2.4578C3.73207 4.94289 7.52236 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C7.52236 22 3.73207 19.0571 2.4578 15Z",
    },
    {
      modalPath: "notifications",
      icon: "M22 20H2V18H3V11.0314C3 6.04348 7.02944 2 12 2C16.9706 2 21 6.04348 21 11.0314V18H22V20ZM5 18H19V11.0314C19 7.14806 15.866 4 12 4C8.13401 4 5 7.14806 5 11.0314V18ZM9.5 21H14.5C14.5 22.3807 13.3807 23.5 12 23.5C10.6193 23.5 9.5 22.3807 9.5 21Z",
    },
  ];

  return (
    <>
      <div className="float-left h-full flex flex-col items-center justify-center px-5 border-gray-200 border-s">
        <button type="button" className="flex items-center justify-center px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-blue-300 ">
          Choose plan
          <svg aria-hidden="true" className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
          </svg>
        </button>
      </div>
      <div className="float-left	h-full">
        <div className={`grid h-full max-w-lg grid-cols-${items.length} mx-auto font-medium`}>
          {items.map((props, i) => (
            <ToolsItem {...props} key={i} />
          ))}
        </div>
      </div>

      <LoginModal />
    </>
  );
};

const ToolsItem = ({ title, icon, href, modalPath }: ToolsItemProps) => {
  return (
    <OpenModalLink className="h-full w-full" path={modalPath}>
      <button type="button" className="h-full  w-full inline-flex flex-col items-center justify-center px-5 border-gray-200 border-s hover:bg-gray-50 dark:hover:bg-gray-800 group dark:border-gray-600">
        <svg className="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d={icon}></path>
        </svg>
        <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">{title}</span>
      </button>
    </OpenModalLink>
  );
};

export default Tools;
