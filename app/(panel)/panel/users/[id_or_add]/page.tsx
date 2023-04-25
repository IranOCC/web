"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import PanelCard from "@/components/@panel/Card";
import SendEmailBox from "@/components/@panel/Features/User/SendEmailBox";
import SendSmsBox from "@/components/@panel/Features/User/SendSmsBox";
import UserInfoBox from "@/components/@panel/Features/User/UserInfoBox";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { toast } from "@/lib/toast";
import { UserInfoFormData } from "@/types/formsData";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

export default function Page() {
  const params = useParams();
  const id_or_add = params?.id_or_add as string;
  const isNew = id_or_add === "add";
  const ID = isNew ? undefined : id_or_add;

  const form = useForm<UserInfoFormData>();
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
    async (data: UserInfoFormData) => {
      try {
        if (isNew) {
          await api.post("/user", data);
          toast.success("با موفقیت ایجاد شد");
        } else {
          await api.patch("/user/" + ID, data);
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

      const { firstName, lastName, status } = response.data;
      setValue("firstName", firstName);
      setValue("lastName", lastName);
      setValue("status", status);
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
            <div className="grid grid-cols-1 gap-4">
              <div className="col-span-full">
                <UserInfoBox form={form} onSubmit={onSubmit()} />
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
