import { Input } from "@/components/Input";
import { EstateTypeFormData } from "@/types/formsData";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { Select } from "@/components/Select";
import IconSelection from "@/components/Select/IconSelection";
import { AddEditComponentProps } from "@/components/@panel/EditAddPage";
import slugify from "slugify";

export default function EstateTypeBox({ form, loading, cancelForm }: AddEditComponentProps) {
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
  } = form as UseFormReturn<EstateTypeFormData>;

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
        onKeyDown={(e: any) => {
          setValue(
            "slug",
            slugify(e.target.value, {
              replacement: "_",
              remove: undefined,
              lower: false,
              strict: false,
              locale: "fa",
              trim: true,
            })
          );
        }}
      />
      <Input
        //
        control={control}
        name="slug"
        direction="ltr"
        placeholder="آدرس اینترنتی"
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
          apiPath={"/estate/category/assignList/"}
          showTitle
          multiple
          searchable
          noSpace
        />
        <p className="text-sm text-slate-500 mt-1 ">
          {/*  */}
          (دسته هایی که نوع مدنظر در آن ها معتبر است. در صورتی که دسته ای انتخاب نشود این نوع در تمامی دسته ها معتبر خواهد بود)
        </p>
      </div>
    </>
  );
}
