"use client";

import { WebInfo } from "@/types/interfaces";
import { useSelector } from "react-redux";
import WebLogo from "@/assets/images/logo.png";
import Image from "next/image";
import { ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/Button";
import EmailOutlineIcon from "@/components/Icons/EmailOutline";
import PhoneOutlineIcon from "@/components/Icons/PhoneOutline";
import LocationOutlineIcon from "@/components/Icons/LocationOutline";
import Subscription from "./Subscription";
import { useContext } from "react";
import { WebInfoContext, WebInfoType } from "@/context/webInfo.context";

const Footer = () => {
  return (
    <footer className="w-full">
      <Subscription />

      <MainFooter />
      <SubFooter />
    </footer>
  );
};
export default Footer;

// main footer
const MainFooter = () => {
  const { title } = useContext(WebInfoContext) as WebInfoType;
  return (
    <div className="bg-white py-10 px-8 pt-20">
      <div className="mx-auto w-full max-w-screen-xl">
        <div className="w-full grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
          {/* info */}
          <div className="">
            <Image src={WebLogo} alt={title} height={40} />
            <p className="text-gray-500 text-sm font-light my-6">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است</p>
            <div className="text-sm font-medium text-slate-600 py-1">
              <span>شنبه تا چهارشنبه:</span>
              <span className="ms-2 text-blue-500">8 صبح تا 16 عصر</span>
            </div>
            <div className="text-sm font-medium text-slate-600 py-1">
              <span>شنبه تا چهارشنبه:</span>
              <span className="ms-2 text-blue-500">8 صبح تا 16 عصر</span>
            </div>
          </div>

          {/* links */}
          <div className="">
            <h2 className="font-extrabold text-gray-500 text-base mb-5">در اکازیون</h2>
            <ul className="font-bold text-sm space-y-3 text-slate-700 ">
              {[1, 2, 3, 4].map((item, index) => {
                return (
                  <li key={index} className="relative flex items-center hover:text-blue-500 before:transition-all hover:before:-translate-x-2 before:content-['◂'] before:text-xs before:absolute before:text-blue-600 before:start-0">
                    <Link className="ps-5" href="">
                      درباره شرکت
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* contacts way */}
          <div className="">
            <h2 className="font-extrabold text-gray-500 text-base mb-5">اطلاعات تماس</h2>
            <ul className="font-bold text-sm space-y-3 text-slate-700 ">
              {/*  */}
              <li className="relative flex items-center justify-between">
                <div className=" flex items-center ">
                  <i className="text-blue-500">
                    <EmailOutlineIcon />
                  </i>
                  <span className="text-gray-400 text-sm font-medium ms-2">ایمیل:</span>
                </div>
                <div className="text-slate-700">
                  <span>info@iranocc.com</span>
                </div>
              </li>

              <li className="relative flex items-center justify-between">
                <div className=" flex items-center ">
                  <i className="text-blue-500">
                    <PhoneOutlineIcon />
                  </i>
                  <span className="text-gray-400 text-sm font-medium ms-2">آدرس:</span>
                </div>
                <div className="text-slate-700">
                  <span>مازندران - چالوس - پلاک 2</span>
                </div>
              </li>

              <li className="relative flex items-center justify-between">
                <div className=" flex items-center ">
                  <i className="text-blue-500">
                    <LocationOutlineIcon />
                  </i>
                  <span className="text-gray-400 text-sm font-medium ms-2">آدرس:</span>
                </div>
                <div className="text-slate-700">
                  <span>02152365632</span>
                </div>
              </li>
              {/*  */}
            </ul>
          </div>

          {/* download app */}
          <div className="">
            <h2 className="font-extrabold text-gray-500 text-base mb-5">دانلود نرم افزار</h2>
            <p className="text-gray-500 text-sm font-light my-6">شروع به کار با کنید که می تواند هر آنچه را که نیاز دارید فراهم کند</p>
            <Button title="اپ استور" noSpace />
            <div className="py-1" />
            <Button title="اپ استور" noSpace />
          </div>
        </div>
      </div>
    </div>
  );
};

// sub footer
const SubFooter = () => {
  return (
    <div className="bg-slate-100 py-6 px-8">
      <div className="mx-auto w-full max-w-screen-xl sm:flex sm:items-center sm:justify-between ">
        <span className="text-xs text-gray-800 font-light sm:text-center ">© تمامی حقوق محفوظ است</span>
        <div className="flex mt-4 space-x-reverse space-x-3 sm:justify-center sm:mt-0 ">
          <SubFooterItem label="شرایط استفاده" />
          <SubFooterItem label="حریم خصوصی" />
          <SubFooterItem label="وبلاگ" />
        </div>
      </div>
    </div>
  );
};

type SubFooterItemType = { url?: string; label: string };

const SubFooterItem = ({ url = "#", label }: SubFooterItemType) => {
  return (
    <Link href={url} className="text-xs text-blue-500 hover:text-gray-900">
      <span>{label}</span>
    </Link>
  );
};
