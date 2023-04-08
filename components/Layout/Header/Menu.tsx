"use client";

import { MouseEventHandler, useState } from "react";
import Menu from "@mui/material/Menu";
import Link from "next/link";
import ArrowDownIcon from "@/components/Icons/ArrowDown";
import ArrowLeftIcon from "@/components/Icons/ArrowLeft";
import { Grow, Paper, Popper, PopperPlacementType } from "@mui/material";
import React from "react";
import { Button } from "@/components/Button";
import AddIcon from "@/components/Icons/Add";
import BackIcon from "@/components/Icons/Back";
import PopTop from "./PopTop";

const menuItems: MenuItemType[] = [
  {
    title: "خانه",
    href: "/",
  },
  {
    title: "لیست ها",
    children: [
      //
      { title: "لیست اول" },
      { title: "لیست اول" },
      { title: "لیست اوللیست اوللیست اول", children: [{ title: "یس" }] },
      { title: "لیست اول" },
      { title: "لیست اول" },
      { title: "لیست اول" },
      {
        title: "لیست اول",
        children: [
          { title: "یdgdgس" },
          {
            title: "یgggس",
            children: [
              //
              { title: "دتس گود" },
            ],
          },
          { title: "یtttس" },
        ],
      },
      { title: "لیست اول" },
    ],
  },
  { title: "تست" },
  { title: "تست 1" },
  {
    title: "تست 2",
    children: [
      //
      { title: "لیست اول" },
      { title: "لیست اول" },
      { title: "لیست اوللیست اوللیست اول", children: [{ title: "یس" }] },
      { title: "لیست اول" },
      { title: "لیست اول" },
      { title: "لیست اول" },
      {
        title: "لیست اول",
        children: [
          { title: "یdgdgس" },
          {
            title: "یgggس",
            children: [
              //
              { title: "دتس گود" },
            ],
          },
          { title: "یtttس" },
        ],
      },
      { title: "لیست اول" },
    ],
  },
];

const MainMenu = () => {
  return (
    <>
      <DesktopMenu />
      {/* <MobileMenu /> */}
    </>
  );
};

// ====================> MobileMenu

export const MobileMenu = () => {
  const [openList, setOpenList] = useState<number[]>([]);
  let _items = menuItems;
  for (let i = 0; i < openList.length; i++) {
    _items = _items[openList[i]]?.children || [];
  }

  return (
    <>
      {openList.length > 0 && (
        <div className="inline-block text-blue-500 p-2" onClick={() => setOpenList(openList.slice(0, -1))}>
          <BackIcon />
        </div>
      )}
      <ul className="py-2 text-sm text-gray-700">
        {_items?.map((item, index) => {
          return <MobileMenuItem {...item} key={index} openList={() => setOpenList([...openList, index])} />;
        })}
      </ul>
      <div className="border-t p-2 flex flex-col">
        <Button title="افزودن لیست" noSpace icon={<AddIcon />} />
      </div>
    </>
  );
};

const MobileMenuItem = ({ title, href = "#", children, openList }: MenuItemType & { openList: any }) => {
  const hasChildren = children !== undefined && children.length > 0;

  return (
    <>
      <li onClick={hasChildren ? openList : undefined} className="relative flex items-center justify-between cursor-pointer px-4 py-2 hover:bg-gray-100">
        <Link href={href} prefetch={false}>
          {title}
        </Link>
        {hasChildren && (
          <span className={`ms-1 transition-transform`}>
            <ArrowLeftIcon />
          </span>
        )}
      </li>
    </>
  );
};

// ===================> DesktopMenu

export const DesktopMenu = () => {
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
  const [open, setOpen] = React.useState(false);
  const handleOpen = (event: any) => {
    setOpen(true);
  };
  const handleClose = (event: any) => {
    setOpen(false);
  };
  const hasChildren = children !== undefined && children.length > 0;
  const anchorRef = React.useRef<HTMLDivElement>(null);
  return (
    <>
      <li onMouseEnter={handleOpen} onMouseLeave={handleClose} className={(open ? "text-blue-500 " : "text-blue-900 ") + "relative mx-2 px-2  hover:text-blue-500  font-light text-sm cursor-pointer h-full flex items-center justify-center"}>
        <Link href={hasChildren ? "#" : href} prefetch={false}>
          {title}
        </Link>
        {hasChildren && (
          <>
            <div ref={anchorRef} className="absolute right-0 -bottom-1" />
            <span className={`ms-1 transition-transform ${open ? "rotate-180" : "rotate-0"}`}>
              <ArrowDownIcon />
            </span>
            <MenuChildren
              //
              anchorRef={anchorRef}
              open={open}
              items={children}
              sub={1}
            />
          </>
        )}
      </li>
    </>
  );
};

type MenuChildrenType = {
  anchorRef: React.RefObject<HTMLDivElement>;
  open: boolean;
  items: MenuItemType[];
  placement?: PopperPlacementType;
  sub?: number;
};

const MenuChildren = ({ anchorRef, open, items, placement = "bottom-end", sub = 1 }: MenuChildrenType) => {
  return (
    <>
      <Popper open={open} anchorEl={anchorRef.current} placement={placement} transition disablePortal sx={{ zIndex: 5 + sub }}>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: "right top",
            }}
          >
            <Paper>
              <div className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-[1px_1px_17px_0px_#6a6a6a85] min-w-[200px] dark:bg-gray-700">
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                  {items.map((item, index) => {
                    return <MenuChildrenItem {...item} key={index} />;
                  })}
                </ul>
              </div>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

const MenuChildrenItem = ({ title, href = "#", children }: MenuItemType) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = (event: any) => {
    setOpen(true);
  };
  const handleClose = (event: any) => {
    setOpen(false);
  };
  const hasChildren = children !== undefined && children.length > 0;
  const anchorRef = React.useRef<HTMLDivElement>(null);

  return (
    <>
      <li onMouseEnter={handleOpen} onMouseLeave={handleClose} className="relative flex items-center justify-between cursor-pointer px-4 py-2 hover:bg-gray-100">
        <Link href={href} prefetch={false} className="block  ">
          {title}
        </Link>

        {hasChildren && (
          <>
            <div ref={anchorRef} className="absolute -left-1 top-0" />
            <span className={`ms-1 transition-transform`}>
              <ArrowLeftIcon />
            </span>
            <MenuChildren
              //
              anchorRef={anchorRef}
              open={open}
              items={children}
              sub={2}
            />
          </>
        )}
      </li>
    </>
  );
};

export default MainMenu;
