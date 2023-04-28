import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { toast } from "@/lib/toast";
import { SendSmsBoxFormData, UserFormData, UserPhoneFormData } from "@/types/formsData";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import PanelCard from "@/components/@panel/Card";
import { useRouter } from "next/navigation";
import { Select } from "@/components/Select";

export default function UserInfoBox({ form, onSubmit }: any) {
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
    register("firstName", { required: "نام را وارد کنید" });
    register("lastName", { required: "نام خانوادگی را وارد کنید" });
    register("status", { required: "وضعیت را وارد کنید" });
    register("roles", { required: "نقش ها را وارد کنید" });
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
              name="firstName"
              label="نام"
              error={errors.firstName?.message}
              loading={isSubmitting}
              noSpace
            />
            <Input
              //
              control={control}
              name="lastName"
              label="نام خانوادگی"
              error={errors.lastName?.message}
              loading={isSubmitting}
              noSpace
              
            />

            <Select
              //
              control={control}
              name="status"
              label="وضعیت"
              error={errors.status?.message}
              loading={isSubmitting}
              noSpace
              items={[]}
            />
            <Select
              //
              control={control}
              name="roles"
              label="نقش ها"
              error={errors.roles?.message}
              loading={isSubmitting}
              noSpace
              items={[]}
            />
          </div>
        </PanelCard>
      </form>
    </>
  );
}
