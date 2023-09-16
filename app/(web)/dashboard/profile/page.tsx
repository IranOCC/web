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
import { usePathname, useRouter } from "next/navigation";
import { ArrowForwardIos } from "@mui/icons-material";
import { Alert } from "@mui/material";
import { handleFieldsError } from "@/lib/axios";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { toast } from "@/lib/toast";
import moment from "jalali-moment";

export default function Page({ searchParams }: any) {
  const { dashboardPage } = useContext(WebPreviewContext) as WebPreviewContextType;
  useEffect(() => {
    dashboardPage();
  }, []);

  const { warning, error, info, section } = searchParams;

  // const [selectedTab, setSelectedTab] = useState<Key>(section);

  const router = useRouter();
  const pathname = usePathname();

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
        <div className="empty:hidden">
          {!!error && <Alert severity="error">{error}</Alert>}
          {!!warning && <Alert severity="warning">{warning}</Alert>}
          {!!info && <Alert severity="info">{info}</Alert>}
        </div>
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
              selectedKey={section}
              onSelectionChange={(key) => router.push(`${pathname}?section=${key}`)}
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
          {section === "info" && <UserInfo user={user} />}
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
    setValue("birthday", user?.birthday ? moment(user.birthday).format("jYYYY/jMM/jDD") : "");
  }, []);

  const api = useAxiosAuth();
  const onSubmit = async (data: MyProfileFormData) => {
    data.birthday = moment(data.birthday, "jYYYY/jMM/jDD").startOf("day").toISOString();
    // alert(data.birthday);
    try {
      await api.patch("/auth", data);
      toast.success("با موفقیت ویرایش شد");
      window.location.reload();
    } catch (error) {
      handleFieldsError(error, setError);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
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
                    placeholder="عباس"
                    {...field}
                    isReadOnly={isLoading || isSubmitting || isValidating}
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
                    placeholder="غلامی"
                    {...field}
                    isReadOnly={isLoading || isSubmitting || isValidating}
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
                    placeholder="0910170747"
                    dir="ltr"
                    {...field}
                    isReadOnly={isLoading || isSubmitting || isValidating}
                    isRequired
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
                validate: {
                  isValidNationalCode: (value) => {
                    if (value?.replaceAll(" ", "").length !== 10) return "کد ملی نامعتبر است";
                  },
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
                    placeholder="1377/07/21"
                    dir="ltr"
                    {...field}
                    isReadOnly={isLoading || isSubmitting || isValidating}
                    // isRequired
                    classNames={{ errorMessage: "text-right" }}
                    errorMessage={errors.birthday?.message}
                    validationState={!!errors.birthday?.message ? "invalid" : "valid"}
                  />
                );
              }}
              rules={{
                validate: {
                  isTrueDate: (value) => {
                    const isEnLength = value?.replaceAll(" ", "").length === 10;
                    const mom = moment(value, "jYYYY/jMM/jDD");
                    const isValid = mom.isValid();
                    const isBefore = mom.isBefore();
                    console.log(value?.length, isEnLength, isValid, isBefore);

                    if (!isEnLength || !isValid || !isBefore) return "تاریخ نامعتبر است";
                  },
                },
              }}
            />
          </div>
        </CardBody>
        <CardFooter className="flex flex-row gap-2">
          <Button
            //
            color="default"
            onPress={() => reset()}
            isDisabled={isLoading || isSubmitting || isValidating}
          >
            ریست
          </Button>
          <Button
            //
            color="secondary"
            type="submit"
            isLoading={isLoading || isSubmitting || isValidating}
          >
            ویرایش
          </Button>
        </CardFooter>
      </form>
    </>
  );
};
