"use client";

import EditAddPage, { type AddEditComponentProps } from "@/components/@panel/EditAddPage";
import EmailAddressBox from "@/components/@panel/Features/@common/EmailAddressBox";
import LocationBox from "@/components/@panel/Features/@common/LocationBox";
import PhoneNumberBox from "@/components/@panel/Features/@common/PhoneNumberBox";
import SendEmailBox from "@/components/@panel/Features/@common/SendEmailBox";
import SendSmsBox from "@/components/@panel/Features/@common/SendSmsBox";
import OfficeBox from "@/components/@panel/Features/Office/OfficeBox";
import AddEditOfficeCheckModal from "@/components/Modals/AddOfficeCheckModal";
import { OfficeFormData } from "@/types/formsData";
import { Email, Office, Phone, StorageFile, User } from "@/types/interfaces";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Center = (props: AddEditComponentProps) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-full">
          <OfficeBox {...props} />
        </div>
        <div className="col-span-full md:col-span-1">
          <PhoneNumberBox {...props} />
        </div>
        <div className="col-span-full md:col-span-1">
          <EmailAddressBox {...props} />
        </div>
        <div className="col-span-full">
          <LocationBox {...props} />
        </div>
      </div>
    </>
  );
};

const Side = ({ form, loading }: AddEditComponentProps) => {
  const { getValues } = form;
  return (
    <>
      {!!(getValues("_id") && getValues("phone._id")) && <SendSmsBox officeID={getValues("_id")} to={getValues("phone.value")} />}
      {!!(getValues("_id") && getValues("email._id")) && <SendEmailBox officeID={getValues("_id")} to={getValues("email.value")} />}
    </>
  );
};

export default function Page() {
  const form = useForm<OfficeFormData>();
  const { setValue } = form;

  const [checkingData, setCheckingData] = useState<any>(null);

  const setInitialData = (data: OfficeFormData) => {
    setValue("_id", data._id);

    setValue("name", data.name);
    setValue("management", (data.management as User)._id);
    // setValue("management", { value: (data.management as User)._id, title: (data.management as User).fullName || "-" });
    setValue("description", data.description);
    setValue("logo", data.logo as StorageFile);
    //
    setValue("phone", data.phone as Phone);
    setValue("email", data.email as Email);
    //
    setValue("province", data.province);
    setValue("city", data.city);
    setValue("address", data.address);
    setValue("location", data.location);
    //
    setValue("verified", data.verified);
    setValue("active", data.active);
  };

  const beforeSubmit = (data: OfficeFormData) => {
    if (!(data.phone as Phone)?.value) {
      data.phone = undefined;
    }
    if (!(data.email as Email)?.value) {
      data.email = undefined;
    }
    if (!data.description) {
      data.description = undefined;
    }
    return data;
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
        componentProps={{ checkingData }}
        beforeSubmit={beforeSubmit}
      />
      <AddEditOfficeCheckModal
        //
        set={setCheckingData}
      />
    </>
  );
}
