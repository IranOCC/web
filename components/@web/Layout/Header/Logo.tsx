"use client";

import Image from "next/image";
import { useSelector } from "react-redux";
import WebLogo from "@/assets/images/logo.png";
import { useContext } from "react";
import { WebInfoContext, WebInfoType } from "@/context/webInfo.context";

const Logo = () => {
  const { title } = useContext(WebInfoContext) as WebInfoType;
  return (
    <div className="float-right h-full flex items-center">
      <a href="/" className="flex items-center">
        <Image src={WebLogo} alt={title} height={40} />
      </a>
    </div>
  );
};

export default Logo;
