import { CheckBox, Input } from "@/components/Input";
import { EstateFormData } from "@/types/formsData";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import PanelCard from "@/components/@panel/Card";
import { Select } from "@/components/Select";
import { AddEditComponentProps } from "../../EditAddPage";

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

  const calculateTotalPrice = (val: string, f: "area" | "price") => {
    const value = parseInt(val.replaceAll(",", ""));
    const area = parseInt(getValues("area")?.toString()?.replaceAll(",", "") || "0");
    const price = parseInt(getValues("price")?.toString()?.replaceAll(",", "") || "0");
    const data = parseInt((f === "area" ? price * value : value * area).toString());
    setValue("totalPrice", data || 0, { shouldValidate: true });
  };

  const calculatePrice = (val: string, f: "area" | "totalPrice") => {
    const value = parseInt(val.replaceAll(",", ""));
    const area = parseInt(getValues("area")?.toString()?.replaceAll(",", "") || "0");
    const totalPrice = parseInt(getValues("totalPrice")?.toString()?.replaceAll(",", "") || "0");
    const data = parseInt((f === "area" ? totalPrice / value : value / area).toString());
    setValue("price", data || 0, { shouldValidate: true });
  };

  const { checkingData } = props;
  if (!checkingData) return null;

  return (
    <>
      <PanelCard title="ویژگی های عمومی" loading={loading}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 ">
          <Input
            //
            control={control}
            name="code"
            label="کد"
            direction="ltr"
            error={errors.code?.message}
            loading={isSubmitting}
            noSpace
            defaultValue={checkingData?.code?.default}
            disabled={checkingData?.code?.disabled}
            containerClassName={["col-span-full", !!checkingData?.code?.hidden ? "hidden" : ""].join(" ")}
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
            filterApi={{ categories: props?.selectedCat }}
            noSpace
            defaultValue={checkingData?.type?.default}
            disabled={checkingData?.type?.disabled}
            containerClassName={!!checkingData?.type?.hidden ? "hidden" : ""}
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
            filterApi={{ categories: props?.selectedCat }}
            noSpace
            defaultValue={checkingData?.documentType?.default}
            disabled={checkingData?.documentType?.disabled}
            containerClassName={!!checkingData?.documentType?.hidden ? "hidden" : ""}
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
            onKeyUp={(e: any) => calculatePrice(e.target.value, "area")}
            defaultValue={checkingData?.area?.default}
            disabled={checkingData?.area?.disabled}
            containerClassName={!!checkingData?.area?.hidden ? "hidden" : ""}
            numericFormatProps={{
              allowNegative: false,
              allowLeadingZeros: false,
              decimalScale: 1,
            }}
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
            onKeyUp={(e: any) => calculatePrice(e.target.value, "totalPrice")}
            defaultValue={checkingData?.totalPrice?.default}
            disabled={checkingData?.totalPrice?.disabled}
            containerClassName={[!!checkingData?.totalPrice?.hidden ? "hidden" : ""].join(" ")}
            numericFormatProps={{
              allowNegative: false,
              allowLeadingZeros: false,
              decimalScale: 0,
              thousandsGroupStyle: "thousand",
              thousandSeparator: ",",
            }}
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
            defaultValue={checkingData?.price?.default}
            disabled={checkingData?.price?.disabled}
            containerClassName={["col-span-full", !!checkingData?.price?.hidden ? "hidden" : ""].join(" ")}
            numericFormatProps={{
              allowNegative: false,
              allowLeadingZeros: false,
              decimalScale: 0,
              thousandsGroupStyle: "thousand",
              thousandSeparator: ",",
            }}
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
            defaultValue={checkingData?.description?.default}
            disabled={checkingData?.description?.disabled}
            containerClassName={["col-span-full", !!checkingData?.description?.hidden ? "hidden" : ""].join(" ")}
          />
          <CheckBox //
            control={control}
            name="canBarter"
            label="قابل تهاتر"
            error={errors.canBarter?.message}
            loading={isSubmitting}
            noSpace
            defaultValue={checkingData?.canBarter?.default}
            disabled={checkingData?.canBarter?.disabled}
            containerClassName={["col-span-full", !!checkingData?.canBarter?.hidden ? "hidden" : ""].join(" ")}
          />
        </div>
      </PanelCard>
    </>
  );
}
