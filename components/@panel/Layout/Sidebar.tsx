"use client";

import BuildingOutlineIcon from "@/components/Icons/BuildingOutline";
import ChartOutlineIcon from "@/components/Icons/ChartOutline";
import DocumentOutlineIcon from "@/components/Icons/DocumentOutline";
import HomeOutlineIcon from "@/components/Icons/HomeOutline";
import LinkOutlineIcon from "@/components/Icons/LinkOutline";
import LogoutOutlineIcon from "@/components/Icons/LogoutOutline";
import MediaOutlineIcon from "@/components/Icons/MediaOutline";
import MenuBarsIcon from "@/components/Icons/MenuBars";
import OfficesOutlineIcon from "@/components/Icons/OfficesOutline";
import SettingOutlineIcon from "@/components/Icons/SettingOutline";
import UserIcon from "@/components/Icons/User";
import UsersOutlineIcon from "@/components/Icons/UsersOutline";
import { usePrevious } from "@/lib/hooks/usePrevious";
import { ClickAwayListener } from "@mui/material";

import { Tooltip } from "antd";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

const panelSuffix = "/panel";

type SubMenuType = { title: string; href: string; subtitle?: string };

type MenuItemType = {
  title: string;
  href: string;
  icon: JSX.Element;
  sub: {
    title: string;
    href: string;
    subtitle: string;
  }[];
};

const menuItems: MenuItemType[] = [
  {
    title: "داشبورد",
    href: "",
    icon: <HomeOutlineIcon />,
    sub: [
      {
        title: "صفحه اصلی",
        href: "",
        subtitle: "",
      },
    ],
  },
  {
    title: "کاربران",
    href: "user",
    icon: <UsersOutlineIcon />,
    sub: [
      {
        title: "کاربر جدید",
        href: "add",
        subtitle: "",
      },
      {
        title: "مدیریت کاربران",
        href: "",
        subtitle: "",
      },
    ],
  },
  {
    title: "شعب ها",
    href: "office",
    icon: <OfficesOutlineIcon />,
    sub: [
      {
        title: "شعبه جدید",
        href: "add",
        subtitle: "",
      },
      {
        title: "مدیریت شعبه ها",
        href: "",
        subtitle: "",
      },
    ],
  },
  {
    title: "املاک",
    href: "estate",
    icon: <BuildingOutlineIcon />,
    sub: [
      {
        title: "ملک جدید",
        href: "add",
        subtitle: "",
      },
      {
        title: "مدیریت املاک",
        href: "",
        subtitle: "",
      },
      {
        title: "دسته بندی",
        href: "category",
        subtitle: "",
      },
      {
        title: "نوع سند",
        href: "document",
        subtitle: "",
      },
      {
        title: "ویژگی ها",
        href: "feature",
        subtitle: "",
      },
    ],
  },
  {
    title: "وبلاگ",
    href: "blog",
    icon: <DocumentOutlineIcon />,
    sub: [
      {
        title: "پست جدید",
        href: "add",
        subtitle: "",
      },
      {
        title: "مدیریت پست ها",
        href: "",
        subtitle: "",
      },
      {
        title: "دسته بندی",
        href: "category",
        subtitle: "",
      },
      {
        title: "دیدگاه ها",
        href: "comment",
        subtitle: "",
      },
    ],
  },
  {
    title: "صفحات",
    href: "page",
    icon: <LinkOutlineIcon />,
    sub: [
      {
        title: "صفحه جدید",
        href: "add",
        subtitle: "",
      },
      {
        title: "مدیریت صفحات",
        href: "",
        subtitle: "",
      },
    ],
  },
  {
    title: "رسانه",
    href: "media",
    icon: <MediaOutlineIcon />,
    sub: [
      {
        title: "بارگذاری رسانه",
        href: "upload",
        subtitle: "",
      },
      {
        title: "مدیریت فایل ها",
        href: "",
        subtitle: "",
      },
      {
        title: "مدیریت آیکون ها",
        href: "icon",
        subtitle: "افزودن و مدیریت آیکون ها",
      },
    ],
  },
  {
    title: "گزارشات",
    href: "report",
    icon: <ChartOutlineIcon />,
    sub: [
      {
        title: "کاربران",
        href: "user",
        subtitle: "",
      },
    ],
  },
  {
    title: "تنظیمات",
    href: "setting",
    icon: <SettingOutlineIcon />,
    sub: [
      {
        title: "تنظیمات اولیه",
        href: "initial",
        subtitle: "",
      },
      {
        title: "تنظیمات فوتر",
        href: "footer",
        subtitle: "",
      },
    ],
  },
];

const PanelSideBar = () => {
  const pathname = usePathname();
  const [isOpenSubMenu, setOpenSubMenu] = useState<string | null>(pathname?.split("/")?.[2] || null);
  const [lastOpenedItem, setLastOpenedItem] = useState<MenuItemType>(menuItems[0]);

  const item = menuItems.find(({ href }) => {
    return isOpenSubMenu && !href.length ? isOpenSubMenu === panelSuffix : isOpenSubMenu === href;
  });

  const handleOpenSubMenu = (name: string) => {
    if (isOpenSubMenu === name) setOpenSubMenu(null);
    else setOpenSubMenu(name);
  };

  useEffect(() => {
    if (item) setLastOpenedItem(item);
  }, [item]);

  useEffect(() => {
    setOpenSubMenu(null);
  }, [pathname]);

  return (
    <ClickAwayListener onClickAway={() => setOpenSubMenu(null)}>
      <aside className="fixed h-full flex z-30">
        <MainMenu
          //
          itemOpen={isOpenSubMenu}
          handleOpenSubMenu={handleOpenSubMenu}
        />
        <SubMenu
          //
          open={item !== undefined}
          parentPath={lastOpenedItem.href}
          title={lastOpenedItem.title}
          sub={lastOpenedItem.sub}
        />
      </aside>
    </ClickAwayListener>
  );
};

export default PanelSideBar;

// ===> main menu

const MainMenu = ({ handleOpenSubMenu, itemOpen }: any) => {
  return (
    <div className="relative z-10 overflow-x-hidden flex flex-col items-center w-16 h-full py-4 space-y-8 border-l bg-white dark:bg-gray-900 dark:border-gray-700">
      {menuItems.map(({ sub, title, icon, href }, index) => {
        let onOpen = undefined;
        if (sub.length > 0) onOpen = () => handleOpenSubMenu(href);
        return (
          <MainMenuItem
            //
            title={title}
            icon={icon}
            key={index}
            href={href}
            onClick={onOpen}
            highlight={itemOpen === href}
            highlightClass="text-gray-500 bg-gray-100"
          />
        );
      })}
      <div className="h-full" />
      <MainMenuItem
        //
        title="حساب کاربری من"
        href="profile"
        icon={<UserIcon />}
        highlight
        highlightClass="text-yellow-600 bg-yellow-100 dark:text-yellow-300 dark:bg-gray-800"
      />
    </div>
  );
};

const MainMenuItem = ({ href = "#", onClick, icon, title = "test", highlight = false, highlightClass = "" }: { href?: string; onClick?: () => void; icon: ReactNode; title?: string; highlight?: boolean; highlightClass?: string }) => {
  const mainHref = panelSuffix + (href.length ? "/" + href : "");
  const pathname = usePathname();
  const isActive = !href.length ? pathname === panelSuffix : pathname?.startsWith(mainHref);
  return (
    <Tooltip title={title} arrow placement="left">
      <Link
        href={onClick ? pathname + "#" : mainHref}
        onClick={onClick}
        className={(isActive ? "text-blue-500 bg-blue-100 dark:text-blue-400 dark:bg-gray-800 " : highlight ? highlightClass + " " : "text-gray-500 bg-white hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 ") + "p-1.5 focus:outline-nones transition-colors duration-200 rounded-lg"}
      >
        {icon}
      </Link>
    </Tooltip>
  );
};

// ===> sub menu

const SubMenu = ({ open, title, sub, parentPath }: { open: boolean; title: string; sub: SubMenuType[]; parentPath: string }) => {
  const pathname = usePathname();
  return (
    <div className={"h-full shadow-lg py-8 overflow-y-auto bg-white border-l w-64 dark:bg-gray-900 dark:border-gray-700 absolute start-16 xl:relative xl:!start-0 transition-all duration-500" + (open ? " " : " !-start-48")}>
      <h2 className="px-5 text-lg font-medium text-gray-800 dark:text-white">{title}</h2>
      <div className="mt-8 space-y-4">
        {sub?.map(({ title, href, subtitle }, index) => {
          const mainHref = panelSuffix + "/" + parentPath + (href.length ? "/" + href : "");
          const isActive = !href.length ? pathname === panelSuffix + "/" + parentPath : pathname?.startsWith(mainHref);
          return (
            <Link key={index} href={mainHref}>
              <button className={"flex items-center w-full px-5 py-2 transition-colors duration-200  gap-x-2 focus:outline-none" + (isActive ? " bg-blue-100 dark:bg-gray-800" : " dark:hover:bg-gray-800 hover:bg-gray-100")}>
                <div className="text-left rtl:text-right">
                  <h1 className="text-sm font-medium text-gray-700 capitalize dark:text-white">{title}</h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>
                </div>
              </button>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
