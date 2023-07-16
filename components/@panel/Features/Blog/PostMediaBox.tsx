import { BlogPostFormData } from "@/types/formsData";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import PanelCard from "@/components/@panel/Card";
import { AddEditComponentProps } from "../../EditAddPage";
import MediaHandler from "@/components/Uploader/MediaHandler";

export default function BlogPostMediaBox({ form, loading, props }: AddEditComponentProps) {
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
    register("image");
  }, []);

  const { checkingData } = props;
  if (!checkingData) return null;

  return (
    <>
      <PanelCard title="تصویر شاخص" loading={loading}>
        <div className="grid grid-cols-1 gap-4 ">
          {/*  */}
          <MediaHandler
            //
            name="gallery"
            control={control}
            uploadPath="blog"
            uploaderField="image"
            indexFileName="image"
            noSpace
            fromLibrary
            showFilesList
            showUploadList
            maxFile={1}
            defaultValue={checkingData?.image?.default}
            disabled={checkingData?.image?.disabled}
            containerClassName={!!checkingData?.image?.hidden ? "hidden" : ""}
          />
          {/*  */}
        </div>
      </PanelCard>
    </>
  );
}
