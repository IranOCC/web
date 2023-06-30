"use client";

import PanelCard from "@/components/@panel/Card";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import LogoUploader from "@/components/Uploader/LogoUploader";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { toast } from "@/lib/toast";
import { UserFormData } from "@/types/formsData";
import { StorageFile, Phone, Email } from "@/types/interfaces";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { UseFormReturn, useForm } from "react-hook-form";

export default function Page() {
  const form = useForm<UserFormData>();
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

  const setInitialData = (data: UserFormData) => {
    setValue("_id", data._id);

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

  const beforeSubmit = (data: UserFormData) => {
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
  const getMe = async () => {
    try {
      const me = await api.get("/auth");
      setInitialData(me.data);
    } catch (error) {
      await signOut();
    }
  };
  useEffect(() => {
    register("firstName", { required: "نام را وارد کنید" });
    register("lastName", { required: "نام خانوادگی را وارد کنید" });
    register("avatar");

    getMe();
  }, []);

  const onSubmit = async (data: UserFormData) => {
    try {
      await api.patch("/auth", data);
      toast.success("با موفقیت ویرایش شد");
    } catch (error) {
      //
    }
  };

  return (
    <>
      <div className="p-4">
        <PanelCard title="پروفایل من" loading={loading}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <LogoUploader
              //
              control={control}
              name="avatar"
              uploadPath="user"
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

            <Button
              //
              className="col-span-2"
              title="بروزرسانی پروفایل"
              type="submit"
              loading={isSubmitting || isLoading || isValidating || loading}
              onClick={handleSubmit(onSubmit)}
              noSpace
            />

            <Button
              //
              className="col-span-2"
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
    </>
  );
}
