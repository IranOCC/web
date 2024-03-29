import { Input } from "@/components/Input";
import { InitialSettingsFormData } from "@/types/formsData";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import PanelCard from "@/components/@panel/Card";
import { Select } from "@/components/Select";
import { Alert } from "@mui/material";

export default function InitialSettingsBox({ form, loading }: { form: any; loading?: boolean }) {
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
  } = form as UseFormReturn<InitialSettingsFormData>;

  useEffect(() => {
    register("title", { required: "عنوان را وارد کنید" });
    register("description", { required: "توضیحات را وارد کنید" });
    register("keywords");
  }, []);

  return (
    <>
      <PanelCard title="تنظیمات اولیه" loading={loading}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 ">
          <Alert severity="info" className="col-span-full">
            برای اعمال این تنظیمات نیاز هست وبسایت ریبلد شود
          </Alert>
          <Input
            //
            control={control}
            name="title"
            label="عنوان"
            error={errors.title?.message}
            loading={isSubmitting}
            noSpace
            containerClassName="col-span-full"
          />
          <Input
            //
            control={control}
            name="description"
            label="توضیحات"
            error={errors.description?.message}
            loading={isSubmitting}
            multiline
            noResize
            lines={3}
            noSpace
            // containerClassName="col-span-full"
          />
          <Input
            //
            control={control}
            name="keywords"
            label="کلمات کلیدی"
            placeholder="تایپ + اینتر"
            error={errors.keywords?.message}
            loading={isSubmitting}
            tagsMode
            noSpace
            // containerClassName="col-span-full"
          />
        </div>
      </PanelCard>
    </>
  );
}
