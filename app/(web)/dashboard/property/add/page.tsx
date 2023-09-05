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
        <Tabs color="secondary" classNames={{ tabList: "bg-white" }} placeholder="نوع ملک" variant="bordered" className="col-span-full">
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
