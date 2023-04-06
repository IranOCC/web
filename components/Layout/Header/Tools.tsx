"use client";

import LoginModal from "@/components/Modals/LoginModal";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { MouseEventHandler, ReactNode } from "react";

type ToolsItemProps = {
  title?: string;
  icon?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const Tools = () => {
  const router = useRouter();

  const items: ToolsItemProps[] = [
    {
      title: "حساب من",
      onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        router.push("?modal=auth");
      },
      icon: "M20 22H18V20C18 18.3431 16.6569 17 15 17H9C7.34315 17 6 18.3431 6 20V22H4V20C4 17.2386 6.23858 15 9 15H15C17.7614 15 20 17.2386 20 20V22ZM12 13C8.68629 13 6 10.3137 6 7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7C18 10.3137 15.3137 13 12 13ZM12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z",
    },
    {
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

const ToolsItem = ({ title, icon, onClick }: ToolsItemProps) => {
  return (
    <button type="button" onClick={onClick} className="inline-flex flex-col items-center justify-center px-5 border-gray-200 border-s hover:bg-gray-50 dark:hover:bg-gray-800 group dark:border-gray-600">
      <svg className="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d={icon}></path>
      </svg>
      <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">{title}</span>
    </button>
  );
};

export default Tools;
