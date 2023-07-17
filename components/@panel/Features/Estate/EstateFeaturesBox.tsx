import { CheckBox, Input } from "@/components/@panel/Input";
import { EstateFormData } from "@/types/formsData";
import { ReactElement, useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import PanelCard from "@/components/@panel/Card";
import { Select } from "@/components/@panel/Select";
import { AddEditComponentProps } from "../../EditAddPage";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { EstateCategory } from "@/types/interfaces";

export default function EstateFeaturesBox(_props: AddEditComponentProps) {
  const { form, loading, props } = _props;

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

  const [_loading, _setLoading] = useState(true);
  const [category, setCategory] = useState<EstateCategory | null>(null);

  let ComponentBox: any = () => <>{null}</>;

  const api = useAxiosAuth();
  const getCategory = async () => {
    if (!props.selectedCat) return;
    _setLoading(true);
    try {
      const response = await api.get(`/admin/estate/category/${props.selectedCat}`);
      const data = response.data as EstateCategory;
      setCategory(data);
      _setLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    getCategory();
  }, [props?.selectedCat]);

  switch (category?.slug) {
    case "villa":
      ComponentBox = EstateFeaturesVillaBox;
      break;
    case "apartment":
      ComponentBox = EstateFeaturesApartmentBox;
      break;
    case "commercial":
      ComponentBox = EstateFeaturesCommercialBox;
      break;
    case "hectare":
      ComponentBox = EstateFeaturesHectareBox;
      break;
    case "land":
      ComponentBox = EstateFeaturesLandBox;
      break;
  }

  const { checkingData } = props;
  if (!checkingData) return null;

  return (
    <>
      <PanelCard title="ویژگی های اختصاصی" loading={loading || _loading || !category}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 ">
          <Select
            //
            control={control}
            name="category"
            error={errors.category?.message}
            loading={isSubmitting}
            label="دسته"
            placeholder="انتخاب کنید"
            apiPath="/tools/estate/category/autoComplete"
            noSpace
            onChange={(v) => props.setSelectedCat(v)}
            defaultValue={checkingData?.category?.default}
            disabled={checkingData?.category?.disabled}
            containerClassName={["col-span-full", !!checkingData?.category?.hidden ? "hidden" : ""].join(" ")}
          />
          <ComponentBox {..._props} />
        </div>
      </PanelCard>
    </>
  );
}

// ====
// ====
// ====

export const EstateFeaturesVillaBox = ({ form, loading, props }: AddEditComponentProps) => {
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
    register("constructionYear", { required: "سال ساخت الزامی است" });
    register("buildingArea", { required: "متراژ بنا الزامی است" });
    register("roomsCount", { required: "تعداد اتاق الزامی است" });
    register("mastersCount", { required: "تعداد مستر الزامی است" });
    register("features");
  }, []);

  const { checkingData } = props;
  if (!checkingData) return null;

  return (
    <>
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
        defaultValue={checkingData?.constructionYear?.default}
        disabled={checkingData?.constructionYear?.disabled}
        containerClassName={["col-span-full", !!checkingData?.constructionYear?.hidden ? "hidden" : ""].join(" ")}
        numericFormatProps={{
          allowNegative: false,
          allowLeadingZeros: false,
          decimalScale: 0,
        }}
      />

      <Input
        //
        control={control}
        name="buildingArea"
        label="متراژ بنا"
        type="number"
        direction="ltr"
        error={errors.buildingArea?.message}
        loading={isSubmitting}
        noSpace
        defaultValue={checkingData?.buildingArea?.default}
        disabled={checkingData?.buildingArea?.disabled}
        containerClassName={["col-span-full", !!checkingData?.buildingArea?.hidden ? "hidden" : ""].join(" ")}
        numericFormatProps={{
          allowNegative: false,
          allowLeadingZeros: false,
          decimalScale: 1,
        }}
      />

      <Input
        //
        control={control}
        name="roomsCount"
        label="تعداد اتاق"
        type="number"
        direction="ltr"
        error={errors.roomsCount?.message}
        loading={isSubmitting}
        noSpace
        defaultValue={checkingData?.roomsCount?.default}
        disabled={checkingData?.roomsCount?.disabled}
        containerClassName={!!checkingData?.roomsCount?.hidden ? "hidden" : ""}
        numericFormatProps={{
          allowNegative: false,
          allowLeadingZeros: false,
          decimalScale: 0,
        }}
      />
      <Input
        //
        control={control}
        name="mastersCount"
        label="تعداد مستر"
        type="number"
        direction="ltr"
        error={errors.mastersCount?.message}
        loading={isSubmitting}
        noSpace
        defaultValue={checkingData?.mastersCount?.default}
        disabled={checkingData?.mastersCount?.disabled}
        containerClassName={!!checkingData?.mastersCount?.hidden ? "hidden" : ""}
        numericFormatProps={{
          allowNegative: false,
          allowLeadingZeros: false,
          decimalScale: 0,
        }}
      />

      <Select
        //
        control={control}
        name="features"
        label="ویژگی ها"
        error={errors.features?.message}
        loading={isSubmitting}
        placeholder="انتخاب کنید"
        apiPath="/tools/estate/feature/autoComplete"
        filterApi={{ categories: props?.selectedCat }}
        multiple
        showTitle
        tagsMode
        multiline
        lines={4}
        noSpace
        defaultValue={checkingData?.features?.default}
        disabled={checkingData?.features?.disabled}
        containerClassName={["col-span-full", !!checkingData?.features?.hidden ? "hidden" : ""].join(" ")}
      />
    </>
  );
};

export const EstateFeaturesApartmentBox = ({ form, loading, props }: AddEditComponentProps) => {
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
    register("roomsCount", { required: "تعداد اتاق را وارد کنید" });
    register("mastersCount", { required: "تعداد مستر را وارد کنید" });
    register("floorsCount", { required: "تعداد طبقات را وارد کنید" });
    register("unitsCount", { required: "تعداد واحدها را وارد کنید" });
    register("floor", { required: "طبقه را وارد کنید" });
    register("features");
  }, []);

  const { checkingData } = props;
  if (!checkingData) return null;

  return (
    <>
      <Input
        //
        control={control}
        name="roomsCount"
        label="تعداد خواب"
        type="number"
        direction="ltr"
        error={errors.roomsCount?.message}
        loading={isSubmitting}
        noSpace
        defaultValue={checkingData?.roomsCount?.default}
        disabled={checkingData?.roomsCount?.disabled}
        containerClassName={!!checkingData?.roomsCount?.hidden ? "hidden" : ""}
        numericFormatProps={{
          allowNegative: false,
          allowLeadingZeros: false,
          decimalScale: 0,
        }}
      />
      <Input
        //
        control={control}
        name="mastersCount"
        label="تعداد مستر"
        type="number"
        direction="ltr"
        error={errors.mastersCount?.message}
        loading={isSubmitting}
        noSpace
        defaultValue={checkingData?.mastersCount?.default}
        disabled={checkingData?.mastersCount?.disabled}
        containerClassName={!!checkingData?.mastersCount?.hidden ? "hidden" : ""}
        numericFormatProps={{
          allowNegative: false,
          allowLeadingZeros: false,
          decimalScale: 0,
        }}
      />
      <Input
        //
        control={control}
        name="floorsCount"
        label="تعداد طبقات"
        type="number"
        direction="ltr"
        error={errors.floorsCount?.message}
        loading={isSubmitting}
        noSpace
        defaultValue={checkingData?.floorsCount?.default}
        disabled={checkingData?.floorsCount?.disabled}
        containerClassName={!!checkingData?.floorsCount?.hidden ? "hidden" : ""}
        numericFormatProps={{
          allowNegative: false,
          allowLeadingZeros: false,
          decimalScale: 0,
        }}
      />
      <Input
        //
        control={control}
        name="unitsCount"
        label="تعداد واحدها"
        type="number"
        direction="ltr"
        error={errors.unitsCount?.message}
        loading={isSubmitting}
        noSpace
        defaultValue={checkingData?.unitsCount?.default}
        disabled={checkingData?.unitsCount?.disabled}
        containerClassName={!!checkingData?.unitsCount?.hidden ? "hidden" : ""}
        numericFormatProps={{
          allowNegative: false,
          allowLeadingZeros: false,
          decimalScale: 0,
        }}
      />
      <Input
        //
        control={control}
        name="floor"
        label="طبقه مورد نظر"
        type="number"
        direction="ltr"
        error={errors.floor?.message}
        loading={isSubmitting}
        noSpace
        defaultValue={checkingData?.floor?.default}
        disabled={checkingData?.floor?.disabled}
        containerClassName={["col-span-full", !!checkingData?.floor?.hidden ? "hidden" : ""].join(" ")}
        numericFormatProps={{
          allowNegative: false,
          allowLeadingZeros: false,
          decimalScale: 0,
        }}
      />
      <Select
        //
        control={control}
        name="features"
        label="ویژگی ها"
        error={errors.features?.message}
        loading={isSubmitting}
        placeholder="انتخاب کنید"
        apiPath="/tools/estate/feature/autoComplete"
        filterApi={{ categories: props?.selectedCat }}
        multiple
        showTitle
        tagsMode
        multiline
        lines={4}
        noSpace
        defaultValue={checkingData?.features?.default}
        disabled={checkingData?.features?.disabled}
        containerClassName={["col-span-full", !!checkingData?.features?.hidden ? "hidden" : ""].join(" ")}
      />
    </>
  );
};

export const EstateFeaturesCommercialBox = ({ form, loading, props }: AddEditComponentProps) => {
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
    register("buildingArea", { required: "متراژ را وارد کنید" });
    register("floor", { required: "طبقه ملک را وارد کنید" });
  }, []);

  const { checkingData } = props;
  if (!checkingData) return null;

  return (
    <>
      <Input
        //
        control={control}
        name="buildingArea"
        label="متراژ بر تجاری"
        type="number"
        direction="ltr"
        error={errors.buildingArea?.message}
        loading={isSubmitting}
        noSpace
        defaultValue={checkingData?.buildingArea?.default}
        disabled={checkingData?.buildingArea?.disabled}
        containerClassName={["col-span-full", !!checkingData?.buildingArea?.hidden ? "hidden" : ""].join(" ")}
        numericFormatProps={{
          allowNegative: false,
          allowLeadingZeros: false,
          decimalScale: 1,
        }}
      />
      <Input
        //
        control={control}
        name="floor"
        label="طبقه ملک"
        type="number"
        direction="ltr"
        error={errors.floor?.message}
        loading={isSubmitting}
        noSpace
        defaultValue={checkingData?.floor?.default}
        disabled={checkingData?.floor?.disabled}
        containerClassName={["col-span-full", !!checkingData?.floor?.hidden ? "hidden" : ""].join(" ")}
      />
    </>
  );
};

export const EstateFeaturesLandBox = ({ form, loading, props }: AddEditComponentProps) => {
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
    register("features", { required: "نوع بافت الزامی است" });
    register("withOldBuilding");
  }, []);

  const { checkingData } = props;
  if (!checkingData) return null;

  return (
    <>
      <Select
        //
        control={control}
        name="features"
        label="نوع بافت"
        error={errors.features?.message}
        loading={isSubmitting}
        placeholder="انتخاب کنید"
        apiPath="/tools/estate/feature/autoComplete"
        filterApi={{ categories: props?.selectedCat }}
        showTitle
        noSpace
        defaultValue={checkingData?.features?.default}
        disabled={checkingData?.features?.disabled}
        containerClassName={["col-span-full", !!checkingData?.features?.hidden ? "hidden" : ""].join(" ")}
      />
      <CheckBox //
        control={control}
        name="withOldBuilding"
        label="دارای ساختمان قدیمی"
        error={errors.withOldBuilding?.message}
        loading={isSubmitting}
        noSpace
        defaultValue={checkingData?.withOldBuilding?.default}
        disabled={checkingData?.withOldBuilding?.disabled}
        containerClassName={["col-span-full", !!checkingData?.withOldBuilding?.hidden ? "hidden" : ""].join(" ")}
      />
    </>
  );
};

export const EstateFeaturesHectareBox = ({ form, loading, props }: AddEditComponentProps) => {
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
    register("features", { required: "نوع بافت الزامی است" });
    register("withOldBuilding");
  }, []);

  const { checkingData } = props;
  if (!checkingData) return null;

  return (
    <>
      <Select
        //
        control={control}
        name="features"
        label="نوع بافت"
        error={errors.features?.message}
        loading={isSubmitting}
        placeholder="انتخاب کنید"
        apiPath="/tools/estate/feature/autoComplete"
        filterApi={{ categories: props?.selectedCat }}
        showTitle
        noSpace
        defaultValue={checkingData?.features?.default}
        disabled={checkingData?.features?.disabled}
        containerClassName={["col-span-full", !!checkingData?.features?.hidden ? "hidden" : ""].join(" ")}
      />
      <CheckBox //
        control={control}
        name="withOldBuilding"
        label="دارای ساختمان قدیمی"
        error={errors.withOldBuilding?.message}
        loading={isSubmitting}
        noSpace
        defaultValue={checkingData?.withOldBuilding?.default}
        disabled={checkingData?.withOldBuilding?.disabled}
        containerClassName={["col-span-full", !!checkingData?.withOldBuilding?.hidden ? "hidden" : ""].join(" ")}
      />
    </>
  );
};
