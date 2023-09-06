import useAxiosAuth from "@/hooks/useAxiosAuth";
import { usePokemonList } from "@/hooks/useGetList";
import { SelectDataType } from "@/types/interfaces";
import { Chip, Input, Select, SelectItem, SelectedItems } from "@nextui-org/react";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import React from "react";
import { Key, useState, useEffect } from "react";
import { Controller } from "react-hook-form";

export const LocationChoose = () => {
  return (
    <>
      <LocationProvince />
      <LocationCity />
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
    </>
  );
};

const LocationProvince = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { items, hasMore, isLoading, onLoadMore } = usePokemonList({ endpoint: "/static/province", fetchDelay: 2500 });

  const [, scrollerRef] = useInfiniteScroll({
    hasMore,
    isEnabled: isOpen,
    shouldUseLoader: false, // We don't want to show the loader at the bottom of the list
    onLoadMore,
  });

  return (
    <Select
      //
      isLoading={isLoading}
      items={items}
      label="استان"
      placeholder="استان را انتخاب کنید"
      scrollRef={scrollerRef}
      selectionMode="single"
      variant="faded"
      onOpenChange={setIsOpen}
      classNames={{ value: "text-right", selectorIcon: "left-3 right-auto" }}
    >
      {(item: SelectDataType) => <SelectItem key={item.value}>{item.title}</SelectItem>}
    </Select>
  );
};

const LocationCity = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { items, hasMore, isLoading, onLoadMore } = usePokemonList({ endpoint: "/static/city", fetchDelay: 2500 });

  const [, scrollerRef] = useInfiniteScroll({
    hasMore,
    isEnabled: isOpen,
    shouldUseLoader: false, // We don't want to show the loader at the bottom of the list
    onLoadMore,
  });

  return (
    <Select
      //
      isLoading={isLoading}
      items={items}
      label="شهر"
      placeholder="شهر را انتخاب کنید"
      scrollRef={scrollerRef}
      selectionMode="single"
      variant="faded"
      onOpenChange={setIsOpen}
      classNames={{ value: "text-right", selectorIcon: "left-3 right-auto" }}
    >
      {(item: SelectDataType) => <SelectItem key={item.value}>{item.title}</SelectItem>}
    </Select>
  );
};
