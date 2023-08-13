// "use client";
import Logo from "@/assets/images/logo.png";
import SearchBox from "@/components/@web/Features/@common/SearchBox";
import { WebInput } from "@/components/@web/Input";
import Search from "@/components/Icons/Search";
import { SearchEstateFormData } from "@/types/formsData";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";

// import { WebPreviewContext, WebPreviewContextType } from "@/context/webPreview.context";
// import { useContext, useEffect } from "react";

export default function Page() {
  // const { internalPage } = useContext(WebPreviewContext) as WebPreviewContextType;
  // useEffect(() => {
  //   internalPage();
  // }, []);

  const items = [
    {
      title: "زمین",
      link: "",
    },
    {
      title: "ویلا",
      link: "",
    },
    {
      title: "آپارتمان",
      link: "",
    },
    {
      title: "تجاری",
      link: "",
    },
    {
      title: "ساحلی",
      link: "",
    },
    {
      title: "اجاره",
      link: "",
    },
    {
      title: "تهاتر",
      link: "",
    },
    {
      title: "معاوضه",
      link: "",
    },
  ];

  return (
    <div className="flex h-auto min-h-full flex-col items-center justify-between bg-gray-200 px-4 pb-16 md:bg-transparent md:pb-4">
      <div className="sticky top-5 z-10 flex w-full flex-col items-center gap-4 bg-gray-200 px-3 py-5 md:bg-white">
        <Image src={Logo} alt="logo" />
        <div className="flex flex-col gap-2">
          <h1 className="text-center text-xl font-bold">املاک اکازیون</h1>
          <h2 className="text-center text-lg font-medium">بزرگترین مرکز اطلاعات املاک شمال کشور</h2>
        </div>
        <SearchBox />
      </div>
      <div className="flex max-w-5xl flex-wrap justify-center gap-4 py-8">
        {items.map(({ title, link }, idx) => {
          return (
            <div key={idx} className="relative overflow-hidden rounded-2xl">
              <Link href={link} role="link">
                <h3 className="w-44 truncate bg-white px-3 py-6 text-center text-base font-semibold transition-all hover:bg-secondary sm:w-56 sm:py-8 sm:text-lg sm:font-bold md:bg-gray-200">{title}</h3>
              </Link>
            </div>
          );
        })}
      </div>
      <div />
    </div>
  );
}
