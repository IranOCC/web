import { CheckBox, Input } from "@/components/Input";
import { EstateFormData } from "@/types/formsData";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import PanelCard from "@/components/@panel/Card";
import { Select } from "@/components/Select";
import LogoUploader from "@/components/Uploader/LogoUploader";
import TextEditor from "@/components/Input/TextEditor";
import { AddEditComponentProps } from "../../EditAddPage";

export default function EstateVisibilityBox({ form, loading }: AddEditComponentProps) {
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
  } = form as UseFormReturn<EstateFormData>;

  useEffect(() => {
    register("status");
    register("visibility");
    register("password");
    register("publishedAt");
    register("pinned");
  }, []);

  return (
    <>
      <PanelCard title="وضعیت نمایش" loading={loading}>
        <div className="grid grid-cols-1 gap-4 ">
          <Select
            //
            control={control}
            name="status"
            label="وضعیت"
            error={errors.status?.message}
            loading={isSubmitting}
            placeholder="انتخاب کنید"
            noSpace
            apiPath="/estate/statics/status"
          />
          <Select
            //
            control={control}
            name="visibility"
            label="نمایش"
            error={errors.visibility?.message}
            loading={isSubmitting}
            placeholder="انتخاب کنید"
            noSpace
            apiPath="/estate/statics/visibility"
          />
          <Input
            //
            control={control}
            name="password"
            label="پسورد"
            direction="ltr"
            type="text"
            error={errors.password?.message}
            loading={isSubmitting}
            noSpace
          />
          <Input
            //
            control={control}
            name="publishedAt"
            label="تاریخ انتشار"
            error={errors.publishedAt?.message}
            loading={isSubmitting}
            noSpace
          />
          <CheckBox //
            control={control}
            name="pinned"
            label="سنجاق شده"
            error={errors.pinned?.message}
            loading={isSubmitting}
            noSpace
          />
        </div>
      </PanelCard>
    </>
  );
}
