"use client";

import EditAddPage, { type AddEditComponentProps } from "@/components/@panel/EditAddPage";
import { Page } from "@/types/interfaces";
import { useForm } from "react-hook-form";
import { PageFormData } from "@/types/formsData";
import PageRegistrantBox from "@/components/@panel/Features/Page/PageRegistrantBox";
import PageVisibilityBox from "@/components/@panel/Features/Page/PageVisibilityBox";
import PageTagsBox from "@/components/@panel/Features/Page/PageTagsBox";
import PageBox from "@/components/@panel/Features/Page/PageBox";


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

  const setInitialData = (data: PageFormData) => {
    setValue("_id", data._id);

    setValue("title", data.title);
    setValue("content", data.content);
    setValue("slug", data.slug);

    setValue("status", data.status);
    setValue("publishedAt", data.publishedAt);

    setValue("tags", data.tags);

    setValue("createdBy", data.createdBy);
  };



  return (
    <>
      <EditAddPage<PageFormData, Page>
        //
        Center={Center}
        Side={Side}
        form={form}
        setInitialData={setInitialData}
        endpoint="page"
      />
    </>
  );
}
