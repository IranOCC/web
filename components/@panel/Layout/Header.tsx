"use client";

import NotificationIcon from "@/components/Icons/Notification";
import RefreshIcon from "@/components/Icons/Refresh";
import UserIcon from "@/components/Icons/User";
import ViewIcon from "@/components/Icons/View";
import WebsiteIcon from "@/components/Icons/Website";
import { CurrentUserContext, CurrentUserContextType } from "@/context/currentUser.context";
import Link from "next/link";
import { useContext } from "react";

const PanelHeader = () => {
  const { user } = useContext(CurrentUserContext) as CurrentUserContextType;

  return (
    <header className="sticky top-0 z-50 bg-gray-200 p-4">
      <div className="relative flex h-full w-full items-center justify-end gap-2 rounded-lg ">
        {/* */}
        <Link
          //
          href="/"
          className={"focus:outline-nones rounded-lg bg-green-200  p-1.5 text-green-500 transition-colors duration-200 hover:bg-green-300"}
        >
          <WebsiteIcon />
        </Link>

        <Link
          //
          href="#"
          onClick={() => window.location.reload()}
          className={"focus:outline-nones rounded-lg bg-orange-200  p-1.5 text-orange-500 transition-colors duration-200 hover:bg-orange-300"}
        >
          <RefreshIcon />
        </Link>
        <Link
          //
          href="/admin/notification"
          className={"focus:outline-nones rounded-lg bg-blue-200  p-1.5 text-blue-500 transition-colors duration-200 hover:bg-blue-300"}
        >
          <NotificationIcon />
        </Link>
        <Link
          //
          href="/admin/profile"
          className={"focus:outline-nones flex gap-1 rounded-lg bg-purple-200 p-1.5 text-purple-500 transition-colors duration-200 hover:bg-purple-300"}
        >
          <UserIcon />
          <span className=" max-w-[5rem] truncate whitespace-nowrap text-sm">
            {/*  */}
            {user?.fullName || "پروفایل من"}
          </span>
        </Link>

        {/* <MainMenuItem
        //
        title="حساب کاربری من"
        href="profile"
        icon={<UserIcon />}
        highlight
        highlightClass="text-yellow-600 bg-yellow-100 dark:text-yellow-300 dark:bg-gray-800"
      /> */}
      </div>
    </header>
  );
};

export default PanelHeader;
