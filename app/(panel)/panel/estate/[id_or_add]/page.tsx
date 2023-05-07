"use client";

import EditAddPage, { type AddEditComponentProps } from "@/components/@panel/EditAddPage";
import SendEmailBox from "@/components/@panel/Features/@common/SendEmailBox";
import SendSmsBox from "@/components/@panel/Features/@common/SendSmsBox";
import EstateBox from "@/components/@panel/Features/Estate/EstateBox";
import EstateLocationBox from "@/components/@panel/Features/Estate/EstateLocationBox";
import EstateGeneralBox from "@/components/@panel/Features/Estate/EstateGeneralBox";
import { EstateFormData, UserFormData } from "@/types/formsData";
import { StorageFile, User } from "@/types/interfaces";
import { useForm } from "react-hook-form";
import EstateVisibilityBox from "@/components/@panel/Features/Estate/EstateVisibilityBox";
import EstateMediaBox from "@/components/@panel/Features/Estate/EstateMediaBox";
import EstateTagsBox from "@/components/@panel/Features/Estate/EstateTagsBox";
import EstateCategoriesBox from "@/components/@panel/Features/Estate/EstateCategoriesBox";

const Center = ({ form, loading }: AddEditComponentProps) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-full">
          <EstateBox form={form} loading={loading} />
        </div>
        <div className="col-span-full">
          <EstateGeneralBox form={form} loading={loading} />
        </div>
        <div className="col-span-full">
          <EstateLocationBox form={form} loading={loading} />
        </div>
      </div>
    </>
  );
};

const Side = ({ form, loading }: AddEditComponentProps) => {
  return (
    <>
      <EstateVisibilityBox form={form} loading={loading} />
      <EstateMediaBox form={form} loading={loading} />
      <EstateTagsBox form={form} loading={loading} />
      <EstateCategoriesBox form={form} loading={loading} />
      <EstateCategoriesBox form={form} loading={loading} />
    </>
  );
};

export default function Page() {
  const form = useForm<EstateFormData>();
  const { setValue } = form;

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
  return (
    <>
      <EditAddPage<UserFormData, User>
        //
        Center={Center}
        Side={Side}
        form={form}
        setInitialData={setInitialData}
        endpoint="user"
      />
    </>
  );
}
