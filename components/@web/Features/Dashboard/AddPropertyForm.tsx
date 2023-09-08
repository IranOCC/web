"use client";

import { Key, useState } from "react";
import { Input, Textarea, Button, Switch, Spinner, Card, CardBody, Select, SelectItem, SelectedItems, Chip, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { NumericFormat } from "react-number-format";
import { EstateFormData } from "@/types/formsData";
import { Controller, UseFormReturn, useForm } from "react-hook-form";
import React from "react";
import { SwitchTabs } from "./Components/SwitchTabs";
import { ImageGallery } from "./Components/ImageGallery";
import { SelectFeatures } from "./Components/SelectFeatures";
import { LocationChoose } from "./Components/LocationChoose";
import { Check } from "@mui/icons-material";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { handleFieldsError } from "@/lib/axios";

export default function AddPropertyForm() {
  const [category, setCategory] = useState<Key>("");
  const [isOpenResult, setOpenResult] = useState(false);

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

  const api = useAxiosAuth();
  const onSubmit = async (data: EstateFormData) => {
    data.totalPrice = parseInt((data.totalPrice as string).replaceAll(",", ""));
    data.area = parseInt(data.area as string);
    data.price = Math.round(data.totalPrice / data.area);
    data.features = (data.features + "")?.split(",");
    console.log(data);
    setOpenResult(true);
    try {
      await api.post(`/estate`, data);
      setTimeout(() => (window.location.href = "/dashboard"), 2000);
    } catch (error) {
      console.log("Error", error);
      handleFieldsError(error, setError);
      setError("root", { message: "خطایی وجود دارد" });
      setTimeout(() => (window.location.href = "/dashboard"), 2000);
    }
  };

  return (
    <form className="w-full max-w-4xl px-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid w-full grid-cols-1 gap-3 py-5 lg:grid-cols-2">
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
                <Controller
                  control={control}
                  name="title"
                  render={({ field }) => {
                    return (
                      <Input
                        //
                        className="col-span-full"
                        type="text"
                        variant="faded"
                        label="عنوان"
                        {...field}
                        isRequired
                        classNames={{ errorMessage: "text-right" }}
                        errorMessage={errors.title?.message}
                        validationState={!!errors.title?.message ? "invalid" : "valid"}
                      />
                    );
                  }}
                  rules={{
                    required: {
                      value: true,
                      message: "عنوان الزامی است",
                    },
                    minLength: {
                      value: 10,
                      message: "حداقل باید 10 کاراکتر باشد",
                    },
                  }}
                />
                <Controller
                  control={control}
                  name="area"
                  render={({ field }) => {
                    return (
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
                        {...field}
                        isRequired
                        classNames={{ errorMessage: "text-right" }}
                        errorMessage={errors.area?.message}
                        validationState={!!errors.area?.message ? "invalid" : "valid"}
                      />
                    );
                  }}
                  rules={{
                    required: {
                      value: true,
                      message: "متراژ کل الزامی است",
                    },
                  }}
                />
                <Controller
                  control={control}
                  name="totalPrice"
                  render={({ field }) => {
                    return (
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
                        {...field}
                        description="قیمت به تومان وارد شود"
                        isRequired
                        classNames={{ errorMessage: "text-right" }}
                        errorMessage={errors.totalPrice?.message}
                        validationState={!!errors.totalPrice?.message ? "invalid" : "valid"}
                      />
                    );
                  }}
                  rules={{
                    required: {
                      value: true,
                      message: "قیمت کل الزامی است",
                    },
                  }}
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
                <Controller
                  control={control}
                  name="description"
                  render={({ field }) => {
                    return (
                      <Textarea
                        //
                        className="col-span-full"
                        type="text"
                        variant="faded"
                        label="توضیحات"
                        {...field}
                        classNames={{ errorMessage: "text-right" }}
                        errorMessage={errors.description?.message}
                        validationState={!!errors.description?.message ? "invalid" : "valid"}
                      />
                    );
                  }}
                />
                <Controller
                  control={control}
                  name="canBarter"
                  render={({ field }) => {
                    return (
                      <Switch
                        //
                        className="col-span-full"
                        placeholder="قابل تهاتر"
                        dir="ltr"
                        {...field}
                        value={field.value?.toString() || ""}
                      >
                        قابل تهاتر
                      </Switch>
                    );
                  }}
                />
              </CardBody>
            </Card>
            <Card>
              <CardBody className="grid w-full grid-cols-1 content-center gap-3 lg:grid-cols-2">
                <Villa form={form} category={category} />
                <Apartment form={form} category={category} />
                <Commercial form={form} category={category} />
                <Land form={form} category={category} />
                <Hectare form={form} category={category} />
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <ImageGallery form={form} />
              </CardBody>
            </Card>
            <Card className="col-span-full">
              <CardBody className="relative grid w-full grid-cols-1 gap-3 lg:grid-cols-2">
                <LocationChoose form={form} />
              </CardBody>
            </Card>
            <div />

            <Button
              //
              type="submit"
              color="secondary"
              variant="shadow"
              isLoading={isLoading || isSubmitting || isValidating}
              disabled={isSubmitted}
            >
              ثبت
            </Button>
          </>
        )}
      </div>
      <Modal
        //
        backdrop="blur"
        isOpen={isOpenResult}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        hideCloseButton
        className="z-[102]"
        placement="center"
        classNames={{ wrapper: "z-[102]", backdrop: "z-[102]", closeButton: "right-auto left-1" }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <div className="flex w-full flex-col items-center justify-center gap-2 py-5">
                  {(isLoading || isSubmitting || isValidating) && (
                    <Spinner
                      //
                      size="lg"
                      classNames={{ label: "text-sm" }}
                      label="در حال پردازش ..."
                      color="secondary"
                    />
                  )}
                  {!(isLoading || isSubmitting || isValidating) && isSubmitted && isSubmitSuccessful && (
                    <>
                      <div className="text-color-500 flex flex-col items-center justify-center gap-2 rounded-md bg-green-100 p-2 text-green-500">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-10 w-10" fill="currentColor">
                          <path d="M10.0007 15.1709L19.1931 5.97852L20.6073 7.39273L10.0007 17.9993L3.63672 11.6354L5.05093 10.2212L10.0007 15.1709Z"></path>
                        </svg>
                      </div>
                      <span className="text-center">ملک شما با موفقیت ثبت شد و پس از تایید منتشر خواهد شد</span>
                    </>
                  )}
                  {!(isLoading || isSubmitting || isValidating) && isSubmitted && !isSubmitSuccessful && (
                    <>
                      <div className="text-color-500 flex flex-col items-center justify-center gap-2 rounded-md bg-red-100 p-2 text-red-500">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-10 w-10" fill="currentColor">
                          <path d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"></path>
                        </svg>
                      </div>
                      <span className="text-center">متاسفانه ثبت ملک با خطا مواجه شد</span>
                    </>
                  )}
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </form>
  );
}

//
//
//
//

const Villa = ({ form, category }: { form: UseFormReturn<EstateFormData, any, undefined>; category: Key }) => {
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

  if (category !== "645cd0444b4819ffd958c940") return null;

  return (
    <>
      <Controller
        control={control}
        name="constructionYear"
        render={({ field }) => {
          return (
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
              {...field}
              isRequired
              classNames={{ errorMessage: "text-right" }}
              errorMessage={errors.constructionYear?.message}
              validationState={!!errors.constructionYear?.message ? "invalid" : "valid"}
            />
          );
        }}
        rules={{
          required: {
            value: true,
            message: "الزامی است",
          },
        }}
      />
      <Controller
        control={control}
        name="buildingArea"
        render={({ field }) => {
          return (
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
              {...field}
              isRequired
              classNames={{ errorMessage: "text-right" }}
              errorMessage={errors.buildingArea?.message}
              validationState={!!errors.buildingArea?.message ? "invalid" : "valid"}
            />
          );
        }}
        rules={{
          required: {
            value: true,
            message: "الزامی است",
          },
        }}
      />
      <Controller
        control={control}
        name="roomsCount"
        render={({ field }) => {
          return (
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
              {...field}
              isRequired
              classNames={{ errorMessage: "text-right" }}
              errorMessage={errors.roomsCount?.message}
              validationState={!!errors.roomsCount?.message ? "invalid" : "valid"}
            />
          );
        }}
        rules={{
          required: {
            value: true,
            message: "الزامی است",
          },
        }}
      />
      <Controller
        control={control}
        name="mastersCount"
        render={({ field }) => {
          return (
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
              {...field}
              isRequired
              classNames={{ errorMessage: "text-right" }}
              errorMessage={errors.mastersCount?.message}
              validationState={!!errors.mastersCount?.message ? "invalid" : "valid"}
            />
          );
        }}
        rules={{
          required: {
            value: true,
            message: "الزامی است",
          },
        }}
      />
      <SelectFeatures
        //
        form={form}
        filterApi={{ categories: category }}
        label="ویژگی ها"
        placeholder="ویزگی ها را انتخاب کنید"
        isMulti
      />
    </>
  );
};

const Apartment = ({ form, category }: { form: UseFormReturn<EstateFormData, any, undefined>; category: Key }) => {
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

  if (category !== "645cd1214b4819ffd958c955") return null;

  return (
    <>
      <Controller
        control={control}
        name="roomsCount"
        render={({ field }) => {
          return (
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
              {...field}
              isRequired
              classNames={{ errorMessage: "text-right" }}
              errorMessage={errors.roomsCount?.message}
              validationState={!!errors.roomsCount?.message ? "invalid" : "valid"}
            />
          );
        }}
        rules={{
          required: {
            value: true,
            message: "الزامی است",
          },
        }}
      />
      <Controller
        control={control}
        name="mastersCount"
        render={({ field }) => {
          return (
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
              {...field}
              isRequired
              classNames={{ errorMessage: "text-right" }}
              errorMessage={errors.mastersCount?.message}
              validationState={!!errors.mastersCount?.message ? "invalid" : "valid"}
            />
          );
        }}
        rules={{
          required: {
            value: true,
            message: "الزامی است",
          },
        }}
      />
      <Controller
        control={control}
        name="floorsCount"
        render={({ field }) => {
          return (
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
              {...field}
              isRequired
              classNames={{ errorMessage: "text-right" }}
              errorMessage={errors.floorsCount?.message}
              validationState={!!errors.floorsCount?.message ? "invalid" : "valid"}
            />
          );
        }}
        rules={{
          required: {
            value: true,
            message: "الزامی است",
          },
        }}
      />
      <Controller
        control={control}
        name="unitsCount"
        render={({ field }) => {
          return (
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
              {...field}
              isRequired
              classNames={{ errorMessage: "text-right" }}
              errorMessage={errors.unitsCount?.message}
              validationState={!!errors.unitsCount?.message ? "invalid" : "valid"}
            />
          );
        }}
        rules={{
          required: {
            value: true,
            message: "الزامی است",
          },
        }}
      />
      <Controller
        control={control}
        name="floor"
        render={({ field }) => {
          return (
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
              {...field}
              isRequired
              classNames={{ errorMessage: "text-right" }}
              errorMessage={errors.floor?.message}
              validationState={!!errors.floor?.message ? "invalid" : "valid"}
            />
          );
        }}
        rules={{
          required: {
            value: true,
            message: "الزامی است",
          },
        }}
      />
      <SelectFeatures
        //
        form={form}
        filterApi={{ categories: category }}
        label="ویژگی ها"
        placeholder="ویزگی ها را انتخاب کنید"
        isMulti
      />
    </>
  );
};

const Commercial = ({ form, category }: { form: UseFormReturn<EstateFormData, any, undefined>; category: Key }) => {
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

  if (category !== "645cd1754b4819ffd958c95b") return null;

  return (
    <>
      <Controller
        control={control}
        name="buildingArea"
        render={({ field }) => {
          return (
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
              {...field}
              isRequired
              classNames={{ errorMessage: "text-right" }}
              errorMessage={errors.buildingArea?.message}
              validationState={!!errors.buildingArea?.message ? "invalid" : "valid"}
            />
          );
        }}
        rules={{
          required: {
            value: true,
            message: "الزامی است",
          },
        }}
      />
      <Controller
        control={control}
        name="floor"
        render={({ field }) => {
          return (
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
              {...field}
              isRequired
              classNames={{ errorMessage: "text-right" }}
              errorMessage={errors.floor?.message}
              validationState={!!errors.floor?.message ? "invalid" : "valid"}
            />
          );
        }}
        rules={{
          required: {
            value: true,
            message: "الزامی است",
          },
        }}
      />
    </>
  );
};

const Land = ({ form, category }: { form: UseFormReturn<EstateFormData, any, undefined>; category: Key }) => {
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

  if (category !== "645cd1554b4819ffd958c958") return null;

  return (
    <>
      <SelectFeatures
        //
        form={form}
        filterApi={{ categories: category }}
        label="نوع بافت"
        placeholder="نوع بافت را انتخاب کنید"
      />
      <Controller
        control={control}
        name="withOldBuilding"
        render={({ field }) => {
          return (
            <Switch
              //
              className="col-span-full"
              placeholder="دارای ساختمان قدیمی"
              dir="ltr"
              {...field}
              value={field.value?.toString() || ""}
            >
              دارای ساختمان قدیمی
            </Switch>
          );
        }}
      />
    </>
  );
};

const Hectare = ({ form, category }: { form: UseFormReturn<EstateFormData, any, undefined>; category: Key }) => {
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

  if (category !== "645cd1844b4819ffd958c95e") return null;

  return (
    <>
      <SelectFeatures
        //
        form={form}
        filterApi={{ categories: category }}
        label="نوع بافت"
        placeholder="نوع بافت را انتخاب کنید"
      />
      <Controller
        control={control}
        name="withOldBuilding"
        render={({ field }) => {
          return (
            <Switch
              //
              className="col-span-full"
              placeholder="دارای ساختمان قدیمی"
              dir="ltr"
              {...field}
              value={field.value?.toString() || ""}
            >
              دارای ساختمان قدیمی
            </Switch>
          );
        }}
      />
    </>
  );
};

//
//
//
