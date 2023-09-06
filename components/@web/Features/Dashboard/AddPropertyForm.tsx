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
import { SwitchTabs } from "./Components/SwitchTabs";
import { ImageGallery } from "./Components/ImageGallery";
import { SelectFeatures } from "./Components/SelectFeatures";
import { LocationChoose } from "./Components/LocationChoose";

export default function AddPropertyForm() {
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
    <div className="grid w-full grid-cols-1 gap-3 px-4 py-5 lg:grid-cols-2">
      <SwitchTabs
        //
        className="col-span-full"
        control={control}
        name="category"
        placeholder="دسته ملک"
        endpoint="/tools/estate/category/autoComplete"
        selected={category}
        setSelected={setCategory}
      />
      {category && (
        <>
          <Card className="col-span-full">
            <CardBody className="grid w-full grid-cols-1 gap-3 lg:grid-cols-2">
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

              <SwitchTabs
                //
                placeholder="نوع ملک"
                endpoint="/tools/estate/type/autoComplete"
                control={control}
                name="type"
                filterApi={{ categories: category }}
              />
              <SwitchTabs
                //
                placeholder="نوع سند"
                endpoint="/tools/estate/documentType/autoComplete"
                control={control}
                name="documentType"
                filterApi={{ categories: category }}
              />
              <Textarea
                //
                className="col-span-full"
                type="text"
                variant="faded"
                label="توضیحات"
              />
              <Switch
                //
                className="col-span-full"
                placeholder="قابل تهاتر"
                dir="ltr"
              >
                قابل تهاتر
              </Switch>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="grid w-full grid-cols-1 gap-3 lg:grid-cols-2">
              <Villa category={category} />
              <Apartment category={category} />
              <Commercial category={category} />
              <Land category={category} />
              <Hectare category={category} />
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <ImageGallery />
            </CardBody>
          </Card>
          <Card className="col-span-full">
            <CardBody className="grid w-full grid-cols-1 gap-3 lg:grid-cols-2">
              <LocationChoose />
            </CardBody>
          </Card>
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
  );
}

//
//
//
//

const Villa = ({ category }: { category: Key }) => {
  if (category !== "645cd0444b4819ffd958c940") return null;

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
      <SelectFeatures
        //
        filterApi={{ categories: category }}
        label="ویژگی ها"
        placeholder="ویزگی ها را انتخاب کنید"
        isMulti
      />
    </>
  );
};

const Apartment = ({ category }: { category: Key }) => {
  if (category !== "645cd1214b4819ffd958c955") return null;

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
        className="col-span-full"
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
      <SelectFeatures
        //
        filterApi={{ categories: category }}
        label="ویژگی ها"
        placeholder="ویزگی ها را انتخاب کنید"
        isMulti
      />
    </>
  );
};

const Commercial = ({ category }: { category: Key }) => {
  if (category !== "645cd1754b4819ffd958c95b") return null;

  return (
    <>
      <NumericFormat
        //
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
  if (category !== "645cd1554b4819ffd958c958") return null;

  return (
    <>
      <SelectFeatures
        //
        filterApi={{ categories: category }}
        label="نوع بافت"
        placeholder="نوع بافت را انتخاب کنید"
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
  if (category !== "645cd1844b4819ffd958c95e") return null;

  return (
    <>
      <SelectFeatures
        //
        filterApi={{ categories: category }}
        label="نوع بافت"
        placeholder="نوع بافت را انتخاب کنید"
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

//
//
//
