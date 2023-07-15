import { CheckBox, Input } from "@/components/@panel/Input";
import { BlogPostFormData, EstateFormData } from "@/types/formsData";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import PanelCard from "@/components/@panel/Card";
import { Select } from "@/components/@panel/Select";

import { AddEditComponentProps } from "../../EditAddPage";

export default function BlogPostAuthorBox({ form, loading, props }: AddEditComponentProps) {
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
    register("author", { required: "نویسنده را مشخص کنید" });
  }, []);

  const { checkingData } = props;
  if (!checkingData) return null;

  return (
    <>
      <PanelCard title="نویسنده" loading={loading}>
        <div className="grid grid-cols-1 gap-4 ">
          <Select
            //
            control={control}
            name="author"
            error={errors.author?.message}
            loading={isSubmitting}
            placeholder="انتخاب کنید"
            apiPath="/tools/user/autoComplete"
            searchable
            noSpace
            defaultValue={checkingData?.author?.default}
            disabled={checkingData?.author?.disabled}
            containerClassName={!!checkingData?.author?.hidden ? "hidden" : ""}
          />
        </div>
      </PanelCard>
    </>
  );
}
