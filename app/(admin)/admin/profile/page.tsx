"use client";

import PanelCard from "@/components/@panel/Card";
import EmailAddressBox from "@/components/@panel/Features/@common/EmailAddressBox";
import LocationBox from "@/components/@panel/Features/@common/LocationBox";
import PhoneNumberBox from "@/components/@panel/Features/@common/PhoneNumberBox";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import LogoUploader from "@/components/Uploader/LogoUploader";
import { CurrentUserContext, CurrentUserContextType } from "@/context/currentUser.context";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { handleFieldsError } from "@/lib/axios";
import { toast } from "@/lib/toast";
import { MyProfileFormData, UserFormData } from "@/types/formsData";
import { StorageFile, Phone, Email } from "@/types/interfaces";
import { signOut } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import { UseFormReturn, useForm } from "react-hook-form";

export default function Page() {
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

  const setInitialData = (data: MyProfileFormData) => {
    setValue("firstName", data.firstName);
    setValue("lastName", data.lastName);
    setValue("avatar", data.avatar as StorageFile);
    //
    setValue("phone", data.phone as Phone);
    setValue("email", data.email as Email);
    //
    setValue("province", data.province);
    setValue("city", data.city);
    setValue("address", data.address);
    setValue("location", data.location);
  };

  const beforeSubmit = (data: MyProfileFormData) => {
    if (!(data.phone as Phone)?.value) {
      data.phone = undefined;
    }
    if (!(data.email as Email)?.value) {
      data.email = undefined;
    }
    return data;
  };

  const [loading, setLoading] = useState(false);

  const api = useAxiosAuth();
  useEffect(() => {
    register("firstName", { required: "نام را وارد کنید" });
    register("lastName", { required: "نام خانوادگی را وارد کنید" });
    register("avatar");
    if (!!user) setInitialData(user as MyProfileFormData);
  }, [user]);

  const onSubmit = async (data: MyProfileFormData) => {
    data = beforeSubmit(data);
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
      <div className="p-4 pt-0">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-full">
            <PanelCard title="پروفایل من" loading={loading}>
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
                <Input
                  //
                  control={control}
                  name="firstName"
                  label="نام"
                  error={errors.firstName?.message}
                  loading={isSubmitting}
                  noSpace
                />
                <Input
                  //
                  control={control}
                  name="lastName"
                  label="نام خانوادگی"
                  error={errors.lastName?.message}
                  loading={isSubmitting}
                  noSpace
                />
              </div>
            </PanelCard>
          </div>
          {/*
          <div className="col-span-full md:col-span-1">
            <PhoneNumberBox form={form} loading={loading} allowVerify={false} />
          </div>
          <div className="col-span-full md:col-span-1">
            <EmailAddressBox form={form} loading={loading} allowVerify={false} />
          </div>
          <div className="col-span-full">
            <LocationBox form={form} loading={loading} />
          </div>
          */}
          <div className="col-span-full">
            <PanelCard className="order-last lg:order-first">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Button
                  //
                  // className="col-span-full"
                  title="بروزرسانی پروفایل"
                  type="submit"
                  loading={isSubmitting || isLoading || isValidating || loading}
                  onClick={handleSubmit(onSubmit)}
                  noSpace
                />

                <Button
                  //
                  // className="col-span-full"
                  variant="outline"
                  title="خروج از حساب"
                  type="submit"
                  loading={isSubmitting || isLoading || isValidating || loading}
                  onClick={() => signOut()}
                  noSpace
                />
              </div>
            </PanelCard>
          </div>
        </div>
      </div>
    </>
  );
}
