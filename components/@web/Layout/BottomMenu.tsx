"use client";

import BlogIconSideBar from "@/components/Icons/web/sidebar/Blog";
import VipIconSideBar from "@/components/Icons/web/sidebar/Vip";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useContext, useState } from "react";

import HomeIconBottomMenu from "@/components/Icons/web/bottomMenu/Home";
import SearchIconBottomMenu from "@/components/Icons/web/bottomMenu/Search";
import UserIconBottomMenu from "@/components/Icons/web/bottomMenu/User";
import { Tooltip } from "antd";
import { CurrentUserContext, CurrentUserContextType } from "@/context/currentUser.context";
import BlogIconBottomMenu from "@/components/Icons/web/bottomMenu/Blog";
import VipIconBottomMenu from "@/components/Icons/web/bottomMenu/Vip";

type ItemType = {
  index: number;
  icon: ReactNode;
  title: string;
  href: string;
};

const WebBottomMenu = () => {
  //
  const [hovering, setHovering] = useState<number | null>(null);
  const pathname = usePathname();

  const { user, isLogin } = useContext(CurrentUserContext) as CurrentUserContextType;

  const items: ItemType[] = [
    {
      index: 0,
      icon: <HomeIconBottomMenu />,
      title: "صفحه اصلی",
      href: "/",
    },
    {
      index: 1,
      icon: <SearchIconBottomMenu />,
      title: "جستجوی پیشرفته",
      href: "/property",
    },
    {
      index: 2,
      icon: <VipIconBottomMenu />,
      title: "املاک ویژه",
      href: "/property?filter[level]=vip",
    },
    {
      index: 3,
      icon: <BlogIconBottomMenu />,
      title: "وبلاگ",
      href: "/blog",
    },
    {
      index: 4,
      icon: <UserIconBottomMenu />,
      title: isLogin ? "داشبورد" : "ورود/عضویت",
      href: isLogin ? "/dashboard" : "/auth",
    },
  ];

  const isActive = items.filter(({ href }: ItemType) => {
    return href === pathname;
  });
  const x = hovering !== null ? hovering : isActive[0]?.index;
  return (
    <aside className="absolute bottom-0 z-10 flex h-20 w-full items-center justify-center rounded-t-3xl bg-white px-3 py-4 md:hidden">
      {/*  */}
      <div className="relative flex h-full flex-row items-center justify-center overflow-hidden">
        {items.map((item: ItemType) => {
          return (
            <MenuItem
              //
              {...item}
              setHovering={setHovering}
            />
          );
        })}
        <div
          //
          style={{ "--trX": `${-4.5 * x - 0.75}rem` } as React.CSSProperties}
          className="absolute z-0 aspect-square h-full translate-x-[var(--trX)] rounded-2xl bg-secondary transition-transform start-0"
        />
      </div>
      {/*  */}
    </aside>
  );
};

export default WebBottomMenu;

//
// === MenuItem
const MenuItem = ({ index, icon, title, href, setHovering }: ItemType & { setHovering: (d: number | null) => void }) => {
  return (
    <Tooltip arrow={false} placement="top" title={title}>
      <Link href={href} className="z-[1] flex h-full items-center justify-center px-4" onMouseEnter={() => setHovering(index)} onMouseLeave={() => setHovering(null)}>
        <div className="flex items-center justify-center p-2">{icon}</div>
      </Link>
    </Tooltip>
  );
};