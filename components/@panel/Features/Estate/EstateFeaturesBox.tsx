import { CheckBox, Input } from "@/components/Input";
import { EstateFormData } from "@/types/formsData";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import PanelCard from "@/components/@panel/Card";
import { Select } from "@/components/Select";
import LogoUploader from "@/components/Uploader/LogoUploader";
import TextEditor from "@/components/Input/TextEditor";

export default function EstateFeaturesBox({ form, loading }: { form: any; loading?: boolean }) {
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
      <PanelCard title="ویژگی های اختصاصی" loading={loading}>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 ">
          <Input
            //
            control={control}
            name="roomsCount"
            label="تعداد اتاق"
            type="number"
            error={errors.roomsCount?.message}
            loading={isSubmitting}
            noSpace
            containerClassName="col-span-3"
          />
          <Input
            //
            control={control}
            name="mastersCount"
            label="تعداد مستر"
            type="number"
            error={errors.mastersCount?.message}
            loading={isSubmitting}
            noSpace
            containerClassName="col-span-3"
          />
          <Input
            //
            control={control}
            name="area"
            label="تعداد طبقات"
            type="number"
            error={errors.floorsCount?.message}
            loading={isSubmitting}
            noSpace
            containerClassName="col-span-3"
          />
          <Input
            //
            control={control}
            name="area"
            label="تعداد واحدها"
            type="number"
            error={errors.unitsCount?.message}
            loading={isSubmitting}
            noSpace
            containerClassName="col-span-3"
          />
          <Input
            //
            control={control}
            name="buildingArea"
            label="متراژ بنا"
            type="number"
            error={errors.buildingArea?.message}
            loading={isSubmitting}
            noSpace
            containerClassName="col-span-3"
          />
          <Input
            //
            control={control}
            name="floor"
            label="طبقه مورد نظر"
            type="number"
            error={errors.floor?.message}
            loading={isSubmitting}
            noSpace
            containerClassName="col-span-3"
          />
          <Input
            //
            control={control}
            name="features"
            label="ویژگی ها"
            error={errors.features?.message}
            loading={isSubmitting}
            tagsMode
            noSpace
            multiline
            lines={4}
            containerClassName="col-span-full"
          />
          <CheckBox //
            control={control}
            name="withOldBuilding"
            label="دارای ساختمان قدیمی"
            error={errors.withOldBuilding?.message}
            loading={isSubmitting}
            noSpace
            containerClassName="col-span-3"
          />
        </div>
      </PanelCard>
    </>
  );
}
