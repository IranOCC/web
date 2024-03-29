"use client";

import EditAddPage, { type AddEditComponentProps } from "@/components/@panel/EditAddPage";

import { WebInfo } from "@/types/interfaces";
import { InitialSettingsFormData } from "@/types/formsData";
import InitialSettingsBox from "@/components/@panel/Features/Setting/InitialSettingsBox";

import { useForm } from "react-hook-form";

const Center = ({ form, loading, section }: AddEditComponentProps) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-full">
          {/*  */}
          {section === "initial" && <InitialSettingsBox form={form} loading={loading} />}
        </div>
      </div>
    </>
  );
};

export default function Page() {
  const form = useForm<InitialSettingsFormData>();
  const { setValue } = form;

  const setInitialData = (data: InitialSettingsFormData) => {
    setValue("title", data.title);
    setValue("description", data.description);
    setValue("keywords", data.keywords || []);
  };
  return (
    <>
      <EditAddPage<InitialSettingsFormData, WebInfo>
        //
        Center={Center}
        form={form}
        setInitialData={setInitialData}
        endpoint="setting"
      />
    </>
  );
}
