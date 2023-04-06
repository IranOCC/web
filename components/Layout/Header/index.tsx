"use client";

import Logo from "./Logo";
import Menu from "./Menu";
import Tools from "./Tools";

const Header = () => {
  return (
    <nav className="max-w-screen bg-white border-gray-200 shadow-lg	 h-20 px-10" dir="rtl">
      <Logo />
      <Tools />
      <Menu />
    </nav>
  );
};

export default Header;
