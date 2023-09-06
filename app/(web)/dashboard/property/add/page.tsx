"use client";

import { WebPreviewContext, WebPreviewContextType } from "@/context/webPreview.context";
import { Key, useContext, useEffect, useState } from "react";
import { Input, Tabs, Tab, Textarea, Button, Switch, Spinner, Card, CardBody, Select, SelectItem, SelectedItems, Chip, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import { NumericFormat } from "react-number-format";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { SelectDataType } from "@/types/interfaces";
import { EstateFormData } from "@/types/formsData";
import { Controller, useForm } from "react-hook-form";
import React from "react";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import { usePokemonList } from "@/hooks/useGetList";

export default function Page() {
  const { dashboardPage } = useContext(WebPreviewContext) as WebPreviewContextType;
  useEffect(() => {
    dashboardPage("ثبت ملک جدید");
  }, []);
  const [category, setCategory] = useState<Key>("");

  //
  const form = useForm<EstateFormData>();
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

  const onSubmit = async (data: EstateFormData) => {
    alert("hey");
  };

  return (
    <div className="flex h-auto min-h-full flex-col items-center justify-between bg-gray-200 px-4 pb-16 md:bg-transparent md:pb-4">
      <div className="grid w-full grid-cols-1 gap-3 py-5 lg:grid-cols-2">
        <TabData
          //
          placeholder="دسته ملک"
          endpoint="/tools/estate/category/autoComplete"
          selected={category}
          setSelected={setCategory}
          control={control}
          name="category"
        />
        <Input
          //
          className="col-span-full"
          type="text"
          variant="faded"
          label="عنوان ملک"
          maxLength={200}
        />
        <NumericFormat
          //
          className="col-span-full"
          type="tel"
          variant="faded"
          labelPlacement="inside"
          label="متراژ کل"
          dir="ltr"
          customInput={Input}
          allowNegative={false}
          allowLeadingZeros={false}
          decimalScale={0}
        />
        <NumericFormat
          //
          className="col-span-full"
          type="tel"
          variant="faded"
          labelPlacement="inside"
          label="قیمت کل"
          dir="ltr"
          customInput={Input}
          allowNegative={false}
          allowLeadingZeros={false}
          decimalScale={0}
          thousandsGroupStyle="thousand"
          thousandSeparator=","
        />
        {category && (
          <>
            <TabData
              //
              placeholder="نوع ملک"
              endpoint="/tools/estate/type/autoComplete"
              control={control}
              name="type"
              filterApi={{ categories: category }}
            />
            <TabData
              //
              placeholder="نوع سند"
              endpoint="/tools/estate/documentType/autoComplete"
              control={control}
              name="documentType"
              filterApi={{ categories: category }}
            />
            <Switch
              //
              className="col-span-full"
              placeholder="قابل تهاتر"
              dir="ltr"
            >
              قابل تهاتر
            </Switch>
            <Textarea
              //
              className="col-span-full"
              type="text"
              variant="faded"
              label="توضیحات"
            />
            <Villa category={category} />
            <Apartment category={category} />
            <Commercial category={category} />
            <Land category={category} />
            <Hectare category={category} />
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
            <GalleryImages />
            <div />
            <Button
              //
              color="secondary"
              variant="shadow"
            >
              ثبت
            </Button>
          </>
        )}
      </div>
      <div />
    </div>
  );
}

const GalleryImages = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <Button
        //
        color="secondary"
        variant="flat"
        onPress={() => setOpen(true)}
      >
        تصاویر
      </Button>
      <Modal
        //
        scrollBehavior="inside"
        classNames={{ backdrop: "z-[102]", wrapper: "z-[102]", closeButton: "right-auto left-1" }}
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={setOpen}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">تصاویر ملک</ModalHeader>
              <ModalBody>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam.</p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. Et mollit incididunt nisi consectetur esse laborum eiusmod
                  pariatur proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  ثبت
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

//
//
//
//

const Villa = ({ category }: { category: Key }) => {
  return (
    <>
      <NumericFormat
        //
        className="col-span-1"
        type="tel"
        variant="faded"
        labelPlacement="inside"
        label="سال ساخت"
        dir="ltr"
        customInput={Input}
        allowNegative={false}
        allowLeadingZeros={false}
        decimalScale={0}
      />
      <NumericFormat
        //
        className="col-span-1"
        type="tel"
        variant="faded"
        labelPlacement="inside"
        label="زیر بنا"
        dir="ltr"
        customInput={Input}
        allowNegative={false}
        allowLeadingZeros={false}
        decimalScale={0}
      />
      <NumericFormat
        //
        className="col-span-1"
        type="tel"
        variant="faded"
        labelPlacement="inside"
        label="تعداد اتاق"
        dir="ltr"
        customInput={Input}
        allowNegative={false}
        allowLeadingZeros={false}
        decimalScale={0}
      />
      <NumericFormat
        //
        className="col-span-1"
        type="tel"
        variant="faded"
        labelPlacement="inside"
        label="تعداد مستر"
        dir="ltr"
        customInput={Input}
        allowNegative={false}
        allowLeadingZeros={false}
        decimalScale={0}
      />
      <Features
        //
        endpoint="/tools/estate/feature/autoComplete"
        filterApi={{ categories: category }}
      />
    </>
  );
};

const Apartment = ({ category }: { category: Key }) => {
  return (
    <>
      <NumericFormat
        //
        className="col-span-1"
        type="tel"
        variant="faded"
        labelPlacement="inside"
        label="تعداد خواب"
        dir="ltr"
        customInput={Input}
        allowNegative={false}
        allowLeadingZeros={false}
        decimalScale={0}
      />
      <NumericFormat
        //
        className="col-span-1"
        type="tel"
        variant="faded"
        labelPlacement="inside"
        label="تعداد مستر"
        dir="ltr"
        customInput={Input}
        allowNegative={false}
        allowLeadingZeros={false}
        decimalScale={0}
      />
      <NumericFormat
        //
        className="col-span-1"
        type="tel"
        variant="faded"
        labelPlacement="inside"
        label="تعداد کل طبقات"
        dir="ltr"
        customInput={Input}
        allowNegative={false}
        allowLeadingZeros={false}
        decimalScale={0}
      />
      <NumericFormat
        //
        className="col-span-1"
        type="tel"
        variant="faded"
        labelPlacement="inside"
        label="تعداد کل واحدها"
        dir="ltr"
        customInput={Input}
        allowNegative={false}
        allowLeadingZeros={false}
        decimalScale={0}
      />
      <NumericFormat
        //
        className="col-span-1"
        type="tel"
        variant="faded"
        labelPlacement="inside"
        label="طبقه"
        dir="ltr"
        customInput={Input}
        allowNegative={false}
        allowLeadingZeros={false}
        decimalScale={0}
      />
      <Features
        //
        endpoint="/tools/estate/feature/autoComplete"
        filterApi={{ categories: category }}
      />
    </>
  );
};

const Commercial = ({ category }: { category: Key }) => {
  return (
    <>
      <NumericFormat
        //
        className="col-span-1"
        type="tel"
        variant="faded"
        labelPlacement="inside"
        label="متراژ بر تجاری"
        dir="ltr"
        customInput={Input}
        allowNegative={false}
        allowLeadingZeros={false}
        decimalScale={0}
      />
      <NumericFormat
        //
        className="col-span-1"
        type="tel"
        variant="faded"
        labelPlacement="inside"
        label="طبقه ملک"
        dir="ltr"
        customInput={Input}
        allowNegative={false}
        allowLeadingZeros={false}
        decimalScale={0}
      />
    </>
  );
};

const Land = ({ category }: { category: Key }) => {
  return (
    <>
      <Features
        //
        endpoint="/tools/estate/feature/autoComplete"
        filterApi={{ categories: category }}
      />
      <Switch
        //
        className="col-span-full"
        placeholder="دارای ساختمان قدیمی"
        dir="ltr"
      >
        دارای ساختمان قدیمی
      </Switch>
    </>
  );
};

const Hectare = ({ category }: { category: Key }) => {
  return (
    <>
      <Features
        //
        endpoint="/tools/estate/feature/autoComplete"
        filterApi={{ categories: category }}
      />
      <Switch
        //
        className="col-span-full"
        placeholder="دارای ساختمان قدیمی"
        dir="ltr"
      >
        دارای ساختمان قدیمی
      </Switch>
    </>
  );
};

const Features = ({ endpoint, filterApi }: { endpoint: string; filterApi?: any }) => {
  // const [isOpen, setIsOpen] = React.useState(false);
  // const { items, hasMore, isLoading, onLoadMore } = usePokemonList({ endpoint: "/tools/estate/feature/autoComplete", fetchDelay: 2500 });

  // const [, scrollerRef] = useInfiniteScroll({
  //   hasMore,
  //   isEnabled: isOpen,
  //   shouldUseLoader: false, // We don't want to show the loader at the bottom of the list
  //   onLoadMore,
  // });

  const [loading, setLoading] = useState(false);
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

  return (
    <Select
      //
      className="col-span-full"
      isLoading={loading}
      items={data}
      label="ویژگی ها"
      placeholder="ویزگی ها را انتخاب کنید"
      // scrollRef={scrollerRef}
      selectionMode="multiple"
      variant="faded"
      // onOpenChange={setIsOpen}
      isMultiline
      classNames={{ value: "text-right", selectorIcon: "left-3 right-auto" }}
      renderValue={(items: SelectedItems<SelectDataType>) => {
        return (
          <div className="mt-2 flex flex-wrap gap-2">
            {items.map((item) => (
              <Chip color="secondary" key={item.key}>
                {item.data?.title}
              </Chip>
            ))}
          </div>
        );
      }}
    >
      {(item: SelectDataType) => <SelectItem key={item.value}>{item.title}</SelectItem>}
    </Select>
  );
};
//
//
//

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

//
//
//
const TabData = ({ control, name, endpoint, placeholder, selected, setSelected, filterApi }: { control: any; name: string; endpoint: string; placeholder: string; selected?: Key; setSelected?: (a: Key) => void; filterApi?: any }) => {
  const [loading, setLoading] = useState(false);
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
      <div className="col-span-full flex items-center justify-center">
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
            color="secondary"
            fullWidth
            size="lg"
            classNames={{ tabList: "bg-white" }}
            placeholder={placeholder}
            selectedKey={field.value}
            onSelectionChange={(k: Key) => {
              field.onChange(k);
              if (!!setSelected) setSelected(k);
            }}
            ref={field.ref}
            onBlur={field.onBlur}
            variant="bordered"
            className="col-span-full"
          >
            {data.map(({ title, value }) => {
              return <Tab title={title} key={value} />;
            })}
          </Tabs>
        );
      }}
    />
  );
};
