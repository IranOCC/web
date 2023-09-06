import useAxiosAuth from "@/hooks/useAxiosAuth";
import { EstateFormData } from "@/types/formsData";
import { SelectDataType } from "@/types/interfaces";
import { Chip, Select, SelectItem, SelectedItems } from "@nextui-org/react";
import { Key, useState, useEffect } from "react";
import { Controller, UseFormReturn } from "react-hook-form";

export const SelectFeatures = ({ form, label, placeholder, filterApi, isMulti = false }: { form: UseFormReturn<EstateFormData, any, undefined>; label: string; placeholder: string; filterApi?: any; isMulti?: boolean }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<SelectDataType[]>([]);
  const api = useAxiosAuth();
  useEffect(() => {
    const get = async () => {
      setLoading(true);
      try {
        const data = await api.get("/tools/estate/feature/autoComplete", { params: { filter: filterApi } });
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
      name="features"
      render={({ field }) => {
        return (
          <Select
            //
            className="col-span-full"
            isLoading={loading}
            items={data}
            label={label}
            placeholder={placeholder}
            selectionMode={isMulti ? "multiple" : "single"}
            variant="faded"
            isMultiline={isMulti}
            classNames={{ value: "text-right", spinner: "right-auto left-3", selectorIcon: "left-3 right-auto" }}
            renderValue={
              !isMulti
                ? undefined
                : (items: SelectedItems<SelectDataType>) => {
                    return (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {items.map((item) => (
                          <Chip color="secondary" key={item.key}>
                            {item.data?.title}
                          </Chip>
                        ))}
                      </div>
                    );
                  }
            }
            {...field}
            isRequired
            errorMessage={errors.features?.message}
            validationState={!!errors.features?.message ? "invalid" : "valid"}
          >
            {(item: SelectDataType) => <SelectItem key={item.value}>{item.title}</SelectItem>}
          </Select>
        );
      }}
      rules={{
        required: {
          value: true,
          message: "شهر الزامی است",
        },
      }}
    />
  );
};
