import useAxiosAuth from "@/hooks/useAxiosAuth";
import { SelectDataType } from "@/types/interfaces";
import { Chip, Select, SelectItem, SelectedItems } from "@nextui-org/react";
import { Key, useState, useEffect } from "react";
import { Controller } from "react-hook-form";

export const SelectFeatures = ({ label, placeholder, filterApi, isMulti = false }: { label: string; placeholder: string; filterApi?: any; isMulti?: boolean }) => {
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
      classNames={{ value: "text-right", selectorIcon: "left-3 right-auto" }}
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
    >
      {(item: SelectDataType) => <SelectItem key={item.value}>{item.title}</SelectItem>}
    </Select>
  );
};
