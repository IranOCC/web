import { Button } from "@/components/Button";
import { CheckBox, Input } from "@/components/Input";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { toast } from "@/lib/toast";
import { UserFormData } from "@/types/formsData";
import { useEffect } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import PanelCard from "@/components/@panel/Card";
import { useRouter } from "next/navigation";
import { Select } from "@/components/Select";
import LogoUploader from "@/components/Uploader/LogoUploader";

export default function UserBox({ form }: any) {
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
  } = form as UseFormReturn<UserFormData>;

  useEffect(() => {
    register("firstName", { required: "نام را وارد کنید" });
    register("lastName", { required: "نام خانوادگی را وارد کنید" });
    register("status", { required: "وضعیت را وارد کنید" });
    register("roles", { required: "نقش ها را وارد کنید" });
    register("avatar");
    register("verified");
    register("active");
  }, []);

  return (
    <>
      <PanelCard title="اطلاعات کاربر">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          <LogoUploader
            //
            control={control}
            name="avatar"
            uploadPath="users"
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

          <Select
            //
            control={control}
            name="status"
            label="وضعیت"
            error={errors.status?.message}
            loading={isSubmitting}
            placeholder="انتخاب کنید"
            noSpace
            apiPath="/user/statics/statuses"
          />
          <Select
            //
            control={control}
            name="roles"
            label="نقش ها"
            error={errors.roles?.message}
            loading={isSubmitting}
            placeholder="انتخاب کنید"
            multiple
            noSpace
            apiPath="/user/statics/roles"
          />
          <CheckBox //
            control={control}
            name="verified"
            label="احراز شده"
            error={errors.verified?.message}
            loading={isSubmitting}
            noSpace
          />

          <CheckBox //
            control={control}
            name="active"
            label="فعال"
            error={errors.active?.message}
            loading={isSubmitting}
            noSpace
          />
        </div>
      </PanelCard>
    </>
  );
}
