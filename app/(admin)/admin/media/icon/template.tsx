"use client";

import { type AddEditComponentProps } from "@/components/@panel/EditAddPage";
import { IconFormData } from "@/types/formsData";
import { Icon } from "@/types/interfaces";
import { useForm } from "react-hook-form";
import ListEditPage from "@/components/@panel/ListEditPage";
import { ColumnsType } from "antd/es/table";
import IconBox from "@/components/@panel/Features/Media/Icon/IconBox";

const columns: ColumnsType<Icon> = [
  {
    title: "عنوان",
    dataIndex: "name",
  },
  {
    title: "آیکون",
    dataIndex: "content",
    render: (content) => {
      return <div className="w-8 h-8" dangerouslySetInnerHTML={{ __html: content }} />;
    },
  },
];

export default function Template() {
  const form = useForm<IconFormData>();
  const { setValue } = form;

  const setInitialData = (data: IconFormData) => {
    setValue("_id", data._id);

    setValue("name", data.name);
    setValue("content", data.content);
  };

  return (
    <>
      <ListEditPage<IconFormData, Icon>
        //
        FormComponent={IconBox}
        form={form}
        setInitialData={setInitialData}
        headerTitle="لیست آیکون ها"
        formTitle="آیکون"
        endpoint="icon"
        columns={columns}
        editable
        deletable
      />
    </>
  );
}
