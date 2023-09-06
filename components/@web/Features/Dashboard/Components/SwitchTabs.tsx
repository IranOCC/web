import useAxiosAuth from "@/hooks/useAxiosAuth";
import { SelectDataType } from "@/types/interfaces";
import { Spinner, Tab, Tabs } from "@nextui-org/react";
import { Key, useState, useEffect } from "react";
import { Controller } from "react-hook-form";

export const SwitchTabs = ({ className, control, name, endpoint, placeholder, selected, setSelected, filterApi }: { className?: string; control: any; name: string; endpoint: string; placeholder: string; selected?: Key; setSelected?: (a: Key) => void; filterApi?: any }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<SelectDataType[]>([]);
  const api = useAxiosAuth();
  useEffect(() => {
    const get = async () => {
      setLoading(true);
      try {
        const data = await api.get(endpoint, { params: { filter: filterApi } });
        const _items = data.data;
        if (Array.isArray(_items)) setData(_items);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    get();
  }, [filterApi?.categories]);

  if (loading) {
    return (
      <div className="flex h-12 w-full items-center justify-center">
        <Spinner size="sm" />
      </div>
    );
  }
  return (
    <Controller
      //
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <Tabs
            //
            className={className}
            color="secondary"
            fullWidth
            size="lg"
            classNames={{ tabList: "bg-white" }}
            placeholder={placeholder}
            selectedKey={field.value || selected}
            onSelectionChange={(k: Key) => {
              field.onChange(k);
              if (!!setSelected) setSelected(k);
            }}
            ref={field.ref}
            onBlur={field.onBlur}
            variant="bordered"
          >
            {data.map(({ title, value }) => {
              return <Tab title={title} key={value} />;
            })}
          </Tabs>
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
