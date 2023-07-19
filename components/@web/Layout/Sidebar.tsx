"use client";

import BlogIconSideBar from "@/components/Icons/web/sidebar/Blog";
import ContactIconSideBar from "@/components/Icons/web/sidebar/Contact";
import HomeIconSideBar from "@/components/Icons/web/sidebar/Home";
import SearchIconSideBar from "@/components/Icons/web/sidebar/Search";
import VipIconSideBar from "@/components/Icons/web/sidebar/Vip";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import Logo from "@/assets/images/logo.png";
import Image from "next/image";
import ContactIcon from "@/components/Icons/web/Contact";

type ItemType = {
  index: number;
  icon: ReactNode;
  title: string;
  href: string;
};

const items: ItemType[] = [
  {
    index: 0,
    icon: <HomeIconSideBar />,
    title: "صفحه اصلی",
    href: "/",
  },
  {
    index: 1,
    icon: <SearchIconSideBar />,
    title: "جستجوی پیشرفته",
    href: "/property",
  },
  {
    index: 2,
    icon: <VipIconSideBar />,
    title: "املاک ویژه",
    href: "/property?filter[level]=vip",
  },
  {
    index: 3,
    icon: <BlogIconSideBar />,
    title: "وبلاگ",
    href: "/blog",
  },
  {
    index: 4,
    icon: <ContactIconSideBar />,
    title: "تماس با ما",
    href: "/contact",
  },
];

const WebSideBar = () => {
  //
  const [hovering, setHovering] = useState<number | null>(null);
  const pathname = usePathname();
  const isActive = items.filter(({ href }: ItemType) => {
    return href === pathname;
  });
  const y = hovering !== null ? hovering : isActive[0]?.index;
  return (
    <aside className="hidden h-full w-64 flex-col justify-between md:flex">
      <div className="flex flex-col items-center gap-3 px-10 py-5">
        <Image src={Logo} alt="logo" />
        <h2 className="text-lg font-bold">املاک اکازیون</h2>
        <a href="tel:0115400" className="flex flex-row justify-center gap-1 text-lg font-bold ">
          <span>۰۱۱-۵۴۰۰</span>
          <ContactIcon />
        </a>
      </div>
      <div className="relative z-10 flex flex-col overflow-x-hidden px-4 pb-4">
        <div className="relative flex flex-col">
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
            style={{ "--trY": `${y * 4.5}rem` } as React.CSSProperties}
            className="absolute top-0 z-0 h-[4.5rem] w-full translate-y-[var(--trY)] rounded-[1.875rem] bg-secondary shadow-xl transition-transform"
          />
        </div>
      </div>
      <div></div>
    </aside>
  );
};

export default WebSideBar;

//
// === MenuItem
const MenuItem = ({ index, icon, title, href, setHovering }: ItemType & { setHovering: (d: number | null) => void }) => {
  return (
    <Link href={href} className="z-[1] w-full" onMouseEnter={() => setHovering(index)} onMouseLeave={() => setHovering(null)}>
      <div className="flex h-[4.5rem] w-full flex-row items-center gap-2 p-6 font-bold transition-all text-start">
        {icon}
        <span>{title}</span>
      </div>
    </Link>
  );
};
