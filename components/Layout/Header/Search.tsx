"use client";

import SearchIcon from "@/components/Icons/Search";
import { ClickAwayListener } from "@mui/material";
import React from "react";
import PopTop from "./PopTop";

const Search = () => {
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [isOpenPopTop, setIsOpenPopTop] = React.useState(false);
  const handleOpen = () => {
    setIsOpenPopTop(true);
  };
  const handleClose = () => {
    setIsOpenPopTop(false);
  };
  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div ref={anchorRef} className="float-right h-full items-center me-3 ms-16 md:flex hidden">
        <div onClick={handleOpen} className="bg-gray-200 px-8 py-2 rounded-full flex text-blue-600">
          <SearchIcon />
          <span className="text-blue-900 text-xs font-light ms-2">جستجو...</span>
        </div>
        <PopTop isOpen={isOpenPopTop} anchorRef={anchorRef}>
          SEARCHING
        </PopTop>
      </div>
    </ClickAwayListener>
  );
};

export default Search;
