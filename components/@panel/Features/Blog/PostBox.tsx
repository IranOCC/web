import { Input } from "@/components/Input";
import { BlogPostFormData } from "@/types/formsData";
import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import PanelCard from "@/components/@panel/Card";
import TextEditor from "@/components/Input/TextEditor";
import { AddEditComponentProps } from "../../EditAddPage";
import slugify from "slugify";

export default function BlogPostBox({ form, loading, props }: AddEditComponentProps) {
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
    register("title", { required: "عنوان را وارد کنید" });
    register("slug", { required: "شناسه الزامی است" });
    register("excerpt", { required: "چکیده را وارد کنید" });
    register("content", { required: "محتویات را وارد کنید" });
  }, []);

  const { checkingData } = props;
  if (!checkingData) return null;
  return (
    <>
      <PanelCard title="اطلاعات پست" loading={loading}>
        <div className="grid grid-cols-1 gap-4 ">
          <Input
            //
            control={control}
            name="title"
            label="عنوان پست"
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
            defaultValue={checkingData?.title?.default}
            disabled={checkingData?.title?.disabled}
            containerClassName={!!checkingData?.title?.hidden ? "hidden" : ""}
          />
          <Input
            //
            control={control}
            name="slug"
            direction="ltr"
            label="شناسه"
            error={errors.slug?.message}
            loading={isSubmitting}
            noSpace
            defaultValue={checkingData?.slug?.default}
            disabled={checkingData?.slug?.disabled}
            containerClassName={!!checkingData?.slug?.hidden ? "hidden" : ""}
          />
          <Input
            //
            control={control}
            name="excerpt"
            label="چکیده"
            error={errors.excerpt?.message}
            loading={isSubmitting}
            multiline
            lines={4}
            noSpace
            defaultValue={checkingData?.excerpt?.default}
            disabled={checkingData?.excerpt?.disabled}
            containerClassName={!!checkingData?.excerpt?.hidden ? "hidden" : ""}
          />
          <TextEditor
            //
            control={control}
            name="content"
            label=""
            error={errors.content?.message}
            loading={isSubmitting}
            //
            useMediaLibrary
            mediaUploadPath="blog"
            mediaUploaderField="image"
            //
            defaultValue={checkingData?.content?.default}
            disabled={checkingData?.content?.disabled}
            containerClassName={!!checkingData?.content?.hidden ? "hidden" : ""}
          />
        </div>
      </PanelCard>
    </>
  );
}
