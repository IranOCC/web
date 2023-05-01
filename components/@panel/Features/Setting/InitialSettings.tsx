import { Button } from "@/components/Button";
import { CheckBox, Input } from "@/components/Input";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { toast } from "@/lib/toast";
import { InitialSettingsFormData, UserFormData } from "@/types/formsData";
import { useEffect } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import PanelCard from "@/components/@panel/Card";
import { useRouter } from "next/navigation";
import { Select } from "@/components/Select";
import LogoUploader from "@/components/Uploader/LogoUploader";

export default function InitialSettings({ form }: any) {
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
    register("keywords", { required: "کلمات کلیدی را وارد کنید" });
  }, []);

  return (
    <>
      <PanelCard title="تنظیمات اولیه">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
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
            lines={3}
            noSpace
          />
          <Input
            //
            control={control}
            name="keywords"
            label="کلمات کلیدی"
            error={errors.keywords?.message}
            loading={isSubmitting}
            multiline
            lines={3}
            noSpace
          />
        </div>
      </PanelCard>
    </>
  );
}
