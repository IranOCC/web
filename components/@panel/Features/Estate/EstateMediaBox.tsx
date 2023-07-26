import { CheckBox, Input } from "@/components/Input";
import { EstateFormData } from "@/types/formsData";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import PanelCard from "@/components/@panel/Card";
import { AddEditComponentProps } from "../../EditAddPage";
import MediaHandler from "@/components/Uploader/MediaHandler";

export default function EstateMediaBox({ form, loading, props }: AddEditComponentProps) {
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
    register("gallery");
    register("image");
  }, []);

  const { checkingData } = props;
  if (!checkingData) return null;

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
            uploaderField="image"
            indexFileName="image"
            noSpace
            fromLibrary
            showFilesList
            showUploadList
            defaultValue={checkingData?.gallery?.default}
            disabled={checkingData?.gallery?.disabled}
            containerClassName={!!checkingData?.gallery?.hidden ? "hidden" : ""}
          />
          {/*  */}
        </div>
      </PanelCard>
    </>
  );
}
