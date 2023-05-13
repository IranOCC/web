import { CheckBox, Input } from "@/components/Input";
import { EstateFormData } from "@/types/formsData";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import PanelCard from "@/components/@panel/Card";
import { Select } from "@/components/Select";
import LogoUploader from "@/components/Uploader/LogoUploader";
import TextEditor from "@/components/Input/TextEditor";
import { AddEditComponentProps } from "../../EditAddPage";

export default function EstateGeneralBox({ form, loading, props }: AddEditComponentProps) {
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
    register("code");
    register("constructionYear");
    register("documentType");
    register("area");
    register("price");
    register("totalPrice");
    register("description");
    register("canBarter");
  }, []);

  return (
    <>
      <PanelCard title="ویژگی های عمومی" loading={loading}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          <Input
            //
            control={control}
            name="code"
            label="کد ملک"
            direction="ltr"
            error={errors.code?.message}
            loading={isSubmitting}
            noSpace
          />
          <Input
            //
            control={control}
            name="constructionYear"
            label="سال ساخت"
            type="number"
            direction="ltr"
            error={errors.constructionYear?.message}
            loading={isSubmitting}
            noSpace
          />
          <Select
            //
            control={control}
            name="documentType"
            label="نوع سند"
            error={errors.documentType?.message}
            loading={isSubmitting}
            placeholder="انتخاب کنید"
            apiPath="/estate/document/assignList"
            filterApi={{ cat: props?.selectedCat }}
            noSpace
          />

          <Input
            //
            control={control}
            name="area"
            label="متراژ کل"
            type="number"
            direction="ltr"
            error={errors.area?.message}
            loading={isSubmitting}
            noSpace
          />
          <Input
            //
            control={control}
            name="price"
            label="قیمت هر متر (تومان)"
            direction="ltr"
            error={errors.price?.message}
            loading={isSubmitting}
            noSpace
          />
          <Input
            //
            control={control}
            name="totalPrice"
            label="قیمت کل (تومان)"
            direction="ltr"
            error={errors.totalPrice?.message}
            loading={isSubmitting}
            noSpace
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
            containerClassName="col-span-full"
          />
          <CheckBox //
            control={control}
            name="canBarter"
            label="قابل تهاتر"
            error={errors.canBarter?.message}
            loading={isSubmitting}
            noSpace
            containerClassName="col-span-full"
          />
        </div>
      </PanelCard>
    </>
  );
}
