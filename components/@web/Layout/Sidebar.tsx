"use client";

import BlogIconSideBar from "@/components/Icons/web/sidebar/Blog";
import ContactIconSideBar from "@/components/Icons/web/sidebar/Contact";
import HomeIconSideBar from "@/components/Icons/web/sidebar/Home";
import SearchIconSideBar from "@/components/Icons/web/sidebar/Search";
import VipIconSideBar from "@/components/Icons/web/sidebar/Vip";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ReactNode, useContext, useState } from "react";
import Logo from "@/assets/images/logo.png";
import Image from "next/image";
import ContactIcon from "@/components/Icons/web/Contact";
import Scrollbars from "react-custom-scrollbars-2";
import { WebPreviewContext, WebPreviewContextType } from "@/context/webPreview.context";

type ItemType = {
  index: number;
  icon: ReactNode;
  title: string;
  isActive?: () => boolean;
  href?: string;
  className?: string;
  onClick?: () => void;
};

const WebSideBar = () => {
  const [hovering, setHovering] = useState<number | null>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { setContactModalOpen } = useContext(WebPreviewContext) as WebPreviewContextType;

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
      isActive: () => pathname === "/property" && !searchParams?.get("filter[special]"),
    },
    {
      index: 2,
      icon: <VipIconSideBar />,
      title: "املاک ویژه",
      href: "/property?filter[special]=true",
      isActive: () => pathname === "/property" && !!searchParams?.get("filter[special]"),
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

  //
  const isActive = items.filter(({ href, isActive }: ItemType) => {
    return !!isActive ? isActive() : pathname === href;
  });
  const y = hovering !== null ? hovering : isActive[0]?.index !== undefined ? isActive[0]?.index : -2;
  return (
    <aside className="z-10 hidden h-full w-64 flex-col justify-between rounded-e-2xl bg-white md:flex">
      <div className="flex flex-col items-center gap-3 px-10 py-5">
        <Link href="/" className="flex flex-col items-center gap-3">
          <Image src={Logo} alt="logo" />
          <h2 className="text-lg font-bold">املاک اکازیون</h2>
        </Link>
        <div onClick={() => setContactModalOpen(true)} className="flex cursor-pointer flex-row justify-center gap-1 p-1 text-lg font-bold transition-colors hover:text-secondary ">
          <span>011-5400</span>
          <ContactIcon />
        </div>
      </div>

      <div className="relative z-10 flex h-full flex-col overflow-x-hidden py-5">
        <Scrollbars
          //
          universal
          autoHide={false}
          hideTracksWhenNotNeeded
          renderView={(props) => <div {...props} style={{ ...props.style, padding: "0 15px", marginLeft: props.style.marginRight, marginRight: 0 }} />}
          //
          renderTrackHorizontal={(props) => <div {...props} style={{ ...props.style, display: "none", right: 2, bottom: 2, top: 2, borderRadius: 0, background: "#D6D6D6", width: 2 }} />}
          renderThumbHorizontal={(props) => <div {...props} style={{ ...props.style, display: "none", background: "#BEBEBE", width: 6, borderRadius: "20px" }} />}
          //
          renderTrackVertical={(props) => <div {...props} style={{ ...props.style, display: "none", right: 2, bottom: 2, top: 2, borderRadius: 0, background: "#D6D6D6", width: 2 }} />}
          renderThumbVertical={(props) => <div {...props} style={{ ...props.style, display: "none", background: "#BEBEBE", right: -2, width: 6, borderRadius: "20px" }} />}
        >
          <div className="relative flex w-full flex-col">
            {items.map((item: ItemType) => {
              return (
                <MenuItem
                  //
                  key={item.index}
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
        </Scrollbars>
      </div>
      <div></div>
    </aside>
  );
};

export default WebSideBar;

//
// === MenuItem
const MenuItem = ({ index, icon, title, href, className, onClick, setHovering }: ItemType & { setHovering: (d: number | null) => void }) => {
  return (
    <Link href={href || "#"} onClick={onClick} className={"z-[1] w-full" + (className ? " " + className : "")} onMouseEnter={() => setHovering(index)} onMouseLeave={() => setHovering(null)}>
      <div className="flex h-[4.5rem] w-full flex-row items-center gap-2 p-6 text-start font-bold transition-all">
        {icon}
        <span className="truncate">{title}</span>
      </div>
    </Link>
  );
};
