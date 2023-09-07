"use client";

import Link from "next/link";
import { WebPreviewContext, WebPreviewContextType } from "@/context/webPreview.context";
import { useContext, useEffect } from "react";
import { Card, CardBody } from "@nextui-org/react";
import { signOut } from "next-auth/react";

export default function Page() {
  const { dashboardPage } = useContext(WebPreviewContext) as WebPreviewContextType;
  useEffect(() => {
    dashboardPage();
  }, []);

  return (
    <div className="flex h-auto min-h-full flex-col items-center justify-between bg-gray-200 pb-16 md:bg-transparent md:pb-4">
      <div className="sticky top-[-1px] z-20 flex w-full flex-col gap-2 self-start bg-gray-200 px-4 py-3 md:bg-white">
        <h1 className="relative flex w-fit justify-center pb-1 text-lg font-bold after:absolute after:bottom-0 after:h-1 after:w-[calc(100%-30px)] after:rounded-md after:bg-secondary after:content-['']">
          داشبورد من
          {/*  */}
        </h1>
      </div>
      <div className="flex flex-row flex-wrap gap-4 px-4 py-5">
        <Card className="group relative flex-[1_150px] overflow-hidden" shadow="md" isPressable isHoverable>
          <Link href="/dashboard/property/add" className="h-full w-full">
            <CardBody className="flex flex-col justify-center gap-2 truncate">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="h-8 w-8 transition-all group-hover:rotate-12 group-hover:scale-125 group-hover:fill-secondary">
                <path d="M15 4H5V20H19V8H15V4ZM3 2.9918C3 2.44405 3.44749 2 3.9985 2H16L20.9997 7L21 20.9925C21 21.5489 20.5551 22 20.0066 22H3.9934C3.44476 22 3 21.5447 3 21.0082V2.9918ZM11 11V8H13V11H16V13H13V16H11V13H8V11H11Z"></path>
              </svg>
              <span className="truncate font-bold">ثبت ملک جدید</span>
            </CardBody>
          </Link>
        </Card>
        <Card className="group relative flex-[1_150px] overflow-hidden" shadow="md" isPressable isHoverable>
          <Link href="/dashboard/property" className="h-full w-full">
            <CardBody className="flex flex-col justify-center gap-2 truncate">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="h-8 w-8 transition-all group-hover:rotate-12 group-hover:scale-125 group-hover:fill-secondary">
                <path d="M21 19H23V21H1V19H3V4C3 3.44772 3.44772 3 4 3H14C14.5523 3 15 3.44772 15 4V19H19V11H17V9H20C20.5523 9 21 9.44772 21 10V19ZM5 5V19H13V5H5ZM7 11H11V13H7V11ZM7 7H11V9H7V7Z"></path>
              </svg>
              <span className="truncate font-bold">املاک من</span>
            </CardBody>
          </Link>
        </Card>
        <Card className="group relative flex-[1_150px] overflow-hidden" shadow="md" isPressable isHoverable>
          <Link href="/dashboard/favorites" className="h-full w-full">
            <CardBody className="flex flex-col justify-center gap-2 truncate">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="h-8 w-8 transition-all group-hover:rotate-12 group-hover:scale-125 group-hover:fill-secondary">
                <path d="M16.5 3C19.5376 3 22 5.5 22 9C22 16 14.5 20 12 21.5C9.5 20 2 16 2 9C2 5.5 4.5 3 7.5 3C9.35997 3 11 4 12 5C13 4 14.64 3 16.5 3ZM12.9339 18.6038C13.8155 18.0485 14.61 17.4955 15.3549 16.9029C18.3337 14.533 20 11.9435 20 9C20 6.64076 18.463 5 16.5 5C15.4241 5 14.2593 5.56911 13.4142 6.41421L12 7.82843L10.5858 6.41421C9.74068 5.56911 8.5759 5 7.5 5C5.55906 5 4 6.6565 4 9C4 11.9435 5.66627 14.533 8.64514 16.9029C9.39 17.4955 10.1845 18.0485 11.0661 18.6038C11.3646 18.7919 11.6611 18.9729 12 19.1752C12.3389 18.9729 12.6354 18.7919 12.9339 18.6038Z"></path>
              </svg>
              <span className="truncate font-bold">علاقه مندی ها</span>
            </CardBody>
          </Link>
        </Card>
        <Card className="group relative flex-[1_150px] overflow-hidden" shadow="md" isPressable isHoverable>
          <Link href="/dashboard/profile" className="h-full w-full">
            <CardBody className="flex flex-col justify-center gap-2 truncate">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="h-8 w-8 transition-all group-hover:rotate-12 group-hover:scale-125 group-hover:fill-secondary">
                <path d="M20 22H18V20C18 18.3431 16.6569 17 15 17H9C7.34315 17 6 18.3431 6 20V22H4V20C4 17.2386 6.23858 15 9 15H15C17.7614 15 20 17.2386 20 20V22ZM12 13C8.68629 13 6 10.3137 6 7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7C18 10.3137 15.3137 13 12 13ZM12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"></path>
              </svg>
              <span className="truncate font-bold">پروفایل</span>
            </CardBody>
          </Link>
        </Card>
        <Card className="group relative flex-[1_150px] overflow-hidden" shadow="md" isPressable isHoverable onPress={() => signOut()}>
          <Link href="#" className="h-full w-full">
            <CardBody className="flex flex-col justify-center gap-2 text-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="h-8 w-8 transition-all group-hover:rotate-12 group-hover:scale-125">
                <path d="M5 11H13V13H5V16L0 12L5 8V11ZM3.99927 18H6.70835C8.11862 19.2447 9.97111 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C9.97111 4 8.11862 4.75527 6.70835 6H3.99927C5.82368 3.57111 8.72836 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C8.72836 22 5.82368 20.4289 3.99927 18Z"></path>
              </svg>
              <span className="truncate font-bold">خروج از حساب کاربری</span>
            </CardBody>
          </Link>
        </Card>
      </div>
      <div />
    </div>
  );
}
