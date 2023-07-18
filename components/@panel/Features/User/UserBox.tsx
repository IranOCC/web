import { CheckBox, Input } from "@/components/@panel/Input";
import { UserFormData } from "@/types/formsData";
import { useEffect } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import PanelCard from "@/components/@panel/Card";
import { Select } from "@/components/@panel/Select";
import LogoUploader from "@/components/Uploader/LogoUploader";
import { AddEditComponentProps } from "../../EditAddPage";

export default function UserBox({ form, loading, props }: AddEditComponentProps) {
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
    register("roles", { required: "نقش ها را وارد کنید" });
    register("avatar");
    register("verified");
    register("active");
  }, []);

  const { checkingData } = props;
  if (!checkingData) return null;

  return (
    <>
      <PanelCard title="اطلاعات کاربر" loading={loading}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 ">
          <LogoUploader
            //
            control={control}
            name="avatar"
            uploaderField="image"
            uploadPath="storage/user/avatar"
            label="آواتار"
            error={errors.avatar?.message}
            loading={isSubmitting}
            noSpace
            defaultValue={checkingData?.avatar?.default}
            disabled={checkingData?.avatar?.disabled}
            containerClassName={["col-span-full", !!checkingData?.avatar?.hidden ? "hidden" : ""].join(" ")}
          />
          <Input
            //
            control={control}
            name="firstName"
            label="نام"
            error={errors.firstName?.message}
            loading={isSubmitting}
            noSpace
            defaultValue={checkingData?.firstName?.default}
            disabled={checkingData?.firstName?.disabled}
            containerClassName={!!checkingData?.firstName?.hidden ? "hidden" : ""}
          />
          <Input
            //
            control={control}
            name="lastName"
            label="نام خانوادگی"
            error={errors.lastName?.message}
            loading={isSubmitting}
            noSpace
            defaultValue={checkingData?.lastName?.default}
            disabled={checkingData?.lastName?.disabled}
            containerClassName={!!checkingData?.lastName?.hidden ? "hidden" : ""}
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
            showTitle
            tagsMode
            apiPath="/tools/user/statics/roles"
            defaultValue={checkingData?.roles?.default}
            disabled={checkingData?.roles?.disabled}
            containerClassName={["col-span-full", !!checkingData?.roles?.hidden ? "hidden" : ""].join(" ")}
            disabledItems={checkingData?.roles?.disabledItems}
          />
          <CheckBox //
            control={control}
            name="verified"
            label="احراز شده"
            error={errors.verified?.message}
            loading={isSubmitting}
            noSpace
            defaultValue={checkingData?.verified?.default}
            disabled={checkingData?.verified?.disabled}
            containerClassName={!!checkingData?.verified?.hidden ? "hidden" : ""}
          />
          <CheckBox //
            control={control}
            name="active"
            label="فعال"
            error={errors.active?.message}
            loading={isSubmitting}
            noSpace
            defaultValue={checkingData?.active?.default}
            disabled={checkingData?.active?.disabled}
            containerClassName={!!checkingData?.active?.hidden ? "hidden" : ""}
          />
        </div>
      </PanelCard>
    </>
  );
}
