import { CheckBox, Input } from "@/components/Input";
import { EstateFormData } from "@/types/formsData";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import PanelCard from "@/components/@panel/Card";
import { AddEditComponentProps } from "../../EditAddPage";
import MediaHandler from "@/components/Uploader/MediaHandler";

export default function EstateMediaBox({ form, loading }: AddEditComponentProps) {
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

  useEffect(() => {}, []);

  return (
    <>
      <PanelCard title="رسانه" loading={loading}>
        <div className="grid grid-cols-1 gap-4 ">
          {/*  */}
          <MediaHandler
            //
            name="gallery"
            control={control}
            uploadPath="estate"
            noSpace
            fromLibrary
          />
          {/*  */}
        </div>
      </PanelCard>
    </>
  );
}
