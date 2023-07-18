"use client";

import EditAddPage, { type AddEditComponentProps } from "@/components/@panel/EditAddPage";
import { Page as PageType } from "@/types/interfaces";
import { useForm } from "react-hook-form";
import { PageFormData } from "@/types/formsData";
import PageRegistrantBox from "@/components/@panel/Features/Page/PageRegistrantBox";
import PageVisibilityBox from "@/components/@panel/Features/Page/PageVisibilityBox";
import PageTagsBox from "@/components/@panel/Features/Page/PageTagsBox";
import PageBox from "@/components/@panel/Features/Page/PageBox";
import { useState } from "react";

const Center = (props: AddEditComponentProps) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-full">
          <PageBox {...props} />
        </div>
      </div>
    </>
  );
};

const Side = (props: AddEditComponentProps) => {
  return (
    <>
      <PageTagsBox {...props} />
      <PageVisibilityBox {...props} />
      <PageRegistrantBox {...props} />
    </>
  );
};

export default function Page() {
  const form = useForm<PageFormData>();
  const { setValue, getValues } = form;

  const [detail, setDetail] = useState<any>(null);

  const setInitialData = (data: PageType) => {
    setValue("_id", data._id);

    setValue("title", data.title);
    setValue("content", data.content);
    setValue("slug", data.slug);

    setValue("status", data.status);
    setValue("publishedAt", data.publishedAt);

    setValue("tags", data.tags);

    setDetail({
      ID: data._id,
      updatedAt: data.updatedAt,
      createdBy: data.createdBy,
      createdAt: data.createdAt,
    });
  };

  return (
    <>
      <EditAddPage<PageFormData, PageType>
        //
        Center={Center}
        Side={Side}
        form={form}
        componentProps={{ detail }}
        setInitialData={setInitialData}
        endpoint="page"
        TopSubmitCard={PageRegistrantBox}
      />
    </>
  );
}
