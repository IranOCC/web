"use client";

import { WebPreviewContext, WebPreviewContextType } from "@/context/webPreview.context";
import { useContext, useEffect } from "react";
import { Input, Tabs, Tab, Textarea, Button } from "@nextui-org/react";
import { NumericFormat } from "react-number-format";

export default function Page() {
  const { dashboardPage } = useContext(WebPreviewContext) as WebPreviewContextType;
  useEffect(() => {
    dashboardPage("ثبت ملک جدید");
  }, []);

  return (
    <div className="flex h-auto min-h-full flex-col items-center justify-between bg-gray-200 px-4 pb-16 md:bg-transparent md:pb-4">
      <div className="grid grid-cols-1 gap-3 py-5 lg:grid-cols-2">
        <Tabs color="secondary" classNames={{ tabList: "bg-white" }} placeholder="دسته ملک" variant="bordered" className="col-span-full">
          <Tab title="ویلا" />
          <Tab title="آپارتمان" />
          <Tab title="تجاری" />
          <Tab title="زمین" />
          <Tab title="هکتاری" />
        </Tabs>
        <Input
          //
          className="col-span-full"
          type="text"
          variant="faded"
          label="عنوان ملک"
          maxLength={200}
        />
        <Textarea
          //
          className="col-span-full"
          type="text"
          variant="faded"
          label="توضیحات"
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
        <Tabs color="secondary" classNames={{ tabList: "bg-white" }} placeholder="نوع ملک" variant="bordered" className="col-span-full">
          <Tab title="فلت" />
          <Tab title="دوبلکس" />
          <Tab title="تریپلکس" />
          <Tab title="طبقات جداگانه" />
        </Tabs>
        <Tabs color="secondary" classNames={{ tabList: "bg-white" }} placeholder="نوع سند" variant="bordered" className="col-span-full">
          <Tab title="تک برگ" />
          <Tab title="شش دانگ" />
          <Tab title="بنجاق" />
          <Tab title="مشاع" />
          <Tab title="قولنامه ای" />
          <Tab title="شورایی" />
          <Tab title="بنیادی" />
          <Tab title="اوقاف" />
          <Tab title="شاهی" />
          <Tab title="دفترچه ای" />
          <Tab title="در دست اقدام" />
          <Tab title="بدون سند" />
        </Tabs>
        <Button
          //
          color="secondary"
          variant="shadow"
        >
          ثبت
        </Button>
      </div>
      <div />
    </div>
  );
}
