import { CheckBox, Input } from "@/components/Input";
import { EstateFormData } from "@/types/formsData";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import PanelCard from "@/components/@panel/Card";
import { Select } from "@/components/Select";
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
    register("category", { required: "دسته را مشخص کنید" });
    register("type");
    register("code");
    register("documentType", { required: "نوع سند را مشخص کنید" });
    register("area", { required: "متراژ کل را مشخص کنید" });
    register("price", { required: "قیمت هر متر را مشخص کنید" });
    register("totalPrice", { required: "قیمت کل را مشخص کنید" });
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
            label="کد"
            direction="ltr"
            error={errors.code?.message}
            loading={isSubmitting}
            noSpace
            containerClassName="col-span-full"
          />
          <Select
            //
            control={control}
            name="category"
            error={errors.category?.message}
            loading={isSubmitting}
            label="دسته"
            disabled
            placeholder="انتخاب کنید"
            apiPath="/estate/category/assignList"
            noSpace
          />
          <Select
            //
            control={control}
            name="type"
            error={errors.type?.message}
            loading={isSubmitting}
            label="نوع"
            placeholder="انتخاب کنید"
            apiPath="/estate/type/assignList"
            filterApi={{ cat: props?.selectedCat }}
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
