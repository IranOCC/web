import useAxiosAuth from "@/hooks/useAxiosAuth";
import { EstateFormData } from "@/types/formsData";
import { SelectDataType } from "@/types/interfaces";
import { Select, SelectItem } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { Timeout } from "react-number-format/types/types";

export const LocationFilter = ({ form, dataLoading, onSubmit }: any) => {
  const searchParams = useSearchParams();
  return (
    <>
      <div className="flex w-full flex-col gap-2">
        <LocationProvince
          //
          form={form}
          onSubmit={onSubmit}
        />
        {!!searchParams?.get("filter[province]") && (
          <LocationCity
            //
            form={form}
            onSubmit={onSubmit}
          />
        )}
        {!!searchParams?.get("filter[province]") && !!searchParams?.get("filter[city]") && (
          <LocationDistrict
            //
            form={form}
            onSubmit={onSubmit}
          />
        )}
      </div>
    </>
  );
};

export const LocationProvince = ({ form, onSubmit }: { form: UseFormReturn<EstateFormData, any, undefined>; onSubmit: any }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<SelectDataType[]>([]);
  const timeoutRef = useRef<Timeout | null>(null);

  const api = useAxiosAuth();
  const get = async () => {
    setLoading(true);
    try {
      const data = await api.get("/tools/estate/autoComplete/province", {});
      const _items = data.data;
      if (Array.isArray(_items)) setData(_items);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
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
      name="province"
      render={({ field }) => {
        return (
          <Select
            //
            isLoading={loading}
            items={[{ value: "null", title: "انتخاب نشده" }, ...data]}
            label="استان"
            placeholder="استان را انتخاب کنید"
            selectionMode="single"
            variant="faded"
            classNames={{ value: "text-right", errorMessage: "text-right", spinner: "right-auto left-3", selectorIcon: "left-3 right-auto" }}
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
            errorMessage={errors.province?.message}
            validationState={!!errors.province?.message ? "invalid" : "valid"}
          >
            {(item: SelectDataType) => <SelectItem key={item.value}>{item.title}</SelectItem>}
          </Select>
        );
      }}
    />
  );
};

export const LocationCity = ({ form, onSubmit }: { form: UseFormReturn<EstateFormData, any, undefined>; onSubmit: any }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<SelectDataType[]>([]);
  const searchParams = useSearchParams();
  const timeoutRef = useRef<Timeout | null>(null);

  const api = useAxiosAuth();
  const get = async () => {
    setLoading(true);
    try {
      const data = await api.get("/tools/estate/autoComplete/city", { params: { filter: { province: searchParams?.get("filter[province]") } } });
      const _items = data.data;
      if (Array.isArray(_items)) setData(_items);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    get();
  }, [searchParams?.get("filter[province]")]);

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
      name="city"
      render={({ field }) => {
        return (
          <Select
            //
            isLoading={loading}
            items={[{ value: "null", title: "انتخاب نشده" }, ...data]}
            label="شهر"
            placeholder="شهر را انتخاب کنید"
            selectionMode="single"
            variant="faded"
            classNames={{ value: "text-right", errorMessage: "text-right", spinner: "right-auto left-3", selectorIcon: "left-3 right-auto" }}
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
            errorMessage={errors.city?.message}
            validationState={!!errors.city?.message ? "invalid" : "valid"}
          >
            {(item: SelectDataType) => <SelectItem key={item.value}>{item.title}</SelectItem>}
          </Select>
        );
      }}
    />
  );
};

export const LocationDistrict = ({ form, onSubmit }: { form: UseFormReturn<EstateFormData, any, undefined>; onSubmit: any }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<SelectDataType[]>([]);
  const searchParams = useSearchParams();
  const timeoutRef = useRef<Timeout | null>(null);

  const api = useAxiosAuth();
  useEffect(() => {
    const get = async () => {
      setLoading(true);
      try {
        const data = await api.get("/tools/estate/autoComplete/district", { params: { filter: { province: searchParams?.get("filter[province]") || undefined, city: searchParams?.get("filter[city]") || undefined } } });
        const _items = data.data;
        if (Array.isArray(_items)) setData(_items);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    get();
  }, [searchParams?.get("filter[province]"), searchParams?.get("filter[city]")]);

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
      name="district"
      render={({ field }) => {
        return (
          <Select
            //
            isLoading={loading}
            items={data}
            label="منطقه"
            placeholder="منطقه را انتخاب کنید"
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
            errorMessage={errors.district?.message}
            validationState={!!errors.district?.message ? "invalid" : "valid"}
          >
            {(item: SelectDataType) => <SelectItem key={item.value}>{item.title}</SelectItem>}
          </Select>
        );
      }}
    />
  );
};
