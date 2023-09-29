import useAxiosAuth from "@/hooks/useAxiosAuth";
import { EstateFormData } from "@/types/formsData";
import { SelectDataType } from "@/types/interfaces";
import { Select, SelectItem, Switch } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { Timeout } from "react-number-format/types/types";

export const AreaFilter = ({ form, dataLoading, onSubmit }: any) => {
  const timeoutRef = useRef<Timeout | null>(null);

  return (
    <>
      <div className="flex w-full flex-col gap-2">
        <AreaPeriod
          //
          form={form}
          onSubmit={onSubmit}
        />
      </div>
    </>
  );
};

export const AreaPeriod = ({ form, onSubmit }: { form: UseFormReturn<EstateFormData, any, undefined>; onSubmit: any }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<SelectDataType[]>([]);
  const searchParams = useSearchParams();
  const timeoutRef = useRef<Timeout | null>(null);

  const api = useAxiosAuth();
  useEffect(() => {
    const get = async () => {
      setLoading(true);
      try {
        const data = await api.get("/tools/estate/autoComplete/area", { params: { filter: { categories: searchParams?.get("filter[category]") || undefined } } });
        const _items = data.data;
        if (Array.isArray(_items)) setData(_items);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    get();
  }, []);

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
      name="area"
      render={({ field }) => {
        return (
          <Select
            //
            isLoading={loading}
            items={[{ value: "null", title: "انتخاب نشده" }, ...data]}
            label="بازه متراژ"
            placeholder="بازه متراژ را انتخاب کنید"
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
            errorMessage={errors.area?.message}
            validationState={!!errors.area?.message ? "invalid" : "valid"}
          >
            {(item: SelectDataType) => <SelectItem key={item.value}>{item.title}</SelectItem>}
          </Select>
        );
      }}
    />
  );
};
