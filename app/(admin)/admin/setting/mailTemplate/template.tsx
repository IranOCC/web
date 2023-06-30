"use client";

import { MailTemplateFormData } from "@/types/formsData";
import { MailTemplate } from "@/types/interfaces";
import { useForm } from "react-hook-form";
import ListEditPage from "@/components/@panel/ListEditPage";
import { ColumnsType } from "antd/es/table";
import MailTemplateBox from "@/components/@panel/Features/Setting/MailTemplateBox";

const columns: ColumnsType<MailTemplate> = [
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
  const form = useForm<MailTemplateFormData>();
  const { setValue } = form;

  const setInitialData = (data: MailTemplateFormData) => {
    setValue("_id", data._id);

    setValue("title", data.title);
    setValue("slug", data.slug);
    setValue("content", data.content);
    setValue("serviceID", data.serviceID);
  };

  return (
    <>
      <ListEditPage<MailTemplateFormData, MailTemplate>
        //
        FormComponent={MailTemplateBox}
        form={form}
        setInitialData={setInitialData}
        headerTitle={(i) => <div className="text-base font-semibold">قالب های ایمیل ({i})</div>}
        formTitle="قالب"
        endpoint="mailTemplate"
        columns={columns}
        editable
        deletable
      />
    </>
  );
}
