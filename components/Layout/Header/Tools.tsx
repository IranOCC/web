"use client";

import { Button } from "@/components/Button";
import LoginIcon from "@/components/Icons/Login";
import MenuIcon from "@/components/Icons/Menu";
import AddIcon from "@/components/Icons/Add";
import NotificationIcon from "@/components/Icons/Notification";
import UserIcon from "@/components/Icons/User";
import { OpenModalLink } from "@/components/Modals";
import LoginModal from "@/components/Modals/LoginModal";
import { Session } from "next-auth";
import Link from "next/link";
import React, { ReactNode } from "react";
import IconButton from "@/components/Button/IconButton";

type ToolsItemProps = {
  title?: string;
  icon?: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  modalPath?: string;
  href?: string;
  className?: string;
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
      // onClick: (e) => {
      //   alert("hello");
      // },
      href: "gg",
      className: "hidden sm:block",
    },
    {
      icon: <Button title="افزودن لیست" noSpace icon={<AddIcon />} />,
      onClick: (e) => {
        alert("hello");
      },
      className: "hidden lg:block",
    },
    {
      icon: <IconButton icon={<AddIcon />} />,
      onClick: (e) => {
        alert("hello");
      },
      className: "hidden md:block lg:hidden",
    },
    {
      icon: <MenuIcon />,
      onClick: (e) => {
        // alert("hello");
      },
      className: "block lg:hidden",
    },
  ];

  return (
    <>
      <div className="float-left h-full ">
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

const ToolsItem = ({ title, icon, onClick, href, modalPath, className = "" }: ToolsItemProps) => {
  const child = (
    <div className="h-full min-w-[80px] px-4 whitespace-nowrap flex flex-col items-center justify-center text-gray-500 hover:text-blue-600 border-gray-200 border-s hover:bg-gray-50 ">
      {icon}
      {title ? <span className="text-sm mt-1">{title}</span> : null}
    </div>
  );
  if (onClick) {
    return (
      <div onClick={onClick} className={className}>
        {child}
      </div>
    );
  } else if (href) {
    return (
      <Link href={href} className={className}>
        {child}
      </Link>
    );
  } else if (modalPath) {
    return (
      <OpenModalLink className={className} path={modalPath}>
        {child}
      </OpenModalLink>
    );
  }
  return child;
};

export default Tools;
