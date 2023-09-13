"use client";

import Link from "next/link";
import { WebPreviewContext, WebPreviewContextType } from "@/context/webPreview.context";
import { Key, useContext, useEffect, useState } from "react";
import { Avatar, Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, Chip, Input, Tab, Tabs } from "@nextui-org/react";
import { signOut } from "next-auth/react";
import { CurrentUserContext, CurrentUserContextType } from "@/context/currentUser.context";
import { MyProfileFormData } from "@/types/formsData";
import { Controller, useForm } from "react-hook-form";
import { Phone, StorageFile, User } from "@/types/interfaces";
import LogoUploader from "@/components/Uploader/LogoUploader";
import { PatternFormat } from "react-number-format";
import { useRouter } from "next/navigation";
import { ArrowForwardIos } from "@mui/icons-material";

export default function Page() {
  const { dashboardPage } = useContext(WebPreviewContext) as WebPreviewContextType;
  useEffect(() => {
    dashboardPage();
  }, []);

  const [selectedTab, setSelectedTab] = useState<Key>("info");

  const router = useRouter();

  const { user } = useContext(CurrentUserContext) as CurrentUserContextType;
  if (!user) return null;

  return (
    <div className="flex h-auto min-h-full flex-col items-center justify-start bg-gray-200 pb-16 md:bg-transparent md:pb-4">
      <div className="sticky top-[-1px] z-20 flex w-full flex-row gap-2 self-start bg-gray-200 px-4 py-3 md:bg-white">
        <Button
          //
          isIconOnly
          size="sm"
          onPress={() => router.back()}
          className="text-white"
          radius="md"
          color="secondary"
        >
          <ArrowForwardIos />
        </Button>
        <h1 className="relative flex w-fit justify-center pb-1 text-lg font-bold after:absolute after:bottom-0 after:h-1 after:w-[calc(100%-30px)] after:rounded-md after:bg-secondary after:content-['']">
          پروفایل من
          {/*  */}
        </h1>
      </div>
      <div className="flex w-full max-w-4xl flex-col gap-3 px-4 py-5">
        <Card isPressable>
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
          <CardFooter className="gap-2 min-[400px]:gap-3">
            <div className="flex flex-1 flex-col gap-1 min-[400px]:flex-none min-[400px]:flex-row">
              <p className="text-small font-bold text-default-400">0</p>
              <p className=" truncate text-small text-default-400">املاک ثبت شده</p>
            </div>
            <div className="flex flex-1 flex-col gap-1 min-[400px]:flex-none min-[400px]:flex-row">
              <p className="text-small font-bold text-default-400">0</p>
              <p className="truncate text-small text-default-400">املاک تایید شده</p>
            </div>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="justify-center">
            <Tabs
              //
              selectedKey={selectedTab}
              onSelectionChange={setSelectedTab}
              fullWidth
              className="w-full"
              color="secondary"
              variant="solid"
            >
              <Tab
                key="info"
                title={
                  <div className="flex items-center gap-2">
                    <span>مشخصات فردی</span>
                  </div>
                }
              />
              <Tab
                key="phone"
                title={
                  <div className="flex items-center gap-2">
                    <span>شماره موبایل</span>
                  </div>
                }
              />
              <Tab
                key="email"
                title={
                  <div className="flex items-center gap-2">
                    <span>آدرس ایمیل</span>
                  </div>
                }
              />
              <Tab
                key="address"
                title={
                  <div className="flex items-center gap-2">
                    <span>موقعیت مکانی</span>
                  </div>
                }
              />
            </Tabs>
          </CardHeader>
          {selectedTab === "info" && <UserInfo user={user} />}
          {/* {selectedTab === "phone" && <UserInfo user={user}/>} */}
          {/* {selectedTab === "phone" && <UserInfo user={user}/>} */}
          {/* {selectedTab === "phone" && <UserInfo user={user}/>} */}
        </Card>
      </div>
      <div />
    </div>
  );
}

const UserInfo = ({ user }: { user: User }) => {
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

  useEffect(() => {
    setValue("firstName", user!.firstName!);
    setValue("lastName", user!.lastName!);
    setValue("avatar", user!.avatar! as StorageFile);

    setValue("nationalCode", user!.nationalCode!);
    setValue("birthday", user!.birthday!);
  }, []);

  return (
    <>
      <CardBody>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <LogoUploader
            //
            control={control}
            name="avatar"
            uploaderField="image"
            uploadPath="storage/user/avatar"
            body={
              {
                // relatedToID: user?._id,
              }
            }
            label="آپلود آواتار"
            error={errors.avatar?.message}
            loading={isSubmitting}
            containerClassName="col-span-full"
            noSpace
          />
          <Controller
            control={control}
            name="firstName"
            render={({ field }) => {
              return (
                <Input
                  //
                  className="col-span-1"
                  type="text"
                  variant="faded"
                  label="نام"
                  {...field}
                  isRequired
                  classNames={{ errorMessage: "text-right" }}
                  errorMessage={errors.firstName?.message}
                  validationState={!!errors.firstName?.message ? "invalid" : "valid"}
                />
              );
            }}
            rules={{
              required: {
                value: true,
                message: "نام را وارد کنید",
              },
            }}
          />
          <Controller
            control={control}
            name="lastName"
            render={({ field }) => {
              return (
                <Input
                  //
                  className="col-span-1"
                  type="text"
                  variant="faded"
                  label="نام خانوادگی"
                  {...field}
                  isRequired
                  classNames={{ errorMessage: "text-right" }}
                  errorMessage={errors.lastName?.message}
                  validationState={!!errors.lastName?.message ? "invalid" : "valid"}
                />
              );
            }}
            rules={{
              required: {
                value: true,
                message: "نام خانوادگی را وارد کنید",
              },
            }}
          />
          <Controller
            control={control}
            name="nationalCode"
            render={({ field }) => {
              return (
                <PatternFormat
                  //
                  format="##########"
                  customInput={Input}
                  className="col-span-1"
                  type="text"
                  variant="faded"
                  label="کد ملی"
                  dir="ltr"
                  {...field}
                  // isRequired
                  classNames={{ errorMessage: "text-right" }}
                  errorMessage={errors.nationalCode?.message}
                  validationState={!!errors.nationalCode?.message ? "invalid" : "valid"}
                />
              );
            }}
            rules={{
              required: {
                value: true,
                message: "کد ملی را وارد کنید",
              },
            }}
          />
          <Controller
            control={control}
            name="birthday"
            render={({ field }) => {
              return (
                <PatternFormat
                  //
                  format="####/##/##"
                  customInput={Input}
                  className="col-span-1"
                  type="text"
                  variant="faded"
                  label="تاریخ تولد"
                  dir="ltr"
                  {...field}
                  // isRequired
                  classNames={{ errorMessage: "text-right" }}
                  errorMessage={errors.birthday?.message}
                  validationState={!!errors.birthday?.message ? "invalid" : "valid"}
                />
              );
            }}
            rules={{
              required: {
                value: true,
                message: "تاریخ تولد را وارد کنید",
              },
            }}
          />
        </div>
      </CardBody>
      <CardFooter className="flex flex-row gap-2">
        <Button
          //
          disabled
          color="default"
        >
          ریست
        </Button>
        <Button
          //
          disabled
          color="secondary"
        >
          ویرایش
        </Button>
      </CardFooter>
    </>
  );
};
