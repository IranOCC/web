import { CheckBox, Input } from "@/components/Input";
import { EstateFormData } from "@/types/formsData";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import PanelCard from "@/components/@panel/Card";
import { Select } from "@/components/Select";
import LogoUploader from "@/components/Uploader/LogoUploader";
import TextEditor from "@/components/Input/TextEditor";
import { AddEditComponentProps } from "../../EditAddPage";

export default function EstateFeaturesBox({ form, loading, props }: AddEditComponentProps) {
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
      <PanelCard title="ویژگی های اختصاصی" loading={loading}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
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
            apiPath="/estate/feature/assignList"
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
        </div>
      </PanelCard>
    </>
  );
}
