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
import { CurrentUserContext, CurrentUserContextType } from "@/context/currentUser.context";
import { usePrevious } from "@/hooks/usePrevious";
import { UserRoles } from "@/types/enum";
import { ClickAwayListener } from "@mui/material";

import { Tooltip } from "antd";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useContext, useEffect, useState } from "react";

const panelPrefix = "/admin";

type SubMenuType = { title: string; href: string; subtitle?: string; roles: UserRoles[] };

type MenuItemType = {
  title: string;
  href: string;
  icon: JSX.Element;
  roles: UserRoles[];
  sub: SubMenuType[];
};

const menuItems: MenuItemType[] = [
  {
    title: "داشبورد",
    href: "",
    icon: <HomeOutlineIcon />,
    roles: [UserRoles.SuperAdmin, UserRoles.Admin, UserRoles.Agent, UserRoles.Author],
    sub: [
      {
        title: "صفحه اصلی",
        href: "",
        subtitle: "",
        roles: [UserRoles.SuperAdmin, UserRoles.Admin, UserRoles.Agent, UserRoles.Author],
      },
    ],
  },
  {
    title: "کاربران",
    href: "user",
    icon: <UsersOutlineIcon />,
    roles: [UserRoles.SuperAdmin, UserRoles.Admin],
    sub: [
      {
        title: "کاربر جدید",
        href: "add",
        subtitle: "",
        roles: [UserRoles.SuperAdmin, UserRoles.Admin],
      },
      {
        title: "مدیریت کاربران",
        href: "",
        subtitle: "",
        roles: [UserRoles.SuperAdmin, UserRoles.Admin],
      },
    ],
  },
  {
    title: "شعب",
    href: "office",
    icon: <OfficesOutlineIcon />,
    roles: [UserRoles.SuperAdmin, UserRoles.Admin],
    sub: [
      {
        title: "شعبه جدید",
        href: "add",
        subtitle: "",
        roles: [UserRoles.SuperAdmin],
      },
      {
        title: "مدیریت شعبه ها",
        href: "",
        subtitle: "",
        roles: [UserRoles.SuperAdmin, UserRoles.Admin],
      },
    ],
  },
  {
    title: "املاک",
    href: "estate",
    icon: <BuildingOutlineIcon />,
    roles: [UserRoles.SuperAdmin, UserRoles.Admin, UserRoles.Agent],
    sub: [
      {
        title: "ملک جدید",
        href: "add",
        subtitle: "",
        roles: [UserRoles.SuperAdmin, UserRoles.Admin, UserRoles.Agent],
      },
      {
        title: "مدیریت املاک",
        href: "",
        subtitle: "",
        roles: [UserRoles.SuperAdmin, UserRoles.Admin, UserRoles.Agent],
      },
      {
        title: "دسته بندی",
        href: "category",
        subtitle: "تعریف و مدیریت دسته بندی های املاک",
        roles: [UserRoles.SuperAdmin],
      },
      {
        title: "نوع ملک",
        href: "type",
        subtitle: "تعریف و مدیریت نوع ساختار املاک",
        roles: [UserRoles.SuperAdmin],
      },
      {
        title: "نوع سند",
        href: "document",
        subtitle: "تعریف و مدیریت انواع اسناد املاک",
        roles: [UserRoles.SuperAdmin],
      },
      {
        title: "ویژگی ها",
        href: "feature",
        subtitle: "تعریف و مدیریت ویژگی های املاک",
        roles: [UserRoles.SuperAdmin],
      },
    ],
  },
  {
    title: "وبلاگ",
    href: "blog",
    icon: <DocumentOutlineIcon />,
    roles: [UserRoles.SuperAdmin, UserRoles.Admin, UserRoles.Author],
    sub: [
      {
        title: "پست جدید",
        href: "add",
        subtitle: "",
        roles: [UserRoles.SuperAdmin, UserRoles.Admin, UserRoles.Author],
      },
      {
        title: "مدیریت پست ها",
        href: "",
        subtitle: "",
        roles: [UserRoles.SuperAdmin, UserRoles.Admin, UserRoles.Author],
      },
      {
        title: "دسته بندی",
        href: "category",
        subtitle: "تعریف و مدیریت دسته بندی های وبلاگ",
        roles: [UserRoles.SuperAdmin],
      },
      {
        title: "دیدگاه ها",
        href: "comment",
        subtitle: "مدیریت دیدگاه های کاربران",
        roles: [UserRoles.SuperAdmin, UserRoles.Admin, UserRoles.Author],
      },
    ],
  },
  {
    title: "صفحات",
    href: "page",
    icon: <LinkOutlineIcon />,
    roles: [UserRoles.SuperAdmin],
    sub: [
      {
        title: "صفحه جدید",
        href: "add",
        subtitle: "",
        roles: [UserRoles.SuperAdmin],
      },
      {
        title: "مدیریت صفحات",
        href: "",
        subtitle: "",
        roles: [UserRoles.SuperAdmin],
      },
    ],
  },
  {
    title: "رسانه",
    href: "media",
    icon: <MediaOutlineIcon />,
    roles: [UserRoles.SuperAdmin, UserRoles.Admin, UserRoles.Agent, UserRoles.Author],
    sub: [
      {
        title: "بارگذاری رسانه",
        href: "upload",
        subtitle: "",
        roles: [UserRoles.SuperAdmin, UserRoles.Admin, UserRoles.Agent, UserRoles.Author],
      },
      {
        title: "مدیریت فایل ها",
        href: "",
        subtitle: "",
        roles: [UserRoles.SuperAdmin, UserRoles.Admin, UserRoles.Agent, UserRoles.Author],
      },
      {
        title: "مدیریت آیکون ها",
        href: "icon",
        subtitle: "افزودن و مدیریت آیکون ها",
        roles: [UserRoles.SuperAdmin],
      },
    ],
  },
  {
    title: "گزارشات",
    href: "report",
    icon: <ChartOutlineIcon />,
    roles: [UserRoles.SuperAdmin],
    sub: [
      {
        title: "آمار کلی",
        href: "",
        subtitle: "گزارشات کلی سایت",
        roles: [UserRoles.SuperAdmin],
      },
      {
        title: "کاربران",
        href: "user",
        subtitle: "",
        roles: [UserRoles.SuperAdmin],
      },
      {
        title: "شعبات",
        href: "office",
        subtitle: "",
        roles: [UserRoles.SuperAdmin],
      },
      {
        title: "املاک",
        href: "estate",
        subtitle: "",
        roles: [UserRoles.SuperAdmin],
      },
      {
        title: "وبلاگ",
        href: "blog",
        subtitle: "",
        roles: [UserRoles.SuperAdmin],
      },
    ],
  },
  {
    title: "تنظیمات",
    href: "setting",
    icon: <SettingOutlineIcon />,
    roles: [UserRoles.SuperAdmin],
    sub: [
      {
        title: "تنظیمات اولیه",
        href: "initial",
        subtitle: "",
        roles: [UserRoles.SuperAdmin],
      },
      {
        title: "تنظیمات فوتر",
        href: "footer",
        subtitle: "",
        roles: [UserRoles.SuperAdmin],
      },
      {
        title: "مدیریت قالب های پیامک",
        href: "smsTemplate",
        subtitle: "افزودن و مدیریت قالب های پیامک",
        roles: [UserRoles.SuperAdmin],
      },
      {
        title: "مدیریت قالب های ایمیل",
        href: "mailTemplate",
        subtitle: "افزودن و مدیریت قالب های ایمیل",
        roles: [UserRoles.SuperAdmin],
      },
    ],
  },
];
// toddler submit catalog borrow put flush proof match fire more swarm worry
const PanelSideBar = () => {
  const pathname = usePathname();
  const [isOpenSubMenu, setOpenSubMenu] = useState<string | null>(pathname?.split("/")?.[2] || null);
  const [lastOpenedItem, setLastOpenedItem] = useState<MenuItemType>(menuItems[0]);

  const item = menuItems.find(({ href }) => {
    return isOpenSubMenu && !href.length ? isOpenSubMenu === panelPrefix : isOpenSubMenu === href;
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
  const { roles: myRoles } = useContext(CurrentUserContext) as CurrentUserContextType;
  return (
    <div className="relative z-10 overflow-x-hidden flex flex-col items-center w-16 h-full py-4 space-y-8 border-l bg-white dark:bg-gray-900 dark:border-gray-700">
      {menuItems
        .filter(({ roles }) => {
          return !!myRoles && roles.some((role) => myRoles.includes(role));
        })
        .map(({ sub, title, icon, href, roles }, index) => {
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
      <div className="rotate-90">{myRoles}</div>
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
  const mainHref = panelPrefix + (href.length ? "/" + href : "");
  const pathname = usePathname();
  const isActive = !href.length ? pathname === panelPrefix : pathname?.startsWith(mainHref);
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
  const { roles: myRoles } = useContext(CurrentUserContext) as CurrentUserContextType;

  return (
    <div className={"h-full shadow-lg py-8 overflow-y-auto bg-white border-l w-64 dark:bg-gray-900 dark:border-gray-700 absolute start-16 xl:relative xl:!start-0 transition-all duration-500" + (open ? " " : " !-start-48")}>
      <h2 className="px-5 text-lg font-medium text-gray-800 dark:text-white">{title}</h2>
      <div className="mt-8 space-y-4">
        {sub
          .filter(({ roles }) => {
            return !!myRoles && roles.some((role) => myRoles.includes(role));
          })
          .map(({ title, href, subtitle }, index) => {
            const mainHref = panelPrefix + "/" + parentPath + (href.length ? "/" + href : "");
            const isActive = !href.length ? pathname === panelPrefix + "/" + parentPath : pathname?.startsWith(mainHref);
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
