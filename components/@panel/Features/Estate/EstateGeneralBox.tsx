import { CheckBox, Input } from "@/components/Input";
import { EstateFormData } from "@/types/formsData";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import PanelCard from "@/components/@panel/Card";
import { Select } from "@/components/Select";
import LogoUploader from "@/components/Uploader/LogoUploader";
import TextEditor from "@/components/Input/TextEditor";

export default function EstateGeneralBox({ form, loading }: { form: any; loading?: boolean }) {
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
    register("title", { required: "عنوان را وارد کنید", minLength: { value: 5, message: "حداقل 5 کاراکتر باید باشد" } });
    register("excerpt");
    register("content", { required: "توضیحات الزامی است" });
  }, []);

  return (
    <>
      <PanelCard title="ویژگی های عمومی" loading={loading}>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 ">
          <Input
            //
            control={control}
            name="area"
            label="کد ملک"
            error={errors.area?.message}
            loading={isSubmitting}
            noSpace
            containerClassName="col-span-3"
          />
          <Input
            //
            control={control}
            name="constructionYear"
            label="سال ساخت"
            type="number"
            error={errors.constructionYear?.message}
            loading={isSubmitting}
            noSpace
            containerClassName="col-span-3"
          />
          <Select
            //
            control={control}
            name="documentType"
            label="نوع سند"
            error={errors.documentType?.message}
            loading={isSubmitting}
            placeholder="انتخاب کنید"
            apiPath="/estate/documentType"
            searchable
            noSpace
            containerClassName="col-span-3"
          />

          <Input
            //
            control={control}
            name="area"
            label="متراژ کل"
            type="number"
            error={errors.area?.message}
            loading={isSubmitting}
            noSpace
            containerClassName="col-span-3"
          />
          <Input
            //
            control={control}
            name="area"
            label="قیمت هر متر (تومان)"
            error={errors.area?.message}
            loading={isSubmitting}
            noSpace
            containerClassName="col-span-3"
          />
          <Input
            //
            control={control}
            name="area"
            label="قیمت کل (تومان)"
            error={errors.area?.message}
            loading={isSubmitting}
            noSpace
            containerClassName="col-span-3"
          />
          <Input
            //
            control={control}
            name="description"
            label="توضیحات اضافی"
            error={errors.description?.message}
            loading={isSubmitting}
            noSpace
            multiline
            lines={4}
            containerClassName="col-span-6"
          />
          <CheckBox //
            control={control}
            name="canBarter"
            label="قابل تهاتر"
            error={errors.canBarter?.message}
            loading={isSubmitting}
            noSpace
            containerClassName="col-span-3"
          />
        </div>
      </PanelCard>
    </>
  );
}
