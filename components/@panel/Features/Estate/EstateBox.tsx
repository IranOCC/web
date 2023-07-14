import { CheckBox, Input } from "@/components/@panel/Input";
import { EstateFormData } from "@/types/formsData";
import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import PanelCard from "@/components/@panel/Card";
import TextEditor from "@/components/@panel/Input/TextEditor";
import { AddEditComponentProps } from "../../EditAddPage";
import slugify from "slugify";
import { Collapse } from "@mui/material";

export default function EstateBox({ form, loading, props }: AddEditComponentProps) {
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
    register("title", { required: "عنوان را وارد کنید" });
    register("slug");
    register("excerpt");
    register("content");
  }, []);

  const [openContent, setOpenContent] = useState(false);

  return (
    <>
      <PanelCard title="اطلاعات ملک" loading={loading}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          <Input
            //
            control={control}
            name="title"
            label="عنوان ملک"
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
          <div className="col-span-full text-center text-white cursor-pointer font-bold rounded bg-orange-400 p-2" onClick={() => setOpenContent((o) => !o)}>
            {openContent ? "عدم نمایش توضیحات عمومی" : "نمایش توضیحات عمومی"}
            {/*  */}
          </div>
          <Collapse className="col-span-full" in={openContent} timeout="auto" unmountOnExit>
            <div className="grid grid-cols-1 gap-4">
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
              />
              <TextEditor
                //
                control={control}
                name="content"
                label="توضیحات عمومی"
                error={errors.content?.message}
                loading={isSubmitting}
              />
            </div>
          </Collapse>
        </div>
      </PanelCard>
    </>
  );
}
