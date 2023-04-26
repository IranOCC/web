"use client";

import { Button } from "@/components/Button";
import LoginIcon from "@/components/Icons/Login";
import MenuIcon from "@/components/Icons/Menu";
import AddIcon from "@/components/Icons/Add";
import NotificationIcon from "@/components/Icons/Notification";
import UserIcon from "@/components/Icons/User";
import { OpenModalLink } from "@/components/Modals";
import LoginModal from "@/components/Modals/LoginModal";
import Link from "next/link";
import React, { ReactNode, useState } from "react";
import IconButton from "@/components/Button/IconButton";
import { useSelector } from "react-redux";
import CloseIcon from "@/components/Icons/Close";
import { store } from "@/store";
import { setMobileMenuOpen } from "@/store/options";
import PopTop from "./PopTop";
import { ClickAwayListener } from "@mui/material";
import { MobileMenu } from "./Menu";
import { Session } from "@/types/interfaces";

type ToolsItemProps = {
  title?: string;
  icon?: ReactNode;
  content?: ReactNode;
  popTop?: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  modalPath?: string;
  href?: string;
  className?: string;
};

const Tools = ({ session }: { session: Session | null }) => {
  const haveSession = session !== null;

  const mobileMenuOpen = useSelector((state: any) => state?.options?.mobileMenuOpen as boolean);
  const items: ToolsItemProps[] = [
    {
      modalPath: haveSession ? undefined : "auth",
      icon: haveSession ? <UserIcon /> : <LoginIcon />,
      // title: "ورود / عضویت",
      popTop: haveSession ? "Hello User " + session?.user?.fullName + "!" : undefined,
    },
    {
      icon: <NotificationIcon />,
      popTop: "Notifications",
      className: "hidden sm:block",
    },
    {
      icon: <Button title="افزودن لیست" noSpace icon={<AddIcon />} />,
      href: "/list",
      className: "hidden lg:block",
    },
    {
      icon: <IconButton icon={<AddIcon />} />,
      href: "/list",
      className: "hidden md:block lg:hidden",
    },
    {
      icon: mobileMenuOpen ? <CloseIcon /> : <MenuIcon />,
      popTop: <MobileMenu />,
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

const ToolsItem = ({ title, icon, onClick, href, modalPath, className = "", content = "", popTop }: ToolsItemProps) => {
  const child = (
    <div className="h-full min-w-[80px] px-4 whitespace-nowrap flex flex-col items-center justify-center text-gray-500 hover:text-blue-600 border-gray-200 border-s hover:bg-gray-50 ">
      {icon}
      {title ? <span className="text-sm mt-1">{title}</span> : null}
      {content}
    </div>
  );

  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [isOpenPopTop, setIsOpenPopTop] = useState(false);
  const handleOpen = () => {
    setIsOpenPopTop(true);
  };
  const handleClose = () => {
    setIsOpenPopTop(false);
  };
  if (popTop) {
    return (
      <>
        <ClickAwayListener onClickAway={handleClose}>
          <div className={"h-full"}>
            <div ref={anchorRef} onClick={handleOpen} className={"cursor-pointer h-full " + className}>
              {child}
            </div>
            <PopTop isOpen={isOpenPopTop} anchorRef={anchorRef}>
              {popTop}
            </PopTop>
          </div>
        </ClickAwayListener>
      </>
    );
  } else if (onClick) {
    return (
      <div onClick={onClick} className={"cursor-pointer " + className}>
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
