"use client";

import BlogIconSideBar from "@/components/Icons/web/sidebar/Blog";
import VipIconSideBar from "@/components/Icons/web/sidebar/Vip";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ReactNode, useContext, useState } from "react";

import HomeIconBottomMenu from "@/components/Icons/web/bottomMenu/Home";
import SearchIconBottomMenu from "@/components/Icons/web/bottomMenu/Search";
import UserIconBottomMenu from "@/components/Icons/web/bottomMenu/User";
import { Tooltip } from "antd";
import { CurrentUserContext, CurrentUserContextType } from "@/context/currentUser.context";
import BlogIconBottomMenu from "@/components/Icons/web/bottomMenu/Blog";
import VipIconBottomMenu from "@/components/Icons/web/bottomMenu/Vip";
import { ClickAwayListener } from "@mui/material";
import { signOut } from "next-auth/react";

type ItemType = {
  index: number;
  icon: ReactNode;
  title: string;
  href?: string;
  isActive?: () => boolean;
  className?: string;
  hasSubMenu?: boolean;
};

const WebBottomMenu = () => {
  //
  const [openSub, setOpenSub] = useState<number | null>(null);
  const [hovering, setHovering] = useState<number | null>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { user, showAdminPanel, isLogin } = useContext(CurrentUserContext) as CurrentUserContextType;

  const items: ItemType[] = [
    {
      index: 0,
      icon: <HomeIconBottomMenu />,
      title: "صفحه اصلی",
      href: "/",
      // className: "hidden min-[180px]:block",
    },
    {
      index: 1,
      icon: <SearchIconBottomMenu />,
      title: "جستجوی پیشرفته",
      href: "/property",
      isActive: () => pathname === "/property" && !searchParams?.get("filter[vip]"),
      // className: "hidden min-[240px]:block",
    },
    {
      index: 2,
      icon: <VipIconBottomMenu />,
      title: "املاک ویژه",
      href: "/property?filter[vip]=true",
      isActive: () => pathname === "/property" && !!searchParams?.get("filter[vip]"),
      // className: "hidden min-[400px]:block",
    },
    {
      index: 3,
      icon: <BlogIconBottomMenu />,
      title: "وبلاگ",
      href: "/blog",
      // className: "hidden min-[320px]:block",
    },
    {
      index: 4,
      icon: <UserIconBottomMenu />,
      title: isLogin ? "حساب کاربری" : "ورود/عضویت",
      href: isLogin ? "/dashboard" : "/auth",
      hasSubMenu: !!isLogin,
      // className: "hidden min-[180px]:block",
    },
  ];

  const isOpenSub = items.filter(({ index }: ItemType) => {
    return openSub === index;
  });
  const isActive = items.filter(({ href, isActive }: ItemType) => {
    return !!isActive ? isActive() : pathname === href;
  });
  const x = hovering !== null ? hovering : isOpenSub[0]?.index !== undefined ? isOpenSub[0]?.index : isActive[0]?.index !== undefined ? isActive[0]?.index : -1;

  return (
    <ClickAwayListener onClickAway={() => setOpenSub(null)}>
      <aside className={"absolute bottom-0 z-[102] flex w-full flex-col items-center justify-end rounded-t-3xl bg-white px-3 py-3 shadow-[-1px_-3px_20px_0px_rgba(0,0,0,38%)] transition-all md:hidden" + (openSub !== null ? " h-40" : " h-16")}>
        {openSub === 4 && (
          <>
            <div className="mb-3 w-full flex-1">
              <div className="h-full">
                <ul className="grid grid-cols-2 gap-1 p-2 text-sm font-bold">
                  {showAdminPanel && (
                    <li className="transition-colors hover:text-secondary">
                      <Link href="/admin">پنل مدیریت</Link>
                    </li>
                  )}
                  <li className="transition-colors hover:text-secondary">
                    <Link href="/dashboard">داشبورد من</Link>
                  </li>
                  <li className="transition-colors hover:text-secondary">
                    <Link href="/dashboard/profile">پروفایل</Link>
                  </li>
                  <li className="transition-colors hover:text-secondary">
                    <Link href="/dashboard/favorites">علاقه مندی ها</Link>
                  </li>
                  <li className="transition-colors hover:text-secondary">
                    <Link href="#" onClick={() => signOut()}>
                      خروج
                    </Link>
                  </li>
                </ul>
              </div>
              <hr />
            </div>
          </>
        )}
        <div className="relative">
          <div className="relative flex h-full flex-row items-center overflow-y-hidden">
            {items.map((item: ItemType) => {
              return (
                <MenuItem
                  //
                  key={item.index}
                  {...item}
                  setOpenSub={(idx: number) => setOpenSub((prev) => (prev !== idx && items[idx].hasSubMenu ? idx : null))}
                  setHovering={setHovering}
                />
              );
            })}
            <div
              //
              style={{ "--trX": `${-3.5 * x - 0.5}rem` } as React.CSSProperties}
              className="absolute z-0 hidden aspect-square h-full translate-x-[var(--trX)] rounded-2xl bg-secondary transition-transform start-0 min-[180px]:block"
            />
          </div>
        </div>
      </aside>
    </ClickAwayListener>
  );
};

export default WebBottomMenu;

//
// === MenuItem
const MenuItem = ({ index, icon, title, href, className, hasSubMenu, setOpenSub, setHovering }: ItemType & { setOpenSub: (d: number) => void; setHovering: (d: number | null) => void }) => {
  return (
    // <Tooltip arrow={false} placement="top" title={title}>
    <Link href={hasSubMenu ? "#" : href || "#"} onClick={() => setOpenSub(index)} className={" z-[1] flex h-full items-center justify-center px-2" + (className ? " " + className : "")} onMouseEnter={() => setHovering(index)} onMouseLeave={() => setHovering(null)}>
      <div className="flex items-center justify-center p-2">{icon}</div>
    </Link>
    // </Tooltip>
  );
};
