"use client";

import { EstateTypeFormData } from "@/types/formsData";
import { EstateCategory, EstateType, Icon } from "@/types/interfaces";
import { useForm } from "react-hook-form";
import ListEditPage from "@/components/@panel/ListEditPage";
import { ColumnsType } from "antd/es/table";
import { Tag } from "antd";
import EstateTypeBox from "@/components/@panel/Features/Estate/Type/EstateTypeBox";

const columns: ColumnsType<EstateType> = [
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
    title: "دسته ها",
    dataIndex: "categories",
    responsive: ["lg"],
    render: (categories: EstateCategory[]) => {
      if (!categories?.length) return <Tag color="green">تمام دسته ها</Tag>;
      return categories.map((cat, index) => {
        return (
          <Tag color="blue" key={cat._id}>
            {cat.title}
          </Tag>
        );
      });
    },
  },
];

export default function Template() {
  const form = useForm<EstateTypeFormData>();
  const { setValue } = form;

  const setInitialData = (data: EstateTypeFormData) => {
    setValue("_id", data._id);

    setValue("title", data.title);
    setValue("slug", data.slug);
    setValue("description", data?.description);
    setValue("icon", (data?.icon as Icon)?._id);
    setValue("tags", data.tags);
    setValue(
      "categories",
      (data?.categories as EstateCategory[])?.map((v: EstateCategory) => v._id)
    );
  };

  return (
    <>
      <ListEditPage<EstateTypeFormData, EstateType>
        //
        FormComponent={EstateTypeBox}
        form={form}
        setInitialData={setInitialData}
        headerTitle="لیست نوع های املاک"
        formTitle="نوع"
        onEditField="title"
        endpoint="estate/type"
        columns={columns}
        editable
        deletable
        defaultPageCount={50}
      />
    </>
  );
}
