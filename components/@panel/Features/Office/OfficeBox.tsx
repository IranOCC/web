import { Button } from "@/components/@panel/Button";
import { CheckBox, Input } from "@/components/@panel/Input";
import { OfficeFormData } from "@/types/formsData";
import { useEffect } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import PanelCard from "@/components/@panel/Card";
import { Select } from "@/components/@panel/Select";
import LogoUploader from "@/components/Uploader/LogoUploader";
import { AddEditComponentProps } from "../../EditAddPage";

export default function OfficeBox({ form, loading, props }: AddEditComponentProps) {
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
  } = form as UseFormReturn<OfficeFormData>;

  useEffect(() => {
    register("name", { required: "نام را وارد کنید" });
    register("description", {
      minLength: {
        value: 10,
        message: "حداقل ده کاراکتر نیاز است",
      },
    });
    register("management", { required: "مدیریت را مشخص کنید" });
    register("logo");

    register("verified");
    register("active");
  }, []);

  const { checkingData } = props;
  if (!checkingData) return null;

  return (
    <>
      <PanelCard title="اطلاعات شعبه" loading={loading}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 ">
          <LogoUploader
            //
            control={control}
            name="logo"
            uploaderField="image"
            uploadPath="storage/office/logo"
            label="لوگو"
            error={errors.logo?.message}
            loading={isSubmitting}
            noSpace
            defaultValue={checkingData?.logo?.default}
            disabled={checkingData?.logo?.disabled}
            containerClassName={["col-span-full", !!checkingData?.logo?.hidden ? "hidden" : ""].join(" ")}
          />
          <Input
            //
            control={control}
            name="name"
            label="نام"
            error={errors.name?.message}
            loading={isSubmitting}
            noSpace
            defaultValue={checkingData?.name?.default}
            disabled={checkingData?.name?.disabled}
            containerClassName={!!checkingData?.name?.hidden ? "hidden" : ""}
          />
          <Select
            //
            control={control}
            name="management"
            label="مدیریت"
            error={errors.management?.message}
            loading={isSubmitting}
            placeholder="انتخاب کنید"
            apiPath="/tools/user/autoComplete"
            searchable
            noSpace
            defaultValue={checkingData?.management?.default}
            disabled={checkingData?.management?.disabled}
            containerClassName={!!checkingData?.management?.hidden ? "hidden" : ""}
          />
          <Input
            //
            control={control}
            name="description"
            label="توضیحات"
            error={errors.description?.message}
            loading={isSubmitting}
            noSpace
            multiline
            defaultValue={checkingData?.description?.default}
            disabled={checkingData?.description?.disabled}
            containerClassName={["col-span-full", !!checkingData?.description?.hidden ? "hidden" : ""].join(" ")}
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
