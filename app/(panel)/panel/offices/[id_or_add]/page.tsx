"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import PanelCard from "@/components/@panel/Card";

import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { toast } from "@/lib/toast";
import { OfficeFormData } from "@/types/formsData";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

import UserInfoBox from "@/components/@panel/Features/User/UserInfoBox";

import EmailAddressBox from "@/components/@panel/Features/@common/EmailAddressBox";
import SendEmailBox from "@/components/@panel/Features/@common/SendEmailBox";
import PhoneNumberBox from "@/components/@panel/Features/@common/PhoneNumberBox";
import SendSmsBox from "@/components/@panel/Features/@common/SendSmsBox";
import LocationBox from "@/components/@panel/Features/@common/LocationBox";
import { Email, Phone } from "@/types/interfaces";
import OfficeBox from "@/components/@panel/Features/Office/OfficeBox";

export default function Page() {
  const params = useParams();
  const id_or_add = params?.id_or_add as string;
  const isNew = id_or_add === "add";
  const ID = isNew ? undefined : id_or_add;

  const form = useForm<OfficeFormData>();
  const {
    register,
    unregister,
    resetField,
    setValue,
    setError,
    control,
    handleSubmit,
    reset,

    formState: { errors, isLoading, isSubmitting, isValidating, isSubmitted, isSubmitSuccessful },
  } = form;

  const router = useRouter();

  const api = useAxiosAuth();

  // submit
  const onSubmit =
    (redirect: boolean = true) =>
    async (data: OfficeFormData) => {
      try {
        if (isNew) {
          await api.post("/office", data);
          toast.success("با موفقیت ایجاد شد");
        } else {
          await api.patch("/office/" + ID, data);
          toast.success("با موفقیت ویرایش شد");
        }
        if (redirect) router.replace("/panel/users");
        else router.refresh();
      } catch (error) {}
    };

  // get data
  const getData = async () => {
    try {
      const response = await api.get("/user/" + ID);

      const {
        //
        name,
        description,
        management,
        logo,
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
      } = response.data as OfficeFormData;
      //
      setValue("name", name);
      setValue("description", description);
      setValue("management", management);
      setValue("logo", logo);
      //
      setValue("phone.value", (phone as Phone).value);
      setValue("phone.verified", (phone as Phone).verified);
      setValue("email.value", (email as Email).value);
      setValue("email.verified", (email as Email).verified);
      //
      setValue("province", province);
      setValue("city", city);
      setValue("address", address);
      setValue("location", location);
      //
      setValue("verified", verified);
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
        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-full	lg:col-span-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-full">
                <OfficeBox form={form} onSubmit={onSubmit()} />
              </div>
              <div className="col-span-full md:col-span-1">
                <PhoneNumberBox form={form} onSubmit={onSubmit()} />
              </div>
              <div className="col-span-full md:col-span-1">
                <EmailAddressBox form={form} onSubmit={onSubmit()} />
              </div>
              <div className="col-span-full">
                <LocationBox form={form} onSubmit={onSubmit()} />
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
                  loading={isSubmitting || isLoading || isValidating}
                  onClick={handleSubmit(onSubmit())}
                />
                <Button
                  //
                  title="ثبت"
                  type="submit"
                  loading={isSubmitting || isLoading || isValidating}
                  onClick={handleSubmit(onSubmit(false))}
                  noSpace
                />
              </PanelCard>
              <SendEmailBox userID={ID} />
              <SendSmsBox userID={ID} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
