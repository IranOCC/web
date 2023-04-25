"use client";

import { Settings } from "@/types/interfaces";
import Image from "next/image";
import { useSelector } from "react-redux";
import WebLogo from "@/assets/images/logo.png";

const Logo = () => {
  const settings: Settings | null = useSelector((state: any) => state.settings.settings as Settings);
  return (
    <div className="float-right h-full flex items-center">
      <a href="/" className="flex items-center">
        <Image src={WebLogo} alt={settings.title} height={40} />
      </a>
    </div>
  );
};

export default Logo;
