import useAxiosAuth from "@/hooks/useAxiosAuth";
import { EstateFormData } from "@/types/formsData";
import { SelectDataType } from "@/types/interfaces";
import { Chip, Select, SelectItem, SelectedItems } from "@nextui-org/react";
import { Key, useState, useEffect } from "react";
import { Controller, UseFormReturn } from "react-hook-form";

export const SelectType = ({ form, filterApi }: { form: UseFormReturn<EstateFormData, any, undefined>; filterApi?: any }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<SelectDataType[]>([]);
  const api = useAxiosAuth();
  useEffect(() => {
    const get = async () => {
      setLoading(true);
      try {
        const data = await api.get("/tools/estate/type/autoComplete", { params: { filter: filterApi } });
        const _items = data.data;
        if (Array.isArray(_items)) setData(_items);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    get();
  }, [filterApi?.categories]);

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
            className="col-span-full"
            isLoading={loading}
            items={data}
            label="نوع ملک"
            placeholder="نوع ملک را انتخاب کنید"
            selectionMode="single"
            variant="faded"
            isMultiline={false}
            classNames={{ value: "text-right", spinner: "right-auto left-3", selectorIcon: "left-3 right-auto" }}
            {...field}
            isRequired
            errorMessage={errors.type?.message}
            validationState={!!errors.type?.message ? "invalid" : "valid"}
          >
            {(item: SelectDataType) => <SelectItem key={item.value}>{item.title}</SelectItem>}
          </Select>
        );
      }}
      rules={{
        required: {
          value: true,
          message: "الزامی است",
        },
      }}
    />
  );
};

export const SelectDocumentType = ({ form, filterApi }: { form: UseFormReturn<EstateFormData, any, undefined>; filterApi?: any }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<SelectDataType[]>([]);
  const api = useAxiosAuth();
  useEffect(() => {
    const get = async () => {
      setLoading(true);
      try {
        const data = await api.get("/tools/estate/documentType/autoComplete", { params: { filter: filterApi } });
        const _items = data.data;
        if (Array.isArray(_items)) setData(_items);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    get();
  }, [filterApi?.categories]);

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
      name="documentType"
      render={({ field }) => {
        return (
          <Select
            //
            className="col-span-full"
            isLoading={loading}
            items={data}
            label="نوع سند"
            placeholder="نوع سند را انتخاب کنید"
            selectionMode="single"
            variant="faded"
            isMultiline={false}
            classNames={{ value: "text-right", spinner: "right-auto left-3", selectorIcon: "left-3 right-auto" }}
            {...field}
            isRequired
            errorMessage={errors.documentType?.message}
            validationState={!!errors.documentType?.message ? "invalid" : "valid"}
          >
            {(item: SelectDataType) => <SelectItem key={item.value}>{item.title}</SelectItem>}
          </Select>
        );
      }}
      rules={{
        required: {
          value: true,
          message: "الزامی است",
        },
      }}
    />
  );
};
