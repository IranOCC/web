import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { toast } from "@/lib/toast";
import { OfficeFormData, SendSmsBoxFormData, UserFormData, UserPhoneFormData } from "@/types/formsData";
import { useEffect } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import PanelCard from "@/components/@panel/Card";
import { useRouter } from "next/navigation";
import { Select } from "@/components/Select";

export default function OfficeBox({ form, onSubmit }: { form: UseFormReturn<OfficeFormData, any>; onSubmit: any }) {
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
  } = form;

  useEffect(() => {
    register("name", { required: "نام را وارد کنید" });
    register("description", {
      minLength: {
        value: 10,
        message: "حداقل ده کاراکتر نیاز است",
      },
    });
    register("management", { required: "مدیریت را مشخص کنید" });
    register("logo", {});
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <PanelCard title="اطلاعات کاربر">
          <button type="submit" className="hidden" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
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
            />

            <Select
              //
              control={control}
              name="logo"
              label="لوگو"
              error={errors.logo?.message}
              loading={isSubmitting}
              noSpace
            />
          </div>
        </PanelCard>
      </form>
    </>
  );
}
