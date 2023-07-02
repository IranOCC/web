import { CheckBox, Input } from "@/components/Input";
import { EstateFormData } from "@/types/formsData";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import PanelCard from "@/components/@panel/Card";
import { Select } from "@/components/Select";
import { AddEditComponentProps } from "../../EditAddPage";
import useAxiosAuth from "@/hooks/useAxiosAuth";

export default function EstateFeaturesBox(_props: AddEditComponentProps) {
  const { form, loading, props } = _props;

  let ComponentBox: ({ form, loading, props }: AddEditComponentProps) => JSX.Element = () => <>{null}</>;

  // const api = useAxiosAuth();
  // const getCategory = async () => {
  //   setDataLoading(true);
  //   try {
  //     const response = await api.get(`/admin/${endpoint}/` + (SECTION || ID));
  //     const data = response.data as F;
  //     setInitialData(data);
  //     setDataLoading(false);
  //   } catch (error) {
  //     router.replace(`/admin/${endpoint}`);
  //   }
  // };

  ComponentBox = EstateFeaturesVillaBox;

  return (
    <>
      <PanelCard title="ویژگی های اختصاصی" loading={loading}>
        {JSON.stringify(props)}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
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
    register("roomsCount");
    register("mastersCount");
    register("features");
  }, []);

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
        containerClassName="col-span-full"
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
        containerClassName="col-span-full"
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
        filterApi={{ cat: props?.selectedCat }}
        multiple
        showTitle
        tagsMode
        multiline
        lines={4}
        noSpace
        containerClassName="col-span-full"
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
    register("constructionYear");
    register("roomsCount");
    register("mastersCount");
    register("floorsCount");
    register("unitsCount");
    register("buildingArea");
    register("floor");
    register("features");
    register("withOldBuilding");
  }, []);

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
        containerClassName="col-span-full"
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
        filterApi={{ cat: props?.selectedCat }}
        multiple
        showTitle
        tagsMode
        multiline
        lines={4}
        noSpace
        containerClassName="col-span-full"
      />
      <CheckBox //
        control={control}
        name="withOldBuilding"
        label="دارای ساختمان قدیمی"
        error={errors.withOldBuilding?.message}
        loading={isSubmitting}
        noSpace
        containerClassName="col-span-full"
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
    register("constructionYear");
    register("roomsCount");
    register("mastersCount");
    register("floorsCount");
    register("unitsCount");
    register("buildingArea");
    register("floor");
    register("features");
    register("withOldBuilding");
  }, []);

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
        containerClassName="col-span-full"
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
        filterApi={{ cat: props?.selectedCat }}
        multiple
        showTitle
        tagsMode
        multiline
        lines={4}
        noSpace
        containerClassName="col-span-full"
      />
      <CheckBox //
        control={control}
        name="withOldBuilding"
        label="دارای ساختمان قدیمی"
        error={errors.withOldBuilding?.message}
        loading={isSubmitting}
        noSpace
        containerClassName="col-span-full"
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
    register("constructionYear");
    register("roomsCount");
    register("mastersCount");
    register("floorsCount");
    register("unitsCount");
    register("buildingArea");
    register("floor");
    register("features");
    register("withOldBuilding");
  }, []);

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
        containerClassName="col-span-full"
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
        filterApi={{ cat: props?.selectedCat }}
        multiple
        showTitle
        tagsMode
        multiline
        lines={4}
        noSpace
        containerClassName="col-span-full"
      />
      <CheckBox //
        control={control}
        name="withOldBuilding"
        label="دارای ساختمان قدیمی"
        error={errors.withOldBuilding?.message}
        loading={isSubmitting}
        noSpace
        containerClassName="col-span-full"
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
    register("constructionYear");
    register("roomsCount");
    register("mastersCount");
    register("floorsCount");
    register("unitsCount");
    register("buildingArea");
    register("floor");
    register("features");
    register("withOldBuilding");
  }, []);

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
        containerClassName="col-span-full"
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
        filterApi={{ cat: props?.selectedCat }}
        multiple
        showTitle
        tagsMode
        multiline
        lines={4}
        noSpace
        containerClassName="col-span-full"
      />
      <CheckBox //
        control={control}
        name="withOldBuilding"
        label="دارای ساختمان قدیمی"
        error={errors.withOldBuilding?.message}
        loading={isSubmitting}
        noSpace
        containerClassName="col-span-full"
      />
    </>
  );
};
