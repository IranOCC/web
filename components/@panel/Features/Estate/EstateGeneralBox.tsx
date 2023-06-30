import { CheckBox, Input } from "@/components/Input";
import { EstateFormData } from "@/types/formsData";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import PanelCard from "@/components/@panel/Card";
import { Select } from "@/components/Select";
import { AddEditComponentProps } from "../../EditAddPage";
// import { NumericFormat } from "react-number-format";

export default function EstateGeneralBox({ form, loading, props }: AddEditComponentProps) {
  const {
    register,
    unregister,
    resetField,
    setValue,
    setError,
    control,
    getValues,
    handleSubmit,
    reset,
    formState: { errors, isLoading, isSubmitting, isValidating, isSubmitted, isSubmitSuccessful },
  } = form as UseFormReturn<EstateFormData>;

  useEffect(() => {
    register("code");
    register("category", { required: "دسته را مشخص کنید" });
    register("type", { required: "نوع را مشخص کنید" });
    register("documentType", { required: "نوع سند را مشخص کنید" });
    register("area", { required: "متراژ کل را مشخص کنید" });
    register("price", { required: "قیمت هر متر را مشخص کنید" });
    register("totalPrice", { required: "قیمت کل را مشخص کنید" });
    register("description");
    register("canBarter");
  }, []);

  const calculateTotalPrice = (val: number, f: "area" | "price") => {
    const m = (f === "area" ? val * getValues("price") : val * getValues("area")).toString();
    setValue("totalPrice", parseInt(m) || 0, { shouldValidate: true });
  };

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
            apiPath="/tools/estate/category/autoComplete"
            noSpace
            containerClassName="col-span-full"
          />
          <Select
            //
            control={control}
            name="type"
            error={errors.type?.message}
            loading={isSubmitting}
            label="نوع"
            placeholder="انتخاب کنید"
            apiPath="/tools/estate/type/autoComplete"
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
            apiPath="/tools/estate/documentType/autoComplete"
            filterApi={{ cat: props?.selectedCat }}
            noSpace
          />
          {/* <NumericFormat /> */}
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
            onKeyUp={(e: any) => calculateTotalPrice(e.target.value, "area")}
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
            onKeyUp={(e: any) => calculateTotalPrice(e.target.value, "price")}
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
            containerClassName="col-span-full"
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
