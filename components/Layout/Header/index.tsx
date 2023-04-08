// "use client";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import Logo from "./Logo";
import Menu from "./Menu";
import Search from "./Search";
import Tools from "./Tools";

const Header = async () => {
  const session = await getServerSession(authOptions);

  return (
    <nav className="max-w-screen bg-white border-gray-200 shadow-lg h-16 ps-10 pe-0">
      <Logo />
      <Search />
      <Tools {...{ session }} />
      <Menu />
    </nav>
  );
};

export default Header;
