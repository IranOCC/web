// "use client";
import Logo from "@/assets/images/logo.png";
import SearchBox from "@/components/@web/Features/@common/SearchBox";
import { WebInput } from "@/components/@web/Input";
import Search from "@/components/Icons/Search";
import { SearchEstateFormData } from "@/types/formsData";
import Image from "next/image";
import { useForm } from "react-hook-form";

// import { WebPreviewContext, WebPreviewContextType } from "@/context/webPreview.context";
// import { useContext, useEffect } from "react";

export default function Page() {
  // const { internalPage } = useContext(WebPreviewContext) as WebPreviewContextType;
  // useEffect(() => {
  //   internalPage();
  // }, []);

  return (
    <div className="flex h-auto min-h-full flex-col bg-gray-200 px-4 pb-16 md:bg-transparent md:pb-4">
      {/*  */}
      <div className="flex flex-col items-center gap-4 px-3 py-5">
        <Image src={Logo} alt="logo" />
        <div className="flex flex-col gap-2">
          <h1 className="text-center text-xl font-bold">املاک اکازیون</h1>
          <h3 className="text-center text-lg font-medium">بزرگترین مرکز اطلاعات املاک شمال کشور</h3>
        </div>
      </div>
      <SearchBox />

      {/*  */}
    </div>
  );
}
