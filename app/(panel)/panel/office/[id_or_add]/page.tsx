"use client";

import EditAddPage, { type AddEditComponentProps } from "@/components/@panel/EditAddPage";
import EmailAddressBox from "@/components/@panel/Features/@common/EmailAddressBox";
import LocationBox from "@/components/@panel/Features/@common/LocationBox";
import PhoneNumberBox from "@/components/@panel/Features/@common/PhoneNumberBox";
import SendEmailBox from "@/components/@panel/Features/@common/SendEmailBox";
import SendSmsBox from "@/components/@panel/Features/@common/SendSmsBox";
import OfficeBox from "@/components/@panel/Features/Office/OfficeBox";
import { OfficeFormData } from "@/types/formsData";
import { Email, Office, Phone, StorageFile, User } from "@/types/interfaces";
import { useForm } from "react-hook-form";

const Center = ({ form, loading }: AddEditComponentProps) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-full">
          <OfficeBox form={form} loading={loading} />
        </div>
        <div className="col-span-full md:col-span-1">
          <PhoneNumberBox form={form} loading={loading} />
        </div>
        <div className="col-span-full md:col-span-1">
          <EmailAddressBox form={form} loading={loading} />
        </div>
        <div className="col-span-full">
          <LocationBox form={form} loading={loading} />
        </div>
      </div>
    </>
  );
};

const Side = ({ form, loading }: AddEditComponentProps) => {
  const { getValues } = form;
  return (
    <>
      <SendSmsBox officeID={getValues("_id")} to={getValues("phone.value")} />
      <SendEmailBox officeID={getValues("_id")} to={getValues("email.value")} />
    </>
  );
};

export default function Page() {
  const form = useForm<OfficeFormData>();
  const { setValue } = form;

  const setInitialData = (data: OfficeFormData) => {
    setValue("_id", data._id);

    setValue("name", data.name);
    setValue("management", (data.management as User)._id);
    setValue("description", data.description);
    setValue("logo", data.logo as StorageFile);
    //
    setValue("phone.value", (data.phone as Phone)?.value);
    setValue("phone.verified", (data.phone as Phone)?.verified);
    setValue("email.value", (data.email as Email)?.value);
    setValue("email.verified", (data.email as Email)?.verified);
    //
    setValue("province", data.province);
    setValue("city", data.city);
    setValue("address", data.address);
    setValue("location", data.location);
    //
    setValue("verified", data.verified);
    setValue("active", data.active);
  };
  return (
    <>
      <EditAddPage<OfficeFormData, Office>
        //
        Center={Center}
        Side={Side}
        form={form}
        setInitialData={setInitialData}
        endpoint="office"
        //
      />
    </>
  );
}
