"use client";

import { useContext, useState } from "react";
import FullscreenIcon from "@/components/Icons/web/Fullscreen";
import FullscreenExitIcon from "@/components/Icons/web/FullscreenExit";
import { WebPreviewContext, WebPreviewContextType } from "@/context/webPreview.context";
import UserIcon from "@/components/Icons/User";
import UserFillIcon from "@/components/Icons/web/User";
import { CurrentUserContext, CurrentUserContextType } from "@/context/currentUser.context";
import ArrowDownOutlineIcon from "@/components/Icons/web/ArrowDownOutline";
import Link from "next/link";
import { signOut } from "next-auth/react";

const WebHeader = () => {
  const { toggleFullscreen, isFullscreen } = useContext(WebPreviewContext) as WebPreviewContextType;
  const { user, showAdminPanel, isLogin } = useContext(CurrentUserContext) as CurrentUserContextType;

  const [openSubMenu, setOpenSubMenu] = useState(false);
  return (
    <>
      <div className="hidden flex-col text-sm md:flex">
        <div className="flex flex-row items-start justify-end gap-5 px-4 py-4">
          {isLogin && (
            <Link href="#" className="flex h-full cursor-pointer items-center justify-center gap-2" onMouseEnter={() => setOpenSubMenu(true)} onMouseLeave={() => setOpenSubMenu(false)}>
              <div className="relative z-10 h-full">
                <span className="flex h-full  items-center justify-center gap-1 px-2 transition-colors">
                  <ArrowDownOutlineIcon />
                  <span>{user?.fullName}</span>
                </span>

                <div className={"absolute top-0 -z-10 w-full overflow-hidden rounded-2xl bg-white px-4 pb-2 pt-10 shadow-[0px_0px_19px_0px_rgba(0,0,0,0.25)]" + (openSubMenu ? " block" : " hidden")}>
                  <hr />
                  <ul className="mt-2">
                    {showAdminPanel && (
                      <li className="py-0.5 transition-colors hover:text-secondary">
                        <Link href="/admin">پنل مدیریت</Link>
                      </li>
                    )}
                    <li className="py-0.5 transition-colors hover:text-secondary">
                      <Link href="/dashboard">داشبورد من</Link>
                    </li>
                    <li className="py-0.5 transition-colors hover:text-secondary">
                      <Link href="/dashboard/profile">پروفایل</Link>
                    </li>
                    <li className="py-0.5 transition-colors hover:text-secondary">
                      <Link href="/dashboard/favorites">علاقه مندی ها</Link>
                    </li>
                    <li className="py-0.5 transition-colors hover:text-secondary">
                      <Link href="#" onClick={() => signOut()}>
                        خروج
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="rounded-full border-4 border-gray-400 bg-gray-50 p-1 text-gray-400">
                <UserFillIcon />
              </div>
            </Link>
          )}
          {!isLogin && (
            <Link href="/auth" className="group flex h-full cursor-pointer items-center justify-center gap-2">
              <div className="flex h-full items-center justify-center gap-1 transition-colors group-hover:text-secondary">
                <span>ورود / عضویت</span>
              </div>
              <div className="rounded-full border-4 border-gray-400 bg-gray-50 p-1 text-gray-400 transition-colors">
                <UserFillIcon />
              </div>
            </Link>
          )}
          <div
            //
            onClick={toggleFullscreen}
            className="hidden h-full cursor-pointer items-center justify-center rounded-lg bg-white p-2 text-gray-500 shadow-[0px_0px_22px_0px_rgba(0,0,0,0.25)] 2xl:flex"
          >
            {isFullscreen && <FullscreenExitIcon />}
            {!isFullscreen && <FullscreenIcon />}
          </div>
        </div>
      </div>
    </>
  );
};

export default WebHeader;
