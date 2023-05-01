import { Button } from "@/components/Button";
import { CheckBox, Input } from "@/components/Input";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { toast } from "@/lib/toast";
import { OfficeFormData } from "@/types/formsData";
import { useEffect } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import PanelCard from "@/components/@panel/Card";
import { useRouter } from "next/navigation";
import { Select } from "@/components/Select";
import Uploader from "@/components/Uploader";
import LogoUploader from "@/components/Uploader/LogoUploader";
// import Uploader from "@/components/Uploader";

export default function OfficeMembersBox({ form }: any) {
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
  } = form as UseFormReturn<OfficeFormData>;

  useEffect(() => {
    register("name", { required: "نام را وارد کنید" });
    register("description", {
      minLength: {
        value: 10,
        message: "حداقل ده کاراکتر نیاز است",
      },
    });
    register("management", { required: "مدیریت را مشخص کنید" });
    register("logo");

    register("verified");
    register("active");
  }, []);

  return (
    <>
      <PanelCard title="اطلاعات شعبه">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          <LogoUploader
            //
            control={control}
            name="logo"
            uploadPath="offices"
            label="آپلود لوگو"
            error={errors.logo?.message}
            loading={isSubmitting}
            containerClassName="col-span-full"
            noSpace
          />
          <Input
            //
            control={control}
            name="name"
            label="نام"
            error={errors.name?.message}
            loading={isSubmitting}
            noSpace
          />
          <Select
            //
            control={control}
            name="management"
            label="مدیریت"
            error={errors.management?.message}
            loading={isSubmitting}
            placeholder="انتخاب کنید"
            apiPath="/user/assignList"
            searchable
            noSpace
          />
          <Input
            //
            control={control}
            name="description"
            label="توضیحات"
            error={errors.description?.message}
            loading={isSubmitting}
            noSpace
            multiline
            containerClassName="col-span-full"
          />

          <CheckBox //
            control={control}
            name="verified"
            label="احراز شده"
            error={errors.verified?.message}
            loading={isSubmitting}
            noSpace
          />

          <CheckBox //
            control={control}
            name="active"
            label="فعال"
            error={errors.active?.message}
            loading={isSubmitting}
            noSpace
          />
        </div>
      </PanelCard>
    </>
  );
}
