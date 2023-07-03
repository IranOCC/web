import Modal from ".";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { MyProfileFormData } from "@/types/formsData";
import { useForm } from "react-hook-form";
import { useContext, useEffect, useRef, useState } from "react";
import { toast } from "@/lib/toast";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { signIn, signOut } from "next-auth/react";
import { Session, StorageFile } from "@/types/interfaces";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import LogoUploader from "../Uploader/LogoUploader";
import { CurrentUserContext, CurrentUserContextType } from "@/context/currentUser.context";

//
//
//

const CompleteProfileModal = () => {
  const router = useRouter();
  const pathname = usePathname();
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
  };

  const api = useAxiosAuth(setError);

  useEffect(() => {
    register("firstName", { required: "نام را وارد کنید" });
    register("lastName", { required: "نام خانوادگی را وارد کنید" });
    register("avatar");
    if (!!user) setInitialData(user as MyProfileFormData);
  }, [user]);

  const onSubmit = async (data: MyProfileFormData) => {
    try {
      await api.patch("/auth", data);
      toast.success("با موفقیت ویرایش شد");
      window.location.reload();
    } catch (error) {}
  };

  if (pathname === "auth" || !user || user?.fullName) return null;

  return (
    <Modal
      //
      open
      title="تکمیل اطلاعات پروفایل"
      closeButton={false}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <LogoUploader
          //
          control={control}
          name="avatar"
          uploaderField="image"
          uploadPath="storage/user/avatar"
          body={{
            relatedToID: user?._id,
          }}
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
          className="col-span-full"
          title="بروزرسانی پروفایل"
          type="submit"
          loading={isSubmitting || isLoading || isValidating}
          onClick={handleSubmit(onSubmit)}
          noSpace
        />

        <Button
          //
          className="col-span-full"
          variant="outline"
          title="خروج از حساب"
          type="submit"
          loading={isSubmitting || isLoading || isValidating}
          onClick={() => signOut()}
          noSpace
        />
      </div>
    </Modal>
  );
};

export default CompleteProfileModal;
