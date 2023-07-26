import { Input } from "@/components/Input";
import { PageFormData } from "@/types/formsData";
import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import PanelCard from "@/components/@panel/Card";
import TextEditor from "@/components/Input/TextEditor";
import { AddEditComponentProps } from "../../EditAddPage";
import slugify from "slugify";

export default function PageBox({ form, loading, props }: AddEditComponentProps) {
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
  } = form as UseFormReturn<PageFormData>;

  useEffect(() => {
    register("title", { required: "عنوان را وارد کنید" });
    register("slug", { required: "شناسه الزامی است" });
    register("content", { required: "محتویات را وارد کنید" });
  }, []);

  return (
    <>
      <PanelCard title="اطلاعات صفحه" loading={loading}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 ">
          <Input
            //
            control={control}
            name="title"
            label="عنوان پست"
            error={errors.title?.message}
            loading={isSubmitting}
            noSpace
            containerClassName="col-span-full"
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
            label="شناسه"
            error={errors.slug?.message}
            loading={isSubmitting}
            noSpace
            containerClassName="col-span-full"
          />
          <TextEditor
            //
            control={control}
            name="content"
            label=""
            error={errors.content?.message}
            loading={isSubmitting}
            containerClassName="col-span-full"
            //
            useMediaLibrary
            mediaUploadPath="page"
            mediaUploaderField="image"
          />
        </div>
      </PanelCard>
    </>
  );
}
