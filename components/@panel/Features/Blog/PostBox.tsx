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

  const [openContent, setOpenContent] = useState(false);

  return (
    <>
      <PanelCard title="اطلاعات پست" loading={loading}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
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
          />
        </div>
      </PanelCard>
    </>
  );
}
