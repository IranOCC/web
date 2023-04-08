"use client";

import { MouseEventHandler, useState } from "react";
import Menu from "@mui/material/Menu";
import Link from "next/link";
import ArrowDownIcon from "@/components/Icons/ArrowDown";
import ArrowLeftIcon from "@/components/Icons/ArrowLeft";
import { ClickAwayListener, Grow, MenuList as MenuItemm, Button, MenuList, Paper, Popper } from "@mui/material";
import React from "react";

const MainMenu = () => {
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
              setOpen={setOpen}
              items={children}
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
  setOpen: (open: boolean) => void;
  items: MenuItemType[];
};

function MenuChildren({ anchorRef, open, setOpen, items }: MenuChildrenType) {
  return (
    <>
      <Popper open={open} anchorEl={anchorRef.current} placement="bottom-end" transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: "right top",
            }}
          >
            <Paper>
              <div className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow min-w-[200px] dark:bg-gray-700">
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                  {items.map((item) => {
                    return <MenuChildrenItem {...item} />;
                  })}
                </ul>
              </div>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}

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
              setOpen={setOpen}
              items={children}
            />
          </>
        )}
      </li>
    </>
  );
};

export default MainMenu;
