"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import PanelCard from "@/components/@panel/Card";

import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { toast } from "@/lib/toast";
import { UserFormData } from "@/types/formsData";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import UserBox from "@/components/@panel/Features/User/UserBox";

import EmailAddressBox from "@/components/@panel/Features/@common/EmailAddressBox";
import SendEmailBox from "@/components/@panel/Features/@common/SendEmailBox";
import PhoneNumberBox from "@/components/@panel/Features/@common/PhoneNumberBox";
import SendSmsBox from "@/components/@panel/Features/@common/SendSmsBox";
import LocationBox from "@/components/@panel/Features/@common/LocationBox";
import { handleFieldsError } from "@/lib/axios";
import { Email, Phone, StorageFile } from "@/types/interfaces";

export default function Page() {
  const params = useParams();
  const id_or_add = params?.id_or_add as string;
  const isNew = id_or_add === "add";
  const ID = isNew ? undefined : id_or_add;

  const form = useForm<UserFormData>();
  const {
    register,
    unregister,
    resetField,
    setValue,
    setError,
    control,
    handleSubmit,
    reset,
    formState: { errors, isLoading, isSubmitting, isValidating, isSubmitted, isSubmitSuccessful, dirtyFields },
  } = form;

  const router = useRouter();

  const api = useAxiosAuth();

  // submit
  const onSubmit =
    (redirect: boolean = true) =>
    async (data: UserFormData) => {
      const _dirtyFields = Object.fromEntries(
        Object.keys(dirtyFields).map((key) => {
          return [key, data[key as keyof UserFormData]];
        })
      );
      try {
        if (isNew) {
          const { data: result } = await api.post("/user", _dirtyFields);
          toast.success("با موفقیت ایجاد شد");
          if (redirect) router.replace("/panel/users");
          else router.replace("/panel/users/" + result._id);
        } else {
          await api.patch("/user/" + ID, _dirtyFields);
          toast.success("با موفقیت ویرایش شد");
          if (redirect) router.replace("/panel/users");
          else window.location.reload();
        }
      } catch (error) {
        handleFieldsError(error, setError);
      }
    };

  // get data
  const [sendSmsTo, setSendSmsTo] = useState<string>();
  const [sendMailTo, setSendMailTo] = useState<string>();
  const [dataLoading, setDataLoading] = useState<boolean>(false);
  const getData = async () => {
    setDataLoading(true);

    try {
      const response = await api.get("/user/" + ID);

      const {
        //
        firstName,
        lastName,
        status,
        roles,
        avatar,
        //
        phone,
        email,
        //
        province,
        city,
        address,
        location,
        //
        verified,
        active,
      } = response.data;
      setValue("firstName", firstName);
      setValue("lastName", lastName);
      setValue("status", status);
      setValue("roles", roles);
      setValue("avatar", avatar as StorageFile);
      //
      setValue("phone.value", (phone as Phone)?.value);
      setValue("phone.verified", (phone as Phone)?.verified);
      setValue("email.value", (email as Email)?.value);
      setValue("email.verified", (email as Email)?.verified);
      //
      setValue("province", province);
      setValue("city", city);
      setValue("address", address);
      setValue("location", location);
      //
      setValue("verified", verified);
      setValue("active", active);
      //
      setSendSmsTo((phone as Phone)?.value);
      setSendMailTo((email as Email)?.value);

      setDataLoading(false);
    } catch (error) {
      router.back();
    }
  };

  useEffect(() => {
    if (!isNew) getData();
  }, []);

  return (
    <>
      <div className="p-4">
        <form onSubmit={handleSubmit(onSubmit())} />
        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-full	lg:col-span-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-full">
                <UserBox form={form} loading={dataLoading} />
              </div>
              <div className="col-span-full md:col-span-1">
                <PhoneNumberBox form={form} loading={dataLoading} />
              </div>
              <div className="col-span-full md:col-span-1">
                <EmailAddressBox form={form} loading={dataLoading} />
              </div>
              <div className="col-span-full">
                <LocationBox form={form} loading={dataLoading} />
              </div>
            </div>
          </div>
          <div className="col-span-full lg:col-span-2">
            <div className="grid grid-cols-1 gap-4">
              <PanelCard>
                <Button
                  //
                  title="ثبت و برگشت به لیست"
                  type="submit"
                  loading={isSubmitting || isLoading || isValidating || dataLoading}
                  onClick={handleSubmit(onSubmit())}
                />
                <Button
                  //
                  title="ثبت"
                  type="submit"
                  loading={isSubmitting || isLoading || isValidating || dataLoading}
                  onClick={handleSubmit(onSubmit(false))}
                  noSpace
                />
              </PanelCard>
              <SendSmsBox userID={ID} to={sendSmsTo} />
              <SendEmailBox userID={ID} to={sendMailTo} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
