"use client";

import { Button } from "@/components/Button";
import LoginIcon from "@/components/Icons/Login";
import NotificationIcon from "@/components/Icons/Notification";
import UserIcon from "@/components/Icons/User";
import { OpenModalLink } from "@/components/Modals";
import LoginModal from "@/components/Modals/LoginModal";
import { Session } from "next-auth";
import Link from "next/link";
import React, { ReactNode } from "react";

type ToolsItemProps = {
  title?: string;
  icon?: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  modalPath?: string;
  href?: string;
};

const Tools = ({ session }: { session: Session | null }) => {
  const haveSession = session !== null;
  const items: ToolsItemProps[] = [
    {
      modalPath: haveSession ? undefined : "auth",
      href: haveSession ? "/dashboard" : undefined,
      icon: haveSession ? <UserIcon /> : <LoginIcon />,
      // title: "ورود / عضویت",
    },
    {
      icon: <NotificationIcon />,
      onClick: (e) => {
        alert("hello");
      },
    },
  ];

  return (
    <>
      <div className="float-left h-full flex items-center justify-center px-5 border-gray-200 border-s">
        <Button title="افزودن به لیست" noSpace />
      </div>
      <div className="float-left h-full">
        <div className={`h-full mx-auto font-medium flex`}>
          {items.map((props, i) => (
            <ToolsItem {...props} key={i} />
          ))}
        </div>
      </div>

      <LoginModal {...{ session }} />
    </>
  );
};

const ToolsItem = ({ title, icon, onClick, href, modalPath }: ToolsItemProps) => {
  const child = (
    <div className="h-full min-w-[80px] px-4 whitespace-nowrap flex flex-col items-center justify-center text-gray-500 hover:text-blue-600 border-gray-200 border-s hover:bg-gray-50 ">
      {icon}
      {title ? <span className="text-sm mt-1">{title}</span> : null}
    </div>
  );
  if (onClick) {
    return <button onClick={onClick}>{child}</button>;
  } else if (href) {
    return <Link href={href}>{child}</Link>;
  } else if (modalPath) {
    return (
      <OpenModalLink className="h-full w-full" path={modalPath}>
        {child}
      </OpenModalLink>
    );
  }
  return child;
};

export default Tools;
