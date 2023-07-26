import { CheckBox, Input } from "@/components/Input";
import { EstateFormData } from "@/types/formsData";
import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import PanelCard from "@/components/@panel/Card";
import TextEditor from "@/components/Input/TextEditor";
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
    register("slug", { required: "شناسه الزامی است" });
    register("excerpt");
    register("content");
  }, []);

  const [openContent, setOpenContent] = useState(false);

  const { checkingData } = props;
  if (!checkingData) return null;

  return (
    <>
      <PanelCard title="اطلاعات ملک" loading={loading}>
        <div className="grid grid-cols-1 gap-4 ">
          <Input
            //
            control={control}
            name="title"
            label="عنوان ملک"
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
          <div className="cursor-pointer rounded bg-orange-400 p-2 text-center font-bold text-white" onClick={() => setOpenContent((o) => !o)}>
            {openContent ? "عدم نمایش توضیحات عمومی" : "نمایش توضیحات عمومی"}
            {/*  */}
          </div>
          <Collapse in={openContent} timeout="auto" unmountOnExit>
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
                defaultValue={checkingData?.excerpt?.default}
                disabled={checkingData?.excerpt?.disabled}
                containerClassName={!!checkingData?.excerpt?.hidden ? "hidden" : ""}
              />
              <TextEditor
                //
                control={control}
                name="content"
                label="توضیحات عمومی"
                error={errors.content?.message}
                loading={isSubmitting}
                //
                useMediaLibrary
                mediaUploadPath="estate"
                mediaUploaderField="image"
                //
                defaultValue={checkingData?.content?.default}
                disabled={checkingData?.content?.disabled}
                containerClassName={!!checkingData?.content?.hidden ? "hidden" : ""}
              />
            </div>
          </Collapse>
        </div>
      </PanelCard>
    </>
  );
}
