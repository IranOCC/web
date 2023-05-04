import { Button } from "@/components/Button";
import { CheckBox, Input } from "@/components/Input";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { toast } from "@/lib/toast";
import { OfficeAddMemberFormData, OfficeFormData } from "@/types/formsData";
import { useEffect } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import PanelCard from "@/components/@panel/Card";
import { useRouter } from "next/navigation";
import { Select } from "@/components/Select";
import Uploader from "@/components/Uploader";
import LogoUploader from "@/components/Uploader/LogoUploader";
// import Uploader from "@/components/Uploader";

export default function OfficeMembersBox() {
  const form = useForm<OfficeAddMemberFormData>();
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
    register("users", { required: "اعضا را وارد کنید" });
  }, []);

  return (
    <>
      <PanelCard title="اعضا">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          <Select
            //
            control={control}
            name="management"
            error={errors.users?.message}
            loading={isSubmitting}
            placeholder="انتخاب کنید"
            apiPath="/user/assignList"
            searchable
            noSpace
            multiple
            // tagsMode
            containerClassName="col-span-full"
          />
        </div>
      </PanelCard>
    </>
  );
}
