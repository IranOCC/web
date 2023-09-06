import useAxiosAuth from "@/hooks/useAxiosAuth";
import { usePokemonList } from "@/hooks/useGetList";
import { SelectDataType } from "@/types/interfaces";
import { Chip, Input, Select, SelectItem, Selection } from "@nextui-org/react";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import React from "react";
import { Key, useState, useEffect } from "react";
import { Controller } from "react-hook-form";

export const LocationChoose = () => {
  const [province, setProvince] = useState<Selection>(new Set([]));
  console.log(province);

  return (
    <>
      <div className="aspect-square h-12 w-full bg-red-500">
        {/*  */}
        {/*  */}
      </div>
      <div className="grid grid-cols-1 gap-3">
        <LocationProvince setProvince={setProvince} />
        <LocationCity province={province} />
        <Input
          //
          className="col-span-1"
          type="text"
          variant="faded"
          label="منطقه"
          maxLength={200}
        />
        <Input
          //
          className="col-span-1"
          type="text"
          variant="faded"
          label="محله"
          maxLength={200}
        />
        <Input
          //
          className="col-span-1"
          type="text"
          variant="faded"
          label="کوچه"
          maxLength={200}
        />
        <Input
          //
          className="col-span-full"
          type="text"
          variant="faded"
          label="آدرس"
          maxLength={200}
        />
      </div>
    </>
  );
};

const LocationProvince = ({ setProvince }: { setProvince: any }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<SelectDataType[]>([]);
  const api = useAxiosAuth();
  useEffect(() => {
    const get = async () => {
      setLoading(true);
      try {
        const data = await api.get("/static/province", {});
        const _items = data.data;
        if (Array.isArray(_items)) setData(_items);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    get();
  }, []);

  return (
    <Select
      //
      isLoading={loading}
      items={data}
      label="استان"
      placeholder="استان را انتخاب کنید"
      selectionMode="single"
      variant="faded"
      classNames={{ value: "text-right", spinner: "right-auto left-3", selectorIcon: "left-3 right-auto" }}
      onSelectionChange={setProvince}
    >
      {(item: SelectDataType) => <SelectItem key={item.value}>{item.title}</SelectItem>}
    </Select>
  );
};

const LocationCity = ({ province }: { province?: any }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<SelectDataType[]>([]);
  const api = useAxiosAuth();
  useEffect(() => {
    const get = async () => {
      setLoading(true);
      try {
        const data = await api.get("/static/city", { params: { filter: { province: province?.currentKey } } });
        const _items = data.data;
        if (Array.isArray(_items)) setData(_items);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    get();
  }, [province]);

  return (
    <Select
      //
      isLoading={loading}
      items={data}
      label="شهر"
      placeholder="شهر را انتخاب کنید"
      selectionMode="single"
      variant="faded"
      classNames={{ value: "text-right", spinner: "right-auto left-3", selectorIcon: "left-3 right-auto" }}
    >
      {(item: SelectDataType) => <SelectItem key={item.value}>{item.title}</SelectItem>}
    </Select>
  );
};
