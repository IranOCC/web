import { Input } from "@/components/Input";
import { EstateFeatureFormData } from "@/types/formsData";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { Select } from "@/components/Select";
import IconSelection from "@/components/Select/IconSelection";
import { AddEditComponentProps } from "@/components/@panel/EditAddPage";
import slugify from "slugify";

export default function EstateFeatureBox({ form, loading, cancelForm }: AddEditComponentProps) {
  const {
    register,
    unregister,
    resetField,
    setValue,
    setError,
    getValues,
    control,
    handleSubmit,
    reset,
    formState: { errors, isLoading, isSubmitting, isValidating, isSubmitted, isSubmitSuccessful },
  } = form as UseFormReturn<EstateFeatureFormData>;

  useEffect(() => {
    register("title", { required: "عنوان را وارد کنید" });
    register("slug");
    register("categories");
    register("description");
    register("tags");
    register("icon");
  }, []);

  return (
    <>
      <Input
        //
        control={control}
        name="title"
        placeholder="عنوان"
        error={errors.title?.message}
        loading={isSubmitting}
        noSpace
        onKeyUp={(e: any) => {
          setValue(
            "slug",
            slugify(e.target.value, {
              replacement: "_",
              remove: undefined,
              lower: false,
              strict: false,
              locale: "fa",
              trim: true,
            }),
            { shouldValidate: true }
          );
        }}
      />
      <Input
        //
        control={control}
        name="slug"
        direction="ltr"
        placeholder="شناسه"
        error={errors.slug?.message}
        loading={isSubmitting}
        noSpace
      />
      <Input
        //
        control={control}
        name="description"
        placeholder="توضیحات"
        error={errors.description?.message}
        loading={isSubmitting}
        multiline
        lines={3}
        noSpace
      />
      <Input
        //
        control={control}
        name="tags"
        placeholder="برچسب ها"
        error={errors.tags?.message}
        loading={isSubmitting}
        tagsMode
        noSpace
      />
      <IconSelection
        //
        control={control}
        name="icon"
        error={errors.icon?.message}
        loading={isSubmitting}
        noSpace
      />

      <div>
        <Select
          //
          control={control}
          name="categories"
          error={errors.categories?.message}
          loading={isSubmitting}
          label="دسته های معتبر"
          apiPath={"/tools/estate/category/autoComplete"}
          showTitle
          multiple
          searchable
          noSpace
        />
        <p className="mt-1 text-sm text-gray-500 ">
          {/*  */}
          (دسته هایی که ویژگی مدنظر در آن ها معتبر است. در صورتی که دسته ای انتخاب نشود این ویژگی در تمامی دسته ها معتبر خواهد بود)
        </p>
      </div>
    </>
  );
}
