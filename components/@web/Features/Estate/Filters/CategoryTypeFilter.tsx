import useAxiosAuth from "@/hooks/useAxiosAuth";
import { EstateFormData } from "@/types/formsData";
import { SelectDataType } from "@/types/interfaces";
import { Select, SelectItem } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { Timeout } from "react-number-format/types/types";

export const CategoryTypeFilter = ({ form, dataLoading, onSubmit }: any) => {
  return (
    <>
      <div className="flex w-full flex-col gap-2">
        <PropertyCategory
          //
          form={form}
          onSubmit={onSubmit}
        />
        <PropertyType
          //
          form={form}
          onSubmit={onSubmit}
        />
      </div>
    </>
  );
};

export const PropertyCategory = ({ form, onSubmit }: { form: UseFormReturn<EstateFormData, any, undefined>; onSubmit: any }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<SelectDataType[]>([]);
  const searchParams = useSearchParams();
  const timeoutRef = useRef<Timeout | null>(null);

  const api = useAxiosAuth();
  useEffect(() => {
    const get = async () => {
      setLoading(true);
      try {
        const data = await api.get("/tools/estate/category/autoComplete", { params: {} });
        const _items = data.data;
        if (Array.isArray(_items)) setData(_items);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    get();
  }, [searchParams?.get("filter[category]")]);

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

  return (
    <Controller
      control={control}
      name="category"
      render={({ field }) => {
        return (
          <Select
            //
            isLoading={loading}
            items={[{ value: "null", title: "انتخاب نشده" }, ...data]}
            label="دسته"
            placeholder="دسته را انتخاب کنید"
            selectionMode="single"
            variant="faded"
            classNames={{ value: "text-right", errorMessage: "text-right", spinner: "right-auto left-3", selectorIcon: "left-3 right-auto" }}
            // multiple
            selectedKeys={new Set([field.value]) as any}
            onSelectionChange={() => {
              if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
              }
              timeoutRef.current = setTimeout(() => {
                handleSubmit(onSubmit)();
                timeoutRef.current = null;
              }, 500);
            }}
            {...field}
            errorMessage={errors.documentType?.message}
            validationState={!!errors.documentType?.message ? "invalid" : "valid"}
          >
            {(item: SelectDataType) => <SelectItem key={item.value}>{item.title}</SelectItem>}
          </Select>
        );
      }}
    />
  );
};

export const PropertyType = ({ form, onSubmit }: { form: UseFormReturn<EstateFormData, any, undefined>; onSubmit: any }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<SelectDataType[]>([]);
  const searchParams = useSearchParams();
  const timeoutRef = useRef<Timeout | null>(null);

  const api = useAxiosAuth();
  useEffect(() => {
    const get = async () => {
      setLoading(true);
      try {
        const data = await api.get("/tools/estate/type/autoComplete", { params: { filter: { categories: searchParams?.get("filter[category]") || undefined } } });
        const _items = data.data;
        if (Array.isArray(_items)) setData(_items);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    get();
  }, [searchParams?.get("filter[category]")]);

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

  return (
    <Controller
      control={control}
      name="type"
      render={({ field }) => {
        return (
          <Select
            //
            isLoading={loading}
            items={data}
            label="نوع ملک"
            placeholder="نوع ملک را انتخاب کنید"
            selectionMode="multiple"
            variant="faded"
            classNames={{ value: "text-right", errorMessage: "text-right", spinner: "right-auto left-3", selectorIcon: "left-3 right-auto" }}
            // multiple
            // selectedKeys={new Set(field.value) as any}
            onSelectionChange={() => {
              if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
              }
              timeoutRef.current = setTimeout(() => {
                handleSubmit(onSubmit)();
                timeoutRef.current = null;
              }, 500);
            }}
            {...field}
            errorMessage={errors.type?.message}
            validationState={!!errors.type?.message ? "invalid" : "valid"}
          >
            {(item: SelectDataType) => <SelectItem key={item.value}>{item.title}</SelectItem>}
          </Select>
        );
      }}
    />
  );
};
