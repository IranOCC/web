"use client";

import { type AddEditComponentProps } from "@/components/@panel/EditAddPage";
import { SmsTemplateFormData } from "@/types/formsData";
import { SmsTemplate } from "@/types/interfaces";
import { useForm } from "react-hook-form";
import ListEditPage from "@/components/@panel/ListEditPage";
import { ColumnsType } from "antd/es/table";
import IconBox from "@/components/@panel/Features/Media/Icon/IconBox";
import SmsTemplateBox from "@/components/@panel/Features/Setting/SmsTemplateBox";

const columns: ColumnsType<SmsTemplate> = [
  {
    title: "عنوان",
    dataIndex: "title",
  },
  {
    title: "شناسه",
    dataIndex: "slug",
    render: (slug) => {
      return <pre>{slug}</pre>;
    },
  },
  {
    title: "شناسه سرویس",
    dataIndex: "serviceID",
    render: (serviceID) => {
      return <pre>{serviceID || "-"}</pre>;
    },
  },
];

export default function Template() {
  const form = useForm<SmsTemplateFormData>();
  const { setValue } = form;

  const setInitialData = (data: SmsTemplateFormData) => {
    setValue("_id", data._id);

    setValue("title", data.title);
    setValue("slug", data.slug);
    setValue("content", data.content);
    setValue("serviceID", data.serviceID);

  };

  return (
    <>
      <ListEditPage<SmsTemplateFormData, SmsTemplate>
        //
        FormComponent={SmsTemplateBox}
        form={form}
        setInitialData={setInitialData}
        headerTitle={(i) => <div className="text-base font-semibold">قالب های پیامک ({i})</div>}
        formTitle="قالب"
        endpoint="smsTemplate"
        columns={columns}
        editable
        deletable
      />
    </>
  );
}
