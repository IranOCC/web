"use client";

import { type AddEditComponentProps } from "@/components/@panel/EditAddPage";
import EstateBox from "@/components/@panel/Features/Estate/EstateBox";
import { EstateCategoryFormData, EstateFormData, UserFormData } from "@/types/formsData";
import { EstateCategory, Icon, StorageFile, Tag, User } from "@/types/interfaces";
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
    title: "لینک",
    dataIndex: "slug",
  },
  {
    title: "آیکون",
    dataIndex: ["icon", "content"],
    render: (content) => {
      return <div className="w-8 h-8" dangerouslySetInnerHTML={{ __html: content }} />;
    },
  },
  {
    title: "مادر",
    dataIndex: ["parent", "title"],
  },
];

export default function Template() {
  const form = useForm<EstateCategoryFormData>({ mode: "onChange" });
  const { setValue } = form;

  const setInitialData = (data: EstateCategoryFormData) => {
    setValue("_id", data._id);

    setValue("title", data.title);
    setValue("slug", data.slug);
    setValue("description", data.description);
    setValue("icon", (data.icon as Icon)._id);
    setValue(
      "tags",
      (data.tags as Tag[]).map((v: Tag) => v.name)
    );
    setValue("parent", (data.parent as EstateCategory)._id);
  };

  return (
    <>
      <ListEditPage<EstateCategoryFormData, EstateCategory>
        //
        FormComponent={EstateCategoryBox}
        form={form}
        setInitialData={setInitialData}
        headerTitle={() => <div className="text-base font-semibold">لیست دسته بندی ها</div>}
        formTitle="دسته"
        endpoint="estate/category"
        columns={columns}
        editable
        deletable
      />
    </>
  );
}
