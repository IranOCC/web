import { BlogPostFormData } from "@/types/formsData";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import PanelCard from "@/components/@panel/Card";
import { Select } from "@/components/Select";
import { AddEditComponentProps } from "../../EditAddPage";

export default function BlogPostRegistrantBox({ form, loading }: AddEditComponentProps) {
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
  } = form as UseFormReturn<BlogPostFormData>;

  useEffect(() => {
    register("createdBy");
    register("confirmedBy");
    register("office");
  }, []);

  return (
    <>
      <PanelCard title="جزییات پست" loading={loading}>
        <div className="grid grid-cols-1 gap-4 ">
          <Select
            //
            control={control}
            name="createdBy"
            error={errors.createdBy?.message}
            loading={isSubmitting}
            label="ثبت کننده"
            placeholder="انتخاب کنید"
            apiPath="/tools/user/autoComplete"
            searchable
            noSpace
          />
          <Select
            //
            control={control}
            name="confirmedBy"
            error={errors.confirmedBy?.message}
            loading={isSubmitting}
            label="تایید کننده"
            placeholder="انتخاب کنید"
            apiPath="/tools/user/autoComplete"
            searchable
            noSpace
          />
          <Select
            //
            control={control}
            name="office"
            error={errors.office?.message}
            loading={isSubmitting}
            label="شعبه"
            placeholder="انتخاب کنید"
            apiPath="/tools/office/autoComplete"
            searchable
            noSpace
          />
        </div>
      </PanelCard>
    </>
  );
}
