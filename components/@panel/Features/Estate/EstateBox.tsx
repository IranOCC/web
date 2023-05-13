import { CheckBox, Input } from "@/components/Input";
import { EstateFormData } from "@/types/formsData";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import PanelCard from "@/components/@panel/Card";
import { Select } from "@/components/Select";
import LogoUploader from "@/components/Uploader/LogoUploader";
import TextEditor from "@/components/Input/TextEditor";
import { AddEditComponentProps } from "../../EditAddPage";

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
    register("excerpt");
    register("content");
  }, []);

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
            containerClassName="col-span-full"
            noSpace
          />
          <TextEditor
            //
            control={control}
            name="content"
            label="توضیحات عمومی"
            error={errors.content?.message}
            loading={isSubmitting}
            containerClassName="col-span-full"
          />
        </div>
      </PanelCard>
    </>
  );
}
