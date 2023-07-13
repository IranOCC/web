import { BlogPostFormData } from "@/types/formsData";
import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import PanelCard from "@/components/@panel/Card";
import { Select } from "@/components/Select";
import { AddEditComponentProps } from "../../EditAddPage";

export default function BlogPostRegistrantBox({ form, loading, props }: AddEditComponentProps) {
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
  } = form as UseFormReturn<BlogPostFormData>;

  useEffect(() => {
    register("office", { required: "آفیس را مشخص کنید" });
    register("createdBy", { required: "نویسنده را مشخص کنید" });
    register("confirmedBy");
  }, []);

  const [selectedOffice, setSelectedOffice] = useState(null);

  const { checkingData } = props;
  if (!checkingData) return null;

  return (
    <>
      <PanelCard title="جزییات پست" loading={loading}>
        <div className="grid grid-cols-1 gap-4 ">
          <Select
            //
            control={control}
            name="office"
            error={errors.office?.message}
            loading={isSubmitting}
            label="شعبه"
            placeholder="انتخاب کنید"
            apiPath="/tools/office/autoComplete"
            searchable
            noSpace
            defaultValue={checkingData?.office?.default}
            disabled={checkingData?.office?.disabled}
            containerClassName={!!checkingData?.office?.hidden ? "hidden" : ""}
            onChange={(v) => setSelectedOffice(v)}
          />
          {!!selectedOffice && (
            <>
              <Select
                //
                control={control}
                name="createdBy"
                error={errors.createdBy?.message}
                loading={isSubmitting}
                label="نویسنده"
                placeholder="انتخاب کنید"
                apiPath={`/tools/office/${selectedOffice}/member/autoComplete`}
                searchable
                noSpace
                defaultValue={checkingData?.createdBy?.default}
                disabled={checkingData?.createdBy?.disabled}
                containerClassName={!!checkingData?.createdBy?.hidden ? "hidden" : ""}
              />
              <Select
                //
                control={control}
                name="confirmedBy"
                error={errors.confirmedBy?.message}
                loading={isSubmitting}
                label="تایید کننده"
                placeholder="انتخاب کنید"
                apiPath={`/tools/office/${selectedOffice}/member/autoComplete`}
                searchable
                noSpace
                defaultValue={checkingData?.confirmedBy?.default}
                disabled={checkingData?.confirmedBy?.disabled}
                containerClassName={!!checkingData?.confirmedBy?.hidden ? "hidden" : ""}
              />
            </>
          )}
        </div>
      </PanelCard>
    </>
  );
}
