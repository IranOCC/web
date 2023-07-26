import { CheckBox, DateTimePicker } from "@/components/Input";
import { PageFormData } from "@/types/formsData";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import PanelCard from "@/components/@panel/Card";
import { Select } from "@/components/Select";
import { AddEditComponentProps } from "../../EditAddPage";

export default function PageVisibilityBox({ form, loading }: AddEditComponentProps) {
  const {
    register,
    unregister,
    resetField,
    setValue,
    setError,
    getValues,
    control,
    handleSubmit,
    reset,
    formState: { errors, isLoading, isSubmitting, isValidating, isSubmitted, isSubmitSuccessful },
  } = form as UseFormReturn<PageFormData>;

  useEffect(() => {
    register("status", { required: "وضعیت را مشخص کنید" });
    register("publishedAt", { required: "تاریخ انتشار را مشخص کنید" });
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
            apiPath="/tools/blog/post/statics/status"
            defaultValue="Publish"
          />
          <DateTimePicker
            //
            control={control}
            name="publishedAt"
            label="تاریخ انتشار"
            error={errors.publishedAt?.message}
            defaultValue={new Date()}
            loading={isSubmitting}
            noSpace
          />
        </div>
      </PanelCard>
    </>
  );
}
