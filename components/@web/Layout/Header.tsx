"use client";

import { useContext, useState } from "react";
import FullscreenIcon from "@/components/Icons/web/Fullscreen";
import FullscreenExitIcon from "@/components/Icons/web/FullscreenExit";
import { WebPreviewContext, WebPreviewContextType } from "@/context/webPreview.context";
import UserFillIcon from "@/components/Icons/web/User";
import { CurrentUserContext, CurrentUserContextType } from "@/context/currentUser.context";
import ArrowDownOutlineIcon from "@/components/Icons/web/ArrowDownOutline";
import Link from "next/link";
import { signOut } from "next-auth/react";
import BreadCrump from "./BreadCrump";
import FullContentExitIcon from "@/components/Icons/web/FullContentExit";
import FullContentIcon from "@/components/Icons/web/FullContent";
import Logo from "@/assets/images/logo.png";
import Image from "next/image";
import ContactIcon from "@/components/Icons/web/Contact";

const WebHeader = () => {
  const { toggleFullscreen, isFullscreen, toggleFullContent, isFullContent, sidebar, setContactModalOpen } = useContext(WebPreviewContext) as WebPreviewContextType;

  const { user, showAdminPanel, isLogin } = useContext(CurrentUserContext) as CurrentUserContextType;

  const [openSubMenu, setOpenSubMenu] = useState(false);
  return (
    <>
      <div className="z-30 hidden flex-col text-sm md:flex">
        <div className="flex flex-row items-start justify-between px-4 py-4 ps-2">
          <BreadCrump />
          <div className="flex h-full flex-row gap-5">
            {isLogin && (
              <div className="flex h-full cursor-pointer items-center justify-center gap-2" onMouseEnter={() => setOpenSubMenu(true)} onMouseLeave={() => setOpenSubMenu(false)}>
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
                        <Link href="/dashboard/property/add">ثبت ملک جدید</Link>
                      </li>
                      <li className="py-0.5 transition-colors hover:text-secondary">
                        <Link href="/dashboard/property">املاک من</Link>
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
              </div>
            )}
            {!isLogin && (
              <Link href="/auth" className="flex h-full cursor-pointer items-center justify-center gap-2">
                <div className="flex h-full items-center justify-center gap-1 transition-colors">
                  <span>ورود / عضویت</span>
                </div>
                <div className="rounded-full border-4 border-gray-400 bg-gray-50 p-1 text-gray-400 transition-colors">
                  <UserFillIcon />
                </div>
              </Link>
            )}
            <div
              //
              onClick={!sidebar ? toggleFullscreen : toggleFullContent}
              className={"hidden h-full cursor-pointer items-center justify-center rounded-3xl bg-white p-2 text-gray-500 shadow-[0px_0px_22px_0px_rgba(0,0,0,0.25)]" + (!sidebar ? " 2xl:flex" : " xl:flex")}
            >
              {!sidebar && isFullscreen && <FullscreenExitIcon />}
              {!sidebar && !isFullscreen && <FullscreenIcon />}
              {!!sidebar && isFullContent && <FullContentExitIcon />}
              {!!sidebar && !isFullContent && <FullContentIcon />}
            </div>
          </div>
        </div>
      </div>

      <div className="z-30 flex flex-col text-sm md:hidden">
        <div className="flex w-full gap-3 bg-white px-6 py-3 drop-shadow-xl">
          <Link href="/" className="flex flex-col items-center gap-3">
            <Image src={Logo} alt="logo" className="w-32" />
          </Link>
          <div className="flex w-full flex-row items-center justify-end gap-2 truncate">
            <div onClick={() => setContactModalOpen(true)} className="flex flex-row items-center justify-center gap-2 rounded-lg bg-secondary p-1 text-sm text-white">
              <span className=" ">تماس با ما</span>
              <ContactIcon />
            </div>
            {/* <Link href="tel:0115400" className="flex flex-row justify-center gap-1 p-1 text-sm">
              <span>011-5400</span>
            </Link> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default WebHeader;
