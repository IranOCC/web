import { Input } from "@/components/@panel/Input";
import { MailTemplateFormData } from "@/types/formsData";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { Select } from "@/components/@panel/Select";
import IconSelection from "@/components/@panel/Select/IconSelection";
import { AddEditComponentProps } from "@/components/@panel/EditAddPage";
import slugify from "slugify";

export default function MailTemplateBox({ form, loading, cancelForm }: AddEditComponentProps) {
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
  } = form as UseFormReturn<MailTemplateFormData>;

  useEffect(() => {
    register("title", { required: "عنوان را وارد کنید" });
    register("slug");
    register("content", { required: "محتویات قالب الزامی است" });
    register("serviceID");
  }, []);

  return (
    <>
      <Input
        //
        control={control}
        name="title"
        placeholder="عنوان"
        error={errors.title?.message}
        loading={isSubmitting}
        noSpace
        onKeyUp={(e: any) => {
          setValue(
            "slug",
            slugify(e.target.value, {
              replacement: "_",
              remove: undefined,
              lower: false,
              strict: false,
              locale: "fa",
              trim: true,
            }),
            { shouldValidate: true }
          );
        }}
      />
      <Input
        //
        control={control}
        name="slug"
        direction="ltr"
        placeholder="شناسه"
        error={errors.slug?.message}
        loading={isSubmitting}
        noSpace
      />
      <Input
        //
        control={control}
        name="content"
        direction="ltr"
        placeholder="با سلام {{user.fullName}} عزیز"
        error={errors.content?.message}
        loading={isSubmitting}
        multiline
        lines={8}
        noSpace
      />
      <Input
        //
        control={control}
        name="serviceID"
        direction="ltr"
        placeholder="شناسه سرویس (الزامی نیست)"
        error={errors.serviceID?.message}
        loading={isSubmitting}
        noSpace
      />
    </>
  );
}
