"use client";

import { MouseEventHandler, useState } from "react";
import Menu from "@mui/material/Menu";
import Link from "next/link";
import ArrowDownIcon from "@/components/Icons/ArrowDown";
import ArrowLeftIcon from "@/components/Icons/ArrowLeft";

const MainMenu = () => {
  const menuItems: MenuItemType[] = [
    {
      title: "خانه",
    },
    {
      title: "لیست ها",
      children: [
        //
        { title: "لیست اول" },
        { title: "لیست اول" },
        { title: "لیست اول", children: [{ title: "یس" }] },
        { title: "لیست اول" },
        { title: "لیست اول" },
        { title: "لیست اول" },
        { title: "لیست اول", children: [{ title: "یس" }, { title: "یس" }, { title: "یس" }] },
        { title: "لیست اول" },
      ],
    },
    { title: "تست" },
    { title: "تست 1" },
    { title: "تست 2" },
  ];

  return (
    <>
      <div className="float-left h-full mx-3 hidden lg:block me-7">
        <ul className="h-full flex items-center font-light flex-row">
          {menuItems.map((item, index) => {
            return <MenuItem {...item} key={index} />;
          })}
        </ul>
      </div>
    </>
  );
};

type MenuItemType = {
  title: string;
  href?: string;
  children?: MenuItemType[];
};

const MenuItem = ({ title, href = "#", children }: MenuItemType) => {
  const [anchorEl, setAnchorEl] = useState<(EventTarget & HTMLElement) | null>(null);
  const open = Boolean(anchorEl);
  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event: any) => {
    setAnchorEl(null);
  };

  const hasChildren = children !== undefined && children.length > 0;

  return (
    <>
      <li onClick={handleOpen} className="mx-2 px-2 text-blue-900 hover:text-blue-500 font-light text-sm cursor-pointer h-full flex items-center justify-center">
        <Link href={href} prefetch={false}>
          {title}
        </Link>
        {hasChildren && (
          <span className={`ms-1 transition-transform ${open ? "rotate-180" : "rotate-0"}`}>
            <ArrowDownIcon />
          </span>
        )}
      </li>
      {hasChildren && (
        <MenuChildren
          //
          anchorEl={anchorEl}
          onClose={handleClose}
          onClick={handleClose}
          items={children}
        />
      )}
    </>
  );
};

type MenuChildrenType = {
  anchorEl: Element | ((element: Element) => Element) | null | undefined;
  onClose: ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void) | undefined;
  onClick: MouseEventHandler<HTMLDivElement> | undefined;
  items: MenuItemType[];
};

const MenuChildren = ({ anchorEl, onClose, onClick, items }: MenuChildrenType) => {
  const open = Boolean(anchorEl);

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      // onClick={onClick}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          bgcolor: "transparent",
        },
      }}
      MenuListProps={{
        sx: {
          padding: 0,
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <div className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
          {items.map((item, index) => {
            return <MenuChildrenItem {...item} key={index} />;
          })}
        </ul>
      </div>
    </Menu>
  );
};

const MenuChildrenItem = ({ title, href = "#", children }: MenuItemType) => {
  const [anchorEl, setAnchorEl] = useState<(EventTarget & HTMLElement) | null>(null);
  const open = Boolean(anchorEl);
  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event: any) => {
    setAnchorEl(null);
  };

  const hasChildren = children !== undefined && children.length > 0;

  return (
    <>
      <li onClick={handleOpen} className="flex items-center justify-between cursor-pointer px-4 py-2 hover:bg-gray-100">
        <Link href={href} prefetch={false} className="block  ">
          {title}
        </Link>
        {hasChildren && (
          <span className={`ms-1 transition-transform`}>
            <ArrowLeftIcon />
          </span>
        )}
      </li>
      {hasChildren && (
        <MenuChildren
          //
          anchorEl={anchorEl}
          onClose={handleClose}
          onClick={handleClose}
          items={children}
        />
      )}
    </>
  );
};

export default MainMenu;
