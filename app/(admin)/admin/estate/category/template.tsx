"use client";

import { EstateCategoryFormData } from "@/types/formsData";
import { EstateCategory, Icon } from "@/types/interfaces";
import { useForm } from "react-hook-form";
import ListEditPage from "@/components/@panel/ListEditPage";
import { ColumnsType } from "antd/es/table";
import EstateCategoryBox from "@/components/@panel/Features/Estate/Category/EstateCategoryBox";

const columns: ColumnsType<EstateCategory> = [
  {
    title: "عنوان",
    dataIndex: "title",
  },
  {
    title: "شناسه",
    dataIndex: "slug",
    responsive: ["md"],
    render: (slug) => {
      return <pre>{slug}</pre>;
    },
  },
  {
    title: "آیکون",
    dataIndex: ["icon", "content"],
    responsive: ["xxl"],
    render: (content) => {
      return <div className="w-8 h-8" dangerouslySetInnerHTML={{ __html: content }} />;
    },
  },
  {
    title: "مادر",
    responsive: ["lg"],
    dataIndex: ["parent", "title"],
  },
];

export default function Template() {
  const form = useForm<EstateCategoryFormData>();
  const { setValue } = form;

  const setInitialData = (data: EstateCategoryFormData) => {
    setValue("_id", data._id);

    setValue("title", data.title);
    setValue("slug", data.slug);
    setValue("description", data?.description);
    setValue("icon", (data?.icon as Icon)?._id);
    setValue("tags", data.tags);
    setValue("parent", data?.parent);
  };

  return (
    <>
      <ListEditPage<EstateCategoryFormData, EstateCategory>
        //
        FormComponent={EstateCategoryBox}
        form={form}
        setInitialData={setInitialData}
        headerTitle="لیست دسته بندی ها"
        formTitle="دسته"
        onEditField="title"
        endpoint="estate/category"
        columns={columns}
        editable
        deletable
        defaultPageCount={50}
      />
    </>
  );
}
