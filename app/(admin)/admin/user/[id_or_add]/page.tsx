"use client";

import EditAddPage, { type AddEditComponentProps } from "@/components/@panel/EditAddPage";
import EmailAddressBox from "@/components/@panel/Features/@common/EmailAddressBox";
import LocationBox from "@/components/@panel/Features/@common/LocationBox";
import PhoneNumberBox from "@/components/@panel/Features/@common/PhoneNumberBox";
import SendEmailBox from "@/components/@panel/Features/@common/SendEmailBox";
import SendSmsBox from "@/components/@panel/Features/@common/SendSmsBox";
import UserBox from "@/components/@panel/Features/User/UserBox";
import { UserFormData } from "@/types/formsData";
import { Email, Phone, StorageFile, User } from "@/types/interfaces";
import { useForm } from "react-hook-form";

const Center = ({ form, loading }: AddEditComponentProps) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-full">
          <UserBox form={form} loading={loading} />
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
      {!!(getValues("_id") && getValues("phone._id")) && <SendSmsBox officeID={getValues("_id")} to={getValues("phone.value")} />}
      {!!(getValues("_id") && getValues("email._id")) && <SendEmailBox officeID={getValues("_id")} to={getValues("email.value")} />}
    </>
  );
};

export default function Page() {
  const form = useForm<UserFormData>();
  const { setValue } = form;

  const setInitialData = (data: UserFormData) => {
    setValue("_id", data._id);

    setValue("firstName", data.firstName);
    setValue("lastName", data.lastName);
    setValue("roles", data.roles);
    setValue("avatar", data.avatar as StorageFile);
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
  const beforeSubmit = (data: UserFormData) => {
    if (!(data.phone as Phone)?.value) {
      data.phone = undefined;
    }
    if (!(data.email as Email)?.value) {
      data.email = undefined;
    }

    return data;
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
        beforeSubmit={beforeSubmit}
      />
    </>
  );
}
