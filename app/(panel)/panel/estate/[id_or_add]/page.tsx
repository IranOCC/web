"use client";

import EditAddPage, { type AddEditComponentProps } from "@/components/@panel/EditAddPage";
import SendEmailBox from "@/components/@panel/Features/@common/SendEmailBox";
import SendSmsBox from "@/components/@panel/Features/@common/SendSmsBox";
import EstateBox from "@/components/@panel/Features/Estate/EstateBox";
import EstateLocationBox from "@/components/@panel/Features/Estate/EstateLocationBox";
import EstateGeneralBox from "@/components/@panel/Features/Estate/EstateGeneralBox";
import { EstateFormData, UserFormData } from "@/types/formsData";
import { Estate, StorageFile, User } from "@/types/interfaces";
import { useForm } from "react-hook-form";
import EstateVisibilityBox from "@/components/@panel/Features/Estate/EstateVisibilityBox";
import EstateMediaBox from "@/components/@panel/Features/Estate/EstateMediaBox";
import EstateTagsBox from "@/components/@panel/Features/Estate/EstateTagsBox";
import EstateFeaturesBox from "@/components/@panel/Features/Estate/EstateFeaturesBox";
import EstateOwnerBox from "@/components/@panel/Features/Estate/EstateOwnerBox";
import EstateSetCategoryModal from "@/components/@panel/Features/Estate/EstateSetCategoryModal";
import { useState } from "react";
import EstateCategoryTypeBox from "@/components/@panel/Features/Estate/EstateCategoryTypeBox";

const Center = (props: AddEditComponentProps) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-full">
          <EstateBox {...props} />
        </div>
        <div className="col-span-full md:col-span-1">
          <EstateGeneralBox {...props} />
        </div>
        <div className="col-span-full md:col-span-1">
          <EstateFeaturesBox {...props} />
        </div>
        <div className="col-span-full">
          <EstateLocationBox {...props} />
        </div>
      </div>
    </>
  );
};

const Side = (props: AddEditComponentProps) => {
  return (
    <>
      <EstateCategoryTypeBox {...props} />
      <EstateTagsBox {...props} />
      <EstateVisibilityBox {...props} />
      <EstateOwnerBox {...props} />
      <EstateMediaBox {...props} />
    </>
  );
};

export default function Page() {
  const form = useForm<EstateFormData>();
  const { setValue, getValues } = form;

  const setInitialData = (data: EstateFormData) => {
    setValue("_id", data._id);

    // setValue("firstName", data.firstName);
    // setValue("lastName", data.lastName);
    // setValue("roles", data.roles);
    // setValue("avatar", data.avatar as StorageFile);
    // //
    // setValue("phone.value", (data.phone as Phone)?.value);
    // setValue("phone.verified", (data.phone as Phone)?.verified);
    // setValue("email.value", (data.email as Email)?.value);
    // setValue("email.verified", (data.email as Email)?.verified);
    // //
    // setValue("province", data.province);
    // setValue("city", data.city);
    // setValue("address", data.address);
    // setValue("location", data.location);
    // //
    // setValue("verified", data.verified);
    // setValue("active", data.active);
  };

  const [selectedCat, setSelectedCat] = useState<string | undefined>(undefined);

  return (
    <>
      <EditAddPage<EstateFormData, Estate>
        //
        Center={Center}
        Side={Side}
        form={form}
        setInitialData={setInitialData}
        endpoint="estate"
        componentProps={{ selectedCat }}
      />
      {/*  */}
      <EstateSetCategoryModal
        //
        open={!selectedCat}
        setCategory={(val: string) => {
          setValue("category", val);
          setSelectedCat(val);
        }}
      />
    </>
  );
}
