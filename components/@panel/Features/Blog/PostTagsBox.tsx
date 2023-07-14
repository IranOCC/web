import { CheckBox, Input } from "@/components/@panel/Input";
import { BlogPostFormData } from "@/types/formsData";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import PanelCard from "@/components/@panel/Card";
import { AddEditComponentProps } from "../../EditAddPage";

export default function BlogPostTagsBox({ form, loading }: AddEditComponentProps) {
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
    register("tags");
  }, []);

  return (
    <>
      <PanelCard title="برچسب ها" loading={loading}>
        <div className="grid grid-cols-1 gap-4 ">
          <Input
            //
            control={control}
            name="tags"
            placeholder="تایپ + اینتر"
            error={errors.tags?.message}
            loading={isSubmitting}
            multiline
            lines={3}
            tagsMode
            noSpace
          />
        </div>
      </PanelCard>
    </>
  );
}
