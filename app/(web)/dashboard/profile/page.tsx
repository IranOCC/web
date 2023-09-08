"use client";

import Link from "next/link";
import { WebPreviewContext, WebPreviewContextType } from "@/context/webPreview.context";
import { useContext, useEffect } from "react";
import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, Chip, Tab, Tabs } from "@nextui-org/react";
import { signOut } from "next-auth/react";
import { CurrentUserContext, CurrentUserContextType } from "@/context/currentUser.context";
import { MyProfileFormData } from "@/types/formsData";
import { useForm } from "react-hook-form";
import { Phone, StorageFile } from "@/types/interfaces";

export default function Page() {
  const { dashboardPage } = useContext(WebPreviewContext) as WebPreviewContextType;
  useEffect(() => {
    dashboardPage();
  }, []);

  const { user } = useContext(CurrentUserContext) as CurrentUserContextType;

  const form = useForm<MyProfileFormData>();
  const {
    register,
    unregister,
    resetField,
    setValue,
    setError,
    control,
    handleSubmit,
    reset,
    formState: { errors, isLoading, isSubmitting, isValidating, isSubmitted, isSubmitSuccessful },
  } = form;

  if (!user) return null;

  return (
    <div className="flex h-auto min-h-full flex-col items-center justify-start bg-gray-200 pb-16 md:bg-transparent md:pb-4">
      <div className="sticky top-[-1px] z-20 flex w-full flex-col gap-2 self-start bg-gray-200 px-4 py-3 md:bg-white">
        <h1 className="relative flex w-fit justify-center pb-1 text-lg font-bold after:absolute after:bottom-0 after:h-1 after:w-[calc(100%-30px)] after:rounded-md after:bg-secondary after:content-['']">
          پروفایل من
          {/*  */}
        </h1>
      </div>
      <div className="grid w-full grid-cols-1 flex-wrap gap-4 px-4 py-5 xl:grid-cols-3">
        <div className="col-span-1 flex w-full flex-col gap-3">
          <Card className="w-full" isPressable>
            <CardHeader className="justify-between">
              <div className="flex gap-5">
                <Avatar
                  //
                  isBordered
                  showFallback
                  name={user.fullName || ""}
                  radius="full"
                  size="lg"
                  src={process.env.NEXT_PUBLIC_STORAGE_BASE_URL + "/" + (user?.avatar as StorageFile)?.path}
                />
                <div className="flex flex-col items-start justify-center gap-1">
                  <h4 className="text-small font-semibold leading-none text-default-600">{user.fullName}</h4>
                  <h5 className="text-small tracking-tight text-default-400" dir="ltr">
                    {(user.phone as Phone)?.value}
                  </h5>
                </div>
              </div>
            </CardHeader>
            <CardBody className="px-3 py-0 text-small text-default-400"></CardBody>
            <CardFooter className="gap-3">
              <div className="flex gap-1">
                <p className="text-small font-semibold text-default-400">0</p>
                <p className=" text-small text-default-400">املاک ثبت شده</p>
              </div>
              <div className="flex gap-1">
                <p className="text-small font-semibold text-default-400">0</p>
                <p className="text-small text-default-400">املاک تایید شده</p>
              </div>
            </CardFooter>
          </Card>
          {/* <Tabs
            aria-label="Options"
            color="secondary"
            variant="bordered"
            className="w-full"
            classNames={{
              tabList: "flex-row lg:flex-col lg:w-full",
              // cursor: "w-full",
              tab: "lg:py-6",
              // tabContent: "group-data-[selected=true]:text-[#06b6d4]",
            }}
          >
            <Tab
              key="photos"
              title={
                <div className="flex items-center gap-2">
                  <span>مشخصات فردی</span>
                </div>
              }
            />
            <Tab
              key="music"
              title={
                <div className="flex items-center gap-2">
                  <span>شماره موبایل</span>
                  <Chip size="sm" variant="faded">
                    تایید شده
                  </Chip>
                </div>
              }
            />
            <Tab
              key="videos"
              title={
                <div className="flex items-center gap-2">
                  <span>آدرس ایمیل</span>
                  <Chip size="sm" variant="faded">
                    تایید نشده
                  </Chip>
                </div>
              }
            />
          </Tabs> */}
        </div>
        <div className="col-span-2 flex w-full flex-col gap-3">
          <Card className="w-full">
            <CardHeader className="justify-between">مشخصات فردی</CardHeader>
            <CardBody className="px-3 py-0 text-small text-default-400"></CardBody>
          </Card>
        </div>
      </div>
      <div className="grid w-full grid-cols-1 flex-wrap gap-4 px-4 py-5 xl:grid-cols-3"></div>

      <div />
    </div>
  );
}
